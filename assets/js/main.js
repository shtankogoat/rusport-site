(function () {
  "use strict";

  var PROJECTS = window.RSO_PROJECTS || [];
  var AUDIENCES = window.RSO_AUDIENCES || [];
  var SOCIAL = window.RSO_SOCIAL || {};
  var LANG = (window.RSO_I18N && window.RSO_I18N.lang) || "ru";

  var $ = function (sel, root) { return (root || document).querySelector(sel); };
  var $$ = function (sel, root) { return Array.prototype.slice.call((root || document).querySelectorAll(sel)); };

  function esc(s) {
    return String(s == null ? "" : s).replace(/[&<>"']/g, function (c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c];
    });
  }
  function param(name) { return new URLSearchParams(location.search).get(name); }

  /* ---------- Icons ---------- */

  var I = {
    arrow: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7"><path d="M4 12h15M13 6l6 6-6 6"/></svg>',
    telegram: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M21.4 4.2 2.9 11.3c-1.3.5-1.3 1.2-.2 1.5l4.7 1.5 1.8 5.6c.2.6.1.9.8.9.5 0 .7-.2 1-.5l2.3-2.2 4.8 3.5c.9.5 1.5.2 1.7-.8l3.2-15c.3-1.3-.5-1.9-1.6-1.6zM8.6 14.1l9.9-6.2c.5-.3.9-.1.5.2l-8.4 7.6-.3 3.6-1.7-5.2z"/></svg>',
    vk: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12.8 17.5c-5.6 0-8.8-3.8-9-10.2h2.8c.1 4.7 2.2 6.6 3.8 7V7.3h2.6v4c1.6-.2 3.3-2 3.8-4h2.6c-.4 2.5-2.2 4.3-3.5 5 1.3.6 3.4 2.2 4.2 5.2h-2.9c-.6-1.9-2.2-3.4-4.2-3.6v3.6h-.2z"/></svg>',
    max: '<svg viewBox="0 0 24 24" fill="currentColor" fill-rule="evenodd"><path d="M12.2 2.5c-5.4 0-9.4 3.9-9.4 9.4 0 2.1.5 4 1 5.4.3.9.4 1.6.1 2.6-.2.8.5 1.5 1.3 1.3 1-.3 1.8-.6 2.6-.3 1.3.6 2.8.9 4.4.9 5.3 0 9.3-4 9.3-9.5 0-5.6-3.9-9.8-9.3-9.8zm.1 5.1c-2.5 0-4.4 1.9-4.4 4.4s1.9 4.4 4.4 4.4 4.4-1.9 4.4-4.4-1.9-4.4-4.4-4.4z"/></svg>'
  };

  /* ---------- Photos ---------- */
  // <div class="photo" data-photo="hero-unite"> → assets/img/photos/hero-unite.jpg

  var PHOTO_DIR = "assets/img/photos/";
  function photoTag(name) {
    return '<div class="photo" data-photo="' + esc(name) + '"></div>';
  }
  function loadPhotos(root) {
    $$(".photo:not([data-loaded])", root).forEach(function (el) {
      el.setAttribute("data-loaded", "");
      var src = PHOTO_DIR + el.getAttribute("data-photo") + ".jpg";
      var img = new Image();
      img.onload = function () { el.style.backgroundImage = 'url("' + src.replace(/"/g, '\\"') + '")'; el.classList.add("has-photo"); };
      img.onerror = function () { el.classList.add("no-photo"); };
      img.src = src;
    });
  }

  /* ---------- Shared header & footer ---------- */

  var NAV = [
    ["index.html#about", "Об обществе"],
    ["index.html#projects", "Проекты"],
    ["index.html#members", "Участникам"],
    ["index.html#partners", "Партнёры"]
  ];

  // Icon-only variant for the header. join.html is hidden (no links) but kept for later.
  function socialIcons() {
    return [["telegram", "Telegram"], ["vk", "ВКонтакте"], ["max", "MAX"]].map(function (s) {
      return '<a class="social-icon" href="' + SOCIAL[s[0]] + '" target="_blank" rel="noopener" aria-label="' + s[1] + '" title="' + s[1] + '">' + I[s[0]] + "</a>";
    }).join("");
  }

  function socialLinks() {
    return (
      '<a class="social" href="' + SOCIAL.telegram + '" target="_blank" rel="noopener">' + I.telegram + "Telegram</a>" +
      '<a class="social" href="' + SOCIAL.max + '" target="_blank" rel="noopener">' + I.max + "MAX</a>" +
      '<a class="social" href="' + SOCIAL.vk + '" target="_blank" rel="noopener">' + I.vk + "ВКонтакте</a>"
    );
  }

  function renderHeader() {
    var mount = $("#site-header");
    if (!mount) return;
    var page = location.pathname.split("/").pop() || "index.html";
    mount.outerHTML =
      '<header class="site-header" id="top-header"><div class="wrap header-row">' +
      '<a class="brand" href="index.html" aria-label="Русское спортивное общество — на главную">' +
      '<img src="assets/img/logo-mark-light.png" alt="" width="62" height="50">' +
      '<span class="brand-name">Русское<br>спортивное<small>общество</small></span></a>' +
      '<nav class="nav" id="nav" aria-label="Главное меню">' +
      NAV.map(function (n) {
        return '<a href="' + n[0] + '"' + (n[0] === page ? ' class="is-active"' : "") + ">" + n[1] + "</a>";
      }).join("") +
      '<div class="nav-join socials">' + socialLinks() + "</div>" +
      "</nav>" +
      '<div class="header-cta header-socials">' + socialIcons() + "</div>" +
      '<div class="lang-switch" role="group" aria-label="Язык / Language" data-no-i18n>' +
      '<button type="button" data-lang="ru"' + (LANG === "ru" ? ' class="is-active" aria-pressed="true"' : ' aria-pressed="false"') + ">РУ</button>" +
      '<button type="button" data-lang="en"' + (LANG === "en" ? ' class="is-active" aria-pressed="true"' : ' aria-pressed="false"') + ">EN</button>" +
      "</div>" +
      '<button class="burger" type="button" aria-label="Меню" aria-expanded="false" aria-controls="nav"><span></span></button>' +
      "</div></header>";

    var header = $("#top-header");
    $$(".lang-switch button", header).forEach(function (b) {
      b.addEventListener("click", function () {
        if (b.dataset.lang !== LANG && window.RSO_I18N) window.RSO_I18N.setLang(b.dataset.lang);
      });
    });
    var burger = $(".burger", header);
    burger.addEventListener("click", function () {
      var open = document.body.classList.toggle("nav-open");
      burger.setAttribute("aria-expanded", open);
    });
    $$(".nav a", header).forEach(function (a) {
      a.addEventListener("click", function () { document.body.classList.remove("nav-open"); });
    });
    var onScroll = function () { header.classList.toggle("is-solid", window.scrollY > 30); };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
  }

  function renderFooter() {
    var mount = $("#site-footer");
    if (!mount) return;
    var half = Math.ceil(PROJECTS.length / 2);
    var link = function (p) { return '<li><a href="index.html#projects">' + esc(p.title) + "</a></li>"; };
    mount.outerHTML =
      '<footer class="site-footer">' +
      '<div class="wrap footer-main">' +
      '<div class="footer-brand"><img src="assets/img/logo-full-light.png" alt="Русское спортивное общество" width="128" height="141">' +
      "<p>Объединяем тех, кто делает российский спорт сильнее.</p>" +
      '<div class="socials">' + socialLinks() + "</div></div>" +
      "<div><h4>Проекты</h4><ul>" + PROJECTS.slice(0, half).map(link).join("") + "</ul></div>" +
      '<div><h4 aria-hidden="true">&nbsp;</h4><ul>' + PROJECTS.slice(half).map(link).join("") + "</ul></div>" +
      "<div><h4>Обществу</h4><ul>" +
      '<li><a href="index.html#members">Участникам</a></li>' +
      '<li><a href="index.html#partners">Партнёрам</a></li>' +
      '<li><a href="privacy.html">Политика конфиденциальности</a></li>' +
      "</ul></div></div>" +
      '<div class="wrap footer-bottom"><span>© ' + new Date().getFullYear() + " Русское спортивное общество · rusport.org</span>" +
      "<span>Некоммерческая организация</span></div>" +
      "</footer>";
  }

  /* ---------- Cards ---------- */

  // Project pages are hidden for now: cards are static, not links.
  function projectCard(p, i) {
    return (
      '<div class="pcard reveal" tabindex="0">' +
      photoTag("project-" + p.id) +
      (p.status ? '<span class="pcard-badge">' + esc(p.status) + "</span>" : "") +
      '<span class="pcard-num">' + String(i + 1).padStart(2, "0") + "</span>" +
      '<div class="pcard-body"><h3 class="pcard-title">' + esc(p.title) + "</h3>" +
      '<p class="pcard-text">' + esc(p.lead) + "</p></div></div>"
    );
  }

  // Home "Что получает индустрия": static card with the full benefit list (no audience page link).
  function valueCard(a) {
    return (
      '<div class="value reveal">' +
      '<div class="value-img">' + photoTag("audience-" + a.id) + "</div>" +
      '<div class="value-body"><h3 class="value-title">' + esc(a.title) + "</h3>" +
      "<ul>" + a.items.map(function (it) { return "<li>" + esc(it) + "</li>"; }).join("") + "</ul></div></div>"
    );
  }

  function fill(sel, html) {
    var el = $(sel);
    if (el) el.innerHTML = html;
    return el;
  }

  /* ---------- Hero slider ---------- */

  function initSlider() {
    var hero = $(".hero");
    if (!hero) return;
    var slides = $$(".hero-slide", hero);
    var bar = $(".hero-progress", hero);
    var count = $(".hero-count", hero);
    var DURATION = 7000;
    var current = 0;
    var timer;

    hero.style.setProperty("--slide-ms", DURATION + "ms");
    bar.innerHTML = slides.map(function (_, i) {
      return '<button type="button" aria-label="Слайд ' + (i + 1) + '"><i></i></button>';
    }).join("");
    var dots = $$("button", bar);

    function go(i) {
      current = (i + slides.length) % slides.length;
      slides.forEach(function (s, k) {
        s.classList.toggle("is-active", k === current);
        s.setAttribute("aria-hidden", k !== current);
      });
      dots.forEach(function (d, k) {
        d.classList.remove("is-active");
        d.classList.toggle("is-done", k < current);
        if (k === current) { void d.offsetWidth; d.classList.add("is-active"); }
      });
      count.innerHTML = "<b>" + (current + 1) + "</b> / " + slides.length;
      clearTimeout(timer);
      timer = setTimeout(function () { go(current + 1); }, DURATION);
    }

    dots.forEach(function (d, i) { d.addEventListener("click", function () { go(i); }); });
    $(".hero-prev", hero).addEventListener("click", function () { go(current - 1); });
    $(".hero-next", hero).addEventListener("click", function () { go(current + 1); });
    // No pause on hover: the banner fills the screen, so the cursor almost always rests on it and the slider would stall.

    var x0 = null;
    hero.addEventListener("touchstart", function (e) { x0 = e.touches[0].clientX; }, { passive: true });
    hero.addEventListener("touchend", function (e) {
      if (x0 === null) return;
      var dx = e.changedTouches[0].clientX - x0;
      if (Math.abs(dx) > 50) go(current + (dx < 0 ? 1 : -1));
      x0 = null;
    });
    go(0);
  }

  /* ---------- Pages ---------- */

  function pageHome() {
    fill("#projects-grid", PROJECTS.map(projectCard).join(""));
    fill("#audience-grid", AUDIENCES.map(valueCard).join(""));
    initSlider();
  }

  // Applications are collected by Google Forms (RSO_FORMS in data.js), embedded per tab.
  function pageJoin() {
    var FORMS = window.RSO_FORMS || {};
    var box = $("#gform");
    var tabs = $$(".tab");
    function setType(type) {
      tabs.forEach(function (t) {
        var on = t.dataset.type === type;
        t.classList.toggle("is-active", on);
        t.setAttribute("aria-selected", on);
      });
      var url = FORMS[type];
      box.innerHTML = url
        ? '<p class="gform-consent">Отправляя анкету, вы даёте согласие на обработку персональных данных в соответствии с ' +
          '<a href="privacy.html">политикой конфиденциальности</a>.</p>' +
          '<iframe data-type="' + type + '" src="' + esc(url + (url.indexOf("?") < 0 ? "?" : "&") + "embedded=true") + '" title="Анкета" loading="lazy">Загрузка…</iframe>' +
          '<p class="gform-alt"><a href="' + esc(url) + '" target="_blank" rel="noopener">Открыть анкету в новом окне ' + I.arrow + "</a></p>"
        : '<div class="empty-note"><b>Анкета скоро появится</b>А пока подпишитесь на наши каналы, чтобы не пропустить старт.' +
          '<div class="socials socials-dark" style="justify-content:center;margin-top:18px">' + socialLinks() + "</div></div>";
    }
    tabs.forEach(function (t) { t.addEventListener("click", function () { setType(t.dataset.type); }); });
    setType(param("type") === "company" ? "company" : "person");
  }

  /* ---------- Reveal on scroll ---------- */

  var io = "IntersectionObserver" in window
    ? new IntersectionObserver(function (entries) {
        entries.forEach(function (e) {
          if (e.isIntersecting) { e.target.classList.add("is-in"); io.unobserve(e.target); }
        });
      }, { rootMargin: "0px 0px -6% 0px" })
    : null;

  function observeReveal() {
    $$(".reveal:not(.is-in)").forEach(function (el) {
      if (io) io.observe(el); else el.classList.add("is-in");
    });
  }

  /* ---------- Boot ---------- */

  document.addEventListener("DOMContentLoaded", function () {
    renderHeader();
    renderFooter();
    var page = document.body.dataset.page;
    ({ home: pageHome, join: pageJoin }[page] || function () {})();
    $$(".socials-mount").forEach(function (el) { el.innerHTML = socialLinks(); });
    loadPhotos(document);
    observeReveal();
    if (window.RSO_I18N) window.RSO_I18N.apply(document.body);
  });
})();
