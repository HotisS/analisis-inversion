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

## Actualización v2 (13 oct 2026): sostenibilidad del crecimiento

Sin investigación nueva. Script: `notas/actualizacion-v2.mjs` (parte de `datos.json`), salida `datos-v2.json`, `CSL - 2026-10-09 v2.docx` y su PDF. Mismo precio (128,30 USD = 183,84 AUD) y fecha de corte. La prueba no pasa entera y, con la lectura prudente del 13-oct, el recorte va dentro de esta misma versión.

| | v1 | v2 |
|---|---|---|
| Recomendación · convicción | Mantener · Baja | Mantener · Baja (la sugerida también es Baja) |
| DCF (WACC 8,86 %) | 103,89 USD | 101,84 USD |
| Valor objetivo (nuestro WACC) | 99,00 USD, RTE −20,6 %, asimetría −0,02x | 97,37 USD, RTE −21,8 %, asimetría −0,06x |
| Objetivo con la prima del mercado (WACC 8,0 %) | 117,00 USD, RTE −6,5 %, asimetría 0,63x | 115,04 USD, RTE −8,1 %, asimetría 0,54x |
| Regla absoluta / relativa | Vender / Mantener | Vender / Mantener (manda la relativa) |
| Comprar por debajo de / vender por encima de | 97,02 / 132,07 USD | **95,42 / 129,50 USD** (+0,9 % sobre el precio) |
| DCF inverso | 6,5 % de crecimiento o 40,5 % de margen | 6,8 % o 40,4 % |
| ¿La calidad sostiene el crecimiento? | — | **En parte** (3,7 % anual; reinversión del 14 % del NOPAT) |

- **Veredicto «En parte», decidido antes de calcular.** Volumen, sí: la Ig crece un 9 % anual en toneladas y, con Behring al 5 % y el mercado al 7 %, su cuota bajaría del ≈30 % al ≈23 % en FY2036e (a mano); la capacidad se pagó en FY17-FY23 (capex del 12-16 % de las ventas). Precio, no: parte D de Medicare, nación más favorecida, albúmina en China, Kcentra. Puente FY2027e-FY2031e: −0,3 = 3,8 + 0 − 4,1 (Vifor −25 % y divisa); 3,8 = 3,5 + 0,5 − 0,2; 5 = 4 + 0,5 + 0,5 (tres años). Reparto, estimación propia.
- **Supuesto cambiado (recorte mínimo)**: margen EBITDA 35,2 % en FY2030e y 35,5 % en FY2031e-FY2036e → **35,0 %** desde FY2030e: la guía de ahorros (≈550 M brutos, la mitad reinvertidos) da ≈275 M netos, ≈1,7 puntos sobre el 33,4 % subyacente de FY26; el medio punto restante no tenía apoyo en la guía ni en el poder de precios. Escenarios: márgenes finales 32,0 / 35,0 / 37,0 % (antes 32,5 / 35,5 / 37,5). Crecimiento sin cambios: con 0,5 puntos menos de crecimiento la prueba de reinversión casi no se mueve (baja también el circulante) y deja la regla relativa en el umbral de venta (−10,1 %).
- **Prueba de reinversión a mano** (el motor la omite porque la reinversión, 6.064 M, es el 14 % del NOPAT, < 15 %): al ROIC subyacente sobre capital sin intangibles (≈19 %), financia ≈2,7 % anual, más ≈0,4 puntos de precio, frente al 3,7 % proyectado; al ROIC del grupo (≈12-14 %), ≈2 %. La diferencia la cubre la capacidad ya construida (330 centros, ≈10 % más de plasma por donación, Lengnau deteriorado por exceso de capacidad); no es un base optimista en ventas, que coinciden con el consenso (0-0,9 %). Si el capex no baja del 7,5 % de las ventas, la prueba pasa, pero la recomendación cambia a Vender: queda como riesgo, no como base.
- **La recomendación no cambia pero queda en el borde**: vender por encima de 129,50 USD, un 0,9 % sobre el precio. Dicho en la síntesis.

**Fallos del sistema vistos**
1. Con una reinversión < 15 % del NOPAT el motor no calcula el crecimiento financiable ni el rendimiento del capital nuevo y escribe «sin inversión neta» y «activos ligeros» aunque haya 6.064 M de reinversión y un circulante del 42 % de las ventas.
2. El ROIC del último ejercicio (−7,5 %) sale de la pérdida por 7.079 M de deterioros: si la reinversión pasara del 15 %, la prueba usaría ese ROIC (financiable negativo, capital nuevo al 105 %). Falta un ROIC subyacente (`rentabilidad.roic_subyacente`) para la prueba.
3. La cuota (≈30 %) es de Behring en proteínas plasmáticas y el DCF es del grupo: `mercado_final` en null, como en Cooper o CAF.
- 13-oct-2026: revisión v2 a 12 meses (PER propio × BPA propio): objetivo 132,50 USD (189,86 AUD; ponderado; base 135,62), rentabilidad +5,6 % (base +8,0 %), señal Mantener (`revision-12m-2026-10-13.md`).
