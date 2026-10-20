# Diario: VeriSign (VRSN), análisis value del 20-oct-2026

- Commit de partida: `8d68ccd55f3df406ae2c2f6b6fec66a065cdd6d2` (HEAD a las 14:12 UTC). Checkout compartido con otro análisis en paralelo: sin pull, commit ni push desde este hilo.
- Inicio: ≈ 14:13 UTC. Fin: ≈ 14:40 UTC (reloj del sistema).
- Análisis nuevo con el método completo (no hay informe anterior de VeriSign). Notas A-E escritas por el analista, sin subagentes, con `notas/construir-notas.mjs`, siguiendo la forma de `informes/cardinal-health-2026-10-19/`. Supuestos en `notas/supuestos.mjs` y textos en `notas/textos.mjs`.

## Decisiones

1. **Ejercicio natural, etiqueta «fin».** Ejercicio objetivo de la regla a 12 meses: **2028e**.
2. **BPA GAAP diluido.** VeriSign no publica un BPA ajustado y el consenso está en esa misma base. Calibrado con 2025: 8,80 frente a 8,81 publicado.
3. **Historia del PER sin los cierres de 2019 y 2020.** El BPA de 2020 y 2021 está inflado por impuestos negativos. La serie empieza en 2017 porque las convertibles de 2016-2017 deforman lo anterior.
4. **PER actual sobre los próximos 12 meses:** 2,4/12 de 2026e más 9,6/12 de 2027e da un BPA de 10,80 y un PER de 28,4x. Con solo 2027e sería 27,6x, y la señal no cambia.
5. **Patrimonio neto negativo por recompras** (−2.154 M a cierre de 2025).
   - El ROIC y el ROE del motor salen n.d. o negativos y no se usan.
   - Se usa el ROIC sobre el capital invertido operativo, que da el motor (`roic_operativo_pct`): 319 % en 2025 y entre el 200 y el 294 % en 2018-2024.
   - ROIC − WACC queda muy por encima de +5 puntos, explicado en el informe.
6. **Ingresos diferidos.**
   - Son cobros anticipados de registros de 1 a 10 años: ≈ 1.300 M, el 101 % de las ventas.
   - En el balance van a `pasivos_contrato` y en el DCF como circulante del −100 % de las ventas, así que el crecimiento genera caja.
   - No se tratan como deuda en el puente.
7. **Puente a 30-jun-2026.**
   - Deuda 2.334,4: incluye los bonos de 2027, amortizados el 20-jul con los nuevos.
   - Caja 1.034,1: efectivo más valores negociables.
   - Arrendamientos operativos fuera (US GAAP).
8. **Contrato de .com.**
   - Registry Agreement con ICANN y Cooperative Agreement (Amendment 35) con el Departamento de Comercio, ambos hasta el 30-nov-2030 con renovación presunta.
   - El precio puede subir hasta un 7 % en los cuatro últimos años de cada periodo de seis. El periodo actual empezó el 26-oct-2024.
   - .com pasa a 10,97 USD el 1-nov-2026. .net pasa a 12,00 el 1-mar-2027 y admite un 10 % al año.
   - El DCF supone subidas cerca del máximo en 2027-2029, ninguna en 2031-2032 (inicio del periodo siguiente) y la renovación en 2030 con el mismo régimen.
   - El bajista recoge una congelación como la de 2012-2018.
9. **Base de dominios.**
   - Cayó en 2023-2024 (−2 % en 2024) y en el 2T26 crece al 5,1 %, con una guía del 5,2-6,0 % en 2026.
   - Proyectamos un volumen del 2-3,5 % al año.
   - Riesgo que vigilar: la subida de noviembre puede frenar las renovaciones.
10. **Berkshire Hathaway.**
    - Vendió un tercio en julio de 2025 y tiene ≈ 9,9 % (8.989.880 acciones en el 13F del 2T26, sin cambio).
    - El bloqueo venció a finales de julio de 2026 y no hay colocación anunciada.
    - Riesgo de presión temporal, no de valor. Veredicto «no cambia».
11. **Riesgo de IA, valorado aparte.**
    - Los buscadores y asistentes de IA pueden restar valor a tener un dominio, porque el usuario llega por el agente y no tecleando la dirección. Probabilidad media, impacto alto, −15 % de valor a 3-5 años.
    - Hoy pasa lo contrario: la IA impulsa altas de dominios, según la dirección, y los agentes siguen dependiendo del DNS.
    - Señal que vigilar: una renovación por debajo del 73 % o la base a la baja dos trimestres seguidos.
