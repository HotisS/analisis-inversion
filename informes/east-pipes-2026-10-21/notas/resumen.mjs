// Resumen y comentario del objetivo a 12 meses de East Pipes (corte 2026-10-21). Las cifras del motor se leen del último cálculo
// guardado en ../datos.json (calc); se calcula dos veces para que cuadren.
import fs from 'node:fs';
import * as O from './objetivo.mjs';

let c = null;
try { c = JSON.parse(fs.readFileSync(new URL('../datos.json', import.meta.url), 'utf8')).calc ?? null; } catch { c = null; }

const es = (x, d = 2) => (x === null || x === undefined ? 'n.d.' : (+x).toLocaleString('es-ES', { minimumFractionDigits: d, maximumFractionDigits: d }));
const pc = (x, d = 1) => `${x > 0 ? '+' : ''}${es(x, d)} %`;

let R = { resumen: null, objetivo_extra: {} };
if (c?.recomendacion?.objetivo_12m) {
  const P = c.mercado.precio;
  const r = c.recomendacion, o = r.objetivo_12m;
  const f = Object.fromEntries(o.filas.map((x) => [x.escenario, x]));
  const dcf = c.dcf, inv = dcf.inverso;
  const esc = Object.fromEntries(c.escenarios.map((x) => [x.escenario, x]));
  const roic = c.rentabilidad.at(-1).roic_pct, wacc = dcf.wacc;
  const vi = c.sintesis.valor_objetivo, viPot = c.sintesis.potencial_pct;
  const reco = r.regla;

  const comentario = `El objetivo a 12 meses es de ${es(o.objetivo_ponderado)} SAR ponderado y ${es(o.objetivo_base)} SAR en el base, frente a ${es(P)} SAR: rentabilidad con dividendo del ${pc(o.rentabilidad_ponderada_pct)} ponderada y del ${pc(o.rentabilidad_base_pct)} en el base. El base aplica ${es(f.Base.per, 1)} veces (a mitad de camino entre el PER actual de ${es(O.actual, 1)}x y la mediana adelantada de ${es(O.mediana, 1)}x) a nuestro BPA de FY2029e (${es(O.bpa.Base)}), que queda por debajo del de FY2026 (18,20) porque el margen vuelve hacia la mitad del ciclo. El bajista pesa mucho (${es(f.Bajista.precio)} SAR): PER mínimo de su corta historia (6,0x, FY2023) sobre un beneficio de margen del 17 %. Es duro, pero es lo que pagó el mercado la última vez que dudó del ciclo. La v2 de control da ${pc(o.v2?.rentabilidad_ponderada_pct)}: tampoco llega a comprar.`;

  const sintesis = `**La recomendación y por qué.** ${reco}, con convicción baja. El objetivo a 12 meses es de ${es(o.objetivo_ponderado)} SAR ponderado y ${es(o.objetivo_base)} SAR en el base, frente a un precio de ${es(P)} SAR (cierre del 21-oct-2026): rentabilidad con dividendo del ${pc(o.rentabilidad_ponderada_pct)} ponderada y del ${pc(o.rentabilidad_base_pct)} en el base. El valor intrínseco es de ${es(vi)} SAR (${pc(viPot)}). La convicción es baja porque las reglas discrepan: frente a su coste de capital sería Vender; frente a lo que pide el mercado (prima del 4,2 %), Mantener. Compraríamos por debajo de ${es(r.comprar_por_debajo)} SAR.

**El negocio.** East Pipes fabrica tubo de acero soldado en espiral de gran diámetro (HSAW) en Dammam para conducciones de agua desalada y de gas; vende casi todo a dos clientes públicos, Aramco y la Agencia del Agua [A1, B1]. Su ROIC del ${es(roic, 1)} % en FY2026 frente a un WACC del ${es(wacc)} % es de cima de ciclo: en FY2022 era del 1,5 %. La sostenibilidad del crecimiento es «Sí»: proyectamos un crecimiento casi plano (1,1 % anual) que la planta de 500.000 t cubre sin inversión nueva y con una cuota final por debajo de la de hoy.

**Sector y ciclo.** Parte alta de un ciclo de inversión en agua y gas: ventas de 597 M SAR en FY2022 a 2.298 M en FY2026 y margen EBITDA del 6,5 % al 27,9 % [A1]. El 2T27 (ventas −39,6 %) muestra el riesgo logístico de la bobina importada; los contratos de Aramco de septiembre (837 M con IVA) sostienen la segunda mitad [A7, A8]. Los pedidos récord de 2024-2026 parecen un pico: no hay cartera publicada desde 2022.

**Finanzas.** Sin deuda y con 995 M SAR de caja (el 18 % de la capitalización) a 30-sep-2026; el flujo operativo de FY2026 fue de 973 M por la liberación del circulante [A1, A7]. Cuentas de EY sin salvedades; el riesgo está en los cobros (dos clientes, 96 %).

**Equipo y gobierno.** Welspun Corp (India) controla el 26,5 % y preside el consejo; le vendió tubo por 112 M SAR en FY2026 [C1, C3]. El primer ejecutivo es interino desde 2025 y es también el director financiero.

**Valoración.** DCF de ${es(dcf.valor_accion)} SAR (WACC ${es(wacc)} %, crecimiento terminal 3 %). El precio descuenta un margen EBITDA terminal del ${es(inv.margen_implicito_pct, 1)} % (nosotros, 20,5 %) o un crecimiento anual del ${es(inv.crecimiento_implicito_pct, 1)} %. Escenarios: ${es(esc.Bajista.valor)} / ${es(esc.Base.valor)} / ${es(esc.Alcista.valor)} SAR; asimetría de ${es(r.asimetria)}x. Los comparables (${es(c.sintesis.tabla.find((x) => x.metodo.startsWith('Comparables'))?.valor)} SAR) usan el consenso anterior al 2T27; los analistas apuntan a 228,67 SAR de media [D2].

**Riesgos y catalizadores.** El riesgo dominante es el fin del ciclo de licitación con precios a la baja (bajista de ${es(esc.Bajista.valor)} SAR); le siguen la logística de la bobina, la competencia de Arabian Pipes, Saudi Steel Pipe y la importación india, y el conflicto de interés con Welspun. Catalizadores: el 3T27 (≈ 1-feb-2027) y nuevos contratos anunciados. Regla 13: la caída del 18,6 % del último mes la explica el 2T27; no cambia. Riesgo de la IA: bajo.

**Qué cambiaría la decisión.** Compraríamos por debajo de ${es(r.comprar_por_debajo)} SAR y venderíamos por encima de ${es(r.vender_por_encima)} SAR. Mejoraría la tesis un margen bruto por encima del 26 % con contratos nuevos de más de 1.500 M SAR al año; la empeoraría un margen bruto por debajo del 22 % dos trimestres seguidos.`;

  R = {
    objetivo_extra: { media: null, comentario },
    resumen: {
      recomendacion: reco, conviccion: 'Baja', justificacion_recomendacion: null, horizonte: '12 meses',
      sintesis,
      tesis: `East Pipes es el mayor fabricante saudí de tubo de acero soldado en espiral para agua y gas (≈ 24 % del mercado del Reino), sin deuda y con el mejor margen del sector [A1, B1, B3]. El ciclo de inversión de Aramco y de la Agencia del Agua cuadruplicó sus ventas en FY2022-FY2026 y llevó el margen EBITDA del 6,5 % al 27,9 %.\n\nEl precio (${es(P)} SAR) ha caído un 24 % desde julio, pero aún descuenta un margen del ${es(inv.margen_implicito_pct, 1)} % para siempre. El valor intrínseco es de ${es(vi)} SAR y el objetivo a 12 meses de ${es(o.objetivo_ponderado)} SAR: no hay margen de seguridad.`,
      vision_diferencial: {
        mercado_descuenta: `Que el margen de la cima (26 % según el consenso en FY2027e-FY2029e) se mantiene y que el 2T27 es un bache logístico: el precio pide un margen terminal del ${es(inv.margen_implicito_pct, 1)} % con nuestro WACC [D2].`,
        nuestra_vision: 'El volumen tiene apoyo (contratos de Aramco hasta el 1T FY2028), pero el margen es de ciclo y volverá hacia el 20-21 % cuando la licitación se frene y Arabian Pipes y Saudi Steel Pipe pujen para llenar sus plantas.',
        por_que: 'La historia propia (margen del 6,5 % en FY2022 y del 11,2 % en FY2023), el margen de los competidores (Arabian Pipes 15 %, Saudi Steel Pipe 26 %) y la ausencia de cartera publicada [A1, B3].',
      },
      a_favor: [
        '**Líder del tubo HSAW de gran diámetro en el Reino**, con contenido local que puntúa en las licitaciones [B1].',
        '**Sin deuda y 995 M SAR de caja** (≈ 32 SAR por acción) a 30-sep-2026 [A7].',
        '**Contratos de Aramco por 837 M SAR** firmados en septiembre de 2026 [A7].',
        '**ROIC del 52,8 %** y margen operativo que dobla al de Saudi Steel Pipe [A1, B3].',
        '**Dividendo creciente**: 6 SAR en FY2026 (3,5 %) [A1].',
      ],
      en_contra: [
        '**Margen de cima de ciclo**: 6,5 % en FY2022, 27,9 % en FY2026 [A1].',
        '**2T27 con ventas −39,6 %** por la bobina retrasada [A8].',
        '**Dos clientes públicos** concentran casi todo el cobro [A1].',
        '**Conflicto de interés con Welspun**, accionista de control y competidor [C3].',
        '**Primer ejecutivo interino** desde 2025 [C1].',
      ],
      que_vigilar: 'La tesis depende del margen y de los pedidos. La señal está en el margen bruto trimestral y en los contratos anunciados a Tadawul: si el margen bruto baja del 22 % dos trimestres seguidos y los contratos no llegan a 1.500 M en doce meses, el ciclo ha girado; si el margen se mantiene por encima del 26 % con contratos nuevos, nos equivocamos con el ciclo.',
      cambiaria_recomendacion: [
        `Precio por debajo de ${es(r.comprar_por_debajo)} SAR: pasaría a Comprar (ponderada a 12 meses ≥ 15 %).`,
        `Precio por encima de ${es(r.vender_por_encima)} SAR: pasaría a Vender (ponderada ≤ −10 %).`,
        'Margen bruto trimestral por debajo del 22 % dos trimestres seguidos: bajaríamos el caso base.',
        'Contratos nuevos de más de 1.500 M SAR en doce meses con margen bruto por encima del 26 %: subiríamos el base.',
      ],
      kpis_seguimiento: [
        { kpi: 'Margen bruto trimestral', nivel_actual: '24,6 % (2T27); 26,3 % en el 1T27', umbral_alerta: '< 22 %', por_que: 'Precio por tonelada frente al coste de la bobina.' },
        { kpi: 'Contratos anunciados', nivel_actual: '837 M SAR con IVA (sep-2026)', umbral_alerta: '< 1.500 M en 12 meses', por_que: 'Ventas futuras: no hay cartera publicada.' },
        { kpi: 'Ventas trimestrales', nivel_actual: '344,8 M SAR (2T27)', umbral_alerta: '< 400 M en el 3T27', por_que: 'Si la logística no se normaliza, FY2027e es peor.' },
        { kpi: 'Días de cobro', nivel_actual: '101 días (FY2026)', umbral_alerta: '> 150 días', por_que: 'Dos clientes públicos; riesgo de plazo.' },
        { kpi: 'Caja', nivel_actual: '995,2 M SAR (sep-2026)', umbral_alerta: '< 600 M sin dividendo extraordinario', por_que: 'El circulante absorbe caja al crecer.' },
      ],
      confianza: 'Media',
    },
  };
}
export default R;
