/*
 * משק דוד — עמוד החנות: בדיקת יישוב, סינון קטגוריות, תצוגה מהירה והוספה לסל.
 */
(function () {
  'use strict';
  var MD = window.MD;
  var grid = document.getElementById('product-grid');
  if (!grid) return;

  // ── בדיקת יישוב (חלון בכניסה לחנות) ──
  var gate = document.getElementById('gate-dialog');
  var gateForm = document.getElementById('gate-form');
  var gateResult = document.getElementById('gate-result');
  var gateCombo = MD.initCombo(document.getElementById('gate-combo'));
  var statusBar = document.getElementById('settlement-status');

  function renderStatus() {
    var s = MD.getSettlement();
    var txt;
    if (!s) txt = 'עוד לא בדקתם אם יש משלוח אליכם.';
    else if (s.mode === 'pickup') txt = 'בחרתם איסוף עצמי מהמשק באחיטוב.';
    else txt = 'משלוח ל' + s.name + ' — ' + MD.deliveryText();
    statusBar.querySelector('.settlement-status__text').textContent = txt;
  }

  function openGate() {
    gateResult.innerHTML = ''; gateResult.hidden = true;
    var s = MD.getSettlement(); gateCombo.set(s && s.mode === 'delivery' ? s.name : '');
    gate.showModal();
    gateCombo.input.focus();
  }

  gateForm.addEventListener('submit', function (e) {
    e.preventDefault();
    var name = gateCombo.value();
    var errEl = document.getElementById('gate-error');
    if (!name) { errEl.textContent = 'נא להקליד שם יישוב.'; gateCombo.input.setAttribute('aria-invalid', 'true'); gateCombo.input.focus(); return; }
    errEl.textContent = ''; gateCombo.input.removeAttribute('aria-invalid');
    var found = MD.findSettlement(name);
    gateResult.hidden = false;
    if (found) {
      MD.setSettlement(found.name, 'delivery');
      gateResult.className = 'gate-result gate-result--ok';
      gateResult.innerHTML =
        '<h3 tabindex="-1">יש! אנחנו מגיעים ל' + found.name + '</h3>' +
        '<p>' + MD.deliveryText() + '</p>' +
        '<p>דמי משלוח: ' + (found.fee ? MD.money(found.fee) : 'ללא עלות') + '</p>' +
        '<button type="button" class="btn btn--primary" data-close>להמשך קנייה</button>';
    } else {
      gateResult.className = 'gate-result gate-result--no';
      gateResult.innerHTML =
        '<h3 tabindex="-1">עדיין לא מגיעים ל' + escapeHtml(name) + '</h3>' +
        '<p>אזור החלוקה שלנו מוגבל בשלב זה. אפשר להזמין ולאסוף בעצמכם מחנות המשק באחיטוב (' + MD.settings.pickupHours + ').</p>' +
        '<div class="btn-row"><button type="button" class="btn btn--primary" data-pickup>הזמנה באיסוף עצמי</button>' +
        '<a class="btn btn--ghost" href="contact.html">עדכנו אותי כשתגיעו אליי</a></div>';
    }
    gateResult.querySelector('h3').focus();
  });

  gate.addEventListener('click', function (e) {
    if (e.target.closest('[data-close]')) gate.close();
    if (e.target.closest('[data-pickup]')) { MD.setSettlement('', 'pickup'); gate.close(); }
    if (e.target === gate) gate.close(); // לחיצה על הרקע
  });
  gate.addEventListener('close', function () { renderStatus(); var b = document.getElementById('change-settlement'); b && b.focus(); });
  document.getElementById('change-settlement').addEventListener('click', openGate);

  renderStatus();
  // לקוח חוזר (יש פרופיל או בחירה שמורה) — לא מקפיצים את החלון
  var profile = MD.profile.get();
  if (!MD.getSettlement() && !(profile && profile.settlement)) {
    setTimeout(openGate, 400);
  } else if (!MD.getSettlement() && profile && profile.settlement) {
    MD.setSettlement(profile.settlement, MD.findSettlement(profile.settlement) ? 'delivery' : 'pickup');
    renderStatus();
  }

  // ── רשת מוצרים וסינון ──
  var filterBar = document.getElementById('cat-filter');
  var countEl = document.getElementById('result-count');
  var current = (location.hash || '').replace('#', '') || 'all';
  if (!MD.categories.some(function (c) { return c.id === current; })) current = 'all';

  MD.categories.forEach(function (c) {
    var b = document.createElement('button');
    b.type = 'button'; b.className = 'chip'; b.textContent = c.label; b.dataset.cat = c.id;
    b.setAttribute('aria-pressed', String(c.id === current));
    filterBar.appendChild(b);
  });
  filterBar.addEventListener('click', function (e) {
    var b = e.target.closest('button'); if (!b) return;
    current = b.dataset.cat;
    filterBar.querySelectorAll('button').forEach(function (x) { x.setAttribute('aria-pressed', String(x === b)); });
    history.replaceState(null, '', current === 'all' ? location.pathname : '#' + current);
    renderGrid(true);
  });

  function priceLine(p) {
    if (p.sale_type === 'portion') return MD.money(p.price) + ' <span class="unit">ל-' + p.portion_grams + ' גרם</span>';
    return MD.money(p.price) + ' <span class="unit">ל' + (p.unit_label || 'יחידה') + '</span>';
  }

  function renderGrid(announce) {
    var list = MD.products.filter(function (p) { return current === 'all' || p.cat === current; });
    grid.innerHTML = list.map(function (p) {
      return '<li class="product-card">' +
        '<div class="product-card__media"><img src="' + p.image + '" alt="" loading="lazy" width="400" height="400" onerror="this.onerror=null;this.src=\'assets/img/placeholder.svg\'"></div>' +
        '<div class="product-card__body">' +
          '<h3 class="product-card__title">' + p.name + '</h3>' +
          '<p class="product-card__unit">' + (p.sale_type === 'portion' ? 'נחתכת לפי משקל · מנות של ' + p.portion_grams + ' גרם' : (p.unit_label || 'יחידה')) + '</p>' +
          '<p class="product-card__price">' + priceLine(p) + '</p>' +
          (p.per100 ? '<p class="product-card__per100">' + MD.money(p.per100) + ' ל-100 ' + (p.per100unit || 'גרם') + '</p>' : '') +
          '<button type="button" class="btn btn--primary btn--block" data-quick="' + p.id + '" aria-haspopup="dialog">' +
            'הוספה לסל<span class="visually-hidden">: ' + p.name + '</span></button>' +
        '</div></li>';
    }).join('');
    countEl.textContent = 'מוצגים ' + list.length + ' מוצרים';
    if (announce) MD.announce(countEl.textContent);
  }
  renderGrid(false);

  // ── תצוגה מהירה ──
  var qv = document.getElementById('quickview');
  var qvForm = document.getElementById('qv-form');
  var qvQty = document.getElementById('qv-qty');
  var qvTotal = document.getElementById('qv-total');
  var lastTrigger = null, qvProduct = null;

  grid.addEventListener('click', function (e) {
    var b = e.target.closest('[data-quick]'); if (!b) return;
    lastTrigger = b; openQuickView(MD.product(b.dataset.quick));
  });

  function openQuickView(p) {
    qvProduct = p;
    qv.querySelector('#qv-title').textContent = p.name;
    var img = qv.querySelector('.qv__media img');
    img.src = p.image; img.alt = 'גבינת ' + p.name;
    img.onerror = function () { img.onerror = null; img.src = 'assets/img/placeholder.svg'; };
    qv.querySelector('.qv__desc').textContent = p.desc;
    qv.querySelector('.qv__unit').innerHTML = p.sale_type === 'portion'
      ? '<strong>יחידת קנייה:</strong> לפי משקל — הגבינה נחתכת במשק למנות של כ-' + p.portion_grams + ' גרם.'
      : '<strong>יחידת קנייה:</strong> ' + (p.unit_label || 'יחידה') + (p.grams ? ' (כ-' + p.grams + ' גרם)' : '') + '.';
    qv.querySelector('.qv__price').innerHTML = priceLine(p) +
      (p.per100 ? ' · ' + MD.money(p.per100) + ' ל-100 ' + (p.per100unit || 'גרם') : '');
    qv.querySelector('[for="qv-qty"]').textContent = p.sale_type === 'portion' ? 'משקל' : 'כמות';
    qvQty.innerHTML = MD.qtyOptions(p).map(function (o) {
      return '<option value="' + o.value + '">' + o.label + ' — ' + MD.money(o.value * p.price) + '</option>';
    }).join('');
    updateTotal();
    qv.showModal();
  }
  function updateTotal() { qvTotal.textContent = MD.money(qvProduct.price * (+qvQty.value)); }
  qvQty.addEventListener('change', updateTotal);

  qvForm.addEventListener('submit', function (e) {
    e.preventDefault();
    var qty = +qvQty.value;
    MD.cart.add(qvProduct.id, qty);
    qv.close();
    toast('נוסף לסל: ' + qvProduct.name + ', ' + MD.qtyLabel(qvProduct, qty));
  });
  qv.addEventListener('click', function (e) { if (e.target === qv || e.target.closest('[data-close]')) qv.close(); });
  qv.addEventListener('close', function () { if (lastTrigger) lastTrigger.focus(); });

  // ── הודעה קופצת (לא חוסמת) ──
  var toastEl = document.getElementById('toast');
  var toastTimer;
  function toast(msg) {
    toastEl.querySelector('.toast__msg').textContent = msg;
    toastEl.hidden = false;
    MD.announce(msg);
    clearTimeout(toastTimer);
    toastTimer = setTimeout(function () { toastEl.hidden = true; }, 8000);
  }
  toastEl.querySelector('[data-dismiss]').addEventListener('click', function () { toastEl.hidden = true; });

  function escapeHtml(s) { return String(s).replace(/[&<>"']/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]; }); }
})();
