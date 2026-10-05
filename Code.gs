function doGet(e) {
  const template = HtmlService.createTemplateFromFile('Index');

  return template
    .evaluate()
    .setTitle('LogiDocs · Mesa de Entrada Documental')
    .setXFrameOptionsMode(HtmlService.XFrameOptionsMode.ALLOWALL);
}

function include(filename) {
  return HtmlService.createHtmlOutputFromFile(filename).getContent();
}

function onOpen() {
  SpreadsheetApp
    .getUi()
    .createMenu('LogiDocs')
    .addItem('Nuevo registro', 'showDocumentDialog')
    .addItem('Abrir aplicación', 'showApplication')
    .addToUi();
}

function showDocumentDialog() {
  const html = HtmlService
    .createTemplateFromFile('Index')
    .evaluate()
    .setWidth(1100)
    .setHeight(720);

  SpreadsheetApp.getUi().showModalDialog(
    html,
    'Mesa de Entrada Documental'
  );
}

function showApplication() {
  const html = HtmlService
    .createTemplateFromFile('Index')
    .evaluate()
    .setTitle('LogiDocs');

  SpreadsheetApp.getUi().showSidebar(html);
}
