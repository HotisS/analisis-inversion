// Actualiza A.json (copiado del informe del 28-oct) con los resultados del 3T26 (5-nov-2026).
// Uso: node informes/zoetis-2026-11-06/notas/A-actualizar.mjs  (una sola vez: parte de A-28oct.json)
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
const dir = path.dirname(fileURLToPath(import.meta.url));
const origen = path.join(dir, 'A-28oct.json');
if (!fs.existsSync(origen)) fs.copyFileSync(path.join(dir, 'A.json'), origen);
const a = JSON.parse(fs.readFileSync(origen, 'utf8'));

// Fuentes nuevas (21-24).
a.fuentes.push(
  { id: 21, titulo: 'Zoetis Inc., informe trimestral 10-Q del 3T26 (30-sep-2026)', editor: 'Zoetis Inc. (SEC EDGAR)', tipo: 'Primaria', fecha: '2026-11-05', url: 'https://www.sec.gov/Archives/edgar/data/1555280/000155528026000050/zts-20260930.htm' },
  { id: 22, titulo: 'Zoetis, nota de prensa de resultados del 3T26 y guía de 2026 revisada (anexo 99.1 del 8-K)', editor: 'Zoetis Inc. (SEC EDGAR)', tipo: 'Primaria', fecha: '2026-11-05', url: 'https://www.sec.gov/Archives/edgar/data/1555280/000155528026000048/exhibit99q32026.htm' },
  { id: 23, titulo: 'Zoetis, presentación de resultados del 3T26 (Third Quarter 2026 Financial Results)', editor: 'Zoetis Inc.', tipo: 'Primaria', fecha: '2026-11-05', url: 'https://s203.q4cdn.com/620628704/files/content_files/Zoetis_3Q26_Financial_Results.pdf' },
  { id: 24, titulo: 'Zoetis (ZTS) Q3 2026 Earnings Call Transcript', editor: 'The Motley Fool', tipo: 'Primaria', fecha: '2026-11-05', url: 'https://www.fool.com/earnings/call-transcripts/2026/11/05/zoetis-zts-q3-2026-earnings-call-transcript/' },
);

// LTM a septiembre de 2026: ejercicio 2025 publicado − 9M25 reexpresado + 9M26 [1, 21, 22].
// EBIT = BAI + intereses + «otros (ingresos)/gastos netos» (el mismo criterio que la serie anual).
// 9M26: 2.353 + 185 + 47 = 2.585; 9M25: 2.571 + 165 − 25 = 2.711; 2025: 3.546.
a.financieros.ltm = {
  periodo: 'LTM sep-26', fecha_fin: '2026-09-30',
  ingresos: 9467 - 7094 + 7121, // 9.494
  ebitda: (3546 - 2711 + 2585) + (487 - 365 + 357), // 3.420 + 479 = 3.899
  ebit: 3546 - 2711 + 2585, // 3.420
  beneficio_neto: 2673 - 2049 + 1883, // 2.507
  bpa: 5.93, // 6,02 − 4,60 + 4,51
  dpa: 2.12, // cuatro dividendos trimestrales de 0,53 USD (4T25 a 3T26)
  dpa_extraordinario: 0,
  fcf: (2904 - 2056 + 1880) - (621 - 462 + 334) - 2, // 2.728 − 493 − 2 = 2.233
  participadas_en_ebitda: null, no_recurrentes_en_ebitda: null,
};

a.financieros.ajustes = a.financieros.ajustes.replace(
  'El LTM a junio de 2026 combina el ejercicio 2025 publicado con los semestres reexpresados.',
  'El LTM a septiembre de 2026 combina el ejercicio 2025 publicado con los nueve meses reexpresados de 2025 y los de 2026 [21]. En el 3T26 la empresa apunta 89 M de deterioros (sobre todo los activos de I+D en curso comprados a PetMedix en 2023, en «otros gastos», fuera de nuestro EBIT) y 30 M de despidos del programa de costes; en nueve meses, 241 M de «partidas significativas» frente a 62 M en 2025 [22]. Por eso la guía contable baja a 5,50-5,60 USD mientras la ajustada sube a 6,25-6,35 USD [22].',
);

