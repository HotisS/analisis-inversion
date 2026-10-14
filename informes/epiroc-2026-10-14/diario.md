# Diario · Epiroc (EPI A) · 14-oct-2026

- Commit de partida: 4d8f28a («Seguimiento: regenerado»). Inicio ≈17:53 UTC; Word y PDF a las 18:17 UTC.
- Encargo: análisis value de la acción A (la más líquida) y la ficha sectorial corta «Equipos y servicios para minería» (`sectores/equipos-mineria-2026-10-14.md` y `-comparables.json`).
- **Fuentes**:
  - Cuentas 2020-2024 del XBRL ESEF (`cuentas.mjs --esef`), cotejadas con los informes anuales de 2021, 2023 y 2025.
  - 2025 y el primer semestre de 2026 de los informes de Epiroc (2T25 a 2T26), más el día del inversor y las juntas.
  - Precio y betas de `bolsa.mjs`.
  - Consenso y comparables de MarketScreener por WebFetch; curl da Access Denied.
  - Tipos de cambio del BCE y bono sueco del Riksbank.
- Notas A-E escritas por mí (`notas/construir-notas.mjs`); supuestos en `notas/supuestos.mjs`, textos en `notas/textos.mjs` y parte propia en `notas/propio.mjs`.
- **Comprobaciones del XBRL**:
  - Ingresos: completos.
  - Deuda: los «pasivos con interés» de Epiroc incluyen corto y largo plazo y también los arrendamientos. Se restan los arrendamientos (2.769 M a dic-25) y se tratan aparte en el puente.
  - Capex: el del XBRL omitía el inmovilizado material de 2022-2024 (concepto propio, InvestmentsInOtherPropertyPlantAndEquipment). Corregido con el estado de flujos.
  - Dividendo: el total anual, 3,80 SEK, en dos plazos de 1,90. El segundo tiene fecha de registro el 19-oct y se paga el 22-oct.
- **Decisiones**:
  - Sostenibilidad: la primera versión fallaba (capital nuevo al 32,3 % frente a un ROIC del 16,3 %). Bajé la senda de margen al 24,2 % final y metí ≈1,7 % de las ventas en compras de empresas (2027-2031, un punto de crecimiento en «otros»). Pasa al 18,8 %; veredicto «Sí».
  - Valor terminal: Gordon daba solo 7,3 veces el EBITDA. Usé la media de Gordon y de un múltiplo de salida de 13x; el DCF inverso pasa a ser calculable (26,3 %).
  - WACC 9,79 %: bono sueco 3,17 %, beta ajustada 1,19, prima 5,5 % + 0,5.
  - Pesos: DCF 40, escenarios 40, comparables 20. Las transacciones no pesan: no hay opa posible con Investor AB.
  - Bajista con perfil de ciclo (2028: −16 puntos de crecimiento y −3 de margen).
  - PER histórico adelantado sin exclusiones.
- **Resultado**:
  - 19 de 19 controles correctos; cobertura de campos del 88,8 %.
  - Word «Epiroc - 2026-10-14.docx» y PDF (soffice).
  - DCF 123,71 SEK; valor intrínseco 135,39 SEK (−49,7 %); ROIC 16,3 % frente a WACC 9,79 % (+6,5 puntos), calidad «Sí».
- **Línea a 12 meses**: v3 ponderada −7,8 %, base +2,1 % → **Mantener**, convicción media (selector: sin marcas, decide la v3). v2 −9,4 % / −3,1 %. Objetivo 244,68 SEK; precio 269,40 SEK (14-oct). Comprar por debajo de 135,39 y vender por encima de 276,09. Robustez SÓLIDA, acción robusta no mantener. Próximos resultados: 28-oct-2026.
- No se ejecutó `apuntar-12m.mjs` sin `--simular` ni `seguimiento.mjs`; sin commits (los hace el coordinador).
- Pendiente de confirmar:
  - el aviso D3 de robustez (el informe no está en `precios.json`, que es compartido y no se toca);
  - el desglose de arrendamientos a jun-26 (se usa el de dic-25);
  - el ROIC homogéneo de los comparables.

## Lecciones

- ESEF de Epiroc: el capex del XBRL no recoge el inmovilizado material de 2022-2024 (concepto propio InvestmentsInOtherPropertyPlantAndEquipment). Cuadrar siempre el capex con el estado de flujos.
- Suecas (Epiroc, Atlas, Sandvik): los «interest-bearing liabilities» incluyen los arrendamientos. Para la deuda financiera, restarlos y llevarlos aparte al puente.
- MarketScreener bloquea curl (Access Denied), pero WebFetch funciona. Los ID salen de la página de búsqueda (Atlas Copco 43306890, CAT 4817, Komatsu 6491329, Weir 9590176).
- Industrial sueco de calidad con WACC cercano al 10 %: Gordon con g = 2,5 % da un valor terminal de unas 7 veces el EBITDA, muy por debajo de cualquier transacción. La media con un múltiplo de salida evita un DCF inverso no calculable.
- Cíclicas: la regla v3 aplica en el bajista un PER menor sobre un BPA ya de fondo de ciclo (doble castigo). Con Epiroc no cambia la señal, pero conviene calcularlo aparte.
- Mining.com publica artículos de trimestres antiguos con fechas confusas: comprobar el año del trimestre.
