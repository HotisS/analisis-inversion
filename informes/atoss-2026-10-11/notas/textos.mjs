// Textos del analista (ATOSS Software, corte 2026-10-11). Citas: [A3] = fuente 3 de A.json; [D13] = fuente 13 de D.json.
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
const aqui = path.dirname(fileURLToPath(import.meta.url));
const A = JSON.parse(fs.readFileSync(path.join(aqui, 'A.json'), 'utf8'));
const B = JSON.parse(fs.readFileSync(path.join(aqui, 'B.json'), 'utf8'));
const sinBorrador = (t) => t.replace(/El borrador de reforma/g, 'El proyecto de reforma').replace(/el borrador de reforma/g, 'el proyecto de reforma').replace(/borrador/g, 'proyecto');

let R = {};
try { R = await import('./resumen.mjs'); } catch (e) { if (!/Cannot find module|ERR_MODULE_NOT_FOUND/.test(String(e))) throw e; }
export const resumen = R.resumen ?? null;

let X = {};
try { X = await import('./textos_b.mjs'); } catch (e) { if (!/Cannot find module|ERR_MODULE_NOT_FOUND/.test(String(e))) throw e; }

// Puente a 30-jun-2026 de D (deuda 0; arrendamientos 5,5; caja y activos financieros líquidos 121,3, la liquidez que publica la
// empresa; pensiones netas 0,7). El dividendo de 2,28 EUR ya se pagó el 6-may-2026.
export const limitaciones = `Precio de cierre del viernes 9-oct-2026 (87,30 EUR), porque el corte cae en domingo [D9]. Acciones: 15,906 M, sin autocartera ni instrumentos dilusivos relevantes (las RSU del Vorstand se liquidan con acciones compradas en bolsa) [A9]. Las cifras por acción de 2016-2023 están ajustadas por las dos ampliaciones gratuitas 1:1 de 2020 y 2024 [A1, A6]. ATOSS reporta un único segmento (NIIF 8): la tabla de negocio usa sus líneas de ingresos, sin resultado por línea [A1]. La cuenta se presenta por función; el EBITDA es el EBIT más las amortizaciones, la misma definición que el consenso [A1, D1]. Los pasivos de contrato (facturación anticipada de nube y mantenimiento) se incluyen en el circulante; son pequeños al cierre del año (3,3 M en 2025) porque la facturación anual se concentra en enero [A1, A9]. El último ejercicio auditado es 2025 y el último intermedio, el 1S26 (sin revisión limitada del auditor) [A9]. No hay transcripciones públicas de las conferencias; su contenido sale de notas de analistas [A13, A15]. El tamaño del mercado europeo en euros es una estimación propia a partir de proveedores privados [B6, B7, B8].`;

export const controles_explicados = X.controles_explicados ?? [];

const negocio = {
  geografias: A.negocio.geografias,
  geografias_criterio: A.negocio.geografias_criterio,
  kpis: [
    ...A.negocio.kpis,
    { kpi: 'Tasa de bajas de la nube (MRR)', valor_anterior: '2,9 % (2024)', valor_actual: '3,2 % (2025)', variacion: '+0,3 p.p.', comentario: 'Objetivo de menos del 2 % incumplido [B1].' },
  ],
};

export const parches = [
  { ruta: 'sector.regulacion', valor: sinBorrador(B.sector.regulacion) },
  { ruta: 'sector.drivers[0].evidencia', valor: sinBorrador(B.sector.drivers[0].evidencia) },
  { ruta: 'sector.extra[3]', valor: sinBorrador(B.sector.extra[3]) },
  { ruta: 'gobierno.consejo[1].tipo', valor: 'Otro externo' },
  { ruta: 'identificacion.fundacion', valor: '1987' },
  ...(X.parches ?? []),
];

export const secciones = { negocio, ...(X.secciones ?? {}) };
export const puente = null;
export const suma_partes = X.suma_partes;
export const dcf_justificacion = X.dcf_justificacion;
export const etapa2_justificacion = X.etapa2_justificacion;
export const sostenibilidad = X.sostenibilidad;
export const dcf_lectura = X.dcf_lectura;
export const narrativas = X.narrativas;
export const escenarios_comentario = X.escenarios_comentario;
export const valoracion_comentario = X.valoracion_comentario;
export const catalizadores = X.catalizadores;
export const riesgos = X.riesgos;
export const preguntas = X.preguntas;
export const fuentes = [];
export const huecos = [];
export const huecos_resueltos = [];
