// Actualización de la nota A con las ventas del 3T26 (21-oct-2026)
import fs from 'node:fs';
import { fileURLToPath } from 'node:url';
import path from 'node:path';
const dir = path.dirname(fileURLToPath(import.meta.url));
const ruta = path.join(dir, 'A.json');
const a = JSON.parse(fs.readFileSync(ruta, 'utf8'));

// Fuentes nuevas
const nuevas = [
  { id: 11, titulo: 'Actualización de ventas Q3 2026 (nota de prensa, comunicada a la CNMV)', editor: 'Puig Brands, S.A.', tipo: 'Primaria', fecha: '2026-10-21', url: 'https://www.cnmv.es/webservices/verdocumento/ver?t=%7b06bc9655-7d60-4153-a993-2025dac7fb9d%7d' },
  { id: 12, titulo: '9M 2026 Results (presentación a analistas, comunicada a la CNMV)', editor: 'Puig Brands, S.A.', tipo: 'Primaria', fecha: '2026-10-21', url: 'https://www.cnmv.es/webservices/verdocumento/ver?t=%7b0eb96e89-3742-454a-969d-c5f59be4155b%7d' },
];
a.fuentes = a.fuentes.filter(f => f.id < 11).concat(nuevas);

// Negocio
const k = a.negocio.kpis;
k[0].valor_actual = '7,8 % (2025); 4,4 % (1S26); 4,8 % (9M26; 3T26: 5,6 %)';
k[0].variacion = '-3,0 pp (9M26 frente a 2025)';
k[0].comentario = 'Sin divisa ni perímetro; la divisa restó 2,6 pp en 2025 y 0,7 pp en los 9M26 (sumó 1,7 pp en el 3T26, por el dólar) [1, 11].';
k[4].valor_actual = '21,7 % LFL (2025); 20,9 % LFL (1S26); 17,9 % LFL (9M26; 3T26: 12,9 %)';
k[4].comentario = 'La región más pequeña (11 % de las ventas de los 9M26) es la que más crece; se modera en el 3T26 [1, 3, 11].';
a.negocio.extra.segmentos_9M26 = 'Ventas de los 9M26 (9M25): Fragancias y Moda 2.702,0 M (2.617,0; +3,8 % LFL, +3,2 % reportado), Maquillaje 628,5 M (569,2; +12,0 % LFL), Cuidado de la piel 414,1 M (410,0; +1,3 % LFL). 3T26 (3T25): Fragancias y Moda 985,8 M (932,4; +3,9 % LFL), Maquillaje 269,7 M (230,0; +16,1 % LFL), Cuidado de la piel 135,3 M (134,5; −0,8 % LFL) [11]. La empresa no publica resultado por segmento en el trimestre.';
a.negocio.extra.geografias_9M26 = 'Ventas de los 9M26 (9M25): EMEA 1.948,7 M (1.898,0; +3,0 % LFL), América 1.365,9 M (1.330,6; +3,8 % LFL, +2,6 % reportado), Asia-Pacífico 430,0 M (367,6; +17,9 % LFL). 3T26: EMEA 727,5 M (+3,8 % LFL), América 506,7 M (+6,2 % LFL, +9,3 % reportado), Asia-Pacífico 156,5 M (+12,9 % LFL) [11].';
a.negocio.extra.oriente_medio = 'Impacto estimado del conflicto en Oriente Medio: unos -14 M en ventas del 1S26 (-0,6 %), -6 M en el 2T, sobre todo en travel retail [3]; según la empresa, sin impacto significativo en el 3T26 [11].';
a.negocio.extra.isdin = '14-sep-2026: acuerdo para comprar a Esteve el 50 % de ISDIN que no posee por 1.200 M: 900 M en efectivo al cierre, previsto a finales del 1T27 y sujeto a autorizaciones regulatorias, y 300 M aplazados, fijos y sin intereses, en el 1T29 [11]; financiado con recursos propios y deuda, con deuda neta/EBITDA ajustado por debajo de 2x [9, 12]; ISDIN vendió algo más de 647 M (+0,77 %) [9, 10]. Hoy se consolida por puesta en equivalencia: valor contable 168 M a 30-jun-26 (142 M a dic-25) [2].';
a.negocio.extra.lanzamientos_3T26 = 'Lanzamientos del 3T26: La Favorite (Jean Paul Gaultier, primera fragancia femenina de la marca en diez años), 1 Million Black (Rabanne) y Airbrush Flawless Blur Loose Powder (Charlotte Tilbury); Fragancias Niche y Dermocosmética (Uriage) crecen a doble dígito; el cuidado de la piel premium sigue «moderado» [11].';

