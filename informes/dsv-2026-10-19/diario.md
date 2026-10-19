# Diario — DSV A/S (DSV) — corte 2026-10-19

- Inicio: 2026-10-19 17:52 UTC (19:52 en Copenhague, sesión ya cerrada). Fin: ≈ 18:20 UTC.
- Commit de partida: `250a336 Cola de índices: Anker Innovations (pareja 11)`. Sin `git pull` ni otras operaciones git (cinco sesiones en el mismo clon; el commit lo hace el coordinador). No se cambia de versión del prompt durante el análisis.
- Procedimiento: `CLAUDE.md`, `.claude/commands/analiza-empresa.md`, `verticales/empresa/prompt.md` (entero), `lecciones.md`, sección Nórdicos y UE de `lecciones-paises.md`, «compradores en serie» de `lecciones-casos.md`, `METODO-VIGENTE.md` (§2, §4 reglas 1, 6, 11-14).
- Iteración nueva sobre `informes/dsv-2026-10-07/` (solo punto de partida). Sin la herramienta Agent: las fases A-E las hace el coordinador, en orden, con notas A-E en `notas/`.

## Fase 1 — Identificación (datos a 19-oct)
- DSV A/S, Nasdaq Copenhagen `DSV` (Yahoo `DSV.CO`), ISIN DK0060079531, LEI 529900X41C0BSLK67H70. DKK, NIIF-UE, ejercicio natural.
- Último informe publicado: 1S26 (22-jul). **Próximos resultados: 3T26 el 21-oct-2026** (anuncio del 23-sep). Lista de MFN del 19-oct: ningún anuncio desde el n.º 1173 (calendario de 2027, 5-oct): ni operaciones de directivos ni avisos de accionistas desde el 28-jul.

## Cuentas del regulador (datos a 19-oct; últimos anuales 2025)
- `cuentas.mjs --esef "DSV"` cogió **Studsvik AB** (primera de tres entidades): repetido con el LEI. filings.xbrl.org solo tiene los anuales 2024 y 2025 de DSV.
- Cotejo con la nota A (informes anuales): coinciden al millón ingresos, amortizaciones, BAI, impuestos, minoritarios, beneficio, BPA, DPA, activo, pasivo, caja, deuda, arrendamientos, patrimonio y flujos. Diferencias explicadas en `notas/cuentas-mapa.json`: proveedores = «trade payables» + «accrued cost of services» (comprobado en el informe anual 2025: 23.493 + 12.726), y la venta de autocartera en emisión de acciones.
- Puente del 30-jun comprobado contra el 1S26 descargado (deuda 48.193 + 15.179, arrendamientos 25.308 + 6.847, caja 10.058, NIBD 87.331).

## A-E (en orden, sin subagentes)
- **A (cuentas)**: sin cambios (no hay resultados nuevos); un texto de hueco con la palabra «subagente» cambiado.
- **B (sector)**: WCI de Drewry al 15-oct (4.485 USD/FEU, +3 % en la semana).
- **C (gobierno)**: comprobado sin cambios (MFN 19-oct); posiciones cortas: el último fichero de la Finanstilsynet sigue siendo el de julio (2,10 %).
- **D (mercado, datos a 19-oct)**: `bolsa.mjs` con cierre del 19-oct (1.211,5 DKK; sin aviso de cierre), betas frente a EXSA.DE (1,36 mensual 5a; 1,21 semanal 2a). Consenso MarketScreener del 19-oct: 21 analistas, EBIT 24.262/28.504/31.610 M (antes 24.370/28.942/32.217), BPA 40,67/79,42/95,46, objetivo medio 1.824,95 (antes 1.939), mínimo 1.250. Stock Analysis: 15 compra fuerte, 4 compra, 2 mantener. Siete recortes de objetivo del 8 al 15-oct (Barclays, JPMorgan a neutral, Nordea, Jyske, UBS, Deutsche Bank; RBC inicia en «sector perform» con 1.250). Comparables: consenso de MarketScreener de cada uno del 19-oct y cierres del 19-oct (NX, el de MarketScreener), FX del BCE del 19-oct (`notas/comparables-2026-10-19.json`, `notas/actualizar-notas.mjs`); mediana PER 20,1x, EV/EBITDA NTM 7,2x. **Tasa libre: Bund a 10 años del 19-oct, 3,49 % (Bundesbank)**, como pide la lección de Dinamarca; el informe del 7-oct usó el bono danés de agosto (3,1 %).
- **E (sentimiento, nuevo)**: Nordnet Social (16-19 oct), Breakbulk (Jyske 14-oct; «mercado que ya no se cree» 24-sep), Seeking Alpha (31-ago), aktietip (21-sep), Inderes. Tono dividido, empeora. Reddit/Stocktwits sin acceso (hueco).
- Noticias: miedo a la IA del 12-feb (DSV −10,5 % en la sesión por el comunicado de SemiCab/Algorhythm); DHL adelantó el 16-oct su 3T (Global Forwarding EBIT ≈ 260 M EUR frente a 195). Causa del −7,6 % del 4-may no encontrada tras tres búsquedas (dicho en el bloque).

