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
    "Новости": "News",
    "Партнёры": "Partners",
    "Вступить в РСО": "Join RSO",
    "Вступить": "Join",
    "Главное меню": "Main menu",
    "Меню": "Menu",
    "Навигация": "Breadcrumbs",
    "Главная": "Home",
    "Главное": "Highlights",

    // Hero slider
    "Спорт — национальная идея": "Sport is the national idea of",
    "России": "Russia",
    "Объединяем тех, кто делает российский спорт сильнее. Здоровая нация — сильная нация.": "Uniting those who make Russian sport stronger. A healthy nation is a strong nation.",
    "Вступить в общество": "Join the Society",
    "Наши проекты": "Our projects",
    "Ноябрь 2026": "November 2026",
    "Презентация Общества": "Presenting the Society",
    "всему рынку": "to the whole market",
    "Представим РСО, его проекты и первых участников. Заполните анкету, чтобы получить приглашение.": "We will present RSO, its projects and its first members. Fill in the application to receive an invitation.",
    "Получить приглашение": "Get an invitation",
    "Приём заявок открыт": "Applications are open",
    "Станьте частью": "Become part of the",
    "сообщества": "community",
    "Клубы, лиги, федерации, компании, менеджеры и спортсмены — платформа, где встречаются заказчики и исполнители индустрии спорта.": "Clubs, leagues, federations, companies, managers and athletes: a platform where the sport industry's clients and contractors meet.",
    "Заполнить анкету": "Apply now",
    "Что вы получите": "What you get",
    "Слайд 1": "Slide 1",
    "Слайд 2": "Slide 2",
    "Слайд 3": "Slide 3",
    "Предыдущий слайд": "Previous slide",
    "Следующий слайд": "Next slide",

    // Projects
    "РСО находится между государством и бизнесом и создаёт платформу, где встречаются заказчики и исполнители спортивной отрасли.": "RSO stands between the state and business, creating a platform where the sport industry's clients and contractors meet.",
    "Запуск в 2027": "Launching in 2027",
    "Запуск весной 2027": "Launching spring 2027",
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
    "Вступить в Русское спортивное общество": "Join the Russian Sport Society",
    "Для физических и юридических лиц. Анкета займёт 3 минуты.": "For individuals and companies. The application takes 3 minutes.",

    // News
    "Главные новости": "Top news",
    "Все новости": "All news",
    "Новости скоро появятся": "News coming soon",
    "Следите за Обществом в наших каналах — первые материалы уже готовятся.": "Follow the Society on our channels — the first stories are on their way.",
    "События Общества и главное об индустрии спорта.": "Society events and the key sport industry news.",
    "Показать ещё": "Show more",
    "Подробнее": "Read more",
    "Все": "All",
    "Читайте также": "Read also",
    "Telegram РСО": "RSO on Telegram",

    // Two ideas
    "Две идеи. Одна спортивная страна": "Two ideas. One sporting nation",
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
    "Клубы и федерации, менеджеры и владельцы, компании и бренды, профессиональные спортсмены — выберите, кого вы представляете, и посмотрите, чем Общество полезно именно вам.": "Clubs and federations, managers and owners, companies and brands, professional athletes — choose who you represent and see how the Society helps you.",
    "Клубы · Лиги · Федерации": "Clubs · Leagues · Federations",
    "Отраслевое представительство и инструменты для роста спортивных организаций.": "Industry representation and growth tools for sport organisations.",
    "Менеджеры · Владельцы": "Managers · Owners",
    "Связи, репутация и доступ к лучшим практикам для тех, кто управляет спортивным бизнесом.": "Connections, reputation and access to best practices for those who run sport businesses.",
    "Компании · Бренды": "Companies · Brands",
    "Прямой доступ к спортивной индустрии и её аудиториям.": "Direct access to the sport industry and its audiences.",
    "Профессиональные спортсмены": "Professional athletes",
    "Карьера после и вместе со спортом: работа, инвестиции и развитие личного бренда.": "A career alongside and after sport: jobs, investments and building a personal brand.",
    "Что вы получаете": "What you get",
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
    "Готовы присоединиться?": "Ready to join?",
    "Заполните анкету — мы свяжемся с вами и расскажем об условиях членства.": "Fill in the application — we'll get in touch and explain the membership terms.",
    "Другие участники": "Other members",

    // Partners & manifesto
    "Стать партнёром": "Become a partner",
    "Логотип партнёра": "Partner logo",
    "Информационные партнёры": "Media partners",
    "Люди": "People",
    "Организации": "Organisations",
    "Бизнес": "Business",
    "Спорт": "Sport",
    "Наша цель —": "Our goal is",
    "крупнейшее спортивное сообщество в стране": "the largest sport community in the country",
    "Присоединиться": "Join us",

    // Footer & subscribe
    "Подписывайтесь на рассылку РСО, чтобы первыми узнавать новости индустрии и Общества.": "Subscribe to the RSO newsletter to be the first to hear industry and Society news.",
    "Подписаться": "Subscribe",
    "Нажимая «Подписаться», вы соглашаетесь с": "By clicking “Subscribe” you agree to the",
    "политикой обработки персональных данных": "personal data policy",
    "Объединяем тех, кто делает российский спорт сильнее.": "Uniting those who make Russian sport stronger.",
    "ВКонтакте": "VK",
    "Обществу": "Society",
    "Партнёрам": "For partners",
    "Политика конфиденциальности": "Privacy policy",
    "Некоммерческая организация": "Non-profit organisation",
    "Ваш email": "Your email",
    "Готово! Вы подписаны на новости Общества.": "Done! You're subscribed to Society news.",
    "Форма в тестовом режиме: сайт открыт без сервера.": "The form is in test mode: the site is running without a server.",
    "Не удалось отправить. Попробуйте ещё раз или напишите нам в Telegram.": "Couldn't send. Please try again or message us on Telegram.",
    "Укажите корректный email": "Please enter a valid email",
    "Заполните ФИО и телефон": "Please fill in your name and phone",
    "Укажите название организации": "Please enter the organisation name",
    "Некорректные данные": "Invalid data",
    "Неизвестная форма": "Unknown form",

    // Join page
    "Заполните анкету. Мы рассмотрим заявку, свяжемся с вами и пришлём ссылку на оплату членского взноса.": "Fill in the application. We'll review it, contact you and send a link to pay the membership fee.",
    "Физическое лицо": "Individual",
    "Юридическое лицо": "Company",
    "Контактное лицо": "Contact person",
    "ФИО *": "Full name *",
    "Телефон *": "Phone *",
    "Город": "City",
    "Место работы": "Workplace",
    "Роль в спорте": "Role in sport",
    "Выберите": "Choose",
    "Руководитель / владелец": "Executive / owner",
    "Менеджер": "Manager",
    "Эксперт / консультант": "Expert / consultant",
    "Профессиональный спортсмен": "Professional athlete",
    "Тренер": "Coach",
    "Другое": "Other",
    "Организация": "Organisation",
    "Название организации *": "Organisation name *",
    "ИНН *": "Tax ID (INN) *",
    "10 или 12 цифр": "10 or 12 digits",
    "Ваша должность": "Your position",
    "Тип организации": "Organisation type",
    "Клуб / лига / федерация": "Club / league / federation",
    "Компания / бренд": "Company / brand",
    "Фитнес-клуб / сеть": "Fitness club / chain",
    "Технологическая компания": "Technology company",
    "Агентство / медиа": "Agency / media",
    "Образовательная организация": "Educational institution",
    "Фонд / НКО": "Foundation / NGO",
    "Сайт компании": "Company website",
    "Какой проект Общества вам наиболее интересен?": "Which Society project interests you most?",
    "Все направления": "All areas",
    "Расскажите о себе и о том, чего вы ждёте от Общества": "Tell us about yourself and what you expect from the Society",
    "Я даю согласие на обработку персональных данных в соответствии с": "I consent to the processing of my personal data in accordance with the",
    "политикой конфиденциальности": "privacy policy",
    "Отправить анкету": "Submit application",
    "Заявка отправлена": "Application sent",
    "Спасибо! Мы получили вашу анкету": "Thank you! We've received your application",
    "Мы рассмотрим её в течение нескольких рабочих дней и пришлём на email ссылку на оплату членского взноса. А пока — подпишитесь на наши каналы.": "We'll review it within a few working days and email you a link to pay the membership fee. Meanwhile, follow our channels.",
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
    "Для рассмотрения заявки на вступление в Общество, связи с вами и отправки новостей, если вы на них подписались.": "To review your membership application, contact you and send news if you subscribed.",
    "Как с нами связаться": "How to contact us",
    "По вопросам обработки персональных данных пишите нам в": "For personal data questions, write to us on",

    // Not found
    "Материал не найден": "Story not found",
    "Проект не найден": "Project not found",
    "Раздел не найден": "Section not found",
    "Возможно, ссылка устарела.": "The link may be out of date.",
    "На главную": "Go to home page",

    // Project pages
    "Участвуйте с самого старта": "Take part from day one",
    "Участники Общества первыми получают доступ к проекту и влияют на то, каким он будет.": "Society members get first access to the project and help shape it.",
    "Станьте частью проекта": "Become part of the project",
    "Проект доступен участникам Русского спортивного общества.": "The project is available to members of the Russian Sport Society.",
    "Другие проекты": "Other projects",
    "Все проекты": "All projects",

    "Сообщество РСО — это закрытый круг руководителей, предпринимателей и экспертов спортивной отрасли. Каждый участник получает РСО ID — единый цифровой профиль, по которому его узнают партнёры, заказчики и коллеги внутри Общества.": "The RSO community is a closed circle of executives, entrepreneurs and experts of the sport industry. Every member gets an RSO ID — a single digital profile by which partners, clients and colleagues recognise them within the Society.",
    "РСО ID": "RSO ID",
    "Единый профиль участника: компетенции, проекты, рекомендации и статус в Обществе.": "A single member profile: expertise, projects, recommendations and status in the Society.",
    "Отраслевые комитеты": "Industry committees",
    "Рабочие группы по направлениям: профессиональный и массовый спорт, фитнес, спортивная медицина, киберспорт, инфраструктура.": "Working groups by area: professional and mass sport, fitness, sports medicine, esports, infrastructure.",
    "Региональная сеть": "Regional network",
    "Представительства Общества в регионах — чтобы связи работали не только в Москве.": "Society branches in the regions — so connections work beyond Moscow.",
    "Закрытые встречи": "Private meetings",
    "Регулярные форматы для участников: завтраки, клубные вечера, стратегические сессии.": "Regular formats for members: breakfasts, club evenings, strategy sessions.",

    "Платформа, где встречаются заказчики и исполнители спортивной отрасли: клубы, федерации, девелоперы и муниципалитеты находят проверенных поставщиков оборудования, технологий и услуг.": "A platform where the sport industry's clients and contractors meet: clubs, federations, developers and municipalities find trusted suppliers of equipment, technology and services.",
    "Каталог компаний": "Company directory",
    "Проверенные участники рынка с рекомендациями и историей проектов.": "Verified market players with recommendations and project track records.",
    "Тендеры": "Tenders",
    "Прозрачная площадка для закупок: от оснащения залов до строительства объектов.": "A transparent procurement platform: from equipping gyms to building facilities.",
    "Онлайн-экспо 24/7/365": "Online expo 24/7/365",
    "Постоянная выставка продуктов и решений — без привязки к датам форумов.": "A permanent showcase of products and solutions — not tied to forum dates.",
    "Запросы и рекомендации": "Requests and referrals",
    "Участники Общества рекомендуют подрядчиков друг другу.": "Society members recommend contractors to each other.",

    "Объективная картина состояния спортивной индустрии: исследования, отраслевые индексы и ежегодный доклад Общества. Данные, на которые можно опереться при принятии решений — в бизнесе и в государстве.": "An objective picture of the sport industry: research, industry indices and the Society's annual report. Data you can rely on for decisions — in business and in government.",
    "Ежегодный доклад": "Annual report",
    "Состояние спортивной индустрии России: объём рынка, тренды, инвестиции, кадры.": "The state of Russia's sport industry: market size, trends, investments, talent.",
    "Отраслевые индексы": "Industry indices",
    "Регулярные замеры настроений и ожиданий участников рынка.": "Regular measurements of market sentiment and expectations.",
    "Исследования по запросу": "Research on request",
    "Аудитория, спрос, экономические эффекты мероприятий.": "Audiences, demand, the economic impact of events.",
    "Открытые данные": "Open data",
    "Ключевые показатели в открытом доступе для СМИ и органов власти.": "Key indicators openly available to media and authorities.",

    "Направление для стартапов и технологических компаний: выход на заказчиков, пилотные внедрения в клубах и лигах, экспертиза и знакомство с инвесторами.": "A track for startups and technology companies: access to clients, pilots in clubs and leagues, expert review and introductions to investors.",
    "Пилоты": "Pilots",
    "Тестирование решений на площадках участников Общества.": "Testing solutions at Society members' venues.",
    "Экспертиза": "Expert review",
    "Оценка продукта практиками отрасли и обратная связь от заказчиков.": "Product assessment by industry practitioners and feedback from clients.",
    "Выход на рынок": "Market entry",
    "Знакомства с клубами, федерациями, сетями и корпорациями.": "Introductions to clubs, federations, chains and corporations.",
    "Технология дня": "Tech of the day",
    "Рассказываем о лучших мировых и российских решениях в наших медиа.": "We cover the best global and Russian solutions in our media.",

    "Связываем спортивные проекты с капиталом: помогаем подготовить проект к инвестициям, находим партнёров и формируем синдикаты участников Общества.": "We connect sport projects with capital: we help prepare projects for investment, find partners and form syndicates of Society members.",
    "Инфраструктура": "Infrastructure",
    "Спортивные объекты, клубы и сети — от идеи до запуска.": "Sport facilities, clubs and chains — from idea to launch.",
    "Технологии": "Technology",
    "Ранние и зрелые технологические компании отрасли.": "Early-stage and mature technology companies in the industry.",
    "Синдикаты": "Syndicates",
    "Совместные инвестиции участников Общества.": "Joint investments by Society members.",
    "Подготовка проектов": "Project preparation",
    "Финансовая модель, упаковка и проверка гипотез с экспертами.": "Financial model, packaging and hypothesis testing with experts.",

    "Медиа Общества — о тех, кто делает российский спорт сильнее: интервью, кейсы, аналитика и новости индустрии. Уже сейчас — в Telegram, MAX и ВКонтакте.": "The Society's media — about those who make Russian sport stronger: interviews, case studies, analytics and industry news. Already live on Telegram, MAX and VK.",
    "Новости индустрии": "Industry news",
    "Главное о рынке спорта — каждый день.": "The key sport market news — every day.",
    "Кейсы и истории": "Case studies and stories",
    "Как строятся сильные спортивные бренды и компании.": "How strong sport brands and companies are built.",
    "Интервью": "Interviews",
    "Разговоры с руководителями клубов, федераций и компаний.": "Conversations with leaders of clubs, federations and companies.",
    "Площадка для участников": "A stage for members",
    "Участники Общества рассказывают о своих проектах.": "Society members talk about their projects.",

    "Платформа, которая соединяет благотворительные фонды и общественные инициативы с бизнесом и спортивными организациями — чтобы спорт был доступен детям, людям с инвалидностью и жителям малых городов.": "A platform connecting charities and civic initiatives with business and sport organisations — so that sport is accessible to children, people with disabilities and residents of small towns.",
    "Проекты фондов": "Foundation projects",
    "Каталог проверенных инициатив в сфере спорта.": "A directory of verified sport initiatives.",
    "Корпоративное участие": "Corporate involvement",
    "Возможность для компаний поддержать проекты деньгами, экспертизой и волонтёрством.": "A way for companies to support projects with funding, expertise and volunteering.",
    "Прозрачность": "Transparency",
    "Открытая отчётность о собранных средствах и результатах.": "Open reporting on funds raised and results.",
    "Спорт рядом": "Sport nearby",
    "Фокус на доступности спорта в регионах.": "A focus on access to sport in the regions.",

    "Мы в РСО считаем, что обучение — обязательный процесс для любого лидера. Академия собирает практиков индустрии, которые делятся лучшими управленческими подходами, чтобы наш спорт становился эффективнее и коммерчески успешнее.": "At RSO we believe learning is essential for every leader. The Academy brings together industry practitioners who share the best management approaches, so that our sport becomes more efficient and commercially successful.",
    "Программы для руководителей": "Executive programmes",
    "Менеджмент, маркетинг, право и финансы спортивной организации.": "Management, marketing, law and finance of a sport organisation.",
    "Практики индустрии": "Industry practitioners",
    "Преподают руководители клубов, лиг, федераций и компаний.": "Taught by leaders of clubs, leagues, federations and companies.",
    "Партнёрские программы": "Partner programmes",
    "Рекомендуем лучшие программы ведущих вузов и школ.": "We recommend the best programmes from leading universities and schools.",
    "Наставничество": "Mentoring",
    "Опытные участники Общества сопровождают молодых управленцев.": "Experienced Society members mentor young managers.",

    "Собственные события Общества и партнёрство с ключевыми мероприятиями отрасли: конгрессы, форумы, премии и закрытые встречи участников.": "The Society's own events and partnerships with key industry events: congresses, forums, awards and private member meetings.",
    "Собственные события": "Our own events",
    "Презентация Общества рынку, ежегодная конференция, клубные встречи.": "Presenting the Society to the market, an annual conference, club meetings.",
    "Продюсирование": "Production",
    "Деловая программа, спикеры, партнёры — под ключ.": "Business programme, speakers, partners — turnkey.",
    "Партнёрские мероприятия": "Partner events",
    "Специальные условия для участников на ключевые события индустрии.": "Special terms for members at key industry events.",
    "Календарь индустрии": "Industry calendar",
    "Все важные отраслевые события — в одном месте.": "All the important industry events in one place.",

    // Page titles & descriptions
    "Русское спортивное общество — объединяем тех, кто делает российский спорт сильнее": "Russian Sport Society — uniting those who make Russian sport stronger",
    "Русское спортивное общество (РСО) — некоммерческая организация, объединяющая предпринимателей, руководителей и экспертов индустрии спорта. Платформа, где встречаются государство, бизнес и спорт.": "The Russian Sport Society (RSO) is a non-profit uniting entrepreneurs, executives and experts of the sport industry — a platform where the state, business and sport meet.",
    "Новости — Русское спортивное общество": "News — Russian Sport Society",
    "Новости Русского спортивного общества и индустрии спорта.": "News from the Russian Sport Society and the sport industry.",
    "Вступить — Русское спортивное общество": "Join — Russian Sport Society",
    "Анкета для вступления в Русское спортивное общество для физических и юридических лиц.": "Membership application for the Russian Sport Society, for individuals and companies.",
    "Политика конфиденциальности — Русское спортивное общество": "Privacy policy — Russian Sport Society",
    "Политика обработки персональных данных.": "Personal data policy.",
    "Страница не найдена — РСО": "Page not found — RSO",
    "Новости Русского спортивного общества.": "News from the Russian Sport Society.",
    "Проекты Русского спортивного общества.": "Projects of the Russian Sport Society.",
    "Что получают участники Русского спортивного общества.": "What members of the Russian Sport Society get.",
    "Проект — Русское спортивное общество": "Project — Russian Sport Society",
    "Участникам — Русское спортивное общество": "Members — Russian Sport Society",
    "Новость — Русское спортивное общество": "News — Russian Sport Society"
  };

  // Phrases with a variable part.
  var PATTERNS = [
    [/^© (\d{4}) Русское спортивное общество · rusport\.org$/, "© $1 Russian Sport Society · rusport.org"],
    [/^(.+) — Русское спортивное общество$/, function (m, name) { return tr(name) !== name ? tr(name) + " — Russian Sport Society" : m; }],
    [/^(.+) — Новости РСО$/, "$1 — RSO News"]
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
    location.href = url.toString();
  }

  window.RSO_I18N = { lang: lang, t: tr, apply: apply, setLang: setLang };
})();
