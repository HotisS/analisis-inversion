# Histórico de cambios importantes

**No se lee en las sesiones normales** (análisis, cola, cartera del día). Solo cuando el usuario pide revisar cambios históricos o hace falta saber por qué se decidió algo. Lo vigente está en `MEMORIA.md`, `cola.md` y `verticales/`.

**Qué se apunta aquí** (una entrada por cambio, la más reciente arriba, dos o tres líneas): cambios de método o de reglas, decisiones de cartera que sustituyen a otras, cambios de estructura del repo o del flujo de trabajo, y lo que se retira de `MEMORIA.md`, `cola.md` o `lecciones.md` cuando ya no está vigente. No se apuntan análisis sueltos (están en `seguimiento.xlsx` y en cada `diario.md`).

## 16-oct-2026 · 21 índices y salidas a bolsa

Pedido del usuario: revisar los grandes índices occidentales y asiáticos y el calendario de salidas a bolsa, todo enlazado. `indices.mjs` pasa de 11 a 21 índices (TSX 60, MSCI EM, Hang Seng, CSI 300, MSCI Korea, KOSPI 200, MSCI Taiwan, Nifty 50, ASX 200, Straits Times) y `salidas-bolsa.mjs` sigue salidas a bolsa y escisiones (EE. UU., HK, Japón, Euronext); ambos alimentan los huecos de `cobertura.mjs`. Siete análisis completos (Accton, Sungrow, Midea, FedEx Freight, Honeywell Aerospace, Fortune Electric, Asia Vital): ninguno en compra robusta.

## 16-oct-2026 · Cobertura única y escáner de grandes índices

Pedido del usuario: que no se escape ninguna empresa con calidad y vigilar las entradas y salidas de los grandes índices. `herramientas/cobertura.mjs` hace el inventario único (`escaner/cobertura.json`): toda empresa con calidad queda enlazada con calendario de resultados, noticias, expediente, escáner y Excel; caduca a los 6 meses y avisa de resultados publicados que el análisis no recoge (`escaner/revisiones.json`). `herramientas/indices.mjs` guarda los componentes de 11 índices (altas, bajas y huecos con filtro previo de calidad). La vigilancia de las 9:25 revisa hasta 8 empresas de seguimiento por pasada y el semanal del domingo pone fechas e índices al día. Primeros cinco análisis salidos de los huecos (GTT, TMX, HKEX, Recordati, Accelleron): ninguno en compra robusta.

## 15-oct-2026 · Noticias → leads → candidatas (rastreador de noticias)

Pedido del usuario: un rastreador de noticias inspirado en su radar-prensa que no tenga que leer y que dé leads de oportunidades. `noticias.mjs` guarda expedientes por empresa y por sector (carpeta privada), `leads.mjs` saca leads con reglas explícitas, cada lead pasa el Vup y la robustez y solo llega al usuario lo que acaba en compra robusta con calidad. `noticias-modelo.mjs` prepara el aprendizaje automático con validación preregistrada en vivo (no decide nada antes de mediados de enero de 2027). Procedimiento en `escaner/README.md`.

## 15-oct-2026 · Órdenes de la cartera 1: la tabla de las 14:50 queda superada

La tabla cerrada de las 14:50 se ejecutó en parte (detalle y cifras en la carpeta privada de la cartera, `cartera/archivo/ordenes-1450-2026-10-15.md`, nunca en el repo). Lo vigente es el estado de las 17:45 (`cartera/cartera-1-2026-10-15-1745.md`): el usuario pospone las ventas pendientes y la cuenta 2 queda sin órdenes. `cartera-real.mjs --importar-ibkr` conserva desde hoy lo apuntado con fecha posterior al Flex (2129d5a).

## 15-oct-2026 · Auditoría de homogeneidad (método, decisiones y salida)

