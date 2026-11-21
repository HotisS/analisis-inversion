// Actualización de la nota C tras el 1T FY27 (19-nov-2026). Ejecutar una vez desde la raíz del repo.
import { readFileSync, writeFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const dir = dirname(fileURLToPath(import.meta.url));
const ruta = join(dir, 'C.json');
const c = JSON.parse(readFileSync(ruta, 'utf8'));
if (c.fuentes.some((f) => f.id === 22)) { console.log('Ya actualizada'); process.exit(0); }

const EDGAR = 'https://www.sec.gov/Archives/edgar/data/896878';
c.fuentes.push(
  { id: 22, titulo: 'Nota de resultados 1T FY2027 y venta de Mailchimp, con la guía del 2T y la anual revisada (8-K, anexo 99.01)', editor: 'Intuit / SEC', tipo: 'Primaria', fecha: '2026-11-19', url: `${EDGAR}/000089687826000043/fy27q1earningspressrelease.htm` },
  { id: 23, titulo: 'Form 8-K: acuerdo de venta de Mailchimp a Bending Spoons US Inc. (Item 1.01)', editor: 'Intuit / SEC', tipo: 'Primaria', fecha: '2026-11-19', url: `${EDGAR}/000119312526468834/d182669d8k.htm` },
  { id: 24, titulo: 'Form 10-Q del 1T FY2027 (Legal Proceedings; Item 5, planes 10b5-1)', editor: 'Intuit / SEC', tipo: 'Primaria', fecha: '2026-11-19', url: `${EDGAR}/000089687826000045/intu-20261031.htm` },
  { id: 25, titulo: 'Form 8-K: reexpresión de la información por segmentos con Mailchimp separado (Item 8.01)', editor: 'Intuit / SEC', tipo: 'Primaria', fecha: '2026-11-19', url: `${EDGAR}/000089687826000047/intu-20261119.htm` },
  { id: 26, titulo: 'Form 4 de directivos y consejeros de Intuit, 20-nov-2025 a 20-nov-2026 (105 presentaciones; las del 23-oct, 3-nov y 10-nov-2026 son liquidaciones y concesiones de RSU)', editor: 'SEC EDGAR', tipo: 'Primaria', fecha: '2026-11-20', url: 'https://www.sec.gov/cgi-bin/browse-edgar?action=getcompany&CIK=0000896878&type=4' },
  { id: 27, titulo: 'Intuit (INTU) Q1 2027 Earnings Call Transcript', editor: 'The Motley Fool', tipo: 'Primaria', fecha: '2026-11-20', url: 'https://www.fool.com/earnings/call-transcripts/2026/11/20/intuit-intu-q1-2027-earnings-call-transcript/' },
);

const d = c.directivos;
d.historial_guidance.push(
  {
    anio: '1T FY2027',
    guia: 'Guía de 25-ago-2026: ingresos 4.294-4.313 M USD (+11 %); beneficio operativo GAAP 716-729 M y no GAAP (con pagos en acciones) 902-915 M; BPA GAAP 1,71-1,75 USD y no GAAP 2,44-2,48 USD [20]',
    real: 'Ingresos 4.354 M (+12 %); beneficio operativo GAAP 868 M y no GAAP 1.046 M; BPA GAAP 2,59 USD y no GAAP 2,91 USD: todo por encima del techo del rango [22]',
    cumplida: 'Sí',
  },
  {
    anio: 'FY2027 (en curso)',
    guia: 'Guía de 25-ago-2026: ingresos 23.279-23.512 M USD (+9-10 %), Credit Karma 2.919-2.973 M (+11-13 %); beneficio operativo GAAP 7.408-7.490 M; BPA no GAAP 22,88-23,12 USD [20]',
    real: 'Revisada el 19-nov-2026: ingresos rebajados a 23.081-23.365 M (+8-9 %) por Credit Karma, que pasa a 2.721-2.826 M (+3-7 %); beneficio operativo y BPA reiterados gracias a un menor gasto en pagos en acciones. Guía del 2T (primera vez que se da): ingresos 4.931-4.954 M (+6-7 %), con TurboTax a la baja en el trimestre; no incluye la venta de Mailchimp [22, 27]',
    cumplida: 'Parcial',
  },
);
d.comentario = 'Seis guías anuales entre FY2021 y FY2026: cuatro cumplidas o superadas en ingresos y beneficio operativo, y dos parciales (FY2022, beneficio GAAP por debajo por el cargo de 141 M USD; FY2023, ingresos 117 M por debajo del rango) [14]-[20]. En el 1T FY2027 superó el techo de la guía en todas las líneas, pero a los tres meses de darla rebajó la de ingresos del año en unos 170 M en el punto medio por Credit Karma (que ya se quedó lejos de su guía en FY2023: −9 % frente a +10-15 %) y mantuvo el beneficio solo con menos gasto en acciones [22, 27]. La guía de FY2027 cambia la base: el no GAAP incluye ya los pagos en acciones y Mailchimp es segmento propio, ahora en venta [20, 23, 25]. Desde el 28-oct no hay cambios en la cúpula ni 8-K del Item 5.02 [26]. El equipo es estable arriba (Goodarzi desde 2019, Aujla desde 2023), con rotación por debajo en 2025-2026 [1][6][7][11]. El proxy de 2027 aún no se ha publicado y el de 2026 no nombra sucesor del CEO.';
d.extra = d.extra.filter((x) => !x.startsWith('La guía de FY2027 prevé'));
d.extra.push(
  'La guía de FY2027 de agosto preveía ingresos de 23.279-23.512 M USD (+9-10 %); el 19-nov-2026 se rebajó a 23.081-23.365 M (+8-9 %) y se reiteraron el beneficio operativo GAAP (7.408-7.490 M) y el BPA no GAAP (22,88-23,12 USD) [20, 22].',
  'Venta de Mailchimp (19-nov-2026) a Bending Spoons por 3.680 M USD: 3.310 M en efectivo y 368 M reinvertidos en 8,8 M de acciones nuevas de la matriz italiana, con seis meses de bloqueo; cierre previsto a comienzos de 2027 (fecha límite 19-ago-2027, prorrogable tres meses); el efectivo irá a recompras en el FY2027; no requiere voto de los accionistas [22, 23, 24].',
);

const g = c.gobierno;
g.alertas = g.alertas.map((a) => a.startsWith('Ventas de directivos por 357,7 M USD')
  ? a + ' Tras la cancelación, en septiembre de 2026 adoptaron planes nuevos: Goodarzi (11-sep) para vender hasta 94.477 acciones entre el 11-dic-2026 y el 8-oct-2027, y Aujla (16-sep, 18.600 acciones) y Hanebrink (16-sep, 70.394 acciones) desde el 16-dic-2026 [24]. Entre el 28-oct y el 20-nov-2026 no hubo compras ni ventas en mercado de directivos (las operaciones del 19 y 20-nov aún podrían presentarse) [26].'
  : a);
g.alertas.push(
  'Litigios con la gestión: dos demandas colectivas de accionistas por la Ley del Mercado de Valores (10-jul y 17-ago-2026) y dos demandas derivadas contra consejeros y directivos actuales y antiguos (18 y 28-sep-2026) por deber fiduciario, enriquecimiento injusto y la regla 14(a); sin estimación de pérdida. La demanda restante de la FTC quedó archivada el 15-sep-2026 [24].',
  'Rebaja de la guía de ingresos de FY2027 a los tres meses de darla (Credit Karma de +11-13 % a +3-7 %) [20, 22].',
  'Venta de Mailchimp por 3.680 M USD, menos de un tercio de los 12.000 M pagados en 2021, decidida por el mismo equipo que la compró; aun así la empresa espera una plusvalía antes de impuestos porque solo 641 M del fondo de comercio están en el segmento Mailchimp [23, 24].',
);
g.extra.push(
  'Hechos relevantes desde el 28-oct-2026: tres 8-K el 19-nov (resultados y dividendo de 1,38 USD, +15 %; reexpresión de segmentos; venta de Mailchimp) y ningún 8-K de cambios de consejeros o directivos [22, 23, 25].',
  'Form 4 del 23-oct al 10-nov-2026: solo liquidaciones de RSU de consejeros y RSU recibidas por honorarios (Burton, Szkutak y otros); sin compras ni ventas en mercado [26].',
);
g.insiders_sin_operaciones = false;

c.huecos.push({
  seccion: 'gobierno',
  campo: 'Proxy de 2027 (comisiones, remuneración FY2026, participación de directivos)',
  tipo: 'Complemento',
  intentos: '1) lista de presentaciones de EDGAR a 20-nov-2026: sin DEF 14A (el de 2026 salió el 26-nov-2025); 2) 10-Q del 1T FY2027: no lo trae; 3) 8-K del 19-nov-2026: sin Item 5.02',
  decision: 'Omitido: se mantiene el proxy de 2026',
});
c._estado = {
  terminado: '2026-11-20',
  resumen: 'Actualizada tras el 1T FY27. 1T por encima del techo de la guía en todo; ingresos del FY2027 rebajados a 23.081-23.365 M por Credit Karma (+3-7 % desde +11-13 %), beneficio y BPA reiterados; guía del 2T de +6-7 %. Sin cambios de directivos ni consejo ni 8-K 5.02 desde el 28-oct; sin compras ni ventas de directivos (solo RSU). Nuevo: planes 10b5-1 de Goodarzi, Aujla y Hanebrink (sep-2026) que empiezan en dic-2026; dos demandas derivadas (sep-2026); FTC archivada; venta de Mailchimp a Bending Spoons. Proxy 2027 aún no publicado.',
};
writeFileSync(ruta, JSON.stringify(c, null, 2) + '\n');
console.log('C.json actualizado:', c.fuentes.length, 'fuentes');