## Decisiones
- Mismos supuestos de negocio que el 7-oct (no hay cuentas nuevas): BPA 2028e 51,0 / 88,5 / 100,6; 2027e base 77,07.
- WACC 8,33 % (Bund 3,49 %, beta 1,20, prima 5,5 %, deuda 4,0 % y 25 %). Es lo que más cambia el valor.
- Pesos del valor intrínseco: **DCF 60 % y escenarios 40 %** (el encargo; los comparables, frágiles, pasan de 15 % a 0).
- Historia adelantada del PER: fuera 2019, 2024 y 2025 por BPA del año siguiente hundido por partidas especiales de integración (el 7-oct dejaba 2019 y 2024 dentro). No cambia el base (tope ×1,1) ni el bajista; el alcista baja del techo (22,0x el 7-oct con otro precio) a la media larga 21,6x.
- **Recomendación: Mantener, convicción baja**, apartándose de la regla (Comprar) con justificación: ROIC − WACC 0,3 puntos, v2 14,3 %, BPA −10 % no aguanta.

## Cálculo (datos a 19-oct)
- DCF 1.317,93 DKK (+8,8 %); escenarios 791,72 / 1.317,93 / 1.661,57, ponderado 1.272,29; valor intrínseco 1.299,67 (+7,3 %); con la prima del mercado 1.706,58. DCF inverso: crecimiento 2,1 % (base 3,2 %), margen 13,8 % (14,5 %), rentabilidad implícita 8,7 %.
- 12 m v3: 1.484,72 DKK, ponderada 23,1 %, base 27,0 % (Comprar); v2 14,3 % (Mantener).
- Controles: 17 correctos y 12 explicados, ninguno en «Revisar». 89 fuentes. Word 59 páginas, cobertura 90,8 %, 27 gráficos; PDF con LibreOffice; vistas como imagen las páginas 1-4.

## Revisión de comité (resumen)
1. El objetivo a 12 m sale de la vuelta parcial del PER (15,7x → 17,3x) y del salto del BPA sin partidas especiales; no es «el DCF dice que vale más». La recomendación se aparta de la regla y está justificada.
2. DCF inverso: ya no es conservador (2,1 % frente a 3,2 %): dicho en la lectura y la síntesis.
3. Supuesto más agresivo: conversión del 40,5 % en 2030. Sostenibilidad «Sí» (motor y analista).
4. Proyección dentro del 1,5 % del consenso en EBITDA; BPA 2028e −7,3 % explicado.
5. Comparables frágiles: peso 0 en el valor; PER como techo del alcista.
8. Bajista −34,6 %: verosímil (2023 + integración fallida).
9. Dato que cambia la conclusión: la tasa (WACC 8,8 % → 1.186,88, bajo el precio) y el 3T26 de Road.
11. Foros: Road y sinergias; ninguna cifra sale de ellos.
12. BPA propio y regla común; consenso solo contraste.

## Rentabilidad a 12 meses y robustez
- `revision-12m-2026-10-19.md`. `node herramientas/apuntar-12m.mjs dsv-2026-10-19` (19-oct 18:11 UTC): v3 23,2 % / 27 % Comprar, v2 14,3 % Mantener (antes en el registro: 17,4 % al precio de 1.233,00 con la carpeta del 7-oct).
- `movimiento.mjs DSV.CO` (19-oct): 1.211,50 DKK; 1 m −4,9 %, 3 m −15,5 %, 6 m −28,9 %, 12 m −5,4 %; −36,3 % del máximo de 52 semanas, +6,5 % del mínimo; P5. Bloque `bolsa.contexto`: veredicto **no cambia**.
- `robustez.mjs --actual` (19-oct 18:11 UTC; precio de `precios.json` «en curso» 1.218,00, el cierre oficial de Copenhague fue 1.211,50): FRÁGIL, **acción robusta Mantener en cartera**; v3 22,5/26,3, v2 13,7, BPA −10 % 10,3/13,7; límite con objetivo fijo 1.297,38, límite robusto 1.168,78 DKK. Marcas D6, E2, P3-P5 (P3/P4 con el movimiento del 15-oct de `movimiento.json`), M6; sin C1-C3.

## Fallos del sistema vistos
1. `robustez.mjs --actual` después del cierre usa la instantánea «en curso» de `precios.json` (1.218,00 a las 17:36 UTC) aunque la sesión de Copenhague cerró en 1.211,50 a las 15:00 UTC: tras el cierre debería preferir el cierre del día.
2. `robustez.mjs` toma P3/P4 de `movimiento.json` (15-oct) aunque el informe trae `bolsa.contexto.movimiento` del 19-oct.
3. `cuentas.mjs --esef "DSV"` elige Studsvik: ya en lecciones (pasar el LEI).