Pregunta de Hotis: ¿son homogéneos análisis, Excel y cartera? Arreglos que solo aplican reglas vigentes: el escáner diario ya no da señal de venta antes de la fecha de la regla 12 (`mantener_hasta` en `escaner/reglas.json` y `no_tocar_hasta` de la cartera privada; Intuit, Uber y Viscofan hasta el 13-ene, Netflix hasta el 20-nov, compras del 15-oct hasta el 15-ene); AppLovin y Robinhood en exclusiones; el Excel ya no propone «dos tramos», lee las cuatro cifras de la última foto `cartera-1-…md` y no imprime «NaN» en las órdenes límite; método growth y plantilla sin tramos; `MEMORIA.md` sustituye la cartera del 14-oct 17:40 (tramos, Bureau Veritas, Viscofan +5, Axon, Shopify y Snowflake) por la del 15-oct.

## 15-oct-2026 · Megatendencias: foco energía, electricidad y frío (31 análisis nuevos)

Hotis pidió analizar las 10 candidatas del screening y poner el foco en energía, electricidad y frío industrial. Universo ampliado a 62 sectores (generadoras, climatización y frío, refrigeración de centros de datos, refino, petroleras europeas, oleoductos); 28 informes value y 3 growth. Ninguna compra robusta hoy; con límite: Lennox ≤336,68 USD y Prysmian ≤96,52 EUR. Revisión trimestral programada (2-ene, 2-abr, 2-jul, 2-oct, 10:10 Madrid). Entrega: /mnt/project-files/estrategia/megatendencias/analisis-megatendencias-y-focos-2026-10-15.md.

## 15-oct-2026 · Screening de megatendencias (nuevo, carpeta `megatendencias/`)

Petición de Hotis: detectar megatendencias y los sectores con exposición indirecta. 56 sectores y 16 megatendencias (atención en Wikipedia + momento frente a IWDA en euros); 10 versiones, vigente la v10 (momento + fuerza de la megatendencia, máximo 2 sectores por megatendencia). Diseño 2016-2021 +8,5 puntos a 12 m; validación 2022-2026 +7,9. Hoy: ciberseguridad, nube, maquinaria de chips, semiconductores, biotecnología. Los candidatos son propuestas para analizar, no señales. Método en `megatendencias/README.md`.

## 15-oct-2026 · Precio y noticias antes de decidir (regla 13) y tres sesgos conservadores

El usuario pide que el repaso del movimiento del precio y de las noticias sea parte del método y de la selección de compras (caso Rai Way, −33 % en 6 meses con el overhang del 15 % de RAI avisado en el informe pero sin veredicto). Regla 13 de `METODO-VIGENTE.md`: bloque `bolsa.contexto` (value) y `contexto_mercado` (growth) con movimiento (`herramientas/movimiento.mjs`), movimientos fuertes con causa, noticias y veredicto no cambia / retrasa / descarta; `robustez.mjs` C1-C3 y P1-P5, `robustez-growth.mjs` G10-G11, comprobación previa a cada orden. Backtests preregistrados: ninguna regla numérica de movimiento mejora las compras (no se adoptan); S1 (tope ×1,1 en v2 desrateadas) pasa pero con 8 cierres y cambiaría 22 de 33 señales: se reprueba con ≥ 30; B2 (media recompra en recompradores en serie) candidata para el domingo. Sin tramos en growth (G5, G6, G9).

## 15-oct-2026 · Novena hora value

16 análisis (Universal Music, Check Point, Booz Allen, Unicharm, Compass, Borregaard, SFS, Interparfums SA, ADP, Chemed, Brady, Lockheed Martin, OMA, Sweco, Neurocrine, Tetra Tech), con el escáner sin cambios y cartas de gestores. Compra robusta: Universal Music (≤15,51 EUR, en dos partes por resultados del 29-oct): 1 de 16. Caen 10 por valor intrínseco y 4 por calidad o sostenibilidad. Corregida la sanción de la SEC atribuida por error a Qualys. Detalle en `informes/novena-hora-2026-10-15/`.

## 15-oct-2026 · Octava hora value: primera elegida con el escáner

