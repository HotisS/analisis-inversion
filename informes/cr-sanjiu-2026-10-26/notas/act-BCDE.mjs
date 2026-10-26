// Actualización de las notas B, C, D y E tras el 3T26 (corte 26-oct-2026). Se aplica sobre los objetos que monta construir-notas.mjs.
const CN = 'http://static.cninfo.com.cn/finalpage';

// ---------------------------------------------------------------- B: sector y competencia
export function actualizaB(B) {
  B.fuentes = B.fuentes.map((f) => (f.id === 6 ? { ...f, fecha: '2026-10-26' } : f)).concat([
    { id: 10, titulo: '2026年10月24日投资者关系活动记录表: la dirección describe el sector (cierres de farmacias, paso a lo no reembolsable y a lo online, «fase de bajo crecimiento» y competencia por el mercado existente)', editor: 'China Resources Sanjiu (CNINFO/SZSE)', tipo: 'Primaria', fecha: '2026-10-25', url: `${CN}/2026-10-25/1225621931.PDF` },
    { id: 11, titulo: '昆药集团2026年第三季度报告 (KPC: ventas −42,7 % en 9M26, −22,9 % en el 3T26)', editor: 'KPC Pharmaceuticals (CNINFO/SSE)', tipo: 'Primaria', fecha: '2026-10-24', url: `${CN}/2026-10-24/1225620019.PDF` },
  ]);
  B.sector.ciclo.comentario = 'El mercado chino de medicamentos cae por primera vez en años (−1,0 % en 9M25, −1,3 % en el 1T26) por el control del gasto y los precios, e IQVIA rebaja su crecimiento al 1,7 % anual hasta 2030 [B1, B2]. En la conferencia del 3T26 la propia dirección dice que el sector ha entrado en una «fase de bajo crecimiento», con una ola de cierres de farmacias y competencia por el mercado existente [B10]. Las marcas de farmacia aguantan mejor que los hospitales, pero el tráfico en farmacias físicas cae. En 2020 la COVID hundió los antigripales de marca (beneficio de Sanjiu −24 %) y en 2022-2023 los disparó; en 2025 la gripe volvió a mover el 4T [A1, A18].';
  B.sector.tendencias = 'Las ventas se mueven a internet (B2C y O2O crecen ≈ 30 % al año) y a los centros de salud de barrio con los medicamentos de las compras centralizadas [B1]. Las farmacias cierran y se especializan en productos fuera del seguro médico, que es donde está el CHC de Sanjiu; la empresa dice que su venta online «sigue creciendo deprisa» en 2026 [B10]. Sanjiu gana en lo primero (marca conocida, presencia en plataformas) y pierde en lo segundo si sus productos de receta entran en las compras con rebajas de precio. Los grupos estatales concentran el sector comprando cotizadas (Tasly, KPC). La innovación (un GLP-1/GIP con la solicitud de registro admitida en China, una terapia celular de iPSC para la insuficiencia cardiaca en ensayo confirmatorio) es todavía pequeña en ventas [A6, B10].';
  B.competencia.amenazas = 'Las amenazas son de política más que de rivales: compras centralizadas que extienden rebajas de precio a la medicina china de receta (Tasly y KPC, probabilidad alta), control del precio de los medicamentos en farmacia y online (media), nuevo prospecto de Ganmaoling que advierte de no conducir (media, efecto en la temporada 2026-27) y cierre de farmacias (alta, ya en curso) [A1, B4, B5, B10]. Rivales como Yiling y Baiyunshan compiten en la ola de gripe con precio y publicidad. KPC ha perdido el 42,7 % de sus ventas en 9M26 por su ajuste de canal, tras perder ≈ 370 M en el 1S26 [B9, B11]. La marca no se erosiona rápido, pero el margen EBIT del grupo (14,7 % en 2025) está muy por debajo de las marcas puras (28-31 %) por la receta y la distribución [B6].';
  return B;
}

