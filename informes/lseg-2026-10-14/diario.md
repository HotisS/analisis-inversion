# Diario · London Stock Exchange Group (LSEG.L) · 14-oct-2026

- Commit de partida: 3ea7765 (Cola: sexta hora en marcha, tanda 1). Durante el análisis otro proceso actualizó `motor/objetivo12m.mjs` (c8229e0: tope del base v3 ×1,1); el cálculo final usa esa versión.
- Entorno: nube de Claude Code con la red abierta. Documentos primarios descargados con `descargar.mjs` (resultados 2022, 2023 y 2025, semestrales 2025 y 2026, gilt del Banco de Inglaterra), XBRL ESEF con `cuentas.mjs`, precios con `bolsa.mjs`, consenso de la propia empresa (13-oct) y MarketScreener con WebFetch, el resto con WebSearch.
- 16:50-16:52: ficha sectorial `sectores/bolsas-datos-financieros-2026-10-14.md` y su JSON de comparables (doce cotizadas llevadas al cierre del 13/14-oct desde los informes de S&P Global, Moody's e ICE).
- 16:52-17:10: análisis (notas A-E con `notas/construir-notas.mjs`, sin subagentes; `propio.mjs` + `supuestos.mjs` + `textos.mjs`), Word y PDF (soffice).
- Fecha de corte 2026-10-14; divisa GBP (cotiza en peniques: 8.398 p = 83,98 GBP, cierre del 14-oct); ejercicio natural.
- Decisiones:
  - Ingresos = total income sin recuperaciones (lo que guía la empresa). EBITDA publicado = EBIT + amortizaciones; los costes de integración y reestructuración (158-334 M al año) van en `no_recurrentes_en_ebitda` porque bajan con el fin de Refinitiv.
  - Balance sin los ≈ 757.000 M de activos y pasivos de los miembros compensadores de LCH (si no, el motor mezcla el balance de la cámara con el del accionista).
  - BPA ajustado para la rentabilidad a 12 meses (sin la amortización de intangibles comprados, ≈ 1.200 M al año); DCF con la amortización propia (11 % → 8 %) y el capex de la guía (9,5 % → 8 %).
  - Puente al 30-jun-2026 con los minoritarios a **valor de mercado** (Tradeweb: ≈ 57 % ajeno × 25.739 M USD, más LCH y PTS en libros = 11.400 M) y `otros_ajustes` 2.256 M (caja regulatoria 1.277 + recompras jul-oct ≈ 712 + dividendo a cuenta 267). Acciones 482,2 M (480,2 de MarketScreener + 2 de dilución).
  - WACC 8,68 % (gilt 5,39 % del BoE, beta 0,85 entre la mensual 0,60 y la semanal de 2 años 0,89). Terminal 3,0 %.
  - Sostenibilidad «Sí»: reinversión neta negativa, prueba de cuota a mano con los negocios de suscripción (14,7 % → ≈ 13,5 % en 2030e); `mercado_final` en null porque Markets no está en el perímetro del mercado de datos.
- Resultado: **Comprar, convicción baja** (sugerida: reglas absoluta Mantener / relativa Comprar). Valor intrínseco 93,70 GBP (+11,6 %), DCF 90,88; con la prima del mercado 115,70. DCF inverso: 4,3 % de crecimiento 2027-2032 frente al 5,3 % del base. ROIC 5,7 % (con el fondo de comercio de Refinitiv) frente a WACC 8,68 % (−3,0 puntos); ≈ 8,7 % con el beneficio ajustado. 18 de 19 controles y 1 explicado (regresión). Cobertura 87,1 %.
- **Línea 12 m (v3)**: objetivo 104,07 GBP; ponderada +25,8 %, base +22,1 % (dividendo incluido); Comprar. **v2**: ponderada +14,5 %, Mantener. Comprar < 91,57; vender > 117,39. Detalle en `revision-12m-2026-10-14.md`. Comprobado con `apuntar-12m.mjs --simular` (no apuntado: lo hace el coordinador).
- Confianza de los datos: **media-alta** en cuentas (primarias), media en minoritarios de Tradeweb (participación económica estimada ≈ 43 % con las clases de acciones del 10-Q del 3T25), comparables (reutilizados y llevados al cierre), gobierno (sin cifra de remuneración de 2025 ni operaciones de directivos) y sentimiento (sin acceso a foros británicos).
- Próximos resultados: actualización del 3T26 el 22-oct-2026 (MarketScreener).

## Lecciones

- Bolsas con cámara (LSEG/LCH): quitar del balance los activos y pasivos de los miembros compensadores antes de dárselo al motor (≈ 95 % del balance de LSEG); `cuentas.mjs` los deja dentro de activo y pasivo corrientes.
- Filiales cotizadas con minoritarios grandes (Tradeweb en LSEG): minoritarios del puente a valor de mercado, no en libros (11.400 M frente a 2.370 M: 19 GBP por acción).
- El consenso compilado por la propia empresa (LSEG lo publica en su web de inversores con fecha) da el BPA ajustado de tres años en la misma base que la empresa; MarketScreener da el publicado para LSEG.
- El motor puede cambiar durante el análisis (otro proceso en la misma copia): volver a ejecutar `calcular-empresa.mjs` justo antes del Word y comparar con `apuntar-12m.mjs --simular`.
