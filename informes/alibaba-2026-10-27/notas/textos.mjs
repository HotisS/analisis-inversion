// Textos del analista (Alibaba, corte 2026-10-27). Citas con la letra de la nota; [P1] = fuentes propias.
export default {
  limitaciones: 'Iteración nueva (la anterior es del 14-oct, hecha con extractos de búsqueda y confianza baja). Esta vez la red estaba abierta: cuentas del XBRL de la SEC (herramientas/cuentas.mjs) contrastadas con los 20-F de FY2020, FY2023 y FY2026 y los comunicados anuales y trimestrales de la empresa [A1-A18]. Cuentas en RMB (US GAAP), ejercicio cerrado en marzo (FY2026 = abril de 2025 a marzo de 2026). La línea cotizada es el ADS de Nueva York (BABA, USD): 1 ADS = 8 acciones de Hong Kong (9988.HK). Todo va por ADS y en RMB: precio de 100,25 USD (cierre del 26-oct) × 6,6681 RMB por dólar (BCE cruzado, 26-oct [D4]) = 668,48 RMB. ADS diluidos: 2.438,3 M (estimación de la nota D con la colocación de agosto). Corrección del informe anterior: la historia del PER y los escenarios van ahora en la MISMA base, el BPA no GAAP diluido por ADS que publica la empresa (el del 14-oct mezclaba publicado y ajustado). El ejercicio de la regla a 12 meses es FY2029e (el primero que cierra más de 18 meses después del corte; el 14-oct se usó FY2028e por error).',

  controles_explicados: [
    { control: 'BAI − impuestos − minoritarios = beneficio neto', explicacion: 'En US GAAP Alibaba presenta el resultado de las participadas por el método de la participación (Ant Group y otras) DESPUÉS del impuesto, así que BAI − impuestos − minoritarios no cuadra con el beneficio atribuido por esa partida (−5.097 M en FY2026); no es un error de datos [A1].' },
    { control: 'EBITDA del consenso en la base de las cuentas', explicacion: 'No hay consenso de EBITDA (solo BPA no GAAP y ventas [D2, D3]): los múltiplos de los próximos 12 meses no se usan; la valoración por comparables va solo por PER.' },
    { control: 'Rendimiento del capital nuevo de la proyección ≤ 1,25 × el histórico', explicacion: 'El ROIC de FY2026 (4,6 %) es el de un año de inversión extraordinaria en comercio rápido y captación de usuarios de Qwen, y el capital invertido del motor incluye ≈ 657.000 M RMB de participadas y valores que no dan EBIT [A1]. Casi todo el aumento del NOPAT proyectado es la vuelta del margen hacia el de FY2024-25 (EBITDA recurrente 16,8-18,4 %), no rendimiento del capital nuevo. Aun así rebajamos un punto el crecimiento de todos los años y el margen final se queda en el 19 % (el 14-oct suponía 21 %). Veredicto «En parte».' },
    { control: 'Compra robusta (v3 y v2 dan Comprar)', explicacion: 'La regla vigente da Mantener (+9,0 %), no Comprar; la v2 de control da −2,7 %. No hay compra.' },
    { control: 'Sin doble prima país (bono local + prima país)', explicacion: 'La prima adicional del 2,0 % no es prima país completa: ≈ 0,3 puntos (un tercio de la de China, lo que el bono local no recoge) y 1,7 puntos de riesgo propio del ADS: estructura VIE (el inversor posee una sociedad de las Islas Caimán con contratos sobre las chinas) y la inclusión en la lista 1260H del Pentágono en junio de 2026 [C1, C9].' },
    { control: 'Tres búsquedas registradas (sentimiento · Xueqiu (雪球))', explicacion: 'Xueqiu bloquea el acceso automático (cortafuegos de Aliyun); se sustituyó por Guba de Eastmoney y LIHKG [E2, E3, E7].' },
    { control: 'Tres búsquedas registradas (sentimiento · Fallo judicial del 27-oct contra la lista 1260H y noticia de Cohere sobre Qwen)', explicacion: 'El fallo se comprobó en la integración: el 26-oct un juez federal de San José prohibió aplicar la regla que veta al Pentágono contratar con quien haga «lobby» para Alibaba; Alibaba sigue en la lista 1260H [P1]. La noticia de Cohere no se usa.' },
  ],

  secciones: {
    trimestres: {
      ultima_presentacion: 'En la conferencia del 1T FY2027 (20-ago-2026) la dirección volvió a poner la IA y el comercio rápido por delante del margen: el plan de 380.000 M RMB en tres años «se quedará corto», la nube crece un 45 % con margen EBITA del 12 % y los productos de IA llevan doce trimestres creciendo a tres cifras [A3, A15]. El BPA no GAAP (8,52 RMB por ADS) cayó un 42 % y el flujo libre fue de −44.670 M; el segmento de laboratorios y aplicaciones de IA perdió 13.861 M de EBITA en el trimestre [A3]. Desde este trimestre las subvenciones a comercios restan ingreso: el CMR cae un 7 % publicado y sube un 1 % comparable [A3, B2]. Tres días después la empresa colocó acciones nuevas por 80.000 M HKD [C8].',
    },
    consenso: {
      guidance: 'La empresa no da guía anual desde mayo de 2022 [C14]. Mensajes vigentes: inversión en IA y nube superior a los 380.000 M RMB comprometidos para 2026-29, comercio rápido rentable en FY2029 y nube con margen creciente [A15, A16]. Última confirmación: 20-ago-2026.',
      base_ebitda: 'NIIF',
    },
    comparables: {
      comentario: 'La mediana del PER de los próximos 12 meses es de 13,3x (10,9x solo las chinas: PDD 6,5x, JD 6,5x, Tencent 10,9x, Baidu 11,5x, Meituan 17,4x; Amazon 22,8x, MercadoLibre 31,6x, Sea 15,1x) [D18]. Alibaba cotiza a 16,4x nuestro BPA no GAAP de FY2027e (15,0x el del consenso): por encima de las chinas por la nube, que crece al 45 %, y por debajo de Amazon. Usamos la mediana con peso del 20 %; no hay EBITDA homogéneo de los comparables.',
    },
  },

  parches: [
    { ruta: 'meta.huecos[3].decision', valor: 'Omitido: sin rating público verificado ni vida media de la deuda en el 20-F' },
    { ruta: 'bolsa.contexto.noticias', valor: [
      { fecha: '2026-10-26', tipo: 'demanda o regulador', hecho: 'Un juez federal de San José prohíbe aplicar la regla que veta al Pentágono contratar con empresas que hagan «lobby» para Alibaba; la empresa sigue en la lista 1260H, que recurre aparte. El ADS baja un 1,3 % antes de la apertura del 27-oct [P1].', veredicto: 'no cambia', condicion: null },
      { fecha: '2026-09-22', tipo: 'ampliación o convertible', hecho: 'La junta aprueba el mandato general para emitir hasta el 10 % del capital y recomprar otro 10 % [C3]. Habitual en Hong Kong, pero tras la colocación de agosto deja abierta otra emisión.', veredicto: 'no cambia', condicion: null },
      { fecha: '2026-08-26', tipo: 'ampliación o convertible', hecho: 'Cierre de la colocación de 710 M de acciones nuevas a 112,70 HKD (80.000 M HKD; ≈ 3,6 % del capital) para centros de datos de IA [C7, D11].', veredicto: 'no cambia', condicion: null },
      { fecha: '2026-08-20', tipo: 'resultados', hecho: '1T FY2027: BPA no GAAP 8,52 RMB por ADS (−42 %), flujo libre −44.670 M, capex 67.678 M (+75 %) [A3].', veredicto: 'no cambia', condicion: null },
      { fecha: '2026-08', tipo: 'directivos', hecho: 'Joe Tsai y Eddie Wu compran ≈ 25,7 M USD en acciones; el presidente Evans y Jane Jiang venden ≈ 8,5 y 12 M USD (jun y sep) [C6].', veredicto: 'no cambia', condicion: null },
      { fecha: '2026-06-09', tipo: 'demanda o regulador', hecho: 'Inclusión en la lista 1260H del Pentágono (empresas ligadas al ejército chino) y demanda colectiva en Nueva York (caso 1:26-cv-06654) [C9, C10].', veredicto: 'no cambia', condicion: null },
    ] },
    { ruta: 'bolsa.contexto.comentario', valor: 'El ADS cae un 41,7 % en doce meses, un 24,4 % en seis y un 8,6 % en el último mes, un 21 % por debajo de su media de 200 sesiones (tendencia bajista) [D1]. Los golpes documentados: la inclusión en la lista 1260H en junio, unos resultados del 1T FY2027 con el BPA no GAAP un 42 % por debajo y la colocación de 80.000 M HKD en agosto [A3, C7, C9]. El fallo del 26-oct no saca a Alibaba de la lista. No hay colocación anunciada, pero el mandato del 10 % la permite. Los resultados del 2T FY2027 se esperan hacia el 24-nov (fecha estimada, sin confirmar) [P2]: a más de 15 días, el contexto no obliga a esperar. Veredicto: no cambia (no hay compra que retrasar).' },
    { ruta: 'bolsa.contexto.proximos_resultados', valor: '2026-11-24' },
  ],

  dcf_justificacion: {
    crecimiento: 'Crecimiento del 8 % en FY2027 y del 9 % en FY2028-29, bajando al 3,5 % en FY2034. El 1T FY2027 creció un 9 % con la nube al +45 % y el comercio rápido al +45 %, y el comercio electrónico chino a la baja por las subvenciones contabilizadas como menor ingreso [A3]. El consenso es más alto (+9,5 %, +12,6 % y +14,3 % en FY2027-29 [D2, D3]). Rebajamos un punto todos los años frente al primer cálculo porque la prueba de sostenibilidad no pasa. Mercado: ventas en línea de bienes físicos en China +3,8 % en 2026 y nube china +26 % [B5, B12].',
    margenes: 'Margen EBITDA (después de pagos en acciones, sin deterioros) del 9,8 % en FY2026; sube al 15 % en FY2027, 17 % en FY2028, 18 % en FY2029 y se queda en el 19 %. En FY2024-25 fue del 16,8-18,4 % en la misma base [A1, A7]. No suponemos más: la nube tiene un margen EBITA del 12 % (Taobao/Tmall rondaba el 40 % antes de la guerra de subvenciones) y el comercio rápido no gana dinero hasta FY2029 según la empresa [A3, A16].',
    inversion: 'Capex del 22 % de las ventas en FY2027 (el 1T ya llevó 67.678 M, el 25 % de sus ventas [A3]), 16 % en FY2028, 12 % en FY2029 y 7 % al final, por encima de una amortización que sube del 3,9 % de FY2026 al 7,5 % por los servidores de IA. Circulante negativo (−29,8 % de las ventas en FY2026 por los cobros antes de pagar a comercios [A1]) que converge a −25 %.',
    wacc: 'Flujos en RMB: tasa libre del bono chino a 10 años, 1,63 % (ChinaBond, 27-oct [D6]); beta 1,0 (semanal de 2 y 5 años 0,94-1,00 [D1]); prima de mercado del 5,5 %; prima adicional del 2,0 % (0,3 de país que el bono local no recoge + 1,7 de VIE y lista 1260H). Coste de los fondos propios del 9,13 %, deuda al 3 % con peso del 12 %: WACC del 8,32 %. Con la prima implícita del mercado (4,2 % [D19]), el WACC baja al 7,2 %.',
    terminal: 'Gordon con crecimiento del 1,1 %, por debajo de la tasa libre menos medio punto, como pide la coherencia de divisa, y en línea con la inflación esperada en China. El valor terminal pesa un 72 %; implica 8x el EBITDA.',
  },
  puente_comentarios: {
    'FY2027e': 'Volumen: nube (+45 %) y comercio rápido (+45 %) [A3]; precio: subidas de la nube; el comercio electrónico chino, casi plano por las subvenciones.',
    'FY2028e': 'La nube sigue por encima del 25 % (mercado +26 % [B12]); el comercio electrónico con el consumo (≈ +4 % [B5]).',
    'FY2029e': 'Igual; el comercio rápido deja de subvencionar (rentable en FY2029 según la empresa [A16]).',
    'FY2030e': 'Nube más madura y comercio electrónico con el consumo chino.',
    'FY2031e': 'Convergencia al crecimiento nominal de China más la nube.',
  },
  veredicto: 'En parte',
  sostenibilidad_justificacion: 'En parte. Taobao y Tmall siguen teniendo efectos de red (31 % del volumen de comercio electrónico chino frente a 24 % de Douyin y 19 % de PDD, estimación de Goldman [B16]) y la nube es la primera de China con un 37 % de cuota [B12]. Pero la prueba del motor falla: con el ROIC de FY2026 (4,6 %) la reinversión solo financia un 1,4 % de crecimiento frente al 6,4 % proyectado. Ese ROIC es el de un año de inversión extraordinaria y el capital del motor incluye ≈ 657.000 M de participadas y valores; casi todo el aumento del beneficio es recuperación de margen. Rebajamos un punto el crecimiento de todos los años y el margen final al 19 %. El ROIC sigue por debajo del WACC hasta que la IA rinda.',
  dcf_lectura: 'El DCF da 1.040,90 RMB por ADS (156,10 USD), un 55,7 % sobre el precio, con un WACC del 8,32 % y un valor terminal del 72 %. El DCF inverso dice que el precio descuenta un crecimiento de solo el 0,1 % anual en FY2027-34 con nuestro margen del 19 %, o un margen del 13,6 % con nuestro crecimiento: el mercado no paga casi nada por la recuperación. Pesa mucho el puente: 474.505 M de caja y tesorería, 457.417 M de participadas y valores (Ant Group incluida) a valor contable y 266.530 M de deuda [D8, D9]; no recoge la caja consumida en julio-septiembre (con el capex del 1T, ≈ 17-20 RMB por ADS menos). La duda no es el crecimiento sino el margen y la caja libre, hoy negativa.',
  narrativas: {
    Bajista: 'La guerra del comercio rápido dura más allá de FY2029, PDD y Douyin siguen quitando cuota, la nube crece con márgenes bajos por Huawei y ByteDance, y la tensión con EE. UU. (lista 1260H) sube la prima de riesgo: 3 puntos menos de crecimiento y de margen y 1 punto más de WACC. Ya pasó en 2021-22.',
    Base: 'La nube y el comercio rápido crecen al 25-45 % dos años, el comercio rápido deja de perder en FY2029 y el margen EBITDA vuelve al 19 % con el capex en el 7 % de las ventas.',
    Alcista: 'La IA de Alibaba (Qwen, chips propios) gana cuota y precio en la nube, el comercio rápido se consolida antes y el consumo chino se recupera con estímulos: 2 puntos más de crecimiento y de margen.',
  },
  escenarios_comentario: 'En el DCF, el bajista pierde un 8,6 % y el alcista gana un 102,9 %: asimetría muy favorable a largo plazo, porque la caja y las participadas sostienen el suelo. A 12 meses es al revés: con la regla común de múltiplos el bajista pierde un 57 % (8,0x, el mínimo de FY2024) y la ponderada solo da +9,0 %. La diferencia entre las dos lecturas es el múltiplo que el mercado pagará en un año.',
  suma_partes_comentario: 'No se hace: solo hay dos ejercicios de segmentos en la estructura del 20-F y la de este año cambió otra vez [A1, A3]. Ant Group (33 %) y los valores estratégicos van a valor contable en el puente.',
  j12: {
    Bajista: 'Ventas FY2029 de ≈ 1.207.700 M (+5-6 % anual) y margen EBITDA del 16 %: EBITA ajustado ≈ 110.000 M (EBITDA − amortización del 7,2 % + ≈ 16.000 M de pagos en acciones e intangibles), beneficio no GAAP = 0,8 × EBITA ajustado y 2.450 M de ADS.',
    Base: 'Ventas FY2029 de 1.313.520 M (+8-9 % anual) y margen EBITDA del 18 %: EBITA ajustado ≈ 159.000 M, beneficio no GAAP = 0,8 × EBITA ajustado (0,75 en el 1T FY2027 y 0,84 en FY2026 [A]) y 2.450 M de ADS.',
    Alcista: 'Ventas FY2029 de ≈ 1.387.400 M (+10-11 % anual) y margen EBITDA del 20 %: EBITA ajustado ≈ 195.000 M, 0,8 × y 2.450 M de ADS.',
  },
  excluidos: 'Historia adelantada en BPA no GAAP diluido por ADS de la empresa, la misma base que los escenarios [A2, A7-A12, D15-D17]: precio de cierre de marzo (en RMB [D5]) ÷ BPA no GAAP del ejercicio siguiente. FY2018 30,1x; FY2019 23,1x; FY2020 21,1x; FY2021 28,2x; FY2022 12,6x; FY2023 11,3x; FY2024 8,0x; FY2026 21,3x (sobre nuestro FY2027e de 40,7). Excluido FY2025 (35,8x sobre el BPA de FY2026, hundido por el comercio rápido: atípico). Actual = 668,48 ÷ 40,7 (nuestro FY2027e) = 16,4x. Control v2 (al cierre, mismo BPA): mediana FY2022-25 13,0x, mínimo 8,4x.',
  diferencia_consenso: 'Nuestro BPA no GAAP queda por debajo del consenso: FY2027e 40,7 frente a 44,45 RMB (−8 %) y FY2028e 46,8 frente a 62,05 (−25 %) [D2]. La diferencia es la amortización: suponemos que el capex de IA (≈ 243.000 M en FY2027) se amortiza en 5-6 años y sube la amortización del 3,9 % al 7,5 % de las ventas, y un margen final del 19 %. El objetivo medio de 41 analistas (1.242 RMB, 186 USD) equivale a ≈ 20x el BPA de FY2028e del consenso; la regla común no paga más de ≈ 15x porque la historia limpia FY2022-24 está en 8-13x.',
  objetivo12m_comentario: 'El valor intrínseco (958,16 RMB, 143,69 USD) queda un 33 % por encima del objetivo a 12 meses ponderado (721,10 RMB, 108,14 USD). El DCF dice que la acción está barata si el margen vuelve; la regla a 12 meses, que en un año el mercado probablemente no pagará más de 15x a un grupo con caja libre negativa, dilución y riesgo 1260H. Catalizadores: 2T FY2027 (≈ 24-nov) y 3T FY2027 (feb-2027), que deberían mostrar el suelo del EBITA.',
  valoracion_comentario: 'DCF 50 %, escenarios 30 % y comparables 20 %. El DCF es el método más útil porque el beneficio de hoy no es representativo, pero depende de un margen que aún no se ve (19 %). Los comparables (solo PER) dan 535-1.023 RMB. El valor intrínseco ponderado es de 958,16 RMB (143,69 USD), +43,3 %; con la prima implícita del mercado, 1.089,25 RMB. Puente de la nota D a 30-jun-2026: la caja y tesorería líquida que define la empresa, deuda con convertibles y canjeables, participadas y valores estratégicos a valor contable y la colocación de agosto [D8, D9, D11].',
  rentabilidad_comentario: 'Alibaba no crea valor hoy: el ROIC del motor fue del 13,9 % en FY2025 y del 4,6 % en FY2026 frente a un WACC del 8,32 % (−3,7 puntos); sin el fondo de comercio, 6,1 %. El capital invertido incluye ≈ 657.000 M de participadas y valores que no dan EBIT [A1]. Lo mueve el margen: el EBITA ajustado de comercio electrónico chino cayó un 44 % en FY2026 con ingresos del segmento +9 % [A2]. El ROIC incremental es negativo: el capex de IA y las subvenciones del comercio rápido han llegado al EBIT antes que el rendimiento.',
  catalizadores: {
    items: [
      { fecha: '≈ 24-nov-2026', evento: 'Resultados del 2T FY2027 (julio-septiembre; fecha estimada)', efecto: 'Primer trimestre tras la colocación; debe mostrar si el EBITA ajustado toca fondo', probabilidad: 'Alta', sentido: '+/−' },
      { fecha: '2026-27', evento: 'Recurso contra la inclusión en la lista 1260H', efecto: 'Salir de la lista bajaría la prima de riesgo del ADS', probabilidad: 'Media', sentido: '+' },
      { fecha: 'feb-2027', evento: 'Resultados del 3T FY2027 (Singles Day)', efecto: 'Crecimiento del CMR comparable y de la nube', probabilidad: 'Alta', sentido: '+/−' },
      { fecha: '2026-27', evento: 'Mandato de emisión del 10 % aprobado en septiembre', efecto: 'Otra colocación diluiría', probabilidad: 'Media', sentido: '−' },
      { fecha: 'may-2027', evento: 'Resultados FY2027 y dividendo', efecto: 'Caja libre del año y recompras', probabilidad: 'Alta', sentido: '+/−' },
    ],
    confianza: 'Media',
  },
  riesgos: {
    items: [
      { riesgo: 'La inversión en IA no rinde (> 380.000 M RMB)', tipo: 'Estratégico', probabilidad: 'Media', impacto: 'Alto', efecto_valor: '−41 % sobre el valor intrínseco (bajista del DCF frente al base)', mitigante: 'Nube +45 % con margen EBITA del 12 %', senal: 'Margen EBITA de la nube < 10 % o crecimiento < 25 %' },
      { riesgo: 'Guerra del comercio rápido más larga', tipo: 'Competencia', probabilidad: 'Media', impacto: 'Alto', efecto_valor: '−15 a −25 %', mitigante: 'Meituan vuelve al beneficio en el 2T26 y JD reduce pérdidas [B21, B19]', senal: 'EBITA de Alibaba E-commerce que no mejora en el 2T FY2027' },
      { riesgo: 'Geopolítica: lista 1260H, veto a inversores de EE. UU. o exclusión de la cotización', tipo: 'Regulatorio', probabilidad: 'Media', impacto: 'Alto', efecto_valor: '−20 a −40 % en el ADS', mitigante: 'Cotización primaria en Hong Kong; fallo favorable del 26-oct', senal: 'Ley u orden que afecte a los inversores en empresas 1260H' },
      { riesgo: 'Estructura VIE', tipo: 'Jurídico', probabilidad: 'Baja', impacto: 'Alto', efecto_valor: 'Hasta −100 %', mitigante: 'Aceptada de hecho por el regulador chino', senal: 'Cambios de la CSRC sobre VIE' },
      { riesgo: 'Pérdida de cuota frente a PDD y Douyin', tipo: 'Competencia', probabilidad: 'Media', impacto: 'Medio', efecto_valor: '−10 %', mitigante: 'Comisión del CMR y comercio rápido integrado en Taobao', senal: 'CMR comparable < 0 %' },
      { riesgo: 'Más dilución', tipo: 'Financiero', probabilidad: 'Media', impacto: 'Medio', efecto_valor: '−4 % por colocación', mitigante: 'Caja y tesorería de 474.505 M', senal: 'Uso del mandato del 10 % o convertibles nuevos' },
      { riesgo: 'Consumo chino débil', tipo: 'Macro', probabilidad: 'Media', impacto: 'Medio', efecto_valor: '−10 %', mitigante: 'Estímulos', senal: 'Ventas en línea < 3 % [B5]' },
    ],
    premortem: 'Octubre de 2029: el ADS cotiza a 60 USD. La nube creció, pero Huawei y ByteDance hundieron los precios de la IA y los centros de datos se amortizaron a un ritmo que se comió el beneficio: el margen EBITDA del grupo no pasó del 14 %. El comercio rápido no fue rentable en FY2029 y Taobao siguió perdiendo cuota frente a Douyin. La caja libre siguió negativa, la empresa usó el mandato del 10 % y en 2027 EE. UU. limitó la inversión en empresas de la lista 1260H. Las señales estaban en el 1T FY2027: −44.670 M de caja libre, −13.861 M de EBITA en IA y una colocación tres días después.',
    confianza: 'Media',
  },
  preguntas: {
    items: [
      { tema: 'Comercio rápido', pregunta: '¿Cuánto pierde hoy el comercio rápido por pedido y qué hipótesis hay detrás de la rentabilidad en FY2029?', por_que: 'Es la causa principal de la caída del EBITA de comercio electrónico (−44 % en FY2026).' },
      { tema: 'IA', pregunta: '¿Qué ingresos y margen de la nube supone el plan de inversión para pagarse en tres años, y cuánto más de 380.000 M RMB se invertirá?', por_que: 'Sin ese dato el capex es un acto de fe.' },
      { tema: 'Capital', pregunta: '¿Se usará el mandato de emisión del 10 %? ¿Cuándo vuelven las recompras (19.050 M USD sin usar)?', por_que: 'Dilución frente a devolución de caja.' },
      { tema: 'Ant Group', pregunta: '¿Qué plan hay para el 33 % de Ant (salida a bolsa, venta)?', por_que: 'Está a valor contable en el puente.' },
      { tema: 'Geopolítica', pregunta: '¿Qué pasa con el recurso contra la lista 1260H y con el ADS si EE. UU. limita a los inversores?', por_que: 'Riesgo binario sobre el ADS.' },
    ],
    confianza: 'Media',
  },
  fuentes: [
    { id: 1, titulo: 'Alibaba wins court ruling against Pentagon restriction, but BABA stock dips premarket anyway', editor: 'Stocktwits News', tipo: 'Prensa', fecha: '2026-10-27', url: 'https://stocktwits.com/news-articles/markets/equity/alibaba-wins-court-ruling-against-pentagon-restriction-but-baba-stock-dips-premarket-anyway/cZUeRiqRBzw' },
    { id: 2, titulo: 'Alibaba Group earnings September quarter 2026 (fecha estimada, sin confirmar)', editor: 'days.to', tipo: 'Agregador', fecha: '2026-10-27', url: 'https://days.to/alibaba-earnings' },
  ],
  huecos_resueltos: [
    { seccion: 'identificacion', campo: 'proximos_resultados' },
    { seccion: 'sentimiento', campo: 'Fallo judicial del 27-oct contra la lista 1260H y noticia de Cohere sobre Qwen' },
  ],
  huecos: [
    { seccion: 'valoracion', campo: 'valor de mercado de Ant Group y de los valores estratégicos', tipo: 'Complemento', intentos: '1) 20-F FY2026 (nota de inversiones); 2) prensa sobre la valoración de Ant; 3) cotizaciones de las participadas', decision: 'A valor contable en el puente' },
  ],
};
