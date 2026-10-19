# Diario · Powell Industries (POWL) · 19-oct-2026

Commit de partida: `8e12032 Escáner value amplio (16 regiones, 61 bolsas) y seis análisis value del 19-oct`. Procedimiento completo desde cero (`/analiza-empresa`), no un refresco; fases A-E hechas por el mismo analista sin subagentes. Horas del contenedor (UTC) según las marcas de los archivos.

## Pasos, con la fecha de los datos

| Paso | Hora (UTC) | Datos a fecha de |
|---|---|---|
| Cuentas: `cuentas.mjs --sec POWL` (XBRL companyfacts FY2016-FY2025) + 10-K FY2024 y FY2025, 10-Q 1T-3T FY26, notas de resultados, 8-K del split, proxy | 10:26 | FY2025 (30-sep-2025, 10-K del 19-nov-2025); 3T FY26 (30-jun-2026, 10-Q del 4-ago-2026) |
| `bolsa.json` (precio, betas, cierres de ejercicio) y `movimiento.mjs` (regla 13) | 10:27-10:28 | cierre del 16-oct-2026 (165,14 USD; sin cierre del 19-oct a la hora del análisis) |
| Form 4 (`form4.mjs`): ventas de Thomas W. Powell y de los directivos | 10:34 | Form 4 hasta el 2-oct-2026 |
| Treasury a 10 años (CSV del Tesoro; FRED falló) | — | 16-oct-2026: 5,09 % |
| Consenso (MarketScreener, 4 analistas) y comparables (Yahoo `ficha` + earningsTrend, 9 empresas) | — | 19-oct-2026 |
| Notas A-E (`construir-notas.mjs`) con `comparables.json` | 10:45-10:47 | lo anterior; sector GMI (sep-2026) y Mordor; prensa hasta el 14/15-oct-2026 |
| Supuestos, BPA y PER histórico (`supuestos.mjs`, `propio.mjs`) | 10:49-10:50 | balance a 30-jun-2026 |
| Textos, riesgo de IA y resumen (`textos.mjs`, `resumen.mjs`) | 10:55-10:56 | — |
| `integrar.mjs` + `calcular-empresa.mjs` (20 de 21 controles y 1 explicado; todas las citas con fuente) | 10:56 | — |
| Word (`rellenar.mjs`, cobertura 87,9 %) y PDF (soffice) | 10:57 | — |
| `simbolos.json` (POWL → POWL, con candado) y `precios.mjs POWL` | 10:57 | cierre del 16-oct-2026 |
| `apuntar-12m.mjs powell-2026-10-19` y `robustez.mjs --actual` | 10:57 | cierre del 16-oct-2026 |
| `revision-12m-2026-10-19.md` y este diario | 10:58 | — |

## Decisiones

