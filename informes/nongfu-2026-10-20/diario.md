# Diario · Nongfu Spring Co., Ltd. (9633.HK) · 20-oct-2026

## Punto de partida y reglas del checkout

- **Commit de partida**: e377285 («Cola de índices: IHG (pareja 19)»; e37728523c8202855d853bf3638f3e7b47798154).
- **Checkout compartido** con otro análisis en paralelo (Cheryong Electric). No usé `git pull`, `commit`, `push`, `checkout` ni `stash`.
- **Escrito solo en**:
  - esta carpeta;
  - `verticales/empresa/simbolos.json` (entrada `9633.HK`, insertada como texto al principio de `empresas`, sin reordenar; la entrada `033100` de Cheryong es del otro análisis);
  - lo que escriben para esta empresa `precios.mjs 9633.HK` (`precios.json`) y `apuntar-12m.mjs nongfu-2026-10-20` (`objetivo12m-revisados.json`).
- **Sin tocar**: `cola.md`, `MEMORIA.md`, `METODO-VIGENTE.md`, `lecciones*.md` ni `seguimiento.xlsx`.
- **Sin ejecutar**: `seguimiento.mjs`, `cobertura.mjs`, `regenerar.mjs` ni nada con `--todas`. `robustez.mjs` sin `--escribir`. No usé herramientas de hearthbot ni de IBKR.

## Tiempos (UTC)

| Hora | Fase |
|---|---|
| ≈ 11:09 | Inicio, lecturas (CLAUDE.md, METODO-VIGENTE, MEMORIA, analiza-empresa, prompt, lecciones) |
| 11:10-11:20 | Descargas de HKEXnews, bolsa, Yahoo, ChinaBond, MarketScreener |
| ≈ 11:30 | Notas A-E (una compactación del contexto por medio) |
| 11:30-11:39 | Parte propia, motor, Word y PDF |
| ≈ 11:45 | Revisión a 12 meses, símbolos, precios y robustez `--actual` |

## Encargo

