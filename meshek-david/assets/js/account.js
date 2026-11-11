/* משק דוד — אזור אישי (אב-טיפוס). בוורדפרס: WooCommerce My Account. */
(function () {
  'use strict';
  var MD = window.MD;
  var root = document.getElementById('account-root');
  if (root) {
    var prof = MD.profile.get();
    if (!prof) {
      root.innerHTML = '<div class="empty-state"><p>עדיין אין פרטים שמורים במכשיר זה.</p>' +
        '<p>בהזמנה הראשונה אפשר לבחור "שמירת הפרטים להזמנות הבאות", ובפעם הבאה לא נשאל שוב על אזור המשלוח.</p>' +
        '<a class="btn btn--primary" href="shop.html">למעבר לחנות</a></div>';
    } else {
      var orders = MD.profile.orders();
      root.innerHTML =
        '<section aria-labelledby="acc-details"><h2 id="acc-details">הפרטים שלי</h2>' +
        '<form id="acc-form" class="form-grid" novalidate>' +
          field('firstName', 'שם פרטי', prof.firstName, 'given-name') + field('lastName', 'שם משפחה', prof.lastName, 'family-name') +
          field('phone', 'טלפון', prof.phone, 'tel', 'tel') + field('email', 'דוא״ל', prof.email, 'email', 'email') +
          '<div class="field field--full"><label for="accSettlement">יישוב</label>' +
          '<div class="combo" id="acc-combo"><input id="accSettlement" type="text" role="combobox" aria-autocomplete="list" aria-expanded="false" aria-controls="acc-list" autocomplete="off" aria-describedby="acc-settlement-msg">' +
          '<ul id="acc-list" role="listbox" aria-label="יישובים" hidden></ul><p class="combo__status visually-hidden" aria-live="polite"></p></div>' +
          '<p id="acc-settlement-msg" class="field-msg" aria-live="polite"></p></div>' +
          field('street', 'רחוב', prof.street, 'address-line1') + field('house', 'מספר בית', prof.house) + field('apt', 'דירה / כניסה', prof.apt) +
          '<div class="field field--full"><input type="checkbox" id="accMarketing"' + (prof.marketing ? ' checked' : '') + '> <label for="accMarketing" class="inline">אני רוצה לקבל עדכונים ומבצעים מהמשק בדוא״ל וב-SMS</label></div>' +
          '<div class="field field--full"><button class="btn btn--primary" type="submit">שמירת שינויים</button></div>' +
        '</form></section>' +
        '<section aria-labelledby="acc-orders"><h2 id="acc-orders">ההזמנות שלי</h2>' +
        (orders.length ? '<ul class="order-list">' + orders.map(orderItem).join('') + '</ul>' : '<p>עוד אין הזמנות.</p>') +
        '</section>' +
        '<section aria-labelledby="acc-privacy" class="privacy-box"><h2 id="acc-privacy">המידע שלי</h2>' +
        '<p>לפי חוק הגנת הפרטיות, אתם רשאים לעיין במידע שנשמר עליכם ולבקש את תיקונו או מחיקתו. ' +
        '<a href="privacy.html">למדיניות הפרטיות</a>.</p>' +
        '<button type="button" class="btn btn--danger" id="erase">מחיקת כל הפרטים שלי מהאתר</button></section>';

      var combo = MD.initCombo(document.getElementById('acc-combo'));
      combo.set(prof.settlement);
      document.getElementById('acc-form').addEventListener('submit', function (e) {
        e.preventDefault();
        var g = function (id) { return document.getElementById(id).value.trim(); };
        var newSettlement = combo.value();
        var changed = newSettlement !== prof.settlement;
        var next = { firstName: g('firstName'), lastName: g('lastName'), phone: g('phone'), email: g('email'),
          settlement: newSettlement, street: g('street'), house: g('house'), apt: g('apt'),
          marketing: document.getElementById('accMarketing').checked };
        MD.profile.save(next);
        var msg = 'הפרטים נשמרו.';
        if (changed) {
          // הכתובת השתנתה — בודקים שוב אזור משלוח
          var s = MD.findSettlement(newSettlement);
          MD.setSettlement(s ? s.name : '', s ? 'delivery' : 'pickup');
          msg += s ? ' יש משלוח ל' + s.name + '.' : ' שימו לב: אין משלוח ל' + newSettlement + ' בשלב זה — ההזמנות יהיו באיסוף עצמי.';
          document.getElementById('acc-settlement-msg').textContent = msg;
        }
        MD.announce(msg);
      });
      root.addEventListener('click', function (e) {
        var r = e.target.closest('[data-reorder]');
        if (r) {
          var o = orders.filter(function (x) { return x.id === r.dataset.reorder; })[0];
          o.items.forEach(function (l) { if (MD.product(l.id)) MD.cart.add(l.id, l.qty); });
          location.href = 'cart.html';
        }
        if (e.target.id === 'erase' && confirm('למחוק את כל הפרטים, ההזמנות וההעדפות השמורים במכשיר זה?')) {
          MD.profile.erase(); location.reload();
        }
      });
    }
  }

  // ── עמוד תודה ──
  var ty = document.getElementById('thanks-root');
  if (ty) {
    var o = null; try { o = JSON.parse(sessionStorage.getItem('md_last_order')); } catch (e) {}
    if (o) {
      ty.innerHTML = '<p>מספר הזמנה: <strong>' + o.id + '</strong></p>' +
        '<p>' + (o.method === 'pickup' ? 'ההזמנה תחכה לכם בחנות המשק באחיטוב (' + MD.settings.pickupHours + ').'
          : 'המשלוח ל' + o.settlement + ' יגיע ב' + MD.formatDay(new Date(o.delivery)) + ' ' + MD.settings.deliveryWindow + '.') + '</p>' +
        (o.gift ? '<p>ההזמנה סומנה כמתנה' + (o.gift.hidePrices ? ', ללא מחירים בתעודת המשלוח' : '') + '.</p>' : '') +
        '<p>סה״כ: ' + MD.money(o.subtotal + o.fee) + '</p>';
    }
  }

  function field(id, label, val, ac, type) {
    return '<div class="field"><label for="' + id + '">' + label + '</label><input id="' + id + '" type="' + (type || 'text') + '" value="' + (val || '').replace(/"/g, '&quot;') + '"' + (ac ? ' autocomplete="' + ac + '"' : '') + '></div>';
  }
  function orderItem(o) {
    var total = o.subtotal + o.fee;
    return '<li class="order"><h3>הזמנה ' + o.id + ' · ' + new Intl.DateTimeFormat('he-IL').format(new Date(o.date)) + '</h3>' +
      '<p>' + o.items.map(function (l) { var p = MD.product(l.id); return p ? p.name + ' (' + MD.qtyLabel(p, l.qty) + ')' : ''; }).join(', ') + '</p>' +
      '<p>' + (o.method === 'pickup' ? 'איסוף עצמי' : 'משלוח ל' + o.settlement) + ' · ' + MD.money(total) + '</p>' +
      '<button type="button" class="btn btn--ghost" data-reorder="' + o.id + '">הזמנה חוזרת<span class="visually-hidden"> של הזמנה ' + o.id + '</span></button></li>';
  }
})();
