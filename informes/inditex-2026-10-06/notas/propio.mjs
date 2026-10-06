// Supuestos, textos y resumen del analista. Citas con prefijos: [A3] = fuente 3 de A.json, [B5], [C2], [D1]; [P1] = fuente propia.
import { textos as T } from './textos.mjs';

export const propio = {
  fuentes: T.fuentes_propias || [],
  ensamblar(N) {
    const { A, B, C, D } = N;
    const d = {};
    const { huecos_propios, ...metaT } = T.meta;
    d.meta = { ...metaT, huecos: [...(A.huecos || []), ...(B.huecos || []), ...(C.huecos || []), ...(D.huecos || []), ...(huecos_propios || [])].filter((h) => !(T.huecos_descartar || []).includes(h.campo)) };
    d.identificacion = { ...D.identificacion, ...(T.identificacion || {}) };
    d.resumen = T.resumen;
    d.historia = { ...B.historia, ...(T.historia || {}) };
    d.negocio = { ...B.negocio, ...A.negocio, ...(T.negocio || {}) };
    d.sector = { ...B.sector, ...(T.sector || {}) };
    d.competencia = { ...B.competencia, ...(T.competencia || {}) };
    d.financieros = { ...A.financieros, ...(T.financieros || {}) };
    d.trimestres = { ...A.trimestres, ...(T.trimestres || {}) };
    d.balance = { ...A.balance, ...(T.balance || {}) };
    d.flujos = { ...A.flujos, ...(T.flujos || {}) };
    d.calidad = { ...A.calidad, ...(T.calidad || {}) };
    d.rentabilidad = T.rentabilidad;
    d.capital = { ...A.capital, ...(T.capital || {}) };
    d.directivos = { ...C.directivos, ...(T.directivos || {}) };
    d.gobierno = { ...C.gobierno, ...(T.gobierno || {}) };
    d.consenso = { ...D.consenso, ...(T.consenso || {}) };
    d.bolsa = { ...D.bolsa, ...(T.bolsa || {}) };
    d.multiplos_historicos = { ...D.multiplos_historicos, ...(T.multiplos_historicos || {}) };
    d.comparables = { ...D.comparables, ...(T.comparables || {}) };
    d.transacciones = D.transacciones === null ? null : { ...D.transacciones, ...(T.transacciones || {}) };
    d.dcf = T.dcf;
    d.escenarios = T.escenarios;
    d.suma_partes = T.suma_partes;
    d.valoracion = T.valoracion;
    d.catalizadores = T.catalizadores;
    d.riesgos = T.riesgos;
    d.esg = { ...B.esg, ...(T.esg || {}) };
    d.preguntas = T.preguntas;
    for (const k of Object.keys(d)) if (d[k] && typeof d[k] === 'object') { delete d[k].extra; delete d[k].notas; delete d[k].politica_hechos; }
    return d;
  },
};
