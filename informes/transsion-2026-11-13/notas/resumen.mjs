// Resumen ejecutivo (Transsion, línea H, corte 2026-11-13). Se escribe el último. Cifras del motor leídas del cálculo anterior
// (datos.json) y de las pruebas de robustez (notas/robustez.json); se integra y calcula dos veces con el mismo precio.
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { PH, PA, TC, HA, PRECIO } from './precio.mjs';
import { bpa } from './supuestos.mjs';

const dir = path.dirname(fileURLToPath(import.meta.url));
let C = {};
try { C = JSON.parse(fs.readFileSync(path.join(dir, '..', 'datos.json'), 'utf8')).calc || {}; } catch { C = {}; }
let RB = {};
try { RB = JSON.parse(fs.readFileSync(path.join(dir, 'robustez-resumen.json'), 'utf8')); } catch { RB = {}; }
const n = (x, d = 2) => (x == null || Number.isNaN(x) ? 'n.d.' : Number(x).toLocaleString('es-ES', { minimumFractionDigits: d, maximumFractionDigits: d }));
const hk = (cny) => n(cny / TC);
const r = C.recomendacion || {};
const o = r.objetivo_12m || {};
const fila = (e) => (o.filas || []).find((f) => f.escenario === e) || {};
const dcf = C.dcf || {};
const inv = dcf.inverso || {};
const VI = C.sintesis?.tabla ? (C.sintesis.tabla.reduce((s, x) => s + x.valor * x.peso_pct, 0) / 100) : null;
const roic = C.rentabilidad?.at?.(-1)?.roic_pct;
const desc = n((1 - HA) * 100, 1);
const b27 = bpa('Base', 2), b28 = bpa('Base', 3);
const sens2 = dcf.sensibilidad2?.filas || [];
const sensM = (m) => sens2.find((f) => f.margen === m)?.v2;
const v2 = o.selector?.v2 || {};
const lim = RB.limite_robusto_cot, mant = RB.limite_mantener_cot;
const tab = (k) => (r.tabla || []).find((x) => x.concepto.startsWith(k))?.valor ?? 'n.d.';

