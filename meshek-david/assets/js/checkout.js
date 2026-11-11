/*
 * משק דוד — קופה.
 * סדר השדות: פרטי מזמין → אופן קבלה → יישוב (לפני רחוב) → כתובת → משלוח לכתובת אחרת → מתנה → דיוור → תקנון.
 * באב-הטיפוס התשלום מדומה. בוורדפרס: שער סליקה ישראלי (Cardcom / PayPlus / Grow).
 */
(function () {
  'use strict';
  var MD = window.MD;
  var form = document.getElementById('checkout-form');
  if (!form) return;

  var items = MD.cart.items();
  if (!items.length) {
    form.outerHTML = '<div class="empty-state"><p>הסל ריק — אין מה לשלם עדיין.</p><a class="btn btn--primary" href="shop.html">למעבר לחנות</a></div>';
    return;
  }

  var billCombo = MD.initCombo(document.getElementById('bill-combo'), { onInput: summary });
  var shipCombo = MD.initCombo(document.getElementById('ship-combo'), { onInput: summary });
  var $ = function (id) { return document.getElementById(id); };

  // ── מילוי מוקדם ללקוח חוזר ──
  var prof = MD.profile.get();
  var saved = MD.getSettlement();
  if (prof) {
    ['firstName', 'lastName', 'phone', 'email', 'street', 'house', 'apt'].forEach(function (k) { if (prof[k] && $(k)) $(k).value = prof[k]; });
    billCombo.set(prof.settlement);
    $('returning-note').hidden = false;
    $('returning-name').textContent = prof.firstName || '';
  } else if (saved && saved.mode === 'delivery') {
    billCombo.set(saved.name);
  }
  if (saved && saved.mode === 'pickup') $('method-pickup').checked = true;

  // ── הצגה/הסתרה של קטעים ──
  function toggle(id, show) {
    var el = $(id); el.hidden = !show;
    el.querySelectorAll('input, select, textarea').forEach(function (f) { f.disabled = !show; });
  }
  function sync() {
    var pickup = $('method-pickup').checked;
    toggle('address-fields', !pickup);
    $('ship-different-wrap').hidden = pickup;
    toggle('ship-fields', !pickup && $('ship-different').checked);
    toggle('gift-fields', $('is-gift').checked);
    // ללקוח שיש לו כבר כתובת קבועה — השדות מוסתרים מאחורי כפתור "שינוי"
    summary();
  }
  ['method-delivery', 'method-pickup', 'ship-different', 'is-gift'].forEach(function (id) { $(id).addEventListener('change', sync); });

  // ── בדיקת יישוב בזמן אמת ──
  function checkSettlement(combo, msgId) {
    var v = combo.value(), msg = $(msgId);
    if (!v) { msg.textContent = ''; msg.className = 'field-msg'; return null; }
    var s = MD.findSettlement(v);
    // מנקים שגיאה קודמת מהשליחה הקודמת של הטופס
    combo.input.removeAttribute('aria-invalid');
    var old = document.getElementById(combo.input.id + '-err'); if (old) old.textContent = '';
    if (s) { msg.textContent = '✓ יש משלוח ל' + s.name + '.'; msg.className = 'field-msg field-msg--ok'; }
    else { msg.textContent = 'אין משלוח ל' + v + ' בשלב זה. אפשר לבחור איסוף עצמי מהמשק.'; msg.className = 'field-msg field-msg--error'; }
    return s;
  }
  billCombo.input.addEventListener('change', function () { checkSettlement(billCombo, 'bill-settlement-msg'); summary(); });
  shipCombo.input.addEventListener('change', function () { checkSettlement(shipCombo, 'ship-settlement-msg'); summary(); });

  function targetSettlement() {
    if ($('method-pickup').checked) return null;
    return MD.findSettlement($('ship-different').checked ? shipCombo.value() : billCombo.value());
  }

  // ── סיכום הזמנה ──
  function summary() {
    var lines = MD.cart.items().map(function (l) {
      var p = MD.product(l.id);
      return '<li><span>' + p.name + ' · ' + MD.qtyLabel(p, l.qty) + '</span><span>' + MD.money(p.price * l.qty) + '</span></li>';
    }).join('');
    var s = targetSettlement(), pickup = $('method-pickup').checked;
    var fee = s ? s.fee : 0, sub = MD.cart.subtotal();
    $('order-summary').innerHTML =
      '<ul class="summary-lines">' + lines + '</ul>' +
      '<dl><div><dt>סכום ביניים</dt><dd>' + MD.money(sub) + '</dd></div>' +
      '<div><dt>' + (pickup ? 'איסוף עצמי' : 'משלוח' + (s ? ' ל' + s.name : '')) + '</dt><dd>' +
        (pickup ? 'ללא עלות' : s ? (fee ? MD.money(fee) : 'ללא עלות') : '—') + '</dd></div>' +
      '<div class="total"><dt>סה״כ</dt><dd>' + MD.money(sub + fee) + '</dd></div></dl>' +
      '<p class="delivery-note">' + (pickup ? 'איסוף מחנות המשק: ' + MD.settings.pickupHours : MD.deliveryText()) + '</p>';
  }

  // ── ולידציה נגישה ──
  function setError(field, msg) {
    var id = field.id + '-err', el = $(id);
    if (!el) { el = document.createElement('p'); el.id = id; el.className = 'field-msg field-msg--error'; field.closest('.field').appendChild(el); }
    el.textContent = msg;
    field.setAttribute('aria-invalid', 'true');
    var d = (field.getAttribute('aria-describedby') || '').split(' ').filter(Boolean);
    if (d.indexOf(id) === -1) { d.push(id); field.setAttribute('aria-describedby', d.join(' ')); }
  }
  function clearErrors() {
    form.querySelectorAll('[aria-invalid]').forEach(function (f) { f.removeAttribute('aria-invalid'); });
    form.querySelectorAll('.field > .field-msg--error[id$="-err"]').forEach(function (e) { e.textContent = ''; });
  }

  form.addEventListener('submit', function (e) {
    e.preventDefault();
    clearErrors();
    var errors = [];
    function req(id, label) {
      var f = $(id); if (f.disabled) return;
      if (!f.value.trim()) { setError(f, 'יש למלא ' + label + '.'); errors.push({ f: f, m: label + ' — שדה חובה' }); }
    }
    req('firstName', 'שם פרטי'); req('lastName', 'שם משפחה'); req('phone', 'טלפון'); req('email', 'דוא״ל');
    var phone = $('phone');
    if (phone.value && !/^0\d{1,2}-?\d{7}$/.test(phone.value.replace(/\s/g, ''))) { setError(phone, 'מספר טלפון לא תקין. לדוגמה: 050-1234567'); errors.push({ f: phone, m: 'טלפון לא תקין' }); }
    var email = $('email');
    if (email.value && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value)) { setError(email, 'כתובת דוא״ל לא תקינה. לדוגמה: name@example.com'); errors.push({ f: email, m: 'דוא״ל לא תקין' }); }

    var pickup = $('method-pickup').checked;
    if (!pickup) {
      var shipDiff = $('ship-different').checked;
      req('billSettlement', 'יישוב'); req('street', 'רחוב'); req('house', 'מספר בית');
      if (!shipDiff && billCombo.value() && !MD.findSettlement(billCombo.value())) {
        setError($('billSettlement'), 'אין משלוח ליישוב זה. בחרו איסוף עצמי או כתובת משלוח אחרת.'); errors.push({ f: $('billSettlement'), m: 'אין משלוח ליישוב' });
      }
      if (shipDiff) {
        req('shipName', 'שם המקבל'); req('shipPhone', 'טלפון המקבל'); req('shipSettlement', 'יישוב למשלוח'); req('shipStreet', 'רחוב למשלוח'); req('shipHouse', 'מספר בית למשלוח');
        if (shipCombo.value() && !MD.findSettlement(shipCombo.value())) {
          setError($('shipSettlement'), 'אין משלוח ליישוב זה בשלב זה.'); errors.push({ f: $('shipSettlement'), m: 'אין משלוח ליישוב היעד' });
        }
      }
    }
    if (!$('terms').checked) { setError($('terms'), 'יש לאשר את התקנון ומדיניות הפרטיות.'); errors.push({ f: $('terms'), m: 'אישור תקנון' }); }

    var box = $('error-summary');
    if (errors.length) {
      box.hidden = false;
      box.querySelector('ul').innerHTML = errors.map(function (er) { return '<li><a href="#' + er.f.id + '">' + er.m + '</a></li>'; }).join('');
      box.focus();
      return;
    }
    box.hidden = true;

    // ── "תשלום" מדומה ושמירה ──
    var s = targetSettlement();
    var order = {
      id: 'MD-' + Date.now().toString().slice(-6),
      date: new Date().toISOString(),
      items: MD.cart.items(),
      subtotal: MD.cart.subtotal(),
      fee: s ? s.fee : 0,
      method: pickup ? 'pickup' : 'delivery',
      settlement: s ? s.name : '',
      delivery: pickup ? null : MD.nextDelivery().delivery.toISOString(),
      gift: $('is-gift').checked ? { message: $('giftMessage').value, hidePrices: $('hidePrices').checked } : null,
      marketing: $('marketing').checked
    };
    var profile = {
      firstName: $('firstName').value.trim(), lastName: $('lastName').value.trim(),
      phone: $('phone').value.trim(), email: $('email').value.trim(),
      settlement: billCombo.value(), street: $('street').value.trim(), house: $('house').value.trim(), apt: $('apt').value.trim(),
      marketing: order.marketing
    };
    if ($('save-details').checked) MD.profile.save(profile);
    MD.profile.addOrder(order);
    MD.setSettlement(pickup ? '' : (s ? s.name : ''), pickup ? 'pickup' : 'delivery');
    MD.cart.clear();
    try { sessionStorage.setItem('md_last_order', JSON.stringify(order)); } catch (err) {}
    location.href = 'thank-you.html';
  });

  sync();
})();
