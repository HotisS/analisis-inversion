# Cola de análisis de empresas

## Actualización a la metodología nueva (desde el 13-oct-2026)

**Metodología nueva** = la de los informes desde el 10-oct (commit ff3158d): DCF con **sostenibilidad del crecimiento** (puente volumen × precio, cuota implícita, reinversión y veredicto) y **capa de sentimiento** (sección 28, subagente E). Se reconoce en `datos.json` porque lleva `calc.dcf.sostenibilidad` y `sentimiento.lectura`. Los informes del 6 al 9-oct no lo llevan.

**Ya con la metodología nueva (33):** Adobe, Adyen, Amazon, ATOSS, Auto Trader, Betsson, Burkhalter, Coloplast, Constellation Software, CTS Eventim, Deckers, Diageo, Dunelm, Games Workshop, Gartner, Grifols, Hermès, Intuit, Medpace, Nemetschek, Netflix, Paychex, Pluxee, Pro Medicus, Puig, Salesforce, SAP, S&P Global, Technip Energies, Trigano, Uber (iteración 2, 10-oct), UnitedHealth y Verisk.

**Faltan 41**, más Evolution, que no se actualiza: es juego y queda excluida (decisión del 12-oct). Se actualizan **en rápido, como las del 7-oct** (regla relativa y DCF en tres etapas en CAF, Enagás, Inditex, Indra, Keyence, On y Viscofan): sin investigación nueva, con un script `notas/actualizacion-vN.mjs` que parte del último `datos*.json` de la carpeta, añade `dcf.sostenibilidad` (puente de ingresos y mercado final, con lo que ya hay en las notas) y la frase del veredicto en la síntesis, recalcula y escribe `datos-vN.json`, el Word y el PDF «vN» en la misma carpeta, sin tocar la versión anterior. El diario lleva la tabla vN-1 frente a vN (recomendación, convicción, objetivo, rentabilidad). El sentimiento (sección 28) es opcional: solo si el usuario lo pide, con un subagente corto. De **tres en tres**, en el orden de la tabla: primero la cartera actual, luego las compras propuestas, después el resto de Comprar (de más a menos rentabilidad esperada), Mantener y Vender. Al cerrar cada una: marca su estado aquí, `node herramientas/seguimiento.mjs`, compárala con `informes/cartera-2026-10-11.md`, commit y push.

**Análisis completo pendiente (pedido el 13-oct): Group 1 Automotive (GPI, EE. UU.)**, con `/analiza-empresa`, al terminar las actualizaciones rápidas de la cartera y de las Comprar.

Pendiente de vigilar: el resultado del pleno sobre el título restaurante (12-oct). Si fija un tope a la comisión o el Gobierno anuncia el decreto, Edenred pasa a Mantener y se rehacen Edenred y Pluxee en la cartera; la actualización de Edenred lo recoge.

