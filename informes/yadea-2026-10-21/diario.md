# Diario · Yadea Group Holdings Ltd. (1585.HK) · 21-oct-2026

## Punto de partida y reglas del checkout

- **Commit de partida**: 247c5f5 («Salik: análisis value completo 21-oct (no compra; límite 3,41 AED)»).
- **Checkout compartido** con otro análisis en paralelo (Hilton). No usé `git pull`, `commit`, `push`, `checkout` ni `stash`.
- **Escrito solo en**:
  - esta carpeta;
  - `verticales/empresa/simbolos.json` (entrada `1585.HK`, insertada como texto al principio de `empresas`, sin reordenar; la entrada `HLT` es del otro análisis);
  - lo que escriben para esta empresa `precios.mjs 1585.HK` (`precios.json`) y `apuntar-12m.mjs yadea-2026-10-21` (`objetivo12m-revisados.json`).
- **Sin tocar**: `cola.md`, `MEMORIA.md`, `METODO-VIGENTE.md`, `lecciones*.md` ni `seguimiento.xlsx`.
- **Sin ejecutar**: `seguimiento.mjs`, `cobertura.mjs`, `regenerar.mjs` ni nada con `--todas`. `robustez.mjs` sin `--escribir`. No usé herramientas de hearthbot ni de IBKR.

## Tiempos (UTC)

| Hora | Fase |
|---|---|
| 11:22 | Inicio, lecturas (CLAUDE.md, METODO-VIGENTE, MEMORIA, analiza-empresa, prompt, lecciones) |
| 11:22-11:40 | Descargas de HKEXnews (25 documentos), bolsa, Yahoo, ChinaBond, MarketScreener, prensa china |
| ≈ 11:45 | Notas A-E (una compactación del contexto por medio) |
| 11:45-11:57 | Parte propia, motor, Word y PDF |
| ≈ 11:58-12:00 | Revisión a 12 meses, símbolos, precios y robustez `--actual` |

## Encargo

- Análisis value completo desde cero (no había informe anterior de Yadea).
- Valorar en serio: el ciclo del estándar nuevo y de las subvenciones de renovación (cuánto de 2025 fue pico), la guerra de precios con Aima, NIU y Tailing, el sudeste asiático, el riesgo de IA (bajo) y las noticias de 12 meses.
- Las fases A-E las hice yo: `notas/construir-notas.mjs` escribe A-E.json. La parte propia está en `propio.mjs`, `supuestos.mjs`, `textos.mjs` y `resumen.mjs`.

## Decisiones

- **Divisa**: cuentas en RMB, cotización en HKD; tipo de 0,8502 RMB por HKD (Yahoo, 21-oct, 11:41 UTC). Los cierres históricos se pasan a RMB con el tipo de fin de cada año.
- **EBIT**: beneficio de explotación − intereses bancarios − ganancias de productos de tesorería; ese importe pasa al resultado financiero. Así el EBITDA no incluye ingresos de la caja.
- **Consenso**: `base_ebitda: ajustado` con un ajuste de +0,97 % de las ventas, porque el EBITDA de MarketScreener incluye ingresos financieros (lección de Nongfu).
- **Caja**: efectivo + depósitos a plazo + activos a valor razonable (14.929,4 M a 30-jun-2026). Se excluyen los depósitos pignorados (3.557,2 M), que garantizan efectos a pagar que van dentro de proveedores. En `otros_ajustes` van el dividendo por pagar (1.408 M) y la compra de Jinjian (1.020 M).
- **Circulante**: −33 % de las ventas en 2025. Se proyecta del −32 % al −25 %, porque la caja depende de los proveedores y Jinjian trae menos crédito comercial.
- **Margen**: 8,7 % en 2026e (2S26 al 8,6 %), 8,7-8,8 % en 2027e-2029e y 8,5 % a largo plazo. Es la media de los años sin subvención; no vuelve al 10,2 % de 2025. Antes había probado un 9,2 % a largo plazo y lo bajé por prudencia: el DCF pasó de 16,5 a 13,9 RMB.
- **2026e**: 2S26 de −3 % (bicicletas flojas, descuentos de septiembre, certificados 3C). El consenso (38.613 M) está atrasado frente al 1S26 de −5 %.
- **2027e**: +11,5 %, de los que ≈ 7,5 puntos son de Jinjian (2.680 M de ventas en 2025). Cierre previsto a finales de 2026.
- **WACC**:
  - beta 0,95 (la mensual de 5 años; la semanal de 2 años, 0,42, no es creíble para un cíclico);
  - prima adicional de 2 puntos (la misma que Nongfu);
  - bono chino al 1,6412 %.
  - Resultado: WACC del 8,55 % y g del 1 %.
