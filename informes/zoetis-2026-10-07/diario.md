# Diario — Zoetis (ZTS), corte 2026-10-07

- Commit de partida: `1ef5d96 Informe de Lululemon (Comprar, convicción media)`.
- Inicio: 2026-10-07 18:01 (hora de Madrid). La sesión del 7 en la NYSE no ha cerrado (cierra a las 22:00 de Madrid): se usa el cierre del 6 de octubre.

## Fase 1 — Identificación (18:01-18:04)
- Zoetis Inc., NYSE ZTS, ISIN US98978V1035, CIK 0001555280, USD, US GAAP, ejercicio a 31 de diciembre, cuenta por función.
- Último 10-K: 2025 (12-feb-2026). 10-Q: 1T26 (7-may-2026) y 2T26 (6-ago-2026).
- Guía 2026 rebajada el 6-ago-2026: ingresos 9.120-9.320 M USD (orgánico −3 % a −1 %), BPA ajustado 6,15-6,25 USD; EE. UU. −7 % en el 2T26 (animales de compañía −11 %).
- Director financiero nuevo: Jay Saccaro (ex GE HealthCare y Baxter) desde el 17-ago-2026, también director de operaciones; Wetteny Joseph pasa a asesor.
- Convertibles 0,25 % 2029 por 2.000 M emitidos el 18-dic-2025.
- Próximos resultados (3T26): principios de noviembre (por confirmar por D).
- Prima implícita de Damodaran de octubre de 2026 comprobada en ERPbymonth.xlsx: 4,20 % (columna «ERP (T12m with sustainable payout)»; S&P 7.652, bono 5,29 %).

## Subagentes
- 18:04 lanzados A, B, C y D en segundo plano.
- ~18:13 el coordinador paró la sesión y los subagentes A, B y D por una regla nueva y estricta del usuario: trabajar solo en la carpeta del repo y en %TEMP%. C (gobierno) ya había terminado (`C.json`, 25 KB).
- 18:15 comprobación de notas: A y B seguían con el esqueleto vacío a los 11 minutos; D tenía identificación y parte del puente. Reanudados A, B y D con SendMessage, con la regla de rutas y el recordatorio de guardar por campos.
- 18:25 notas con contenido: A 48 KB, B 38 KB, C 25 KB, D 31 KB (A, B y D aún trabajando).

## Integración, cálculo y redacción (desde 18:20)
- 18:20 supuestos provisionales (`notas/supuestos.mjs`) y primer cálculo con notas parciales: DCF 100,04 USD (WACC 8,53 %), DCF inverso −1,0 % anual, proyección dentro del 1,3 % del consenso en 2026e-2028e.
- 18:26 base más prudente a medio plazo (crecimiento del 3-4 % en 2029e-2032e por los vencimientos de Apoquel en 2030 y Simparica Trio en 2032, margen EBITDA del 41,0 %): DCF 96,44 USD, valor objetivo 91,77 (+28,7 %), reglas absoluta y relativa Comprar.
- 18:28-18:33 textos (`notas/textos.mjs`) y resumen (`notas/resumen.mjs`), con las sensibilidades sacadas de `calc.dcf.sensibilidad2` y `sensibilidad`. Sin etapa 2: ROIC 29 % (cumple el requisito), pero tres franquicias pierden cuota a la vez y las patentes de Apoquel (2030) y Simparica Trio (2032) vencen dentro de la proyección.
- 18:33 primer Word de prueba: cobertura 91,5 %, 28 gráficos; controles 14 correctos y 2 explicados (regresión y fragilidad de comparables). A, B y D siguen trabajando.
- ~18:35 del 7-oct la sesión se cortó por el límite de uso. A, B y D ya habían guardado sus notas (las últimas escrituras, de las 18:17-18:23, son las que se integraron en las pruebas anteriores).

