# Diario: Fervo Energy (growth, 18-oct-2026)

- Sin informe previo en informes/ ni en informes-growth/. Sin `git pull` ni commit (brief común). No se ha ejecutado `growth.mjs --todos` ni se ha tocado `cola-growth.md`.
- Precio: cierre del viernes 16-oct (9,68 USD). La robustez con --precios usó el mismo (16-oct).
- Símbolo de Yahoo: **FRVO** (va en `simbolo_yahoo`).
- Próximos resultados (3T26): **sin fecha confirmada**. therighttrader la proyecta el 11-nov-2026 y Stocktwits el 16-nov. El 2T se anunció 9 días antes. En datos: 2026-11-11 (estimada).
- Fin del bloqueo de la OPV: 180 días desde el folleto del 12-may → 8-nov (domingo), en la práctica el **9-nov-2026**; hasta 205,0 M acciones A (424B4). Es el motivo principal del «retrasa».
- Ventas casi nulas: crecimiento en null (A = 0). El motor proyecta 0 y el objetivo es la caja neta tras un año de quema (1,6 USD). Variantes de contraste en `notas/variantes/` (A: crecimiento al máximo → 54,8 puntos, Vender; B: tomar las ventas de los 12 meses siguientes como base, margen del 75 %, sin dilución → 64,8 puntos, Mantener, compra hasta 9,1; C: quema de los 12 meses siguientes → 0,5 USD).
- Deuda incluye 187 M de participaciones minoritarias rescatables en Cape Phase I (socio financiero del proyecto). Acciones totalmente diluidas (327,4 M) sin método de tesorería (no hay precio medio de ejercicio de las opciones).
- G3 de la robustez es un falso aviso (compara las ventas del analista con una mecánica de 0).
- Sin respuesta pública de Fervo a Morpheus encontrada a 18-oct. Las cifras de Morpheus vienen de resúmenes de terceros (Hagens Berman, Phalanx); el informe original no se leyó.
- Reddit no responde a la consulta automática; no se encontraron hilos en Rankia ni en Investing ES.

## Lecciones (para quien integre)
- Empresas growth sin ventas (preingresos, como Fervo, Oklo o las biotecnológicas): el motor v11 da siempre Vender con un objetivo igual a la caja neta, y la alerta G3 salta en falso. Propuesta (sin backtest): un modo «proyectos» con suma de partes por MW contratado (coste por kW, precio del PPA, probabilidad por fase), como hace BofA, o al menos que el motor avise «ventas < 1 % de la capitalización: método no aplicable» en vez de dar un objetivo.
- Salidas a bolsa recientes: el fin del bloqueo es un hecho pendiente con fecha que la regla 13 debe tratar como «retrasa» (colocación de accionistas de referencia). Conviene que `movimiento.mjs` avise de «menos de 200 sesiones» y que el bloque de contexto lleve la fecha del bloqueo.
