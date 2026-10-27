# Diario: Banco Santander (SAN), análisis value del 27-oct-2026

- Petición: «y santander español?» (encargo del coordinador, 27-oct, ≈ 10:15 Madrid). Commit de partida: `511eaa6`.
- Análisis nuevo, método completo (no hay informe anterior de Banco Santander). Notas A-E escritas por el analista (sin subagentes) con `notas/construir-notas.mjs`, con la forma de `informes/santander-brasil-2026-10-27/` e `informes/itau-unibanco-2026-10-27/`.
- **Es un banco y el motor no tiene modelo de bancos.** Mismas adaptaciones que Itaú, BTG y Santander Brasil; el cálculo bancario está en `valoracion-banco.md` (generado por `notas/valoracion-banco.mjs`).
- **3T26 no publicado**: sale mañana, miércoles 28-oct, antes de la apertura (6-K del 21-oct). Se usa el 2T26/1S26.
- **Clave del repo `SAN.MC`** (no `SAN`, que es Sanofi en `simbolos.json` y en `objetivo12m-revisados.json`): `identificacion.ticker` = «SAN.MC».

## Decisiones

1. **Línea de compra: SAN en la Bolsa de Madrid (EUR)**; ADS SAN en la NYSE (1 ADS = 1 acción). Precio 11,154 € (cierre del 26-oct-2026, −3,1 %; `bolsa.mjs`). A las 10:40 la sesión del 27-oct seguía abierta (≈ 11,11 €): se queda el cierre del 26-oct; `robustez.mjs --actual` no cambia nada.
2. **Bases contables**: serie del informe en **NIIF** del ESEF 2021-2025 (`cuentas.mjs --esef`, filings.xbrl.org); 2023-2024 reexpresados sin Polonia. BPA, RoTE, regla a 12 meses y modelo bancario con la **cuenta ordinaria** del Informe Financiero del 2T26 (6-K en la SEC; santander.com bloquea la descarga con Incapsula). Los XBRL completos (≈ 95 MB) se leyeron en el directorio temporal y no se guardan en el repo.
3. **Coste del capital en EUR**: Bund a 10 años 3,43 % (Bundesbank, 26-oct, `descargar.mjs`) + beta 1,24 (mensual 5 años frente al STOXX 600; semanal 1,43; Yahoo 0,94) × 5,5 % + **prima país ponderada 1,81** (`prima_adicional_pct`): peso de cada país en el beneficio ordinario del 1S26 (segmentos secundarios sin centro corporativo) × prima por país de Damodaran (ctryprem.xlsx, ene-2026, método por calificación: España 1,55, Reino Unido 0,78, Portugal 1,55, EE. UU. 0,23, México 2,46, Brasil 3,24, Chile 1,10, Argentina 9,71; Openbank Europa 1,0 y resto 1,5, estimados). **Ke 12,06 %**. Sin prima país 10,25 %; con la prima de Damodaran (4,2 %) 10,45 %; beta 1,0 10,74 %; Brasil con la subida de su bono del 26-oct 12,40 %. Terminal 3 % nominal en euros.
4. **Calidad = RoTE ordinario − Ke**: 15,2 % (2025) → 3,14; 15,6 % (1S26) → 3,54. **No pasa el 4,5.** Sin prima país pasaría (4,95 / 5,35). Con RoE (13,6 %, con el fondo de comercio) 1,54. La conclusión depende de la prima país; se mantiene porque el 40 % del beneficio es de América Latina.
5. **Valor intrínseco = exceso de rentabilidad sobre el VTC por acción**: 6,32 € a 30-jun menos Webster (fondo de comercio estimado ≈ 5.005 M: 3.559 M en acciones + 7.089 M en efectivo − 5.643 M de valor tangible de Webster) = **6,08 € pro forma**. RoTE 16 % → 18 % → 16,5 %; ponderado 25/50/25 **10,05 €** (base 10,20; bajista 7,64; alcista 12,16). P/VTC justificado (RoTE 17 %, g 3 %) 1,55x = 9,40 €, frente a 1,83x en bolsa. Ke implícito en el precio 11,34 %. No se resta el dividendo a cuenta de 0,127 € (el comprador de hoy lo cobra: último día con derecho el 28-oct).
6. **DCF del motor adaptado** a flujo para el accionista, peso 0: 10,25 € en el base (cuadra con el modelo bancario).
7. **Brasil y el canje de SANB11**: Brasil = **13,9 % del beneficio ordinario de los países en el 1S26** (1.093 de 7.854 M; 14,0 % en el 1S25) con nuestro cálculo; el encargo citaba 14,9 % (1S26) y 15,4 % (2025), y Jefferies 16 % en 2025: otra base (probablemente sin el resto del grupo o con el centro corporativo). Canje: ≈ 0,4000 SAN por unit × ≈ 378 M de units de minoritarios = **≈ 151 M de acciones nuevas (1,05 %)**; hasta el 1,1 % del capital según la matriz; compra ≈ 256 M € de beneficio al año → **BPA +0,6 %**; **neutra en el CET1** según la matriz. Estado: registrada en CVM, B3 y SEC (F-4) el 21-sep; cierre esperado en el 1S27. Efecto del 26-oct: SAN −3,1 %.
8. **Perímetro 2026 comprobado**: Polonia (49 % de Santander Bank Polska) vendida a Erste el 9-ene (plusvalía 1.895 M); TSB comprada el 30-abr (−55 p.b. de CET1); **Webster comprada el 20-ago** (329,8 M de acciones nuevas a 10,7896 €, ≈ −150 p.b. de CET1); Openbank = nuevo nombre de Digital Consumer Bank (1T26). Acciones: 15.019 M tras Webster, 14.556 M tras amortizar las 462,7 M de la recompra de 5.030 M, ≈ 14.450 M en circulación con la recompra de 1.825 M en curso (1.474 M ejecutados al 21-oct).
9. **Regla a 12 meses (v3) con BPA ordinario**: 2026e 1,00; 2027e 1,16; 2028e 1,05 / 1,28 / 1,43. PER adelantado: actual 9,6x, mediana 5,3x, mínimo 4,3x (2022), media larga 5,9x; comparables 9,0x. **La historia de 2020-2024 es de tipos negativos**: la regla lleva el bajista a 4,3x; no hay motivo del método para excluir esos años, así que se deja y se dice que la señal no es fiable.
10. **Indicadores bancarios (2T26)**: CET1 14,0 % (phased-in; requisito 9,83 %; 12,8-13 % esperado a fin de año con Webster), morosidad 2,93 % con cobertura 64 %, coste del riesgo 1,15 % (Brasil 4,14 %, Argentina 11,12 %), eficiencia 42,8 %, margen de intereses 11.692 M (+6,1 % en el trimestre). Remuneración: 50 % del beneficio ordinario (mitad efectivo, mitad recompras) en 2026; 35 % + 15 % desde 2027.
11. **Regla 13 (`movimiento.mjs SAN.MC`)**: 1 m −11,1 %, 12 m +27,0 %, −14,2 % del máximo de 52 semanas (13,12 € el 13-ago). Movimientos fuertes: 26-oct −3,1 % (Lula), 22-oct −4,1 %, 1-oct −4,2 % (bono español, primera vuelta en Brasil), 2/3-mar −11 %. `bolsa.contexto`: «no cambia».
12. **Gobierno**: sección con poca información (consejo completo, votos y remuneración no leídos: santander.com bloqueada); queda por debajo del 60 % de cobertura.

