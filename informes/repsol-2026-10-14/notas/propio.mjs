// Parte del analista (Repsol, corte 2026-10-14). Citas con la letra de la nota: [A3] = fuente 3 de A.json; [P1] = fuente propia.
import S from './supuestos.mjs';

let T = {};
try { T = (await import('./textos.mjs')).default; } catch (e) { console.error('textos.mjs:', e.message); T = {}; }
let R = null;
try { R = (await import('./resumen.mjs')).default; } catch (e) { console.error('resumen.mjs:', e.message); R = null; }

export default {
  meta: {
    fecha_corte: '2026-10-14', divisa: 'EUR', divisa_cotizacion: 'EUR', tipo_cambio: 1, unidades: 'millones',
    cierre_ejercicio_mes: 12, etiqueta_ejercicio: 'fin', normas_contables: 'NIIF-UE', formato_cuenta: 'naturaleza',
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
    // Deuda neta del grupo a 30-jun-26 (modelo nuevo de Repsol, incluye arrendamientos y ya resta la caja) y minoritarios a valor
    // contable del último dato hallado (2023).
    puente: { fecha: '2026-06-30', deuda_financiera: 3667, arrendamientos: 0, caja: 0, minoritarios: 3180, pensiones: 0, asociadas: 0, otros_ajustes: 0 },
    rab: null,
    referencia_mercado: { mercado: 'S&P 500 (prima implícita de Damodaran, T12m with sustainable payout)', prima_implicita_pct: 4.2, fecha: '2026-10', fuente: 'Damodaran, ERPbymonth [D25]' },
    pesos: S.pesos,
    objetivo_12m: {
      ejercicio: '2028e',
      casos: [
        { escenario: 'Bajista', metrica: 'EV/EBITDA 2028e', beneficio_por_accion: 2.04, multiplo: 3.1, precio: 13.48, justificacion: 'Brent de vuelta a 60-65 USD y refino en la media: ventas de 58.084 M y margen del 12,1 % (EBITDA 7.028 M). A 3,1 veces, la mediana de 2021-25 sin 2022: valor empresa de 21.787 M − 7.347 M de deuda neta, minoritarios y recompra pendiente ÷ 1.071 M de acciones. BPA de 2,04 EUR (EBIT 3.950 M, 300 M de intereses, 36 % de impuestos, 150 M de minoritarios).' },
        { escenario: 'Base', metrica: 'EV/EBITDA 2028e', beneficio_por_accion: 2.69, multiplo: 4.0, precio: 23.94, justificacion: 'Brent hacia 70-75 USD, margen de refino algo por encima de 2025 y producción de 580.000 barriles diarios: ventas de 60.640 M y margen del 13,6 % (EBITDA 8.247 M). A 4,0 veces, entre su 3,5 de 2021 y 2025 y los 4,0-4,4 de Eni y TotalEnergies: 32.988 M − 7.347 M ÷ 1.071 M de acciones. BPA de 2,69 EUR (EBIT 5.033 M).' },
        { escenario: 'Alcista', metrica: 'EV/EBITDA 2028e', beneficio_por_accion: 3.27, multiplo: 4.5, precio: 32.47, justificacion: 'Prima de riesgo geopolítico duradera (Brent de 85 USD) y refino fuerte hasta 2028: ventas de 63.252 M y margen del 14,8 % (EBITDA 9.361 M). A 4,5 veces, el múltiplo de TotalEnergies con algo de prima (techo de base × 1,30 = 5,2): 42.125 M − 7.347 M ÷ 1.071 M. BPA de 3,27 EUR.' },
      ],
      per_historico: { actual: 10.0, mediana_5a: 5.7, minimo_5a: 4.3, media_larga: 5.7, excluidos: 'PER con el BPA ajustado (sin inventarios ni extraordinarios) al cierre de cada año: 2023 3,5x (13,45 ÷ 3,89) y 2024 4,3x (11,67 ÷ 2,71); 2025 7,0x (15,97 ÷ 2,27). Se excluyen 2022 (3,1x) y 2023 por BPA de pico de la guerra de Ucrania, 2020 por pérdidas y 2021 por falta del ajustado. Actual = 29,62 ÷ 2,96 (nuestro BPA de 2027e). Con tan pocos años limpios y el ciclo dentro del BPA, el PER no sirve: los tres casos van por EV/EBITDA.' },
      comparables_per: { mediana: 9.8 },
      consenso: { bpa_ano1: 3.65, bpa_ano2: 3.07, objetivo_medio: 28.51, objetivo_min: null, objetivo_max: 38.0, analistas: 27, tendencia_3m: 'subidas', fuente: 'MarketScreener, DailyForex y Merca2 [D5, D6, D11]' },
      diferencia_consenso: T.diferencia_consenso ?? null,
      media: 23.3,
      comentario: T.objetivo12m_comentario ?? null,
    },
    comentario: T.valoracion_comentario ?? null,
    confianza: 'Baja',
  },
  resumen: R,
  rentabilidad: { comentario: T.rentabilidad_comentario ?? null, confianza: 'Baja' },
  catalizadores: T.catalizadores ?? null,
  riesgos: T.riesgos ?? null,
  preguntas: T.preguntas ?? null,
  fuentes: T.fuentes ?? [],
  huecos: T.huecos ?? [],
};
