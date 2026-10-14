# Diario — Cochlear (COH.AX), corte 2026-10-08

- Commit de partida: ec953ac (Informe de Alphabet). Prompt: verticales/empresa/prompt.md de ese commit.
- 22:28 Inicio. Fase 1: identificación.
  - Cochlear Limited, ASX COH, ISIN AU000000COH5, AUD, AASB (NIIF), cierre 30-jun, etiqueta «fin» (FY26 = jul-25 a jun-26). Semestres, no trimestres.
  - La web de inversores de cochlear.com no da enlaces con `descargar.mjs --lista` (contenido por JavaScript). La API de markitdigital de la ASX solo devuelve los 5 últimos anuncios. Lo que funciona: el listado anual HTML de la ASX (`announcements.do?...&year=AAAA`) + `displayAnnouncement.do?display=pdf&idsId=` (HTML con el enlace al PDF). Resueltos 231 anuncios 2022-2026 a `notas/anuncios_asx.tsv`.
  - Hechos clave leídos: FY26 ventas 2.343 M (+2 % cc), subyacente 322 M (−22 %), recorte de guía 22-abr-26, demanda colectiva 29-sep-26, CMD 13-nov-26, junta 26-oct-26, guía FY27 330-350 M.
- 22:32 Lanzados los cuatro subagentes (A cuentas, B sector, C gobierno, D mercado) con `notas/ENCARGO_COMUN.md`.
- 22:43 Control a los 10 minutos: las cuatro notas tienen contenido real (A ~40 kB, B ~30 kB, C ~5 kB, D ~22 kB), sin BOM.
  - D fijó el precio en el cierre del 8-oct (129,00 AUD) por la API de Yahoo: `bolsa.mjs` decía que no había cierre del 8 y usaba el del 7 (129,50), aunque en Sídney ya eran las 07:30 del 9. Ex-dividendo desde el 21-sep (final 1,30 = 85 M, pago 14-oct): se resta de la caja del puente.
- 22:57 Control a los 25 minutos: ninguna nota se había guardado desde 22:41-22:45. Al enviar el recordatorio, SendMessage respondió «Resuming agent» en los cuatro: **se habían parado los cuatro a la vez sin aviso de terminación** (corte de red, probablemente). Reanudados con SendMessage; no se pierde nada porque guardaban por partes.
  - Corrección a las 22:58: no se habían parado. Las cuatro notas estaban **terminadas** a las 22:41-22:45 (A, B, C y D acabaron en 10-13 minutos), pero **los avisos de terminación no llegaron**; solo llegaron después de que SendMessage los «reanudara». Los resúmenes de diez líneas de su primera respuesta se perdieron con ellos.
- 22:58-23:00 Primera integración y cálculo. Decisiones:
  - El gasto en la nube fuera del EBITDA en todos los años (FY22-FY24 lo llevaban dentro: parches de 21,6 / 38,5 / 30,3 M en `no_recurrentes_en_ebitda`), para que la serie sea homogénea con FY25-FY26 y con el consenso.
  - Consenso: D lo marcó «ajustado» con un 4 % de las ventas, pero el EBITDA LTM ya excluye la nube (por `no_recurrentes_en_ebitda`) igual que MarketScreener: misma definición, así que `base_ebitda: "NIIF"` y ajuste 0. Su BPA de FY27 es estatutario (con la nube); Stock Analysis da 5,19 subyacente.
  - En el DCF, FY27e lleva el último año de la nube (≈ 86 M antes de impuestos) como coste: margen 20,2 % frente al 23,8 % subyacente de la guía.
  - GN Store Nord fuera de los múltiplos (cambio de perímetro). Transacciones con peso 0 (ninguna con múltiplo de EBITDA; Oticon Medical a precio cero).
  - Beta 0,93 (ajustada mensual 5 años frente al S&P/ASX 200). Frente a IXJ 0,60-0,73 y frente a IHI 0,57-0,71, pero miden riesgo frente al sector y llevan dentro el AUD/USD. Tasa libre 5,34 % (RBA F2, 30-sep). WACC 10,46 %; con la prima de Damodaran (4,20 %, comprobada en el Excel: columna I de la última fila; la J da 3,70 %) 9,25 %.
  - Etapa 2 sí: ROIC 21,7-26,6 % FY21-FY25 (16,2 % en FY26) frente al WACC; penetración de adultos ≈ 3 %.
  - Escenarios: bajista −2 pp de crecimiento y −3 pp de margen (FY26 repetido); alcista +2,5 pp y +1,5 pp (vuelta a la historia y al 18 % de margen neto).
