# Diario · Booking Holdings (BKNG) · 18-nov-2026

- Commit de partida: 254cbac («Nvidia 18-nov: análisis value tras los resultados del 3T FY27»). Tanda de 10 informes del 18-nov (encargo común del coordinador; sin subagentes: fases A-E hechas por mí).
- Motivo: publicó el 3T26 el 3-nov tras el cierre (guía del 4T floja; el escáner aplicó una revisión rápida ×0,98) y estaba a −2,8 % de su límite B (150,15 USD). Iteración nueva sobre `informes/booking-2026-11-02/` (hecho antes de los resultados).
- Fecha de corte: 2026-11-18. Precio = cierre del martes 17-nov, 154,46 USD (la sesión del 18-nov no había cerrado; bolsa.mjs y movimiento.mjs). Divisa USD, cierre en diciembre, US GAAP.
- **Desdoblamiento**: 25 por 1 efectivo el 2-abr-2026. Mismo criterio que el informe anterior, comprobado: precios de cierre de Yahoo ya divididos entre 25 (2025: 214,21 USD; 30-oct: 148,13) y BPA ajustados antiguos entre 25 (2025: 228,06/25 = 9,12). Acciones de la portada del 10-Q del 3T26 (743,70 M, 26-oct) ya posteriores al desdoblamiento.

## Tiempos (hora de Madrid; el reloj del contenedor va en UTC)
- 12:21 lectura del encargo, `analiza-empresa.md`, `prompt.md` entero, `lecciones.md`, EE. UU. de `lecciones-paises.md`, `lecciones-casos.md` (grep) y METODO-VIGENTE §1-§4.
- 12:22 `cuentas.mjs --sec BKNG` (XBRL de la SEC, 10 ejercicios hasta 2025: sin 10-K nuevo, las series anuales no cambian); `bolsa.mjs` (cierre 17-nov); `movimiento.mjs BKNG` (1 m −5,0 %, 3 m −27,5 %, 12 m −23,5 %, tendencia bajista, sin avisos P); `noticias.mjs --meses 12 --valores BKNG` (la clave `booking` no devuelve nada: usa el ticker).
- 12:23 EDGAR: 10-Q del 3T26, nota de prensa del 3-nov (8-K 2.02), 8-K del 13-nov (bonos en euros), Form 4 (`form4.mjs` desde el 18-nov-2025).
- 12:24 transcripción corregida de la conferencia del 3T26 (PDF de la web de inversores; Earnings Whispers pide JavaScript), leída entera.
- 12:25 Yahoo quoteSummary de BKNG y de los 7 comparables (18-nov), earningsHistory (3T26: 4,66 frente a 4,50), Stock Analysis (13-nov), MarketScreener (página vieja del 23-oct), Tesoro (5,10 % el 17-nov), BCE (17-nov), Damodaran (ERP de noviembre 4,41 %); noticias del 2 al 17-nov (StockStory, TIKR, Skift) y foros (Stocktwits, RSS de Seeking Alpha).
- 12:28 notas A, C, D y E actualizadas con `notas/actualizacion-notas.mjs` sobre la copia de las del 2-nov (B sin cambios: sector y competencia); supuestos, propio, textos y resumen reescritos.
- 12:31 integrar.mjs + calcular-empresa.mjs: 20 de 21 controles y 1 explicado (v2 de control en Mantener: compra B).
- 12:34 Word (59 páginas, 27 gráficos, cobertura 90,3 %) y PDF con soffice; revisadas portada, síntesis y «La decisión». Síntesis recortada a 645 palabras.
- 12:35 `revision-12m-2026-11-18.md`; `flock … apuntar-12m.mjs booking-2026-11-18 --precios` (Comprar 23,7 % → 23,2 %); `flock … robustez.mjs booking-2026-11-18 --actual`.
- 12:36 `comprobar.mjs`: ningún ERROR de esta carpeta; queda el AVISO C10 (simbolos.json apunta a booking-2026-11-02: lo cambia el coordinador).