// ---------------------------------------------------------------- C: equipo y gobierno
export function actualizaC(C) {
  C.fuentes = C.fuentes.concat([
    { id: 12, titulo: '2026年第三季度报告: diez primeros accionistas a 30-sep-2026 (China Resources Pharmaceutical Holdings 63,22 %; HKSCC 1,94 %) y cambios en el consejo', editor: 'China Resources Sanjiu (CNINFO/SZSE)', tipo: 'Primaria', fecha: '2026-10-24', url: `${CN}/2026-10-24/1225619287.PDF` },
    { id: 13, titulo: '董事会2026年第十次会议决议公告 (11 de 11 consejeros presentes; renovación de KPMG Huazhen para 2026)', editor: 'China Resources Sanjiu (CNINFO/SZSE)', tipo: 'Primaria', fecha: '2026-10-24', url: `${CN}/2026-10-24/1225619289.PDF` },
  ]);
  C.gobierno.accionistas = [
    { nombre: 'China Resources Pharmaceutical Holdings (华润医药控股; grupo China Resources, SASAC)', pct: 63.22, tipo: 'Control estatal', variacion: 'Sin cambios (1.052,1 M acciones)' },
    { nombre: 'HKSCC (inversores de Hong Kong por Stock Connect)', pct: 1.94, tipo: 'Institucional', variacion: '+0,13 puntos en el 3T26 (32,2 M acciones); había bajado en el 1S26' },
    { nombre: 'Liu Shaoluan (persona física)', pct: 0.82, tipo: 'Particular', variacion: 'Sin cambios en el 3T26 (13,57 M acciones, casi todas en cuenta de crédito)' },
    { nombre: 'Southern S&P China A Large Cap Dividend Low Vol 50 ETF', pct: 0.55, tipo: 'Fondo índice', variacion: 'Entra en los diez primeros en el 3T26' },
    { nombre: 'E Fund CSI 300 Health Care ETF', pct: 0.51, tipo: 'Fondo índice', variacion: '−0,14 puntos en el 3T26' },
  ];
  C.gobierno.alertas = [
    'Operaciones vinculadas recurrentes con el grupo China Resources (ventas, banco, factoring) [C7, C8].',
    'Rotación en la cúpula: CEO nuevo en septiembre de 2024; un consejero sustituido en diciembre de 2025 [C5]; la consejera y vicepresidenta jurídica sale por jubilación (julio de 2026) y entra el director financiero como consejero (junta de septiembre de 2026) [C3, C4, C9, C12].',
  ];
  C.directivos.comentario = 'Equipo de carrera del grupo estatal China Resources, que rota directivos entre sus farmacéuticas (Double-Crane, Jiangzhong, KPC, Sanjiu) [C1]. Credibilidad media: cumplió el plan de duplicar ventas, pero con compras que diluyen el beneficio por acción frente a lo prometido (pro forma 2,84 CNY en 2024 frente a 2,06 reales en 2025) [A14]. La dirección no da guía numérica anual, ni siquiera en la conferencia del 3T26, y en 9M26 el beneficio cae un 8,3 % cuando prometía crecer por encima del sector [C1, A21]. Ningún directivo tiene acciones relevantes y el variable depende de la evaluación del grupo estatal. Cambio de CEO en septiembre de 2024 y salida por jubilación de la vicepresidenta jurídica en julio de 2026, sustituida en el consejo por el director financiero [C3, C9, C12].';
  C.directivos.historial_guidance = C.directivos.historial_guidance.map((g) => (g.anio === '2026' ? { ...g, real: '9M26: ventas −2,6 %, beneficio −8,3 % [A19]' } : g));
  return C;
}

