# Diario · Zhejiang DunAn Artificial Environment (002011.SZ) · 19-oct-2026

- Commit de partida: 8e12032 («Escáner value amplio (16 regiones, 61 bolsas) y seis análisis value del 19-oct…»). Sin `git pull`, `commit`, `push`, `checkout`, `stash` ni cambios de rama (checkout compartido). Escrito fuera de esta carpeta, con `flock` sobre `repo.lock`: mi entrada `002011` en `verticales/empresa/simbolos.json` (releída dentro del candado; solo se añade la mía), y lo que escriben solas `apuntar-12m.mjs` (`objetivo12m-revisados.json`) y `precios.mjs 002011` (`precios.json`). No se tocaron `cola.md`, `MEMORIA.md`, `METODO-VIGENTE.md`, `lecciones*.md` ni `seguimiento.xlsx`; no se ejecutaron `seguimiento.mjs`, `cobertura.mjs`, `regenerar.mjs` ni nada con `--todas`/`--todos`.
- Tiempos (UTC del contenedor): inicio 10:26 (`_commit.txt`); bolsa y movimiento 10:28; comparables 10:32; documentos 10:39; notas A-E 10:44; supuestos y propio 10:45-10:46; textos 10:51; resumen, Word y PDF 10:53-10:54; revisión a 12 meses, símbolo, precios y robustez 10:52-10:55. Hubo una compactación del contexto en medio (tras escribir `textos.mjs`).
- Encargo: análisis value completo desde cero; cuentas CNINFO (anuales 2021-2025, semestral 1S26; el 3T26 aún no ha salido: 27-oct-2026); bono ChinaBond del día; comparación con Sanhua (002050); comprobar Stock Connect.
- Fases A-E hechas por mí, sin subagentes (`notas/construir-notas.mjs`); parte propia en `propio.mjs` + `supuestos.mjs` + `textos.mjs` + `resumen.mjs`.

## Pasos y fecha de sus datos

| Paso | Herramienta / fuente | Fecha de los datos |
|---|---|---|
| Precio, beta, rentabilidades, cierres de ejercicio | `bolsa.mjs 002011.SZ` frente a 510300.SS (CSI 300) y 159996.SZ (electrodomésticos); `precios.mjs 002011` | cierre 19-oct-2026 (10,75 CNY) |
| Movimiento (regla 13) | `movimiento.mjs 002011.SZ` | 19-oct-2026 |
| Cuentas 2021-2025, 1S25, 1S26, 1T25, 1T26, 3T25 | informes CAS de CNINFO (`descargar.mjs`, `notas/docs/`, pdftotext) | anual 2025: 29-abr-2026; 1S26: 27-ago-2026 |
| Dividendo, acciones, junta, vinculadas, incentivos, Zijin, bloqueo de Gree | anuncios de CNINFO | 27-nov-2025 a 5-ago-2026 |
| Consenso y objetivos | Eastmoney F10 (ProfitForecast, 10 analistas) | 19-oct-2026 |
| Comparables (8) y Sanhua | ficha de Yahoo (`herramientas/yahoo.mjs`, script en el scratchpad); resúmenes anual 2025 y 1S26 de Sanhua (CNINFO) | 19-oct-2026; 2026-03 y 2026-08 |
| Bono chino 10 años (1,6497 %) | ChinaBond (curva 中债国债收益率) | 19-oct-2026 |
| Prima implícita (4,20 %) | Damodaran ERPbymonth | oct-2026 |
| Stock Connect | HKEX, List of SZSE Securities (China Connect, compra y venta), fila 382, CCASS 72011 | 16-oct-2026 |
| Operaciones de directivos | Eastmoney RPT_EXECUTIVE_HOLD_DETAILS | 19-oct-2026 |
| Noticias de precio (28-sep, 15-oct, 9-sep, 7-sep) | Eastmoney (prensa) | 7-sep a 15-oct-2026 |
| Sentimiento | Guba de Eastmoney | 16-19 oct-2026 |
| Próximos resultados | CNINFO, calendario de informes periódicos | 3T26 el **27-oct-2026** |

## Comprobaciones pedidas

