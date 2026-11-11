/*
 * משק דוד — לוגיקת חנות (עגלה, פרופיל לקוח, מועדי משלוח).
 * באב-הטיפוס הנתונים נשמרים ב-localStorage בדפדפן בלבד.
 * בוורדפרס: WooCommerce Cart / Customer / פלאגין "md-delivery".
 */
(function () {
  'use strict';
  var MD = window.MD;
  var KEYS = { cart: 'md_cart', profile: 'md_profile', settlement: 'md_settlement', orders: 'md_orders' };

  function read(key, fallback) {
    try { var v = localStorage.getItem(key); return v ? JSON.parse(v) : fallback; } catch (e) { return fallback; }
  }
  function write(key, value) {
    try { localStorage.setItem(key, JSON.stringify(value)); } catch (e) { /* מצב פרטי — ממשיכים בלי לשמור */ }
  }
  function remove(key) { try { localStorage.removeItem(key); } catch (e) {} }

  // ── עזרי תצוגה ──
  MD.money = function (n) {
    return new Intl.NumberFormat('he-IL', { style: 'currency', currency: 'ILS', minimumFractionDigits: n % 1 ? 2 : 0 }).format(n);
  };
  MD.product = function (id) { return MD.products.filter(function (p) { return p.id === id; })[0]; };

  /** תיאור כמות: "2 יחידות" / "300 גרם" */
  MD.qtyLabel = function (p, qty) {
    if (p.sale_type === 'portion') return (qty * p.portion_grams) + ' גרם';
    return qty === 1 ? 'יחידה אחת' : qty + ' יחידות';
  };
  /** אפשרויות בורר כמות */
  MD.qtyOptions = function (p) {
    var out = [];
    for (var i = 1; i <= 10; i++) out.push({ value: i, label: MD.qtyLabel(p, i) });
    return out;
  };

  // ── יישובים ──
  MD.findSettlement = function (name) {
    if (!name) return null;
    var n = String(name).trim();
    return MD.settlements.filter(function (s) { return s.name === n; })[0] || null;
  };
  MD.getSettlement = function () { return read(KEYS.settlement, null); };
  /** mode: 'delivery' | 'pickup' */
  MD.setSettlement = function (name, mode) { write(KEYS.settlement, { name: name || '', mode: mode }); MD.emit('settlement'); };

  // ── מועד המשלוח הבא ──
  function israelNow() {
    // ממיר את "עכשיו" לשעון ישראל, בלי תלות באזור הזמן של המכשיר
    var parts = new Intl.DateTimeFormat('en-US', {
      timeZone: MD.settings.timeZone, year: 'numeric', month: 'numeric', day: 'numeric',
      hour: 'numeric', minute: 'numeric', hour12: false, weekday: 'short'
    }).formatToParts(new Date());
    var o = {}; parts.forEach(function (p) { o[p.type] = p.value; });
    return new Date(+o.year, +o.month - 1, +o.day, +o.hour % 24, +o.minute);
  }
  MD.nextDelivery = function (now) {
    now = now || israelNow();
    var s = MD.settings;
    var d = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    var diffToCutoff = (s.cutoffDay - d.getDay() + 7) % 7;
    var cutoff = new Date(d); cutoff.setDate(d.getDate() + diffToCutoff); cutoff.setHours(s.cutoffHour, 0, 0, 0);
    if (now >= cutoff) cutoff.setDate(cutoff.getDate() + 7);
    var delivery = new Date(cutoff); delivery.setDate(cutoff.getDate() + ((s.deliveryDay - s.cutoffDay + 7) % 7));
    return { cutoff: cutoff, delivery: delivery };
  };
  MD.formatDay = function (date) {
    return new Intl.DateTimeFormat('he-IL', { weekday: 'long', day: 'numeric', month: 'numeric' }).format(date);
  };
  MD.deliveryText = function () {
    var n = MD.nextDelivery();
    return 'המשלוח הקרוב: ' + MD.formatDay(n.delivery) + ' ' + MD.settings.deliveryWindow +
      ' — להזמנות עד ' + MD.formatDay(n.cutoff) + ' בשעה 12:00.';
  };

  // ── עגלה ──
  MD.cart = {
    items: function () { return read(KEYS.cart, []); },
    save: function (items) { write(KEYS.cart, items); MD.emit('cart'); },
    add: function (id, qty) {
      var items = this.items(); var line = items.filter(function (l) { return l.id === id; })[0];
      if (line) line.qty = Math.min(line.qty + qty, 20); else items.push({ id: id, qty: qty });
      this.save(items);
    },
    setQty: function (id, qty) {
      var items = this.items().map(function (l) { if (l.id === id) l.qty = qty; return l; })
        .filter(function (l) { return l.qty > 0; });
      this.save(items);
    },
    remove: function (id) { this.save(this.items().filter(function (l) { return l.id !== id; })); },
    clear: function () { this.save([]); },
    count: function () { return this.items().reduce(function (s, l) { return s + l.qty; }, 0); },
    subtotal: function () {
      return this.items().reduce(function (s, l) { var p = MD.product(l.id); return s + (p ? p.price * l.qty : 0); }, 0);
    }
  };

  // ── פרופיל לקוח ("אזור אישי" באב-טיפוס) ──
  MD.profile = {
    get: function () { return read(KEYS.profile, null); },
    save: function (p) { write(KEYS.profile, p); MD.emit('profile'); },
    orders: function () { return read(KEYS.orders, []); },
    addOrder: function (o) { var list = this.orders(); list.unshift(o); write(KEYS.orders, list); },
    /** מחיקת כל המידע האישי (זכות מחיקה — תיקון 13) */
    erase: function () { [KEYS.profile, KEYS.orders, KEYS.settlement, KEYS.cart].forEach(remove); MD.emit('profile'); MD.emit('cart'); }
  };

  // ── אירועים פשוטים ──
  MD.emit = function (name) { document.dispatchEvent(new CustomEvent('md:' + name)); };
  MD.on = function (name, fn) { document.addEventListener('md:' + name, fn); };

  // ── הכרזות לקורא מסך ──
  MD.announce = function (msg) {
    var r = document.getElementById('md-live');
    if (!r) return;
    r.textContent = '';
    setTimeout(function () { r.textContent = msg; }, 60);
  };
})();
