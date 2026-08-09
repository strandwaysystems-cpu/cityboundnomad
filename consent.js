/*
 * CityboundNomad — consent manager.
 *
 * Google Consent Mode v2, defaults denied, fail-closed: if storage is
 * unavailable or no choice has been recorded, nothing non-essential loads.
 * Implements the CONFIG-block shape described in
 * strandway-ventures/docs/analytics-privacy-standard.md §2.
 *
 * NOTE: the portfolio's reference implementation lives in the
 * `stay-albanian-riviera` repo, and the standard's rule is that the body of
 * this file is never forked per site — only CONFIG changes. This copy was
 * written from the spec because the reference repo was not reachable during the
 * build. When convenient, replace the body below with the portfolio copy and
 * re-set CONFIG; the markup in src/components/CookieBanner.astro already uses
 * the shared hooks (#cookie-banner, [data-consent]).
 */
(function () {
  var CONFIG = {
    brand: 'CityboundNomad',
    gaId: '', // per-site GA4 Measurement ID, e.g. 'G-XXXXXXXXXX'
    crazyEggSrc: '',
    privacyUrl: '/privacy-policy',
    cookiePolicyUrl: '/cookie-policy',
    cookieName: 'sw_consent_v1',
    consentVersion: 1,
    /* Advanced mode loads gtag for everyone with all storage denied, so Google
       can model the traffic of visitors who never answer. Set false for the
       stricter mode where gtag does not load at all before opt-in. */
    analyticsAdvancedMode: false,
  };

  var banner = document.getElementById('cookie-banner');

  window.dataLayer = window.dataLayer || [];
  function gtag() {
    dataLayer.push(arguments);
  }
  window.gtag = gtag;

  gtag('consent', 'default', {
    ad_storage: 'denied',
    ad_user_data: 'denied',
    ad_personalization: 'denied',
    analytics_storage: 'denied',
    functionality_storage: 'granted',
    security_storage: 'granted',
    wait_for_update: 500,
  });

  function readStored() {
    try {
      var raw = localStorage.getItem(CONFIG.cookieName);
      if (!raw) return null;
      var parsed = JSON.parse(raw);
      // A stored decision from an older policy version is not a decision.
      if (parsed.v !== CONFIG.consentVersion) return null;
      return parsed;
    } catch (e) {
      return null; // storage blocked → fail closed
    }
  }

  function loadScript(src) {
    if (!src) return;
    var s = document.createElement('script');
    s.src = src;
    s.async = true;
    document.head.appendChild(s);
  }

  var analyticsLoaded = false;

  function loadAnalytics() {
    if (analyticsLoaded) return;
    analyticsLoaded = true;

    if (CONFIG.gaId) {
      loadScript('https://www.googletagmanager.com/gtag/js?id=' + CONFIG.gaId);
      gtag('js', new Date());
      gtag('config', CONFIG.gaId, {
        anonymize_ip: true,
        allow_google_signals: false,
      });
    }
    loadScript(CONFIG.crazyEggSrc);
  }

  function apply(state) {
    gtag('consent', 'update', {
      analytics_storage: state.analytics ? 'granted' : 'denied',
      ad_storage: state.marketing ? 'granted' : 'denied',
      ad_user_data: state.marketing ? 'granted' : 'denied',
      ad_personalization: state.marketing ? 'granted' : 'denied',
    });
    if (state.analytics) loadAnalytics();
  }

  function save(state) {
    state.v = CONFIG.consentVersion;
    state.ts = Date.now();
    try {
      localStorage.setItem(CONFIG.cookieName, JSON.stringify(state));
    } catch (e) {
      /* storage blocked — the choice applies to this page view only */
    }
    apply(state);
    if (banner) banner.classList.remove('is-visible');
  }

  // Advanced mode: gtag loads for everyone, cookieless until consent.
  if (CONFIG.analyticsAdvancedMode && CONFIG.gaId) loadAnalytics();

  var stored = readStored();
  if (stored) {
    apply(stored);
  } else if (banner) {
    setTimeout(function () {
      banner.classList.add('is-visible');
    }, 800);
  }

  document.addEventListener('click', function (e) {
    var btn = e.target.closest('[data-consent]');
    if (!btn) return;
    var choice = btn.getAttribute('data-consent') === 'accept';
    save({ analytics: choice, marketing: choice });
  });
})();
