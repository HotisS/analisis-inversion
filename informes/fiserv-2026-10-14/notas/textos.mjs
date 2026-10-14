// Textos del analista principal (Fiserv, corte 2026-10-14). Citas con la letra de la nota.
let X = {};
let R = null;
try { R = (await import('./resumen.mjs')).default; } catch (e) { console.error('resumen.mjs:', e.message); }
try { X = (await import('./textos2.mjs')).default; } catch (e) { X = {}; }

export default {
  ...X,
  resumen: R,
  objetivo_12m: {
    ejercicio: '2028e',
    casos: [
      { escenario: 'Bajista', metrica: 'PER 2028e', beneficio_por_accion: 6.55, multiplo: null, precio: null,
        justificacion: 'Financial Solutions sigue perdiendo bancos y precio, Clover se frena a un dígito y la revisión de cartera no vende nada: ingresos de 20.351 M en 2028e (plano desde 2026e) y margen EBITDA del 37,0 %. EBIT ajustado de 5.902 M, intereses de 1.500 M y tipo del 21,5 %.' },
      { escenario: 'Base', metrica: 'PER 2028e', beneficio_por_accion: 7.79, multiplo: null, precio: null,
        justificacion: 'Recuperación lenta: +1,5 % en 2027e y +2,5 % en 2028e (por debajo del 4-6 % que promete la empresa) y margen del 39,5 %. EBIT ajustado de 6.737 M − 1.500 M de intereses, tipo del 21,5 % y 527,6 M de acciones sin recompras nuevas.' },
      { escenario: 'Alcista', metrica: 'PER 2028e', beneficio_por_accion: 8.58, multiplo: null, precio: null,
        justificacion: 'Se cumple a medias el plan del día del inversor: +3 % y +4 % en 2027-28e con las implantaciones retrasadas en marcha y Clover al +12-15 %, margen del 41 %. Aun así queda por debajo de la senda de la empresa (más de 12 USD en 2029).' },
    ],
    per_historico: { actual: 6.31, mediana_5a: 15.6, minimo_5a: 7.8, media_larga: 15.6,
      excluidos: 'Solo dos años en la misma base (BPA ajustado de la empresa): 2024 (205,42 ÷ 8,80 = 23,3x) y 2025 (67,17 ÷ 8,64 = 7,8x) [D4, D6]. El BPA ajustado de 2021-2023 no se pudo leer en las fuentes; el PER contable (52x-26x) no compara porque carga la amortización de First Data. No se excluye ninguno.' },
    comparables_per: { mediana: 7.95 },
    consenso: { bpa_ano1: 7.30, bpa_ano2: 9.01, objetivo_medio: 59.12, objetivo_min: 40, objetivo_max: 106, analistas: 35, tendencia_3m: 'recortes',
      fuente: 'Stock Analysis (objetivo medio y analistas) [D1], Investing (mínimo y máximo) [D13], TickFlow (BPA 2027e, anterior al recorte de agosto) [D9] y guía de 2026 [A4]' },
    diferencia_consenso: 'Nuestro BPA de 2027e (7,39 USD) queda un 18 % por debajo de los 9,01 del consenso, pero ese consenso es de junio, anterior al recorte de la guía de agosto (de 8,00-8,30 a 7,20-7,40 USD para 2026) [D9, A4]: con la base nueva, el consenso tendría que bajar un 10 % solo por el punto de partida. El resto es crecimiento: suponemos un 1,5-2,5 % frente al 4-6 % anual del plan de la empresa [D7], porque Financial Solutions cae un 6-8 % orgánico en 2026 y la dirección ha fallado dos guías seguidas. Nuestro precio base queda muy por debajo del objetivo medio de 59,12 USD porque el múltiplo de la regla es el PER actual (6,3x).',
    media: null,
    comentario: X.objetivo12m_comentario ?? null,
  },
};
