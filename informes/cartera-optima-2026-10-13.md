# Cartera óptima (13-oct-2026) con la rentabilidad a 12 meses v2

**Método** (`verticales/empresa/objetivo-12m.md`, el del hilo «PROYECTOS GH - INV» del 12-oct): objetivo a 12 meses = PER propio × BPA propio del ejercicio que mirará el mercado en un año, en bajista, base y alcista, ponderados con las probabilidades de los escenarios de cada informe. Las 38 empresas de la cartera y con señal Comprar están revisadas una a una (`informes/<carpeta>/revision-12m-2026-10-13.md`; Alphabet, la del hilo del 12-oct). Resultados en `verticales/empresa/objetivo12m-revisados.json` y en las columnas «… 12 m» de `seguimiento.xlsx`.

**Dos cifras por valor** (decisión del usuario, 13-oct). La **ponderada** es la rentabilidad esperada: bajista, base y alcista ponderados con las probabilidades de los escenarios de cada informe, en vez de la media simple del hilo, que inflaba la cifra porque el alcista supone volver al PER histórico y hoy muchas cotizan muy por debajo. La **base** (solo el escenario base: el BPA propio al PER de hoy o a la mediana de cinco años) mide el **valor real**: lo que rinde sin que el mercado vuelva a pagar el múltiplo histórico. Es el filtro.

**Reglas.**
1. **Vender** lo que queda por debajo del 10 % ponderado o del 5 % en el base: Alphabet (+1,8 %), PepsiCo (+9,7 %) y Puig (+6,9 %).
2. **Comprar** solo con ponderada ≥ 15 % **y** base ≥ 12 %. Se ordena por la ponderada, con unos 1.000-1.200 EUR por valor (≈ 4-5 %), sin repetir apuesta: Pluxee no, porque ya está Edenred; Intuit, Constellation y Gartner no, porque con SAP y Nemetschek ya hay bastante software con riesgo de IA. Nada de juego.
3. **Mantener** lo que tiene ponderada ≥ 10 % y base ≥ 5 %, sin ampliar. Edenred se recorta de 136 a 100 títulos (del 15 % al 11 %) por el riesgo binario de la ley del título restaurante.
4. El oro se queda: es la cobertura de la cartera y no tiene informe.

**Datos.** Cartera de la captura del usuario (importes con los precios del 9-oct; 25.562 EUR con 2.920 de efectivo). Las compras van al precio de su informe (6-12 oct), pasado a euros con los tipos implícitos en la captura (1 USD = 0,893 EUR, 1 GBP = 1,182 EUR, 1 DKK = 0,134 EUR). Desde la nube de Claude Code no se pueden bajar precios de hoy (la red bloquea Yahoo): **antes de operar, comprueba los precios**. Si alguno ha subido más de un 10 %, su rentabilidad baja en la misma medida.

