# Octava hora value: diagnóstico y lista propuesta (14-oct-2026, sin arrancar)

Pedido de Hotis (14-oct 21:16 UTC): «Afina también la próxima tanda de value, quiero buenos candidatos. Prueba a lanzar el escáner o a buscar en foros». No se arranca hasta que el coordinador lo diga.

## 1. Por qué de 32 análisis solo salen Aon y Hershey

Las 32 de la 6.ª y 7.ª hora se eligieron por **calidad del negocio**, sin mirar antes el precio. Casi todas eran compounders que ya cotizaban caros. Caen por tres filtros, y muchas por más de uno:

| Filtro que falla | Cuántas | Cuáles |
|---|---|---|
| Valor intrínseco más de un 15 % bajo el precio (el DCF, con el bono de EE. UU. al 5,2 %, no justifica los múltiplos de los compounders) | 19 de 32 | MSCI, Cintas, Waste Connections, Belimo, Lotus, Diploma, Epiroc, Sartorius, Novonesis, IDEXX, ResMed, Tyler, Graco, CPKC, Daikin, Colgate, AMETEK, Alfa Laval, Sandvik |
| Calidad: ROIC − WACC < 5, casi siempre por el fondo de comercio de las compras | 14 | LSEG, Roper, Euronext, Novonesis, Sartorius, Symrise, Diploma, Tyler, CPKC, AMETEK, Interpump, Stryker, Daikin, Sandvik |
| FRÁGIL: la v3 da Comprar pero la v2 no lo confirma (toda la subida es vuelta del PER) | 8 | Lindt, LSEG, Roper, Marsh, Beiersdorf, Interpump, Sonova, Demant |
| No cabe en la cartera (una acción supera el 7 %) | 3 | Lindt (≈8.400 EUR), Lotus (≈12.800 EUR), Daikin (lote de 100 ≈12.160 EUR) |

**Conclusión:** el fallo estaba en cómo se escogían las candidatas, no en el método. Las dos que pasan (Aon, Hershey) son las únicas que cumplían de entrada lo que pide el método: calidad sin depender del fondo de comercio, PER claramente por debajo de su media y un precio que pide menos crecimiento del que han dado.

## 2. Cómo se han filtrado ahora

**Escáner** (`herramientas/escaner.mjs`, perfil nuevo `calidad-a-precio` en `escaner/perfiles.json`; Excel `escaneos/escaneo-2026-10-14-octava-hora.xlsx`). Pide justo lo que hizo caer a las 30:
- ROIC − WACC ≥ 5 (aproximado de Yahoo, con fondo de comercio).
- **Margen de seguridad ≥ 1 punto**: el precio pide menos crecimiento del que han dado. Es la versión rápida del valor intrínseco, que fue el filtro que más mató.
- PER adelantado ≤ 24, FCF yield ≥ 4 %, deuda neta ≤ 2x EBITDA, margen estable (rango ≤ 10 puntos) y ventas creciendo ≥ 3 %.
- Sin juego, comercio minorista ni materias primas. Se han quitado a mano las ya analizadas, el retail que se coló (Jerónimo Martins, Europris, Puuilo, Hugo Boss, Pandora) y la construcción cíclica.

Embudo: 3.336 empresas en el buscador → 2.156 con capitalización > 1.000 M USD y liquidez → **149 cumplen** (42 Europa, 56 América, 51 Asia-Pacífico). Asia-Pacífico se descarta casi entera: es consumo chino y automóvil.

**Foros y cartas de gestores** (búsqueda web; Reddit, Seeking Alpha y Value Investors Club no se dejan leer sin cuenta, así que pesan más las cartas y los 13F). El tema que más se repite es el castigo de 2026 a datos y software por miedo a la IA. Dodge & Cox, Vulcan, Akre, Fundsmith y Morningstar lo citan como oportunidad. Cada idea de foro se ha pasado por las métricas del escáner (`--simbolos`):
- **Pasan:** Broadridge, Jack Henry, FactSet, Sage y MSA Safety.
- **Fallan:**
  - TransUnion, Brown & Brown y Gallagher: calidad, por el fondo de comercio.
  - Clorox: deuda de 4,2x.
  - Legrand y Thomson Reuters: ROIC − WACC < 5 y caras.

## 3. Lista propuesta de la 8.ª hora (16, de 4 en 4)

Ninguna tiene informe en `informes/` ni en `informes-growth/`. Las cifras son del escáner (Yahoo), así que se comprueban en el análisis. El riesgo de IA va en cada una.

