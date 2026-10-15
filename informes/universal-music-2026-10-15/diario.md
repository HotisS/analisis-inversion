# Diario — Universal Music Group (UMG), corte 2026-10-15

- Commit de partida: 76166ce. Inicio: 09:21 UTC.
- Origen de la idea: índice de foso amplio internacional de Morningstar (VanEck MOTI, reajuste del 18-sep-2026, precio/valor razonable 0,57), venta de Pershing Square (jun-26) y escáner (PER adelantado ≈ 14x frente a 25-28x desde la salida a bolsa; ROIC − WACC ≈ +17 puntos).
- Fase 0: no había ficha de música; hecha `sectores/musica-derechos-2026-10-15.md` (6 campos) con `musica-derechos-2026-10-15-comparables.json` (7 comparables, Yahoo 14-oct, mediana PER NTM 14,7x).
- Fase 1: NIIF-UE, EUR, ejercicio natural. Cuentas 2020-2025 del XBRL ESEF (`cuentas.mjs --esef "Universal Music Group"` y filings.xbrl.org); 1S26 y LTM jun-26 de la nota de resultados del 2T. Precio 15,23 (cierre del 14-oct, Yahoo). Beta 0,98 mensual a 5 años frente al AEX (1,19 semanal a 2 años); en el WACC, 1,0.
- Fases 2-4 sin subagentes (encargo): notas A-E con `construir-notas.mjs` (lista común de 38 fuentes), supuestos en `supuestos.mjs`, textos en `textos.mjs`, ensamblado en `propio.mjs`.
- Decisiones:
  - Los anticipos de regalías (≈ 2.000-2.600 M) se suman a «clientes» en todos los años. Sin eso, el circulante histórico era del −26,9 % de las ventas y el DCF con −2 % creaba una salida de caja ficticia de ≈ 3.100 M; con ellos, el circulante es del −1,8 % y se proyecta igual.
  - El capex incluye la inversión en catálogos y las altas de derechos de uso (≈ 4,9 % de las ventas).
  - El EBITDA del informe lleva dentro los pagos en acciones (227 M en 2025). El BPA de los casos a 12 m y la historia del PER van en la base ajustada de la empresa (sin pagos en acciones, sin amortización de catálogos y sin revalorizaciones), que es la del consenso.
  - Puente a 30-jun-2026: Spotify (estimación propia, ≈ 0,9 EUR por acción) y otras participadas en asociadas (2.790 M); dividendo a cuenta y recompras posteriores en «otros ajustes» (696 M).
  - Transacciones con peso 0: no hay múltiplos publicados y el bloque Bolloré-Vivendi-Tencent (39,90 % de los votos) hace improbable una compra.
- Resultado:
  - DCF 19,24 (WACC 8,06 %, valor terminal 73 %); DCF inverso: crecimiento del 1,3 % (base 5,4 %).
  - Valor intrínseco 18,43 (+21,0 %).
  - Objetivo a 12 m 17,39 con la v2 por el selector (desrateada: 25,9x es 1,9 veces 13,7x): ponderada 17,6 % y base 14,1 % → Comprar, convicción Media. Con la v3 sin selector: 29,5 % / 25,3 %.
  - Sostenibilidad: la mía «Sí» = la del motor «Sí»; el control no salta.
  - ROIC 21,4 % (28,5 % sin fondo de comercio) − WACC 8,06 % = +13,3 puntos: calidad Sí.
  - 19 de 19 controles correctos.
- Word y PDF generados (cobertura 83,7 %; gobierno por debajo del 60 % por falta de votos de remuneración, comisiones del consejo y operaciones de directivos).
- 15-oct-2026: revisión a 12 meses en `revision-12m-2026-10-15.md`. `apuntar-12m --simular`: v2 17,5 % / base 14,0 % → Comprar; v3 sin selector 29,5 %.
- Robustez: veredicto SÓLIDA, acción robusta «Comprar».
  - Avisos: D3 (UMG aún no está en el `precios.json` común), E2 (resultados del 3T el 29-oct: comprar en dos tramos) y M6 (elasticidad 2,13: el base es el PER de hoy).
  - M1 VARIANTE: desrateada, decide la v2.
  - Variante más dura: BPA −10 % → 6,2 % / 3,0 % (Mantener); colchón de BPA del 2 % para Comprar.
- Huecos (11, todos complementarios):
  - segmentos de 2020-2021, geografías y vencimientos de la deuda (el informe anual y el semestral están en una web con JavaScript);
  - segunda fuente del tamaño del sector;
  - calificaciones ESG;
  - votos de remuneración y operaciones de directivos;
  - múltiplos de transacciones.

## Lecciones

- Discográficas y editoriales: los anticipos de regalías a artistas son circulante. Si no se suman a clientes, el circulante histórico sale muy negativo (−27 % de las ventas) y el DCF inventa una salida de caja.
- La «inversión en catálogos» va al capex, no a las compras. Su amortización se quita del BPA ajustado de la empresa.
- UMG publica un BPA ajustado sin pagos en acciones (12 % del beneficio ajustado en 2025). Se usa para el PER, por coherencia con el consenso, pero el DCF los mantiene como coste.
- La web de inversores de UMG y el registro de directivos de la AFM cargan con JavaScript. Las notas de resultados se consiguen desde los distribuidores de notas de prensa y el ESEF desde filings.xbrl.org.
