# Señales del escáner diario

Registro de todas las señales del escáner (`herramientas/escaner-diario.mjs`, procedimiento en `escaner/README.md`). Se rehace en cada ejecución; los datos están en `escaner/registro-senales.json`. Última actualización: 2026-10-14 19:56 (Madrid).

**Cómo se mide si acierta.** Desde el precio de la señal, en euros, frente al índice mundial (MSCI World (iShares, EUR)). Una compra acierta si lo hace mejor que el índice; una venta acierta si, después de vender, la acción lo hace peor que el índice. También se siguen las que tocaron banda y no se emitieron (sin liquidez, descartadas tras el Vup), para saber si el filtro ayuda. Se guarda la foto a 1, 3, 6 y 12 meses.

## Resumen

| Estado | Señales | Mejor que el índice | Diferencia mediana frente al índice |
|---|---|---|---|
| sin liquidez | 7 | 3 | 0,0 % |
| ya en órdenes | 12 | 0 | 0,0 % |

## Todas (la más reciente arriba)

| Fecha (Madrid) | Tipo | Valor | Estado | Precio | Límite | Rentab. 12 m | Desde la señal (EUR) | Índice | Diferencia | Motivo / Vup |
|---|---|---|---|---|---|---|---|---|---|---|
| 14-oct 19:49 | VENTA | Equifax | ya en órdenes | 148,50 USD | 155,31 | +15,0 % | +0,1 % | 0,0 % | -0,1 % | venta ya decidida para el 15-oct |
| 14-oct 19:49 | VENTA | ICE | ya en órdenes | 155,60 USD | 168,30 | +19,0 % | +0,1 % | 0,0 % | -0,1 % | venta ya decidida para el 15-oct |
| 14-oct 19:49 | VENTA | Hermès | ya en órdenes | 1296 EUR | 1103 | +23,4 % | 0,0 % | 0,0 % | 0,0 % | venta ya decidida para el 15-oct |
| 14-oct 19:49 | VENTA | Puig | ya en órdenes | 19,28 EUR | 18,02 | +2,8 % | 0,0 % | 0,0 % | 0,0 % | venta ya decidida para el 15-oct |
| 14-oct 19:49 | VENTA | Zoetis | ya en órdenes | 75,51 USD | 68,47 | -0,3 % | 0,0 % | 0,0 % | 0,0 % | venta ya decidida para el 15-oct |
| 14-oct 19:49 | VENTA | Alphabet | ya en órdenes | 348,15 USD | 297,34 | -1,7 % | 0,0 % | 0,0 % | 0,0 % | venta ya decidida para el 15-oct |
| 14-oct 19:49 | COMPRA | Zscaler | sin liquidez | 222,94 USD | 244,30 | +15,1 % | +0,1 % | 0,0 % | +0,1 % | liquidez libre 30 EUR |
| 14-oct 19:49 | COMPRA | Toast | sin liquidez | 29,33 USD | 32,10 | +15,2 % | +0,3 % | 0,0 % | +0,3 % | liquidez libre 30 EUR |
| 14-oct 19:49 | COMPRA | Snowflake | ya en órdenes | 339,66 USD | 368,00 | +13,8 % | -0,2 % | 0,0 % | -0,2 % | orden de compra del 15-oct (límite 368,00 USD) |
| 14-oct 19:49 | COMPRA | Shopify | ya en órdenes | 171,04 USD | 192,10 | +17,9 % | -0,0 % | 0,0 % | -0,0 % | orden de compra del 15-oct (límite 192,10 USD) |
| 14-oct 19:49 | COMPRA | Samsara | ya en órdenes | 40,72 USD | 45,10 | +16,2 % | -0,1 % | 0,0 % | -0,1 % | orden de compra del 15-oct (límite 45,10 USD) |
| 14-oct 19:49 | COMPRA | Nu Holdings | ya en órdenes | 14,99 USD | 16,60 | +19,5 % | -0,1 % | 0,0 % | -0,1 % | orden de compra del 15-oct (límite 16,60 USD) |
| 14-oct 19:49 | COMPRA | Natera | sin liquidez | 398,54 USD | 407,50 | +7,4 % | 0,0 % | 0,0 % | 0,0 % | liquidez libre 30 EUR |
| 14-oct 19:49 | COMPRA | MongoDB | sin liquidez | 361,15 USD | 416,40 | +21,7 % | -0,2 % | 0,0 % | -0,2 % | liquidez libre 30 EUR |
| 14-oct 19:49 | COMPRA | Dexcom | sin liquidez | 83,65 USD | 89,50 | +12,4 % | +0,1 % | 0,0 % | +0,1 % | liquidez libre 30 EUR |
| 14-oct 19:49 | COMPRA | Datadog | sin liquidez | 272,65 USD | 289,00 | +11,3 % | -0,1 % | 0,0 % | -0,1 % | liquidez libre 30 EUR |
| 14-oct 19:49 | COMPRA | Axon Enterprise | ya en órdenes | 400,57 USD | 476,40 | +36,5 % | -0,3 % | 0,0 % | -0,3 % | orden de compra del 15-oct (límite 476,00 USD) |
| 14-oct 19:49 | COMPRA | argenx SE | sin liquidez | 826,17 USD | 866,80 | +10,2 % | -0,1 % | 0,0 % | -0,1 % | liquidez libre 30 EUR |
| 14-oct 19:49 | COMPRA | Nemetschek | ya en órdenes | 70,80 EUR | 71,57 | +28,0 % | 0,0 % | 0,0 % | 0,0 % | orden de compra del 15-oct (límite 71,00 EUR) |
