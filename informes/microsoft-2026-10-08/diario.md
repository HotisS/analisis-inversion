# Diario: Microsoft (MSFT), corte 2026-10-08

- Commit de partida: `8353c7b Informe de PepsiCo (Comprar, convicción baja)`.
- Inicio: 17:14 (hora de Madrid). La sesión del 8 de octubre en Nasdaq no ha cerrado: precio de cierre del 7 de octubre.

## Fase 1. Identificación (17:14-17:18)
- Microsoft Corporation, MSFT (Nasdaq), ISIN US5949181045, CIK 789019. USD, US GAAP, ejercicio a 30 de junio, etiqueta «fin» (FY2026 = jul-25 a jun-26).
- Último 10-K: FY2026, presentado el 2026-07-29. Sin 10-Q posterior (el 1T27 se publica a finales de octubre).
- Hallazgo: 8-K del 2-sep-2026 anuncia dos segmentos nuevos desde FY2027 (Agents and Infra; Devices and Consumer) con historia reexpresada. El informe usa los tres del 10-K (los vigentes en las cuentas auditadas y con cinco años de historia) y cuenta el cambio.
- Sin DEF 14A de 2026 a la fecha de consulta (el de 2025, del 21-oct-2025).

## Fases 2-4 (subagentes A-D lanzados a las 17:18)
- 17:22 bolsa.json de D: cierre del 7-oct 529,76 USD; mínimo de 52 semanas 349,20 (25-jun-2026) y máximo 553,72 (28-oct-2025). Las etiquetas de los cierres de ejercicio salen corridas un año (fallo 1); avisado a D.
- 17:20-17:28 Lectura propia del 10-K para la tesis: capex de caja 115.948 M (35 % de ventas) y altas de arrendamientos financieros 24.608 M; compras de inmovilizado pendientes de pago 26,7 mM (6,9 mM un año antes), de modo que el capex devengado supera al de caja en ~19,8 mM; arrendamientos aún no iniciados 329,1 mM (FY2027-FY2033); RPO comercial 678 mM (+84 %), 30 % a 12 meses; OpenAI ~25 % «as-converted», ingresos de OpenAI 24,1 mM en FY2026 (parte vinculada); ganancia de dilución por la recapitalización; IRS reclama 28,9 mM (2004-2013). La vida útil de servidores sigue en «2-6 años» (el texto cambia de «computer equipment» a «servers and network equipment»).
- 17:28 Recordatorio a los cuatro: a los 10 minutos las notas eran solo esqueleto. 17:32-17:35 C, B, D y A guardan contenido.
- 17:35-18:02 B, C y D no vuelven a guardar en 27 minutos (A sí, a las 17:56). 18:02 aviso a B, C y D: guardar ya y cerrar en 10 minutos.
- A (17:56): capex con arrendamientos financieros FY2026 145.300 M según la empresa (115.948 M de caja); guía del 1T27 con más de 50.000 M; OpenAI era el 45 % del RPO comercial en el 2T26; vida útil de edificios de 15 a 25 años desde FY2027.
- D: bono a 10 años 5,27 % (FRED, 6-oct-2026); 7.449,5 M acciones diluidas.

- 18:03 A termina (58 llamadas, 45 min). 18:07 D termina (65 llamadas, 48 min). 18:13 C (71 llamadas, 51 min) y B (83 llamadas, 54 min). Ninguno se cortó por límite; todos pasaron del presupuesto de 20 minutos.
- Integración: la nota de sector no borró los segmentos de A (negocio.segmentos, 3; kpis, 8). Claves fuera del esquema de A (notas_para_integrar) y de B (nota_segmentos) usadas como notas de trabajo.

