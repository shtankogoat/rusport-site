# rusport.org — сайт Русского спортивного общества

Статический сайт: HTML + CSS + JS, без сборки. Залить содержимое папки на любой хостинг (кроме `referencesofwebsite/`, `tools/`, `*.pdf`, `exportoftgchatRSS.html`).

## Страницы

| Файл | Что это |
|---|---|
| `index.html` | Главная по макету: слайдер → проекты → инфраструктура диалога → вступить → новости → две идеи → ценность → партнёры → манифест |
| `project.html?id=…` | Страница проекта (9 штук: community, b2b, analytics, sporttech, investments, media, charity, academy, events) |
| `audience.html?id=…` | Что получает аудитория (clubs, managers, brands, athletes) |
| `news.html`, `post.html?id=…` | Новостная лента и отдельная новость |
| `join.html` | Анкета на вступление: физлицо / юрлицо (`join.html?type=company` открывает вкладку юрлица) |
| `privacy.html` | Политика ПДн — **черновик, финальный текст от юристов** |

## Как обновлять

- **Тексты проектов и аудиторий** — `assets/js/data.js`.
- **Слайды на главной** — блоки `<article class="slide">` в `index.html`.
- **Новости из Telegram** — экспортировать канал в HTML (Telegram Desktop → Экспорт истории), положить файл в корень и запустить:
  `python tools/build_news.py exportoftgchatRSS.html`
- **Логотипы партнёров** — в `index.html`, секция `#partners`, заменить заглушки на `<a class="partner" href="…"><img src="…" alt="…"></a>`.
- **Логотип** — `tools/make_logo.py` пересобирает прозрачные версии из `RSSlogo.jpg`.

## Что нужно подключить перед запуском

1. **Приём заявок** — указать URL обработчика (CRM / вебхук) в `RSO_FORM_ENDPOINT` в `assets/js/data.js`. Пока пусто — формы показывают «тестовый режим».
2. **Эквайринг** — сейчас сценарий «анкета → одобрение → ссылка на оплату по email». Встроенная оплата на сайте требует бэкенда (ЮKassa / CloudPayments / Т-Банк).
3. **Новостная лента с редактором** (фото/видео/цитаты) — следующий этап: CMS (например, headless-CMS или WordPress) вместо генерации из Telegram.
