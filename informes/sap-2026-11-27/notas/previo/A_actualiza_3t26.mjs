// Subagente A: pone al día A.json con el Quarterly Statement Q3 2026 (21-oct-2026).
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
const dir = path.dirname(fileURLToPath(import.meta.url));
const ruta = path.join(dir, 'A.json');
const a = JSON.parse(fs.readFileSync(ruta, 'utf8'));

// ---------- fuentes nuevas ----------
const n0 = a.fuentes.length; // 13
const F_Q3 = n0 + 1, F_NEWS = n0 + 2, F_ADR = n0 + 3;
if (!a.fuentes.find(f => f.url && f.url.includes('sap-2026-q3-statement'))) {
  a.fuentes.push(
    { id: F_Q3, titulo: 'SAP, Quarterly Statement Q3 2026', editor: 'SAP SE', tipo: 'Primaria', fecha: '2026-10-21', url: 'https://www.sap.com/docs/download/investors/2026/sap-2026-q3-statement.pdf' },
    { id: F_NEWS, titulo: 'SAP Announces Q3 2026 Results (nota de prensa)', editor: 'SAP News Center', tipo: 'Primaria', fecha: '2026-10-21', url: 'https://news.sap.com/2026/10/sap-announces-q3-2026-results/' },
    { id: F_ADR, titulo: 'SAP SE ADR (NYSE: SAP), cotización intradía con negociación fuera de horario, 21-oct-2026', editor: 'Yahoo Finance', tipo: 'Datos de mercado', fecha: '2026-10-21', url: 'https://query1.finance.yahoo.com/v8/finance/chart/SAP?interval=5m&range=2d&includePrePost=true' },
  );
}

// ---------- negocio.kpis ----------
const k = a.negocio.kpis;
const set = (pref, obj) => { const x = k.find(e => e.kpi.startsWith(pref)); if (x) Object.assign(x, obj); };
set('Current cloud backlog', { valor_anterior: '18.839 (sep-25)', valor_actual: '21.052 (dic-25); 24.144 (sep-26)', variacion: '+28 % interanual a sep-26 (+26 % a divisa constante)', comentario: `SAP mantiene que el crecimiento a divisa constante de 2026 se moderará ligeramente frente al 25 % de 2025 [1, ${F_Q3}]` });
set('Ingresos de nube', { valor_anterior: '15.413 (9M25)', valor_actual: `21.023 (2025); 18.911 en 9M26; 6.668 en 3T26`, variacion: '+23 % en 9M26 (+25 % a divisa constante); +26 % en 3T26 (+25 %)', comentario: `Guía 2026: «hacia la parte alta» de 25.800-26.200 M a divisa constante. El 3T26 lleva una recuperación de ingresos de varios trimestres de clientes que salen de dificultades financieras [${F_Q3}]` });
set('Ingresos Cloud ERP Suite', { valor_anterior: '13.258 (9M25)', valor_actual: '18.119 (2025); 16.662 en 9M26; 5.924 en 3T26', variacion: '+26 % en 9M26 (+28 % a divisa constante); +29 % en 3T26 (+28 %)', comentario: `88 % de los ingresos de nube en 9M26 [1, ${F_Q3}]` });
set('Ingresos de soporte', { valor_anterior: '7.969 (9M25)', valor_actual: '10.525 (2025); 7.342 en 9M26', variacion: '-8 % en 9M26 (-6 % a divisa constante); -5 % en 3T26', comentario: `SAP prevé que la caída se acelere en los próximos años por la migración a la nube [1, ${F_Q3}]` });
set('Margen bruto de nube', { valor_anterior: '74,6 (3T25)', valor_actual: '74,2 (2025); 73,9 en 3T26; 74,3 en 9M26', variacion: '-0,7 pp interanual en 3T26; -0,4 pp en 9M26', comentario: `Tercer trimestre seguido de caída interanual [4, 7, ${F_Q3}]` });
if (!k.find(e => e.kpi.startsWith('Plantilla'))) k.push({ kpi: 'Plantilla (empleados equivalentes a tiempo completo)', valor_anterior: '110.730 (sep-25)', valor_actual: '113.076 (sep-26)', variacion: '+2,1 % (805 por compras)', comentario: `I+D +2,2 %, ventas y marketing +2,3 %; sin compras, +1,4 % [${F_Q3}]` });