- **Split 3 × 1 del 2-abr-2026**: BPA y DPA del XBRL ÷ 3 y acciones × 3, como los precios de Yahoo. La caída del 48,7 % desde el máximo de mayo (322 USD ajustado) es real, no efecto del split.
- **FY2026 cerrado sin publicar**: FY2026e fijo (+7,8 %, margen EBITDA 20,3 %) con nueve meses reales y un 4T estimado de ≈ 330 M. El motor no descuenta sus flujos (año antes del corte) ni la caja de jul-sep (≈ 1,5 USD por acción, prudente).
- **Crecimiento** FY2027e +22 % y FY2028e +14 % (cartera de 2.400 M, 1.300 M facturables en doce meses), luego 8/5/4/3,5/3 %. **Margen** 20,5 % plano en FY2027e-FY2028e (la dirección guía margen bruto plano) y bajando al 16,5 %: cíclica con márgenes del 1-6 % en FY2016-FY2022.
- **WACC 11,84 %**: Treasury 5,09 %, beta 1,25 (mensual y semanal de 5 años; la de 2 años es 2,01), prima 5,0 + 0,5; sin deuda. Terminal 3 %.
- **Circulante** del 2 % en FY2026e (1,8 % a jun-26 por los anticipos de centros de datos) al 6 % en FY2029e; control explicado.
- **Sostenibilidad: Sí** (motor y analista); `mercado_final` = aparamenta de media tensión de Norteamérica 2030 (5.837 M, GMI), cuota implícita 32,2 % frente al 26,5 %.
- **PER histórico adelantado** con la regla de atípicos documentada: fuera FY2016-17 (pérdidas el año siguiente), FY2020 (473x) y FY2022 (4,7x, menos de un tercio de la mediana); **FY2023 (6,7x) se queda** porque está justo por encima del tercio (6,4x). Es lo que decide la señal: el bajista a 6,7x lleva la ponderada a −13,6 % (Vender); sin él sería −4,1 % (Mantener). Se dice en el resumen y la convicción baja a media.
- **Comparables**: ETN, VRT, HUBB, NVT, Schneider, ABB, IESC, AZZ, PLPC (mediana PER NTM 21,2x); THR sin datos en Yahoo, Siemens fuera por conglomerado. Transacciones: Avail EPG, Fibrebond, Boyd Thermal.
- **Próximos resultados**: ≈ 17-nov-2026 (Unusual Whales/agregadores; sin anuncio de la empresa; FY2025 fue el 18-nov). No aplazan (regla 11).
- **simbolos.json**: la primera escritura reordenó el archivo; se rehízo dentro del candado con el orden de HEAD más las entradas nuevas de los otros hilos (1969, KGX, 002028, 002011) y POWL al final. Diff final: solo 35 líneas añadidas, ninguna entrada cambiada.

## Resultado

**Vender, convicción media.** A 12 m (v3 ×1,1, decide): ponderada −13,6 %, base +1,7 % (`apuntar-12m`: +1,6 %); v2 de control −15,4 % (Vender); con BPA −10 %: −22,3 %. Objetivo 142,30 USD. Valor intrínseco 89,61 USD (−45,7 %; DCF 79,49). ROIC 116,3 % − WACC 11,84 % = 104,46 puntos; sostenibilidad Sí. Robustez SÓLIDA, acción robusta No mantener, límite de compra 89,61 USD; no es compra robusta. Regla 13: no cambia.

## Huecos

Crecimiento y consenso de los trimestres de FY2025, vencimientos de deuda (no hay deuda), calificaciones ESG externas, serie histórica del mercado, historial de guía (la empresa no da guía numérica), recomendaciones desglosadas y rango de objetivos de los analistas, EV/EBITDA NTM de los comparables (el mapa crecimiento-múltiplo no se dibuja). Fecha de resultados de FY2026 sin confirmar por la empresa.

## Lecciones propuestas

1. **Cíclicas en la salida de un valle: la historia adelantada puede dar un mínimo de 5 años extremo** (Powell FY2023: 6,7x, porque el mercado no vio venir un BPA ×2,7). La regla de atípicos (< 1/3 de la mediana) lo deja dentro por poco y decide la señal (Vender frente a Mantener). Proponer que `robustez.mjs` destaque la variante «sin doble castigo» en el veredicto cuando cambie la señal, o que el atípico se mida también por el salto del BPA (×2,5 o más en un año).
2. **Splits recientes**: MarketScreener y algunos agregadores muestran DPA y objetivos históricos sin ajustar; el XBRL de la SEC tampoco ajusta los años anteriores. Ajustar todo en `construir-notas.mjs` y decirlo en `meta.limitaciones`.
3. **Ejercicio cerrado sin publicar** (cierre en septiembre, corte en octubre): el motor da `fraccion` 0 al año fijo y no suma la caja del último trimestre al puente; anotar la cifra en limitaciones o en `otros_ajustes` si es material.
4. **Editar `simbolos.json` con `node -e`**: no reordenar las claves (el archivo va por nombre con excepciones); añadir solo la entrada nueva.
