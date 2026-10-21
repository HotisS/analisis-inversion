// Parte del analista (Moncler, corte 2026-10-21). Citas con la letra de la nota: [A3] = fuente 3 de A.json.
import S from './supuestos.mjs';

let T = {};
try { T = (await import('./textos.mjs')).default; } catch (e) { console.error('textos.mjs:', e.message); T = {}; }
let R = null;
try { R = (await import('./resumen.mjs')).default; } catch (e) { console.error('resumen.mjs:', e.message); R = null; }

export default {
  meta: {
    fecha_corte: '2026-10-21', divisa: 'EUR', divisa_cotizacion: 'EUR', tipo_cambio: 1, unidades: 'millones',
    cierre_ejercicio_mes: 12, etiqueta_ejercicio: 'fin', normas_contables: 'NIIF-UE', formato_cuenta: 'funcion',
    limitaciones: T.limitaciones ?? null,
    controles_explicados: T.controles_explicados ?? [],
  },
  _parches: [...(T.parches ?? [])],
  huecos_resueltos: T.huecos_resueltos ?? [],
  ...(T.secciones ?? {}),
  dcf: {
    anios: S.anios, wacc: S.wacc, terminal: S.terminal,
    etapa2: { ...S.etapa2, justificacion: null }, mitad_de_anio: true,
    justificacion: T.dcf_justificacion ?? null,
    sostenibilidad: {
      puente_ingresos: S.puente_ingresos.map((p) => ({ ...p, comentario: T.puente_comentarios?.[p.periodo] ?? null })),
      mercado_final: S.mercado_final,
      veredicto: T.veredicto ?? 'Sí',
      justificacion: T.sostenibilidad_justificacion ?? null,
    },
    lectura: T.dcf_lectura ?? null,
    confianza: 'Baja',
  },
  escenarios: { casos: S.casos.map((c) => ({ ...c, narrativa: T.narrativas?.[c.escenario] ?? null })), comentario: T.escenarios_comentario ?? null, confianza: 'Baja' },
  suma_partes: { aplica: false, descuento_holding_pct: 0, partes: [], comentario: T.suma_partes_comentario ?? null, confianza: 'Baja' },
  valoracion: {
    // Caja neta sin arrendamientos de jun-26 (después del dividendo de mayo) y arrendamientos de dic-25 (el de jun-26 no se pudo leer).
    puente: { fecha: '2026-06-30', deuda_financiera: 0, arrendamientos: 1109.1, caja: 1112.4, minoritarios: 0, pensiones: 0, asociadas: 0, otros_ajustes: 0 },
    rab: null,
    referencia_mercado: { mercado: 'S&P 500, prima implícita de Damodaran (válida para mercados desarrollados)', prima_implicita_pct: 4.2, fecha: '2026-10', fuente: 'Damodaran, ERPbymonth.xlsx, columna «ERP (T12m with sustainable payout)» [D13]' },
    pesos: S.pesos,
    objetivo_12m: {
      ejercicio: '2028e',
      casos: [
        { escenario: 'Bajista', metrica: 'PER 2028e', beneficio_por_accion: 2.27, multiplo: null, precio: null, justificacion: 'Ventas de 3.389 M en 2028e (+2 % en 2027 y +3 % en 2028: Europa sin turistas y China que vuelve a frenar) con un margen EBITDA del 37,3 %: EBIT de 898 M, 35 M de coste financiero neto (intereses de los arrendamientos menos los de la caja), impuesto del 28,5 % y 272 M de acciones.' },
        { escenario: 'Base', metrica: 'PER 2028e', beneficio_por_accion: 2.69, multiplo: null, precio: null, justificacion: 'Ventas de 3.590 M (+3 % en 2026 con la divisa en contra, +5 % y +6 %) y margen EBITDA del 40,3 %, el de 2024-25 con algo de apalancamiento operativo: EBIT de 1.059 M (29,5 %), 35 M de coste financiero neto, impuesto del 28,5 % y 272 M de acciones sin recompras.' },
        { escenario: 'Alcista', metrica: 'PER 2028e', beneficio_por_accion: 2.95, multiplo: null, precio: null, justificacion: 'Ventas de 3.728 M (+7 % y +8 % con Asia y Stone Island acelerando y Europa recuperando turismo) y margen EBITDA del 41,8 %, el EBIT del 31 % de 2022-23: 1.156 M de EBIT.' },
      ],
      per_historico: { actual: 17.3, mediana_5a: 22.9, minimo_5a: 21.6, media_larga: 23.0, excluidos: '2021 (PER de 42x: precio de 64,02 EUR en plena euforia de la reapertura y BPA con solo nueve meses de Stone Island) y 2020 (BPA hundido por la pandemia). PER de cierre sobre el BPA diluido publicado: 2022 22,1x (49,50 ÷ 2,24); 2023 24,6x (55,70 ÷ 2,26); 2024 21,6x (50,98 ÷ 2,36); 2025 23,7x (54,72 ÷ 2,31) [D1, D9, A6]. La media larga se limita a 2022-2025 porque el BPA de 2018-2019 no se pudo comprobar. Actual = 43,44 ÷ 2,51 (nuestro BPA de 2027e).' },
      comparables_per: { mediana: 24.5 },
      consenso: { bpa_ano1: 2.39, bpa_ano2: 2.60, objetivo_medio: 61.37, objetivo_min: 49, objetivo_max: 70, analistas: 25, tendencia_3m: 'estables', fuente: 'Investing.com y MarketScreener [D2, D3]' },
      diferencia_consenso: T.diferencia_consenso ?? null,
      media: null,
      comentario: T.objetivo12m_comentario ?? null,
    },
    comentario: T.valoracion_comentario ?? null,
    confianza: 'Baja',
  },
  resumen: R,
  rentabilidad: { comentario: T.rentabilidad_comentario ?? null, confianza: 'Baja' },
  catalizadores: T.secciones?.catalizadores ?? null,
  riesgos: T.secciones?.riesgos ?? null,
  preguntas: T.secciones?.preguntas ?? null,
  fuentes: T.fuentes ?? [],
  huecos: T.huecos ?? [],
};
