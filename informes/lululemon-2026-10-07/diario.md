# Diario — Lululemon Athletica (LULU), corte 2026-10-07

- Commit de partida: `0853975 Informe de Rational (Mantener, prima implícita 4,20 %)` (la carpeta no es repo git para el agente; se leyó con `git log` desde el repo).
- Inicio: 2026-10-07 17:17 (hora de Madrid). La sesión del 7 de octubre en Nasdaq no ha cerrado (abre a las 15:30 y cierra a las 22:00 de Madrid): se usa el cierre del 6 de octubre.

## Fase 1 — Identificación (17:17-17:21)
- lululemon athletica inc., Nasdaq LULU, ISIN US5500211090, CIK 0001397187, USD, US GAAP, Delaware con sede en Vancouver.
- Ejercicio de 52/53 semanas que cierra el domingo más próximo al 31 de enero. La empresa lo nombra por el año en que **empieza**: el «fiscal 2025» va del 3-feb-2025 al 1-feb-2026. Etiquetas `FY2025`, `meta.etiqueta_ejercicio: "inicio"`, `cierre_ejercicio_mes: 1`.
- Último 10-K: FY2025 (presentado el 17-mar-2026). 10-Q: 1T26 (3-may-2026) y 2T26 (2-ago-2026, presentado el 3-sep-2026).
- Guía FY2026 rebajada el 3-sep-2026: ventas 10.350-10.500 M USD (−5 % a −7 %), BPA 9,48-9,73 USD con 0,86 USD de devoluciones de aranceles IEEPA.
- CEO: Heidi O'Neill desde el 8-sep-2026 (antes, codirección interina Frank/Maestrini). Batalla de *proxies* en 2026 (DEFC14A de la empresa y del disidente; acuerdo 8-K del 26-may-2026).
- Próximos resultados (3T26): primera semana de diciembre de 2026 (por confirmar por D).

## Subagentes
- 17:21 lanzados A, B, C y D en segundo plano (hora del reloj del sistema; las horas de la fase 1 de arriba van adelantadas unos minutos).
- 17:32 comprobación de los 10 minutos: A 50 KB, C 29 KB, D 15 KB con contenido; B solo 3,7 KB (esqueleto) → recordatorio con SendMessage; a las 17:33 B ya tenía 25 KB (sector y competencia).
- A terminó a las ~17:31 (48 llamadas, 9 min) y C a las ~17:31 (57 llamadas, 9 min).
- Integración y primer cálculo de prueba (17:33) con supuestos provisionales: DCF 126,52 USD (WACC 11,31 %), EV/EBITDA LTM 3,6x.
- El integrador avisó de notas de trabajo en `calidad.comentario` y `rentabilidad.comentario` de A («para el integrador», referencias a `calc`) y A dejó comillas invertidas en `financieros.ajustes`: los sustituyo en `propio`.
- B terminó a las ~17:34 (76 llamadas, 13 min) y D a las ~17:34 (79 llamadas, 12 min). Ninguno se cortó por límite de uso.

## Integración, cálculo y redacción (17:33-18:00)
- 17:33-17:36 supuestos (`notas/supuestos.mjs`): FY2026e fijo en −6 % (punto medio de la guía) y margen EBITDA del 19,5 % (consenso); suelo en FY2027e (−1 %, 18 %); recuperación al 2,5-4 % y margen del 20 % desde FY2031e; terminal Gordon 3 %. Beta 1,13 (ajustada semanal 5 años frente al S&P 500; comparada con XLY y QQQ). Sin etapa 2 (crecimiento en duda pese al ROIC). Bajista −2/−5 pp con perfil de FY2027e (−6/−5 pp), 30 %; alcista +2/+2,5 pp, 20 %. Pesos DCF 55, escenarios 35, comparables 10.
- Proyección frente al consenso: diferencias de menos del 2,2 % en FY2026e-FY2028e.
- `_parches`: `balance.historico[].arrendamientos` a 0 (A había metido los pasivos operativos; en US GAAP el motor los restaba del capital invertido y el ROIC salía en 35 % en vez de 57 %).
- 17:41 textos y resumen. Sensibilidades de los riesgos sacadas de `calc.dcf.sensibilidad2` (−1 pp de margen = −6,4 %; −1 pp de crecimiento = −4,8 %).
- **Corte hacia las 17:42**: el `bash` falló con «fork: Resource temporarily unavailable» (el sistema se quedó sin procesos). Se retomó a las 17:56 desde los archivos de `notas/`; los subagentes ya habían terminado antes del corte, no se perdió nada.
- 17:57 informe y PDF (61 páginas). Revisión visual de las páginas 1-4: los asteriscos simples de cursiva (*de minimis*, *proxies*) salían literales; se quitaron de todas las notas y se regeneraron el Word y el PDF (18:00).
- Resultado: Comprar, convicción media. Valor objetivo 132,71 USD frente a 93,61 (+41,8 %); con la prima implícita del mercado (4,20 %), 146,21 (+56,2 %). Reglas absoluta y relativa: Comprar. DCF inverso: −4,3 % anual de ventas o margen EBITDA del 15,5 %. Controles: 14 correctos y 4 explicados.

