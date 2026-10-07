// Genera verticales/empresa/ejemplo.json: una empresa FICTICIA con cifras coherentes entre sí
// (las cuentas cuadran, los segmentos suman, el balance casa), para probar plantilla y motor.
//
//   node construccion/generar-ejemplo-empresa.mjs

import { writeFileSync } from 'node:fs';

const r = (x, d = 0) => Math.round(x * 10 ** d) / 10 ** d;
const anios = [2016, 2017, 2018, 2019, 2020, 2021, 2022, 2023, 2024, 2025];
const crec = { 2017: 5.8, 2018: 6.4, 2019: 4.9, 2020: -7.5, 2021: 11.8, 2022: 9.1, 2023: 6.2, 2024: 4.8, 2025: 5.1 };
const mEbitda = { 2016: 14.1, 2017: 14.4, 2018: 14.2, 2019: 14.6, 2020: 12.9, 2021: 14.3, 2022: 13.6, 2023: 14.9, 2024: 15.4, 2025: 15.9 };
const acciones = { 2016: 168, 2017: 168, 2018: 167.5, 2019: 167, 2020: 167, 2021: 166, 2022: 166, 2023: 164, 2024: 162, 2025: 160 };

// ── Cuenta de resultados ──
let ingresos = 1900;
const cuenta = anios.map((a) => {
  if (crec[a]) ingresos *= 1 + crec[a] / 100;
  const ing = r(ingresos);
  const coste = r(ing * (0.69 - (mEbitda[a] - 14) / 200));
  const ebitda = r((ing * mEbitda[a]) / 100);
  const am = r(ing * 0.043);
  const ebit = ebitda - am;
  const rf = -r(ing * 0.009);
  const bai = ebit + rf;
  const imp = r(bai * 0.245);
  const mino = r(bai * 0.012);
  const bn = bai - imp - mino;
  return {
    periodo: String(a), ingresos: ing, coste_ventas: coste, gastos_generales: r(ing - coste - ebitda), ebitda, amortizaciones: am, ebit,
    resultado_financiero: rf, bai, impuestos: imp, minoritarios: mino, beneficio_neto: bn, gastos_financieros: r(-rf * 0.85), participadas_en_ebitda: null, bpa: r(bn / acciones[a], 2), dpa: r((bn / acciones[a]) * 0.44, 2), dpa_extraordinario: 0, acciones_diluidas: acciones[a],
  };
});
const C = Object.fromEntries(cuenta.map((c) => [c.periodo, c]));

// ── Balance (2019-2025) ──
const anB = [2019, 2020, 2021, 2022, 2023, 2024, 2025];
const deudaFin = { 2019: 640, 2020: 690, 2021: 720, 2022: 760, 2023: 700, 2024: 640, 2025: 600 };
let pn = 1180;
const balance = anB.map((a) => {
  const c = C[a];
  pn += a === 2019 ? 0 : c.beneficio_neto - c.dpa * c.acciones_diluidas - (a >= 2023 ? 30 : 0);
  const existencias = r(c.coste_ventas * 0.21), clientes = r(c.ingresos * 0.17), proveedores = r(c.coste_ventas * 0.16);
  const caja = r(c.ingresos * 0.07 + (a === 2020 ? 90 : 0));
  const arr = r(c.ingresos * 0.034);
  const fondo = a >= 2022 ? 520 : 430, intang = r(150 + (a - 2019) * 6);
  const inmov = r(c.ingresos * 0.33);
  const activoCorriente = existencias + clientes + caja + r(c.ingresos * 0.03);
  const activoTotal = r(activoCorriente + fondo + intang + inmov + arr * 0.95 + r(c.ingresos * 0.04));
  const minoritarios = r(30 + (a - 2019) * 3);
  const pasivoTotal = r(activoTotal - pn - minoritarios);
  return {
    periodo: String(a), activo_total: activoTotal, activo_corriente: r(activoCorriente), pasivo_corriente: r(proveedores + c.ingresos * 0.09 + deudaFin[a] * 0.12),
    pasivo_total: pasivoTotal, fondo_comercio: fondo, intangibles: intang, inmovilizado_material: inmov, existencias, clientes, proveedores, activos_contrato: null, pasivos_contrato: null, caja,
    deuda_financiera: deudaFin[a], arrendamientos: arr, patrimonio_neto: r(pn), minoritarios, reservas: r(pn - 320),
  };
});

// ── Flujos (2019-2025) ──
const adq = { 2019: 35, 2020: 0, 2021: 40, 2022: 120, 2023: 0, 2024: 25, 2025: 0 };
const recompra = { 2019: 0, 2020: 0, 2021: 0, 2022: 0, 2023: 30, 2024: 40, 2025: 50 };
const flujos = anB.map((a) => {
  const c = C[a];
  const fo = r(c.ebitda - c.impuestos - Math.abs(c.resultado_financiero) * 0.9 - (a === 2022 ? 95 : a === 2021 ? 40 : 12));
  return {
    periodo: String(a), flujo_operativo: fo, capex: r(c.ingresos * (a >= 2023 ? 0.049 : 0.041)), pagos_arrendamientos: r(c.ingresos * 0.012),
    adquisiciones: adq[a], desinversiones: a === 2021 ? 18 : 0, dividendos: r(c.dpa * c.acciones_diluidas), recompras: recompra[a], emision_acciones: 0, intereses_en_financiacion: 0,
  };
});

// ── Segmentos (2021-2025) ──
const pesosSeg = { Redes: [0.31, 0.33, 0.35, 0.37, 0.39], Industria: [0.44, 0.43, 0.42, 0.41, 0.40], Automoción: [0.25, 0.24, 0.23, 0.22, 0.21] };
const margSeg = { Redes: [14.2, 14.8, 15.9, 16.5, 17.1], Industria: [11.4, 11.0, 11.8, 12.1, 12.3], Automoción: [7.9, 6.8, 7.2, 6.6, 6.1] };
const segs = Object.keys(pesosSeg).map((nombre) => ({
  nombre: `${nombre === 'Redes' ? 'Redes eléctricas' : nombre}`,
  descripcion: { Redes: 'Aparamenta y transformadores para distribuidoras eléctricas.', Industria: 'Cableado y equipos para plantas industriales.', Automoción: 'Mazos de cables para fabricantes de automóviles.' }[nombre],
  tipo_resultado: 'EBIT',
  historico: [2021, 2022, 2023, 2024, 2025].map((a, i) => {
    const ing = r(C[a].ingresos * pesosSeg[nombre][i]);
    return { periodo: String(a), ingresos: ing, resultado: r((ing * margSeg[nombre][i]) / 100) };
  }),
}));
// que los segmentos sumen exactamente los ingresos del grupo
for (let i = 0; i < 5; i++) {
  const a = String(2021 + i);
  const suma = segs.reduce((s, sg) => s + sg.historico[i].ingresos, 0);
  segs[1].historico[i].ingresos = r(segs[1].historico[i].ingresos + C[a].ingresos - suma);
}

