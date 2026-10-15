# Ficha sectorial: consultoría y servicios tecnológicos para el Gobierno de EE. UU. («GovCon services») · 15-oct-2026

Hecha en el análisis de Booz Allen (`informes/booz-allen-2026-10-15/`). Comparables a 14-oct-2026 en `consultoria-gobierno-2026-10-15-comparables.json`. Cifras de mercado válidas hasta el 14-nov-2026.

## 1. Perímetro

- **Entra**: contratistas que venden servicios profesionales, de ingeniería y de tecnología (TI, datos, ciberseguridad, IA, apoyo a misiones) al Gobierno federal de EE. UU., con contratos de coste más margen, por horas y precio fijo, y plantilla con habilitación de seguridad. GICS 202020 *Professional Services* y 451020 *IT Services*; NAICS 5415 y 5416.
- **No entra**: fabricantes de armamento y plataformas (Lockheed, General Dynamics, RTX: ficha `defensa-2026-10-15.md`), consultoras comerciales con poco peso federal (Accenture, excluida además por el usuario) y servicios sanitarios gestionados.
- **`mercado_final` en los informes value**: el gasto federal total en contratos (793.000 M USD en el año fiscal 2025) es demasiado amplio: la cuota de cualquier empresa sale del 0,2-2,2 %. Se usa `null` y la prueba de cuota se hace a mano con las ventas de la empresa frente a ese total y frente a los servicios (≈ 249.000 M en las agencias civiles).

## 2. Tamaño y crecimiento

