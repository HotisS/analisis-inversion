# Diario: Santander Brasil (SANB11), análisis value del 27-oct-2026

- Petición: «y el santander?» (encargo del coordinador, 27-oct, ≈ 09:48 Madrid). Commit de partida: `60f39af`.
- Análisis nuevo, método completo (no hay informe anterior de Santander Brasil). Notas A-E escritas por el analista (sin subagentes) con `notas/construir-notas.mjs`, con la forma de `informes/itau-unibanco-2026-10-27/` y `informes/btg-pactual-2026-10-27/`.
- **Es un banco y el motor no tiene modelo de bancos.** Mismas adaptaciones que Itaú y BTG; el cálculo bancario está en `valoracion-banco.md` (generado por `notas/valoracion-banco.mjs`).
- **Premisa corregida**: el ADR BSBR **no** se ha deslistado; sigue en la NYSE (4,82 USD el 26-oct) y el banco presentó el 20-F 2025 en la SEC.

## Decisiones

1. **Línea de compra: unit SANB11 en B3 (BRL)**, 1 unit = 1 ON + 1 PN = 1 ADR BSBR. Precio 26,30 BRL (cierre del 26-oct-2026, −4,47 %; `bolsa.mjs`). `meta.divisa` BRL, `divisa_cotizacion` BRL, `tipo_cambio` 1.
2. **Bases contables**: serie del informe en **NIIF** de los datos abiertos de la CVM (DFP 2021, 2023, 2025 e ITR 2026; CD_CVM 20532) y del 20-F 2025. El ITR del 1S26 trae un impuesto 0 (dato raro): no se usa. BPA, ROE, regla a 12 meses y modelo bancario con el **resultado gerencial recurrente (BR GAAP)** del Informe de Resultados (2T26 y anteriores) y prensa para 2021-2023.
3. **Calidad = ROE recurrente − Ke en BRL**, regla «nunca < 4,5» y niveles A/B1/B2/C. Ke = 15,435 % + 1,0 × 5,5 % = **20,94 %** (beta medida 0,97-0,99 mensual, 0,84 semanal; se usa 1,0). ROE 2025 17,3 % → **−3,6**; 1S26 14,3 % → **−6,6**; 2T26 12,5 % → −8,4. Con el bono pre-elecciones (Ke 18,48 %): −1,2 / −4,2. **No pasa en ningún caso.**
4. **Valor intrínseco = modelo de exceso de rentabilidad** (VC 25,77 BRL por unit a 30-jun; ROE 13,5 % → 17 %, patrimonio +6 % → +5 %), neto del JCP de 0,40 BRL de octubre, ponderado 25/50/25: **17,76 BRL** (base 18,05; bajista 13,48; alcista 21,47). P/VC justificado (ROE 16 %, g 5 %): 0,69x = 17,78 BRL, frente a 1,02x en bolsa. Entra como «suma de partes» al 100 % con `ev_directo` = 17,76 × 3.744 M.
5. **DCF del motor adaptado** a flujo para el accionista, peso 0: da 20,36 BRL en el base (cuadra con el modelo bancario). EV/EBITDA, DN/EBITDA, ROIC, Altman y Piotroski no significan nada en un banco.
6. **Coste del capital**: sin prima país (ya está en la tasa libre en reales). `referencia_mercado` Damodaran 4,20 % (Ke 19,64 %, valor 19,85). Terminal 5,0 % nominal en BRL (control «g ≤ 3 %» explicado). Sensibilidad: tasa libre de 13,5 % → 20,86 BRL; 12,98 % → 21,76; ±1 punto → 16,86 / 19,40. El precio pide un Ke del 16,4 % (Gordon 15,8 %), igual a la tasa libre sin prima.
7. **Oferta de canje de la matriz** (30-jul-2026; F-4 y registro en CVM/B3 el 21-sep; cierre esperado en el 1S27): 0,4056 acciones SAN por unit (≈ 0,4000 tras el JCP de octubre, estimación propia), sin mínimo de aceptación ni exclusión buscada; valor de canje 26,92 BRL el 26-oct (27,43 con la PTAX). **Es lo que fija el precio**: el método a 12 meses no da señal fiable.
8. **Regla a 12 meses (v3) con BPA recurrente por unit**: 2026e 3,58, 2027e 3,91, 2028e 3,31 / 4,35 / 4,95. PER adelantado: mediana 8,7x, mínimo 5,7x, media larga 9,0x; actual 6,7x; comparables 7,0x.
9. **Indicadores bancarios**: CET1 11,2 %, Basilea 15,3 %, morosidad > 90 días 3,3 % (2,6 % un año antes), coste del crédito 3,81 % a 12 meses, PDD +20,6 % en el 2T26, spread 10,03 %, eficiencia 39,3 %, cobertura de fase 3 65 %; pasivo-sensible a la Selic (margen con el mercado −718 M en el 2T26); −7 % del valor por punto de tasa libre.
10. **Efecto Lula y regla 13**: SANB11 −4,5 % el 26-oct frente a Itaú −13 % y Bradesco ≈ −21 %: el real se depreció frente al euro y subió el valor de canje en reales, que compensó la caída de SAN (−3,1 %). El Ke sube 2,46 puntos y quita un 17 % al valor intrínseco. `bolsa.contexto`: «retrasa».
11. **Gobierno**: la matriz tiene el 89,53 %; riesgo para el minoritario de quedarse fuera de la oferta con poca liquidez y sin ADR, y de que los dividendos vayan casi todos a la matriz. Nuevo consejero delegado (Gilson Finkelsztain) desde el 2S26.
12. **Convicción baja** (el motor sugiere media) por la oferta.
13. **Movimiento**: `movimiento.mjs` devolvía datos cacheados hasta el 23-oct; el movimiento (1m −10,7 %, 12m −6,8 %, −30,5 % del máximo de 52 semanas) se recalculó a mano con el cierre del 26-oct.
14. **`simbolos.json`**: un `JSON.parse`/`stringify` reordena las claves numéricas (tickers asiáticos) al principio; se reescribió conservando el orden original (diff de 7 líneas).

