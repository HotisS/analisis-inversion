// Textos del analista reescritos el 21-oct-2026 tras el 3T26 y el repaso con fuentes primarias (sustituyen a los de textos.mjs del 14-oct).
// Citas con la letra de la nota: [A21] = fuente 21 de A.json (estado del 3T26).
export const limitaciones = `Se valora la acción de Xetra (DB1) en euros con el cierre del 20-oct-2026 (308,90 EUR), anterior a los resultados del 3T26, publicados ese día tras el cierre; el 21-oct abrió con caídas de hasta el 4,3 % y a las 10:00 cotizaba a 305,5 EUR [D1, D4]. Las cuentas de 2017-2025 salen de los informes anuales (no hay XBRL en el repositorio ESEF); 2016 solo hasta el EBIT [A15-A20]. Ingresos = ingresos netos del grupo **con** resultado de tesorería, como los publica la empresa. El balance publicado (≈ 409.000 M) incluye la cámara y los saldos de clientes: el análisis usa un balance analítico sin ellos y no trata como caja libre los ≈ 3.900 M de fondos propios ligados al negocio bancario [A]. El estado del 3T26 solo da un balance resumido: la deuda (8.819 M con 1.932 M de pagarés de Clearstream) y la caja libre (3.820 M) del puente a 30-sep son estimaciones [D]. Acciones: 180,5 M (en circulación tras la recompra más planes; el convertible está fuera de dinero). No incluye Allfunds (≈ 5.300 M, cierre previsto en el 1S27). Bund a 10 años del Bundesbank (20-oct) [D7].`;

export const dcf_justificacion = {
  crecimiento: `2026e (+8,7 %, ≈ 6.550 M) es fijo: 4.888 M en nueve meses y una guía subida por segunda vez a más de 6.500 M (ingresos sin tesorería de ≈ 5.700 M «con posibilidad de superarlos ligeramente» y tesorería de más de 800 M) [A21, A22]. 2027e (+5,0 %) y 2028e (+7,0 %) suponen que la parte sin tesorería crece un 7 % al año, por debajo del +12 % de 2026 (tres cuartas partes estructural, según la empresa), y que la tesorería se queda en ≈ 800 M con el depósito del BCE al 2,5 % [B7, B17]: quedan en línea con el consenso (6.895 M y 7.402 M) [D3]. Después baja del 6 % al 4 %. No incluye Allfunds.`,
  margenes: `Margen EBITDA del 59,6 % en 2026e (guía de ≈ 3.900 M) y del 61,5 % en 2028e, por el apalancamiento operativo de la parte sin tesorería: su EBITDA crece un 19 % en el 3T26 con ingresos +14 % [A21]. El consenso está en el 60,7 % y el 62,1 % en 2027e y 2028e [D3]. El segmento de software e índices (IMS) es el lastre: su EBITDA cae un 24 % en el 3T26 [A21].`,
  inversion: `Capex del 6 % de los ingresos (5,9 % en 2025), hasta el 6,5 % al final, igual a la amortización, que baja del 8 % al 6,5 % al terminarse la de los intangibles de SimCorp [A15]. Circulante en el 6,9 % de las ventas, el de 2025, sin contar los saldos de clientes.`,
  wacc: `Tasa libre del 3,48 %, el Bund a 10 años del 20-oct-2026 (Bundesbank) [D7]. Beta de 0,85: las medidas son muy bajas (0,38 mensual a cinco años, 0,41 semanal a dos, 0,58 ajustada) porque la acción sube cuando el mercado cae (volatilidad, tipos), y no las tomamos como riesgo real del negocio; 0,85 es la de una bolsa con ingresos recurrentes y ciclo de tipos [D6]. Prima de mercado del 5,5 %; coste de la deuda del 3,9 % y un 9 % de deuda [D]. WACC del 7,68 %; con la prima implícita del mercado (4,2 %), del 6,68 %.`,
  terminal: `Gordon con un 2,3 % (inflación del euro del 2 % y algo de crecimiento real; por debajo de la tasa libre menos medio punto). El valor terminal es el 73 % del valor y equivale a 12,5 veces el EBITDA, por debajo de los 14,8 de hoy.`,
};

export const puente_comentarios = {
  '2026e': 'Volumen: derivados de tipos (+48 % en el 3T26), custodia de fondos (+24 %) y negociación [B7]; precio: tarifas, índices y SaaS; otros: la tesorería baja poco (más de 800 M frente a 837 M de 2025, porque los saldos de clientes compensan en parte los tipos) [A21].',
  '2027e': 'Volumen y SaaS de SimCorp; la tesorería se estabiliza en ≈ 800 M y resta medio punto frente a 2026.',
  '2028e': 'Crecimiento estructural sin efecto de tesorería.',
};

