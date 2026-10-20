/**
 * Создаёт две Google Формы РСО (физлица и юрлица) и общую таблицу ответов в вашем Google-аккаунте.
 *
 * Как запустить (один раз, ~1 минута):
 *   1. Откройте https://script.google.com → «Создать проект».
 *   2. Удалите всё в редакторе и вставьте этот файл целиком.
 *   3. Вверху выберите функцию createRsoForms → «Выполнить» → разрешите доступ к Формам/Таблицам.
 *   4. Откройте «Журнал выполнения»: там ссылки на формы и таблицу.
 *      Две строки «ДЛЯ САЙТА» пришлите разработчику — они вставляются в assets/js/data.js (RSO_FORMS).
 *
 * Поля повторяют прежнюю анкету join.html. Согласие на обработку ПДн — дисклеймер на сайте над формой.
 * Повторный запуск создаст ещё один комплект форм.
 */

var PROJECTS = [
  "Все направления", "Сообщество", "B2B платформа", "Аналитика рынка", "СпортТех", "Инвестиции",
  "Медиа", "Благотворительная платформа", "Академия", "Организация мероприятий"
];

function createRsoForms() {
  var sheet = SpreadsheetApp.create("РСО — заявки на вступление");

  var person = baseForm_("РСО — анкета для физических лиц");
  contactBlock_(person, "ФИО");
  person.addTextItem().setTitle("Место работы");
  person.addListItem().setTitle("Роль в спорте").setChoiceValues([
    "Руководитель / владелец", "Менеджер", "Эксперт / консультант", "Профессиональный спортсмен", "Тренер", "Другое"
  ]);
  tailBlock_(person);

  var company = baseForm_("РСО — анкета для юридических лиц");
  company.addSectionHeaderItem().setTitle("Контактное лицо");
  contactBlock_(company, "ФИО контактного лица");
  company.addTextItem().setTitle("Ваша должность");
  company.addSectionHeaderItem().setTitle("Организация");
  company.addTextItem().setTitle("Название организации").setRequired(true);
  company.addTextItem().setTitle("ИНН").setRequired(true).setValidation(
    FormApp.createTextValidation().setHelpText("10 или 12 цифр").requireTextMatchesPattern("^([0-9]{10}|[0-9]{12})$").build()
  );
  company.addListItem().setTitle("Тип организации").setChoiceValues([
    "Клуб / лига / федерация", "Компания / бренд", "Фитнес-клуб / сеть", "Технологическая компания",
    "Агентство / медиа", "Образовательная организация", "Фонд / НКО", "Другое"
  ]);
  company.addTextItem().setTitle("Сайт компании");
  tailBlock_(company);

  person.setDestination(FormApp.DestinationType.SPREADSHEET, sheet.getId());
  company.setDestination(FormApp.DestinationType.SPREADSHEET, sheet.getId());

  Logger.log("Таблица ответов: " + sheet.getUrl());
  Logger.log("Физлица — редактировать: " + person.getEditUrl());
  Logger.log("Юрлица — редактировать: " + company.getEditUrl());
  Logger.log("ДЛЯ САЙТА person: " + person.getPublishedUrl());
  Logger.log("ДЛЯ САЙТА company: " + company.getPublishedUrl());
}

function baseForm_(title) {
  return FormApp.create(title)
    .setDescription("Русское спортивное общество. Заполните анкету — мы рассмотрим заявку и свяжемся с вами.")
    .setConfirmationMessage("Спасибо! Мы получили вашу анкету и свяжемся с вами в течение нескольких рабочих дней.")
    .setShowLinkToRespondAgain(false)
    .setAllowResponseEdits(false);
}

function contactBlock_(form, nameTitle) {
  form.addTextItem().setTitle(nameTitle).setRequired(true);
  form.addTextItem().setTitle("Телефон").setRequired(true);
  form.addTextItem().setTitle("Email").setRequired(true).setValidation(
    FormApp.createTextValidation().setHelpText("Введите корректный email").requireTextIsEmail().build()
  );
  form.addTextItem().setTitle("Город");
}

function tailBlock_(form) {
  form.addListItem().setTitle("Какой проект Общества вам наиболее интересен?").setChoiceValues(PROJECTS);
  form.addParagraphTextItem().setTitle("Расскажите о себе и о том, чего вы ждёте от Общества");
}
