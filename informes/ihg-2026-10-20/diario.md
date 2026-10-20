# Diario: InterContinental Hotels Group (IHG), análisis value del 20-oct-2026

- Commit de partida: `a2af6564bc5450f6820a6844379c77b5f3ad38be` («Cola de índices: InterDigital (pareja 18)»). Este hilo comparte el checkout con otro análisis en paralelo, así que no hace pull, commit ni push.
- Inicio: 10:36 UTC. Fin: ≈ 11:10 UTC (reloj del sistema).
- Es un análisis nuevo con el método completo; no había informe anterior de IHG. Las notas A-E las escribió el analista, sin subagentes, con `notas/construir-notas.mjs`, siguiendo la forma de `informes/cardinal-health-2026-10-19/`.

## Decisiones

1. **Divisa.** Desde el 2-ene-2026 la acción cotiza en Londres en USD: `meta.divisa = divisa_cotizacion = USD` y `tipo_cambio = 1`.
   - La historia de IHG.L en Yahoo está convertida de GBp al cambio de hoy, así que está rota: el cierre de 2024 da 133,98 frente a 124,92 del ADR.
   - Para la historia se usa el ADR de NYSE (1:1, USD): `notas/bolsa-adr.json`, frente a ACWI y PEJ.
2. **Base de la cuenta: «segmentos reportables».** Quedan fuera el Fondo del Sistema, los costes reembolsados y los excepcionales. El interés, el impuesto y el BPA son los ajustados de IHG, la base de la guía, del consenso y de la historia del PER.
   - El balance y los flujos son los NIIF del XBRL del 20-F.
   - `activos_contrato` y `pasivos_contrato` van a null, porque mezclan los ingresos diferidos de la fidelidad del Fondo.
3. **DPA de 2016-2019.** El XBRL lo trae mal (incluye extraordinarios y lo da pagado en vez de devengado). Se corrige con el historial de dividendos del informe anual de 2025.
4. **Dinero clave.** Los costes de adquisición de contratos van en el flujo operativo NIIF. En el DCF se tratan como inversión: capex del 7,5 % de los ingresos (7,0 % desde 2029e), con la inversión neta de 185 M de 2025 y la guía de 200-250 M.
5. **ROIC con patrimonio negativo.** El patrimonio es de −2.978 M por las recompras, y el ROIC del motor (165 %) no sirve. A mano: NOPAT 923 ÷ capital operativo ≈ 2.640 ≈ 35 %, es decir, ROIC − WACC ≈ +25 puntos. Está en `controles_explicados`.
6. **Puente a 30-jun-2026.**
   - Deuda financiera: 4.094 (préstamos 4.147 − derivados 53).
   - Arrendamientos 394; caja 825; pensiones 67; minoritarios 4; asociadas 58.
   - `otros_ajustes` 391: recompras de julio a septiembre (≈ 295) + dividendo a cuenta de 96 pagado el 1-oct.
   - Acciones: 148,3 M (147,16 M de derechos de voto + 1,1 M de dilución).
7. **WACC 9,83 %.**
   - Tasa libre del 5,15 % (Tesoro a 10 años, 19-oct).
   - Beta de 1,05, entre la mensual a 5 años (1,21) y la semanal a 2 años (0,78).
   - Prima del 5,5 %; coste de la deuda del 5,6 %; peso de la deuda del 16 %.
   - Con la prima de Damodaran (4,20 %), el WACC es del 8,7 %.
8. **BPA propio sin recompras no anunciadas:** 2026e 5,68; 2027e 6,44; 2028e 7,15 (bajista 5,72, alcista 7,61). El bajista es una recesión de viajes en 2027, con `perfil` −14 puntos de crecimiento y −4 de margen.
9. **PER actual = precio ÷ BPA de los próximos 12 meses:** 2,4/12 × 2026e + 9,6/12 × 2027e = 6,29, es decir, 26,7x. Con solo 2027e serían 26,0x; la señal no cambia.
10. **Historia adelantada.** Se excluyen 2019 y 2020, porque el BPA del año siguiente es el de la pandemia. La mediana de 5 años es 23,1x; el mínimo, 15,5x; la media larga, 21,6x.
11. **Comparables.** La mediana del PER NTM es 14,6x en una muestra partida: Marriott, Hilton e Hyatt están a 30-35x y el resto a 13-17x. Pesan un 10 %. Las transacciones no tienen múltiplo publicado y pesan 0.
12. **Regla 13: veredicto «no cambia».**
    - La herramienta no da avisos P y la tendencia es alcista.
    - Los tres movimientos fuertes tienen causa: feb-mar −11 % (Oriente Medio), abr-jun +30 % (avance del 1T, petróleo, Mundial) y jul −10,7 % (geopolítica, Zacks).
    - No hay colocaciones ni ofertas, y el bono de 850 M EUR es deuda ordinaria.
    - El avance del 3T del 22-oct no aplaza la decisión (regla 11).
