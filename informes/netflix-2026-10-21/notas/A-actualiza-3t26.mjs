// Actualiza la nota A con el 3T26 (carta a los accionistas del 20-oct-2026; el 10-Q aún no está en EDGAR).
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
const dir = path.dirname(fileURLToPath(import.meta.url));
const ruta = path.join(dir, 'A.json');
const a = JSON.parse(fs.readFileSync(ruta, 'utf8'));
const r1 = (x) => Math.round(x * 10) / 10;

// ---------- fuentes nuevas ----------
const nuevas = [
  { titulo: 'Carta a los accionistas del 3T26 (Form 8-K, anexo 99.1)', editor: 'Netflix, Inc. (SEC EDGAR)', tipo: 'Primaria', fecha: '2026-10-20', url: 'https://www.sec.gov/Archives/edgar/data/1065280/000106528026000290/ex991_q326.htm' },
  { titulo: 'Form FWP: hoja de condiciones de los bonos al 5,250 % con vencimiento en 2036 (ratings)', editor: 'Netflix, Inc. (SEC EDGAR)', tipo: 'Primaria', fecha: '2026-07-20', url: 'https://www.sec.gov/Archives/edgar/data/1065280/000119312526309014/d159566dfwp.htm' },
  { titulo: 'Netflix issues weak fourth-quarter forecast as company seeks to kick-start growth (Reuters)', editor: 'Reuters, vía Investing.com', tipo: 'Prensa', fecha: '2026-10-20', url: 'https://www.investing.com/news/stock-market-news/netflix-issues-weak-fourthquarter-forecast-as-company-seeks-to-kickstart-growth-4960954' },
  { titulo: 'Netflix ad revenue forecast drops to $2.7B as partner integrations slip (con citas de la entrevista del 3T26)', editor: 'PPC Land', tipo: 'Prensa', fecha: '2026-10', url: 'https://ppc.land/netflix-ad-revenue-forecast-drops-to-2-7b-as-partner-integrations-slip/' },
];
let id = Math.max(...a.fuentes.map((f) => f.id));
const F = {};
for (const f of nuevas) {
  const ya = a.fuentes.find((x) => x.url === f.url);
  if (ya) { F[f.url] = ya.id; continue; }
  a.fuentes.push({ id: ++id, ...f });
  F[f.url] = id;
}
const C = F[nuevas[0].url], FWP = F[nuevas[1].url], RT = F[nuevas[2].url], PPC = F[nuevas[3].url];

// ---------- cifras del 3T26 (miles de USD en la carta; aquí millones) ----------
const q3 = { ing: 12874.176, ebit: 4458.6, da: 107.1, bn: 3663.927, bpa: 0.87, dil: 4195.127 };
const m9_26 = { ing: 37683.871, ebit: 12608.207, da: 306.205, bn: 12348.132, cfo: 10196.296, capex: 693.54 };
const m9_25 = { ing: 33132.274, ebit: 10369.94, da: 247.406, bn: 8562.68, cfo: 8037.631, capex: 448.885 };
const y25 = a.financieros.cuenta.find((c) => c.periodo === '2025');
const f25 = a.flujos.historico.find((c) => c.periodo === '2025');

