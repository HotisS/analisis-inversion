# Diario · The Hershey Company (HSY, NYSE) · 14-oct-2026

- Commit de partida: 41eed8d. Sin commits ni push (lo hace el coordinador). Inicio 20:29 UTC.
- Entorno: nube de Claude Code, sin subagentes. Notas A-E con `notas/construir-notas.mjs`; parte del analista en `propio.mjs` + `supuestos.mjs` + `textos.mjs` (mismo formato que Lindt y Kuehne+Nagel).
- Documentos primarios (descargar.mjs y curl a EDGAR, en `notas/docs/`): 10-K 2025, 2022 y 2020; 10-Q 2T26; comunicados del 4T18 al 4T25 y de 1T25-2T26; 8-K de 2026 (día del inversor de marzo, guía, votos de la junta); proxy 2026. Formularios 4 con form4.mjs.
- Bolsa: bolsa.mjs con HSY, ^GSPC y XLP. Precio 164,25 USD (cierre del 14-oct-2026); máximo de 52 semanas 239,48, mínimo 156,16; beta mensual 0,09 (ajustada 0,39), así que el WACC usa beta 0,65 (Damodaran Food Processing 0,61, desapalancada 0,47).
- **Base del BPA: ajustado** (sin derivados de cacao a valor razonable, reorganización, compras ni deterioros), la de la guía y el consenso. Cuenta del XBRL con la diferencia entre beneficio operativo ajustado y publicado en no recurrentes (2024 −303 M, 2025 +529 M). Controles de BPA = beneficio/acciones explicados.
- **Deuda**: cuentas.mjs solo sumaba la deuda a corto en 2021-2025; rehecha con companyfacts y la nota 4 del 10-K: 5.403 M en 2025 y 5.610,7 M a 28-jun-2026 (corto 421,5 + parte corriente 504,2 + largo 4.685,0). Arrendamientos operativos fuera (US GAAP).
- **Confianza de los datos: media-alta.** Cuentas primarias (XBRL y 10-K/10-Q). Consenso de una sola fuente gratuita (Stock Analysis; MarketScreener da la ficha inactiva), sin 2028 ni reparto de recomendaciones. Faltan: rating de la deuda, calificaciones ESG, consenso previo trimestral y cuentas de Mars y Ferrero. Tasa libre 5,21 % (FRED DGS10, 13-oct).
- Decisiones: 2026e fijo con la guía de julio (ventas +4,5-5 %, BPA 8,36-8,52). Ciclo del cacao: margen EBITDA ajustado 25,0 % en 2026 → 27,5 % en 2031, por debajo del 28 % de 2023 porque parte del cacao barato se devuelve en precio. GLP-1, snacks salados (9 % del resultado) y marca blanca: volumen −3 % en 2026 y +1-1,5 % después. Sostenibilidad «Sí». Pesos DCF 50 / comparables 20 / escenarios 30. Suma de partes no aplica.
- Resultado: DCF 174,17 (+6,0 %), WACC 8,05 %, valor terminal 68 %; escenarios 122,03 / 174,17 / 200,09; **valor intrínseco 173,69 (+5,7 %)**. DCF inverso: 2,2 % de crecimiento implícito (base 3,1 %). Con la prima del mercado (4,2 %): 196,80. ROIC 15,8 % frente a WACC 8,05 % (+7,75 puntos; sin fondo de comercio ≈ 23,5 %): calidad «Sí».
- Lindt frente a Hershey: Lindt a 23,4x el BPA de los próximos 12 meses y valor intrínseco igual al precio; da Mantener (27,1 % / 21,9 % a 12 meses, pero no aguanta con la regla de control). Hershey a 17,2x, valor intrínseco por encima del precio y Comprar también con la v2. Mismo ciclo del cacao, Hershey más expuesta al volumen de EE. UU. y a los GLP-1, pero mucho más barata.
- **Revisión a 12 meses** (`revision-12m-2026-10-14.md`): v3 ponderada +19,7 %, base +23,3 % → Comprar; v2 +15,7 % / +12,2 % → Comprar. Selector sin marcas. Objetivo 191,04 USD (196,91 en el base); consenso 201,05.
- **Robustez**: SÓLIDA, acción robusta Comprar. Límite de compra 170,98 (v2: 164,49); filtro de mantener 178,75; colchón de BPA 5 % para Comprar. Avisos D3 (sin cierre en precios.json) y D4 (BPA ajustado frente al publicado, explicado). Objeción más fuerte: con el BPA −10 % la ponderada cae al 8,1 % y la v2 está en el filo (base 12,2 %).
- Riesgo de IA: bajo (producto físico de marca; solo efectos indirectos por asistentes de compra y precios dinámicos de la distribución frente a la marca blanca).
- Sentimiento: dividido y mejorando (Seeking Alpha sube recomendaciones con la vuelta del margen; en foros pesan las ventas del Hershey Trust y los GLP-1).
- Próximos resultados: 3T26 el 29-oct-2026.
- Word: `Hershey - 2026-10-14.docx` (cobertura 88 %, 28 gráficos); PDF con LibreOffice.

## Lecciones

- cuentas.mjs con la SEC (Hershey) solo tomaba `ShortTermBorrowings` como deuda en 2021-2025 y dejaba fuera `LongTermDebtAndCapitalLeaseObligations` y su parte corriente: comprobar siempre la deuda contra la nota del 10-K.
- EDGAR (www.sec.gov) devuelve 403 con un User-Agent sin contacto; funciona el de descargar.mjs («analisis-inversion research» + correo genérico).
- MarketScreener da como inactiva la ficha de Hershey: consenso de Stock Analysis.
- La serie del BPA ajustado de EE. UU. sale de las tablas de conciliación de los comunicados del 4T (el XBRL solo trae el publicado).
