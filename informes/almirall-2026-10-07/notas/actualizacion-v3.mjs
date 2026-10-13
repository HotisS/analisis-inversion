// actualizacion-v3.mjs — Almirall v3 (13-oct-2026): prueba de sostenibilidad del crecimiento (metodología del 10-oct).
// Sin investigación nueva: parte de datos-v2.json (v2 = regla relativa con la prima implícita del mercado), borra calc
// y añade dcf.sostenibilidad. Mismo precio (10,18 EUR, cierre del 6-oct) y misma fecha de corte.
// La prueba no falla: el motor clasifica la proyección como «sin inversión neta» (capex ≈ amortización, porque el capex
// es sobre todo hitos de licencias que se amortizan), así que no calcula crecimiento financiable ni rendimiento del
// capital nuevo; la cuota se prueba a mano (la cuota de la empresa no se publica y el mercado de Evaluate Pharma es
// mundial en USD, otro perímetro). No se cambian cifras del DCF.
// Además se corrigen los niveles de compra y venta de la síntesis y de cambiaria_recomendacion, que seguían con los
// de la v1 (9,21 / 10,60 EUR) aunque la v2 los movió.
// Escribe datos-v3.json; después:
//   node motor/calcular-empresa.mjs --datos informes/almirall-2026-10-07/datos-v3.json
import { readFileSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const dir = join(dirname(fileURLToPath(import.meta.url)), '..');
const d = JSON.parse(readFileSync(join(dir, 'datos-v2.json'), 'utf8'));
delete d.calc;

// Niveles que da el motor tras recalcular (calc.recomendacion de la v3).
const COMPRAR = '9,92';
const VENDER = '12,34';

d.dcf.sostenibilidad = {
  puente_ingresos: [
    {
      periodo: '2026e',
      volumen_pct: 10.0,
      precio_pct: -0.8,
      otros_pct: 1.3,
      comentario: 'Volumen: Ebglyss (84,5 M en el 1S26, +88 %) e Ilumetri (+10,5 %) en dermatología Europa, +18,1 % en el 1S26, contra un negocio maduro que cae un 4,4 % [8]. Precio: recortes unilaterales y precios de referencia en Europa [1] (reparto entre volumen y precio, estimación propia). Otros: los 14 M de la venta de Actithiol dentro de las ventas [8]. Guía: +9-12 % [7].',
    },
    {
      periodo: '2027e',
      volumen_pct: 10.0,
      precio_pct: -0.8,
      otros_pct: -1.2,
      comentario: 'Volumen: dermatología creciendo al 15 % frente al 18 % del 1S26 (Ebglyss en meseta desde el 2T26) y medicina general cayendo un 2-5 % [7, 8]. Otros: Actithiol no se repite. Por debajo del consenso (+10,0 %) [18].',
    },
    {
      periodo: '2028e',
      volumen_pct: 8.3,
      precio_pct: -0.8,
      otros_pct: 0.0,
      comentario: 'Volumen: Ebglyss e Ilumetri hacia sus ventas máximas guiadas (>450 M y >300 M) [7, 9]; el resto igual que en 2027e. Consenso: +8,9 % [18].',
    },
  ],
  mercado_final: null,
  veredicto: 'Sí',
  justificacion: 'Sí, con el margen como supuesto que vigilar. El crecimiento (5,6 % anual en 2026-2033e, por debajo del consenso [18]) es de volumen: dos licencias ya pagadas, Ebglyss e Ilumetri, en un mercado que crece al 11,4 % [9]; el precio resta (recortes en Europa [1]): no hay poder de precios. El motor no ve inversión neta porque los hitos (10-11 % de las ventas) se amortizan al mismo ritmo, no porque el negocio sea ligero. Cuota, a mano: la dermatología crece menos que el mercado. El margen EBITDA de 2030e (24,5 %) queda bajo la guía (~25 % en 2028 [7]). Foso estrecho y ROIC (3,0 %) bajo el WACC: crecer no crea valor.',
};

// Frase obligatoria del veredicto en «El negocio» y niveles al día.
const viejoNegocio = 'sobre todo la de Allergan en EE. UU., que hoy vende 45,2 M.';
if (!d.resumen.sintesis.includes(viejoNegocio)) throw new Error('No encuentro el final de «El negocio»');
d.resumen.sintesis = d.resumen.sintesis.replace(
  viejoNegocio,
  `${viejoNegocio} Su calidad sí sostiene el crecimiento proyectado (5,6 % anual): es volumen de licencias ya pagadas en un mercado que crece al 11,4 % [9], sin ganar cuota ni subir precios.`,
);
// Convicción: los criterios del motor sugieren «Media»; se mantiene «Baja» y se explica.
const viejaRazon = 'La razón principal:';
if (!d.resumen.sintesis.includes(viejaRazon)) throw new Error('No encuentro «La razón principal»');
d.resumen.sintesis = d.resumen.sintesis.replace(viejaRazon, 'Convicción baja y no media, como sugieren los criterios, porque todo depende de un dato (Ebglyss en el 3T26); subiría si confirma la guía. La razón principal:');
const viejoNiveles = 'Compraríamos por debajo de 9,21 EUR y venderíamos por encima de 10,60 EUR.';
if (!d.resumen.sintesis.includes(viejoNiveles)) throw new Error('No encuentro los niveles de la síntesis');
d.resumen.sintesis = d.resumen.sintesis.replace(viejoNiveles, `Compraríamos por debajo de ${COMPRAR} EUR y venderíamos por encima de ${VENDER} EUR.`);
d.resumen.cambiaria_recomendacion = d.resumen.cambiaria_recomendacion.map((t) =>
  t === 'Si el precio baja de 9,21 EUR sin cambios en los datos, Comprar.' ? `Si el precio baja de ${COMPRAR} EUR sin cambios en los datos, Comprar.` : t);

// El control de comparables ya se explicaba en valoracion.comentario; se lleva a controles_explicados.
d.meta.controles_explicados.push({
  control: 'Comparables: EV/EBITDA y PER coherentes',
  explicacion: 'Almirall activa licencias e hitos (10-11 % de las ventas) y los amortiza por debajo del EBITDA, así que EV/EBITDA la favorece (16,31 EUR) y el PER la castiga (8,56 EUR). Por eso los comparables pesan solo un 15 % y la síntesis se apoya en los métodos de flujos (9,19-11,23 EUR).',
});

writeFileSync(join(dir, 'datos-v3.json'), JSON.stringify(d, null, 2));
console.log('datos-v3.json escrito');
