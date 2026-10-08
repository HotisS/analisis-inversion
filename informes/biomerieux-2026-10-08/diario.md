# Diario: bioMérieux (BIM.PA), corte 2026-10-08

- Commit de partida: `802db40 Informe de Rentokil (Comprar, convicción baja)`.
- Prompt: `verticales/empresa/prompt.md` de ese commit; no se cambia durante el análisis.
- Corte: 2026-10-08. La sesión del 8 está abierta al empezar (09:36): se usa el cierre del 7-oct-2026.

## Tiempos
- 09:36 inicio; lectura del procedimiento, prompt y lecciones.
- 09:37 fase 1: bioMérieux S.A., Euronext Paris (BIM), ISIN FR0013280286, EUR, cierre 31-dic, NIIF-UE. 118.361.220 acciones emitidas a 30-sep-2026 (194,2 M derechos de voto teóricos: voto doble). Próxima publicación: ventas del 3T26 el 30-oct-2026 (calendario del comunicado del 1S26). El 28-jul-2026 rebajó la guía 2027-2028 (de un 7 % de TCAC 2024-2028 a +3/+6 % orgánico anual).
- 09:39 lanzados cinco subagentes (A cuentas, B sector, C gobierno y rating, D mercado/consenso/puente/WACC, E comparables y transacciones). D partido en dos por la lección de Rentokil (D tardó 50 min con comparables extranjeros).
- 09:50 control de los 10 minutos: A (6,9 KB), B (3,9 KB) y E (14,7 KB) con contenido; C y D solo el esqueleto (D ya tenía los bolsa*.json). Recordatorio enviado a C y D.
- 09:55-10:00 terminan C (gobierno, 16 min), E (comparables y transacciones, 16 min), D (mercado, 17 min) y A (cuentas, 19 min). B sin actualizar su nota desde las 09:47: recordatorio a las 10:04.
- 10:03 primera integración (B parcial).
- 10:08 B terminó (29 min): sector, competencia, historia, ESG; MolDX sin verificar y sin calificaciones ESG.
- 10:04-10:15 supuestos, primer y segundo cálculo, textos, riesgos y resumen. Verificada la LCD L39001 de MolDX en la base de datos de CMS (B no pudo abrir Noridian).
- 10:15 Word (57 páginas, 26 gráficos, cobertura 90,6 %) y PDF; revisadas como imagen las páginas 1-4.
- 10:18 fin. Tiempo total: unos 42 minutos (19 de ellos esperando a los subagentes; B tardó 29 min).

## Decisiones principales
- Precio 80,75 EUR, cierre del 7-oct (Yahoo trae vacía la barra diaria del 7; D lo sacó del cierre anterior de la cotización del 8 y de MarketScreener). Rentabilidades y betas hasta el 6-oct.
- Acciones diluidas 118,545 M (emitidas − autocartera + 852.786 acciones de rendimiento), caja y deuda a 30-jun-2026; sin recompras declaradas desde abril.
- Tasa libre: Bund 3,55 % (Bundesbank) + 0,5 puntos de prima adicional por Asia-Pacífico y Latinoamérica (22 % de las ventas). Se descarta la OAT (4,87 %, CNBC; Banque de France y AFT dan 403) por su diferencial soberano de 1,3 puntos con Francia en el 6 % de las ventas. Con la OAT, el WACC rondaría el 9,6 % y el DCF unos 67 EUR (sensibilidad del motor).
- Beta 0,87 = media de las ajustadas a 5 años frente al STOXX 600, mensual (0,78) y semanal (0,96). CAC 40: 0,77/0,82 (descartado: 6 % de ventas en Francia, índice sesgado a lujo y bancos). STOXX 600 Salud: 0,68/0,84 (descartado: beta frente al sector, no al mercado). WACC 8,57 %; terminal 2,5 %.
- No recurrentes en el EBITDA: 171,1 M en 2025 (VITEK REVEAL y San José) y 25,5 M en el LTM, devueltos con no_recurrentes_en_ebitda. EBITDA base 2025: 972 M (23,9 %).
- Etapa de transición: no. ROIC 12,7 % frente a WACC 8,57 % (4,1 puntos < 5) y la empresa rebajó su crecimiento a medio plazo; la ventaja de BIOFIRE (≈ 70 % de la PCR sindrómica, 28.550 equipos) queda en la justificación.
- Comparables: solo los cinco de DIV puro (Qiagen, DiaSorin, Sysmex, Bio-Rad, QuidelOrtho; mediana 9,7x EV/EBITDA NTM). Danaher, Thermo Fisher y Revvity (19,8-21,4x) fuera de la estadística y dentro del texto: con ellas la mediana subía a 11,6x y el valor objetivo a 86,75.
- Pesos: DCF 45, escenarios 30, comparables 25, transacciones 0 (control familiar del 72,4 % del voto).
- Resultado: DCF 78,38; valor objetivo 80,93 (+0,2 %, rentabilidad total 1,4 %, asimetría 0,47). Regla absoluta Mantener, relativa Comprar (93,63; +17,2 %; asimetría 3,86). Se sigue la regla: Comprar con convicción baja, porque la compra sale de la tasa de descuento y nuestras cifras están un 2-5 % por debajo del consenso en EBITDA; el precio está a un 1,4 % del nivel de compra (81,90).

