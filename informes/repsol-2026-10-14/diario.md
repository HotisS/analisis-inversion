# Diario · Repsol (REP.MC) · 14-oct-2026

- Commit de partida: 4f3c89a (Roche, 14-oct). Método v2 con regla de múltiplos común.
- Entorno: nube de Claude Code. Solo WebSearch (unas 30 búsquedas, cupo compartido); sin WebFetch, curl, descargar.mjs ni bolsa.mjs. Cifras de los resultados de búsqueda con la URL como fuente. **Confianza baja**: cuenta en base CCS de MarketScreener (coincide con la conciliación de Repsol de 2021-22), balance incompleto (sin circulante ni patrimonio de 2024-25), minoritarios del puente de 2023, gobierno sin IAGC/IARC, sin transacciones ni beta.
- Fecha de corte: 2026-10-14; precio 29,62 EUR (cierre del 13-oct, Bolsamanía/TradingView). Divisa EUR. Cierre de ejercicio: diciembre. Próximos resultados: 29-oct-26 (3T26).
- Decisiones: (1) la cuenta y el consenso en la misma base (MarketScreener); la deuda neta del puente es la del modelo nuevo de Repsol (3.667 M a jun-26, con arrendamientos). (2) 2026e fijo con +20 % de ventas y 15,5 % de margen (el 1S26 lo respalda), luego normalización a 13,0-13,6 %. (3) Circulante a 0 % (sin balance para medirlo). (4) Objetivo a 12 meses por EV/EBITDA 2028e en los tres casos, porque el PER de los años limpios es de pico (la regla daría 15 EUR); justificado en `objetivo_12m.comentario` y en la revisión.
- 14-oct, ~13:00 UTC: informe cerrado, 17 de 18 controles correctos y 1 explicado; Word y PDF (soffice, 36 páginas). Cobertura de campos 72 %.
- **Línea 12 m**: Vender, convicción media. Objetivo 23,46 EUR; ponderada −17,5 %, base −15,9 % (con dividendo); valor intrínseco 26,25 EUR (−11,4 %); consenso 28,51 EUR. Comprar < 21,25; Vender > 27,15. Detalle en revision-12m-2026-10-14.md. No apuntado con apuntar-12m.mjs (lo hace el integrador).

## Lecciones

- Petroleras integradas en el pico del ciclo: el PER histórico con BPA ajustado sale de beneficios de pico y la regla común da objetivos absurdos (base 5,7x); usar EV/EBITDA de mitad de ciclo en los tres casos y explicarlo. (Candidata a `lecciones-casos.md`, «cíclicas de materias primas».)
- Repsol cambió su modelo de información en 2025: el EBITDA ajustado nuevo (5.312 M en 2025) no es comparable con el CCS anterior (7.678 M en MarketScreener) ni la deuda neta (4.487 frente a 5.877 M). Fijar una base y decirlo.

- 2026-10-14: datos-v2.json = regla de múltiplos v3 con la historia del PER adelantada construida por herramientas/historia-adelantada.mjs (4 años; mediana 6.5x, mínimo 3.5x, media larga 6.5x; antes v2 5.7x/4.3x/5.7x). Solo cambian el objetivo a 12 meses y la señal; el Word no se regenera.
- 2026-10-14: datos-v2.json y «Repsol - 2026-10-14 v2.docx» regenerados con el motor vigente (herramientas/regenerar.mjs; METODO-VIGENTE.md), sin investigación nueva: v3 Vender -17,5 % (antes v3 Vender -17,5 %). Para comparar, con la regla v2 (historia al cierre, mismo precio): 3,1x / 4,0x / 4,5x, -17,5 % Vender. Decide la regla vigente (v3 con tope ×1,1; METODO-VIGENTE.md).
