# Diario: Itaú Unibanco (ITUB), análisis value del 27-oct-2026

- Petición de Hotis: «ITUB» (encargo del coordinador, 27-oct, 09:01 Madrid). Commit de partida: `bd7cfc6` («Escáner 26-oct tarde»).
- Análisis nuevo, método completo (no hay informe anterior de Itaú). Notas A-E escritas por el analista (sin subagentes) con `notas/construir-notas.mjs`, con la forma de `informes/regeneron-2026-10-24/`.
- **Es un banco y el motor no tiene modelo de bancos.** Se hace el informe completo de 28 secciones con el motor, con tres adaptaciones (decisiones 3-5). El cálculo bancario está en `valoracion-banco.md` (generado por `notas/valoracion-banco.mjs`).

## Decisiones

1. **Línea de compra: ADR ITUB en NYSE (USD)**, 1 ADR = 1 preferente ITUB4. Es la práctica: IBKR no tiene la suscripción de datos de B3. Precio 7,70 USD (cierre del 26-oct-2026, −20,4 %) × 5,4064 BRL/USD (Yahoo BRL=X al cierre; PTAX del día 5,5007) = 41,63 BRL; ITUB4 cerró a 41,70 BRL en B3 (Yahoo aún no tenía la barra diaria del 26-oct de ITUB4.SA; precio de `quoteSummary`). `meta.divisa` BRL, `divisa_cotizacion` USD, `tipo_cambio` 5,4064.
2. **Bases contables**: `cuentas.mjs --sec ITUB` solo devolvía US GAAP de 2007-2010 (no lee `ifrs-full`) y los company facts no tenían el 20-F de 2025: la serie del informe es **NIIF** leída de las instancias XBRL de los 20-F 2025, 2023 y 2022. El BPA, el ROE, la regla a 12 meses y el modelo bancario usan el **resultado recurrente gerencial (BR GAAP)**, el de referencia del mercado (MD&A trimestrales en 6-K).
3. **Calidad = ROE recurrente − Ke en BRL** (equivalente de ROIC − WACC), con la misma regla «nunca < 4,5» y los niveles A/B1/B2/C. Ke = bono brasileño a 10 años del 26-oct (15,44 %, +2,46 puntos ese día) + beta 1,10 × 5,5 % = **21,49 %**. ROE 2025 23,4 % → **+1,9**; ROE 1S26 24,5 % → **+3,0**. **No pasa: no es comprable en ningún nivel.** Con el bono de antes de las elecciones (12,98 % el 23-oct; Ke 19,03 %): +4,4 / +5,5, al filo. El ROIC NIIF del motor (deuda y caja 0) es 20,4 % − 21,5 % = −1,1, y es lo que lee `robustez.mjs`: misma conclusión.
4. **Valor intrínseco = modelo de exceso de rentabilidad** (VC 18,92 BRL a 30-jun + VA de (ROE − Ke) × VC de 10 años + terminal; ROE 24,5 % → 21,5 %, patrimonio +8 % → +5 %), ponderado 25/50/25: **21,34 BRL (3,95 USD)**; base 21,74. P/VC justificado de contraste (ROE 24 %, g 5 %): 1,15x = 21,80 BRL, frente a 2,20x en bolsa. Entra en el motor como «suma de partes» al 100 % con `ev_directo` = 21,34 × 11.022 M.
5. **DCF del motor adaptado** a flujo para el accionista, peso 0: «margen» calibrado para que el beneficio sea ROE × patrimonio, «capex» = retención para crecer con el CET1 objetivo (11,5 %), amortización y circulante 0, deuda y caja 0 en el puente, peso de la deuda 0 (WACC = Ke). Da 22,55 BRL en el base, a < 4 % del modelo bancario: cuadra. EV/EBITDA, DN/EBITDA, ROIC y circulante del motor no significan nada en un banco y no se usan.
6. **Coste del capital**: sin prima adicional por riesgo país (`prima_adicional_pct` 0): ya está en la tasa libre en reales; los +3 puntos del escáner eran doble cómputo. Prima del 5,5 %; `referencia_mercado` = Damodaran oct-2026, 4,20 % (Ke 20,06 %, valor 23,80). Terminal 5,0 % nominal = IPCA largo del Focus 3,5 % + 1,5 real (control «g ≤ 3 %» explicado). Sensibilidad: tasa libre de 13,5 % → valor base 24,63 BRL; 12,98 % (pre-elecciones, medida) → 25,55; ±1 punto → 20,50 / 23,14. El precio pide un Ke del 13,6 %, por debajo de la tasa libre de hoy.
7. **Regla a 12 meses (v3) con BPA recurrente**: 2026e 4,56, 2027e 4,91, 2028e 4,45 / 5,25 / 5,55. PER adelantado de B3 sin el cierre de 2019 (COVID): mediana 6,8x, mínimo 6,4x, media larga 8,6x; PER actual 8,5x; comparables 9,8x.
8. **Indicadores bancarios** en rentabilidad, balance y calidad: CET1 12,3 % (objetivo 11,5 %), morosidad > 90 días 1,9 %, coste del crédito 2,7 % de la cartera, margen con clientes 9,1 % (6,2 % ajustado por riesgo), eficiencia 37,4 %, provisiones ≈ 197 % de la morosidad > 90 días (estimación), cobertura de fase 3 del 53,8 %, sensibilidad a la Selic (≈ +0,9 mil M después de impuestos por punto en el margen del capital propio, antes de coberturas; −6 % del valor intrínseco por punto de tasa libre).
9. **Regla 13 (`bolsa.contexto`)**: «retrasa», hasta conocer el marco fiscal del nuevo mandato. La reelección de Lula del 25-oct hundió el ADR un 20,4 % el 26-oct (ITUB4 −13,2 % en reales; el resto, el real) y subió el bono a 10 años 2,46 puntos: el valor intrínseco del método cae un 15 % por el Ke, casi lo mismo que la acción en reales.
10. **Riesgo de IA**: exposición media, mixto, ±3 %. NeoSpace (2.925 M, 26-oct) en capital y noticias: 1,4 % del patrimonio, no cambia el valor.
11. **Convicción baja** (el motor sugiere media): el método no da una señal fiable para un banco brasileño; la magnitud del valor intrínseco la decide la tasa libre en reales. La dirección («no comprar») sí aguanta con cualquier tasa libre de los dos últimos años.

