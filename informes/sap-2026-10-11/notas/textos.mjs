// Textos del analista (SAP, corte 2026-10-11). Citas: [A3] = fuente 3 de A.json; [D13] = fuente 13 de D.json; [P1] = fuente propia.
let R = {};
try { R = await import('./resumen.mjs'); } catch (e) { if (!/Cannot find module|ERR_MODULE_NOT_FOUND/.test(String(e))) throw e; }
export const resumen = R.resumen ?? null;
export * from './textos_b.mjs';

// Pasivos de contrato (cobros anticipados de nube y soporte) y beneficio de actividades continuadas: XBRL de EDGAR [A2].
const pc = { 2: 4355, 3: 4032, 4: 4444, 5: 5342, 6: 5008, 7: 6066, 8: 6725 };
export const parches = [
  // 2021-2023: beneficio y BPA de actividades continuadas (Qualtrics, interrumpida); minoritarios de las continuadas.
  { ruta: 'financieros.cuenta[4].beneficio_neto', valor: 6429 }, { ruta: 'financieros.cuenta[4].minoritarios', valor: 395 }, { ruta: 'financieros.cuenta[4].bpa', valor: 5.45 },
  { ruta: 'financieros.cuenta[5].beneficio_neto', valor: 3278 }, { ruta: 'financieros.cuenta[5].minoritarios', valor: -210 }, { ruta: 'financieros.cuenta[5].bpa', valor: 2.79 },
  { ruta: 'financieros.cuenta[6].beneficio_neto', valor: 3633 }, { ruta: 'financieros.cuenta[6].minoritarios', valor: -33 }, { ruta: 'financieros.cuenta[6].bpa', valor: 3.08 },
  ...Object.entries(pc).map(([i, v]) => ({ ruta: `balance.historico[${i}].pasivos_contrato`, valor: v })),
  // Transacciones: valor de la operación entre los ingresos del último ejercicio completo del objetivo (XBRL de EDGAR) [P1]. Estimación propia.
  { ruta: 'identificacion.empleados', valor: 109211 },
  { ruta: 'transacciones.operaciones[0].ev_ventas', valor: 15.4 },
  { ruta: 'transacciones.operaciones[1].ev', valor: 26328 }, { ruta: 'transacciones.operaciones[1].ev_ventas', valor: 7.7 },
  { ruta: 'transacciones.operaciones[2].ev', valor: 7045 }, { ruta: 'transacciones.operaciones[2].ev_ventas', valor: 4.9 },
  { ruta: 'transacciones.operaciones[3].ev', valor: 11676 }, { ruta: 'transacciones.operaciones[3].ev_ventas', valor: 8.6 },
  { ruta: 'transacciones.operaciones[4].ev_ventas', valor: 11.0 },
];

export const huecos_resueltos = [{ seccion: 'transacciones', campo: 'ev_ventas y ev_ebitda' }];

export const fuentes = [
  { id: 1, titulo: 'Ingresos anuales de Ansys, Splunk, Informatica, Qualtrics y Coupa (XBRL de sus 10-K)', editor: 'SEC EDGAR', tipo: 'Primaria', fecha: '2025-02', url: 'https://data.sec.gov/api/xbrl/companyconcept/CIK0001013462/us-gaap/Revenues.json' },
];

export const sostenibilidad = {
  puente_ingresos: [
    { periodo: '2026e', volumen_pct: 7.5, precio_pct: 3.0, otros_pct: -1.5, comentario: 'Guía: nube +23-25 % a divisa constante, soporte −7 % y servicios −2 %; ingresos totales +10,6 % a divisa constante y −1,5 puntos de divisa a tipos de junio [A4]. Reparto entre migraciones (volumen) y subida del ingreso por cliente al pasar del soporte a RISE (precio): estimación propia.' },
    { periodo: '2027e', volumen_pct: 8.0, precio_pct: 3.5, otros_pct: 0.0, comentario: 'SAP espera que el crecimiento de los ingresos acelere en 2027 por la nube y la Cloud ERP Suite; el consenso da +11,7 % [A4, D7]. El fin del mantenimiento estándar de ECC en 2027 empuja las migraciones [B13].' },
    { periodo: '2028e', volumen_pct: 8.0, precio_pct: 3.5, otros_pct: 0.0, comentario: 'El current cloud backlog (22.929 M, +26 % a divisa constante) cubre la mayor parte de la nube de los próximos 12 meses; el consenso da +12,0 % en 2028 [A4, D7].' },
    { periodo: '2029e', volumen_pct: 7.5, precio_pct: 3.0, otros_pct: 0.0, comentario: 'La migración de la base instalada de ECC se acerca a su fin (soporte ampliado hasta 2030); el soporte, que se convierte en nube, pesa cada vez menos.' },
    { periodo: '2030e', volumen_pct: 6.5, precio_pct: 3.0, otros_pct: 0.0, comentario: 'Crecimiento por encima del mercado de ERP (+7,1 % anual previsto) por la venta de IA y datos sobre la base de clientes [B2].' },
  ],
  mercado_final: null,
  veredicto: 'Sí',
  justificacion: `Sí. El 8,2 % anual del caso base no necesita capital (capex del 2,8 % con arrendamientos y circulante negativo por los cobros anticipados de la nube) y queda por debajo del 8,1 % anual de los ingresos de 2021-2025 (con un euro fuerte) y del +26 % del current cloud backlog a divisa constante, que ya cubre el próximo año [A4]. El foso es de costes de cambio: un ERP tarda años en sustituirse y SAP ha subido el ingreso por cliente al pasar del soporte a RISE [B1]. La cuota implícita no se puede medir con el mismo perímetro (los ingresos de ERP de SAP según Apps Run The World son una parte de los suyos) [B2]. El riesgo no es de calidad sino de modelo: que la IA cobre por uso y no por usuario.`,
};