16 análisis (Broadridge, Jack Henry, FactSet, Sage, Burckhardt, Thales, DO & CO, Rai Way, Gentex, Autodesk, Cencora, Paycom, MSA Safety, Rollins, Diagnostyka, Qualys). Compras robustas: Rai Way (≤4,22 EUR) y Burckhardt (≤482,60 CHF, tras el 3-nov): 2 de 16 frente a 2 de 32 en la 6.ª y 7.ª. Ninguna cae por calidad (antes 14); 7 caen por valor intrínseco (antes 19). Escáner: tasa libre y prima alineadas con el DCF (6565ad3). Detalle en `informes/octava-hora-2026-10-15/`.

## 14-oct-2026 · Séptima hora value cerrada y octava propuesta con escáner

16 análisis (Sonova, IDEXX, ResMed, Tyler, Aon, CPKC, Alfa Laval, AMETEK, Beiersdorf, Colgate, Hershey, Interpump, Stryker, Sandvik, Daikin, Graco). Compras robustas: Aon (ya en la tabla del 15-oct) y Hershey (justa, ≤164,49 USD). Diagnóstico de las 32 de la 6.ª y 7.ª hora: se escogían por calidad sin mirar el precio; 19 caen por valor intrínseco, 14 por calidad (fondo de comercio) y 8 son frágiles. Desde ahora la lista value sale del escáner (perfil nuevo `calidad-a-precio`: margen de seguridad ≥ 1, ROIC − WACC ≥ 5) y de cartas de gestores. Detalle en `informes/septima-hora-2026-10-14/`.

## Archivos de detalle (en esta carpeta)

- **14-oct-2026 (21:50), privacidad:** los datos reales de la cartera (títulos, precio medio, liquidez, cuentas, ganancias) salen del repo público a `/mnt/project-files/cartera/` (`real/escaner-cartera.json`, tabla de órdenes, carteras antiguas, riesgo, liquidez ETF, defensas y los archivos de memoria y cola antiguos en `historico-repo/`). Los informes growth ya no citan importes de la cuenta. Sin reescribir el historial de git.
- `memoria-decisiones-hasta-2026-10-14.md`: `MEMORIA.md` completa tal como estaba el 14-oct, con todas las decisiones del 10 al 14-oct (versiones 3-9 de la cartera y sus motivos).
- `cola-hasta-2026-10-13.md`: las colas del 10 al 13-oct con el estado y la señal de cada empresa.

## Cambios

- **14-oct-2026, noche — Excel de seguimiento simplificado** (pedido del usuario: «hay un montón de métricas de rentabilidad, confunde»). `seguimiento.xlsx` pasa a «Resumen» (una fila por empresa, value y growth, una sola rentabilidad: la del método vigente; la prudente; «Qué hacer según el método» con los filtros de §4 y los límites robustos de `robustez.mjs`), «Cómo leerlo» y «Detalle» (todas las cifras antiguas: DCF, prima del mercado, v2, v3 sin selector, criterios ✓ = ✗). Versión privada con la cartera real en `/mnt/project-files/cartera/real/seguimiento-mi-cartera.xlsx`.

- **14-oct-2026, 18:40 UTC: sexta hora value cerrada** (16 análisis: MSCI, LSEG, Euronext, Marsh, Cintas, Waste Connections, Roper, Diploma, Novonesis, Symrise, Lindt, Demant, Belimo, Epiroc, Sartorius Stedim, Lotus Bakeries; 9 fichas sectoriales nuevas). Ninguna compra robusta; Marsh propuesta para la lista de espera (≤ 174,29 USD tras resultados). 32 puntos de método en `informes/sexta-hora-2026-10-14/puntos-metodo.md`. Séptima hora propuesta en `cola.md`.

- **14-oct-2026 · Escáner diario de señales** (pedido del usuario): `herramientas/escaner-diario.mjs` + `escaner/` (cartera, reglas, registro y seguimiento de señales frente al índice). Tarea programada L-V 9:30 y 15:45 de Madrid. `robustez.mjs` gana `--actual` y `--bpa-factor`; `robustez-growth.mjs`, `--json`.

