# Diario · Daikin Industries (6367.T) · 14-oct-2026

- Commit de partida: 2be9ddd (al terminar, main va por a9053f2 por los otros hilos; sin `git pull`, `commit` ni `push` por encargo: comparto el checkout con otros tres análisis). Inicio 20:53 UTC.
- Entorno: nube de Claude Code con red a través del proxy. `herramientas/bolsa.mjs` funcionó (`--cierre-mes 3 --etiqueta fin`); `cuentas.mjs` no sirve para Japón. Descargados a `notas/docs/` los Kessan Tanshin en inglés (FY2018, FY2020, FY2022, FY2024-FY2026 y trimestres hasta el 1T FY2027), presentaciones y transcripciones de resultados, el informe integrado 2026, la convocatoria y los resultados de voto de las juntas 121-123, la sesión de centros de datos y las notas de compra de Goodman, AHT y Flanders. Consenso y comparables de Yahoo (quoteSummary con cookie y crumb); tipos de cambio del BCE; bono japonés del Ministerio de Hacienda.
- Fecha de corte 2026-10-14; divisa JPY; J-GAAP; ejercicio a marzo, etiquetado por el año en que termina (FY2026 = abr-25 a mar-26; Daikin lo llama «fiscal 2025»). **Ejercicio objetivo del 12 m: FY2028e (marzo de 2028).** Notas A-E y propio hechas por mí sin subagentes (`notas/construir-notas.mjs` escribe A-E; `propio.mjs` + `supuestos.mjs` + `textos.mjs` + `resumen.mjs`). Ficha sectorial reutilizada: `sectores/climatizacion-hvac-2026-10-14.md` (su `mercado_final` es el de Belimo; para Daikin, el mercado mundial de MarketsandMarkets).
- **Confianza de los datos de núcleo: media-alta.** Cuentas de los documentos de la empresa; precio de cierre del día. Faltan: remuneración individual del CEO, calendario de vencimientos, calificaciones ESG, posición corta, operaciones de directivos (huecos registrados). EBITDA de consenso no publicado (EV/EBITDA NTM n.d.). Fecha del 2T estimada (principios de noviembre; sin confirmar).
- Decisiones:
  - EBITDA = beneficio operativo + depreciación + amortización del fondo de comercio (J-GAAP lo amortiza: 51.371 M en FY2026). BPA publicado, con esa amortización dentro.
  - Puente con el balance de jun-26 (después de la recompra). `otros_ajustes` = −148.700 M: valores de inversión (212.415 M) netos de un 30 % de impuesto, como activo no operativo. Un primer cálculo los puso con signo positivo y los restaba (lección abajo).
  - **Rebaja del caso base por la prueba de sostenibilidad**: la primera proyección (crecimiento 4,5 %, margen EBITDA al 15 %, capex 5,6-5,8 %) daba un capital nuevo con un rendimiento del 24 % frente a un ROIC del 9 %; con el margen plano en el 13,9 % y el capex en el 6,5 % seguía faltando reinversión (financiable 3,1 % frente a 4,0 %). Base final: crecimiento medio del 3,9 %, margen 13,6-13,9 %, capex del 7,2 % al 6,5 % (plan de FUSION 30 con sus 500.000 M de compras). Las tres pruebas pasan: financiable 4,0 % frente a 3,9 %, capital nuevo al 8,9 % (histórico 8,5 %), cuota del 10,6 % al 9,5 %.
  - WACC 6,70 % (bono a 10 años 3,019 %, beta 0,85, prima 5,5 %, Kd 3,5 %, deuda 19 %); g = 2,0 %. Pesos DCF 50 / comparables 20 / escenarios 30.
  - PER histórico adelantado con cierres de marzo; FY2021 excluido (burbuja de la pandemia). v2 rellenado en `per_historico.v2`.
  - Control «DCF inverso calculable» explicado: el crecimiento no lleva al precio con circulante del 34 %; el precio descuenta un margen EBITDA del 15,5 % (el 10 % operativo de FUSION 30).
- Resultado: DCF 16.322,38 JPY (−24,3 %); valor intrínseco 16.735,69 (−22,4 %); con la prima del mercado 20.175,78. ROIC 9,0 % frente a WACC 6,70 % (+2,3 puntos; sin fondo de comercio 11,6 %, +4,9). Calidad: **No**.
- **Línea 12 m (v3)**: objetivo 23.135,81 JPY, ponderada +8,8 %, base +13,4 % (apuntar-12m: 13,5 %); v2 +7,4 %. **Mantener**, convicción media. Comprar < 16.735,69; vender > 26.084,23. Robustez: SÓLIDA, acción robusta **No mantener** (calidad y valor intrínseco). Detalle en revision-12m-2026-10-14.md.
- Una acción ≈ 121,6 EUR (177,39 JPY/EUR): menos del 7 % de 30.000 EUR, pero el lote mínimo en Tokio es de 100 acciones (≈ 12.160 EUR, 40 %).
- Word y PDF (soffice): 19 de 20 controles y 1 explicado. Cobertura 86,4 % (gobierno por debajo del 60 %: sin remuneración individual).
- Tiempo: de 20:53 a unos 21:25 UTC de reloj en la parte final (la investigación previa, antes de la compactación del contexto).

## Lecciones

- Daikin (y otras japonesas) nombran el ejercicio por el año en que empieza: `bolsa.mjs --cierre-mes 3 --etiqueta fin` para que FY2026 sea el que termina en marzo de 2026, y traducir los objetivos de la empresa («FY2028» de Daikin = nuestro FY2029).
- Los PDF de resultados de Daikin están en la web de inversores bajo `kessan/<año de cierre>/`; la página de resultados no los lista directamente.
- Yahoo quoteSummary no devuelve los tipos de cambio (`JPY=X` da null): usar el BCE.
- `valoracion.puente.otros_ajustes` positivo **resta** (se trata como deuda); un activo no operativo (valores de inversión, participaciones cruzadas) va con signo negativo.
- Con circulante alto (≈ 34 % de las ventas) y ROIC bajo, la prueba de sostenibilidad obliga a subir mucho la reinversión: el DCF cae y el crecimiento deja de mover el valor (DCF inverso sin solución en crecimiento); el margen implícito es la lectura útil.
