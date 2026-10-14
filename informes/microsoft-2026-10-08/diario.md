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

## Actualización v2 (13 oct 2026): sostenibilidad del crecimiento y caso base al crecimiento financiable

Sin investigación nueva. Script: `notas/actualizacion-v2.mjs` (parte de `datos.json`), salida `datos-v2.json`, `Microsoft - 2026-10-08 v2.docx` y su PDF (52 páginas). Mismo precio (529,76 USD, cierre del 7-oct) y fecha de corte. La prueba fallaba con los supuestos de v1, así que el recorte del caso base (`encargo-recorte`) va en esta misma versión.

| | v1 | v2 |
|---|---|---|
| Recomendación · convicción | Mantener · Baja | **Vender · Baja** (la sugerida también es Baja: la relativa está a 0,7 puntos del umbral) |
| DCF (WACC 10,34 %) | 463,46 USD | 419,91 USD |
| Valor objetivo | 450,46 USD, RTE −14,3 %, asimetría 0,25x | 413,69 USD, RTE −21,2 %, asimetría 0,04x |
| Con la prima del mercado (4,2 %, WACC 9,52 %) | 511,38 USD, RTE −2,8 % | 469,70 USD, RTE −10,7 % |
| Regla absoluta / relativa | Vender / Mantener | Vender / Vender |
| Comprar por debajo / vender por encima | 447,76 / 568,48 (el motor actual daría 432,44 / 568,48) | 397,14 / 517,94 |
| Crecimiento medio proyectado · financiable al ROIC (30,9 %) | 12,4 % · 7,1 % (reinversión del 23 % del NOPAT) | 12,4 % · 10,5 % (34 %) |
| Capital nuevo frente al incremental histórico (27,7 %; tope 1,25 × 30,9 = 38,6 %) | 42,9 % (falla) | 29,3 % (pasa) |
| Sostenibilidad del crecimiento | — | **En parte** |

- **Por qué fallaba**: no por el crecimiento de los primeros años (guía y cartera), sino por la cola. En FY2031-FY2036 el capex se acercaba a la amortización (inversión neta del 1,5-4,5 % de las ventas) con las ventas creciendo un 6,5-13 %: las ventas sobre el capital invertido subían de 0,82 (FY2026: 331.839 / 405.335) a 1,07 en FY2036. Un negocio que se ha vuelto de infraestructura no tiene precedente de eso.
- **Supuesto cambiado** (solo uno): capex de FY2030e-FY2036e de 28 / 25 / 23 / 22 / 21 / 20,5 / 20 % a 32,5 / 29,5 / 28 / 27 / 25,5 / 25 / 24,5 % de las ventas (+4,5 puntos). Es el mínimo para que el financiable (10,5 %) más la parte de precio del puente (≈ 2 puntos, que no pide capital) cubra el 12,4 % proyectado; la rotación queda en 0,84. Crecimiento, márgenes, WACC, terminal, etapa de transición y escenarios, sin cambios. Se descartó bajar solo el crecimiento: con −1,5 puntos en FY2031-FY2036 el financiable apenas se mueve (7,2 %) y el DCF cae a 427 USD sin pasar la prueba; haría falta quitar más de tres puntos al año. Medido con el motor: cada punto de capex en la cola resta ≈ 9,5 USD; medio punto de crecimiento, ≈ 13 USD.
- **Puente FY2027e-FY2030e** (estimación propia a nivel de grupo): volumen 15/16/15/13, precio 2,5/2/2/2, otros 0. Precio: E3 +8 %, E5 +5 % y Office 365 E3 +13 % desde el 1-jul-2026 [27] y el ingreso por usuario de Microsoft 365 (+17 % de ingresos con +6-7 % de puestos en FY2026) [1, 8, 19]. **`mercado_final`: null**: la cuota del 20 % es de Azure (algo más de 100.000 M) en la nube de infraestructura de Synergy, y el DCF proyecta el grupo.
- **Cambia la señal**: Mantener → Vender, porque la relativa pasa de −2,8 % a −10,7 % (umbral −10 %). Está en el borde: con el precio por debajo de 517,94 USD volvería a Mantener. Convicción Baja, la misma que dan los criterios. Textos reescritos con las cifras de `calc`: síntesis (645 palabras), tesis, visión diferencial, `en_contra`, `cambiaria_recomendacion`, `dcf.justificacion.inversion` y `.terminal` (múltiplo implícito 7,7x), `dcf.etapa2.justificacion` (571.166 M), `dcf.lectura`, narrativa del base, `escenarios.comentario`, `valoracion.comentario`, efectos en valor de los riesgos, primera pregunta de comité y el control explicado del terminal (405,64 USD con un 3,0 %). Controles: 17 de 20 correctos y 3 explicados (los de v1). Avisos del Word: los tres de v1 (suma de partes, ESG, gráfico de sector).

**Fallos del sistema vistos**
1. La prueba de reinversión mezcla años: el capex de FY2026-FY2027 (52 % de las ventas) construye capacidad que se factura después, y el ROIC de FY2026 ya está deprimido por obra en curso. El financiable (ROIC × tasa de reinversión de toda la proyección) castiga las proyecciones con la inversión al principio y la cola ligera, y no avisa de la rotación del capital, que es lo que de verdad fallaba. Arreglo: dar en la tabla las ventas sobre el capital invertido del último real y del último proyectado.
2. La regla «financiable más la parte de precio» no tiene campo: el motor compara el financiable con el crecimiento total y no resta el `precio_pct` del puente. Arreglo: una fila con el crecimiento en volumen frente al financiable.
3. Los escenarios desplazan crecimiento y margen pero no el capex: el bajista conserva la intensidad de capital del base aunque crezca tres puntos menos, y por eso empeora de −44,8 % a −51,9 % con este cambio. Arreglo: `ajuste_capex_pp` en los escenarios.
4. Como en otros informes viejos, el motor actual mueve el nivel de compra de v1 (447,76 → 432,44) sin cambiar datos.
- 13-oct-2026: revisión v2 a 12 meses (PER propio × BPA propio): objetivo 592,56 USD (media ponderada; base 611,46), rentabilidad +12,6 %, señal Mantener (`revision-12m-2026-10-13.md`).
- 14-oct-2026: objetivo a 12 meses con la regla de múltiplos común (`valoracion.objetivo_12m`): ponderada +12,6 % → +12,6 %, base +16,1 %, señal Mantener (`revision-12m-2026-10-13.md`).

- 2026-10-14: datos-v3.json = regla de múltiplos v3 con la historia del PER adelantada construida por herramientas/historia-adelantada.mjs (5 años; mediana 28.1x, mínimo 26.5x, media larga 26.5x; antes v2 35.2x/21.6x/31.4x). Solo cambian el objetivo a 12 meses y la señal; el Word no se regenera.
