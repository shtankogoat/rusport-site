// Site content: projects ("Наши проекты") and audiences ("Что получает индустрия") on the home page.
// Photos: assets/img/photos/project-<id>.jpg and audience-<id>.jpg.

window.RSO_PROJECTS = [
  {
    id: "community",
    title: "Сообщество",
    lead: "Профессионалы и эксперты индустрии спорта. Усиливаем друг друга и увеличиваем рынок спорта в стране.",
    status: "Запуск в 2027"
  },
  {
    id: "b2b",
    title: "B2B платформа",
    lead: "Каталог компаний, работающих в индустрии. Проведение тендеров и онлайн-экспо 24/7/365.",
    status: "Запуск в 2027"
  },
  {
    id: "analytics",
    title: "Аналитика рынка",
    lead: "Собираем данные и анализируем рынок.",
    status: "Запуск в 2027"
  },
  {
    id: "sporttech",
    title: "СпортТех",
    lead: "Помогаем технологичным и инновационным компаниям занимать своё место на рынке.",
    status: "Запуск в 2027"
  },
  {
    id: "investments",
    title: "Инвестиции",
    lead: "Инвестируем в спортивные проекты, инфраструктуру и технологические компании.",
    status: "Запуск в 2027"
  },
  {
    id: "media",
    title: "Медиа",
    lead: "Рассказываем о людях, идеях и возможностях.",
    status: "Запуск в 2027"
  },
  {
    id: "charity",
    title: "Благотворительная платформа",
    lead: "Спорт как социальное явление. Помогаем фондам и общественным инициативам делать спорт доступнее.",
    status: "Запуск в 2027"
  },
  {
    id: "academy",
    title: "Академия",
    lead: "Развиваем тех, кто развивает спорт. Практическое образование на базе экспертизы сильнейших участников сообщества.",
    status: "Запуск в 2027"
  },
  {
    id: "events",
    title: "Организация мероприятий",
    lead: "Организуем и продюсируем крупные мероприятия отрасли. Проводим конференции и усиливаем партнёров.",
    status: "Запуск в 2027"
  }
];

window.RSO_AUDIENCES = [
  {
    id: "clubs",
    title: "Клубы · Лиги · Федерации",
    items: ["Партнёры и поставщики", "Кадры и эксперты", "Исследования и лучшие практики", "Отраслевое представительство", "Совместные проекты и GR"]
  },
  {
    id: "managers",
    title: "Менеджеры · Владельцы",
    items: ["Профессиональные связи", "Новые клиенты и партнёры", "Личная репутация", "Доступ к аналитике", "Обмен опытом с лидерами", "Обучение лучшим практикам", "Инвестиции в проекты"]
  },
  {
    id: "brands",
    title: "Компании · Бренды",
    items: ["Доступ к спортивной индустрии", "Спонсорство и интеграции", "B2B-контакты", "Исследования аудитории", "Площадки для собственных инициатив"]
  },
  {
    id: "athletes",
    title: "Профессиональные спортсмены",
    items: ["Работа в индустрии", "Инвестиции в проекты", "Обучение и профессиональный рост", "Реализация своих медиаправ"]
  }
];

window.RSO_SOCIAL = {
  telegram: "https://t.me/rusport_org",
  max: "https://max.ru/channel_rusport",
  vk: "https://vk.ru/ru_sport_org"
};

// Membership applications on join.html are Google Forms (created by tools/google_forms.gs).
// Paste each form's "ДЛЯ САЙТА" link (…/viewform) here; empty = "скоро появится" placeholder.
window.RSO_FORMS = {
  person: "https://docs.google.com/forms/d/e/1FAIpQLSeNDQgeNvlEc_PQ0gSnc0yG16yiBupdWmN8Ma5zm1PzuaXyug/viewform",
  company: "https://docs.google.com/forms/d/e/1FAIpQLSffBFRXJGHBnPmNpK2Oc3DaqBIKBhjSw60qY_EAukjxXtXwAA/viewform"
};
