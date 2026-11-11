/*
 * שדה בחירת יישוב — ARIA 1.2 combobox עם השלמה אוטומטית.
 * שימוש: <div class="combo" data-combo> <input role="combobox"…> <ul role="listbox"…> </div>
 * מקלדת: חצים למעלה/למטה, Enter לבחירה, Esc לסגירה.
 */
(function () {
  'use strict';
  var MD = window.MD;

  function norm(s) { return String(s || '').replace(/[\-–־'"׳״\s]/g, '').toLowerCase(); }

  MD.initCombo = function (root, opts) {
    opts = opts || {};
    var input = root.querySelector('input');
    var list = root.querySelector('[role="listbox"]');
    var status = root.querySelector('.combo__status');
    var active = -1, matches = [];

    function close() {
      list.hidden = true; input.setAttribute('aria-expanded', 'false');
      input.removeAttribute('aria-activedescendant'); active = -1;
    }
    function render() {
      var q = norm(input.value);
      matches = MD.settlements.filter(function (s) { return !q || norm(s.name).indexOf(q) !== -1; }).slice(0, 8);
      list.innerHTML = '';
      matches.forEach(function (s, i) {
        var li = document.createElement('li');
        li.id = list.id + '-opt-' + i; li.setAttribute('role', 'option'); li.textContent = s.name;
        li.addEventListener('mousedown', function (e) { e.preventDefault(); choose(i); });
        list.appendChild(li);
      });
      var exact = matches.length === 1 && norm(matches[0].name) === q;
      var open = matches.length > 0 && input.value.trim() !== '' && !exact;
      list.hidden = !open; input.setAttribute('aria-expanded', open ? 'true' : 'false');
      if (status) {
        status.textContent = input.value.trim() === '' ? '' :
          (matches.length ? matches.length + ' יישובים נמצאו. השתמשו בחצים לבחירה.' : 'היישוב לא נמצא ברשימת המשלוחים.');
      }
    }
    function highlight(i) {
      var opts_ = list.querySelectorAll('[role="option"]');
      opts_.forEach(function (o) { o.setAttribute('aria-selected', 'false'); });
      if (i < 0 || i >= opts_.length) return;
      active = i; opts_[i].setAttribute('aria-selected', 'true');
      input.setAttribute('aria-activedescendant', opts_[i].id);
      opts_[i].scrollIntoView({ block: 'nearest' });
    }
    function choose(i) {
      input.value = matches[i].name; close();
      if (opts.onSelect) opts.onSelect(matches[i]);
      input.dispatchEvent(new Event('change', { bubbles: true }));
    }

    input.addEventListener('input', function () { render(); if (opts.onInput) opts.onInput(); });
    input.addEventListener('keydown', function (e) {
      if (e.key === 'ArrowDown') { e.preventDefault(); if (list.hidden) render(); highlight(Math.min(active + 1, matches.length - 1)); }
      else if (e.key === 'ArrowUp') { e.preventDefault(); highlight(Math.max(active - 1, 0)); }
      else if (e.key === 'Enter' && !list.hidden && active > -1) { e.preventDefault(); choose(active); }
      else if (e.key === 'Escape' && !list.hidden) { e.preventDefault(); e.stopPropagation(); close(); }
    });
    input.addEventListener('blur', function () { setTimeout(close, 120); });

    return {
      value: function () { return input.value.trim(); },
      set: function (v) { input.value = v || ''; },
      input: input
    };
  };
})();
