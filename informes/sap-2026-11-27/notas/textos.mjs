// Textos del analista (SAP, corte 2026-11-27). Citas: [A3] = fuente 3 de A.json; [D13] = fuente 13 de D.json; [P1] = fuente propia.
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
    { periodo: '2028e', volumen_pct: 8.0, precio_pct: 3.5, otros_pct: 0.0, comentario: 'El current cloud backlog (24.144 M, +26 % a divisa constante) cubre la mayor parte de la nube de los próximos 12 meses; el consenso da +12,3 % en 2028 [A14, D43].' },
    { periodo: '2029e', volumen_pct: 7.5, precio_pct: 3.0, otros_pct: 0.0, comentario: 'La migración de la base instalada de ECC se acerca a su fin (soporte ampliado hasta 2030); el soporte, que se convierte en nube, pesa cada vez menos.' },
    { periodo: '2030e', volumen_pct: 6.5, precio_pct: 3.0, otros_pct: 0.0, comentario: 'Crecimiento por encima del mercado de ERP (+7,1 % anual previsto) por la venta de IA y datos sobre la base de clientes [B2].' },
  ],
  mercado_final: null,
  veredicto: 'Sí',
  justificacion: `Sí. El 8,3 % anual del caso base no necesita capital (capex del 2,8 % con arrendamientos y circulante negativo por los cobros anticipados de la nube). El motor lo ve «En parte» porque supera el 5,8 % anual de los ingresos históricos, pero esa serie arrastra la salida de Qualtrics y la caída del soporte: la nube crece un 25 % en nueve meses y el current cloud backlog (24.144 M, +26 % a divisa constante) ya cubre el próximo año [A14]. El foso es de costes de cambio: un ERP tarda años en sustituirse y SAP ha subido el ingreso por cliente al pasar del soporte a RISE [B1]. El riesgo no es de calidad sino de modelo: que la IA cobre por uso y no por usuario.`,
};

export const just12m = {
  Bajista: 'Desde 2027 crece 4 puntos menos y el margen pierde 3: ventas de 46.780 M en 2028e y BPA de 7,94 EUR (2026e ya está casi cerrado con nueve meses publicados).',
  Base: 'Ventas de 50.326 M en 2028e (+10 %, +11,5 % y +11,5 %) y margen EBITDA del 33,5 %: BPA de 9,48 EUR, un 1,7 % por debajo del consenso de después de los resultados (9,64) [D43].',
  Alcista: 'La IA y la migración de ECC suben el crecimiento 2,5 puntos y el margen 2: BPA de 10,57 EUR.',
};
export const diferencia_consenso = 'Nuestro BPA queda algo por debajo del consenso posterior al 3T26: 7,07 frente a 7,18 en 2026e, 8,19 frente a 8,18 en 2027e y 9,48 frente a 9,64 en 2028e (−1,7 %) [D43]; el consenso sube un 1-2 % desde el 21-oct y nosotros no tocamos el crecimiento ni el margen, porque la transcripción del 3T modera 2027 (contratación del 4T, servicios a la baja) [A17]. Nuestro precio base (247,43 EUR) y el ponderado (243,74 EUR) coinciden con el objetivo medio de los analistas (243,54 EUR, que ha subido desde 215,76): la distancia ya no está en el múltiplo sino que el precio ha caído un 7 % desde los resultados con estimaciones al alza [D44].';
export const objetivo12m_comentario = 'Objetivo ponderado de 243,74 EUR (+26,8 % con dividendo; base +28,7 %). Con el PER al cierre (v2) la rentabilidad es del 19,0 % (base 17,0 %) y con el BPA un 10 % más bajo del 14,3 % (base 16,0 %), por debajo del 15 % de compra: la compra no aguanta la prueba del BPA y solo es robusta por debajo de 193,03 EUR. El valor intrínseco (199,13 EUR) queda un 2,6 % por encima del precio: la regla da Comprar, con poco margen de valor real. La distancia de 22 % entre el valor intrínseco y el objetivo a 12 meses se debe a que el objetivo aplica un PER de 26,1 veces al BPA de 2028e, mientras el DCF descuenta con un WACC del 9,10 %: cerrarla exige que el mercado vuelva a pagar la historia del PER, y el catalizador con fecha es la contratación del 4T (resultados del 28-ene-2027).';
