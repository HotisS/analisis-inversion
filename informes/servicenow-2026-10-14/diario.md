# Diario · ServiceNow (NOW) · 14-oct-2026

- Commit de partida: 074d579; se actualizó a 0ab5dfd (regla de múltiplos v3, ficha sectorial corta) antes del cálculo, por aviso del coordinador.
- Entorno: nube de Claude Code. Solo funciona WebSearch (unas 25 búsquedas); WebFetch, curl, descargar.mjs y bolsa.mjs no. Todas las cifras salen de extractos de búsqueda (8-K y 10-Q de la SEC, ARS, Stock Analysis, Macrotrends, TipRanks, Simply Wall St, Google Finance), con la URL como fuente.
- Fecha de corte 2026-10-14; precio de cierre del 13-oct (138,61 USD). Divisa USD, cierre en diciembre, US GAAP. Acciones y precios ajustados por el desdoblamiento de 5 por 1 de dic-2025.
- **Confianza de los datos de núcleo: Baja.** La cuenta 2021-2025 cuadra entre fuentes (ingresos, EBIT, beneficio, BPA, amortizaciones; los trimestres suman el año), pero el balance está incompleto (sin 2021; sin caja ni patrimonio de 2024) y la caja e inversiones de 2025 (9.700 M) es estimación propia derivada del 10-Q del 2T26. Para pasar a Comprar habría que confirmar con el 10-K 2025 y el 10-Q del 2T26: balance completo, caja e inversiones, patrimonio a junio y el ROIC tras Armis.
- Fuentes reutilizadas del repositorio: tabla de comparables de software a 9-oct-2026 (informe de Adobe) y fila de Salesforce (su informe del 12-oct); competidores con XBRL del informe de Salesforce; bono a 10 años y prima de Damodaran del informe de Group 1 del mismo día.
- Decisiones: BPA y EBITDA en base GAAP (remuneración en acciones como gasto); circulante del −40 % de las ventas (ingresos diferidos); base que llega al plan de la empresa de ≈30.000 M en 2030; beta 1,25 de los editores de software del repositorio; pesos DCF 45 / escenarios 45 / comparables 10. Sostenibilidad «En parte» sin rebaja del base (ninguna prueba numérica falla; la de cuota no es aplicable con un mercado accesible heterogéneo). Convicción Baja en vez de la Media sugerida por la confianza de los datos.
- Ficha sectorial: no existe `sectores/` para software y el encargo prohíbe escribir fuera de la carpeta; el sector se hizo dentro del informe con una sola fuente de tamaño (hueco registrado).
- 15:31 inicio; 15:49 Word (41 páginas) y PDF con soffice; 20 controles: 18 correctos y 2 explicados (tipo impositivo de 2023, Workday en comparables).
- **Línea 12 m (regla v2; v3 no aplicable):** objetivo 163,06 USD, ponderada +17,6 %, base +27,5 % (176,69), bajista 106,79, alcista 206,04 → Mantener (valor intrínseco 76,82 < precio; confianza baja). Comprar < 76,82; vender > 181,18. Detalle en revision-12m-2026-10-14.md.

## Lecciones

- **PER adelantado GAAP en empresas con el margen en rampa** (software con remuneración en acciones del 15-18 % de las ventas): la historia adelantada (103-127x) no es comparable con el PER actual (59x) y, con la v3, el base subiría a ≈83x. Se excluyeron todos los años y el motor cayó a v2. Convendría decidir si estas empresas van en base no GAAP o con otra métrica (EV/FCF).
- 2026-10-14: datos-v2.json y «ServiceNow - 2026-10-14 v2.docx» regenerados con el motor vigente (herramientas/regenerar.mjs; METODO-VIGENTE.md), sin investigación nueva: v2 Mantener 17,6 % (antes v2 Mantener 17,6 %).
