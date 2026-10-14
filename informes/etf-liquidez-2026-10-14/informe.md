# Qué hacer con la liquidez · 14-oct-2026

Uso único de la vertical de ETF (decisión 7 de las mejoras del método, aprobada el 14-oct a las 15:29). Datos del 13-oct; €STR del BCE y fichas de los ETF consultadas el 14-oct.

## Conclusión

**No comprar ningún ETF hoy, ni de renta variable ni monetario.** Después de la propuesta value y de las compras growth aprobadas apenas sobra dinero, y lo que sobra está comprometido con las órdenes con límite de los suplentes. Meterlo en un ETF para unas semanas da menos que las dos comisiones de entrar y salir.

**Regla para más adelante:** si el 7-nov (cuando caducan las órdenes) quedan **3.000 EUR o más sin destino previsto durante 3 meses o más**, se aparcan en el ETF monetario **Xtrackers II EUR Overnight Rate Swap UCITS ETF 1C (XEON)** y se venden cuando haga falta el dinero.

## Cuánta liquidez queda sin uso

| Paso | EUR |
|---|---|
| Liquidez actual (13-oct, con los 4.000 EUR del 14-oct) | 4.583 |
| Ventas value: Zoetis, Puig, Hermès, ICE, Equifax, IBKR | +5.696 |
| Compras value: Nemetschek 29, LVMH 5, Bureau Veritas 76 | −5.976 |
| **Liquidez tras la propuesta value** (`informes/cartera-2026-10-14-15h.md`) | **4.301** |
| Growth, tramo 1 ya: 43 Nu, 1 argenx, 2 Axon | −2.053 |
| Growth, tramo 2 tras resultados: 43 Nu (12-nov), 1 argenx (22-oct), 1 Axon (principios de noviembre) | −1.687 |
| **Liquidez sobrante cuando estén hechas las dos** | **≈560** |

Importes growth de `informes-growth/cartera-growth.md` (Nu ≈13,8 EUR/acción, argenx ≈725 EUR, Axon ≈367 EUR).

- **Sobrante fijo: ≈560 EUR (1,9 % de la cartera).** Está por debajo del mínimo de 1.000 EUR por posición. Además es la caja de las diez órdenes de suplentes hasta el 7-nov (Experian, ANYCOLOR, Deutsche Börse, Amadeus, Unilever, Moncler, Booking, Coloplast, DSV, Constellation), que con un solo suplente que salte ya la superan. Es decir, la liquidez no sobra: está corta.
- **Sobrante temporal: ≈1.690 EUR** (el tramo 2 growth) durante 1 a 4 semanas, del 14-oct al 22-oct (argenx) y hasta el 12-nov (Nu).
- El hilo value está rehaciendo la cartera al cerrar la 5ª hora. Si cambia el saldo final, la regla de arriba sigue sirviendo.

## Por qué nada

**ETF de renta variable: no.** Un ETF del MSCI World o del S&P 500 espera un 6-8 % anual a largo plazo. El método solo compra si espera un 15 % o más a 12 meses (ponderada), y la cartera ya está en acciones en más de un 75 %. Comprar un índice con el dinero de reserva obligaría a venderlo con pérdida o ganancia cuando salte una orden, con dos comisiones y la tributación de la ganancia. Tampoco llega a 1.000 EUR.

**ETF monetario para unas semanas: tampoco.** Las cuentas (con el €STR al 2,44 % y un coste del 0,10 %, rendimiento neto ≈2,3 % al año):

| Importe | Plazo | Rendimiento bruto | Coste de entrar y salir (2 órdenes, horquilla ≈0,01 %) | Neto |
|---|---|---|---|---|
| 1.690 EUR (tramo 2) | 4 semanas | ≈3 EUR | ≈3-10 EUR según el bróker | ≈0 o negativo |
| 560 EUR | 1 año | ≈13 EUR | ≈3-10 EUR | ≈3-10 EUR |
| 3.000 EUR | 3 meses | ≈17 EUR | ≈3-10 EUR | ≈7-14 EUR |
| 5.000 EUR | 6 meses | ≈58 EUR | ≈3-10 EUR | ≈48-55 EUR |

