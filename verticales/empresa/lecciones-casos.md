# Lecciones por sector y caso contable (anexo de `lecciones.md`)

No se lee entero: busca con `grep -n -i` la palabra del caso (arrendamiento, anticipos, flotante, nube, escisión, doble clase, participadas, regulada, comisiones, minoritarios…).

## Arrendamientos, capex y circulante
- **NIIF 16 en distribución** (Inditex): sin las altas de derechos de uso en el capex, el DCF daba 54,48 EUR en vez de 42,80. Es la regla que más valor mueve en negocios con muchos locales.
- **Sistemas cedidos en arrendamiento** (Intuitive: 809 M USD traspasados de existencias a inmovilizado, fuera del capex): súmalos al capex o el DCF sube más de un 8 %.
- **Contratistas** (CAF, Indra, Technip Energies): el circulante incluye activos y pasivos por contrato (`balance.historico[].activos_contrato` y `pasivos_contrato`; sin ellos, CAF salía con 405 M de circulante frente a 87 M). El circulante se come caja al crecer: el motor avisa si el DCF proyecta mucha más caja que la histórica. Anticipos: déjalos en el circulante, proyecta que su peso baje y lleva a `otros_ajustes` solo la subida del semestre del puente; da aparte la «caja asociada a proyectos». Anticipos y préstamos públicos (Indra): decide con la regla del puente y di el efecto por acción.
- **Puente de junio con anticipos estacionales**: el primer año del DCF va con `fraccion` (~0,22 en octubre) y la caja del puente no ve julio-octubre; dilo si los anticipos se mueven mucho.
- **Licencias y amortizaciones grandes** (Almirall: ~130 M anuales fuera del EBITDA): EV/EBITDA sobrevalora frente al PER; usa EV/EBIT o EV/(EBITDA − capex). El motor avisa si se separan más de un 50 %.
- **Compradores en serie** (Constellation, DSV, Rentokil): el crecimiento comprado va en el DCF con su coste (capex = compras ≈ 1,3 veces las ventas compradas + capex propio + derechos de uso; la amortización de intangibles converge al capex). Va en `otros_pct`, pero el «crecimiento medio proyectado» lo incluye (DSV: 4,9 % frente a 3,2 % orgánico) y el DCF no resta el gasto en compras: dilo.
- **Margen que mejora** (CAF, Tomra): el control del capital nuevo salta por el margen, no por el crecimiento.

## Software, nube y nóminas
- **Pasivos de contrato en el circulante** (SAP): sin ellos salía un 14,2 % de las ventas en vez del −4,1 % y el DCF metía 8.000 M de caja falsa el primer año.
- **Comisiones activadas (NIIF 15)** (ATOSS +0,5 puntos de ventas; Paychex 1,4 %, ~2 USD por acción): su aumento no pasa por el EBITDA ni por el circulante; súmalo al capex. Comprueba si su amortización va en amortizaciones o en gastos de venta.
- **Facturación anual en enero y puente de junio-julio** (ATOSS, Salesforce): compara los pasivos de contrato del puente con los del cierre; la diferencia es caja estacional que se consume. Suma las variaciones de circulante del semestre y lleva a `otros_ajustes` la parte que revierte.
- **«Caja» frente a liquidez publicada** (ATOSS: depósitos y oro fuera de «efectivo»): la deuda neta histórica del motor sale menor; el puente sí debe incluirlos.
- **Fondos de clientes de nóminas** (Paychex, ADP): basta con poner en `caja` la caja corporativa; fondos y obligaciones quedan fuera del circulante. El neto en el puente es pequeño y se deja fuera.
- **Recompra acelerada pendiente** (Salesforce): acciones de portada menos las que faltan por entregar, o las de portada con el contrato a plazo como activo en el puente. Dilo en limitaciones.
- **Streaming** (Netflix): la amortización de contenidos queda dentro del margen y al capex va solo el exceso de pagos sobre amortización.

