# Diario - Wolters Kluwer (WKL.AS), corte 2026-10-08

- Commit de partida: 29397b4 (Informe de Uber (Mantener, convicción media)).
- Inicio: 22:49 (hora local).
- Regla de carpetas: solo el repo y %TEMP%\analisis-inversion\wolters.

## Fase 1
- Wolters Kluwer N.V., WKL (Euronext Ámsterdam; Yahoo WKL.AS), ISIN NL0000395903, EUR, cierre en diciembre, NIIF-UE. Sede: Alphen aan den Rijn.
- Próximos resultados: 2026-11-04 (actualización de nueve meses), del calendario del inversor. La actualización del 3T 2026 aún no existe.
- La web de inversores (wolterskluwer.com) tiene Cloudflare: curl y descargar.mjs --lista dan 403. Los enlaces se sacaron leyendo las páginas HTML con el navegador integrado; los PDF (assets.contenthub.wolterskluwer.com) bajan bien con descargar.mjs.
- Descargados (22:55-23:00): IA 2021-2025, notas de resultados 1S24-1S26, 1T25, 1T26, 3T24, 3T25, FY24, FY25, presentaciones FY25 y 1S26, teach-in de IA (dic-25), UpToDate (sep-25), junta 2026, pro forma 2024 por traspaso de unidades.
- bolsa.mjs (con --incluir-hoy 1: la sesión del 8 ya cerró): 71,78 EUR; rango 52s 54,64-115,15; beta mensual 5a frente a IAEX.AS 0,54 (semanal 2a 0,74); volatilidad 38,6 %; caída máxima 5a -67,8 %.
- 22:53 lanzados los cuatro subagentes A-D en paralelo.
- 22:56-23:04 mientras trabajan: leídos 1S26, FY25, 1T26, 3T25, teach-in de IA y UpToDate; ERP de Damodaran comprobada en el Excel (oct-26: 4,20 % «T12m with sustainable payout»; 3,70 % es la «T12m» sin ajustar). DCF de tanteo: a WACC 6,6 % sale ~125-130 EUR; el precio (71,78) cuadra con crecimiento del 1 % perpetuo y 3 pp menos de margen, o con el caso base a WACC 8,5 %.
- Avisos enviados: a C, que Caywood es CEO desde feb-2026 (no 2025); a D, ajustes del puente tras el 30-jun (dividendo a cuenta pagado el 24-sep, Marosa 112 M, recompras); a A, ingresos diferidos como pasivos de contrato (si no, el circulante sale positivo).
- 23:04 C terminado (9,5 min, 74 llamadas). Saqué de sus huecos las «notas para la integración» (no era un hueco: se habría impreso en el anexo) y el hueco del registro MAR 19, resuelto por otro registro de la AFM; pasados a notas_integrador.
- 23:06 A terminado (12 min, 91 llamadas): segmentos solo 2024 pro forma y 2025; no recurrentes solo desinversiones (costes de adquisición dentro, por recurrentes).
- 23:07 B terminado (12,5 min, 91 llamadas). Corrige: el ciberataque a CCH fue en mayo de 2019, no 2021. Primer DCF de prueba (beta 0,80 provisional, Bund 3,57 % comprobado en el Bundesbank): base 120,90; bajista 71,85; alcista 155,31; DCF inverso: crecimiento implícito -3,5 % o margen 24 %.
- 23:09 D terminado (13 min, 88 llamadas). Los cuatro subagentes acabaron sin cortes entre 23:04 y 23:09; ninguno necesitó reanudación.

