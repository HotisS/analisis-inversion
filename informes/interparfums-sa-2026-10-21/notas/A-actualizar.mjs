// A: puesta al día de la nota A con las ventas del 3T26 (corte 21-oct-2026).
import fs from 'node:fs';
import { fileURLToPath } from 'node:url';
const ruta = fileURLToPath(new URL('./A.json', import.meta.url));
const a = JSON.parse(fs.readFileSync(ruta, 'utf8'));

// Fuentes nuevas
const nuevas = [
  { id: 7, titulo: 'Q3 2026 sales: €265.5m (+4.8%) (ventas del 3T y de 9M26 por marca y zona; previsión 2026)', editor: 'Interparfums SA (archivo AMF/DILA)', tipo: 'Primaria', fecha: '2026-10-21', url: 'https://echanges.dila.gouv.fr/OPENDATA/AMF/ECO/2026/10/FCECO083502_20261021.pdf' },
  { id: 8, titulo: 'Interparfums retrouve de la croissance au 3e trimestre (consenso de ventas 2026 y 2027 según Invest Securities)', editor: 'Zonebourse / Boursorama', tipo: 'Prensa', fecha: '2026-10-21', url: 'https://www.boursorama.com/bourse/actualites/interparfums-retrouve-de-la-croissance-au-3e-trimestre-89a2196431e56cadb16e7173e70931c7' }
];
a.fuentes = a.fuentes.filter(f => f.id < 7).concat(nuevas);

// negocio
const n = a.negocio;
n.kpis[0] = { kpi: 'Ventas a tipos constantes', valor_anterior: '+4 % (2025)', valor_actual: '−0,7 % (9M26); +4,6 % en el 3T26', variacion: '−4,7 pp', comentario: 'Tras −3,7 % en el 1S26. Guía 2026: «el alto» de la horquilla, unos 870 M a tipos corrientes (antes 850-870 M) [7].' };
n.kpis[5] = { kpi: 'Ventas de la filial de EE. UU. en moneda local', valor_anterior: '+9 % (2025)', valor_actual: '+9 % (9M26)', variacion: 'estable', comentario: 'Interparfums Luxury Brands; en euros Norteamérica crece solo un 2 % en 9M por el dólar (1,16 frente a 1,12) [1, 7].' };
n.kpis.push({ kpi: 'Ventas en Oriente Medio y Europa del Este', valor_anterior: '94,8 M (9M25)', valor_actual: '68,7 M (9M26)', variacion: '−27,5 %', comentario: 'En el 3T26 siguen cayendo (−32 % y −31 %); Asia compensa (+32 % en el 3T, con China) [7].' });
n.clientes = n.clientes.replace(
  'pero la de Moncler acaba en dic-2026 sin renovación publicada',
  'pero la de Moncler acaba en dic-2026 sin renovación publicada (el comunicado del 3T26, del 21-oct, tampoco la menciona) [7]'
) + ' En los nueve primeros meses de 2026 las tres primeras marcas ganan peso: Jimmy Choo 179,0 M, Coach 175,3 M (+10 %) y Montblanc 153,3 M, el 74,7 % de las ventas, mientras Lanvin cae un 24 % y sufre «problemas de aprovisionamiento de algunos componentes» antes de sus lanzamientos [7].';

// financieros
a.financieros.comentario = a.financieros.comentario.replace(
  'con EE. UU. al alza [1, 3].',
  'con EE. UU. al alza [1, 3]. En el 3T26 volvieron a crecer (265,5 M, +4,8 %; +4,6 % a tipos constantes), por Coach (+25 %), Montblanc (+13 %) y Asia (+32 %), y los nueve meses quedan en 679,8 M (−2,9 %; −0,7 % a tipos constantes) [7]. Ventas de los últimos doce meses a sep-2026: 878,8 M (estimación propia: 9M26 más el 4T25 de 199,0 M = 899,4 − 700,4) [1, 7]; el LTM del informe sigue siendo el de jun-26, el último con cuenta completa.'
);

// trimestres
a.trimestres.ultima_presentacion = 'En las ventas del 1S26 (23-jul) la dirección habló de «un entorno que nunca ha sido tan complicado» (Oriente Medio, Europa del Este y el dólar) y rebajó el año a 850-870 M de ventas (−3 % a tipos constantes) [3]. En los resultados (9-sep) el margen operativo del semestre salió en el 21,1 %, por encima de su propia guía, gracias a la devolución de los aranceles de EE. UU., y mantuvo para el año «alrededor del 18 %» [2]; los analistas esperaban un resultado operativo de 79,7 M y salió en 87,3 M [2]. En las ventas del 3T26 (21-oct) el tono mejora: «la actividad ha recuperado una dinámica más favorable durante el verano», el 3T crece un 4,8 % y la empresa apunta ya al alto de la guía, unos 870 M [7]. Sigue prudente con el 4T por Oriente Medio, Europa del Este y la estacionalidad de EE. UU. (noviembre y diciembre), y no repite ni cambia la guía de margen [7]. La guía de ventas queda algo por debajo del consenso de 880 M para 2026 que cita Invest Securities (945 M para 2027) [8]. El discurso sigue apuntando a 2027-2028: unas 20 iniciativas (Longchamp, Off-White, Annick Goutal, Montblanc, Lacoste, Lanvin), con una acogida «muy favorable» de los socios; las cifras de 2027 se darán el 19-nov-2026 [2, 7]. Nada sobre la licencia de Moncler (vence en dic-2026) ni la opción de recompra de Lanvin de jul-2027, y aparece un problema nuevo: falta de algunos componentes para los lanzamientos de Lanvin [1-3, 7].';

a._estado = 'terminado';
fs.writeFileSync(ruta, JSON.stringify(a, null, 2) + '\n', 'utf8');
console.log('ok', a.fuentes.length);
