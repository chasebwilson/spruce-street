/* Spruce Street — V4 page behavior (no dependencies) */
(function () {
  'use strict';

  var head = document.querySelector('.site-head');
  var onScroll = function () {
    if (head) head.classList.toggle('is-stuck', window.scrollY > 4);
  };
  onScroll();
  window.addEventListener('scroll', onScroll, { passive: true });

  var toggle = document.querySelector('.menu-toggle');
  var mobileNav = document.getElementById('mobile-nav');
  if (toggle && mobileNav) {
    toggle.addEventListener('click', function () {
      var open = mobileNav.classList.toggle('is-open');
      toggle.setAttribute('aria-expanded', String(open));
      toggle.textContent = open ? 'Close' : 'Menu';
    });
    mobileNav.addEventListener('click', function (event) {
      if (!event.target.closest('a')) return;
      mobileNav.classList.remove('is-open');
      toggle.setAttribute('aria-expanded', 'false');
      toggle.textContent = 'Menu';
    });
  }

  var revealEls = Array.prototype.slice.call(document.querySelectorAll('.reveal'));
  var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (revealEls.length) {
    if (reduceMotion || !('IntersectionObserver' in window) || document.visibilityState === 'hidden') {
      revealEls.forEach(function (el) { el.classList.add('is-in'); });
    } else {
      var revealObserver = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
          if (!entry.isIntersecting) return;
          entry.target.classList.add('is-in');
          revealObserver.unobserve(entry.target);
        });
      }, { rootMargin: '0px 0px -7% 0px', threshold: 0.04 });
      revealEls.forEach(function (el) { revealObserver.observe(el); });
    }
  }

  var sections = Array.prototype.slice.call(document.querySelectorAll('main section[id]'));
  var links = {};
  Array.prototype.forEach.call(document.querySelectorAll('.head-nav a[href^="#"]:not(.btn)'), function (link) {
    links[link.getAttribute('href').slice(1)] = link;
  });
  if (sections.length && 'IntersectionObserver' in window) {
    var current = null;
    var sectionObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        if (current) current.classList.remove('is-active');
        current = links[entry.target.id] || null;
        if (current) current.classList.add('is-active');
      });
    }, { rootMargin: '-35% 0px -55% 0px', threshold: 0 });
    sections.forEach(function (section) { sectionObserver.observe(section); });
  }
})();
