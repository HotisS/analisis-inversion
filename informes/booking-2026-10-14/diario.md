# Diario · Booking Holdings (BKNG) · 14-oct-2026

- Commit de partida: c401501 («Cola del 14-oct (12:00): 16 empresas nuevas, de 4 en 4»).
- Entorno: nube de Claude Code. La red solo deja la búsqueda web (WebSearch); WebFetch, curl, `descargar.mjs` y `bolsa.mjs` no funcionan. Las cifras salen de extractos de búsqueda de los comunicados 8-K, 10-K y 10-Q citados y de agregadores (Stock Analysis, Yahoo Finance, Digrin), con la URL como fuente; lo que no cuadró está en `null` y en `meta.huecos`. **Confianza: media en cuentas y consenso; baja en sector, comparables y gobierno.**
- Fecha de corte: 2026-10-14. Divisa: USD. Cierre del ejercicio: diciembre. US GAAP.
- **Desdoblamiento comprobado**: 25 por 1, efectivo el 2-abr-2026 (cotiza ajustado desde el 6-abr). Todo lo que va por acción (BPA histórico, DPA, precios de cierre) está dividido entre 25.
- Primer análisis de Booking en el repo (no hay carpetas anteriores).

## Tiempos
- 11:57 inicio; 12:00-12:04 búsquedas de lo que mueve la decisión (precio, 2T26, 2025, BPA ajustado histórico, cierres anuales, balance, consenso); 12:04-12:08 comparables, gobierno, sentimiento, bono; 12:08-12:12 notas A-E, supuestos y primer cálculo; 12:12-12:14 textos, resumen, Word y PDF. Unas 20 búsquedas.

## Decisiones
- Precio: cierre del 12-oct (158,43 USD, Yahoo vía búsqueda); el del 13-oct no apareció.
- Acciones: 765 M (≈758 M en circulación a 30-jun según el balance del 10-Q más ≈7 M de dilución, estimación propia).
- EBITDA en base ajustada de la empresa (que no excluye pagos en acciones): las diferencias con el contable de 2024-2025 van como no recurrentes; los costes de transformación se tratan como recurrentes en el DCF (margen del 38 %, por debajo del objetivo implícito del plan).
- Puente: deuda 20.180 M (bonos), caja 17.214 M, inversiones a largo 448 M como asociadas; sin arrendamientos operativos (US GAAP). No se descuenta la caja de los viajeros (modelo merchant): circulante del −2 % en el DCF; queda como pregunta abierta.
- ROIC contable negativo (capital invertido negativo por recompras): explicado en `controles_explicados`; calidad juzgada con margen, comisión y ROIC sobre intangibles.
- Sostenibilidad «Sí» (sin inversión neta; prueba de cuota a mano con las noches porque no hay tamaño de mercado fiable).
- Comparables: solo PER futuro de 5 empresas de proveedores y fechas distintas; peso del 15 %. Sin transacciones.
- Objetivo 12 m: BPA de 2028e sin recompras (765 M de acciones), PER histórico con el BPA ajustado de la empresa (2020-2021 fuera; 2019 estimado).

## Resultado
- 14-oct, 12:14: informe cerrado, 17 de 17 controles; Word y PDF (soffice, 39 páginas). DCF 194,48 USD; valor intrínseco (síntesis) 192,17 USD (+21,3 %); DCF inverso: crecimiento implícito del 3,0 % frente al 6,1 % del base.
- **Línea 12 m**: objetivo ponderado 179,63 USD → **+14,4 %**; base 174,42 USD → **+11,1 %**; bajista 133,44 (−16 %), alcista 236,25 (+49 %). **Mantener**, convicción media. Compra por debajo de 157,18 USD (con el PER actual fijo). Detalle en `revision-12m-2026-10-14.md`.
- Pendiente fuera de la carpeta (lo hace el integrador): `apuntar-12m.mjs`, `seguimiento.mjs`, cola, commit.

## Lecciones
- Con el PER base igual al PER actual, la rentabilidad del base es casi el crecimiento del BPA del año objetivo más el dividendo, y no mejora si el precio baja: el «comprar por debajo de X» del motor supone el PER actual fijo. En empresas que recompran mucho (Booking, ≈6 % de acciones al año) el método sin recompras deja el base siempre por debajo del 12 % si el BPA crece menos del 11 %. Convendría decidir si una autorización de recompra vigente cuenta como «anunciada».
- Tras un desdoblamiento, los agregadores mezclan precios sin ajustar (Yahoo antiguo con rango de 52 semanas de 3.765-5.839) y ajustados: dividir entre el factor y comprobar con la capitalización.

- 2026-10-14: datos-v2.json = regla de múltiplos v3 con la historia del PER adelantada construida por herramientas/historia-adelantada.mjs (4 años; mediana 25.3x, mínimo 17.2x, media larga 24.8x; antes v2 23.4x/20.1x/21.9x). Solo cambian el objetivo a 12 meses y la señal; el Word no se regenera.
- 2026-10-14: datos-v2.json y «Booking Holdings - 2026-10-14 v2.docx» regenerados con el motor vigente (herramientas/regenerar.mjs; METODO-VIGENTE.md), sin investigación nueva: v3 Comprar 25,9 % (antes v3 Comprar 48,6 %). Para comparar, con la regla v2 (historia al cierre, mismo precio): 12,0x / 14,1x / 18,3x, 14,4 % Mantener; con el tope anterior del base (×1,3, 14-oct mediodía): 48,6 % Comprar. Decide la regla vigente (v3 con tope ×1,1; METODO-VIGENTE.md).