// ---------- financieros ----------
const f = a.financieros;
f.ltm = { periodo: 'LTM sep-26', fecha_fin: '2026-09-30', ingresos: 39387, ebitda: 11933, ebit: 10654, beneficio_neto: 8040, bpa: 6.91, dpa: 2.5, dpa_extraordinario: 0, fcf: 8394, participadas_en_ebitda: null, no_recurrentes_en_ebitda: 416 };
f.comentario = f.comentario.trim() + ` En los nueve meses de 2026 los ingresos crecieron un 10 % (12 % a divisa constante) hasta 29.703 M y el beneficio operativo NIIF un 14 %, hasta 8.313 M (margen del 28,0 %, +1,2 pp); las compras de 2026 aportaron 49 M de ingresos en el 3T26 [${F_Q3}]. Los últimos doce meses a septiembre suman 39.387 M de ingresos y 10.654 M de beneficio operativo (estimación propia: 2025 más 9M26 menos 9M25).`;
f.ajustes = f.ajustes.replace(/El LTM a junio de 2026[^.]*\./, '').trim() + ` El LTM a septiembre de 2026 lleva como no recurrentes 416 M del litigio de Teradata: la provisión de 387 M del 4T25 y el gasto adicional de 29 M del 1T26 por el acuerdo (la nota del 11-oct solo llevaba los 387 M) [${F_Q3}]. El 3T25 incluía unos 100 M por un cambio de jurisprudencia fiscal y otros 100 M de transformación de plantilla que salen del LTM al comparar [${F_Q3}]. Desde 2027 SAP sacará del beneficio no NIIF los efectos de divisa y los intereses de impuestos (NIIF 18) [${F_Q3}].`;

// ---------- trimestres ----------
const t = a.trimestres;
t.items = t.items.filter(i => i.periodo !== '3T24' && i.periodo !== '3T26');
t.items.push({ periodo: '3T26', ingresos: 10270, crecimiento_pct: 13, crecimiento_organico_pct: 12, ebitda: 3263, margen_ebitda_pct: 31.8, bpa: 1.94, vs_consenso: null });
t.ultima_presentacion = `**2T26 (23-jul-26).** La nube creció un 24 % a divisa constante (+22 % en euros) y el beneficio operativo no NIIF un 9 %. SAP rebajó la guía de beneficio no NIIF a 11.800-12.200 M por la dilución de Dremio y Prior Labs (más de 100 M) [4]. Los analistas preguntaron sobre todo por márgenes y costes: la caída del margen de nube, I+D +14 % con plantilla +3 % (UBS, Bank of America, JPMorgan, Morgan Stanley), la desaceleración de la nube en el segundo semestre (BNP Paribas), la rentabilidad de Dremio y Prior Labs (Evercore, Jefferies) y el impacto del caso europeo de mantenimiento [13]. La dirección atribuyó el alza de costes a «tokens» de IA y a gastos puntuales, prometió no aumentar plantilla en 12 meses y negó un cambio estructural, sin cuantificar los costes puntuales ni la aportación de las compras [13].

**3T26 (21-oct-26, tras el cierre de Xetra).** El discurso vuelve al crecimiento: primer trimestre por encima de 10.000 M de ingresos (+13 %; +12 % a divisa constante) y de 3.000 M de beneficio operativo no NIIF (+18 %, margen del 29,5 %), current cloud backlog de 24.144 M (+26 % a divisa constante) y nube +25 % [${F_Q3}, ${F_NEWS}]. SAP sube la guía de nube y de nube y software «hacia la parte alta» de sus rangos y mantiene la de beneficio (11.800-12.200 M) y la de flujo libre (unos 10.000 M); para 2027 espera que el crecimiento de los ingresos se acelere y que los gastos no NIIF crezcan al 80-90 % del ritmo de los ingresos [${F_Q3}]. Dos matices del propio comunicado: la nube se benefició de una recuperación puntual de ingresos de varios trimestres de clientes que salieron de dificultades financieras, y el beneficio compara con un 3T25 lastrado por unos 200 M de efectos extraordinarios [${F_Q3}]. El margen bruto de nube volvió a caer (-0,7 pp). La conferencia empezó a las 23:00 del 21-oct y no hay transcripción a la fecha de corte. El ADR, que cerró en 232,73 USD, cotizaba a 242,15 USD (+4,0 %) en la negociación posterior al cierre hacia las 22:35 de Madrid [${F_ADR}].`;

