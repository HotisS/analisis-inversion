# Diario: B3 (B3SA3), análisis value del 27-oct-2026

- Encargo del coordinador (`encargo-comun.md` + B3: «B3 S.A. – Brasil, Bolsa, Balcão (B3SA3, Novo Mercado; ADR OTC BOLSY)»), 27-oct, ≈ 09:00 Madrid. Commit de partida: `bd7cfc6` (Escáner 26-oct tarde).
- Análisis nuevo, método completo (no hay informe anterior de B3). Notas A-E escritas por el analista (sin subagentes) con `notas/construir-notas.mjs`; forma de `informes/lseg-2026-10-26/` (y HKEX, CME).

## Decisiones

1. **Cuentas de la CVM** (datos abiertos DFP 2017-2025 e ITR 2026, filas de B3, CNPJ 09.346.601/0001-25) y releases de ri.b3.com.br. Serie desde 2018: 2016-2017 no comparables (Cetip en marzo de 2017). BPA de 2018-2019 ÷ 3 (desdoblamiento de 2021). La DFC se reconstruyó a mano: los códigos de cuenta cambian de significado entre años.
2. **Caja de clientes fuera**: garantías en efectivo de la cámara (2.655 M) y proventos en custodia (184 M) restados de la caja, el activo y el pasivo, como en HKEX, CME y LSEG. Caja del puente 16.452 M.
3. **BPA recurrente** de B3 para la historia del PER (sin la amortización de Cetip, que acabó en 2024-2025); 2024 y 2025 estimados con los trimestres. Ejercicio objetivo 2028e. PER actual 15,07 ÷ 1,18 = 12,8x.
4. **WACC en BRL 19,75 %**: bono a 10 años 15,435 % (26-oct; 12,98 % el 25-oct), beta 1,10 (medida 1,57, ajustada 1,38), prima 5,5 %, **prima adicional 0** (el escáner sumaba 3 puntos: riesgo país contado dos veces), Kd 15,5 %, deuda 16,6 %. Terminal 5,5 % (Focus IPCA 2027 4,1 % + 1,4 real). Referencia de mercado: Damodaran 4,20 % (oct-2026).
5. **Tipo efectivo 29-30 %**: nominal 37 % desde el 2T26 (LC 224/2025) con escudo de JCP; los créditos extraordinarios de JCP (510 M y 277,5 M) son no recurrentes.
6. **ROIC con y sin fondo de comercio**: con él 23,3 % (filtro); sin él no tiene sentido (fondo de comercio 24.359 M > capital invertido 18.803 M por el circulante negativo y el impuesto diferido); sin el de Cetip ≈ 40 %.
7. **Regla 13**: «retrasa» hasta conocer la política fiscal del gobierno electo o hasta 10,50.
8. **Riesgo de IA**: bajo, mixto.

## Resultado

- Regla a 12 meses (v3, sin marcas del selector): ponderada +18,2 % (robustez 18,3 %), base +15,8 % → **Mantener** (valor intrínseco por debajo del precio). v2 15,8 % / 11,6 %. BPA −10 %: 6,7 % / 4,5 %.
- Valor intrínseco 10,50 BRL (−30,3 %); DCF 8,46 (WACC 19,75 %); con la prima del mercado 11,14. DCF inverso: rentabilidad implícita 13,3 %.
- Calidad: ROIC 23,3 % − WACC 19,75 % = **+3,6 puntos (< 4,5)**; sostenibilidad «Sí». Barrido del 26-oct: −4,1 con el WACC duplicado.
- Sensibilidad: tasa libre 12,98 % → WACC 17,41 %, ROIC − WACC 5,9, valor intrínseco 11,88; 13,5 % → 17,90 %, 5,4, 11,54.
- Robustez: SÓLIDA, «No mantener»; nivel de compra hoy ninguno; límite de compra 10,50 BRL (≈ 5,83 USD por ADR BOLSY a 5,403); filtro de mantener 12,35; vender por encima de 19,80.
- Controles: 18 de 19 correctos y 1 explicado (crecimiento terminal nominal en BRL).

## Pasos y fecha de los datos (hora de Madrid)

| Paso | Herramienta o fuente | Fecha del dato | Hecho |
|---|---|---|---|
| Datos de bolsa | `bolsa.mjs --accion B3SA3.SA --indice BOVA11.SA` | cierre del 26-oct-2026 (15,07 BRL) | 27-oct 09:02 |
| Cuentas oficiales 2017-2026 | Datos abiertos de la CVM (DFP e ITR) | DFP 2025; ITR 2T26 (11-ago-2026) | 27-oct 09:03 |
| Documentos primarios | `descargar.mjs`: releases 2T26, 4T25, 4T24, 4T23, 4T20; estados financieros 2023 | hasta el 11-ago-2026 | 27-oct 09:08 |
| Consenso, comparables y cambios | `notas/yahoo-datos.mjs` (Yahoo) | 26-oct-2026 | 27-oct 09:09 |
| Movimiento y noticias (regla 13) | `movimiento.mjs B3SA3.SA`; InfoMoney, BP Money, Bloomberg Línea y otros | hasta el 26-oct-2026 | 27-oct 09:10 |
| Tasa libre y Focus | Trading Economics (15,435 %); Focus del 15-jun-2026 | 26-oct-2026 | 27-oct 09:23 |
| Notas A-E | `notas/construir-notas.mjs` | corte 27-oct-2026 | 27-oct 09:21 |
| Integración y cálculo | `motor/integrar.mjs`, `motor/calcular-empresa.mjs` | 27-oct-2026 | 27-oct 09:26 |
| Word y PDF | `motor/rellenar.mjs`, `soffice` | 27-oct-2026 | 27-oct 09:26 |
| Revisión a 12 meses | `apuntar-12m.mjs` (con cerrojo) | cierre del 26-oct | 27-oct 09:25 |
| Símbolo | `simbolos.json` (con cerrojo, `node -e`) | — | 27-oct 09:25 |
| Robustez | `robustez.mjs`, `--actual` y `--json` | cierre del 26-oct (sin sesión del 27-oct todavía) | 27-oct 09:26 |