## Decisiones
- **FTC**: la empresa rebajó los ingresos del 3T26 en 900 M y provisionó 100 M (acción contra Priceline). Ingresos y EBITDA del informe en la base ajustada (sin ese cargo único); el pago pendiente (1.000 M) va al puente en `otros_ajustes`. LTM sep-26 con ingresos ajustados (29.026 M) y EBITDA publicado + 900.
- **Puente del 30-sep-2026**: deuda 20.061, caja 15.814, inversiones a largo 435; `otros_ajustes` 3.009 = 1.180 (exceso estacional de reservas cobradas por adelantado sobre diciembre) + 1.000 (FTC) + 469 (CNMC provisionada; el informe anterior no la restaba) + ≈ 360 (recompras del 30-sep al 26-oct, estimación). La emisión de 3.550 M EUR del 13-nov no cambia la deuda neta.
- **Acciones**: 743,70 M (26-oct) + 3,0 M de dilución = 746,7 M.
- **Supuestos**: 2026e fijo +8,1 % (9M publicados + guía del 4T) y margen 37,2 %; 2027e +7,0 % (antes 8,0) con margen 37,2 % (antes 37,5); 2028e +7,0 % (antes 7,5) con 37,6 % (antes 38,0); de 2029e en adelante igual que el 2-nov. Amortización del BPA al 1,5 % (depreciación real sin intangibles: 1,56 % en 2025, 1,23 % en 9M26; antes 1,9 %) y resultado financiero −300 M (antes −200: −312 M en 9M26 y bonos nuevos). Cuadres: 2025 9,07 frente a 9,12; 2026e 10,36 frente a 10,42 del consenso.
- **Base del BPA**: ajustado en casos e historia (H1 casa). La empresa no excluye los pagos en acciones.
- WACC 10,08 % (Tesoro 5,10 %, beta ajustada 1,09, peso de la deuda 14,8 %).
- Comparables rehechos con Yahoo del 18-nov (precio del 17-nov, consenso posterior a los resultados salvo MMYT, EDR y TCOM): mediana PER NTM 16,0x (antes 15,6x).
- Regla 13: **no cambia** (resultados ya publicados y recogidos; FTC provisionada; bonos sin dilución; ventas de directivos con 10b5-1; Odessia/OpenAI es el riesgo del bajista, sin cifra nueva). Próximos resultados: febrero de 2027, sin fecha.
- Convicción Media (la sugerida).

## Qué cambió frente al 2-nov y la señal de alarma
- Señal de alarma del informe anterior: «noches por debajo del +3 % en el 3T26 o el 4T26, o guía de 2027 por debajo del +6 %». **3T26: no se cumplió** (noches +6,7 %, por encima de lo alto de la guía). **4T26: a medias, solo en guía** (+1-3 %, contra un 4T25 de +9 %); no hay resultado publicado. La guía de 2027 llega en febrero. Se recoge en el base (2027-28 más bajos), no como alarma cumplida.
- BPA 2028e base 12,59 → 12,40 (−1,5 %; ×0,985, en línea con la revisión rápida ×0,98); precio 148,13 → 154,46; PER actual 12,8x → 13,5x; ponderada 23,7 % → 23,2 %; base 20,9 % → 20,7 %; v2 12,1 % → 11,8 %; valor intrínseco 189,97 → 189,63; DCF 194,60 → 193,40.
- Robustez: sigue frágil y **nivel B**; límites nuevos A 149,15 (antes 143,62) y B 155,93 (antes 150,15); filtro de mantener 173,02 (antes 166,60). Los límites suben porque el objetivo sube con el PER actual (elasticidad 0,75, aviso M6) y hay 6,7 M de acciones menos.

## Resultado
- **Línea 12 m**: ponderada 188,62 USD → **+23,2 %**; base 184,76 → **+20,7 %**; bajista 126,14, alcista 258,80. v2 de control 11,8 % (Mantener; 11,9 % en robustez). **Comprar**, convicción media. Valor intrínseco 189,63 (+22,8 %); DCF 193,40 (WACC 10,08 %); DCF inverso 2,7 % frente a 5,8 %. Sostenibilidad Sí.
- Robustez (`--actual`, 154,46 del 17-nov): FRÁGIL; si la tienes: Mantener; acción robusta: No comprar (no es compra robusta A); **nivel B hoy** (154,46 ≤ 155,93); colchón de BPA 7 % para Comprar y 11 % para mantener.

## Lecciones
- `noticias.mjs --valores <clave>` no encuentra Booking con la clave de carpeta (`booking`): hay que pasar el ticker (`BKNG`).
- Cargos regulatorios que la empresa registra como **rebaja de ingresos** (FTC de Booking, 900 M): usar los ingresos ajustados en LTM, trimestres y DCF y llevar el pago pendiente al puente; si no, el crecimiento y el margen del LTM salen falseados.
