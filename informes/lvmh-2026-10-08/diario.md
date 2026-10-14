# Diario - LVMH (corte 2026-10-08)

- Inicio: 2026-10-08 22:21 (hora local). Commit de partida: 88bcc20 Informe de Novo Nordisk (Comprar, convicción media).
- Prompt: verticales/empresa/prompt.md en esa versión; no se cambia durante el análisis.

## Fase 1 - Identificación
- LVMH Moët Hennessy Louis Vuitton SE; Euronext París, MC (Yahoo MC.PA); ISIN FR0000121014; EUR; cierre 31-dic; NIIF-UE; cuenta por función.
- Documentos descargados en notas/docs (22:25): URD 2025 (493 p.), informe semestral 1S26 (61 p.), presentación 1S26, folleto EMTN 2026 (rating Aa3/AA-, estables, según la web de deuda), estados financieros 2025.
- Calendario: la web no publica el próximo evento en HTML estático; se encarga a D confirmar la fecha de las ventas del 3T26 (habitualmente mediados de octubre).
- 22:24 lanzados los subagentes A-D.

## Tiempos
- 22:21 inicio y fase 1 (documentos de lvmh.com bajados con descargar.mjs; sin navegador).
- 22:25 lanzados A-D. Notas con contenido real a los 6-10 minutos (D 22:34, B 22:35, A 22:37, C 22:38).
- D terminó en ~9 min sin transacciones con múltiplo; se le reanudó para documentarlas (4 con múltiplo, de notas oficiales y 8-K) y escribir los comentarios pendientes.
- B ~11 min, A ~13 min, C ~13 min. Ninguno se cortó.
- Integración, supuestos por grupo de negocio (supuestos.mjs), suma de partes, textos (textos.mjs), dos pasadas de cálculo, Word y PDF. Revisión visual de las páginas 1-4.
- (El reloj del shell avanzó de forma irregular durante la sesión; los tiempos son orientativos.)

## Decisiones
- Precio: cierre del 8-oct-26, 380,90 EUR (Yahoo con --incluir-hoy). Acciones diluidas 493,47 M.
- Tasa libre: Bund 3,57 % (Bundesbank, 8-oct). Beta 1,25: ajustada mensual 5 años frente al Stoxx Europe 600 (CAC 40 1,40 y Euro Stoxx 50 1,28 inflados por el peso de LVMH; ETF de lujo 0,98-1,14, también sesgados). Prima 5,5 %; regla relativa con 4,20 % (Damodaran, columna «sustainable payout»).
- NIIF 16: arrendamientos (16.261 M) en la deuda; capex del DCF = inversiones operativas + altas de derechos de uso (≈ 9,4-10 % de ventas); amortización con derechos de uso (8,2-8,5 %).
- Compromiso de compra del 34 % de Diageo en Moët Hennessy (6.416 M) en otros_ajustes; el 34 % ya está fuera de los minoritarios contables.
- Otros gastos operativos (656 M en 2025; 619 M LTM) en no_recurrentes_en_ebitda; en el DCF se restan 0,2 % de ventas por reestructuración en caja.
- Consenso EBITDA: NIIF 16 y misma definición que la nuestra en 2026e-2028e (EBITDA − EBIT = 8,5 % de ventas); la cifra histórica de 2025 del proveedor suma dotaciones a provisiones.
- Sin etapa 2: ROIC 12,7 % frente a WACC 9,25 % (diferencial < 5 puntos).
- Suma de partes por grupo con EV/EBIT de los comparables y 10 % de descuento de conglomerado.
- Pesos: DCF 40, suma de partes 25, escenarios 20, comparables 15, transacciones 0.
- Resultado: valor objetivo 410,00 EUR (+7,6 %; total +11,1 %; asimetría 0,78). Regla absoluta Mantener, relativa Comprar (478,01 EUR; +28,9 %). Recomendación Comprar con convicción Baja (cifras ≈ consenso; la diferencia es la tasa de descuento).

## Fallos del sistema
1. **Calendario de lvmh.com**: la página es Next.js y no lleva las fechas en el HTML; D no encontró la fecha de las ventas del 3T26 y MarketScreener daba un domingo. Se resolvió con la API pública del gestor de contenidos (lvmh-com.cdn.prismic.io/api/v2, documento «event» 2026-q3-revenue: 12-oct-2026). Arreglo: añadirlo a lecciones.md (webs Next.js/Prismic: consultar su API de contenidos).
2. **_parches no alcanza meta.huecos**: integrar reconstruye meta.huecos después de aplicar los parches, así que para quitar «subagente» de los intentos hubo que editar A.json. Arreglo: aplicar los parches después de reconstruir huecos o aceptar huecos_editados en propio.
3. **Plantilla de propio.mjs**: con «...T.secciones» seguido de claves explícitas «catalizadores: T.catalizadores ?? null», las secciones escritas en textos se pisaban con null sin aviso (las perdí en la primera pasada). Arreglo: que integrar avise cuando propio trae una sección núcleo a null y textos/notas no la tienen, o una plantilla de propio sin claves duplicadas.
4. **Definición del EBITDA de MarketScreener**: el histórico de 2025 (25.756 M) incluye dotaciones a provisiones y no coincide con el de las cuentas (24.278 M), mientras el previsto sí. D lo dio por bueno «al millón». Arreglo: lección: comparar EBITDA − EBIT del consenso con las amortizaciones de las cuentas, no el EBITDA histórico del proveedor.
5. **Deuda neta de los comparables**: MarketScreener incluye arrendamientos en unas (LVMH, Prada, Cucinelli) y no en otras (Hermès, Moncler, Richemont); el EV/EBITDA de las de caja neta sale bajo. Arreglo: para lujo/retail, usar EV/EBIT en la suma de partes (hecho) y avisar en lecciones.
6. **Búsquedas web agotadas pronto**: D se quedó sin transacciones con múltiplo en la primera vuelta. Arreglo: que D empiece por las salas de prensa y los 8-K de EDGAR (Belmond, Capri, Tom Ford salieron de ahí) antes de buscar.
7. **Posición corta (Francia)**: el conjunto de datos de la AMF en data.gouv.fr (CSV de ventas a descubierto) funciona sin navegador; ninguna posición sobre LVMH ≥ 0,5 %. Arreglo: lección para emisores franceses.
8. **Rótulos que no cuadran con el precio**: el texto «compraríamos por debajo de X» quedaba absurdo con X por encima del precio. Arreglo en la plantilla de síntesis: redactar con los niveles del motor como «compra por debajo de X» sin «más convicción».