// Financieros: LTM de ventas a septiembre (solo informativo; el LTM completo sigue a junio)
a.financieros.extra.ltm_ventas_sep26 = 'Ventas LTM a 30-sep-2026: 5.190,3 M (5.042,0 de 2025 − 3.596,2 de 9M25 + 3.744,5 de 9M26; cálculo propio con [1, 11]). Sin EBITDA ni beneficio trimestral publicados: el LTM de la nota sigue a jun-26.';

// Trimestres
const t = a.trimestres;
t.extra.trimestres_ventas = 'Ventas trimestrales: 1T25 1.205,8 M; 2T25 1.093,5 M; 3T25 1.296,9 M; 1T26 1.215,3 M; 2T26 1.138,4 M (+4,1 % reportado y comparable) [3]; 3T26 1.390,8 M (+7,2 % reportado, +5,6 % LFL; el 3T25 creció un 6,1 % LFL) [11] (1T por diferencia). 9M26: 3.744,5 M (+4,1 % reportado, +4,8 % LFL; 9M25: 3.596,2 M, +7,0 % LFL) [11].';
t.extra.proximo = 'Capital Markets Day el 28-oct-2026 en Madrid (13:00 CET) [11]; resultados anuales de 2026, previsiblemente a finales de febrero de 2027.';
t.extra.tendencia_lfl = 'Crecimiento comparable por trimestre en 2026: 1S 4,4 % (2T 4,1 %), 3T 5,6 %: el trimestre más alto del año, contra una base del 6,1 % [3, 11].';
t.ultima_presentacion = 'Ventas de los nueve meses (21-oct-2026, tras el cierre): 3.744,5 M, +4,8 % comparable y +4,1 % reportado (divisa −0,7 pp); el 3T26 vendió 1.390,8 M, +5,6 % comparable y +7,2 % reportado, el trimestre de más ventas de su historia, con la divisa a favor (+1,7 pp por el dólar) por primera vez en el año [11, 12]. Por segmentos, Maquillaje (Charlotte Tilbury) acelera al +16,1 % en el trimestre, Fragancias y Moda crece un +3,9 % y Cuidado de la piel cae un 0,8 % por el premium (Sturm), mientras Dermocosmética crece a doble dígito [11]. Asia-Pacífico se modera (+12,9 % frente a +20,9 % en el 1S) y América acelera (+6,2 %) [3, 11]. La dirección reitera la guía de 2026 (crecer más que el mercado de belleza premium y margen de EBITDA ajustado estable), un dividendo del ~40 % del beneficio publicado y deuda neta/EBITDA ajustado de hasta 2x, con compras «muy selectivas» [12]. El comunicado no da margen, beneficio ni deuda del trimestre ni menciona a Estée Lauder; la estrategia nueva se deja para el Capital Markets Day del 28-oct [11]. Resultados del 1S26 (30-jul): EBITDA ajustado de 460 M (margen 19,5 %, +15 pb), con menos publicidad en el semestre y margen bruto −30 pb por divisa [3]. No se han leído transcripciones de las conferencias (la del 21-oct era a las 18:00, tras el corte).';

// Capital: política con la guía del 21-oct
a.capital.politica = 'Dividendo con cargo al resultado: 212,3 M sobre 2024 (pagado en 2025) y 237,5 M sobre 2025, 0,42159 EUR por acción, pagado el 17-jun-2026 (40 % del beneficio atribuido de 2025, cálculo propio) [1, 2]; la empresa reitera un payout de ~40 % del beneficio publicado [12]. En 2024 se repartieron 186,1 M con cargo a prima de emisión, antes de la OPV [1]. No hay recompras en curso; la autocartera es de 4,89 M de acciones [1]. Prioridades declaradas: deuda neta/EBITDA ajustado de hasta 2x y compras «muy selectivas» (ISDIN, 1.200 M) [11, 12].';
const isd = a.capital.adquisiciones.find(x => x.anio === '2026');
isd.resultado = 'Pendiente de cierre (previsto a finales del 1T27) y de autorizaciones regulatorias [11].';

a._estado = 'terminado';
a._estado_resumen = 'Iteración 21-oct: ventas 3T26 y 9M26 (segmentos, regiones, guía), LTM de ventas a sep-26 informativo; cuentas, balance, flujos y LTM jun-26 sin cambios (no hay cuentas nuevas). Sin novedades de Estée Lauder desde la ruptura de mayo.';
fs.writeFileSync(ruta, JSON.stringify(a, null, 2));
console.log('ok', a.fuentes.length);
