/* משק דוד — עמוד סל הקניות */
(function () {
  'use strict';
  var MD = window.MD;
  var root = document.getElementById('cart-root');
  if (!root) return;

  function fee() {
    var s = MD.getSettlement();
    if (!s || s.mode === 'pickup') return 0;
    var f = MD.findSettlement(s.name); return f ? f.fee : 0;
  }

  function render() {
    var items = MD.cart.items();
    if (!items.length) {
      root.innerHTML = '<div class="empty-state"><p>הסל שלכם ריק.</p><a class="btn btn--primary" href="shop.html">למעבר לחנות</a></div>';
      return;
    }
    var s = MD.getSettlement();
    var rows = items.map(function (l) {
      var p = MD.product(l.id); if (!p) return '';
      var opts = MD.qtyOptions(p).map(function (o) {
        return '<option value="' + o.value + '"' + (o.value === l.qty ? ' selected' : '') + '>' + o.label + '</option>';
      }).join('');
      return '<tr>' +
        '<th scope="row">' + p.name + '<span class="cart-unit">' + (p.sale_type === 'portion' ? 'נחתכת · ' + MD.money(p.price) + ' ל-' + p.portion_grams + ' גרם' : MD.money(p.price) + ' ל' + (p.unit_label || 'יחידה')) + '</span></th>' +
        '<td><label class="visually-hidden" for="q-' + p.id + '">' + (p.sale_type === 'portion' ? 'משקל' : 'כמות') + ' עבור ' + p.name + '</label>' +
          '<select id="q-' + p.id + '" data-qty="' + p.id + '">' + opts + '</select></td>' +
        '<td>' + MD.money(p.price * l.qty) + '</td>' +
        '<td><button type="button" class="link-btn" data-remove="' + p.id + '">הסרה<span class="visually-hidden"> של ' + p.name + ' מהסל</span></button></td>' +
        '</tr>';
    }).join('');
    var sub = MD.cart.subtotal(), f = fee();
    root.innerHTML =
      '<table class="cart-table"><caption class="visually-hidden">פריטים בסל</caption>' +
      '<thead><tr><th scope="col">מוצר</th><th scope="col">כמות</th><th scope="col">סה״כ</th><th scope="col"><span class="visually-hidden">פעולות</span></th></tr></thead>' +
      '<tbody>' + rows + '</tbody></table>' +
      '<div class="cart-summary">' +
        '<p class="delivery-note">' + MD.deliveryText() + '</p>' +
        '<dl>' +
          '<div><dt>סכום ביניים</dt><dd>' + MD.money(sub) + '</dd></div>' +
          '<div><dt>' + (s && s.mode === 'delivery' ? 'משלוח ל' + s.name : s && s.mode === 'pickup' ? 'איסוף עצמי' : 'משלוח') + '</dt><dd>' +
            (s ? (f ? MD.money(f) : 'ללא עלות') : 'ייקבע בקופה') + '</dd></div>' +
          '<div class="total"><dt>סה״כ לתשלום</dt><dd>' + MD.money(sub + f) + '</dd></div>' +
        '</dl>' +
        '<a class="btn btn--primary btn--block" href="checkout.html">להמשך לתשלום</a>' +
        '<a class="btn btn--ghost btn--block" href="shop.html">להמשך קנייה</a>' +
      '</div>';
  }

  root.addEventListener('change', function (e) {
    var sel = e.target.closest('[data-qty]'); if (!sel) return;
    var id = sel.dataset.qty; MD.cart.setQty(id, +sel.value); render();
    MD.announce('הסל עודכן. סה״כ ביניים ' + MD.money(MD.cart.subtotal()));
    var again = document.getElementById('q-' + id); again && again.focus();
  });
  root.addEventListener('click', function (e) {
    var b = e.target.closest('[data-remove]'); if (!b) return;
    var p = MD.product(b.dataset.remove); MD.cart.remove(p.id); render();
    MD.announce(p.name + ' הוסר מהסל');
    var h = document.querySelector('h1'); h.setAttribute('tabindex', '-1'); h.focus();
  });
  render();
})();
