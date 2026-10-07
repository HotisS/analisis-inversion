# Diario — KEYENCE Corporation (6861) — corte 2026-10-07

- Inicio: 2026-10-07 10:52 (hora local).
- Commit de partida: `21591ac Empresa, vuelta 8 (Enagás): niveles con la regla entera, participadas y reguladas`. No se cambia de versión del prompt durante el análisis.
- Procedimiento: `.claude/commands/analiza-empresa.md` + `verticales/empresa/prompt.md` (leído entero) + `lecciones.md`.
- En paralelo corren otros análisis (Fanuc, Almirall, Enagás…): solo se escribe en `informes/keyence-2026-10-07/`.

## Fase 1 — Identificación
- 10:53-11:02. Nombre legal KEYENCE CORPORATION (株式会社キーエンス), TSE Prime 6861, ISIN JP3236200006, Yahoo `6861.T`. Cuentas en JPY, normas **JGAAP** (los *Kessan Tanshin* dicen «JP GAAP»; no NIIF). Cotiza en JPY: `divisa_cotizacion` JPY, tipo 1.
- **Ejercicio**: cierra el **20 de marzo** (no el 31). La empresa llama «FY2025» al ejercicio 21-mar-2025 → 20-mar-2026 (los materiales del 1T de jul-2026 dicen «First Quarter of FY2026»; el *Securities Report* n.º 57 cubre 2025-03-21 a 2026-03-20). → `cierre_ejercicio_mes: 3`, `etiqueta_ejercicio: "inicio"`. Ojo: muchos proveedores (Yahoo, Stock Analysis, MarketScreener) etiquetan por el año de cierre («FY2026» = mar-2026): fuente de errores de un año al cruzar.
- FY2025 (a mar-26): ventas 1.169.289 M JPY (+10,4 %), BO 595.759 M, BN 445.185 M. DPA 550 JPY (350 el año anterior). 1T FY2026 (abr-jun 26): ventas 346,6 mm (+32,8 %; +24 % en moneda local fuera de Japón), margen operativo 54,0 %.
- Hecho de gobierno: el fundador **Takemitsu Takizaki deja el consejo el 12-jun-2026** (pasa a presidente de honor sin ser consejero).
- Web de inversores: `https://www.keyence.co.jp/investor/en/` (la `.com/investors` da 404). Biblioteca: `library/results.jsp`, `library/annualreport.jsp` (Annual Report 2026 en inglés), `library/securitiesreport.jsp` (solo japonés), `stock/shareholders-meeting.jsp` (convocatoria 57.ª, en inglés). El calendario IR **no publica fechas futuras**: la fecha del 2T hay que inferirla (2T FY2025 se publicó a finales de oct-2025).
- El dominio de los PDF es `https://www.keyence.co.jp/pdf/…`.