// ---------- financieros.ltm ----------
const ltmIng = y25.ingresos + m9_26.ing - m9_25.ing;
const ltmEbit = y25.ebit + m9_26.ebit - m9_25.ebit;
const ltmDa = y25.amortizaciones + m9_26.da - m9_25.da;
const ltmBn = y25.beneficio_neto + m9_26.bn - m9_25.bn;
const ltmFcf = (f25.flujo_operativo - f25.capex) + (m9_26.cfo - m9_26.capex) - (m9_25.cfo - m9_25.capex);
a.financieros.ltm = {
  periodo: 'LTM sep-26', fecha_fin: '2026-09-30',
  ingresos: r1(ltmIng), ebitda: r1(ltmEbit + ltmDa), ebit: r1(ltmEbit), beneficio_neto: r1(ltmBn),
  bpa: 3.46, dpa: 0, dpa_extraordinario: 0, fcf: r1(ltmFcf),
  participadas_en_ebitda: null, no_recurrentes_en_ebitda: null,
};
a.financieros.comentario =
  `Los ingresos pasaron de 8.831 M en 2016 a 45.183 M en 2025 (TCAC ≈ 20 %), todo orgánico salvo compras pequeñas de estudios (≈ 790 M en 2021 y ≈ 760 M en 2022). El margen operativo subió del 4,3 % en 2016 al 29,5 % en 2025 por apalancamiento: la amortización de contenidos bajó del 54 % al 36 % de las ventas. En 2025 el margen habría sido ≈ 30,9 % sin el gasto fiscal de Brasil (≈ 619 M en el 3T25) [1, 7]. **2026 se desacelera**: +16 % en el 1T, +13 % en el 2T y +11,8 % en el 3T (+11 % a tipo de cambio constante), con un margen operativo del 34,6 % en el 3T26 frente al 28,2 % del 3T25 [${C}]. La guía de 2026 queda en 51.100 M (+13 %) y un margen del 31,5 %, que ya absorbe ≈ 30 pb del recorte de plantilla del 4T26; el 4T26 se guía al 26,0 % [${C}]. LTM a sep-26: ingresos de ${(Math.round(ltmIng)).toLocaleString('es-ES')} M y beneficio operativo de ${(Math.round(ltmEbit)).toLocaleString('es-ES')} M (margen ≈ ${(ltmEbit / ltmIng * 100).toFixed(1).replace('.', ',')} %). 2022 no es comparable por la caída de suscriptores y 2023 por las huelgas, que rebajaron los pagos de contenidos [1, 2].`;
a.financieros.ajustes =
  `Se usan cifras publicadas (US GAAP). Partidas no recurrentes: 2025, ≈ 619 M en coste de ventas por impuestos indirectos de Brasil, de los que ≈ 495 M son de 2022-2024 (estimación propia, en no_recurrentes_en_ebitda) [7]; 1T26, 2.800 M de comisión de ruptura de Warner Bros. Discovery en «Interest and other income» (por debajo del EBIT): infla el beneficio neto LTM (${Math.round(ltmBn).toLocaleString('es-ES')} M) y el BPA LTM (3,46 USD), que sin ella serían ≈ 2.200 M y ≈ 0,52 USD menores tras impuestos (estimación propia al 21 %) [3, 9, ${C}]. El LTM sep-26 ya no incluye el gasto de Brasil (3T25). En el 4T26 entrará un gasto por el recorte de plantilla (≈ 120 pb de margen del trimestre, ≈ 160 M estimación propia sobre 13.442 M) [${C}].`;
a.financieros.extra.notas = a.financieros.extra.notas.filter((n) => !n.startsWith('1T26: comisión de ruptura'));
a.financieros.extra.notas.push(
  `1T26: comisión de ruptura de 2.800 M cobrada de Paramount Skydance por cuenta de WBD, registrada en «Interest and other income» (2.947 M en los nueve meses de 2026); infla el beneficio neto LTM y el BPA LTM [3, 9, ${C}].`,
  `LTM sep-26 = 2025 + 9M26 − 9M25 de la carta del 3T26; BPA LTM = suma de los BPA diluidos del 4T25 al 3T26 (0,56 + 1,23 + 0,80 + 0,87); FCF LTM con la definición de Netflix (flujo operativo − compras de inmovilizado) [1, ${C}].`,
  `Comprobación con el XBRL (cuentas-xbrl.json): ingresos, márgenes, beneficio, balance y flujos 2016-2025 cuadran. Diferencias explicadas: BPA y acciones 2016-2022 del XBRL sin reexpresar por el split 10:1 (aquí divididos/multiplicados por 10); gastos generales 2016-2021 del XBRL solo con G&A (aquí marketing reexpresado + G&A, de los 10-K); caja con inversiones a corto; capex = compras de inmovilizado (Netflix no tiene compras de intangibles aparte: los contenidos van en explotación) [1, 2, 13].`,
);

