// Parte del analista (Dassault Systèmes, corte 2026-10-07). Citas con prefijo: [A3] = fuente 3 de A.json; [P1] = propia.
import { anios, wacc, terminal, pesos } from './supuestos.mjs';
import { existsSync } from 'node:fs';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { dirname, join } from 'node:path';

const aqui = dirname(fileURLToPath(import.meta.url));
const cargar = async (n) => (existsSync(join(aqui, n)) ? (await import(pathToFileURL(join(aqui, n)).href)) : {});
const { textos = {} } = await cargar('textos.mjs');
const { resumen = null } = await cargar('resumen.mjs');

const base = {
  meta: {
    fecha_corte: '2026-10-07', divisa: 'EUR', divisa_cotizacion: 'EUR', tipo_cambio: 1, unidades: 'millones',
    cierre_ejercicio_mes: 12, etiqueta_ejercicio: 'fin', normas_contables: 'NIIF-UE', formato_cuenta: 'funcion',
  },
  identificacion: { pais_iso: 'FR' },
  consenso: { base_ebitda: 'ajustado', ajuste_ebitda_pct_ventas: 2.4 },
  dcf: {
    anios, wacc, terminal,
    etapa2: { usar: false, anios: 8, margen_final_pct: null, justificacion: null },
    mitad_de_anio: true,
  },
  valoracion: {
    puente: { fecha: '2026-06-30', deuda_financiera: 3377.7, arrendamientos: 574.0, caja: 5660.1, minoritarios: 5.4, pensiones: 109.5, asociadas: 0, otros_ajustes: 0 },
    rab: null,
    referencia_mercado: { mercado: 'Prima implícita del S&P 500 (Damodaran), válida para mercados desarrollados', prima_implicita_pct: 4.2, fecha: '2026-10', fuente: 'Damodaran, ERPbymonth.xlsx, columna «ERP (T12m with sustainable payout)» [P1]' },
    pesos,
  },
  suma_partes: { aplica: false, descuento_holding_pct: 0, partes: [], comentario: 'No aplica. Dassault publica un único segmento operativo y no da resultado por línea de producto [A4]; Ciencias de la vida (18 % del software) tiene un perfil distinto, pero sin su margen cualquier suma de partes sería inventada. El riesgo de Medidata se recoge en los escenarios.', confianza: 'Media' },
  fuentes: [
    { id: 1, titulo: 'Implied ERP by month (ERPbymonth.xlsx), fila de octubre de 2026', editor: 'Aswath Damodaran, NYU Stern', tipo: 'Datos de mercado', fecha: '2026-10', url: 'https://pages.stern.nyu.edu/~adamodar/pc/implprem/ERPbymonth.xlsx' },
  ],
  huecos: [],
  _parches: [],
};

const out = { ...base };
for (const [k, v] of Object.entries(textos || {})) {
  if (v && typeof v === 'object' && !Array.isArray(v) && out[k] && typeof out[k] === 'object' && !Array.isArray(out[k])) {
    out[k] = { ...out[k], ...v };
    if (k === 'dcf' && v.etapa2) out.dcf.etapa2 = { ...base.dcf.etapa2, ...v.etapa2 };
    if (k === 'valoracion' && v.puente) out.valoracion.puente = { ...base.valoracion.puente, ...v.puente };
  } else out[k] = v;
}
if (resumen) out.resumen = resumen;
export default out;
