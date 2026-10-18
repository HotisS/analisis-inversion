# Diario: Medline (growth, 18-oct-2026)

- Sin informe previo en `informes/` ni en `informes-growth/` (comprobado). Escáner: `escaner/cobertura.json`, salidas a bolsa, «pocas cuentas: candidata growth» (ROIC − WACC −3,92 según el escáner, 1 año de cuentas).
- Precio: cierre del viernes 16-oct (35,96 USD), fecha de corte 18-oct (domingo). Símbolo de Yahoo: **MDLN**.
- **Próximos resultados: 4-nov-2026** antes de la apertura (la empresa lo anunció el 6-oct; StockAnalysis, noticias de MDLN). Para pasar a su sitio.
- Acciones: 1.340 M diluidas ajustadas (clase A 877 + clase B 437 + unidades de incentivo). Las clase B son las unidades de los antiguos dueños (estructura «Up-C»), canjeables 1 a 1: por eso se usan todas y no se resta el minoritario.
- No resto el TRA (4.404 M) como deuda: solo se paga si hay ahorro fiscal, y el ahorro también queda fuera del EV/EBITDA. Si se restara, unos −3,3 USD por acción.
- EBITDA NTM (3.450 M): estimación propia porque no hay consenso de EBITDA público. Una página (aktien.guide) da un margen EBITDA de consenso del 12,15 % para 2027 (≈ 4.090 M con 33.680 M de ventas). No casa con el BPA de 2027 casi plano (1,58 frente a 1,55), así que no lo uso. Con 4.090 M el múltiplo de hoy sería 14,2x y el objetivo subiría, pero la puntuación (43,8) seguiría por debajo de 50: la señal no cambia.
- Trimestres de 2024-2025 en parte derivados del folleto (1S25 +9,7 %, 9M25 +10,3 %); la aceleración (≈ 0) y el CAGR a 2 años (≈ 10,9 %) son aproximados. Ninguna variación razonable saca el bloque A de 1/5 en crecimiento.
- Reddit no se pudo leer (WebFetch bloqueado) y las búsquedas no devolvieron hilos; queda dicho en el informe.
- Motor: `node motor/growth.mjs …/datos.json` → v11, 43,8/100, 1/8 señales, ponderada +1,5 %, base +4,0 %, bajista −50,4 %, alcista +48,5 %, objetivo 36,5 USD, **Vender** (puntuación < 50), «compra hasta» 34,8 USD (no aplica: puntuación < 60). Sin avisos ni alertas.
- Robustez (`robustez-growth.mjs --precios`): FRÁGIL, señal robusta Vender; con «ventas del analista», Mantener (1,5 %); G2, G6 y G8 de aviso o confianza; ningún CORREGIR.
- Regla 13: veredicto **no cambia** (sin colocación anunciada; resultados el 4-nov, que no retrasan).

## Ventas de los fondos y colocaciones (pedido expreso)

| Fecha | Operación | Acciones | Precio | Importe bruto | Vendedores |
|---|---|---|---|---|---|
| 17-dic-2025 | Salida a bolsa (acciones nuevas, para amortizar deuda) | 216 M | 29 USD | 6.265 M | (la empresa) |
| 10-mar-2026 | 1.ª colocación secundaria (con la opción entera) | 86,25 M | 41 USD | ~3.500 M | Blackstone, Carlyle, H&F, ADIA |
| 28-may-2026 | 2.ª colocación, ampliada (opción de 10,9 M no consta ejercida) | 72,55 M | 37 USD | ~2.700 M | Blackstone, H&F, ADIA (sin Carlyle) |

- Bloqueo de la salida: 180 días desde el 16-dic-2025 (hasta ~14-jun-2026); Goldman y Morgan Stanley lo levantaron para las dos colocaciones. Ya no queda bloqueo general; las colocaciones suelen llevar un bloqueo corto propio (no encontrado).
- Tras mayo (424B4): Carlyle 187 M acciones (14,2 % del voto), Blackstone 153 M (11,7 %), H&F 153 M (11,7 %), Mills (Mozart HoldCo) 234 M (17,8 %, no ha vendido), GIC 119 M (9,0 %), ADIA 34 M (2,6 %). Unos 880 M de 1.314 M.
- Desde mayo no hay colocación nueva (registros de la SEC hasta el 15-oct: solo 13G/A en agosto, un Form 144 el 16-jun y los 8-K de directivos). Riesgo permanente: cada colocación ha salido con descuento y la acción cayó alrededor de cada una.

