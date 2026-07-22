/* ד"ר יוסף קובלסקי — Interactions */
(function () {
  'use strict';

  /* ── Mobile nav toggle ── */
  var toggle = document.getElementById('navToggle');
  var nav = document.getElementById('mainNav');
  if (toggle && nav) {
    toggle.addEventListener('click', function () {
      var open = nav.classList.toggle('is-open');
      toggle.classList.toggle('is-open', open);
      toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
    });
    // Close when a link is clicked
    nav.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', function () {
        nav.classList.remove('is-open');
        toggle.classList.remove('is-open');
        toggle.setAttribute('aria-expanded', 'false');
      });
    });
  }

  /* ── Testimonials carousel ── */
  var track = document.getElementById('testiTrack');
  if (track) {
    var slides = track.children.length;
    var index = 0;
    var dotsWrap = document.getElementById('testiDots');
    var prev = document.getElementById('testiPrev');
    var next = document.getElementById('testiNext');
    var timer;

    // Build dots
    var dots = [];
    for (var i = 0; i < slides; i++) {
      var b = document.createElement('button');
      b.type = 'button';
      b.setAttribute('aria-label', 'המלצה ' + (i + 1));
      (function (n) { b.addEventListener('click', function () { goTo(n); restart(); }); })(i);
      dotsWrap.appendChild(b);
      dots.push(b);
    }

    function goTo(n) {
      index = (n + slides) % slides;
      // RTL: positive translate moves the track to show later slides
      track.style.transform = 'translateX(' + (index * 100) + '%)';
      dots.forEach(function (d, di) { d.classList.toggle('is-active', di === index); });
    }
    function restart() { clearInterval(timer); timer = setInterval(function () { goTo(index + 1); }, 6000); }

    if (prev) prev.addEventListener('click', function () { goTo(index + 1); restart(); }); // RTL prev = next visually
    if (next) next.addEventListener('click', function () { goTo(index - 1); restart(); });

    goTo(0);
    restart();
  }

  /* ── Dynamic year ── */
  var y = document.getElementById('year');
  if (y) y.textContent = new Date().getFullYear();

  /* ── Header shadow on scroll ── */
  var header = document.getElementById('siteHeader');
  if (header) {
    window.addEventListener('scroll', function () {
      header.style.boxShadow = window.scrollY > 10 ? '0 4px 20px rgba(18,58,99,.08)' : 'none';
    });
  }
})();
