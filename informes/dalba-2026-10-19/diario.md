# Diario · d'Alba Global Co., Ltd. (483650.KS) · 19-oct-2026

- Commit de partida: d210e19 («Análisis value de la cola de índices, pareja 1: Applied Nutrition y Dixon (ninguna compra robusta)»). Checkout compartido con otro análisis en paralelo (Norwegian Air): sin `git pull`, `commit`, `push`, `checkout` ni `stash`. Solo se escribió en esta carpeta, en `verticales/empresa/simbolos.json` (entrada 483650) y en lo que escriben `precios.mjs 483650` (`precios.json`) y `apuntar-12m.mjs dalba-2026-10-19` (`objetivo12m-revisados.json`). No se tocaron `cola.md`, `MEMORIA.md`, `METODO-VIGENTE.md`, `lecciones*.md` ni `seguimiento.xlsx`; no se ejecutaron `seguimiento.mjs`, `cobertura.mjs`, `regenerar.mjs` ni nada con `--todas`.
- Incidencias: (1) a mitad de la sesión la carpeta desapareció unos segundos por un `git stash` del coordinador; se comprobó que seguían `_commit.txt`, `bolsa.json` y `docs/` y se volvió a ejecutar `bolsa.mjs`. (2) `simbolos.json`: un primer intento de añadir la entrada con un JSON.parse/stringify reordenó todo el archivo; se rehízo en el momento con inserción de texto sobre la versión de HEAD más las dos entradas nuevas (la NAS del otro análisis, con su contenido idéntico, y la 483650): el diff final es de 15 líneas añadidas al final de `empresas` y el contenido de las 279 entradas es el mismo que antes de la edición. El otro análisis debe saber que su entrada NAS ha quedado al final del bloque.
- Tiempos (UTC): inicio ≈ 12:55; investigación hasta ≈ 13:15 (con una compactación del contexto por medio); notas A-E, cálculo, Word y PDF ≈ 13:34; revisión a 12 meses, símbolos, precios y robustez ≈ 13:37.
- Encargo: análisis value completo desde cero; valorar la dependencia de Amazon y Olive Young, la moda de la cosmética coreana y la competencia; regla de historia corta del selector; revisar expresamente fin de bloqueos de la salida a bolsa y colocaciones (regla 13).
- Sin subagentes: las fases A-E las hice yo (`notas/construir-notas.mjs` escribe A-E.json); parte propia en `propio.mjs` + `supuestos.mjs` + `textos.mjs` + `resumen.mjs` (patrón de CLASSYS).

## Pasos y fecha de los datos