## Integración, cálculo y redacción (18:07-18:35)
- Primer cálculo (18:08, con A y D): DCF 460,55; Mantener (absoluta Vender, relativa Mantener).
- Decisiones: capex del DCF con altas de arrendamientos financieros (52 % de las ventas en FY2027 a 20 % en FY2036); arrendamientos financieros al puente (66.594 M), operativos fuera; OpenAI en el puente a 109.000 M (135.000 M de referencia de Microsoft menos un 21 % de impuesto latente sobre la plusvalía) en vez de 12.000 M a valor contable; consenso con ajuste de EBITDA del 1,5 % de ventas (amortización de MarketScreener distinta); beta 1,05 frente al S&P 500 (Nasdaq 100 0,79-0,94 e IGV 0,74-0,84 descartadas porque Microsoft pesa mucho en ellos y la prima es del S&P 500); terminal 3,5 % nominal con etapa de transición de 5 años; pesos DCF 45, escenarios 40, comparables 15.
- Resultado final: valor objetivo 450,46 USD (−15,0 %), rentabilidad total −14,3 %; con la prima implícita (4,2 %) 511,38 (−3,5 %, −2,8 %). Regla absoluta Vender, relativa Mantener → Mantener, convicción baja (la diferencia es de tasa de descuento). DCF inverso: crecimiento 14,0 % frente a 12,5 %, rentabilidad implícita 9,6 %.
- Controles: 14 de 17 correctos y 3 explicados. Síntesis de 650 palabras. Word y PDF de 57 páginas; revisadas como imagen las páginas 1-4.
- Fin: 18:35 (81 minutos).

## Fallos del sistema
1. `herramientas/bolsa.mjs` etiqueta los cierres de ejercicio con la convención «inicio» siempre que el mes de cierre es ≤ 6 (línea 113: `FY${MES <= 6 ? y - 1 : y}`). Para Microsoft (cierre en junio, etiqueta «fin») el cierre del 30-jun-2026 sale como «FY2025». Arreglo: un parámetro `--etiqueta fin|inicio` (por defecto «fin» salvo enero-marzo) y repetir la fecha en la salida, como ya hace.

2. **Subagentes que no guardan y se pasan de tiempo.** A los 10 minutos las cuatro notas eran esqueleto; tras el recordatorio, B, C y D guardaron una vez (17:32-17:35) y no volvieron a hacerlo en 30 minutos. Todos tardaron 45-54 minutos frente a 20. Arreglo: que prompt-de.mjs imprima al final un recordatorio con hora límite y que un vigilante (Monitor) avise al integrador cuando una nota lleve más de 10 minutos sin cambiar.
3. **Huecos de núcleo en sector por el límite de búsquedas**: sin serie anual del mercado de nube, sin CR5 y sin previsión a cinco años; tampoco calificaciones ESG. Arreglo: anotar en lecciones las fuentes abiertas (comunicados trimestrales de Synergy y Canalys para reconstruir la serie; página de reconocimientos ESG de la empresa) y reservar dos búsquedas por análisis para sector.
4. **form4.mjs**: falló por red en dos presentaciones (sin reintento) y contó por fecha de presentación una compra de abril de 2025 declarada tarde, fuera de los 12 meses. Arreglo: reintentos y filtro por fecha de la operación.
5. **El motor no tiene campo para las altas de arrendamientos financieros** en flujos.historico: el capex sobre ventas histórico (34,9 % en FY2026) no es comparable con el del DCF (que las incluye). Arreglo: campo altas_arrendamientos_financieros y una columna de FCF con ellas.
6. **Circulante sin ingresos anticipados**: en negocios por suscripción el circulante comercial del motor exagera el consumo de caja al crecer. Arreglo: campo opcional ingresos_diferidos en balance.historico, restado del circulante.
7. **Control del terminal fijo en el 3 %**: con el Tesoro al 5,27 %, un 3,5 % nominal es coherente con la regla del prompt (inflación + real, ≤ tasa libre − 0,5) pero el control lo marca. Arreglo: umbral ligado a la tasa libre.
8. **EBITDA del consenso con otra amortización** (MarketScreener 198.685 M frente a 193.771 M en FY2026): D lo marcó como «NIIF» y habría inflado el EV/EBITDA de los próximos 12 meses. Arreglo: que el motor compare el EBITDA del último ejercicio real del proveedor con el de las cuentas y avise si difieren más de un 1 %.
9. **Recuento de palabras de la síntesis**: no lo hace ninguna herramienta (salió 672 y hubo que recortar). Arreglo: que integrar.mjs avise si pasa de 650.
10. **Claves de trabajo fuera del esquema** con nombres distintos en cada nota (notas_para_integrar, nota_segmentos, notas_integrador). Arreglo: una sola clave de primer nivel notas_integrador en el prompt de cada subagente.
