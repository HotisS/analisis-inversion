# Diario · Eni (ENI.MI) · 15-oct-2026

- Commit de partida: 30aee4a. Encargo del coordinador (análisis value completo; foco sector energético: petróleo y gas, GNL, Plenitude/Enilive). Hecho por el analista solo, sin subagentes; sin commits, pull ni push; nada escrito fuera de la carpeta.
- Entorno: nube. Cuentas 2020-2025 del XBRL ESEF (`cuentas.mjs --esef BUCRF72VH5RBN7X3VL35`; con «Eni» como nombre trae otra empresa), comprobadas con los 20-F 2025, 2022 y 2020 (SEC: resultados ajustados, acciones medias, híbridos, accionistas); informe intermedio a 30-jun-2026 (6-K del 31-jul) para el LTM, el puente, la guía y los segmentos; 6-K de recompra del 14-oct (acciones: 3.030,3 M emitidas − 168,2 M en autocartera = 2.862,1 M). Precio y cierres con `bolsa.mjs`; Bund de la Bundesbank (3,42 %); futuros del Brent de Yahoo; consenso de MarketScreener; comparables reutilizados de los análisis de Galp y TotalEnergies del mismo día.
- Fecha de corte 2026-10-15; precio 25,77 EUR (cierre del 15-oct, sesión cerrada). Divisa EUR. Próximos resultados: 22-oct-2026 (3T26, con decisión sobre el dividendo extraordinario).
- Decisiones: (1) EBITDA normalizado = el ajustado de Eni (partidas identificadas y efecto inventario en `no_recurrentes_en_ebitda`; los deterioros de Eni están dentro del EBITDA del XBRL, no en amortizaciones). (2) Participadas fuera del EBITDA y en el puente a valor contable (19.170 M). (3) Híbridos perpetuos (5.990 M) y recompra posterior al balance (1.055 M) en otros_ajustes; minoritarios a valor contable (4.929 M). (4) 2026e fijo (+12 %, margen 22,4 %); normalización con la curva del Brent (85,6 dic-27; 78,3 dic-28); margen a largo plazo 19,5 %. (5) WACC 7,94 % (Bund 3,42, beta 0,9, prima 5,5 + 1 de país). (6) BPA de la regla = ajustado − cupón de híbridos; historia adelantada sin 2019 (pérdida 2020) ni 2021 (BPA de pico de 2022).
- Resultado: DCF 20,65; valor intrínseco 20,61 (−20,0 %); DCF inverso 3,1 % (base 0,0 %); con la prima del mercado 24,10. ROIC 6,1 − WACC 7,94 = −1,8. Sostenibilidad Sí.
- **Línea 12 m (v3 ×1,1, selector v3)**: objetivo 18,05 EUR, ponderada −25,8 %, base −18,0 % → **Vender**, convicción media (el motor sugiere baja por discrepancia absoluta/relativa). v2 −29,6 %. Comprar < 16,63; vender > 21,25. Robustez SÓLIDA, acción robusta No mantener; BPA −10 %: −32,8 % / −25,8 %, límite robusto 13,65. Límite robusto actual 15,06 EUR. Apuntado solo con `--simular`.
- Regla 13: veredicto «no cambia» (P1 y P2: +74,6 % en 12 meses y en máximos; sin colocaciones ni ampliaciones; resultados el 22-oct).
- Word y PDF (soffice, 37 páginas): 17 de 28 controles correctos y 11 explicados. Cobertura 81 %. Confianza media.
- Huecos: transacciones, remuneración del CEO y votos de 2026, tamaño del sector, geografías, calificaciones ESG.
- Tiempo: unos 40 minutos de reloj (16:59-17:16 UTC más la lectura previa).

## Lecciones (para integrar)

- `cuentas.mjs --esef "Eni"` trae otra empresa (activo de 7.600 M): con nombres cortos usar el LEI (Eni: BUCRF72VH5RBN7X3VL35).
- Eni: los deterioros van dentro del EBIT del XBRL, no en amortizaciones; las «partidas identificadas + efecto inventario» (ajustado − publicado) llevan el EBITDA del XBRL exactamente al del consenso (2025: 12.359 + 3.334 = 15.693).
- Petroleras con bonos híbridos en el patrimonio (Eni, 5.990 M): el BPA publicado ya resta el cupón; para la regla, BPA ajustado − cupón y los híbridos como deuda en el puente.
- Los 6-K semanales de recompra (Eni) dan la autocartera y el porcentaje: acciones en circulación exactas sin esperar al informe trimestral.
