# Diario · Pandora A/S (PNDORA.CO) · 19-oct-2026

- **Commit de partida**: `829f3ba Cola de índices: Technology One (no compra); cierra la pareja 4` (checkout compartido con otro análisis: sin pull, commit ni push).
- **Tiempos** (reloj del contenedor, UTC): inicio 14:28; cuentas, documentos y bolsa 14:28-14:31; notas A-E y parte propia hasta 14:50; motor, Word y PDF 14:51; precios, apuntar-12m y robustez 14:51-14:52; cierre 14:55. El trabajo se partió en dos sesiones por límite de contexto.
- **Encargo**: análisis value completo desde cero, sin informe anterior de Pandora.

## Decisiones

- **Cuentas**: `cuentas.mjs --esef` con el LEI 5299007OWYZ6I1E46843 (con «Pandora» a secas salía Pandora Investments). El ESEF solo trae 2024-2025; 2021-2023 de los informes anuales 2021 y 2023, y los trimestres de 3T24 a 2T26.
- **Documentos**: la página de informes de Pandora daba 404; los PDF se sacaron de pandora.a.bigcontent.io a partir de las páginas de informes, anuncios y gobierno.
- **Ejercicio objetivo 2028e**: 2027 es el año del golpe de la plata (guía de margen EBIT de ≥ 12-14 % con la plata a 82 USD; cubierta a ≈ 65 USD). El PER actual (20,6x sobre 2027e) sale inflado y empuja el base de la v3 al tope (18,7x): se explica en el informe y en la revisión.
- **Historia del PER adelantado**: 2021-2025, con 2025 ÷ nuestro BPA de 2026e. Media larga 2016-2025 sin 2019 (BPA de 2020, pandemia); v2 sin 2020.
- **DCF**: WACC 8,79 % (Bund 3,48 %, beta 1,15, prima 5,5 % + 0,5); Gordon al 2,5 %. Capex con las altas de derechos de uso (arrendamientos en el puente como deuda). En la primera pasada el capex bajaba del 12,5 % al 10,5 % y el capital nuevo rendía un 8,3 % (por debajo del WACC, frente a un incremental histórico del 17,6 %); se dejó en 12,5 % → 9,5 % (las altas de 2025 incluyen renovaciones): DCF de 792 a 863 DKK. Ni con uno ni con otro el valor intrínseco supera el precio.
- **Sostenibilidad «Sí»**; mercado final de joyería 2.917.000 M DKK en 2030e.
- **Pesos**: DCF 50, escenarios 30, comparables (PER) 20. EV/EBITDA no se pesa (lujo y minoristas mezclados).
- **Recomendación**: Mantener, convicción baja (la regla da Mantener porque el valor intrínseco, 827 DKK, está bajo el precio).
- **Minorista frente a marca**: 86-87 % de las ventas en canales propios (tiendas 63 %, online 23 %), 12 % franquicia/mayoristas, 2-3 % distribuidores. Pandora no está en las exclusiones de `escaner/reglas.json`; se avisa al usuario.
- **Regla 13**: veredicto «no cambia» (subida del 96 % desde marzo con causas publicadas; resultados del 4-nov no aplazan; sin colocaciones ni ventas de directivos).
- **Huecos**: foros de inversores (403/404), voto de remuneración (Dinamarca no publica recuento), transacciones con múltiplos, CR5, consenso histórico por trimestre, posición corta, participación individual de directivos.
- Avisos del Word aceptados: sin EV/EBITDA NTM de comparables en Yahoo (gráficos comps_ev y comps_mapa vacíos) y sin suma de partes.
- `simbolos.json`: añadida solo la entrada PNDORA (edición atómica, releyendo antes).

## Pasos y fecha de los datos

| Paso | Herramienta o fuente | Fecha del dato |
|---|---|---|
| Cuentas oficiales | `cuentas.mjs --esef` (ESEF 2024-2025) + informes anuales 2025, 2023, 2021 | 31-dic-2025 |
| Último trimestre | Informe del 2T26 (anuncio 1015) | 30-jun-2026 (publicado 12-ago-2026) |
| Guía vigente | Q3 2026 Aide Memoire | oct-2026 (silencio desde el 7-oct) |
| Consenso | Visible Alpha post-2T26; Yahoo earningsTrend | 28-ago-2026; 19-oct-2026 |
| Bolsa (precio, beta, cierres) | `bolsa.mjs --accion PNDORA.CO --indice ^OMXC25 --sector EXH7.DE` | cierre del 16-oct-2026 |
| Comparables | `notas/comps.mjs` (Yahoo quoteSummary) | 19-oct-2026 |
| Tipos de cambio | BCE | 19-oct-2026 |
| Tasa libre | Bundesbank, Bund 10 años | 16-oct-2026 (3,48 %) |
| Prima de mercado | Damodaran ERPbymonth | oct-2026 (4,20 %) |
| Plata y oro | Yahoo SI=F, GC=F | 19-oct-2026 |
| Regla 13 | `movimiento.mjs PNDORA.CO` | 19-oct-2026, 14:28 UTC (851,80 DKK) |
| Precio de mercado | `precios.mjs PNDORA` | 19-oct-2026 en sesión (847,60 DKK) |
| Revisión a 12 meses | `apuntar-12m.mjs pandora-2026-10-19` | 19-oct-2026 |
| Robustez | `robustez.mjs --actual` | 19-oct-2026 (847,60 DKK) |
