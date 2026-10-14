# Diario: Krones AG (KRN.DE), corte 2026-10-09

- Commit de partida: 2352ae7 (Seguimiento con LVMH, Uber, Cochlear y Wolters Kluwer)
- 09:27 Inicio. Lectura de analiza-empresa.md, prompt.md y lecciones.md.
- 09:33 Fase 1 hecha: AR2025, Q2 2026 y Q1 2026 bajados; 31.593.072 acciones sin autocartera; próximos resultados 2026-11-06; CEO nuevo (Ricker) desde 11-jun-2026. Lanzo A-D.
- 09:41 Control de 10 min: A, C y D con contenido real; B con negocio y fuentes (sector y competencia en curso). C terminado (10 min, 72 llamadas).
- 09:47 A (12 min), B (18 min) y D (17 min) terminados. D: Yahoo no traía la sesión del 8-oct y bolsa.mjs devolvía el 7-oct (104,60); D lo verificó (104,00) y lo rellenó con una precarga en su %TEMP%.
- 10:00 Integración y cálculo: DCF 127,88; objetivo 131,42 (+26,4 %); Comprar por las dos reglas. Textos escritos.
- 10:02 Word (53 páginas, 28 gráficos, cobertura 91,8 %) y PDF generados; Word abre sin reparar. Revisadas como imagen portada, síntesis y «La decisión».

## Resultado
Comprar, convicción media. Precio 104,00 EUR (cierre 8-oct). Objetivo 131,42 EUR (+26,4 %; total 29,1 %; asimetría 2,58). Regla absoluta y relativa: Comprar (relativa 157,08 EUR). DCF 127,88 (WACC 9,08 %, beta 1,10, Bund 3,57 %). DCF inverso: margen EBITDA 9,3 % o ventas −3,6 % anual; rentabilidad implícita 10,7 %.

## Fallos del sistema
1. **bolsa.mjs y la sesión de Xetra del 8-oct**: Yahoo traía la sesión vacía y la herramienta devolvió el cierre del 7-oct (104,60) sin avisar de que faltaba un día hábil. D lo verificó con el «previous close» de Yahoo para el 9-oct y con MarketScreener (104,00) y lo rellenó con una precarga en su %TEMP%. Arreglo propuesto: que bolsa.mjs compare la última sesión con el calendario de días hábiles y avise (o lea el previousClose del endpoint de cotización) cuando falte el día anterior al corte.
2. **bolsa.mjs y el MDAX**: ^MDAXI es índice de rentabilidad total pero la herramienta lo trata como de precio; D usó el ETF EXS3.DE. Arreglo: lista de índices de rendimiento (DAX, MDAX) en la herramienta.
3. **Huecos duplicados entre notas**: A (Complemento) y B (Núcleo) registraron el mismo hueco del peso del servicio con nombres distintos; se quitó el de A a mano. Arreglo: que integrar avise de huecos con la misma sección y campo parecido.
4. **Encargo de formato de cuenta**: el brief decía «por función (verifícalo)» y Krones va por naturaleza; hubo que corregir a A por mensaje. Arreglo: mirar la cuenta del semestral en la fase 1 antes de lanzar los subagentes.
5. **Fuente del puente**: A no encontró los arrendamientos a 30-jun (los dio de diciembre) y D sí, en la tabla de instrumentos financieros del semestral (139,6 M). Arreglo: en lecciones, «en Alemania los arrendamientos del semestral están en la tabla NIIF 7 por categorías».
6. **Criterio de gobierno con cogestión alemana**: los ocho representantes de los trabajadores van como «Otro externo», y el criterio «ningún otro externo con más de 12 años» falla por uno de ellos (Josef Weitzer), lo que no mide independencia frente al control. Arreglo: tipo propio para representantes de los trabajadores o excluirlos de ese criterio.
7. **Comparables de márgenes muy superiores**: la mediana da 192 EUR por acción frente a 104; se pesó un 10 %. El motor no avisa de que la empresa queda fuera del rango de margen de la muestra. Arreglo: aviso si el margen de la empresa queda por debajo del percentil 25 de los comparables.