// ---------------------------------------------------------------- D: mercado y valoración
export function actualizaD(D, bol) {
  D.fuentes = D.fuentes.map((f) => {
    if (f.id === 1) return { ...f, titulo: f.titulo, fecha: '2026-10-26' };
    if (f.id === 2) return { ...f, titulo: 'Cotización de 000999 (cierre del 26-oct-2026: 25,05 CNY, 15:35:30 de Pekín; cierre anterior 24,78)', fecha: '2026-10-26' };
    if (f.id === 3) return { ...f, titulo: 'Consenso de Yahoo Finance (earningsTrend: BPA 2026e 2,10 y 2027e 2,30, hace 90 días 2,25 y 2,44; objetivo medio de 10 analistas: 33,73 CNY) y fichas de los comparables', fecha: '2026-10-26' };
    if (f.id === 4) return { ...f, titulo: 'Lista de informes de analistas de 000999 en 2026 (Sinolink 22-mar, 24-ago y 25-oct; Southwest 1-sep)', fecha: '2026-10-26' };
    if (f.id === 7) return { ...f, titulo: 'Curva de bonos del Estado chino (中债国债收益率曲线), 10 años: 1,64 % el 23-oct-2026', fecha: '2026-10-23' };
    if (f.id === 9) return { ...f, titulo: 'List of SZSE Securities / China Connect Securities (comprables y vendibles): 000999, CCASS 70999, actualizada el 23-oct-2026', fecha: '2026-10-23' };
    return f;
  }).concat([
    { id: 14, titulo: '«UBS将华润三九评级下调至中性 目标价27元人民币» (UBS baja a neutral con objetivo de 27 CNY)', editor: 'Cailian Press (财联社), reproducido en Eastmoney', tipo: 'Prensa', fecha: '2026-10-21', url: 'https://guba.eastmoney.com/news,000999,1785492047.html' },
    { id: 15, titulo: 'Nota del 3T26: «短期承压，静待旺季修复与并购整合成效» (previsiones 2026-2028: ventas 31.653 / 34.555 / 37.508 M; EBIT 5.005 / 5.447 / 6.059 M; BPA 2,06 / 2,31 / 2,57; DPA 1,03 / 1,16 / 1,29; «comprar»)', editor: 'Sinolink Securities (国金证券)', tipo: 'Analistas', fecha: '2026-10-25', url: 'https://pdf.dfcfw.com/pdf/H3_AP202610251830892335_1.pdf' },
    { id: 16, titulo: 'Cotizaciones de Tasly (600535: 13,95 CNY) y KPC (600422: 8,95 CNY) al cierre del 26-oct-2026', editor: 'Sina Finance', tipo: 'Datos de mercado', fecha: '2026-10-26', url: 'https://hq.sinajs.cn/list=sh600535,sh600422' },
    { id: 17, titulo: '`herramientas/movimiento.mjs 000999.SZ` (variación a 1-12 meses, distancia a máximos y mínimos, media de 200 sesiones) y caídas diarias de más del 5 % del último año (`movimiento-precio.mjs`: ninguna)', editor: 'Yahoo Finance (históricos diarios)', tipo: 'Datos de mercado', fecha: '2026-10-26', url: 'https://finance.yahoo.com/quote/000999.SZ/history' },
    { id: 18, titulo: 'Anuncios de 000999 en CNINFO de los últimos 12 meses (resultados, consejo, juntas, repartos; sin colocaciones, ampliaciones ni operaciones de directivos)', editor: 'CNINFO', tipo: 'Primaria', fecha: '2026-10-26', url: 'http://www.cninfo.com.cn/new/disclosure/stock?stockCode=000999&orgId=gssz0000999' },
  ]);
  Object.assign(D.identificacion, {
    nombre: 'China Resources Sanjiu Medical & Pharmaceutical Co., Ltd.', // sin el nombre chino (华润三九医药股份有限公司): en tres líneas se monta sobre el subtítulo de la portada
    precio: 25.05, fecha_precio: '2026-10-26', capitalizacion_publicada: 41689, free_float_pct: 36.8,
    max_52s: bol.identificacion.max_52s, min_52s: bol.identificacion.min_52s,
    volumen_medio_diario: '≈ 270 M CNY/día (3 meses)', proximos_resultados: '2027-03-20',
  });
  D.consenso = {
    guidance: 'Sin guía numérica. En el anual 2025 la empresa preveía para 2026 ventas que crecieran «por encima de la media del sector» y un beneficio «acorde», con unos 2.800 M de capex [A1]. En la conferencia del 3T26 (24-oct) no dio cifras: habló de un sector «en fase de bajo crecimiento», de la temporada de gripe del 4T y de una política de dividendo de más del 50 % del beneficio [A21]. Con 9M26 en −2,6 % de ventas y −8,3 % de beneficio, la guía cualitativa de 2026 no se cumple en beneficio.',
    estimaciones: [
      { periodo: '2026e', ingresos: 31653, ebitda: null, ebit: 5005, bpa: 2.06, dpa: 1.03, fuente: 'Sinolink, 25-oct-2026 (tras el 3T26) [D15]' },
      { periodo: '2027e', ingresos: 34555, ebitda: null, ebit: 5447, bpa: 2.31, dpa: 1.16, fuente: 'Sinolink, 25-oct-2026 [D15]' },
      { periodo: '2028e', ingresos: 37508, ebitda: null, ebit: 6059, bpa: 2.57, dpa: 1.29, fuente: 'Sinolink, 25-oct-2026 [D15]' },
    ],
    recomendaciones: { n_analistas: 10, comprar: null, mantener: null, vender: null, po_medio: 33.73, po_min: 27.0, po_max: 37.2 },
    revisiones: 'Tras el 1S26 los brókeres recortaron (Sinolink bajó el BPA de 2026e de 2,27 a 2,06; Southwest quedó en 1,92 / 2,31 / 2,44; Orient en 2,26 / 2,48 / 2,76) [D5, D6, D11]. Tras el 3T26 Sinolink mantiene 2,06 / 2,31 / 2,57 y «comprar» [D15]. La media de Yahoo baja: 2026e de 2,25 hace 90 días a 2,10 hoy y 2027e de 2,44 a 2,30; su objetivo medio pasa de 35,15 CNY (20-oct) a 33,73 [D3]. El 21-oct UBS bajó la recomendación a neutral con objetivo de 27 CNY [D14]. Tendencia de 3 meses: recortes (lista de notas en Eastmoney [D4]). Sinolink es la única nota posterior al 3T26 con cuenta completa; no publica EBITDA, por eso el consenso va con ventas, EBIT y BPA, y el BPA se contrasta con la media de Yahoo.',
    base_ebitda: 'NIIF', ajuste_ebitda_pct_ventas: null,
    confianza: 'Media',
  };
  D.bolsa = { ...bol.bolsa, beta: 0.64, posicion_corta_pct: null,
    comentario: 'En cinco años la acción ha rentado un 12,5 % anual con dividendos frente al −1,7 % del CSI 300, porque las compras y la ola de gripe de 2022-2023 la subieron un 40 % al año en 2021 y 2022 [D1]. Cotiza un 37,4 % por debajo de su máximo de cinco años y su peor caída fue del 40,4 % (de octubre de 2024 a junio de 2026): −14,6 % en 2025 con el CSI 300 a +20,8 %, por la caída del CHC, la deuda de Tasly y las pérdidas de KPC [D1, A6]. En 2026 va algo mejor que el índice (−8,3 % frente a −9,8 %) y peor que el ETF de salud (+1,1 %). Subió nueve sesiones seguidas hasta el 19-oct (26,26 CNY) por la rotación a valores de dividendo con el bono al 1,6 %, y cedió un 5,6 % hasta el 23-oct con la rebaja de UBS; el día de los resultados del 3T26 abrió a la baja y cerró +1,1 % [D2, D14, E1]. La beta mensual frente al CSI 300 sale negativa (−0,16) y la semanal de 5 años ajustada es 0,64: es una acción defensiva que se mueve por su propio ciclo [D1].',
    contexto: {
      movimiento: { fecha: '2026-10-26', var_1m_pct: 5.1, var_3m_pct: 0.2, var_6m_pct: -8.8, var_12m_pct: -13.8, dist_max_52s_pct: -17.9, dist_min_52s_pct: 13.0, dist_max_historico_pct: -37.4, tendencia: 'bajista', volatilidad_60d_pct: 23, avisos: [] },
      movimientos_fuertes: [],
      noticias: [
        { fecha: '2026-10-24', tipo: 'resultados', hecho: '3T26: ventas −10,9 % y beneficio atribuido −9,4 %; deterioros de 428 M en 9M26 (139 M de I+D cancelada); KPC casi en equilibrio en el trimestre (−2 M) [A19, A20, A24]. Es lo que motiva este informe y ya está en las cifras.', veredicto: 'no cambia', condicion: null },
        { fecha: '2026-10-21', tipo: 'recomendación', hecho: 'UBS baja a neutral con objetivo de 27 CNY [D14]. Antes del 3T26; la acción cedió un 3 % en dos sesiones. Es una opinión, no un hecho pendiente.', veredicto: 'no cambia', condicion: null },
        { fecha: '2026-10-25', tipo: 'recomendación', hecho: 'Sinolink mantiene «comprar» y su BPA de 2026-2028 (2,06 / 2,31 / 2,57) tras el 3T26 [D15].', veredicto: 'no cambia', condicion: null },
        { fecha: '2026-09-11', tipo: 'directivos', hecho: 'La junta extraordinaria nombra consejero al director financiero (Xing Jian) en lugar de la vicepresidenta jubilada; sin compras ni ventas de directivos en 12 meses [C4, C11, D18].', veredicto: 'no cambia', condicion: null },
        { fecha: '2026-07-20', tipo: 'demanda o regulador', hecho: 'La NMPA obliga a cambiar el prospecto de Ganmaoling (advertencia de conducción y contraindicaciones), con plazo hasta el 15-oct-2026 y nueve meses para el producto ya vendido [B4]. Afecta a la temporada de gripe 2026-27; está en el bajista.', veredicto: 'no cambia', condicion: null },
        { fecha: '2026-10-26', tipo: 'accionista de referencia', hecho: 'China Resources Pharmaceutical Holdings mantiene el 63,22 % sin cambios ni anuncios de venta; no hay ampliaciones, colocaciones ni convertibles anunciados en 12 meses [C12, D18].', veredicto: 'no cambia', condicion: null },
      ],
      proximos_resultados: '2027-03-20',
      veredicto: 'no cambia',
      condicion: null,
      comentario: 'La acción sube un 5,1 % en un mes y cae un 13,8 % en doce; cotiza un 4,4 % por debajo de su media de 200 sesiones (tendencia bajista, sin aviso P5) y un 13 % por encima del mínimo de 52 semanas [D17]. No hay movimientos de más del 15 % en un mes en el último año ni caídas diarias de más del 5 % [D17]. Lo que mueve el precio en octubre es la rotación a dividendo, la rebaja de UBS y unos resultados del 3T26 ya descontados (cierre +1,1 % el día siguiente) [D2, D14]. No hay hechos pendientes ajenos al análisis (colocación del accionista de control, ampliación, oferta): los próximos resultados son los anuales de marzo de 2027 (estimación propia: el anual de 2025 salió el 21-mar-2026). Veredicto: no cambia.',
    },
  };
  return D;
}