// ---------- trimestres ----------
a.trimestres.items = a.trimestres.items.filter((t) => t.periodo !== '3T24');
a.trimestres.items.push({
  periodo: '3T26', ingresos: r1(q3.ing), crecimiento_pct: 11.8, crecimiento_organico_pct: 11,
  ebitda: r1(q3.ebit + q3.da), margen_ebitda_pct: r1((q3.ebit + q3.da) / q3.ing * 100), bpa: 0.87, vs_consenso: 'Superior',
});
a.trimestres.ultima_presentacion =
  `**3T26 (20-oct-2026).** Netflix cumplió su guía de ingresos (12.874 M, +11,8 %) y la superó en margen (34,6 % frente a 33,2 % previsto) por calendario de gastos; el BPA de 0,87 USD batió los 0,82 del consenso de LSEG [${C}, ${RT}]. Lo que movió la acción fue la guía: 13.442 M de ingresos y 0,67 USD de BPA en el 4T26, por debajo de los 0,73 esperados, con un margen del 26,0 % que incluye ≈ 120 pb del despido de ≈ 1.000 personas (≈ 6 % de la plantilla); publicidad 2026 rebajada a ≈ 2.700 M desde ≈ 3.000 M por retrasos en integraciones con socios, y FCF a ≈ 12.000 M desde 12.500 M por una operación inmobiliaria [${C}, ${RT}, ${PPC}]. La carta dedica un párrafo a la «preocupación de los inversores» por las horas de visionado. En la entrevista, los analistas (Baird, MoffettNathanson, Morgan Stanley, StoneX) preguntaron por la demanda publicitaria, la diferencia de ingreso por miembro entre planes con y sin anuncios, el modelo país a país y el tamaño del recorte. Peters admitió ir «un poco por detrás» del objetivo de anuncios (aun así +80 % en 2026); Sarandos dijo que no hace falta cambiar la estrategia sino «mejor ejecución en EE. UU.». **Lo que evitaron**: guía de 2027 («prematura»; solo «crecimiento de doble dígito, más margen y más FCF»), el ahorro del recorte en 2027 y nuevos servicios añadidos [${PPC}]. **Frente al 2T26**: entonces la guía de 2026 se estrechó al alza en margen y la publicidad seguía en ≈ 3.000 M; ahora el tono pasa de «en línea» a «hay que hacerlo mejor». Warner Bros. Discovery ya no aparece en la carta: el acuerdo terminó en febrero y WBD pasó a Paramount Skydance [10, 12, ${C}, ${RT}].`;
a.trimestres.extra.notas.unshift(
  `3T26 (20-oct-2026): ingresos de 12.874 M (+11,8 %; +11 % a tipo constante), margen operativo del 34,6 %, BPA diluido de 0,87 USD; UCAN +11 %, EMEA +11 % (+9 % constante), LATAM +17 % (+12 %), APAC +12 % (+15 %); guía 4T26: 13.442 M (+11,5 %), margen del 26,0 % y BPA de 0,67 USD; 2026: 51.100 M (+13 %), margen del 31,5 %, FCF ≈ 12.000 M [${C}].`,
  `vs_consenso del 3T26: BPA de 0,87 frente a 0,82 USD de la media de LSEG (Reuters); ingresos en línea con lo esperado (≈ 12.874 M de consenso según la transcripción de S&P citada por PPC Land) [${RT}, ${PPC}]. Los trimestres anteriores no tienen consenso previo verificado (ver huecos).`,
  `El 10-Q del 3T26 aún no está en EDGAR a 21-oct-2026: las cifras del 3T26 salen de la carta a los accionistas y sus estados financieros sin auditar [${C}].`,
);
a.trimestres.extra.notas = a.trimestres.extra.notas.map((n) => n.replace('Las entrevistas de resultados son vídeos en YouTube con preguntas de analistas; no hay transcripción oficial en EDGAR.', `Las entrevistas de resultados son vídeos en YouTube con preguntas de analistas; no hay transcripción oficial en EDGAR: las citas del 3T26 salen de la cobertura de prensa [${PPC}].`));

