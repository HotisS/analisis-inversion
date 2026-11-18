# Diario · Yadea Group Holdings Ltd. (1585.HK) · 18-nov-2026

## Punto de partida y reglas del checkout

- **Commit de partida**: 254cbac («Nvidia 18-nov: análisis value tras los resultados del 3T FY27»).
- **Encargo** (tanda de 10, 18-nov): el escáner daba Yadea como compra posible nivel A (≤ 9,03 HKD, precio 8,57) tras una caída de ≈ 12 % semanas atrás sin explicar; el repaso del 16-nov dijo NO comprar y rehacer. Investigar la causa (3C, estándar nacional, subvenciones, competencia, 3T, HKEX desde el 21-oct, recompras, ventas de accionistas) y si la tesis cambia.
- **Checkout compartido** con otros 9 agentes: sin `git pull/commit/push/stash/checkout/reset`. Escrito solo en esta carpeta y, con `flock /tmp/tanda-1118.lock`, lo que escriben `apuntar-12m.mjs --precios` y `robustez.mjs`. Sin `precios.mjs`, `seguimiento.mjs`, `cobertura.mjs`, `comprobar.mjs --escribir`; sin tocar `cola.md`, `MEMORIA.md`, `lecciones*.md`, `simbolos.json`. Temporales en `/tmp/claude-0/tanda-yadea/`.
- Fases A-E hechas por mí (sin subagentes): `notas/construir-notas.mjs` (copiado del 21-oct y actualizado dato a dato) escribe A-E.json; parte propia en `propio.mjs`, `supuestos.mjs`, `textos.mjs` y `resumen.mjs`.

## Tiempos (hora de Madrid)

| Hora | Paso |
|---|---|
| 12:21 | Inicio; lectura del encargo, `analiza-empresa.md`, `prompt.md`, `lecciones.md`, China y Hong Kong en `lecciones-paises.md`, `METODO-VIGENTE.md` §2 y §4 |
| 12:21-12:27 | `movimiento.mjs`, precios diarios, HKEXnews (15-oct a 18-nov), registro DI, `noticias.mjs`, prensa china (3C, Aima, Ninebot, NIU, MSCI, multa), Guba; `bolsa.mjs`, Yahoo quoteSummary, MarketScreener, ChinaBond |
| 12:27-12:29 | Notas A-E (`construir-notas.mjs` actualizado), supuestos y `propio.mjs`; primer cálculo |
| 12:29-12:33 | Textos, resumen, segundo cálculo, Word y PDF |
| 12:33 | Revisión a 12 meses, `apuntar-12m --precios`, `robustez --actual`, `comprobar.mjs` |

(Las horas son las que dio `TZ=Europe/Madrid date +%H:%M` en cada paso.)

## Fecha de los datos

- **Cuentas**: sin cuentas nuevas desde el 21-oct (Yadea publica semestres; último, 1S26 del 25-ago-2026; informe semestral del 24-sep). Hong Kong sin XBRL.
- **Resultados leídos nuevos**: ninguno de Yadea. Del sector: Aima 3T26 (23-oct), Ninebot y NIU 9M/3T26 (16-nov), AVC 9M26 (11-nov).
- **HKEXnews**: único documento desde el 15-oct, la declaración mensual de octubre (2-nov): 3.112.647.294 acciones, sin autocartera, sin recompras ni emisiones.
- **Registro DI de HKEX**: 0 avisos en 2026 (consultado esta vez; el 21-oct no se pudo).
- **Precio**: 8,635 HKD, cierre del 18-nov-2026 (Hong Kong cerrado; `precios.json` 8,635 a las 12:18). HKD/CNY 0,8493 → 7,33 RMB.
- **Consenso**: Yahoo del 18-nov (BPA 2026e 0,830, 2027e 1,027; objetivo 13,78 HKD, mín. 9,31); MarketScreener sin actualizar (2028e 1,172).
- **Mercado**: bono chino 10 años 1,5892 % (ChinaBond, 18-nov); ERP de Damodaran nov-2026 4,41 %; beta mensual 5 años 0,99.

## La caída: qué fue

- 21-oct −5,0 %, **22-oct −11,3 %** (intradía −10 % a 8,12), 23-oct −3,4 %: de 9,49 a 7,73 HKD (−18,5 %), volumen 25-34 M de acciones (media ≈ 13 M). Ningún anuncio en HKEXnews.
- Causas: (1) la suspensión de certificados 3C de bicicletas eléctricas alcanza modelos de gran venta de Yadea (prensa de consumo: C09 de 2.ª generación, B18-G, M20), que no se pueden matricular; circula el rumor de una suspensión total de la 3C desde el 1-nov (no se cumplió: la empresa dice «algunos modelos»); (2) el 22-oct cae todo el automóvil de Hong Kong; (3) el 23-oct Aima publica 3T26 con ventas −13,8 % y beneficio −36,9 %.
- Reglas nuevas de la CNCA (aviso n.º 8 de 2026) desde el 1-nov: trazabilidad vehículo-batería-cargador-código; suspensión no recuperada → revocación; nueva solicitud ≈ 3 meses. A mediados de noviembre (CNR, 15-nov) los certificados seguían suspendidos; Yadea no da fecha.
- Después: multa de 185.500 RMB (10-nov, irrelevante); salida del MSCI China anunciada el 11-nov, efectiva el 30-nov (12-nov −3,1 % con el Hang Seng −1,75 %). Jefferies 18 → 12 HKD es de agosto, no nuevo.
- Sin ventas de los fundadores, sin colocaciones, sin recompras.