## Comprobación corta de calidad value (con las cuentas públicas)

Cifras de 2025 (el ejercicio más limpio; el 1S26 lleva el incendio y el reembolso de aranceles), 10-K y XBRL. Impuesto normalizado del 25 % (el contable es muy bajo por la estructura de sociedad de personas). WACC propio ≈ 8,1 % (Rf 4,2 %, beta ~1, prima 5 %, coste de la deuda 5,6 % antes de impuestos, deuda/(deuda + capitalización) ≈ 21 %).

| Medida | NOPAT (M) | Capital invertido (M) | ROIC | ROIC − WACC |
|---|---|---|---|---|
| Con fondo de comercio e intangibles (EBIT contable 2.212) | 1.659 | 30.554 | 5,4 % | **−2,7** |
| Con fondo de comercio, EBIT ajustado (EBITDA aj. 3.467 − amort. 1.011 = 2.456) | 1.842 | 30.554 | 6,0 % | −2,1 |
| Sin fondo de comercio (−8.079), EBIT contable | 1.659 | 22.475 | 7,4 % | **−0,7** |
| Sin fondo de comercio, EBIT ajustado | 1.842 | 22.475 | 8,2 % | +0,1 |
| Sin fondo de comercio ni intangibles de la compra (−13.893) y sin su amortización (~704) | 2.370 | 8.582 | 27,6 % | +19,5 |

Capital invertido a dic-25 = patrimonio total 19.286 (con minoritarios) + deuda 12.755 + arrendamientos 452 − caja 1.939.

- **Lectura:** el negocio por debajo es muy rentable (27 % sobre el capital tangible), pero el capital que hay que remunerar es el de la compra apalancada: con fondo de comercio (la medida del filtro value, `roicU >= wacc + 5`) queda unos −2 a −3 puntos; sin fondo de comercio, en torno a 0. Rentabilidad para quien compra hoy: NOPAT ajustado / EV = 1.842 / 58.259 = 3,2 %.
- **Deuda neta / EBITDA:** 2,9x sobre el EBITDA ajustado de 12 meses con el reembolso (3.500 M), 3,1x sin él, 3,5x sobre el EBITDA contable (≈ 2.840 M). En 2024 era 4,9x.
- **Crecimiento orgánico:** +10,5 % en 2025 (9M25: 9,1 orgánico + 1,2 de compras), +10,8 % en el 1S26, guía de +9/10 % en 2026; casi todo por volumen. Es bueno y estable.
- **¿Un análisis value completo más adelante?** **Hoy no.** No pasaría el requisito de calidad (ROIC − WACC ≥ 5 con fondo de comercio: −2,7), no tiene historia de PER para la regla v3 (ni 3 años de PER adelantado) y la sostenibilidad del crecimiento del beneficio sería como mucho «En parte» con el EBITDA cayendo. **Tendría sentido** cuando se cumpla todo esto: (1) dos ejercicios completos como cotizada (cuentas de 2027, feb-2028), (2) deuda neta por debajo de 2,5x, (3) margen EBITDA ajustado de vuelta al 12,5-13 % y (4) cartas de la FDA cerradas. Aun así, el ROIC con fondo de comercio solo pasaría de WACC + 5 con un NOPAT de unos 4.000 M (más del doble del de hoy): lo más probable es que se quede en «calidad insuficiente» con la medida del repo. Solo valdría la pena antes si el precio cae a 12-13 veces el EBITDA (unos 25-27 USD).

## Lecciones (para quien integre)

- Las salidas a bolsa de compras apalancadas (Medline) caen en «pocas cuentas: candidata growth» del escáner aunque no sean growth. Convendría que el escáner las mande a una ficha corta de calidad value (ROIC con y sin fondo de comercio, deuda/EBITDA, orgánico) en vez de al método growth, que las deja siempre en Vender por la puntuación (crecimiento < 15 %, regla del 40 baja).
- En las estructuras «Up-C» (clase A + clase B canjeables), las acciones diluidas tienen que incluir la clase B; si no, el precio por acción sale inflado un 50 % (877 frente a 1.314 M).
- Cuando la empresa da una guía de EBITDA que excluye un ingreso extraordinario (reembolso de aranceles IEEPA), el EBITDA NTM y el margen hay que calcularlos sin él; el EBITDA de 12 meses publicado (3.500 M) lo incluye.