export const sostenibilidad_justificacion = `Prueba a mano: la reinversión neta es casi nula (amortización de intangibles comprados por encima del capex), así que el motor no puede medir el crecimiento financiable. El 5,4 % medio proyectado está por debajo del crecimiento sin tesorería de los últimos años (+9 % en 2025 y +12 % en nueve meses de 2026, tres cuartas partes estructural según la empresa) [A1, A21] y se apoya en volumen (efectos de red de Eurex y Clearstream) y en precios (índices y software con costes de cambio altos). El ROIC del 12,9 % (24,9 % sin fondo de comercio) frente al 7,68 % de WACC da margen. El riesgo está en la tesorería y en IMS, no en la capacidad del negocio.`;

export const dcf_lectura = `El DCF da 299,50 EUR por acción, un 3,0 % por debajo del precio, con un rango de 253,61-366,18 EUR al mover WACC y crecimiento terminal medio punto, y el 73 % del valor en el terminal. El DCF inverso dice que el precio descuenta un crecimiento del 6,0 % anual en 2027e-2032e, frente al 5,4 % de nuestro caso base, o un margen del 63,1 % frente al 61,5 %: lo que esperamos, un poco más. La rentabilidad implícita es del 7,5 %, casi igual al WACC. Con la prima implícita del mercado (4,2 %) el DCF sube a 375,48 EUR: la conclusión depende de la tasa. Frente al 14-oct, el DCF baja de 334,87 a 299,50 EUR pese a la tesorería mayor porque el Bund ha subido del 2,95 % (dato de junio) al 3,48 %.`;

export const narrativas = {
  Bajista: 'El BCE vuelve a bajar el depósito hacia el 1,5 % y la tesorería cae a la mitad; la volatilidad se normaliza y Eurex negocia menos (como en 2017-2019); IMS sigue perdiendo margen. Crecimiento 2,5 puntos menor y margen 2,5 puntos menor.',
  Base: 'Guía de 2026 cumplida; la parte sin tesorería crece un 7 % y la tesorería se queda en ≈ 800 M.',
  Alcista: 'Tipos estables, volatilidad alta y SimCorp acelera en la nube: crecimiento 1,5 puntos mayor y margen 1 punto mayor.',
};

export const escenarios_comentario = `Asimetría pobre: el alcista vale 330,78 EUR (+7,1 %) y el bajista 237,24 EUR (−23,2 %), 0,31 veces. El bajista es verosímil (tipos más bajos y menos volatilidad ya ocurrieron en 2015-2019) aunque no rompe la tesis: el negocio sigue creciendo. Tras subir un 20 % en tres meses, el precio ya recoge el caso base.`;

export const suma_partes_comentario = 'No aplica: los cuatro segmentos comparten clientes, tecnología y balance, y solo hay ingresos y EBITDA por segmento de 2024-2025 con el perímetro actual [B3].';

export const valoracion_comentario = `Pesamos el DCF (50 %), los comparables (30 %) y los escenarios (20 %). Los comparables son fiables para la parte de bolsa y datos; el DCF recoge mejor el riesgo de la tesorería. No usamos transacciones (prima de control) ni suma de partes. El DCF da 299,50 EUR, los comparables 350,65 (mediana de 17,3 veces el EBITDA y 24,8 veces el beneficio de los próximos 12 meses) y los escenarios 291,76: valor objetivo de 313,30 EUR (+1,4 %); con la prima del mercado, 365,92 EUR. Puente a 30-sep estimado: deuda de 8.819 M (bonos y pagarés), caja libre de 3.820 M, arrendamientos de 523 M, minoritarios de 402 M y 478 M de asociadas y participaciones [D].`;

export const rentabilidad = {
  comentario: `El ROIC de 2025 es del 12,9 % frente a un WACC del 7,68 %: crea valor, aunque menos que antes de SimCorp, que añadió fondo de comercio (48 % del capital invertido); sin él, el ROIC es del 24,9 % [A15]. El ROE es del 18,1 % y el ROIC incremental de los últimos años, del 11,3 %. El ROIC depende en parte de los tipos: la tesorería aportó 837 M de ingresos en 2025, el 14 % del total [B3].`,
  confianza: 'Media',
};

export const catalizadores = {
  items: [
    { fecha: 'Oct-nov de 2026', evento: 'Revisiones del consenso tras el 3T26', efecto: 'Suben la tesorería de 2026; el objetivo medio (304,64 EUR) ya está por debajo del precio [D].', probabilidad: 'Alta', sentido: '+/−' },
    { fecha: '10-feb-2027', evento: 'Resultados de 2026 y guía de 2027', efecto: 'La guía de tesorería de 2027 dirá si los 800 M se mantienen con el BCE al 2,5 % [D].', probabilidad: 'Alta', sentido: '+/−' },
    { fecha: '1S27', evento: 'Cierre de la compra de Allfunds (≈ 5.300 M)', efecto: '≈ 3.600 M de caja y ≈ 7,3 M de acciones nuevas; revisión de competencia [A6, D].', probabilidad: 'Media', sentido: '+/−' },
    { fecha: '2026-2027', evento: 'Investigación de la Comisión Europea sobre la antigua cooperación Eurex-Nasdaq', efecto: 'Posible multa no estimada por la empresa [C].', probabilidad: 'Media', sentido: '−' },
    { fecha: '2026-2027', evento: 'Caso Peterson II: posible orden de entrega de ≈ 1.700 M USD iraníes custodiados en Clearstream', efecto: 'Riesgo legal y de reputación; sin provisión [A21, B].', probabilidad: 'Media', sentido: '−' },
    { fecha: 'Octubre de 2027', evento: 'Paso a la liquidación T+1 en Europa', efecto: 'Menos saldos y menos tesorería en Clearstream; más negocio de gestión de colaterales.', probabilidad: 'Alta', sentido: '+/−' },
  ],
  confianza: 'Media',
};

