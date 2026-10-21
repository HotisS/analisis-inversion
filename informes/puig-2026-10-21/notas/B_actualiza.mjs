// Actualización de la nota B tras las ventas del 3T26 (corte 21-oct-2026).
import fs from 'node:fs';
import { fileURLToPath } from 'node:url';
import path from 'node:path';
const ruta = path.join(path.dirname(fileURLToPath(import.meta.url)), 'B.json');
const j = JSON.parse(fs.readFileSync(ruta, 'utf8'));

const reemplaza = (obj, clave, viejo, nuevo) => {
  if (!obj[clave].includes(viejo)) throw new Error(`No encuentro en ${clave}: ${viejo.slice(0, 60)}`);
  obj[clave] = obj[clave].replace(viejo, nuevo);
};

// Fuentes nuevas
j.fuentes.push(
  { id: 18, titulo: 'Actualización de ventas Q3 2026 (nota de prensa)', editor: 'Puig Brands, S.A. / CNMV (otra información relevante)', tipo: 'Primaria', fecha: '2026-10-21', url: 'https://www.cnmv.es/webservices/verdocumento/ver?t=%7b06bc9655-7d60-4153-a993-2025dac7fb9d%7d' },
  { id: 19, titulo: '9M 2026 Results (presentación de ventas)', editor: 'Puig Brands, S.A. / CNMV (otra información relevante)', tipo: 'Primaria', fecha: '2026-10-21', url: 'https://www.cnmv.es/webservices/verdocumento/ver?t=%7b0eb96e89-3742-454a-969d-c5f59be4155b%7d' },
  { id: 20, titulo: '2026 Half-Year Results (nota de prensa)', editor: "L'Oréal", tipo: 'Primaria', fecha: '2026-07-29', url: 'https://www.loreal-finance.com/eng/press-release/2026-half-year-results' }
);

// Historia
reemplaza(j.historia, 'resumen',
  'que se rompieron sin acuerdo el 21-22 de mayo de 2026 [6].',
  'que se rompieron sin acuerdo el 21-22 de mayo de 2026 [6]; desde entonces no se han reanudado. En septiembre de 2026 acordó comprar a Esteve el 50 % de ISDIN que no tenía, por 900 M EUR al cierre (previsto a finales del 1T27) y 300 M EUR aplazados sin intereses al 1T29 [18].');
const h26 = j.historia.hitos.find(h => h.anio === '2026');
h26.hito = 'Albesa, primer ejecutivo; Marc Puig, presidente ejecutivo (marzo) [3]. Participación en Charlotte Tilbury al 85 % por 260 M EUR (abril) [3]. Ruptura de las conversaciones de fusión con Estée Lauder (21-22 de mayo) [6]. Acuerdo para comprar el 50 % restante de ISDIN por 900 M EUR más 300 M aplazados al 1T29 (14 de septiembre; cierre previsto a finales del 1T27) [18].';

// Negocio
reemplaza(j.negocio, 'descripcion',
  'Cuidado de la piel, 551 M (11 %; Uriage, Apivita, Dr. Barbara Sturm, Kama Ayurveda, Loto del Sur) [1].',
  'Cuidado de la piel, 551 M (11 %; Uriage, Apivita, Dr. Barbara Sturm, Kama Ayurveda, Loto del Sur) [1]. En los nueve primeros meses de 2026 la mezcla se mantuvo (72 %, 17 % y 11 % de 3.745 M EUR) [18], y la piel ganará peso con ISDIN (hoy al 50 %, fuera de las ventas consolidadas) cuando se cierre su compra [18].');
j.negocio.extra.push(
  'Ventas de los nueve primeros meses de 2026: 3.744,5 M EUR, +4,8 % comparable y +4,1 % publicado (divisas −0,7 %); tercer trimestre 1.390,8 M EUR, +5,6 % comparable y +7,2 % publicado, récord trimestral [18].',
  'Por segmento en 9M26 (comparable): Fragancias y Moda 2.702,0 M EUR (+3,8 %; 3T +3,9 %), Maquillaje 628,5 M (+12,0 %; 3T +16,1 %) y Cuidado de la piel 414,1 M (+1,3 %; 3T −0,8 %); dermocosmética (Uriage) creció a doble dígito y la piel de gama alta siguió floja [18].',
  'Por región en 9M26 (comparable): EMEA 1.948,7 M EUR (+3,0 %), Américas 1.365,9 M (+3,8 %) y Asia-Pacífico 430,0 M (+17,9 %) [18].',
  'Guía 2026 reiterada el 21-oct: crecer más que el mercado de belleza de gama alta en comparable, margen EBITDA ajustado estable frente a 2025, deuda neta/EBITDA ajustado no superior a 2,0 veces y reparto de ~40 % del beneficio [18, 19].'
);

// Sector
const d = j.sector.drivers;
d.find(x => x.driver.startsWith('Penetración')).evidencia =
  'La perfumería era menos del 5 % de la belleza en Asia-Pacífico (20 % en EMEA) [13]; Asia-Pacífico creció un 17,9 % comparable en las ventas de Puig de los nueve primeros meses de 2026 (12,9 % en el 3T) y ya es el 11 % del total [18].';
d.find(x => x.driver.startsWith('Geopolítica')).evidencia =
  'Aranceles de EE. UU. desde el 2S25, compensados con subidas de precio en agosto de 2025 [1]; el conflicto en Oriente Medio restó unos 14 M EUR (0,6 %) a las ventas de Puig en el 1S26 [3], pero no tuvo efecto significativo en el 3T [18].';
d.find(x => x.driver === 'Divisas').evidencia =
  'Las divisas restaron un 2,1 % a las ventas publicadas de Puig en el 1S26, sobre todo por el dólar [3]; en el 3T26 sumaron un 1,7 % y en los nueve meses restan un 0,7 % [18].';
