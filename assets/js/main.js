/* Porphyrian Tree — site behaviour: theme, translation, blog filters */
(function () {
  'use strict';

  var store = {
    get: function (k) { try { return localStorage.getItem(k); } catch (e) { return null; } },
    set: function (k, v) { try { localStorage.setItem(k, v); } catch (e) {} }
  };

  /* ---------- theme toggle ---------- */
  var themeBtn = document.querySelector('.theme-btn');
  if (themeBtn) {
    themeBtn.addEventListener('click', function () {
      var root = document.documentElement;
      var next = root.getAttribute('data-theme') === 'light' ? 'dark' : 'light';
      root.setAttribute('data-theme', next);
      store.set('pt-theme', next);
    });
  }

  /* ---------- translation (Google Translate) ----------
     Picking a language writes the `googtrans` cookie and reloads;
     on load, if that cookie names another language, the Google
     script is fetched and translates the page automatically.     */
  var SOURCE = window.PT_SOURCE || 'en';
  var LANGS = window.PT_LANGS || [];

  function currentLang() {
    var m = document.cookie.match(/(?:^|;\s*)googtrans=([^;]+)/);
    if (!m) return SOURCE;
    var parts = decodeURIComponent(m[1]).split('/');
    return parts[2] || SOURCE;
  }

  function writeCookie(value) {
    var host = location.hostname;
    var expire = value ? '' : '; expires=Thu, 01 Jan 1970 00:00:00 GMT';
    var v = value ? encodeURIComponent(value) : '';
    document.cookie = 'googtrans=' + v + '; path=/' + expire;
    if (host.indexOf('.') > -1 && !/^\d+\.\d+\.\d+\.\d+$/.test(host)) {
      var root = host.split('.').slice(-2).join('.');
      document.cookie = 'googtrans=' + v + '; path=/; domain=.' + root + expire;
      document.cookie = 'googtrans=' + v + '; path=/; domain=' + host + expire;
    }
  }

  function setLang(code) {
    if (code === currentLang()) return;
    writeCookie(code === SOURCE ? '' : '/' + SOURCE + '/' + code);
    location.reload();
  }

  var lang = document.querySelector('.lang');
  if (lang) {
    var btn = lang.querySelector('.lang-btn');
    var label = lang.querySelector('.lang-current');
    var cur = currentLang();
    label.textContent = cur.split('-')[0].toUpperCase() + (cur.indexOf('-') > -1 ? '·' + cur.split('-')[1] : '');
    lang.querySelectorAll('[data-lang]').forEach(function (b) {
      if (b.dataset.lang === cur) b.setAttribute('aria-current', 'true');
      b.addEventListener('click', function () { setLang(b.dataset.lang); });
    });
    function toggle(open) {
      lang.classList.toggle('open', open);
      btn.setAttribute('aria-expanded', String(open));
    }
    btn.addEventListener('click', function (e) { e.stopPropagation(); toggle(!lang.classList.contains('open')); });
    document.addEventListener('click', function (e) { if (!lang.contains(e.target)) toggle(false); });
    document.addEventListener('keydown', function (e) { if (e.key === 'Escape') toggle(false); });

    if (cur !== SOURCE) {
      var holder = document.createElement('div');
      holder.id = 'google_translate_element';
      document.body.appendChild(holder);
      window.googleTranslateElementInit = function () {
        new google.translate.TranslateElement({
          pageLanguage: SOURCE,
          includedLanguages: LANGS.join(','),
          autoDisplay: false
        }, 'google_translate_element');
      };
      var s = document.createElement('script');
      s.src = 'https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit';
      s.async = true;
      document.body.appendChild(s);
    }
  }

  /* ---------- home: grow the branches when scrolled into view ---------- */
  var branches = document.querySelector('.branches');
  if (branches) {
    if ('IntersectionObserver' in window) {
      branches.classList.add('will-grow');
      var io = new IntersectionObserver(function (entries) {
        if (entries[0].isIntersecting) { branches.classList.add('grown'); io.disconnect(); }
      }, { threshold: 0.25 });
      io.observe(branches);
    }
    /* redraw the curves in real pixels so each one lands on its card */
    var svg = branches.querySelector('.branch-lines');
    function layout() {
      if (!svg || !svg.clientWidth) return;
      var w = svg.clientWidth, h = svg.clientHeight, box = svg.getBoundingClientRect();
      var mid = w / 2, fork = h * 0.32;
      svg.setAttribute('viewBox', '0 0 ' + w + ' ' + h);
      svg.setAttribute('preserveAspectRatio', 'xMidYMid meet');
      svg.querySelector('.trunk-line').setAttribute('d', 'M' + mid + ' 0 V' + fork);
      branches.querySelectorAll('.branch').forEach(function (card) {
        var r = card.getBoundingClientRect();
        var x = r.left + r.width / 2 - box.left;
        var line = svg.querySelector('.branch-line[data-i="' + card.dataset.i + '"]');
        if (line) line.setAttribute('d', 'M' + mid + ' ' + fork + ' C' + mid + ' ' + (h * 0.7) + ', ' + x + ' ' + (h * 0.45) + ', ' + x + ' ' + h);
      });
    }
    layout();
    window.addEventListener('resize', layout);

    branches.querySelectorAll('.branch').forEach(function (card) {
      var line = branches.querySelector('.branch-line[data-i="' + card.dataset.i + '"]');
      var trunk = branches.querySelector('.trunk-line');
      if (!line) return;
      var on = function () { line.classList.add('lit'); trunk.classList.add('lit'); };
      var off = function () { line.classList.remove('lit'); trunk.classList.remove('lit'); };
      card.addEventListener('mouseenter', on); card.addEventListener('mouseleave', off);
      card.addEventListener('focus', on); card.addEventListener('blur', off);
    });
  }

  /* ---------- code block language labels ---------- */
  document.querySelectorAll('.prose div.highlighter-rouge').forEach(function (el) {
    var m = el.className.match(/language-(\w+)/);
    if (m && m[1] !== 'plaintext') el.setAttribute('data-lang', m[1]);
    el.classList.add('notranslate');
  });
  document.querySelectorAll('.prose pre, .prose code').forEach(function (el) { el.setAttribute('translate', 'no'); });

  /* ---------- blog: search + tag filter ---------- */
  var search = document.getElementById('post-search');
  var chips = document.querySelectorAll('.chip');
  if (search || chips.length) {
    var cards = document.querySelectorAll('.year-group .card');
    var groups = document.querySelectorAll('.year-group');
    var empty = document.querySelector('.empty');
    var activeTag = new URLSearchParams(location.search).get('tag');
    activeTag = activeTag ? activeTag.toLowerCase() : '';

    function apply() {
      var q = (search && search.value || '').trim().toLowerCase();
      var shown = 0;
      cards.forEach(function (c) {
        var tags = (c.dataset.tags || '').split('|');
        var ok = (!activeTag || tags.indexOf(activeTag) > -1) &&
                 (!q || (c.dataset.search || '').indexOf(q) > -1);
        c.hidden = !ok;
        if (ok) shown++;
      });
      groups.forEach(function (g) { g.hidden = !g.querySelector('.card:not([hidden])'); });
      if (empty) empty.hidden = shown > 0;
      chips.forEach(function (ch) { ch.setAttribute('aria-pressed', String(ch.dataset.tag === activeTag)); });
    }
    chips.forEach(function (ch) {
      ch.addEventListener('click', function () {
        activeTag = ch.dataset.tag;
        var url = new URL(location.href);
        if (activeTag) url.searchParams.set('tag', activeTag); else url.searchParams.delete('tag');
        history.replaceState(null, '', url);
        apply();
      });
    });
    if (search) search.addEventListener('input', apply);
    apply();
  }
})();