## Fases 2-4
- 11:00. Lanzados en paralelo los subagentes A (cuentas), B (sector), C (gobierno) y D (mercado), cada uno con `prompt-de.mjs <letra>`, lecciones, la convención del ejercicio (FY por año de inicio, cierre 20-mar) y las URL ya localizadas (para que no repitan la búsqueda de la web de inversores, que costó 6 llamadas por la 404 de keyence.com/investors).
- Mientras tanto: `propio` y tesis (sin leer el motor).
- 11:02. Leída la presentación de resultados FY2025 (abr-26): crecimiento en moneda local fuera de Japón +12,9 % (Américas +15,1 %, Asia +17,0 %, Europa +2,9 %); Japón +4,6 %. El 4T y el 1T FY2026 aceleran (ext. +16,4 % y +24,0 % en moneda local). Sensibilidad: 1 JPY/USD ≈ 9-11 mm de BO; 1 JPY/EUR ≈ 5 mm; 0,1 JPY/CNY ≈ 7-10 mm. Efecto divisa en el 1T FY2026: +26,1 mm en ventas y +18,9 mm en BO (≈ 22 % del aumento del BO). Centro logístico nuevo en Takatsuki (×4), fin de obra nov-26, operativo nov-27. Política de capital: sin presupuesto prefijado para crecimiento y M&A; dividendo «estable y continuo»; recompras «flexibles». Sin guía numérica.
- Estructura de trabajo copiada de VAT: `propio.mjs` + `supuestos.mjs` + `resumen.mjs`.
- 11:13. **C terminado** (41 llamadas, 12,6 min). 17 fuentes primarias, 5 huecos. Corrige dos datos de mi encargo: el CEO ya no es Yu Nakata sino **Tetsuya Nakano (44 años) desde el 22-dic-2025** (cambio aprobado el 29-oct-2025, <2 meses de preaviso → `cambios_cupula_24m` = 1), y la nota de Takizaki es `PressRelease_20260424_01`, no la del 18-jun. Fundador + T.T Corporation 18,22 % (+4,57 % de la Fundación Keyence); `accionista_control` = false (≈20 % de los votos emitidos, sin prueba de que nombre al CEO). Voto del CEO: 82,7 % (2024), 77,1 % (2025), 86,7 % (2026). Retribución sin variable propio ni acciones (182 M JPY el CEO, 8,4x el salario medio). Auditor Deloitte Tohmatsu desde 1987.
  - **Fallo del sistema (Japón):** el prompt pide voto de remuneración, pero en Japón no se vota cada año; el campo queda en `null` y el motor puntúa sin él. Arreglo: admitir en el prompt «en Japón, el voto a la reelección del primer ejecutivo» como sustituto explícito (campo `voto_cupula_pct`) y que el motor lo use si el de remuneración es `null`.
  - **Fallo del sistema (herramientas):** `descargar.mjs` deja ilegible el japonés de algunos PDF (codificación de fuentes CID en pdftotext); EDINET API v2 pide clave (401). Arreglo: en `descargar.mjs`, probar `pdftotext -enc UTF-8` y avisar si el texto sale con >30 % de caracteres de reemplazo; en lecciones, la vía de EDINET sin clave (`disclosure2dl.edinet-fsa.go.jp/searchdocument/pdf/<docID>.pdf`).
  - Lección de encargo: el subagente C usó prefijo `C_` en el scratchpad compartido; conviene dar a cada subagente su propia carpeta temporal.
- 11:18. **A terminado** (45 llamadas, 15,3 min): 10 ejercicios FY2016-FY2025, 8 trimestres, 22 fuentes, 8 huecos. JGAAP sin NIIF 16 (ASBJ n.º 34 desde 21-mar-2028). Ventas ×2,8 en diez años (TCAC 12,3 %) sin compras; margen operativo 51,0 % (máx. 55,6 % en FY2017). China publica su peso en la nota de geografía: 16,0 % en FY2025 (máx. 17,0 % en FY2021). Segmentos = 4 geografías de la nota 13 (Japón, EE. UU., China, resto). Liquidez 2,98 billones (81 % del activo). Sin recompras en diez años; dividendos = 19 % del FCF acumulado.
  - **Fallo del sistema (herramientas):** `pdftotext` se come el «△» (negativo japonés): «△3,4 %» sale como «3,4 %». Arreglo: en `descargar.mjs`, sustituir △/▲ por «−» al extraer el texto, y avisar en lecciones. También: `-layout` desordena los estados japoneses; `-table` los saca limpios (ya en lecciones para otras tablas, ampliar a Japón).
  - Error mío: llamé `res_1T_FY2027` a la presentación del 1T FY2026 (confundí la convención en la primera descarga). Lo dejo como está y lo digo aquí; la fuente se cita por URL y título.
- 11:18. **D terminado** (61 llamadas, 16,5 min): precio 81.490 JPY (cierre 6-oct; el 7-oct no estaba en Yahoo), 242,525 M acciones, puente a 20-jun-2026 con caja + valores 2.995.278 M (52 % a largo plazo) y asociadas 99.243 M a valor de cotización; consenso MarketScreener (15 analistas) FY2026e ventas 1.450.153, EBITDA 794.589, BPA 2.335; PO medio 97.867. **JGB a 10 años: 3,103 %** (MoF). Comparables: mediana EV/EBITDA NTM 17,6x, PER NTM 29,4x. 5 transacciones con múltiplo.
  - **Fallos del sistema (bolsa.mjs):** `^TPX` da 404; con el ETF 1306.T como índice la beta sale 0,03 (salto sin ajustar en la serie); `--cierre-mes 3` toma fin de mes y no el día 20 de cierre de Keyence. Arreglos: opción `--cierre-dia`, `--indice-beta` separado (ya existe: usarlo con ^N225) y un control que avise si la beta < 0,2 o el salto diario de una serie > 25 %.
