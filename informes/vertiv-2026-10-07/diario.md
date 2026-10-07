# Diario — Vertiv Holdings Co (VRT), corte 2026-10-07

- Commit de partida: `21591ac Empresa, vuelta 8 (Enagás): niveles con la regla entera, participadas y reguladas`.
- Inicio: 10:52 (hora local).

## Fase 1 — Identificación (10:52-11:00)
- Vertiv Holdings Co, NYSE: VRT, CIK 1674101, ISIN US92537N1081, Delaware. US GAAP, USD, ejercicio natural (cierre 31-dic).
- Últimas presentaciones: 10-K 2025 (13-feb-2026), 10-Q 1T26 (22-abr), 10-Q 2T26 (29-jul), DEF 14A (24-abr-2026).
- 2T26: ventas 3.274 M (+24 %; 18 % orgánico, 5 % compras), margen operativo ajustado 22,6 %, BPA diluido 1,27 / ajustado 1,52; caja neta positiva a 30-jun.
- Guía 2026 (29-jul): ventas 13.800-14.200 M, crecimiento orgánico 30-32 %, BO ajustado 3.285-3.365 M, BPA ajustado 6,65-6,75, FCF ajustado 2.400-2.600 M. 3T26: ventas 3.650-3.850 M.
- 24-sep-2026: acuerdo para comprar King Environmental Services (Irlanda), importe no publicado, cierre 4T26. PurgeRite cerrada en dic-2025.
- Próximos resultados (3T26): por confirmar (el año pasado, 22-oct).

## Fases 2-4 (subagentes lanzados a las 10:58)
- A cuentas, B sector, C gobierno, D mercado, en paralelo, con encargo específico de Vertiv (pedidos/book-to-bill/cartera, concentración, ajustado frente a GAAP, deuda y recompras, capacidad, aranceles; comparables con criterio entre los 10 propuestos).
- Decisión: no escribir un ENCARGO_COMUN.md aparte; cada encargo lleva la identificación y los puntos de su letra.
- Mientras tanto: el ajustado de Vertiv excluye amortización de intangibles (306,8 M en 2025; 151,3 M en 1S26), reestructuración, contraprestación contingente y costes de compras; la remuneración en acciones (≈ 30 M/semestre) NO se excluye. Por tanto el EBITDA = EBIT GAAP + D&A queda muy cerca del «EBITDA ajustado» del consenso: la diferencia es reestructuración y costes de compras.
- 11:18-11:25: terminan C (20 min, 59 llamadas), D (22 min, 68), B (25 min, 104) y A (27 min, 89). B se pasó de llamadas (104 frente a 80).
- Hallazgos que cambian la valoración: anticipos de clientes de 1.815 a 3.634 M en el 1S26 (explican buena parte del FCF de 1.578 M); cartera 15.000 M a dic-25 y book-to-bill ≈ 2,9x en 4T25, pero desde feb-26 ya no se publican pedidos trimestrales; compra de UIG (1.450 M + hasta 1.150 M de earn-out, sep-26, posterior al balance); bonos de 2.100 M (mar-26); caída del 17,3 % el día de resultados del 2T26 (ventas 76 M por debajo de su guía); ventas de directivos de ≈128 M en 12 meses, sin compras.
- Decisión de criterio: US GAAP, el alquiler operativo ya está en el EBITDA → arrendamientos fuera del puente (0) para no contarlos dos veces (≈ 1 USD/acción).

