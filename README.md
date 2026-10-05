# LogiDocs · Mesa de Entrada Documental

Proyecto demo de portfolio desarrollado con **Google Apps Script, Google Sheets, HTML, CSS y JavaScript**.

> Este repositorio es una versión demostrativa y anonimizada de una solución de gestión documental. No contiene información confidencial, datos reales de clientes, credenciales ni identificadores internos.

## Objetivo

Centralizar el ingreso, validación, consulta y seguimiento de documentación logística mediante una interfaz web conectada a Google Sheets.

## Funcionalidades

- Registro de documentación desde una Web App.
- Generación automática de identificadores.
- Validaciones de campos obligatorios y reglas básicas de negocio.
- Consulta y búsqueda de registros.
- Dashboard con KPIs operativos.
- Seguimiento de estados documentales.
- Gestión conceptual de reclamos y digitalización.
- Arquitectura separada por responsabilidades.
- Interfaz responsive.

## Arquitectura

```text
Config.gs
├── configuración, listas y nombres de columnas

Repository.gs
├── acceso a Google Sheets
├── lectura de encabezados
├── inserción y actualización de registros

Services.gs
├── reglas de negocio
├── validaciones
├── generación de IDs
├── búsquedas
└── métricas

Code.gs
├── entrada de la Web App
└── integración con Google Sheets

Index.html
├── estructura de la interfaz

Styles.html
├── estilos y responsive design

JavaScript.html
└── controlador del frontend
```

## Stack

- Google Apps Script
- Google Sheets
- HTML5
- CSS3
- JavaScript
- Google HtmlService

## Configuración rápida

Crear en Google Sheets las siguientes hojas:

- `Documentos`
- `Reclamos`
- `Control_Digital`
- `Usuarios`
- `Maestros`

En `Documentos`, usar estos encabezados principales:

```text
ID Registro
Fecha/Hora Recepción
Usuario Recepción
Tipo Documento
Tipo Operación
Segmento B2B/B2C
N° Hoja de Ruta
N° Remito
N° Factura/Doc. Externo
N° Contenedor
Cliente / Cuenta
Operador Logístico / Transporte
Origen / Depósito
Canal de Origen
Cantidad Docs/Folios
Fecha Documento
Prioridad
¿Reclamo asociado?
ID Reclamo
Observaciones Recepción
Fecha/Hora Preparado Archivo
Usuario prepara/entrega
Fecha/Hora Retiro/Traslado
Responsable traslado
Lote/Caja Digitalización
Fecha/Hora Recepción Digitalización
Fecha/Hora Digitalización
Fecha/Hora Disponible Digital
Link/Referencia Digital
Estado Documental
```

En `Reclamos` debe existir, como mínimo, la columna:

```text
Estado Reclamo
```

## Publicación como Web App

1. Crear un proyecto de Google Apps Script vinculado a un Google Sheet.
2. Copiar los archivos del repositorio.
3. Crear las hojas y encabezados indicados.
4. En Apps Script, seleccionar **Implementar > Nueva implementación**.
5. Elegir **Aplicación web**.
6. Configurar los permisos según el entorno de prueba.

## Seguridad y privacidad

Esta demo no debe contener:

- credenciales,
- IDs privados de documentos,
- URLs internas,
- datos personales,
- números reales de operaciones,
- información comercial confidencial.

## Portfolio

Este proyecto busca mostrar experiencia en:

- automatización de procesos,
- diseño de flujos operativos,
- integración con Google Sheets,
- validación de datos,
- separación de capas,
- diseño de interfaces,
- trazabilidad documental.

---

Desarrollado como proyecto de portfolio.
