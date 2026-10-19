# Diario · Electrical Industries Company (1303.SR) · 19-oct-2026

Commit de partida: `8e12032 Escáner value amplio (16 regiones, 61 bolsas) y seis análisis value del 19-oct`. Procedimiento completo desde cero (`/analiza-empresa`), no un refresco; fases A-E hechas a mano en un solo hilo, sin subagentes. Horas del contenedor (UTC).

## Pasos, con la fecha de los datos

| Paso | Hora (UTC) | Datos a fecha de |
|---|---|---|
| Identificación: Tadawul 1303, ISIN SA13LG50KBH9, SAR, NIIF (SOCPA); accionistas (Adja 15,00 %, Al-Tuwaijri 10,6 %, Al-Toukhi 5,91 %; ni Al-Muhaidib ni Zamil como accionistas), extranjeros 18,96 % (máx. 46 %, QFI/swaps) | ≈10:27 | Argaam IR (accionistas) 19-oct-2026 |
| Descarga de cuentas (sin XBRL): anuales 2021-2025 (KPMG; PwC 2021), intermedios 2T24-2T26, informes del consejo 2024-2025, de la web de inversores (API de Argaam IR); estados financieros escaneados, leídos página a página | ≈10:30 | 2025 anual; 1S26 a 30-jun-2026 |
| `bolsa.mjs` (índice KSA; ^TASI.SR sin datos) y `movimiento.mjs` (1 m −21,6 %, 6 m −36,8 %, 12 m +10,6 %; P3 y P5) | 10:27 y 10:50 | cierre del 18-oct-2026 (11,99 SAR); movimiento con la sesión del 19-oct en curso (12,07) |
| Notas A-E (`construir-notas.mjs`): cuenta, balance, flujos, 8 trimestres, 2 segmentos, 4 geografías, cartera de pedidos, sector, foso, gobierno, consenso (1 analista), 10 comparables, 3 transacciones; sentimiento sin fuentes accesibles | hasta 10:46 | consenso MarketScreener 16-oct; comparables Stock Analysis 16/18-oct; noticias hasta el 19-oct |
| WACC: UST 10 años 5,10 % + diferencial soberano 0,51 % = 5,61 %; beta 1,1; ERP 5,5 + 0,78 de país → 12,37 %; BCE para CAD/USD | 10:36 | FRED 15-oct-2026; Damodaran (jul/oct-2026); BCE 16-oct-2026 |
| Supuestos y puente (`supuestos.mjs`, `propio.mjs`) | 10:47-10:55 | balance a 30-jun-2026 + dividendo pagado el 23-ago − reembolso de la multa (14-jul) |
| Textos, riesgo de IA, `bolsa.contexto` (`textos.mjs`, `textos-final.mjs`, `resumen.mjs`, `objetivo.mjs`) | 10:50-10:57 | — |
| `integrar.mjs` + `calcular-empresa.mjs` (dos pasadas; 20 de 24 controles y 4 explicados; todas las citas con fuente) | 10:57 | — |
| Word (`rellenar.mjs`, cobertura 83,6 %) y PDF (soffice, 42 páginas) | 10:58 | — |
| `simbolos.json` (1303 → 1303.SR) y `precios.mjs 1303` | 10:58 | cierre del 18-oct-2026 (11,99) |
| `apuntar-12m.mjs` y `robustez.mjs --actual`: SÓLIDA, acción robusta No mantener | 10:59 | precio 11,99 |
| `revision-12m-2026-10-19.md` | 10:59 | — |

## Decisiones

- **Precio**: último cierre disponible al hacer el informe, 11,99 SAR del 18-oct; la sesión del 19-oct (Tadawul cierra a las 12:00 UTC) seguía abierta (12,07). No cambia la señal (Mantener entre 8,67 y 12,32).
- **Tasa libre en USD** (SAR anclado): Treasury + diferencial soberano saudí; prima de país de Damodaran como prima adicional. Terminal del 3 %.
- **Impuestos**: zakat de la parte saudí del capital; tipo efectivo del 5 % estructural; DCF al 6 %. Robustez lo marca (D5) como posible BPA inflado: no lo es.
- **Margen de ciclo**: 32 % en 2026e (fijo, con el 1S26) que baja al 24,5 % en 2031e; es la diferencia con el único analista (36 % en 2028e).
- **Circulante** del 38 % de las ventas incluyendo activos de contrato y anticipos de clientes (37,4 % en 2025, 38,2 % en 2024).
- **Puente**: indemnizaciones por cese (139,6 M) como deuda; inversiones a valor razonable (21,8 M) como asociadas; otros ajustes +113,0 M (dividendo del 1S26 pagado menos reembolso de la multa).
- **Dividendo**: 2025 con 0,25 ordinario + 0,25 extraordinario (`dpa` 0,50, `dpa_extraordinario` 0,25); el motor usa solo el ordinario.
- **PER histórico**: ningún año excluido; el mínimo de 2022 (5,2x) hace muy duro el bajista (robustez M4: sin doble castigo, −1,0 %).
- **Sostenibilidad**: «Sí» (crecimiento 7,4 % frente a 14,2 % financiable); `mercado_final` nulo porque los estudios de mercado dan un tamaño menor que las ventas de EIC; prueba manual con el plan de SEC.
- **Huecos**: sentimiento (Hawamer solo miembros, Stocktwits 404), mercado final, cuota, EBITDA trimestral, EV/EBITDA NTM de comparables, voto de remuneración, remuneración individual, fechas de nombramiento, posiciones cortas, segunda fuente de consenso.

## Resultado

Mantener, convicción baja. A 12 m (v3): ponderado 10,84 SAR (−7,5 %), base 11,28 (−3,8 %); v2 +5,6 %; con BPA −10 %: −16,5 %. Valor intrínseco 8,67 (−27,7 %); DCF 6,47. ROIC 70,0 %, WACC 12,37 %. Comprar por debajo de 8,67; vender por encima de 12,32. Robustez SÓLIDA (No mantener). Próximos resultados: 3T26 hacia el 22-oct-2026.

## Lecciones propuestas

- **Arabia Saudí (para `lecciones-paises.md`)**: sin XBRL; las cuentas y los informes del consejo están en la web de inversores de Argaam IR, que tiene una API (`data.argaam.com/authenticate-ir` con `{"companyId": N}` y cabeceras Origin/Referer de la web IR → token; luego `financial-results`, `major-shareholders`, `stock-summary`). Los estados financieros vienen escaneados: hay que renderizar las páginas (`pdftoppm`) y leerlas.
- **Arabia Saudí**: ^TASI.SR no da serie en Yahoo; usar el ETF KSA como índice en `bolsa.mjs`. Tadawul cierra a las 12:00 UTC: un análisis por la mañana europea toma el cierre del día anterior.
- **Arabia Saudí**: el zakat sustituye al impuesto de sociedades en la parte saudí del capital; el tipo efectivo del 5 % es normal y `robustez.mjs` (D5) lo marca como BPA inflado sin serlo.
- **Estudios de mercado de pago (Mordor, IMARC)** pueden dar tamaños menores que las ventas del líder: no usarlos para `mercado_final` sin comprobarlo.