## Resultado

- Regla a 12 meses (v3, sin marcas del selector): ponderada **+4,7 %**, base **+4,0 %** → **Mantener**. v2 de control +8,6 % / +6,5 %. BPA −10 %: −5,1 % / −5,7 %. Objetivo ponderado 40,71 BRL (7,53 USD).
- Valor intrínseco 21,34 BRL = 3,95 USD (−48,7 %); DCF adaptado 22,55; con la prima del mercado 23,80 (modelo bancario).
- Calidad: ROE − Ke = +1,9 (2025) / +3,0 (1S26) < 4,5; sostenibilidad «En parte».
- Robustez (sin `--actual`: no había sesión del 27-oct al cierre a esta hora): **SÓLIDA, «No mantener»**; nivel de compra hoy: ninguno (calidad). Límites en USD: comprar ≤ 3,95 (robusto 3,94) solo si además pasara la calidad; filtro de mantener 4,64; vender > 8,96. Aviso D3: `precios.json` sin cierre de ITUB (no se ejecutó `precios.mjs`, fuera del encargo; el precio del informe es del 26-oct).
- Controles: 20 de 23 correctos y 3 explicados (tipo efectivo 2024 y 2025 por el JCP; terminal del 5 % nominal en BRL).

## Pasos y fecha de los datos (hora de Madrid)

| Paso | Herramienta o fuente | Fecha del dato | Hecho |
|---|---|---|---|
| Cuentas oficiales | `herramientas/cuentas.mjs --sec ITUB` (solo US GAAP 2007-2010) e instancias XBRL de los 20-F 2025, 2023 y 2022 (NIIF 2020-2025) | 20-F 2025 (abr-2026) | 27-oct 09:02 |
| Documentos primarios | MD&A 2T26 (6-K), nota de resultados 2T26, cuentas NIIF 2025, MD&A 4T20/4T21/4T23, 20-F 2025, hechos relevantes (guía 2026, recompra, NeoSpace) | hasta el 26-oct-2026 | 27-oct 09:11 |
| Datos de bolsa y movimiento (regla 13) | `bolsa.mjs`, `movimiento.mjs` (ADR ITUB y ITUB4.SA) | cierre del 26-oct-2026 (ADR 7,70 USD); ITUB4.SA hasta el 23-oct | 27-oct 09:15 |
| Consenso y comparables | `notas/yahoo-datos.mjs` (Yahoo) | 26-oct-2026 | 27-oct 09:05 |
| Tasa libre, Ibovespa y contexto electoral | tradingeconomics (bono a 10 años 15,44 %), tradingkey, BCB (PTAX, Focus del 23-oct, SGS 20539) | 26-oct-2026 | 27-oct 09:10 |
| Valoración bancaria | `notas/valoracion-banco.mjs` → `valoracion-banco.md` | corte 27-oct-2026 | 27-oct 09:30 |
| Notas A-E | `notas/construir-notas.mjs` | corte 27-oct-2026 | 27-oct 09:22 |
| Integración y cálculo | `motor/integrar.mjs`, `motor/calcular-empresa.mjs` | 27-oct-2026 | 27-oct 09:30 |
| Word y PDF | `motor/rellenar.mjs`, `soffice` | 27-oct-2026 | 27-oct 09:30 |
| Símbolo y revisión a 12 meses | `simbolos.json` (con `flock`), `flock … apuntar-12m.mjs` | cierre del 26-oct | 27-oct 09:30 |
| Robustez | `robustez.mjs` (sin `--actual`: sin sesión del 27-oct al cierre) | cierre del 26-oct | 27-oct 09:30 |
