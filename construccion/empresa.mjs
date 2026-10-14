// Plantilla: empresa cotizada (versión extensa). Las rutas «calc.…» las rellena motor/calcular-empresa.mjs;
// el resto, el modelo siguiendo verticales/empresa/prompt.md.
//
// Secciones condicionales: ['seccion', título, rutas, 'Núcleo' | 'Complemento', bloques]. Si todas las rutas
// llegan vacías (el modelo no encontró información tras tres intentos), la sección no se imprime y se
// anota en el anexo «Información no disponible»; si es de núcleo, además sale un aviso en el resumen.
// ['sub', título, rutas, bloques] hace lo mismo con un apartado (sin anotarlo); ['si', rutas, bloques], sin título.

const sub = (titulo, ruta, bloques) => ['sub', titulo, ruta, bloques ?? [['texto', ruta]]];
const etiquetado = (etiqueta, ruta) => ['si', ruta, [['p', `**${etiqueta}**`, { keepNext: true }], ['texto', ruta]]];

export default {
  tipo: 'Análisis de empresa cotizada',
  cabecera: '{{identificacion.nombre}} ({{identificacion.ticker}})',
  columnasFuentes: [['Ref.', 'id', '', 0.5, 'c'], ['Documento', 'titulo', '', 3.6], ['Editor', 'editor', '', 1.5], ['Tipo', 'tipo', '', 1], ['Fecha', 'fecha', 'fecha', 1], ['Enlace', 'url', '', 2.8]],
  portada: {
    titulo: '{{identificacion.nombre}}',
    subtitulo: '{{identificacion.ticker}} · {{identificacion.mercado}} · ISIN {{identificacion.isin}} · {{identificacion.sector}}',
    tarjetas: [
      ['Recomendación', '{{calc.recomendacion.recomendacion}}'],
      ['Precio', '{{identificacion.precio|2}} {{meta.divisa}}{{calc.recomendacion.precio_txt|opc}}'],
      ['Objetivo 12 m', '{{calc.recomendacion.objetivo_12m_txt}}'],
      ['Rentabilidad 12 m', '{{calc.recomendacion.rentabilidad_12m_txt}}'],
      ['Valor intrínseco', '{{calc.sintesis.valor_objetivo|2}} {{meta.divisa}}{{calc.recomendacion.valor_objetivo_txt|opc}}{{calc.recomendacion.objetivo_mercado_corto|opc}}'],
      ['Convicción', '{{resumen.conviccion}}'],
      ['Capitalización', '{{calc.mercado.capitalizacion|0}} M'],
      ['EV/EBITDA próx. 12 m', '{{calc.clave.ev_ebitda_ntm|x}}'],
      ['Deuda neta aj. / EBITDA', '{{calc.clave.dn_ebitda_ajustada|x}}'],
    ],
  },
  bloques: [
    ['kv', [
      ['Nombre', '{{identificacion.nombre}}'], ['Ticker / ISIN', '{{identificacion.ticker}} / {{identificacion.isin}}'],
      ['Mercado', '{{identificacion.mercado}}'], ['Índice de referencia', '{{identificacion.indice_referencia}}'],
      ['Sector / industria', '{{identificacion.sector}} / {{identificacion.industria}}'], ['Sede · fundación', '{{identificacion.sede}} · {{identificacion.fundacion}}'],
      ['Empleados', '{{identificacion.empleados|0}}'], ['Web', '{{identificacion.web}}'],
      ['Precio (fecha)', '{{identificacion.precio|2}} ({{identificacion.fecha_precio|fecha}})'], ['Rango 52 semanas', '{{identificacion.min_52s|2}} – {{identificacion.max_52s|2}}'],
      ['Acciones diluidas (M)', '{{identificacion.acciones|1}}'], ['Free float', '{{identificacion.free_float_pct|pct}}'],
      ['Capitalización', '{{calc.mercado.capitalizacion|0}} M {{meta.divisa}}'], ['Valor empresa', '{{calc.mercado.valor_empresa|0}} M {{meta.divisa}}'],
      ['Volumen medio diario', '{{identificacion.volumen_medio_diario}}'], ['Próximos resultados', '{{identificacion.proximos_resultados|fecha}}'],
    ]],
    ['indice', [
      'Síntesis y recomendación (una página)',
      'Resumen ejecutivo',
      'Parte I — Negocio y sector: 1. Historia · 2. Modelo de negocio · 3. Sector y mercado · 4. Posición competitiva',
      'Parte II — Finanzas: 5. Cuenta de resultados · 6. Resultados recientes · 7. Balance y circulante · 8. Flujos de caja · 9. Calidad contable · 10. Rentabilidad · 11. Deuda y solvencia · 12. Asignación de capital',
      'Parte III — Equipo y gobierno: 13. Equipo directivo · 14. Gobierno corporativo',
      'Parte IV — Mercado y valoración: 15. Consenso · 16. Bolsa · 17. Múltiplos históricos · 18. Comparables · 19. Transacciones · 20. DCF · 21. Escenarios · 22. Suma de partes · 23. Síntesis',
      'Parte V — Tesis, riesgos y seguimiento: 24. Catalizadores · 25. Riesgos y pre-mortem · 26. ESG · 27. Preguntas abiertas · 28. Sentimiento en foros y comentarios',
      'Anexos: controles de calidad, información no disponible y fuentes',
      'Las secciones sin información verificable no se imprimen; quedan listadas en el anexo «Información no disponible».',
    ]],

    // ───────── Síntesis y recomendación (una página) ─────────
    ['si', 'resumen.sintesis', [
      ['salto'],
      ['h1', 'Síntesis y recomendación'],
      ['p', '**{{calc.recomendacion.recomendacion}}** · Convicción {{resumen.conviccion}} · Objetivo a 12 meses **{{calc.recomendacion.objetivo_12m_txt}}** frente a {{identificacion.precio|2}}{{calc.recomendacion.precio_txt|opc}} · Rentabilidad a 12 meses **{{calc.recomendacion.rentabilidad_12m_txt}}** · Valor intrínseco {{calc.sintesis.valor_objetivo|2}} {{meta.divisa}}{{calc.recomendacion.valor_objetivo_txt|opc}}{{calc.recomendacion.objetivo_mercado_txt|opc}} · Alcista / bajista {{calc.recomendacion.alcista_pct|+pct}} / {{calc.recomendacion.bajista_pct|+pct}}'],
      ['texto', 'resumen.sintesis'],
    ]],

    // ───────── Resumen ejecutivo ─────────
    ['salto'],
    ['h1', 'Resumen ejecutivo'],
    ['confianza', 'resumen'],
    ['aviso', '{{_meta.aviso_nucleo}}'],
    ['p', '**Recomendación: {{calc.recomendacion.recomendacion}}** · Convicción: {{resumen.conviccion}} · Horizonte: {{resumen.horizonte}} · Objetivo a 12 meses: **{{calc.recomendacion.objetivo_12m_txt}}** (rentabilidad {{calc.recomendacion.rentabilidad_12m_txt}}) · Valor intrínseco: {{calc.sintesis.valor_objetivo|2}} {{meta.divisa}}{{calc.recomendacion.valor_objetivo_txt|opc}} ({{calc.sintesis.potencial_pct|+pct}} sobre {{identificacion.precio|2}}){{calc.recomendacion.objetivo_mercado_txt|opc}}'],
    ['texto', 'resumen.tesis'],
    ['sub', 'La decisión', 'calc.recomendacion.tabla', [
      ['tabla', 'calc.recomendacion.tabla', [['Elemento de la decisión', 'concepto', '', 4], ['Valor', 'valor', '', 2, 'd']]],
      ['nota', 'Regla (método v2): la recomendación sigue al objetivo a 12 meses, que es nuestro PER × nuestro BPA del ejercicio que mirará el mercado dentro de un año, con la misma regla de múltiplos para todas las empresas (base: el menor entre el PER actual y la mediana de 5 años; bajista: el mínimo de 5 años, o el base −15 % si ya cotiza por debajo; alcista: la media histórica o la de los comparables, sin pasar de base +30 %), ponderado con las probabilidades de los escenarios. Comprar si la rentabilidad ponderada es ≥ 15 %, la del base ≥ 12 % y el valor intrínseco no queda por debajo del precio; Vender si la ponderada es ≤ −10 %; Mantener en el resto. El consenso de analistas solo se compara. El valor intrínseco (DCF) es la referencia a largo plazo; su regla, la de siempre: Comprar si la rentabilidad total esperada a 12 meses es ≥ 15 % y el alcista gana al menos lo que pierde el bajista; Vender si es ≤ −10 %, o negativa con asimetría < 0,5; Mantener en el resto. Se aplica dos veces: con el WACC del análisis (regla absoluta: ¿rinde más que su coste de capital?) y con el WACC que resulta de la prima de riesgo implícita del mercado (regla relativa: ¿rinde más que lo que hoy pide el mercado, ajustado por su beta?). Manda la relativa, salvo que las dos se contradigan (una Comprar y otra Vender): entonces, Mantener.'],
      ['tabla', 'calc.recomendacion.niveles', [['Acción', 'accion', '', 1.2], ['A qué precio', 'condicion', '', 6]]],
      ['si', 'resumen.justificacion_recomendacion', [['p', '**Por qué la recomendación se aparta de la regla.**'], ['texto', 'resumen.justificacion_recomendacion']]],
    ]],
    sub('Qué cambiaría la recomendación', 'resumen.cambiaria_recomendacion', [['lista', 'resumen.cambiaria_recomendacion']]),
    ['sub', 'Dónde discrepamos del mercado', 'resumen.vision_diferencial', [
      etiquetado('Lo que descuenta el precio.', 'resumen.vision_diferencial.mercado_descuenta'),
      etiquetado('Lo que creemos nosotros.', 'resumen.vision_diferencial.nuestra_vision'),
      etiquetado('Por qué podemos tener razón.', 'resumen.vision_diferencial.por_que'),
    ]],
    ['grafico', 'sintesis'],
    ['tabla', 'calc.sintesis.tabla', [['Método', 'metodo', '', 3], ['Valor por acción', 'valor', '2', 1.2, 'd'], ['Potencial', 'potencial_pct', '+pct', 1, 'd'], ['Peso', 'peso_pct', 'pct0', 0.8, 'd']]],
    sub('A favor', 'resumen.a_favor', [['lista', 'resumen.a_favor']]),
    sub('En contra', 'resumen.en_contra', [['lista', 'resumen.en_contra']]),
    sub('Qué tiene que pasar para que la tesis funcione', 'resumen.que_vigilar'),
    sub('Indicadores de seguimiento', 'resumen.kpis_seguimiento', [['tabla', 'resumen.kpis_seguimiento', [['Indicador', 'kpi', '', 2], ['Nivel actual', 'nivel_actual', '', 1.2, 'd'], ['Umbral de alerta', 'umbral_alerta', '', 1.2, 'd'], ['Por qué importa', 'por_que', '', 3.4]]]]),
    sub('Datos clave', 'calc.clave', [['kv', [
      ['EV/EBITDA últimos 12 m / próx. 12 m', '{{calc.clave.ev_ebitda_ltm|x}} / {{calc.clave.ev_ebitda_ntm|x}}'], ['PER últimos 12 m / próx. 12 m', '{{calc.clave.per_ltm|x}} / {{calc.clave.per_ntm|x}}'],
      ['EV/EBIT últimos 12 m', '{{calc.clave.ev_ebit_ltm|x}}'], ['Valor empresa / base de activos regulada (RAB)', '{{calc.clave.ev_rab|x2}}'], ['EV/Ventas últimos 12 m', '{{calc.clave.ev_ventas_ltm|x2}}'],
      ['Rentabilidad por FCF', '{{calc.clave.fcf_yield_pct|pct}}'], ['Rentabilidad por dividendo', '{{calc.clave.dividendo_pct|pct}}'],
      ['Crecimiento anual de ingresos ({{calc.tcac.periodo}})', '{{calc.tcac.ingresos_pct|pct}}'], ['Margen EBITDA últimos 12 m', '{{calc.clave.margen_ebitda_pct|pct}}'],
      ['ROIC último ejercicio', '{{calc.clave.roic_pct|pct}}'], ['WACC', '{{calc.dcf.wacc|pct}}'],
      ['Deuda neta / EBITDA (contable · ajustada)', '{{calc.clave.dn_ebitda|x}} · {{calc.clave.dn_ebitda_ajustada|x}}'], ['Gobierno (criterios cumplidos)', '{{calc.gobierno.puntuacion}}'],
    ]]]),

    // ───────── Parte I ─────────
    ['parte', 'Parte I — Negocio y sector'],
    ['seccion', '1. Historia e hitos', 'historia', 'Complemento', [
      ['texto', 'historia.resumen'],
      ['tabla', 'historia.hitos', [['Año', 'anio', '', 0.8, 'c'], ['Hito', 'hito', '', 6]]],
    ]],

    ['seccion', '2. Modelo de negocio', 'negocio', 'Núcleo', [
      ['texto', 'negocio.descripcion'],
      sub('Cómo gana dinero', 'negocio.como_gana_dinero'),
      sub('Segmentos ({{calc.segmentos_periodo}})', 'calc.segmentos_ultimo', [
        ['tabla', 'calc.segmentos_ultimo', [['Segmento', 'nombre', '', 2.4], ['Ingresos', 'ingresos', '0', 1, 'd'], ['% del total', 'peso_pct', 'pct', 1, 'd'], ['Crecimiento', 'crecimiento_pct', '+pct', 1, 'd'], ['Margen', 'margen_pct', 'pct', 0.9, 'd'], ['Tipo de margen', 'tipo_margen', '', 1, 'c']]],
        ['grafico', 'segmentos_hist'],
        ['grafico', 'segmentos_mix'],
        ['tabla', 'calc.segmentos_tabla.filas', [['Ingresos por segmento', 'nombre', '', 2.4], ['{{calc.segmentos_tabla.periodos[0]}}', 'v0', '0', 1, 'd'], ['{{calc.segmentos_tabla.periodos[1]}}', 'v1', '0', 1, 'd'], ['{{calc.segmentos_tabla.periodos[2]}}', 'v2', '0', 1, 'd'], ['{{calc.segmentos_tabla.periodos[3]}}', 'v3', '0', 1, 'd'], ['{{calc.segmentos_tabla.periodos[4]}}', 'v4', '0', 1, 'd']]],
      ]),
      ['grafico', 'geografias'],
      sub('Clientes, recurrencia y poder de precios', 'negocio.clientes'),
      sub('Indicadores operativos', 'negocio.kpis', [['tabla', 'negocio.kpis', [['Indicador', 'kpi', '', 2], ['Anterior', 'valor_anterior', '', 1, 'd'], ['Actual', 'valor_actual', '', 1, 'd'], ['Variación', 'variacion', '', 0.9, 'd'], ['Lectura', 'comentario', '', 3]]]]),
    ]],

    ['seccion', '3. Sector y mercado', 'sector', 'Núcleo', [
      ['texto', 'sector.definicion'],
      ['kv', [
        ['Tamaño del mercado', '{{sector.tamano}}'], ['Posición en el ciclo', '{{sector.ciclo.posicion}}'],
        ['Crecimiento histórico anual', '{{sector.tcac_historico_pct|pct}}'], ['Crecimiento previsto anual', '{{sector.tcac_previsto_pct|pct}}'],
        ['Cuota de los 5 primeros', '{{sector.cr5_pct|pct0}}'], ['Estructura', '{{sector.estructura}}'],
      ]],
      ['grafico', 'sector_mercado'],
      sub('Motores de la demanda', 'sector.drivers', [['tabla', 'sector.drivers', [['Motor', 'driver', '', 2], ['Efecto', 'efecto', '', 0.7, 'c'], ['Horizonte', 'horizonte', '', 1], ['Evidencia', 'evidencia', '', 4]]]]),
      sub('Las cinco fuerzas', 'sector.porter', [['grafico', 'porter'], ['tabla', 'sector.porter', [['Fuerza', 'fuerza', '', 2], ['Intensidad (1-5)', 'intensidad', '0', 1, 'c'], ['Justificación', 'justificacion', '', 5]]]]),
      sub('Ciclo', 'sector.ciclo.comentario'),
      sub('Regulación', 'sector.regulacion'),
      sub('Tendencias y disrupción', 'sector.tendencias'),
    ]],

    ['seccion', '4. Posición competitiva y foso', 'competencia', 'Núcleo', [
      ['kv', [
        ['Cuota de mercado', '{{competencia.cuota_pct|pct}}'], ['Posición', '{{competencia.posicion}}'],
        ['Foso', '{{competencia.foso.veredicto}}'], ['Tendencia del foso', '{{competencia.foso.tendencia}}'],
      ]],
      ['tabla', 'competencia.competidores', [['Competidor', 'nombre', '', 1.8], ['País', 'pais', '', 0.8], ['Cotiza', 'ticker', '', 0.9], ['Ingresos (M)', 'ingresos', '0', 1, 'd'], ['Cuota', 'cuota_pct', 'pct', 0.8, 'd'], ['M. EBIT', 'margen_ebit_pct', 'pct', 0.8, 'd'], ['Cómo compite', 'comentario', '', 3]]],
      ['grafico', 'competidores_margen'],
      sub('Fuentes de ventaja competitiva', 'competencia.foso.fuentes', [['grafico', 'foso'], ['tabla', 'competencia.foso.fuentes', [['Fuente', 'fuente', '', 1.8], ['Puntuación (0-5)', 'puntuacion', '0', 1, 'c'], ['Evidencia', 'evidencia', '', 5]]]]),
      sub('Amenazas', 'competencia.amenazas'),
    ]],

    // ───────── Parte II ─────────
    ['parte', 'Parte II — Finanzas'],
    ['seccion', '5. Cuenta de resultados', 'financieros', 'Núcleo', [
      ['tabla', 'calc.cuenta', [
        ['Periodo', 'periodo', '', 0.9], ['Ingresos', 'ingresos', '0', 1, 'd'], ['Crec.', 'crecimiento_pct', '+pct', 0.8, 'd'], ['{{calc.etiquetas.margen_bruto}}', 'margen_bruto_pct', 'pct', 0.8, 'd'],
        ['EBITDA', 'ebitda', '0', 0.9, 'd'], ['M. EBITDA', 'margen_ebitda_pct', 'pct', 0.85, 'd'], ['EBIT', 'ebit', '0', 0.85, 'd'], ['M. EBIT', 'margen_ebit_pct', 'pct', 0.8, 'd'],
        ['B. neto', 'beneficio_neto', '0', 0.85, 'd'], ['BPA', 'bpa', '2', 0.7, 'd'], ['DPA', 'dpa', '2', 0.7, 'd'], ['Tipo imp.', 'tasa_impositiva_pct', 'pct0', 0.75, 'd']]],
      ['p', 'Crecimiento anual compuesto {{calc.tcac.periodo}}: ingresos **{{calc.tcac.ingresos_pct|pct}}**, EBITDA **{{calc.tcac.ebitda_pct|pct}}**, BPA **{{calc.tcac.bpa_pct|pct}}**.'],
      ['grafico', 'ingresos_ebitda'],
      ['grafico', 'margenes'],
      ['texto', 'financieros.comentario'],
      sub('Ajustes y partidas no recurrentes', 'financieros.ajustes'),
    ]],

    ['seccion', '6. Resultados recientes', 'trimestres', 'Complemento', [
      ['tabla', 'trimestres.items', [['Periodo', 'periodo', '', 0.9], ['Ingresos', 'ingresos', '0', 1, 'd'], ['Crec. interanual', 'crecimiento_pct', '+pct', 1, 'd'], ['Crec. orgánico', 'crecimiento_organico_pct', '+pct', 1, 'd'], ['EBITDA', 'ebitda', '0', 1, 'd'], ['M. EBITDA', 'margen_ebitda_pct', 'pct', 1, 'd'], ['BPA', 'bpa', '2', 0.8, 'd'], ['Frente al consenso', 'vs_consenso', '', 1.2, 'c']]],
      ['grafico', 'trimestres'],
      sub('Lo que dijo la dirección en las últimas presentaciones', 'trimestres.ultima_presentacion'),
    ]],

    ['seccion', '7. Balance y capital circulante', 'balance.historico', 'Núcleo', [
      ['tabla', 'calc.balance', [
        ['Periodo', 'periodo', '', 0.9], ['Activo total', 'activo_total', '0', 1, 'd'], ['Fondo com. + intang.', 'intangibles', '0', 1.1, 'd'], ['Circulante', 'circulante', '0', 0.9, 'd'],
        ['Caja', 'caja', '0', 0.8, 'd'], ['Deuda fin.', 'deuda_financiera', '0', 0.9, 'd'], ['Arrend.', 'arrendamientos', '0', 0.8, 'd'], ['Deuda neta', 'deuda_neta', '0', 0.9, 'd'],
        ['Patrimonio', 'patrimonio', '0', 0.9, 'd'], ['DN/EBITDA', 'dn_ebitda', 'x', 0.85, 'd']]],
      ['tabla', 'calc.balance', [['Periodo', 'periodo', '', 1], ['Circulante / ventas', 'circulante_ventas_pct', 'pct', 1.1, 'd'], ['Días de cobro', 'dso', '0', 1, 'd'], ['Días de inventario', 'dio', '0', 1, 'd'], ['Días de pago', 'dpo', '0', 1, 'd'], ['Ciclo de caja (días)', 'ciclo_caja', '0', 1.1, 'd'], ['Liquidez corriente', 'liquidez_corriente', 'x', 1, 'd']]],
      ['nota', 'Días de inventario y de pago calculados {{calc.etiquetas.dias_base}}.'],
      ['nota', '{{calc.perimetro_nota}}'],
      ['grafico', 'dias_circulante'],
      ['texto', 'balance.comentario'],
    ]],

    ['seccion', '8. Flujos de caja', 'flujos', 'Núcleo', [
      ['tabla', 'calc.flujos', [
        ['Periodo', 'periodo', '', 0.9], ['Flujo operativo', 'flujo_operativo', '0', 1, 'd'], ['Capex', 'capex', '0', 0.8, 'd'], ['Arrend.', 'pagos_arrendamientos', '0', 0.8, 'd'],
        ['FCF', 'fcf', '0', 0.8, 'd'], ['B. neto', 'beneficio_neto', '0', 0.8, 'd'], ['FCF / B. neto', 'conversion_pct', 'pct0', 0.9, 'd'], ['Capex / ventas', 'capex_ventas_pct', 'pct', 0.9, 'd'],
        ['Capex / amort.', 'capex_amortizacion', 'x', 0.9, 'd'], ['FCF por acción', 'fcf_por_accion', '2', 0.9, 'd']]],
      ['grafico', 'fcf'],
      ['p', 'Acumulado {{calc.flujos_acumulado.periodo}}: FCF **{{calc.flujos_acumulado.fcf|0}}**, conversión **{{calc.flujos_acumulado.conversion_pct|pct0}}** del beneficio neto; adquisiciones {{calc.flujos_acumulado.adquisiciones|0}}, dividendos {{calc.flujos_acumulado.dividendos|0}}, recompras {{calc.flujos_acumulado.recompras|0}}.'],
      ['texto', 'flujos.comentario'],
    ]],

    ['seccion', '9. Calidad contable', 'calidad,calc.calidad.tabla', 'Complemento', [
      ['kv', [['Auditor', '{{calidad.auditor}}'], ['Años como auditor', '{{calidad.anios_auditor|0}}'], ['Opinión del último informe', '{{calidad.opinion}}'], ['Ejercicio analizado', '{{calc.calidad.periodo}}']]],
      ['tabla', 'calc.calidad.tabla', [['Indicador', 'indicador', '', 2.4], ['Valor', 'valor', '', 1, 'd'], ['Lectura', 'lectura', '', 5]]],
      ['tabla', 'calc.calidad.piotroski_detalle', [['Criterio Piotroski', 'criterio', '', 4], ['Cumple', 'resultado', '', 1, 'c']]],
      sub('Ajustes, criterios contables y remuneración en acciones', 'calidad.comentario'),
      sub('Señales de alerta', 'calidad.senales', [['tabla', 'calidad.senales', [['Señal', 'senal', '', 2.6], ['Nivel', 'nivel', '', 0.8, 'c'], ['Explicación', 'comentario', '', 4.5]]]]),
    ]],

    ['seccion', '10. Rentabilidad sobre el capital', 'rentabilidad,calc.rentabilidad', 'Núcleo', [
      ['tabla', 'calc.rentabilidad', [['Periodo', 'periodo', '', 0.9], ['ROIC', 'roic_pct', 'pct', 0.9, 'd'], ['ROE', 'roe_pct', 'pct', 0.9, 'd'], ['ROA', 'roa_pct', 'pct', 0.9, 'd'], ['Margen neto', 'margen_neto_pct', 'pct', 1, 'd'], ['Rotación del activo', 'rotacion', 'x2', 1, 'd'], ['Apalancamiento', 'apalancamiento', 'x2', 1, 'd'], ['Capital invertido', 'capital_invertido', '0', 1.1, 'd']]],
      ['grafico', 'roic'],
      ['p', '**ROIC incremental** (variación del NOPAT sobre variación del capital invertido en el periodo): {{calc.roic_incremental_pct|pct}} · **WACC**: {{calc.dcf.wacc|pct}}.'],
      ['texto', 'rentabilidad.comentario'],
    ]],

    ['seccion', '11. Deuda y solvencia', 'balance', 'Núcleo', [
      ['kv', [
        ['Deuda neta a {{valoracion.puente.fecha|fecha}}', '{{calc.mercado.deuda_neta|0}} M'], ['Deuda neta / EBITDA últimos 12 m', '{{calc.clave.dn_ebitda|x}}'],
        ['Pasivos asimilables a deuda (pensiones y otros)', '{{calc.mercado.asimilables_deuda|0}} M'], ['Deuda neta ajustada', '{{calc.mercado.deuda_neta_ajustada|0}} M'],
        ['Deuda neta ajustada / EBITDA', '{{calc.clave.dn_ebitda_ajustada|x}}'],
        ['Liquidez disponible', '{{balance.liquidez}}'], ['Rating', '{{balance.rating}}'],
        ['Coste medio de la deuda', '{{balance.coste_deuda_pct|pct}}'], ['Vida media de la deuda', '{{balance.vida_media_anios|1}} años'],
      ]],
      ['grafico', 'apalancamiento'],
      ['grafico', 'vencimientos'],
      sub('Covenants, pasivos fuera de la deuda y contingencias', 'balance.otros_pasivos'),
    ]],

    ['seccion', '12. Asignación de capital', 'capital,calc.flujos', 'Núcleo', [
      ['texto', 'capital.politica'],
      ['tabla', 'calc.flujos', [['Periodo', 'periodo', '', 0.9], ['FCF', 'fcf', '0', 0.9, 'd'], ['Adquisiciones', 'adquisiciones', '0', 1, 'd'], ['Dividendos', 'dividendos', '0', 1, 'd'], ['Recompras', 'recompras', '0', 1, 'd'], ['Ampliaciones', 'emision_acciones', '0', 1, 'd'], ['Retorno / B. neto', 'payout_caja_pct', 'pct0', 1, 'd'], ['Acciones (M)', 'acciones', '1', 0.9, 'd']]],
      ['grafico', 'usos_caja'],
      sub('Historial de adquisiciones', 'capital.adquisiciones', [['tabla', 'capital.adquisiciones', [['Año', 'anio', '', 0.6, 'c'], ['Objetivo', 'objetivo', '', 1.8], ['Importe', 'importe', '0', 0.8, 'd'], ['EV/EBITDA', 'ev_ebitda', 'x', 0.8, 'd'], ['Financiación', 'financiacion', '', 1.1], ['Resultado', 'resultado', '', 3]]]]),
      ['texto', 'capital.comentario'],
    ]],

    // ───────── Parte III ─────────
    ['parte', 'Parte III — Equipo y gobierno'],
    ['seccion', '13. Equipo directivo', 'directivos', 'Núcleo', [
      ['tabla', 'directivos.equipo', [['Nombre', 'nombre', '', 1.5], ['Cargo', 'cargo', '', 1.3], ['Desde', 'desde', '', 0.6, 'c'], ['% capital', 'participacion_pct', 'pct2', 0.8, 'd'], ['Trayectoria y resultados', 'trayectoria', '', 4]]],
      sub('¿Cumple lo que promete?', 'directivos.historial_guidance', [['tabla', 'directivos.historial_guidance', [['Año', 'anio', '', 0.6, 'c'], ['Lo que prometió', 'guia', '', 2.6], ['Lo que logró', 'real', '', 2.6], ['Cumplió', 'cumplida', '', 0.8, 'c']]]]),
      ['texto', 'directivos.comentario'],
    ]],

    ['seccion', '14. Gobierno corporativo', 'gobierno', 'Núcleo', [
      ['kv', [
        ['Consejeros', '{{calc.gobierno.n_consejeros|0}}'], ['Independientes', '{{calc.gobierno.independientes_pct|pct0}}'],
        ['Antigüedad media en el consejo', '{{calc.gobierno.antiguedad_media|1}} años'], ['Criterios de buen gobierno cumplidos', '{{calc.gobierno.puntuacion}}'],
        ['Cambios de presidente o primer ejecutivo (24 meses)', '{{gobierno.cambios_cupula_24m|0}}'],
      ]],
      ['grafico', 'consejo'],
      ['tabla', 'gobierno.consejo', [['Consejero', 'nombre', '', 1.8], ['Cargo', 'cargo', '', 1.4], ['Tipo', 'tipo', '', 1.1], ['Desde', 'desde', '', 0.6, 'c'], ['Comisiones', 'comisiones', '', 2.2]]],
      ['tabla', 'calc.gobierno.checklist', [['Criterio', 'criterio', '', 4.4], ['Dato', 'valor', '', 1.4, 'c'], ['Resultado', 'resultado', '', 1, 'c']]],
      sub('Accionariado', 'gobierno.accionistas', [['tabla', 'gobierno.accionistas', [['Accionista', 'nombre', '', 2.6], ['% capital', 'pct', 'pct2', 0.9, 'd'], ['Tipo', 'tipo', '', 1.4], ['Movimientos recientes', 'variacion', '', 2.6]]], ['grafico', 'accionistas']]),
      sub('Compras y ventas de consejeros y directivos (12 meses)', 'gobierno.insiders', [['tabla', 'gobierno.insiders', [['Fecha', 'fecha', 'fecha', 0.9], ['Persona', 'persona', '', 2], ['Operación', 'operacion', '', 0.9, 'c'], ['Acciones', 'acciones', '0', 1, 'd'], ['Importe (M)', 'importe', '2', 0.9, 'd']]]]),
      sub('Remuneración', 'gobierno.remuneracion_ceo,gobierno.remuneracion', [
        ['kv', [
          ['Remuneración total del primer ejecutivo ({{gobierno.remuneracion_ceo.anio}})', '{{gobierno.remuneracion_ceo.total|2}} M'], ['Fijo', '{{gobierno.remuneracion_ceo.fijo|2}} M'],
          ['Variable anual', '{{gobierno.remuneracion_ceo.variable_corto|2}} M'], ['Variable a largo plazo', '{{gobierno.remuneracion_ceo.variable_largo|2}} M'],
          ['Peor voto a favor (3 juntas)', '{{gobierno.voto_remuneracion_pct|pct}}'], ['Peor voto en contra (3 juntas)', '{{gobierno.voto_remuneracion_contra_pct|pct}}'], ['Ratio sobre salario medio', '{{gobierno.remuneracion_ceo.ratio_salario_medio|0}}x'],
        ]],
        ['texto', 'gobierno.remuneracion'],
      ]),
      sub('Operaciones vinculadas, estructura de control y defensas', 'gobierno.control_y_defensas'),
      sub('Señales de alerta', 'gobierno.alertas', [['lista', 'gobierno.alertas']]),
    ]],

    // ───────── Parte IV ─────────
    ['parte', 'Parte IV — Mercado y valoración'],
    ['seccion', '15. Previsiones de la compañía y consenso', 'consenso', 'Núcleo', [
      ['texto', 'consenso.guidance'],
      ['tabla', 'consenso.estimaciones', [['Periodo', 'periodo', '', 0.8], ['Ingresos', 'ingresos', '0', 1, 'd'], ['EBITDA', 'ebitda', '0', 1, 'd'], ['EBIT', 'ebit', '0', 1, 'd'], ['BPA', 'bpa', '2', 0.8, 'd'], ['DPA', 'dpa', '2', 0.8, 'd'], ['Fuente', 'fuente', '', 2]]],
      sub('Nuestra proyección frente al consenso', 'calc.consenso_vs_propio', [['tabla', 'calc.consenso_vs_propio', [['Periodo', 'periodo', '', 0.8], ['Ingresos propios', 'ingresos_propio', '0', 1, 'd'], ['Ingresos consenso', 'ingresos_consenso', '0', 1, 'd'], ['Dif.', 'ingresos_dif_pct', '+pct', 0.8, 'd'], ['EBITDA propio', 'ebitda_propio', '0', 1, 'd'], ['EBITDA consenso', 'ebitda_consenso', '0', 1, 'd'], ['Dif.', 'ebitda_dif_pct', '+pct', 0.8, 'd']]]]),
      ['kv', [
        ['Analistas', '{{consenso.recomendaciones.n_analistas|0}}'], ['Comprar / mantener / vender', '{{consenso.recomendaciones.comprar|0}} / {{consenso.recomendaciones.mantener|0}} / {{consenso.recomendaciones.vender|0}}'],
        ['Precio objetivo medio', '{{consenso.recomendaciones.po_medio|2}}'], ['Rango de precios objetivo', '{{consenso.recomendaciones.po_min|2}} – {{consenso.recomendaciones.po_max|2}}'],
      ]],
      sub('Revisiones de estimaciones', 'consenso.revisiones'),
    ]],

    ['seccion', '16. Comportamiento en bolsa', 'bolsa', 'Complemento', [
      ['nota', 'Rentabilidad {{bolsa.tipo_rentabilidad}}.'],
      ['tabla', 'bolsa.rentabilidades', [['Periodo', 'periodo', '', 1.6], ['Acción', 'accion_pct', '+pct', 1, 'd'], ['Índice', 'indice_pct', '+pct', 1, 'd'], ['Sector', 'sector_pct', '+pct', 1, 'd']]],
      ['grafico', 'bolsa_anual'],
      ['kv', [
        ['Beta (5 años, mensual)', '{{bolsa.beta|2}}'], ['Volatilidad anualizada (1 año)', '{{bolsa.volatilidad_pct|pct}}'],
        ['Máxima caída (5 años)', '{{bolsa.max_drawdown_pct|pct}}'], ['Posiciones cortas', '{{bolsa.posicion_corta_pct|pct}}'],
      ]],
      ['texto', 'bolsa.comentario'],
    ]],

    ['seccion', '17. Múltiplos frente a su historia', 'multiplos_historicos', 'Complemento', [
      ['tabla', 'calc.multiplos_historicos', [['Múltiplo', 'metrica', '', 2.4], ['Actual', 'actual', 'x', 0.9, 'd'], ['Mediana', 'media', 'x', 0.9, 'd'], ['Mínimo', 'minimo', 'x', 0.9, 'd'], ['Máximo', 'maximo', 'x', 0.9, 'd'], ['Percentil', 'percentil', 'pct0', 0.9, 'd'], ['Prima / descuento', 'prima_pct', '+pct0', 1, 'd']]],
      ['grafico', 'multiplos_hist'],
      ['texto', 'multiplos_historicos.comentario'],
    ]],

    ['seccion', '18. Comparables cotizados', 'comparables', 'Núcleo', [
      ['texto', 'comparables.criterio'],
      ['tabla', 'calc.comparables.tabla', [
        ['Empresa', 'nombre', '', 1.7], ['País', 'pais', '', 0.5], ['Capitaliz.', 'capitalizacion', '0', 0.9, 'd'], ['EV/Vtas', 'ev_ventas', 'x', 0.7, 'd'], ['EV/EBITDA LTM', 'ev_ebitda_ltm', 'x', 0.8, 'd'],
        ['EV/EBITDA NTM', 'ev_ebitda_ntm', 'x', 0.8, 'd'], ['PER NTM', 'per_ntm', 'x', 0.7, 'd'], ['Crec.', 'crecimiento_pct', '+pct', 0.7, 'd'], ['M. EBITDA', 'margen_ebitda_pct', 'pct', 0.75, 'd'],
        ['ROIC', 'roic_pct', 'pct', 0.65, 'd'], ['DN/ EBITDA', 'dn_ebitda', 'x', 0.65, 'd'], ['FCF yield', 'fcf_yield_pct', 'pct', 0.7, 'd']]],
      ['nota', 'La primera fila es la empresa analizada (calculada con sus propios datos). Los estadísticos excluyen a la empresa.'],
      ['tabla', 'calc.comparables.estadisticos', [['Estadístico', 'estadistico', '', 1.4], ['EV/Vtas', 'ev_ventas', 'x', 0.8, 'd'], ['EV/EBITDA LTM', 'ev_ebitda_ltm', 'x', 0.9, 'd'], ['EV/EBITDA NTM', 'ev_ebitda_ntm', 'x', 0.9, 'd'], ['PER NTM', 'per_ntm', 'x', 0.8, 'd'], ['Crec.', 'crecimiento_pct', '+pct', 0.8, 'd'], ['M. EBITDA', 'margen_ebitda_pct', 'pct', 0.9, 'd'], ['ROIC', 'roic_pct', 'pct', 0.8, 'd']]],
      sub('Valor implícito por acción', 'calc.comparables.implicito', [['tabla', 'calc.comparables.implicito', [['Múltiplo aplicado', 'metodo', '', 2.2], ['Métrica de la empresa', 'metrica_empresa', '', 1, 'd'], ['Múltiplo p25 / mediana / p75', 'multiplos', '', 1.6, 'd'], ['Valor p25', 'valor_p25', '2', 0.9, 'd'], ['Valor mediana', 'valor_mediana', '2', 0.9, 'd'], ['Valor p75', 'valor_p75', '2', 0.9, 'd'], ['Potencial', 'potencial_pct', '+pct', 0.9, 'd']]]]),
      ['grafico', 'comps_ev'],
      ['grafico', 'comps_mapa'],
      ['texto', 'calc.comparables.regresion.texto'],
      ['texto', 'comparables.comentario'],
    ]],

    ['seccion', '19. Transacciones precedentes', 'transacciones', 'Complemento', [
      ['tabla', 'transacciones.operaciones', [['Fecha', 'fecha', '', 0.8], ['Objetivo', 'objetivo', '', 1.7], ['Comprador', 'comprador', '', 1.6], ['EV (M)', 'ev', '0', 0.8, 'd'], ['EV/Ventas', 'ev_ventas', 'x2', 0.8, 'd'], ['EV/EBITDA', 'ev_ebitda', 'x', 0.8, 'd'], ['Prima', 'prima_pct', 'pct0', 0.7, 'd'], ['Comentario', 'comentario', '', 2]]],
      ['kv', [
        ['EV/EBITDA mediano (p25 – p75)', '{{calc.transacciones.mediana_ev_ebitda|x}} ({{calc.transacciones.p25_ev_ebitda|x}} – {{calc.transacciones.p75_ev_ebitda|x}})'], ['Prima de control mediana', '{{calc.transacciones.prima_mediana_pct|pct0}}'],
        ['Valor por acción implícito (mediana de {{calc.transacciones.metrica}})', '{{calc.transacciones.valor_mediana|2}}'], ['Rango p25 – p75', '{{calc.transacciones.valor_p25|2}} – {{calc.transacciones.valor_p75|2}}'],
      ]],
      ['grafico', 'transacciones'],
      ['texto', 'transacciones.comentario'],
    ]],

    ['seccion', '20. Descuento de flujos de caja (DCF)', 'dcf,calc.dcf', 'Núcleo', [
      sub('Supuestos y su justificación', 'dcf.justificacion', [
        etiquetado('Crecimiento de ingresos.', 'dcf.justificacion.crecimiento'),
        etiquetado('Márgenes.', 'dcf.justificacion.margenes'),
        etiquetado('Inversión y circulante.', 'dcf.justificacion.inversion'),
        etiquetado('Coste del capital.', 'dcf.justificacion.wacc'),
        etiquetado('Valor terminal.', 'dcf.justificacion.terminal'),
      ]),
      sub('Coste medio ponderado del capital', 'calc.dcf.wacc_tabla', [['tabla', 'calc.dcf.wacc_tabla', [['Componente', 'concepto', '', 4], ['Valor', 'valor', '', 1.2, 'd']]]]),
      sub('Proyección', 'calc.dcf.proyeccion', [
        ['tabla', 'calc.dcf.proyeccion', [
          ['Año', 'periodo', '', 0.75], ['Ingresos', 'ingresos', '0', 0.9, 'd'], ['Crec.', 'crecimiento_pct', 'pct', 0.7, 'd'], ['EBITDA', 'ebitda', '0', 0.85, 'd'], ['M. EBITDA', 'margen_ebitda_pct', 'pct', 0.8, 'd'],
          ['Amort.', 'amortizacion', '0', 0.75, 'd'], ['Impuestos', 'impuestos', '0', 0.8, 'd'], ['Capex', 'capex', '0', 0.75, 'd'], ['Δ Circ.', 'variacion_circulante', '0', 0.7, 'd'], ['FCFF', 'fcff', '0', 0.8, 'd'], ['Fracción', 'fraccion', '2', 0.7, 'd'], ['VA', 'vp', '0', 0.75, 'd']]],
        ['nota', 'FCFF = EBIT × (1 − t) + amortizaciones − capex − variación del circulante. «Fracción» es la parte del ejercicio que queda por delante desde la fecha de valoración; VA, el valor actual.'],
        ['grafico', 'dcf_fcff'],
      ]),
      sub('Etapa de transición (DCF en tres etapas)', 'calc.dcf.etapa2', [
        ['p', '{{calc.dcf.etapa2_texto}}'],
        ['tabla', 'calc.dcf.etapa2.filas', [['Año', 'periodo', '', 0.8], ['Ingresos', 'ingresos', '0', 1, 'd'], ['Crec.', 'crecimiento_pct', 'pct', 0.8, 'd'], ['M. EBITDA', 'margen_ebitda_pct', 'pct', 0.9, 'd'], ['Capex', 'capex', '0', 0.9, 'd'], ['FCFF', 'fcff', '0', 0.9, 'd'], ['Factor', 'factor', '3', 0.8, 'd'], ['VA', 'vp', '0', 0.9, 'd']]],
        ['nota', 'Entre la proyección explícita y el valor terminal, el crecimiento baja en línea recta hasta el terminal; el margen y los ratios son los del último año explícito, y la inversión neta (capex − amortización) se reduce en proporción al crecimiento.'],
        etiquetado('Por qué el crecimiento dura más allá de la proyección.', 'dcf.etapa2.justificacion'),
      ]),
      sub('Valor terminal', 'calc.dcf.terminal_tabla', [['tabla', 'calc.dcf.terminal_tabla', [['Concepto', 'concepto', '', 4], ['Valor', 'valor', '', 1.4, 'd']]]]),
      sub('Del valor empresa al valor por acción', 'calc.dcf.puente', [['tabla', 'calc.dcf.puente', [['Concepto', 'concepto', '', 4], ['Importe', 'valor', '', 1.4, 'd']]], ['grafico', 'dcf_composicion']]),
      sub('Sensibilidad: WACC × {{calc.dcf.sensibilidad.eje_columnas}}', 'calc.dcf.sensibilidad', [['tabla', 'calc.dcf.sensibilidad.filas', [['WACC', 'wacc', '', 1], ['{{calc.dcf.sensibilidad.columnas[0]}}', 'v0', '2', 1, 'd'], ['{{calc.dcf.sensibilidad.columnas[1]}}', 'v1', '2', 1, 'd'], ['{{calc.dcf.sensibilidad.columnas[2]}}', 'v2', '2', 1, 'd'], ['{{calc.dcf.sensibilidad.columnas[3]}}', 'v3', '2', 1, 'd'], ['{{calc.dcf.sensibilidad.columnas[4]}}', 'v4', '2', 1, 'd']]]]),
      sub('Sensibilidad: margen EBITDA × crecimiento de ingresos (desplazamiento de toda la proyección)', 'calc.dcf.sensibilidad2', [['tabla', 'calc.dcf.sensibilidad2.filas', [['Margen \\ crec.', 'margen', '', 1], ['{{calc.dcf.sensibilidad2.columnas[0]}}', 'v0', '2', 1, 'd'], ['{{calc.dcf.sensibilidad2.columnas[1]}}', 'v1', '2', 1, 'd'], ['{{calc.dcf.sensibilidad2.columnas[2]}}', 'v2', '2', 1, 'd'], ['{{calc.dcf.sensibilidad2.columnas[3]}}', 'v3', '2', 1, 'd'], ['{{calc.dcf.sensibilidad2.columnas[4]}}', 'v4', '2', 1, 'd']]]]),
      sub('¿Puede la empresa sostener el crecimiento previsto?', 'calc.dcf.sostenibilidad,dcf.sostenibilidad', [
        ['p', '**Veredicto: {{dcf.sostenibilidad.veredicto}}.**'],
        ['tabla', 'calc.dcf.sostenibilidad.tabla', [['Prueba', 'concepto', '', 4], ['Valor', 'valor', '', 1.8, 'd']]],
        ['texto', 'calc.dcf.sostenibilidad.texto'],
        ['tabla', 'calc.dcf.sostenibilidad.puente', [['Año', 'periodo', '', 0.8], ['Volumen', 'volumen_pct', '+pct', 0.8, 'd'], ['Precio', 'precio_pct', '+pct', 0.8, 'd'], ['Otros (mezcla, compras)', 'otros_pct', '+pct', 1, 'd'], ['Crecimiento', 'crecimiento_pct', '+pct', 0.9, 'd'], ['De dónde sale', 'comentario', '', 3.2]]],
        ['texto', 'dcf.sostenibilidad.justificacion'],
      ]),
      sub('DCF inverso: qué descuenta el precio actual', 'calc.dcf.inverso,dcf.lectura', [
        ['kv', [
          ['Crecimiento anual implícito en el precio ({{calc.dcf.inverso.periodo}})', '{{calc.dcf.inverso.crecimiento_implicito_pct|pct}} (base: {{calc.dcf.inverso.crecimiento_base_pct|pct}})'],
          ['Margen EBITDA final implícito', '{{calc.dcf.inverso.margen_implicito_pct|pct}}{{calc.dcf.inverso.margen_implicito_texto|opc}} (base: {{calc.dcf.inverso.margen_base_pct|pct}})'],
          ['Rentabilidad anual implícita (TIR al precio actual)', '{{calc.dcf.inverso.rentabilidad_implicita_pct|pct}} (WACC: {{calc.dcf.wacc|pct}})'],
        ], 1],
        ['texto', 'dcf.lectura'],
      ]),
    ]],

    ['seccion', '21. Escenarios', 'escenarios', 'Núcleo', [
      ['tabla', 'calc.escenarios', [['Escenario', 'escenario', '', 1], ['Prob.', 'probabilidad_pct', 'pct0', 0.6, 'd'], ['Crec. medio', 'crecimiento_medio_pct', 'pct', 0.8, 'd'], ['Margen final', 'margen_final_pct', 'pct', 0.8, 'd'], ['WACC', 'wacc_pct', 'pct', 0.7, 'd'], ['Valor', 'valor', '2', 0.8, 'd'], ['Potencial', 'potencial_pct', '+pct', 0.8, 'd'], ['Qué tiene que ocurrir', 'narrativa', '', 3.4]]],
      ['grafico', 'escenarios'],
      ['p', '**Valor ponderado por probabilidad:** {{calc.valor_ponderado|2}} {{meta.divisa}} ({{calc.potencial_ponderado_pct|+pct}}).'],
      ['texto', 'escenarios.comentario'],
    ]],

    ['seccion', '22. Suma de partes', 'suma_partes', 'Complemento', [
      ['texto', 'suma_partes.comentario'],
      ['tabla', 'calc.suma_partes.partes', [['Negocio', 'segmento', '', 2], ['Métrica', 'metrica', '', 1.6], ['Valor de la métrica', 'valor_metrica', '0', 1, 'd'], ['Múltiplo', 'multiplo', 'x', 0.8, 'd'], ['Valor empresa', 'ev', '0', 1, 'd'], ['Justificación del múltiplo', 'justificacion', '', 3]]],
      ['p', '**Valor por acción por suma de partes:** {{calc.suma_partes.valor_accion|2}} ({{calc.suma_partes.potencial_pct|+pct}}); con ±1x en los múltiplos, {{calc.suma_partes.valor_min|2}} – {{calc.suma_partes.valor_max|2}}.'],
    ]],

    ['seccion', '23. Síntesis de valoración', 'valoracion,calc.sintesis.rangos', 'Núcleo', [
      ['grafico', 'sintesis'],
      ['tabla', 'calc.sintesis.rangos', [['Método', 'metodo', '', 3], ['Mínimo', 'min', '2', 1, 'd'], ['Central', 'central', '2', 1, 'd'], ['Máximo', 'max', '2', 1, 'd']]],
      ['tabla', 'calc.sintesis.tabla', [['Método', 'metodo', '', 3], ['Valor por acción', 'valor', '2', 1.2, 'd'], ['Potencial', 'potencial_pct', '+pct', 1, 'd'], ['Peso', 'peso_pct', 'pct0', 0.8, 'd']]],
      ['p', '**Valor intrínseco ponderado (largo plazo):** {{calc.sintesis.valor_objetivo|2}} {{meta.divisa}} ({{calc.sintesis.potencial_pct|+pct}} sobre {{identificacion.precio|2}}).'],
      ['texto', 'valoracion.comentario'],
      ['sub', 'Objetivo a 12 meses: nuestro PER × nuestro BPA', 'calc.recomendacion.objetivo_12m.filas', [
        ['tabla', 'calc.recomendacion.objetivo_12m.filas', [['Escenario', 'escenario', '', 1], ['BPA', 'beneficio_por_accion', '2', 0.8, 'd'], ['PER', 'multiplo', 'x', 0.7, 'd'], ['De dónde sale el PER', 'origen', '', 2.6], ['Precio', 'precio', '2', 0.9, 'd'], ['Rentabilidad', 'rentabilidad_pct', '+pct', 1, 'd']]],
        ['p', '**Objetivo a 12 meses (ponderado):** {{calc.recomendacion.objetivo_12m_txt}} · rentabilidad {{calc.recomendacion.rentabilidad_12m_txt}} · señal {{calc.recomendacion.objetivo_12m.senal}}.'],
        ['p', '{{calc.recomendacion.objetivo_12m.comparacion_txt|opc}}'],
        etiquetado('Frente al consenso (solo contraste).', 'valoracion.objetivo_12m.diferencia_consenso'),
        etiquetado('Del valor intrínseco al objetivo a 12 meses.', 'valoracion.objetivo_12m.comentario'),
      ]],
    ]],

    // ───────── Parte V ─────────
    ['parte', 'Parte V — Tesis, riesgos y seguimiento'],
    ['seccion', '24. Catalizadores', 'catalizadores', 'Complemento', [
      ['tabla', 'catalizadores.items', [['Fecha', 'fecha', '', 1], ['Evento', 'evento', '', 2.6], ['Qué se sabrá', 'efecto', '', 3], ['Prob.', 'probabilidad', '', 0.7, 'c'], ['Sentido', 'sentido', '', 0.8, 'c']]],
    ]],

    ['seccion', '25. Riesgos y pre-mortem', 'riesgos', 'Núcleo', [
      ['tabla', 'riesgos.items', [['Riesgo', 'riesgo', '', 2], ['Tipo', 'tipo', '', 0.9], ['Prob.', 'probabilidad', '', 0.6, 'c'], ['Impacto', 'impacto', '', 0.7, 'c'], ['Efecto en valor', 'efecto_valor', '', 1, 'c'], ['Mitigante', 'mitigante', '', 1.8], ['Señal de alerta', 'senal', '', 1.8]], { numerar: true }],
      sub('Pre-mortem', 'riesgos.premortem'),
    ]],

    ['seccion', '26. ESG y controversias', 'esg', 'Complemento', [
      ['tabla', 'esg.calificaciones', [['Proveedor', 'agencia', '', 2], ['Calificación', 'calificacion', '', 2], ['Fecha', 'fecha', '', 1]]],
      sub('Asuntos materiales', 'esg.materialidad'),
      sub('Controversias', 'esg.controversias'),
    ]],

    ['seccion', '27. Preguntas abiertas para la dirección y la due diligence', 'preguntas', 'Complemento', [
      ['tabla', 'preguntas.items', [['Tema', 'tema', '', 1.3], ['Pregunta', 'pregunta', '', 3.6], ['Por qué importa', 'por_que', '', 2.6]], { numerar: true }],
    ]],

    ['seccion', '28. Sentimiento en foros y comentarios', 'sentimiento', 'Complemento', [
      ['p', '**Tono:** {{sentimiento.tono}} · **Tendencia:** {{sentimiento.tendencia}}'],
      ['tabla', 'sentimiento.revisadas', [['Dónde', 'plataforma', '', 1.8], ['Fecha', 'fecha', '', 0.8], ['Comentarios', 'n_comentarios', '0', 0.9, 'd'], ['Tono', 'tono', '', 0.9, 'c'], ['Qué se dice', 'resumen', '', 3.6]]],
      ['tabla', 'sentimiento.temas', [['Tema', 'tema', '', 1.6], ['Postura', 'postura', '', 0.9, 'c'], ['Peso', 'peso', '', 0.7, 'c'], ['Qué dicen los datos', 'contraste', '', 3.8]]],
      ['texto', 'sentimiento.lectura'],
      ['nota', 'Opiniones de inversores en foros, redes y comentarios de prensa: sirven para saber qué preocupa o entusiasma al mercado, no como fuente de cifras. No entran en la valoración.'],
    ]],

    // ───────── Anexos ─────────
    ['parte', 'Anexos'],
    ['h1', 'A. Controles de calidad del análisis'],
    ['p', '{{calc.controles_resumen}}. Fuentes: {{calc.fuentes.n_fuentes|0}} ({{calc.fuentes.n_primarias|0}} primarias); citas distintas en el texto: {{calc.fuentes.n_citadas|0}}.'],
    ['tabla', 'calc.controles', [['Control', 'control', '', 3.2], ['Resultado', 'resultado', '', 0.9, 'c'], ['Detalle', 'detalle', '', 3.6]]],
    ['tabla', 'calc.fuentes.por_tipo', [['Tipo de fuente', 'tipo', '', 3], ['Número', 'num', '0', 1, 'd']]],
    ['sub', 'B. Información no disponible', '_omitidos,meta.huecos', [
      ['p', 'Cuando un dato no aparece tras tres búsquedas distintas, el análisis lo deja fuera en lugar de estimarlo sin base. Las secciones de núcleo que faltan se avisan también en el resumen.'],
      ['tabla', '_omitidos', [['Sección no incluida', 'seccion', '', 4], ['Tipo', 'tipo', '', 1.2, 'c']]],
      ['tabla', 'meta.huecos', [['Sección', 'seccion', '', 1.4], ['Dato que falta', 'campo', '', 1.8], ['Tipo', 'tipo', '', 0.9, 'c'], ['Las tres búsquedas', 'intentos', '', 3.4], ['Decisión', 'decision', '', 1.2]]],
    ]],
  ],
};
