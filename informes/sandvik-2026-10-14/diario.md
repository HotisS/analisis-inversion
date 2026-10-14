# Diario · Sandvik (SAND) · 14-oct-2026

- Commit de partida: 79d88a3 («Seguimiento: regenerado»). Inicio ≈20:45 UTC; Word y PDF a las 20:59 UTC (más textos y comprobaciones hasta ≈21:05).
- Encargo: análisis value completo, sin subagentes; ficha sectorial reutilizada (`sectores/equipos-mineria-2026-10-14.md`), comparación expresa con Epiroc (`informes/epiroc-2026-10-14/`).
- **Fuentes**:
  - XBRL ESEF 2020-2024 (`cuentas.mjs --esef "Sandvik"`): sirve para cotejar; la cuenta usada es la de operaciones continuadas de los informes del 4T22, 4T23 y 4T25 (sin Alleima).
  - Informe anual 2025 (resumen de diez años, fondo de comercio, consejo, remuneración, accionistas), trimestrales 2T25-2T26 y proforma de Machining e Intelligent Manufacturing.
  - Precio y betas de `bolsa.mjs` (SAND.ST, ^OMX). Consenso y objetivos de MarketScreener por WebFetch. Comparables de la ficha sectorial (sin Sandvik).
  - Foro de Nordnet (WebFetch) para el sentimiento.
- **Comprobaciones del XBRL** (`cuentas.mjs --esef` corregido):
  - Aviso de `gastos_generales` incompleto (solo comerciales): rehecho con comerciales + administración + I+D + otros, que cuadra con el EBIT publicado.
  - Deuda: el XBRL suma los pasivos con interés con arrendamientos (42.755 M en 2024). Se usa la tabla de deuda neta de Sandvik (sin pensiones ni arrendamientos: 36.644 M en 2024) y los arrendamientos aparte.
  - 2020-2021 del XBRL mezclan Alleima (ingresos 2021 ya reexpresados, beneficio con discontinuadas): se usan los reexpresados del 4T22 y se deja fuera 2020.
  - Dividendo por devengo correcto (5,00 / 5,50 / 5,75; 6,00 por 2025).
- **Decisiones**:
  - BPA de la regla en base **ajustada** (sin partidas que afectan a la comparabilidad), igual que la historia: el publicado de 2022-2024 lleva Alleima, Rusia y deterioros de 3.090 M. En el DCF las partidas recurrentes van dentro del margen.
  - Tungsteno: efecto temporal de 550 M en el 2T26 y 200 M previstos en el 3T26. Nuestro 2027-2028 no lo repite (EBITA ajustado del 21,2 %): BPA un 12-13 % bajo el consenso.
  - Sostenibilidad: reinversión < 15 % del NOPAT, prueba a mano (crecimiento = precio + compras dentro del capex + volumen pequeño); veredicto «Sí». `mercado_final` null (dos mercados).
  - WACC 10,20 %: bono sueco 3,17 %, beta 1,30 (mensual ajustada 1,38, semanal ajustada 1,27), prima 5,5 % + 0,5. Terminal: media de Gordon 2,5 % y 12 veces el EBITDA.
  - Circulante del 34 % (definición del motor; Sandvik publica un 27,5 % con otra definición).
  - Pesos DCF 40, escenarios 40, comparables 20; transacciones 0. Suma de partes solo como lectura (Mining a múltiplos de Epiroc).
  - Calidad: ROIC 12,0 % frente a WACC 10,20 % (+1,8 puntos); sin fondo de comercio 18,7 %. Veredicto «En parte»: no pasa el filtro de mantener (4,5 puntos).
- **Resultado**:
  - 17 de 18 controles correctos y 1 explicado (comparables frágiles); cobertura de campos del 86 %.
  - Word «Sandvik - 2026-10-14.docx» y PDF (soffice, 37 páginas).
  - DCF 222,34 SEK; valor intrínseco 262,84 SEK (−28,0 %). DCF inverso: 16,4 % de crecimiento o 35,1 % de margen; rentabilidad implícita 6,2 %.
- **Línea a 12 meses**: v3 ponderada −6,9 %, base −0,6 % → **Mantener**, convicción media (selector: sin marcas, decide la v3). v2 −12,4 % / −13,0 % (Vender). Objetivo 333,94 SEK; precio 365,00 SEK (14-oct). Comprar por debajo de 262,84 y vender por encima de 377,71. Robustez SÓLIDA, acción robusta no mantener. Próximos resultados: 22-oct-2026; día del inversor 24-25 de noviembre.
- No se ejecutó `apuntar-12m.mjs` sin `--simular` ni `seguimiento.mjs`; sin commits. SAND no está en `verticales/empresa/simbolos.json` ni en `precios.json` (archivos compartidos: aviso D3; lo añade el coordinador).
- Pendiente de confirmar: vencimientos de deuda y rating; fondo de comercio de 2021-2023; operaciones de directivos (Finansinspektionen); cifra primaria del mercado de herramientas de corte; datos de Kennametal.

## Lecciones

- ESEF de Sandvik: `deuda_financiera` incluye los arrendamientos y los años 2020-2021 mezclan Alleima. Usar la tabla «Net debt» del 4T de cada año y la cuenta reexpresada de operaciones continuadas.
- Cuando el BPA publicado lleva escisiones y deterioros grandes (Sandvik 2022-2024), la historia del PER y los escenarios en BPA ajustado de la empresa, los dos en la misma base, y decirlo.
- Efectos temporales de materias primas en el margen (tungsteno en Sandvik): la empresa los cuantifica en el trimestral; restarlos del margen proyectado y del BPA de los años siguientes.
- Cíclico doble (minería + herramientas): M4 salta por construcción (BPA bajista −30 % y PER mínimo); la variante sin doble castigo no cambia la señal.
