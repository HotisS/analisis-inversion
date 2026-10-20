# Diario: Nebius Group (growth, 20-oct-2026)

- Sin informe previo de Nebius en informes/ ni en informes-growth/; no está en exclusiones ni en cola-growth.md (comprobado). `git pull` hecho.
- Precio: cierre del lunes 19-oct-2026, 170,24 USD en el Nasdaq (Yahoo vía movimiento.mjs, leído a las 06:45 UTC del 20-oct; StockAnalysis da la misma capitalización a ese cierre).
- Cuentas: SEC. Nebius es emisor extranjero (20-F y 6-K, sin 10-Q); el XBRL de companyfacts solo trae años y mezcla RUB y USD hasta 2023: las cifras trimestrales salen de los 6-K de resultados (3T25, 4T25, 1T26, 2T26; y 2T25 y 1T25 para los crecimientos). Los textos de las presentaciones se bajaron y se leyeron fuera del repo (pesan varios MB).
- Acciones (345,4 M): 271,9 M a 30-jun + 15,8 M del canje de agosto + 21,07 M de warrants prefinanciados de NVIDIA + convertibles en dinero de 2025 (3,9 + 22,8 M) + ~10 M de planes. Comprobación: el 13G/A de Goldman (5,1 % = 13,02 M) implica ~255 M de clase A a 30-sep, que cuadra con 238,4 + 15,8. StockAnalysis da 274,1 M (probablemente sin el canje): no se usa.
- Deuda: convertibles fuera de dinero (mar-2026 a 180-183 USD y ago-2026 a 313-325 USD) a valor original, no al de vencimiento con acreción (120 %): si se usara el de vencimiento la deuda subiría ~870 M y el precio objetivo bajaría ~2,5 USD; no cambia la señal.
- Margen bruto: se usa el económico (con amortizaciones de GPU, 18,9 %), no el «coste de ventas» GAAP sin amortizaciones (74,3 %). Variante con 74,3 %: puntuación 64,8, EV/beneficio bruto 10,8, señal igual (Vender), compra hasta igual (26,20).
- Ventas del analista (13.000 M base) ancladas en la cartera contratada (36 % de 37.490,6 M en 24 meses = 13.500 M). El motor usa la mecánica (3.274 M) por el tope del 60 %; robustez marca G3 por la diferencia. Contraste a mano sin tope (no decide): ponderada +14,6 %, base +5,5 %, bajista −57,6 %; EV/BB 42,5 > 35 → seguiría sin comprar; pasaría ambos filtros por debajo de ~142 USD.
- La alerta de v11 «mecánica < 0,85 × analista» no saltó, aunque la mecánica es el 25 % de la del analista: conviene revisar por qué (¿solo en versiones candidatas?).
- Múltiplos históricos: cálculo propio (notas/multiplos.txt) con precios diarios de Yahoo, ventas reales de los 4 trimestres siguientes y consenso para los futuros; acciones y caja neta aproximadas por tramos. Comparables (CoreWeave, IREN ~5-6 veces): DE MEMORIA, sin fuente del día; solo pesan en el alcista.
- Ventas de directivos: 46 formularios 4 de 12 meses leídos y sumados: ~423 M de ventas (planes 10b5-1 y retenciones de impuestos), 0,05 M de compras.
- Foros: StockTwits sí (API pública); Reddit no accesible desde la nube; Rankia sin hilo encontrado.
- Fecha de resultados del 3T26 sin confirmar: Nasdaq y FactSet dan el 22-oct; otros el 10-nov. Se apunta el 22-oct.

## Lecciones (para quien integre)
- Empresas con ventas de más del +100 % y cartera contratada que lo respalda: la regla v11 (tope del 60 %) da un −76 % que es sobre todo efecto de la regla; la propuesta pendiente de la tanda 10 (doble castigo con crecimientos de más del 60 %) aplica de lleno. Aun así, aquí no cambia la señal: los filtros de EV/beneficio bruto y del bajista también la dejan fuera.
- En nubes de GPU, el margen bruto publicado excluye la amortización de las GPU: usar el económico o el filtro de 35 veces el beneficio bruto no filtra nada.

## Resultado
- Motor v11: 60,8/100, 5/8 señales, ponderada −74,7 %, base −76,0 %, bajista −92,3 %, alcista −54,5 % → Vender / no comprar; compra hasta 26,20 USD; EV/beneficio bruto NTM 42,5. Alerta: dos clientes 47 %.
- robustez-growth --precios: SÓLIDA, señal robusta Vender (v11, v7, pesos 25/50/25 y 35/50/15, precio de hoy).
- Regla 13: veredicto global «no cambia» (caída de octubre de sector, sin noticia propia ni colocación anunciada).