// ---------- balance ----------
a.balance_30sep26 = {
  fecha: '2026-09-30',
  fuente: `Carta a los accionistas del 3T26 (balance sin auditar y conciliación de la deuda neta); el 10-Q aún no está publicado [${C}]`,
  deuda_bruta_contable: 15132.4,
  deuda_corto_plazo: 2474.8,
  deuda_largo_plazo: 12657.6,
  deuda_bruta_nominal: 15336.8,
  deuda_bruta_nominal_calculo: '15.132,4 contable + 59,3 de costes de emisión y descuento + 145,2 de ajuste de coberturas de valor razonable',
  caja: 8194.3,
  inversiones_corto_plazo: 28.7,
  caja_e_inversiones: 8223,
  deuda_neta_empresa: 7113.9,
  arrendamientos_operativos: 2330,
  arrendamientos_nota: 'Dato del 30-jun-2026 (10-Q del 2T26) a falta del 10-Q del 3T26; arrendamientos operativos en US GAAP: su coste ya está en el EBITDA y no van al puente [3].',
  obligaciones_contenidos: 25222.8,
  patrimonio_neto: 29286.3,
  autocartera_coste: 33232.8,
  comentario: `La deuda bruta sube ≈ 1.000 M frente a junio por la emisión de julio (2036), que paga el vencimiento de 1.000 M del 4T26; tras ese pago la deuda nominal volverá a ≈ 14.300 M y la caja a ≈ 7.200 M (estimación propia) [${C}, 11].`,
};
const v = a.balance.vencimientos.find((x) => x.anio === '2031+');
if (v && v.importe === 1800) v.importe = 2800;
a.balance.liquidez = `Caja y equivalentes de 8.194 M e inversiones a corto de 29 M a 30-sep-2026, más una línea de crédito revolving de 3.000 M sin disponer (vence en abril de 2029); de esa caja saldrán los 1.000 M del bono de noviembre de 2026 [${C}, 3].`;
a.balance.rating = `Moody's A2 (perspectiva positiva) y S&P A (estable), según la hoja de condiciones de la emisión de julio de 2026 [${FWP}].`;
a.balance.vida_media_anios = 4.6;
a.balance.otros_pasivos = `Obligaciones de contenidos de 25.223 M a 30-sep-2026 (3.885 M a corto y 1.723 M a largo en balance; el resto, ≈ 19.600 M, fuera de balance): es el pasivo que más pesa y no es deuda financiera, pero obliga como si lo fuera [${C}]. Arrendamientos operativos de ≈ 2.330 M (jun-26), ya recogidos en el EBITDA [3]. Covenant de la línea de crédito: EBITDA / intereses ≥ 3,0 veces, con holgura de más de 20 veces [3]. Brasil: depósito de ≈ 700 M previsto en 2026 por la disputa de impuestos indirectos [8]. Beneficios fiscales no reconocidos de 566 M [1]. Sin pensiones de prestación definida ni pagos aplazados de compras relevantes. En el 4T26: indemnizaciones del recorte de plantilla y cierre de una operación inmobiliaria, causa principal de la rebaja de 500 M de la guía de FCF [${C}].`;
a.balance.comentario = `Netflix pasó de financiar contenidos con deuda (de 3.364 M en 2016 a 16.309 M en 2020) a mantener la deuda bruta casi plana desde 2020 con caja propia. A 30-sep-2026 la deuda bruta nominal es de 15.337 M y la deuda neta de 7.114 M según la empresa, ≈ 0,45 veces el EBITDA LTM (estimación propia) [${C}]. La caja bajó de 9.034 M en diciembre a 8.194 M porque las recompras de los nueve meses (10.782 M) superaron el FCF (9.503 M) con la ayuda de la comisión de Warner Bros. El circulante es estructuralmente negativo salvo la caja: los pasivos de contenidos y los ingresos diferidos (1.780 M) financian parte del activo [${C}].`;
a.balance.extra.notas = a.balance.extra.notas.map((n) => n.startsWith('Vencimientos:') ? `Vencimientos: 2028 = 1.600 + 1.900; 2029 = 1.257 + 800 + 1.372 + 900; 2030 = 1.257 + 1.000; 2031+ = 1.000 (2034) + 1.000 (2036, emitido en julio de 2026) + 800 (2054); los bonos en euros a tipo de junio de 2026 [3, 11].` : n);
a.balance.extra.notas.push(
  `30-sep-2026: deuda contable de 15.132 M (2.475 M a corto, que incluye el bono de 1.000 M de noviembre de 2026) y nominal ≈ 15.337 M; caja de 8.194 M; deuda neta de 7.114 M según la conciliación de la empresa [${C}].`,
  `Vida media de ≈ 4,6 años a 30-sep-2026: media ponderada del calendario con el bono de 2036 (estimación propia).`,
);
a.huecos = a.huecos.filter((h) => !(h.seccion === 'balance' && h.campo === 'rating'));