## Huecos que quedan
- Núcleo: segunda fuente independiente del tamaño del mercado (estimación propia); desglose comprar/mantener/vender y segunda fuente de estimaciones del consenso; votos exactos del grupo familiar por junta (estimación).
- Complemento: transcripciones y preguntas de analistas; vs_consenso por semestre; MSCI ESG; Kering-Valentino; Diageo, Estée Lauder, Rémy y Ulta como comparables; ROIC de comparables; participaciones individuales de cuatro directivos; historial de objetivos 2021-2024 (LVMH no da guía numérica).

## Actualización v2 (13 oct 2026): sostenibilidad del crecimiento

Sin investigación nueva. Script: `notas/actualizacion-v2.mjs` (parte de `datos.json`), salida `datos-v2.json`, `LVMH - 2026-10-08 v2.docx` y su PDF. Mismo precio (380,90 EUR) y fecha de corte; supuestos del DCF sin cambios.

| | v1 | v2 |
|---|---|---|
| Recomendación · convicción | Comprar · Baja | Comprar · Baja |
| Valor objetivo (WACC 9,25 %) | 410,00 EUR, +7,6 %, RTE +11,1 % | 410,00 EUR, +7,6 %, RTE +11,1 % |
| Con la prima del mercado (4,20 %, WACC 7,88 %) | 478,01 EUR, RTE +28,9 % | 478,01 EUR, RTE +28,9 % |
| Comprar por debajo / vender por encima | 422,71 / 530,95 EUR | **402,62** / 530,95 EUR |
| Sostenibilidad del crecimiento | (no existía) | **Sí** (3,5 % anual proyectado; reinversión neta del 12 % del NOPAT) |

- **Puente 2026e-2030e** (estimación propia del reparto; LVMH no publica volumen frente a precio): 2026e 0 volumen + 2,5 precio − 5,4 otros (divisa ≈ −4, salida de DFS ≈ −1,5) = −2,9 %; 2027e 1,5 + 2,2 − 0,5 = 3,2 %; 2028e-2029e 3 + 2,5 = 5,5 %; 2030e 2,6 + 2,5 = 5,1 %. Cuadra con el DCF.
- **Mercado final en null**: `competencia.cuota_pct` (15,8 %) solo cubre Moda, Relojería y Perfumes (56.430 M de 80.807 M) y el motor divide las ventas totales. Prueba a mano: esos grupos suman 81.666 M en 2035e frente a ≈ 572.000 M de lujo personal (369.000 M en 2026e al 5 % anual): 14,3 % (15,5 % con el mercado al 4 %). El base pierde algo de cuota.
- **Reinversión**: 12 % del NOPAT (capex con altas de derechos de uso del 9,7 % de las ventas frente a una amortización del 8,2-8,5 %): el motor lo trata como activos ligeros y no calcula el crecimiento financiable; el ROIC incremental histórico es negativo (−3,4 %, 2021-2025), así que la prueba que vale es precio y cuota. Ninguna prueba pide más de lo que la empresa puede dar: no se tocan supuestos.
- **Lo único que cambia en cifras es el nivel de compra** (422,71 → 402,62 EUR), y no por el veredicto: el motor del 10-oct exige, cuando solo la regla relativa da Comprar, una rentabilidad total del 5 % con nuestro WACC (la absoluta da +11,1 %, así que la recomendación no cambia). Se corrigió en la síntesis y en `cambiaria_recomendacion`.

**Fallos del sistema vistos**
1. La tabla «La decisión» dice «sin inversión neta» siempre que el negocio se clasifica como de activos ligeros (< 15 % del NOPAT), aunque aquí haya 20.511 M de reinversión neta. Arreglo: «reinversión baja (12 % del NOPAT)».
2. La cuota implícita divide las ventas totales del grupo; en conglomerados con cuota de un subconjunto de segmentos haría falta un campo `ingresos_perimetro_pct` (o mercado_final por segmentos) para no dejarla en null.
3. El cambio de la regla combinada del 10-oct mueve los niveles de los informes anteriores sin tocar datos; un informe regenerado con el motor nuevo contradice su síntesis si no se reescribe (aquí, 422,71 frente a 402,62).
- 13-oct-2026: revisión v2 a 12 meses (PER propio × BPA propio): objetivo 497,6 EUR, rentabilidad 34,0 %, señal Comprar (`revision-12m-2026-10-13.md`).
- 14-oct-2026: objetivo a 12 meses con la regla de múltiplos común (`valoracion.objetivo_12m`): ponderada +29,0 % → +17,7 %, base +14,0 %, señal Comprar (`revision-12m-2026-10-13.md`).

- 2026-10-14: datos-v3.json = regla de múltiplos v3 con la historia del PER adelantada construida por herramientas/historia-adelantada.mjs (5 años; mediana 25.9x, mínimo 21.4x, media larga 25.6x; antes v2 25.3x/24.2x/24.6x). Solo cambian el objetivo a 12 meses y la señal; el Word no se regenera.