- 23:00 Resultado: DCF 92,21; objetivo 100,16 (−22,4 %); relativo 115,11 (−8,1 % total, asimetría 0,47). Las dos reglas, Vender; la relativa por muy poco (el umbral de venta es 128,20 y el precio 129,00). DCF inverso: 9,1 % de crecimiento anual frente al 5,5 % de la base. Convicción baja: hasta FY2029 coincidimos con el consenso; la diferencia es el crecimiento a largo plazo y una tasa libre australiana alta.
- 23:01-23:05 Textos (`textos.mjs`, `resumen.mjs`), revisión de comité, Word y PDF (56 páginas). Revisadas como imagen las páginas 1-4. Síntesis de 623 palabras.
- 23:06 Fin. Unos 38 minutos en total.

## Fallos del sistema
1. **Avisos de terminación de los subagentes perdidos.** Los cuatro acabaron a las 22:41-22:45 y no llegó ningún aviso; a los 25 minutos parecía un corte. SendMessage los «reanudó» y entonces llegaron los avisos, sin los resúmenes de la primera respuesta. *Arreglo propuesto*: que cada subagente escriba al final de su nota una clave `_estado: "terminado"` con la hora y su resumen de diez líneas (en `notas/<letra>.json`, que `integrar` ignore), y que el control de los 10-15 minutos mire esa clave antes de enviar recordatorios.
2. **`bolsa.mjs` descarta la sesión «de hoy» en hora de Madrid.** Con la ASX, a las 22:30 de Madrid ya son las 07:30 del día siguiente en Sídney y la sesión del 8 estaba cerrada, pero la herramienta dio el cierre del 7 (129,50 en vez de 129,00). *Arreglo*: decidir si la sesión de la fecha de corte está cerrada con la hora de cierre del mercado en su zona (`regularMarketTime` de Yahoo / `exchangeTimezoneName`), no con la fecha local.
3. **Cochlear.com no da enlaces con `descargar.mjs --lista`** (contenido por JavaScript) y la API de markitdigital de la ASX solo devuelve los 5 últimos anuncios. Funcionó el listado anual HTML de la ASX + `displayAnnouncement.do` para resolver el PDF. *Arreglo*: añadir a `descargar.mjs` un modo `--asx COH --anio 2026 [filtro]` que liste y resuelva los PDF, y anotarlo en `lecciones.md` (sirve para cualquier empresa australiana).
4. **Consenso «ajustado» mal aplicado por la nota de mercado.** D marcó el consenso como ajustado (4 % de las ventas) aunque el LTM ya excluía la misma partida por `no_recurrentes_en_ebitda`: se habría restado dos veces. *Arreglo*: en `prompt.md`, aclarar que `base_ebitda` compara el consenso con el EBITDA LTM **después** de `no_recurrentes_en_ebitda`, y que el motor avise si `ajuste_ebitda_pct_ventas` coincide con `no_recurrentes_en_ebitda / ventas` del LTM.
5. **Partida significativa que cambia de criterio a mitad de la serie** (la nube dentro del subyacente hasta FY24, fuera desde FY25 reexpresado). A la dejó la serie mezclada; hubo que parchear tres años. *Arreglo*: en la parte A del prompt, pedir que `no_recurrentes_en_ebitda` siga el **criterio vigente** en todos los años, igual que los segmentos.
6. **Comparables sin campo `excluir`.** Para sacar a GN Store Nord hubo que poner a `null` sus múltiplos con `_parches`. *Arreglo*: `excluir: true` en `comparables.empresas`, como ya existe en transacciones y en múltiplos históricos.
7. **`integrar` avisa de «nota de trabajo en un campo que se imprime» en `financieros.extra`**, que no se imprime (lo dice el aviso siguiente). *Arreglo*: no revisar las claves `extra`.