- **Stock Connect hacia el norte: sí.** 002011 figura en la lista de HKEX «List of SZSE Securities / China Connect Securities (eligible for both buy and sell)» actualizada el 16-oct-2026 (fila 382, CCASS 72011): comprable desde fuera de China.
- **Sanhua (002050)**: ventas 2025 de 31.012 M, beneficio 4.063 M, margen EBIT 16,1 % y EBITDA 19,5 % frente al 8,9 % y 10,8 % de DunAn; PER de los próximos 12 meses 27,2x frente a 9,6x. 1S26 de Sanhua: ventas +3,9 %, beneficio −3,1 %. ROIC de Sanhua ≈ 12,4 % (Yahoo) frente al 26,7 % de DunAn.

## Decisiones

- EBIT del informe = resultado de explotación sin ingresos financieros, de inversiones, valor razonable ni extraordinarios (营业外). Clientes y proveedores con efectos bancarios (应收款项融资, 应付票据) y activos/pasivos de contrato. 2022 reexpresado (fusión bajo control común).
- WACC 8,54 % (tasa libre 1,6497 %, beta 1,05, prima 5,5 % + 1,5 % de China y gobierno, Kd 3 %, deuda 6 %); g 1,0 %. Pesos DCF 60 / comparables 10 / escenarios 30. Puente a 30-jun-2026 con el dividendo de agosto restado (107,4 M) y asociadas sumadas (461 M).
- BPA 2028e base 1,105 (consenso 1,276, −13 %): diferencia de margen. Objetivo a 12 m con v3 ×1,1 (selector: 14,28 / 10,62 = 1,34 < 1,8). v2 de control metida en `per_historico.v2` (el motor la marca como clave fuera del esquema pero la usa).
- Convicción **Baja** (la sugerida es Media): la señal es frágil (v2 y BPA −10 % dan Mantener; compra robusta por debajo de 10,40).
- ISIN y año de fundación a `null`: no verificados en los documentos descargados.

## Resultado

- Precio 10,75 CNY (19-oct). Objetivo 12 m 13,18 (ponderada +23,5 %, base +21,2 %) → **Comprar**, convicción Baja; v2 +11,3 % Mantener. Valor intrínseco 16,64 (+54,8 %); DCF 15,97. ROIC 2025 26,67 % (1.022 / 3.832) frente a WACC 8,54 % = +18,1 puntos. Sostenibilidad Sí (5,4 % proyectado; financiable 6,4 %). Altman 3,32, Piotroski 9, Beneish −2,52.
- Robustez `--actual`: **FRÁGIL**; acción robusta Mantener en cartera; límite de compra 11,55 (v2 10,41); límite robusto 10,40; BPA −10 %: 11,3 % / 9,2 %. No es COMPRA ROBUSTA (regla 6): fallan la v2 (11,3 %), B1 (BPA −10 %) y L1 (10,75 > 10,40); la calidad (sostenibilidad Sí y ROIC − WACC ≥ 5) sí pasa.
- `bolsa.contexto`: veredicto **no cambia** (la caída de un mes, −18,2 %, devuelve una subida temática que el caso base no usa; sin colocaciones ni planes de venta vivos). Resultados del 27-oct: no aplazan (regla 11).
- Controles en «Revisar»: tipo impositivo de 2024 (explicado), DCF inverso sin solución (explicado: el precio está por debajo del DCF con crecimiento cero) y compra robusta (v2 Mantener: real, no se corrige).
- Huecos: transacciones del sector sin múltiplo publicado; ventas de centros de datos sin desglose; EV/EBITDA adelantado de los comparables (gráficos comps_ev y comps_mapa vacíos); BPA trimestral estimado; ISIN.

## Lecciones propuestas

- **Consenso chino sin MarketScreener**: la API F10 de Eastmoney (ProfitForecast) da por curl la media de seis meses y el detalle por casa (BPA 2026-2028e, objetivos); MarketScreener no respondió por WebFetch.
- **Calendario de resultados de China**: el POST `getPrbookInfo` de CNINFO da la fecha reservada de cada informe periódico.
- **Lista de Stock Connect**: el `SZSE_Securities.xls` de HKEX no se lee con Python sin xlrd; `soffice --convert-to csv` lo convierte (fuera del repo, en el scratchpad).
- **Operaciones de directivos en China**: el dataset `RPT_EXECUTIVE_HOLD_DETAILS` de Eastmoney sustituye a la API de la SZSE, que falla por SSL desde el contenedor.
- **Consultas de CNINFO**: `pageNum` se ignora en algunas búsquedas; consultar por ventanas de fechas.
- **Empresa con mucha caja neta y PER bajo**: el DCF inverso no tiene solución (vale más que el precio con crecimiento cero); explicar con el margen implícito y la rentabilidad implícita.
