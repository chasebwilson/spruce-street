/* Spruce Street — V4 page behavior (no dependencies) */
(function () {
  'use strict';

  var head = document.querySelector('.site-head');
  var onScroll = function () {
    if (head) head.classList.toggle('is-stuck', window.scrollY > 4);
  };
  onScroll();
  window.addEventListener('scroll', onScroll, { passive: true });

  /* The wordmark links to #top, but .site-head is position:sticky, so once it is
     stuck its box is already at the top of the viewport and the browser decides
     no scrolling is needed -- the click does nothing. Scroll explicitly instead. */
  var brand = document.querySelector('a.brand[href^="#"]');
  if (brand) {
    brand.addEventListener('click', function (event) {
      event.preventDefault();
      var reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      window.scrollTo({ top: 0, behavior: reduced ? 'auto' : 'smooth' });
      if (window.history && history.replaceState) {
        history.replaceState(null, '', location.pathname + location.search);
      }
    });
  }

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

  var form = document.getElementById('contact-form');
  var status = document.getElementById('form-status');
  if (form && status) {
    var button = form.querySelector('button[type="submit"]');
    var say = function (msg, cls) {
      status.textContent = msg;
      status.className = 'form-status' + (cls ? ' ' + cls : '');
    };
    form.addEventListener('submit', function (event) {
      event.preventDefault();
      if (!form.checkValidity()) {
        var firstBad = form.querySelector(':invalid');
        if (firstBad) firstBad.focus();
        say('Please fill in your name, a valid email, and a message.', 'is-error');
        return;
      }
      if (form.action.indexOf('REPLACE_WITH_FORM_ID') !== -1) {
        say('This form is not connected to a delivery service yet.', 'is-error');
        return;
      }
      button.disabled = true;
      say('Sending…');
      fetch(form.action, {
        method: 'POST',
        body: new FormData(form),
        headers: { Accept: 'application/json' }
      }).then(function (response) {
        if (!response.ok) throw new Error(response.status);
        form.innerHTML = '<p class="form-sent">Thank you — your message is on its way. ' +
          'One of us will be in touch.</p>';
      }).catch(function () {
        button.disabled = false;
        say('That did not send. Please email ty@sprucestreetrecovery.com directly.', 'is-error');
      });
    });
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
