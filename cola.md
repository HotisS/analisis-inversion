# Cola de análisis de empresas

Se analizan **de cuatro en cuatro, en paralelo** (dos pares seguidos de la tabla, para que haya dos de valor y dos de crecimiento; hasta el 10-oct eran de dos en dos) (`/analiza-empresa`), en el orden de la tabla. Al cerrar cada empresa: marca su estado aquí, `node herramientas/seguimiento.mjs`, commit y push. La cola vive en el repo para que cualquier equipo pueda seguirla tras un `git pull`.

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
| 5 | Trigano | TRI.PA | Francia | Valor | Autocaravanas; EV/EBITDA 5x, FCF 22 %; el precio descuenta −14 % de crecimiento | Pendiente |
| 5 | ATOSS Software | AOF.DE | Alemania | Crecimiento | ROIC 60 %, −30 % | Pendiente |
| 6 | Gartner | IT | EE. UU. | Valor | ROIC 34 %, FCF 10,7 %, −27 % | Pendiente |
| 6 | Pro Medicus | PME.AX | Australia | Crecimiento | ROIC 46 %, −46 % (múltiplo aún alto) | Pendiente |
| 7 | Betsson | BETS-B.ST | Suecia | Valor | EV/EBITDA 4x, FCF 12 %, ventas +15 %, −40 % | Pendiente |
| 7 | Medpace | MEDP | EE. UU. | Crecimiento | ROIC 56 %, FCF 4,1 % | Pendiente |
| 8 | Deckers Outdoor | DECK | EE. UU. | Valor | ROIC 40 %, FCF 9,9 %, −32 % | Pendiente |
| 8 | CTS Eventim | EVD.DE | Alemania | Crecimiento | ROIC 35 %, FCF 4,1 %, −32 % | Pendiente |

**Reanudada el 11-oct-2026 (10:55) en tres tandas**: 1) Nemetschek (hecha: Comprar, convicción baja), Deckers, Gartner y Trigano (en curso); 2) Burkhalter (BRKN.SW), CTS Eventim y ATOSS; 3) Pluxee (PLX.PA), Technip Energies (TE.PA) y Betsson. Medpace y Pro Medicus salen (PER 32x y 73x). Las filas de la tabla se quitan al cerrar cada empresa.

Suplentes si alguna no se puede valorar: Burkhalter (BRKN.SW, valor), Booking (BKNG, crecimiento), ANYCOLOR (5032.T, crecimiento), Moncler (MONC.MI), Sectra (SECT-B.ST), Yelp (YELP, valor).