## Integración, cálculo y redacción
- 23:06-23:13 integración (cuatro notas + propio.mjs, supuestos.mjs, textos.mjs). Segmentos de A intactos tras integrar B (6 filas, 2024 pro forma y 2025). C metió notas de trabajo como último elemento de sus huecos: movidas a notas_integrador a mano.
- Consenso: el EBITDA de MarketScreener de 2025 (2.007) es el «Adjusted EBITDA» de la empresa = EBITDA NIIF sin resultados no recurrentes: base «NIIF», sin ajuste. Su EBIT mezcla definiciones (ajustado en previsiones, beneficio antes de impuestos ajustado en 2025) y su BPA es NIIF: no se usa el EBIT del consenso.
- No recurrentes: solo resultados de desinversiones (2025: -231 por FRR; LTM -239). Costes de adquisición (3-25 M/año) y reestructuración (37 M en 2025) dentro del EBITDA, por recurrentes.
- Beta: AEX 0,54 (mensual 5a) / 0,74 (semanal 2a); MSCI Europe 0,36 / 0,44; pares (RELX, LSEG, TR) ajustadas 0,66-0,83, desapalancadas ~0,65 y reapalancadas 0,79. Elegida 0,80: la propia está sesgada por una caída sectorial con el mercado al alza.
- Supuestos: 2026e fijo (+2,5 %, margen 33,1 %), 2027-2030 4,5/4,5/4,0/4,0 % y margen hasta 34,2 %; capex 6,2-6,3 % con altas de derechos de uso; circulante -16 %; etapa 2 de 5 años (ROIC 18,0 % de la empresa con fondo de comercio frente a WACC 6,84 %); terminal 2,0 % (Bund 3,57 %).
- Resultado: DCF 124,42 (sin etapa 2: 119,00); bajista 58,85 (35 %), base 124,42 (45 %), alcista 160,10 (20 %); valor objetivo 113,57 (+58,2 %), rentabilidad total 61,8 %, asimetría 6,83x; regla absoluta y relativa Comprar (relativa: 135,30). DCF inverso: -3,9 % anual de ingresos 2027-2030, margen 23,7 % o rentabilidad implícita 9,6 %.
- Revisión de comité: la diferencia con el mercado está en la tasa (9,6 % implícito frente a 6,84 %), no en las cifras (2-3 % por debajo del consenso en EBITDA): convicción Media, no Alta, con catalizadores con fecha (4-nov-2026, feb-2027). Bajista endurecido (-4 pp crecimiento y margen, +0,5 pp WACC) para que sea verosímil: cae cerca del mínimo de 52 semanas.
- 23:13 Word (58 páginas, 27 gráficos, cobertura 93,1 %) y PDF; revisadas como imagen las páginas 1-4; corregida una frase de la síntesis y regenerados los dos. Fin: 23:14 (25 minutos de reloj; los subagentes trabajaron 9,5-13 minutos cada uno).

## Fallos del sistema
1. **La web de inversores tiene Cloudflare**: `descargar.mjs --lista` y curl dan 403. Se resolvió leyendo los enlaces con el navegador integrado (sin descargar nada con él); los PDF de assets.contenthub.wolterskluwer.com bajan bien. Arreglo: anotar en lecciones.md el dominio de los PDF de Wolters y el método (listar enlaces con el navegador, bajar con descargar.mjs).
2. **Un subagente metió notas de trabajo dentro de `huecos`** (C: «Notas para la integración (no es un hueco)»), que se habrían impreso en el anexo. Arreglo: que prompt-de.mjs diga a todos que lo que no se imprime va en `notas_integrador`, y que integrar.mjs avise de huecos cuyo campo o decisión hable de «integración» o «no es un hueco».
3. **Error en mi encargo**: escribí a C que Caywood era CEO desde 2025 (lo es desde feb-2026). Lo corregí con un mensaje a los 3 minutos. Arreglo: comprobar en el último documento cada hecho que se pasa en el encargo, o no pasarlo.
4. **No recurrentes demasiado amplios**: A metió al principio todos los «non-benchmark items», incluidos los costes de adquisición que se repiten cada año. Arreglo: escribirlo en la parte A del prompt (solo desinversiones, deterioros y partidas de verdad puntuales).
5. **Esperar a los subagentes**: el entorno bloquea `sleep` en primer plano; las comprobaciones de los 10 y 15 minutos se hicieron con Monitor y un bucle `until` por hora. Arreglo: decirlo en el comando (Monitor con `until [ $(date +%H%M) -ge HHMM ]`).
6. **Transacciones escasas**: solo dos operaciones con EV/EBITDA publicado (IHS Markit, Dun & Bradstreet); el mínimo de tres con múltiplo se cumple con un EV/ventas estimado de Marosa. Peso 0. Arreglo: lista de operaciones de información profesional con nota oficial y múltiplo, reutilizable entre análisis.
7. **La comparación del crecimiento implícito con «el previsto para su mercado»** usa el 9,5 % que estima Thomson Reuters para su propio mercado, más amplio que el de Wolters: el motor compara con lo que haya en `sector.tcac_previsto_pct` sin mirar el perímetro. Arreglo: avisar cuando la fuente del TCAC es un competidor.
8. **Serie de tamaño de mercado vacía**: el gráfico de sector sale sin valores (aviso de rellenar). Sin arreglo de código: es un hueco registrado.