// ---------- flujos ----------
const c9 = { pagos: 14934.23 + 43.07, amort: 12764.663 };
a.flujos.extra.contenidos = a.flujos.extra.contenidos.filter((x) => x.periodo !== '1S26');
a.flujos.extra.contenidos.push({
  periodo: '9M26', pagos_caja_contenidos: r1(c9.pagos), amortizacion_contenidos: r1(c9.amort),
  ratio: Math.round(c9.pagos / c9.amort * 100) / 100, exceso_pagos_sobre_amortizacion: r1(c9.pagos - c9.amort),
  exceso_pct_ventas: r1((c9.pagos - c9.amort) / m9_26.ing * 100), amortizacion_pct_ventas: r1(c9.amort / m9_26.ing * 100),
});
a.flujos.extra.notas = a.flujos.extra.notas.map((n) => {
  if (n.startsWith('1S26:')) return `9M26: pagos de contenidos de 14.977 M (altas de 14.934 M + 43 M de menos pasivos) frente a 12.765 M de amortización (1,17x); la guía del año sigue en ≈ 1,1x, lo que exige un 4T con pagos cercanos a la amortización [${C}].`;
  if (n.startsWith('Recompras de')) return `Recompras de 9.127 M en 2025 y 10.782 M en los nueve meses de 2026 (4.797 M en el 3T26, récord) [1, ${C}].`;
  if (n.startsWith('Flujo libre')) return `Flujo libre (definición de Netflix: flujo operativo − compras de inmovilizado): 6.900 M en 2024, 9.500 M en 2025, 9.503 M en los nueve meses de 2026 (7.589 M un año antes) y guía de ≈ 12.000 M en 2026, rebajada desde 12.500 M por una operación inmobiliaria en el 4T; incluye la comisión de ruptura de Warner Bros. después de impuestos [8, 9, ${C}].`;
  return n;
});
a.flujos.comentario = `Netflix quemó caja hasta 2019 (flujo operativo de −2.887 M) porque pagaba contenidos 1,4-1,6 veces por encima de lo que amortizaba; desde 2020 la ratio baja hacia 1,1x y el flujo operativo pasa a 10.149 M en 2025. El beneficio se convierte en caja casi uno a uno: FCF de 9.461 M frente a 10.981 M de beneficio en 2025 [1]. En los nueve meses de 2026 el FCF es de 9.503 M (+25 %), pero ≈ 2.200 M vienen de la comisión de Warner Bros. después de impuestos (estimación propia); sin ella crecería ≈ −4 % por el mayor gasto de contenidos (1,17x frente a 1,1x de guía) [${C}]. La guía de 2026 baja a ≈ 12.000 M por una operación inmobiliaria del 4T. El capex (694 M en 9M26, 1,8 % de las ventas) es sobre todo crecimiento (estudios y oficinas); el mantenimiento real está en los contenidos, que van en explotación: un capex de mantenimiento aparte no se publica [${C}].`;

// ---------- capital ----------
a.capital.politica = `Netflix no paga dividendo. Prioridades declaradas, «sin cambios»: reinvertir en el negocio (orgánico y compras selectivas), mantener un balance sano con grado de inversión y liquidez amplia, y devolver el excedente con recompras [${C}]. En el 3T26 recompró 63,9 M de acciones por 4.800 M, su mayor trimestre de recompras, y le quedan 22.300 M de autorización (incluida la de 25.000 M de abril de 2026) [${C}, 10]. Las recompras de los nueve meses (10.782 M) superan el FCF (9.503 M): se pagan en parte con la caja de la comisión de Warner Bros. y con el bono de julio [${C}].`;
a.capital.comentario = `Sin dividendo, la dirección ha usado la caja en recomprar: 6.045 M en 2023, 6.264 M en 2024, 9.127 M en 2025 y 10.782 M en 9M26, y las acciones diluidas bajan de 4.553,7 M en 2021 a 4.195,1 M en el 3T26 (−7,9 %) [1, ${C}]. La pausa de recompras anunciada en enero para financiar Warner Bros. (82.700 M de valor empresa) fue breve: perder la puja dejó 2.800 M de comisión y evitó el riesgo de integración. Las compras pequeñas de estudios (2021-2022) no han dado deterioros [2, 8, 12]. El punto débil es el momento: recompra récord a ≈ 75 USD por acción (4.797 M / 63,9 M) en el 3T26 mientras la acción cae más de un 40 % en un año [${C}, ${RT}].`;
a.capital.extra.notas = a.capital.extra.notas.map((n) => {
  if (n.startsWith('Abril de 2026')) return `Abril de 2026: nueva autorización de recompra de 25.000 M; 22.300 M pendientes tras el 3T26 [10, ${C}].`;
  if (n.startsWith('Recompras:')) return `Recompras: 6.045 M (2023), 6.264 M (2024), 9.127 M (2025), 10.782 M (9M26; 4.797 M en el 3T26 por 63,9 M de acciones) [1, ${C}].`;
  return n;
});
a.capital.extra.notas.push(`Acciones diluidas medias del 3T26: 4.195,1 M (básicas 4.134,5 M), frente a 4.261,3 M en el 2T26 y 4.340,4 M en el 3T25 (−3,3 % interanual) [${C}].`);
const ip = a.capital.adquisiciones.find((x) => x.objetivo.startsWith('InterPositive'));
if (ip) { ip.objetivo = 'InterPositive (herramientas de IA para cine) y otras del 1T26'; ip.importe = 585.7; ip.resultado = `Línea «Acquisitions» de 586 M en el 1T26 (estado de flujos de los nueve meses); sin desglose por compra hasta el 10-Q [${C}, 9].`; }

