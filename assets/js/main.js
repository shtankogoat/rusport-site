(function () {
  "use strict";

  var PROJECTS = window.RSO_PROJECTS || [];
  var AUDIENCES = window.RSO_AUDIENCES || [];
  var NEWS = window.RSO_NEWS || [];
  var SOCIAL = window.RSO_SOCIAL || {};

  var $ = function (sel, root) { return (root || document).querySelector(sel); };
  var $$ = function (sel, root) { return Array.prototype.slice.call((root || document).querySelectorAll(sel)); };

  function esc(s) {
    return String(s).replace(/[&<>"']/g, function (c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c];
    });
  }

  function param(name) {
    return new URLSearchParams(location.search).get(name);
  }

  /* ---------- Icons ---------- */

  var ICONS = {
    arrow: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><path d="M4 12h15M13 6l6 6-6 6"/></svg>',
    arrowLeft: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><path d="M20 12H5M11 6l-6 6 6 6"/></svg>',
    telegram: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M21.4 4.2 2.9 11.3c-1.3.5-1.3 1.2-.2 1.5l4.7 1.5 1.8 5.6c.2.6.1.9.8.9.5 0 .7-.2 1-.5l2.3-2.2 4.8 3.5c.9.5 1.5.2 1.7-.8l3.2-15c.3-1.3-.5-1.9-1.6-1.6zM8.6 14.1l9.9-6.2c.5-.3.9-.1.5.2l-8.4 7.6-.3 3.6-1.7-5.2z"/></svg>',
    vk: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12.8 17.5c-5.6 0-8.8-3.8-9-10.2h2.8c.1 4.7 2.2 6.6 3.8 7V7.3h2.6v4c1.6-.2 3.3-2 3.8-4h2.6c-.4 2.5-2.2 4.3-3.5 5 1.3.6 3.4 2.2 4.2 5.2h-2.9c-.6-1.9-2.2-3.4-4.2-3.6v3.6h-.2z"/></svg>',
    max: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><circle cx="12" cy="12" r="8.5"/><path d="M8 15.5V9l4 4 4-4v6.5"/></svg>',
    community: '<svg viewBox="0 0 48 48" fill="none" stroke="currentColor" stroke-width="1.4"><circle cx="24" cy="15" r="6"/><circle cx="10" cy="21" r="4.5"/><circle cx="38" cy="21" r="4.5"/><path d="M13 40c0-6.6 4.9-12 11-12s11 5.4 11 12M2 38c0-4.4 3.6-8 8-8 2 0 3.8.7 5.2 1.9M46 38c0-4.4-3.6-8-8-8-2 0-3.8.7-5.2 1.9"/></svg>',
    b2b: '<svg viewBox="0 0 48 48" fill="none" stroke="currentColor" stroke-width="1.4"><rect x="4" y="10" width="17" height="28" rx="1"/><rect x="27" y="4" width="17" height="34" rx="1"/><path d="M9 17h7M9 23h7M9 29h7M32 11h7M32 17h7M32 23h7M32 29h7M2 44h44"/></svg>',
    analytics: '<svg viewBox="0 0 48 48" fill="none" stroke="currentColor" stroke-width="1.4"><path d="M4 44h40M9 36V26M19 36V18M29 36V22M39 36V10"/><path d="M8 20l11-9 10 5 11-10"/></svg>',
    sporttech: '<svg viewBox="0 0 48 48" fill="none" stroke="currentColor" stroke-width="1.4"><circle cx="24" cy="24" r="19"/><path d="M24 5v38M5 24h38M10.5 10.5c7.5 7.5 7.5 19.5 0 27M37.5 10.5c-7.5 7.5-7.5 19.5 0 27"/></svg>',
    investments: '<svg viewBox="0 0 48 48" fill="none" stroke="currentColor" stroke-width="1.4"><path d="M24 4v40M33 12h-13a6 6 0 0 0 0 12h8a6 6 0 0 1 0 12H14"/></svg>',
    media: '<svg viewBox="0 0 48 48" fill="none" stroke="currentColor" stroke-width="1.4"><rect x="4" y="10" width="40" height="28" rx="2"/><path d="M20 18v12l10-6z"/><path d="M14 44h20"/></svg>',
    charity: '<svg viewBox="0 0 48 48" fill="none" stroke="currentColor" stroke-width="1.4"><path d="M24 40S6 29.5 6 17.5A9.5 9.5 0 0 1 24 13a9.5 9.5 0 0 1 18 4.5C42 29.5 24 40 24 40z"/></svg>',
    academy: '<svg viewBox="0 0 48 48" fill="none" stroke="currentColor" stroke-width="1.4"><path d="M2 18 24 8l22 10-22 10z"/><path d="M11 22v11c0 3 6 7 13 7s13-4 13-7V22M44 19v13"/></svg>',
    events: '<svg viewBox="0 0 48 48" fill="none" stroke="currentColor" stroke-width="1.4"><rect x="5" y="9" width="38" height="34" rx="2"/><path d="M5 18h38M15 4v9M33 4v9"/><path d="m24 23 2.4 4.9 5.4.8-3.9 3.8.9 5.4-4.8-2.6-4.8 2.6.9-5.4-3.9-3.8 5.4-.8z"/></svg>'
  };

  /* ---------- Shared header & footer ---------- */

  var NAV = [
    ["index.html#about", "Об обществе"],
    ["index.html#projects", "Проекты"],
    ["index.html#members", "Участникам"],
    ["news.html", "Новости"],
    ["index.html#partners", "Партнёры"]
  ];

  function renderHeader() {
    var mount = $("#site-header");
    if (!mount) return;
    var page = location.pathname.split("/").pop() || "index.html";
    mount.outerHTML =
      '<header class="site-header" id="top-header"><div class="wrap header-row">' +
      '<a class="brand" href="index.html" aria-label="Русское спортивное общество — на главную">' +
      '<img src="assets/img/logo-mark-light.png" alt="" width="58" height="47">' +
      '<span class="brand-name">Русское<br>спортивное<small>общество</small></span></a>' +
      '<nav class="nav" id="nav">' +
      NAV.map(function (n) {
        return '<a href="' + n[0] + '"' + (n[0] === page ? ' class="is-active"' : "") + ">" + n[1] + "</a>";
      }).join("") +
      '<a class="btn btn-gold nav-join" href="join.html">Вступить</a>' +
      "</nav>" +
      '<a class="btn btn-gold header-cta" href="join.html">Вступить в РСО</a>' +
      '<button class="burger" type="button" aria-label="Меню" aria-expanded="false"><span></span></button>' +
      "</div></header>";

    var header = $("#top-header");
    var burger = $(".burger", header);
    burger.addEventListener("click", function () {
      var open = document.body.classList.toggle("nav-open");
      burger.setAttribute("aria-expanded", open);
    });
    $$(".nav a", header).forEach(function (a) {
      a.addEventListener("click", function () { document.body.classList.remove("nav-open"); });
    });
    var onScroll = function () { header.classList.toggle("is-solid", window.scrollY > 40); };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
  }

  function socialLinks(cls) {
    return (
      '<a class="' + cls + '" href="' + SOCIAL.telegram + '" target="_blank" rel="noopener">' + ICONS.telegram + "Telegram</a>" +
      '<a class="' + cls + '" href="' + SOCIAL.max + '" target="_blank" rel="noopener">' + ICONS.max + "MAX</a>" +
      '<a class="' + cls + '" href="' + SOCIAL.vk + '" target="_blank" rel="noopener">' + ICONS.vk + "ВКонтакте</a>"
    );
  }

  function renderFooter() {
    var mount = $("#site-footer");
    if (!mount) return;
    mount.outerHTML =
      '<footer class="site-footer"><div class="wrap">' +
      '<div class="footer-grid">' +
      '<div class="footer-brand"><img src="assets/img/logo-full-light.png" alt="Русское спортивное общество" width="150" height="166">' +
      "<p>Объединяем тех, кто делает российский спорт сильнее.</p>" +
      '<div class="socials">' + socialLinks("social") + "</div></div>" +
      "<div><h4>Проекты</h4><ul>" +
      PROJECTS.slice(0, 5).map(function (p) { return '<li><a href="project.html?id=' + p.id + '">' + esc(p.title) + "</a></li>"; }).join("") +
      "</ul></div>" +
      "<div><h4>&nbsp;</h4><ul>" +
      PROJECTS.slice(5).map(function (p) { return '<li><a href="project.html?id=' + p.id + '">' + esc(p.title) + "</a></li>"; }).join("") +
      "</ul></div>" +
      "<div><h4>Обществу</h4><ul>" +
      '<li><a href="join.html">Вступить в РСО</a></li>' +
      '<li><a href="news.html">Новости</a></li>' +
      '<li><a href="index.html#partners">Партнёрам</a></li>' +
      '<li><a href="privacy.html">Политика конфиденциальности</a></li>' +
      "</ul></div>" +
      "</div>" +
      '<div class="footer-bottom"><span>© ' + new Date().getFullYear() + " Русское спортивное общество · rusport.org</span>" +
      "<span>Некоммерческая организация</span></div>" +
      "</div></footer>";
  }

  /* ---------- Cards ---------- */

  function statusBadge(p) {
    return p.status ? '<span class="badge">' + esc(p.status) + "</span>" : "<span></span>";
  }

  function projectCard(p, i) {
    return (
      '<a class="project-card reveal" href="project.html?id=' + p.id + '">' +
      '<div class="project-top"><span class="project-num">' + String(i + 1).padStart(2, "0") + "</span>" +
      '<span class="project-icon">' + ICONS[p.icon] + "</span></div>" +
      '<h3 class="project-title">' + esc(p.title) + "</h3>" +
      '<p class="project-lead">' + esc(p.lead) + "</p>" +
      '<div class="project-foot">' + statusBadge(p) + '<span class="project-go">' + ICONS.arrow + "</span></div>" +
      "</a>"
    );
  }

  var MONTHS = ["января", "февраля", "марта", "апреля", "мая", "июня", "июля", "августа", "сентября", "октября", "ноября", "декабря"];
  function fmtDate(iso) {
    var p = iso.split("-");
    return +p[2] + " " + MONTHS[+p[1] - 1] + " " + p[0];
  }

  function newsCard(n) {
    return (
      '<a class="news-card reveal" href="post.html?id=' + n.id + '">' +
      '<div class="news-meta"><span class="news-tag">' + esc(n.tag) + "</span><span>" + fmtDate(n.date) + "</span></div>" +
      '<h3 class="news-title">' + esc(n.title) + "</h3>" +
      '<p class="news-excerpt">' + esc(n.text.replace(/\n+/g, " ")) + "</p>" +
      '<span class="link-arrow">Читать ' + ICONS.arrow + "</span>" +
      "</a>"
    );
  }

  function audienceCard(a) {
    return (
      '<a class="audience-card reveal" href="audience.html?id=' + a.id + '">' +
      "<h3>" + esc(a.title) + "</h3>" +
      "<ul>" + a.items.map(function (it) { return "<li>" + esc(it) + "</li>"; }).join("") + "</ul>" +
      '<span class="link-arrow">Подробнее ' + ICONS.arrow + "</span>" +
      "</a>"
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
    var slides = $$(".slide", hero);
    var dotsWrap = $(".hero-dots", hero);
    var count = $(".hero-count", hero);
    var DURATION = 7000;
    var current = 0;
    var timer;

    hero.style.setProperty("--slide-ms", DURATION + "ms");
    dotsWrap.innerHTML = slides.map(function (_, i) {
      return '<button class="hero-dot" type="button" aria-label="Слайд ' + (i + 1) + '"><i></i></button>';
    }).join("");
    var dots = $$(".hero-dot", dotsWrap);

    function go(i) {
      current = (i + slides.length) % slides.length;
      slides.forEach(function (s, k) {
        s.classList.toggle("is-active", k === current);
        s.setAttribute("aria-hidden", k !== current);
      });
      dots.forEach(function (d, k) {
        d.classList.remove("is-active");
        if (k === current) { void d.offsetWidth; d.classList.add("is-active"); }
      });
      count.innerHTML = "<b>" + String(current + 1).padStart(2, "0") + "</b> / " + String(slides.length).padStart(2, "0");
      restart();
    }
    function restart() {
      clearTimeout(timer);
      if (!hero.classList.contains("is-paused")) timer = setTimeout(function () { go(current + 1); }, DURATION);
    }

    dots.forEach(function (d, i) { d.addEventListener("click", function () { go(i); }); });
    $(".hero-prev", hero).addEventListener("click", function () { go(current - 1); });
    $(".hero-next", hero).addEventListener("click", function () { go(current + 1); });
    hero.addEventListener("mouseenter", function () { hero.classList.add("is-paused"); clearTimeout(timer); });
    hero.addEventListener("mouseleave", function () { hero.classList.remove("is-paused"); go(current); });

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

  /* ---------- Forms ---------- */

  function submitForm(form, kind, onDone) {
    var status = $(".form-status", form);
    var endpoint = window.RSO_FORM_ENDPOINT;
    var data = Object.fromEntries(new FormData(form).entries());
    data.form = kind;
    data.page = location.href;

    if (!endpoint) {
      if (status) status.textContent = "Форма работает в тестовом режиме — подключите обработчик в assets/js/data.js (RSO_FORM_ENDPOINT).";
      console.info("[RSO] form data", data);
      return;
    }
    var btn = $("button[type=submit]", form);
    if (btn) btn.disabled = true;
    fetch(endpoint, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(data) })
      .then(function (r) {
        if (!r.ok) throw new Error(r.status);
        onDone();
      })
      .catch(function () {
        if (status) status.textContent = "Не удалось отправить. Попробуйте ещё раз или напишите нам в Telegram.";
      })
      .then(function () { if (btn) btn.disabled = false; });
  }

  function initSubscribe() {
    $$(".subscribe-form").forEach(function (form) {
      form.addEventListener("submit", function (e) {
        e.preventDefault();
        submitForm(form, "subscribe", function () {
          $(".form-status", form).textContent = "Готово! Вы подписаны на новости Общества.";
          form.reset();
        });
      });
    });
  }

  /* ---------- Pages ---------- */

  function pageHome() {
    fill("#projects-grid", PROJECTS.map(projectCard).join(""));
    fill("#audience-grid", AUDIENCES.map(audienceCard).join(""));
    fill("#news-grid", NEWS.slice(0, 3).map(newsCard).join(""));
    $$(".socials-mount").forEach(function (el) { el.innerHTML = socialLinks("social"); });
    initSlider();
  }

  function notFound(what) {
    document.title = "Страница не найдена — РСО";
    fill("#page", '<section class="page-hero"><div class="wrap"><h1 class="h1">' + what + ' не найден</h1>' +
      '<p class="lead">Возможно, ссылка устарела.</p><p style="margin-top:32px"><a class="btn btn-gold" href="index.html">На главную</a></p></div></section>');
  }

  function pageProject() {
    var p = PROJECTS.find(function (x) { return x.id === param("id"); });
    if (!p) return notFound("Проект");
    document.title = p.title + " — Русское спортивное общество";
    var others = PROJECTS.filter(function (x) { return x.id !== p.id; }).slice(0, 3);
    fill("#page",
      '<section class="page-hero"><img class="page-hero-mark" src="assets/img/logo-mark-light.png" alt="">' +
      '<div class="wrap"><nav class="breadcrumbs"><a href="index.html">Главная</a><span><a href="index.html#projects">Проекты</a></span><span>' + esc(p.title) + "</span></nav>" +
      statusBadge(p) +
      '<h1 class="h1">' + esc(p.title) + "</h1>" +
      '<p class="lead">' + esc(p.lead) + "</p></div></section>" +
      '<section class="section"><div class="wrap detail-grid"><div>' +
      '<p class="detail-about reveal">' + esc(p.about) + "</p>" +
      '<div class="features">' + p.features.map(function (f) {
        return '<div class="feature reveal"><h3>' + esc(f[0]) + "</h3><p>" + esc(f[1]) + "</p></div>";
      }).join("") + "</div></div>" +
      '<aside class="aside-card"><h3>' + (p.status ? "Хотите участвовать с самого старта?" : "Станьте частью проекта") + "</h3>" +
      "<p>" + (p.status ? "Участники Общества первыми получают доступ к проекту и влияют на то, каким он будет." : "Проект доступен участникам Русского спортивного общества.") + "</p>" +
      '<a class="btn btn-gold" href="join.html?from=' + p.id + '">Вступить в РСО</a>' +
      '<a class="btn btn-ghost" href="' + SOCIAL.telegram + '" target="_blank" rel="noopener">' + ICONS.telegram + "Следить в Telegram</a></aside>" +
      "</div></section>" +
      '<section class="section section-ivory"><div class="wrap"><div class="section-head"><div><span class="eyebrow">Ещё проекты</span></div></div>' +
      '<div class="more-projects">' + others.map(function (o) { return projectCard(o, PROJECTS.indexOf(o)); }).join("") + "</div></div></section>"
    );
  }

  function pageAudience() {
    var a = AUDIENCES.find(function (x) { return x.id === param("id"); });
    if (!a) return notFound("Раздел");
    document.title = a.title + " — Русское спортивное общество";
    fill("#page",
      '<section class="page-hero"><img class="page-hero-mark" src="assets/img/logo-mark-light.png" alt="">' +
      '<div class="wrap"><nav class="breadcrumbs"><a href="index.html">Главная</a><span><a href="index.html#members">Участникам</a></span><span>' + esc(a.title) + "</span></nav>" +
      '<span class="eyebrow">Что вы получаете</span>' +
      '<h1 class="h1" style="margin-top:20px">' + esc(a.title) + "</h1>" +
      '<p class="lead">' + esc(a.lead) + "</p></div></section>" +
      '<section class="section"><div class="wrap detail-grid"><div>' +
      '<ol class="benefit-list">' + a.items.map(function (it) { return '<li class="reveal">' + esc(it) + "</li>"; }).join("") + "</ol></div>" +
      '<aside class="aside-card"><h3>Готовы присоединиться?</h3><p>Заполните анкету — мы свяжемся с вами и расскажем об условиях членства.</p>' +
      '<a class="btn btn-gold" href="join.html?from=' + a.id + '">Вступить в РСО</a></aside>' +
      "</div></section>" +
      '<section class="section section-ivory"><div class="wrap"><div class="section-head"><div><span class="eyebrow">Другие участники</span></div></div>' +
      '<div class="audience-grid">' + AUDIENCES.filter(function (x) { return x.id !== a.id; }).slice(0, 2).map(audienceCard).join("") + "</div></div></section>"
    );
  }

  function pageNews() {
    var tags = ["Все"].concat(NEWS.map(function (n) { return n.tag; }).filter(function (t, i, arr) { return arr.indexOf(t) === i; }));
    var feed = $("#news-feed");
    function show(tag) {
      var list = tag === "Все" ? NEWS : NEWS.filter(function (n) { return n.tag === tag; });
      feed.innerHTML = list.map(newsCard).join("");
      observeReveal();
    }
    fill("#filters", tags.map(function (t, i) {
      return '<button class="filter' + (i === 0 ? " is-active" : "") + '" type="button">' + esc(t) + "</button>";
    }).join(""));
    $$("#filters .filter").forEach(function (b) {
      b.addEventListener("click", function () {
        $$("#filters .filter").forEach(function (x) { x.classList.toggle("is-active", x === b); });
        show(b.textContent);
      });
    });
    show("Все");
  }

  function linkify(text) {
    return esc(text).replace(/(https?:\/\/[^\s<]+)/g, '<a href="$1" target="_blank" rel="noopener">$1</a>');
  }

  function pagePost() {
    var n = NEWS.find(function (x) { return String(x.id) === param("id"); });
    if (!n) return notFound("Материал");
    document.title = n.title + " — Новости РСО";
    var paras = n.text.split(/\n{2,}/).map(function (p) { return "<p>" + linkify(p).replace(/\n/g, "<br>") + "</p>"; }).join("");
    fill("#page",
      '<section class="page-hero"><div class="wrap article"><nav class="breadcrumbs"><a href="index.html">Главная</a><span><a href="news.html">Новости</a></span></nav>' +
      '<div class="news-meta" style="color:rgba(245,241,233,.65)"><span class="news-tag">' + esc(n.tag) + "</span><span>" + fmtDate(n.date) + "</span></div>" +
      '<h1 class="h2">' + esc(n.title) + "</h1></div></section>" +
      '<section class="section"><div class="wrap"><article class="article"><div class="article-body">' + paras + "</div>" +
      '<div class="article-foot"><a class="btn btn-navy" href="' + n.url + '" target="_blank" rel="noopener">' + ICONS.telegram + "Обсудить в Telegram</a>" +
      '<a class="btn btn-ghost-dark" href="news.html">' + ICONS.arrowLeft + "Все новости</a></div></article></div></section>"
    );
  }

  function pageJoin() {
    var form = $("#join-form");
    var tabs = $$(".tab");
    function setType(type) {
      tabs.forEach(function (t) { t.classList.toggle("is-active", t.dataset.type === type); t.setAttribute("aria-selected", t.dataset.type === type); });
      form.elements.member_type.value = type;
      $$("[data-for]", form).forEach(function (el) {
        var on = el.dataset.for === type;
        el.hidden = !on;
        $$("input, select, textarea", el).forEach(function (f) { f.disabled = !on; });
      });
    }
    tabs.forEach(function (t) { t.addEventListener("click", function () { setType(t.dataset.type); }); });
    setType(param("type") === "company" ? "company" : "person");

    var from = param("from");

    form.addEventListener("submit", function (e) {
      e.preventDefault();
      submitForm(form, "join", function () {
        form.hidden = true;
        $(".tabs").hidden = true;
        $(".form-done").classList.add("is-visible");
        window.scrollTo({ top: $(".form-done").getBoundingClientRect().top + window.scrollY - 120, behavior: "smooth" });
      });
    });

    var interest = form.elements.interest;
    if (interest) {
      interest.insertAdjacentHTML("beforeend", PROJECTS.map(function (p) {
        return '<option value="' + p.id + '">' + esc(p.title) + "</option>";
      }).join(""));
      if (from) interest.value = from;
    }
  }

  /* ---------- Reveal on scroll ---------- */

  var io = "IntersectionObserver" in window
    ? new IntersectionObserver(function (entries) {
        entries.forEach(function (e) {
          if (e.isIntersecting) { e.target.classList.add("is-in"); io.unobserve(e.target); }
        });
      }, { rootMargin: "0px 0px -8% 0px" })
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
    ({ home: pageHome, project: pageProject, audience: pageAudience, news: pageNews, post: pagePost, join: pageJoin }[page] || function () {})();
    initSubscribe();
    observeReveal();
  });
})();