// Trimestres: fuera el 3T24, entra el 3T26. El 3T25 se deja como se publicó (2.400 M); el 3T26 crece frente al 3T25 reexpresado (2.422 M).
a.trimestres.items = a.trimestres.items.filter((x) => x.periodo !== '3T24');
a.trimestres.items.push({ periodo: '3T26', ingresos: 2391, crecimiento_pct: -1.3, crecimiento_organico_pct: -1, ebitda: null, margen_ebitda_pct: null, bpa: 1.44, vs_consenso: 'Superior' });
a.trimestres.ultima_presentacion = 'El crecimiento orgánico operativo se frenó trimestre a trimestre: 9 % en el 1T25, 8 % en el 2T25, 4 % en el 3T25 y el 4T25, 0 % en el 1T26, −1 % en el 2T26 y −1 % en el 3T26 [9-14, 22]. El 3T26 (5-nov) batió al consenso: ventas de 2.391 M frente a unos 2.300 M esperados y BPA ajustado de 1,75 USD frente a 1,51 [22]; el contable fue de 1,44 USD (−12 %) por 89 M de deterioros y 30 M de despidos [22]. El discurso cambia de tono frente a agosto: la dirección dice que los descuentos «del bruto al neto» funcionan (la pérdida de cuota en dermatología en EE. UU. baja de 7 puntos en el 2T a 4 en el 3T; Simparica Trio mantiene un 22,5-23 % de cuota en clínicas con las visitas de antiparasitarios un 11 % abajo) y adelanta aprobaciones: Cytopoint de larga duración y Simparica Duo antes de fin de año, Convenia RTU para perros ya aprobado [23, 24]. Pero el precio resta (−1 % en el trimestre, más en dermatología) y las visitas de perros en EE. UU. caen un 5 % [24]. Los analistas (JPMorgan, Piper Sandler, Stifel, William Blair, Morgan Stanley, Goldman Sachs y BNP Paribas) preguntaron sobre todo por 2027, por si los descuentos son permanentes y por los márgenes. El nuevo director financiero, Jay Saccaro, no dio cifras: 2027 se planificará «con prudencia», sin suponer mejora del consumo ni de la competencia, y con poca aportación de los lanzamientos hasta finales de año; dijo que revisará qué métricas de guía publica y se negó a opinar sobre los modelos de los analistas [24]. Parte de las ventas del 3T se adelantaron por promociones de otoño, que restan al 4T: la guía implica un 4T de unos 2.100-2.200 M [22, 24].';

