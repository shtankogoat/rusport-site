// РУ / EN. Russian is the source text in the HTML and data.js; for English every visible
// Russian phrase (text nodes + placeholder/aria-label/title/alt) is swapped using EN below.
// The choice is kept in localStorage; ?lang=en / ?lang=ru in a link also sets it.
(function () {
  "use strict";

  var KEY = "rso_lang";
  var lang = "ru";
  try {
    var q = new URLSearchParams(location.search).get("lang");
    if (q === "en" || q === "ru") localStorage.setItem(KEY, q);
    lang = localStorage.getItem(KEY) === "en" ? "en" : "ru";
  } catch (e) { /* storage unavailable: Russian */ }
  document.documentElement.lang = lang;

  var EN = {
    // Brand & navigation
    "Русское": "Russian",
    "спортивное": "Sport",
    "общество": "Society",
    "Русское спортивное общество": "Russian Sport Society",
    "Русское спортивное общество — на главную": "Russian Sport Society — home",
    "Об обществе": "About",
    "Проекты": "Projects",
    "Участникам": "Members",
    "Партнёры": "Partners",
    "Вступить в РСО": "Join RSO",
    "Вступить": "Join",
    "Главное меню": "Main menu",
    "Меню": "Menu",
    "Навигация": "Breadcrumbs",
    "Главная": "Home",
    "Главное": "Highlights",

    // Hero slider
    "На сайт премии": "Visit the award website",
    "Премия «Лидеры индустрии спорта»": "The Sport Industry Leaders Award",
    "Здоровая нация — сильная нация": "A healthy nation is a strong nation",
    "Анкета скоро появится": "The application form is coming soon",
    "А пока подпишитесь на наши каналы, чтобы не пропустить старт.": "Meanwhile, follow our channels so you don't miss the launch.",
    "Открыть анкету в новом окне": "Open the form in a new window",
    "Отправляя анкету, вы даёте согласие на обработку персональных данных в соответствии с": "By submitting the form, you consent to the processing of your personal data in accordance with the",
    "Анкета": "Application form",
    "России": "Russia",
    "Наши проекты": "Our projects",
    "сообщества": "community",
    "Предыдущий слайд": "Previous slide",
    "Следующий слайд": "Next slide",

    // Projects
    "РСО находится между государством и бизнесом и создаёт платформу, где встречаются заказчики и исполнители спортивной отрасли.": "RSO stands between the state and business, creating a platform where the sport industry's clients and contractors meet.",
    "Запуск в 2027": "Launching in 2027",
    "Сообщество": "Community",
    "Профессионалы и эксперты индустрии спорта. Усиливаем друг друга и увеличиваем рынок спорта в стране.": "Professionals and experts of the sport industry. We strengthen each other and grow the country's sport market.",
    "B2B платформа": "B2B platform",
    "Каталог компаний, работающих в индустрии. Проведение тендеров и онлайн-экспо 24/7/365.": "A directory of companies working in the industry. Tenders and an online expo 24/7/365.",
    "Аналитика рынка": "Market analytics",
    "Собираем данные и анализируем рынок.": "We collect data and analyse the market.",
    "СпортТех": "SportTech",
    "Помогаем технологичным и инновационным компаниям занимать своё место на рынке.": "We help technology and innovative companies win their place in the market.",
    "Инвестиции": "Investments",
    "Инвестируем в спортивные проекты, инфраструктуру и технологические компании.": "We invest in sport projects, infrastructure and technology companies.",
    "Медиа": "Media",
    "Рассказываем о людях, идеях и возможностях.": "Stories about people, ideas and opportunities.",
    "Благотворительная платформа": "Charity platform",
    "Спорт как социальное явление. Помогаем фондам и общественным инициативам делать спорт доступнее.": "Sport as a social force. We help foundations and civic initiatives make sport more accessible.",
    "Академия": "Academy",
    "Развиваем тех, кто развивает спорт. Практическое образование на базе экспертизы сильнейших участников сообщества.": "Developing those who develop sport. Practical education built on the expertise of the community's strongest members.",
    "Организация мероприятий": "Events",
    "Организуем и продюсируем крупные мероприятия отрасли. Проводим конференции и усиливаем партнёров.": "We organise and produce major industry events, run conferences and amplify our partners.",

    // About / pillars
    "Инфраструктура диалога со спортивной страной": "Infrastructure for a dialogue with a sporting nation",
    "РСО не просит «поддержать сообщество». Оно даёт инструмент, который помогает видеть отрасль, слышать людей и реализовывать инициативы.": "RSO doesn't ask you to “support the community”. It provides a tool that helps see the industry, hear people and deliver initiatives.",
    "Слышать": "Listen",
    "Комитеты, региональная сеть и сообщество дают постоянный канал обратной связи от отрасли и людей спорта.": "Committees, a regional network and the community provide a constant feedback channel from the industry and people in sport.",
    "Знать": "Know",
    "Исследования, индексы и ежегодный доклад дают объективную картину состояния спортивной индустрии.": "Research, indices and an annual report give an objective picture of the state of the sport industry.",
    "Делать": "Act",
    "РСО объединяет государство, бизнес и спорт вокруг конкретных проектов национального и регионального масштаба.": "RSO brings together the state, business and sport around concrete national and regional projects.",

    // Join band
    "Следите за Русским спортивным обществом": "Follow the Russian Sport Society",
    "Подпишитесь на нас, чтобы быть в курсе всех новостей и проектов Общества.": "Follow us to stay up to date with all the Society's news and projects.",

    // Two ideas
    "Две идеи. Одна страна": "Two ideas. One country",
    "Скоро все смогут вступить в Общество и участвовать во всех проектах. А пока подпишитесь на нас, чтобы быть в курсе всех новостей.": "Soon everyone will be able to join the Society and take part in all its projects. Meanwhile, follow us to stay up to date.",
    "Государство": "The state",
    "Спорт как национальная идея": "Sport as a national idea",
    "Объединяет людей, регионы и поколения. Говорит на всех языках. Создаёт общую идентичность, гордость и чувство принадлежности.": "It unites people, regions and generations. It speaks every language. It creates a shared identity, pride and a sense of belonging.",
    "Человек": "The person",
    "Спорт как норма жизни": "Sport as a way of life",
    "Здоровье, семья, образование, досуг, городская среда и ежедневная привычка миллионов граждан России.": "Health, family, education, leisure, the urban environment and a daily habit of millions of people in Russia.",
    "Усиливая индустрию —": "Strengthening the industry,",
    "мы усиливаем страну": "we strengthen the country",

    // Audiences
    "Что получает профессиональная спортивная индустрия": "What the professional sport industry gets",
    "Клубы · Лиги · Федерации": "Clubs · Leagues · Federations",
    "Менеджеры · Владельцы": "Managers · Owners",
    "Компании · Бренды": "Companies · Brands",
    "Профессиональные спортсмены": "Professional athletes",
    "Партнёры и поставщики": "Partners and suppliers",
    "Кадры и эксперты": "Talent and experts",
    "Исследования и лучшие практики": "Research and best practices",
    "Отраслевое представительство": "Industry representation",
    "Совместные проекты и GR": "Joint projects and GR",
    "Профессиональные связи": "Professional connections",
    "Новые клиенты и партнёры": "New clients and partners",
    "Личная репутация": "Personal reputation",
    "Доступ к аналитике": "Access to analytics",
    "Обмен опытом с лидерами": "Sharing experience with leaders",
    "Обучение лучшим практикам": "Learning best practices",
    "Инвестиции в проекты": "Investing in projects",
    "Доступ к спортивной индустрии": "Access to the sport industry",
    "Спонсорство и интеграции": "Sponsorship and integrations",
    "B2B-контакты": "B2B contacts",
    "Исследования аудитории": "Audience research",
    "Площадки для собственных инициатив": "Platforms for your own initiatives",
    "Работа в индустрии": "Jobs in the industry",
    "Обучение и профессиональный рост": "Education and professional growth",
    "Реализация своих медиаправ": "Monetising your media rights",

    // Partners & manifesto
    "Стать партнёром": "Become a partner",
    "Логотип партнёра": "Partner logo",
    "Люди": "People",
    "Организации": "Organisations",
    "Бизнес": "Business",
    "Спорт": "Sport",
    "Наша цель —": "Our goal is",
    "крупнейшее спортивное сообщество в стране": "the largest sport community in the country",

    // Footer
    "Объединяем тех, кто делает российский спорт сильнее.": "Uniting those who make Russian sport stronger.",
    "ВКонтакте": "VK",
    "Обществу": "Society",
    "Партнёрам": "For partners",
    "Политика конфиденциальности": "Privacy policy",
    "Некоммерческая организация": "Non-profit organisation",

    // Join page
    "Заполните анкету. Мы рассмотрим заявку, свяжемся с вами и пришлём ссылку на оплату членского взноса.": "Fill in the application. We'll review it, contact you and send a link to pay the membership fee.",
    "Физическое лицо": "Individual",
    "Юридическое лицо": "Company",
    "Менеджер": "Manager",
    "Организация": "Organisation",
    "политикой конфиденциальности": "privacy policy",
    "Как стать участником": "How to become a member",
    "Анкета": "Application",
    "Заполните форму — это займёт 3 минуты.": "Fill in the form — it takes 3 minutes.",
    "Рассмотрение": "Review",
    "Мы свяжемся с вами и ответим на вопросы.": "We'll contact you and answer your questions.",
    "Членский взнос": "Membership fee",
    "Оплата онлайн картой или по счёту для юрлиц.": "Pay online by card, or by invoice for companies.",
    "Добро пожаловать": "Welcome",
    "Вы получаете РСО ID и доступ к проектам Общества.": "You receive an RSO ID and access to the Society's projects.",

    // Privacy
    "Политика обработки персональных данных": "Personal data policy",
    "Настоящая политика определяет порядок обработки персональных данных пользователей сайта rusport.org. Полная редакция документа будет опубликована после государственной регистрации организации.": "This policy sets out how the personal data of rusport.org users is processed. The full version will be published after the organisation's state registration.",
    "Какие данные мы собираем": "What data we collect",
    "ФИО, телефон, адрес электронной почты, город, сведения о месте работы и организации — только те данные, которые вы указываете в формах на сайте.": "Name, phone, email, city, workplace and organisation details — only the data you enter in the site's forms.",
    "Зачем мы их используем": "Why we use it",
    "Для рассмотрения заявки на вступление в Общество и связи с вами.": "To review your membership application and contact you.",
    "Как с нами связаться": "How to contact us",
    "По вопросам обработки персональных данных пишите нам в": "For personal data questions, write to us on",

    // Project pages

    "РСО ID": "RSO ID",

    "Каталог компаний": "Company directory",

    "Инфраструктура": "Infrastructure",

    // Page titles & descriptions
    "Русское спортивное общество — объединяем тех, кто делает российский спорт сильнее": "Russian Sport Society — uniting those who make Russian sport stronger",
    "Русское спортивное общество (РСО) — некоммерческая организация, объединяющая предпринимателей, руководителей и экспертов индустрии спорта. Платформа, где встречаются государство, бизнес и спорт.": "The Russian Sport Society (RSO) is a non-profit uniting entrepreneurs, executives and experts of the sport industry — a platform where the state, business and sport meet.",
    "Вступить — Русское спортивное общество": "Join — Russian Sport Society",
    "Анкета для вступления в Русское спортивное общество для физических и юридических лиц.": "Membership application for the Russian Sport Society, for individuals and companies.",
    "Политика конфиденциальности — Русское спортивное общество": "Privacy policy — Russian Sport Society",
    "Политика обработки персональных данных.": "Personal data policy."
  };

  // Phrases with a variable part.
  var PATTERNS = [
    [/^© (\d{4}) Русское спортивное общество · rusport\.org$/, "© $1 Russian Sport Society · rusport.org"],
    [/^(.+) — Русское спортивное общество$/, function (m, name) { return tr(name) !== name ? tr(name) + " — Russian Sport Society" : m; }]
  ];

  function norm(s) { return s.replace(/\s+/g, " ").trim(); }

  function tr(s) {
    var key = norm(s);
    if (!key) return s;
    if (Object.prototype.hasOwnProperty.call(EN, key)) return EN[key];
    for (var i = 0; i < PATTERNS.length; i++) {
      if (PATTERNS[i][0].test(key)) return key.replace(PATTERNS[i][0], PATTERNS[i][1]);
    }
    return s;
  }

  var ATTRS = ["placeholder", "aria-label", "title", "alt"];
  var SKIP = { SCRIPT: 1, STYLE: 1, TEXTAREA: 1 };

  function translate(root) {
    if (lang !== "en" || !root) return;
    if (root.nodeType === 3) return translateText(root);
    if (root.nodeType !== 1 || SKIP[root.nodeName]) return;
    var walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT);
    var n, list = [];
    while ((n = walker.nextNode())) list.push(n);
    list.forEach(translateText);
    var els = [root].concat(Array.prototype.slice.call(root.querySelectorAll("[placeholder],[aria-label],[title],[alt]")));
    els.forEach(function (el) {
      ATTRS.forEach(function (a) {
        var v = el.getAttribute && el.getAttribute(a);
        if (v) { var t = tr(v); if (t !== v) el.setAttribute(a, t); }
      });
    });
  }

  function translateText(node) {
    var p = node.parentNode;
    if (!p || SKIP[p.nodeName] || (p.closest && p.closest("[data-no-i18n], .article-body"))) return;
    var v = node.nodeValue;
    var t = tr(v);
    if (t === v) return;
    var lead = v.match(/^\s*/)[0], trail = v.match(/\s*$/)[0];
    node.nodeValue = lead + t + trail;
  }

  function translateHead() {
    if (lang !== "en") return;
    document.title = tr(document.title);
    var d = document.querySelector("meta[name=description]");
    if (d) d.setAttribute("content", tr(d.getAttribute("content")));
  }

  var observing = false;
  function apply(root) {
    if (lang !== "en") return;
    translate(root || document.body);
    translateHead();
    if (!observing && "MutationObserver" in window) {
      observing = true;
      new MutationObserver(function (muts) {
        muts.forEach(function (m) { m.addedNodes.forEach(translate); });
        translateHead();
      }).observe(document.body, { childList: true, subtree: true });
    }
  }

  function setLang(next) {
    try { localStorage.setItem(KEY, next); } catch (e) { /* ignore */ }
    var url = new URL(location.href);
    url.searchParams.delete("lang");
    // Same URL with a #hash (e.g. index.html#about) only scrolls, it doesn't reload — force it.
    if (url.toString() === location.href) location.reload();
    else location.href = url.toString();
  }

  window.RSO_I18N = { lang: lang, t: tr, apply: apply, setLang: setLang };
})();
