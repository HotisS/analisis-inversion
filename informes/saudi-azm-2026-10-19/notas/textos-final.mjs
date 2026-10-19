// Textos finales del analista (Saudi Azm, corte 2026-10-19): objetivo a 12 meses, riesgos, catalizadores, preguntas y resumen.
// Cifras del motor tal cual (último cálculo); hechos con cita de la letra de la nota.
import * as O from './objetivo.mjs';
import R from './resumen.mjs';

const es = (x, d = 2) => (+x).toLocaleString('es-ES', { minimumFractionDigits: d, maximumFractionDigits: d });
const p = (e, y, k) => es(O.P[e][y][k], 1);

const objetivo_12m = {
  ejercicio: 'FY2028e',
  casos: [
    { escenario: 'Bajista', metrica: 'PER FY2028e', beneficio_por_accion: O.bpa.Bajista, multiplo: null, precio: null, justificacion: `El gasto público frena, la Administración paga tarde y la IA abarata los proyectos al renovarlos: ventas de ${p('Bajista', 'FY2027e', 'ventas')} M SAR en FY2027e (+14 %) y ${p('Bajista', 'FY2028e', 'ventas')} M en FY2028e (+10 %), margen EBITDA del 16 % (el de FY2025): EBITDA de ${p('Bajista', 'FY2028e', 'ebitda')} M, amortización de ${p('Bajista', 'FY2028e', 'amortizacion')} M, resultado financiero de +2,5 M y zakat del 6,5 %: beneficio ≈ ${p('Bajista', 'FY2028e', 'beneficio')} M sobre 58 M acciones, casi plano frente a FY2026 (51,0 M).` },
    { escenario: 'Base', metrica: 'PER FY2028e', beneficio_por_accion: O.bpa.Base, multiplo: null, precio: null, justificacion: `Ventas de ${p('Base', 'FY2028e', 'ventas')} M SAR (+22 % en FY2027e y +18 % en FY2028e) y margen EBITDA del 19 %: EBITDA de ${p('Base', 'FY2028e', 'ebitda')} M, amortización de ${p('Base', 'FY2028e', 'amortizacion')} M (3 %, con las plataformas capitalizadas), EBIT de ${p('Base', 'FY2028e', 'ebit')} M, resultado financiero de +2,5 M (menos caja tras la recompra) y zakat del 6,5 %: beneficio ≈ ${p('Base', 'FY2028e', 'beneficio')} M. FY2027e da ${p('Base', 'FY2027e', 'beneficio')} M (+21 %), por debajo del +40 % que guía la dirección. Cuadra con FY2026: EBIT 48,0 M + 5,3 M de resultado financiero − 3,3 M de zakat + 1,0 M de minoritarios = 51,0 M [A9].` },
    { escenario: 'Alcista', metrica: 'PER FY2028e', beneficio_por_accion: O.bpa.Alcista, multiplo: null, precio: null, justificacion: `Colaboración público-privada, Elm y Wasl tiran: ventas de ${p('Alcista', 'FY2028e', 'ventas')} M SAR (+27 % y +23 %) con margen EBITDA del 20,5 % (cerca del 4T26): beneficio ≈ ${p('Alcista', 'FY2028e', 'beneficio')} M, en línea con el +40 % de la dirección en FY2027e.` },
  ],
  per_historico: {
    base: 'adelantado', anios: 5, actual: O.actual, mediana_5a: O.mediana, minimo_5a: O.minimo, media_larga: O.media,
    excluidos: `Historia adelantada (cierre de cada ejercicio, 30-jun, ÷ BPA real del ejercicio siguiente; BPA tras el desdoblamiento de 2023): FY2022 8,00 ÷ 0,39 = ${es(O.perAdel[0][1])}; FY2023 11,50 ÷ 0,47 = ${es(O.perAdel[1][1])}; FY2024 17,50 ÷ 0,62 = ${es(O.perAdel[2][1])}; FY2025 32,00 ÷ 0,85 = ${es(O.perAdel[3][1])}; FY2026 21,42 ÷ ${es(O.bpa2027)} (nuestro FY2027e) = ${es(O.perAdel[4][1])}. Sin exclusiones (FY2022 cotizaba en Nomu, con poca liquidez, pero no hay pérdidas ni extraordinarios que lo deformen) [D1]. Mediana ${es(O.mediana)}, mínimo ${es(O.minimo)} y media ${es(O.media)}. PER actual: ${es(O.precio)} ÷ ${es(O.bpaNtm)} (BPA de los próximos 12 meses: 8,4/12 de FY2027e ${es(O.bpa2027)} + 3,6/12 de FY2028e ${es(O.bpa2028)}) = ${es(O.actual)}.`,
    v2: { mediana_5a: O.v2.mediana, minimo_5a: O.v2.minimo, media_larga: O.v2.media, excluidos: `Al cierre (cierre ÷ BPA del mismo ejercicio): ${O.perCierre.map(([a, x]) => `${a} ${es(x, 1)}`).join('; ')}.` },
  },
  comparables_per: { mediana: O.compPer },
  consenso: { bpa_ano1: null, bpa_ano2: null, objetivo_medio: null, objetivo_min: null, objetivo_max: null, analistas: 1, tendencia_3m: 'Al alza', fuente: 'GIB Capital (sobreponderar; objetivo de pago) [D10]' },
  diferencia_consenso: `No hay BPA de consenso publicado. La referencia es la guía de la dirección: +40 % de beneficio en FY2027e (≈ 71 M, ≈ 1,23 SAR por acción) [D9]. Nuestro FY2027e (${es(O.bpa2027)}, ${p('Base', 'FY2027e', 'beneficio')} M, +21 %) queda un 13 % por debajo porque (1) la recompra de ≈ 106 M recorta los ingresos financieros, (2) empiezan a amortizarse las plataformas capitalizadas y (3) no damos por hecho que el margen del 4T26 (≈ 21 %) se repita todo el año. El alcista recoge la guía.`,
  media: null,
  comentario: null,
};