## Flotante y fondos de terceros
- **Vales de comida** (Pluxee, Edenred): con la visión operativa limpia también el balance histórico (caja propia y cuentas a cobrar sin el flotante); si no, el circulante salía en +72 % de las ventas y el ROIC en −33 %. Falta un campo de flotante en el motor.
- **Procesadores de pagos** (Adyen): caja propia = caja − pasivos con comerciantes + cobros pendientes. Los intereses del flotante mueven ~4 % del valor: decide si el DCF los recoge y ajústalo en `otros_ajustes`. El PER del consenso los incluye.
- **Juego con fondos de clientes** (Betsson; el usuario ya no quiere juego): saldos de jugadores fuera del circulante, como deuda en el puente.
- **Aseguradoras de salud** (UnitedHealth): caja libre = la «no regulada» del apartado Liquidity del 10-K/10-Q; si el EBITDA incluye el rendimiento de las inversiones reguladas, la caja del puente es solo esa. Los EV de Stock Analysis de los comparables restan la caja regulada: usa solo su PER. Reservas médicas y cobros anticipados, fuera del circulante comercial.

## Reguladas y participadas
- **Reguladas** (Enagás): `valoracion.rab` para EV/RAB; la retribución regulada se traduce a crecimiento y margen del DCF en un script propio. La RAB no siempre se publica a la fecha del balance: usa la del plan o la del regulador y dilo. Las operaciones del sector se publican como EV/RAB.
- **Participadas dentro del EBITDA** (Enagás, Redeia): `participadas_en_ebitda`; se valoran en el puente. **Fuera del EBIT** (Fanuc, sociedades chinas al 50 %): a valor contable se perdían ~148 JPY por acción; valóralas por múltiplo de beneficio.
- **Participaciones con plusvalías latentes enormes** (Amazon en Anthropic y OpenAI): el puente las suma a valor contable; resta el impuesto latente en `otros_ajustes`. El ROIC del motor las mete en el capital invertido: explícalo.
- **Minoritarios rescatables** (CME en S&P DJI): a valor razonable fuera del pasivo; a mercado valen más. Decídelo explícitamente (~3 % del valor). Minoritarios de una filial cotizada (Diageo-United Spirits): a mercado.
- **Impuestos aplazados por traslados de propiedad intelectual** (Coloplast-Kerecis): asimilables a deuda en el puente.
- **Asociadas en el EBITDA de MarketScreener** (Diageo-Moët Hennessy); caja pendiente de una reestructuración que el DCF excluye, en `otros_ajustes`.

## Suma de partes
- Una parte por DCF o rNPV: `valor_metrica: "dcf"` o `ev_directo` con el valor ya calculado. El motor avisa de las partes sin valor.
- **Costes centrales sin asignar** (CSL, −2.143 M): una parte negativa al múltiplo medio; si no, sale inflada un 30-40 %.

## Escisiones y perímetro
- **Escisión reciente** (S&P Global y Mobility): el 8-K/A trae pro forma de tres años y balance pro forma; declara `cambios_perimetro`. El ROIC de los años con la escindida no es del todo comparable. Si el balance es del día anterior a la escisión, resta en el puente la deuda que se llevó.
- **Yahoo trata una escisión como un desdoblamiento** (SPGI, factor 1,057): multiplica los cierres anteriores por el factor para recuperar el precio real.
- **Menos de tres ejercicios cotizados**: el motor omite `multiplos_historicos`; regístralo sin buscar más.

## Gobierno y capital
- **Control familiar**: el voto lo decide el accionista de control; calcula el voto en contra sobre el capital libre presente (`voto_remuneracion_contra_libre_pct`) y marca `presidente_vinculado_control` si preside alguien de su entorno.
- **Doble clase** (Grifols, Puig A/B; On A + B/10): cuenta las B como equivalentes de A a su precio relativo y calcula siempre el voto libre en contra.
- **Presidente ejecutivo** (Vertiv): que presidente y primer ejecutivo sean dos personas no basta; `presidente_ejecutivo`.
- **Patrimonio negativo por recompras** (Verisk): ROE sin sentido y ROIC incremental sin calcular; si el ROIC sube por rotación y no por margen, dilo.
- **CRO con anticipos y recompras** (Medpace): capital invertido cerca de cero y ROIC en cientos por cien; usa los años con capital apreciable.

