// Subagente E: negocio (descripción, cómo gana dinero, clientes), historia y ESG. Lo llama E-nota.mjs.
// Cálculos propios (marcados en el texto):
//  - Ventas brutas en EE. UU. 2025 = ventas netas en EE. UU. 173.166 + descuentos en EE. UU. 394.631 = 567.797 M DKK [5];
//    descuentos / brutas = 69,5 %.
//  - Votos de Novo Holdings: A 1.074,872 M acciones x 100 + B 177,5605 M x 10 = 109.262,8 M votos de 141.388,5 M (77,3 %);
//    capital 125,24 de 446,5 M DKK nominales (28,1 %) [5].
export function completar(nota) {
  const usBrutas = 173166 + 394631;
  const pct = (394631 / usBrutas * 100).toFixed(1).replace('.', ',');

  nota.negocio = {
    descripcion: 'Novo Nordisk desarrolla, fabrica y vende medicamentos para enfermedades crónicas: **diabetes** (Ozempic, Rybelsus, insulinas; 207.109 M DKK en 2025), **obesidad** (Wegovy y Saxenda; 82.347 M DKK) y **enfermedades raras** (hemofilia y hormona de crecimiento; 19.608 M DKK), sobre unas ventas de 309.064 M DKK [5]. EE. UU. pesa el 56 % (173.166 M DKK) y el resto del mundo el 44 % [5]. Trató a 45,6 millones de pacientes en 2025 (42,0 con diabetes y 3,6 con obesidad) con 69.505 empleados [5]. Vende a mayoristas, hospitales y farmacias, cobra a través de aseguradoras, gestores de prestaciones farmacéuticas (PBM) y programas públicos y, desde 2025-2026, directamente al paciente: la farmacia propia NovoCare y nueve plataformas de telemedicina, donde la Wegovy oral, lanzada el 5-ene-2026, se vende a 149-299 USD al mes [19]. Fabrica en red propia, ampliada en 2024 con las tres plantas de llenado compradas a Catalent por 82.146 M DKK [5].',
    como_gana_dinero: `Casi todo el ingreso es recurrente (tratamientos crónicos). El margen depende del **precio neto en EE. UU.** más que del volumen. En 2025 las ventas brutas fueron 729.423 M DKK y los descuentos 420.359 M [5]; en EE. UU. los descuentos (seguros privados y Medicare, devoluciones a mayoristas, Medicaid) fueron 394.631 M, el ${pct} % de las ventas brutas del país (estimación propia: 394.631 ÷ (173.166 + 394.631)) [5]. Un punto de descuento en EE. UU. son unos 5.700 M DKK de ventas. El acuerdo de «nación más favorecida» con la Administración de EE. UU. (nov-2025), el programa Bridge de Medicare para la obesidad (desde el 1-jul-2026) y el canal de autopago dan más pacientes a menor precio [19]; la guía de 2026 prevé ventas ajustadas de −5 % a −13 % a tipo constante [5]. Poca estacionalidad y alto apalancamiento operativo (I+D y fábricas son fijos).`,
    clientes: `La concentración es alta en el canal: tres mayoristas estadounidenses supusieron el 23 %, el 18 % y el 14 % de las ventas netas mundiales de 2025 (55 % en conjunto; 57 % en 2024) [5]. Pero el precio lo fijan los pagadores: los tres grandes PBM, Medicare y Medicaid [5, 19]. Los acuerdos de cobertura se renegocian cada año: CVS Caremark añadirá desde el 1-oct-2026 otros fármacos de obesidad junto a Wegovy en sus listas comerciales más grandes [19]. El **poder de precios se ha invertido**: las ventas de Wegovy inyectable cayeron un 22 % a tipo constante en el 2T26 por precios realizados más bajos pese a más volumen [19], y la cuota de Novo en el valor del mercado mundial de la diabetes bajó 3,6 puntos en 2025, al 30,1 % [5]. Sigue líder en volumen de obesidad de marca (59,6 %) [5].`,
    confianza: 'Alta',
  };

  nota.historia = {
    resumen: 'Novo Nordisk nace en 1989 de la fusión de dos fabricantes daneses de insulina: Nordisk Gentofte, cuyo negocio arrancó en 1923, y Novo Industri, de 1925 [20]. En 2000 separó las enzimas industriales (Novozymes) y quedó como farmacéutica centrada en diabetes [22]. El giro decisivo fueron los análogos de GLP-1: Victoza (2009-2010), Ozempic (2017-2018) y Wegovy para la obesidad (2021) [21, 23]. Su accionista de control es la Fundación Novo Nordisk, a través de Novo Holdings (77 % de los votos) [5]. Desde 2025 vive una crisis: competencia de Lilly, tres rebajas de guía, el relevo del consejero delegado por Mike Doustdar, 9.000 despidos y una junta extraordinaria en la que la Fundación impuso un consejo nuevo presidido por Lars Rebien Sørensen [24-27]. La Wegovy oral (ene-2026) y el Capital Markets Day de sep-2026 abren la etapa actual [19, 28].',
    hitos: [
      { anio: '1923', hito: 'August Krogh, H. C. Hagedorn y A. Kongsted fundan el negocio de insulina que dará lugar a Nordisk Gentofte; en 1925 los hermanos Pedersen fundan Novo [20].' },
      { anio: '1989', hito: 'Fusión de Novo Industri y Nordisk Gentofte en Novo Nordisk A/S [20].' },
      { anio: '2000', hito: 'Escisión de las enzimas industriales en Novozymes (noviembre): Novo Nordisk queda como farmacéutica centrada en diabetes [22].' },
      { anio: '2009', hito: 'Lanzamiento de Victoza, primer análogo humano de GLP-1 de una vez al día, en Europa; aprobado en EE. UU. y Japón en enero de 2010 [21].' },
      { anio: '2018', hito: 'Lanzamiento en EE. UU. y Canadá de Ozempic, GLP-1 semanal para la diabetes tipo 2 (febrero), base de las ventas actuales [23].' },
      { anio: '2021', hito: 'La FDA aprueba Wegovy para la obesidad (junio); la demanda supera a la capacidad y obliga a racionar el suministro [23].' },
      { anio: '2024', hito: 'Novo Holdings compra Catalent por 16.500 M USD y Novo Nordisk le compra tres plantas de llenado por 11.723 M USD (cierre el 18-dic) [1, 5].' },
      { anio: '2025', hito: 'Tres rebajas de la guía de ventas a tipo constante (13-21 % en mayo, 8-14 % en agosto, 8-11 % en noviembre) [24-26]; Mike Doustdar sustituye a Lars Fruergaard Jørgensen como consejero delegado el 7-ago y en septiembre se anuncian unos 9.000 despidos [24, 26].' },
      { anio: '2025', hito: 'Puja perdida con Pfizer por Metsera y compra de Akero por 4.700 M USD más CVR (octubre-noviembre) [7, 10].' },
      { anio: '2025', hito: 'Junta extraordinaria del 14-nov: la Fundación, como accionista mayoritario, renueva el consejo y Lars Rebien Sørensen pasa a presidirlo [27].' },
      { anio: '2026', hito: 'Lanzamiento de la Wegovy oral en EE. UU. (5-ene), el lanzamiento de GLP-1 de mayor volumen en el país; guía de 2026 de ventas entre −5 % y −13 % [5, 19].' },
      { anio: '2026', hito: 'Capital Markets Day (21-sep): ambición de lanzar más de cinco multiblockbusters hasta 2030 y de vender más de 150.000 M DKK con la cartera nueva en 2035 [28].' },
    ],
    confianza: 'Alta',
  };

  nota.esg = {
    calificaciones: [
      { agencia: 'MSCI ESG Ratings', calificacion: 'A (escala AAA-CCC)', fecha: '2025-12' },
      { agencia: 'Sustainalytics', calificacion: 'Riesgo bajo (escala de insignificante a grave)', fecha: '2025-12' },
      { agencia: 'CDP Cambio climático', calificacion: 'B (escala A-D)', fecha: '2025-12' },
      { agencia: 'CDP Agua', calificacion: 'B (escala A-D)', fecha: '2025-12' },
      { agencia: 'Access to Medicine Index', calificacion: '12.º de las 20 mayores farmacéuticas', fecha: '2025-12' },
      { agencia: 'Corporate Knights Global 100', calificacion: 'Puesto 51', fecha: '2025-12' },
    ],
    materialidad: 'Tres asuntos mueven sus cifras. **Acceso y precio** (prioridad de su análisis de doble materialidad [5]): en EE. UU. los descuentos son el 69,5 % de las ventas brutas (estimación propia) [5] y el acuerdo de «nación más favorecida» y el programa Bridge bajan el precio por paciente [19]. **Emisiones de la nueva capacidad**: las emisiones totales (alcances 1, 2 y 3, criterio de mercado) subieron de 1.836 a 2.690 miles de t de CO₂e entre 2023 y 2025, +19 % en 2025 por las plantas nuevas; alcances 1 y 2 son el 7 % [5]. Los objetivos (cero en alcances 1 y 2 en 2030, −33 % en alcance 3 en 2033, cero neto en 2045) chocan con ese crecimiento [5]. **Seguridad del producto**: litigios y alertas sobre la semaglutida, su franquicia principal [5, 29].',
    controversias: 'Responsabilidad por producto: Novo y Lilly afrontan numerosas demandas en EE. UU. por lesiones gastrointestinales (gastroparesia, entre otras) atribuidas a los GLP-1, agrupadas en dos litigios multidistrito en Pensilvania; Novo no prevé impacto material [5]. En junio de 2025 el comité de farmacovigilancia de la EMA añadió la neuropatía óptica isquémica (NAION) como efecto adverso «muy raro» de la semaglutida [29]. Demandas colectivas de accionistas de ADR (ene-2025, por REDEFINE-1; ago-2025, por la guía) [5]. Incidente de seguridad informática comunicado el 11-jun-2026 con datos de pacientes en EE. UU., que ha dado lugar a varias demandas colectivas [19].',
    confianza: 'Media',
  };

  nota.fuentes.push(
    { id: 19, titulo: 'Novo Nordisk: Financial report for the period 1 January 2026 to 30 June 2026 (6-K)', editor: 'Novo Nordisk', tipo: 'Primaria', fecha: '2026-08-04', url: 'https://www.sec.gov/Archives/edgar/data/353278/000035327826000023/caq22026.htm' },
    { id: 20, titulo: 'Novo Nordisk: Form 20-F 2025 (Item 4, historia de la compañía)', editor: 'Novo Nordisk / SEC', tipo: 'Primaria', fecha: '2026-02-04', url: 'https://www.sec.gov/Archives/edgar/data/353278/000035327826000012/nvo-20251231.htm' },
    { id: 21, titulo: 'Novo Nordisk: Annual Report 2009 (6-K)', editor: 'Novo Nordisk', tipo: 'Primaria', fecha: '2010-02', url: 'https://www.sec.gov/Archives/edgar/data/353278/000120864610000074/c102184.htm' },
    { id: 22, titulo: 'Novo Nordisk: Form 20-F 2014', editor: 'Novo Nordisk / SEC', tipo: 'Primaria', fecha: '2015-02-05', url: 'https://www.sec.gov/Archives/edgar/data/353278/000117184315000625/f20f_020515.htm' },
    { id: 23, titulo: 'Novo Nordisk: Form 20-F 2021', editor: 'Novo Nordisk / SEC', tipo: 'Primaria', fecha: '2022-02', url: 'https://www.sec.gov/Archives/edgar/data/353278/000162828022001639/nvo-20211231.htm' },
    { id: 24, titulo: 'Novo Nordisk: Financial report for the first six months of 2025 (6-K)', editor: 'Novo Nordisk', tipo: 'Primaria', fecha: '2025-08-06', url: 'https://www.sec.gov/Archives/edgar/data/353278/000162828025038087/caq22025.htm' },
    { id: 25, titulo: 'Novo Nordisk: Financial report for the first three months of 2025 (6-K)', editor: 'Novo Nordisk', tipo: 'Primaria', fecha: '2025-05-07', url: 'https://www.sec.gov/Archives/edgar/data/353278/000162828025022877/caq12025.htm' },
    { id: 26, titulo: 'Novo Nordisk: Financial report for the first nine months of 2025 (6-K)', editor: 'Novo Nordisk', tipo: 'Primaria', fecha: '2025-11-05', url: 'https://www.sec.gov/Archives/edgar/data/353278/000035327825000005/caq32025.htm' },
    { id: 27, titulo: 'Novo Nordisk: acta de la junta general extraordinaria del 14-nov-2025', editor: 'Novo Nordisk', tipo: 'Primaria', fecha: '2025-11-14', url: 'https://www.novonordisk.com/content/dam/nncorp/global/en/investors/irmaterial/egm/novo-nordisk-egm-2025-minutes.pdf' },
    { id: 28, titulo: 'Novo Nordisk Capital Markets Day 2026: Corporate strategy and our 2030 ambitions', editor: 'Novo Nordisk', tipo: 'Primaria', fecha: '2026-09-21', url: 'https://www.novonordisk.com/content/dam/nncorp/global/en/investors/pdfs/capital-markets-day/2026/corporate-strategy-presentation-cmd-2026.pdf' },
    { id: 29, titulo: 'EMA: Meeting highlights from the Pharmacovigilance Risk Assessment Committee (PRAC) 2-5 June 2025', editor: 'Agencia Europea de Medicamentos', tipo: 'Primaria', fecha: '2025-06-06', url: 'https://www.ema.europa.eu/en/news/meeting-highlights-pharmacovigilance-risk-assessment-committee-prac-2-5-june-2025' },
  );

  nota.huecos.push(
    { seccion: 'esg', campo: 'S&P Global CSA y puntuaciones numéricas actuales de MSCI y Sustainalytics', tipo: 'Complemento', intentos: '1) Informe anual 2025, apartado «Performance of ESG ratings and rankings»: da MSCI A, Sustainalytics riesgo bajo y CDP B/B, sin S&P Global; 2) página pública de Sustainalytics (carga por JavaScript, sin dato legible con WebFetch ni curl); 3) búsqueda web: solo agregadores que citan un 23,1 (riesgo medio) sin fecha verificable, que contradice el informe anual', decision: 'Omitido (se usan las calificaciones que publica la empresa a cierre de 2025)' },
    { seccion: 'historia', campo: 'Fecha de salida a bolsa', tipo: 'Complemento', intentos: '1) Form 20-F 2025, Item 4: solo fecha de constitución (28-nov-1931) y fusión de 1989; 2) Form 20-F 2014 e informe anual 2009: sin fecha de cotización; 3) no se buscó en prensa por presupuesto', decision: 'Omitido' },
  );

  const f5 = nota.fuentes.find(f => f.id === 5);
  if (f5) f5.titulo = 'Novo Nordisk: Annual Report 2025 (cuentas, notas y estado de sostenibilidad)';
}
