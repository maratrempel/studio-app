/* משק דוד — טופס יצירת קשר (אב-טיפוס: ללא שליחה לשרת). בוורדפרס: Contact Form 7 / Fluent Forms. */
(function () {
  var f = document.getElementById('contact-form'); if (!f) return;
  f.addEventListener('submit', function (e) {
    e.preventDefault();
    var st = document.getElementById('contact-status'), first = null;
    [['c-name', 'נא למלא שם מלא.'], ['c-phone', 'נא למלא מספר טלפון.']].forEach(function (x) {
      var el = document.getElementById(x[0]), err = document.getElementById(x[0] + '-err');
      if (!err) { err = document.createElement('p'); err.id = x[0] + '-err'; err.className = 'field-msg field-msg--error'; el.after(err); el.setAttribute('aria-describedby', err.id); }
      if (!el.value.trim()) { err.textContent = x[1]; el.setAttribute('aria-invalid', 'true'); first = first || el; }
      else { err.textContent = ''; el.removeAttribute('aria-invalid'); }
    });
    if (first) { first.focus(); return; }
    st.className = 'field-msg field-msg--ok';
    st.textContent = 'תודה! הפנייה התקבלה ונחזור אליכם בהקדם.';
    f.reset();
  });
})();
