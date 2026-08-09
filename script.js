/*
 * CityboundNomad — presentation behaviour + outbound click tracking.
 *
 * Three jobs, none of which require a framework:
 *   1. Header state on scroll, and the mobile nav toggle.
 *   2. Scroll-triggered fade-ins (skipped under prefers-reduced-motion).
 *   3. The tabs on /travel, kept accessible and deep-linkable.
 *   4. GA4 click events, which no-op entirely until consent is granted.
 */
(function () {
  'use strict';

  /* ── 1. Header ───────────────────────────────────────────────────────── */
  var header = document.querySelector('[data-site-header]');
  if (header) {
    var onScroll = function () {
      header.classList.toggle('is-scrolled', window.scrollY > 40);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
  }

  var toggle = document.querySelector('[data-nav-toggle]');
  var mobileNav = document.querySelector('[data-nav-mobile]');
  if (toggle && mobileNav) {
    var iconOpen = toggle.querySelector('[data-nav-icon="open"]');
    var iconClose = toggle.querySelector('[data-nav-icon="close"]');
    toggle.addEventListener('click', function () {
      var open = mobileNav.classList.toggle('is-open');
      toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
      if (iconOpen) iconOpen.hidden = open;
      if (iconClose) iconClose.hidden = !open;
    });
  }

  /* ── 2. Fade-ins ─────────────────────────────────────────────────────── */
  /* The inline head script decides whether the effect runs at all and marks the
     document with .has-scroll-fx. If it isn't there, the elements are already
     visible and there is nothing to do. */
  var faders = document.querySelectorAll('.fade-in');

  if (document.documentElement.classList.contains('has-scroll-fx') && faders.length) {
    var reveal = function (el) {
      el.classList.add('is-visible');
    };

    var observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            reveal(entry.target);
            observer.unobserve(entry.target);
          }
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
        Array.prototype.forEach.call(document.querySelectorAll('.fade-in'), reveal);
      }, 2500);
    });
  }

  /* ── 3. Tabs ─────────────────────────────────────────────────────────── */
  var tabs = document.querySelectorAll('[role="tab"]');
  if (tabs.length) {
    var select = function (tab) {
      Array.prototype.forEach.call(tabs, function (t) {
        var selected = t === tab;
        t.setAttribute('aria-selected', selected ? 'true' : 'false');
        var panel = document.getElementById(t.getAttribute('aria-controls'));
        if (panel) panel.hidden = !selected;
      });
    };

    Array.prototype.forEach.call(tabs, function (tab) {
      tab.addEventListener('click', function () {
        select(tab);
      });
      tab.addEventListener('keydown', function (e) {
        if (e.key !== 'ArrowRight' && e.key !== 'ArrowLeft') return;
        e.preventDefault();
        var list = Array.prototype.slice.call(tabs);
        var next = list[(list.indexOf(tab) + (e.key === 'ArrowRight' ? 1 : -1) + list.length) % list.length];
        next.focus();
        select(next);
      });
    });

    // Deep links: /travel#stays opens the stay-logs tab.
    if (location.hash === '#stays') {
      var stayTab = document.getElementById('tab-stays');
      if (stayTab) select(stayTab);
    }
  }

  /* ── 4. Click tracking ───────────────────────────────────────────────── */
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