13. **Riesgo de IA: «Mixto», exposición media, −5 a −10 % a 3-5 años.** Los agentes de reserva pueden saltarse el canal directo (26 % de los ingresos por habitaciones) y la fidelidad (67 % de las noches). IHG está en el piloto de agentes de Google y tiene un complemento para ChatGPT.

## Resultado

- **Regla a 12 meses** (v3, sin marcas del selector), al cierre del 19-oct (167,75): ponderada −4,7 % y base +6,8 % con dividendo, es decir, **Mantener**. La v2 de control da −1,9 % y +4,7 %.
- **Con la sesión del 20-oct** (167,45 USD, precios.mjs): −4,5 % y +7,0 %.
- **Valor intrínseco:** 77,45 USD (−53,8 %). El DCF da 78,03 (VT 62 %) y, con la prima del mercado, 94,46. El DCF inverso implica un crecimiento del 16,2 % y una rentabilidad del 6,5 %.
- **Calidad: pasa.** El ROIC a mano es ≈ 35 % frente a un WACC del 9,8 % y la sostenibilidad es «Sí».
- **Robustez (`--actual`):** SÓLIDA. Acción robusta: «No mantener», es decir, no es compra, porque el valor intrínseco queda un 54 % bajo el precio. El límite de compra y el límite robusto son 77,45 USD. Con el BPA −10 %, la ponderada da −14,0 % y el base −3,6 %.
- **Controles:** 19 de 19 correctos. Avisos del Word: tablas vacías de suma de partes y ESG, el gráfico del mapa de comparables y el de transacciones sin múltiplos.

## Pasos y fecha de los datos

| Paso | Herramienta o fuente | Fecha del dato |
|---|---|---|
| Cuentas oficiales 2016-2025 | `herramientas/cuentas.mjs --sec IHG` (XBRL del 20-F, CIK 0000858446) | 20-F 2025, presentado en feb-2026 (cierre 31-dic-2025) |
| Documentos primarios | Resultados de 2019, 2021, 2023 y 2025, 1S25 y 1S26, avance del 1T26 y del 3T25, informe anual y 20-F 2025, investor pack de mar-2026, transcripciones, juntas de 2025 y 2026, 6-K (derechos de voto, participaciones, directivos, consejo, bono) | 2020 a 16-oct-2026 |
| Datos de bolsa | `herramientas/bolsa.mjs` (Yahoo): ADR IHG frente a ACWI y PEJ (IHG.L solo como referencia) | cierre del 19-oct-2026 |
| Consenso y comparables | `notas/yahoo-datos.mjs` (Yahoo quoteSummary), consenso recopilado por IHG, MarketScreener | 20-oct-2026 10:43 UTC (sesión abierta); consenso de IHG del 15-oct-2026 |
| Competidores (ingresos y EBIT) | XBRL de la SEC (MAR, HLT, WH, CHH, ABNB) y ESEF (Accor) | ejercicio 2025 |
| Tasa libre | Tesoro de EE. UU., curva diaria | 19-oct-2026 (5,15 %) |
| Prima de mercado | Damodaran, ERPbymonth | oct-2026 (4,20 %) |
| Sentimiento | Seeking Alpha (RSS), Stocktwits, Simply Wall St, Kalkine | may a oct-2026 |
| Movimiento (regla 13) | `herramientas/movimiento.mjs IHG.L` | 20-oct-2026 (167,55 USD) |
| Integración y cálculo | `motor/integrar.mjs`, `motor/calcular-empresa.mjs` | 20-oct-2026 |
| Word y PDF | `motor/rellenar.mjs`, `soffice` | 20-oct-2026 |
| Revisión a 12 meses | `herramientas/apuntar-12m.mjs ihg-2026-10-20` | precio 167,75 (cierre del 19-oct) |
| Símbolo | `verticales/empresa/simbolos.json` (entrada IHG añadida) | 20-oct-2026 |
| Precios | `herramientas/precios.mjs IHG` | cierre del 19-oct-2026; sesión del 20-oct: 167,45 |
| Robustez | `herramientas/robustez.mjs … --actual` | sesión del 20-oct-2026 (167,45) |
