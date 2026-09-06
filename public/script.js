/*
 * CityboundNomad — presentation behaviour + outbound click tracking.
 *
 * Motion rules come from Emil Kowalski's design-engineering system; the CSS
 * holds the curves and durations, this file only decides *when* things run.
 *
 *   1. Header scroll edge, and the mobile nav (open, and every way out of it).
 *   2. Scroll reveals, staggered per batch.
 *   3. GA4 click events, which no-op entirely until consent is granted.
 */
(function () {
  'use strict';

  /* ── 1. Header ───────────────────────────────────────────────────────── */
  var header = document.querySelector('[data-site-header]');
  if (header) {
    var scrolled = null;
    var onScroll = function () {
      var next = window.scrollY > 24;
      // Only touch the class list when the state actually changes: a write on
      // every scroll event invalidates style for the whole subtree.
      if (next === scrolled) return;
      scrolled = next;
      header.classList.toggle('is-scrolled', next);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
  }

  var toggle = document.querySelector('[data-nav-toggle]');
  var mobileNav = document.querySelector('[data-nav-mobile]');
  if (toggle && mobileNav) {
    var iconOpen = toggle.querySelector('[data-nav-icon="open"]');
    var iconClose = toggle.querySelector('[data-nav-icon="close"]');

    var setNav = function (open) {
      mobileNav.classList.toggle('is-open', open);
      // The bar goes opaque with the panel so the two read as one surface
      if (header) header.classList.toggle('is-nav-open', open);
      toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
      if (iconOpen) iconOpen.hidden = open;
      if (iconClose) iconClose.hidden = !open;
    };

    var isOpen = function () {
      return mobileNav.classList.contains('is-open');
    };

    toggle.addEventListener('click', function () {
      setNav(!isOpen());
    });

    // Every way out. A panel you can only close by hitting the same 36px button
    // again is a trap, and the two cheap exits are Escape and tapping away.
    document.addEventListener('keydown', function (e) {
      if (e.key !== 'Escape' || !isOpen()) return;
      setNav(false);
      toggle.focus();
    });

    document.addEventListener('click', function (e) {
      if (!isOpen()) return;
      if (mobileNav.contains(e.target) || toggle.contains(e.target)) return;
      setNav(false);
    });

    // Reaching a desktop width while it is open would otherwise leave the panel
    // hidden but still flagged open, so the next toggle click does nothing.
    var wide = window.matchMedia('(min-width: 768px)');
    var onWide = function (e) {
      if (e.matches && isOpen()) setNav(false);
    };
    if (wide.addEventListener) wide.addEventListener('change', onWide);
    else if (wide.addListener) wide.addListener(onWide);
  }

  /* ── 2. Scroll reveals ───────────────────────────────────────────────── */
  /* The inline head script decides whether the effect runs at all and marks the
     document with .has-scroll-fx. If it isn't there, the elements are already
     visible and there is nothing to do. */
  var faders = document.querySelectorAll('.fade-in');

  if (document.documentElement.classList.contains('has-scroll-fx') && faders.length) {
    // 60ms between items reads as a cascade; a longer gap reads as a queue.
    // Capped at four steps so a wide grid never keeps its last card waiting.
    var STEP = 60;
    var MAX_STEPS = 4;

    var reveal = function (el, step) {
      if (step) el.style.setProperty('--stagger', step + 'ms');
      el.classList.add('is-visible');
    };

    var observer = new IntersectionObserver(
      function (entries) {
        // Entries arrive in an arbitrary order; stagger has to follow the order
        // things sit on the page or the cascade runs sideways.
        var showing = entries
          .filter(function (entry) {
            return entry.isIntersecting;
          })
          .sort(function (a, b) {
            return a.boundingClientRect.top - b.boundingClientRect.top;
          });

        showing.forEach(function (entry, i) {
          reveal(entry.target, Math.min(i, MAX_STEPS) * STEP);
          observer.unobserve(entry.target);
        });
      },
      // A generous bottom margin so a section is already fading in as it comes
      // up, rather than popping once it is a fifth of the way onto the screen.
      { threshold: 0, rootMargin: '0px 0px -10% 0px' }
    );

    Array.prototype.forEach.call(faders, function (el) {
      observer.observe(el);
    });

    // Safety net: anything still hidden after the page settles gets revealed
    // regardless. An animation is never worth losing content over.
    window.addEventListener('load', function () {
      setTimeout(function () {
        Array.prototype.forEach.call(document.querySelectorAll('.fade-in'), function (el) {
          reveal(el, 0);
        });
      }, 2500);
    });
  }

  /* ── 3. Click tracking ───────────────────────────────────────────────── */
  document.addEventListener('click', function (e) {
    if (typeof window.gtag !== 'function') return;

    var link = e.target.closest('a[href]');
    if (!link) return;

    var href = link.getAttribute('href') || '';

    if (href.indexOf('mailto:') === 0) {
      window.gtag('event', 'contact_click', { event_label: href.replace('mailto:', '') });
      return;
    }

    var isExternal = link.hostname && link.hostname !== location.hostname;
    if (!isExternal) return;

    var sponsored = (link.getAttribute('rel') || '').indexOf('sponsored') !== -1;
    window.gtag('event', sponsored ? 'affiliate_click' : 'outbound_click', {
      link_url: link.href,
      link_domain: link.hostname,
    });
  });
})();