// ---------- calidad ----------
a.calidad.senales.push({ senal: 'Recorte de plantilla y operación inmobiliaria en el 4T26', nivel: 'Baja', comentario: `≈ 120 pb del margen del 4T26 por indemnizaciones (≈ 1.000 personas) y menor FCF del año por una operación inmobiliaria; se anuncian, pero sin cifra exacta hasta el 10-K [${C}, ${RT}].` });

// ---------- negocio ----------
const k = (n) => a.negocio.kpis.find((x) => x.kpi.startsWith(n));
Object.assign(k('Ingresos publicitarios'), { valor_actual: '≈ 2.700 M (guía 2026, rebajada en oct-26 desde ≈ 3.000 M)', variacion: '≈ +80 %', comentario: `Recorte por retrasos en integraciones con socios de nuevos productos publicitarios; el plan con anuncios llega a 15 países más en 2027 (los 12 primeros en marzo) [${C}, ${PPC}].` });
Object.assign(k('Margen operativo'), { valor_actual: '29,5 % (2025); 34,6 % (3T26); guía 31,5 % (2026)', comentario: `El de 2025 incluye ≈ 619 M de un litigio fiscal en Brasil; la guía de 2026 absorbe ≈ 30 pb del recorte de plantilla del 4T26 [1, 7, ${C}].` });
Object.assign(k('Ratio pagos'), { valor_actual: '1,08x (2025); 1,17x (9M26); ≈ 1,1x guía 2026', comentario: `Pagos de 17.708 M frente a 16.422 M de amortización en 2025; 14.977 M frente a 12.765 M en los nueve meses de 2026 [1, ${C}].` });
Object.assign(k('Horas de visionado'), { comentario: `Desde 2027 el informe de visionado pasa a ser anual; en el 3T26 la carta reconoce la «preocupación» de los inversores por el crecimiento de las horas, sin dar cifra global (India: +24 %) [8, 10, ${C}].` });
a.negocio.kpis.push({ kpi: 'Crecimiento de ingresos a tipo de cambio constante (3T26)', valor_anterior: '+17 % (3T25)', valor_actual: '+11 % (3T26)', variacion: '−6 pp', comentario: `UCAN +11 %, EMEA +9 %, LATAM +12 %, APAC +15 %; churn mejor que hace un año y que lo previsto [${C}].` });
a.negocio.extra.notas.push(`Ingresos por región en el 3T26: UCAN 5.628 M (+11 %), EMEA 4.107 M (+11 %; +9 % constante), LATAM 1.603 M (+17 %; +12 %), APAC 1.537 M (+12 %; +15 %); nueve meses: UCAN 16.305 M, EMEA 12.138 M, LATAM 4.684 M, APAC 4.556 M [${C}].`);

// ---------- huecos ----------
const hc = a.huecos.find((h) => h.campo === 'vs_consenso');
if (hc) { hc.intentos = '1) Cartas trimestrales: comparan con la guía propia, no con el consenso; 2) EDGAR: no hay consenso en las presentaciones; 3) prensa con consenso de LSEG: solo verificado para el 3T26 (Reuters), no para los siete anteriores sin pago'; hc.decision = 'Omitido salvo el 3T26'; }

a._estado = 'terminado';
fs.writeFileSync(ruta, JSON.stringify(a, null, 1) + '\n');
console.log('ok', { ltm: a.financieros.ltm, q3: a.trimestres.items.at(-1), fuentes: [C, FWP, RT, PPC] });
