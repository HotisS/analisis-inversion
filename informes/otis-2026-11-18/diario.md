# Diario: Otis Worldwide (OTIS), análisis value del 18-nov-2026 (iteración tras el 3T26)

- Commit de partida: `254cbac` («Nvidia 18-nov: análisis value tras los resultados del 3T FY27»). Checkout compartido con otros nueve análisis de la tanda del 18-nov: sin pull, commit ni push desde este hilo; `apuntar-12m.mjs` y `robustez.mjs` con `flock /tmp/tanda-1118.lock`.
- Motivo: el 3T26 salió el 28-oct, una semana después del informe del 21-oct, y la acción subió a 77,01 USD, un 3,5 % por encima del límite B1 de entonces (74,32). Encargo: revisar además que el capital invertido esté bien medido (ROIC − WACC de 121,9 puntos en el informe anterior).
- Análisis completo sin subagentes: notas A-E rehechas con `notas/construir-notas.mjs` (estructura del informe anterior, cada cifra de periodo comprobada de nuevo con el 8-K y el 10-Q del 3T26, la transcripción, Yahoo del 18-nov, Tesoro del 17-nov, NBS de enero-octubre, Form 4 hasta el 18-nov, Stocktwits y Seeking Alpha). Lo que no cambia con el trimestre (historia, consejo, remuneración, transacciones, sector a largo plazo) se mantiene de las notas del 21-oct, que citan sus documentos primarios.

## Horas (Madrid)

| Hora | Paso |
|---|---|
| 12:21 | Inicio: lectura del encargo, del procedimiento, del prompt, de las lecciones (núcleo, EE. UU., casos de patrimonio negativo) y de `METODO-VIGENTE.md` §2 y §4 |
| 12:24 | `cuentas.mjs --sec OTIS`, `bolsa.mjs` (cierre del 17-nov), `movimiento.mjs OTIS`, `noticias.mjs --meses 12`, `form4.mjs`, Yahoo quoteSummary de Otis y comparables |
| 12:25 | Descarga y lectura: 8-K del 3T26 (exhibit 99), 10-Q del 3T26, 8-K y hoja de condiciones del bono de 2036, transcripción del 3T26 (q4cdn) |
| 12:29 | Notas A-E reescritas e integradas (mediana PER comparables 20,5x) |
| 12:31 | Supuestos, `propio.mjs`, primer cálculo: Mantener (valor intrínseco 75,45 < precio 77,01) |
| 12:33 | `apuntar-12m --precios` y `robustez --actual` previos para los límites; textos reescritos |
| 12:35 | Integración, cálculo (20 de 20 controles), Word y PDF; `revision-12m-2026-11-18.md` |
| 12:36 | `apuntar-12m --precios` y `robustez --actual` finales (con lock); `comprobar.mjs` sin ERROR de esta carpeta |

(El reloj del sistema da esos tiempos; el trabajo fue continuo.)

## Fecha de los datos

| Paso | Herramienta o fuente | Fecha del dato |
|---|---|---|
| Cuentas anuales 2019-2025 | `cuentas.mjs --sec OTIS` (XBRL de la SEC), comprobado con los 10-K | 10-K 2025 |
| Último trimestre | 8-K del 3T26 (28-oct) y 10-Q del 3T26 (29-oct): LTM a 30-sep-2026, puente a 30-sep-2026 | 30-sep-2026 |
| Conferencia | Transcripción corregida del 3T26 (FactSet CallStreet, web de inversores) | 28-oct-2026 |
| Precio y bolsa | `bolsa.mjs` y `movimiento.mjs` (Yahoo) | cierre del 17-nov-2026 (77,01 USD); la sesión del 18-nov no había abierto |
| Consenso y comparables | Yahoo quoteSummary (`notas/yahoo-datos.mjs`) | 18-nov-2026 (cierres del 17-nov en EE. UU.) |
| Tasa libre | Tesoro de EE. UU., CSV diario | 17-nov-2026 (5,10 %) |
| Prima implícita | Damodaran ERPbymonth (la misma cifra que usan los informes de la tanda) | nov-2026 (4,41 %) |
| China | NBS, enero-octubre de 2026 | 16-nov-2026 |
| Directivos | `form4.mjs` | 18-nov-2025 a 18-nov-2026 |
| Noticias | `noticias.mjs --meses 12 --valores otis`, EDGAR (submissions) | hasta el 18-nov-2026 |
| Sentimiento | Stocktwits (API), Seeking Alpha (RSS) | 30-sep a 16-nov-2026 |

## Decisiones

