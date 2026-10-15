# Octava hora value (15-oct-2026): 16 análisis elegidos con el escáner

Lista elegida el 14-oct con el perfil de escáner `calidad-a-precio` y con cartas de gestores value. Diagnóstico de partida en `informes/septima-hora-2026-10-14/octava-hora-propuesta.md`.

Método vigente: decide el selector. Va con v3 ×1,1 en 14 de las 16; en Autodesk (desrateada) y Diagnostyka (un año de historia) decide v2. Precios del 15-oct a las 09:00 UTC: Europa en sesión, EE. UU. al cierre del 14-oct. Herramientas: `precios.mjs`, `apuntar-12m.mjs --precios --actual --simular` y `robustez.mjs --actual` en las candidatas. Todas llevan `riesgos.ia` (campo obligatorio desde el 15-oct). En ninguna saltó el control de sostenibilidad «analista Sí / motor En parte».

**Resultado: dos compras robustas, Rai Way y Burckhardt Compression.** Cuatro más quedan cerca:
- Gentex y FactSet: Comprar con la regla, pero FRÁGILES.
- Broadridge y Paycom: a un 1-1,5 % de su límite.

DO & CO da Comprar, pero su sostenibilidad es «En parte» y la regla §4 no deja comprar.

| Empresa | Precio | Selector pond. / base | v2 pond. / base | Valor intrínseco vs precio | ROIC − WACC · calidad | Riesgo de IA | Robustez → acción | Comprar por debajo de (los dos) | Resultados |
|---|---|---|---|---|---|---|---|---|---|
| **Rai Way** | 4,19 EUR (sesión) | +27,4 / +23,2 | +16,6 / — | +48 % | +22,6 · Sí | Baja, neutral (0 %) | SÓLIDA → **Comprar** (colchón de BPA 10 %) | **4,22 EUR** | 11-nov |
| **Burckhardt Compression** | 476 CHF (sesión) | +17,5 / +19,5 | +18,7 / — | +22 % | +36 · Sí | Baja, oportunidad (+2 %) | SÓLIDA → **Comprar** (colchón 3 %) | **482,60 CHF** (con el BPA del consenso) | 3-nov |
| DO & CO | 196,00 EUR (sesión) | +16,3 / +21,8 | +29,8 / — | +7 % | +15,8 · Sí; sostenibilidad En parte | Baja, mixto (±2 %) | La herramienta da Comprar, pero §4 lo bloquea; colchón 2 % | 198,12 | 12-nov |
| Gentex | 20,78 USD | +22,5 / +19,1 | +11,4 / +8,8 | +26 % | +7,2 · Sí | Baja, mixto (±3 %) | FRÁGIL → Mantener | 20,13 | 23-oct |
| FactSet | 289,74 USD | +22,8 / +19,2 | +11,5 / +8,8 | +9 % | +10,7 · En parte | **Alta**, mixto (−32 % en el bajista) | FRÁGIL → Mantener | 280,80 | ≈17-dic |
| Broadridge | 168,26 USD | +27,7 / +24,9 | +19,6 / +13,9 | −1,5 % | +9,0 · Sí | Media, mixto (−10 %) | SÓLIDA → Mantener | 165,77 | ≈3-nov |
| Paycom | 239,00 USD | +24,1 / +22,2 | +15,3 / +10,9 | −0,7 % | +23 · Sí | Media, mixto (−10 %) | SÓLIDA → Mantener | 236,67 | ≈4-nov |
| Sage | 10,89 GBP (sesión) | +23,1 / +24,7 | +16,2 / — | −11 % | +12,6 · En parte | **Alta**, mixto (−15 %) | SÓLIDA → Mantener | 9,51 | 19-nov |
| Autodesk (decide v2) | 231,14 USD | +20,8 / +17,1 | (v3 +33,4) | −14 % | +27,5 · Sí | **Alta**, mixto (−41 % en el bajista) | SÓLIDA → Mantener | 199,13 | ≈24-nov |
| Jack Henry | 155,26 USD | +24,4 / +19,2 | +14,8 / +8,6 | −16,5 % | +14,5 · Sí | Media, mixto (−5 %) | SÓLIDA → No mantener | 129,57 | 3-nov |
| Diagnostyka (decide v2) | 158,20 PLN (sesión) | +20,5 / +17,2 | (v3 +26,2) | −25 % | +11 · Sí | Media, mixto (±5 %) | SÓLIDA → No mantener | 119,47 | 26-nov |
| MSA Safety | 181,57 USD | +22,2 / +21,9 | +15,4 / +11,7 | −22 % | +7,8 · Sí | Baja, oportunidad (+2 %) | SÓLIDA → No mantener | 141,21 | 27-oct |
| Rollins | 32,63 USD | +27,9 / +22,9 | +16,2 / +11,8 | −24,5 % | +21,4 · Sí | Media, amenaza (−10 %) | SÓLIDA → No mantener | 24,62 | 21-oct |
| Qualys | 189,63 USD | +11,3 / +7,4 | +13,6 / +10,0 | −37 % | ≈+52 · Sí | **Alta**, mixto (−15 / +10 %) | SÓLIDA → No mantener | 119,16 | 3-nov |
| Thales | 228,10 EUR (sesión) | −4,5 / +2,3 | −6,8 / — | +5 % | +8,9 · Sí | Media, mixto (±5 %) | SÓLIDA → No mantener | 189,43 | 22-oct |
| Cencora | 336,17 USD | −7,4 / −0,1 | −1,6 / +5,7 | −3 % | +7-8 · Sí | Baja, mixto (±2 %) | SÓLIDA → No mantener | 270,55 | 4-nov |