## Resultado

- Regla a 12 meses (v3, sin marcas del selector): ponderada **−8,9 %**, base **+2,1 %** → Mantener por la regla, pero no pasa el filtro de mantener → **No mantener**. v2 de control −28,3 % / −31,3 % (Vender). Sin doble castigo −2,6 %. BPA −10 %: −17,8 % / −8,0 %. Objetivo ponderado 9,91 €.
- Valor intrínseco 10,05 € (−9,9 %); DCF adaptado 10,25; sin prima país 12,76 (ponderado).
- Calidad: RoTE − Ke = 3,14 (2025) / 3,54 (1S26); sostenibilidad «En parte».
- Robustez: **SÓLIDA, «No mantener»**; nivel de compra hoy: ninguno (calidad). Límites en EUR: comprar ≤ 8,84 (robusto 6,84) solo si además pasara la calidad; filtro de mantener 9,23; vender > 11,29. Aviso D3: `precios.json` sin cierre de SAN.MC (no se ejecutó `precios.mjs`, fuera del encargo).
- Controles: 20 de 24 correctos y 4 explicados (actividades interrumpidas de Polonia y BPA con AT1).

## Pasos y fecha de los datos (hora de Madrid)

| Paso | Herramienta o fuente | Fecha del dato | Hecho |
|---|---|---|---|
| Cuentas oficiales | `cuentas.mjs --esef "Banco Santander"` (ESEF 2018-2025) y XBRL de 2021, 2023 y 2025 | 2025 (ESEF de 2025) | 27-oct 10:18 |
| Documentos primarios | 6-K en la SEC: Informe Financiero, nota de prensa y presentación del 2T26; Webster, recompras, reducción de capital, dividendo a cuenta, oferta por Santander Brasil, convocatoria del 3T26 | hasta el 22-oct-2026 | 27-oct 10:24 |
| Datos de bolsa y movimiento (regla 13) | `bolsa.mjs` (SAN.MC frente a ^IBEX, EXV1.DE, beta frente a ^STOXX), `movimiento.mjs SAN.MC` | cierre del 26-oct-2026 (movimiento con la sesión del 27-oct en curso) | 27-oct 10:22 |
| Consenso y comparables | `notas/yahoo-datos.mjs` (Yahoo) | 27-oct-2026 | 27-oct 10:27 |
| Tasa libre y prima país | Bundesbank (Bund 10 años, 3,43 %), Damodaran ctryprem.xlsx (ene-2026) | 26-oct-2026 | 27-oct 10:29 |
| Valoración bancaria | `notas/valoracion-banco.mjs` → `valoracion-banco.md` | corte 27-oct-2026 | 27-oct 10:31 |
| Notas A-E | `notas/construir-notas.mjs` | corte 27-oct-2026 | 27-oct 10:33 |
| Integración y cálculo | `motor/integrar.mjs`, `motor/calcular-empresa.mjs` | 27-oct-2026 | 27-oct 10:35 |
| Word y PDF | `motor/rellenar.mjs`, `soffice` | 27-oct-2026 | 27-oct 10:37 |
| Robustez | `robustez.mjs` y `--actual` (sin cierre del 27-oct) | cierre del 26-oct | 27-oct 10:38 |
| Símbolo y revisión a 12 meses | `simbolos.json` (clave SAN.MC, con `flock`), `flock … apuntar-12m.mjs` | cierre del 26-oct | 27-oct 10:39 |

Revisión a 12 meses: `revision-12m-2026-10-27.md` (v3 −8,9 % / base +2,1 %, No mantener; marca «¡REVISAR!» por la distancia v3-v2).
