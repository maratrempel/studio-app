/*
 * משק דוד — רכיבים כלליים: תפריט נייד, סרגל נגישות, מונה עגלה, פס משלוח.
 */
(function () {
  'use strict';
  var MD = window.MD;
  var doc = document.documentElement;

  // ── תפריט ניווט נייד (disclosure) ──
  var navBtn = document.querySelector('.nav-toggle');
  var nav = document.getElementById('primary-nav');
  if (navBtn && nav) {
    navBtn.addEventListener('click', function () {
      var open = navBtn.getAttribute('aria-expanded') === 'true';
      navBtn.setAttribute('aria-expanded', String(!open));
      nav.classList.toggle('is-open', !open);
    });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && nav.classList.contains('is-open')) {
        navBtn.setAttribute('aria-expanded', 'false'); nav.classList.remove('is-open'); navBtn.focus();
      }
    });
  }

  // ── סימון העמוד הנוכחי בתפריט ──
  var here = location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.primary-nav a, .quick-menu a').forEach(function (a) {
    if (a.getAttribute('href') === here) a.setAttribute('aria-current', 'page');
  });

  // ── סרגל נגישות ──
  var A11Y_KEY = 'md_a11y';
  var prefs = {};
  try { prefs = JSON.parse(localStorage.getItem(A11Y_KEY)) || {}; } catch (e) {}
  var FLAGS = ['contrast', 'links', 'readable', 'noanim'];

  function apply() {
    doc.style.fontSize = prefs.scale ? (prefs.scale * 100) + '%' : '';
    FLAGS.forEach(function (f) { doc.classList.toggle('a11y-' + f, !!prefs[f]); });
    document.querySelectorAll('[data-a11y-toggle]').forEach(function (b) {
      b.setAttribute('aria-pressed', String(!!prefs[b.getAttribute('data-a11y-toggle')]));
    });
    try { localStorage.setItem(A11Y_KEY, JSON.stringify(prefs)); } catch (e) {}
  }
  apply();

  var a11yBtn = document.querySelector('.a11y-toggle');
  var a11yPanel = document.getElementById('a11y-panel');
  if (a11yBtn && a11yPanel) {
    function setPanel(open) {
      a11yBtn.setAttribute('aria-expanded', String(open)); a11yPanel.hidden = !open;
      if (open) a11yPanel.querySelector('button').focus();
    }
    a11yBtn.addEventListener('click', function () { setPanel(a11yPanel.hidden); });
    a11yPanel.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') { setPanel(false); a11yBtn.focus(); }
    });
    a11yPanel.addEventListener('click', function (e) {
      var b = e.target.closest('button'); if (!b) return;
      var act = b.getAttribute('data-a11y');
      var t = b.getAttribute('data-a11y-toggle');
      if (act === 'bigger') prefs.scale = Math.min((prefs.scale || 1) + 0.125, 2);
      if (act === 'smaller') prefs.scale = Math.max((prefs.scale || 1) - 0.125, 0.875);
      if (act === 'reset') prefs = {};
      if (act === 'close') { setPanel(false); a11yBtn.focus(); return; }
      if (t) prefs[t] = !prefs[t];
      apply();
      MD.announce && MD.announce(act === 'reset' ? 'הגדרות הנגישות אופסו' : 'ההגדרה עודכנה');
    });
  }

  // ── מונה עגלה ──
  function updateCartBadge() {
    var n = MD.cart.count();
    document.querySelectorAll('.cart-count').forEach(function (el) { el.textContent = n; });
    document.querySelectorAll('.cart-link').forEach(function (a) {
      a.setAttribute('aria-label', 'סל הקניות, ' + (n === 0 ? 'ריק' : n + ' פריטים'));
    });
  }
  updateCartBadge(); MD.on('cart', updateCartBadge);

  // ── פס מועד משלוח ──
  document.querySelectorAll('[data-delivery-text]').forEach(function (el) { el.textContent = MD.deliveryText(); });

  // ── אזור אישי: שם לקוח בכותרת ──
  var prof = MD.profile.get();
  var acc = document.querySelector('.account-link .account-label');
  if (acc && prof && prof.firstName) acc.textContent = 'שלום, ' + prof.firstName;

  // ── שנה בפוטר ──
  document.querySelectorAll('[data-year]').forEach(function (el) { el.textContent = new Date().getFullYear(); });
})();