| Paso | Herramienta / fuente | Fecha del dato |
|---|---|---|
| Precio, beta, rentabilidades, cierres de ejercicio | `bolsa.mjs --accion 483650.KS --indice ^KS11 --sector 228790.KS --corte 2026-10-19` | cierre 19-oct-2026 |
| Precio común | `precios.mjs 483650` | cierre 19-oct-2026 (169.600 KRW) |
| Movimiento (regla 13) | `movimiento.mjs 483650.KS` | 19-oct-2026 |
| Cuentas 2023-2025 (y 2022 comparativo) | DART: informe anual 2025 (rcp 20260407001978 y 20260323000282), informe de auditoría 2023 reemitido (20241210000517), folleto de la salida a bolsa (20250508000654) | 2024-12-10 a 2026-04-07 |
| Semestre 2026 y balance de 30-jun-2026 | DART: informe semestral (20260814001262) | 2026-08-14 |
| Trimestres 1T24-2T26, canales, regiones, tiendas | Web de IR: informes de negocio 1Q-3Q25, IR Books 2Q25-2Q26, presentaciones 4Q25-2Q26 | 2025-10 a 2026-08-18 |
| Dividendos, bloqueos, recompras, junta, Kuoca, plan de valor, accionistas | DART: avisos sueltos (2025-05 a 2026-10-16) | hasta 2026-10-16 |
| Consenso y objetivos | FnGuide/WiseReport (media de 3 meses, 18 casas) | 2026-10-16 |
| Guía del 3T26 y anual | Quartr (resumen de la conferencia del 2T26) | 2026-08-14 |
| Bono coreano a 10 años | FRED IRLTLT01KRM156N | septiembre de 2026 |
| Prima de mercado | Damodaran ERPbymonth | octubre de 2026 |
| Comparables | Yahoo quoteSummary (11 fichas) y USDKRW/JPYKRW | 2026-10-19 |
| Mercado final | Ficha sectorial `sectores/higiene-cosmetica-2026-10-14.md` (L'Oréal) | 2026-10-14 |
| Sector coreano | Cosmorning (exportaciones de 2025, MFDS) | 2026-01-10 |
| Transacciones | Etoday y News Tomato (COSRX), Hankyung (Dr.Jart, Dr.G) | 2023-10 a 2026-06-23 |
| Foro | Naver 종목토론실, 400 mensajes | 18-sep a 19-oct-2026 |
| Integración y cálculo | `motor/integrar.mjs`, `motor/calcular-empresa.mjs` | 19-oct-2026 |
| Word y PDF | `motor/rellenar.mjs`, LibreOffice | 19-oct-2026 |
| Objetivo a 12 m | `apuntar-12m.mjs dalba-2026-10-19` | 19-oct-2026 |
| Robustez | `robustez.mjs informes/dalba-2026-10-19 --actual` | 19-oct-2026 |

## Decisiones

- **DART sí responde** desde la nube por el visor de secciones (`dsaf001/main.do` + `report/viewer.do`; scripts en el scratchpad): se usó como fuente primaria, al contrario de lo que decía el encargo. FnGuide (comp.fnguide.com) da error; WiseReport sirve el consenso.
- `meta.divisa` y `divisa_cotizacion` KRW, tipo de cambio 1, millones de KRW. Acciones para el valor por acción: 12,8 M diluidas (control de capitalización explicado; con 12,41 M el DCF daría ≈ 177.900).
- **2026e fijo**: +41,4 % de ventas (735.000 M: 1S real 358.103 M y 2S de 377.000 M con la guía del 3T26 de 170.000 M), margen EBITDA 22 % (2S con margen operativo del 17,6 %). Después 24 / 16 / 11 / 8 / 6 / 5 / 4 %; margen 22 % bajando al 20 %: no damos el 25 % de margen operativo de la empresa porque la rivalidad entre marcas coreanas se gana con marketing.
- WACC 11,45 % (bono 4,45 %, beta 1,0 en vez de la medida 0,32 con año y medio de historia, prima 5,5 % + 1,5 por historia corta, producto estrella, moda coreana y Rusia; sin deuda); g 3,0 %. Pesos DCF 50 / comparables 20 / escenarios 30. Escenarios 25/50/25: bajista −8 pp de crecimiento y −6 pp de margen (la moda se apaga, como VT o Dr.Jart); alcista +3 / +2.
- Puente a 30-jun-2026: sin deuda, arrendamientos 4.334, caja 201.724 (efectivo + otros activos financieros a corto), pensiones 1.190 después de impuestos, Kuoca Skin 9.600 como asociada y otros ajustes −5.952 (activos financieros a largo +3.648 − pago de Kuoca tras el cierre).
- BPA propio: resultado financiero +8.000 M, impuesto 24 %. 2028e: 9.075 / 14.145 / 16.167 KRW (consenso 17.428).
- Historia del PER: un año (salida a bolsa el 22-may-2025). `per_historico.anios: 1` con v2 al lado: el selector de historia corta elige la más baja (v3).
- Regla 13: veredicto **no cambia**. Bloqueos de la salida a bolsa todos vencidos (último el 22-may-2026); el del fundador hasta mayo de 2028; venta del fundador ya hecha y por impuestos; sin colocaciones; resultados el 12-nov (no aplazan).
- La recomendación del informe sigue a la regla (Comprar, por la mínima) con convicción baja; la acción robusta la da `robustez.mjs`.

## Resultado

- Recomendación de la regla **Comprar**, convicción baja. v3 15,9 % (informe 15,8 %) / base 21,7 %; v2 18,5 % / 17,5 %; BPA −10 % 4,4 % / 9,7 %. Objetivo 193.811 KRW; valor intrínseco 177.950 KRW (+4,9 %); DCF 172.463 KRW.
- **Acción robusta: Mantener en cartera** (marca B1; M2 por historia de un año). Límite robusto común **154.104,54 KRW**; límite de compra con objetivo fijo 170.890,64 KRW.
- ROIC 2025 123,8 % − WACC 11,45 % = 112,4 puntos; sostenibilidad Sí.
- Controles: 19 de 25 correctos y 6 explicados (tipos impositivos de 2023 y 2024, perímetro de 2023, caja proyectada, crecimiento del BPA desde 2025, capitalización con acciones diluidas). Cobertura de campos 87,1 %; gobierno por debajo del 60 % (votos de la junta no encontrados).
- Huecos: cuentas de 2021, BPA trimestral de 4T24-2T25, capex del 1S26, calificaciones ESG, posición corta, múltiplos de Dr.G y Goodai.
