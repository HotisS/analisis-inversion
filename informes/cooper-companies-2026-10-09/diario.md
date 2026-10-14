# Diario: The Cooper Companies, Inc. (COO), corte 2026-10-09

- Commit de partida: c375ce1 (Informe de Krones (Comprar, convicción media))
- 10:03 Inicio. Lectura de analiza-empresa.md, prompt.md y lecciones.md (con la Vuelta 11).
- 10:04 Fase 1: CIK 711404, ISIN US2166485019, Nasdaq, USD, US GAAP, ejercicio a 31-oct (FY2025 = nov-24 a oct-25, etiqueta «fin»). Último 10-K 5-dic-2025; último 10-Q (3T FY26, a 31-jul-2026) 9-sep-2026. Revisión estratégica cerrada el 9-sep-2026: se queda con CooperSurgical, recompra ampliada a 3.000 M USD. Acuerdo con Browning West (22-dic-2025, Rosebrough al consejo); presidenta Colleen Jay desde 2-ene-2026; Paul Keel consejero desde 1-jul-2026. Beneficio fiscal discreto de 307,2 M en el 3T26 (no recurrente). Guía FY26: ventas 4.229-4.252 M, BPA non-GAAP 4,51-4,55. Próximos resultados: principios de diciembre (4T FY25 se publicó el 4-dic-2025). Sesión del 9-oct en Nueva York sin abrir a las 10:00 de Madrid: precio = cierre del 8-oct.
- 10:05 Lanzados A-D en paralelo.
- 10:16 Control de 10 min: A (cuenta, balance, flujos, segmentos), C y D (identificación) con contenido; B vacío, recordado. C terminado (9 min, 58 llamadas): Jana pidió en sep-2026 buscar nuevo CEO y presidente; 306,8 M del litigio pagados en agosto.
- 10:18 A (13 min, 62 llamadas) y D (12 min, 75 llamadas) terminados. D verificó el cierre del 8-oct (54,30) en Yahoo, MarketScreener y Stock Analysis. Primera integración.
- 10:21 Supuestos fijados y suma de partes; tercer cálculo: DCF 60,01, objetivo 57,55 (+6,0 %); absoluta Mantener, relativa Comprar (66,66). Redacción.
- 10:26 Textos y resumen escritos; Haleon y STAAR fuera de la mediana; objetivo 57,10 (+5,2 %), relativa 66,21. Revisión de comité.
- 10:29 Word (58 páginas, 28 gráficos, cobertura 92,7 %) y PDF generados; Word abre sin reparar. Revisadas como imagen portada, síntesis (646 palabras, cifras iguales a la portada) y síntesis de valoración. Añadida la fundación (1980, 10-K FY2017).

## Resultado
Comprar, convicción baja. Precio 54,30 USD (cierre 8-oct, verificado en Yahoo, MarketScreener y Stock Analysis). Objetivo 57,10 USD (+5,2 %; sin dividendo; asimetría 1,56). Regla absoluta Mantener; regla relativa Comprar (66,21 USD, +21,9 %): manda la relativa. Convicción baja porque la diferencia sale de la tasa de descuento y nuestras cifras están a un 1 % del consenso. DCF 60,01 (WACC 9,15 %, beta 0,89, Tesoro 5,28 %, g 3 %, VT 60 %). DCF inverso: ventas +2,3 % anual FY2027e-FY2035e (base 3,8 %, mercado 5,3 %) o margen EBITDA 29,7 %; rentabilidad implícita 9,7 %. Comparables 50,46 (9,7x NTM, cinco pares); suma de partes 52,81; escenarios 43,17 / 60,01 / 71,61. 68 fuentes (49 primarias), 8 huecos.

