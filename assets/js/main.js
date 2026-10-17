(function () {
  "use strict";

  var PROJECTS = window.RSO_PROJECTS || [];
  var AUDIENCES = window.RSO_AUDIENCES || [];
  var SOCIAL = window.RSO_SOCIAL || {};

  var $ = function (sel, root) { return (root || document).querySelector(sel); };
  var $$ = function (sel, root) { return Array.prototype.slice.call((root || document).querySelectorAll(sel)); };

  function esc(s) {
    return String(s == null ? "" : s).replace(/[&<>"']/g, function (c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c];
    });
  }
  function param(name) { return new URLSearchParams(location.search).get(name); }

  // News comes from the Django backend (/api/news/). Opened as plain files (file://) or on a host
  // without the backend, the site falls back to the static list in assets/js/news.js.
  var HAS_BACKEND = /^https?:$/.test(location.protocol) && !/\.github\.io$/.test(location.hostname);
  var NEWS = sortNews(window.RSO_NEWS || []);

  function getJSON(url) {
    return fetch(url, { headers: { Accept: "application/json" } }).then(function (r) {
      if (!r.ok) throw new Error(r.status);
      return r.json();
    });
  }
  var newsReady = !HAS_BACKEND ? Promise.resolve(NEWS) : getJSON("/api/news/")
    .then(function (d) { NEWS = sortNews(d.items || []); return NEWS; })
    .catch(function () { return NEWS; });

  function sortNews(list) {
    return list.filter(function (n) { return n && n.title; }).sort(function (a, b) { return (b.date || "").localeCompare(a.date || ""); });
  }

  /* ---------- Icons ---------- */

  var I = {
    arrow: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7"><path d="M4 12h15M13 6l6 6-6 6"/></svg>',
    arrowLeft: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7"><path d="M20 12H5M11 6l-6 6 6 6"/></svg>',
    telegram: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M21.4 4.2 2.9 11.3c-1.3.5-1.3 1.2-.2 1.5l4.7 1.5 1.8 5.6c.2.6.1.9.8.9.5 0 .7-.2 1-.5l2.3-2.2 4.8 3.5c.9.5 1.5.2 1.7-.8l3.2-15c.3-1.3-.5-1.9-1.6-1.6zM8.6 14.1l9.9-6.2c.5-.3.9-.1.5.2l-8.4 7.6-.3 3.6-1.7-5.2z"/></svg>',
    vk: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12.8 17.5c-5.6 0-8.8-3.8-9-10.2h2.8c.1 4.7 2.2 6.6 3.8 7V7.3h2.6v4c1.6-.2 3.3-2 3.8-4h2.6c-.4 2.5-2.2 4.3-3.5 5 1.3.6 3.4 2.2 4.2 5.2h-2.9c-.6-1.9-2.2-3.4-4.2-3.6v3.6h-.2z"/></svg>',
    max: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><circle cx="12" cy="12" r="8.5"/><path d="M8 15.5V9l4 4 4-4v6.5"/></svg>'
  };

  /* ---------- Photos ---------- */
  // <div class="photo" data-photo="hero-1"> → assets/img/photos/hero-1.jpg; data-src="…" for an explicit path.

  var PHOTO_DIR = "assets/img/photos/";
  function photoTag(name, extra) {
    return '<div class="photo" data-photo="' + esc(name) + '"' + (extra || "") + "></div>";
  }
  function srcTag(src) {
    return src ? '<div class="photo" data-src="' + esc(src) + '"></div>' : photoTag("news-default");
  }
  function loadPhotos(root) {
    $$(".photo:not([data-loaded])", root).forEach(function (el) {
      el.setAttribute("data-loaded", "");
      var src = el.getAttribute("data-src") || PHOTO_DIR + el.getAttribute("data-photo") + ".jpg";
      var img = new Image();
      img.onload = function () { el.style.backgroundImage = 'url("' + src.replace(/"/g, '\\"') + '")'; el.classList.add("has-photo"); };
      img.onerror = function () {
        el.classList.add("no-photo");
        var slide = el.closest(".hero-slide");
        if (slide) slide.classList.add("no-photo-slide");
      };
      img.src = src;
    });
  }

  /* ---------- Shared header & footer ---------- */

  var NAV = [
    ["index.html#about", "Об обществе"],
    ["index.html#projects", "Проекты"],
    ["index.html#members", "Участникам"],
    ["news.html", "Новости"],
    ["index.html#partners", "Партнёры"]
  ];

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
      '<a class="btn btn-gold nav-join" href="join.html">Вступить в РСО</a>' +
      "</nav>" +
      '<a class="btn btn-gold header-cta" href="join.html">Вступить</a>' +
      '<button class="burger" type="button" aria-label="Меню" aria-expanded="false" aria-controls="nav"><span></span></button>' +
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
    var onScroll = function () { header.classList.toggle("is-solid", window.scrollY > 30); };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
  }

  function renderFooter() {
    var mount = $("#site-footer");
    if (!mount) return;
    var half = Math.ceil(PROJECTS.length / 2);
    var link = function (p) { return '<li><a href="project.html?id=' + p.id + '">' + esc(p.title) + "</a></li>"; };
    mount.outerHTML =
      '<footer class="site-footer">' +
      '<div class="footer-sub"><div class="wrap">' +
      "<span>Подписывайтесь на рассылку РСО, чтобы первыми узнавать новости индустрии и Общества.</span>" +
      '<form class="subscribe-form"><label class="sr-only" for="sub-email">Email</label>' +
      '<input id="sub-email" type="email" name="email" placeholder="Ваш email" required>' +
      '<button class="btn btn-gold" type="submit">Подписаться</button>' +
      '<small>Нажимая «Подписаться», вы соглашаетесь с <a href="privacy.html">политикой обработки персональных данных</a>.</small>' +
      '<p class="form-status" role="status"></p></form>' +
      "</div></div>" +
      '<div class="wrap footer-main">' +
      '<div class="footer-brand"><img src="assets/img/logo-full-light.png" alt="Русское спортивное общество" width="128" height="141">' +
      "<p>Объединяем тех, кто делает российский спорт сильнее.</p>" +
      '<div class="socials">' + socialLinks() + "</div></div>" +
      "<div><h4>Проекты</h4><ul>" + PROJECTS.slice(0, half).map(link).join("") + "</ul></div>" +
      '<div><h4 aria-hidden="true">&nbsp;</h4><ul>' + PROJECTS.slice(half).map(link).join("") + "</ul></div>" +
      "<div><h4>Обществу</h4><ul>" +
      '<li><a href="join.html">Вступить в РСО</a></li>' +
      '<li><a href="news.html">Новости</a></li>' +
      '<li><a href="index.html#members">Участникам</a></li>' +
      '<li><a href="index.html#partners">Партнёрам</a></li>' +
      '<li><a href="privacy.html">Политика конфиденциальности</a></li>' +
      "</ul></div></div>" +
      '<div class="wrap footer-bottom"><span>© ' + new Date().getFullYear() + " Русское спортивное общество · rusport.org</span>" +
      "<span>Некоммерческая организация</span></div>" +
      "</footer>";
  }

  /* ---------- Cards ---------- */

  function projectCard(p, i) {
    return (
      '<a class="pcard reveal" href="project.html?id=' + p.id + '">' +
      photoTag("project-" + p.id) +
      (p.status ? '<span class="pcard-badge">' + esc(p.status) + "</span>" : "") +
      '<span class="pcard-num">' + String(i + 1).padStart(2, "0") + "</span>" +
      '<div class="pcard-body"><h3 class="pcard-title">' + esc(p.title) + "</h3>" +
      '<p class="pcard-text">' + esc(p.lead) + "</p></div></a>"
    );
  }

  function audienceCard(a) {
    return (
      '<a class="pcard reveal" href="audience.html?id=' + a.id + '">' +
      photoTag("audience-" + a.id) +
      '<div class="pcard-body"><h3 class="pcard-title">' + esc(a.title) + "</h3>" +
      '<p class="pcard-text">' + esc(a.lead) + "</p></div></a>"
    );
  }

  var MONTHS = ["января", "февраля", "марта", "апреля", "мая", "июня", "июля", "августа", "сентября", "октября", "ноября", "декабря"];
  function fmtDate(iso) {
    var p = String(iso || "").split("-");
    return p.length === 3 ? +p[2] + " " + MONTHS[+p[1] - 1] + " " + p[0] : "";
  }

  function newsCard(n) {
    return (
      '<a class="ncard reveal" href="post.html?id=' + encodeURIComponent(n.id) + '">' +
      '<div class="ncard-img">' + srcTag(n.cover) + "</div>" +
      '<div class="ncard-meta"><span>' + fmtDate(n.date) + "</span>" + (n.tag ? '<span class="tag">' + esc(n.tag) + "</span>" : "") + "</div>" +
      '<h3 class="ncard-title">' + esc(n.title) + "</h3>" +
      (n.lead ? '<p class="ncard-lead">' + esc(n.lead) + "</p>" : "") +
      '<span class="more-link">Подробнее ' + I.arrow + "</span></a>"
    );
  }

  var EMPTY_NEWS = '<div class="news-empty"><b>Новости скоро появятся</b>Следите за Обществом в наших каналах — первые материалы уже готовятся.</div>';

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
      if (!hero.classList.contains("is-paused")) timer = setTimeout(function () { go(current + 1); }, DURATION);
    }

    dots.forEach(function (d, i) { d.addEventListener("click", function () { go(i); }); });
    $(".hero-prev", hero).addEventListener("click", function () { go(current - 1); });
    $(".hero-next", hero).addEventListener("click", function () { go(current + 1); });
    var content = $(".hero-slides", hero);
    content.addEventListener("mouseenter", function () { hero.classList.add("is-paused"); clearTimeout(timer); });
    content.addEventListener("mouseleave", function () { hero.classList.remove("is-paused"); go(current); });

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
    var endpoint = window.RSO_FORM_ENDPOINT || (HAS_BACKEND ? "/api/forms/" : "");
    var data = Object.fromEntries(new FormData(form).entries());
    data.form = kind;

    if (!endpoint) {
      if (status) status.textContent = "Форма в тестовом режиме: сайт открыт без сервера.";
      console.info("[RSO] form data", data);
      return;
    }
    var btn = $("button[type=submit]", form);
    if (btn) btn.disabled = true;
    if (status) status.textContent = "";
    fetch(endpoint, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(data) })
      .then(function (r) {
        return r.json().catch(function () { return {}; }).then(function (j) {
          if (!r.ok || j.ok === false) throw new Error(j.error || "");
          onDone();
        });
      })
      .catch(function (e) {
        if (status) status.textContent = e.message || "Не удалось отправить. Попробуйте ещё раз или напишите нам в Telegram.";
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
    initSlider();
    newsReady.then(function () {
      var grid = fill("#news-grid", NEWS.length ? NEWS.slice(0, 4).map(newsCard).join("") : EMPTY_NEWS);
      loadPhotos(grid);
      observeReveal();
    });
  }

  function notFound(what) {
    document.title = "Страница не найдена — РСО";
    fill("#page", '<section class="page-hero page-hero-plain"><div class="wrap"><h1 class="h1">' + what + " не найден</h1>" +
      '<p class="lead">Возможно, ссылка устарела.</p><p style="margin-top:28px"><a class="btn btn-gold" href="index.html">На главную</a></p></div></section>');
  }

  function pageHero(photo, crumbs, inner) {
    return '<section class="page-hero">' + photo +
      '<div class="wrap"><nav class="crumbs" aria-label="Навигация"><a href="index.html">Главная</a>' +
      crumbs.map(function (c) { return "<span>" + c + "</span>"; }).join("") + "</nav>" + inner + "</div></section>";
  }

  function pageProject() {
    var p = PROJECTS.find(function (x) { return x.id === param("id"); });
    if (!p) return notFound("Проект");
    document.title = p.title + " — Русское спортивное общество";
    var others = PROJECTS.filter(function (x) { return x.id !== p.id; }).slice(0, 3);
    fill("#page",
      pageHero(photoTag("project-" + p.id), ['<a href="index.html#projects">Проекты</a>', esc(p.title)],
        (p.status ? '<span class="pcard-badge">' + esc(p.status) + "</span><br>" : "") +
        '<h1 class="h1">' + esc(p.title) + '</h1><p class="lead">' + esc(p.lead) + "</p>") +
      '<section class="section"><div class="wrap detail"><div>' +
      '<p class="detail-about">' + esc(p.about) + "</p>" +
      '<div class="features">' + p.features.map(function (f) {
        return '<div class="feature reveal"><h3>' + esc(f[0]) + "</h3><p>" + esc(f[1]) + "</p></div>";
      }).join("") + "</div></div>" +
      '<aside class="aside"><h3>' + (p.status ? "Участвуйте с самого старта" : "Станьте частью проекта") + "</h3>" +
      "<p>" + (p.status ? "Участники Общества первыми получают доступ к проекту и влияют на то, каким он будет." : "Проект доступен участникам Русского спортивного общества.") + "</p>" +
      '<a class="btn btn-gold" href="join.html?from=' + p.id + '">Вступить в РСО</a>' +
      '<a class="btn btn-outline" href="' + SOCIAL.telegram + '" target="_blank" rel="noopener">' + I.telegram + "Telegram РСО</a></aside>" +
      "</div></section>" +
      '<section class="section section-ivory"><div class="wrap"><div class="section-head"><h2 class="h2">Другие проекты</h2>' +
      '<a class="more-link" href="index.html#projects">Все проекты ' + I.arrow + "</a></div>" +
      '<div class="grid-3">' + others.map(function (o) { return projectCard(o, PROJECTS.indexOf(o)); }).join("") + "</div></div></section>"
    );
  }

  function pageAudience() {
    var a = AUDIENCES.find(function (x) { return x.id === param("id"); });
    if (!a) return notFound("Раздел");
    document.title = a.title + " — Русское спортивное общество";
    fill("#page",
      pageHero(photoTag("audience-" + a.id), ['<a href="index.html#members">Участникам</a>', esc(a.title)],
        '<span class="kicker">Что вы получаете</span><h1 class="h1" style="margin-top:12px">' + esc(a.title) + '</h1><p class="lead">' + esc(a.lead) + "</p>") +
      '<section class="section"><div class="wrap detail"><div>' +
      '<ol class="benefits">' + a.items.map(function (it) { return '<li class="reveal">' + esc(it) + "</li>"; }).join("") + "</ol></div>" +
      '<aside class="aside"><h3>Готовы присоединиться?</h3><p>Заполните анкету — мы свяжемся с вами и расскажем об условиях членства.</p>' +
      '<a class="btn btn-gold" href="join.html?from=' + a.id + '">Вступить в РСО</a></aside>' +
      "</div></section>" +
      '<section class="section section-ivory"><div class="wrap"><div class="section-head"><h2 class="h2">Другие участники</h2></div>' +
      '<div class="grid-3">' + AUDIENCES.filter(function (x) { return x.id !== a.id; }).map(audienceCard).join("") + "</div></div></section>"
    );
  }

  function pageNews() { newsReady.then(renderNewsPage); }

  function renderNewsPage() {
    var grid = $("#news-feed");
    var more = $("#news-more");
    if (!NEWS.length) { grid.innerHTML = EMPTY_NEWS; more.hidden = true; return; }
    var tags = ["Все"].concat(NEWS.map(function (n) { return n.tag; }).filter(function (t, i, arr) { return t && arr.indexOf(t) === i; }));
    var PAGE = 12, shown = PAGE, list = NEWS;

    function render() {
      grid.innerHTML = list.slice(0, shown).map(newsCard).join("");
      more.hidden = shown >= list.length;
      loadPhotos(grid);
      observeReveal();
    }
    if (tags.length > 2) {
      fill("#filters", tags.map(function (t, i) {
        return '<button class="filter' + (i === 0 ? " is-active" : "") + '" type="button">' + esc(t) + "</button>";
      }).join(""));
      $$("#filters .filter").forEach(function (b) {
        b.addEventListener("click", function () {
          $$("#filters .filter").forEach(function (x) { x.classList.toggle("is-active", x === b); });
          list = b.textContent === "Все" ? NEWS : NEWS.filter(function (n) { return n.tag === b.textContent; });
          shown = PAGE;
          render();
        });
      });
    }
    more.addEventListener("click", function () { shown += PAGE; render(); });
    render();
  }

  function linkify(text) {
    return esc(text).replace(/(https?:\/\/[^\s<]+)/g, '<a href="$1" target="_blank" rel="noopener">$1</a>');
  }

  // YouTube / Rutube / VK Video links → embeddable player URL; direct .mp4 → <video>.
  function videoEmbed(url) {
    var m;
    url = String(url || "").trim();
    if ((m = url.match(/(?:youtube\.com\/(?:watch\?v=|shorts\/|embed\/)|youtu\.be\/)([\w-]{11})/))) return iframe("https://www.youtube.com/embed/" + m[1]);
    if ((m = url.match(/rutube\.ru\/(?:video|play\/embed|shorts)\/([\w]+)/))) return iframe("https://rutube.ru/play/embed/" + m[1]);
    if ((m = url.match(/(?:vk\.com|vkvideo\.ru|vk\.ru)\/(?:video|clip)(-?\d+)_(\d+)/))) return iframe("https://vk.com/video_ext.php?oid=" + m[1] + "&id=" + m[2] + "&hd=2");
    if (/\.(mp4|webm)(\?|$)/i.test(url)) return '<div class="video"><video src="' + esc(url) + '" controls preload="metadata"></video></div>';
    return url ? '<p><a href="' + esc(url) + '" target="_blank" rel="noopener">Смотреть видео</a></p>' : "";
    function iframe(src) {
      return '<div class="video"><iframe src="' + esc(src) + '" allow="autoplay; encrypted-media; fullscreen; picture-in-picture" allowfullscreen loading="lazy"></iframe></div>';
    }
  }

  function renderBlocks(blocks) {
    return (blocks || []).map(function (b) {
      switch (b.t) {
        case "h": return "<h2>" + esc(b.text) + "</h2>";
        case "quote": return "<blockquote>" + esc(b.text) + (b.author ? "<cite>— " + esc(b.author) + "</cite>" : "") + "</blockquote>";
        case "img": return b.src ? '<figure><img src="' + esc(b.src) + '" alt="' + esc(b.caption || "") + '" loading="lazy">' + (b.caption ? "<figcaption>" + esc(b.caption) + "</figcaption>" : "") + "</figure>" : "";
        case "video": return videoEmbed(b.url);
        default: return b.text ? "<p>" + linkify(b.text) + "</p>" : "";
      }
    }).join("");
  }
  function pagePost() {
    var id = param("id") || "";
    var local = function () { return NEWS.find(function (x) { return String(x.id) === id; }); };
    var detail = HAS_BACKEND
      ? getJSON("/api/news/" + encodeURIComponent(id) + "/").catch(function () { return newsReady.then(local); })
      : Promise.resolve(local());
    Promise.all([detail, newsReady]).then(function (res) {
      renderPost(res[0]);
      loadPhotos($("#page"));
      observeReveal();
    });
  }

  function renderPost(n) {
    if (!n) return notFound("Материал");
    document.title = n.title + " — Новости РСО";
    var related = NEWS.filter(function (x) { return x.id !== n.id; }).slice(0, 4);
    fill("#page",
      '<section class="page-hero page-hero-plain"><div class="wrap"><div class="article">' +
      '<nav class="crumbs"><a href="index.html">Главная</a><span><a href="news.html">Новости</a></span></nav>' +
      '<div class="ncard-meta" style="margin:0 0 14px;color:rgba(255,255,255,.7)"><span>' + fmtDate(n.date) + "</span>" + (n.tag ? '<span style="color:var(--gold-light)">' + esc(n.tag) + "</span>" : "") + "</div>" +
      '<h1 class="h1" style="text-transform:none">' + esc(n.title) + "</h1></div></div></section>" +
      '<section class="section"><div class="wrap"><article class="article">' +
      (n.cover ? '<div class="article-cover photo" data-src="' + esc(n.cover) + '"></div>' : "") +
      (n.lead ? '<p class="article-lead">' + esc(n.lead) + "</p>" : "") +
      '<div class="article-body">' + renderBlocks(n.blocks) + "</div>" +
      '<div class="article-foot"><a class="btn btn-outline-dark" href="news.html">' + I.arrowLeft + "Все новости</a>" +
      '<a class="btn btn-navy" href="' + SOCIAL.telegram + '" target="_blank" rel="noopener">' + I.telegram + "Telegram РСО</a></div>" +
      "</article></div></section>" +
      (related.length ? '<section class="section section-ivory"><div class="wrap"><div class="section-head"><h2 class="h2">Читайте также</h2>' +
        '<a class="more-link" href="news.html">Все новости ' + I.arrow + '</a></div><div class="news-grid">' + related.map(newsCard).join("") + "</div></div></section>" : "")
    );
  }

  function pageJoin() {
    var form = $("#join-form");
    var tabs = $$(".tab");
    function setType(type) {
      tabs.forEach(function (t) {
        var on = t.dataset.type === type;
        t.classList.toggle("is-active", on);
        t.setAttribute("aria-selected", on);
      });
      form.elements.member_type.value = type;
      $$("[data-for]", form).forEach(function (el) {
        var on = el.dataset.for === type;
        el.hidden = !on;
        $$("input, select, textarea", el).forEach(function (f) { f.disabled = !on; });
      });
    }
    tabs.forEach(function (t) { t.addEventListener("click", function () { setType(t.dataset.type); }); });
    setType(param("type") === "company" ? "company" : "person");

    var interest = form.elements.interest;
    interest.insertAdjacentHTML("beforeend", PROJECTS.map(function (p) {
      return '<option value="' + p.id + '">' + esc(p.title) + "</option>";
    }).join(""));
    if (param("from")) interest.value = param("from");

    form.addEventListener("submit", function (e) {
      e.preventDefault();
      submitForm(form, "join", function () {
        form.hidden = true;
        $(".tabs").hidden = true;
        $(".form-done").classList.add("is-visible");
      });
    });
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
    ({ home: pageHome, project: pageProject, audience: pageAudience, news: pageNews, post: pagePost, join: pageJoin }[page] || function () {})();
    $$(".socials-mount").forEach(function (el) { el.innerHTML = socialLinks(); });
    loadPhotos(document);
    initSubscribe();
    observeReveal();
  });
})();
