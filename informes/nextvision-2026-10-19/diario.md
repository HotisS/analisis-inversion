# Diario: NextVision (NXSN.TA), análisis value del 19-oct-2026

- Commit de partida: `250a336acc2e45e3c7dd51a518d0c96ea8e744bf` (17:42 UTC, «Cola de índices: Anker Innovations (pareja 11)»). Checkout compartido con otro análisis en paralelo: sin pull, commit ni push desde este hilo.
- Inicio: ≈ 17:43 UTC. Fin: ≈ 18:13 UTC (reloj del sistema; la investigación primaria se hizo antes de una compactación de contexto).
- Análisis nuevo, método completo (no hay informe anterior de NextVision). Notas A-E escritas por el analista (sin subagentes) con `notas/construir-notas.mjs`, siguiendo la forma de `informes/cardinal-health-2026-10-19/`. Sin lecciones de Israel ni de cámaras para drones en `lecciones*.md`; ficha sectorial de defensa del 15-oct-2026.

## Decisiones

1. **Cuentas oficiales**: `cuentas.mjs` no cubre Israel y MAYA (maya.tase.co.il) devuelve 403. Se usaron los informes anuales e intermedios publicados en la web de inversores de la empresa (localizados con su API de WordPress): informe periódico 2025 (auditado, 2025 y 2024), estados de 2024 (2024 y 2023), informe anual 2022 en hebreo (2022 y 2021), 9M25, 1T26 y 1S26.
2. **Divisa**: cuentas en USD (moneda funcional); la acción cotiza en agorot. `meta.divisa_cotizacion: 'ILA'`, `meta.tipo_cambio` = 1/311 USD por agora (tipo representativo del Banco de Israel del 19-oct-2026, 3,110 ILS/USD). Precio del informe 60,42 USD = 18.790 agorot.
3. **Serie de Yahoo rota**: Yahoo da NXSN.TA en ILS hasta el 15-may-2026 y en agorot desde el 18-may. `movimiento.mjs` salía absurdo (6 m +6.018 %, guardado en `notas/movimiento.txt`) y `bolsa.mjs` con beta negativa (`notas/bolsa-yahoo-sin-corregir.json`, NO usar). Se corrigió con `notas/movimiento-corregido.mjs` y `notas/bolsa-corregida.mjs` (copia de `bolsa.mjs` con la corrección × 100 antes del 18-may). Índice TA-125, sector ITA.
4. **Ejercicio objetivo 2028e**. PER actual = precio ÷ BPA de los próximos 12 meses (2,4/12 de 2026e + 9,6/12 de 2027e = 2,48 → 24,4x). Historia adelantada de solo tres años (2023-2025: 10,3 / 15,0 / 31,9): Yahoo empieza en mayo de 2023 y no hay cierres fiables de 2021-2022.
5. **BPA de 2027e por debajo del consenso** (2,58 frente a 3,18): cartera a la baja en el 2T26, 35,5 M asignados a 2027 en marzo y margen bruto del 72 % al 65 %.
6. **WACC 13,4 %**: tasa libre de EE. UU. 5,09 %, beta 1,15 (ajustada mensual frente al TA-125), prima 5,5 % y 2 puntos adicionales (Israel y concentración en un producto y tres clientes).
7. **Sostenibilidad «Sí»** (el motor también): crecimiento por debajo del histórico y del mercado, sin capital fijo, cuota de 1,3 % a 1,7 %.
8. **Regla 13: «descarta»**: ventas en serie de los fundadores (enero de 2026 a 228 ILS y colocación de ≈ 200 M USD en junio) con «monetización» como único motivo; bloqueo vencido. Fidelity (5,5 %, motivo declarado) no cambia por sí sola. Los resultados del 3T26 (≈ 10-nov, fecha estimada) no retrasan (regla 11).
9. **Aviso REVISAR de `apuntar-12m.mjs`** (v3 −4,2 % frente a v2 +13,3 %): revisada a mano en la revisión a 12 meses; la v3 adelantada es la base correcta y, con historia corta, decide la más baja. Las dos dan Mantener.
10. **IBKR**: la acción se puede comprar en la bolsa de Tel Aviv con el permiso de negociación «Israel» (no residentes); comprobado en la base de conocimiento pública de IBKR, sin usar las herramientas de IBKR. También NXSNF en OTC, poco líquido.

