# Diario — DSV A/S (DSV) — corte 2026-10-07

- Inicio: 2026-10-07 18:05 (hora local).
- Commit de partida: `7c3b328 Informe de Edenred (Comprar, convicción media)`. No se cambia de versión del prompt durante el análisis.
- Procedimiento: `.claude/commands/analiza-empresa.md` + `verticales/empresa/prompt.md` (leído entero) + `lecciones.md`.
- En paralelo corren otros análisis: solo se escribe en `informes/dsv-2026-10-07/` y en `%TEMP%\analisis-inversion\dsv*`.

## Fase 1 — Identificación (18:05-18:13)
- DSV A/S, Nasdaq Copenhagen `DSV` (Yahoo `DSV.CO`), ISIN DK0060079531. Cuentas en DKK, NIIF-UE, ejercicio natural. Cotiza en DKK: tipo 1.
- investor.dsv.com no responde a curl ni a `descargar.mjs --lista` (timeout). Los anuncios están en GlobeNewswire; los enlaces salen de las páginas de inderes con `--lista`.
- Último informe: 1S26 (anuncio 1170, 22-jul-2026): EBIT antes de partidas especiales 2T26 6.255 M DKK (+32,5 %), guía 2026 estrechada a 23.500-25.500 M, partidas especiales ≈6.500 M en 2026, sinergias de Schenker 9.000 M anuales con impacto completo en 2027, costes de integración ≈11.000 M.
- Próximos resultados: 3T26 el 21-oct-2026 (calendario financiero 2026, anuncio 1160).
- Sesión de Copenhague del 7-oct ya cerrada a las 18:05.

## Fases 2-4 — Subagentes A-D
- Lanzados a las ~18:10 con el aviso de guardar antes de la llamada 15.
- 18:14: el coordinador nos para a todos por una regla nueva del usuario: trabajar solo en `analisis-inversion` y en `%TEMP%`; nada por encima de `Escritorio\Vela` en el OneDrive, temporales y PNG en `%TEMP%`, sin borrar dentro del OneDrive. 18:15: reanudados los cuatro con SendMessage desde sus notas (casi vacías: 78-216 bytes; D ya había generado cuatro `bolsa*.json`), con la regla en el mensaje.
- Mientras, prensa: el precio (1.157 DKK, cierre del 6-oct; Yahoo aún sin el del 7) está a un 0,8 % del mínimo de 52 semanas (1.148, 1-oct) y un 39,5 % bajo el máximo (1.913,5, 9-feb). Caídas: −14,2 % el 22-jul (1S26: problemas de Road), −5,6 % el 21-sep (acuerdo de K+N con Amazon para la logística de AWS, según la prensa danesa).
- Control de los 10 minutos (18:25): los cuatro han guardado (A 11 KB, B 27 KB, C 11 KB, D 14 KB). No hizo falta recordatorio.
- Mientras trabajan: `notas/supuestos.mjs` (modelo de margen bruto × conversión, ver abajo) y `notas/cualitativo.mjs` (catalizadores y preguntas).
- B terminó a las ~18:29 (48 llamadas): mercado de Ti 208.100 M EUR en 2025 (+4,4 %), TCAC 2,3 % a 2030; cuotas DSV 6 %, DHL 5 %, K+N 4 %; margen bruto por unidad de DSV 4.274 DKK/TEU y 8.242 DKK/t en 2025; WCI 4.434 USD/FEU a 1-oct-2026. Huecos: serie del mercado, fletes medios 2020-25, margen por unidad 2019-23.
- D terminó a las ~18:29 (54 llamadas): puente a 30-jun cuadrado con la NIBD publicada (87.331 con −197 de créditos con interés); consenso MarketScreener (20 analistas; EBIT 2026e 24.370, 2027e 28.942; BPA contable); 7 comparables; solo 3 transacciones y ninguna con EV/EBITDA; bono danés: último oficial agosto (3,13 % MPK3, 3,01 % BCE).
- C terminó a las ~18:31 (51 llamadas): Göhner 9,7 %, Agility 8,03 %, Capital Group 5,1 %; sus presidentes (Walti, Sultan) se sientan como «independientes»; el bonus del CEO no tiene métrica de sinergias; 6,1 M discrecionales al comité por la compra; ventas de directivos 265 M en 12 meses; votos de remuneración sin porcentaje (hueco).
- **Precio**: a las 18:31 Yahoo ya da el cierre del 7-oct (1.137,5 DKK, último cruce 16:59:37). Se usa ese cierre; `bolsa.mjs` sigue cortando en el 6-oct porque los ETF de Xetra no traen el 7: rentabilidades, beta y volatilidad a 6-oct (dicho en limitaciones).
- A terminó a las ~18:33 (nota completa, 51 KB). Hacia las 18:33 el límite de uso cortó la sesión del coordinador.

