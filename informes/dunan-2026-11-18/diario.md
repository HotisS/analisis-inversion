# Diario · Zhejiang DunAn Artificial Environment (002011.SZ) · 18-nov-2026

- Commit de partida: **254cbac** («Nvidia 18-nov: análisis value tras los resultados del 3T FY27»). Tanda de 10 informes en paralelo sobre un checkout compartido: sin `git pull`, `commit`, `push`, `stash`, `checkout` ni `reset`. Fuera de esta carpeta solo escribieron, con `flock /tmp/tanda-1118.lock`, `apuntar-12m.mjs dunan-2026-11-18 --precios` (`objetivo12m-revisados.json`) y `robustez.mjs` (sin `--escribir`). No se ejecutaron `precios.mjs`, `seguimiento.mjs`, `cobertura.mjs` ni `comprobar.mjs --escribir`; no se tocaron `cola.md`, `MEMORIA.md`, `lecciones*.md` ni `simbolos.json`. Temporales en `/tmp/claude-0/tanda-dunan/`.
- Motivo: el escáner la da como compra posible nivel B (≤ 10,88 CNY, precio 10,80) y el 3T26 salió el 27-oct, después del informe del 19-oct. Sin subagentes: fases A-E hechas por mí, rehaciendo `notas/construir-notas.mjs` (copiado del informe anterior y cambiado dato a dato con el 3T26), `supuestos.mjs`, `propio.mjs`, `textos.mjs` (sobre `textos-anterior.mjs`, que guarda los textos del 19-oct que siguen valiendo: calidad, premortem, gobierno) y `resumen.mjs` reescrito.

## Pasos (hora de Madrid) y fecha de sus datos

| Hora | Paso | Fuente / herramienta | Fecha de los datos |
|---|---|---|---|
| 12:21 | Inicio, lectura del procedimiento, prompt, lecciones (China), METODO §2 y §4 | repo 254cbac | — |
| 12:23 | Precio, beta, rentabilidades, cierres de ejercicio | `bolsa.mjs 002011.SZ` (510300.SS, 159996.SZ) | cierre 18-nov-2026: **10,80 CNY** |
| 12:23 | Movimiento (regla 13) | `movimiento.mjs 002011.SZ --json` | 18-nov-2026 |
| 12:24 | Noticias 12 meses | `noticias.mjs --meses 12 --valores 002011`: 0 de gravedad alta; repaso a mano en CNINFO (19-oct a 18-nov) y prensa de Eastmoney | 18-nov-2026 |
| 12:25 | Resultados del 3T26 y anuncios posteriores | CNINFO: 3T26 (27-oct), amortización de restringidas y opciones (29-oct), oficinas, licencia | 3T26: **27-oct-2026** (balance a 30-sep-2026) |
| 12:25 | Cuentas anuales para la historia recurrente (扣非) | anual 2023 y 2025 de CNINFO | 2024-04-19 y 2026-04-29 |
| 12:26 | Consenso | Eastmoney F10 ProfitForecast (11 casas; 5 posteriores al 3T26); Yahoo (objetivo 14,28) | 18-nov-2026 |
| 12:27 | Bono 10 años 1,5892 %; ERP 4,41 % | ChinaBond (POST czbChartSearch); Damodaran ERPbymonth nov-2026 | 18-nov-2026; nov-2026 |
| 12:27 | Comparables (8) rehechos uno a uno | Yahoo ficha + earningsTrend (script del scratchpad) | 18-nov-2026 |
| 12:28 | Sentimiento | Guba de Eastmoney (13-18 nov) | 18-nov-2026 |
| 12:29 | Notas A-E, supuestos, puente a 30-sep, integración y primer cálculo | `construir-notas.mjs`, `integrar.mjs`, `calcular-empresa.mjs` | — |
| 12:31 | Apuntar 12 m y robustez (primera pasada), textos y resumen | `apuntar-12m.mjs --precios`, `robustez.mjs --actual` | — |
| 12:34 | Word y PDF | `rellenar.mjs`, `soffice` | — |
| 12:35 | Revisión 12 m, apuntar, robustez, comprobar | sin ERROR de esta carpeta | — |

## Decisiones

