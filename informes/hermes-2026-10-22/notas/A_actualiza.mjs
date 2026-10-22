// Subagente A: pone al día A.json con los ingresos del 3T26 (22-oct-2026).
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const dir = path.dirname(fileURLToPath(import.meta.url));
const ruta = path.join(dir, 'A.json');
const a = JSON.parse(fs.readFileSync(ruta, 'utf8'));

// Fuentes nuevas
const nuevas = [
  { id: 12, titulo: 'Hermès International: Third Quarter 2026 Revenue (información trimestral a finales de septiembre de 2026)', editor: 'Hermès International (GlobeNewswire / MFN)', tipo: 'Primaria', fecha: '2026-10-22', url: 'https://mfn.se/one/a/hermes/hermes-international-third-quarter-2026-revenue-767f0a7b' },
  { id: 13, titulo: 'Hermès International: Shares and voting rights as of 30th September 2026', editor: 'Hermès International (GlobeNewswire / MFN)', tipo: 'Primaria', fecha: '2026-10-13', url: 'https://mfn.se/one/a/hermes/hermes-international-shares-and-voting-rights-as-of-30th-september-2026-516b91d7' },
  { id: 14, titulo: 'Hermès ralentit au troisième trimestre, pénalisé par la Chine (Zonebourse, con consenso FactSet)', editor: 'Zonebourse / Boursorama', tipo: 'Prensa', fecha: '2026-10-22', url: 'https://www.boursorama.com/bourse/actualites/hermes-ralentit-au-troisieme-trimestre-penalise-par-la-chine-f427ea4eaff70de9014d798f19237225' },
  { id: 15, titulo: 'Hermes third-quarter growth slows as ready-to-wear turns negative (Reuters, con consenso Visible Alpha)', editor: 'Reuters / Global Banking & Finance Review', tipo: 'Prensa', fecha: '2026-10-22', url: 'https://www.globalbankingandfinance.com/hermes-third-quarter-growth-slows-ready-to-wear-turns/' },
];
a.fuentes = a.fuentes.filter(f => f.id < 12 && f.id !== 8).concat(nuevas);