12. **Directivos.** Bidzos vendió 32,1 M USD en 12 meses. `form4.mjs` decía «0 con plan 10b5-1», pero el XML se comprobó a mano: aff10b5One = 1, es decir, ventas con plan. Conserva 375.127 acciones.
13. **Precio.** El informe usa el cierre del 19-oct, 306,48 USD. La sesión del 20-oct se comprueba con `robustez.mjs --actual`: 306,64 USD según `precios.mjs` a las 14:36 UTC (10:36 de Nueva York); 307,06 en Yahoo a las 14:15 UTC.
14. **Regla 13: veredicto «no cambia».**
    - No hay avisos P. La acción está un 0,9 % por debajo de su máximo histórico, en tendencia alcista.
    - Los tres movimientos fuertes de 12 meses tienen causa:
      - feb-2026, −9,5 %: el 4T25 decepcionó;
      - may-jun-2026, −19,2 %: miedo a la subida de .com;
      - jul-ago-2026, +16,6 %: guía subida y recompras.
    - Los resultados del 3T26 (22-oct) no aplazan la decisión (regla 11).
15. **Avisos de `rellenar.mjs` que quedan** (datos que no existen):
    - sin suma de partes;
    - sin calificaciones ESG;
    - sin EV/EBITDA NTM ni ROIC de los comparables en Yahoo, por lo que no se dibujan los gráficos `comps_ev` y `comps_mapa`.

## Resultado

- **Controles:** 19 de 19 correctos.
- **Regla a 12 meses** (v3, sin marcas del selector), al cierre:
  - motor con dividendo: ponderada 5,8 %, base 11,2 %;
  - `apuntar-12m` sin dividendo: 5,7 % / 11,1 %;
  - señal **Mantener**. La v2 de control da 13,7 % / 13,6 %, también Mantener.
- **Valor intrínseco:** 218,86 USD (−28,6 %).
  - DCF 219,10 (WACC 9,21 %; con la prima del mercado, 259,02).
  - Escenarios 141,42 / 219,10 / 251,80.
- **Calidad:** sostenibilidad «Sí» (6,1 % proyectado sin inversión neta); ROIC operativo del 319 % frente a un WACC del 9,2 %.
- **Robustez** (cierre y `--actual`):
  - veredicto SÓLIDA; acción robusta «No mantener»; nivel de compra: ninguno;
  - límite común 218,86 USD;
  - BPA −10 %: −4,7 % / 0,1 %;
  - aviso V1: valor intrínseco un 29 % bajo el precio.

## Pasos y fecha de los datos

| Paso | Herramienta o fuente | Fecha del dato |
|---|---|---|
| Cuentas oficiales 2016-2025 | `herramientas/cuentas.mjs --sec VRSN` (XBRL de la SEC) | 10-K 2025, presentado el 5-feb-2026 (cierre 31-dic-2025) |
| Trimestres y balance del puente | 10-Q 1T26 y 2T26 (SEC) | 10-Q 2T26 presentado el 23-jul-2026 (cierre 30-jun-2026) |
| Documentos primarios | 10-K 2025, notas de resultados 3T25-2T26, 8-K (precios de .com y .net, bonos, recompras, consejo), DEF 14A 2026, 13G | nov-2024 a 27-ago-2026 |
| Berkshire Hathaway | 13F del 1T26 y 2T26 (SEC) | 30-jun-2026 |
| Datos de bolsa | `herramientas/bolsa.mjs` (Yahoo) | cierre del 19-oct-2026 (306,48) |
| Consenso y comparables | `notas/yahoo-datos.mjs` (Yahoo quoteSummary) | 20-oct-2026, 14:16 UTC (sesión abierta, 307,06) |
| Tasa libre | Tesoro de EE. UU., curva diaria (10 años) | 19-oct-2026 (5,15 %) |
| Prima de mercado | Damodaran, ERPbymonth | oct-2026 (4,20 %) |
| Directivos | `herramientas/form4.mjs` + XML de Form 4 a mano | 20-oct-2025 a 15-oct-2026 |
| Sentimiento | Stocktwits, Seeking Alpha (RSS), MarketBeat | hasta 19-oct-2026 |
| Movimiento (regla 13) | `herramientas/movimiento.mjs VRSN` | 20-oct-2026 (307,19 USD) |
| Integración y cálculo | `motor/integrar.mjs`, `motor/calcular-empresa.mjs` | 20-oct-2026, 14:34 UTC |
| Word y PDF | `motor/rellenar.mjs`, `soffice` | 20-oct-2026, 14:35 UTC |
| Revisión a 12 meses | `revision-12m-2026-10-20.md`; `herramientas/apuntar-12m.mjs verisign-2026-10-20` | precio 306,48 (19-oct) |
| Símbolo | `verticales/empresa/simbolos.json` (entrada VRSN añadida) | 20-oct-2026 |
| Precios | `herramientas/precios.mjs VRSN` | cierre 19-oct-2026; sesión del 20-oct 306,64 a las 14:36 UTC |
| Robustez | `herramientas/robustez.mjs` (cierre) y `--actual` | 306,48 (19-oct) y 306,64 (20-oct, 14:36 UTC) |
