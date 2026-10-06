// Construye notas/D.json a partir de bolsa.json y de los datos copiados a mano de las fuentes.
// node informes/intuitive-2026-10-06/notas/D_scripts/construir.mjs
import { readFileSync, writeFileSync, existsSync } from 'node:fs';
const base = 'informes/intuitive-2026-10-06/notas';
const B = JSON.parse(readFileSync(`${base}/bolsa.json`, 'utf8'));
const parte = (n) => (existsSync(`${base}/D_scripts/${n}.json`) ? JSON.parse(readFileSync(`${base}/D_scripts/${n}.json`, 'utf8')) : null);

const fuentes = JSON.parse(readFileSync(`${base}/D_scripts/fuentes.json`, 'utf8'));
const huecos = parte('huecos') || [];

const D = {
  identificacion: {
    nombre: 'Intuitive Surgical, Inc.', nombre_corto: 'Intuitive', ticker: 'ISRG', isin: 'US46120E6023', mercado: 'NASDAQ Global Select Market', indice_referencia: 'S&P 500',
    pais: 'Estados Unidos', pais_iso: 'US', sector: 'Health Care', industria: 'Health Care Equipment & Supplies', sede: 'Sunnyvale, California (EE. UU.)', fundacion: '1995', empleados: 17021, web: 'www.intuitive.com',
    precio: B.identificacion.precio, fecha_precio: B.identificacion.fecha_precio, acciones: 356.5, capitalizacion_publicada: 142970, free_float_pct: 99.5,
    max_52s: B.identificacion.max_52s, min_52s: B.identificacion.min_52s,
    volumen_medio_diario: `≈ ${(B.volumen_3m.importe_dia_millones / 1000).toFixed(2).replace('.', ',')} mil M USD/día (${(B.volumen_3m.acciones_dia / 1e6).toFixed(1).replace('.', ',')} M de acciones; 3 meses, ${B.volumen_3m.sesiones} sesiones)`,
    proximos_resultados: '2026-10-20',
    extra: parte('ident_extra'),
  },
  consenso: parte('consenso'),
  bolsa: { ...B.bolsa, posicion_corta_pct: 2.31, comentario: null, confianza: 'Alta', extra: parte('bolsa_extra') },
  multiplos_historicos: { serie: B.cierres_ejercicio.map((c) => ({ anio: c.anio, precio_cierre: c.precio_cierre, ev_ebitda_ntm: null, per_ntm: null, excluir: false })), comentario: null, confianza: 'Media', extra: parte('mh_extra') },
  comparables: parte('comparables'),
  transacciones: parte('transacciones'),
  dcf: parte('dcf'),
  valoracion: parte('valoracion'),
  fuentes, huecos,
};
delete D.bolsa.tramo_drawdown;
writeFileSync(`${base}/D.json`, JSON.stringify(D, null, 2));
console.log('D.json escrito; secciones nulas:', Object.entries(D).filter(([, v]) => v === null).map(([k]) => k).join(', ') || 'ninguna');