## Resultado

- Regla a 12 meses (v3, sin marcas del selector): ponderada **+29,3 %**, base **+30,2 %**, pero valor intrínseco < precio → **Mantener**. v2 de control +23,8 % / +18,6 %. BPA −10 %: +17,1 % / +18,0 %. Objetivo ponderado 31,95 BRL.
- Valor intrínseco 17,76 BRL (−32,5 %); DCF adaptado 20,36; con la prima del mercado 19,85 (modelo bancario).
- Calidad: ROE − Ke = −3,6 (2025) / −6,6 (1S26); sostenibilidad «En parte».
- Robustez (sin `--actual`: sin sesión del 27-oct a esta hora): **SÓLIDA, «No mantener»**; nivel de compra hoy: ninguno (calidad). Límites en BRL: comprar ≤ 17,76 (robusto 17,76) solo si además pasara la calidad; filtro de mantener 20,89; vender > 37,77. Aviso D3: `precios.json` sin cierre de SANB11 (no se ejecutó `precios.mjs`, fuera del encargo).
- Controles: 20 de 21 correctos y 1 explicado (terminal del 5 % nominal en BRL).

## Pasos y fecha de los datos (hora de Madrid)

| Paso | Herramienta o fuente | Fecha del dato | Hecho |
|---|---|---|---|
| Cuentas oficiales | Datos abiertos de la CVM (DFP 2021, 2023, 2025; ITR 2026) y 20-F 2025 (SEC) | 1S26 (ITR) y 20-F 2025 (27-feb-2026) | 27-oct 09:55 |
| Documentos primarios | Informes de Resultados 2T26, 2T25 y 2T24; presentaciones 1T26, 3T25, 2T25 y 1T25; Form 425 y 6-K de la oferta; actas del consejo | hasta el 26-oct-2026 | 27-oct 09:58 |
| Datos de bolsa y movimiento (regla 13) | `bolsa.mjs` (SANB11.SA); movimiento recalculado a mano (`movimiento.mjs` cacheado hasta el 23-oct) | cierre del 26-oct-2026 | 27-oct 10:00 |
| Consenso y comparables | `notas/yahoo-datos.mjs` (Yahoo) | 26-oct-2026 | 27-oct 09:52 |
| Tasa libre, SAN y tipo de cambio | bono a 10 años (15,435 %), Yahoo (SAN.MC, EURBRL), BCB (PTAX, Focus del 23-oct, SGS 20539) | 26-oct-2026 | 27-oct 09:55 |
| Valoración bancaria | `notas/valoracion-banco.mjs` → `valoracion-banco.md` | corte 27-oct-2026 | 27-oct 10:02 |
| Notas A-E | `notas/construir-notas.mjs` | corte 27-oct-2026 | 27-oct 10:04 |
| Integración y cálculo | `motor/integrar.mjs`, `motor/calcular-empresa.mjs` | 27-oct-2026 | 27-oct 10:08 |
| Word y PDF | `motor/rellenar.mjs`, `soffice` | 27-oct-2026 | 27-oct 10:09 |
| Robustez | `robustez.mjs` (sin `--actual`: sin sesión del 27-oct) | cierre del 26-oct | 27-oct 10:10 |
| Símbolo y revisión a 12 meses | `simbolos.json` (con `flock`), `flock … apuntar-12m.mjs` | cierre del 26-oct | 27-oct 10:12 |