- **ROIC**: el capital invertido es negativo, así que se usa el ROIC sobre el capital fijo del motor: 43,5 % en 2025 y 19,6 % en 2024. Explicado en `controles_explicados`.
- **Comparables**: TVS no tenía capitalización en Yahoo; se calcula como EV − deuda + caja. La mediana del PER de los próximos 12 meses es 14,0x (solo con los chinos, ≈ 11,7x).
- **PER histórico**: no se excluye 2023 (29,5x sobre el BPA hundido de 2024), porque no cambia la mediana. Selector 1,43, así que decide la v3.
- **Regla 13: no cambia**. Los certificados 3C de bicicletas eléctricas están suspendidos en todo el sector (Yicai, 16-oct). Se recuperan con documentación; si se revocan, la solicitud nueva tarda ≈ 3 meses. Desde el 1-nov rigen reglas nuevas.
  - La caída del 21-oct (−5 %) ya lo recoge.
  - En el peor caso cuesta ≈ 0,03-0,05 RMB de BPA de 2026e: menos del 1 % del valor y nada en 2028e.
  - No es una colocación, ampliación ni decisión que vaya a mover el precio más de un 5 % por causa de la empresa.
  - Es la decisión más discutible del análisis, porque el límite robusto (9,03 HKD) está a un céntimo del precio. Con «retrasa», la acción robusta pasaría a Esperar.
- **Junio de 2026 (−20,9 %)**: un 4,9 % es el dividendo de 0,53 HKD (fecha ex-dividendo 23-jun, comprobada en el anuncio de HKEXnews). Para el resto no hay anuncio de la empresa.

## Resultado

- **Robustez** (`--actual`, precio 9,02 HKD del 21-oct): SÓLIDA.
  - Acción robusta: **Comprar**, nivel A, con límite robusto de **9,03 HKD**.
  - v3: 29,3 % / 23,9 %. v2: 17,9 % / 13,8 %. Con BPA −10 %: 17,1 % / 12,1 %.
- **Valor intrínseco**: 13,85 RMB (16,29 HKD), un 81 % por encima del precio. DCF de 13,93 RMB.
- **Controles**: 20 de 22 correctos y 2 explicados (DCF inverso sin solución por crecimiento; EBITDA un 16,6 % por debajo del consenso).

## Pasos y fecha de los datos

| Paso | Herramienta o fuente | Fecha del dato |
|---|---|---|
| Lista de documentos | HKEXnews titlesearch (stockId 140627) | 21-oct-2026 |
| Cuentas 2021-2025 | Informes anuales en HKEXnews (`descargar.mjs`) | Informe anual 2025: 24-abr-2026 |
| 1S26 | Anuncio de resultados (25-ago-2026) e informe semestral (24-sep-2026) | 30-jun-2026 |
| Acciones | Monthly Return de septiembre (2-oct-2026) | 30-sep-2026 |
| Compra de Jinjian | Discloseable transaction (25-ago-2026) | 25-ago-2026 |
| Bolsa, betas y cierres | `bolsa.mjs` (Yahoo) | 21-oct-2026 |
| Movimiento (regla 13) | `movimiento.mjs 1585.HK` | 21-oct-2026 |
| Precios mensuales | Yahoo chart 1 mes | 21-oct-2026 |
| Comparables y tipos de cambio | `notas/yahoo-datos.mjs` (Yahoo quoteSummary) | 21-oct-2026 |
| Consenso | MarketScreener (12 analistas) | 21-oct-2026 |
| Tasa libre | ChinaBond, 10 años (1,6412 %) | 21-oct-2026 |
| Prima de mercado | Damodaran ERPbymonth (4,20 %) | oct-2026 |
| Sector y certificados 3C | Yicai (11-sep y 16-oct), Guanyan, MOFCOM, NDRC, folleto de Tailing | hasta 16-oct-2026 |
| Notas de analistas chinos | Huachuang (24-sep), Guosen (9-sep) | sep-2026 |
| Sentimiento | Guba (foro hk01585) | 21-sep a 21-oct-2026 |
| Precio final | `precios.mjs 1585.HK`: 9,02 HKD | cierre del 21-oct-2026 |
| Robustez | `robustez.mjs --actual` | 21-oct-2026 |
