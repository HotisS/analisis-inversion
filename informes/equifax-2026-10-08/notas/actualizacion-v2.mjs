// actualizacion-v2.mjs — Equifax v2: sostenibilidad del crecimiento (metodología del 10-oct-2026).
// No rehace la investigación: parte de datos.json, borra calc y añade `dcf.sostenibilidad` con lo que ya estaba en el
// informe. Puente de ingresos 2026e-2029e: el crecimiento del grupo = negocio propio (sin FICO) + reventa de FICO a margen
// nulo (`otros`), como en notas/supuestos.mjs. El reparto del negocio propio entre volumen y precio es estimación propia,
// apoyada en el 10-K (crecimiento hipotecario de USIS «sobre todo por precio» con menos consultas), las conferencias de
// 2026 (USIS hipotecas +40 % con consultas +1 %; registros de The Work Number +10 %) y los contratos públicos y Medicaid.
// Mercado final: el perímetro de `competencia.cuota_pct` (31,8 % de 19.096 M USD, ingresos de las tres agencias en su
// último ejercicio) llevado a 2035e al 5 % anual (estimación propia, por debajo del 9,6 % anual de la serie de EE. UU.
// 2023-2025 del informe, inflada por el precio hipotecario y FICO). La prueba solo fallaría con el mercado por debajo del 2,1 %.
// No se cambia ningún supuesto del DCF: la proyección no necesita inversión neta (capex por debajo de la amortización) y la
// cuota implícita no salta el control. Veredicto «En parte» porque casi la mitad del crecimiento es precio bajo presión
// regulatoria; la síntesis explica por qué no se rebaja el caso base.
// Escribe datos-v2.json; después:
//   node motor/calcular-empresa.mjs --datos informes/equifax-2026-10-08/datos-v2.json
import { readFileSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const dir = join(dirname(fileURLToPath(import.meta.url)), '..');
const d = JSON.parse(readFileSync(join(dir, 'datos.json'), 'utf8'));
delete d.calc;

// 1. Sostenibilidad del crecimiento.
const MERCADO_HOY = 19096; // Equifax + Experian + TransUnion, último ejercicio (competencia.cuota_pct) [1, 32, 36]
const G_MERCADO = 5.0;
d.dcf.sostenibilidad = {
  puente_ingresos: [
    { periodo: '2026e', volumen_pct: 3.0, precio_pct: 4.6, otros_pct: 3.4,
      comentario: 'Negocio propio +7,8 % (punto medio de la guía sin FICO) [21]: la hipoteca crece por precio y producto con las consultas planas (USIS hipotecas +40 % con consultas +1 % en el 2T26) [1, 18]; el volumen son registros de The Work Number (+10 %) y Gobierno [21]. Otros: reventa de FICO de ≈175 a ≈385 M, sin margen [21]. Reparto volumen/precio: estimación propia.' },
    { periodo: '2027e', volumen_pct: 3.2, precio_pct: 3.4, otros_pct: 0.2,
      comentario: 'Negocio propio +7,0 %, un punto menos por el informe doble [30]; volumen de los 300 M de contratos públicos firmados en el 1S26 y de Medicaid desde el 1-ene-2027 [21, 41]. FICO casi plano (≈400 M) [21].' },
    { periodo: '2028e', volumen_pct: 3.7, precio_pct: 3.4, otros_pct: -0.6,
      comentario: 'Negocio propio +7,5 % con Medicaid y Gobierno, sin recuperación hipotecaria [21, 41]; la reventa de FICO baja a ≈360 M al pasar prestamistas a VantageScore [21].' },
    { periodo: '2029e', volumen_pct: 3.7, precio_pct: 3.4, otros_pct: -0.4,
      comentario: 'Negocio propio +7,5 %, la parte baja del marco orgánico de la dirección (7-10 %) [21]; FICO baja a ≈330 M.' },
  ],
  mercado_final: { periodo: '2035e', tamano: Math.round(MERCADO_HOY * (1 + G_MERCADO / 100) ** 10) },
  veredicto: 'En parte',
  justificacion: 'En parte. Es un negocio de activos ligeros (capex por debajo de la amortización hasta 2035e), así que la prueba es el poder de precios y la cuota. La cuota pasa del 31,8 % al 36,1 % de las tres agencias con el mercado al 5 % anual (estimación propia); solo saltaría con el mercado por debajo del 2,1 %. El volumen tiene base: The Work Number suma registros al 10 % anual y Medicaid exige verificar desde 2027 [21, 41]. Pero casi la mitad del crecimiento de 2026-2029 es precio, y el precio está bajo la CFPB, los estados, el informe doble y la venta directa de FICO [1, 30, 38, 40]; el grupo creció un 3-4 % en 2022-2023 [3] y su ROIC (9,3 %) no cubre el WACC.',
};

// 2. Textos que cambian: la frase obligatoria del veredicto en «El negocio».
const parrafos = d.resumen.sintesis.split('\n\n');
const iNeg = parrafos.findIndex((p) => p.startsWith('**El negocio.**'));
if (iNeg < 0) throw new Error('Falta el párrafo «El negocio» en la síntesis');
parrafos[iNeg] += ' ¿Sostiene la calidad el crecimiento que proyectamos? En parte: el volumen sí (registros de The Work Number al +10 %, Medicaid desde 2027) [21, 41], pero casi la mitad del crecimiento de 2026-2029 es precio, que está bajo la lupa de reguladores y estados [1, 40]. No rebajamos el caso base porque ya está en la parte baja del marco de la dirección, sin recuperación hipotecaria y por debajo del consenso, y el bajista (25 %) recoge el recorte de precio.';
// El nivel de compra lo recalcula el motor del 10-oct (un Comprar solo relativo exige ≥ 5 % con nuestro coste de capital):
// pasa de 164,86 a 156,42 USD sin cambiar ninguna cifra del DCF. Se toma de calc.recomendacion.niveles.
const iQue = parrafos.findIndex((p) => p.startsWith('**Qué cambiaría la decisión.**'));
if (iQue < 0 || !parrafos[iQue].includes('164,86')) throw new Error('Falta el nivel de compra en la síntesis');
parrafos[iQue] = parrafos[iQue].replace('Comprar por debajo de 164,86 USD', 'Comprar por debajo de 156,42 USD');
d.resumen.sintesis = parrafos.join('\n\n');

writeFileSync(join(dir, 'datos-v2.json'), JSON.stringify(d, null, 2));
console.log(`datos-v2.json escrito (mercado final 2035e: ${d.dcf.sostenibilidad.mercado_final.tamano} M USD).`);
