// Nota B (sector y competencia) de Elevance Health, 26-oct-2026. Parte de la nota B del 14-oct (sector y fuentes
// del informe de UnitedHealth, comprobadas allí contra los 10-K de cada competidor y las fuentes de CMS y KFF) y la
// actualiza con los 10-K/10-Q y comunicados de Elevance leídos hoy. Escribe notas/B.json.
import { readFileSync, writeFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';
const aqui = dirname(fileURLToPath(import.meta.url));
const ant = JSON.parse(readFileSync(join(aqui, '../../elevance-2026-10-14/notas/B.json'), 'utf8'));

const B = structuredClone(ant);
B._estado = 'completa (26-oct-2026, 10:10): sector y competidores de la nota del 14-oct (fuentes de CMS, KFF, AMA y 10-K 2025 de cada competidor) actualizados con los documentos de Elevance del 3T26';
// Fuentes nuevas de Elevance (28-30)
B.fuentes.push(
  { id: 28, titulo: 'Elevance Health Reports Third Quarter 2026 Results (8-K, exhibit 99.1)', editor: 'Elevance Health (SEC EDGAR)', tipo: 'Primaria', fecha: '2026-10-21', url: 'https://www.sec.gov/Archives/edgar/data/1156039/000115603926000068/a3q2026elvearningsrelease.htm' },
  { id: 29, titulo: 'Elevance Health, informe trimestral 10-Q del 3T26', editor: 'Elevance Health (SEC EDGAR)', tipo: 'Primaria', fecha: '2026-10-21', url: 'https://www.sec.gov/Archives/edgar/data/1156039/000115603926000071/elv-20260930.htm' },
  { id: 30, titulo: 'Elevance Health (ELV) Q3 2026 Earnings Call Transcript', editor: 'The Motley Fool', tipo: 'Primaria', fecha: '2026-10-21', url: 'https://www.fool.com/earnings/call-transcripts/2026/10/21/elevance-elv-q3-2026-earnings-call-transcript/' },
);

B.historia.hitos = [
  { anio: '2004', hito: 'Fusión de Anthem (Indiana) y WellPoint (California), las dos mayores licenciatarias de Blue Cross Blue Shield.' },
  { anio: '2012', hito: 'Compra de Amerigroup: entrada en Medicaid gestionado.' },
  { anio: '2017', hito: 'Los tribunales bloquean la compra de Cigna; Gail Boudreaux, consejera delegada.' },
  { anio: '2020', hito: 'Lanza su propio gestor de farmacia (IngenioRx, hoy CarelonRx) y compra Beacon Health Options.' },
  { anio: '2022', hito: 'Cambia el nombre a Elevance Health; los servicios pasan a Carelon.' },
  { anio: '2024', hito: 'Compra Paragon, CareBridge y Centers (4.809 M); el ratio de prestaciones sube al 88,5 % y el BPA ajustado cae por primera vez en una década.' },
  { anio: '2025', hito: 'Ratio de prestaciones del 90,0 % y BPA ajustado de 30,29 USD frente a 33,14 en 2023.' },
  { anio: '2026', hito: 'Aviso de CMS sobre datos de riesgo de Medicare Advantage (provisión de 935 M, 342 M pagados, caso cerrado sin sanciones en julio); salida de mercados de Medicare Advantage y Medicaid; guía de BPA ajustado subida tres veces, a al menos 29,00 USD el 21-oct [28, 29].' },
];
B.historia.resumen = 'Elevance Health nace en 2004 de la fusión de Anthem (Indiana) y WellPoint (California), las dos mayores licenciatarias de Blue Cross Blue Shield. Como WellPoint compró Amerigroup en 2012 (Medicaid) y volvió a llamarse Anthem en 2014; su intento de comprar Cigna (2015) lo bloquearon los tribunales en 2017. Desde 2017, con Gail Boudreaux de consejera delegada, ha añadido servicios: gestor de farmacia propio (IngenioRx, hoy CarelonRx, desde 2020), Beacon Health Options (salud conductual, 2020), MMM de Puerto Rico (2021), BioPlus (2023), Paragon y CareBridge (2024). En 2022 cambió el nombre a Elevance Health y agrupó los servicios en Carelon [7]. La lección de 2024-2026 es que la escala Blue no protegió el margen cuando Medicaid y Medicare Advantage subieron de coste más deprisa que las tarifas [28].';

// Ciclo: se añade la mejora del 3T26 de Elevance
B.sector.ciclo.comentario = 'El sector viene de un ciclo de siniestralidad alta: en 2025 el ratio subió entre 1,5 y 3,6 puntos en las grandes aseguradoras y Centene registró un deterioro de 6.700 M [1, 7, 11, 12]. En 2026 las primas se han subido y se han recortado prestaciones y afiliados: el MCR de UnitedHealth bajó al 86,7 % en el 2T26 [2, 27] y el ratio de prestaciones de Elevance mejoró 70 pb en el 3T26 (90,6 %), con Medicaid ayudado por las tarifas del 1-jul y la tendencia de coste «elevada pero estable» [28, 30]. En 2020 la utilización se hundió (el gasto del seguro privado creció solo un 0,4 %) y repuntó en 2023 (+11,2 %) [5]. La serie de CMS no cubre 2008-09.';
B.sector.regulacion = ant.sector.regulacion + ' Elevance cita además los arbitrajes de la ley No Surprises (IDR), que le han obligado a reconocer 669 M de pasivos, sobre todo de clientes autoasegurados [29, 30].';

// Competencia: posición actualizada con los afiliados del 3T26
B.competencia.posicion = '2.º en seguro médico comercial en EE. UU. (12 % de los afiliados en 2024, detrás de UnitedHealth con el 16 %) [17]; ≈ 5 % de Medicare Advantage [6] (1,9 M de afiliados a 30-sep-2026, −15,5 % en un año); 8,2 M de afiliados de Medicaid y 1,3 M en el ACA [28]. Sus ingresos de 2025 equivalen al 3,5 % del gasto sanitario nacional estimado (estimación propia: 197.584 M sobre 5,66 billones) [5, 7].';
B.competencia.foso.fuentes[4].evidencia = '44,9 M de afiliados médicos a 30-sep-2026: escala local para negociar con hospitales, pero menor que UnitedHealth (49,8 M en 2025) y sin una Optum [7, 28].';
B.competencia.amenazas = 'La regulación es la amenaza principal: Medicaid (requisitos de trabajo y límites de financiación de la ley H.R. 1 desde 2027), ajuste de riesgo de Medicare Advantage (V28 y fuentes de diagnóstico, y el caso de CMS de 2026) y el fin de los subsidios reforzados del ACA reducen afiliados e ingresos por miembro justo en los negocios públicos donde Elevance perdió margen en 2025 [13, 14, 29]. En comercial, la presión viene de los hospitales (consolidación), de los arbitrajes IDR y de los fármacos GLP-1 y de especialidad [30]. Es una erosión de margen, no de la franquicia Blue: en la campaña de 2027 «varios grandes empleadores» volvieron a Anthem tras un año fuera [30].';
B.esg.controversias = 'Aviso de CMS de febrero de 2026 sobre diagnósticos de Medicare Advantage de 2015-2023: provisión de 935 M, 342 M pagados el 27-may-2026 y caso cerrado sin sanciones el 13-jul-2026 [29]. Demanda del Departamento de Justicia por la Ley de Reclamaciones Falsas (datos de riesgo de la parte C), en fase de pruebas hasta 2027 [29]. Demanda colectiva de valores por la guía de 2024, que sigue adelante tras la decisión de septiembre de 2026 [29]. Robo de datos de 2015 (78,8 M de personas) [7].';
B.esg.materialidad = 'Lo material son el acceso y el coste de la atención (denegaciones, autorizaciones previas, revisión de terapias conductuales en Medicaid) y la integridad de los datos de riesgo enviados a CMS, que ya costaron 935 M en 2026 [29, 30]. La privacidad de los datos sigue siendo un riesgo: Elevance sufrió en 2015 el mayor robo de datos sanitarios de EE. UU. (78,8 M de personas) [7]. No hay riesgo climático material en las cifras.';
B.esg.confianza = 'Media';
B.sector.confianza = 'Media';
B.competencia.confianza = 'Media';
B.historia.confianza = 'Alta';

writeFileSync(join(aqui, 'B.json'), JSON.stringify(B, null, 2));
console.log('B.json', Object.keys(B));
