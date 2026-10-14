// Textos del analista (Sanofi, corte 2026-10-14). Cifras del motor tal cual (calc); hechos con cita de la nota.
const SIN_RED = 'entorno nube: solo WebSearch (WebFetch, curl, descargar.mjs y bolsa.mjs sin red)';

export default {
  limitaciones: 'Análisis hecho desde la nube con solo búsqueda web: ninguna cuenta se ha leído en el documento original, todas las cifras salen de los extractos de búsqueda de los comunicados de Sanofi (resultados 2023, 2025 y 2T26, 20-F 2024), de Stock Analysis y Stockopedia, con su URL. Las cuentas están en **base «business»** de Sanofi (sin amortización de intangibles adquiridos, deterioros, reestructuración ni otras partidas no recurrentes), la que guía la empresa y sigue el consenso; el EBITDA es el resultado operativo business más la amortización del inmovilizado (1.776 M en 2025 según Stock Analysis; 2024 estimado al 4 % de las ventas). 2022 incluye Opella (consumo); 2023-2025 no (reexpresados por la empresa). Faltan 2021 y anteriores, el balance anterior a 2025 y casi todo el gobierno. Precio de cierre del 3-oct-2026 (73,10 EUR), el último que publica una fuente legible; no hay cotización del 13-oct. Acciones: 1.207,8 M emitidas a 31-ago-2026 menos ≈7,2 M de autocartera más ≈2,4 M de planes, 1.203 M (estimación propia).',
  controles_explicados: [
    { control: 'Circulante', explicacion: 'Sin cuentas a pagar legibles, el circulante del balance es existencias + clientes (48,7 % de las ventas); el DCF usa el 48 % constante, de modo que no libera ni consume caja por este concepto.' },
    { control: 'Sección de núcleo con datos: sector', explicacion: 'Sin red para IQVIA ni EFPIA y con las búsquedas compartidas reservadas a cuentas y valoración; la sección lleva definición, motores y regulación cualitativos, con el hueco registrado.' },
  ],
  huecos: [
    { seccion: 'rentabilidad', campo: 'ROIC de los competidores', tipo: 'Complemento', intentos: `1) cuentas de los competidores; 2) Stock Analysis; 3) tabla de comparables (ROIC de 14-42 %). ${SIN_RED}`, decision: 'Calculado y marcado como estimación' },
  ],
  secciones: {
    identificacion: { capitalizacion_publicada: null },
    historia: {
      resumen: 'Sanofi nace de la fusión de Sanofi-Synthélabo y Aventis en 2004 y durante una década vivió de la insulina Lantus y de las vacunas. La alianza con Regeneron le dio Dupixent (2017), que hoy es el 36 % de las ventas [B3]. En 2025 vendió el 50 % de Opella, su negocio de consumo, a CD&R y compró Blueprint Medicines para entrar en enfermedades raras inmunológicas [B2, B4]. En febrero de 2026 el consejo no renovó a Paul Hudson tras una serie de fracasos clínicos y nombró a Belén Garijo, ex consejera delegada de Merck KGaA, que en cinco meses ha abandonado amlitelimab e itepekimab y ha cerrado un nuevo acuerdo con Regeneron [B5, B6, B7].',
    },
    negocio: {
      geografias: [{ nombre: 'Estados Unidos', peso_pct: 47.9 }, { nombre: 'Europa', peso_pct: 20.8 }, { nombre: 'Resto del mundo', peso_pct: 31.2 }], geografias_criterio: 'destino',
      descripcion: 'Sanofi es un grupo farmacéutico francés con ventas netas de 43.626 M EUR en 2025 [A2]. Tiene tres bloques: **Dupixent** (15.700 M en 2025; 5.150 M en el 2T26, +37,6 %), el anticuerpo para inflamación tipo 2 que comparte con Regeneron [A10, A1]; **vacunas** (7.900 M: gripe, pediátricas, meningitis y Beyfortus, 1.800 M) [A10]; y el **resto de farma**: lanzamientos, enfermedades raras (Blueprint desde julio de 2025), hematología y medicina general [A2]. Vende sobre todo a mayoristas, sistemas públicos y aseguradoras; en el 1S25 Estados Unidos fue el 48 % de las ventas, Europa el 21 % y el resto del mundo el 31 % [A11].',
      como_gana_dinero: 'Margen operativo business del 27,8 % en 2025 [A12]: los medicamentos con patente (Dupixent sobre todo) tienen márgenes brutos muy altos; la I+D (≈16-17 % de las ventas) y la red comercial son los grandes costes. El beneficio depende de la mezcla: Dupixent aporta ≈80 % del crecimiento del semestre [E4] y comparte beneficios con Regeneron. Las vacunas de gripe concentran ventas en el 3T-4T y bajan con las comparaciones altas (−4,7 % en el 2T26) [A1]. Ingresos poco cíclicos pero con fechas de caducidad: cada patente que vence se lleva entre el 50 % y el 90 % de las ventas del producto en dos o tres años.',
      clientes: 'Sin concentración relevante por cliente final; en EE. UU. tres mayoristas distribuyen la mayor parte, como en todo el sector. El poder de precios es desigual: Dupixent crece en volumen con precio estable, mientras las insulinas y las vacunas de gripe sufren presión de precios y de los programas públicos. La reforma de precios de EE. UU. (negociación de Medicare) es el principal riesgo de precio a medio plazo; no hemos podido leer la exposición concreta.',
    },
    sector: {
      definicion: 'El mercado relevante es el farmacéutico mundial de medicamentos innovadores con patente y de vacunas, con foco en inmunología tipo 2 (dermatitis atópica, asma, EPOC), donde Dupixent es el líder. No hemos podido leer un tamaño de mercado con dos fuentes desde la nube (hueco registrado).',
      tamano: null, unidad_serie: null, serie: [], tcac_historico_pct: null, tcac_previsto_pct: null, cr5_pct: null, estructura: 'Moderadamente concentrada',
      drivers: [
        { driver: 'Penetración de biológicos en inflamación tipo 2', efecto: '+', horizonte: 'Estructural', evidencia: 'Dupixent creció un 37,6 % en el 2T26 y ya factura más de 20.000 M anualizados [A1].' },
        { driver: 'Vencimiento de patentes', efecto: '−', horizonte: 'Estructural', evidencia: 'La patente principal de Dupixent vence en EE. UU. en marzo de 2031; JPMorgan cifra en 17.300 M las ventas en riesgo en 2030-2035 [B1, B8].' },
        { driver: 'Precios en EE. UU.', efecto: '−', horizonte: 'Estructural', evidencia: 'Negociación de precios de Medicare y presión política sobre los precios; sin cifra legible para Sanofi.' },
        { driver: 'Vacunación de gripe y VRS', efecto: '+/−', horizonte: 'Cíclico', evidencia: 'Vacunas −4,7 % en el 2T26 por una base alta en gripe; Beyfortus +9,5 % en 2025 [A1, A10].' },
      ],
      porter: [
        { fuerza: 'Rivalidad', intensidad: 3, justificacion: 'Lilly (Ebglyss) y AbbVie (Rinvoq) compiten con Dupixent; en vacunas, GSK, Pfizer y MSD.' },
        { fuerza: 'Poder de los clientes', intensidad: 4, justificacion: 'Pagadores públicos en Europa y aseguradoras y Medicare en EE. UU. negocian precio.' },
        { fuerza: 'Poder de los proveedores', intensidad: 2, justificacion: 'Materias primas e inputs de bajo peso; el socio Regeneron sí captura la mitad del beneficio de Dupixent.' },
        { fuerza: 'Amenaza de entrada', intensidad: 2, justificacion: 'Patentes, ensayos de miles de millones y aprobación regulatoria; los biosimilares solo entran al vencer la patente.' },
        { fuerza: 'Amenaza de sustitutos', intensidad: 3, justificacion: 'Biosimilares de Dupixent desde 2031 y nuevas moléculas orales o de dosis espaciadas.' },
      ],
      ciclo: { posicion: 'Madurez del ciclo', comentario: 'La demanda de medicamentos apenas depende del ciclo económico: Sanofi creció en 2008-09 y en 2020. Lo que marca el ciclo propio de cada empresa es el calendario de patentes: Sanofi está en la fase alta de Dupixent, con cinco años de crecimiento por delante antes del vencimiento de 2031 [B1].' },
      regulacion: 'En EE. UU., la negociación de precios de Medicare y la presión de la administración sobre los precios de los medicamentos; en Europa, la reforma farmacéutica de la UE, que recorta la protección de datos. La defensa de la exclusividad de Dupixent más allá de marzo de 2031 depende de patentes secundarias y de formulaciones nuevas [B1].',
      tendencias: 'Más biológicos en inflamación y moléculas biespecíficas o de dosificación espaciada que pueden desplazar a Dupixent; la nueva dirección apuesta por acuerdos (Regeneron, 1-oct-2026) y por compras para rellenar la cartera [B7].',
      confianza: 'Baja',
    },
    competencia: {
      posicion: 'Líder mundial en inflamación tipo 2 con Dupixent; entre los cuatro primeros en vacunas.',
      foso: {
        veredicto: 'Estrecho', tendencia: 'Se estrecha',
        fuentes: [
          { fuente: 'Efectos de red', puntuacion: 0, evidencia: 'No aplica en farmacia.' },
          { fuente: 'Costes de cambio', puntuacion: 2, evidencia: 'Pacientes estables con un biológico rara vez cambian; Dupixent sigue ganando cuota (+37,6 % en el 2T26) [A1].' },
          { fuente: 'Intangibles (marca, patentes, licencias)', puntuacion: 4, evidencia: 'Patentes de Dupixent hasta 2031 y franquicia de vacunas con barreras de fabricación; pero la cartera de relevo ha fallado (amlitelimab, itepekimab, tolebrutinib) [B6].' },
          { fuente: 'Ventaja en costes', puntuacion: 2, evidencia: 'Escala de fabricación en vacunas; margen operativo business del 27,8 %, por debajo de Novartis o Merck (EBITDA del 40-43 %) [A12, D6].' },
          { fuente: 'Escala eficiente', puntuacion: 3, evidencia: 'Pocos fabricantes de vacunas de gripe a escala mundial.' },
        ],
      },
      amenazas: 'La mayor amenaza es la propia patente de Dupixent: la empresa reconoce que no podrá compensar en ventas su pérdida de exclusividad [B1]. Le siguen la competencia de Ebglyss y Rinvoq en dermatitis, la presión de precios en EE. UU. y la erosión de las vacunas de gripe. Probabilidad alta de una caída de ventas en 2031-2032; la duda es su tamaño.',
    },
    financieros: {
      comentario: 'Sin Opella, las ventas pasan de 37.817 M en 2023 a 43.626 M en 2025 (+7,4 % anual en euros) [A3, A2], con un 9,9 % a tipo constante en 2025 [A12]. El margen operativo business baja de 29,6 % en 2023 a 27,6 % en 2024 por la inversión en I+D y lanzamientos, y se recupera al 27,8 % en 2025 [A3, A12]. En el 1S26 las ventas crecen un 15,7 % a tipo constante y el BPA business un 22,7 %, con efectos puntuales y recompras [A1, A9]; el 2T26 dio 11.597 M de ventas y 2,09 EUR de BPA business [A1]. El beneficio business pasó de 8.912 M a 9.555 M (+7,2 %) [A2].',
      ajustes: 'Usamos la base business de Sanofi. En 2025 el beneficio NIIF fue de 7.813 M, de los que 2.874 M salen de Opella (plusvalía de 2.610 M por la pérdida de control) [B2]; el BPA NIIF fue de 6,40 EUR frente a 7,83 de business. La diferencia recurrente son la amortización de intangibles adquiridos (no es caja) y la reestructuración (≈1.000-1.500 M al año, sí es caja, por eso el DCF resta 2,5 puntos de margen). En el 1S26 hay un deterioro de 952 M por amlitelimab [B6], fuera del business.',
      confianza: 'Media',
    },
    trimestres: {
      ultima_presentacion: 'En el 2T26 (30-jul) la dirección subió la guía de ventas a ≈+10 % a tipo constante, con el BPA business creciendo algo más, y avisó de que el segundo semestre será más lento por comparaciones más duras; tipo impositivo del ≈21 % [A1, A9]. Garijo presentó su visión: revisión estratégica de la cartera en fase avanzada «todavía en curso» y más disciplina en costes [B6]. Los analistas preguntaron sobre todo por el relevo de Dupixent y por los efectos puntuales del trimestre: sin recompras ni partidas puntuales, el BPA habría crecido ≈21 % y no 33 % [A9]. La acción cayó un 8-9 % ese día [E3]. En el 4T25 (29-ene) el director financiero había dicho que la pérdida de exclusividad de Dupixent «no se puede compensar» en ventas [B1].',
    },
    balance: {
      otros_pasivos: 'Sin el balance completo no podemos detallar pensiones, provisiones ni litigios. Sabemos que la deuda neta pasó de 8.772 M (2024) a 11.008 M (2025) y a 15.513 M en junio de 2026, tras pagar el dividendo de mayo, la recompra de 1.000 M y compras de desarrollo; Sanofi emitió 2.300 M de bonos en el 2T26 [A2, A8, A13]. El pago inicial de 1.000 M USD a Regeneron (oct-2026) va como deuda en el puente. Los litigios del Zantac en EE. UU. siguen siendo una contingencia que no hemos podido cuantificar.',
      comentario: 'La deuda neta de 15.513 M es poco más de una vez el EBITDA business (1,1 veces): holgura para seguir comprando. El circulante es alto (existencias de 10.214 M y clientes de 11.046 M, el 48,7 % de las ventas) [A6], aunque en 2025 bajó casi 30 días de existencias, lo que explica parte del salto del flujo de caja libre [A12].',
      confianza: 'Baja',
    },
    flujos: {
      comentario: 'El flujo operativo pasó de 10.258 M (2023) a 8.914 M (2024) y 10.917 M (2025) [A7]; el flujo libre según Sanofi llegó a 8.100 M en 2025 (18,5 % de las ventas, +35,8 %) y a 3.724 M en el 1S26 [A12, A8]. Parte de 2025 es la caída de existencias, no repetible. El capex de 2025 (2.817 M) es estimación propia: flujo operativo menos flujo libre. En 2025 entraron ≈10.400 M netos por Opella y salieron 5.000 M en recompras (3.000 M a L’Oréal) [B2, C5].',
      confianza: 'Baja',
    },
    calidad: {
      auditor: null, anios_auditor: null, opinion: null,
      comentario: 'La distancia entre el beneficio business (9.555 M) y el NIIF de operaciones continuadas es grande y recurrente: amortización de intangibles comprados y reestructuraciones de 1.000-1.500 M todos los años [A2]. Tratamos la reestructuración como coste de caja. En 2025 el BPA NIIF lo infla la plusvalía de Opella (2.610 M) [B2]; en 2026 lo rebaja el deterioro de amlitelimab (952 M) [B6]. El Altman Z de 1,62 no es significativo en una farmacéutica con 58.830 M de fondo de comercio e intangibles; Piotroski y Beneish no se pueden calcular sin balance de varios años. No hemos podido leer el informe del auditor.',
      senales: [
        { senal: 'Beneficio business muy por encima del NIIF', nivel: 'Media', comentario: 'La reestructuración se repite cada año; la restamos en el DCF.' },
        { senal: 'Efectos puntuales en el 2T26', nivel: 'Baja', comentario: 'La propia empresa reconoce que sin ellos y sin recompras el BPA crece ≈21 % [A9].' },
      ],
      confianza: 'Baja',
    },
    rentabilidad: {
      comentario: 'Con la base business, el ROIC de 2025 es del 11,7 %, unos 5 puntos por encima del WACC del 6,69 %: crea valor, pero poco para una farmacéutica de patente, porque el capital invertido (82.718 M) lleva 41.300 M de fondo de comercio de compras pasadas (Genzyme, Bioverativ, Blueprint) [A6]. El ROE es del 13,3 %. Los comparables están entre el 14 % (Merck) y el 42 % (Lilly) [D6]. No tenemos serie de capital para el ROIC incremental. Lo que mueve el ROIC es el margen: la rotación (0,34 veces) es baja por los intangibles.',
      confianza: 'Media',
    },
    capital: {
      politica: 'Dividendo creciente: 4,12 EUR por acción por 2025, pagado en mayo de 2026 (+5 %) [D3, E3]. Recompras: 5.000 M terminados en 2025 (incluidos 3.000 M a L’Oréal a 101,50 EUR) y 1.000 M en 2026, ya ejecutados en el 1S26 (12,6 M de acciones) [C5, A14]. Prioridades declaradas: dividendo, desarrollo de negocio para rellenar la cartera antes de 2031 y recompras con lo que sobre [B1].',
      adquisiciones: [
        { anio: '2025', objetivo: 'Venta del 50 % de Opella (consumo) a CD&R', importe: 10400, ev_ebitda: null, financiacion: 'Entrada de caja neta', resultado: 'Plusvalía de 2.610 M; Sanofi conserva el 48,2 % [B2, B4].' },
        { anio: '2025', objetivo: 'Recompra del 2,3 % del capital a L’Oréal', importe: 3000, ev_ebitda: null, financiacion: 'Caja', resultado: 'A 101,50 EUR por acción, un 39 % por encima del precio actual [C5].' },
        { anio: '2026', objetivo: 'Acuerdo con Regeneron: cuatro moléculas nuevas y fin de litigios', importe: 892, ev_ebitda: null, financiacion: 'Caja (1.000 M USD iniciales y hasta 7.000 M USD por hitos)', resultado: 'Pendiente; el mercado lo castigó al día siguiente [B7, E2].' },
      ],
      comentario: 'La asignación de capital de 2019-2025 deja un saldo pobre: se recompraron acciones a más de 100 EUR (hoy 73,10) y las grandes apuestas de I+D (amlitelimab, itepekimab, tolebrutinib) han fallado [B6, C5]. La venta de Opella sí se hizo a buen precio. La nueva dirección empieza con acuerdos de riesgo compartido, más baratos que una gran compra, pero todavía sin resultados.',
      confianza: 'Media',
    },
    directivos: {
      comentario: 'Equipo en transición: la consejera delegada lleva cinco meses y su predecesor salió de forma abrupta, sin sucesión anunciada [C1]. Garijo conoce la casa (15 años en Sanofi) y ha actuado rápido: revisión de la cartera, cortes de programas y acuerdo con Regeneron [C3, C4]. La guía se ha cumplido o superado en 2025 y 2026, lo que da credibilidad a las cifras de corto plazo; la duda es la cartera.',
    },
    gobierno: {
      remuneracion: 'No hemos podido leer la política de remuneración ni el resultado de los votos de la junta del 29-abr-2026 (hueco registrado).',
      control_y_defensas: 'No hay accionista de control: L’Oréal tiene el 7,2 % del capital y el 13,1 % de los votos por el doble derecho de voto francés a los títulos nominativos de más de dos años [C5]. Ese doble voto (1.343 M de derechos teóricos sobre 1.208 M de acciones) da más peso a L’Oréal y a los empleados (2,93 %) que a los fondos [C7, C6]. Presidente no ejecutivo separado de la consejera delegada.',
    },
    consenso: {
      guidance: 'Guía de 2026, elevada el 30-jul: ventas ≈+10 % a tipo constante y BPA business algo por encima, tipo impositivo del ≈21 % [A1]. No hay objetivos a medio plazo vigentes de la nueva dirección; la anterior decía que no podrá compensar en ventas la pérdida de Dupixent [B1].',
      revisiones: 'Solo una fuente legible con datos de consenso en euros: Idéal Investisseur. El objetivo mediano bajó de 95 EUR (20-jul, 23 analistas, mayoría «comprar») a 90 EUR (15-sep, 24 analistas, «pondérer») [D8, D3]. UBS rebajó a Neutral en enero (objetivo de 105 a 88 EUR) por la cartera y la patente de Dupixent [D4]. El BPA 2026e implícito es de ≈8,58 EUR (PER de 8,65 a 74,21).',
      base_ebitda: 'NIIF',
    },
    multiplos_historicos: {
      comentario: 'A 73,10 EUR, el PER sobre el BPA business de 2025 es de 9,3 veces, frente a 11,1 (2023), 12,9 (2024) y 10,6 (2025) al cierre de cada año [D2, A2]. El descuento se ha ampliado por el fracaso de la cartera y la cercanía de 2031: a cinco años del vencimiento el mercado ya descuenta una caída del beneficio.',
    },
    comparables: {
      criterio: 'Grandes farmacéuticas europeas y estadounidenses con cartera de patentes y vacunas: AstraZeneca, Novartis, GSK (la más parecida por vacunas y descuento), Merck & Co (vencimiento de Keytruda en 2028), Novo Nordisk y Eli Lilly. Lilly cotiza con múltiplos de crecimiento (obesidad) y distorsiona la media: pesamos la mediana. Cifras del informe de Roche de este repositorio (8-oct-2026), pasadas de CHF a EUR [D6].',
      comentario: 'Sanofi cotiza a 8,5 veces el beneficio de los próximos 12 meses frente a una mediana de 17,2 en los comparables, y a 7,5 veces el EBITDA. Solo GSK y Novo (11,7 veces) se acercan. Parte del descuento está justificada: menor ROIC (11,7 %), precipicio de Dupixent en 2031 y cartera fallida. Por eso damos solo un 10 % de peso a los comparables: aplicar su mediana daría valores de 140-170 EUR que suponen un perfil de patentes que Sanofi no tiene.',
    },
    catalizadores: {
      items: [
        { fecha: '30-oct-2026', evento: 'Resultados del 3T26', efecto: 'Confirmación de la guía de ≈+10 % y de Dupixent; prueba de que el 2S se modera como avisaron', probabilidad: 'Alta', sentido: '+/−' },
        { fecha: 'Ene-2027', evento: 'Resultados de 2026 y guía de 2027 con la nueva dirección', efecto: 'Primera guía y posibles objetivos a medio plazo de Garijo', probabilidad: 'Alta', sentido: '+/−' },
        { fecha: '2026-2027', evento: 'Fin de la revisión estratégica de la cartera', efecto: 'Más recortes o compras para rellenar el hueco de 2031', probabilidad: 'Media', sentido: '+/−' },
        { fecha: 'Abr-2027', evento: 'Junta y dividendo de 2026', efecto: 'Dividendo de ≈4,3 EUR si sigue la política de subidas', probabilidad: 'Alta', sentido: '+' },
        { fecha: '2027-2028', evento: 'Litigios de patentes de Dupixent', efecto: 'Cada año de exclusividad extra más allá de marzo de 2031 vale varios euros por acción', probabilidad: 'Media', sentido: '+/−' },
      ],
      confianza: 'Media',
    },
    riesgos: {
      items: [
        { riesgo: 'Caída de Dupixent mayor o antes de lo previsto (biosimilares en 2031 o competencia de Ebglyss y Rinvoq)', tipo: 'Patentes', probabilidad: 'Media', impacto: 'Alto', efecto_valor: '−21 % (escenario bajista: 73,51 EUR)', mitigante: 'Patentes secundarias y nueva formulación de dosis espaciada [B1]', senal: 'Crecimiento de Dupixent por debajo del 15 % en 2027' },
        { riesgo: 'Nuevos fracasos de la cartera tras amlitelimab, itepekimab y tolebrutinib', tipo: 'I+D', probabilidad: 'Alta', impacto: 'Medio', efecto_valor: '−5 a −10 %', mitigante: 'Acuerdo con Regeneron y compras', senal: 'Deterioros en los resultados semestrales' },
        { riesgo: 'Compra cara para rellenar el hueco de 2031', tipo: 'Asignación de capital', probabilidad: 'Media', impacto: 'Medio', efecto_valor: '−5 %', mitigante: 'Deuda neta de solo 1,1 veces el EBITDA', senal: 'Anuncio de una compra de más de 15.000 M' },
        { riesgo: 'Precios de medicamentos en EE. UU. (Medicare, nación más favorecida)', tipo: 'Regulación', probabilidad: 'Media', impacto: 'Medio', efecto_valor: '−5 a −10 %', mitigante: 'Dupixent fuera de las primeras listas de negociación', senal: 'Inclusión de Dupixent en la negociación de Medicare' },
        { riesgo: 'Vacunas de gripe a la baja en EE. UU.', tipo: 'Comercial', probabilidad: 'Media', impacto: 'Bajo', efecto_valor: '−3 %', mitigante: 'Beyfortus y expansión internacional [A10]', senal: 'Vacunas por debajo de 7.500 M anuales' },
        { riesgo: 'Euro fuerte frente al dólar', tipo: 'Divisa', probabilidad: 'Media', impacto: 'Bajo', efecto_valor: '−3 %', mitigante: 'Costes parcialmente en dólares', senal: 'EUR/USD por encima de 1,25' },
      ],
      premortem: 'Octubre de 2029: la acción está en 45 EUR. Dupixent siguió creciendo hasta 2028, pero Lilly y AbbVie ganaron cuota en dermatitis con moléculas de dosis espaciada y los tribunales no extendieron la exclusividad más allá de marzo de 2031. La revisión de Garijo acabó en una compra de 20.000 M de una biotecnológica a 25 veces ventas que no aportó beneficio hasta 2030, y el mercado empezó a valorar a Sanofi por el beneficio de 2032, un 30 % inferior al de 2028. El dividendo dejó de subir. Las señales que lo habrían anticipado: el crecimiento de Dupixent por debajo del 15 % en 2027, la ausencia de victorias judiciales en las patentes secundarias y el tamaño de la compra.',
      confianza: 'Media',
    },
    esg: {
      calificaciones: [],
      materialidad: 'Lo material para Sanofi es el acceso y precio de los medicamentos (presión política en EE. UU.), la seguridad del paciente y la calidad de fabricación de vacunas. No hemos podido leer calificaciones ESG desde la nube (hueco registrado).',
      controversias: 'Litigios del Zantac en EE. UU. (ranitidina) y antiguas disputas con Regeneron, cerradas en el acuerdo del 1-oct-2026 [B7]. No hemos podido cuantificar las provisiones.',
      confianza: 'Baja',
    },
    preguntas: {
      items: [
        { tema: 'Dupixent', pregunta: '¿Qué parte de las ventas de Dupixent de 2030 protegen las patentes secundarias más allá de marzo de 2031, y con qué calendario de litigios?', por_que: 'Cada año de exclusividad extra vale varios euros por acción y decide entre nuestro base y nuestro bajista.' },
        { tema: 'Cartera', pregunta: '¿Qué activos de fase III quedan tras la revisión y qué ventas máximas esperan de ellos?', por_que: 'Sin ellos, el valor terminal descansa en compras aún no hechas.' },
        { tema: 'Compras', pregunta: '¿Cuál es el tope de deuda neta que aceptaría la dirección para comprar?', por_que: 'Con 1,1 veces el EBITDA hay margen para 30.000 M, que podrían destruir valor si se pagan caros.' },
        { tema: 'Regeneron', pregunta: '¿Qué hitos y qué calendario tienen los 7.000 M USD condicionados del nuevo acuerdo?', por_que: 'Es una salida de caja de hasta el 7 % de la capitalización.' },
        { tema: 'Márgenes', pregunta: '¿Cuánto de la mejora del margen del 1S26 es recurrente?', por_que: 'La propia empresa reconoce efectos puntuales en el BPA del 2T26.' },
        { tema: 'Opella', pregunta: '¿Cuál es el valor contable y el plan de salida del 48,2 % de Opella?', por_que: 'No lo hemos incluido en el puente; podría añadir varios euros por acción.' },
      ],
      confianza: 'Media',
    },
    sentimiento: {
      lectura: 'El sentimiento es negativo y escéptico: las buenas cifras del 2T26 y el acuerdo con Regeneron se vendieron en uno o dos días [E2, E3]. No es capitulación (el objetivo de los analistas, 90 EUR, sigue un 23 % por encima del precio) pero sí cansancio con la cartera. Va en la línea de nuestro bajista y no aporta un riesgo nuevo; sí sugiere que un catalizador positivo (resultados del 3T26) tiene poco optimismo descontado.',
    },
  },
  otras: {},
  puente_comentarios: {
    '2026e': 'Guía de ≈+10 % a tipo constante: volumen de Dupixent y lanzamientos (+12 %), precio −1,5 % (insulinas y gripe) y −2,5 % de divisa [A1].',
    '2027e': 'Dupixent sigue creciendo en nuevas indicaciones (EPOC, urticaria); vacunas planas.',
    '2028e': 'Menor crecimiento de Dupixent, aporte de Blueprint y lanzamientos.',
    '2029e': 'Último año completo de exclusividad de Dupixent en EE. UU.',
    '2030e': 'Comparaciones más duras; anticipación del vencimiento en las negociaciones de precios.',
  },
  veredicto: 'En parte',
  sostenibilidad_justificacion: 'El crecimiento medio proyectado (1,3 % anual) es inferior al financiable con la reinversión prevista (2,3 % al ROIC del 11,7 %), así que la prueba de reinversión pasa sin rebajar el base. Pero el crecimiento de 2026-2030 descansa en un solo producto cuya patente vence en 2031 y en una cartera que acaba de fallar; la caída de 2031-2032 está en el modelo, su tamaño no se puede contrastar con cuotas de mercado (sin dato) y el «rendimiento del capital nuevo» del −4,0 % refleja precisamente esa caída. Por eso el veredicto es «En parte».',
  dcf_justificacion: {
    crecimiento: 'Ventas de 2026e +8 % en euros (guía de ≈+10 % a tipo constante con −2 puntos de divisa) [A1]; +6 % y +5 % en 2027e-2028e por Dupixent y lanzamientos, frente al +7,4 % anual de 2023-2025 [A2, A3]; +4 % y +2 % en 2029e-2030e y caídas del 6 % y del 8 % en 2031e-2032e por la pérdida de exclusividad de Dupixent en EE. UU. (marzo de 2031) [B1]; −2 % en 2033e y +2 % después. La caída acumulada (≈−14 %) es menor que los 17.300 M de ventas de Dupixent en riesgo según JPMorgan porque suponemos que el resto de la cartera y las compras compensan la mitad [B8].',
    margenes: 'Margen EBITDA del DCF = margen business (resultado operativo business + amortización) − 2,5 puntos por la reestructuración recurrente. El margen business con amortización fue del 31,9 % en 2025 [A2, A5]; proyectamos 30,0-31,0 % hasta 2029e (equivale a un margen operativo business del 28,5-29,5 %, en línea con la guía de BPA algo por encima de las ventas) y una bajada a 26,5-27,0 % tras el vencimiento, porque Dupixent es el producto de más margen.',
    inversion: 'Capex del 7,5 % de las ventas: el 6,4 % de 2025 (2.817 M, estimación propia) más ≈1 punto de licencias y pagos iniciales de desarrollo de negocio, recurrentes en una farmacéutica que debe rellenar su cartera [A7, A12]. Amortización del 4,0 % (1.776 M en 2025) [A5]. Circulante del 48 % de las ventas, constante (existencias + clientes sin proveedores).',
    wacc: 'Tasa libre del 3,53 % (Bund a 10 años, 12-oct-2026) [D7]; beta de 0,7 (farmacéutica defensiva; la de 0,37 de Simply Wall St no es la mensual de 5 años y no la usamos); prima de mercado del 5,5 %; sin prima adicional. Deuda del 15 % al 3,5 % antes de impuestos. WACC del 6,69 %. Con la prima implícita del mercado (4,2 %) baja al 5,91 %.',
    terminal: 'Crecimiento terminal del 1,5 %, por debajo de la inflación esperada en euros más un crecimiento real, porque cada década la farmacéutica pierde sus productos estrella: el terminal supone que Sanofi repone su cartera, no que la amplía. El valor terminal pesa el 56 % del DCF.',
  },
  dcf_lectura: 'El DCF da 93,36 EUR por acción, un 27,7 % por encima de los 73,10 EUR, con el valor terminal en el 56 %. El DCF inverso dice que el precio descuenta una caída de las ventas del 4,9 % anual en los años no fijos, frente al 0,6 % de nuestro caso base, o, visto de otra forma, una rentabilidad implícita del 8,1 % frente a un WACC del 6,69 %. Es una lectura conservadora: el mercado valora a Sanofi como si el precipicio de Dupixent llegara mañana y no hubiera reposición, cuando la empresa todavía tiene cinco años de crecimiento con una guía que viene cumpliendo. El riesgo es que tenga razón en el largo plazo: si la caída de 2031-2032 duplica la nuestra y el margen no se recupera, el valor se acerca al del bajista (73,51 EUR).',
  narrativas: {
    Bajista: 'Dupixent pierde cuota antes de 2031 frente a moléculas de dosis espaciada y la caída tras el vencimiento es más profunda; la cartera no repone y el margen baja 1,5 puntos. Es lo que vivió Sanofi con Lantus en 2015-2018.',
    Base: 'Se cumple la guía de 2026, Dupixent crece hasta 2030, las ventas caen un 14 % en 2031-2033 y el resto de la cartera y las compras compensan la mitad de la pérdida.',
    Alcista: 'Las patentes secundarias retrasan los biosimilares y la nueva dirección cierra acuerdos que reponen el crecimiento: +1,5 puntos de crecimiento y +1 de margen.',
  },
  escenarios_comentario: 'El bajista (73,51 EUR) queda prácticamente en el precio actual (+0,6 %), el base da 93,36 y el alcista 105,89 (+44,9 %): el precio ya descuenta algo peor que nuestro bajista. La asimetría no se puede calcular como cociente porque el bajista no pierde, lo que dice que el riesgo está más en el tiempo (cuándo reconoce el mercado el valor) que en la cifra.',
  suma_partes_comentario: 'No aplica: Dupixent, vacunas y el resto de farma comparten I+D, fabricación y red comercial, y no publican resultado por segmento.',
  valoracion_comentario: 'Pesos: 60 % DCF, 30 % escenarios y 10 % comparables; sin transacciones (no hay múltiplos legibles). El DCF es el método que recoge el precipicio de 2031, que los múltiplos a 12 meses ignoran; por eso los comparables, que darían 140-170 EUR, pesan poco. El resultado, 98,70 EUR de valor intrínseco, queda un 35,0 % por encima del precio. La dispersión entre métodos es grande y se debe al calendario de patentes, no a los datos.',
  justif12m: {
    Bajista: 'Ventas de 2028e de 50.473 M (−2 puntos de crecimiento anual) y margen operativo business del 28,0 %: BPA de 8,91 EUR. Dupixent se frena y el mercado aplica un PER aún más bajo.',
    Base: 'Ventas de 52.440 M, margen operativo business del 29,5 %, intereses de 500 M e impuestos del 21 %: BPA de 9,79 EUR sobre 1.203 M de acciones, sin recompras nuevas.',
    Alcista: 'Ventas de 53.942 M y margen del 30,5 %: BPA de 10,43 EUR; el mercado devuelve parte del descuento a la vista de una cartera que repone.',
  },
  diferencia_consenso: 'Nuestro BPA de 2026e (≈8,51 EUR) coincide con el implícito en el consenso (≈8,58) [D3]. Nuestro precio base a 12 meses (78,32 EUR) queda un 13,0 % por debajo del objetivo medio de los analistas (90 EUR): la diferencia es el múltiplo, no el beneficio. Aplicamos la regla común (el PER actual de 8,0 veces, el menor frente a la mediana de 11,1), mientras los analistas suponen que el PER vuelve a ≈10 veces. No acercamos la cifra: es la regla.',
  comentario12m: 'El objetivo a 12 meses (81,43 EUR) queda un 17 % por debajo del valor intrínseco (98,70 EUR). La distancia la cierra solo una prueba de que el hueco de 2031 es menor de lo que descuenta el mercado: victorias judiciales en las patentes de Dupixent o resultados de fase III de la cartera nueva. Ninguna tiene fecha en los próximos 12 meses, así que la tesis del valor intrínseco es a varios años; la de 12 meses descansa en el crecimiento del BPA (≈+7 % anual) y en el dividendo (5,6 %), sin necesidad de que el múltiplo suba.',
};
