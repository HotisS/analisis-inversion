# Diario · Demant (DEMANT.CO) · 14-oct-2026

- Commit de partida: 75628ac. Entorno: nube de Claude Code con red abierta (cuentas.mjs --esef, bolsa.mjs, descargar.mjs, WebSearch/WebFetch). Notas A-E y propio hechos por mí sin subagentes (`notas/construir-notas.mjs` escribe A-E; `propio.mjs` + `supuestos.mjs` + `textos.mjs`), como Kuehne+Nagel.
- Fecha de corte 2026-10-14; divisa DKK; ejercicio natural. Precio 354,80 DKK, cierre del 14-oct (Yahoo). Próximos resultados: IMS del 3T26 el 3-nov-2026.
- Fuentes primarias: ESEF 2022, 2023, 2025 y 1S26 (filings.xbrl.org), informe anual 2025 (202 págs.), informe del 1S26, IMS del 1T26 y 3T25, anuncio de mejora de guía y recompras del 9-oct-2026, KIND, EPOS, Oticon Medical, junta, consejo, directivos, calendario, FDA (AirPods Pro). Consenso y objetivos de MarketScreener (20 analistas). Comparables de los análisis de Cochlear (8-oct) y Coloplast/Straumann (12-oct) llevados al cierre del 14-oct con los precios de Yahoo; Amplifon de MarketScreener.
- **Confianza de los datos: media.** Cuentas del regulador completas y cuadradas; falta el margen del 3T26 (3-nov), la remuneración individual y los votos de la junta. Sentimiento con confianza baja (pocas fuentes de foro en tres meses).
- Decisiones:
  - Actividades continuadas (fuera EPOS y Oticon Medical; implantes reexpresados desde 2022). BPA de la actividad continuada.
  - ESEF solo etiqueta `LongtermBorrowings`; la deuda a corto (`ShorttermBorrowings`) se sumó a mano: deuda financiera 9.217 / 12.696 / 11.768 / 12.910 / 17.605 M (2021-2025); a 30-jun-26, 10.571 + 6.337.
  - Partidas especiales dentro del EBIT → `no_recurrentes_en_ebitda` (2024 −124; 2025 +128; LTM 344). Asociadas dentro del EBIT → `participadas_en_ebitda`.
  - Sin dividendo: devuelve caja con recompras (3.000 M anunciadas el 9-oct) → acciones 202,5 M en 2028e.
  - 2026e fijado con la guía mejorada (+15,5 % con KIND, margen EBITDA 23,6 %); 2027-2032 del 7 % al 4,5 %, margen hasta el 26,3 %. Capex 7 % con derechos de uso. WACC 7,69 % (Bund 3,48 %, beta 1,0, prima 5,5 %). Pesos DCF 40 / comparables 20 / escenarios 40.
  - Comparables: Sonova, Cochlear, Straumann, Coloplast y Amplifon (solo PER). GN fuera (pérdidas tras vender GN Hearing a Amplifon). Transacciones: Amplifon–GN Hearing (14,3x EBITDA) y Demant–KIND.
- Resultado: DCF 289,16 DKK (−18,5 %); valor intrínseco 303,60 (−14,4 %); con la prima del mercado 369,86. DCF inverso: 10,5 % anual de crecimiento implícito frente al 5,8 % del base. ROIC 11,1 % frente a WACC 7,69 % (≈ 3,4 puntos): calidad **En parte**. Sostenibilidad **En parte** (cuota del 16,6 % al 19,1 % en 2032).
- **Línea 12 m (selector → v3 ×1,1, «sin marcas»)**: objetivo 395,16 DKK, ponderada +11,4 %, base +19,2 %; v2 +12,9 % / +13,2 %. **Mantener**, convicción baja. Comprar < 303,60; vender > 439,06. Detalle en revision-12m-2026-10-14.md. `apuntar-12m.mjs --simular`: «DEMANT: v3 ponderada 11.4%, base 19.2% → Mantener (v2: 12.9% Mantener)».
- Robustez (sin `--escribir`): **FRÁGIL**; acción robusta «no mantener» (con BPA de consenso, 9,2 %; doble penalización del bajista; colchón de BPA del 2 %). D3 aviso: sin cierre en precios.json (coordinador).
- Word y PDF (soffice, perfil /tmp/lo-demant): 40 páginas, 28 gráficos, cobertura 87 %; 18 de 19 controles y 1 explicado (regresión múltiplo-crecimiento, R² 0,27).
- Ficha sectorial hecha: `sectores/audifonos-2026-10-14.md` (+ `-comparables.json`).
- Tiempo: unos 45 minutos de trabajo efectivo (17:33 UTC de inicio aproximado, con una interrupción por contexto).

## Lecciones

- ESEF de Demant (y probablemente otras danesas con IFRS): solo `LongtermBorrowings` sale en `cuentas.mjs`; la deuda a corto (`ShorttermBorrowings`) hay que buscarla en el xBRL-JSON y sumarla a mano; sin ella la deuda neta sale muy corta.
- Cuando la empresa vende negocios (EPOS, Oticon Medical), usar el BPA de la actividad continuada y las cifras reexpresadas del informe siguiente; el BPA total mezcla plusvalías y pérdidas de lo vendido.
- Si las partidas especiales están dentro del EBIT, van a `no_recurrentes_en_ebitda` y la historia del PER se hace con el BPA ajustado, la misma base que el BPA 2028e.
- MarketScreener tiene varias fichas «Demant»: comprobar el código (DEMANT-A-S-56225597) antes de copiar consenso.
- La página de la FDA da 401 con WebFetch; `descargar.mjs` sí la baja.