// ---------- balance ----------
const b = a.balance;
b.liquidez = b.liquidez.replace(/\s*Sep-26:.*$/, '') + ` Sep-26: caja 9.364 M y otros activos financieros corrientes 1.633 M; deuda financiera estimada en unos 8.535 M (estimación propia: dic-25 más 4.663 M dispuestos y menos 2.278 M devueltos en 9M26; en el 3T26 se dispusieron 177 M y se devolvieron 178 M), lo que deja una caja neta de unos 800 M contando solo la caja [${F_Q3}].`;
b.otros_pasivos = b.otros_pasivos.replace('bajan a 119 M en jun-26 [4].', `bajan a 119 M en jun-26 y a 108 M en sep-26 [4, ${F_Q3}].`);
b.comentario = b.comentario.trim() + ` En el 3T26 la caja bajó de 10.511 M a 9.364 M por 1.524 M de recompras y unos 840 M de compras (Dremio y Prior Labs); los pasivos por contrato corrientes suben a 8.158 M en sep-26 [5, ${F_Q3}]. El fondo de comercio llega a 31.216 M (68 % del patrimonio atribuido de 45.948 M) tras las tres compras de 2026 [${F_Q3}].`;

// ---------- flujos ----------
a.flujos.comentario = a.flujos.comentario.trim() + ` En 9M26 el flujo operativo fue de 8.586 M (+9 %) pese a pagar 2.063 M de impuestos frente a 1.280 M, y el flujo libre según SAP de 7.968 M (+11 %; 1.718 M en el 3T26, +36 %); SAP mantiene unos 10.000 M de flujo libre para 2026 [${F_Q3}]. El capex de 9M26 (521 M) sigue por debajo del 2 % de las ventas [${F_Q3}]. El FCF del LTM a sep-26 tras intereses y arrendamientos es de 8.394 M (estimación propia, misma definición que la serie: flujo operativo menos capex, arrendamientos e intereses pagados; según la definición de SAP serían 9.003 M).`;

// ---------- calidad ----------
const s = a.calidad.senales;
const p = s.find(x => x.senal.startsWith('Perímetro de ajustes'));
if (p) { p.nivel = 'Media'; p.comentario = `En 2025 se añadió el litigio de Teradata, aplicado también a la retribución variable de la dirección [1]; desde 2027 se excluirán además los efectos de divisa y los intereses de impuestos, con la entrada de la NIIF 18 [${F_Q3}].`; }
const pa = s.find(x => x.senal.startsWith('Pagos en acciones'));
if (pa) pa.comentario = `1.695 M en 2025 (4,6 % de las ventas) y 2.385 M en 2024; 1.227 M en 9M26 frente a 1.379 M, una bajada que SAP atribuye a la caída de unos 25 EUR de la acción y que mejora el beneficio NIIF [2, 7, ${F_Q3}].`;
if (!s.find(x => x.senal.startsWith('Ingresos de nube'))) s.push({ senal: 'Ingresos de nube del 3T26 con efecto puntual', nivel: 'Baja', comentario: `SAP declara que la nube del 3T26 se benefició de una recuperación de ingresos de varios trimestres de clientes que salieron de dificultades financieras, sin cuantificarla [${F_Q3}].` });
a.calidad.comentario = a.calidad.comentario.trim() + ` Los estados del 3T26 no están auditados [${F_Q3}].`;