## Reanudación (8-oct, 08:29-08:33)
- El coordinador confirmó que los cuatro subagentes terminaron. Las notas no habían cambiado desde las 18:23: integración y cálculo idénticos (DCF 96,44 USD, valor objetivo 91,77). Se mantienen la fecha de corte (7-oct) y el precio (cierre del 6-oct, 71,33 USD).
- Síntesis recortada de 690 a 644 palabras. Revisión visual de las páginas 1-4: la portada daba 2,0x de deuda neta ajustada sobre EBITDA y la síntesis decía 1,9x (esa es la deuda neta sin ajustar); corregido.
- Word y PDF finales (55 páginas): cobertura 91,5 %, 28 gráficos, 89 fuentes (59 primarias), 20 huecos, todos de complemento. Controles: 14 correctos y 2 explicados (regresión con R² 0,15 y mediana de comparables frágil).
- Resultado: Comprar, convicción media. Valor objetivo 91,77 USD frente a 71,33 (+28,7 %; rentabilidad total 31,6 %); con la prima implícita del 4,20 %, 101,61 (+42,5 %). Reglas absoluta y relativa: Comprar. DCF inverso: −0,9 % anual de ventas en 2027e-2035e, o margen EBITDA del 33,5 %, o rentabilidad del 10,1 %.
- Tiempo efectivo: ≈ 35 min el 7-oct (18:01-18:35) y 4 min el 8-oct, sin contar las dos paradas.

## Fallos del sistema y su arreglo propuesto
1. **A y B no guardaron en 11 minutos.**
   - Fallo: a las 18:15 `A.json` y `B.json` seguían con el esqueleto vacío pese al encargo de guardar por campos; D sí guardaba. La parada del coordinador habría perdido todo su trabajo.
   - Arreglo: que `prompt-de.mjs` termine con un recordatorio en negrita («escribe notas/<letra>.json antes de la llamada 15») y que el lanzador compruebe el tamaño del archivo a los 8 minutos.
2. **El integrador no compara la síntesis con la portada.**
   - Fallo: escribí «1,9 veces el EBITDA» para la deuda neta ajustada; la portada calcula 2,0x (7.773 / 3.971). Solo lo vi en la revisión visual.
   - Arreglo: que `calcular-empresa.mjs` exponga `calc.clave.dn_ajustada_ebitda` y que un control busque en `resumen.sintesis` la cifra junto a «deuda neta ajustada» y avise si no coincide.
3. **La síntesis se pasa de longitud sin aviso.**
   - Fallo: 690 palabras frente al máximo de 650; lo detecté con un script propio.
   - Arreglo: que `integrar.mjs` cuente las palabras de `resumen.sintesis` y avise fuera de 500-650.
4. **El previsto del mercado de IMARC (2,7 %) entra en «La decisión» sin contraste.**
   - Fallo: B tomó el crecimiento de IMARC, que el propio B dice que infravalora las mascotas; el motor lo usa para comparar con el crecimiento implícito.
   - Arreglo: un campo `sector.tcac_previsto_fuente_debil` (o la confianza del sector) para que el motor lo imprima con la advertencia, o pedir a B dos fuentes del previsto.
5. **Sin consenso previo por trimestre ni EBITDA trimestral.**
   - Fallo: otra vez `trimestres.vs_consenso` y el EBITDA trimestral vacíos.
   - Arreglo: el mismo de Lululemon (D guarda el BPA esperado de los dos últimos trimestres) y que A derive el EBITDA trimestral de EBIT más amortizaciones del 10-Q.
6. **La cartera de I+D no tiene sitio en el motor.**
   - Fallo: Zoetis no publica fases ni fechas; sin rNPV, la cartera solo cabe en el escenario alcista (18,31 USD por acción entre base y alcista).
   - Arreglo: `dcf.cartera: [{producto, ventas_pico, probabilidad, anio_lanzamiento}]` con un rNPV simple que el motor sume al puente, o al menos que la síntesis de valoración muestre el alcista menos el base como «opción de la cartera».
7. **Pausas externas sin estado.**
   - Fallo: la sesión se paró dos veces (regla de rutas y límite de uso); las notas sobrevivieron porque estaban en disco, pero los subagentes A y B casi no.
   - Arreglo: el punto 1 y un `estado.json` en la carpeta del informe con la fase en curso, para retomar sin reconstruir.
- Fin: 2026-10-08 08:34.

## Actualización v2 (13 oct 2026): sostenibilidad del crecimiento

Sin investigación nueva. Script: `notas/actualizacion-v2.mjs` (parte de `datos.json`), salida `datos-v2.json`, `Zoetis - 2026-10-07 v2.docx` y `.pdf`. Mismo precio (71,33 USD, cierre del 6-oct) y misma fecha de corte. Sin cambios en los supuestos del DCF.