const riesgos = {
  items: [
    { riesgo: 'IA generativa y agentes de programación: abaratan el desarrollo a medida, las pruebas y la consultoría, que son ≈ 60 % de las ventas', tipo: 'Tecnológico', probabilidad: 'Alta', impacto: 'Alto', efecto_valor: '−15 % a −25 % si las horas por proyecto caen un 30 % y la Administración traslada el ahorro al precio', mitigante: 'Azm puede usar la IA para producir más barato y quedarse parte del ahorro; la operación de plataformas y la integración con sistemas públicos (datos en el país) son menos sustituibles [B4, B1].', senal: 'Margen bruto por debajo del 28 % o ventas de servicios a empresas planas dos trimestres' },
    { riesgo: 'Dependencia del gasto público saudí: 75 % de las ventas a ministerios y semipúblicas; pagos por hitos', tipo: 'Cliente', probabilidad: 'Media', impacto: 'Alto', efecto_valor: '−20 % a −30 % con un recorte presupuestario (petróleo < 60 USD) o retrasos de cobro', mitigante: 'Digitalización prioritaria en la Visión 2030; caja neta de ≈ 120 M para aguantar retrasos [B1, A10].', senal: 'Activos de contrato por encima del 30 % de las ventas; flujo operativo negativo en un semestre' },
    { riesgo: 'Partes vinculadas: la mitad del trabajo la ejecutan empresas de los fundadores; compra de AZM FinTech sin precio; contratos marco de 191,6 M', tipo: 'Gobierno', probabilidad: 'Media', impacto: 'Alto', efecto_valor: '−10 % a −20 % si la compra se paga cara o con acciones nuevas', mitigante: 'Operaciones aprobadas en junta sin el voto de los interesados; asesor financiero externo (Alistithmar Capital) [C3, C4].', senal: 'Precio de AZM FinTech por encima de 15 veces su beneficio o pago en acciones' },
    { riesgo: 'Competencia de las grandes estatales (Elm, solutions by stc) que se quedan los contratos y subcontratan', tipo: 'Competencia', probabilidad: 'Media', impacto: 'Medio', efecto_valor: '−10 %', mitigante: 'Alianza con Elm con reparto de ingresos (sep-2026) [B5].', senal: 'Peso de los proyectos con Elm por encima del 20 % de las ventas con menos margen' },
    { riesgo: 'Calidad del beneficio: capitalización de desarrollo (29,1 M en FY2026) y pagos en acciones (16,6 M) financiados con recompras', tipo: 'Financiero', probabilidad: 'Media', impacto: 'Medio', efecto_valor: '−5 % a −10 %', mitigante: 'El gasto en acciones ya está en el EBIT; la amortización ya está en nuestro DCF [A9, A10].', senal: 'Intangibles por encima del 15 % de las ventas o deterioros' },
    { riesgo: 'Liquidez y tamaño: ≈ 1,4 M USD al día, 470 M USD de capitalización, horquillas amplias', tipo: 'Mercado', probabilidad: 'Media', impacto: 'Bajo', efecto_valor: '−5 % de coste de entrada y salida en mercados nerviosos', mitigante: 'Suficiente para posiciones de 1.000-5.000 EUR con orden limitada desde IBKR [D2, D11].', senal: 'Volumen medio por debajo de 2 M SAR al día' },
    { riesgo: 'Información: cuentas de FY2026 de fuente secundaria; intermedios escaneados', tipo: 'Gobierno', probabilidad: 'Baja', impacto: 'Bajo', efecto_valor: '±5 %', mitigante: 'La cuenta de FY2026 cuadra entre el anuncio a Tadawul y Yahoo [A8, A9].', senal: 'Diferencias al publicarse las cuentas auditadas de FY2026' },
  ],
  premortem: 'Octubre de 2028: Saudi Azm vale la mitad. Lo que pasó: con el petróleo a 55 USD, el Ministerio de Finanzas recortó y aplazó proyectos digitales; los ministerios pagaron con seis meses de retraso y los activos de contrato volvieron al 40 % de las ventas, como en 2024. A la vez, los agentes de IA dejaron un proyecto de portal en la mitad de horas y las licitaciones de renovación salieron un 30 % más baratas. Azm compró AZM FinTech a sus fundadores pagando con acciones nuevas a un múltiplo alto, y los minoritarios vieron que la mitad del margen se quedaba en empresas hermanas. El beneficio se estancó en ≈ 50 M y el mercado, que pagaba 27 veces, pagó 15. La señal que nadie quiso leer: la mitad de las ventas subcontratada a vinculadas y un PER muy por encima del de Elm.',
  ia: {
    exposicion: 'Alta', sentido: 'Amenaza', efecto_valor: '−15 % a −25 %',
    comentario: 'Es un integrador que vende horas de desarrollo, pruebas y consultoría a la Administración: justo lo que los agentes de programación y la IA generativa hacen más barato [B4]. Servicios a empresas, consultoría y tecnología propia suman ≈ 75 % de las ventas; la reventa de plataformas de terceros (≈ 19 %) es menos sensible [A5]. A favor: la Administración saudí exige datos en el país, proveedores locales y homologaciones, y Azm puede usar la IA para producir con menos subcontratación. En contra: los contratos se relicitan y el cliente público captura el ahorro, y las grandes estatales (Elm) integran la IA con más recursos. Neto, amenaza: el escenario bajista del DCF (−3 puntos de margen y −8 de crecimiento) es nuestra medida del riesgo.',
  },
  confianza: 'Media',
};