## Revisión de comité (resumen)
1. Convergencia: solo si se acepta la prima implícita del mercado; con nuestro WACC el precio es justo. La recomendación sigue la regla. 2. DCF inverso en la síntesis: 5,5 % de crecimiento o 26,0 % de margen frente a 4,4 % y 25,5 %. 3. Supuesto más agresivo: el margen subiendo del 23,3 % al 25,5 % (máximo fuera de la COVID: 24,1 %). 4. Proyección frente al consenso: −1/−2,5 % en ventas y −2,4/−5 % en EBITDA, explicado por el margen del 1S26. 5. Comparables: excluidas tres diversificadas, explicado. 6. Calidad: deterioros recurrentes de compras y flujo libre inflado por la reforma fiscal de EE. UU., en la síntesis. 7. Gobierno: control del 72,4 % del voto, 3 de 8 independientes, auditoría interna en manos del control y rechazo mayoritario del capital libre a la remuneración; resta. 8. Bajista verosímil (repite 2022-2023): −23,8 %. 9. Dato crítico: la tasa libre (Bund frente a OAT): verificado en Bundesbank y CNBC. 10. Sin relleno detectado.

## Fallos del sistema
1. **Cierre del día anterior vacío en Yahoo**: la barra diaria del 7-oct venía con close null y `bolsa.mjs` cayó al 6-oct sin decirlo como tal (solo avisó de que no había cierre del 8). Arreglo: que `bolsa.mjs` detecte barras con close null y use `regularMarketPreviousClose` de la cotización, avisando de la fuente.
2. **`descargar.mjs` no baja los documentos de registro de 14-22 MB** (se agota el tiempo) y EDGAR le dio 403 a B: A, B y D los bajaron con curl a %TEMP% y no quedan en `notas/docs`. Arreglo: tiempo de espera según tamaño (o descarga en streaming) y revisar el User-Agent de EDGAR.
3. **Control «EBIT + resultado financiero = BAI»** salta con no recurrentes dentro del EBITDA (repite el fallo 5 de Rentokil). Arreglo: que el control use el EBIT antes de normalizar.
4. **`ltm.no_recurrentes_en_ebitda` fuera del esquema** (repite el fallo 4 de Rentokil). Arreglo: añadirlo al bloque `ltm` del prompt, el ejemplo y la plantilla.
5. **Comparables sin `excluir`**: transacciones y múltiplos históricos lo tienen, comparables no; hubo que filtrar en `propio.mjs` y las tres excluidas desaparecen de la tabla. Arreglo: `comparables.empresas[].excluir` que las muestre en la tabla y las saque de la estadística.
6. **Transacciones con peso 0 y sin EV/EBITDA**: la tabla de síntesis imprime 240,98 EUR (+198 %) y el gráfico de transacciones sale vacío. Arreglo: no imprimir métodos con peso 0 cuyo valor se aparte más de un 100 % del precio, o marcarlos «no aplicable».
7. **B tardó 29 minutos y no guardó entre las 09:47 y las 10:08** pese a la regla y al recordatorio; agotó sus búsquedas sin abrir la LCD de MolDX. Arreglo: dar en `lecciones.md` la URL de la base de CMS (`cms.gov/medicare-coverage-database/view/lcd.aspx?lcdid=N`), que baja bien con `descargar.mjs`, y limitar B a dos competidores con 10-K largos.
8. **Tasa libre en el euro ambigua**: el prompt pide «el bono del país de la divisa»; para el euro hay que elegir entre el Bund y la OAT (1,3 puntos de diferencia, unos 11 EUR por acción). Arreglo: fijar en el prompt el Bund más prima país por ventas, y en lecciones que la API de Bundesbank funciona y Banque de France/AFT dan 403.
9. **Longitud de la síntesis sin control**: la primera versión tenía 769 palabras. Arreglo: control del motor que cuente las palabras de `resumen.sintesis` (≤ 650).
10. **Edición de scripts propios**: un `node -e` con comillas anidadas dentro de bash falló y un reemplazo por índices dejó `resumen.mjs` truncado (índice −1). Arreglo (lección): escribir y reescribir los `.mjs` enteros con Write, nunca con reemplazos por posición.