## Decisiones

- **El informe anterior se quedó corto con la 3C** (lo valoró en < 1 % del valor con un 2S26 de −3 %). Ahora: 2S26 **−10 %** y margen 2S26 **8,0 %** (2026e −7,4 %, 8,5 %); 2027e **+10 %** (Jinjian igual) y margen **8,4 %**; 2028e +6 %, **8,6 %**. Largo plazo sin cambios (8,5 %). BPA 2028e base 0,86 → **0,80** (bajista 0,61, alcista 0,94).
- **WACC**: bono 1,5892 %, beta 0,99 (antes 0,95), prima adicional 2 puntos igual → 8,72 %.
- **Comparables**: los mismos ocho, rehechos con Yahoo del 18-nov (pesos NTM 1,4/12 y 10,6/12; ejercicios a marzo 4,4/12 y 7,6/12). Mediana 14,4x.
- **Consenso**: 2026e-2027e de Yahoo (al día); EBITDA y dividendo de MarketScreener; 2028e de MarketScreener avisando de que no está actualizado.
- **Base del BPA**: «publicado» en historia y escenarios (declarado en `base_bpa`).
- **Historia adelantada**: 2025 = 10,18 ÷ 0,701 (nuestro 2026e rebajado) = 14,5x; mediana 14,5x; selector 1,46 → v3 ×1,1. El tope manda, así que rebajar 2026e no mueve el objetivo.
- **Regla 13: no cambia.** La causa de la caída está identificada, es sectorial y regulatoria y ahora está en el base; no hay colocación, ampliación ni decisión con fecha que pueda moverla > 5 % por causa de la empresa. La salida del MSCI es técnica y pública (se discutió «retrasa hasta el 30-nov», pero no es ninguno de los hechos que la regla cita y el precio ya reaccionó).

## Resultado

- v3: ponderada **32,2 %** (apuntar-12m: 32,1 %), base **26,4 %** → Comprar; v2 20,0 % / 15,5 %; BPA −10 %: 19,6 % / 14,4 %.
- Objetivo ponderado 9,22 RMB (10,86 HKD); valor intrínseco 13,35 RMB (15,72 HKD); DCF 13,16 RMB.
- Robustez: **SÓLIDA**, compra robusta sí, si la tienes Mantener; **nivel A hoy**; límites **A 8,82 HKD**, **B 9,39 HKD**; filtro de mantener 10,37 HKD; colchón de BPA 12 % / 18 %.
- Calidad: ROIC sobre capital fijo 43,5 % − WACC 8,72 % = 34,8 puntos (el motor da n.d. por capital invertido negativo); sostenibilidad Sí.

## Qué cambió frente al 21-oct

- Precio 9,02 → 8,635 HKD; BPA 2028e 0,86 → 0,80; objetivo ponderado 9,45 → 9,22 RMB; rentabilidad 29,3 % → 32,2 %; valor intrínseco 13,85 → 13,35 RMB; límite A 9,03 → 8,82 HKD; B 9,60 → 9,39 HKD; mantener 10,60 → 10,37 HKD.
- **Señal de alarma anterior** («ventas del 2S26 por debajo de 16.500 M» y «revocación de certificados 3C»): sin dato publicado (resultados del 2S26 hacia el 30-mar-2027) y sin revocaciones confirmadas a Yadea, pero los indicios (3T del sector, certificados sin volver) la hacen probable: se adelanta al base (2S26 16.031 M) en vez de esperar. Nueva señal: 2S26 < 15.100 M o certificados sin recuperar a 31-mar-2027.

## Avisos de comprobar.mjs

- Ninguno de esta carpeta. Queda el C10 de `simbolos.json` (apunta a `yadea-2026-10-21`): lo cambia el coordinador.

## Lecciones

- Una suspensión regulatoria que «afecta a todo el sector» no es por eso pequeña: el 21-oct se valoró la 3C en < 1 % del valor suponiendo recuperación en semanas; cuando el regulador cambia las reglas de certificación con fecha (1-nov) y las suspensiones no se levantan, hay que meter en el base al menos un semestre peor y mirar los resultados trimestrales de los rivales cotizados en A (Aima, Ninebot publican trimestres; Yadea no).
- Hong Kong: el registro DI se consulta con curl en dos pasos: `NSSrchCorpList.aspx?...&sc=<código>` da el `sid` interno y `NSAllFormList.aspx?sa2=an&sid=<sid>&...` la lista (con el código de bolsa como `sid` sale otra empresa).
