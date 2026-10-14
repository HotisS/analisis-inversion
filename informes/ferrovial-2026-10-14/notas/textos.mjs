// Textos del analista (Ferrovial, corte 2026-10-14). Citas con la letra de la nota: [A3] = fuente 3 de A.json; [P1] = fuente propia.
export default {
  limitaciones: 'Análisis hecho desde la nube con la red limitada a la búsqueda web: la web de Ferrovial, la CNMV, la SEC y los proveedores de datos no se pudieron abrir, así que las cifras salen de extractos de búsqueda de las notas de resultados, del informe anual integrado y de la prensa financiera, cruzadas cuando fue posible; lo que no cuadró está en null y en los huecos. Confianza de los datos de núcleo: baja. Línea cotizada: Bolsa de Madrid/Euronext Ámsterdam en EUR (la del Nasdaq, en USD, no se usa). Precio: 45,11 EUR del 14-oct (Lang & Schwarz, citado por ad-hoc-news), no un cierre oficial de la Bolsa de Madrid. Cuentas NIIF-UE en EUR; EBITDA y EBIT ajustados de la empresa. La cuenta no separa resultado financiero, puesta en equivalencia, impuestos ni minoritarios. El balance solo tiene activo, pasivo, patrimonio y deuda neta consolidada (registrada como deuda con caja a 0). El 407 ETR (48,29 %) se valora en el puente al precio de la compra de 2025, con un EUR/CAD de ≈1,60 (estimación), y los minoritarios de las Managed Lanes a una estimación propia de valor de mercado.',

  controles_explicados: [
    { control: 'Objetivo 12 m frente al consenso', explicacion: 'Nuestro base (50,96 EUR) queda un 16,9 % por debajo del objetivo medio (61,32 EUR) porque los analistas valoran por suma de partes con tasas de descuento de infraestructuras (≈6-7 %) y nosotros aplicamos la regla común de PER a nuestro BPA de 2028e (1,13 EUR, un 11 % por debajo del 1,27 de UBS). Ver diferencia_consenso.' },
  ],

  secciones: {
    comparables: {
      comentario: 'Ferrovial cotiza a 44,4x el BPA de los próximos 12 meses, casi tres veces la mediana de los comparables (16,1x). La prima no se cierra con estos múltiplos: el beneficio contable de Ferrovial no recoge el valor del 407 ETR ni el crecimiento de tarifas de las Managed Lanes durante décadas, y Vinci o Aena tienen concesiones más cortas o reguladas. Por eso los comparables pesan 0 en la síntesis y solo entran en el alcista del objetivo a 12 meses a través de la regla común (que aquí no los usa: la media larga propia es mayor). Si algún día Ferrovial cotizara a un PER de concesionaria europea, valdría un tercio: ese es el riesgo de múltiplo, no un valor objetivo.',
    },
  },

  dcf_justificacion: {
    crecimiento: 'Ingresos +5 % en 2026e (1S26: +11,3 % comparable, frenado por el dólar y el tráfico del 407) [A2], +6 % en 2027-2028e con la cartera récord de construcción (17.400 M) [A1] y las subidas de tarifa de las Managed Lanes, y convergencia al 2,5 % en 2035e. Entre 2021 y 2025 los ingresos crecieron un 8,7 % anual compuesto [A10, A1]: proyectamos menos porque la construcción (80 % de las ventas) no crecerá al ritmo de 2023-2024.',
    margenes: 'Margen EBITDA ajustado del 15,6 % en 2025 [A1] y 15,9 % en el 1S26 [A2]; sube hasta el 18,5 % en 2030e porque las autopistas, con margen del 70 % (990 M de EBITDA sobre 1.400 M de ingresos), crecen más que la construcción (EBIT del 4,6 %) [A1]. Es la misma tendencia de 2021-2025 (del 8,6 % al 15,6 %), más lenta.',
    inversion: 'Capex del 5-6,5 % de las ventas (2025: ≈5 % estimado con FCF de TipRanks) [A10] y amortización del 5,5 % (la de 2025). No proyectamos el capex de la I-24 (9.200 M USD a nivel de proyecto) ni el de la NTO: sus flujos y su deuda de proyecto quedan fuera, y es una de las razones por las que el DCF no captura el valor de las nuevas concesiones.',
    wacc: 'Tasa libre: Bund a 10 años del 3,53 % [D23]. Beta 0,9 (sin beta propia calculable en este entorno; infraestructuras con construcción), prima de mercado del 5,5 % y 0,5 puntos adicionales por el riesgo de licitación en EE. UU. Coste de la deuda del 5 % (deuda de proyecto en USD) con un peso del 20 % (deuda neta de 5.893 M frente a 32.163 M de capitalización). WACC del 7,93 %.',
    terminal: 'Gordon al 2 %. Es generoso para concesiones con fecha de fin (407 ETR hasta 2098, Managed Lanes hasta 2061-2070) y prudente para tarifas que suben por encima de la inflación: los dos efectos se compensan en parte.',
  },
  puente_comentarios: {
    '2026e': 'Volumen: construcción y tráfico (+1,8 % el 407 en el semestre); precio: tarifas del 407 (+20,2 % en peaje) y de las Managed Lanes; otros: dólar y dólar canadiense más débiles [A17, A2].',
    '2027e': 'Cartera de construcción de 17.400 M y subidas de tarifa en línea con la congestión [A1].',
    '2028e': 'Igual que 2027e; la apertura completa de la NTO de JFK aporta ingresos de aeropuertos.',
    '2029e': 'Menos construcción y más peaje.',
    '2030e': 'Convergencia hacia el crecimiento nominal de la economía.',
  },
  veredicto: 'En parte',
  sostenibilidad_justificacion: 'El crecimiento proyectado (4,5 % de media) se apoya en el poder de precios demostrado de los peajes (ingreso por viaje del 407 +11,7 % en 2025) [A1] y en la cartera de construcción, no en capital nuevo: la reinversión es solo el 5 % del NOPAT, así que la prueba del motor no se aplica y la hacemos a mano. El precio aguanta; el volumen se frena (tráfico del 407 −2,7 % en el 2T26) [A17]. El problema es otro: el ROIC consolidado (5,2 %) está por debajo del WACC (7,93 %) y el crecimiento que el mercado espera exige nuevas concesiones como la I-24, que UBS estima en una TIR del ≈7 % [D6]. Por eso «En parte»: el base no necesita recorte (las pruebas pasan), pero el crecimiento nuevo no demuestra crear valor.',
  dcf_lectura: 'El DCF del perímetro consolidado más el 407 ETR a precio de transacción da 29,00 EUR por acción, un 35,7 % por debajo del precio, con el valor terminal en el 61 % del valor. El DCF inverso dice que, con nuestro WACC del 7,93 %, el precio exige un crecimiento de los ingresos del 11,1 % anual en 2027-2035 (frente al 4,4 % del base) o un margen EBITDA del 25,8 % (frente al 18,5 %), y que la rentabilidad implícita para el comprador de hoy es del 5,7 %. Es exigente: la acción descuenta una tasa de descuento de infraestructura «core» (≈5,5-6 %) y décadas de subidas de tarifa por encima de la inflación. El mercado puede tener razón en el 407 (lo hemos valorado a la última transacción, no a un DCF propio), pero el resto del perímetro no justifica el precio con un coste de capital de mercado. La conclusión depende mucho de la tasa: con 6,5 % de WACC el valor se acercaría al precio.',
  narrativas: {
    Bajista: 'La I-24 y otras pujas agresivas se llevan capital a rentabilidades del 6-7 %, el tráfico del 407 sigue cayendo y los tipos suben: el mercado deja de pagar la prima de «compounder» (ya pasó en 2022, con caídas del 11 %).',
    Base: 'Las tarifas siguen subiendo, la construcción mantiene el 4-5 % de margen y la NTO abre por fases; el beneficio limpio crece ≈15 % al año hasta 2028.',
    Alcista: 'Recuperación del tráfico del 407, nuevas managed lanes adjudicadas con mejores condiciones y venta de activos maduros con plusvalía.',
  },
  escenarios_comentario: 'Los tres escenarios del DCF quedan por debajo del precio (20,20, 29,00 y 34,43 EUR): el intrínseco no sostiene la cotización ni en el alcista, porque el DCF no captura el valor de las concesiones nuevas ni una tasa de infraestructura «core». La asimetría que importa es la del objetivo a 12 meses: +34,0 % en el alcista frente a −22,7 % en el bajista.',
  suma_partes_comentario: 'No se aplica: sin los estados financieros de cada concesión (EBITDA, deuda y años restantes de las Managed Lanes) una suma de partes sería una copia de la de los analistas. El 407 ETR, la parte más valiosa, ya entra en el puente a precio de transacción.',

  casos12m: [
    { escenario: 'Bajista', metrica: 'PER 2028e', beneficio_por_accion: 0.95, multiplo: null, precio: null, justificacion: 'Beneficio limpio de ≈680 M en 2028e (+5 % anual desde 589 M en 2025): tráfico del 407 plano, aportaciones de capital a la I-24 y la NTO que reducen los ingresos financieros de la caja y peor dólar. 713 M de acciones, sin recompras no anunciadas.' },
    { escenario: 'Base', metrica: 'PER 2028e', beneficio_por_accion: 1.13, multiplo: null, precio: null, justificacion: 'Beneficio limpio de ≈805 M en 2028e (608 M en 2026e = 258 M del 1S26 + ≈350 M del 2S; ≈700 M en 2027e): tarifas del 407 y de las Managed Lanes, margen de construcción del 4,5 % y NTO en marcha. 713 M de acciones.' },
    { escenario: 'Alcista', metrica: 'PER 2028e', beneficio_por_accion: 1.25, multiplo: null, precio: null, justificacion: 'Beneficio limpio de ≈890 M en 2028e: recuperación del tráfico del 407, NTO a pleno rendimiento y Managed Lanes con subidas de tarifa del 8-10 %. Cerca del consenso de Simply Wall St (908 M).' },
  ],
  diferencia_consenso: 'Nuestro BPA de 2028e (1,13 EUR) está un 11 % por debajo del de UBS (1,27) y un 20 % por debajo del de Chartmill (1,41) [D6, D11]: no damos ingresos financieros crecientes ni plusvalías, y descontamos el coste de financiar la I-24. Nuestro precio base (50,96 EUR) queda un 16,9 % por debajo del objetivo medio (61,32 EUR) [D5] sobre todo por el método: los analistas valoran por suma de partes con tasas de descuento de infraestructuras; nosotros aplicamos la regla común de PER. La tendencia de los objetivos es a la baja (UBS 59, JPMorgan 50, BofA 60) [D6, D9, D8].',
  objetivo12m_comentario: 'El objetivo a 12 meses (49,03 EUR ponderado; 50,96 EUR en el base) supera al valor intrínseco (28,75 EUR) en un 71 %: el PER al que la regla lleva la acción (45x) es el que el mercado le ha pagado los últimos años, no uno que justifique nuestro DCF. Cerrar esa distancia no es cuestión de un catalizador: exige creer en tasas de descuento de infraestructura muy bajas. Por eso la tesis de valor real es negativa a varios años aunque el precio a 12 meses pueda subir.',
  valoracion_comentario: 'Pesamos el DCF al 70 % y los escenarios al 30 %; comparables y transacciones a 0 porque ningún comparable cotizado tiene la duración de concesiones de Ferrovial (su PER de 14-21x llevaría a 15-18 EUR) y las transacciones recientes no publican múltiplos. El 407 ETR entra en el puente a precio de transacción (≈12.400 M EUR, el 39 % de la capitalización), que es la referencia más objetiva del informe. La dispersión es enorme: DCF 29 EUR, analistas 50-70 EUR, cotización 45 EUR. La diferencia es la tasa de descuento: el mercado paga por estas concesiones una rentabilidad implícita del 5,7 %.',
  rentabilidad_comentario: 'Ferrovial no crea valor contable sobre su capital consolidado: ROIC del 5,2 % en 2025 y del 6,7 % en 2024, frente a un WACC del 7,93 % (−2,7 puntos). El ROIC está deprimido por la contabilidad: el 407 ETR está en balance a un valor muy inferior al de mercado y su beneficio va por debajo del EBIT, y la construcción tiene mucho volumen con poco margen. Medido sobre el precio de las concesiones, las Managed Lanes de Texas y el 407 rinden mucho más que su coste, pero eso ya está en el precio. La rotación del capital es baja (0,34) y el ROIC incremental histórico, del 5,9 %, no mejora la lectura. Frente a Vinci, que rinde por encima de su coste de capital con concesiones europeas maduras, Ferrovial es un negocio en fase de inversión.',

  catalizadores: {
    items: [
      { fecha: '2026-10-21', evento: 'Resultados de 9 meses del 407 ETR', efecto: 'Tráfico tras el −2,7 % del 2T26', probabilidad: 'Alta', sentido: '+/−' },
      { fecha: '2026-10-27', evento: 'Resultados de 9 meses de Ferrovial (conferencia el 28-oct)', efecto: 'Dividendos de proyectos, BPA frente al consenso y explicación de la I-24', probabilidad: 'Alta', sentido: '+/−' },
      { fecha: '2026-10', evento: 'Adjudicación de la I-285 East (Atlanta)', efecto: 'Nueva managed lane: prueba de la disciplina de precios', probabilidad: 'Media', sentido: '+/−' },
      { fecha: '2026-11/12', evento: 'Nuevo programa de recompra y segundo tramo del dividendo flexible', efecto: 'Retorno al accionista (el programa vigente acaba en octubre)', probabilidad: 'Alta', sentido: '+' },
      { fecha: '2027', evento: 'Cierre de la D35 checa (2.900 M, preferente desde el 6-oct)', efecto: 'Diversificación en Europa', probabilidad: 'Media', sentido: '+' },
    ],
    confianza: 'Media',
  },
  riesgos: {
    items: [
      { riesgo: 'Rentabilidad baja de las nuevas concesiones (I-24 y siguientes)', tipo: 'Asignación de capital', probabilidad: 'Media', impacto: 'Alto', efecto_valor: '−15 % a −25 % (bajista a 12 meses: −22,7 %)', mitigante: 'Ferrovial controla la construcción y el diseño de tarifas', senal: 'TIR de la I-24 publicada o equity comprometido por encima del previsto' },
      { riesgo: 'Caída del tráfico del 407 ETR por elasticidad al precio', tipo: 'Operativo', probabilidad: 'Media', impacto: 'Alto', efecto_valor: '−10 %', mitigante: 'Libertad de tarifas hasta 2098', senal: 'Tráfico trimestral negativo dos trimestres seguidos' },
      { riesgo: 'Subida de tipos reales', tipo: 'Mercado', probabilidad: 'Media', impacto: 'Alto', efecto_valor: 'Cada 0,5 puntos de WACC ≈ −11 % en el DCF', mitigante: 'Caja neta en la matriz', senal: 'Bund por encima del 4 %' },
      { riesgo: 'Riesgo político de tarifas en Ontario o en los estados de EE. UU.', tipo: 'Regulatorio', probabilidad: 'Baja', impacto: 'Alto', efecto_valor: '−10 % a −20 %', mitigante: 'Contratos a largo plazo con compensación', senal: 'Propuestas legislativas sobre peajes' },
      { riesgo: 'Dólar y dólar canadiense débiles', tipo: 'Divisa', probabilidad: 'Media', impacto: 'Medio', efecto_valor: '−5 %', mitigante: 'Deuda de proyecto en la misma divisa', senal: 'EUR/USD por encima de 1,25' },
      { riesgo: 'Retrasos o sobrecostes en la NTO de JFK y en grandes obras', tipo: 'Ejecución', probabilidad: 'Media', impacto: 'Medio', efecto_valor: '−5 %', mitigante: '25 acuerdos con aerolíneas', senal: 'Provisiones en construcción' },
    ],
    premortem: 'Octubre de 2029: la acción ha perdido un 40 %. La I-24 resultó ser la primera de varias pujas caras: para ganar las managed lanes de Atlanta y Nashville, Ferrovial comprometió más de 3.000 M de capital a rentabilidades del 6-7 % cuando el Bund subió al 4,5 %. El tráfico del 407 encadenó trimestres negativos por la elasticidad a unas tarifas que subían un 10 % al año y Ontario volvió a hablar de limitar los peajes. Los dividendos de proyectos se estancaron en torno a 1.000 M y el mercado dejó de pagar 45 veces el beneficio: con 30 veces un BPA de 1,10 EUR, la acción vale 33 EUR. La señal que lo anticipaba: el diferencial entre la TIR de las nuevas concesiones y el coste de capital, y el tráfico trimestral del 407.',
    confianza: 'Media',
  },
  preguntas: {
    items: [
      { tema: 'I-24', pregunta: '¿Qué TIR del accionista y qué capital propio total supone la I-24, y cómo se compara con NTE y LBJ?', por_que: 'Es la causa de las rebajas de UBS y JPMorgan; decide si el crecimiento crea valor.' },
      { tema: '407 ETR', pregunta: '¿Cuánta elasticidad al precio ve en el tráfico del 407 tras el −2,7 % del 2T26?', por_que: 'El 39 % de la capitalización depende de que las tarifas sigan subiendo.' },
      { tema: 'Beneficio limpio', pregunta: '¿Cuál es el beneficio neto sin plusvalías ni valor razonable de 2024, 2025 y 1S26?', por_que: 'La base del PER del informe es una estimación propia.' },
      { tema: 'Minoritarios', pregunta: '¿Qué participación tiene en cada Managed Lane y qué EBITDA corresponde a los socios?', por_que: 'El puente usa una estimación de 5.000 M para los minoritarios.' },
      { tema: 'NTO de JFK', pregunta: '¿Cuándo aportará dividendos la NTO y cuánto capital queda por aportar?', por_que: 'Es la tercera pata de crecimiento y aún consume caja.' },
      { tema: 'Remuneración', pregunta: '¿Qué métricas tiene el variable a largo plazo y premian la TIR de las nuevas concesiones?', por_que: 'Un variable ligado al crecimiento empujaría a pujas caras.' },
    ],
    confianza: 'Media',
  },
  fuentes: [],
  huecos: [
    { seccion: 'valoracion', campo: 'puente (minoritarios a valor de mercado, otras participadas)', tipo: 'Núcleo', intentos: '1) Nota de resultados 2025 (deuda por proyecto); 2) informe anual: participación en cada Managed Lane; 3) análisis de UBS: sin desglose en el extracto', decision: 'Calculado y marcado como estimación' },
  ],
};