- 11:20. **B terminado** (80 llamadas, 18 min, en el límite): 24 fuentes (16 primarias), 6 huecos. Mercado de visión 15.830 M USD (MarketsandMarkets) frente a 22.600 M (Grand View): sin serie histórica ni CR5 ni cuota (Keyence no desglosa por línea). Otro caso de regla 0: el buscador decía 20.400 M en 2024 y la página original, otra cosa. Avisó de que el margen bruto de A podía estar mal (etiquetas de fila desplazadas en el informe anual); lo comprobé: A está bien (83,0 %), el desplazamiento solo afectó a B.

## Integración, cálculo y redacción
- 11:21. Primer `integrar` + `calcular`. 13/19 controles; faltaban `rentabilidad` y `riesgos` (míos) y un hueco de D sin tres intentos.
- Corregido en A.json el título del *Securities Report* («第61期» → «第57期»; C lo tenía bien).
- **Decisiones del DCF** (`notas/supuestos.mjs`): FY2026e +22 % (consenso +24 %: el 1T llevó 26.100 M JPY de divisa que no se repetirá con el yen a 158), +11 %, +9 %, corrección −5 % en FY2029e (calibrada con FY2019 −6,0 %), y convergencia al 3,5 %; margen EBITDA 54,5 % → 51 % en el valle → 53 % (entre FY2025 52,4 % y la media de 10 años 54,0 %); capex 3,0 % (Takatsuki) → 2,0 %; circulante 38,5 % → 37,5 %; impuestos 30 %. WACC 8,50 %: JGB 3,103 % (MoF, contrastado con Trading Economics 3,11 %), beta Blume 1,05, **prima de Damodaran para Japón 5,14 %** en vez del 5,5 % genérico. Terminal Gordon 2,5 % en JPY (más alto que el 1-1,5 % de lecciones porque el JGB ya descuenta ≈ 2 % de inflación). Escenarios 25/50/25 con `perfil` en el bajista (FY2027e −8 %, margen 49,5 %). Pesos DCF 50 / comparables 25 / escenarios 25 / transacciones 0 (prima de control; nadie puede comprar 16,7 billones de JPY).
- **Resultado:** DCF 57.330,19 JPY (−29,6 %), VT 62 %. **DCF inverso: crecimiento implícito 14,4 % anual FY2026e-FY2035e (base 7,9 %; histórico 12,3 % con yen débil); margen implícito 79,3 % (imposible); rentabilidad implícita 6,4 % frente a WACC 8,50 %.** El múltiplo terminal implícito es 11,1x EBITDA; un 20x de salida exigiría g = 5,09 %. Valor objetivo 61.614,88 JPY, rentabilidad total −23,7 %, asimetría −0,08x → regla **Vender**. Convicción **Baja**: proyección a 3 años dentro del 1,6-4,9 % del consenso, la diferencia es tasa de descuento + largo plazo y el catalizador con fecha (2T el 29-oct, base fácil) juega en contra. PER LTM 40,2x = su media de 10 años: el mercado paga el múltiplo de cuando el JGB rendía ≈ 0 %.
- Comprobado con sensibilidades: con la prima madura (WACC 7,5 %) el DCF daría 66.598 JPY; ni el alcista (78.168 JPY) llega al precio. La conclusión no depende de una décima.
- Revisión de comité (fase 8): supuesto más discutible = la tasa libre alta (verificada en dos fuentes); bajista verosímil pero combina ciclo y caída de múltiplo (22x BPA, por debajo del mínimo de 10 años de 29,9x), dicho en el texto; comparables frágiles (16,5-19,7x según cuál se quite), explicado y con peso del 25 %.
- 11:28. Informe generado: 27 gráficos, cobertura 88,6 %, 14/16 controles OK y 2 explicados (regresión R² 0,26; mediana frágil). Word lo abre sin reparar (57 páginas); revisadas portada, síntesis y «La decisión».
- **Tiempo total: ≈ 39 min** (10:52 → 11:31), de ellos ≈ 18 min de subagentes en paralelo.