// KPI: trimestrales al 3T26 [23, 24].
const k = Object.fromEntries(a.negocio.kpis.map((x) => [x.kpi, x]));
Object.assign(k['Dermatología clave (Apoquel y Cytopoint), trimestral'], { valor_anterior: '2T26: 395 M (−16 %)', valor_actual: '3T26: 396 M (−16 %)', variacion: 'EE. UU. 3T26: 266 M (−13 %); internacional 130 M (−20 %)', comentario: 'En 2025 sumó 1.700 M. Pérdida de cuota en EE. UU. de 4 puntos en el 3T frente a 7 en el 2T; cuota en EE. UU. de ≈ 80 % [23, 24].' });
Object.assign(k['Franquicia Simparica (Simparica y Simparica Trio), trimestral'], { valor_anterior: '2T26: 442 M (plano)', valor_actual: '3T26: 358 M (+1 %)', variacion: 'EE. UU. 3T26: 259 M (−2 %); internacional 99 M (+10 %)', comentario: 'En 2025 sumó 1.500 M. Trio mantiene ≈ 23 % de cuota en clínicas de EE. UU. con las visitas de antiparasitarios −11 % [23, 24].' });
Object.assign(k['Anticuerpos para el dolor por artrosis (Librela, Solensia, Lenivia, Portela), trimestral'], { valor_anterior: '2T26: 147 M (−3 %)', valor_actual: '3T26: 137 M (+2 %)', variacion: 'EE. UU. 3T26: 51 M (−12 %); internacional 86 M (+13 %)', comentario: 'Vuelve a crecer por Lenivia y Portela fuera de EE. UU.; Librela sigue cayendo en EE. UU. [23, 24].' });
Object.assign(k['Diagnóstico de animales de compañía, trimestral'], { valor_anterior: '2T26: 118 M (+12 %)', valor_actual: '3T26: 122 M (+13 %)', variacion: '+13 %', comentario: 'Sobre todo por las compras de VitalRADS (EE. UU.) y VPG (Reino Unido) [23, 24].' });
Object.assign(k['Ventas de animales de compañía (M USD)'], { comentario: '69,6 % de las ventas de 2025; en 9M26, 4.792 M (−4 %; EE. UU. −10 %) [1, 22].' });
Object.assign(k['Ventas de ganadería (M USD)'], { comentario: 'Cae en 2025 por la venta del MFA; en 9M26, 2.248 M (+11 %; orgánico +10 %) [1, 22].' });

a.trimestres.confianza = 'Alta';
fs.writeFileSync(path.join(dir, 'A.json'), JSON.stringify(a, null, 2));

// Textos con datos de junio que se ponen al 3T26 [21, 22].
a.financieros.comentario = a.financieros.comentario.replace('En 2026 la empresa ya no crece: el orgánico operativo fue 0 % en el 1T26 y −1 % en el 2T26, y la guía anual es de −3 % a −1 % [9, 10].', 'En 2026 la empresa ya no crece: el orgánico operativo fue 0 % en el 1T26, −1 % en el 2T26 y −1 % en el 3T26, y la guía anual del 5-nov es de −2 % a −1 % [9, 10, 22].');
a.balance.liquidez = 'A 30-sep-26: caja 1.333 M más 200 M en inversiones a corto plazo, una línea de crédito sindicada de 1.250 M sin disponer (vence en agosto de 2030, ampliable a 1.750 M) y un programa de papel comercial de 1.000 M sin saldo vivo [2, 21].';
a.balance.comentario = a.balance.comentario.replace('A junio de 2026, tras otros 1.190 M de recompras, la deuda neta es de unos 7.370 M (9.048 M de deuda menos 1.676 M de caja y depósitos), cerca de 1,9 veces el EBITDA de los últimos doce meses [2].', 'A septiembre de 2026, tras 1.690 M de recompras en nueve meses, la deuda neta es de 7.516 M (9.049 M de deuda contable menos 1.533 M de caja e inversiones a corto), 1,9 veces el EBITDA de los últimos doce meses; 750 M vencen en 2027 y pasan al corto plazo [21].');
a.capital.politica = a.capital.politica.replace('a 30-jun-26 quedaban 1.300 M [2]', 'a 30-sep-26 quedaban 770 M [21]').replace('Las acciones en circulación bajaron de 448,5 M a cierre de 2024 a 414,2 M en junio de 2026 [1, 2].', 'Las acciones en circulación bajaron de 448,5 M a cierre de 2024 a 407,5 M en septiembre de 2026 y 406,3 M el 30-oct [1, 21].');
a.capital.adquisiciones[0].resultado = 'Fondo de comercio de 977 M sin deterioro; base del negocio de diagnóstico, que vendió 434 M en 2025 y crece un 13 % en el 3T26 [1, 7, 23].';
fs.writeFileSync(path.join(dir, 'A.json'), JSON.stringify(a, null, 2));
console.log('A.json:', a.financieros.ltm, a.trimestres.items.map((x) => x.periodo).join(' '));