- Análisis value completo desde cero (sin refrescar nada anterior; Nongfu solo aparecía como comparable en Eastroc).
- Valorar en serio: la guerra de precios del agua (C'estbon/怡宝 = la misma marca de CR Beverage), la campaña en redes contra el fundador de 2024 y si ya se recuperó, el té sin azúcar y el riesgo de IA.
- Las fases A-E las hice yo: `notas/construir-notas.mjs` escribe A-E.json. La parte propia está en `propio.mjs`, `supuestos.mjs`, `textos.mjs` y `resumen.mjs`.

## Decisiones

- **Divisas**: cuentas en RMB, cotización en HKD; tipo 0,8507 RMB/HKD (Yahoo, 20-oct). Precio 41,88 HKD = 35,63 RMB, **cierre de hoy** (HK ya había cerrado).
- **Puente a 30-jun-2026**: caja 37.644,8 (efectivo, depósitos a plazo, depósitos a largo y activos a valor razonable), deuda 5.185,5, arrendamientos 87,8 y **`otros_ajustes` 11.134,0**: dividendo final de 2025 aprobado el 19-may, en «otras cuentas a pagar» y aún en caja el 30-jun; se pagó el 19-ago (informe semestral, nota 7).
- **Consenso**: el EBITDA de MarketScreener incluye ingresos financieros: `base_ebitda: "ajustado"`, `ajuste_ebitda_pct_ventas: +1,05` (el motor lo resta; primero puse −1,05 y lo sumaba: corregido).
- **WACC**: bono chino 1,6354 % (ChinaBond), beta 0,75 (medidas 0,48-0,65; subida hacia 1 porque el Tracker Fund no representa un consumo básico), prima 5,5 % + 2 puntos (China, un solo país, fundador al 84 %). WACC 7,68 %. g terminal 1 %.
- **Crecimiento**: 2026e +13,5 % (1S +16 % publicado; la dirección pidió «dos dígitos»), luego 10 / 9 / 7,5 / 6 / 5 / 4 / 3 %. Margen EBITDA 45 % → 44,5 %.
- **Historia del PER**: adelantada 2021-2025 (2020, salida a bolsa, fuera de la ventana). Mediana ÷ actual = 1,79: el selector no la marca como desrateada por muy poco; decide la v3.
- **Sostenibilidad**: «Sí» (motor y analista); el agua es el riesgo y por eso solo crece al 2-3 % en el base.
- **Convicción**: baja, como sugieren los criterios (valor intrínseco y regla a 12 meses discrepan).
- **Causa de la caída del 30-jun-2026 (−8,4 %)**: no encontrada más allá del sector a la baja; se dice así, sin inventar.
- **Controles**: 20 correctos, 2 explicados (regresión de comparables sin poder explicativo y muestra frágil). Cobertura del Word 90,1 %; «capital» baja porque no hay adquisiciones (la empresa no compra empresas).

## Resultado

- Regla v3: +26,2 % ponderada / +22,0 % base, pero **Mantener** por el filtro de valor real (valor intrínseco 30,46 RMB = 35,81 HKD, −14,5 %). v2: 14,5 % / 10,9 %, Mantener.
- Robustez `--actual`: SÓLIDA; acción robusta **Mantener en cartera**; límite robusto 35,80 HKD.
- Regla 13: no cambia.

## Pasos y fecha de los datos

| Paso | Herramienta o fuente | Fecha del dato |
|---|---|---|
| Lista de documentos de la empresa | HKEXnews (stockId 1000054238) → `notas/hkex-lista.json` | hasta 2026-10-20 |
| Cuentas 2021-2025 | HKEXnews: informes anuales de 2021-2025 (`notas/docs/`) | 2022-04-28 a 2026-04-17 |
| Resultados de 2025 | HKEXnews: anuncio de resultados anuales | 2026-03-24 |
| 1S26 (cuenta, balance, segmentos, flujos) | HKEXnews: anuncio de resultados semestrales e informe semestral | 2026-08-25 y 2026-09-24 |
| Semestres 2024-2025 | HKEXnews: informes semestrales de 2024 y 2025 | 2024-09-20 y 2025-09-23 |
| Acciones | Monthly Return de septiembre de 2026 | 2026-10-02 |
| Gobierno, junta, operaciones vinculadas | HKEXnews: resultados de las juntas 2024-2026, circular 2026, avisos de 2025-12-16 y 2026-09-11, aviso de 2024-07-09 | 2024-07-09 a 2026-09-11 |
| Compras del fundador | HKEXnews: avisos de participaciones (DI) | hasta 2026-10-06 |
| Competidor (C'estbon) | CR Beverage: resultados del 1S26 | 2026-08-26 |
| Sector y cuotas | 观研天下, CIC (folleto de CR Beverage), 马上赢, Nielsen vía 36Kr | 2024-05-10 a 2026-09-08 |
| Precio, betas, rentabilidades | `herramientas/bolsa.mjs --accion 9633.HK --indice 2800.HK --sector 2828.HK` | 2026-10-20 (cierre) |
| Comparables y consenso Yahoo | `notas/yahoo-datos.mjs` (quoteSummary) | 2026-10-20 |
| Consenso | MarketScreener (28 analistas) | 2026-10-20 |
| Tasa libre | ChinaBond, curva del Tesoro chino a 10 años: 1,6354 % | 2026-10-20 |
| Prima de mercado | Damodaran, ERPbymonth: 4,20 % | 2026-10 |
| Tipos de cambio | Yahoo | 2026-10-20 |
| Guía de 2026 y PET | Dolphin Research (llamada de resultados de 2025); 36Kr (PET) | 2026-03-25 y 2026-04 |
| Precios mensuales | Yahoo (chart, 1 año, mensual) | 2026-10-20 |
| Sentimiento | Guba (东方财富股吧, hk09633) | 2026-09-17 a 2026-10-20 |
| Movimiento (regla 13) | `NODE_USE_ENV_PROXY=1 node herramientas/movimiento.mjs 9633.HK` → `notas/movimiento.txt` | 2026-10-20 |
| Cálculo | `motor/integrar.mjs`, `motor/calcular-empresa.mjs` | 2026-10-20 |
| Word y PDF | `motor/rellenar.mjs`; LibreOffice | 2026-10-20 |
| Revisión a 12 meses | `herramientas/apuntar-12m.mjs nongfu-2026-10-20` | 2026-10-20 |
| Precio final | `NODE_USE_ENV_PROXY=1 node herramientas/precios.mjs 9633.HK`: 41,88 HKD | 2026-10-20 (cierre) |
| Robustez | `node herramientas/robustez.mjs informes/nongfu-2026-10-20 --actual` | 2026-10-20 |
