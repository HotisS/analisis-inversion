# Diario · King Slide (2059.TW) · corte 20-oct-2026

- Commit de partida: `d92ada5` (checkout compartido con otro análisis: sin pull, commit ni push en este encargo).
- Análisis hecho de cero; el intento del 19-oct no se ha usado.
- Horas (UTC): inicio 15:42 · bolsa y movimiento 15:43 · notas A-E 15:45-16:00 · integrar y calcular 16:00-16:03 · Word y PDF 16:05 · precios, revisión a 12 m, apuntar-12m y robustez después.

## Decisiones

- **Cuentas**: MOPS y la web de la empresa no responden desde la nube. Se usan las cuentas NIIF-Taiwán de S&P Global (vía StockAnalysis, actualizadas el 6-ago-2026: 2021-2025 y doce meses a jun-26), cuadradas con la ficha oficial de la TWSE y la OpenAPI (ventas mensuales, dividendos y participaciones de consejeros). Huecos: auditor, geografías, vencimientos, concentración de clientes y tamaño del mercado de raíles.
- **Propiedad**: el registro t187ap11_L da a la familia un 26,7 %; la cifra de Forbes («~50 %») se descartó por no ser primaria.
- **Base de ventas**: +177,8 % en 2026e (enero-septiembre oficial 33.618 M), +25 % en 2027e, +8 % en 2028e y −10 % en 2029e (bache de ciclo, precedente 2023 −26 %). Margen EBITDA del 79,5 % al 73 % en 2028e por el segundo proveedor (Nan Juen).
- **Sostenibilidad «En parte»**: el motor la da por buena porque crecemos poco después de 2026, pero el punto de partida (margen ≈ 80 %, cuota ≈ 80 %) es de pico. No pasa el «Sí» que pide comprar.
- **Convicción Media** (el motor sugería Alta): la señal depende de que nuestro BPA 2028e esté un 25 % bajo el consenso.
- **Historia del PER en BPA básico** (la base de nuestro BPA de 95,3 M acciones).
- **Caja**: 29.408 M a jun-26 menos el dividendo pendiente de 4.860 M (otros_ajustes); intereses de la caja en el resultado financiero, sin diferencias de cambio después de 2026e.
- **Precio**: el informe usa 10.100 TWD, cierre del 20-oct (Yahoo regularMarketPrice a las 05:30:16 UTC, coincide con StockAnalysis). precios.mjs dejó 9.920 (19-oct) porque la barra diaria del 20-oct traía el cierre vacío; robustez --actual tomó 9.920. La señal no cambia: los dos precios están por encima del umbral de venta (9.500,96).

## Pasos y fecha de los datos

| Paso | Herramienta o fuente | Fecha del dato |
|---|---|---|
| Cuentas 2021-2025 y LTM | StockAnalysis (S&P Global) | 6-ago-2026 (doce meses a jun-26) |
| Ficha de la empresa | TWSE (2059_en.pdf) | 20-oct-2026 |
| Ventas mensuales | OpenAPI TWSE t187ap05_L | sep-26 (publicadas 10-oct, leídas 17-oct) |
| Participaciones de consejeros | OpenAPI TWSE t187ap11_L | sep-26 |
| Dividendos | OpenAPI TWSE t187ap45_L | 19-oct-2026 |
| Consejo | API GCIS | 20-oct-2026 |
| Consenso | MarketScreener / Yahoo | 20-oct-2026 |
| Precio y bolsa | bolsa.mjs, movimiento.mjs (Yahoo) | 20-oct-2026 (cierre 10.100) |
| Sector | TrendForce | 14-oct-2026 |
| Bono a 10 años | 2,03 % | 20-oct-2026 |
| Sentimiento | PTT | 7-sep a 20-oct-2026 |
| Cálculo y Word | integrar, calcular-empresa, rellenar | 20-oct-2026 |
| precios.mjs | Yahoo | 9.920 (19-oct; barra del 20-oct sin cierre) |
| Robustez | robustez.mjs --actual | 20-oct-2026 con precio 9.920 |

## Lecciones (para quien mantenga lecciones-paises.md; no escritas allí por el checkout compartido)

- Taiwán: la OpenAPI de la TWSE tiene t187ap11_L (participaciones y pignoraciones de consejeros) y t187ap45_L (dividendos aprobados), que cubren parte de lo que da MOPS.
- Yahoo deja el cierre del día en null en la barra diaria de Taipéi horas después del cierre; precios.mjs se queda en la sesión anterior aunque regularMarketPrice ya trae el cierre.
