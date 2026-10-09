# Diario — CSL Limited (CSL.AX), corte 2026-10-09

- Commit de partida: 01a558d (Informe de A. O. Smith). Prompt: verticales/empresa/prompt.md de ese commit.
- 10:21 Inicio. Fase 1: identificación.
  - CSL Limited, ASX CSL, ISIN AU000000CSL8, cotiza en AUD, cuentas en USD, AASB (NIIF), cierre 30-jun, etiqueta «fin» (FY26 = jul-25 a jun-26). Semestres.
  - Anuncios de la ASX 2022-2026 listados y resueltos a PDF con un script propio en %TEMP% (listado anual HTML + displayAnnouncement.do), 209 anuncios en `notas/anuncios_asx.tsv`.
  - Hechos clave leídos: FY26 ventas 15.212 M USD, NPATA subyacente 3.098 M (−2 % cc), pérdida estatutaria −2.579 M por 7.923 M de reestructuración y deterioros (Vifor); CEO McKenzie fuera (10-feb-26), Naylor interino; escisión de Seqirus aplazada sin fecha (junta oct-25); guía FY27: ingresos planos, NPATA +5 %, Vifor −25 %; Horizon 2 necesita ensayos (jul-26); cambio de Rika a Haemonetics (8-oct-26); bonos de 1.500 M USD (7-oct-26). Junta 27-oct-26; HY27 el 9-feb-27.
- 10:28 Lanzados los cuatro subagentes (A cuentas, B sector, C gobierno, D mercado) con `notas/ENCARGO_COMUN.md`.
- 10:39 Control a los 10 minutos: A 25 kB, B 5 kB, D 23 kB con contenido; C vacío (74 bytes): recordatorio enviado.
- 10:46-15:03 Corte por límite de uso. Las cuatro notas terminaron (A 10:40, B 10:41, D 10:46, C 10:58). Reanudo yo solo a las 15:03 sin relanzar subagentes.
- 15:17 Reanudado (sesión nueva). Escrito notas/propio.mjs (esqueleto con supuestos.mjs); integración y primer cálculo.
- 15:20 Primer cálculo: DCF 103,89 USD (−19 %), WACC 8,86 %, DCF inverso 6,5 % de crecimiento frente a 3,7 %. Pesos cambiados a DCF 55, escenarios 25, comparables 10, suma de partes 10 (EBIT de segmento FY26: Behring 14x, Seqirus 9x, Vifor 6x, costes centrales al 11,85x medio) = 88,54. VO 99,00 (−22,8 %); regla absoluta Vender, relativa Mantener → Mantener, convicción sugerida Baja. Redactando textos.mjs.
- 15:24 Textos (textos.mjs, resumen.mjs) escritos; revisión de comité hecha (cifras de calc, consenso ±7 %, bajista = márgenes de FY23-FY26). Controles: 15 correctos y 2 explicados. Mantener, convicción Baja (la sugerida). Genero Word y PDF.
- 15:26 Word y PDF generados (60 páginas, cobertura 92,4 %); páginas 1-4 revisadas como imagen; mercado de la portada acortado (la equivalencia del ADR no es fiable). Lecciones añadidas. Seguimiento y commit.