## Actualización v2 (13 oct 2026): sostenibilidad del crecimiento

Sin investigación nueva. Script: `notas/actualizacion-v2.mjs` (parte de `datos.json`), salida `datos-v2.json`, `Krones - 2026-10-09 v2.docx` y su PDF. Mismo precio (104,00 EUR, cierre 8-oct) y fecha de corte. No se cambia ningún supuesto del DCF.

| | v1 | v2 |
|---|---|---|
| Recomendación · convicción | Comprar · Media | Comprar · Media (los criterios sugieren Alta; explicado en la síntesis) |
| Valor objetivo (WACC 9,08 %) | 131,42 EUR, RTE +29,1 % | 131,42 EUR, RTE +29,1 % |
| Con la prima del mercado (4,20 %, WACC 7,76 %) | 157,08 EUR, RTE +53,7 % | 157,08 EUR, RTE +53,7 % |
| Comprar por debajo / vender por encima | 138,91 / 173,47 EUR | 127,74 / 173,47 EUR |
| Sostenibilidad del crecimiento | (no existía) | **Sí**: 3,1 % anual proyectado; financiable al ROIC actual 3,7 %; capital nuevo al 10,8 % (histórico incremental 31,7 %); reinversión del 21 % del NOPAT |

- **Veredicto Sí**: el caso base crece un 3,1 % anual, en línea con su mercado (maquinaria +3 %, bebidas envasadas +2,6 %, PET +4,8 %) y por debajo de 2022-2025. Las tres pruebas pasan sin control: puente volumen/precio cuadra (2026e-2029e: volumen 2-2,5 %, precio 1,3-1,5 %, divisa −1,5 en 2026e; reparto estimación propia), la reinversión financia más de lo que pedimos y el capital nuevo rinde menos que el histórico.
- **`mercado_final` en null**: la cuota del 25 % es solo del segmento de llenado y envasado (4.774 M de 5.664 M) y el motor la compararía con las ventas del grupo. Cálculo a mano en la justificación: segmento al ritmo del grupo (≈ 6.460 M en 2035e) frente a un mercado de ≈ 19.000 M al +3 % (≈ 25.500 M) = 25,3 %, la cuota de hoy.
- **Umbral de compra 138,91 → 127,74 EUR**: no es opinión, es el motor actual (un Comprar solo relativo exige ahora ≥ 5 % con nuestro coste de capital). Actualizados la síntesis y `cambiaria_recomendacion[0]`.
- **Convicción**: el control nuevo sugiere Alta (dos reglas Comprar, RTE 29,1 %, asimetría 2,58). Se mantiene Media porque es cíclica (−16,1 % en 2020), los pedidos llevan tres años planos y el valor depende de cuánto dure el margen; dicho en la síntesis con qué la subiría o bajaría.

**Fallos del sistema vistos**
1. La prueba de cuota del motor divide las ventas del **grupo** entre el mercado; cuando la cuota publicada es de un segmento (aquí el 84 % de las ventas), no hay forma de indicar el perímetro y hay que dejar `mercado_final` en null y hacerla a mano. Arreglo: un campo opcional `mercado_final.ingresos_pct` (peso del segmento) o `segmento`.
2. Al recalcular un informe viejo con el motor nuevo cambian cifras que no dependen de la actualización (umbral de compra) y aparecen controles nuevos (convicción); el script tiene que buscar a mano qué textos citan las cifras viejas. Arreglo: que el motor liste las cifras de `calc` que cambian frente al `calc` anterior.
3. El primer `soffice --convert-to pdf` con ruta relativa no generó el PDF y no dio error (probablemente otra instancia de LibreOffice abierta en paralelo); con rutas absolutas funcionó.

- 13-oct-2026: revisión v2 a 12 meses (PER propio × BPA propio): objetivo 127,8 EUR, rentabilidad +25,6 %, señal Comprar (`revision-12m-2026-10-13.md`).
- 14-oct-2026: objetivo a 12 meses con la regla de múltiplos común (`valoracion.objetivo_12m`): ponderada +15,2 % → +3,4 %, base +8,9 %, señal Mantener (`revision-12m-2026-10-13.md`).
