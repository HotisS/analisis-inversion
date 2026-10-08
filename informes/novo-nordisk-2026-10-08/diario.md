# Diario — Novo Nordisk, 2026-10-08

- Inicio: 2026-10-08 17:32 (hora local). Commit del repo: 436e969 (Equifax (Comprar, convicción baja) y seguimiento con iteraciones).
- Fecha de corte: 2026-10-08 (cierre de Copenhague del 8 de octubre).
- Primer análisis de Novo Nordisk en el repo (no hay iteraciones previas).

## Fase 1 — Identificación
- Novo Nordisk A/S; acción B en Nasdaq Copenhague (Yahoo NOVO-B.CO, ISIN DK0062498333); ADR NVO en NYSE (1 ADR = 1 acción B). Cuentas en DKK, ejercicio a 31-dic, NIIF (UE e IASB). Emisor extranjero en EE. UU. (20-F).
- Calendario (presentación 2T26, p. 14): Capital Markets Day 21-sep-2026 (ya celebrado), 9M26 el 4-nov-2026, ejercicio 2026 el 3-feb-2027.
- Desde 2026 la empresa publica «adjusted sales» y «adjusted operating profit» (excluye efectos excepcionales, sobre todo no monetarios). Guía 2026 (agosto): ventas ajustadas 0 % a −6 % a tipo constante; beneficio operativo ajustado 0 % a −6 %.
- Documentos localizados: informe anual 2025, 20-F 2025, informe de gobierno y de remuneración 2025, presentaciones trimestrales 1T25-2T26, libros de datos xlsx (4T25, 1T26, 2T26), presentaciones del CMD 2026.
- 17:50 lanzados los cuatro subagentes (A cuentas, B sector, C gobierno, D mercado). Temporales en %TEMP%\analisis-inversion\novoA-D.
- 18:04 control de los 10 minutos: las cuatro notas eran esqueletos (A además con BOM). Recordatorio enviado a los cuatro.
- 17:55-18:10 mientras trabajan: leídas las presentaciones del CMD (estrategia, finanzas, obesidad, diabetes) y la del 2T26. Claves: ventas ajustadas 2025 de 306.000 M DKK; margen operativo ajustado 2025 del 41 % con la ambición de mantenerlo «broadly stable» hasta 2030; TCAC de ventas 2026-30 «en línea con la industria»; capex 60.000 M en 2025, ~55.000 M en 2026 y a la baja; >150.000 M DKK de ventas de la cartera en 2035 (ajustadas por riesgo). En el 2T26 revirtieron una provisión de descuentos 340B de 4.200 M USD (no monetaria): las ventas publicadas de 2026 la incluyen y las ajustadas no.
- Precio de referencia (Yahoo, cierre del 8-oct): 249,90 DKK; rango 52 semanas 224,25-409,95.
- Prima implícita de Damodaran comprobada en el xlsx: última fila, columna I = 4,20 % (la J, 3,70 %, no se usa).
- 18:27 A se bloqueó (sin progreso 600 s, nota vacía). Reanudado con SendMessage.
- 18:38 A ya escribe (cuentas 2021-2025 y LTM); novonordisk.com no responde a descargar.mjs desde los subagentes y tiran de EDGAR. C con gobierno casi completo.
- 18:55-22:07 corte de red: se paró la sesión y los subagentes. Estado al reanudar: B, C y D con contenido (B sin historia, negocio descriptivo ni ESG; D sin transacciones); A solo cuentas. 22:08 A reanudado con SendMessage; el resto lo completo yo.
- 22:10 lanzado el subagente E (transacciones, historia, negocio descriptivo, ESG) para los huecos que dejó el corte en B y D.
- 22:10-22:16 escritos supuestos, textos, riesgos, catalizadores y resumen. LTM de ventas parcheado a ventas ajustadas (302.671 M DKK) para no contar los 26.760 M del 340B. A corrigió el capex: las compras de I+D (Akero) pasan a adquisiciones. Primer resultado: DCF 309,70; VO 315,19; las dos reglas Comprar.
- 22:18 E terminó (historia, negocio descriptivo, ESG, 10 transacciones; solo 2 con múltiplo publicado).
- 22:20 integración final: 93 fuentes, 14 huecos, 13 de 13 controles correctos. Word (60 páginas) y PDF generados; revisadas como imagen la portada, la síntesis, el resumen con «La decisión» y la síntesis de valoración.