// ---------------------------------------------------------------- E: sentimiento
export function actualizaE(E) {
  E.fuentes = [
    { id: 1, titulo: 'Foro de 000999 en Guba (股吧), página 1 (≈ 100 mensajes del 23 al 26 de octubre de 2026, tras el 3T26)', editor: 'Eastmoney Guba', tipo: 'Foros y redes', fecha: '2026-10-26', url: 'https://guba.eastmoney.com/list,000999.html' },
    { id: 2, titulo: 'Foro de 000999 en Guba, página 2 (≈ 100 mensajes del 19 al 23 de octubre de 2026)', editor: 'Eastmoney Guba', tipo: 'Foros y redes', fecha: '2026-10-23', url: 'https://guba.eastmoney.com/list,000999_2.html' },
    { id: 3, titulo: 'Foro de 000999 en Guba, página 3 (≈ 100 mensajes del 13 al 19 de octubre de 2026)', editor: 'Eastmoney Guba', tipo: 'Foros y redes', fecha: '2026-10-19', url: 'https://guba.eastmoney.com/list,000999_3.html' },
    { id: 4, titulo: 'Hilo de Guba «这合并两个中药公司是收购了个累赘吗？» (crítica a las compras de KPC y Tasly tras el 3T26)', editor: 'Eastmoney Guba', tipo: 'Foros y redes', fecha: '2026-10-23', url: 'https://guba.eastmoney.com/news,000999,1786734428.html' },
    { id: 5, titulo: '«“国民感冒药”感冒灵不能随便吃了» y comentarios de lectores', editor: 'Jiemian (界面新闻)', tipo: 'Prensa', fecha: '2026-07-29', url: 'https://www.jiemian.com/article/14844540.html' },
  ];
  E.sentimiento = {
    tono: 'Dividido', tendencia: 'Empeora',
    revisadas: [
      { plataforma: 'Guba (Eastmoney), foro de 000999, tras el 3T26', fecha: '2026-10', n_comentarios: 100, tono: 'Negativo', resumen: 'Decepción con el 3T26 («ventas y beneficio a la baja, las dos alas aún no enganchan»), críticas a KPC y a la gestión de la integración; una minoría lo ve como «malas noticias ya descontadas» y compra para el 4T de gripe [E1, E4].' },
      { plataforma: 'Guba, semana de la rebaja de UBS', fecha: '2026-10', n_comentarios: 100, tono: 'Negativo', resumen: 'La rebaja de UBS a neutral (27 CNY) y la caída desde 26,26 CNY reavivan el pesimismo: muchos esperan otro tramo bajista de dos meses [E2].' },
      { plataforma: 'Guba, semana del dividendo y del rebote', fecha: '2026-10', n_comentarios: 100, tono: 'Positivo', resumen: 'Nueve sesiones al alza hasta superar la media de 250 sesiones; alivio de quienes compraron a 28-30 CNY y valoración del dividendo frente al bono al 1,6 % [E3].' },
      { plataforma: 'Prensa económica (Jiemian) y comentarios de lectores', fecha: '2026-07', n_comentarios: 10, tono: 'Negativo', resumen: 'Nuevo prospecto de Ganmaoling («no se puede tomar a la ligera») [E5].' },
    ],
    temas: [
      { tema: 'KPC y Tasly: ¿compras que lastran?', postura: 'Bajista', peso: 'Alto', contraste: 'Tienen razón con KPC (−366 M en 9M26, 1.129 M de fondo de comercio), pero exageran con Tasly, cuyo beneficio sube un 12,0 % en 9M26 [A24, A25].' },
      { tema: 'Dividendo y refugio defensivo', postura: 'Alcista', peso: 'Medio', contraste: 'Rentabilidad por dividendo ≈ 4,0 % (1,01 CNY en los últimos doce meses) con el bono a 10 años al 1,64 % [A12, D7].' },
      { tema: 'Temporada de gripe del 4T', postura: 'Dividida', peso: 'Medio', contraste: 'El 4T25 creció un 22,1 % con la gripe; repetirlo es difícil y el nuevo prospecto de Ganmaoling resta [A18, B4].' },
      { tema: 'Deterioros: «el beneficio solo cae por las provisiones»', postura: 'Alcista', peso: 'Bajo', contraste: 'En parte cierto: el 扣非 del 3T26 cae un 3,9 % y el EBIT del trimestre sube del 10,0 % al 11,0 % de las ventas, pero las ventas caen un 10,9 % [A19].' },
    ],
    lectura: 'El sentimiento del particular empeora con la rebaja de UBS y el 3T26: pasa del alivio por el rebote y el dividendo a la decepción con las ventas y KPC [E1, E2, E3]. No es capitulación (no hay ventas en pánico; el día de los resultados la acción cerró al alza) ni euforia. Lo que preocupa (KPC, la integración) es lo mismo que señala el informe; lo que gusta (dividendo frente al bono) es real. Contrasta con el consenso de analistas, que sigue en «comprar» con objetivo medio de 33,73 CNY, pero se alinea con UBS. No aporta cifras nuevas.',
    confianza: 'Media',
  };
  E.huecos = [];
  return E;
}
