# Diario: Sabesp (SBSP3), análisis value del 27-oct-2026

- Petición de Hotis: «SBSP3» (encargo común del coordinador, 27-oct, 09:01 Madrid). Commit de partida: `bd7cfc6` (Escáner 26-oct tarde).
- Análisis nuevo, método completo (no hay informe anterior de Sabesp). Notas A-E escritas por el analista (sin subagentes) con `notas/construir-notas.mjs`, con la forma de `informes/regeneron-2026-10-24/`.

## Decisiones

1. **Ejercicio natural**; ejercicio objetivo de la regla a 12 meses: **2028e**. PER actual = precio ÷ BPA propio de 2027e (1,92) = 13,2x.
2. **Contabilidad de la concesión (NIIF 12/ICPC 01)**: fuera los ingresos y costes de construcción (margen cero) y la actualización del activo financiero de indemnización; se usan las cifras ajustadas de la empresa (ingresos 2025: 22.213 M). Los activos de la concesión van dentro de los intangibles.
3. **Cuentas**: el 20-F de 2025 no está en los companyfacts de la SEC (`cuentas.mjs --sec SBS` llega a 2024); 2025 y 2026 de los datos abiertos de la CVM (DFP/ITR, CD_CVM 14443) y de las notas de resultados.
4. **WACC 15,68 %**: tasa libre del bono brasileño a 10 años en BRL, 15,435 % el 26-oct (Trading Economics; el CSV del Tesouro Transparente lo corta el proxy); prima adicional 0 (el escáner sumaba 3 puntos dos veces); beta 0,80; prima 5,5 %; Kd 13,5 %; peso deuda 38 %. Sensibilidad con la tasa previa a las elecciones (12,975 %): WACC 14,16 %.
5. **Terminal 4,5 %** (IPCA del Focus 3,5 % + 1 punto real). Control «crecimiento a perpetuidad ≤ 3 %» explicado (BRL).
6. **RAB** (`valoracion.rab`): 113.800 M estimada a jun-2026 (88.000 M validada por ARSESP para 2024 + capex − amortización regulatoria + IPCA). La proyección de ingresos del DCF sigue la retribución regulada (WACC regulatorio 7,86 % + IPCA sobre la BAR media), algo por debajo.
7. **Acciones**: 3.527,6 M (3.516,6 M + ≈ 11 M de la incorporación de EMAE entregadas el 27-oct); desdoblamiento 1:5 de abril de 2026 aplicado a toda la historia.
8. **Precio**: la historia de Yahoo no traía la sesión del 26-oct; cierre tomado del `regularMarketPrice` del gráfico (25,27 BRL; SBS 4,73 USD). Movimiento y regla 13 calculados a mano con ese cierre.
9. **Sostenibilidad «Sí»** (motor «Sí»): el crecimiento financiable (5,4 %) queda por debajo del proyectado (8,2 %) porque la tarifa se indexa al IPCA y el capex se financia con deuda; explicado.
10. **Riesgo político**: Lula gana la presidencia; Tarcísio reelegido en SP en primera vuelta (4-oct). El contrato y ARSESP son estatales; el riesgo federal está en tipos, real, prima de riesgo, decretos del Marco Legal, ANA y BNDES. Regla 13: «no cambia».
11. **Parches**: `consenso.base_ebitda` = NIIF; nombre de la portada acortado («Sabesp (Cia. de Saneamento de SP)») porque se montaba con la cabecera.
12. **Ficheros compartidos** (con `flock`): `simbolos.json` (clave `SBSP3`; al reescribir el JSON con `node -e` se reordenaron las claves numéricas: diff ruidoso, contenido igual), `precios.json` (`precios.mjs SBSP3`) y `objetivo12m-revisados.json` (`apuntar-12m.mjs`).

## Resultado

- Regla a 12 meses (v3, sin marcas del selector): ponderada +2,9 % (3 % con dividendo), base +8,7 % → **Mantener**. v2 de control +8,5 % / +10,5 %. BPA −10 %: −7,1 % / −1,9 %.
- Valor intrínseco 14,46 BRL (−42,8 %); DCF 10,70 (WACC 15,68 %, valor terminal 52 %); con la prima del mercado 12,42; escenarios 3,46 / 10,70 / 17,32.
- Calidad: ROIC 13,0 % − WACC 15,7 % = **−2,7 puntos** (−1,2 antes de las elecciones). No pasa el umbral de 4,5: no es compra a ningún precio.
- DCF inverso: el precio descuenta un crecimiento del 15,2 % (base 7,7 %) o una rentabilidad del 11,9 % (≈ la regulatoria nominal).
- Robustez (`--actual`, cierre del 26-oct): SÓLIDA, «No mantener»; nivel de compra hoy ninguno; límite robusto 14,46 BRL. Marcas M4 (VARIANTE), V1, E2 (resultados el 5-nov), M6.
- Controles: 19 de 20 correctos y 1 explicado.

## Pasos y fecha de los datos (hora de Madrid)

| Paso | Herramienta o fuente | Fecha del dato | Hecho |
|---|---|---|---|
| Cuentas oficiales 2015-2024 | `herramientas/cuentas.mjs --sec SBS` (XBRL de la SEC) | 20-F 2024 (2025 no está en companyfacts) | 27-oct 09:02 |
| Documentos primarios | 20-F 2025, notas de resultados 2T25-2T26, ITR 2T26, 6-K (EMAE, estatutos, junta) | hasta el 21-oct-2026 | 27-oct 09:04 |
| Cuentas 2021-2026 de la CVM | datos abiertos de la CVM (DFP/ITR, CD_CVM 14443) | DFP 2025; ITR 2T26 | 27-oct 09:05 |
| Datos de bolsa y movimiento (regla 13) | `bolsa.mjs`, `movimiento.mjs` SBSP3.SA y SBS + cierre del 26-oct a mano | cierre del 26-oct-2026 (25,27 BRL) | 27-oct 09:05 |
| Consenso y comparables | `notas/yahoo-datos.mjs` (Yahoo) | 27-oct-2026 | 27-oct 09:08 |
| Tasa libre, inflación, tipo de cambio | Trading Economics (10 años BRL), BCB (PTAX, Focus) | 26-oct-2026 (15,435 %; PTAX 5,5007) | 27-oct 09:10 |
| Notas A-E | `notas/construir-notas.mjs` | corte 27-oct-2026 | 27-oct 09:19 |
| Integración y cálculo | `motor/integrar.mjs`, `motor/calcular-empresa.mjs` | 27-oct-2026 | 27-oct 09:24 |
| Word y PDF | `motor/rellenar.mjs`, `soffice` | 27-oct-2026 | 27-oct 09:24 |
| Precios y revisión a 12 meses | `precios.mjs SBSP3`, `apuntar-12m.mjs` (con `flock`) | cierre del 26-oct | 27-oct 09:23 |
| Robustez | `robustez.mjs … --actual` | cierre del 26-oct (sin sesión del 27-oct todavía) | 27-oct 09:25 |
| Símbolos | `simbolos.json` (clave SBSP3, con `flock`) | 27-oct-2026 | 27-oct 09:25 |
| Diario y revisión | este fichero, `revision-12m-2026-10-27.md` | 27-oct-2026 | 27-oct 09:27 |

No se ejecutaron `cobertura.mjs` ni `seguimiento.mjs` (encargo común).