| | v1 | v2 |
|---|---|---|
| Recomendación · convicción | Comprar · Media | Comprar · Media (los criterios sugieren Alta) |
| Valor objetivo (WACC 8,53 %) | 91,77 USD, RTE 31,6 % | 91,77 USD, RTE 31,6 % |
| Con la prima del mercado (4,20 %, WACC 8,00 %) | 101,61 USD, RTE 45,4 % | 101,61 USD, RTE 45,4 % |
| Comprar por debajo / vender por encima | 90,12 / 108,20 | 89,38 / 108,20 |
| Sostenibilidad del crecimiento | — | **Sí** (2,8 % anual proyectado; cuota del 23,6 % al 23,7 % en 2035e; reinversión neta del 4 % del NOPAT) |

- **Puente de ingresos 2026e-2030e** (reparto entre volumen y precio, estimación propia): 2026e −1,5 volumen / −0,5 precio / −0,6 otros (guía orgánica de −3 % a −1 % y descuentos «del bruto al neto»); 2027e +0,5 / +1,5 / +0,5; 2028e-2029e +1,5 / +2 / +0,5; 2030e +2 / +1 / +0,5 (vence Apoquel). Precio de 1-2 % anual, la mitad de lo que Zoetis subía hasta 2025, porque el poder de precios se agrieta en 2026.
- **Mercado final**: 52.419 M USD en 2035e, la serie de IMARC (45.881 M en 2030e) prolongada al +2,7 %; es el mismo perímetro de la cuota del 23,6 % (9.467 / 40.100). IMARC infravalora las mascotas: la cuota implícita es un techo.
- **Veredicto Sí**: la proyección pide poco (menos de la mitad del 7,6 % de 2016-2025, cerca del mercado y sin ganar cuota). El motor la trata como de activos ligeros (sin crecimiento financiable calculable), así que la prueba es precio y cuota, y las dos pasan. Volver al 7-8 % no lo sostiene la calidad actual: es el alcista.
- **Convicción**: el control nuevo sugiere Alta; se mantiene Media, ya explicada en la síntesis (la discrepancia con el mercado es si 2026 es un escalón o una pendiente; depende del 3T26 y de la guía de 2027).
- **Textos**: frase del veredicto en «El negocio» y nivel de compra (89,38, que el motor del 10-oct recalcula con la regla combinada). Para no pasar de 650 palabras se quitaron de la síntesis los nombres de los rivales y la fecha del cierre (siguen en el cuerpo). Cobertura del Word: 88,2 % (v1 daba 91,5 % con la plantilla de entonces y da 85,3 % con la de hoy, que añade campos como «sentimiento»; la sostenibilidad la sube).

**Fallos del sistema vistos**
1. El motor no dice que la cuota final depende de cómo se prolonga el mercado más allá de la serie del sector (aquí la serie acaba en 2030e y la proyección en 2035e): cada analista lo extrapola a mano. Arreglo: que `calcular-empresa.mjs` prolongue `sector.serie` con `tcac_previsto_pct` si `mercado_final.periodo` es posterior, y lo diga.
2. Con una reinversión neta del 4 % del NOPAT, el motor da `crecimiento_financiable_pct` nulo y la etiqueta de «activos ligeros» a una farmacéutica veterinaria con un capex del 5,9 % de las ventas; la etiqueta confunde. Arreglo: llamar a la rama «reinversión neta baja» y dar igualmente ROIC × tasa de reinversión (1,2 % aquí) como referencia.
3. El nivel de compra cambió (90,12 → 89,38) solo por la versión del motor, sin aviso: la síntesis quedaba con una cifra vieja. Arreglo: un control que busque en la síntesis los niveles de `calc.recomendacion` y avise si no aparecen.
- 13-oct-2026: revisión v2 a 12 meses (PER propio × BPA propio): objetivo 89,89 USD, rentabilidad +28,9 %, señal Comprar (`revision-12m-2026-10-13.md`).
- 14-oct-2026: objetivo a 12 meses con la regla de múltiplos común (`valoracion.objetivo_12m`): ponderada +18,3 % → +5,6 %, base +6,5 %, señal Mantener (`revision-12m-2026-10-13.md`).
