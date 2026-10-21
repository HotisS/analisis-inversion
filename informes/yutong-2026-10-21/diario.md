# Diario · Yutong Bus (600066.SS) · análisis value completo · corte 21-oct-2026

- Commit de partida: `cd70c95` (cd70c9516e5a693103e1603a268fd76bdf52123a, «Escáner: cuatro grupos de cerca…»). Checkout compartido con otro análisis: sin pull, commit ni push desde este encargo.
- Inicio ≈ 07:35 UTC del 21-oct-2026 (reloj del contenedor); fin ≈ 08:10 UTC. Iteración nueva desde cero: el intento del 20-oct (`informes/yutong-2026-10-20/`, pausado a medias, sin informe) no se ha tocado; de él solo se han reutilizado los PDF de `notas/docs/` que siguen siendo los últimos publicados (anuales 2021-2025, semestral y 3T de 2026, anuncios). Todo lo demás (precio, históricos, comparables, consenso, tasa libre, Stock Connect, Guba, ventas de agosto y septiembre, junta extraordinaria, garantías) se ha vuelto a descargar o comprobar el 20-21 oct.

## Pasos y fecha de los datos

| Paso | Herramienta o fuente | Fecha del dato |
|---|---|---|
| Precio de la decisión | Sina hq (15:34:59 de Pekín = 07:34:59 UTC) y `herramientas/precios.mjs 600066` | Cierre del 21-oct-2026: 27,90 CNY (anterior 28,68) |
| Históricos, beta y rentabilidades | `herramientas/bolsa.mjs` (600066.SS, 510300.SS, 516110.SS) | Hasta el 21-oct-2026 |
| Cierres de diciembre (PER histórico) | Eastmoney, cotizaciones mensuales sin ajustar | 2016-2025 |
| Cuentas anuales | CNINFO: informes anuales 2021-2025 (PDF) + estados estructurados de Eastmoney (CAS) | Ejercicio 2025 (publicado el 31-mar-2026) |
| Cuentas intermedias | CNINFO: 3T26, semestral 2026, 1T26, 9M25 | 30-sep-2026 (publicado el 15-oct-2026) |
| Ventas mensuales | Anuncios 产销数据快报 (abr-sep 2026, dic-2025) | Septiembre de 2026 (8-oct-2026) |
| Gobierno, juntas, vinculadas, garantías, auditor, arbitraje | Informe anual 2025, actas de la junta (27-abr) y de la extraordinaria (17-sep), anuncios | Hasta sep-oct 2026 |
| Consenso | Notas de Guosen, Hualong, Southwest y Soochow tras el 3T26; lista de Eastmoney; Yahoo (8 analistas) | 16-21 oct-2026 |
| Comparables | `notas/comparables-yahoo.mjs` (King Long, Zhongtong, Foton, Sinotruk, Weichai, Daimler Truck, Volvo, Traton, NFI) | 21-oct-2026 |
| Tasa libre y prima | ChinaBond 10 años (1,6354 %; la página del 21-oct salió vacía); Damodaran ERP (4,20 %) | 20-oct-2026; oct-2026 |
| Stock Connect | Lista SSE de HKEX (comprable y vendible, CCASS 90066); páginas de IBKR (China Connect) | 21-oct-2026 |
| Precio y noticias (regla 13) | `herramientas/movimiento.mjs 600066.SS` (caché forzada a refrescar: daba el 19-oct) | 21-oct-2026 |
| Sentimiento | Guba (tres páginas), prensa china (Sina, NetEase, Securities Star) | 14-21 oct-2026 |
| Notas A-E y propio | `notas/construir-notas.mjs`, `supuestos.mjs`, `propio.mjs`, `textos.mjs`, `resumen.mjs` | — |
| Integración y cálculo | `motor/integrar.mjs`, `motor/calcular-empresa.mjs` (19 de 20 controles; el del impuesto de 2023, explicado) | — |
| Word y PDF | `motor/rellenar.mjs` (cobertura 81,3 %) y soffice | — |
| Revisión a 12 meses | `revision-12m-2026-10-21.md`, `herramientas/apuntar-12m.mjs yutong-2026-10-21` | — |
| Símbolo y precio | entrada `600066` en `verticales/empresa/simbolos.json`; `precios.mjs 600066` | 21-oct-2026 |
| Robustez | `herramientas/robustez.mjs --actual` (SÓLIDA; acción robusta No mantener) | Precio del 21-oct-2026 |

## Decisiones

- **EBIT** = beneficio de explotación − resultado de inversiones − cambios de valor razonable + gastos financieros + ingresos y gastos fuera de explotación. Subvenciones y reversiones de provisiones de cobro se quedan dentro del EBIT (son recurrentes mientras dure el cobro del atraso; se dice en calidad).
- **Caja del puente** (14.417 M): efectivo + productos de tesorería (activos financieros de negociación) + depósitos a plazo en otros activos no corrientes (97 %) + activos no corrientes que vencen en un año + inversiones de deuda. Asociadas (3.105 M) a valor contable. Provisiones de garantía y garantías de recompra fuera del puente (operativas; en riesgos).
- **Subvenciones a eléctricos y cobros de las ciudades**: las subvenciones nacionales ya están cobradas; quedan 1.381 M de cobros de más de cinco años, provisionados. No se proyectan reversiones.
- **Dividendo**: reparto del 99,65 % en 2025. El motor usa 2,00 CNY (último ordinario pagado) para el objetivo a 12 meses.
- **2026e fijo**: 9M26 real + 4T26 −5 % con el margen del 4T25; resultado financiero de 2026e −200 M (pérdidas de cambio y de valor razonable de 9M26), +150 M desde 2027e.
- **Circulante**: 7 % de las ventas en 2026e y 6 % después (−2 % a +10 % en 2023-2025; el plazo de pago a proveedores bajó en 2025).
- **Base 2027-2028e +3 % y +4 %**, por debajo del consenso (+10 %): los brókeres no han cambiado sus ventas de 2026e desde abril, y eso exigiría un 4T26 un 31 % por encima del récord.
- **PER histórico**: adelantado con cierres sin ajustar (las acciones apenas cambian desde 2016). Excluidos 2019 y 2020 (BPA de la COVID) y 2021 (atípico). En la v2, la media larga sin 2020 (atípico).
- **Sostenibilidad «Sí»**: proyectamos un 2,7 % anual con el margen a la baja; el riesgo es de nivel (ciclo chino), y va en el bajista.
- **ROIC**: el del motor (134,8 %) es exagerado por un capital invertido casi nulo; se explica en rentabilidad y controles.
- **Comparables**: fuera BYD (grupo de turismos), Iveco (oferta de Tata) y Ashok Leyland (datos de Yahoo rotos).
- La ficha de sector no se hace (no es una tanda de dos o más del sector); el informe usa sus propios comparables.

## Resultado

Mantener según la regla a 12 meses: −6,9 % ponderado y +2,0 % el base (v2 +9,3 %); BPA −10 %: −15,5 %. Robustez SÓLIDA, acción robusta **No mantener**; límite de compra 22,59 CNY y robusto 20,51 CNY. Valor intrínseco 36,63 CNY (+31,3 %). Regla 13: no cambia.