Ninguna de las 16 está en cartera. Una acción cuesta menos de 600 EUR en todas.

## El porqué de cada una

- **Rai Way.** Torres de emisión de la RAI con un canon indexado y renovable hasta 2035. El precio descuenta que los ingresos caigan un 4,8 % al año hasta 2032. La caída del 33 % viene de perder la prima de la fusión con EI Towers, que no se hizo, y del cobro del dividendo; las cuentas no empeoran y la guía de julio subió. Objeción: RAI es dueña (65 %) y cliente (84 % de los ingresos), y el contrato se renueva en junio de 2028. Respuesta: el bajista (4,22) es casi el precio de hoy. Riesgo de IA nulo: emisión física con licencia.
- **Burckhardt Compression.** Compresores alternativos para GNL, petroquímica e hidrógeno, con caja neta y servicio que da la mitad del EBIT con un 24 % de margen. Los pedidos cayeron un 32 % (aranceles, Oriente Medio y sobrecapacidad china). El precio trata este año de transición como el nuevo nivel: descuenta ventas −3,5 % al año. Objeción: colchón de BPA de solo el 3 % y China pesa el 41 % de las ventas. Por eso el límite usa el BPA del consenso (482,60 CHF) y conviene comprar tras los resultados del 3-nov.
- **DO & CO.** Catering de aviación y grandes eventos con un ROIC del 25 % y 256 M de caja neta, en su PER mediano. Da Comprar, pero el analista pone la sostenibilidad en «En parte» por la concentración en Turkish y la lira, y el colchón de BPA es del 2 %. No se compra; vigilar tras el 12-nov.
- **Gentex.** Casi monopolio del espejo atenuable (79 %), a 9,3 veces el BPA de 2027 y un 11 % de flujo libre. FRÁGIL: la v2 solo da +11,4 % y el margen lleva una década bajando. Robusta por debajo de 20,13 USD; resultados el 23-oct.
- **FactSet.** Datos financieros a 13 veces beneficios frente a 27 de media. Las cifras de hoy van a favor (ASV +7 %, retención > 95 %), pero es la más expuesta a la IA del grupo y la v2 no confirma.
- **Broadridge y Paycom.** Negocios excelentes, a un 1-1,5 % de su límite robusto. Broadridge: riesgo regulatorio de la entrega electrónica (Reg E-Delivery). Paycom: cobra por empleado y la IA puede reducir plantillas.
- **Sage, Autodesk, Jack Henry, Diagnostyka, MSA Safety, Rollins y Qualys.** Calidad Sí, y la rentabilidad a 12 meses pasa con la regla. Pero el DCF, con bonos al 5,2 % (EE. UU.), 5,4 % (Reino Unido) o 6,2 % (Polonia), deja el valor intrínseco entre un 11 % y un 37 % por debajo del precio. Qualys y Paycom ya habían subido más del 100 % desde sus mínimos de abril.
- **Thales y Cencora.** Ya revalorizadas: Thales a 18,9 veces frente a 14,2 de mediana (la subida de defensa está en el precio) y Cencora a 17 frente a 14,1. La regla a 12 meses no da nada.

## ¿Afina el escáner? (frente a las 32 de la 6.ª y 7.ª hora)

| | 6.ª y 7.ª hora (elegidas por calidad) | 8.ª hora (escáner + cartas) |
|---|---|---|
| Compras robustas | 2 de 32 (6 %) | **2 de 16 (12,5 %)** |
| Cerca: frágiles o a menos del 2 % de su límite | 8 | 5 (Gentex, FactSet, Broadridge, Paycom, DO & CO) |
| Caen por calidad (ROIC − WACC < 5) | 14 (44 %) | **0** |
| Caen por valor intrínseco más de un 10 % bajo el precio | 19 (59 %) | 7 (44 %) |
| Ya revalorizadas (12 meses < 10 %) | — | 2 (Thales, Cencora) |
| No caben en la cartera | 3 | 0 |

**Conclusión.** El escáner arregla del todo el problema de calidad y el de precio por acción. El de valor intrínseco solo lo arregla a medias: el escáner compara lo que descuenta el precio con el crecimiento pasado de las ventas, y el informe lo compara con el crecimiento futuro del caso base, que es más bajo. El 15-oct se alinearon con las del DCF de los informes la tasa libre y la prima del escáner, que estaban 1-1,3 puntos por debajo (commit 6565ad3). Para la próxima hora, dos filtros más (puntos de método): excluir lo que ha subido más del 60 % desde su mínimo de 52 semanas, y comparar con el crecimiento del consenso de ventas, no con el pasado.