| Tanda | Empresa | Ticker | Informe anterior | Señal anterior (rent. 12 m) | Por qué en este orden | Estado |
|---|---|---|---|---|---|---|
| 1 | Edenred | EDEN.PA | 7-oct | Comprar, media (+57,7 %) | Cartera (mayor posición); ley del título restaurante | Pendiente |
| 1 | Wolters Kluwer | WKL.AS | 8-oct | Comprar, media (+61,8 %) | Mayor compra propuesta (28 títulos); resultados el 4-nov | Pendiente |
| 1 | Alphabet | GOOGL | 8-oct | Vender, baja (−27,6 %) | Cartera; recorte propuesto | Pendiente |
| 2 | Zoetis | ZTS | 7-oct | Comprar, media (+31,6 %) | Cartera | Pendiente |
| 2 | PepsiCo | PEP | 9-oct | Comprar, baja (+23,4 %) | Cartera | Pendiente |
| 2 | Daiichi Sankyo | 4568.T | 8-oct | Mantener, media (+9,8 %) | Cartera | Pendiente |
| 3 | Equifax | EFX | 8-oct | Comprar, baja (+15,4 %) | Cartera | Pendiente |
| 3 | ICE | ICE | 8-oct | Comprar, baja (+6,4 %) | Cartera | Pendiente |
| 3 | Fluidra | FDR.MC | 8-oct | Comprar, media (+34,5 %) | Alternativa de compra del top 6 | Pendiente |
| 4 | Lululemon | LULU | 7-oct | Comprar, media (+41,8 %) | Comprar | Pendiente |
| 4 | Fielmann | FIE.DE | 9-oct | Comprar, media (+36,0 %) | Comprar | Pendiente |
| 4 | Novo Nordisk | NOVO-B.CO | 8-oct | Comprar, media (+30,8 %) | Comprar | Pendiente |
| 5 | Krones | KRN.DE | 9-oct | Comprar, media (+29,1 %) | Comprar | Pendiente |
| 5 | DSV | DSV.CO | 7-oct | Comprar, media (+20,0 %) | Comprar | Pendiente |
| 5 | Dassault Systèmes | DSY.PA | 7-oct | Comprar, media (+17,9 %) | Comprar | Pendiente |
| 6 | Viscofan | VIS.MC | 6-oct | Comprar, baja (+12,0 %) | Comprar | Pendiente |
| 6 | Tomra | TOM.OL | 8-oct | Comprar, baja (+11,2 %) | Comprar | Pendiente |
| 6 | LVMH | MC.PA | 8-oct | Comprar, baja (+11,1 %) | Comprar | Pendiente |
| 7 | CAF | CAF.MC | 6-oct | Comprar, baja (+9,3 %) | Comprar | Pendiente |
| 7 | Cooper Companies | COO | 9-oct | Comprar, baja (+5,2 %) | Comprar | Pendiente |
| 7 | On Holding | ONON | 6-oct | Comprar, baja (+4,5 %) | Comprar | Pendiente |
| 8 | bioMérieux | BIM.PA | 8-oct | Comprar, baja (+1,4 %) | Comprar | Pendiente |
| 8 | Rentokil | RTO.L | 7-oct | Comprar, baja (−2,1 %) | Comprar (señal y rentabilidad no cuadran: revisar) | Pendiente |
| 8 | Almirall | ALM.MC | 7-oct | Mantener, baja (+4,1 %) | Mantener | Pendiente |
| 9 | AO Smith | AOS | 9-oct | Mantener, media (+0,2 %) | Mantener | Pendiente |
| 9 | ICON | ICLR | 9-oct | Mantener, baja (−0,8 %) | Mantener | Pendiente |
| 9 | Indra | IDR.MC | 6-oct | Mantener, media (−1,4 %) | Mantener | Pendiente |
| 10 | Olympus | 7733.T | 9-oct | Mantener, media (−1,9 %) | Mantener | Pendiente |
| 10 | Copart | CPRT | 7-oct | Mantener, media (−4,1 %) | Mantener | Pendiente |
| 10 | Enagás | ENG.MC | 7-oct | Mantener, baja (−7,7 %) | Mantener | Pendiente |
| 11 | Microsoft | MSFT | 8-oct | Mantener, baja (−14,3 %) | Mantener | Pendiente |
| 11 | Rational | RAA.DE | 7-oct | Mantener, media (−16,4 %) | Mantener | Pendiente |
| 11 | Keyence | 6861.T | 7-oct | Mantener, baja (−17,6 %) | Mantener | Pendiente |
| 12 | CSL | CSL.AX | 9-oct | Mantener, baja (−20,6 %) | Mantener | Pendiente |
| 12 | Inditex | ITX.MC | 6-oct | Vender, baja (−15,1 %) | Vender | Pendiente |
| 12 | Cochlear | COH.AX | 8-oct | Vender, baja (−19,7 %) | Vender | Pendiente |
| 13 | Fanuc | 6954.T | 7-oct | Vender, baja (−26,6 %) | Vender | Pendiente |
| 13 | Kongsberg | KOG.OL | 7-oct | Vender, baja (−30,8 %) | Vender | Pendiente |
| 13 | Vertiv | VRT | 7-oct | Vender, baja (−33,5 %) | Vender | Pendiente |
| 14 | Intuitive Surgical | ISRG | 6-oct | Vender, baja (−45,0 %) | Vender | Pendiente |
| 14 | VAT Group | VACN.SW | 6-oct | Vender, baja (−60,0 %) | Vender | Pendiente |

## Cola anterior (cerrada el 12-oct)


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
