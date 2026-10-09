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