## Fallos del sistema y su arreglo propuesto
1. **Los asteriscos simples de cursiva salen literales en el Word.**
   - Fallo: B escribió *de minimis* y *proxies* con un asterisco (cursiva Markdown) y el informe los imprimió tal cual; yo lo copié en la síntesis.
   - Arreglo: que `rellenar.mjs` admita `*cursiva*`, o que `integrar.mjs` avise de asteriscos simples en los textos que se imprimen.
2. **`balance.historico[].arrendamientos` en US GAAP distorsiona el ROIC.**
   - Fallo: A puso ahí los pasivos operativos «para información», como pedía el encargo; el motor los trata como deuda en el capital invertido y en la deuda neta histórica, y el ROIC de FY2025 bajaba del 56,8 % al 35,2 %. Lo arreglé con `_parches`.
   - Arreglo: que el motor ignore `arrendamientos` en el capital invertido y la deuda neta cuando `meta.normas_contables` es US GAAP, o un campo aparte `arrendamientos_operativos` solo informativo. Y quitar del encargo de A la frase que lo pedía.
3. **`bolsa.mjs` no sabe de ejercicios de 52/53 semanas.**
   - Fallo: tomaba el último día hábil de enero como cierre; en 6 de 10 años el ejercicio de Lululemon cerró en febrero o antes del 31. D lo corrigió a mano en `bolsa.json`.
   - Arreglo: `--cierres AAAA-MM-DD,…` con las fechas exactas de los 10-K, o `--semana-52 domingo-mas-proximo-31-01`.
4. **El detector de notas de trabajo no ve las comillas invertidas ni «calc.».**
   - Fallo: A dejó `calc.calidad`, `calc.rentabilidad` y `ultima_presentacion` entre comillas invertidas en textos impresos y un hueco; el integrador solo avisó de dos por la palabra «integrador».
   - Arreglo: el mismo de Copart: avisar de comillas invertidas, «calc.» y «no puedo» en cualquier texto impreso, también en `meta.huecos`.
5. **El fallo de `fork` corta la sesión sin aviso.**
   - Fallo: hacia las 17:42 bash no pudo crear procesos (tres análisis en paralelo, más Word y node) y la sesión quedó parada 14 minutos.
   - Arreglo: limitar a dos los análisis simultáneos cuando se genera el PDF con Word, o que el lanzador reintente el último comando tras un «fork: retry».
6. **`a-pdf.ps1` falla desde bash con «The directory name isn't valid».**
   - Fallo: lanzado desde Git Bash con la ruta de OneDrive, PowerShell no arrancó; desde la herramienta PowerShell funcionó, pero `-Salida` necesita ruta absoluta para que Word la acepte.
   - Arreglo: que el script resuelva `-Salida` con `[IO.Path]::GetFullPath` y documentar en lecciones que se llame desde PowerShell.
7. **El consenso previo de cada trimestre sigue sin fuente.**
   - Fallo: `trimestres.vs_consenso` vacío otra vez (A no quiso gastar búsquedas y D no tenía el consenso previo).
   - Arreglo: que D guarde el BPA esperado de los dos últimos trimestres en MarketScreener (página de calendario) y se lo pase a A en el reparto.
8. **El tercer consejero pactado y la posición de Elliott no tienen dónde ir salvo en alertas.**
   - Fallo: hechos de gobierno pendientes con fecha que no son catalizadores ni alertas.
   - Arreglo: `gobierno.pendientes: [{hecho, fecha_limite, fuente}]`.
- Fin: 18:01. Duración total ≈ 44 min, de ellos 14 parados por el corte.