// ---------- capital ----------
const c = a.capital;
c.politica = `Dividendo de al menos el 40 % del beneficio después de impuestos no NIIF de actividades continuadas; 2,50 EUR por acción con cargo a 2025 (2.883 M pagados en mayo de 2026) [1, 4]. Recompras: el programa de 5.000 M de 2023 terminó en agosto de 2025 (26,0 M de acciones a 188,24 EUR de media); el nuevo, de hasta 10.000 M hasta fin de 2027, llevaba unos 4.200 M a 30-sep-26 (25,2 M de acciones a 164,79 EUR de media), así que quedan unos 5.800 M para quince meses [1, ${F_Q3}]. La caja también se usa en compras de tamaño medio en IA y datos: Reltio (1.076 M), Dremio (unos 515 M) y Prior Labs (unos 518 M) en 2026, financiadas en parte con eurobonos por 3.500 M, y el acuerdo para comprar TechWolf, sin importe publicado [4, 5, ${F_Q3}].`;
const ad = c.adquisiciones;
const rel = ad.find(x => x.objetivo.startsWith('Reltio'));
if (rel) rel.resultado = `Cerrada el 7-may-26; en 9M26 aportó unos 64 M de ingresos y -30 M al beneficio operativo NIIF (-17 M no NIIF) [${F_Q3}]`;
const dp = ad.find(x => x.objetivo.startsWith('Dremio'));
if (dp) { dp.importe = 1033; dp.resultado = `Cerradas el 6 y 16-jul-26 (contraprestación provisional de unos 515 M y 518 M; la nota del 11-oct daba unos 400 M para Prior Labs). En el 3T26 Dremio aportó 9 M de ingresos y -18 M al beneficio operativo NIIF y Prior Labs menos de 1 M y -24 M [${F_Q3}]`; }
c.comentario = c.comentario.replace(/Las recompras del programa de 2023[^\]]*\]\./, '').trim() + ` Las recompras del programa de 2023 se hicieron a 188,24 EUR de media y las de 2026, hasta septiembre, a 164,79 EUR, por debajo del precio actual [1, ${F_Q3}]. Las acciones diluidas medias bajaron a 1.157 M en el 3T26 (1.172 M un año antes) [${F_Q3}]. Las tres compras de 2026 (unos 2.100 M) restaron 59 M al beneficio operativo NIIF del 3T26 por 49 M de ingresos: su rentabilidad está por demostrar [${F_Q3}].`;

// ---------- huecos ----------
a.huecos = a.huecos.filter(h => !(h.seccion === 'trimestres' && h.campo.startsWith('Preguntas de analistas del 3T26')));
const vc = a.huecos.find(h => h.campo === 'vs_consenso');
if (vc) vc.intentos = '1) Comunicados trimestrales de SAP (no publican consenso) y página de consenso de la web de inversores de SAP (403); 2) búsquedas de prensa del 3T26 con estimaciones (LSEG, Reuters): solo un consenso en USD de Yahoo Finance sin fuente y un avance de Börse Express que era del 3T25; 3) Smartkarma (bloqueo antibot), GuruFocus y roic.ai (403)';
a.huecos.push({ seccion: 'trimestres', campo: 'Preguntas de analistas del 3T26', tipo: 'Complemento', intentos: '1) Quarterly Statement Q3 2026 (sin preguntas; la conferencia fue a las 23:00 del 21-oct); 2) búsqueda de transcripciones del 3T26 (solo aparecen las del 2T26 y del 3T25); 3) GuruFocus y Seeking Alpha (sin la del 3T26 a la fecha de corte)', decision: 'Omitido' });

a._estado = 'en curso';
fs.writeFileSync(ruta, JSON.stringify(a, null, 2));
console.log('ok', a.fuentes.length, 'fuentes');