d.find(x => x.driver.startsWith('Normalización')).evidencia =
  "El mercado selectivo creció en torno a un 1 % en 2025 según L'Oréal [4]; en el 1S26 L'Oréal Luxe creció un 5,1 % comparable ajustado, «el doble que el mercado selectivo mundial» (≈ 2,5 %, estimación propia) [20]. Puig espera que el mercado de fragancias siga normalizándose [1, 2].";
j.sector.ciclo.comentario =
  "Tras tres años de crecimiento extraordinario de las fragancias, el mercado selectivo apenas creció un 1 % en 2025 según L'Oréal [4] y en el 1S26 algo más, en torno al 2,5 % (estimación propia: L'Oréal Luxe creció un 5,1 %, el doble que el mercado) [20]; Puig habla de normalización [1, 2]. La belleza es defensiva: según L'Oréal el mercado creció un 3 % en 2008 y un 1 % en 2009, cayó un 8 % en 2020 por el cierre de tiendas y viajes, y rebotó un 8 % en 2021, un 6 % en 2022 y un 8 % en 2023 [15]. En 2022 la inflación no frenó el gasto. Indicadores a vigilar: L'Oréal Luxe (+5,1 % en el 1S26) [20], Puig (+4,8 % en 9M26 y +5,6 % en el 3T, acelerando) [18] y comercio de viaje.";
reemplaza(j.sector, 'regulacion',
  'los productos que no cumplan solo pueden comercializarse hasta el 31 de julio de 2026 y estar a la venta hasta el 31 de julio de 2028, lo que obliga a reformular o reetiquetar [16].',
  'desde el 31 de julio de 2026 ya no pueden comercializarse por primera vez productos que no cumplan, y los ya distribuidos pueden venderse hasta el 31 de julio de 2028, lo que obliga a reformular o reetiquetar [16].');
reemplaza(j.sector, 'tendencias',
  '(crecimiento de dos cifras de Byredo y del nicho en 2025 y el 1S26)',
  '(crecimiento de dos cifras de Byredo y del nicho en 2025 y en los nueve meses de 2026)');
reemplaza(j.sector, 'tendencias',
  'y en la piel de gama alta, que se debilitó en el 1S26 [3].',
  'y en la piel de gama alta, que se debilitó en el 1S26 y siguió floja en el 3T (Cuidado de la piel −0,8 % comparable) [3, 18]. La dermocosmética, en cambio, crece a doble dígito [18].');

// Competencia
reemplaza(j.competencia, 'posicion',
  'En maquillaje, Charlotte Tilbury es la primera marca de prestigio en el Reino Unido y la tercera en EE. UU. [1].',
  'En maquillaje, Charlotte Tilbury es la primera marca de prestigio en el Reino Unido y la tercera en EE. UU. [1], y siguió ganando cuota en todas las regiones en el 3T26 (Maquillaje +16,1 % comparable) [18].');
const lo = j.competencia.competidores.find(c => c.ticker === 'OR.PA');
lo.comentario = "Líder mundial de la belleza de lujo (Yves Saint Laurent, Armani, Prada, Lancôme); creció un 2,8 % comparable en 2025 frente a un mercado selectivo del +1 % [4] y un 5,1 % comparable ajustado en el 1S26 (7.996,7 M EUR de ventas), con fragancias a doble dígito [20]. Ya integra Kering Beauté (Creed) [20].";
const el = j.competencia.competidores.find(c => c.ticker === 'EL');
el.comentario = el.comentario.replace('Rompió las conversaciones de fusión con Puig en mayo de 2026 [6].', 'Rompió las conversaciones de fusión con Puig en mayo de 2026 y no se han reanudado [6].');
reemplaza(j.competencia, 'amenazas',
  "L'Oréal reforzará su liderazgo en lujo con la compra de Kering Beauté [4]",
  "L'Oréal refuerza su liderazgo en lujo con Kering Beauté, ya integrada (Creed) [4, 20]");
reemplaza(j.competencia, 'amenazas',
  'La probabilidad de una erosión rápida del foso es baja: la cuota se ha mantenido en el 11,1 % [1, 3].',
  'La probabilidad de una erosión rápida del foso es baja: la cuota se ha mantenido en el 11,1 % [1, 3] y Puig crece más que el mercado de gama alta en 2026 (+4,8 % comparable en 9M26) [18].');
const fi = j.competencia.foso.fuentes.find(f => f.fuente.startsWith('Intangibles'));
fi.evidencia = fi.evidencia.replace('[1, 2, 3].', '[1, 2, 3]; Carolina Herrera y el nicho tiran en 2026 y los lanzamientos del 3T (1 Million Black, La Favorite) empezaron bien [18].');

// ESG: sin cambios materiales; controversias revisadas a 21-oct
reemplaza(j.esg, 'controversias',
  'No se han encontrado controversias ESG relevantes en prensa en los últimos tres años.',
  'No se han encontrado controversias ESG relevantes en prensa en los últimos tres años (búsqueda repetida el 21-oct-2026).');

j._estado = 'terminado';
j._iteracion = {
  fecha: '2026-10-21',
  resumen: 'Actualizada con las ventas 9M26 (3.744,5 M EUR, +4,8 % LFL; 3T +5,6 % LFL) [18, 19], la compra de ISDIN y el 1S26 de L\'Oréal [20]. No hay fusión en curso con Estée Lauder: rota en mayo de 2026 y sin noticias de reanudación a 21-oct. ESG sin cambios.'
};
fs.writeFileSync(ruta, JSON.stringify(j, null, 2));
console.log('ok');