const ult = C['2025'];
const b25 = balance.at(-1);
const nwcReal = ((b25.existencias + b25.clientes - b25.proveedores) / ult.ingresos) * 100;
const precio = 31.4;
const fuentesLista = [
  ['Informe anual 2025 (ficticio)', 'Compañía Ejemplo', 'Primaria', '2026-02-26'], ['Informe anual 2024 (ficticio)', 'Compañía Ejemplo', 'Primaria', '2025-02-27'],
  ['Informe anual 2023 (ficticio)', 'Compañía Ejemplo', 'Primaria', '2024-02-28'], ['Resultados 1S 2026 (ficticio)', 'Compañía Ejemplo', 'Primaria', '2026-07-24'],
  ['Presentación de resultados 1S 2026 (ficticia)', 'Compañía Ejemplo', 'Primaria', '2026-07-24'], ['Conferencia con analistas 1S 2026, transcripción (ficticia)', 'Compañía Ejemplo', 'Primaria', '2026-07-24'],
  ['Conferencia con analistas 1T 2026, transcripción (ficticia)', 'Compañía Ejemplo', 'Primaria', '2026-04-28'], ['Plan estratégico 2025-2028 (ficticio)', 'Compañía Ejemplo', 'Primaria', '2025-03-12'],
  ['Informe anual de gobierno corporativo 2025 (ficticio)', 'Compañía Ejemplo / CNMV', 'Primaria', '2026-02-26'], ['Informe anual de remuneraciones 2025 (ficticio)', 'Compañía Ejemplo / CNMV', 'Primaria', '2026-02-26'],
  ['Participaciones significativas (ficticio)', 'CNMV', 'Primaria', '2026-09-30'], ['Operaciones de directivos (ficticio)', 'CNMV', 'Primaria', '2026-09-30'],
  ['Posiciones cortas (ficticio)', 'CNMV', 'Primaria', '2026-10-02'], ['Informe de rating (ficticio)', 'Agencia de rating', 'Datos de mercado', '2026-05-15'],
  ['Cotización e históricos (ficticio)', 'Proveedor de datos', 'Datos de mercado', '2026-10-03'], ['Consenso de mercado (ficticio)', 'Proveedor de datos A', 'Datos de mercado', '2026-10-03'],
  ['Consenso de mercado (ficticio)', 'Proveedor de datos B', 'Datos de mercado', '2026-10-02'], ['Múltiplos históricos (ficticio)', 'Proveedor de datos A', 'Datos de mercado', '2026-10-03'],
  ['Estudio del mercado europeo de distribución eléctrica (ficticio)', 'Asociación sectorial', 'Sectorial', '2026-03-01'], ['Previsión de inversión en redes (ficticia)', 'Organismo europeo', 'Sectorial', '2025-11-20'],
  ['Informe anual 2025 de Grupo Alfa (ficticio)', 'Grupo Alfa', 'Primaria', '2026-03-05'], ['Informe anual 2025 de Beta Energy (ficticio)', 'Beta Energy', 'Primaria', '2026-03-10'],
  ['Base de operaciones corporativas (ficticia)', 'Proveedor de datos C', 'Datos de mercado', '2026-09-30'], ['Calificaciones ESG (ficticio)', 'Proveedor ESG', 'Datos de mercado', '2026-05-31'],
  ['Nota de inicio de cobertura (ficticia)', 'Banco de inversión', 'Analistas', '2026-06-10'], ['Artículo sobre la entrada de fabricantes asiáticos (ficticio)', 'Prensa económica', 'Prensa', '2026-08-18'],
];