const catalizadores = {
  items: [
    { fecha: '2026-11-05', evento: 'Junta extraordinaria: recompra de 3,6 M acciones, contratos vinculados de 191,6 M, consejo a seis', efecto: 'La recompra sostiene el precio; los contratos fijan cuánto trabajo va a las empresas de los fundadores [D12, C4]', probabilidad: 'Alta', sentido: '+/−' },
    { fecha: '≈ nov-2026', evento: 'Resultados del 1T FY2027 (jul-sep 2026)', efecto: 'GIB espera 17 M; nuestro FY2027e supone ≈ 15 M por trimestre [D7]', probabilidad: 'Alta', sentido: '+/−' },
    { fecha: 'ago-2026 a ago-2027', evento: 'Compra de AZM FinTech (memorando de 12 meses)', efecto: 'Precio y forma de pago: puede diluir o integrar margen hoy subcontratado [C3]', probabilidad: 'Media', sentido: '+/−' },
    { fecha: '2026-2027', evento: 'Arranque de Wasl con licencia de SAMA y proyectos con Elm', efecto: 'Ingresos recurrentes de plataforma [B7, B5]', probabilidad: 'Media', sentido: '+' },
    { fecha: '≈ sep-2026 a dic-2026', evento: 'Publicación de las cuentas auditadas de FY2026', efecto: 'Confirma balance y flujos de fuente secundaria [A10]', probabilidad: 'Alta', sentido: '+/−' },
  ],
  confianza: 'Media',
};

const preguntas = {
  items: [
    { tema: 'Vinculadas', pregunta: '¿Qué margen se quedan AZM FinTech y Azm Digital en los ≈ 116 M que facturan al año, y por qué no se ejecuta ese trabajo dentro de Azm?', por_que: 'La mitad de las ventas pasa por empresas de los fundadores.' },
    { tema: 'AZM FinTech', pregunta: '¿A qué precio y con qué pago (dinero o acciones) se comprará AZM FinTech, y qué beneficio aporta fuera de lo que ya factura a Azm?', por_que: 'Transferencia de valor a los fundadores o integración del margen.' },
    { tema: 'IA', pregunta: '¿Cuántas horas de desarrollo por proyecto ha ahorrado la IA y cómo se reparte ese ahorro con los ministerios en los contratos nuevos?', por_que: 'Es el riesgo que más puede bajar el margen.' },
    { tema: 'Cartera', pregunta: '¿Qué parte de la cartera de más de 300 M está firmada y qué plazo de ejecución tiene?', por_que: 'Visibilidad del +22 % de FY2027e.' },
    { tema: 'Cobros', pregunta: '¿Qué antigüedad tienen los activos de contrato y los clientes públicos?', por_que: 'Los retrasos de cobro vacían la caja (FY2024).' },
    { tema: 'Capital', pregunta: '¿Por qué recomprar 106 M de acciones para empleados en vez de pagar dividendo, y cuánto se capitalizará en desarrollo en FY2027?', por_que: 'Asignación de capital y calidad del beneficio.' },
  ],
  confianza: 'Media',
};

export default {
  objetivo_12m: { ...objetivo_12m, comentario: R.objetivo_comentario ?? null },
  riesgos, catalizadores, preguntas,
  resumen: R.resumen,
  dcf_lectura: R.dcf_lectura ?? null,
  escenarios_comentario: R.escenarios_comentario ?? null,
  valoracion_comentario: R.valoracion_comentario ?? null,
  sostenibilidad_justificacion: R.sostenibilidad_justificacion ?? null,
};
