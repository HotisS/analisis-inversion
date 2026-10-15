# Diario · Johnson Controls (JCI) · 15-oct-2026

- Commit de partida: 30aee4a. Encargo del coordinador (megatendencia: frío industrial para naves y sistemas, enfriadoras York, refrigeración de centros de datos). Sin subagentes, sin commits ni escrituras fuera de la carpeta.
- Entorno: nube de Claude Code. Cuentas del XBRL de la SEC (`cuentas.mjs --sec JCI`, CIK 833444) y companyfacts; notas de resultados 4T24-3T26 y del 4T de 2020-2024 (BPA ajustado histórico); 10-K 2025; proxy 2026; 8-K de 2026; Form 4 (`form4.mjs`). Precio y cierres con `bolsa.mjs` (cierre del 14-oct, 152,44; la sesión del 15-oct no había cerrado, intradía 144,16, −5,4 %). Tasa libre FRED DGS10 5,21 % (13-oct, curl). Consenso de Yahoo (quoteSummary con `herramientas/yahoo.mjs`). Comparables y transacciones reutilizados del informe de Trane del mismo día y de la ficha `sectores/climatizacion-hvac-2026-10-14`.
- Ejercicio a 30-sep, etiqueta «fin». Perímetro: operaciones continuadas 2022-2025 (sin el residencial vendido a Bosch en jul-2025); 2016-2021 tienen otro perímetro y no se usan.
- Decisiones: BPA de la regla = ajustado de la empresa (consenso e historia en esa base; incluye amortización de intangibles). DCF con reestructuración normalizada restada del EBITDA (JCI reestructura cada año: 701/1.049/510/546 M). Arrendamientos operativos fuera de la deuda. Pesos DCF 50 / comparables 20 / escenarios 30. WACC 10,85 % (beta 1,15 entre 1,28 mensual y 1,0 semanal). Mercado final `null` (perímetro de tres mercados).
- Resultado: DCF 77,65; valor intrínseco 87,35 (−42,7 %); DCF inverso 17,6 % anual (base 5,4 %); con la prima del mercado, 102,45. ROIC 8,2 % < WACC (fondo de comercio de Tyco; sin él 26,1 %). Sostenibilidad Sí (motor y analista).
- **Línea 12 m (v3 ×1,1)**: objetivo 139,82 USD, ponderada −7,2 %, base +2,3 %; Mantener por la regla, convicción media; no pasa el filtro de mantener en cartera. v2: −13,2 % / −7,4 %. Robustez SÓLIDA, acción robusta «No mantener»; BPA −10 %: −16,4 % / −7,9 %. Límite por valoración 87,35 USD, pero la calidad (ROIC − WACC −2,6) bloquea la compra a cualquier precio. Detalle en revision-12m-2026-10-15.md (`apuntar-12m.mjs --simular`: −7,3 % / 2,2 %).
- Regla 13: veredicto «no cambia» (caídas fuertes del sector, sin noticia propia; resultados el 27-oct no aplazan).
- **Confianza de los datos: media.** Faltan: historia larga en el perímetro actual, consenso 2028e, ratio de remuneración, calificaciones ESG, cuota de mercado.
- Word y PDF (soffice). Cobertura 86,6 %. 18 de 22 controles correctos y 4 explicados.
- Tiempo: ≈16:55-17:20 UTC.

## Lecciones

- Empresas con una venta grande reexpresada (JCI-Bosch): el XBRL mezcla años reexpresados (2022-2025, operaciones continuadas) con años viejos sin reexpresar (2016-2021); usar solo los reexpresados y tomar el BPA de operaciones continuadas (`IncomeLossFromContinuingOperationsPerDilutedShare`), no el total.
- En industriales que reestructuran todos los años (JCI: 500-1.000 M anuales), usar el BPA ajustado solo para la regla (misma base que historia y consenso) y restar una reestructuración normalizada en el DCF; avisar del control D6 (BPA desde el contable).
- `robustez.mjs --actual` no encuentra precio si la empresa no está en `simbolos.json` (aviso D3): el integrador debe añadir JCI.