## Fases 5-6 — cálculo y supuestos (11:25-11:31)
- Primer cálculo: 8 de 16 controles; los de verdad: tipo impositivo 2024 (35,2 %, warrants no deducibles: -449 M) y BPA 2022 (diluido -0,04 frente a 0,20 básico por el ajuste de warrants en el numerador). Los dos se explican, no se corrigen.
- WACC: Tesoro 5,31 % (FRED, 5-oct), prima 4,20 % (Damodaran implícita a 1-oct, descargada), beta 1,50 (entre la sectorial de equipos eléctricos 1,25 y la propia 2,08 / Blume 1,72). WACC 11,39 %.
- Base pegada al consenso en 2026-2028 (EBITDA -1,3 %, -2,6 %, -4,2 %; ingresos 0 %, -1,9 %, -3,2 %) y desaceleración hasta el 4 % en 2035; margen EBITDA GAAP a largo 26 %.
- Circulante: 5,5 % de ventas en 2026 (anticipos de 3.634 M) que se normaliza al 11 % en 2030: el FCF de 2026 (2.377 M de FCFF) cuadra con la guía de FCF ajustado (2.400-2.600 M).
- Terminal: media de Gordon (3 %, implica 8,0x) y salida a 12x (mediana de transacciones 12,0x). Con 14x el DCF daba 151; elegí 12x porque 14x implicaba un 6,4 % de crecimiento perpetuo.
- Escenarios con `perfil`: el bajista modela una digestión del gasto en 2028 (-35 pp de crecimiento, -5 pp de margen) y 2029 (-10 pp, -3 pp), calibrada con 2009 (Emerson Network Power -15 % ventas) y 2022 (margen bruto de 33,7 % a 28,4 %).
- Resultado: DCF 142,31 (-43,8 %); DCF inverso: crecimiento 19,9 % anual 2027-2035 o margen 43,7 % o rentabilidad 6,8 %. Valor objetivo 168,18 (-33,6 %). Regla: Vender.
- Decisión: convicción Baja. Mis cifras 2026-2028 coinciden con el consenso y la diferencia es de tasa (6,8 % implícita frente a 11,4 %); no hay catalizador con fecha que la cierre. Lo exige el prompt.
- Gobierno: parcheo `presidente_ceo_separados` a false: Cote es presidente ejecutivo y no hay consejero coordinador; el motor daba «Cumple» al criterio «presidente no ejecutivo o coordinador» porque el booleano solo mira si son personas distintas.

## Fases 7-9 — redacción, comité y entrega (11:31-11:37)
- Textos en `notas/textos.mjs` y `notas/resumen.mjs` (síntesis de 640 palabras), supuestos en `notas/supuestos.mjs`, ensamblado en `notas/propio.mjs`.
- Comité: (1) convergencia sin fecha → convicción baja; (2) DCF inverso exigente y en la primera frase; (3) supuesto más favorable a la empresa: margen EBITDA a largo del 26 %; el que más pesa en contra, la beta de 1,50; (4) proyección a -1,9/-3,2 % del consenso en ventas 2027-2028, -2,6/-4,2 % en EBITDA; (5) comparables: el grupo entero cotiza en máximos por la misma tesis, explicado; ABB y Eaton/Hubbell con distorsiones, dichas; (6) anticipos en el resumen; (7) gobierno: presidente ejecutivo sin coordinador, bonus discrecional, ventas de consejeros; (8) bajista calibrado con 2009 y 2022; (9) tasa libre en dos fuentes (FRED 5,31 %, Damodaran 5,29 %), acciones del 10-Q; (10) sin relleno detectado.
- Informe: 59 páginas, 28 gráficos, cobertura 94 %, 106 fuentes (62 primarias), 1 sin citar. Abre en Word sin reparar. Avisos: tablas vacías de suma de partes (no aplica) y calificaciones ESG (hueco).
- Controles: 13 correctos y 5 explicados (tipo 2024, BPA 2022, circulante del primer año, caja proyectada, regresión).
- Fin: 11:37 (45 min en total: 6 de identificación, 27 de subagentes —con supuestos y lectura en paralelo— y 12 de integración, cálculo, redacción y Word). Reloj de `date`; mis estimaciones a ojo durante el trabajo iban muy por delante del real.