- **LTM sep-26** = 2025 + 9M26 − 9M25: ventas 14.078 M, EBIT 1.167 M, beneficio 1.037 M, BPA 0,97; EBITDA 1.407 M con la amortización de los 12 meses a junio (el trimestral no la publica). FCF LTM ≈ 752 M (operativo − capex − arrendamientos − intereses).
- **3T26 aislado** (9M − 1S): ventas 3.536 M (+18,1 %), margen bruto 18,9 % (19,3 % en el 3T25), EBIT ≈ 327 M (+19,8 %), beneficio 261 M (+11,9 %), recurrente 250 M (+13,6 %).
- **Puente a 30-sep-2026**: deuda 739,3 (268 corto + 237 que vence en 12 meses + 235 largo), arrendamientos 20,6, caja 3.486,8 (con 3,1 de activos financieros), asociadas 450,1, sin `otros_ajustes` (el dividendo ya se pagó en agosto). Acciones 1.073,98 M.
- **Supuestos**: 2026e +10,5 % (fijo; 4T26 +10 % sobre el 4T25), margen EBITDA 9,9 %, amortización 1,7 %, impuesto 13,9 %; 2027e +7,5 %, 2028e +6,5 %, resto como antes. WACC 8,49 % (bono 1,5892 %, beta 1,05, prima 5,5 + 1,5). Escenarios y pesos como el 19-oct.
- **Cambio de base de BPA a recurrente (扣非)** en la historia del PER y en los casos (`base_bpa: "ajustado"`), por la lección de acciones A (el 19-oct se usó el publicado). Historia adelantada 2022-2025 (2021 fuera: BPA recurrente de 2022 hundido por el saneamiento y prima de control en el cierre de 2021): mediana 14,56x, mínimo 11,50x. Los casos restan 15 M de no recurrentes. Efecto pequeño: el base queda en el tope ×1,1 igual que antes.
- **Dilución (aviso Q2, 4,9 % anual)**: comparación de acciones medias 2025 (1.056,8 M) con 2022 (916,5 M), antes de que contaran las 139,4 M de la ampliación de Gree de dic-2022. Desde 2023, +0,6 % al año por incentivos; en 2026 el capital baja (1.074,68 → 1.073,98 M). Lo explico en `calidad.senales`; no cambia la señal.
- Convicción **Baja** (sugerida Media) por la fragilidad (v2 y BPA −10 % en Mantener).

## Qué cambió frente al informe del 19-oct

- Precio 10,75 → 10,80. Objetivo ponderado 13,18 → 13,20; ponderada 23,5 % → 23,1 %; base 21,2 % → 20,6 %; v2 11,3 % → 11,5 %. Valor intrínseco 16,64 → 17,29 (DCF 15,97 → 16,73, por el 3T y el bono más bajo). BPA base 2028e 1,105 (publicado) → 1,134 (recurrente; en publicado sería ≈ 1,15).
- Hechos nuevos: 3T26 mejor de lo esperado (beneficio +11,9 %, margen bruto 18,9 %), primera cifra de centros de datos (> 700 M en 9M26, el doble), flujo operativo de 9M26 −18,9 % por circulante, capex +62 %, Stock Connect del 0,72 % al 2,33 %, Gree entra en refrigeración líquida citando a DunAn, consenso 2026e al alza (1,00-1,06).
- **Señal de alarma anterior**: «margen bruto trimestral < 16 % dos trimestres seguidos» y «beneficio de 9M26 más de un 10 % por debajo del de 9M25». **No se cumplió**: margen bruto del 3T26 18,9 %; 9M26 −5,3 %.

## Resultado

- **Comprar** (regla v3: ponderada 23,1 %, base 20,6 %; valor intrínseco 17,29 ≥ precio), convicción Baja. v2 de control 11,5 % (Mantener).
- Valor intrínseco 17,29 CNY (+60,1 %); sostenibilidad **Sí** (6,3 % proyectado; 6,9 % financiable); ROIC 26,7 % − WACC 8,49 % = **18,2 puntos**.
- Robustez `--actual`: **FRÁGIL**; si la tienes: **Mantener**; compra robusta: no. **Nivel hoy: B** (A ≤ 10,41; B ≤ 10,88 CNY). Filtro de mantener 12,09. Colchón BPA 7 % (comprar) / 11 % (mantener). Avisos Q2 (dilución, explicada) y M6.
- Regla 13 (`bolsa.contexto`): **no cambia**. Próximos resultados: anual 2026, a más tardar el 30-abr-2027.
- Controles en «Revisar»: tipo impositivo de 2024, DCF inverso sin solución y compra robusta (v2), los tres explicados. Avisos de `rellenar`: suma de partes vacía (no aplica) y gráficos de EV/EBITDA adelantado de comparables (sin dato).
- `comprobar.mjs`: sin ERROR ni AVISO de esta carpeta (los 4 ERROR C1 son de otras carpetas de la tanda pendientes de apuntar).
- Revisión a 12 m: `revision-12m-2026-11-18.md`; apuntada con `apuntar-12m.mjs dunan-2026-11-18 --precios`.

## Lecciones

- **Acciones A tras resultados**: el trimestral chino no trae amortización ni BPA del trimestre aislado; el 3T se saca restando el semestral a los 9M, y el EBITDA LTM con la amortización semestral. La amortización de restringidas cambia el capital entre el trimestral y la fecha de corte: usar el anuncio de amortización (回购注销完成) para las acciones.
- **Aviso Q2 de dilución en empresas con ampliación de control** (DunAn, Gree en dic-2022): la ventana de 3 años de acciones medias cuenta la ampliación hasta que sale del cálculo; mirar el año de la ampliación antes de leerlo como dilución recurrente.
- **Reportapi de Eastmoney** solo devolvió una nota de 2026 para 002011; el F10 ProfitForecast sí trae las casas posteriores a los resultados (sin objetivos de precio).
