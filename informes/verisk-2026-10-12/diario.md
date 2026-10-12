# Diario — Verisk Analytics, Inc. (VRSK), corte 2026-10-12

- Commit de partida: 5d3dc20 (Informe de Pro Medicus…). No se cambia de versión del prompt durante el análisis. Sin git pull, commit ni push (lo hace el usuario).
- Fecha de corte: 2026-10-12 (lunes). Al lanzar, la sesión de EE. UU. no ha cerrado: precio = cierre del viernes 9-oct-2026 (lo confirma bolsa.mjs).
- Primer análisis de Verisk en el repo (no hay iteraciones anteriores). Comparables con el mismo método: S&P Global (12-oct), Equifax (8-oct), Gartner (11-oct), Wolters Kluwer (8-oct).

## Fase 1 — Identificación
- Verisk Analytics, Inc., Nasdaq Global Select: VRSK, CIK 1442145, Delaware, sede 545 Washington Boulevard, Jersey City (NJ). ISIN US92345Y1064 (a confirmar por D).
- Divisa de cuentas y de cotización: USD (tipo de cambio 1). Ejercicio natural (cierre diciembre, etiqueta «fin»). US GAAP. Un solo segmento de información (Insurance) con dos líneas de ingresos: Underwriting y Claims.
- 2T26 (8-K 29-jul-2026): ingresos 806 M (+4,3 %; +5,8 % OCC), EBITDA ajustado 464 M (57,5 %), BPA diluido 1,75 USD, ajustado 1,98. Guía 2026 sin cambios: ingresos 3.190-3.240 M, EBITDA ajustado 1.790-1.830 M (56,0-56,5 %), BPA ajustado 7,45-7,75, capex 260-280 M, intereses 190-200 M. Dividendo trimestral 0,50 USD. Recompras 1.900 M en 1S26 (8,5 M acciones a 186,32 USD), ASR de 200 M en 2T26 a 179,10 USD inicial; quedan 800 M de autorización.
- Hechos relevantes: compra de AccuLynx (2.350 M, julio 2025) terminada por Verisk el 26-dic-2025; AccuLynx sostiene que la terminación no es válida; Verisk recurrió al Tribunal Supremo de Delaware el 18-ago-2026 (8-K): hay una sentencia de la Court of Chancery desfavorable que C debe leer. Bonos de 1.500 M emitidos para la compra, amortizados al 101 % en enero de 2026. Préstamo puente de 500 M (feb-2026) para recompras aceleradas. Salidas: CIO Nick Daffan (ago-2026), jefa de RR. HH. Sunita Holzer (anunciada sep-2026).
- Perímetro: desinversiones de Energy (Wood Mackenzie, feb-2023), Verisk Financial Services (2022), 3E (2023) y otras; la serie de cuenta va con operaciones continuadas reexpresadas (10-K) y se declaran los cambios en `cambios_perimetro`.
- Próximos resultados (3T26): fecha a confirmar por D (2025: 29-oct).

## Subagentes
- Lanzados A-E en un solo mensaje, en primer plano.
- Los cinco terminaron (A 14 min, B 10, C 10, D 12, E 4,5). Notas completas, sin caracteres mal codificados. E sin voz de particulares (Stocktwits y Reddit 403).
- Hallazgo clave (C, A, D): el 7-ago-2026 la Court of Chancery de Delaware declaró inválida la terminación de AccuLynx, ordenó a Verisk intentar cerrar la compra (2.350 M, sujeta aún a la FTC) y le impuso 3,85 M de daños; Verisk recurrió al Supremo el 18-ago. Sin provisión en el 10-Q (anterior al fallo). Sentencia no leída (hueco).

## Integración, cálculo y valoración
- Supuestos en notas/propio.mjs (+ textos.mjs). DCF de 10 años: 2026e fijo (+4,8 %, 3.220 M = consenso y centro de la guía; 2025 incluye 68 M de Marketing Solutions vendida), 6,5-6,8 % en 2027-2028 y bajada a 3,5 %; margen 56,3 % → 58 %; capex 8,4-8,5 %; amortización 10,9 % → 8,5 %; circulante −11 %; impuestos 23,5 %; terminal Gordon 3,5 % (explicado).
- WACC 8,75 % (bono 5,24 %, beta mensual 5 años ajustada 0,79, prima 5,5 %, Kd 5,8 %, deuda 16,2 %). DCF 188,14 USD (VT 64 %). DCF inverso: 4,8 % de crecimiento y 55,6 % de margen frente a 5,5 % y 58 % del base; rentabilidad implícita 9,0 %.
- AccuLynx: 300 M de coste esperado en `otros_ajustes` (estimación propia: 50 % × 25 % de sobreprecio sobre 2.350 M + costes legales, ≈ 2,30 USD/acción). Sin él, la regla daba Comprar con 5,1 % absoluto (en el límite del 5 %); con él, Mantener.
- Proyección frente al consenso: 0,0 / −0,2 / −0,1 % en ingresos 2026-2028.
- Resultado: valor objetivo 182,74 USD (+2,9 %), rentabilidad total 3,9 %; alcista 243,38 (+37,0 %), bajista 127,32 (−28,3 %), asimetría 1,31. Regla absoluta Mantener, relativa Comprar (214,96, +22,1 %) → Mantener, convicción Baja (sugerida). Pesos: DCF 40, comparables 25, escenarios 35, transacciones 0.
- Controles en «Revisar»: 2, explicados (terminal 3,5 % y regresión R² 0,03). Avisos de rellenar: suma de partes sin filas (no aplica, monosegmento) y gráfico de tamaño de mercado sin serie.
- Word: Verisk - 2026-10-12.docx; PDF de 62 páginas, Word lo abre sin reparar. Revisadas como imagen portada y «La decisión».

## Lecciones nuevas
- **Litigios de M&A con cumplimiento forzoso** (AccuLynx): el 10-Q puede ser anterior al fallo y no dotar provisión; el coste no es el precio de compra (se recibe el negocio) sino el sobreprecio. Lo pusimos como coste esperado en `otros_ajustes`, explicado; en Verisk ese ajuste cambió la regla de Comprar (5,1 % absoluto, en el umbral) a Mantener. Sería útil un campo de contingencias probabilizadas en el puente.
- **`_parches` no llega a `meta.huecos`**: integrar junta los huecos después de aplicar los parches. Para corregir el texto de un hueco de una nota, retíralo con `huecos_resueltos` y añade el tuyo en `huecos` con otro nombre de campo.
- **Patrimonio negativo por recompras** (Verisk, −1.189 M): ROE sin sentido y ROIC incremental no calculable; el ROIC sube por la rotación (venta de Energy y recompras), no por el margen. Dilo en `rentabilidad`.
- **EBITDA ajustado que no excluye la remuneración en acciones** (Verisk): `base_ebitda: "NIIF"` vale si las partidas puntuales (costes de compras y litigios) van en `no_recurrentes_en_ebitda`, también en el LTM.
