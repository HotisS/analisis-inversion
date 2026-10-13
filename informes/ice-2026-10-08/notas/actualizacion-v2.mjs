// actualizacion-v2.mjs — ICE v2: prueba de sostenibilidad del crecimiento (metodología del 10-oct-2026).
// No rehace la investigación: parte de datos.json, borra calc y añade `dcf.sostenibilidad` con lo que ya
// había en el informe (cuentas, KPI, guía y notas A-D). No cambia supuestos del DCF: la proyección media
// (4,7 % en 2027e-2035e) ya está por debajo del 8,6 % de 2021-2025 y del 7,9 % previsto para su mercado,
// y el reparto volumen/precio sale de la historia de la propia empresa. Sin cuota publicada en un documento
// primario (`competencia.cuota_pct` es null), `mercado_final` queda en null y la prueba de cuota se hace a mano.
// Escribe datos-v2.json; después:
//   node motor/calcular-empresa.mjs --datos informes/ice-2026-10-08/datos-v2.json
import { readFileSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const dir = join(dirname(fileURLToPath(import.meta.url)), '..');
const d = JSON.parse(readFileSync(join(dir, 'datos.json'), 'utf8'));
delete d.calc;

// 1. Prueba de sostenibilidad.
d.dcf.sostenibilidad = {
  puente_ingresos: [
    {
      periodo: '2026e', volumen_pct: 9, precio_pct: 1.5, otros_pct: 0.5,
      comentario: 'Año casi cerrado: el 1S26 creció un 12,5 % por el volumen de energía (1T26 +46 %) y el volumen medio diario del 3T26 subió un 31 % [8, 35]. Precio: ingreso por contrato de energía de 1,70 a 1,74 USD en 2023-2025 y subidas contractuales en el software hipotecario [1]. Otros: divisa (reparto entre volumen y precio, estimación propia).',
    },
    {
      periodo: '2027e', volumen_pct: 2.5, precio_pct: 2.5, otros_pct: 0,
      comentario: 'El volumen de energía se normaliza frente a un 2026 récord (2T26: energía −13 %) [6, 7]; crecen los recurrentes: valor anual suscrito de datos +7,9 % y guía de Renta fija y datos del 7-8 % [6, 8]. Precio: inflación repercutida en tarifas y suscripciones [1].',
    },
    {
      periodo: '2028e', volumen_pct: 3.5, precio_pct: 2.5, otros_pct: 0,
      comentario: 'Recuperación de la originación hipotecaria (Fannie Mae: 2,28 billones USD en 2027, aún la mitad de 2021) [27] y compensación de bonos del Tesoro desde el 4T26 [1]. El consenso da +7,0 % [56].',
    },
    {
      periodo: '2029e', volumen_pct: 3.5, precio_pct: 2.5, otros_pct: 0,
      comentario: 'Derivados cotizados con interés abierto récord (+22,8 % en 2025, FIA) [33] y gasto en datos financieros al +6,5 % [34]; precio como en 2023-2025 [1].',
    },
    {
      periodo: '2030e', volumen_pct: 3, precio_pct: 2.5, otros_pct: 0,
      comentario: 'El volumen se modera hacia el crecimiento del mercado; el precio sigue la inflación en tarifas y contratos de software de cinco a siete años [1].',
    },
  ],
  mercado_final: null,
  veredicto: 'Sí',
  justificacion: 'Sí para el caso base, que pide poco: un 4,7 % anual en 2027e-2035e (5,3 % con 2026e), menos que el 8,6 % de 2021-2025 y que el 7,9 % previsto para su mercado. El foso es amplio (Brent y TTF con efectos de red; Encompass y MSP como sistemas de registro) y el poder de precios está probado: ingreso por contrato de energía al alza y subidas contractuales en el software [1]. Es de activos ligeros: reinversión neta del 3 % del NOPAT y ROIC incremental del 11,5 %. Sin cuota publicada comparable no hay prueba de cuota; el riesgo es el ciclo (energía, hipotecas), que va en el bajista.',
};

// 2. Textos reescritos (solo los que cambian).
const T = {
  'resumen.sintesis': d.resumen.sintesis.replace(' La amortización de intangibles adquiridos (994 M en 2025) separa el BPA contable del ajustado [1].', '').replace(
    'El ROIC incremental de 2021-2025 es del 11,5 %.',
    'El ROIC incremental de 2021-2025 es del 11,5 %. Su calidad sostiene el crecimiento que proyectamos (sostenibilidad: sí): un 4,7 % anual, menos que en 2021-2025 y que su mercado, con poder de precios y poca inversión; la duda es el ciclo, no el foso.',
  ),
};
for (const [ruta, valor] of Object.entries(T)) {
  const partes = ruta.split('.');
  let o = d;
  for (const p of partes.slice(0, -1)) o = o[p];
  if (o === undefined || !(partes.at(-1) in o)) throw new Error(`Ruta inexistente: ${ruta}`);
  if (o[partes.at(-1)] === valor) throw new Error(`Sin cambio: ${ruta}`);
  o[partes.at(-1)] = valor;
}

writeFileSync(join(dir, 'datos-v2.json'), JSON.stringify(d, null, 2));
console.log(`datos-v2.json escrito (${Object.keys(T).length} textos).`);
