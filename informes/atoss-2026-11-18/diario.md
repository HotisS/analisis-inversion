# Diario — ATOSS Software SE (AOF.DE), corte 2026-11-18

- Commit de partida: 254cbac (Nvidia 18-nov: análisis value tras los resultados del 3T FY27). Tanda de 10 informes en paralelo; sin git.
- Motivo: precio a −2,8 % del límite A (80,89 EUR) y resultados de nueve meses publicados el 23-oct-2026, después del informe del 11-oct.

## Pasos (hora de Madrid)
- 12:21 Lectura del encargo, del procedimiento, del prompt, de lecciones (núcleo, Alemania/UE, «software, nube y nóminas») y de METODO-VIGENTE §2 y §4 (reglas 13 y 16). Sin subagentes: fases A-E hechas por mí.
- Carpeta nueva con las notas A-E del 11-oct como punto de partida; actualizado dato a dato lo que cambia (script en /tmp/claude-0/tanda-atoss/scr/actualizar.py).
- Cuentas: `cuentas.mjs --esef "ATOSS Software"` y con el LEI (529900Q9G9280ADNOA39): filings.xbrl.org no tiene a ATOSS (lección de Alemania). Las series anuales 2016-2025 siguen siendo las del informe anual 2025 (sin cambios: no hay cuentas anuales nuevas).
- Resultados leídos: Quarterly statement Q3 2026 (23-oct-2026, PDF de la empresa) y nota de NuWays del 29-oct (conferencia); prensa dpa-AFX del 23-oct, Berenberg 26-oct, LYNX 27-oct.
- Precio: `bolsa.mjs` → cierre del 17-nov-2026, 82,90 EUR (la sesión del 18-nov no había cerrado; `movimiento.mjs` da 83,80 intradía). `noticias.mjs --meses 12 --valores AOF`: el 3T y la caída del 17-nov.
- Consenso: Yahoo quoteSummary (18-nov): BPA 2026e 3,40 y 2027e 3,82, ventas 211,2 y 237,7 M, 9 analistas, objetivo 120,33 (96-153). MarketScreener sigue en el 16-oct (antes del 3T): se usa solo para EBITDA/EBIT/DPA y 2028e, y se dice.
- Comparables rehechos con Yahoo a 18-nov (no llevados al precio): EBITDA contable, BPA ajustado del consenso; EV/EBITDA NTM a margen constante (estimación propia). Mediana EV/EBITDA NTM 16,6x, PER 19,3x.
- Bund 3,42 % (Bundesbank, 17-nov); ERP de Damodaran de noviembre 4,41 %; BCE 17-nov.
- Puente a 30-sep: liquidez 158,9 M (neta de préstamos), arrendamientos 5,5 M (1S26), pensiones 0,7, minoritarios −0,1 y **otros ajustes 8,6 M**: el DCF suma el 12 % del FCFF de 2026e (≈ 6,1 M) cuando el 4T suele consumir caja (4T25: −2,5 M de liquidez).
- Supuestos: 2026e 11,4 % / 39,3 % fijo (guía del 23-oct); 2027e 11,5 % / 39,0 % (parte baja de la guía, margen 36-37 % del CFO); 2028e 11 % / 39,5 %; techo de margen EBITDA 40,5 % desde 2030e (antes 39,5 % desde 2031e). WACC 9,70 % (antes 9,81 %).
- 12:34 Primer Word y PDF. Faltaba `riesgos.ia` (aviso de riesgos < 60 %): añadido. Sentimiento: el foro de finanzen.ch no abre (dos intentos); añadido un artículo de aktienwelt360 del 28-oct.
- Síntesis recortada de 814 a 642 palabras. Controles 20 de 20. Cobertura 89,9 % (capital < 60 %, sin adquisiciones). PDF de 57 páginas.
- 12:35 `apuntar-12m.mjs --precios` y `robustez.mjs --actual` (con flock). `comprobar.mjs`: ningún ERROR de esta carpeta; aviso C10 de simbolos.json (AOF apunta a la carpeta vieja; lo cambia el coordinador).

## Resultado
- DCF 81,25 EUR (antes 80,58); escenarios 55,24 / 81,25 / 97,59; valor intrínseco (síntesis) **82,29 EUR** (antes 80,89), −0,7 % frente a 82,90. Con la prima del mercado: 93,50.
- DCF inverso: 8,5 % de crecimiento 2027e-2035e frente al 8,1 % base; rentabilidad implícita 9,5 %.
- Objetivo a 12 meses v3: 106,18 EUR, ponderada +30,8 %, base +26,2 % (a 82,90); v2 de control +18,9 % / +15,0 %. Señal **Mantener**: el valor intrínseco queda por debajo del precio.
- Sostenibilidad: Sí. ROIC 553,7 % frente a WACC 9,70 %.
- Robustez (83,80 intradía): SÓLIDA; si la tienes, Mantener; compra robusta no; nivel hoy ninguno; límites A 82,29 y B 82,28; filtro de mantener 96,81; colchón BPA mantener 16 %.
- Regla 13 (`bolsa.contexto`): no cambia. Movimientos: rebote jun-ago (+41 %), sep (−21 %, sin noticia propia), 23-oct (−9 %, ventas en la parte baja), 17-nov (−5,4 %, todo el software europeo). Noticias: reordenación de la familia Obereder (3-4 nov; venta neta fuera de mercado de ≈ 0,8 % del capital a 93,70, por encima del precio), salida de Klaus Bauer del Aufsichtsrat.

## Qué cambió frente al informe del 11-oct
- Margen: guía EBIT 2026 de ≥ 34 % a ≈ 37 %; subimos el margen EBITDA 1,5-1,8 puntos en 2026e-2027e y el techo a 40,5 %.
- Ventas: parte baja de la guía en 2026 y (según el CFO) en 2027; crecimiento de 2026e-2028e 0,5-1 punto menor; licencias −39 %.
- Caja: 158,9 M a sep (121,3 M a jun). Bund 3,53 → 3,42 %. ERP 4,20 → 4,41 %.
- Comparables: rehechos con Yahoo (EBITDA contable en vez del ajustado de MarketScreener): la mediana EV/EBITDA NTM sube de 12,4x a 16,6x y el PER baja de 24,6x a 19,3x.
- Historia del PER adelantada: entra 2025 (33,9x); mediana 37,6x → 36,5x; media larga 42,6x → 43,5x.
- **Señal de alarma anterior** (comprar por debajo de 80,89): **no se cumplió**; el cierre más bajo desde el 11-oct fue 82,90 (17-nov). El límite A sube a 82,29: hoy el precio está un 0,7 % (cierre) y un 1,8 % (intradía 83,80) por encima.

## Lecciones
- Comunicado trimestral sin balance (ATOSS 3T): el puente toma la liquidez publicada y los demás pasivos del último semestral; si el trimestre siguiente consume caja estacionalmente (4T con facturación anual en enero), restar en `otros_ajustes` la diferencia entre la fracción de FCFF del año que suma el DCF y la variación de caja típica de ese trimestre.
- Comparables con Yahoo quoteSummary: el EBITDA es contable (con pagos en acciones) y el BPA del consenso, ajustado; el EV/EBITDA y el PER de los comparables quedan en bases distintas (Workday 24,6x frente a 14,3x). Decirlo y no pesar el PER de comparables en software de EE. UU.
