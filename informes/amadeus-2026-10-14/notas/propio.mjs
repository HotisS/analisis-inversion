// Parte del analista (Amadeus, corte 2026-10-14). Citas con la letra de la nota: [A3] = fuente 3 de A.json; [P1] = fuente 1 de aquí.
import S from './supuestos.mjs';
import { tabla } from './bpa.mjs';

let T = {};
try { T = (await import('./textos.mjs')).default; } catch (e) { console.error('textos.mjs:', e.message); T = {}; }
let R = null;
try { R = (await import('./resumen.mjs')).default; } catch (e) { console.error('resumen.mjs:', e.message); R = null; }

const b = (n) => tabla[n]['2028e'];

export default {
  meta: {
    fecha_corte: '2026-10-14', divisa: 'EUR', divisa_cotizacion: 'EUR', tipo_cambio: 1, unidades: 'millones',
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
      veredicto: T.veredicto ?? 'En parte',
      justificacion: T.sostenibilidad_justificacion ?? null,
    },
    lectura: T.dcf_lectura ?? null,
    confianza: 'Baja',
  },
  escenarios: { casos: S.casos.map((c) => ({ ...c, perfil: [], narrativa: T.narrativas?.[c.escenario] ?? null })), comentario: T.escenarios_comentario ?? null, confianza: 'Baja' },
  suma_partes: { aplica: false, descuento_holding_pct: 0, partes: [], comentario: T.suma_partes_comentario ?? null, confianza: 'Baja' },
  valoracion: {
    // Deuda financiera neta de junio de 2026 (sin arrendamientos, que no se localizaron) en «deuda_financiera», con caja 0.
    // otros_ajustes: dividendo complementario de 1,01 €/acción (436,2 M) pagado el 3-jul-2026, después del balance.
    puente: { fecha: '2026-06-30', deuda_financiera: 2577.5, arrendamientos: 0, caja: 0, minoritarios: 0, pensiones: 0, asociadas: 0, otros_ajustes: 436.2 },
    rab: null,
    referencia_mercado: { mercado: 'S&P 500 (prima implícita de Damodaran, T12m with sustainable payout)', prima_implicita_pct: 4.2, fecha: '2026-10', fuente: 'Damodaran, ERPbymonth [D11]' },
    pesos: S.pesos,
    objetivo_12m: {
      ejercicio: '2028e',
      casos: [
        { escenario: 'Bajista', metrica: 'PER', beneficio_por_accion: b('Bajista').bpa, multiplo: null, precio: null, justificacion: T.o12?.Bajista ?? null },
        { escenario: 'Base', metrica: 'PER', beneficio_por_accion: b('Base').bpa, multiplo: null, precio: null, justificacion: T.o12?.Base ?? null },
        { escenario: 'Alcista', metrica: 'PER', beneficio_por_accion: b('Alcista').bpa, multiplo: null, precio: null, justificacion: T.o12?.Alcista ?? null },
      ],
      per_historico: { actual: +(52.68 / tabla.Base['2027e'].bpa).toFixed(1), mediana_5a: 20.9, minimo_5a: 19.4, media_larga: 20.9, excluidos: 'Solo hay dos cierres de ejercicio fiables (estimados desde rentabilidades publicadas): 2024 ≈67,50 € ÷ BPA ajustado ≈3,02 € (estimación: 1.347,9 M de beneficio ajustado ÷ ≈446 M de acciones diluidas) = 22,4x, y 2025 ≈62,67 € ÷ 3,23 € = 19,4x [D8, D7, A3, A5]. 2020-2022 se excluirían (pérdidas en 2020-2021 y beneficio deprimido por la pandemia en 2022, BPA ajustado de 1,56 €) y 2023 no tiene cierre fiable en este entorno. Base: BPA ajustado diluido (sin amortización de intangibles de compras), la misma que los escenarios. Actual = 52,68 € ÷ nuestro BPA ajustado de 2027e.' },
      comparables_per: { mediana: 15.5 },
      consenso: { bpa_ano1: 3.46, bpa_ano2: 3.88, objetivo_medio: 67.20, objetivo_min: 50.00, objetivo_max: 80.90, analistas: 22, tendencia_3m: 'recortes', fuente: 'Yahoo Finance (BPA, 19 analistas) y MarketScreener (objetivos, 22 analistas, 10-jul) [D3, D4]' },
      diferencia_consenso: T.diferencia_consenso ?? null,
      media: null,
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
