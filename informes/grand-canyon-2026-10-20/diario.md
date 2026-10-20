# Diario: Grand Canyon Education (LOPE), análisis value, corte 20-oct-2026

- **Commit de partida**: `23a7cb3cf4d31f2c8bd0a160f44d16a4ba4c5f36` (20-oct-2026, 10:05 UTC). Checkout compartido con otro análisis en paralelo: sin pull, commit ni push desde este hilo (los hace el hilo principal).
- **Primer análisis** de LOPE en el repositorio (no había informe anterior). Método completo de `/analiza-empresa`.

## Tiempos (UTC)

| Hora | Paso |
|---|---|
| 10:06 | Lectura de CLAUDE.md, METODO-VIGENTE.md, MEMORIA.md, analiza-empresa.md, prompt.md y lecciones (núcleo, EE. UU., casos) |
| 10:07 | Cuentas XBRL de la SEC (`cuentas.mjs --sec LOPE`): 10-K de 2016 a 2025 |
| 10:08-10:10 | Descarga de documentos de EDGAR (10-K 2025, 10-Q 1T y 2T26, notas de resultados, 8-K, DEF 14A) |
| 10:11-10:15 | Bolsa (`bolsa.mjs`), movimiento (`movimiento.mjs`), noticias de 12 meses, consenso y comparables (Yahoo), Form 4 |
| 10:15-10:23 | Búsquedas web (MSA, OBBBA, CFO, IA, BMO) y notas A-E (`notas/construir-notas.mjs`) |
| 10:23-10:28 | `supuestos.mjs`, `propio.mjs`, `textos.mjs`; `integrar.mjs` y `calcular-empresa.mjs` (19 de 19 controles) |
| 10:29-10:30 | Word y PDF (40 páginas); `apuntar-12m.mjs`; `precios.mjs LOPE`; `robustez.mjs --actual` |

## Decisiones

- **BPA en base ajustada** (la de la empresa y el consenso): sin amortización de Orbis ni el acuerdo de 35 M del qui tam; pagos en acciones como coste. Historia del PER en esa base (adelantada y al cierre).
- **PER actual con el BPA de 2027e** (el ejercicio siguiente, como dice METODO-VIGENTE.md): 14,6x. Con el de los próximos 12 meses sería 14,8x; la señal no cambia.
- **Acciones 25,4 M en 2027e-2028e** (guía del 4T26), sin recompras no anunciadas: por eso 2027e (11,10) queda un 1,9 % bajo el consenso (11,31).
- **WACC con 1 punto de prima adicional** por cliente único (GCU, 89 % de los ingresos) y dependencia total de las ayudas federales (Title IV); la beta (0,77) no recoge ese riesgo binario. Sin ella (WACC del 9,39 %) el DCF subiría a 178,79 USD (+13 %).
- **Circulante al 5,4 %** (clientes − proveedores, la medida del motor) en lugar del ≈ −1 % operativo completo: prudente y sin control en rojo.
- **2026e fijo** (dos trimestres publicados y guía anual de ingresos y margen).
- **Sin mercado final** en la prueba de sostenibilidad: el NCES mide el mercado en alumnos, no en dólares; se explica en la justificación.
- **Comparables**: ninguno es un proveedor de servicios puro (2U quebró en 2024); fuera Coursera y Chegg (sin beneficio) y Adtalem (Yahoo sin datos). Peso del 10 %.
- **Riesgo de IA** tratado como «Medio / Negativo» (−5 a −15 % a 3-5 años): encarece la captación (lo reconoce la dirección en la llamada del 2T26) y abarata la formación en línea genérica; protegen los títulos acreditados con ayudas federales, las prácticas de enfermería y el campus.
- **Regla 13**: veredicto «no cambia» (sin colocaciones, ampliaciones ni decisiones con fecha; resultados del 4-nov no retrasan, regla 11).
- **Pendiente fuera de este hilo** (restricciones del checkout compartido): ficha sectorial de educación en `sectores/` (no existe y no se ha creado), `cobertura.mjs --arreglar`, `seguimiento.mjs`, `cola.md`, commit y push.

## Revisión a 12 meses

LOPE: v3 ponderada +7,5 %, base +12,5 % → Mantener (v2: +10,5 % / +6,6 %, Mantener). Objetivo 174,26 USD; valor intrínseco 155,71. Comprar por debajo de 151,53; límite robusto (v3 y v2 con BPA −10 %) 136,43 USD. Robustez: FRÁGIL, acción robusta **No mantener** (v3 por debajo del filtro de mantener, 158,42). Precio 162,11 USD (cierre del 19-oct); la sesión del 20-oct no había abierto al terminar (10:30 UTC), sin cotización de preapertura.

## Pasos y fecha de los datos

| Paso | Herramienta o fuente | Fecha del dato |
|---|---|---|
| Cuentas anuales 2016-2025 | `cuentas.mjs --sec LOPE` (SEC XBRL companyfacts; 10-K 2025 presentado el 18-feb-2026) | 31-dic-2025 |
| Último trimestre y balance del puente | 10-Q del 2T26 y nota de resultados (EDGAR) | 30-jun-2026 (publicado 30-jul-2026) |
| Guía 2026, 3T y 4T | Nota de resultados del 2T26 | 30-jul-2026 |
| MSA con GCU | 10-Q del 2T26 (MSA firmado el 29-jul-2026) y 8-K del 3-jun-2026 | 29-jul-2026 |
| Línea de crédito | 8-K | 1-oct-2026 |
| Director financiero de baja | 8-K | 24-ago-2026 |
| Gobierno y remuneración | DEF 14A 2026 y 8-K de la junta | 23-abr-2026 / 10-jun-2026 |
| Operaciones de directivos | `form4.mjs` (Form 4) | 20-oct-2025 a 20-oct-2026 |
| Precio, beta, cierres de ejercicio | `bolsa.mjs` (Yahoo) | cierre del 19-oct-2026 |
| Movimiento (regla 13) | `movimiento.mjs LOPE` | cierre del 19-oct-2026 |
| Noticias de 12 meses | `noticias.mjs` y Seeking Alpha (RSS) | hasta 18/20-oct-2026 |
| Consenso y comparables | Yahoo (`notas/yahoo-datos.mjs`) | 20-oct-2026, 10:12 UTC |
| Tasa libre | Tesoro de EE. UU., 10 años (5,15 %) | 19-oct-2026 |
| Prima implícita del mercado | Damodaran, ERPbymonth (4,20 %) | octubre de 2026 |
| Sector (alumnos a distancia) | NCES Fast Facts | otoño de 2021 |
| Último precio en precios.json | `precios.mjs LOPE` | cierre del 19-oct-2026 |
| Pruebas de robustez | `robustez.mjs --actual` | 20-oct-2026, 10:29 UTC (precio del 19-oct) |