// Trimestres: los 8 últimos (fuera 3T24, entra 3T26)
const items = a.trimestres.items.filter(i => i.periodo !== '3T24' && i.periodo !== '3T26');
const t2 = items.find(i => i.periodo === '2T26');
if (t2) t2.vs_consenso = 'En línea';
items.push({ periodo: '3T26', ingresos: 4096, crecimiento_pct: 5.5, crecimiento_organico_pct: 4.3, ebitda: null, margen_ebitda_pct: null, bpa: null, vs_consenso: 'Inferior' });
a.trimestres.items = items;
a.trimestres.extra = [
  'Hermès publica ingresos trimestrales y resultados semestrales: resultado operativo recurrente 1S25 3.327 M (41,4 %), 1S26 3.351 M (41,0 %), 1S24 3.148 M [2, 9]. El 3T26 solo trae ventas [12].',
  'Crecimiento «orgánico» = a tipos de cambio constantes (tipos medios del periodo anterior) [12].',
  '3T26 (22-oct-2026): ventas 4.096 M, +5,5 % publicado y +4,3 % a tipos constantes (2T26 +6,7 %; 1T26 +5,6 %); el menor crecimiento trimestral desde principios de 2020. Nueve meses: 12.260 M, +2,9 % publicado y +5,5 % a tipos constantes; divisas −310 M en ventas [12, 15].',
  'Consenso previo del 3T26: FactSet 4.130 M y +5,5 % a tipos constantes [14]; Visible Alpha +5,2 % [15]. Ventas un 0,8 % por debajo de FactSet y crecimiento 0,9-1,2 puntos por debajo.',
  '3T26 por zonas (tipos constantes): Francia +3,6 %, Europa sin Francia +9,5 %, Japón +9,6 %, Asia-Pacífico sin Japón 0,0 % (Gran China «estable»), Américas +8,8 %, Oriente Medio −4,5 % [12]. 2T26: Francia +6,2 %, Europa sin Francia +8,3 %, Japón +12,3 %, Asia-Pacífico sin Japón +2,5 %, Américas +13,7 %, Oriente Medio −2,4 % [2].',
  '3T26 por oficios (tipos constantes): Marroquinería-Guarnicionería +10,8 % (1.912 M), Confección y Accesorios −2,0 % (1.141 M; primera caída en años, solo por China según el director financiero), Seda y Textiles +1,4 %, Otros oficios Hermès −1,1 %, Perfume y Belleza +7,5 %, Relojería −6,0 %, Otros productos +10,5 % [12, 15]. Nueve meses: Marroquinería +10,2 %, Confección +0,6 %, Seda +7,0 %, Otros oficios +3,3 %, Perfume −0,7 %, Relojería −1,9 % [12].',
  'Guía: sin cifras; «confirma un objetivo ambicioso de crecimiento de los ingresos a tipos constantes a medio plazo» pese a las incertidumbres económicas, geopolíticas y monetarias [12]. Producción: se mantiene un aumento de volúmenes de en torno al 6 % anual en los próximos años [15].',
  'La acción cayó un 11,0 % el día de los resultados del 1S26 (29-jul-2026: apertura 1.658, cierre 1.508,50 EUR) [2].',
];
a.trimestres.ultima_presentacion = 'En los ingresos del 3T26 (22-oct-2026) el mensaje cambió de tono: de la «confianza» en el segundo semestre de julio a un crecimiento «robusto en un contexto macroeconómico difícil» y un trimestre «en línea» con el segundo en valor (4,1 mil M) [12, 2]. El director financiero, Eric du Halgouët, calificó China de «muy difícil» aunque seguirá invirtiendo allí, atribuyó toda la caída de Confección y Accesorios (−2,0 %, la primera en años) a la demanda china y defendió que el deseo por el Birkin sigue «intacto», con un aumento de la producción de en torno al 6 % anual [14, 15]. La Marroquinería aceleró ligeramente (+10,8 % frente a +10,2 % del 2T) y Américas se frenó (+8,8 % frente a +13,7 %) [12, 2]. La guía sigue sin cifras: «objetivo ambicioso» a tipos constantes a medio plazo [12]. Lo que no se cuantificó: las subidas de precio de 2027, el efecto de las divisas en el margen del segundo semestre y cuándo vuelve a crecer la Gran China. Las ventas quedaron por debajo de FactSet (4.130 M, +5,5 %) y de Visible Alpha (+5,2 %), y la acción abrió a la baja [14, 15].';

// KPI de crecimiento con los nueve meses
const k = a.negocio.kpis.find(x => x.kpi === 'Crecimiento a tipos constantes');
if (k) {
  k.valor_actual = '8,9 % (2025); 6,1 % (1S26); 5,5 % (9M26; 3T26 4,3 %)';
  k.variacion = '−5,8 p.p. (2025)';
  k.comentario = 'Frenazo en Asia-Pacífico sin Japón (+4,9 % en 2025; +1,6 % en 9M26 y 0,0 % en el 3T26) [1, 12].';
}
const km = a.negocio.kpis.find(x => x.kpi === 'Ventas de Marroquinería-Guarnicionería');
if (km) km.comentario = '44 % de las ventas; +10,2 % a tipos constantes en 9M26 y +10,8 % en el 3T26; limitada por la capacidad de los talleres (25 en abr-2026) [1, 12].';

// LTM: se mantiene a jun-26 (el 3T26 solo trae ventas); ventas LTM sep-26 como dato aparte
a.financieros.extra = (a.financieros.extra || []).filter(x => !x.startsWith('Ventas LTM a sep-26'));
a.financieros.extra.push('Ventas LTM a sep-26: 16.346 M (16.002 de 2025 − 11.916 de 9M25 + 12.260 de 9M26) [3, 12]; el LTM del informe sigue a jun-26 porque el 3T26 no trae resultados ni flujos.');

// Capital: recompras y acciones a 30-sep
a.capital.extra = (a.capital.extra || []).filter(x => !x.includes('9M26'));
a.capital.extra.push('Recompras 9M26: 94.846 acciones por 160 M, sin contar el contrato de liquidez [12]. A 30-sep-2026: 105.569.412 acciones emitidas; 833.864 derechos de voto sin ejercer (autocartera) [13].');

a._estado = 'terminado';
fs.writeFileSync(ruta, JSON.stringify(a, null, 2) + '\n', 'utf8');
console.log('A.json actualizado:', a.trimestres.items.map(i => i.periodo).join(' '), '| fuentes', a.fuentes.length);
