/**
 * ============================================================
 * LOGIDOCS · DATA REPOSITORY
 * ============================================================
 * Capa responsable del acceso a Google Sheets.
 */

function getSpreadsheet_() {
  return SpreadsheetApp.getActiveSpreadsheet();
}

function getSheet_(sheetName) {
  const sheet = getSpreadsheet_().getSheetByName(sheetName);

  if (!sheet) {
    throw new Error(`No se encontró la hoja "${sheetName}".`);
  }

  return sheet;
}

function getHeaders_(sheet) {
  const lastColumn = sheet.getLastColumn();

  if (lastColumn === 0) {
    return [];
  }

  return sheet
    .getRange(1, 1, 1, lastColumn)
    .getDisplayValues()[0]
    .map(header => String(header).trim());
}

function buildHeaderMap_(headers) {
  return headers.reduce((map, header, index) => {
    if (header) {
      map[header] = index + 1;
    }
    return map;
  }, {});
}

function getRecords_(sheetName) {
  const sheet = getSheet_(sheetName);
  const lastRow = sheet.getLastRow();
  const lastColumn = sheet.getLastColumn();

  if (lastRow < 2 || lastColumn === 0) {
    return [];
  }

  const headers = getHeaders_(sheet);
  const values = sheet
    .getRange(2, 1, lastRow - 1, lastColumn)
    .getDisplayValues();

  return values
    .filter(row => row.some(value => value !== ''))
    .map(row => {
      const record = {};

      headers.forEach((header, index) => {
        record[header] = row[index];
      });

      return record;
    });
}

function insertRecord_(sheetName, record) {
  const sheet = getSheet_(sheetName);
  const headers = getHeaders_(sheet);

  if (!headers.length) {
    throw new Error(`La hoja "${sheetName}" no posee encabezados.`);
  }

  const row = headers.map(header =>
    Object.prototype.hasOwnProperty.call(record, header)
      ? record[header]
      : ''
  );

  sheet.appendRow(row);
  return sheet.getLastRow();
}

function updateRecord_(sheetName, row, changes) {
  const sheet = getSheet_(sheetName);
  const headers = getHeaders_(sheet);
  const map = buildHeaderMap_(headers);

  Object.keys(changes).forEach(header => {
    const column = map[header];

    if (!column) {
      return;
    }

    sheet.getRange(row, column).setValue(changes[header]);
  });
}

function findRecord_(sheetName, columnName, value) {
  const records = getRecords_(sheetName);

  return records.find(record =>
    String(record[columnName]).trim() === String(value).trim()
  ) || null;
}