- **Contratos federales, año fiscal 2025**: ≈ 793.000 M USD, +17.800 M en términos reales frente a 2024 (755.100 M) (GAO, 5-may-2026, https://www.gao.gov/blog/snapshot-government-wide-contracting-fy-2025-interactive-dashboard).
- **Segunda fuente**: 792.800 M en 2025 (+5,0 % nominal); Defensa 491.600 M (62 %), agencias civiles 301.200 M, de ellos 249.000 M (82,6 %) en servicios (FederalBudgetIQ con datos del Tesoro, https://federalbudgetiq.com/insights/federal-addressable-market-shifts/).
- **El nicho que cae**: los servicios de asesoría y gestión bajaron un 19 % en 2025, a su mínimo de cinco años: un tercio menos en las agencias civiles (26.000 M) y −1 % en Defensa (24.000 M) (Bloomberg Government, ene-2026).
- **Crecimiento previsto**: n.d. de fuente independiente. Estimación propia: 2-4 % nominal anual en 2026-2030 para el conjunto, con Defensa e inteligencia por encima (presupuesto de defensa al alza, ley de reconciliación de 2025) y servicios civiles planos o a la baja hasta 2027.
- **De qué depende**: volumen (horas facturadas y plantilla habilitada) más que precio; la mezcla se mueve hacia precio fijo por la orden ejecutiva de 30-abr-2026 («Promoting Efficiency, Accountability, and Performance in Federal Contracting»).

## 3. Estructura competitiva y cotizadas (cierre 14-oct-2026, USD)

| Empresa | Ticker | Cap. (M USD) | Crec. ventas (prev. 3 años) | Margen EBITDA | ROIC | DN/EBITDA | EV/EBITDA LTM | PER adelantado |
|---|---|---|---|---|---|---|---|---|
| Booz Allen | BAH | 8.640 | n.d. | 11,3 % | 20,2 % | 3,1 | 9,8 | 11,6 |
| Leidos | LDOS | 15.130 | 5,1 % | 13,5 % | 14,3 % | 2,6 | 8,8 | 10,0 |
| CACI | CACI | 13.350 | 8,4 % | 12,4 % | 7,4 % | 4,1 | 15,6 | 18,0 |
| SAIC | SAIC | 5.510 | 1,4 % | 10,2 % | 12,4 % | 3,3 | 10,8 | 12,8 |
| KBR | KBR | 4.440 | 4,6 % | 8,7 % | 10,2 % | 3,3 | 10,3 | 8,6 |
| Parsons | PSN | 4.570 | 3,6 % | 7,5 % | 6,6 % | 3,0 | 12,6 | 13,0 |
| ICF | ICFI | 1.550 | 5,3 % | 10,8 % | 6,9 % | 2,6 | 10,7 | 11,6 |
| Maximus | MMS | 3.020 | 2,4 % | 13,2 % | 13,3 % | 2,3 | 6,8 | 7,0 |

Fuente: Stock Analysis, estadísticas de cada empresa a 14-oct-2026 (PER adelantado sobre BPA ajustado de cada empresa; DN/EBITDA = deuda/EBITDA). **Mediana del PER adelantado de los siete comparables: 11,6x.** Mercado fragmentado: el mayor (Leidos, ≈17.600 M de ventas) tiene ≈2,2 % del gasto federal en contratos; CR5 n.d.

## 4. Economía del negocio

- **Márgenes**: EBITDA del 8-13 % (mediana ≈ 10,8 %); los de producto propio o inteligencia (CACI, Leidos) arriba; los de mano de obra civil o infraestructuras (Parsons, KBR) abajo.
- **Capital**: capex del 1-2 % de las ventas, circulante de clientes de 50-70 días; el capital invertido es sobre todo fondo de comercio de compras. ROIC publicado 7-20 % (mediana ≈ 10 %); sin fondo de comercio, muy superior.
- **Conversión en caja**: FCF del 90-120 % del beneficio neto; rentabilidad por FCF del 6-14 % a los precios de hoy.
- **Qué separa a las mejores**: peso de defensa e inteligencia (presupuestos que crecen, habilitaciones que son barrera), producto propio y contratos a precio fijo con margen, frente a horas de consultoría civil.

## 5. Ciclo y regulación

- **Ciclo**: poco sensible a la economía (2009 y 2020: ventas al alza) y muy sensible a la política presupuestaria: cierres de la Administración, prórrogas (*continuing resolutions*) y, desde 2025, la revisión de contratos (DOGE), que hizo caer los ingresos civiles de Booz Allen un 22 % en un año.
- **Regulación**: reforma del FAR (fase 1 terminada en sep-2025), orden de 7-ene-2026 que puede limitar recompras y dividendos de contratistas de defensa que incumplan, orden de 30-abr-2026 que empuja a precio fijo y a renegociar los diez mayores contratos de coste más margen de cada agencia, NDAA de dic-2025 que favorece a los «no tradicionales» (empresas comerciales de software y defensa).
- **Más expuestas**: ICF, Maximus y Booz Allen (civil); menos, CACI y Leidos (defensa e inteligencia).

## 6. Lo que vigilar

1. Relación pedidos/ventas trimestral y cartera financiada (más de 1,0-1,1).
2. Presupuesto federal: leyes de asignación o prórrogas (oct-ene) y riesgo de cierre.
3. Plantilla facturable y margen: si la IA permite facturar lo mismo con menos personas y el cliente lo acepta (precio fijo) o lo exige como rebaja (coste más margen).
4. Órdenes ejecutivas sobre contratación (precio fijo, recompras) y compras de «no tradicionales» (Palantir, Anduril).

Riesgos para la sección 25 de un informe: recortes civiles, precio fijo sin capacidad de ejecución, IA que reduce las horas facturables, cliente único (Gobierno de EE. UU.) y reputación (habilitaciones, filtraciones).

**Cinco líneas.** El dinero se gana en defensa e inteligencia con producto propio o capacidades habilitadas difíciles de sustituir, no en horas de consultoría civil. El sector cotiza en mínimos de una década (PER adelantado ≈ 10-13x frente a 15-20x en 2018-2024) porque descuenta a la vez recortes, precio fijo e IA. Merece buscar oportunidades en las de más peso de seguridad nacional y caja alta, con la condición de comprobar la exposición a la IA del modelo por horas. Booz Allen (cola value) es la más barata frente a su propia historia; Leidos la más grande y equilibrada. Ninguna está en cartera.