## Fallos del sistema
1. **Ajuste del EBITDA del consenso**: D propuso 3,2 % de ventas (media 2023-2025) y el hueco real entre el EBITDA non-GAAP y el nuestro (contable + no recurrentes) en los últimos 12 meses es 2,3 %. Ningún control compara el EBITDA LTM propio con el EBITDA del proveedor del mismo periodo. Arreglo: que el motor calcule el ajuste implícito con el EBITDA LTM del consenso (si se da) y avise si difiere del declarado más de 0,5 puntos.
2. **Comparables «solo de referencia»**: no hay forma de dejar a Haleon en la tabla sin que entre en la mediana; hubo que quitarlo. Arreglo: campo `excluir` (o `referencia: true`) en `comparables.empresas`, como ya existe en transacciones y en múltiplos históricos.
3. **PER con bases mezcladas**: MarketScreener da el BPA contable para Cooper (con 307 M de reversión fiscal y el litigio dentro) y probablemente el «core» para Alcon o EssilorLuxottica; con el PER, los comparables daban 83 USD frente a 54 por EV/EBITDA. Se anuló el PER de todos. Arreglo: campo `base_bpa` por comparable y que el motor no use el PER si las bases no coinciden con la de la empresa.
4. **Control de regresión con explicación huérfana**: al bajar a cinco comparables desaparece el control y su explicación quedaba en `controles_explicados` sin control. Arreglo: que integrar avise de explicaciones que no casan con ningún control.
5. **Nombres de campo en huecos**: A registró «adquisiciones.ev_ebitda» y «kpis (…)» como campo, que se imprimen en el anexo; se renombraron a mano. Arreglo: que integrar avise de puntos o nombres de clave en `huecos[].campo`.
6. **Huecos duplicados entre notas**: el rating lo registraron A y D; se retiró el de D con huecos_resueltos. Arreglo propuesto ya en Krones (aviso de huecos con la misma sección o campo parecido).
7. **Tasa libre de FRED con un día de retraso**: DGS10 no tenía el 8-oct; se usó el 7-oct. Arreglo: que la herramienta de bolsa o un lector de FRED lo diga y ofrezca el Tesoro (home.treasury.gov) como segunda fuente del día.
8. **bolsa.mjs dio bien la sesión del 8-oct** esta vez (D lo contrastó con tres fuentes): sin fallo, pero la comprobación manual sigue siendo necesaria hasta que la herramienta compare con el calendario de sesiones.
9. **Tiempos**: análisis completo en unos 26 minutos (de 10:03 a 10:29); subagentes de 9-14 minutos. B tardó 11 minutos en escribir algo en su nota pese al encargo (hubo que recordárselo).

## Actualización v2 (13 oct 2026): sostenibilidad del crecimiento

Sin investigación nueva. Script: `notas/actualizacion-v2.mjs` (parte de `datos.json`), salida `datos-v2.json`, `Cooper Companies - 2026-10-09 v2.docx` y su PDF. Mismo precio (54,30 USD) y fecha de corte; ningún supuesto del DCF cambia.

| | v1 | v2 |
|---|---|---|
| Recomendación · convicción | Comprar · Baja | Comprar · Baja |
| Valor objetivo (WACC 9,15 %) | 57,10 USD, RTE +5,2 %, asimetría 1,56x | 57,10 USD, RTE +5,2 %, asimetría 1,56x |
| Objetivo con la prima del mercado (WACC 8,23 %) | 66,21 USD, RTE +21,9 % | 66,21 USD, RTE +21,9 % |
| Regla absoluta / relativa | Mantener / Comprar | Mantener / Comprar (manda la relativa) |
| Niveles | Comprar < 57,56; Vender > 73,60 | **Comprar < 54,36**; Vender > 73,60 |
| Sostenibilidad del crecimiento | — | **Sí** (3,8 % anual; reinversión del 3 % del NOPAT: prueba de precio y cuota) |

