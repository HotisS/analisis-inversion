# Diario — Evolution AB (EVO.ST), corte 2026-10-08

- Commit de partida: f7a4a60 (Informe de LVMH). Prompt sin cambios durante el análisis.
- Inicio: 22:48 (hora local del equipo).

## Fase 1 — Identificación (22:48-22:58)
- Evolution AB (publ), Nasdaq Stockholm, ticker EVO (Yahoo EVO.ST), ISIN SE0012673267. Cuentas en EUR (miles), NIIF-UE, cierre a 31 de diciembre. Cotiza en SEK.
- Próximos resultados: 23-oct-2026, informe enero-septiembre 2026 (calendario financiero de evolution.com).
- Descargados en notas/docs: informe anual 2025, informes trimestrales 1T25-2T26 y presentaciones 4T25-2T26 (todo por storage.mfn.se, sin cortes).
- 2T26: ingresos 517,8 M EUR (-1,2 %), EBITDA 341,0 M (65,9 %). 2025 lleva 51,7 M de «otros ingresos de explotación» (a revisar: no recurrentes).

## Fases 2-4 — Subagentes (lanzados a las 22:50)
- A (cuentas), B (sector), C (gobierno), D (mercado) a la vez, con la regla de carpetas y las notas guardadas desde el principio.
- 23:01, control de los 10 minutos: A, C y D con contenido real (A: cuenta 2019-2025, balance, flujos, trimestres; C casi completo; D: identificación, consenso parcial y bolsa). B solo con negocio descriptivo; sector y competencia en curso.
- 23:10 aprox., C termina (57 llamadas, 9 min). Hallazgo central: Kenneth Dart (Candle Lake) superó el 30 % el 24-jul-2026 **por las recompras de la propia Evolution** y lanzó una OPA obligatoria a 695 SEK, que el consejo recomendó rechazar; solo acudió el 0,06 %. Queda con el 31,6 % (33,8 % con swaps): accionista de control de hecho.
- D: cierre del 8-oct = 809,0 SEK (gráfico de Yahoo); acciones en circulación 182,10 M a 2-oct tras amortizar 16,17 M en septiembre; recompras de 828,0 M EUR entre el 1-jul y el 2-oct (van al puente). Galaxy Gaming rescindida el 21-jul (5,23 M USD). Sin dividendo por 2025.
- Mientras: propio.mjs (esqueleto), comprobada la prima de Damodaran (última fila: S&P 7.652, bono 5,29 %, ERP sostenible 4,20 %).
- 23:12-23:15, terminan A (71 llamadas, 11 min), B (87 llamadas, 11 min) y D (118 llamadas, 16 min). Sin cortes de red en los subagentes.

## Integración y primer cálculo (23:15-23:25)
- Primera integración: 88 fuentes, 19 huecos, todas las citas con fuente. Primer cálculo con supuestos: DCF 82,68 EUR (WACC 10,19 %), regla absoluta Mantener y relativa Comprar.
- Comparables: fuera Flutter y Betsson (operadores B2C, clientes de Evolution; Betsson con salto de definición del EBITDA en MarketScreener).

## Corte por límite de uso (≈23:25 del 8-oct → 09:27 del 9-oct)
- Un límite de uso paró la sesión mientras redactaba los textos. Se reanuda a las 09:27 del 9-oct sin relanzar subagentes: las cuatro notas estaban completas. La fecha de corte sigue siendo el 8-oct, con su cierre (809,0 SEK).

## Redacción, revisión y entrega (09:27-09:35 del 9-oct)
- Textos en notas/textos.mjs y notas/resumen.mjs; supuestos en notas/supuestos.mjs. Integración final: 88 fuentes (53 primarias), 83 citadas, 18 huecos. Controles: 13 correctos y 5 explicados, ninguno sin explicar.
- Supuestos: 2026e fijo en 2.080 M (+0,65 %) y margen del 65,8 %; 2027e +4,5 % (consenso +6,0 %); margen 65,5 % → 65,0 %; capex con arrendamientos 7,7 % → 7,0 %; circulante 21 %; impuestos 16,5 %. WACC 10,19 % = Bund 3,57 % + beta 1,03 (STOXX 600 ajustada; OMXS30 1,04, viajes y ocio 0,97, BETZ 0,81; la semanal de 2 años, 0,1-0,3, descartada) × 5,5 % + 1 punto por el 51 % de ingresos sin regulación local. Terminal 2,5 %. Sin etapa de transición (ROIC 31 % la permitiría; se descarta por el +0,2 % de 2025 frente al +13,6 % del mercado).
- Resultado: DCF 82,68; escenarios 57,91 / 82,68 / 98,75 (25/50/25); comparables 81,33; objetivo 81,50 EUR (+12,8 %). Absoluta Mantener, relativa Comprar (95,80 EUR, +32,6 %). Comprar con convicción baja. DCF inverso: 1,7 % de crecimiento implícito.
- Revisión de comité: el Comprar depende de la tasa (cifras a −0,6/−3,5 % del consenso de EBITDA) → convicción baja, dicho en la síntesis. Bajista verosímil (Asia −9,6 % en un trimestre en 2025). Se quitaron dos afirmaciones sin fuente (costes de separación de Playtech; Pragmatic «compite en precio») y el precio se ajustó a 72,2709 EUR para que la portada dé 809,00 SEK como la síntesis.
- Word (59 páginas, 27 gráficos, cobertura 92,1 %) y PDF; revisadas como imagen la portada, la síntesis, el resumen con «La decisión» y la síntesis de valoración.

## Fallos del sistema
1. **Límite de uso a mitad de la redacción** (≈23:25 → 09:27). Nada se perdió porque las notas y los .mjs estaban en disco. Arreglo propuesto: que el integrador escriba textos.mjs por bloques (primero DCF y valoración, luego riesgos, luego resumen) y reintegre tras cada uno.
2. **bolsa.mjs sin el cierre del día de corte** en valores nórdicos a las 22:50: D tuvo que sacarlo del gráfico de 5 días de Yahoo. Arreglo: que bolsa.mjs pida también `range=5d` al endpoint de gráfico y use `regularMarketPrice` si la sesión ya cerró.
3. **Un hueco con nota de trabajo** («tarea del subagente de mercado») pasó a meta.huecos; se corrigió a mano en A.json. Arreglo: que el aviso de integrar.mjs diga también qué nota lo trae.
4. **La capitalización publicada no descuenta recompras recientes** (Stock Analysis con 190,47 M de acciones frente a 182,10 M): control en «Revisar» explicado. Arreglo: tolerancia del control ligada a las recompras declaradas en el puente, o anotar la fecha de las acciones del proveedor.
5. **Ningún subagente tenía en su encargo los avisos de OPA y umbrales**: A, C y D encontraron por separado la OPA de Candle Lake y D avisó por mensaje. Arreglo: añadir al encargo de C «comunicados de umbrales y ofertas públicas de 12 meses».
6. **Los comparables operadores (Flutter, Betsson) entraron en la lista de D** pese a no ser comparables y Betsson con un salto de definición de EBITDA; se quitaron en propio. Arreglo: en el encargo de D, que los operadores B2C vayan en el texto y no en la tabla cuando la empresa es B2B.
- Fin: 09:35. Tiempo total efectivo ≈ 45 min (22:48-23:25 y 09:27-09:35).
- 2026-10-14: datos-v2.json y «Evolution - 2026-10-08 v2.docx» regenerados con el motor vigente (herramientas/regenerar.mjs; METODO-VIGENTE.md), sin investigación nueva: sin objetivo a 12 m.