export const riesgos = {
  items: [
    { riesgo: 'El BCE vuelve a bajar tipos', tipo: 'Mercado', probabilidad: 'Media', impacto: 'Alto', efecto_valor: 'Escenario bajista: 237,24 EUR (−21 % sobre el valor base)', mitigante: 'La parte sin tesorería crece un 12 % y es el 87 % de los ingresos', senal: 'Depósito del BCE por debajo del 2 % o guía de tesorería de 2027 por debajo de 700 M' },
    { riesgo: 'Allfunds: sobreprecio o bloqueo de competencia', tipo: 'Asignación de capital', probabilidad: 'Media', impacto: 'Medio', efecto_valor: '−3 a −5 % si destruye valor (estimación propia)', mitigante: 'Pagos en acciones y en caja repartidos; sinergias de custodia de fondos', senal: 'Fase II de la Comisión Europea o deterioros' },
    { riesgo: 'Debilidad de IMS (SimCorp, ISS STOXX)', tipo: 'Operativo', probabilidad: 'Media', impacto: 'Medio', efecto_valor: '−3 % por cada punto de margen EBITDA del grupo (≈ 290 EUR)', mitigante: 'ARR de SimCorp creciendo al 13 % [B7]', senal: 'Otro trimestre con el EBITDA de IMS a la baja' },
    { riesgo: 'Litigios y sanciones (Peterson II, Comisión Europea, cum-ex, SEC contra ISS)', tipo: 'Legal', probabilidad: 'Media', impacto: 'Medio', efecto_valor: 'No cuantificable; sin provisiones', mitigante: 'Balance AA− (S&P) [A10]', senal: 'Orden de entrega en Peterson II o pliego de cargos de Bruselas' },
    { riesgo: 'Valoración: el precio está en máximos', tipo: 'Valoración', probabilidad: 'Media', impacto: 'Medio', efecto_valor: 'A la mediana de su PER adelantado (17,6x) valdría ≈ 244 EUR (13,87 × 17,6)', mitigante: 'Crecimiento sin tesorería de dos dígitos', senal: 'PER de los próximos 12 meses por encima de 25 veces' },
    { riesgo: 'Tipos largos más altos', tipo: 'Valoración', probabilidad: 'Media', impacto: 'Medio', efecto_valor: 'Medio punto más de WACC baja el DCF a 271,44 EUR (−9 %)', mitigante: 'Más tipos también suben la tesorería', senal: 'Bund a 10 años por encima del 3,75 %' },
  ],
  premortem: `Octubre de 2029: la acción ha perdido un 35 %. El BCE bajó el depósito al 1,5 % en 2027 y el resultado de tesorería cayó a la mitad; la volatilidad se normalizó y Eurex negoció menos. Allfunds se cerró con concesiones y sus márgenes siguieron bajando con la presión de las gestoras; IMS no recuperó el margen. El mercado dejó de pagar 22 veces por un BPA que crecía a un dígito bajo y el PER volvió a 17 veces, su mediana. Las señales eran visibles: el EBITDA de IMS cayendo en 2026, la guía de tesorería de 2027 y la subida del 20 % en tres meses antes de los resultados.`,
  confianza: 'Media',
};

export const preguntas = {
  items: [
    { tema: 'Tesorería', pregunta: '¿Qué resultado de tesorería esperan en 2027 con el depósito al 2,5 % y con qué saldos medios?', por_que: 'Es el 13 % de los ingresos y el mayor riesgo del caso base.' },
    { tema: 'IMS', pregunta: '¿Por qué cae el EBITDA de IMS (−24 % en el 3T26) si el ARR de SimCorp crece un 13 %?', por_que: 'Es el negocio que justificó la compra de SimCorp.' },
    { tema: 'Allfunds', pregunta: '¿Qué ROIC esperan de Allfunds en el tercer año y qué concesiones aceptarían ante Bruselas?', por_que: 'Es la mayor compra de su historia.' },
    { tema: 'Caja', pregunta: '¿Cuánta caja propia libre tiene el grupo fuera de los requisitos regulatorios de Clearstream y Eurex Clearing?', por_que: 'Cambia el puente: el estado trimestral no la publica.' },
    { tema: 'Recompras', pregunta: '¿Seguirá la recompra anual (500 M en 2026) tras Allfunds?', por_que: 'Es parte de la rentabilidad para el accionista.' },
    { tema: 'Accionistas', pregunta: '¿Qué busca TCI con su 6,43 % (5 % en permutas)?', por_que: 'Fue el fondo que forzó la salida del consejero delegado en 2005 [C].' },
  ],
  confianza: 'Media',
};
