# Diario · Accton Technology (2345.TW) · 16-oct-2026

- Commit de partida: 7409c4a (README del escáner: el ROIC − WACC del filtro previo es aproximado).
- Entorno: nube de Claude Code, sin subagentes (fases A-E hechas por mí). Origen: hueco de los grandes índices (MSCI EM, MSCI Taiwan) con calidad aproximada alta en el escáner.
- Tiempos (UTC): inicio 08:30; datos y notas A-E 08:55; primer cálculo 08:52; textos, resumen, Word y PDF 08:58; revisión 12 m, robustez y movimiento 09:05.
- Fecha de corte 2026-10-16; precio: cierre del 16-oct (1.980 TWD, `bolsa.mjs`, sesión de Taipéi cerrada a las 05:30 UTC). Divisa TWD; cierre en diciembre; NIIF de Taiwán.

## Fuentes y limitaciones
- **MOPS y accton.com bloqueados** («查詢過量» y aviso de seguridad por IP compartida; 403). FinMind también al límite. Las cuentas 2021-2025, trimestres y LTM jun-26 salen de S&P Global vía StockAnalysis (WebFetch, tablas literales), cotejadas con la ficha oficial en inglés de la Bolsa de Taiwán (`twse.com.tw/pdf/en/2345_en.pdf`: BPA trimestral básico, beneficio antes de impuestos acumulado, ventas mensuales 2021-2026, dividendos y hechos relevantes), que cuadran. EBITDA = EBIT + D&A del estado de flujos + otras amortizaciones: igual que MarketScreener (33.861 M TWD en 2025).
- Bono de Taiwán a 10 años: 2,03 % (Trading Economics, leído con curl, literal). USD/TWD 32,37 (Yahoo).
- Reparto de ventas por línea (≈62 % módulos aceleradores, ≈35 % conmutadores en 2025): estimación de analistas (Vocus, prensa); concentración por cliente no publicada en lo leído.

## Decisiones
- 2026e fijo (+63 %): 9M26 oficial 286.402 M TWD + 4T26 ≈118.400 M (−2 % trimestral por consigna y transición a Trainium 3).
- Base: +33 % 2027e, +22 % 2028e (consenso +28 % y +40 %), margen EBITDA 15 % hasta 2028 y 13 % desde 2032; capex 3,2-3,0 % → 1,5 %; circulante 11 % (13,6 % en jun-26; 1 % en 2025 atípico); impuestos 20,5 %.
- WACC 9,55 %: tasa libre 2,03 %, beta 1,2 (0,74 mensual 5 a frente al 0050; 1,29 semanal 2 a; 1,05 ajustada), prima 5,5 % + 1,0 Taiwán. Terminal Gordon 1,5 %.
- Puente jun-26: resta el dividendo de 15 TWD pagado en julio (8.384 M) que seguía en la caja; suma las inversiones financieras a largo (2.693 M).
- Escenarios: bajista con perfil (2027e ventas planas, 2028e +5 %, margen −2,5) y −2/−2 después; alcista +6/+1 en 2027-28 y +4/+1 después; 25/50/25.
- ROIC del motor 221,6 % (capital invertido casi nulo en 2025); normalizado con circulante del 12 %: ≈60 %; con el balance de jun-26: ≈82 %. Calidad holgada en cualquier medida (ROIC − WACC sin redondear del motor: 221,58 − 9,55 = 212,03; normalizado ≈50).
- Sostenibilidad «Sí» (pruebas del motor pasan; `mercado_final` null porque la cuota es solo de conmutadores: ≈8 % del segmento de centros de datos de IDC, prueba a mano).

## Resultado
- Mantener, convicción baja (sugerida por el motor: el valor intrínseco da Vender con nuestro WACC y Mantener con la prima del mercado). DCF 1.511,34 TWD; valor intrínseco (síntesis) 1.558,27 TWD (−21,3 %); DCF inverso: 15,2 % de crecimiento implícito en 2027-2035 frente a 10,0 % del base.
- **Línea 12 m:** objetivo ponderado 2.197,16 TWD (+11,7 %; base +15,9 %), Mantener; comprar < 1.558,27, vender > 2.457,95. Detalle en `revision-12m-2026-10-16.md`. No se han ejecutado `apuntar-12m.mjs`, `seguimiento.mjs`, `cobertura.mjs` ni `calendario.mjs` (lo hace el integrador).
- Robustez: SÓLIDA; acción robusta «No mantener» (no comprar): V1 (VI 21 % bajo el precio), D6 (BPA +41 % anual desde 2025, explicado), D7 (−21 % frente al consenso). Límite robusto 1.558,27 TWD.
- Regla 13: `movimiento.mjs 2345.TW` → 1 m +5,6 %, 3 m −14,7 %, 12 m +89,5 %, −28 % del máximo, tendencia alcista, sin avisos P1-P5. Veredicto: no cambia.
- Controles: 16 de 20 correctos y 4 explicados (circulante del primer año, EBITDA frente al consenso, crecimiento del BPA, primarias por bloqueo de MOPS).
- Próximos resultados: ≈6-nov-2026 (StockAnalysis, estimada; el 3T25 se presentó el 6-nov-2025).

## Lecciones (para el integrador)
- **Taiwán desde la nube (16-oct)**: MOPS (`doc.twse.com.tw`, `mops.twse.com.tw/mops/api`) bloquea por IP compartida; la ficha en inglés `https://www.twse.com.tw/pdf/en/<código>_en.pdf` sí descarga con curl y trae BPA trimestral, ventas mensuales de 5 años, dividendos y hechos relevantes (fuente primaria). StockAnalysis (`/quote/tpe/<código>/`) abre con WebFetch y da cuenta, balance y flujos de 5 años en TWD. Las ventas mensuales permiten fijar el año en curso.
- PTT Stock abre con curl y la cookie `over18=1` (búsqueda `/bbs/Stock/search?q=`): sirve para la sección de sentimiento de cotizadas taiwanesas.