| Valor | Títulos actuales | EUR actuales | Títulos nuevos | EUR nuevos | Peso nuevo | Rent. 12 m (ponderada) | Rent. 12 m (base) | Qué hacer |
|---|---|---|---|---|---|---|---|---|
| Oro IGLN | 68 | 4933 | 68 | 4933 | 19,3 % | 0,0 % | 0,0 % | Mantener (cobertura, sin informe) |
| Edenred | 136 | 3842 | 100 | 2825 | 11,1 % | +31,0 % | +16,6 % | Recortar 36: riesgo binario de la ley; 15 % → 11 % |
| Grifols A | 120 | 1186 | 120 | 1186 | 4,6 % | +18,7 % | +18,1 % | Mantener |
| PepsiCo | 12 | 1349 | 0 | 0 | 0,0 % | +9,7 % | +9,6 % | Vender (ponderada < 10 %) |
| Zoetis | 20 | 1335 | 20 | 1335 | 5,2 % | +18,3 % | +6,8 % | Mantener, sin ampliar (base débil) |
| Puig | 70 | 1266 | 0 | 0 | 0,0 % | +6,9 % | +9,0 % | Vender (ponderada < 10 %) |
| Daiichi Sankyo | 100 | 1480 | 100 | 1480 | 5,8 % | +31,9 % | +18,3 % | Mantener |
| SAP | 7 | 1340 | 7 | 1340 | 5,2 % | +23,4 % | +16,8 % | Mantener |
| Alphabet A | 5 | 1570 | 0 | 0 | 0,0 % | +1,8 % | +6,6 % | Vender (revisión del hilo) |
| Netflix | 23 | 1442 | 23 | 1442 | 5,6 % | +31,8 % | +16,1 % | Mantener |
| Hermès | 1 | 1283 | 1 | 1283 | 5,0 % | +30,0 % | +9,4 % | Mantener (depende del alcista; vender si hace falta liquidez) |
| ICE | 6 | 836 | 6 | 836 | 3,3 % | +15,1 % | +8,4 % | Mantener |
| Equifax | 6 | 781 | 6 | 781 | 3,1 % | +41,0 % | +15,1 % | Mantener |
| DSV | 0 | 0 | 8 | 1217 | 4,8 % | +38,7 % | +15,8 % | Comprar |
| Tomra | 0 | 0 | 115 | 998 | 3,9 % | +54,1 % | +22,7 % | Comprar (convicción baja: posición pequeña) |
| Fluidra | 0 | 0 | 70 | 1190 | 4,7 % | +24,6 % | +17,9 % | Comprar |
| LVMH | 0 | 0 | 3 | 1143 | 4,5 % | +29,0 % | +14,0 % | Comprar |
| Nemetschek | 0 | 0 | 18 | 1213 | 4,7 % | +20,6 % | +21,5 % | Comprar |
| Dunelm | 0 | 0 | 110 | 1040 | 4,1 % | +21,3 % | +14,9 % | Comprar |
| Viscofan | 0 | 0 | 21 | 1111 | 4,3 % | +20,1 % | +14,6 % | Comprar |
| Efectivo | | 2.920 | | 211 | 0,8 % | 0 % | 0 % | Reserva |
| **Total** | | **25.563** | | **25.563** | | **15,6 → 22,5 %** | **9,1 → 12,4 %** | |

**Rentabilidad esperada a 12 meses de la cartera** (con el oro al 0 %): **ponderada del +15,6 % al +22,5 %** (de ≈ 3.980 a ≈ 5.750 EUR) y **base del +9,1 % al +12,4 %**. Con la media simple del hilo saldría del +21,6 % al +29,2 %, una cifra que se descarta por optimista. La mejora sale de vender lo que rinde por debajo del 10 % y de comprar valores cuyo escenario base, sin revalorizar el múltiplo, ya rinde un 14-23 %.

**Operaciones.** Ventas: 5 Alphabet, 12 PepsiCo, 70 Puig y 36 Edenred (≈ 5.200 EUR). Compras: 8 DSV, 115 Tomra, 70 Fluidra, 3 LVMH, 18 Nemetschek, 110 Dunelm y 21 Viscofan (≈ 7.910 EUR). Quedan ≈ 210 EUR de efectivo.

**Diferencias con el plan del hilo del 12-oct** (que vendía Alphabet, Netflix, Hermès, 18 Grifols, ICE y Equifax, y compraba Wolters Kluwer, Auto Trader, Trigano, Deckers, Technip Energies y Coloplast): con la v2 aplicada a todas cambian las cifras.
- **Netflix (+31,8 %, base +16 %), Equifax (+41 %, base +15 %), ICE (+15,1 %) y Grifols (+18,7 %, base +18 %) ya no se venden.** Las cifras del hilo eran v1 y el propio hilo avisó de que podían cambiar con la v2.
- **Trigano (+1 %) y Technip Energies (−5,9 %) salen.** Con BPA y PER propios, el ciclo y el margen pesan más.
- **Wolters Kluwer (+26,5 %, base +9,5 %), Auto Trader (+27,1 %, base +9 %) y Deckers (+18,1 %, base +6 %)** no entran: dependen de que el múltiplo vuelva a su historia (base por debajo del 12 %). **Coloplast** (+14,8 %) queda por debajo del 15 %. Sin el filtro del base, Wolters Kluwer y Auto Trader entrarían en lugar de LVMH y Viscofan.
- **Hermès se mantiene, pero es la primera que vendería** si hace falta liquidez: la base solo da +9,4 % y la convicción es baja.

**Riesgos.** Tomra y Nemetschek tienen convicción baja (posiciones pequeñas). Edenred sigue siendo la mayor (11 %) con la ley pendiente. Dos de lujo (Hermès y LVMH) y dos de software (SAP y Nemetschek). Por divisa, las acciones quedan en ≈ 55 % EUR, 20 % USD, 7 % JPY, 8 % DKK y NOK, y 4 % GBP.

Es la lectura de nuestros informes con nuestro método, no asesoramiento financiero personalizado.
