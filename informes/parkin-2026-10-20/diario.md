# Diario · Parkin (PARKIN.AE) · 20-oct-2026

- Commit de partida: `8d68ccd Philip Morris: análisis value completo 20-oct (no compra; límite 132,88 USD)`. El checkout era compartido con otro análisis en paralelo (VeriSign), así que no se hizo pull, commit ni push.
- Empezó hacia las 14:13 UTC y terminó hacia las 14:45 UTC. Iteración nueva: no había ningún informe anterior de Parkin.

## Decisiones

**Cuentas**
- Emiratos no tiene XBRL en cuentas.mjs. Se usaron las cuentas auditadas por PwC de 2025 (con 2024 comparativo), los intermedios del 1T26 y del 1S25 y los comunicados de resultados, todos bajados del DFM.
- El balance del 1T26 está escaneado y se leyó como imagen.
- 2021-2023 son cifras del negocio cuando estaba dentro de la RTA (cuentas «carve-out», folleto y pro forma), sin canon ni impuesto.
- El «EBITDA» que publica la empresa incluye los ingresos financieros. El informe usa el EBITDA sin ellos: 782,6 M en 2025.
- El 2T26 no tiene intermedio legible. Los ingresos NIIF (≈ 360 M) y las amortizaciones salen de la nota de FAB.

**Concesión**
- Los 300 M de canon diferido no se tratan como deuda: solo se pagan si Parkin quiebra.
- El canon variable se toma al 27,5 %, el máximo, que es lo que ya provisiona la empresa desde el 1T26.

**Puente de valoración**
- Se resta el dividendo del 1S26 (351,3 M), porque su fecha ex fue el 14-oct y se paga después del corte.

**DCF**
- WACC del 10,02 %:
  - Tasa libre del 5,51 %: Treasury del 5,09 % más el diferencial soberano de Abu Dabi del 0,42 %.
  - Beta de 0,70, la de una concesión. La de Yahoo, con solo dos años y medio de historia, va de 0,53 a 1,29.
  - Prima adicional de 1 punto: 0,64 de prima de país más 0,36 por depender de un solo concedente.
- g del 2,75 %, porque la concesión termina en 2072 y los activos vuelven a la RTA sin pago.
- Crecimiento de 2026e fijo en el +12,5 %, con el 1S26 y la guía de agosto. Después, del 6,5 % al 4,5 %, sin subidas de tarifa.
- La revisión de abonos y tarifas solo entra en el alcista.

**Comparables**
- Ocho: Salik, Dubai Taxi, Park24, Transurban, Vinci, Getlink, Aena y Flughafen Zürich.
- Atlas Arteria se quitó de la lista inicial.
- Los comparables no tienen ROIC en Yahoo, así que el mapa de comparables no se dibuja (aviso de rellenar).

**Objetivo a 12 meses**
- Ejercicio 2028e; historia adelantada de dos cierres (2024 y 2025).
- Con tres años o menos de historia, el selector toma la más baja de v3 y v2: decide la v3.

**Regla 13**
- La serie de Yahoo del DFM tiene sesiones sin dato. movimiento.mjs da −6,6 % a 12 meses porque al contar 252 sesiones llega al 30-jul-2025.
- En el informe van las variaciones de calendario: +5,5 % a 12 meses, frente al cierre de 5,47 del 20-oct-2025.

**Mapa de símbolos**
- En simbolos.json la clave es «PARKIN» y no «PARKIN.AE», como sugería el encargo. La nota del mapa pide que la clave sea el ticker del informe, la misma que usa objetivo12m-revisados.json, que apuntar-12m.mjs escribió como «PARKIN».
- El campo yahoo es «PARKIN.AE».

**Sin datos**
- Sentimiento: Stocktwits da 404, Reddit e Investing dan 403, y no hay foros con debate legible.
- Transacciones: no hay ventas de concesiones de aparcamiento comparables.

## Pasos y fecha de los datos

| Paso | Herramienta o fuente | Fecha del dato |
|---|---|---|
| Precio, serie, beta y volumen | bolsa.mjs (Yahoo), con --incluir-hoy 1 | cierre del 20-oct-2026 (5,77 AED; última operación a las 10:57 UTC) |
| Movimiento (regla 13) | movimiento.mjs más cierres de calendario de Yahoo | 20-oct-2026 |
| Cuentas anuales | DFM: estados financieros de 2025 (PwC) | 31-dic-2025 (publicados el 25-feb-2026) |
| Intermedios | DFM: 1T26 y 1S25; comunicado del 2T26 | 31-mar-2026, 30-jun-2025 y 30-jun-2026 (13-ago-2026) |
| Cuenta del 2T26 según NIIF | FAB First Look Note | 25-ago-2026 |
| Historia antes de 2024 | Folleto y pro forma (DFM); Yahoo (carve-out) | 20-mar-2024 |
| Consenso | MarketScreener y Yahoo | 20-oct-2026 |
| Tasa libre | FRED DGS10 | 16-oct-2026 |
| Prima de país e implícita | Damodaran | oct-2026 |
| Comparables | yahoo.mjs | 20-oct-2026 |
| Noticias | Gulf News, The National, Khaleej Times, AGBI, Enterprise | feb-oct 2026 |
| Precio en precios.json | precios.mjs PARKIN | cierre del 20-oct-2026 |
| Robustez | robustez.mjs --actual | 20-oct-2026 |

## Resultado

- Recomendación: Mantener a 12 meses (+6,3 % ponderada; +12,3 % en el base).
- Valor intrínseco de 3,68 AED, un 36 % por debajo del precio. Calidad: pasa.
- Robustez: SÓLIDA. Acción robusta: No mantener. Límite de compra: 3,68 AED.

## Lecciones propuestas (no escritas en lecciones*.md, por el checkout compartido)

- Los documentos del DFM (feeds.dfm.ae) se bajan bien con descargar.mjs. Las páginas de relación con inversores de parkin.ae dan 404.
- Algunos intermedios del DFM traen el balance escaneado: hay que leerlo como imagen.
- Hay empresas del Golfo que publican un «EBITDA» con los ingresos financieros dentro: hay que quitarlos antes de cargarlo.
- Las series de Yahoo del DFM tienen sesiones sin dato, y movimiento.mjs (que cuenta 252 sesiones) exagera el periodo: conviene contrastarlo con las variaciones de calendario.
