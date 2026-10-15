# Novena hora value (15-oct-2026): 16 empresas

Elegidas con el escáner `calidad-a-precio` (perfil sin cambios, `escaneos/escaneo-2026-10-15-novena-hora.xlsx`) y con cartas e índices de gestores (Morningstar vía VanEck MOAT/MOTI). Ninguna tenía informe. Precios: último cierre o sesión del 15-oct a mediodía (`precios.json`); robustez con `herramientas/robustez.mjs --actual` (exige calidad para una compra robusta).

**Compras robustas: 1 de 16** (Universal Music), frente a 2 de 16 en la 8.ª hora.

| # | Empresa | Precio | Rentabilidad 12 m (método vigente) | Valor real frente al precio | Calidad | Riesgo de IA | Acción robusta | Comprar por debajo de |
|---|---|---|---|---|---|---|---|---|
| 1 | **Universal Music** | 15,34 EUR | +16,7 % (v2, desrateada) | +20 % | Sí (+13) | Alta, mixto | **Comprar** | **15,51 EUR** |
| 2 | Neurocrine | 135,91 USD | +29,4 % (v2) | +15 % | Sí (+46) | Baja, oportunidad | Esperar (el BPA tiene que crecer un 34 % al año) | 151,40 USD |
| 3 | Booz Allen | 71,87 USD | +34,5 % | +35 % | Sostenibilidad En parte | Alta, mixto | No comprar (orgánico −4 %) | 76,64 USD si pasa a «Sí» |
| 4 | Brady | 83,65 USD | +17,1 % | +22 % | En parte (compra de PSS) | Baja, mixto | No comprar | 84,41 USD |
| 5 | Unicharm | 1.000 JPY | +24,9 % | +16 % | En parte | Baja, mixto | No comprar (FRÁGIL: v2 13,4 %) | 978,93 JPY |
| 6 | SFS Group | 138,80 CHF | +5,7 % | +2 % | En parte (+1,4) | Baja, mixto | No | 118,22 CHF |
| 7 | Check Point | 134,08 USD | +20,7 % | −2,5 % | Sí | Media, mixto | No | 130,70 USD |
| 8 | Lockheed Martin | 522,23 USD | +4,9 % | −3 % | Sí | Media, mixto | No | 476,22 USD |
| 9 | Chemed | 513,18 USD | +21,0 % | −7 % | Sí | Media, amenaza | No | 479,34 USD |
| 10 | Compass | 32,25 USD | +14,9 % | −11 % | Sí | Baja, mixto | No | 28,73 USD |
| 11 | Sweco | 130,60 SEK | +18,1 % | −15 % | En parte | Alta, mixto | No | 110,81 SEK |
| 12 | Tetra Tech | 33,61 USD | +19,2 % | −16 % | Sí | Media, mixto | No | 28,27 USD |
| 13 | Borregaard | 149,00 NOK | +17,7 % | −18 % | En parte (+2,6) | Baja, neutral | No | 122,50 NOK |
| 14 | ADP | 280,32 USD | +8,3 % | −21 % | Sí | Media, mixto | No | 221,23 USD |
| 15 | Interparfums SA | 32,10 EUR | +17,3 % | −27 % | En parte (licencias) | Baja, mixto | No | 23,31 EUR |
| 16 | OMA | 204,78 MXN | +14,8 % | −30 % | Sí | Baja, neutral | No | 143,08 MXN |

## Por qué caen

- **Valor real por debajo del precio: 10** (Check Point, Lockheed, Chemed, Compass, Sweco, Tetra Tech, Borregaard, ADP, Interparfums, OMA). En la 8.ª fueron 7.
- **Calidad o sostenibilidad «En parte»: 4 que pasaban lo demás** (Booz Allen, Brady, Unicharm, SFS). En la 8.ª, ninguna.
- **Crecimiento del BPA difícil de creer: 1** (Neurocrine, aviso D6).
- La causa de fondo: con el bono de EE. UU. al 5,2 % el DCF rara vez supera el precio de empresas de calidad que cotizan a 18-25 veces; el escáner usa los mismos tipos (6565ad3), pero mide el margen de seguridad con el crecimiento pasado.

## Cerca (para vigilar)

- **Neurocrine**: tras los resultados del 29-oct; si el BPA de los últimos 12 meses sigue subiendo (hoy 6,84 USD), la marca D6 cae y pasa a compra robusta por debajo de 151,40 USD.
- **Booz Allen**: tras los resultados del 23-oct; si el orgánico vuelve a positivo, la sostenibilidad pasa a «Sí» y es compra por debajo de 76,64 USD.
- **Brady**: el 17-nov, primer trimestre con PSS; colchón de BPA del 1 %.
- **Unicharm**: por debajo de 978,93 JPY pasaría con la v2, pero la calidad sigue «En parte».

Detalle de cada una en su carpeta `informes/<empresa>-2026-10-15/` (Word, PDF, revisión a 12 meses y diario).
