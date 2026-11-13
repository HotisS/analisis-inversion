// Iteración del 13-nov-2026 tras la actualización de nueve meses (4-nov-2026), sobre las notas del 15-oct
// (copiadas de informes/wolters-kluwer-2026-10-15/notas y revisadas campo a campo).
// A: cuentas anuales y semestrales sin cambios (no hay cuentas nuevas: el avance de 9M no publica cuenta ni balance);
//    se actualizan la última presentación, KPI, política de capital y la desinversión de octubre. XBRL ESEF rebajado hoy.
// C: registros de la AFM consultados el 13-nov (participaciones, cortos, directivos).
// D: precio, bolsa, consenso, comparables REHECHOS (Yahoo 12-nov + MarketScreener), puente a 30-sep, Bund del 12-nov.
// E: sentimiento releído.
// Uso: node informes/wolters-kluwer-2026-11-13/notas/construir-notas.mjs  (se ejecuta UNA vez sobre las copias)
import { readFileSync, writeFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
const dir = fileURLToPath(new URL('.', import.meta.url));
const leer = (n) => JSON.parse(readFileSync(dir + n, 'utf8'));
const escribir = (n, o) => writeFileSync(dir + n, JSON.stringify(o, null, 1) + '\n');
const A = leer('A.json'), C = leer('C.json'), D = leer('D.json'), E = leer('E.json');
const B = leer('bolsa.json');
if (D._iteracion === '2026-11-13') { console.log('Ya construidas'); process.exit(0); }

// ============ A ============
A.fuentes.push(
  { id: 20, titulo: 'Wolters Kluwer 2026 Nine-Month Trading Update (texto íntegro de la nota, GlobeNewswire)', editor: 'Wolters Kluwer', tipo: 'Primaria', fecha: '2026-11-04', url: 'https://www.ariva.de/news/wolters-kluwer-2026-nine-month-trading-update-12193797' },
  { id: 21, titulo: 'Share buyback transaction details November 5-11, 2026', editor: 'Wolters Kluwer (MFN)', tipo: 'Primaria', fecha: '2026-11-12', url: 'https://mfn.se/all/a/wolters-kluwer/share-buyback-transaction-details-november-5-november-11-2026-8016b4ab' },
);
A.trimestres.ultima_presentacion = 'Wolters Kluwer no publica transcripciones gratuitas; esto sale de las notas y presentaciones de resultados. **1S26 (5-ago-26)**: guía de grupo reiterada; orgánico del 5 % (6 % sin impresos), recurrentes +7 %, no recurrentes −3 % [8, 17]. El discurso pasó de describir la IA como oportunidad a dar métricas de adopción (más del 90 % de los clientes Enterprise de UpToDate en EE. UU. con Expert AI; ~250 despachos con los módulos agénticos de CCH Axcess; Libra en 10 países) [8, 17]. Rebajó la guía orgánica de CP&ESG a «en línea» con 2025 y avisó de variabilidad transaccional en FCC [8]. **9M26 (4-nov-26)**: orgánico del 6 % en nueve meses, con el tercer trimestre acelerando (en torno al 7 % por diferencia con el 5 % del semestre: estimación propia), recurrentes +7 %, nube +15 %, beneficio operativo ajustado +10 % a tipo constante y guía reiterada [20]. Las métricas de IA siguen subiendo: Expert AI en más del 95 % de los clientes Enterprise de EE. UU. y 2.000 pilotos en 70 países, más de 400 despachos con los módulos agénticos de CCH Axcess y 17.000 licencias de Libra; nuevas alianzas con Epic, Suki y Doximity para meter UpToDate en otros flujos de trabajo [20]. Lo que no detalla: Clinical Solutions crece un 6 % (7 % en 9M25) con ayuda de «cuotas de alianzas» no recurrentes, y T&A Norteamérica baja al 5 % (7 % en 9M25) [20]. Avisa de que el gasto en desarrollo y la reestructuración subirán «de forma significativa» en el cuarto trimestre: el +10 % del beneficio de nueve meses no se extrapola al año [20].';
const kp = A.negocio.kpis;
kp[0].valor_actual = '6 % (2025); 5 % (1S26); 6 % (9M26)'; kp[0].variacion = 'estable en 9M26';
kp[0].comentario = '1T24 6 %, 1S24 6 %, 9M24 6 %, 2024 6 %; 1T25 5 %, 1S25 5 %, 9M25 6 %, 2025 6 %; 1T26 5 %, 1S26 5 % (6 % sin impresos), 9M26 6 % (impresos −100 pb) [1, 8, 9, 10, 11, 12, 13, 14, 20].';
kp[1].valor_actual = '83 %; +7 % (2025); 85 %; +7 % (9M26)'; kp[1].comentario = 'No recurrentes: +1 % (2024), −1 % (2025), −3 % (1S26), 0 % (9M26, con cuotas de alianzas que compensan impresos, licencias e implantaciones) [1, 8, 20].';
kp[2].valor_actual = '21 %; +15 % (2025); 24 % recurrente; +15 % (9M26)'; kp[2].variacion = 'estable'; kp[2].comentario = 'La nube es el 46 % del software en 2025; +14 % en 1S26 y +15 % en 9M26 [1, 8, 10, 20].';
kp[3].valor_actual = '7 % (2025); 5 % (1S26); 6 % (9M26)'; kp[3].variacion = '−1 p.p. en 9M26';
kp[3].comentario = 'UpToDate: renovación >90 %, ~10 % de los ingresos del grupo; >95 % de los clientes Enterprise de EE. UU. con UpToDate Expert AI y 2.000 pilotos fuera de EE. UU. a septiembre de 2026; el 9M26 incluye cuotas de alianzas [1, 8, 17, 18, 20].';
kp[4].comentario = 'T&A Norteamérica: 8 % (2024 y 2025), 5 % en 1S26 y 9M26; nube de T&A +17 % en 9M26; renovación de CCH Axcess >95 %; más de 400 despachos con los módulos agénticos a 30-sep-2026 [1, 17, 19, 20].';
kp[5].comentario = 'Guía 2026 ~28,0 % reiterada el 4-nov pese a subir el desarrollo de producto al 12-13 % de los ingresos; beneficio operativo ajustado de 9M26 +10 % a tipo constante [1, 8, 20].';
kp[6].comentario = 'Estable en el 11 % de los ingresos en 9M26: el aumento se concentra en el cuarto trimestre [1, 8, 20].';
kp[7].comentario = 'Restan 50 pb al orgánico de 2025, 130 pb en 1T26 y 100 pb en 9M26 [1, 11, 20].';
A.capital.politica = 'Dividendo progresivo: la empresa quiere subir el dividendo por acción en euros cada año, con independencia de la divisa; a cuenta del 40 % del total del año anterior. Dividendo de 2025: 2,52 EUR (+8 %), a cuenta de 2026: 1,01 EUR [1, 8]. Política antidilución desde 2012 y recompras adicionales: 1.000 M al año en 2022-2024, 1.100 M en 2025 y hasta 500 M en 2026, de los que 264,3 M ejecutados a 67,97 EUR de media hasta el 11-nov [20, 21]; desde mediados de septiembre el mandato (256 M del 6-ago al 28-dic) apenas compra (349 acciones del 5 al 11-nov) [21]. El 4-nov firmó un mandato de 75 M para enero y febrero de 2027 y detallará el programa de 2027 el 24-feb [20]. Apalancamiento objetivo de 1,5-2,5x deuda neta/EBITDA (2,0x a 30-sep-2026) [20]; prioridades: inversión orgánica (desarrollo al 12-13 % de las ventas), adquisiciones selectivas y retorno al accionista [1, 3].';
A.capital.adquisiciones.push(
  { anio: '2026', objetivo: 'Marosa (automatización del IVA, CP&ESG)', importe: 112, ev_ebitda: null, financiacion: 'Caja', resultado: 'Comprada el 4-ago-2026; la empresa dice que crece «por delante del plan» junto con RASi, Brightflag y Libra [8, 20].' },
  { anio: '2026', objetivo: 'Venta del negocio fiscal de consumo de Alemania (T&A Europa)', importe: 40, ev_ebitda: null, financiacion: 'Cobro en caja', resultado: 'Vendido a finales de octubre de 2026 por 40 M; unos 30 M de ingresos brutos esperados en 2026 (sin auditar), dos tercios ya reconocidos a 31-oct [20].' },
);
A.notas_integrador = (A.notas_integrador || '') + ' | 13-nov: sin cuentas nuevas (el avance de 9M solo da crecimientos, deuda neta y acciones). LTM sigue a jun-26. XBRL ESEF rebajado: mismas cifras 2020-2025.';

// ============ C ============
const fc = (id, cambios) => Object.assign(C.fuentes.find((f) => f.id === id), cambios);
fc(13, { fecha: '2026-11-13', titulo: 'Registro de participaciones significativas (substantiële deelnemingen), Wolters Kluwer N.V., exportación CSV del 13-nov-2026' });
fc(14, { fecha: '2026-11-13', titulo: 'Registro de posiciones cortas netas (actual e histórico), Wolters Kluwer N.V., exportación CSV del 13-nov-2026' });
fc(15, { fecha: '2026-11-13', titulo: 'Registro de notificaciones de miembros del Executive Board y del Supervisory Board (última: 21-may-2026), consultado el 13-nov-2026' });
C.fuentes.push({ id: 17, titulo: 'Wolters Kluwer 2026 Nine-Month Trading Update', editor: 'Wolters Kluwer', tipo: 'Primaria', fecha: '2026-11-04', url: 'https://www.ariva.de/news/wolters-kluwer-2026-nine-month-trading-update-12193797' });
const acc = C.gobierno.accionistas;
const mfs = acc.find((a) => a.nombre.startsWith('Massachusetts'));
Object.assign(mfs, { pct: 1.82, variacion: 'Bajó al 1,82 % del capital (2,57 % de los votos) el 3-nov-2026, desde el 2,33 % del 8-may-2026; tenía un 2,97 % en enero de 2024 [13]' });
const amu = acc.find((a) => a.nombre.startsWith('Amundi'));
Object.assign(amu, { pct: 3.38, variacion: 'Cruza el 3 % arriba y abajo: 3,30 % el 3-sep, 2,96 % el 25-sep y 3,38 % el 15-oct-2026 [13]' });
const aut = acc.find((a) => a.tipo === 'Autocartera');
Object.assign(aut, { pct: 1.02, variacion: '2,3 M de acciones a 30-sep-2026 tras amortizar 7,8 millones el 18-sep (224,7 M emitidas, 222,4 M en circulación) [13, 17]. Tenía un 4,2 % el 4-ago-2026 y un 2,73 % a cierre de 2025 [2, 1]' });
C.gobierno.alertas = C.gobierno.alertas.map((t) => t.startsWith('Posiciones cortas')
  ? 'Posiciones cortas en el registro de la AFM: D.E. Shaw llegó al 0,80 % (10-abr-2026) y estaba en el 0,40 % el 18-sep-2026; Millennium volvió a cruzar el 0,5 % (0,52 % el 21-oct-2026) y bajó al 0,49 % el 23-oct [14]. A 13-nov-2026 ninguna posición supera el 0,5 % en el registro actual [14].'
  : t);
C.notas_integrador = (C.notas_integrador || '') + ' | 13-nov: AFM consultada: sin operaciones de directivos desde el 26-feb-2026 (última notificación, la posición inicial de De Vries el 21-may); MFS baja al 1,82 %; Amundi 3,38 %; cortos sin posiciones ≥ 0,5 %.';

// ============ D ============
D._iteracion = '2026-11-13';
Object.assign(D.identificacion, {
  precio: 89.5, fecha_precio: '2026-11-12', acciones: 223.1,
  max_52s: B.identificacion.max_52s, min_52s: B.identificacion.min_52s,
  volumen_medio_diario: `≈ ${String(B.volumen_3m.importe_dia_millones).replace('.', ',')} M EUR/día (3 meses)`,
  capitalizacion_publicada: 19908, proximos_resultados: '2027-02-24',
});
const posCorta = D.bolsa.posicion_corta_pct;
D.bolsa = { ...D.bolsa, ...B.bolsa, posicion_corta_pct: posCorta, confianza: 'Alta' };
D.bolsa.comentario = 'En un año la acción pierde un 1,9 % con dividendos, frente al +21,4 % del ETF del AEX y el +7,9 % del ETF de medios europeo; en lo que va de año gana un 4,2 % (AEX +22,9 %) [5]. La caída máxima de cinco años, del −67,8 %, fue del 12-feb-2025 al 13-may-2026 [5]: es sobre todo caída de múltiplo y del sector por el miedo a la IA. El 3-feb-2026 cayó un 12,7 %, el mismo día que RELX, Thomson Reuters y LSEG, cuando Anthropic presentó herramientas de IA para el trabajo jurídico [5, 17, 18]. Desde el mínimo del 25-jun-2026 (54,64 EUR) ha subido un 64 % hasta 89,50 EUR, y un 31 % solo desde el 14-sep: primero en bloque con el sector (RELX +9 % y Thomson Reuters +4 % del 14-oct al 12-nov, frente al +15 % de Wolters) [42, 43] y el 4-nov un 6,7 % con el avance de nueve meses, que aceleró el orgánico al 6 % y reiteró la guía [45]. Ha salido del EURO STOXX 50 (21-sep) [44]. Ninguna posición corta neta declarada a la AFM supera el 0,5 % [16].';
D.bolsa.contexto = {
  movimiento: { fecha: '2026-11-11', var_1m_pct: 12.2, var_3m_pct: 26.7, var_6m_pct: 33.8, var_12m_pct: -6.4, dist_max_52s_pct: -4.7, dist_min_52s_pct: 58.4, dist_max_historico_pct: -51.1, tendencia: 'alcista', volatilidad_60d_pct: 34, avisos: ['P2 A 5 % del máximo de 52 semanas tras subir un 27 % en tres meses.'] },
  movimientos_fuertes: [
    { periodo: 'sep-nov 2026', var_pct: 31.4, causa: 'Subida del 31 % en un mes hasta el 4-nov (de 69 a 91 EUR): rebote del sector de información profesional al enfriarse el miedo a la IA (RELX y Thomson Reuters también suben) y, el 4-nov, +6,7 % con el avance de nueve meses (orgánico del 6 %, guía reiterada) [42, 43, 45]. No es una oferta ni un rumor.', veredicto: 'no cambia', condicion: null },
    { periodo: '2026-02-03', var_pct: -12.7, causa: 'Anthropic presenta herramientas de IA para el trabajo jurídico; cae todo el sector (RELX, Thomson Reuters, LSEG) [5, 17, 18].', veredicto: 'no cambia', condicion: null },
    { periodo: '2026-02-11', var_pct: -5.1, causa: 'Venta sectorial en la víspera de los resultados de RELX; sin noticia propia encontrada [5, 18].', veredicto: 'no cambia', condicion: null },
    { periodo: '2026-05-06', var_pct: -7.3, causa: 'Avance del 1T26: orgánico del 5 %, no recurrentes −5 % y los impresos restando 130 pb [13].', veredicto: 'no cambia', condicion: null },
    { periodo: '2026-05-13', var_pct: -6.3, causa: 'Venta sectorial por IA el mismo día que RELX [5, 18].', veredicto: 'no cambia', condicion: null },
    { periodo: '2026-07-30', var_pct: -7.2, causa: 'Venta sectorial antes de los semestrales, con RELX y Thomson Reuters [5, 18].', veredicto: 'no cambia', condicion: null },
  ],
  noticias: [
    { fecha: '2026-11-05', tipo: 'recomendación', hecho: 'Barclays sube el objetivo de 90 a 105 EUR (sobreponderar); BofA lo había subido de 95 a 102 EUR (compra) el 2-nov y KBC Securities mantiene compra con 98 EUR el 4-nov [48, 49].', veredicto: 'no cambia', condicion: null },
    { fecha: '2026-11-04', tipo: 'resultados', hecho: 'Avance de nueve meses: orgánico del 6 %, beneficio operativo ajustado +10 % a tipo constante, guía de 2026 reiterada, deuda neta de 4.070 M (2,0x) y mandato de recompra de 75 M para enero-febrero de 2027 [45].', veredicto: 'no cambia', condicion: null },
    { fecha: '2026-10-31', tipo: 'fusión u oferta', hecho: 'Venta del negocio fiscal de consumo de Alemania por 40 M (unos 30 M de ingresos en 2026) [45].', veredicto: 'no cambia', condicion: null },
    { fecha: '2026-11-11', tipo: 'directivos', hecho: 'La recompra de 2026 lleva 264,3 de 500 M y casi no compra desde mediados de septiembre (349 acciones del 5 al 11-nov); el mandato acaba el 28-dic [50]. Sin operaciones de directivos en la AFM desde el 26-feb-2026 [C15].', veredicto: 'no cambia', condicion: null },
    { fecha: '2026-11-03', tipo: 'accionista de referencia', hecho: 'MFS baja del 2,33 % al 1,82 % del capital; Amundi sube al 3,38 % (15-oct); Millennium cruzó el 0,5 % en corto el 21-oct y bajó al 0,49 % el 23-oct [16, C13]. Sin colocaciones ni ampliaciones anunciadas.', veredicto: 'no cambia', condicion: null },
    { fecha: '2026-09-21', tipo: 'accionista de referencia', hecho: 'Salida del EURO STOXX 50 en la revisión anual: la venta de los fondos indexados ya ocurrió [44].', veredicto: 'no cambia', condicion: null },
    { fecha: '2027-02-24', tipo: 'resultados', hecho: 'Resultados de 2026 y programa de recompras de 2027 [45, 51].', veredicto: 'no cambia', condicion: null },
  ],
  proximos_resultados: '2027-02-24',
  veredicto: 'no cambia',
  condicion: null,
  comentario: 'La acción ha subido un 64 % desde el mínimo de junio y está a un 5 % del máximo de 52 semanas (aviso P2) [5]. La subida tiene dos causas con fuente: el rebote del sector de información profesional, que había caído por el miedo a la IA, y un avance de nueve meses mejor de lo esperado en beneficio, con el orgánico al 6 % [42, 45, 49]. Los analistas suben objetivos (Barclays 105, BofA 102 EUR) [48]. No hay colocaciones, ampliaciones, ofertas ni litigios pendientes, ni ventas de directivos, y los próximos resultados son el 24-feb-2027. Nada pendiente puede mover el precio más de un 5 % por sí solo: el veredicto es «no cambia».',
};
D.consenso.estimaciones = [
  { periodo: '2026e', ingresos: 6282, ebitda: 2097, ebit: 1762, bpa: 5.19, dpa: 2.70, fuente: 'MarketScreener, 16 analistas, 26-oct-2026 [7]' },
  { periodo: '2027e', ingresos: 6645, ebitda: 2232, ebit: 1885, bpa: 5.69, dpa: 2.95, fuente: 'MarketScreener, 16 analistas, 26-oct-2026 [7]' },
  { periodo: '2028e', ingresos: 7012, ebitda: 2373, ebit: 2004, bpa: 6.34, dpa: 3.25, fuente: 'MarketScreener, 16 analistas, 26-oct-2026 [7]' },
];
D.consenso.recomendaciones = { n_analistas: 16, comprar: 12, mantener: 3, vender: 1, po_medio: 96.31, po_min: 56, po_max: 120 };
D.consenso.revisiones = 'MarketScreener no ha actualizado tras el avance de nueve meses (página del 26-oct): BPA NIIF 5,19 / 5,69 / 6,34 EUR para 2026-2028, igual que el 15-oct [7]. El consenso de Yahoo, ya posterior al 4-nov, da el BPA ajustado de la empresa: 5,61 EUR en 2026 y 6,20 EUR en 2027 (15 analistas), con un cambio de +0,1 % en 7 días, +0,1 % en 30 días y −1 % en 90 días (5,67 y 6,26 hace tres meses) [46]: los resultados no movieron las estimaciones. Lo que sí se movió es el objetivo: media de 96,31 EUR (16 analistas, entre 56 y 120) frente a 89,91 EUR el 15-oct [46, 8]; Barclays sube de 90 a 105 EUR, BofA de 95 a 102 EUR y KBC mantiene 98 EUR [48, 49]. Recomendaciones: 3 compra fuerte, 9 compra, 3 mantener y 1 venta fuerte (2 compra fuerte hace un mes) [46]. El objetivo medio queda un 8 % por encima del precio.';
D.consenso.guidance = 'La guía de 2026, publicada el 25-feb-2026 y reiterada sin cambios el 5-ago y el 4-nov-2026 [1, 45], pide otro año de buen crecimiento orgánico, un margen operativo ajustado de en torno al 28,0 % (27,5 % en 2025), un flujo libre ajustado de 1.300-1.350 M EUR a tipo constante, un BPA diluido ajustado con crecimiento de un dígito alto a tipo constante, costes financieros de unos 105 M, tipo impositivo del 23,5-24,5 %, capex del 5-6 % de los ingresos, reestructuración similar a 2025 (37 M) y recompras de 500 M [45]. Por división: Health y T&A «en línea» con 2025 (5 % y 7 %), FCC y L&R «por encima» (3 % y 5 %), CP&ESG «en línea» (7 %) [45]. A nueve meses: orgánico del 6 % y beneficio operativo ajustado +10 % a tipo constante, con el gasto en desarrollo y la reestructuración cargados en el cuarto trimestre [45]. No hay objetivos a medio plazo publicados después de 2026.';

// Comparables rehechos el 13-nov (no llevados al precio): capitalización y deuda neta de Yahoo (12-nov, último balance trimestral),
// EBITDA y ventas de los últimos y próximos 12 meses ponderando los ejercicios de MarketScreener por meses, PER de los próximos
// 12 meses con el BPA del consenso de Yahoo posterior a los resultados de octubre-noviembre. ROIC del 8-oct (Stock Analysis).
const comps = JSON.parse(readFileSync(dir + 'comparables-13nov.json', 'utf8'));
D.comparables.empresas = comps;
D.comparables.criterio = 'Información profesional y datos por suscripción con márgenes altos e ingresos recurrentes: RELX, Thomson Reuters, LSEG, Verisk y Experian son el núcleo; los cinco venden bases de datos y software de flujo de trabajo a profesionales. Intuit (impuestos y contabilidad de pymes y particulares) y Veeva (software vertical de ciencias de la vida) comparten nicho con Tax & Accounting y Health, pero crecen más. Gartner (investigación por suscripción) encaja peor: sus ventas caen en 2026. Quedan fuera Informa (eventos) y Pearson (educación). Cifras rehechas al 12-nov-2026, no llevadas al precio: capitalización, deuda y caja del último trimestre de Yahoo convertidas al tipo del BCE del 12-nov [46, 47, 15]; ventas y EBITDA de los últimos y próximos 12 meses ponderando por meses los ejercicios de MarketScreener (páginas del 23-sep al 23-oct) [19-26]; PER de los próximos 12 meses con el BPA del consenso de Yahoo, posterior a los resultados del tercer trimestre (ajustado, como el de MarketScreener para los anglosajones) [47]; ROIC de Stock Analysis del 8-oct [27-34].';

// Puente a 30-sep-2026: el avance de 9M solo publica la deuda neta (4.070 M, definición de la empresa = deuda bruta + arrendamientos
// + pagos aplazados de adquisiciones − caja). Se mantienen los componentes de 30-jun y la diferencia va a otros_ajustes.
D.valoracion.puente = { fecha: '2026-09-30', deuda_financiera: 5292, arrendamientos: 205, caja: 1524, minoritarios: 0, pensiones: 48, asociadas: 14, otros_ajustes: 57 };
D.notas_integrador = 'PUENTE a 30-sep-2026. Deuda neta publicada 4.070 M a 30-sep (4.024 a 30-jun y a cierre de 2025) [45]. Sin balance trimestral: se dejan los componentes de 30-jun (deuda financiera 5.292, arrendamientos 205, caja 1.524; 5.292 + 205 + 51 − 1.524 = 4.024) y OTROS_AJUSTES 57 = 51 de pagos aplazados y contingentes de adquisiciones + 46 de aumento de la deuda neta del 30-jun al 30-sep (recompras de julio-septiembre, dividendo a cuenta de 225 M y Marosa 112 M, compensados por el flujo libre del trimestre) − 40 del cobro de la venta del negocio fiscal de consumo alemán a finales de octubre [45]. Recompras después del 30-sep: 0,2 M (despreciable) [50]. Deuda neta ajustada ≈ 4.070 − 40 + 48 = 4.078 M (antes de asociadas). ACCIONES 223,1 M = 222,4 M en circulación a 30-sep (224,7 emitidas − 2,3 en autocartera) [45] + 0,7 M de dilución de los planes (media diluida − básica del 1S26) [1]. Capitalización publicada 19.908 M (Yahoo, 12-nov) [46].';

// fuentes
const fd = (id, cambios) => Object.assign(D.fuentes.find((f) => f.id === id), cambios);
fd(5, { fecha: '2026-11-11', titulo: 'Históricos diarios de WKL.AS, IAEX.AS y EXH6.DE (herramientas/bolsa.mjs, corte 13-nov-2026: último cierre en la serie, 11-nov)' });
fd(7, { fecha: '2026-10-26' }); fd(8, { fecha: '2026-10-26', titulo: 'Wolters Kluwer N.V.: consenso de analistas (91,22 EUR de objetivo medio el 26-oct)' });
fd(14, { fecha: '2026-11-12', titulo: 'Estructura temporal de tipos de la deuda federal alemana (Svensson), 10 años: 3,36 % el 12-nov-2026' });
fd(15, { fecha: '2026-11-12', titulo: 'Tipos de cambio de referencia del euro, 12-nov-2026 (USD 1,1081; GBP 0,83595)' });
fd(16, { fecha: '2026-11-13', titulo: 'Registro de posiciones cortas netas (actual e histórico), consultado el 13-nov-2026' });
fd(19, { fecha: '2026-09-23' }); fd(20, { fecha: '2026-10-14' }); fd(21, { fecha: '2026-09-29' }); fd(22, { fecha: '2026-10-08' });
fd(23, { fecha: '2026-10-16' }); fd(24, { fecha: '2026-10-23' }); fd(25, { fecha: '2026-10-16' }); fd(26, { fecha: '2026-10-21' });
fd(42, { fecha: '2026-11-12', titulo: 'Cierres diarios de WKL.AS (12-nov-2026: 89,50 EUR, regularMarketPrice a las 16:35 UTC), REL.L y TRI (API chart)' });
D.fuentes.push(
  { id: 45, titulo: 'Wolters Kluwer 2026 Nine-Month Trading Update (texto íntegro, GlobeNewswire)', editor: 'Wolters Kluwer', tipo: 'Primaria', fecha: '2026-11-04', url: 'https://www.ariva.de/news/wolters-kluwer-2026-nine-month-trading-update-12193797' },
  { id: 46, titulo: 'Wolters Kluwer (WKL.AS): quoteSummary (financialData, earningsTrend, recommendationTrend), 13-nov-2026', editor: 'Yahoo Finance', tipo: 'Datos de mercado', fecha: '2026-11-13', url: 'https://query2.finance.yahoo.com/v10/finance/quoteSummary/WKL.AS' },
  { id: 47, titulo: 'quoteSummary de REL.L, TRI, LSEG.L, VRSK, EXPN.L, INTU, VEEV e IT (precio, capitalización, deuda, caja y BPA estimado), 13-nov-2026', editor: 'Yahoo Finance', tipo: 'Datos de mercado', fecha: '2026-11-13', url: 'https://query2.finance.yahoo.com/v10/finance/quoteSummary/REL.L' },
  { id: 48, titulo: 'Wolters Kluwer Aktie: Barclays hebt Kursziel auf 105 Euro an (y BofA a 102 EUR el 2-nov)', editor: 'Goldesel', tipo: 'Prensa', fecha: '2026-11-05', url: 'https://goldesel.de/aktien/news/wolters-kluwer-aktie-barclays-hebt-kursziel-auf-105-euro-an' },
  { id: 49, titulo: 'Wolters Kluwer Aktie: Print-Bremse gelöst? (KBC Securities mantiene compra y 98 EUR)', editor: 'Börse Global', tipo: 'Prensa', fecha: '2026-11-04', url: 'https://www.boerse-global.de/wolters-kluwer-aktie-print-bremse-geloest/838844' },
  { id: 50, titulo: 'Share buyback transaction details November 5-11, 2026', editor: 'Wolters Kluwer (MFN)', tipo: 'Primaria', fecha: '2026-11-12', url: 'https://mfn.se/all/a/wolters-kluwer/share-buyback-transaction-details-november-5-november-11-2026-8016b4ab' },
  { id: 51, titulo: 'Agenda de Wolters Kluwer (resultados de 2026: 24-feb-2027)', editor: 'Beursgenoten', tipo: 'Datos de mercado', fecha: '2026-11-13', url: 'https://www.beursgenoten.nl/koersen/euronext-aandelen-amsterdam/wolters-kluwer' },
);
// fuente 43: la de Reuters del 6-oct sigue sirviendo para el rebote del sector
D.huecos = (D.huecos || []).filter((h) => h.campo !== 'revisiones (cifras de cambio de BPA y EBITDA a 3 y 12 meses)');

// ============ E ============
E.sentimiento = {
  tono: 'Dividido', tendencia: 'Mejora',
  revisadas: [
    { plataforma: 'Stocktwits (WTKWY)', fecha: '2026-09', n_comentarios: 6, tono: 'Positivo', resumen: 'Muy poco debate: desde junio, mensajes de particulares que compran o promedian a la baja («la venta es por miedo a la IA, no por cifras») y la noticia de la salida del EURO STOXX 50; nada desde septiembre [1].' },
    { plataforma: 'Seeking Alpha (análisis de colaboradores)', fecha: '2026-09', n_comentarios: 4, tono: 'Positivo', resumen: 'Los artículos de julio a septiembre son alcistas («compra antes de que desaparezca el descuento por IA», «compounder infravalorado»); no hay artículo nuevo tras el avance de nueve meses [2].' },
    { plataforma: 'De Belegger (blog neerlandés de inversión)', fecha: '2026-09', n_comentarios: 3, tono: 'Neutro', resumen: 'Con la acción a 68,68 EUR, «las cifras cuentan otra historia que la caída del 41 %»: la pregunta no es si la IA es un riesgo, sino si Wolters convierte su conocimiento verificado en productos de IA de pago [3].' },
    { plataforma: 'Simply Wall St (narrativas de la comunidad)', fecha: '2026-11', n_comentarios: 7, tono: 'Negativo', resumen: 'La narrativa bajista, actualizada el 2-nov, pone el valor razonable en 60,26 EUR con el argumento de implantaciones lentas en CP&ESG, transacciones flojas y una monetización incierta de la IA; la más seguida rondaba los 71 EUR [4].' },
    { plataforma: 'Prensa económica alemana con comentarios (Börse Global, Goldesel)', fecha: '2026-11', n_comentarios: 3, tono: 'Positivo', resumen: 'Tras el 4-nov se habla de «freno de los impresos resuelto» y de subidas de objetivo; matizan que el gasto en IA se carga en el cuarto trimestre y que su rendimiento aún no se ve [5, 6].' },
  ],
  temas: [],
  lectura: 'El sentimiento ha girado con el precio: en junio-septiembre los particulares compraban por descuento y los escépticos ponían el valor en 50-71 EUR; tras subir un 64 % desde el mínimo, la acción está por encima de todos los valores razonables de las narrativas bajistas de la comunidad y por debajo de los objetivos de los analistas, que suben (media de 96 EUR). No hay euforia ni capitulación: hay poco debate. Los foros no traen un riesgo nuevo; repiten el de la IA, que ya está en el bajista. Aporta poco a la decisión.',
  confianza: 'Media',
};
E.fuentes = [
  { id: 1, titulo: 'Stream de mensajes de WTKWY (API pública)', editor: 'Stocktwits', tipo: 'Foros y redes', fecha: '2026-11-13', url: 'https://api.stocktwits.com/api/2/streams/symbol/WTKWY.json' },
  { id: 2, titulo: 'Wolters Kluwer N.V.: News and Analysis (RSS): artículos de jul-sep 2026', editor: 'Seeking Alpha', tipo: 'Foros y redes', fecha: '2026-11-13', url: 'https://seekingalpha.com/api/sa/combined/WTKWY.xml' },
  { id: 3, titulo: 'De cijfers vertellen een ander verhaal dan de 41% koersval van dit AEX-aandeel', editor: 'De Belegger', tipo: 'Foros y redes', fecha: '2026-09-15', url: 'https://www.debelegger.nl/post/dit-aex-aandeel-is-41-van-zijn-top-kwijt-maar-de-cijfers-vertellen-een-ander-verhaal' },
  { id: 4, titulo: 'Narrativa de la comunidad: update for Wolters Kluwer (2-nov-2026)', editor: 'Simply Wall St', tipo: 'Foros y redes', fecha: '2026-11-02', url: 'https://simplywall.st/community/narratives/nl/commercial-services/ams-wkl/wolters-kluwer-shares/mot4hst1-update-for-wolters-kluwer' },
  { id: 5, titulo: 'Wolters Kluwer Aktie: Print-Bremse gelöst?', editor: 'Börse Global', tipo: 'Foros y redes', fecha: '2026-11-04', url: 'https://www.boerse-global.de/wolters-kluwer-aktie-print-bremse-geloest/838844' },
  { id: 6, titulo: 'Wolters Kluwer Aktie: Barclays hebt Kursziel auf 105 Euro an', editor: 'Goldesel', tipo: 'Foros y redes', fecha: '2026-11-05', url: 'https://goldesel.de/aktien/news/wolters-kluwer-aktie-barclays-hebt-kursziel-auf-105-euro-an' },
];

escribir('A.json', A); escribir('C.json', C); escribir('D.json', D); escribir('E.json', E);
console.log('Notas A, C, D y E actualizadas al 13-nov-2026');