- **14-oct-2026 (noche): selector de método value.** Pedido del usuario («aplicar una valoración u otra, diséñalo y backtestea»). Reglas fijadas antes (a8cc7a0): desrateada (mediana adelantada ≥ 1,8 × actual) → v2; historia adelantada ≤ 3 años → la más baja de v3 y v2; resto v3 ×1,1. Backtest en validación: mismo error (20,0 %), Comprar algo mejores (+44,3 % frente a +42,9 %; pérdidas 9 % frente a 11 %); se adopta con límites (7 cierres desrateados; historia corta mixta). `motor/objetivo12m.mjs` lo aplica por defecto (`selector: false` = anterior); `robustez.mjs` pasa al objetivo fijo. Cambian 12 señales (Edenred, Adobe, Equifax, Grifols, Novo, Fielmann, Coloplast, Cooper, Uber, ANYCOLOR y Bureau Veritas a Mantener; Roche a Vender).
- **14-oct-2026 (tarde, 3).** `METODO-VIGENTE.md` en la raíz: documento vivo con las versiones en vigor (value v3 tope ×1,1, growth v9), las reglas exactas, los filtros y el registro fechado de descubrimientos (pedido del usuario). `apuntar-12m.mjs` deja el objetivo fijo con precio nuevo (antes escalaba el PER actual y el objetivo subía con la cotización; fallo visto en Nu). `herramientas/regenerar.mjs` rehace Word y PDF de los informes con el motor vigente; los 147 informes value regenerados con la cifra v2 y la del tope ×1,3 al lado (`comparacion_txt`), y 24 de ellos otra vez con la historia del BPA normalizada (años con tipo efectivo < 8 % o beneficio neto > EBIT: Uber pasa a v3). Revisiones al cierre del 14-oct con el objetivo fijo: 142 v3, 10 v2, 30 Comprar, 7 Vender. En `MEMORIA.md`, «v3 solo ordena» (16:45) queda sustituido por «decide v3 con tope ×1,1».
- **14-oct-2026 (17:30): pruebas de robustez obligatorias.** El usuario pidió que las decisiones sean defendibles sin que él tenga que encontrar el fallo (Uber, Experian, v3, Edenred, Nu, Constellation). `herramientas/robustez.mjs` (value) y `robustez-growth.mjs` recalculan cada informe con variantes razonables, marcan los fallos de datos y de regla y dan la «acción robusta». Paso obligatorio de `/analiza-empresa`, `/analiza-growth` y de cada orden. Resultados y defensas en `informes/robustez-2026-10-14/`; método en `verticales/empresa/robustez.md`.

- **14-oct-2026, 17:10: limpieza de MEMORIA y cola** (pedido del usuario). Se retiran de MEMORIA:
  - la regla de múltiplos v2 (base = menor entre el PER actual y la mediana; techo ×1,30), sustituida por v3 ×1,1;
  - las órdenes del 13-oct (`informes/cartera-concentrada-2026-10-13.md`: Nemetschek ≤ 68, Intuit ≤ 300, Auto Trader ≤ 4,95, Wolters Kluwer ≤ 72, ventas con stop) y la «versión 9» de la cartera;
  - la cancelación de WK, Auto Trader, Deutsche Börse y Constellation, ya hecha;
  - la nota del universo de 73 empresas.

  De la cola salen la nota de precios sin cierre del 13-oct (todo recalculado al cierre del 14-oct) y los suplentes ya analizados. Rehecha a las 17:05 con v3 ×1,1: entra ANYCOLOR, y DSV y Coloplast salen por calidad.

- **14-oct-2026 (tarde, 2).** El tope del base de la regla v3 pasa de ×1,3 a ×1,1 (`REGLA_12M.v3.topeBase`): con ×1,3, 48 informes estaban en el tope y la cartera daba +30 %; el backtest en las desrateadas (mediana ≥ 1,5 × actual) daba sesgo +21 % con ×1,3 y +2,6 % con ×1,1 (fuera de muestra), sin perder en el conjunto. Doce variantes probadas (ventana 10 años, sin 2020-21, percentiles, reversión 0,25, topes): ninguna otra arregla las desrateadas. Las 144 revisiones se recalcularon; `v3_tope_anterior` guarda la cifra con ×1,3. Uber vuelve a v2 (BPA publicado con liberaciones fiscales). Detalle en `verticales/empresa/objetivo-12m.md`.

