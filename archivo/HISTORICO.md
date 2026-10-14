# Histórico de cambios importantes

**No se lee en las sesiones normales** (análisis, cola, cartera del día). Solo cuando el usuario pide revisar cambios históricos o hace falta saber por qué se decidió algo. Lo vigente está en `MEMORIA.md`, `cola.md` y `verticales/`.

**Qué se apunta aquí** (una entrada por cambio, la más reciente arriba, dos o tres líneas): cambios de método o de reglas, decisiones de cartera que sustituyen a otras, cambios de estructura del repo o del flujo de trabajo, y lo que se retira de `MEMORIA.md`, `cola.md` o `lecciones.md` cuando ya no está vigente. No se apuntan análisis sueltos (están en `seguimiento.xlsx` y en cada `diario.md`).

## Archivos de detalle (en esta carpeta)

- `memoria-decisiones-hasta-2026-10-14.md`: `MEMORIA.md` completa tal como estaba el 14-oct, con todas las decisiones del 10 al 14-oct (versiones 3-9 de la cartera y sus motivos).
- `cola-hasta-2026-10-13.md`: las colas del 10 al 13-oct con el estado y la señal de cada empresa.

## Cambios

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
- **Cartera de la tarde** (`informes/cartera-2026-10-14-tarde.md`) sustituye a la de la mañana: 4.000 EUR más de liquidez, Nemetschek 29 y LVMH 5, liquidez ≈6.300 EUR con suplentes (Experian nueva). 14 análisis nuevos desde la nube, ninguno pasa los tres requisitos al precio de hoy.
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
