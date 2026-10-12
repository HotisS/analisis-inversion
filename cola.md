# Cola de análisis de empresas

**Reanudada el 12-oct-2026 (11:15), de 3 en 3.** Hechas: ATOSS, S&P Global, Amazon, Pluxee, Betsson, Technip Energies y Pro Medicus. En curso: Medpace (se cortó por el límite de uso; se cierra desde sus notas). LVMH no se repite: ya tiene informe del 8-oct. Ninguna empresa con informe se repite. **El juego y las apuestas quedan excluidos** de futuros análisis y propuestas (decisión del usuario, 12-oct). Al cerrar cada una se compara con las compras propuestas en `informes/cartera-2026-10-11.md`. Pendiente de vigilar: el resultado del pleno sobre el título restaurante (12-oct); si fija un tope a la comisión o el Gobierno anuncia el decreto, Edenred pasa a Mantener y se rehacen Edenred y Pluxee en la cartera.

Se analizan **de tres en tres, en paralelo** (desde el 12-oct; antes de cuatro en cuatro y, hasta el 10-oct, de dos en dos) (`/analiza-empresa`), en el orden de la tabla. Al cerrar cada empresa: marca su estado aquí, `node herramientas/seguimiento.mjs`, commit y push. La cola vive en el repo para que cualquier equipo pueda seguirla tras un `git pull`.

Cola rehecha el 10-oct-2026 con el escáner (`escaneos/escaneo-2026-10-10.xlsx`, perfiles por defecto en las tres regiones: 2.382 empresas con ficha, 180 candidatas), porque la lista anterior no llegó a subirse a GitHub. Criterio: cada par mezcla una de **valor** (múltiplo bajo y mucha caja) y una de **crecimiento** (ventas al alza con ROIC alto), a petición del usuario (10-oct); todas que el motor sepa valorar, fuera bancos, aseguradoras, materias primas y holdings. Las cifras son del escáner (Yahoo) y se comprueban en cada análisis.

| Par | Empresa | Ticker | País | Estilo | Por qué (cifras del escáner) | Estado |
|---|---|---|---|---|---|---|
| 1 | Constellation Software | CSU.TO | Canadá | Crecimiento | Compounder de software vertical tras la caída por la IA y la salida de Mark Leonard | Hecha (10-oct): Comprar, convicción baja |
| 1 | Auto Trader Group | AUTO.L | Reino Unido | Valor | ROIC 47 %, FCF 7,9 %, −41 % desde máximos | Hecha (10-oct): Comprar, convicción media |
| 2 | Adobe | ADBE | EE. UU. | Valor | ROIC 29 %, FCF 11 %, PER 8,8x; el precio descuenta crecimiento negativo | Hecha (10-oct): Comprar, convicción media |
| 2 | Games Workshop (Warhammer) | GAW.L | Reino Unido | Crecimiento | ROIC 65 %, −30 %; adelantada a petición del usuario (10-oct) | Hecha (10-oct): Vender, convicción media |
| 3 | Dunelm | DNLM.L | Reino Unido | Valor | ROIC 72 % (ojo: arrendamientos), FCF 14 %, −32 % | Hecha (11-oct): Comprar, convicción media |
| 3 | Uber | UBER | EE. UU. | Crecimiento | Iteración 2 (la 1, del 8-oct, dio Mantener, convicción media); ventas +18 %, FCF 6,9 %, −29 % | Hecha (10-oct): Mantener, convicción media (sin cambios frente a la del 8-oct) |
| 4 | Intuit | INTU | EE. UU. | Valor | FCF 10,7 %, PER 11x, −56 % desde máximos | Hecha (11-oct): Comprar, convicción media |
| 5 | ATOSS Software | AOF.DE | Alemania | Crecimiento | ROIC 60 %, −30 % | Hecha (12-oct): Mantener, convicción baja (objetivo 80,89 EUR, −4,7 %) |
| 8 | S&P Global | SPGI | EE. UU. | Crecimiento | Prioridad del usuario (12-oct) | Hecha (12-oct): Mantener, convicción baja (objetivo 351,69 USD, −12,8 %) |
| 9 | Technip Energies | TE.PA | Francia | Valor | Tanda 2 (12-oct) | Hecha (12-oct): Comprar, convicción media (objetivo 39,94 EUR, +40,5 %); entra en la cartera con efectivo |
| 9 | Pluxee | PLX.PA | Francia | Valor | Tanda 2 (12-oct) | Hecha (12-oct): Comprar, convicción media (objetivo 22,02 EUR, +54,6 %); entra en la cartera |
| 8 | Amazon | AMZN | EE. UU. | Crecimiento | Prioridad del usuario (12-oct) | Hecha (12-oct): Mantener, convicción baja (objetivo 213,96 USD, −18,5 %) |
| 6 | Pro Medicus | PME.AX | Australia | Crecimiento | ROIC 46 %, −46 % (múltiplo aún alto) | Hecha (12-oct): Vender, convicción alta (objetivo 50,61 AUD, −69,5 %) |
| 7 | Betsson | BETS-B.ST | Suecia | Valor | EV/EBITDA 4x, FCF 12 %, ventas +15 %, −40 % | Hecha (12-oct): Comprar, convicción media (+68,4 %); fuera de la cartera: el usuario no quiere juego ni apuestas |
| 7 | Medpace | MEDP | EE. UU. | Crecimiento | ROIC 56 %, FCF 4,1 % | Hecha (12-oct): Vender, convicción media (objetivo 326,15 USD, −46,7 %) |

**Estuvo en pausa del 11-oct (17:17) al 12-oct.** Hechas ese día: Nemetschek, Deckers, Trigano, Gartner, Burkhalter y CTS Eventim. A medias: **ATOSS** (notas A-E completas y propio, supuestos y textos empezados; faltan resumen, integración, cálculo, Word y PDF) y **Pluxee** (solo `bolsa.json`; recién empezado). Pendientes: **Technip Energies** (TE.PA) y **Betsson**. Desde el 12-oct, de 3 en 3. Medpace y Pro Medicus salieron (PER 32x y 73x) y vuelven el 12-oct en la tanda 3. Las filas de la tabla se quitan al cerrar cada empresa.

Suplentes si alguna no se puede valorar: Burkhalter (BRKN.SW, valor), Booking (BKNG, crecimiento), ANYCOLOR (5032.T, crecimiento), Moncler (MONC.MI), Sectra (SECT-B.ST), Yelp (YELP, valor).