## Resultado

- Regla a 12 meses (v3, selector sin marcas): ponderada −4,1 % (−4,2 % en `apuntar-12m`), base +1,2 % → **Mantener**; v2 +13,3 % → Mantener. Objetivo 57,35 USD (17.836 agorot).
- Valor intrínseco 35,47 USD (−41 %); DCF 27,98 (WACC 13,4 %); con la prima del mercado 38,36.
- Calidad: ROIC del motor 255 % (2025) frente a WACC 13,4 %; sostenibilidad «Sí».
- Robustez (`--actual`, 18.790 agorot del 19-oct): SÓLIDA, acción robusta «No mantener»; límite de compra 11.031 agorot (= 35,47 USD, el valor intrínseco; v2 igual); límite robusto 11.031; BPA −10 %: −13,7 % / −8,8 %. Avisos D6, M3, M4, V1, C2, M6.
- Controles: 19 de 22 correctos y 3 explicados (tipo impositivo de 2025, caja proyectada frente a la histórica, crecimiento del BPA desde 2025).

## Pasos y fecha de los datos

| Paso | Herramienta o fuente | Fecha del dato |
|---|---|---|
| Cuentas oficiales 2021-2025 | Web de inversores de la empresa (MAYA da 403): informe periódico 2025, estados 2024, informe anual 2022 | Cierres de 2021 a 2025; informe 2025 del 10-mar-2026 |
| Cuentas intermedias | Informes del 9M25, 1T26 y 1S26 (traducción inglesa) | 30-sep-2025, 31-mar-2026 y 30-jun-2026 (publicado el 10-ago-2026) |
| Documentos primarios | Presentaciones (mar-2024, nov-2025, mar/may/ago-2026), oferta de sep-2025, colocación de jun-2026, informes inmediatos de pedidos y objetivo | 2024 a 6-oct-2026 |
| Datos de bolsa | `notas/bolsa-corregida.mjs` (Yahoo, unidad corregida) | cierre del 19-oct-2026 |
| Consenso y comparables | `notas/yahoo-datos.mjs` (Yahoo quoteSummary) + ficha sectorial de defensa | 19-oct-2026 (NXSN 14:29 UTC) ; ficha del 15-oct-2026 |
| Tipo de cambio | Banco de Israel (representativo) | 19-oct-2026 (3,110) |
| Tasa libre | Tesoro de EE. UU., curva diaria | 16-oct-2026 (5,09 %) |
| Prima de mercado | Damodaran, ERPbymonth | oct-2026 (4,20 %) |
| Noticias y directivos | Globes, Calcalist, Dealroom, Freedom Broker; anuncios de la empresa | 12 meses al 19-oct-2026 |
| Sentimiento | Prensa israelí, REX Shares (DRNZ), Simply Wall St (sin hilos en Reddit, Stocktwits ni Seeking Alpha) | ago-oct 2026 |
| Movimiento (regla 13) | `herramientas/movimiento.mjs NXSN.TA` (salida rota por la unidad) y `notas/movimiento-corregido.mjs` | 19-oct-2026 (18.790 agorot) |
| Integración y cálculo | `motor/integrar.mjs`, `motor/calcular-empresa.mjs` | 19-oct-2026 |
| Word y PDF | `motor/rellenar.mjs`, `soffice` | 19-oct-2026 |
| Revisión a 12 meses | `herramientas/apuntar-12m.mjs nextvision-2026-10-19` | precio 60,42 USD (19-oct) |
| Símbolo | `verticales/empresa/simbolos.json` (entrada NXSN añadida) | 19-oct-2026 |
| Precios | `herramientas/precios.mjs NXSN` | cierre 19-oct-2026 (18.790 ILA) |
| Robustez | `herramientas/robustez.mjs … --actual` | cierre del 19-oct-2026 (18.790 ILA) |