Con los importes de hoy el monetario no compensa el trabajo. Desde unos 3.000 EUR durante 3 meses empieza a valer la pena; de ahí sale la regla.

**Letras del Tesoro: no.** A 3 meses dan algo parecido al €STR, pero el dinero queda atado hasta el vencimiento y las órdenes con límite necesitan la caja disponible el día que saltan.

**Antes que nada, mirar el bróker.** Si el bróker paga intereses sobre el saldo en euros (algunos pagan cerca del €STR), eso gana a cualquier ETF monetario para estos importes, sin comisiones. No sabemos qué bróker usa (lo inferimos de la posición fraccionaria en IBKR, sin confirmar). Interactive Brokers, por ejemplo, no remunera los primeros 10.000 USD de saldo, así que ahí la caja no rinde nada; con este importe da igual.

## El ETF elegido para cuando haga falta

| Campo | Xtrackers II EUR Overnight Rate Swap UCITS ETF 1C |
|---|---|
| ISIN | LU0290358497 |
| Ticker | XEON (Xetra) |
| Gestora | DWS (Xtrackers) |
| Domicilio | Luxemburgo, UCITS |
| Divisa | EUR, sin riesgo de divisa |
| Rentas | Acumulación (no reparte: no hay retención cada año) |
| Réplica | Sintética, swap sobre el €STR |
| Gastos (TER) | 0,10 % |
| Patrimonio | ≈23.275 M EUR, el mayor monetario en euros |
| Rentabilidad 1 año | +2,08 % (el €STR subió en junio y en otoño: hoy rendiría ≈2,3 %) |
| Lanzamiento | 25-may-2007 |

**Por qué este.** Es el monetario en euros más grande y más negociado, con la horquilla más estrecha, y para meter y sacar dinero varias veces eso pesa más que el coste. Sigue el tipo a un día del BCE (€STR), así que no tiene riesgo de tipos ni de crédito más allá de la contraparte del swap (cubierto con garantías).

**Alternativas que valen igual:**

| ETF | ISIN | TER | Domicilio | Patrimonio | Nota |
|---|---|---|---|---|---|
| Amundi EUR Overnight Return UCITS ETF Acc (CSH, L8I3) | FR0010510800 | 0,10 % | Francia | ≈3.350 M EUR | Igual que XEON, más pequeño |
| BNP Paribas Easy EUR Overnight UCITS ETF Acc | LU3025345516 | 0,05 % | Luxemburgo | ≈600 M EUR | Más barato, pero nuevo y con menos volumen; 0,05 % sobre 3.000 EUR son 1,50 EUR al año |
| iShares EUR Cash UCITS ETF Acc | IE000JJPY166 | 0,10 % | Irlanda | — | Réplica física (depósitos y papel a corto); para quien no quiera swap |

**Fiscalidad en España.** Es un ETF extranjero: no admite traspaso sin tributar. La ganancia tributa como ganancia patrimonial (19-28 %) solo al vender. En plazos cortos es casi nula.

## Fuentes

1. BCE, Data Portal: €STR (serie EST.B.EU000A2X2A25.WT), 2,439 % el 13-oct-2026; 1,93 % hasta marzo, 2,18 % desde junio.
2. justETF, ficha de LU0290358497 (Xtrackers II EUR Overnight Rate Swap 1C), consultada el 14-oct-2026.
3. justETF, ficha de FR0010510800 (Amundi EUR Overnight Return Acc), consultada el 14-oct-2026.
4. justETF, comparativa de ETF monetarios (BNP Paribas Easy EUR Overnight, iShares EUR Cash), con datos de abril a agosto de 2026: comprobar el TER del día antes de comprar.
5. Repo: `informes/cartera-2026-10-14-15h.md` (propuesta value) y `informes-growth/cartera-growth.md` (compras growth).

**Confianza: media.** Los datos del ETF son de un comparador, no del KID; la web de DWS no respondió. Si se activa la regla, comprobar en el KID el TER y la contraparte del swap antes de la primera compra.