## Actualización v2 (13 oct 2026): sostenibilidad del crecimiento

Sin investigación nueva. Script: `notas/actualizacion-v2.mjs` (parte de `datos.json`), salida `datos-v2.json`, `Wolters Kluwer - 2026-10-08 v2.docx` y su PDF. Mismo precio (71,78 EUR) y fecha de corte (8-oct-2026). Sin fuentes nuevas.

| | v1 | v2 |
|---|---|---|
| Recomendación · convicción | Comprar · Media | Comprar · Media (la sugerida por los criterios es Alta; la síntesis ya explica por qué media) |
| Valor objetivo (WACC 6,84 %) | 113,57 EUR, RTE 61,8 % | 113,57 EUR, RTE 61,8 % (sin cambios) |
| Objetivo con la prima del mercado (WACC 6,03 %) | 135,30 EUR, RTE 92,1 % | 135,30 EUR, RTE 92,1 % |
| Niveles | Comprar < 119,82; Vender > 153,32 | **Comprar < 110,62**; Vender > 153,32 |
| Sostenibilidad del crecimiento | — | **Sí** (3,9 % anual proyectado; activos ligeros, reinversión neta del 2 % del NOPAT) |

- **Veredicto Sí**: el base (4,0-4,5 % desde 2027) queda por debajo del orgánico del 5-6 % demostrado cada año de 2021 al 1S26 y del consenso. Puente 2026e-2029e: precio 3 puntos al año (subida anual y paquetes con IA), volumen 1-2 puntos, y en 2026e −2,5 puntos de divisa y venta de FRR. El reparto volumen/precio es estimación propia: la empresa no publica su subida de precios (hueco ya registrado).
- **`mercado_final` = null**: la cuota del 14,4 % es de tres divisiones (T&A, FCC, L&R) sobre el mercado de 31.000 M USD de Thomson Reuters, y el motor dividiría los ingresos de todo el grupo. Prueba a mano en la justificación: esas divisiones crecerían a la mitad que el mercado previsto (8-11 %), así que pierden cuota.
- Sin cambios de supuestos ni de cifras del DCF. Textos cambiados: la frase del veredicto en «El negocio» de la síntesis y el umbral de Mantener (119,82 → 110,62 EUR) en la síntesis y en `cambiaria_recomendacion`.
- El umbral de compra baja porque el motor actual exige que un Comprar solo relativo dé ≥ 5 % con nuestro coste de capital: entre 110,62 y 119,82 la regla relativa daría Comprar pero la absoluta no llega a ese 5 %.

**Fallos del sistema vistos**
1. El motor cambió el umbral de Comprar (119,82 → 110,62) sin que el informe cambiase: una actualización «de método» mueve un nivel de decisión publicado. Arreglo: que el calcular avise cuando un nivel de `calc.recomendacion` cambia frente a la versión anterior del mismo informe, y comprobar los textos que lo citan.
2. La prueba de cuota divide los ingresos de todo el grupo por el mercado: no sirve cuando `competencia.cuota_pct` es de unas divisiones (aquí 3 de 5). Arreglo: admitir en `mercado_final` unos `ingresos_perimetro_pct` (peso de las divisiones en el perímetro) o un campo con los ingresos del perímetro al final.
3. El crecimiento medio proyectado (3,9 %) incluye el año fijo 2026e (+2,5 %, con divisa y desinversión), que rebaja la media frente a lo que de verdad pide la proyección (4,0-4,5 %).
4. La cobertura del Word baja (93,1 % → 89,6 %) por campos nuevos de la plantilla, no por datos: con `datos.json` sin tocar la plantilla actual da 86,6 %.
- 13-oct-2026: revisión v2 a 12 meses (PER propio × BPA propio): objetivo 101,0 EUR, rentabilidad 44,3 %, señal Comprar (`revision-12m-2026-10-13.md`).
