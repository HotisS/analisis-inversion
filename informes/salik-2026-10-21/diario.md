# Diario · Salik (SALIK.AE) · 21-oct-2026

- Commit de partida: `d5d7f370050e30bca64adb089ce1e27bb1b83e54` (21-oct-2026, 10:43 UTC). El checkout era compartido con otro análisis en paralelo, así que no se hizo pull, commit ni push.
- Empezó hacia las 10:45 UTC y terminó hacia las 11:20 UTC. Iteración nueva: no había ningún informe anterior de Salik. Análisis completo desde cero, sin refrescar nada.

## Tiempos

| Hora (UTC) | Paso |
|---|---|
| 10:45 | Lectura del encargo, del prompt y de las lecciones; carpeta y símbolo en simbolos.json |
| 10:48-10:56 | Descargas del DFM (intermedio del 1S26, comunicados, consejo, Fitch, TransCore), informes anuales 2024 y 2025, FRED y Damodaran; Yahoo (comparables) |
| 10:56-11:04 | Lectura de cuentas (el intermedio del 1S26 está escaneado: leído como imagen), consenso y noticias; notas A-E |
| 11:00 | bolsa.mjs y movimiento.mjs (5,12 AED, lectura anterior al cierre definitivo) |
| 11:05-11:15 | Supuestos, objetivo, textos, regla 13; integrar y calcular; Word y PDF |
| 11:16-11:18 | Cierre definitivo 5,14 AED: bolsa.mjs otra vez, notas, cálculo, Word y PDF rehechos; apuntar-12m, precios.mjs y robustez --actual |

## Decisiones

**Cuentas**
- Emiratos no tiene XBRL en cuentas.mjs. Se usaron los informes anuales de 2025 y 2024 (cuentas auditadas por PwC), el intermedio revisado del 1S26 y los comunicados trimestrales, bajados del DFM y de ar2025/ar2024.salik.ae (salik.ae da 403 e ir.salik.ae 502 desde el contenedor).
- 2021 y el 1S22 son cifras «carve-out» del peaje dentro de la RTA (sin canon, impuesto ni deuda); la amortización de 2021 se estima como EBITDA − beneficio.
- Impuesto del 9 % desde 2024 (0 % en 2023): controles del tipo impositivo explicados.

**Concesión y puente**
- El pasivo con la RTA por los derechos de las dos puertas nuevas (1.631,9 M en jun-2026) se trata como deuda: devenga coste y la empresa lo incluye en su deuda neta.
- El dividendo a cuenta del 1S26 (704,0 M; fecha ex 15-oct, pago después del corte) se resta en otros_ajustes.
- El préstamo de 4.000 M de Emirates NBD vence el 30-jun-2027 y está a corto: riesgo de refinanciación, en el bajista y en los riesgos.

**DCF**
- WACC del 9,67 %: tasa libre del 5,57 % (Treasury 5,15 % del 19-oct más 0,42 % de Abu Dabi), beta 0,70 (0,57 mensual y 0,71 ajustada frente al ETF de Emiratos), prima del 5,5 % y prima adicional de 1 punto (0,64 de país y 0,36 por un solo concedente y un solo Gobierno).
- g del 2,75 %, porque la concesión termina en 2071 y los activos vuelven a la RTA sin pago.
- 2026e fijo en −2,5 % (1S26 y guía de agosto). Después, rebote del 7 % en 2027e y del 5,5 % al 3 %, sin puertas ni tarifas nuevas.
- Capex creciente hasta igualar la amortización en 2035e, como reserva para pagar puertas futuras.

**Comparables**
- Ocho: Parkin, Transurban, Vinci, Ferrovial, Getlink, Eiffage, Jiangsu y Zhejiang Expressway. Atlas Arteria y Pinfra fuera.
- Sin ROIC de los comparables en Yahoo: el mapa de comparables no se dibuja (aviso de rellenar).

**Objetivo a 12 meses**
- Ejercicio 2028e; historia adelantada de cuatro cierres (2022-2025); v2 guardada al lado (2023-2025).
- Con cuatro años, decide la v3. La v2 daría +15,4 % ponderada, pero el valor intrínseco seguiría muy por debajo del precio.

**Precio**
- La primera lectura (11:00:21 UTC) dio 5,12 AED; el cierre definitivo del 21-oct es 5,14 AED (última operación a las 10:59:55 UTC). Se rehízo todo con 5,14.

**Regla 13**
- Variaciones de calendario (la serie de Yahoo del DFM tiene huecos y movimiento.mjs exagera la de 12 meses: −20,0 % frente a −11,5 %).
- Veredicto: no cambia. Las causas de la caída (guerra con Irán, guía rebajada, Fitch, fecha ex) están en el base o en el bajista.

**Huecos**
- Transacciones (no hay ventas de concesiones de peaje urbano comparables), sentimiento (sin foros legibles), calificaciones ESG, voto de remuneración y fijo/variable del consejero delegado.

## Pasos y fecha de los datos

| Paso | Herramienta o fuente | Fecha del dato |
|---|---|---|
| Precio, serie, beta y volumen | bolsa.mjs (Yahoo), con --incluir-hoy 1 | cierre del 21-oct-2026 (5,14 AED; última operación a las 10:59:55 UTC) |
| Movimiento (regla 13) | movimiento.mjs más cierres de calendario de Yahoo | 21-oct-2026 |
| Cuentas anuales | Informe anual 2025 (PwC) y 2024 | 31-dic-2025 (publicado el 4-mar-2026) |
| Intermedio | DFM: estados del 1S26 (revisión limitada de PwC) y comunicado | 30-jun-2026 (5-ago-2026) |
| Trimestres | Comunicados del 3T25, 4T25 y 1T26 (DFM) | 13-nov-2025, 4-mar-2026 y 11-may-2026 |
| Historia antes de 2023 | Comunicados de 2022 y 2023 (carve-out de 2021) | 6-mar-2023 y 4-mar-2024 |
| Hechos recientes | DFM: Fitch, TransCore, consejo del 6-oct | 30-jul, 6-sep y 6-oct-2026 |
| Consenso | MarketScreener y Yahoo | 21-oct-2026 |
| Tasa libre | FRED DGS10 | 19-oct-2026 |
| Prima de país e implícita | Damodaran | oct-2026 |
| Comparables | yahoo.mjs | 21-oct-2026 |
| Noticias | Gulf News, The National, Khaleej Times, Al Jazeera | ene-2025 a oct-2026 |
| Precio en precios.json | precios.mjs SALIK | cierre del 21-oct-2026 (5,14 AED) |
| Revisión a 12 meses | apuntar-12m.mjs | 21-oct-2026 |
| Robustez | robustez.mjs --actual | 21-oct-2026 (5,14 AED) |

## Resultado

- Recomendación: Mantener a 12 meses (+5,2 % ponderada; +11,7 % en el base). Acción robusta: no comprar (No mantener si se tuviera). Límite de compra 3,41 AED.
- Valor intrínseco 3,41 AED (−33,7 %). Calidad: pasa (ROIC 29,6 % frente a WACC 9,67 %; sostenibilidad «Sí»).
- Controles: 20 de 23 correctos y 3 explicados (tipo impositivo de 2023-2025).
