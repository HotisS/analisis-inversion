# Cola de análisis de empresas

Se analizan **de dos en dos, en paralelo** (`/analiza-empresa`), en el orden de la tabla. Al cerrar cada empresa: marca su estado aquí, `node herramientas/seguimiento.mjs`, commit y push. La cola vive en el repo para que cualquier equipo pueda seguirla tras un `git pull`.

Cola rehecha el 10-oct-2026 con el escáner (`escaneos/escaneo-2026-10-10.xlsx`, perfiles por defecto en las tres regiones: 2.382 empresas con ficha, 180 candidatas), porque la lista anterior no llegó a subirse a GitHub. Criterio: calidad (ROIC muy por encima del WACC, balance sano) castigada por el precio, que el motor sepa valorar; fuera bancos, aseguradoras, materias primas y holdings. Las cifras son del escáner (Yahoo) y se comprueban en cada análisis.

| Par | Empresa | Ticker | País | Perfil del escáner | Por qué | Estado |
|---|---|---|---|---|---|---|
| 1 | Constellation Software | CSU.TO | Canadá | — | Compounder de software vertical tras la caída por la IA y la salida de Mark Leonard | En curso (10-oct) |
| 1 | Auto Trader Group | AUTO.L | Reino Unido | calidad-castigada | ROIC 47 %, FCF 7,9 %, −41 % desde máximos | En curso (10-oct) |
| 2 | Nemetschek | NEM.DE | Alemania | calidad-castigada | Software para construcción; ROIC 20 %, crecimiento 14 %, −38 %; el precio descuenta ~1 % de crecimiento | Pendiente |
| 2 | Adobe | ADBE | EE. UU. | calidad-castigada | ROIC 29 %, FCF 11 %, PER 8,8x; el precio descuenta crecimiento negativo | Pendiente |
| 3 | Intuit | INTU | EE. UU. | calidad-castigada | FCF 10,7 %, crecimiento 14 %, −56 % desde máximos | Pendiente |
| 3 | Gartner | IT | EE. UU. | calidad-castigada | ROIC 34 %, FCF 10,7 %, −27 % | Pendiente |
| 4 | Dunelm | DNLM.L | Reino Unido | calidad-castigada | ROIC 72 % (ojo: arrendamientos), FCF 14 %, −32 % | Pendiente |
| 4 | Burkhalter | BRKN.SW | Suiza | calidad-castigada | Instalaciones eléctricas; ROIC 32 %, FCF 7,6 %, −35 % | Pendiente |
| 5 | Booking Holdings | BKNG | EE. UU. | calidad-castigada | ROIC 45 %, FCF 7,7 %, −27 % | Pendiente |
| 5 | Deckers Outdoor | DECK | EE. UU. | calidad-castigada | ROIC 40 %, FCF 9,9 %, −32 % | Pendiente |
| 6 | ATOSS Software | AOF.DE | Alemania | nicho-compounder | ROIC 60 %, FCF 4,9 %, −30 % | Pendiente |
| 6 | Games Workshop | GAW.L | Reino Unido | nicho-compounder | ROIC 65 %, −30 % | Pendiente |
| 7 | Pro Medicus | PME.AX | Australia | nicho-compounder | ROIC 46 %, −46 % (múltiplo aún alto) | Pendiente |
| 7 | Medpace | MEDP | EE. UU. | nicho-compounder | ROIC 56 %, FCF 4,1 % | Pendiente |
| 8 | CTS Eventim | EVD.DE | Alemania | calidad-castigada | ROIC 35 %, FCF 4,1 %, −32 % | Pendiente |
| 8 | ANYCOLOR | 5032.T | Japón | calidad-castigada | ROIC 54 %, FCF 8,4 %, −55 % | Pendiente |

Suplentes si alguna no se puede valorar: Moncler (MONC.MI), Sectra (SECT-B.ST), Gaztransport & Technigaz (GTT.PA), Rollins (ROL), Yelp (YELP).
