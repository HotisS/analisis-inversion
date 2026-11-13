# Diario: Qt Group Oyj (QTCOM.HE), análisis value completo con corte 13-nov-2026

- Commit de partida: `645f096` (Escáner 12-nov…). Checkout compartido con otros 9 análisis en paralelo: sin pull, commit ni push desde aquí.
- Punto de partida: `informes/qt-2026-10-21/` (mismo ticker QTCOM). Motivo: resultados del 3T publicados el 29-oct-2026 y escáner del 12-nov (compra posible nivel A, ≤ 33,50 EUR, precio 30,60) con el repaso de precio y noticias pendiente.
- Sin subagentes (adaptación de la tanda): notas A-E hechas por mí, en orden.

## Pasos (hora de Madrid)

- 13-11 08:54 Inicio. Lectura de analiza-empresa.md, prompt.md, lecciones (núcleo, UE, nórdicos, software), METODO-VIGENTE §2 y §4.
- 13-11 08:55 cuentas.mjs --esef (idéntico al del 21-oct: 2020-2025), bolsa.mjs (último cierre diario 11-nov 30,78; el del 12-nov, 31,62, sale del gráfico range=1d, regularMarketTime 16:29:41 UTC) y movimiento.mjs QTCOM.HE.
- 13-11 08:56 Descargados el informe del 3T26 (MFN, PDF de 15 páginas) y el calendario de 2027 (resultados 2026 el 18-feb-2027).
- 13-11 08:58 Yahoo quoteSummary de Qt y comparables (13-nov, tras el cierre del 12-nov), Inderes 3T26 (30-oct: acumular, 41 EUR), MarketScreener (página servida con cotización del 14-ago: estimaciones de fecha dudosa, solo EBITDA/EBIT), foro de Inderes (60 últimos mensajes), avisos de participación de MFN (ninguno nuevo desde junio), Bund 3,33 % (12-nov, Bundesbank) y prima de Damodaran de noviembre 4,41 %.
- 13-11 09:01 Notas A-E escritas (construir-notas.mjs actualizado con el 3T26, el precio del 12-nov y el consenso del 13-nov).
- 13-11 09:05 supuestos, propio y textos reescritos; integrado y calculado.
- 13-11 09:06 Word y PDF (soffice). Revisión 12 m: ponderada +43,2 %, base +38,1 % (a 31,62); apuntar-12m --precios (con flock) la apunta a 30,28 (precios.json del 10-nov): 49,5 % / 44,3 %. Robustez: SÓLIDA, Comprar, nivel A, límite 35,09, mantener hasta 41,15.
- 13-11 09:06 base_bpa declarado (publicado), Word y PDF rehechos, apuntar-12m --precios rehecho (flock). comprobar.mjs: ningún ERROR de esta carpeta; aviso C10 (simbolos.json sigue apuntando a qt-2026-10-21: lo cambia el usuario). Fin.

## Decisiones

- Precio: cierre del 12-nov (31,62) del gráfico range=1d de Yahoo (regularMarketTime 16:29:41 UTC); la historia diaria de bolsa.mjs se queda en el 11-nov (30,78). El escáner del 12-nov citaba 30,60; precios.json (compartido, del 10-nov) da 30,28: robustez y apuntar-12m usan ese, con el mismo objetivo fijo (45,27).
- 2026e fijo con nueve meses reales: BPA = 0,15 real + 0,86 de nuestro 4T. Ventas 243,5 M (+12,6 %), EBITDA 23,7 % con 9,7 M de reorganización.
- 2027e: +8 % y margen del 29,5 % (antes 8,5 % y 29 %). WACC 10,26 % (Bund 3,33 %). Prima de Damodaran de noviembre 4,41 %.
- Base de BPA: publicada en historia y casos (base_bpa «publicado»).
- MarketScreener: la página servida lleva la cotización del 14-ago; sus estimaciones solo para EBITDA y EBIT (consenso), con la reserva escrita.
- Objeción de calidad: ROIC del motor 17,7 % (capital medio de 2025) frente a ≈ 13 % normalizado con el capital completo de IAR a sep-26 (≈ +2,9 puntos sobre el WACC; ≈ 16 % con el margen de 2027e). Está en rentabilidad, riesgos, KPI y cambiaria_recomendacion.
- Resultado: Comprar (convicción baja), ponderada +43,2 % y base +38,1 % a 31,62; valor intrínseco 35,09; robustez sólida, nivel A, límite 35,09; filtro de mantener 41,15.
- Cambio frente al 21-oct: precio −7,8 % (34,28 → 31,62) y valor intrínseco +4,7 % (33,50 → 35,09): pasa de Mantener a Comprar.