- **14-oct-2026, 16:45: cartera revisada con la migración v3; v2 decide y v3 ordena.** Tabla `informes/ordenes-2026-10-15.md`. Sustituye a la propuesta de las 14:50 (`informes/cartera-2026-10-14-15h.md`: Bureau Veritas a ≤ 26,90, LVMH a ≤ 385, Amadeus entre las compras). Ahora Bureau Veritas va a ≤ 27,80 y LVMH a ≤ 392, porque pasan con v2 al cierre; Amadeus va a la lista de espera para que la liquidez no quede negativa. Entra Adyen en la lista. Motivo de usar v2 para decidir: en 48 de 135 informes, el base v3 sale del tope de ×1,3 sobre el PER actual.
- **14-oct-2026: quinta hora value terminada** (16 empresas, todas Mantener; ServiceNow con v2 y el resto con v3). Sexta hora propuesta en `cola.md` para una sesión nueva.

### 14-oct-2026
- **Los 132 informes value pasan a la regla v3** sin rehacerlos (`herramientas/historia-adelantada.mjs`, `datos-vN.json` por informe con la historia v2 guardada al lado; el Word no cambia) y todas las revisiones se recalculan al cierre del 14-oct (`apuntar-12m.mjs --precios --todos`, con la cifra v2 al lado y marca `revisar` si se alejan más de 15 puntos). Se añade el **tope del base** (×1,3 / ÷1,3 sobre el PER actual) a la regla v3 tras ver que sin él las muy castigadas (Adobe, Intuit) salían con +100 %; el backtest con tope da el mismo sesgo y menos error. Diez informes se quedan en v2 (historia corta o BPA propio en otra base).
- **Datos primarios y un solo precio** (mejoras del 14-oct, decisión del usuario de abrir la red de la nube): `herramientas/cuentas.mjs` saca cuenta, balance y flujos del XBRL del regulador (SEC companyfacts para EE. UU. y 20-F; repositorio ESEF de XBRL International para UE y Reino Unido, desde 2020) a `notas/cuentas-xbrl.json`, para comprobar en vez de buscar. `herramientas/precios.mjs` deja el último cierre de todas las analizadas (`verticales/empresa/precios.json`, mapa en `simbolos.json`) y `apuntar-12m.mjs --precios --todos` recalcula las revisiones al mismo cierre; el motor controla que el precio del informe no tenga más de dos sesiones. Triaje previo descartado por el usuario («se comerá buenas»).
- **Regla de múltiplos v3 del objetivo a 12 meses** (`motor/objetivo12m.mjs`, `verticales/empresa/objetivo-12m.md`), tras el backtest con los datos del repo (`motor/backtest-multiplos.mjs`, resultados en `verticales/empresa/backtest/`): la historia del PER pasa a la misma base que el actual (adelantada) y el base va a mitad de camino hacia la mediana. Solo para informes nuevos (`per_historico.base: "adelantado"`); los 131 anteriores siguen en v2. Pesos 15/70/15 probados y descartados. **Confianza baja = no Comprar** aplicado por el motor. Vertical sector reducida a una ficha corta reutilizable (`verticales/sector/ficha.md`).
- **Cartera de las 14:50** (`informes/cartera-2026-10-14-15h.md`) sustituye a la de las 13:45: entra Bureau Veritas (pasa los tres requisitos). 16 análisis value de la cuarta hora; suplente nuevo Unilever. Desde las 14:22 estos análisis se llaman «value» (hay una vertical growth aparte).
- **Cartera de las 13:45** (`informes/cartera-2026-10-14-14h.md`) sustituye a la de las 13:00: Rightmove fuera por decisión del usuario; 16 análisis de la tercera hora, ninguno pasa los requisitos (Sanofi falla calidad). Suplentes nuevos: Deutsche Börse y Amadeus.
- **Cartera de las 13:00** (`informes/cartera-2026-10-14-13h.md`) sustituye a la de las 11:50: entra Rightmove (pasa los tres requisitos al límite). 12 análisis más en la segunda hora.
- **Cartera de la tarde** (`informes/cartera-2026-10-14-tarde.md`) sustituye a la de la mañana: liquidez nueva, Nemetschek 29 y LVMH 5, con suplentes (Experian nueva). 14 análisis nuevos desde la nube, ninguno pasa los tres requisitos al precio de hoy.
- **Repo más ligero** (petición del usuario: se gastaban demasiados tokens por sesión). `cola.md` y `MEMORIA.md` quedan solo con lo pendiente y vigente; lo cerrado, a `archivo/`. `verticales/empresa/lecciones.md` se parte en núcleo + `lecciones-paises.md` + `lecciones-casos.md`; se retiran lecciones obsoletas (fallos de herramientas ya arreglados, elección manual del PER del bajista y del alcista). Regla de mantenimiento en `CLAUDE.md` y este histórico.
- **Cartera propuesta con la regla común** (`informes/cartera-2026-10-14.md`): vender Zoetis, Puig, Hermès, ICE, Equifax e IBKR; comprar Nemetschek y LVMH; cancelar Wolters Kluwer y Auto Trader. Con la regla común, la cartera del 13-oct rendía +9,4 % y no +15,5 %. Pendiente de que el usuario la acepte.
- Explicación del día para el usuario (método, tres fotos de la cartera y por qué no entran Wolters Kluwer, Auto Trader y Group 1): `informes/cambios-2026-10-14.md`.
- **Group 1 Automotive** analizado desde la nube solo con búsqueda web (confianza baja): Mantener.
- **Regla de múltiplos común para el objetivo a 12 meses**, aplicada por el motor (`motor/objetivo12m.mjs`). Las 73 revisiones del 13-oct elegían los múltiplos a mano, casi siempre al alza; se recalcularon todas.