## Actualización v2 (13 oct 2026): sostenibilidad del crecimiento

Sin investigación nueva. Script: `notas/actualizacion-v2.mjs` (parte de `datos.json`), salida `datos-v2.json`, `Cochlear - 2026-10-08 v2.docx` y su PDF. Mismo precio (129,00 AUD) y fecha de corte (8-oct-2026). La prueba pasa: no cambia ningún supuesto del DCF.

| | v1 | v2 |
|---|---|---|
| Recomendación · convicción | Vender · Baja | Vender · Baja (igual) |
| Valor objetivo (WACC 10,46 %) | 100,16 AUD, RTE −19,7 % | 100,16 AUD, RTE −19,7 % |
| Con la prima del mercado (WACC 9,25 %) | 115,11 AUD, RTE −8,1 %, asimetría 0,47 | igual |
| Comprar por debajo / vender por encima | 103,06 / 128,20 | **98,66** / 128,20 (motor actual, sin cambiar datos) |
| Sostenibilidad del crecimiento | — | **Sí** (5,5 % anual proyectado; activos ligeros según el motor: reinversión del 13 % del NOPAT) |

- **Reinversión**: 629 M acumulados en FY2027e-FY2036e (13 % del NOPAT): el motor no calcula el crecimiento financiable. Es engañoso, porque el circulante baja del 32 % al 29 % de las ventas; a mano, 0,38 AUD de capital por AUD de ventas nuevas, dentro del 0,19 (FY2021-FY2024) y el 0,58 (FY2021-FY2026) históricos, y el margen del NOPAT de FY2036e (16,7 %) queda por debajo del 17,0-18,0 % de FY2022-FY2025.
- **Cuota**: `mercado_final` en null. El 60 % de `competencia.cuota_pct` es de implantes cocleares y de conducción ósea (dato de la empresa) y el mercado de GMI es solo de implantes cocleares, sin servicios ni Acoustics. A mano: implantes de Cochlear 1.435,2 M AUD en FY2026 frente a ≈ 2.877 M en 2025 (49,9 %); al ritmo del grupo, 2.320 M en FY2035e frente a 6.042 M en 2035e (38,4 %). La cuota baja.
- **Puente**: unidades + precio + divisa (FY2027e: 3 + 1 − 3,5 = 0,5 %); reparto de estimación propia.
- Textos: frase del veredicto en «El negocio»; convicción explicada en la síntesis (control nuevo «La síntesis explica la convicción»); nivel de compra 103,06 → 98,66 en la síntesis, `cambiaria_recomendacion` y `escenarios.comentario`. Para seguir en ≤ 650 palabras (647) salieron de la síntesis la frase del gasto en la nube y la del EV/EBITDA frente a la media histórica (siguen en el cuerpo).

**Fallos del sistema vistos**
1. Con el circulante a la baja, la reinversión cae por debajo del 15 % del NOPAT y el motor declara «activos ligeros» en una empresa con capex del 5,4 % de las ventas: falta un cálculo que separe el circulante liberado de la inversión en crecimiento.
2. El ROIC incremental histórico (1,2 %) y el ROIC actual (16,2 %) salen de un FY2026 deprimido (gasto en la nube, partidas significativas): con ellos la prueba de capital nuevo no dice nada. Arreglo: usar la media de cinco años o el año normalizado.
3. Sin campo de ingresos del perímetro de la cuota, la prueba de cuota se hace a mano (ya anotado en `lecciones.md`).
- 13-oct-2026: revisión v2 a 12 meses (PER propio × BPA propio): objetivo 165,23 AUD (ponderado; base 140,76), rentabilidad +30,8 % (base +11,8 %), señal Mantener (`revision-12m-2026-10-13.md`).
- 14-oct-2026: objetivo a 12 meses con la regla de múltiplos común (`valoracion.objetivo_12m`): ponderada +30,8 % → +19,0 %, base +12,1 %, señal Mantener (`revision-12m-2026-10-13.md`).
- 2026-10-14: datos-v3.json y «Cochlear - 2026-10-08 v3.docx» regenerados con el motor vigente (herramientas/regenerar.mjs; METODO-VIGENTE.md), sin investigación nueva: v2 Mantener 19,0 %.