1. **Capital invertido (lo que pedía el encargo).** El ROIC del motor (130 % en 2025) mide el capital por el pasivo: patrimonio + deuda − caja = 1.514 M en 2025 y 2.145 M a 30-sep-2026 (la «net capitalization» del propio 10-Q). Es pequeño porque el patrimonio es negativo (separación de UTC y 5.000 M de recompras) y porque pasivos sin coste (gastos devengados, impuestos, pensiones) financian activo. Mal medido para la calidad: el motor no da `roic_operativo` porque el capital por el pasivo es positivo (solo lo da con capital ≤ 0). ROIC operativo a mano: 59 % en 2025 (1.797 ÷ 3.028) y **54 % en los últimos 12 meses** (1.780 ÷ 3.277 de capital operativo medio, con WeMaintain y más cobros) → **ROIC − WACC ≈ +46 puntos** (no 121,7). `robustez.mjs` sigue leyendo 121,7 del motor; la conclusión de calidad (≥ 5) no cambia. Explicado en `controles_explicados`, sección 10 y síntesis.
2. **BPA ajustado en historia y escenarios** (`base_bpa: "ajustado"` en los dos). 2026e calibrado con nueve meses + 4T: ventas +5,7 % (15.254 M), margen EBITDA del DCF 16,5 % → 4,04 USD (guía 4,01-4,05, consenso 4,07).
3. **Intereses**: 265 M en 2026 (196 en nueve meses) y 285 M desde 2027 por la refinanciación (bono de 2036 al 5,825 % sustituye al de abril de 2027 al 2,293 %; el de euros al 2,875 % vence en 2027). Estimación propia. Minoritarios ajustados 47 M (35 en nueve meses). Acciones 381,9 M (diluidas del 3T26; 380,7 M en circulación el 15-oct).
4. **2027e margen 17,2 %** (17,3 % en octubre) porque la dirección dijo que el margen de servicio «crecerá, pero no a los niveles de antes». Resto de la proyección igual. BPA 2027e 4,43 (consenso 4,48) y 2028e base 4,83 (igual que en octubre: el margen menor y los intereses mayores se compensan con más ventas en 2026).
5. **WACC 8,38 %** (8,25 %): tasa libre 5,10 % (17-nov), beta 0,90 (mensual 5 años ajustada; sin ajustar 0,85), coste de la deuda del 5,4 % (antes 5,0 %: la emisión de noviembre pagó un 5,825 % a 10 años), peso de la deuda 22,0 %.
6. **Puente a 30-sep-2026**: deuda 8.275, caja 866, minoritarios 705 (47 × 15), pensiones 213, financiación de proveedores a 240 días 89.
7. **Comparables rehechos** con el consenso posterior a sus resultados (Yahoo 18-nov), pesos de los próximos 12 meses 1,4/12 y 10,6/12, anualización a 14,6 meses: mediana 20,5x (19,6x en octubre).
8. **Regla 13: «no cambia».** La subida del 22,4 % en un mes (2-oct a 2-nov) tiene causa: 3T26 mejor de lo esperado y guía mantenida; ningún día de ±5 % (el +4,5 % del 22-oct queda sin noticia propia: hueco). Bono de noviembre = refinanciación. Ventas de directivos en noviembre pequeñas (0,13 M). Sin sucesor de la consejera delegada anunciado. Próximos resultados ≈ 27-ene-2027 (estimado).

## Qué cambió frente al 21-oct

- Precio 72,07 → 77,01 USD (+6,9 %).
- Valor intrínseco 75,87 → 75,45 USD (DCF 75,80 → 74,51 por el WACC); ahora por debajo del precio (−2,0 %).
- Objetivo ponderado 88,88 → 93,42 USD (aviso M6: el base es el PER de hoy con el tope; elasticidad 0,59). Ponderada 25,7 % → 23,5 %; base 23,0 % → 23,9 %; v2 16,0/12,3 → 16,5/12,6.
- Señal: Comprar (nivel B1, convicción baja) → **Mantener** (convicción media), por el precio y no por el negocio. Límites: A 71,09 → 74,61; B (antes B1) 74,32 → 75,45.
- ROIC − WACC: 121,9 (motor) → 121,7 (motor); el bien medido, ≈ +51 → ≈ +46 puntos.
- **Señal de alarma del informe anterior** («margen de servicio por debajo del 24 % en el 3T26 o guía de 2027 por debajo de 4,30 USD»): **no se cumplió** en su primera mitad (24,2 %, +100 pb en secuencia); la guía de 2027 está pendiente (enero).

## Resultado

- Regla v3 (sin marcas del selector): ponderada +23,5 %, base +23,9 % → Mantener (falla valor intrínseco ≥ precio). v2 de control 16,5 % / 12,6 %. BPA −10 %: 11,4 % / 11,7 %.
- Robustez (`--actual`, 77,01 USD del 17-nov): **sólida**; si la tienes: **Mantener**; compra robusta: no; nivel hoy: ninguno; límites A 74,61 USD y B 75,45 USD; filtro de mantener hasta 86,47 USD; colchón de BPA del 12 % para mantener.
- Sostenibilidad «Sí»; controles 20 de 20; `comprobar.mjs`: sin ERROR de esta carpeta (el único ERROR es de Experian; aviso C10 de `simbolos.json` para OTIS, que corrige el coordinador).

## Lecciones

- **ROIC con patrimonio negativo pero capital por el pasivo positivo y pequeño** (Otis, 18-nov): el motor solo da `roic_operativo` cuando el capital por el pasivo es ≤ 0; con 1.400-2.100 M (patrimonio −5.400 M + deuda 8.300 M − caja) da un ROIC del 130 % y `robustez.mjs` lee ROIC − WACC de 121,7 puntos. Calcular a mano el ROIC sobre el capital operativo del activo (aquí 54 %, +46 puntos) y decirlo; propuesta para el motor: dar también el operativo cuando el capital por el pasivo sea menor que la mitad del operativo.