| Tanda | Empresa | Ticker | De dónde sale | Por qué (cifras del escáner) | Riesgo que más pesa |
|---|---|---|---|---|---|
| 1 | Broadridge | BR | Foros (GuruFocus, Morningstar) + escáner | PER adel. 14,5x frente a ~25x de media; ROIC − WACC +7,6; FCF 6,5 %; −29 % desde máximos | IA y desintermediación en comunicaciones al inversor |
| 1 | Jack Henry | JKHY | Carta de Riverwater 1T-26 + escáner | 19,6x frente a 29-48x en 2016-25; ROIC − WACC +14,4; sin deuda; margen muy estable | Bancos regionales que se fusionan |
| 1 | FactSet | FDS | Barchart, Montgomery + escáner | 13,4x frente a ~27x; ROIC − WACC +9,7; FCF 6,9 %; precio que pide un 1 % de crecimiento | El más expuesto a la IA (Redburn: «riesgo terminal») |
| 1 | Sage Group | SGE.L | Fundsmith la compró en el 1S-26 + escáner | −35 % en un año; ROIC − WACC +5,4; FCF 5 %; ventas +9 % | IA en la contabilidad de pymes |
| 2 | Burckhardt Compression | BCHN.SW | Escáner | 16,8x; ROIC − WACC +27; caja neta; FCF 7,7 %; margen de seguridad 13 pp | Ciclo del GNL y de los compresores para buques |
| 2 | Thales | HO.PA | Escáner | 18,1x; ROIC − WACC +10,7; FCF 8,5 %; −18 % desde máximos | Defensa ya cara en el sector; contratos públicos |
| 2 | DO & CO | DOC.VI | Escáner | 15x; ROIC − WACC +15; ventas +20 % al año; sin deuda | Concentración en aerolíneas (Turkish) y eventos |
| 2 | Rai Way | RWAY.MI | Escáner | 12,4x; FCF 9,9 %; ROIC − WACC +25; −33 % | Cliente único (RAI) y poco crecimiento |
| 3 | Gentex | GNTX | Escáner | 9,5x; FCF 11,3 %; caja neta; ROIC − WACC +8,9 | Ciclo del automóvil y aranceles |
| 3 | Autodesk | ADSK | Escáner | 16,3x; −28 %; ROIC − WACC +14,5; ventas +13 % | IA en el diseño; pagos en acciones |
| 3 | Cencora | COR | Escáner | 17x; ROIC − WACC +26; margen estable (rango 0,2 pp) | Precios de fármacos y litigios de opioides |
| 3 | Paycom | PAYC | Escáner | 17,1x; caja neta; ROIC − WACC +19,8; ventas +14 % | Competencia y la IA en nóminas |
| 4 | MSA Safety | MSA | 13F de Giverny (2T-26) + escáner | 18,3x; ROIC − WACC +7,1; deuda neta 0,8x; 56 años subiendo el dividendo | Litigios heredados; compra de Autronica |
| 4 | Rollins | ROL | Carta de Polen 1T-26 + escáner | ROIC − WACC +22; caída fuerte desde máximos (dato por comprobar); margen de seguridad 8,5 | Sigue a 25x: puede fallar por valor intrínseco |
| 4 | Diagnostyka | DIA.WA | Escáner | 15,7x; ROIC − WACC +17; ventas +19 %; −24 % | Polonia; sanidad pública como cliente |
| 4 | Qualys | QLYS | Escáner | 22,4x; ROIC − WACC +29,5; caja neta | Competencia en ciberseguridad; la IA |

Reservas: Interparfums, Tetra Tech, Cardinal Health, Brown & Brown (si la calidad sin fondo de comercio se acepta como en Aon) y TransUnion.

Todas cuestan menos de 1.000 EUR por acción. Lo más caro: Burckhardt ≈600 CHF y Thales ≈250 EUR.

## 4. Fuentes de foros y cartas

- Vulcan Value Partners 1T-26 (TransUnion): https://finance.yahoo.com/news/transunion-tru-vulcan-value-partners-134704086.html
- Morningstar, 3-abr-26, foso amplio infravalorado: https://global.morningstar.com/en-gb/stocks/10-wide-moat-us-stocks-trading-attractive-discounts-their-fair-values
- GuruFocus, 2-jun-26 (Broadridge): https://www.gurufocus.com/news/8897273
- Riverwater, carta del 1T-26 (Jack Henry): https://finance.yahoo.com/markets/stocks/articles/jack-henry-associates-jkhy-high-145507964.html
- FactSet: Barchart https://www.barchart.com/story/news/425737/down-30-in-2026-should-you-buy-the-ai-dip-in-factset-stock ; Montgomery https://rogermontgomery.com/the-great-ai-reckoning-when-innovation-becomes-disruption/
- Fundsmith 1S-26 (Sage, Legrand), Trustnet 8-jul-26: https://www.trustnet.com/news/13479995/the-12-stocks-fundsmith-equity-bought-in-h1-2026-as-turnover-hits-a-high
- Giverny Capital 13F 2T-26 (MSA): https://www.insiderset.com/investor/francois-rochon-giverny-capital/activity/q2-2026
- Polen 1T-26 (Rollins): https://finance.yahoo.com/markets/stocks/articles/makes-rollins-rol-attractive-investment-124937703.html