## Fallos del sistema y su arreglo (de más a menos importante)
1. **El booleano `presidente_ceo_separados` da «Cumple» con un presidente ejecutivo.** Cote es presidente ejecutivo y no hay consejero coordinador, pero como presidente y CEO son personas distintas, el criterio «presidente no ejecutivo o coordinador» salía «Cumple». Arreglo aplicado: parche a false. Arreglo del sistema: campo nuevo `presidente_ejecutivo` (bool) y que el criterio exija `!presidente_ejecutivo || consejero_coordinador`.
2. **Arrendamientos operativos en US GAAP: ni prompt ni lecciones dicen qué hacer.** D los metió en el puente siguiendo la regla de NIIF 16, y el motor los suma a la deuda aunque el EBITDA de US GAAP ya descuenta el alquiler (doble cómputo de ≈ 1 USD/acción; Intuitive lo hizo así ayer). Arreglo aplicado: 0 en el puente. Arreglo del sistema: en el prompt (§ 4.7) «con US GAAP (ASC 842), arrendamientos operativos fuera del puente y del DN/EBITDA; solo los financieros cuentan», y que el motor lo haga solo si `normas_contables` = US GAAP salvo indicación.
3. **El DCF inverso y la convicción «baja» se disparan aunque el precio exija un crecimiento fuera de toda referencia.** La regla del prompt (cifras = consenso → convicción baja) no distingue entre «tasa distinta» y «el precio requiere 19,9 % anual nueve años». Arreglo del sistema: que el motor compare el crecimiento implícito con una referencia externa (`sector.tcac_previsto_pct`) y, si lo supera, lo diga en la tabla «La decisión»; y que la regla de convicción lo tenga en cuenta.
4. **Los textos de los subagentes en campos de juicio se cuelan en el informe.** D dejó en `valoracion.comentario` una nota de trabajo («el integrador decide») y en `comparables.comentario` la metodología; sin sobrescribirlas, saldrían impresas. Arreglo aplicado: las reescribí en propio. Arreglo del sistema: en el encargo de cada letra, una clave `notas_integrador` (texto libre que `integrar.mjs` no copia a `datos.json`) y que `integrar` avise si un comentario contiene «integrador», «OJO» o «decide».
5. **Las compras posteriores al balance no tienen sitio.** UIG (1.450 M + 1.150 M de earn-out) cambia la caja y el perímetro, pero el puente solo admite el balance de junio. Arreglo del sistema: `valoracion.puente.posteriores: [{concepto, caja, ebitda_ntm}]` para que el motor las sume a deuda y, opcionalmente, al EBITDA de los múltiplos, o lo muestre como nota.
6. **Esperar a los subagentes sigue sin estar documentado.** Usé `node -e "setTimeout(()=>{},480000)"` dos veces. Arreglo: una línea en `/analiza-empresa`.
7. **`descargar.mjs` no lista los anexos de una presentación de EDGAR** (lo dijeron A, B y C; cada 8-K cuesta dos llamadas). Arreglo: `--anexos <url índice>` o `herramientas/edgar.mjs --cik --form --item --desde` que devuelva las URL de los ex. 99.
8. **Form 4 sin herramienta** (C escribió `C-form4.mjs` otra vez, como en Intuitive). Arreglo: subirlo a `herramientas/form4.mjs`.
9. **Rutas con espacios en scripts de notas** (C): `new URL(import.meta.url).pathname` deja `%20` en la ruta de OneDrive. Arreglo: en lecciones, usar `fileURLToPath`.
10. **`package.json` con `"type": "module"`** rompe los `.js` con `require` de los subagentes (A). Arreglo: en lecciones, «scripts de notas en `.mjs` o `.cjs`».
11. **WebFetch inventó la tasa del Tesoro** (3,89-3,96 % con datos en fin de semana; el CSV del FRED da 5,31 %) (D). Arreglo: lecciones: rentabilidades y tipos de cambio solo con `descargar.mjs` sobre el CSV/XML.
12. **`bolsa.mjs` no fecha el máximo ni las caídas** (D tuvo que bajar otra vez Yahoo para fechar el −17,3 % del 29-jul). Arreglo: guardar las fechas del máximo, del mínimo y de las tres mayores caídas diarias.
13. **`prompt-de.mjs D` tardó más de 120 s** para D (no para los demás). Arreglo: revisar si lee stdin; que imprima y salga.

## Nota sobre las herramientas
- `prompt-de.mjs`: útil; las cuatro notas salieron con las claves correctas.
- `descargar.mjs`: la más usada; le faltan los anexos de EDGAR y Form 4.
- `bolsa.mjs`: una llamada para todo lo de mercado, con aviso de sesión no cerrada; le faltan fechas de extremos.
- `integrar.mjs`: sin una sola cita huérfana; `_parches`, `huecos_resueltos` y `controles_explicados` (nuevos desde Intuitive) funcionaron a la primera, también para un campo que no es de lista (`gobierno.presidente_ceo_separados`).
- Presupuesto: B se pasó (104 llamadas, 25 min); A llegó a 89. El resto, dentro.