## Resultado
- Comprar, convicción media. Valor objetivo 315,19 DKK frente a 249,90 (+26,1 %; rentabilidad total 30,8 % con el 4,7 % de dividendo). Alcista +60,1 %, bajista −27,4 % (asimetría 2,19x).
- Regla absoluta: Comprar. Regla relativa (prima 4,20 %): Comprar, valor objetivo 350,05 (+44,8 % total).
- DCF 309,70 (WACC 6,85 %, beta 0,85 semanal 5 años frente al MSCI Europe ajustada; bono danés 3,1 %; g 2 %). DCF inverso: −3,1 % anual de ventas 2027-2035 o margen EBITDA del 36,8 %.
- Beta: OMXC25 1,07-1,24 y salud europea 1,17-1,31 descartadas (Novo pesa mucho en ambos índices); MSCI Europe mensual 0,74 ajustada, semanal 0,85 ajustada (elegida).

## Tiempos
- 17:32-17:50 fase 1 y lanzamiento; 17:50-18:55 subagentes (lentos: A se bloqueó 10 min); 18:55-22:07 parado por corte de red; 22:07-22:22 reanudación, integración, cálculo, redacción y entrega. Unos 95 minutos de trabajo efectivo.

## Fallos del sistema
1. **novonordisk.com corta las descargas** (timeouts y «fetch failed» con el TIEMPO_DESCARGA por defecto de 60 s; la presentación de 86 páginas necesitó 240 s y los subagentes acabaron tirando de EDGAR). Arreglo: en lecciones.md, que para emisores con 20-F se empiece por EDGAR (6-K con los informes trimestrales y el anual como anexo del 20-F) y que descargar.mjs reintente con espera y suba el tiempo solo en PDF grandes.
2. **Notas vacías a los 10-15 minutos** y un subagente (A) bloqueado 600 s sin guardar nada; además A escribió primero el JSON con BOM (PowerShell), que rompe JSON.parse. Arreglo: que integrar.mjs y las comprobaciones quiten el BOM al leer, y que el encargo de cada subagente diga «escribe con Write o Node, nunca con Out-File».
3. **Corte de red de tres horas** paró sesión y subagentes; se reanudó sin perder nada porque las notas B, C y D estaban guardadas por partes. A solo tenía las cuentas: confirma que guardar tras cada campo es lo que salva el trabajo.
4. **Capex con compras de I+D dentro**: Novo mete las licencias y compras de activos (Akero, ~29.445 M DKK en 2025) en «purchase of intangible assets»; con ellas el capex de 2025 salía en 90.113 M. Arreglo: lección nueva en lecciones.md (farmacéuticas: capex = inmovilizado material + software; las compras de propiedad intelectual van a adquisiciones).
5. **Partidas no recurrentes en las ventas**: la reversión 340B (26.760 M DKK) entra en ventas, no solo en EBITDA; el esquema solo tiene no_recurrentes_en_ebitda, así que el LTM de ventas hubo que parchearlo a mano a ventas ajustadas. Arreglo: un campo `no_recurrentes_en_ingresos` en `financieros.ltm` y en `cuenta`.
6. **D citó [16, 17] sin crear esas fuentes** (cortado antes de guardarlas); integrar avisa, pero el texto final lo sustituí en propio. Arreglo: que integrar marque en rojo las citas sin fuente que llegan al documento, no solo en las notas.
7. **Transacciones con múltiplo: 2** (mínimo 3). En obesidad y metabolismo casi todo son compras de biotecnológicas sin ventas; no hay forma honesta de llegar a 3. El control no lo marcó: revisar si debería.
