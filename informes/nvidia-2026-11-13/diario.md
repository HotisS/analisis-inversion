# Diario · Nvidia (NVDA) · 13-nov-2026 (análisis value, iteración 2)

- Commit de partida: 645f096 (Escáner 12-nov). Prompt `verticales/empresa/prompt.md` y método vigente (v3 ×1,1 con selector; niveles A/B1/B2/C).
- Tanda de 10 análisis paralelos: sin subagentes (notas A-E hechas por mí), PDF con `soffice`, `apuntar-12m.mjs` y `robustez.mjs` con `flock`. No toco nada fuera de esta carpeta.
- Fecha de corte 2026-11-13; análisis **previo a los resultados del 3T FY2027 (17-nov-2026, tras el cierre)**. Punto de partida: `informes/nvidia-2026-10-14/` (cada dato vuelto a comprobar).
- Ejercicio cerrado a finales de enero, etiqueta «fin» (FY2026 = feb-25 a ene-26).

## Pasos (hora de Madrid)

- 13-11 08:52 · Inicio; lectura de comando, prompt, lecciones (núcleo, EE. UU., casos) y METODO-VIGENTE.
- 13-11 08:53 · `cuentas.mjs --sec NVDA`: 10 ejercicios FY2017-FY2026 en `notas/cuentas-xbrl.json`.
- 13-11 08:55-09:00 · Descargas de EDGAR (10-K FY2026, 10-Q y nota del 2T FY27, nota del 1T FY27, 8-K de Huang, SB Energy, Hugging Face, junta, Parker, folleto de bonos, proxy 2026), bolsa.mjs, movimiento.mjs, form4.mjs, Yahoo (consenso y comparables), Tesoro (5,10 %) y Damodaran (nov-26: 4,41 %).
- **Hecho nuevo decisivo**: Jensen Huang dimite el 11-nov-2026 (8-K del 12-nov) tras la investigación del consejo (8-nov); Colette Kress primera ejecutiva interina; Harvey Jones presidente. La acción cae un 30,5 % desde el máximo del 6-oct (166,19 USD al cierre del 12-nov).
- 13-11 09:08 · Notas A, B, C, D y E escritas (sin subagentes).
- 13-11 09:09-09:12 · propio.mjs y textos.mjs; integrar y calcular: 19 de 23 controles correctos y 4 explicados (caja proyectada, consenso FY2029e, compra robusta, crecimiento del BPA desde FY2026).
- 13-11 09:12 · Word y PDF (44 páginas, soffice); revisadas portada y resumen ejecutivo como imagen.
- 13-11 09:13 · apuntar-12m.mjs --precios y robustez.mjs (con flock); revisión 12 m escrita; comprobar.mjs sin ERROR de esta carpeta (el único ERROR es de Transsion, otra carpeta de la tanda).

## Decisiones

- BPA en base «ajustado» (sin ganancias de participaciones, con la remuneración en acciones como gasto, como el non-GAAP de la empresa desde el 1T FY27) en historia y escenarios (base_bpa declarado en los dos).
- Puente a 26-jul-2026: deuda 33.366 M; caja y valores de deuda 56.586 M; participaciones cotizadas (42.783 M) y no cotizadas (51.157 M) como «asociadas»; Hugging Face (11.900 M, sin cerrar) y las garantías de hasta 105.000 M a OpenAI fuera del puente y explicadas.
- WACC 12,76 % (Tesoro 5,10 %, beta 1,55, prima 5 %); con la prima de Damodaran de noviembre (4,41 %), 11,85 %.
- Base por debajo del consenso a propósito: FY2028e +50 %, FY2029e +12 %, FY2030e −5 %; margen EBITDA del 67 % al 55 %. Probabilidades 30/45/25 por la salida del fundador.
- Sostenibilidad «En parte»: el motor da «Sí» (activos ligeros), pero parte de la demanda la financia Nvidia (participaciones, plazos, garantías).
- Recomendación Mantener (convicción baja) apartándose de la regla (Comprar 19,8 %): no es compra robusta (v2 8,4 %; BPA −10 % no aguanta), el valor intrínseco solo supera el precio por los comparables y precio y noticias dan «retrasa» hasta el 17-nov.
- Comparado con el informe del 14-oct: precio 228,52 → 166,19 USD (−27 %); objetivo ponderado 260,89 → 198,87; VI 224,02 → 173,88; WACC 12,87 → 12,76 %; señal de la regla Mantener → Comprar (por el precio); recomendación Mantener en los dos. Nuevo: dimisión de Huang, garantías a OpenAI, Hugging Face, dividendo de 0,25 USD por trimestre, compromisos de 279.000 M.

## Revisión a 12 meses

Nvidia · 13-nov-26 · 166,19 USD (cierre 12-nov) · objetivo ponderado 198,87 USD (+19,8 %) · base 194,97 (+17,5 %) · v2 8,4 % · VI 173,88 (+4,6 %) · consenso 285,35 · regla **Comprar**, informe **Mantener** (baja) · robustez **FRÁGIL**, compra robusta no · nivel hoy ninguno («retrasa»); límites C ≤ 163,08 y B2 ≤ 155,99 USD · filtro de mantener 181,09 USD. `apuntar-12m.mjs --precios` apuntó con 173,73 (precios.json del 11-nov): Mantener 14,7 %. Detalle en `revision-12m-2026-11-13.md`.

## Qué vigilar el 17-nov (3T FY27, tras el cierre de EE. UU.)

- Ingresos frente a la guía de 108.000 M ± 2 % (consenso 108.814 M) y margen bruto frente al 74,0 %.
- **Guía del 4T**: ≥ 120.000 M mantiene el base; < 115.000 M o margen guiado < 72 % rebaja el base (y la señal).
- Clientes y existencias frente a ventas; compromisos de suministro (279.000 M); ganancias de participaciones.
- Mensaje de Kress sobre la sucesión, la investigación del consejo y la continuidad de la hoja de ruta; sesión de la Cámara el 18-nov.
- Qué cambiaría la señal: tras los resultados, cotización ≤ 163,08 USD sin novedades negativas → Comprar (nivel C); ≤ 155,99 → B2. Por encima de 181,09 USD, vender para quien la tiene. Investigación formal a Nvidia → descarta.

## Lecciones

- `robustez.mjs` y `apuntar-12m.mjs --precios` leen `verticales/empresa/precios.json` aunque el informe tenga un cierre más reciente: con un movimiento fuerte (NVDA −4,3 % el 12-nov) la señal apuntada sale con el precio del día anterior. Correr `precios.mjs` antes (no se hizo aquí: archivo compartido de la tanda).