### 13-oct-2026
- **Cartera, versiones 3 a 9** en un día (`informes/cartera-concentrada-2026-10-13.md`): Grifols, Puig, ICE, Hermès, Equifax y PepsiCo fuera; Alphabet se queda por decisión del usuario; Dunelm y Adobe fuera; entra Intuit; tope del 7 % por valor; no se amplían posiciones existentes. Órdenes con precio límite hasta el 7-nov. Detalle en `memoria-decisiones-hasta-2026-10-14.md`.
- **Rentabilidad a 12 meses = media ponderada** por las probabilidades de los escenarios, y filtro de valor real (base ≥ 12 % y valor intrínseco ≥ precio).
- **La «nueva metodología» era la rentabilidad a 12 meses v2** (PER propio × BPA propio, del hilo de claude.ai del 12-oct), no la sostenibilidad; una reconstrucción anterior («cerrar la mitad del descuento») se retiró.
- **Las 73 empresas pasadas a la metodología del 10-oct** (sostenibilidad del crecimiento, con rebaja del caso base si falla) en actualización rápida, sin investigación nueva. Cambian de señal: Olympus, Microsoft y Kongsberg a Vender; Tomra, On, Rentokil y bioMérieux a Mantener.
- Presupuesto del usuario para la nube: 210 USD.

### 12-oct-2026
- **Fuera el juego y las apuestas** (Betsson analizada pero excluida; Evolution no se actualiza).
- La cola pasa a de tres en tres; S&P Global y Amazon por delante.

### 10-11-oct-2026
- **Metodología nueva del informe**: prueba de sostenibilidad del crecimiento en el DCF y capa de sentimiento (sección 28, subagente E).
- Cola rehecha con el escáner (la lista anterior no llegó a GitHub); pares de valor y crecimiento. Análisis de la cartera del usuario (Puig, SAP, Grifols, Netflix, Hermès) y primer rebalanceo (`informes/rebalanceo-2026-10-11.md`).