## Fallos del sistema y arreglo propuesto (por orden de importancia)
1. **`huecos_resueltos` borra también el hueco que el analista registra en `propio` con la misma clave** (`integrar.mjs`, líneas 115-121): quise sustituir el hueco de D (sin tres intentos) por el mío y desaparecieron los dos. Apaño: cambiar el nombre del campo. Arreglo: aplicar `huecos_resueltos` solo a los huecos de las notas, no a los de `propio`.
2. **Terminal en divisas «de inflación baja»**: el prompt y lecciones dicen JPY ≈ 1-1,5 %, pero con el JGB al 3,1 % eso mete un diferencial tasa-crecimiento de 7 puntos y hunde el valor. Arreglo: en el prompt, ligar el terminal a la tasa libre de la propia divisa (g ≤ tasa libre − 0,5) en vez de a una lista de divisas.
3. **El motor no avisa de la incoherencia entre el múltiplo terminal implícito y el actual** (11,1x frente a 24,8x hoy): es la cifra que más explica el DCF y hubo que buscarla a mano en `calc.dcf`. Arreglo: imprimir `multiplo_implicito` y `g_implicito_pct` del método no usado en la salida de consola y en la tabla del DCF.
4. **Voto de remuneración en Japón**: no existe voto anual; el campo de núcleo queda `null` y el criterio de gobierno «sin dato». Arreglo: campo `voto_cupula_pct` (reelección del primer ejecutivo) como sustituto explícito en Japón, con el voto en contra sobre capital libre.
5. **`bolsa.mjs`**: `^TPX` da 404; con el ETF 1306.T de índice la beta sale 0,03 (salto sin ajustar); `--cierre-mes` toma fin de mes y Keyence cierra el día 20. Arreglo: `--cierre-dia`, control que rechace betas < 0,2 o saltos diarios > 25 %, y en lecciones `--indice-beta ^N225` con 1306.T para la rentabilidad total.
6. **`pdftotext` y Japón**: se come «△» (negativo japonés), `-layout` desordena los estados y el japonés de algunos PDF de EDINET sale ilegible. Arreglo en `descargar.mjs`: reemplazar △/▲ por «−», probar `-table` cuando una página tiene muchas columnas numéricas y avisar si > 30 % del texto son caracteres de reemplazo.
7. **Convención del ejercicio**: la empresa nombra por año de inicio y los proveedores por año de cierre; yo mismo nombré mal el primer PDF (`res_1T_FY2027`). Arreglo: que `prompt-de.mjs` añada al encargo de cada subagente una línea fija «FYxxxx de la empresa = proveedor xxxx+1» cuando `etiqueta_ejercicio` sea «inicio», y que `integrar` avise de periodos de consenso que no siguen al último real.
8. **Claves fuera del esquema**: los subagentes añaden `nota`, `nota_datos`, `nota_base` (texto útil pero sin sitio). Arreglo: que `integrar` las liste como aviso y las mueva a `meta.limitaciones` o las descarte, para que no se pierdan en silencio.
9. **Heredocs largos en Bash** fallan con comillas y texto en español (lo sufrieron A, B, C y D). Arreglo en lecciones: escribir notas y scripts con Write, nunca con heredoc.
10. **Scratchpad compartido** entre subagentes (C tuvo que prefijar sus archivos). Arreglo: dar a cada subagente su carpeta `scratchpad/<empresa>-<letra>` en el encargo.

## Nota sobre las herramientas
`descargar.mjs`, `prompt-de.mjs` e `integrar.mjs` funcionaron sin tocar nada; el motor aceptó `etiqueta_ejercicio: "inicio"` con cierre en marzo y calculó bien LTM y NTM. El único paso manual que sobró fue buscar el múltiplo terminal implícito.

## Lo particular de Japón
- JGAAP sin NIIF 16 hasta el 21-mar-2028 (ASBJ n.º 34): sin arrendamientos en deuda ni en EBITDA; importe menor en Keyence.
- Ejercicio al 20 de marzo, nombrado por año de inicio; trimestres sin estado de flujos (el LTM del FCF queda vacío).
- Sin guía de resultados (solo dividendo) y sin transcripciones: `historial_guidance` con el dividendo y `ultima_presentacion` desde las diapositivas.
- Gobierno: Audit & Supervisory Board (no comisión de auditoría), voto por consejero y no por remuneración; registros de participaciones en EDINET (API con clave; PDF por `disclosure2dl`); sin registro público de operaciones de directivos; cortos solo por encima del 0,5 % (ninguno declarado).
- Tipos: el JGB a 10 años al 3,1 % cambia el WACC frente a los análisis europeos con tasas del 0,5-3 %; es la variable que decide Keyence.