- **Veredicto «Sí», decidido antes de calcular**: la proyección (3,8 % anual) pide menos que el 5,3 % previsto para el mercado de lentes. Puente FY2026e-FY2029e: precio del 2 % anual (los cuatro fabricantes suben precios) y volumen del 0,5 % al 2,5 %, más 1,1 puntos de divisa en FY2026e. Con CooperVision al ritmo del grupo, su cuota bajaría del 26,6 % al 23 % en FY2035e (cálculo a mano): el caso base ya supone perder cuota.
- **`mercado_final` en null**: la cuota del informe (26,3 %) es solo de CooperVision en lentes y el DCF proyecta el grupo (con CooperSurgical, un 33 % de las ventas); dividir por el mercado de lentes daría una cuota sin sentido. La prueba de cuota va en la justificación.
- **Reinversión**: 318 M acumulados, el 3 % del NOPAT (capex por debajo de la amortización, que incluye intangibles comprados): el motor la trata como de activos ligeros. El ROIC del 4,6 % no entra en la prueba.
- **Lo único que cambia en la decisión no es el método nuevo**: el motor actual aplica la regla del 9-oct (un Comprar que solo da la relativa exige ≥ 5 % con nuestro WACC). Con un 5,2 %, el nivel de compra baja de 57,56 a 54,36 USD, un 0,1 % sobre el precio. La recomendación se mantiene, pero en el borde; dicho en la síntesis y en `cambiaria_recomendacion`.

**Fallos del sistema vistos**
1. La cuota implícita del motor divide los ingresos del grupo por el mercado: en empresas con dos negocios (CooperVision y CooperSurgical) no se puede usar. Arreglo: `mercado_final.ingresos_perimetro` (o un segmento) para la cuota.
2. El texto de los niveles dice «Por debajo de 54,36 (rentabilidad total esperada ≥ 15 % …)», pero la condición que manda en 54,36 es el 5 % mínimo con nuestro WACC. Arreglo: que la condición nombre la regla que fija el nivel.
3. El texto de activos ligeros habla de un comprador en serie en genérico; aquí el capex bruto es del 7,3 % y el crecimiento proyectado es orgánico (sin compras): la frase no aplica y no se puede quitar.
- 13-oct-2026: revisión v2 a 12 meses (PER propio × BPA propio): objetivo 66,1 USD, rentabilidad +21,7 %, señal Comprar (`revision-12m-2026-10-13.md`).
- 14-oct-2026: objetivo a 12 meses con la regla de múltiplos común (`valoracion.objetivo_12m`): ponderada +18,7 % → +14,1 %, base +9,6 %, señal Mantener (`revision-12m-2026-10-13.md`).

- 2026-10-14: datos-v3.json = regla de múltiplos v3 con la historia del PER adelantada construida por herramientas/historia-adelantada.mjs (5 años; mediana 53.7x, mínimo 39.8x, media larga 49.2x; antes v2 45x/35.2x/42x). Solo cambian el objetivo a 12 meses y la señal; el Word no se regenera.
- 2026-10-14: datos-v3.json y «Cooper Companies - 2026-10-09 v3.docx» regenerados con el motor vigente (herramientas/regenerar.mjs; METODO-VIGENTE.md), sin investigación nueva: v3 Comprar 25,9 % (antes v3 Comprar 48,8 %). Para comparar, con la regla v2 (historia al cierre, mismo precio): 17,1x / 20,1x / 26,1x, 14,1 % Mantener; con el tope anterior del base (×1,3, 14-oct mediodía): 48,8 % Comprar. Decide la regla vigente (v3 con tope ×1,1; METODO-VIGENTE.md).

- 2026-10-14: datos-v4.json = regla de múltiplos v3 con la historia del PER adelantada construida por herramientas/historia-adelantada.mjs (5 años; mediana 46.2x, mínimo 39.8x, media larga 53.2x; antes v2 53.7x/39.8x/49.2x). Solo cambian el objetivo a 12 meses y la señal; el Word no se regenera.
- 2026-10-14: datos-v4.json y «Cooper Companies - 2026-10-09 v4.docx» regenerados con el motor vigente (herramientas/regenerar.mjs; METODO-VIGENTE.md), sin investigación nueva: v3 Comprar 25,9 % (antes v3 Comprar 25,9 %). Para comparar, con la regla v2 (historia al cierre, mismo precio): 17,1x / 20,1x / 26,1x, 14,1 % Mantener; con el tope anterior del base (×1,3, 14-oct mediodía): 48,8 % Comprar. Decide la regla vigente (v3 con tope ×1,1; METODO-VIGENTE.md).
