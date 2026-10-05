/**
 * ============================================================
 * LOGIDOCS · BUSINESS SERVICES
 * ============================================================
 */

function generateDocumentId_() {
  const timezone =
    Session.getScriptTimeZone() || 'America/Argentina/Buenos_Aires';

  const now = new Date();
  const timestamp = Utilities.formatDate(
    now,
    timezone,
    'yyyyMMdd-HHmmss'
  );

  const suffix = Utilities.getUuid()
    .substring(0, 3)
    .toUpperCase();

  return `DOC-${timestamp}-${suffix}`;
}

function getCurrentUser_() {
  return (
    Session.getActiveUser().getEmail() ||
    Session.getEffectiveUser().getEmail() ||
    'demo.user@example.com'
  );
}

function cleanString_(value) {
  if (value === null || value === undefined) {
    return '';
  }

  return String(value).trim();
}

function validateDocument_(data) {
  const errors = [];

  if (!cleanString_(data.tipoDocumento)) {
    errors.push('Debe seleccionar un tipo de documento.');
  }

  if (!cleanString_(data.tipoOperacion)) {
    errors.push('Debe seleccionar el tipo de operación.');
  }

  if (!cleanString_(data.cliente)) {
    errors.push('Debe indicar Cliente / Cuenta.');
  }

  if (!cleanString_(data.origen)) {
    errors.push('Debe indicar el origen o depósito.');
  }

  const requiresTransportDocument =
    cleanString_(data.tipoDocumento).includes('Hoja de ruta') ||
    cleanString_(data.tipoDocumento).includes('Remito');

  if (
    requiresTransportDocument &&
    !cleanString_(data.hdr) &&
    !cleanString_(data.remito)
  ) {
    errors.push(
      'Para hojas de ruta o remitos debe informar al menos un identificador.'
    );
  }

  if (
    data.tipoDocumento === 'Ingreso de contenedor' &&
    !cleanString_(data.contenedor)
  ) {
    errors.push('Debe informar el número de contenedor.');
  }

  if (errors.length) {
    throw new Error(errors.join('\n'));
  }
}

function createDocument(data) {
  if (!data || typeof data !== 'object') {
    throw new Error('Datos de registro inválidos.');
  }

  validateDocument_(data);

  const id = generateDocumentId_();
  const user = getCurrentUser_();
  const now = new Date();

  const record = {};

  record[DOCUMENT_COLUMNS.ID] = id;
  record[DOCUMENT_COLUMNS.FECHA_RECEPCION] = now;
  record[DOCUMENT_COLUMNS.USUARIO_RECEPCION] = user;
  record[DOCUMENT_COLUMNS.TIPO_DOCUMENTO] = cleanString_(data.tipoDocumento);
  record[DOCUMENT_COLUMNS.TIPO_OPERACION] = cleanString_(data.tipoOperacion);
  record[DOCUMENT_COLUMNS.SEGMENTO] = cleanString_(data.segmento);
  record[DOCUMENT_COLUMNS.HDR] = cleanString_(data.hdr);
  record[DOCUMENT_COLUMNS.REMITO] = cleanString_(data.remito);
  record[DOCUMENT_COLUMNS.DOCUMENTO_EXTERNO] = cleanString_(data.documentoExterno);
  record[DOCUMENT_COLUMNS.CONTENEDOR] = cleanString_(data.contenedor);
  record[DOCUMENT_COLUMNS.CLIENTE] = cleanString_(data.cliente);
  record[DOCUMENT_COLUMNS.OPERADOR] = cleanString_(data.operador);
  record[DOCUMENT_COLUMNS.ORIGEN] = cleanString_(data.origen);
  record[DOCUMENT_COLUMNS.CANAL] = cleanString_(data.canal);
  record[DOCUMENT_COLUMNS.CANTIDAD] = Number(data.cantidad) || 1;
  record[DOCUMENT_COLUMNS.FECHA_DOCUMENTO] =
    data.fechaDocumento ? new Date(`${data.fechaDocumento}T12:00:00`) : '';
  record[DOCUMENT_COLUMNS.PRIORIDAD] =
    cleanString_(data.prioridad) || 'Normal';
  record[DOCUMENT_COLUMNS.RECLAMO_ASOCIADO] =
    data.reclamoAsociado ? 'Sí' : 'No';
  record[DOCUMENT_COLUMNS.ID_RECLAMO] = cleanString_(data.idReclamo);
  record[DOCUMENT_COLUMNS.OBSERVACIONES] = cleanString_(data.observaciones);
  record[DOCUMENT_COLUMNS.ESTADO] = 'Recibido';

  insertRecord_(APP_CONFIG.SHEETS.DOCUMENTOS, record);

  return {
    success: true,
    id,
    message: 'Documentación registrada correctamente.'
  };
}

function searchDocuments(query) {
  const search = cleanString_(query).toLowerCase();
  const records = getRecords_(APP_CONFIG.SHEETS.DOCUMENTOS);

  if (!search) {
    return records
      .slice(-APP_CONFIG.MAX_RESULTS)
      .reverse();
  }

  return records
    .filter(record => {
      const searchable = [
        record[DOCUMENT_COLUMNS.ID],
        record[DOCUMENT_COLUMNS.HDR],
        record[DOCUMENT_COLUMNS.REMITO],
        record[DOCUMENT_COLUMNS.CLIENTE],
        record[DOCUMENT_COLUMNS.OPERADOR],
        record[DOCUMENT_COLUMNS.ID_RECLAMO],
        record[DOCUMENT_COLUMNS.LOTE_DIGITAL]
      ]
        .join(' ')
        .toLowerCase();

      return searchable.includes(search);
    })
    .slice(0, APP_CONFIG.MAX_RESULTS);
}

function getDashboardMetrics() {
  const documents = getRecords_(APP_CONFIG.SHEETS.DOCUMENTOS);
  const claims = getRecords_(APP_CONFIG.SHEETS.RECLAMOS);

  const total = documents.length;

  const digitalizados = documents.filter(record =>
    record[DOCUMENT_COLUMNS.ESTADO] === 'Disponible digitalmente' ||
    record[DOCUMENT_COLUMNS.ESTADO] === 'Digitalizado'
  ).length;

  const pendientes = documents.filter(record =>
    ![
      'Disponible digitalmente',
      'Digitalizado',
      'Cerrado'
    ].includes(record[DOCUMENT_COLUMNS.ESTADO])
  ).length;

  const urgentes = documents.filter(record =>
    record[DOCUMENT_COLUMNS.PRIORIDAD] === 'Urgente'
  ).length;

  const reclamosAbiertos = claims.filter(record =>
    record['Estado Reclamo'] &&
    record['Estado Reclamo'] !== 'Cerrado'
  ).length;

  const porcentajeDigitalizado =
    total > 0
      ? Math.round((digitalizados / total) * 100)
      : 0;

  return {
    total,
    digitalizados,
    pendientes,
    urgentes,
    reclamosAbiertos,
    porcentajeDigitalizado
  };
}

function getFormOptions() {
  return {
    tiposDocumento: APP_CONFIG.TIPOS_DOCUMENTO,
    operaciones: APP_CONFIG.OPERACIONES,
    segmentos: APP_CONFIG.SEGMENTOS,
    prioridades: APP_CONFIG.PRIORIDADES,
    canales: APP_CONFIG.CANALES,
    estados: APP_CONFIG.ESTADOS_DOCUMENTO
  };
}

function getInitialData() {
  return {
    user: getCurrentUser_(),
    options: getFormOptions(),
    metrics: getDashboardMetrics(),
    documents: searchDocuments('')
  };
}