const ejemplo = {
  meta: { fecha_corte: '2026-10-06', divisa: 'EUR', unidades: 'millones', cierre_ejercicio_mes: 12, divisa_cotizacion: 'EUR', tipo_cambio: 1, etiqueta_ejercicio: 'fin', controles_explicados: [{ control: 'Tipo impositivo efectivo razonable', explicacion: 'Regularización fiscal de un ejercicio, explicada en la cuenta de resultados; no se proyecta.' }], normas_contables: 'NIIF-UE', formato_cuenta: 'funcion', limitaciones: 'EJEMPLO FICTICIO para probar la plantilla y el motor: la empresa, las personas y todas las cifras son inventadas.',
    huecos: [{ seccion: 'Gobierno', campo: 'Ratio de la remuneración del primer ejecutivo sobre el salario medio', tipo: 'Complemento', intentos: '1) Informe de remuneraciones 2025: no lo publica; 2) informe de sostenibilidad (EINF): da el salario medio pero no el ratio; 3) búsqueda en prensa económica: sin resultados. Calculado a partir de 1) y 2).', decision: 'Calculado y marcado como estimación' }] },
  identificacion: {
    nombre: 'Compañía Ejemplo, S.A.', nombre_corto: 'Compañía Ejemplo', ticker: 'EJM', isin: 'ES0000000000', mercado: 'Bolsa de Madrid (Mercado Continuo)', indice_referencia: 'IBEX 35',
    pais: 'España', pais_iso: 'ES', sector: 'Industria', industria: 'Componentes y equipos eléctricos', sede: 'Madrid', fundacion: '1975', empleados: 8400, web: 'www.ejemplo.com',
    precio, fecha_precio: '2026-10-03', acciones: 160, capitalizacion_publicada: r(precio * 160), free_float_pct: 62.5, max_52s: 33.9, min_52s: 24.1,
    volumen_medio_diario: '≈ 6,5 M EUR/día (3 meses)', proximos_resultados: '2026-10-29',
  },
  resumen: {
    recomendacion: 'Mantener', conviccion: 'Media', justificacion_recomendacion: null, horizonte: '12 meses',
    sintesis: '**La recomendación y por qué.** Mantener, con convicción media. El valor objetivo de 30,82 EUR deja una rentabilidad total esperada casi nula, y la asimetría es mala: el escenario alcista gana un 10 % y el bajista pierde un 40 %. El negocio es bueno, pero el precio ya paga un crecimiento que la empresa no ha demostrado.\n\n**El negocio.** El 39 % de los ingresos viene ya de las redes de distribución, un mercado regulado que crece por encima del 7 % anual [1][19]. Ese cambio de mezcla explica los 160 pb de mejora del margen EBITDA desde 2021 [1] y un ROIC del 11,8 %, por encima de un WACC del 8,5 %: la empresa crea valor, aunque con un foso estrecho.\n\n**Finanzas.** La deuda neta ajustada es de 1,2 veces el EBITDA, con vencimientos cómodos [14]: el balance no es un riesgo. La conversión del beneficio en caja es buena y la calidad contable no muestra alertas.\n\n**Valoración.** El DCF (50 % del peso) da 27,61 EUR y los comparables 33,82 EUR; la dispersión es moderada. Lo decisivo es el DCF inverso: el precio descuenta un crecimiento del 8,5 % anual en 2027-2032, casi el doble del 4,6 % de nuestro caso base y por encima de su historia. Para que la acción suba hay que creer que automoción se recupera a la vez que redes sigue creciendo.\n\n**Riesgos y catalizadores.** El riesgo principal es la competencia asiática en transformadores, que ya recortó el margen de un competidor en 2023 [26]; en el bajista resta unos 12 EUR por acción. El catalizador más cercano son los concursos de redes de 2027 [8].\n\n**Qué cambiaría la decisión.** Compraríamos por debajo de 27,29 EUR o si la cartera de redes acelera por encima del 10 %; venderíamos por encima de 35,05 EUR o si la tasa de concursos ganados baja del 45 % [6].',
    tesis: 'Ejemplo fabrica equipos eléctricos de media tensión y obtiene ya el **39 % de sus ingresos de las redes de distribución**, un mercado que crece por encima del 7 % anual por la inversión regulada en redes [1][19]. El margen EBITDA ha subido 160 pb desde 2021 por ese cambio de mezcla [1].\n\nAl precio actual, el DCF inverso dice que el mercado descuenta un crecimiento anual cercano al de nuestra proyección: el precio ya recoge buena parte de la tesis de redes [16].\n\nPara ganar dinero hay que creer que el margen de redes seguirá subiendo y que automoción se estabiliza en 2027; ninguna de las dos cosas está demostrada [5][6].',
    vision_diferencial: {
      mercado_descuenta: 'Un crecimiento de ingresos en torno al 6 % anual y márgenes estables, en línea con el consenso [16][17].',
      nuestra_vision: 'Coincidimos en crecimiento, pero vemos más riesgo en el margen de automoción y en la presión de precios asiática en transformadores [26].',
      por_que: 'La dirección no ha concretado el plan de reducción de capacidad en automoción y los concursos de transformadores se están perdiendo por precio [6][7].',
    },
    a_favor: ['**Redes eléctricas**: cartera de pedidos de 1,9 veces los ingresos del segmento [4].', '**Balance**: deuda neta de 1,3x EBITDA y sin vencimientos relevantes hasta 2028 [1].', '**Asignación de capital**: recompras de 120 M en tres años con el ROIC por encima del WACC [1].', '**Gobierno**: mayoría de independientes y variable ligado al ROIC [9][10].'],
    en_contra: ['**Automoción** sigue cayendo (−6 % en el primer semestre) [4].', '**Cobre**: una subida del 10 % resta unos 40 pb de margen bruto si no se traslada [1].', '**Valoración**: el precio ya descuenta la mejora de márgenes [18].', '**Competencia asiática** en transformadores con precios un 15-20 % inferiores [26].'],
    cambiaria_recomendacion: ['Si el precio baja de la zona de compra con la cartera de redes intacta, pasaríamos a Comprar.', 'Si la tasa de concursos ganados en transformadores cae por debajo del 45 %, pasaríamos a Vender [6].', 'Si la dirección presenta un plan creíble de reducción de capacidad en automoción, revisaríamos al alza el margen [8].'],
    que_vigilar: 'La tesis depende de que la cartera de redes se convierta en ingresos al ritmo previsto y de que automoción toque fondo en 2027. La señal de alarma sería una caída de la cartera de pedidos dos trimestres seguidos [4].',
    kpis_seguimiento: [
      { kpi: 'Cartera de pedidos de redes', nivel_actual: '2.020 M', umbral_alerta: '< 1.800 M', por_que: 'Anticipa los ingresos de 12-18 meses.' },
      { kpi: 'Margen EBIT de automoción', nivel_actual: '6,1 %', umbral_alerta: '< 4 %', por_que: 'Si cae más, el segmento destruye valor.' },
      { kpi: 'Precio del cobre', nivel_actual: '9.800 USD/t', umbral_alerta: '> 11.000 USD/t', por_que: 'Coste principal de los cables.' },
      { kpi: 'Concursos de transformadores ganados', nivel_actual: '58 %', umbral_alerta: '< 45 %', por_que: 'Mide la presión asiática.' },
    ],
    confianza: 'Media',
  },
  historia: {
    resumen: 'Fundada en 1975 como taller de bobinado, salió a bolsa en 1998 y se transformó con dos compras: cables especiales en 2008 y aparamenta en 2015. La familia fundadora conserva el 28 % [1][9].',
    hitos: [{ anio: '1975', hito: 'Fundación en Madrid.' }, { anio: '1998', hito: 'Salida a bolsa.' }, { anio: '2008', hito: 'Compra de un fabricante de cables especiales.' }, { anio: '2015', hito: 'Entrada en aparamenta de media tensión.' }, { anio: '2019', hito: 'Nueva consejera delegada.' }, { anio: '2022', hito: 'Compra de cables especiales en Polonia por 120 M.' }, { anio: '2025', hito: 'Plan estratégico 2025-2028 [8].' }],
    confianza: 'Alta',
  },
  negocio: {
    descripcion: 'Diseña y fabrica aparamenta, transformadores de distribución y cableado para tres mercados: redes eléctricas, industria y automoción. Vende sobre todo a distribuidoras eléctricas con contratos marco de 3-5 años y a fabricantes industriales; tiene 14 plantas en seis países [1].',
    como_gana_dinero: 'El 45 % de los ingresos de redes viene de contratos marco con revisión de precios por cobre. El margen depende del precio del cobre, de la utilización de las plantas (81 %) y de la mezcla: redes deja 17 % de margen EBIT frente al 6 % de automoción [1][4].',
    segmentos: segs,
    geografias: [{ nombre: 'España', peso_pct: 34 }, { nombre: 'Resto de Europa', peso_pct: 38 }, { nombre: 'Norteamérica', peso_pct: 17 }, { nombre: 'Latinoamérica', peso_pct: 8 }, { nombre: 'Resto', peso_pct: 3 }], geografias_criterio: 'destino',
    clientes: 'Los diez primeros clientes son el 31 % de las ventas; el mayor, el 7 %. La tasa de renovación de contratos marco es del 92 % [1]. Subió precios un 9 % en 2022-2023, frente a una inflación de costes del 11 % [2][3].',
    kpis: [
      { kpi: 'Cartera de pedidos', valor_anterior: '1.770 M', valor_actual: '2.020 M', variacion: '+14 %', comentario: 'Récord; 1,9 años de ingresos de redes [4].' },
      { kpi: 'Book-to-bill', valor_anterior: '1,07x', valor_actual: '1,12x', variacion: '+0,05', comentario: 'Por encima de 1 seis trimestres seguidos [4].' },
      { kpi: 'Utilización de plantas', valor_anterior: '78 %', valor_actual: '81 %', variacion: '+3 pp', comentario: 'Cerca del límite en transformadores [5].' },
      { kpi: 'Concursos ganados (transformadores)', valor_anterior: '64 %', valor_actual: '58 %', variacion: '−6 pp', comentario: 'Presión de precios asiática [6].' },
    ],
    confianza: 'Alta',
  },
  sector: {
    definicion: 'Mercado europeo de equipos de distribución eléctrica de media y baja tensión. Tomamos la cifra de la asociación sectorial [19]; la previsión de inversión del organismo europeo da un tamaño un 8 % mayor por perímetro [20].',
    tamano: '≈ 42.000 M EUR en 2025 [19]', unidad_serie: 'miles de millones de EUR',
    serie: [{ anio: '2021', tamano: 33.1 }, { anio: '2022', tamano: 35.4 }, { anio: '2023', tamano: 38.2 }, { anio: '2024', tamano: 40.0 }, { anio: '2025', tamano: 42.0 }, { anio: '2027e', tamano: 48.3 }, { anio: '2030e', tamano: 59.6 }],
    tcac_historico_pct: 6.1, tcac_previsto_pct: 7.3, cr5_pct: 61, estructura: 'Moderadamente concentrada',
    drivers: [
      { driver: 'Inversión regulada en redes', efecto: '+', horizonte: 'Estructural', evidencia: 'Plan europeo de 584.000 M EUR hasta 2030 [20].' },
      { driver: 'Electrificación de la industria', efecto: '+', horizonte: 'Estructural', evidencia: 'Demanda eléctrica industrial +2 % anual [19].' },
      { driver: 'Producción de automóviles en Europa', efecto: '−', horizonte: 'Cíclico', evidencia: 'Por debajo de 2019 en un 18 % [26].' },
      { driver: 'Precio del cobre', efecto: '+/−', horizonte: 'Cíclico', evidencia: '60 % del coste de materiales [1].' },
    ],
    porter: [
      { fuerza: 'Rivalidad', intensidad: 3, justificacion: 'Cuatro grandes y una cola de especialistas; precios estables salvo en transformadores [19].' },
      { fuerza: 'Poder de los clientes', intensidad: 4, justificacion: 'Distribuidoras grandes que licitan [1].' },
      { fuerza: 'Poder de los proveedores', intensidad: 3, justificacion: 'Cobre y acero cotizan en mercado; poca diferenciación [1].' },
      { fuerza: 'Amenaza de entrada', intensidad: 2, justificacion: 'Homologaciones de 2-3 años [19].' },
      { fuerza: 'Amenaza de sustitutos', intensidad: 1, justificacion: 'No hay alternativa a la red física [19].' },
    ],
    ciclo: { posicion: 'Expansión', comentario: 'La inversión en redes está en máximos y la regulación la asegura hasta 2030 [20]. En 2009 el sector cayó un 12 % y en 2020 un 8 %, la mitad que la industria [19].' },
    regulacion: 'La remuneración regulada de las distribuidoras fija su inversión: la revisión de 2026 sube la tasa de retribución al 6,5 % [20].',
    tendencias: 'Digitalización de la red (sensores, telecontrol) y entrada de fabricantes asiáticos en transformadores. Ejemplo gana con la primera y pierde con la segunda [26].',
    confianza: 'Media',
  },
  competencia: {
    cuota_pct: 4.1, posicion: '5.º fabricante europeo de equipos de distribución',
    competidores: [
      { nombre: 'Grupo Alfa', pais: 'Francia', ticker: 'ALF', ingresos: 9800, cuota_pct: 18, margen_ebit_pct: 15.2, comentario: 'Líder en aparamenta; compite en precio en grandes concursos [21].' },
      { nombre: 'Beta Energy', pais: 'Alemania', ticker: 'BET', ingresos: 7600, cuota_pct: 15, margen_ebit_pct: 10.8, comentario: 'Fuerte en transformadores [22].' },
      { nombre: 'Gamma Systems', pais: 'Suiza', ticker: 'GAM', ingresos: 6200, cuota_pct: 12, margen_ebit_pct: 17.4, comentario: 'Integra software de red [19].' },
      { nombre: 'Delta Cables', pais: 'Italia', ticker: 'DLC', ingresos: 2100, cuota_pct: 5, margen_ebit_pct: 8.1, comentario: 'Especialista en cable [19].' },
    ],
    foso: {
      veredicto: 'Estrecho', tendencia: 'Estable',
      fuentes: [
        { fuente: 'Efectos de red', puntuacion: 0, evidencia: 'No aplica a un fabricante de equipos.' },
        { fuente: 'Costes de cambio', puntuacion: 3, evidencia: 'Homologaciones de 2-3 años con cada distribuidora [1].' },
        { fuente: 'Intangibles (marca, patentes, licencias)', puntuacion: 2, evidencia: '140 patentes, ninguna crítica [1].' },
        { fuente: 'Ventaja en costes', puntuacion: 1, evidencia: 'Margen EBIT por debajo de los dos líderes [21][22].' },
        { fuente: 'Escala eficiente', puntuacion: 2, evidencia: 'Líder en España con el 22 % de cuota [19].' },
      ],
    },
    amenazas: 'Fabricantes asiáticos de transformadores con precios un 15-20 % inferiores, ya homologados en dos distribuidoras europeas [26].',
    confianza: 'Media',
  },
  financieros: {
    cuenta,
    ltm: { periodo: 'LTM jun-26', fecha_fin: '2026-06-30', dpa_extraordinario: 0, ingresos: r(ult.ingresos * 1.03), ebitda: r(ult.ebitda * 1.04), ebit: r(ult.ebit * 1.04), beneficio_neto: r(ult.beneficio_neto * 1.05), bpa: r(ult.bpa * 1.05, 2), dpa: ult.dpa, fcf: 205 },
    comentario: 'Los ingresos crecieron un 5,5 % anual en 2016-2025, con un 2020 de caída (−7,5 %) por automoción. El margen EBITDA pasó del 14,1 % al 15,9 % por el mayor peso de redes [1][2][3].',
    cambios_perimetro: [{ periodo: '2022', descripcion: 'compra de Aparamenta Boreal (ficticia), consolidada desde octubre: tres meses en la cuenta y el balance completo' }],
    ajustes: 'Las cifras son las reportadas. Los no recurrentes (reestructuración en 2020 y 2023) fueron inferiores al 3 % del EBIT [1][3].',
    confianza: 'Alta',
  },
  trimestres: {
    items: [['3T24', 6.2, 4.1], ['4T24', 4.4, 3.0], ['1T25', 4.9, 4.2], ['2T25', 5.6, 5.0], ['3T25', 4.8, 4.6], ['4T25', 5.2, 5.1], ['1T26', 6.6, 6.0], ['2T26', 7.1, 6.8]].map(([p, g, o], i) => ({
      periodo: p, ingresos: r(690 + i * 9 + (i % 4 === 3 ? 25 : 0)), crecimiento_pct: g, crecimiento_organico_pct: o, ebitda: r((690 + i * 9) * (0.152 + i * 0.002)), margen_ebitda_pct: r(15.2 + i * 0.2, 1), bpa: r(0.29 + i * 0.012, 2), vs_consenso: i % 3 === 0 ? 'Superior' : 'En línea',
    })),
    ultima_presentacion: 'La dirección elevó la guía de margen al 16 % y anunció un plan de capacidad en transformadores. Los analistas preguntaron cuatro veces por los precios asiáticos; la respuesta fue genérica [5][6]. Frente a la conferencia anterior, el discurso sobre automoción pasó de «estabilización» a «revisión de la capacidad» [7].',
    confianza: 'Alta',
  },
  balance: {
    historico: balance,
    vencimientos: [{ anio: '2026', importe: 40 }, { anio: '2027', importe: 65 }, { anio: '2028', importe: 300 }, { anio: '2029', importe: 120 }, { anio: '2030+', importe: 75 }],
    liquidez: 'Caja de 210 M y líneas comprometidas no dispuestas de 500 M', rating: 'BBB (agencia ficticia), perspectiva estable [14]', coste_deuda_pct: 3.6, vida_media_anios: 3.4,
    otros_pasivos: 'Covenant de DN/EBITDA < 3,5x, con holgura amplia. Factoring sin recurso de 120 M, que conviene sumar a la deuda en una lectura prudente. Reclamación fiscal de 18 M en Brasil, provisionada al 50 % [1].',
    comentario: 'La deuda neta baja de 2,0x a 1,3x EBITDA desde 2022. El ciclo de caja se ha mantenido estable en torno a 90 días [1].',
    confianza: 'Alta',
  },
  flujos: { historico: flujos, comentario: 'La conversión de beneficio en caja es alta salvo en 2022, por la acumulación de inventario de cobre. La empresa estima el capex de mantenimiento en el 3 % de las ventas [1][8].', confianza: 'Alta' },
  calidad: {
    auditor: 'Auditora Ejemplo', anios_auditor: 7, opinion: 'Favorable',
    comentario: 'Sin cambios de criterio en cinco años. Capitaliza el 30 % del gasto en desarrollo, en línea con el sector [1]. Los tres indicadores del motor no muestran señales de alarma.',
    senales: [{ senal: 'Factoring sin recurso', nivel: 'Media', comentario: '120 M fuera del balance que mejoran el circulante [1].' }],
    confianza: 'Alta',
  },
  rentabilidad: { comentario: 'El ROIC supera al WACC todos los años desde 2016 y el diferencial se amplía con el peso de redes. El ROIC incremental confirma que el crecimiento reciente crea valor [1].', confianza: 'Media' },
  capital: {
    politica: 'Reparte el 40-50 % del beneficio y tiene un programa de recompra de hasta 100 M. Prioridad declarada: crecimiento orgánico en redes y compras pequeñas [8].',
    adquisiciones: [{ anio: '2022', objetivo: 'Cables especiales (Polonia)', importe: 120, ev_ebitda: 8.0, financiacion: 'Deuda', resultado: 'Cumple el plan; sin deterioros [1].' }, { anio: '2021', objetivo: 'Software de red', importe: 40, ev_ebitda: null, financiacion: 'Caja', resultado: 'Integrada en redes [2].' }],
    comentario: 'Disciplina razonable: compras pequeñas a múltiplos moderados y recompras con el ROIC por encima del WACC [1][8].',
    confianza: 'Alta',
  },
  directivos: {
    equipo: [{ nombre: 'Directora General (ficticia)', cargo: 'Consejera delegada', desde: '2019', participacion_pct: 0.15, trayectoria: 'Antes dirigió redes; con ella el margen EBITDA ha subido 160 pb [1].' }, { nombre: 'Director Financiero (ficticio)', cargo: 'Director financiero', desde: '2021', participacion_pct: 0.02, trayectoria: 'Viene de un grupo industrial cotizado [9].' }],
    historial_guidance: [{ anio: '2023', guia: 'Crecer 5-7 %; margen ≥ 14,5 %', real: '+6,2 %; 14,9 %', cumplida: 'Sí' }, { anio: '2024', guia: 'Crecer 5-7 %; margen ≥ 15 %', real: '+4,8 %; 15,4 %', cumplida: 'Parcial' }, { anio: '2025', guia: 'Crecer ~5 %; margen ≥ 15,5 %', real: '+5,1 %; 15,9 %', cumplida: 'Sí' }],
    comentario: 'Cumple o casi cumple sus guías desde 2023. Sucesión sin plan público [9].',
    confianza: 'Media',
  },
  gobierno: {
    consejo: [
      { nombre: 'Presidente (ficticio)', cargo: 'Presidente', tipo: 'Dominical', desde: '2010', comisiones: 'Nombramientos' },
      { nombre: 'Directora General (ficticia)', cargo: 'Consejera delegada', tipo: 'Ejecutivo', desde: '2019', comisiones: '—' },
      { nombre: 'Consejero familiar (ficticio)', cargo: 'Vocal', tipo: 'Dominical', desde: '2012', comisiones: 'Estrategia' },
      { nombre: 'Consejera independiente A (ficticia)', cargo: 'Coordinadora', tipo: 'Independiente', desde: '2017', comisiones: 'Auditoría (presidenta)' },
      { nombre: 'Consejero independiente B (ficticio)', cargo: 'Vocal', tipo: 'Independiente', desde: '2020', comisiones: 'Retribuciones' },
      { nombre: 'Consejera independiente C (ficticia)', cargo: 'Vocal', tipo: 'Independiente', desde: '2021', comisiones: 'Auditoría' },
      { nombre: 'Consejero independiente D (ficticio)', cargo: 'Vocal', tipo: 'Independiente', desde: '2023', comisiones: 'Nombramientos' },
    ],
    presidente_ceo_separados: true, consejero_coordinador: true, una_accion_un_voto: true, operaciones_vinculadas_relevantes: false, variable_ligado_rentabilidad: true, auditoria_independiente: true, insiders_sin_operaciones: false, accionista_control: false, presidente_vinculado_control: false, cambios_cupula_24m: 0, voto_remuneracion_pct: 88.2, voto_remuneracion_contra_pct: 9.6, voto_remuneracion_contra_libre_pct: null,
    remuneracion_ceo: { anio: '2025', total: 2.4, fijo: 0.9, variable_corto: 0.8, variable_largo: 0.7, ratio_salario_medio: 52 },
    remuneracion: 'El variable a largo plazo depende al 50 % del ROIC y al 50 % del rendimiento total frente al IBEX; tiene cláusula de recuperación [10].',
    accionistas: [{ nombre: 'Familia fundadora', pct: 28, tipo: 'Familiar', variacion: 'Estable' }, { nombre: 'Fondo de pensiones nórdico', pct: 5.1, tipo: 'Institucional', variacion: 'Sube desde el 3,0 % en 2025 [11]' }, { nombre: 'Gestora estadounidense', pct: 3.2, tipo: 'Institucional', variacion: 'Nueva [11]' }, { nombre: 'Autocartera', pct: 1.2, tipo: 'Autocartera', variacion: 'Por recompras' }],
    insiders: [{ fecha: '2026-03-12', persona: 'Consejera delegada', operacion: 'Compra', acciones: 20000, importe: 0.55 }, { fecha: '2026-08-05', persona: 'Consejero independiente B', operacion: 'Compra', acciones: 3000, importe: 0.09 }],
    control_y_defensas: 'La familia fundadora tiene el 28 % sin pacto con otros accionistas. No hay operaciones vinculadas relevantes ni límites de voto [9].',
    alertas: ['Ninguna relevante detectada tras revisar IAGC, IARC y hechos relevantes [12][13].'],
    confianza: 'Alta',
  },
  consenso: {
    guidance: 'Para 2026: crecimiento del 6-8 % y margen EBITDA ≥ 16 %, elevado en julio de 2026 [4]. Plan 2028: margen del 17 % [8].',
    estimaciones: [
      { periodo: '2026e', ingresos: r(ult.ingresos * 1.066), ebitda: r(ult.ingresos * 1.066 * 0.161), ebit: r(ult.ingresos * 1.066 * 0.118), bpa: r(ult.bpa * 1.11, 2), dpa: r(ult.dpa * 1.1, 2), fuente: 'Consenso, 11 analistas [16]' },
      { periodo: '2027e', ingresos: r(ult.ingresos * 1.066 * 1.062), ebitda: r(ult.ingresos * 1.066 * 1.062 * 0.164), ebit: r(ult.ingresos * 1.066 * 1.062 * 0.121), bpa: r(ult.bpa * 1.22, 2), dpa: r(ult.dpa * 1.2, 2), fuente: 'Consenso, 11 analistas [16]' },
      { periodo: '2028e', ingresos: r(ult.ingresos * 1.066 * 1.062 * 1.058), ebitda: r(ult.ingresos * 1.066 * 1.062 * 1.058 * 0.166), ebit: r(ult.ingresos * 1.066 * 1.062 * 1.058 * 0.123), bpa: r(ult.bpa * 1.33, 2), dpa: r(ult.dpa * 1.31, 2), fuente: 'Consenso, 9 analistas [17]' },
    ],
    recomendaciones: { n_analistas: 11, comprar: 6, mantener: 4, vender: 1, po_medio: 34.2, po_min: 27.0, po_max: 40.0 },
    base_ebitda: 'NIIF', ajuste_ebitda_pct_ventas: null,
    revisiones: 'El BPA de 2026 sube un 3 % en tres meses y un 7 % en doce, tras subir la guía de margen [16][17].',
    confianza: 'Media',
  },
  bolsa: {
    tipo_rentabilidad: 'total (con dividendos)',
    rentabilidades: [{ periodo: 'En el año', accion_pct: 14.1, indice_pct: 11.0, sector_pct: 16.2 }, { periodo: '1 año', accion_pct: 22.0, indice_pct: 14.0, sector_pct: 24.5 }, { periodo: '3 años (anual.)', accion_pct: 15.5, indice_pct: 12.8, sector_pct: 17.0 }, { periodo: '5 años (anual.)', accion_pct: 11.1, indice_pct: 8.7, sector_pct: 12.4 }, { periodo: '10 años (anual.)', accion_pct: 7.9, indice_pct: 5.2, sector_pct: 9.1 }],
    anual: [['2019', 18, 16.5], ['2020', -14, -12.7], ['2021', 24, 10.2], ['2022', -9, -2.0], ['2023', 21, 27.0], ['2024', 13, 18.0], ['2025', 17, 14.5]].map(([a, x, y]) => ({ anio: a, accion_pct: x, indice_pct: y })),
    beta: 1.08, volatilidad_pct: 24.5, max_drawdown_pct: -38.0, posicion_corta_pct: 0.6,
    comentario: 'Supera al índice en el último año por la mejora de márgenes, pero se queda por detrás del sector, que se ha beneficiado más del ciclo de redes [15].',
    confianza: 'Media',
  },
  multiplos_historicos: {
    serie: [['2016', 8.4, 15.2], ['2017', 9.1, 16.0], ['2018', 7.6, 13.1], ['2019', 8.8, 15.4], ['2020', 9.6, 19.8], ['2021', 10.9, 18.7], ['2022', 8.2, 13.9], ['2023', 9.0, 14.6], ['2024', 10.1, 16.2], ['2025', 10.6, 17.1]].map(([a, x, y]) => ({ anio: a, excluir: false, precio_cierre: { 2016: 21.5, 2017: 23.0, 2018: 19.4, 2019: 22.8, 2020: 19.6, 2021: 24.3, 2022: 22.1, 2023: 26.7, 2024: 30.1, 2025: 28.9 }[a] ?? null, ev_ebitda_ntm: x, per_ntm: y })),
    comentario: 'Cotiza por encima de su media de diez años; la prima se explica por el mayor peso de redes, más estable [18].',
    confianza: 'Media',
  },
  comparables: {
    criterio: 'Fabricantes europeos cotizados de equipos de distribución eléctrica con más de 1.000 M de ingresos. Se excluyen los conglomerados con menos del 40 % del negocio en distribución [15].',
    empresas: [
      { nombre: 'Grupo Alfa', ticker: 'ALF', pais: 'FR', capitalizacion: 41000, ev_ventas: 2.4, ev_ebitda_ltm: 14.1, ev_ebitda_ntm: 12.9, per_ntm: 22.8, crecimiento_pct: 8.2, margen_ebitda_pct: 19.1, roic_pct: 15.2, dn_ebitda: 0.9, fcf_yield_pct: 3.9 },
      { nombre: 'Beta Energy', ticker: 'BET', pais: 'DE', capitalizacion: 18500, ev_ventas: 1.6, ev_ebitda_ltm: 11.4, ev_ebitda_ntm: 10.6, per_ntm: 19.4, crecimiento_pct: 6.1, margen_ebitda_pct: 14.2, roic_pct: 11.0, dn_ebitda: 1.4, fcf_yield_pct: 4.6 },
      { nombre: 'Gamma Systems', ticker: 'GAM', pais: 'CH', capitalizacion: 26000, ev_ventas: 3.2, ev_ebitda_ltm: 16.0, ev_ebitda_ntm: 14.8, per_ntm: 26.5, crecimiento_pct: 9.4, margen_ebitda_pct: 21.0, roic_pct: 18.4, dn_ebitda: 0.4, fcf_yield_pct: 3.2 },
      { nombre: 'Delta Cables', ticker: 'DLC', pais: 'IT', capitalizacion: 5200, ev_ventas: 1.0, ev_ebitda_ltm: 9.6, ev_ebitda_ntm: 8.9, per_ntm: 14.8, crecimiento_pct: 3.8, margen_ebitda_pct: 11.5, roic_pct: 9.7, dn_ebitda: 2.0, fcf_yield_pct: 6.1 },
      { nombre: 'Epsilon Grid', ticker: 'EPS', pais: 'SE', capitalizacion: 7400, ev_ventas: 1.9, ev_ebitda_ltm: 12.5, ev_ebitda_ntm: 11.3, per_ntm: 20.1, crecimiento_pct: 7.0, margen_ebitda_pct: 15.6, roic_pct: 12.8, dn_ebitda: 1.1, fcf_yield_pct: 4.4 },
      { nombre: 'Zeta Power', ticker: 'ZPW', pais: 'NL', capitalizacion: 3100, ev_ventas: 1.2, ev_ebitda_ltm: 10.2, ev_ebitda_ntm: 9.5, per_ntm: 16.3, crecimiento_pct: 5.0, margen_ebitda_pct: 12.4, roic_pct: 10.1, dn_ebitda: 1.8, fcf_yield_pct: 5.3 },
    ],
    comentario: 'Ejemplo cotiza en la mitad baja del rango, coherente con un crecimiento y un ROIC por debajo de los líderes. La regresión sobre el crecimiento explica bien el múltiplo [15].',
    confianza: 'Media',
  },
  transacciones: {
    operaciones: [
      { fecha: '2025-11', objetivo: 'Fabricante nórdico de aparamenta', comprador: 'Grupo Alfa', ev: 1450, ev_ventas: 2.1, ev_ebitda: 12.8, prima_pct: null, comentario: 'Compra estratégica [23].' },
      { fecha: '2025-03', objetivo: 'Delta Transformers', comprador: 'Fondo de capital privado', ev: 820, ev_ventas: 1.4, ev_ebitda: 10.5, prima_pct: 31, comentario: 'OPA con exclusión [23].' },
      { fecha: '2024-06', objetivo: 'Cables industriales (Portugal)', comprador: 'Beta Energy', ev: 310, ev_ventas: 1.1, ev_ebitda: 9.2, prima_pct: null, comentario: 'Compra a un fondo [23].' },
      { fecha: '2023-09', objetivo: 'Especialista en sensores de red', comprador: 'Gamma Systems', ev: 520, ev_ventas: 3.6, ev_ebitda: 18.5, prima_pct: null, comentario: 'Tecnología [23].' },
      { fecha: '2022-05', objetivo: 'Cables especiales (Polonia)', comprador: 'Compañía Ejemplo', ev: 120, ev_ventas: 0.9, ev_ebitda: 8.0, prima_pct: null, comentario: 'Compra propia [1].' },
    ],
    comentario: 'Las compras de equipos de red se pagan a 9-13x EBITDA. Con la familia en el 28 %, una OPA hostil no es probable [9][23].',
    confianza: 'Media',
  },
  dcf: {
    anios: [
      ['2026e', 6.6, 16.1], ['2027e', 6.2, 16.4], ['2028e', 5.8, 16.6], ['2029e', 5.0, 16.7], ['2030e', 4.2, 16.8], ['2031e', 3.5, 16.8], ['2032e', 3.0, 16.8],
    ].map(([p, g, m], i) => ({ periodo: p, crecimiento_pct: g, margen_ebitda_pct: m, amortizacion_pct_ventas: 4.3, capex_pct_ventas: i < 3 ? 5.0 : 4.5, nwc_pct_ventas: r(nwcReal - i * 0.3, 1), tasa_impositiva_pct: 24.5, fijo: i === 0 })),
    wacc: { tasa_libre_pct: 3.2, beta: 1.05, prima_mercado_pct: 5.5, prima_adicional_pct: 0.5, coste_deuda_pct: 3.6, tasa_impositiva_pct: 25, peso_deuda_pct: 15 },
    terminal: { metodo: 'gordon', crecimiento_pct: 2.0, multiplo_salida: 10.0 },
    mitad_de_anio: true,
    justificacion: {
      crecimiento: 'Seguimos el consenso en 2026-2028 (6-7 %) y convergemos al 3 % en 2032, por debajo del crecimiento previsto del mercado (7,3 %) [16][19].',
      margenes: 'El margen sube hasta el 16,8 %, por debajo del objetivo del plan (17 %) [8], por la presión en transformadores [26].',
      inversion: 'Capex del 5 % por el plan de capacidad hasta 2028 y del 4,5 % después, por encima de la amortización (4,3 %) [8].',
      wacc: 'Bono español a 10 años del 3,2 % [15], beta ajustada de 1,05 y prima de mercado del 5,5 %, más 0,5 puntos por tamaño [15].',
      terminal: 'Crecimiento a perpetuidad del 2 %, en línea con la inflación a largo plazo; el múltiplo implícito se compara con los comparables [15].',
    },
    lectura: 'El DCF base da un valor cercano al precio actual; el valor terminal pesa en torno al 70 %. El DCF inverso dice que el mercado descuenta un crecimiento similar al de nuestra proyección: no hay margen de seguridad sin una mejora adicional del margen [16].',
    confianza: 'Media',
  },
  escenarios: {
    casos: [
      { escenario: 'Bajista', probabilidad_pct: 25, ajuste_crecimiento_pp: -2.5, ajuste_margen_pp: -1.5, ajuste_wacc_pp: 0.5, crecimiento_terminal_pct: 1.5, multiplo_salida: null, perfil: [{ periodo: '2027e', crecimiento_pp: -6, margen_pp: -2.5 }], narrativa: 'Automoción sigue cayendo y la competencia asiática recorta el margen de transformadores, como le pasó a Delta Cables en 2023 [26].' },
      { escenario: 'Base', probabilidad_pct: 55, ajuste_crecimiento_pp: 0, ajuste_margen_pp: 0, ajuste_wacc_pp: 0, crecimiento_terminal_pct: null, multiplo_salida: null, perfil: [], narrativa: 'Redes crece según la cartera y automoción se estabiliza en 2027 [4].' },
      { escenario: 'Alcista', probabilidad_pct: 20, ajuste_crecimiento_pp: 1.5, ajuste_margen_pp: 1.0, ajuste_wacc_pp: -0.25, crecimiento_terminal_pct: 2.25, multiplo_salida: null, perfil: [], narrativa: 'Contratos en Norteamérica y margen de redes al 19 % [8].' },
    ],
    comentario: 'La asimetría es desfavorable: el bajista pierde más de lo que gana el alcista [16].',
    confianza: 'Media',
  },
  suma_partes: {
    aplica: true, descuento_holding_pct: 0,
    partes: [
      { segmento: 'Redes eléctricas', metrica: 'EBITDA 2026e', valor_metrica: 330, multiplo: 12.5, justificacion: 'Mediana de comparables puros de redes [15].' },
      { segmento: 'Industria', metrica: 'EBITDA 2026e', valor_metrica: 255, multiplo: 9.5, justificacion: 'Fabricantes industriales diversificados [15].' },
      { segmento: 'Automoción', metrica: 'EBITDA 2026e', valor_metrica: 92, multiplo: 6.0, justificacion: 'Proveedores de automoción europeos [15].' },
    ],
    comentario: 'Tres negocios con perfiles muy distintos: la suma de partes muestra cuánto vale redes por separado [15].',
    confianza: 'Media',
  },
  valoracion: {
    puente: { fecha: '2026-06-30', deuda_financiera: 610, arrendamientos: 100, caja: 160, minoritarios: 55, pensiones: 0, asociadas: 20, otros_ajustes: 45 },
    rab: null,
    pesos: { dcf: 50, comparables: 30, transacciones: 10, suma_partes: 10, escenarios: 0 },
    comentario: 'El DCF pesa la mitad porque el negocio es predecible y regulado en redes. Las transacciones pesan poco: con la familia en el 28 %, una operación de control no es probable [9].',
    confianza: 'Media',
  },
  catalizadores: {
    items: [
      { fecha: '29 oct 2026', evento: 'Resultados del tercer trimestre', efecto: 'Confirmar la cartera de redes y la guía', probabilidad: 'Alta', sentido: '+/−' },
      { fecha: '1S 2027', evento: 'Día del inversor', efecto: 'Plan para automoción', probabilidad: 'Media', sentido: '+' },
      { fecha: '2027', evento: 'Revisión regulatoria de redes', efecto: 'Inversión de las distribuidoras', probabilidad: 'Alta', sentido: '+' },
      { fecha: '2028', evento: 'Vencimiento del bono de 300 M', efecto: 'Coste de la refinanciación', probabilidad: 'Alta', sentido: '+/−' },
    ],
    confianza: 'Media',
  },
  riesgos: {
    items: [
      { riesgo: 'Competencia asiática en transformadores', tipo: 'Competencia', probabilidad: 'Alta', impacto: 'Medio', efecto_valor: '−12 %', mitigante: 'Homologaciones y servicio local', senal: 'Concursos ganados < 45 %' },
      { riesgo: 'Caída prolongada de automoción', tipo: 'Negocio', probabilidad: 'Media', impacto: 'Medio', efecto_valor: '−8 %', mitigante: 'Peso decreciente', senal: 'Pedidos < −10 %' },
      { riesgo: 'Precio del cobre', tipo: 'Materias primas', probabilidad: 'Media', impacto: 'Medio', efecto_valor: '−6 %', mitigante: 'Cláusulas en el 45 % de redes', senal: 'Cobre > 11.000 USD/t' },
      { riesgo: 'Retrasos en la inversión de redes', tipo: 'Regulatorio', probabilidad: 'Baja', impacto: 'Alto', efecto_valor: '−15 %', mitigante: 'Marco regulado hasta 2030', senal: 'Revisión de la tasa de retribución' },
      { riesgo: 'Ejecución del plan de capacidad', tipo: 'Ejecución', probabilidad: 'Media', impacto: 'Bajo', efecto_valor: '−4 %', mitigante: 'Inversión por fases', senal: 'Retrasos o sobrecostes > 10 %' },
      { riesgo: 'Sucesión de la consejera delegada', tipo: 'Gobierno', probabilidad: 'Baja', impacto: 'Medio', efecto_valor: '−5 %', mitigante: 'Equipo directivo estable', senal: 'Salidas en la alta dirección' },
    ],
    premortem: 'Es 2029 y la acción ha caído un 40 %. Los fabricantes asiáticos ganaron tres concursos grandes en 2027 y el margen de transformadores cayó 4 puntos. Al mismo tiempo, automoción perdió otro 15 % de volumen y la empresa tardó en cerrar capacidad. El mercado dejó de pagar la prima de redes. La señal estaba en la tasa de concursos ganados, que ya bajaba en 2026 [6][26].',
    confianza: 'Media',
  },
  esg: {
    calificaciones: [{ agencia: 'Proveedor ESG A', calificacion: 'A', fecha: '2026-03' }, { agencia: 'Proveedor ESG B', calificacion: 'Riesgo bajo (17,2)', fecha: '2026-05' }],
    materialidad: 'El 38 % de los ingresos es elegible en la taxonomía europea por su papel en la electrificación [1]. El consumo energético de las fundiciones expone a la empresa al precio del CO₂ [24].',
    controversias: 'Sin controversias relevantes en los últimos tres años [24].',
    confianza: 'Media',
  },
  preguntas: {
    items: [
      { tema: 'Automoción', pregunta: '¿Qué capacidad se cerrará y con qué coste?', por_que: 'Decide si el segmento deja de destruir valor [6].' },
      { tema: 'Transformadores', pregunta: '¿Cuál es el diferencial de precio frente a los fabricantes asiáticos en los últimos concursos?', por_que: 'Es el riesgo principal del margen [26].' },
      { tema: 'Capital', pregunta: '¿Qué ROIC se exige al plan de capacidad?', por_que: 'Son 450 M de capex hasta 2028 [8].' },
      { tema: 'Factoring', pregunta: '¿Se mantendrá el factoring sin recurso?', por_que: 'Son 120 M fuera de la deuda [1].' },
      { tema: 'Sucesión', pregunta: '¿Hay un plan de sucesión para la consejera delegada?', por_que: 'No es público [9].' },
      { tema: 'Norteamérica', pregunta: '¿Qué cartera tiene en Norteamérica y con qué margen?', por_que: 'Es la palanca del escenario alcista [25].' },
    ],
    confianza: 'Media',
  },
  fuentes: fuentesLista.map(([titulo, editor, tipo, fecha], i) => ({ id: i + 1, titulo, editor, tipo, fecha, url: 'https://example.com' })),
};

writeFileSync(new URL('../verticales/empresa/ejemplo.json', import.meta.url), JSON.stringify(ejemplo, null, 2) + '\n');
console.log('verticales/empresa/ejemplo.json');