## Reanudación (8-oct, 08:29-09:27), con la fecha de corte del 7-oct
- El coordinador decía que B, C y D estaban a medias; en disco y en sus avisos de cierre los cuatro habían terminado (A 51 KB, B 28 KB, C 25 KB, D 31 KB). No hizo falta reanudarlos.
- **Rating** (hueco de núcleo de A): investor.dsv.com y dsv.gcs-web.com no responden ni con `descargar.mjs`, ni con curl ni con WebFetch. Se registra S&P A− con perspectiva negativa desde sep-2024 (Air Cargo News) y Moody's A3 (informe de VIS de 2022). El buscador cita una vuelta de S&P a estable el 11-may-2026 en un PDF de la web de DSV que no abre: se dice como no verificado.
- Decisiones: cuenta con EBIT antes de partidas especiales (como la deja A); consenso en base NIIF (es antes de partidas especiales, igual que la cuenta); los costes de integración pendientes tras el corte (≈2.300 M, estimación) van a `otros_ajustes`, no al margen, para que la proyección se compare con el consenso; Walti y Sultan pasan a dominicales (presiden Göhner, 9,7 %, y Agility, 8,03 %); posición corta 2,10 % (Finanstilsynet, suma de posiciones ≥0,1 %).
- Modelo (`supuestos.mjs`): margen bruto × conversión. 2026e margen bruto 79.500 y conversión 30,5 % (EBIT ≈ 24.240, centro de la guía); 2027e +2,5 % y 34,5 %; luego +4 % y conversión hasta 40,5 % en 2030 (la de 2023) y 41 %. Capex = propio + altas de derechos de uso (4,1 % → 3,9 %); circulante 8,5 %; impuestos 28/25/24 %. Diferencia con el consenso: EBITDA +0,3/−2,3/−1,6 % en 2026-28.
- WACC 7,97 %: bono danés 3,1 % (agosto), beta 1,20 (STOXX 600: 1,35 mensual, 1,16 semanal, 1,23/1,11 ajustadas; OMXC25 1,36 sesgada por Novo; sectorial 0,98 mide frente al sector), prima 5,5 %, deuda 4,0 % y 26 %. Terminal 2,25 %. Sin etapa 2 (ROIC con fondo de comercio ≈8,2 % después de impuestos).
- Resultado: DCF 1.423,39 (+25,1 %); escenarios 856,02 / 1.423,39 / 1.795,15 (25/50/25); comparables 1.100,28; objetivo 1.357,81 (+19,4 %), RT 20,0 %, asimetría 2,34x → Comprar por las dos reglas (relativa: 1.747,71, +54,3 %). DCF inverso: crecimiento 0,4 % (base 3,2 %), margen 12,9 % (base 14,5 %), rentabilidad implícita 9,0 %. **Comprar, convicción media**: las cifras coinciden con el consenso y la diferencia es de tasa, pero hay catalizadores con fecha (21-oct 3T26, feb-2027 guía).
- Controles: 13 correctos y 11 explicados, ninguno en «Revisar». 79 fuentes (48 primarias), todas citadas. Cobertura 89,7 %, 27 gráficos, 57 páginas. Word y PDF en la carpeta; revisadas como imagen las páginas 1-4 (corregidas tres frases: conversión repetida, «Panalpina» por «el plan inicial» y el contrato de Amazon sin afirmar que DSV lo perdiera).