## Actualización v2 (7 oct 2026): regla relativa y DCF en tres etapas

Sin investigación nueva. Script: `notas/actualizacion-v2.mjs` (parte de `datos.json`), salida `datos-v2.json` y `Keyence - 2026-10-07 v2.docx`. Fuente nueva [96]: prima implícita del S&P 500 de Damodaran, octubre de 2026, 4,20 %.

| | v1 | v2 |
|---|---|---|
| Recomendación · convicción | Vender · Baja | **Mantener · Baja** |
| DCF (WACC 8,50 %) | 57.330,19 JPY (dos etapas) | 63.376,65 JPY (tres etapas; 57.852,47 sin la transición) |
| Valor objetivo | 61.614,88 JPY, RTE −23,7 % | 66.566,47 JPY, RTE −17,6 %, asimetría 0,34x |
| Objetivo con la prima del mercado (WACC 7,51 %) | 68.676,54 JPY, RTE −15,0 % (sin etapa2) | 75.201,52 JPY, RTE −7,0 %, asimetría 1,09x |
| Regla absoluta / relativa | Vender / Vender | Vender / Mantener (discrepan; manda la relativa) |
| Niveles | Mantener < 65.681,46; Comprar < 54.036,25 | Comprar < 65.834,24; Vender > 84.206,58 (+3,3 % sobre el precio) |

- **etapa2: sí**, decidida por el negocio antes de calcular. ROIC 94,6 % frente a WACC 8,50 %; ventas exteriores (67 %) a más del 15 % en moneda local tres años seguidos; productividad exterior a la mitad de la japonesa; visión artificial prevista al +8,3 % anual; ventaja de información que se refuerza con la escala. Diseño: la cola FY2033e-FY2035e pasa de 6,5/5/3,5 % (la convergencia que exigía el DCF en dos etapas) a 7/6,5/6 %, por debajo del 8,3 % del mercado, y diez años de transición hasta el 2,5 %. Aporte: +9,5 % sobre el DCF sin transición (57.852,47 → 63.376,65); la transición pesa el 28 % del valor empresa y el terminal baja del 62 % al 38 %.
- **El Mantener está en el borde y depende de la etapa**: RTE relativa del −7,0 % frente al umbral del −10 %. Con cinco años de transición sería −10,2 % (Vender); con siete, −8,9 % (Mantener); con la cola antigua y diez años, −12,4 % (Vender). Dicho en la síntesis; la convicción es baja por eso y porque las cifras a tres años están a un 1,6-4,9 % del consenso.
- **Terminal**: v1 ya había subido el terminal al 2,5 % (no usó el 1-1,5 %). Con la regla nueva (entre la inflación esperada, ≈ 2 %, y el JGB − 0,5 = 2,6 %) es coherente: no se cambia. Solo se corrigió `dcf.wacc.nota` (no se imprime), que seguía hablando de una prima del 5,5 % y de un terminal del 1-1,5 %.
- Disparador del JGB < 2,5 % recalculado (con el terminal al 2,0 % por coherencia): objetivo relativo de 79.738,45 JPY (−1,5 %); sigue en Mantener.

**Fallos del sistema**
1. El «sin etapa2» del motor (`valor_accion_dos_etapas`) usa la cola explícita ya subida para la transición (57.852,47), no el DCF en dos etapas original (57.330,19): con la cola al 6 % y salto directo al 2,5 % no es un modelo coherente. Arreglo: que el informe diga contra qué compara, o admitir una cola alternativa.
2. El motor no da la sensibilidad de la recomendación a `etapa2.anios`, y aquí cambia entre 5 y 7 años. Arreglo: una fila en «La decisión» con la regla a 5 y a 10 años.
3. La cabecera de la síntesis da el potencial con la prima del mercado (−7,7 %) y la tabla la rentabilidad total (−7,0 %): dos cifras distintas en dos páginas seguidas.
4. La regla del terminal no dice si vale para los escenarios: el alcista usa un 3,0 %, por encima del techo del 2,6 %.
5. En «Del valor empresa al valor por acción», la caja neta aparece como «− Deuda financiera neta» con importe positivo (2.995.278): se lee como una resta.
