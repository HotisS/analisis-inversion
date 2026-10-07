// Parte del analista (CAF, corte 2026-10-06). Citas con prefijo: [A3] = fuente 3 de A.json; [P1] = propia.
import { anios, wacc, terminal, casos, pesos } from './supuestos.mjs';
import { resumen, textos } from './resumen.mjs';

export default {
  meta: {
    fecha_corte: '2026-10-06', divisa: 'EUR', divisa_cotizacion: 'EUR', tipo_cambio: 1, unidades: 'millones',
    cierre_ejercicio_mes: 12, etiqueta_ejercicio: 'fin', normas_contables: 'NIIF-UE', formato_cuenta: 'naturaleza',
    limitaciones: textos.limitaciones,
    controles_explicados: textos.controles_explicados,
  },
  identificacion: { fundacion: '1917' },
  ...textos.secciones,
  dcf: {
    anios, wacc, terminal, mitad_de_anio: true,
    justificacion: textos.justificacion,
    lectura: textos.lectura,
    confianza: 'Media',
  },
  escenarios: {
    casos: casos.map((c) => ({ ...c, narrativa: textos.narrativas[c.escenario] })),
    comentario: textos.escenarios_comentario,
    confianza: 'Media',
  },
  suma_partes: textos.suma_partes,
  valoracion: {
    puente: textos.puente,
    pesos,
    comentario: textos.valoracion_comentario,
    confianza: 'Media',
  },
  catalizadores: {
    items: [
      { fecha: '12-nov-2026', evento: 'Resultados de 9M26', efecto: 'Prueba de la guía de 2026 (ventas +«un dígito alto», mejora del margen) con un 2S de Solaris más normal tras un 1S récord (entregas +41 %); y del circulante, que subió de 87 a 235 M en el semestre', probabilidad: 'Alta', sentido: '+/−' },
      { fecha: '4T26 (antes del 31-dic)', evento: 'Presentación del Plan Estratégico 2027-2030', efecto: 'Fija los objetivos de margen, circulante y dividendo y el tamaño de las compras; el plan anterior reservaba ≈ 550 M para M&A que no se usaron', probabilidad: 'Alta', sentido: '+/−' },
      { fecha: '2S26-1S27', evento: 'Firma y entrada en cartera de El Cairo (rehabilitación y mantenimiento de metro) y Belgrado (cercanías), más de 700 M anunciados', efecto: 'Cartera de 17.743 M más ≈ 4 %; confirma la contratación de 2026 por encima de las ventas', probabilidad: 'Media', sentido: '+' },
      { fecha: 'Finales de feb-2027', evento: 'Resultados de 2026 y guía de 2027', efecto: 'Primer año del nuevo plan: el mercado pedirá crecimiento y margen EBIT por encima del 6 %', probabilidad: 'Alta', sentido: '+/−' },
      { fecha: '2T27', evento: 'Prototipo del AM30 para SNCB (contrato base de más de 1.700 M firmado en el 1T26)', efecto: 'Primer hito técnico del mayor contrato de la historia de CAF; los retrasos de homologación son la fuente típica de sobrecostes', probabilidad: 'Media', sentido: '+/−' },
      { fecha: 'Jun-jul 2027', evento: 'Junta y pago del dividendo del ejercicio 2026', efecto: 'El dividendo sigue a los resultados (1,52 EUR del ejercicio 2025, payout del 36 %)', probabilidad: 'Alta', sentido: '+' },
    ],
    confianza: 'Media',
  },
  riesgos: textos.riesgos,
  preguntas: textos.preguntas,
  resumen,
  fuentes: [
    { id: 1, titulo: 'Presentación de resultados del primer semestre de 2026', editor: 'CAF', tipo: 'Primaria', fecha: '2026-07-30', url: 'https://admin.cafmobility.com/uploads/Presentacion_de_Resultados_1_S_2026_012ba86755.pdf' },
    { id: 2, titulo: 'Plan Estratégico 2026 (presentación al mercado)', editor: 'CAF', tipo: 'Primaria', fecha: '2022-12-01', url: 'https://admin.cafmobility.com/uploads/Plan_Estrategico_2026_c13c54f857.pdf' },
    { id: 4, titulo: 'CAF wins Belgium’s SNCB AM30 train fleet (preferred bidder; calendario del prototipo y de la entrada en servicio)', editor: 'Railway Technology', tipo: 'Prensa', fecha: '2025-03-10', url: 'https://www.railway-technology.com/news/caf-belgiums-sncb-am30-train-fleet/' },
    { id: 6, titulo: 'Rating (la sociedad no ha solicitado calificación crediticia)', editor: 'CAF', tipo: 'Primaria', fecha: '2026-10', url: 'https://www.cafmobility.com/accionistas-inversores/informacion-economico-financiera/rating/' },
    { id: 7, titulo: 'CAF: 2025 en línea en términos generales (resultados frente a estimaciones y consenso)', editor: 'Renta 4 Banco', tipo: 'Analistas', fecha: '2026-02-27', url: 'https://www.r4.com/articulos-y-analisis/valores/caf-2025-en-linea-en-terminos-generales' },
    { id: 8, titulo: 'CAF: previo 1S26, solidez operativa (estimaciones de Renta 4 y del consenso)', editor: 'Renta 4 Banco', tipo: 'Analistas', fecha: '2026-07-21', url: 'https://www.r4.com/articulos-y-analisis/valores/caf-previo-1s26-solidez-operativa' },
  ],
  _parches: [
    { ruta: 'transacciones.operaciones[3].ev_ventas', valor: null },
    { ruta: 'transacciones.operaciones[3].ev_ebitda', valor: null },
    { ruta: 'transacciones.operaciones[3].comentario', valor: 'Inspección industrial, no ferroviaria: múltiplos publicados (4,11x ventas y 12,0x EBITDA con sinergias) fuera del cálculo [D25].' },
    { ruta: 'trimestres.items[3].vs_consenso', valor: 'En línea' },
    { ruta: 'trimestres.items[4].vs_consenso', valor: 'Superior' },
    { ruta: 'balance.rating', valor: 'Sin rating: la sociedad no ha solicitado calificación crediticia para sí ni para sus emisiones [P6]' },
  ],
  huecos_resueltos: [
    { seccion: 'balance', campo: 'rating' },
    { seccion: 'trimestres', campo: 'vs_consenso' },
    { seccion: 'calidad', campo: 'Texto del informe de auditoría de 2025' },
  ],
  huecos: [
    { seccion: 'trimestres', campo: 'vs_consenso (1S24, 2S24 y 1S25)', tipo: 'Complemento', intentos: '1) web de CAF «Cobertura y consenso de analistas»: solo publica la versión vigente (consenso del 1S26); 2) MarketScreener: el historial de sorpresas se dibuja con JavaScript; 3) notas de Renta 4: solo se localizaron la de resultados de 2025 (EBIT un 2 % por debajo del consenso) y la previa del 1S26', decision: 'Omitido (2S25 «En línea» y 1S26 «Superior» sí constan)' },
    { seccion: 'calidad', campo: 'Texto del informe de auditoría de 2025', tipo: 'Complemento', intentos: '1) búsqueda de «opinión» y «salvedad» en el informe anual 2025 (no incluye el informe del auditor); 2) IAGC 2025, C.1.33 (sin salvedades el año anterior); 3) paquete ESEF de las cuentas consolidadas 2025 en la web de CAF (solo el informe xhtml, sin el del auditor) y consulta a la CNMV (redirección sin datos)', decision: 'Omitido; opinión «Favorable» según el IAGC' },
  ],
};