## Revisión de comité (resumen)
1. Convergencia: el precio descuenta crecimiento casi nulo; si la guía de 2027 confirma ≈28.000 M de EBIT, el 9,0 % implícito no se sostiene. Comprar sale de las dos reglas.
2. DCF inverso conservador frente a la historia (margen 12,9 % frente a 13,1-15,3 % en 2023-24): dicho en la síntesis.
3. Supuesto más agresivo: conversión del 40,5 % en 2030 con un grupo de doble tamaño (precedente: 40,4 % en 2023, 43,1 % en 2021 tras Panalpina).
4. Consenso: dentro del 2,5 %.
5. Comparables frágiles (dos modelos, NIIF frente a US GAAP): 15 % de peso y lectura por PER.
8. Bajista verosímil: integración fallida + caída de fletes como 2023; −24,7 %.
9. Dato crítico: la beta (1,20 frente a 1,36: el DCF cae por debajo de 1.276,02) y la conversión de Road del 3T26.

## Fallos del sistema
1. **El coordinador creía a medias a B, C y D, que habían terminado.** El corte cayó justo después de sus avisos de cierre. Arreglo: que cada subagente escriba al final de su nota un campo `estado: "terminado"` (o que `integrar.mjs` liste por nota los campos con contenido) para que quien reanude lo vea sin leer transcripciones.
2. **La web de inversores de DSV (investor.dsv.com y dsv.gcs-web.com) no responde a ninguna herramienta.** Se salvó con GlobeNewswire, MFN e inderes (`--lista`). Arreglo: añadirlo a `lecciones.md` («Dinamarca: anuncios en mfn.se/all/a/<empresa> y GlobeNewswire; la web de inversores puede no responder»). El rating quedó sin fuente primaria: añadir a lecciones que S&P y Moody's no publican gratis y que las notas de rating suelen estar en la web de inversores.
3. **Las búsquedas web compartidas se agotaron** (A dejó el rating sin buscar). Arreglo: reservar 3-5 búsquedas al coordinador o decir en el encargo cuántas tiene cada subagente.
4. **`bolsa.mjs` descarta el cierre del día cuando falta en el índice o en el ETF** (Xetra frente a Copenhague): el precio del 7-oct estaba en Yahoo y la herramienta usaba el 6-oct. Arreglo: que la herramienta tome el último cierre de la acción aunque los índices vayan un día por detrás y lo diga.
5. **Partidas especiales recurrentes** (DSV): el control «EBIT + resultado financiero = BAI» salta en seis años y hay que explicarlo a mano. Arreglo: campo `partidas_especiales` en la cuenta que el control sume y que el DCF pueda tratar como coste de caja con fecha final.
6. **La asimetría con la prima del mercado sale en 136,78x** cuando el bajista relativo queda casi en el precio (1.128 frente a 1.137,5): es un cociente sin sentido que se imprime en «La decisión». Arreglo: limitarla (por ejemplo, «> 10x») cuando la pérdida bajista es menor del 2 %.
7. **El motor no sabe modelar margen bruto × conversión** (transitarios): los supuestos se construyen en `supuestos.mjs` y se traducen a crecimiento y margen EBITDA de ingresos. Arreglo: modo `dcf.base: "margen_bruto"` con `margen_bruto_pct` y `conversion_pct` por año.
8. **La conversión a PDF tardó más de 5 minutos la segunda vez** (la herramienta se pasó a segundo plano y terminó bien). Arreglo: subir el tiempo de espera en el procedimiento o lanzarla siempre en segundo plano.
- Fin: 09:27 del 8-oct. Tiempo ≈ 28 min el 7-oct (18:05-18:33) + 58 min el 8-oct (08:29-09:27) ≈ 86 min, con el corte por límite de uso entre medias.
