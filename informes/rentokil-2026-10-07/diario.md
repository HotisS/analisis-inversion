# Diario: Rentokil Initial (RTO.L), corte 2026-10-07

- Commit de partida: `bbd3d4f Informe de Dassault Systèmes (Comprar, convicción media)`.
- Prompt: `verticales/empresa/prompt.md` de ese commit; no se cambia durante el análisis.

## Tiempos
- 18:17 inicio; lectura del procedimiento, prompt y lecciones.
- 18:20 fase 1: identificación. Cuentas en USD desde el FY2025 (2023-2024 reexpresados en el 20-F de 2025; 2020-2022 solo en GBP). CIK SEC 0000930157 (20-F). Próximos resultados: Q3 Trading Update 22-oct-2026 (calendario financiero de la web). Descargados H1 2026 (resultados, presentación, transcripción), Q1 2026 y la conferencia de Bernstein (9-sep-2026).
- 18:22 lanzados los cuatro subagentes (A cuentas, B sector, C gobierno, D mercado).
- 18:33 C (gobierno) terminó: C.json completo (39 fuentes primarias). Avisa de que la búsqueda web se agotó por el límite de la sesión.
- ~18:35 corte por límite de uso (análisis y subagentes parados). B había terminado (B.json completo); A solo tenía financieros a medias; D solo identificacion.
- 2026-10-08 08:34 reanudación. Mismo corte (2026-10-07, cierre del 6-oct). Reanudados A y D con SendMessage desde sus notas. Correcciones del coordinador: Ambius no se ha vendido; Terminix costó 4.110 M GBP según el 20-F.
- 08:37 A terminó (A.json completo: cuenta 2021-2025, balance, flujos, semestres, calidad, capital, datos de negocio).
- 09:27 D terminó (D.json completo: consenso, bolsa, múltiplos, 7 comparables, 5 transacciones, puente, Damodaran 4,20 %, Tesoro 5,31 %). Tardó ~50 min tras reanudarse.
- 09:28 integración y primeros cálculos.
- 09:28-09:33 supuestos, escenarios, textos y resumen; revisión de comité; Word (57 páginas, 28 gráficos, cobertura 91,8 %) y PDF.
- 09:35 fin. Tiempo efectivo: unos 18 min el 7-oct y unos 60 min el 8-oct (casi 50 de ellos esperando a D).

## Decisiones principales
- Divisa: USD (cuentas), cotización en GBp con tipo 0,013276 USD por penique (1,3276 USD/GBP, cruce BCE del 6-oct). Precio 299 GBp = 3,97 USD; ADR 19,95/5 = 3,99 de contraste.
- Beta 0,91 (STOXX 600, mensual 5 años, ajustada). FTSE 100 0,86 y FTSE All-Share 0,88 ajustadas; se descarta el FTSE 100 por su sesgo a petroleras, mineras y bancos con un 62 % del negocio en Norteamérica. Diferencia en el WACC: 0,1 puntos.
- Tasa libre: Tesoro a 10 años 5,31 % (FRED). WACC 8,74 %. Terminal 2,75 %.
- Partidas «one-off» devueltas al EBITDA en la historia (control explicado) y restadas en el DCF: 2,0 puntos de margen en 2026, 1,8 en 2027, 1,6 en 2028 y 1,5 después. Es la decisión que más separa el DCF del consenso (EBITDA −4,4 % / −5 %).
- Puente: provisión de termitas neta de impuestos (294 M) y dividendo de septiembre (113 M) como deuda; caja neta de SOLitude (180 M) sumada y sus ventas fuera en 2027.
- Etapa de transición: no (ROIC 7,0 % < WACC 8,7 %).
- Suma de partes: no aplica.
- Recomendación: la regla da Comprar (relativa Comprar, absoluta Mantener); se sigue la regla con convicción baja porque la compra sale de la tasa de descuento y el margen frente al nivel de compra (305 GBp) es de un 2 %.

## Revisión de comité (resumen)
1. Tesis: el precio descuenta el caso base a una rentabilidad del 8,6 %; con la prima del mercado rinde un 17,3 %. 2. DCF inverso en el resumen: sí. 3. Supuesto más agresivo: el margen antes de partidas «one-off» subiendo a 22,1 % en 2031 (Rollins 22,7 %). 4. Proyección frente al consenso: −1,1/−1,5 % en ingresos y −4,4/−5 % en EBITDA, explicado. 5. Comparables frágiles (8,9-12,7x): peso 15 %. 6. Calidad: partidas «one-off» recurrentes y provisión de termitas, en el resumen. 7. Gobierno: plan de acciones sin ROIC; Trian con consejero calificado como independiente. 8. Bajista verosímil (repite 2024). 9. Dato crítico: la tasa libre (5,31 %, FRED) y las acciones (2.535 M, junta de mayo y semestral). 10. Sin relleno detectado.

## Fallos del sistema
1. **Corte por límite de uso a mitad de análisis** (7-oct, 18:35): A solo había guardado una sección y D solo la ficha, pese a la orden de guardar cada 10 minutos; D tenía mucho trabajo en %TEMP% sin pasar a D.json. Arreglo: que prompt-de.mjs incluya un recordatorio explícito de escribir la nota antes de empezar el segundo campo, y que el orquestador compruebe el tamaño de las notas a los 10 minutos con un umbral (p. ej. >5 KB) y no solo su existencia.
2. **Búsqueda web agotada a los 15 minutos** por el límite compartido entre análisis paralelos: C se quedó sin prensa (peticiones de Trian sin resolver). Arreglo: reservar las búsquedas web para C (prensa sobre activistas y directivos) y prohibirlas a A y D, que tienen fuentes primarias.
3. **D tardó unos 50 minutos tras reanudarse** (presupuesto de 20-25). Arreglo: partir D en dos (D1 mercado y consenso; D2 comparables y transacciones) cuando hay 7 o más comparables extranjeros.
4. **El LTM no admite partidas «one-off»** en el esquema del prompt, aunque el motor las usa (sinNoRecurrentes se aplica también al LTM): el integrador avisa «clave fuera del esquema». Sin ellas el EV/EBITDA LTM salía 11,9x en vez de 9,5x. Arreglo: añadir no_recurrentes_en_ebitda al bloque ltm del prompt, del ejemplo y de la plantilla.
5. **Control «EBIT + resultado financiero = BAI»** salta todos los años cuando hay partidas «one-off» dentro del EBITDA, porque compara el EBIT normalizado con el BAI publicado. Arreglo: que el control use el EBIT antes de normalizar.
6. **FCF del LTM mal copiado en A.json** (651 en vez de 515: el resumen del propio A decía 515). Corregido en propio. Arreglo: control del motor que compare el FCF LTM con el del último ejercicio ± la diferencia de semestres.
7. **Sin modo para partidas «one-off» recurrentes en el DCF**: hay que bajarlas a mano del margen. Arreglo: un campo dcf.anios[].no_recurrentes_pct_ventas que el motor reste y que el informe muestre.
8. **El comentario de rentabilidad de A era una nota de trabajo** («Datos para el ROIC de 2025 (estimación propia)…»): reescrito. Arreglo: recordar a los subagentes que los comentarios se imprimen y que el ROIC lo calcula el motor.
9. **Texto desfasado en B**: decía que la dirección busca un margen del 20 % en Norteamérica en 2027, objetivo retirado en julio de 2026. Reescrito. Arreglo: pasar a B el último hecho relevante de guía antes de empezar.
