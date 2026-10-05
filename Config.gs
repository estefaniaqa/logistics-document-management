/**
 * ============================================================
 * LOGIDOCS · MESA DE ENTRADA DOCUMENTAL
 * Portfolio Demo
 * ============================================================
 * Configuración general.
 */

const APP_CONFIG = Object.freeze({
  APP_NAME: 'LogiDocs · Mesa de Entrada Documental',
  VERSION: '1.0.0-demo',

  SHEETS: Object.freeze({
    DOCUMENTOS: 'Documentos',
    RECLAMOS: 'Reclamos',
    DIGITALIZACION: 'Control_Digital',
    USUARIOS: 'Usuarios',
    MAESTROS: 'Maestros'
  }),

  ESTADOS_DOCUMENTO: Object.freeze([
    'Recibido',
    'Clasificado',
    'Preparado para archivo',
    'En traslado',
    'Recibido para digitalización',
    'En digitalización',
    'Digitalizado',
    'Disponible digitalmente',
    'Con observación',
    'Cerrado'
  ]),

  TIPOS_DOCUMENTO: Object.freeze([
    'Hoja de ruta',
    'Remito',
    'Orden de entrega',
    'Ingreso de contenedor',
    'Factura de proveedor',
    'Documento externo',
    'Devolución',
    'Documentación interna'
  ]),

  OPERACIONES: Object.freeze([
    'Despacho',
    'Rendición',
    'Ingreso',
    'Devolución',
    'Proveedor',
    'Interna'
  ]),

  SEGMENTOS: Object.freeze([
    'B2B',
    'B2C',
    'No aplica'
  ]),

  PRIORIDADES: Object.freeze([
    'Normal',
    'Alta - Reclamo',
    'Urgente'
  ]),

  CANALES: Object.freeze([
    'Chofer',
    'Operador logístico',
    'Proveedor',
    'Depósito',
    'Cliente interno',
    'Otro'
  ]),

  SLA: Object.freeze({
    NORMAL: 48,
    ALTA: 24,
    URGENTE: 12
  }),

  MAX_RESULTS: 200
});

const DOCUMENT_COLUMNS = Object.freeze({
  ID: 'ID Registro',
  FECHA_RECEPCION: 'Fecha/Hora Recepción',
  USUARIO_RECEPCION: 'Usuario Recepción',

  TIPO_DOCUMENTO: 'Tipo Documento',
  TIPO_OPERACION: 'Tipo Operación',
  SEGMENTO: 'Segmento B2B/B2C',

  HDR: 'N° Hoja de Ruta',
  REMITO: 'N° Remito',
  DOCUMENTO_EXTERNO: 'N° Factura/Doc. Externo',
  CONTENEDOR: 'N° Contenedor',

  CLIENTE: 'Cliente / Cuenta',
  OPERADOR: 'Operador Logístico / Transporte',

  ORIGEN: 'Origen / Depósito',
  CANAL: 'Canal de Origen',

  CANTIDAD: 'Cantidad Docs/Folios',
  FECHA_DOCUMENTO: 'Fecha Documento',

  PRIORIDAD: 'Prioridad',
  RECLAMO_ASOCIADO: '¿Reclamo asociado?',
  ID_RECLAMO: 'ID Reclamo',

  OBSERVACIONES: 'Observaciones Recepción',

  FECHA_PREPARADO: 'Fecha/Hora Preparado Archivo',
  USUARIO_ENTREGA: 'Usuario prepara/entrega',

  FECHA_RETIRO: 'Fecha/Hora Retiro/Traslado',
  RESPONSABLE_TRASLADO: 'Responsable traslado',

  LOTE_DIGITAL: 'Lote/Caja Digitalización',

  FECHA_RECEPCION_DIGITAL: 'Fecha/Hora Recepción Digitalización',
  FECHA_DIGITALIZACION: 'Fecha/Hora Digitalización',
  FECHA_DISPONIBLE: 'Fecha/Hora Disponible Digital',

  LINK_DIGITAL: 'Link/Referencia Digital',

  ESTADO: 'Estado Documental'
});