## Litigios y ajustes del puente
- **Litigios de compras con cumplimiento forzoso** (Verisk-AccuLynx): el coste es el sobreprecio esperado, no el precio de compra; va en `otros_ajustes`, explicado (movió la recomendación).
- **EBITDA ajustado que no excluye la remuneración en acciones** (Verisk): `base_ebitda: "NIIF"` vale si lo puntual va en `no_recurrentes_en_ebitda`, también en el LTM.
- **Base mixta de MarketScreener** (Coloplast: EBITDA antes de especiales, BPA después del deterioro): usa el BPA ajustado de Stock Analysis para el PER.
- **Plusvalías de valor razonable en gastos operativos** (Pro Medicus: 174,2 M, el 66 % del beneficio): `no_recurrentes_en_ebitda` y beneficio subyacente en el LTM; el BPA de MarketScreener las incluye.

## Sectores sueltos
- **Semiconductores**: SEMI da 403.

## Casos de la 6ª hora (14-oct-2026)
- **Ticker cambiado** (Marsh McLennan MMC → MRSH el 14-ene-2026): `cuentas.mjs` y `form4.mjs` con el CIK; `simbolos.json` y `precios.mjs` con el ticker nuevo.
- **Clases de acciones** (Lindt LISN = 10 LISP; Epiroc A/B): precio, número de acciones y BPA en la misma unidad; dejar la equivalencia en `identificacion`.
- **Bolsas con cámara de compensación** (Euronext, Deutsche Börse, LSEG): el XBRL da como ingresos solo los de contratos con clientes (faltan los de tesorería) y la deuda a corto va aparte; corregir las dos cosas a mano. **Participadas cotizadas con minoritarios grandes** (Tradeweb en LSEG, ≈43 % económico): pedir el porcentaje económico en la nota A.
- **Compradores en serie** (Diploma, Halma, Roper): el BPA estatutario resta la amortización de lo comprado y queda ≈28 % por debajo del ajustado del consenso; vale, pero historia del PER y PER actual en la misma base. ROIC publicado (con fondo de comercio) es la cifra correcta para ellos; para una compra única y grande (Refinitiv en LSEG, Borsa Italiana en Euronext) el ROIC sin fondo de comercio dice más del negocio (pendiente de regla, `METODO-VIGENTE.md`).
- **Deuda asimilada fuera del XBRL** (factoring y confirming: Sartorius Stedim 307,8 M): pedirla en la nota A como dato del puente. **Deterioros grandes** (Symrise 2025: 299 M; BPA publicado 1,78 frente a 3,67 ajustado): el crecimiento del BPA parece del 36 % anual y es falso; usar el BPA normalizado en la historia y en el contraste de robustez.
- **Beneficio de pico en energía** (Marathon, TotalEnergies, Eni, Equinor, Galp, Cheniere; 15-oct-2026): el BPA de 2028 con la curva de futuros (Brent, TTF) y el PER histórico sin los años de pico ni de valle; en cotizadas en EUR que publican en USD, pasar los cierres de cada año a USD antes de la historia del PER. Generadoras y GNL con coberturas o contratos a mercado (Vistra, Cheniere): BPA ajustado propio, el GAAP no sirve.
- **Fallos de `cuentas.mjs` vistos el 15-oct-2026**: ejercicio de 52/53 semanas que cierra a primeros de enero sale con el año siguiente (Exelixis); con XBRL de la SEC, EBIT y EBITDA a null desde 2020 y deuda incompleta (Eaton, Vistra) y amortización de intangibles fuera del EBITDA (Halozyme); mezcla DKK y USD cuando cambia la moneda de presentación (Genmab); `--esef` con nombre corto trae otra empresa: usar el LEI (Eni BUCRF72VH5RBN7X3VL35); sin emisores alemanes en filings.xbrl.org (GEA: Excel de la empresa). Equinor: impuesto real 70-80 %, el motor lo limita al 40 % e infla el ROIC.
