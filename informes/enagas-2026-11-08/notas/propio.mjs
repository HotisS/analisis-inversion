// Parte del analista (Enagás, corte 2026-11-08; iteración tras los 9M26 del informe del 2026-10-07).
// Citas con prefijo: [A17] = fuente 17 de A.json; [P1] = propia. Las participadas dentro del EBITDA van ahora con el
// campo `participadas_en_ebitda` de A (cuenta y LTM), no con parches: el motor las saca del EBITDA y el EBIT.
import { anios, wacc, terminal, casos, pesos } from './supuestos.mjs';
import { textos } from './textos.mjs';

export default {
  meta: {
    fecha_corte: '2026-11-08', divisa: 'EUR', divisa_cotizacion: 'EUR', tipo_cambio: 1, unidades: 'millones',
    cierre_ejercicio_mes: 12, etiqueta_ejercicio: 'fin', normas_contables: 'NIIF-UE', formato_cuenta: 'naturaleza',
    limitaciones: textos.limitaciones,
    controles_explicados: textos.controles_explicados,
  },
  consenso: { base_ebitda: 'ajustado', ajuste_ebitda_pct_ventas: 23.0 },
  ...textos.secciones,
  dcf: {
    anios, wacc, terminal, mitad_de_anio: true,
    etapa2: textos.etapa2,
    justificacion: textos.justificacion,
    sostenibilidad: textos.sostenibilidad,
    lectura: textos.lectura,
    confianza: 'Media',
  },
  escenarios: { casos: casos.map((c) => ({ ...c, narrativa: textos.narrativas[c.escenario] })), comentario: textos.escenarios_comentario, confianza: 'Media' },
  suma_partes: textos.suma_partes,
  valoracion: {
    // Balance a 30-sep-2026 (nota de 9M26) [A17]. Deuda neta publicada 2.979 = 3.156,3 + ≈ 360 de arrendamientos − 537,3.
    // Otros ajustes: Saggas por pagar 31 + opción de venta de Reganosa 86,6 − cuenta a cobrar del laudo de GSP 206,6 = −89,0.
    // Asociadas a valor estimado: 1.600 (dividendos de 2025 como renta) + Teréga 573 + Saggas 31 (precio pagado).
    puente: { fecha: '2026-09-30', deuda_financiera: 3156.3, arrendamientos: 360.0, caja: 537.3, minoritarios: 15.8, pensiones: 0, asociadas: 2204.0, otros_ajustes: -89.0 },
    rab: 2700,
    referencia_mercado: textos.referencia_mercado,
    pesos,
    objetivo_12m: textos.objetivo_12m,
    comentario: textos.valoracion_comentario,
    confianza: 'Media',
  },
  catalizadores: textos.catalizadores,
  riesgos: textos.riesgos,
  preguntas: textos.preguntas,
  resumen: textos.resumen,
  fuentes: textos.fuentes,
  huecos: textos.huecos,
  huecos_resueltos: textos.huecos_resueltos,
  _parches: textos.parches,
};
