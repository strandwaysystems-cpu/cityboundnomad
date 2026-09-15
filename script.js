/*
 * CityboundNomad — presentation behaviour + outbound click tracking.
 *
 * Motion rules come from Emil Kowalski's design-engineering system; the CSS
 * holds the curves and durations, this file only decides *when* things run.
 *
 *   1. Header scroll edge, and the mobile nav (open, and every way out of it).
 *   2. Outbound, affiliate and contact clicks, sent to Plausible as custom
 *      events. No-ops if Plausible has not loaded.
 *
 * There is no reveal machinery here. The site's one entrance is the hero's, it
 * is authored in CSS, it runs on load, and it never hides content.
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

  /* ── 2. Click tracking ───────────────────────────────────────────────── */
  /* Custom Plausible events. Each one needs a matching goal in the Plausible
     dashboard before it shows up in reports; until then the calls are
     harmless no-ops on their side. */
  document.addEventListener('click', function (e) {
    if (typeof window.plausible !== 'function') return;

    var link = e.target.closest('a[href]');
    if (!link) return;

    var href = link.getAttribute('href') || '';

    if (href.indexOf('mailto:') === 0) {
      window.plausible('Contact click', {
        props: { address: href.replace('mailto:', '') },
      });
      return;
    }

    var isExternal = link.hostname && link.hostname !== location.hostname;
    if (!isExternal) return;

    var sponsored = (link.getAttribute('rel') || '').indexOf('sponsored') !== -1;
    window.plausible(sponsored ? 'Affiliate click' : 'Outbound click', {
      props: { url: link.href, domain: link.hostname },
    });
  });
})();