export default {
  recomendacion: 'Comprar', conviccion: 'Media', justificacion_recomendacion: null, horizonte: '12 meses',
  sintesis: `**La recomendación y por qué.** Comprar la línea H (2636.HK), con convicción media, aunque peor que hace un mes. Nuestro objetivo a 12 meses es de ${tab('Objetivo a 12 meses')}: +${n(o.rentabilidad_ponderada_pct, 1)} % con dividendo (+${n(o.rentabilidad_base_pct, 1)} % el base), frente a un precio de ${n(PRECIO)} CNY (${n(PH)} HKD, cierre del 13-nov-2026) [D1, D8]. El valor intrínseco, ${tab('Valor intrínseco')}, está un ${n((VI / PRECIO - 1) * 100, 1)} % por encima. Las pruebas de robustez (con 42,26 HKD, la sesión que tenían los precios compartidos) dan ${RB.veredicto ?? 'n.d.'}: acción robusta **${RB.accion ?? 'n.d.'}**${lim ? `, con límite de compra de ${n(lim)} HKD` : ''}. La convicción es media y no alta (la sugerida) porque el 3T26 rompió la recuperación (ventas −27 %) y nuestro BPA de 2028e (${n(b28.bpa)}) depende de que la memoria se normalice en 2027-2028; la subiría un 4T26 con ventas de 13.000 M o más y existencias a la baja, y la bajaría un margen bruto por debajo del 20 %. El objetivo medio de los analistas (54,25 CNY para la A, ${n(54.25 * HA)} en base H) no se ha actualizado tras el trimestre.

**Qué ha cambiado desde el 18-oct.** El 3T26 (publicado el 30-oct): ventas de 14.849 M (−27,4 %), beneficio recurrente −47,7 % y flujo operativo de nueve meses de −9.873 M por la memoria almacenada [A13]. Rebajamos las ventas de 2026e de +10,4 % a −3,5 % y de 2027e de +5 % a −4 %, y el BPA de 2028e de 3,38 a ${n(b28.bpa)} CNY. El precio subió de 34,62 a ${n(PH)} HKD: el 12-nov la H saltó un 22,5 % al entrar en el Stock Connect del sur, sin noticia del negocio, y el descuento frente a la A bajó del 48,5 % al ${desc} % [D10, D9]. La rentabilidad a 12 meses baja del 40,1 % al ${n(o.rentabilidad_ponderada_pct, 1)} % y el valor intrínseco de 51,73 a ${n(VI)} CNY.

**El negocio.** Líder de los teléfonos baratos en África y Asia del Sur (20 % de las unidades de los mercados emergentes), con un ROIC prudente del ${n(roic, 1)} % en 2025 frente a un WACC del ${n(dcf.wacc)} % [A1]. Con los 17.319 M de existencias de sep-26 el ROIC de 12 meses baja a ≈ 12 % (estimación propia): la calidad depende de vender ese inventario sin deterioro. Sostenibilidad: **Sí**; el crecimiento proyectado es pequeño, no pide capital y supone perder cuota.

**Valoración.** El DCF da ${n(dcf.valor_accion)} CNY; el precio descuenta ventas planas (${n(inv.crecimiento_implicito_pct, 1)} % anual) o un margen EBITDA del ${n(inv.margen_implicito_pct, 1)} % para siempre, como el de 2025-2026. No es exigente, pero el colchón es estrecho: con dos puntos menos de margen el DCF baja a ${n(sensM('-2 pp'))} CNY. A 12 meses, la H cotiza a ${n(PRECIO / b27.bpa, 1)} veces nuestro BPA de 2027e, casi en su mediana histórica en base H; la rentabilidad sale del salto del BPA de 2027 a 2028 (+26 %) y del dividendo. Con la v2 de control, ${n(v2.rentabilidad_ponderada_pct, 1)} % y ${n(v2.rentabilidad_base_pct, 1)} %. Nuestro BPA de 2028e está un 45 % por debajo del de los analistas.

**Riesgos y catalizadores.** Que el 3T26 sea el nuevo nivel (bajista a 12 meses: ${n(fila('Bajista').rentabilidad_pct, 1)} %); un deterioro de las existencias cuando baje la memoria; y que el dinero del Stock Connect salga y el descuento vuelva al 48,5 % (≈ −11 %). Catalizadores: resultados de 2026 (≈ 28-mar-2027) y fin del bloqueo de los anclas (abr-2027). Los foros desconfían de la subida del 12-nov.

**Qué cambiaría la decisión.** Comprar a mercado solo con la H en ${lim ? n(lim) : 'n.d.'} HKD o menos (límite robusto); quien la tenga, mantener mientras cotice por debajo de ${mant ? n(mant) : 'n.d.'} HKD (filtro de mantener); la banda «vender» de la regla empieza en ${hk(o.vender_por_encima)} HKD. Ventas del 4T26 por debajo de 12.000 M o margen bruto bajo el 20 % nos llevarían al bajista.`,
  tesis: `Transsion es el líder de los teléfonos baratos en África y Asia del Sur, con un ROIC del 36-64 % en 2021-2024 gracias al circulante negativo y del ${n(roic, 1)} % en 2025 [A1]. La memoria cara por la IA le hundió el margen en 2025 y, tras un 1S26 de precios altos, el 3T26 mostró la otra cara: ventas −27 % y beneficio recurrente −48 % [A13].

La H cuesta un ${desc} % menos que la A y ${n(PRECIO / b27.bpa, 1)} veces nuestro BPA de 2027e, con caja neta de ≈ 7 CNY por acción (≈ 9 con las participaciones) y un dividendo del ${n(r.dividendo_pct, 1)} %. El precio equivale a ventas planas y un margen EBITDA del ${n(inv.margen_implicito_pct, 1)} % para siempre [D1, D2].

Para invertir hay que creer que la memoria se normaliza en 2028 y el margen vuelve al 6,5 % (frente al 9-10 % de 2023-2024): BPA de ${n(b28.bpa)} CNY. Lo que la rompe es que 2027 se parezca al 3T26 o que haya que deteriorar el inventario.`,
  vision_diferencial: {
    mercado_descuenta: `Los analistas, una recuperación rápida (ventas de 81.000 M en 2027e y BPA de 3,36); el precio, ventas planas y un margen EBITDA del ${n(inv.margen_implicito_pct, 1)} % para siempre. El mercado de la H añade el arbitraje del Stock Connect.`,
    nuestra_vision: `Más pesimistas que los analistas a corto (ventas −4 % en 2027e) y algo más optimistas que el precio a largo: el margen vuelve al 6,5-6,8 % cuando la memoria se normalice. BPA de 2028e de ${n(b28.bpa)} CNY, un 45 % por debajo del consenso.`,
    por_que: 'El 3T26 muestra que la subida de precio ya no compensa las unidades perdidas [A13]; pero la memoria es cíclica (tres ciclos desde 2017) y el margen bruto se ha sostenido en el 22,7 % [B9, A13].',
  },
  a_favor: [
    `**Barata frente a sí misma**: la H cuesta un ${desc} % menos que la A [D2].`,
    `**Caja neta y dividendo**: ≈ 7 CNY por acción de caja neta (≈ 9 con las participaciones) y un ${n(r.dividendo_pct, 1)} % de dividendo [A13].`,
    '**Margen bruto que aguanta**: 22,7 % en el 3T26 frente al 18,6 % un año antes [A13].',
    '**Líder en mercados que crecen**: 20 % de los teléfonos de los mercados emergentes [B1].',
  ],
  en_contra: [
    '**Ventas a la baja**: −27,4 % en el 3T26 con el mercado mundial −22 % y África −39 % [A13, B7, B8].',
    '**Inventario**: 17.319 M de existencias y −9.873 M de flujo operativo en nueve meses [A13].',
    '**Memoria cara por la IA**: del 10-15 % al 40-50 % del coste de un teléfono barato [B9].',
    '**Subida de flujo**: el +22,5 % del 12-nov viene del Stock Connect, no del negocio [D10].',
  ],
  que_vigilar: 'Las ventas del 4T26 y las existencias a fin de año (resultados ≈ 28-mar-2027). La tesis aguanta con ventas del 4T de 13.000 M o más, margen bruto por encima del 20 % y existencias por debajo de 15.000 M; falla con ventas por debajo de 12.000 M o un deterioro grande del inventario.',
  cambiaria_recomendacion: [
    `Precio por encima de ${lim ? n(lim) : 'n.d.'} HKD: no se compra (límite robusto); quien la tenga, vende por encima de ${mant ? n(mant) : 'n.d.'} HKD (filtro de mantener).`,
    'Ventas del 4T26 por debajo de 12.000 M o margen bruto por debajo del 20 %: pasaríamos el base al bajista.',
    'Deterioro de existencias de más de 1.000 M en 2026: revisaríamos el ROIC y la calidad.',
    'Bajada de la memoria en 2027 con ventas al alza: subiríamos el base.',
  ],
  kpis_seguimiento: [
    { kpi: 'Ventas trimestrales', nivel_actual: '14.849 M (3T26, −27,4 %)', umbral_alerta: '< 12.000 M en el 4T26', por_que: 'Dice si el 3T26 es el nuevo nivel.' },
    { kpi: 'Margen bruto', nivel_actual: '22,7 % (3T26)', umbral_alerta: '< 20 %', por_que: 'Mide si el precio sigue cubriendo la memoria.' },
    { kpi: 'Existencias', nivel_actual: '17.319 M (sep-26)', umbral_alerta: '> 17.000 M en dic-26', por_que: 'Riesgo de deterioro y de ROIC.' },
    { kpi: 'Descuento de la H frente a la A', nivel_actual: `${desc} % (13-nov-2026)`, umbral_alerta: '> 48 %', por_que: 'Si se reabre, la subida del Stock Connect se devuelve.' },
    { kpi: 'Cuota de smartphones en África (Omdia, Canalys)', nivel_actual: '47 % (1T26)', umbral_alerta: '< 40 %', por_que: 'Separa lo cíclico de lo estructural.' },
  ],
  confianza: 'Media',
};
