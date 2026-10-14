// Textos del analista para Novonesis (corte 2026-10-14). Cifras del motor tal cual (datos.json → calc); hechos con cita de nota.
const P1 = { id: 1, titulo: 'Ficha sectorial «Ingredientes especiales: enzimas, aromas y biosoluciones» (perímetro, tamaño, comparables)', editor: 'Análisis propio (sectores/ingredientes-especiales-2026-10-14.md)', tipo: 'Sectorial', fecha: '2026-10-14', url: 'sectores/ingredientes-especiales-2026-10-14.md' };

export default {
  fuentes: [P1],
  limitaciones: 'Cuentas en EUR (Novonesis presenta en euros desde 2024; el resumen de cinco años del informe 2025 trae 2021-2023 de Novozymes en euros). La cuenta 2021-2023 es la de Novozymes sola (antes de la fusión con Chr. Hansen del 29-ene-2024): no es comparable con 2024-2025; balance y flujos de 2021-2023 salen del XBRL ESEF en DKK pasado a EUR (medias implícitas de la cuenta y cierres del BCE), sin separar fondo de comercio ni inmovilizado. La acción cotiza en DKK (Nasdaq Copenhague, clase B): precio de 449,00 DKK del 14-oct-2026 pasado a 60,06 EUR con el BCE (7,4754). El BPA de la regla a 12 meses es el «ajustado sin PPA» de la empresa (sin amortización de intangibles de compras ni partidas especiales), porque es el único comparable antes y después de la fusión; el BPA NIIF se da al lado. El consenso de MarketScreener (BPA NIIF) se pasa a esa base sumando la amortización PPA neta de impuestos (estimación propia, ~0,53 EUR por acción). Comparables de MarketScreener del 14-oct-2026 pasados a EUR.',
  controles_explicados: [
    { control: 'Regresión múltiplo-crecimiento', explicacion: 'Con seis comparables de crecimiento casi igual (3-5 %) la regresión no explica nada; no se usa.' },
    { control: 'Crecimiento del BPA base', explicacion: 'El salto es de base, no de negocio: el último BPA real (1,25 EUR) es NIIF, con 302,7 M de amortización de intangibles de la fusión y 65,9 M de partidas especiales; el BPA de la regla (2,52 en 2028e) es el ajustado sin PPA, que en 2025 fue 1,99. Desde 1,99 el crecimiento es del 8,2 % anual.' },
    { control: 'Fuentes sin citar', explicacion: 'Las fuentes sin citar son documentos de contexto (informes anuales de 2022-2023 en DKK y páginas de comparables) cuyos datos entran por tablas.' },
  ],
  huecos: [],
  secciones: {
    historia: {
      resumen: 'Novonesis nace el 29 de enero de 2024 de la fusión por canje de acciones de Novozymes, líder mundial en enzimas industriales escindido de Novo Nordisk en 2000, y Chr. Hansen, líder en cultivos lácteos y probióticos fundado en 1874 [A1]. Los accionistas de Chr. Hansen recibieron 1,5332 acciones B por acción, con una prima del 49 % [B4]; la sociedad cotizada sigue siendo Novozymes A/S y Novo Holdings conserva el control con el 25,5 % del capital y el 63,4 % de los votos [C1]. En junio de 2025 compró a dsm-firmenich su parte de la alianza de enzimas para piensos por 1.500 M EUR [A5]. En agosto de 2025 lanzó la estrategia 2030 (crecimiento orgánico del 6-9 %, margen del ~39 %) [B1].',
      hitos: [
        { anio: '1925', hito: 'Origen en Novo Terapeutisk Laboratorium (enzimas desde los años cuarenta).' },
        { anio: '2000', hito: 'Novozymes se separa de Novo Nordisk y sale a bolsa en Copenhague.' },
        { anio: '2020', hito: 'Ester Baiget (de Dow) es nombrada consejera delegada.' },
        { anio: '2022', hito: 'Anuncio de la fusión con Chr. Hansen (prima del 49 %).' },
        { anio: '2024', hito: 'Cierre de la fusión (29-ene) y venta del negocio de lactasa a Kerry exigida por Bruselas [A1].' },
        { anio: '2025', hito: 'Compra de la parte de dsm-firmenich en la Feed Enzyme Alliance (1.500 M EUR) y estrategia 2030 [A5, B1].' },
        { anio: '2026', hito: 'Bonos de 1.700 M EUR con rating A-, compra de Plumino (Tailandia) y de MicroBioGen, y recompra de 1.000 M EUR hasta 2029 [A2].' },
      ],
      confianza: 'Alta',
    },
    negocio: {
      descripcion: 'Novonesis fabrica por fermentación enzimas y microorganismos (cultivos, probióticos, levaduras, biocontrol) que sus clientes usan en cantidades pequeñas para producir más o mejor: detergentes que lavan en frío, lácteos con más rendimiento y vida útil, bioetanol con más litros por tonelada de maíz, piensos que aprovechan mejor el fósforo, cerveza y pan sin aditivos químicos [A1]. Vende en dos divisiones: Food & Health (1.867,3 M EUR en 2025: alimentos y bebidas 1.372,5 y salud humana 494,8) y Planetary Health (2.290,3 M: cuidado del hogar 801,2 y agricultura, energía y técnica 1.489,1) [A1]. Tiene 11.641 empleados, la mitad de ellos en I+D y producción en Dinamarca, Estados Unidos, China e India, y vende en unos 140 países; los mercados emergentes son el 36 % de las ventas [A1].',
      como_gana_dinero: 'El producto pesa poco en el coste del cliente y le ahorra mucho más (energía, materia prima, rendimiento), lo que da poder de precio: en el 1S26 el precio sumó cerca de 2 puntos al crecimiento orgánico del 8 % [A2]. El margen EBITDA ajustado es del 37,1 % (2025) y el bruto ajustado del 59,1 % [A1]: la fermentación tiene costes fijos altos, así que el volumen apalanca el margen. Casi todo es recurrente: los productos van dentro de las fórmulas del cliente y cambiarlos exige reformular y validar. Las cinco mayores cuentas son el 14 % de las ventas [A1]. La sensibilidad principal es el dólar: un 5 % de movimiento del EUR/USD cambia el EBITDA en 40-45 M EUR [A2].',
      clientes: 'Clientes industriales grandes: fabricantes de detergentes (Procter & Gamble, Unilever, Henkel, por sector), lácteos, cerveceras, productoras de etanol en EE. UU. y Brasil, fabricantes de piensos y de suplementos. Concentración baja: los cinco primeros, 14 % de las ventas en 2025 (16 % en 2024) [A1]. El poder de precio se ve en las cifras: +2 puntos de precio en 2026 con inflación de costes moderada y margen bruto ajustado de 59,7 % en el 1S26, 100 pb más que un año antes [A2]. La salida de Rusia y Bielorrusia restó ~1,5 puntos al crecimiento del 1S26 [A2].',
      confianza: 'Alta',
    },
    sector: {
      definicion: 'El mercado relevante son las biosoluciones industriales: enzimas industriales (detergentes, alimentos, bebidas, piensos, bioenergía) y microorganismos (cultivos lácteos, probióticos, biocontrol agrícola). Usamos el de enzimas industriales como referencia de tamaño, porque es el único con dos fuentes independientes: 8,42 mil M USD en 2025 según MarketsandMarkets y 7,7 mil M USD en 2024 según Research and Markets [B2, B3]. Ámbito mundial. Novonesis vende 4.157,6 M EUR, más que el mercado de enzimas porque suma cultivos, probióticos y HMO; por eso la cuota se mide a mano (ficha sectorial [P1]).',
      tamano: '≈ 7.500 M EUR en 2025 (8,42 mil M USD, enzimas industriales) [B2]; 7,7 mil M USD en 2024 [B3]',
      unidad_serie: 'millones de EUR (enzimas industriales; 2026e-2030e con la TCAC de MarketsandMarkets)',
      serie: [{ anio: '2025', tamano: 7521 }, { anio: '2026e', tamano: 8070 }, { anio: '2027e', tamano: 8659 }, { anio: '2028e', tamano: 9291 }, { anio: '2030e', tamano: 10728 }],
      tcac_historico_pct: 6.5, tcac_previsto_pct: 7.0, cr5_pct: null, estructura: 'Concentrada',
      drivers: [
        { driver: 'Sustitución de química por biología (detergentes en frío, panadería y lácteos sin aditivos)', efecto: '+', horizonte: 'Estructural', evidencia: 'Cuidado del hogar creció un 8 % orgánico en el 1S26 [A2]' },
        { driver: 'Bioenergía (etanol en EE. UU., Brasil e India)', efecto: '+', horizonte: 'Cíclico', evidencia: 'Agricultura, energía y técnica +6 % orgánico en el 1S26 [A2]' },
        { driver: 'Proteína láctea y alimentos «limpios»', efecto: '+', horizonte: 'Estructural', evidencia: 'Food & Beverages +11 % orgánico en el 1S26 [A2]' },
        { driver: 'Suplementos en EE. UU. (probióticos)', efecto: '−', horizonte: 'Cíclico', evidencia: 'Human Health solo +4 % en el 1S26 por un mercado de suplementos prudente [A2]' },
        { driver: 'Aranceles y divisa (dólar)', efecto: '−', horizonte: 'Cíclico', evidencia: 'Divisa −4 puntos en el 1S26; devolución de aranceles a clientes en el 2S26 [A2]' },
      ],
      porter: [
        { fuerza: 'Rivalidad', intensidad: 2, justificacion: 'Dos grandes en enzimas (Novonesis e IFF) y varios de nicho (AB Enzymes, dsm-firmenich en alimentos); márgenes EBITDA del 37 % frente al 20-24 % de los grupos de ingredientes [B5-B10].' },
        { fuerza: 'Poder de los clientes', intensidad: 3, justificacion: 'Clientes grandes (detergentes, etanol), pero el producto es una parte pequeña de su coste; los cinco primeros, 14 % de las ventas [A1].' },
        { fuerza: 'Poder de los proveedores', intensidad: 2, justificacion: 'Materias primas agrícolas (azúcar, almidón) y energía; se repercuten con precio (+2 puntos en 2026) [A2].' },
        { fuerza: 'Amenaza de entrada', intensidad: 2, justificacion: 'Escala de fermentación, colecciones de cepas y registros regulatorios; las nuevas de biología sintética no han ganado cuota relevante.' },
        { fuerza: 'Amenaza de sustitutos', intensidad: 2, justificacion: 'La alternativa es la química, más cara en energía y peor en etiqueta; el riesgo es la caída de demanda final (etanol), no la sustitución.' },
      ],
      ciclo: { posicion: 'Expansión', comentario: 'Negocio poco cíclico: Novozymes creció en orgánico un 6 % en 2021, un 9 % en 2022 y un 5 % en 2023, en plena inflación de costes [A1]; en 2020 bajaron la bioenergía y el textil y subieron hogar y alimentos. Hoy los indicadores son de expansión: guía elevada a 7-8 % en agosto y crecimiento en todas las áreas [A2]. El punto débil del ciclo es el etanol de EE. UU. y los suplementos.' },
      regulacion: 'Las enzimas y cultivos alimentarios necesitan autorización (EFSA en la UE, GRAS en EE. UU.), lo que alarga la entrada de rivales. La Ley de Biotecnología de la UE (propuesta de 2025-2026) busca acortar las aprobaciones, lo que beneficia al líder con más productos en cartera [B1]. En bioenergía pesan los mandatos de mezcla (RFS de EE. UU., E20 en India). Riesgo de aranceles: Novonesis devuelve aranceles de EE. UU. a clientes en el 2S26 [A2].',
      tendencias: 'La IA acelera el descubrimiento de enzimas y cepas (la empresa dice que acorta el ciclo de I+D) [A1]; favorece a quien tiene más datos propios de cepas y fermentación, que es Novonesis. La fermentación de precisión (proteínas, HMO) abre mercados nuevos, aunque varias empresas emergentes han fracasado por coste. El riesgo es que la IA abarate el diseño de enzimas a rivales pequeños, pero la barrera sigue siendo la producción a escala y el registro, no el diseño.',
      confianza: 'Media',
    },
    competencia: {
      cuota_pct: 45, posicion: '1.º mundial en enzimas industriales (cuota cercana a la mitad, estimación del sector) y en cultivos lácteos; 2.º IFF (antigua Genencor) [B2, P1]',
      foso: {
        veredicto: 'Amplio', tendencia: 'Estable',
        fuentes: [
          { fuente: 'Efectos de red', puntuacion: 0, evidencia: 'No aplica: producto industrial sin red de usuarios.' },
          { fuente: 'Costes de cambio', puntuacion: 4, evidencia: 'Las enzimas y cultivos van dentro de la fórmula del cliente; cambiar exige reformular y validar (detergentes, lácteos). Concentración baja y renovación alta [A1].' },
          { fuente: 'Intangibles (marca, patentes, licencias)', puntuacion: 4, evidencia: 'Colección de cepas y miles de patentes; I+D del 9,8 % de las ventas sin PPA (1S26) [A2].' },
          { fuente: 'Ventaja en costes', puntuacion: 4, evidencia: 'Escala de fermentación: margen EBITDA ajustado del 37,7 % frente al 18-24 % de Kerry, Symrise, Givaudan o dsm-firmenich [A2, B5-B10].' },
          { fuente: 'Escala eficiente', puntuacion: 4, evidencia: 'Mercado de ~7.500 M EUR con dos grandes; un tercero no tendría retorno sobre plantas de fermentación de cientos de millones.' },
        ],
      },
      amenazas: 'Tres amenazas. Primera, IFF, que tras vender Pharma Solutions puede volcar su caja en Health & Biosciences y competir en precio en detergentes y etanol. Segunda, la concentración de clientes en bioenergía, con volúmenes que dependen del precio del maíz y de los mandatos. Tercera, que la IA y la biología sintética abaraten el diseño de enzimas; la probabilidad de que eso erosione el margen en cinco años es baja, porque la barrera es fabricar y registrar a escala.',
      confianza: 'Media',
    },
    financieros: {
      comentario: '**Perímetro.** 2021-2023 son Novozymes sola (2.010-2.402 M EUR); 2024 suma once meses de Chr. Hansen y 2025 siete meses de la Feed Enzyme Alliance, así que la TCAC de ventas 2021-2025 del 19,9 % es casi toda inorgánica: el crecimiento orgánico fue del 6, 9, 5, 8 y 7 % [A1]. **Márgenes.** El EBITDA ajustado pasó del 33,2 % (2023) al 37,1 % (2025) y al 37,7 % en el 1S26 por sinergias de costes (100 % desde mediados de 2025), precio y mezcla [A1, A2]. El EBIT NIIF (816,7 M, 19,6 %) queda muy por debajo del ajustado porque absorbe 302,7 M de amortización de intangibles de las compras (PPA), 63,8 M de ajustes de inventario de la compra de piensos y 65,9 M de partidas especiales [A1]. Por eso el BPA NIIF cae de 1,51 (2021) a 1,25 (2025) mientras el ajustado sin PPA sube de 1,51 a 1,99.',
      ajustes: 'Usamos las cifras NIIF en la cuenta y sacamos del EBITDA, como no recurrentes, las partidas especiales sin deterioros y los ajustes de inventario de compras (129,7 M en 2025; 288,6 M en 2024; 77,3 M en 2023 y 9,1 M en 2022, costes de la fusión) [A1]. Las partidas especiales se repiten cada año desde 2022 (integración de Chr. Hansen, ERP, compras): en el DCF las restamos del margen (≈ 50 M en 2026 según la guía [A2]). El BPA de la regla a 12 meses es el ajustado sin PPA de la empresa (1,72 en 2024 y 1,99 en 2025 [A1]): BPA NIIF + partidas especiales + ajustes de inventario + amortización PPA, todo neto de impuestos. Lo cuadramos con nuestra fórmula: (EBITDA ajustado 1.543,3 − amortización sin PPA 272,1 − financieros 73,3) × (1 − 22,4 %) = 929,6 M ÷ 467,6 M = 1,99 EUR.',
    },
    trimestres: {
      ultima_presentacion: 'En la conferencia del 20-ago-2026 la dirección elevó la guía de crecimiento orgánico a 7-8 % (antes 5-7 %) y situó el margen en la parte alta del 37-38 % [A2]. El mensaje cambió respecto a mayo: de «prudencia por el consumidor» a «demanda fuerte en todas las áreas», con el segundo trimestre al 9 % orgánico y el precio aportando cerca de 2 puntos [A2]. Las preguntas se centraron en tres asuntos: la normalización del cliente de piensos que adelantó compras en el 1T (neutra en el año, según la empresa), la debilidad de Human Health (+4 %, suplementos en EE. UU.) y el uso de la caja tras anunciar una recompra de 1.000 M EUR hasta 2029 [A2, A7]. La dirección no dio cifra de margen para 2027 más allá de la senda hacia el ~39 % de 2030 y remitió a 2027 para la sustitución de los informes del 1T y 3T por actualizaciones de ventas [A2]. Desde 2027 habrá menos información trimestral, lo que reduce la visibilidad.',
    },
    balance: {
      otros_pasivos: 'Sin pensiones de prestación definida relevantes (los gastos de pensiones son de aportación, 84,0 M en 2025) [A1]. Pasivos por impuestos diferidos de 1.293,7 M (jun-26) ligados sobre todo a los intangibles de la fusión, que no son deuda financiera [A2]. Arrendamientos de 192,0 M, incluidos en la deuda del puente [A2]. Pago pendiente por MicroBioGen (77 %, importe no publicado) y recompra de 1.000 M EUR hasta 2029 en la que venderá Novo Holdings [A2]. Líneas no dispuestas de 940,5 M EUR [A2].',
      comentario: '**Deuda.** El XBRL ESEF da «Borrowings» de 3.005,4 M a dic-25 sumando largo (1.303,9) y corto plazo (1.701,5): incluye 189,6 M de arrendamientos y 2,3 M de derivados [A1]. La deuda financiera sin arrendamientos es 2.815,8 M; el salto del corto plazo era el préstamo puente de 1.470 M de la compra de piensos, refinanciado en marzo de 2026 con bonos a 2030, 2033 y 2037 al 3,25-4,00 % [A2]. Deuda neta de 2.737,6 M y 1,8 veces el EBITDA en junio de 2026, con guía de ~1,8x a final de año [A2]. **Circulante.** 25,9 % de las ventas en 2025, con 147 días de inventario por la fermentación; en el 1S26 sube por paradas de planta programadas [A2].',
    },
    flujos: {
      comentario: 'La caja libre antes de compras fue de 770,4 M EUR en 2025 (18,5 % de las ventas) y 307,6 M en el 1S26 (14 %) [A1, A2]. La conversión del beneficio NIIF parece altísima (204 % en 2024) porque la amortización PPA reduce el beneficio pero no la caja; frente al beneficio ajustado sin PPA (929,4 M) la conversión de 2025 es del 83 %. El capex sube del 9,4 % de las ventas (2024) al 11,3 % (2025) y a una guía del 12-14 % en 2026 por las ampliaciones de capacidad del plan 2030 [A2]: estimamos que unos 3 puntos son de crecimiento sobre un mantenimiento del 7-8 % (estimación propia, con la amortización sin PPA del 6,5 %). La compra de piensos (1.519,8 M) se pagó con deuda [A1].',
    },
    calidad: {
      anios_auditor: null,
      comentario: 'EY firma sin salvedades el informe de 2025 [A1]. La calidad contable está condicionada por la fusión: la amortización de intangibles comprados (302,7 M en 2025) y las partidas especiales (65,9 M) separan el beneficio NIIF del ajustado, y la empresa publica la conciliación completa [A1, A2]. Las partidas especiales llevan cuatro años seguidos (2022-2025), así que no son del todo no recurrentes; el riesgo es que se conviertan en un coste fijo que el «ajustado» no recoge. Altman Z de 4,37 (zona segura), Piotroski F de 6 (falla en deuda, liquidez y emisión de acciones por la fusión) y Beneish M de −2,74, no fiable por el cambio de perímetro. Pagos en acciones de 20,4 M (0,5 % de las ventas) [A1]. Tipo efectivo del 21,5 % en 2025, rebajado por ajustes de años anteriores [A1].',
      senales: [
        { senal: 'Partidas especiales recurrentes (2022-2026)', nivel: 'Media', comentario: '9,1 / 77,3 / 158,0 / 65,9 M y ~50 M guiados para 2026 [A1, A2]; las restamos en el DCF.' },
        { senal: 'Diferencia entre BPA NIIF y ajustado sin PPA', nivel: 'Baja', comentario: '1,25 frente a 1,99 EUR en 2025: la amortización PPA no es caja, pero el precio pagado por Chr. Hansen sí lo fue (en acciones).' },
        { senal: 'Fin de los informes trimestrales completos en 2027', nivel: 'Baja', comentario: 'El 1T y el 3T pasarán a ser actualizaciones de ventas [A2].' },
      ],
    },
    rentabilidad: {
      comentario: 'El ROIC del motor cae del 17-20 % de Novozymes (2021-2023) al 5,7 % en 2025 por el fondo de comercio y los intangibles de la fusión: el capital invertido pasó de 2.764 M a 13.139 M. La empresa publica un ROIC ajustado con fondo de comercio del 5,6 % y sin fondo de comercio del 10,1 % (2025) [A1]. **Con el ROIC publicado (con fondo de comercio), Novonesis no cubre hoy su WACC del 7,71 %: −2,0 puntos.** Sin fondo de comercio queda en +2,4 puntos, y sin fondo de comercio y sin la amortización PPA (NOPAT de ~978 M sobre ~7.240 M de capital medio) en torno al 13,5 %, +5,8 puntos (cálculo propio). El ROIC incremental de 2021-2025 es del 2,9 %: el crecimiento comprado no ha creado valor todavía. El objetivo 2030 es un ROIC sin fondo de comercio del ~16 % [B1]. El negocio orgánico es excelente; el accionista paga el precio de la fusión.',
      confianza: 'Media',
    },
    capital: {
      politica: 'Dividendo de 6,50 DKK por acción con cargo a 2025 (0,87 EUR, un 70 % del beneficio NIIF) y a cuenta de 2,35 DKK en agosto de 2026 [A1, A2]. Recompra plurianual de 1.000 M EUR desde el 2S26 hasta 2029, con amortización de la mayoría de las acciones; Novo Holdings venderá en proporción para mantener el 25,5 % [A2]. Objetivo de deuda neta de 1,3-1,7 veces el EBITDA tras la compra de piensos [A5]. Prioridades: capex de capacidad (12-14 % de las ventas en 2026), compras pequeñas (Plumino, MicroBioGen) y retorno al accionista [A2].',
      comentario: 'La asignación de capital de los últimos cinco años se resume en dos operaciones grandes. La fusión con Chr. Hansen (9.076,8 M EUR en acciones) dio sinergias de costes y de ingresos, pero hundió el ROIC con fondo de comercio del 16,5 % al 5,6 % [A1]. La compra de la parte de dsm-firmenich en piensos se pagó a ~21 veces el EBITDA del primer año [A5], el doble que lo que CVC pagó por el resto del negocio animal de dsm-firmenich (7 veces) [B11]. Entre 2021 y 2025 la caja libre acumulada fue de 2.101 M frente a 1.591 M en compras, 1.438 M en dividendos y 369 M en recompras. La recompra de 1.000 M EUR al precio actual (unas 25 veces el BPA ajustado de 2027) rinde un 4 % en beneficio por acción: es razonable pero no barata.',
    },
    directivos: {
      comentario: 'Equipo estable: Ester Baiget dirige desde 2020 y Rainer Lehmann es CFO desde 2023; no ha habido cambios en la cúpula en 24 meses [A1, C1]. La credibilidad es buena: cumplió la guía de 2024 y 2025 y en 2026 ya la ha subido una vez [C1]. La integración de Chr. Hansen se cerró en plazo (sinergias de costes al 100 % a mediados de 2025) [A2]. No hay plan de sucesión público.',
    },
    gobierno: {
      remuneracion: 'La consejera delegada cobró 5,93 M EUR en 2025: 1,77 M fijos, 2,36 M de bonus anual y 1,80 M de incentivo a largo plazo (valor de concesión), unas 61 veces el coste medio por empleado [C1]. El bonus va hasta el 150 % del salario base. El incentivo a largo plazo 2025-2027 son acciones condicionadas: 50 % crecimiento orgánico, 20 % margen EBITDA ajustado, 10 % ROIC ajustado y 20 % objetivos de sostenibilidad [C1]. Pesa mucho el crecimiento y poco la rentabilidad sobre el capital (10 %), lo que no penaliza pagar caro por compras. No hemos encontrado el resultado de la votación de la remuneración en la junta de marzo de 2026.',
      control_y_defensas: 'Novo Holdings (Fundación Novo Nordisk) tiene todas las acciones A (20 votos cada una) y acciones B (2 votos): el 25,5 % del capital y el 63,4 % de los votos [C1]. Decide la junta y, en la práctica, el consejo; su consejero delegado, Kasim Kutay, se sienta en el de Novonesis, y el presidente, Cees de Jong, es vicepresidente de Novo Nordisk [C1]. La estructura impide una OPA hostil. El accionista de control es estable y de largo plazo, pero la recompra en la que vende en proporción es una operación con parte vinculada [A2]. Seis de los ocho consejeros elegidos por los accionistas son independientes según el código danés [C1].',
    },
    consenso: {
      guidance: '2026 (19-ago-2026): crecimiento orgánico del 7-8 % (antes 5-7 %), ventas en EUR ~0,5 puntos por debajo (divisa −1,5 puntos, compra de piensos +1 punto), margen EBITDA ajustado en la parte alta del 37-38 %, gastos financieros de 80-90 M, capex del 12-14 % de las ventas, partidas especiales de ~50 M y deuda neta de ~1,8 veces el EBITDA a final de año [A2]. Plan 2030: crecimiento orgánico medio del 6-9 %, margen EBITDA ajustado del ~39 % y ROIC sin fondo de comercio del ~16 % [B1].',
      revisiones: 'Una sola fuente gratuita con estimaciones completas (MarketScreener, 15 analistas, BPA NIIF): 11,83 DKK en 2026, 13,70 en 2027 y 15,71 en 2028 [D2]. Lo pasamos a la base sin PPA sumando ~0,53 EUR por acción (amortización PPA de ~317 M al año neta de impuestos). Los objetivos han subido tras el 1S26: de ~466 DKK en agosto a 491,93 DKK en septiembre (tradedesk.dk) y 499,33 DKK de media hoy (MarketScreener) [D2, D6]. JPMorgan, por ejemplo, subió su objetivo de 430 a 500 DKK [E1].',
    },
    bolsa: {
      comentario: 'La acción sube un 10,1 % en 2026 y un 12,5 % en un año, por encima del OMXC25 (0,9 % y 9,9 %), lastrado por Novo Nordisk, pero por debajo del sector químico europeo (19,6 % en el año) [D1]. A cinco años la rentabilidad es casi nula (0,4 % anual): la acción pasó de 537 DKK a fin de 2021 a 352 DKK en 2022 con la subida de tipos (caída máxima del 46,9 %) y aún no ha vuelto a aquel nivel [D1]. La subida de 2026 coincide con la elevación de la guía y la recompra; el máximo de 52 semanas (465 DKK) es del 1-sep-2026. Beta mensual de 0,79 frente al OMXC25; volatilidad del 27,1 %.',
    },
    multiplos_historicos: {
      comentario: 'Con el BPA NIIF la historia no sirve (2024-2025 están deprimidos por la amortización de la fusión). En base ajustada sin PPA, el PER adelantado (cierre ÷ BPA del año siguiente) fue de 31,1x en 2020, 39,9x en 2021 (burbuja de tipos cero), 27,5x en 2022, 28,9x en 2023, 27,5x en 2024 y 25,3x en 2025; hoy es de 25,8x sobre nuestro BPA de 2027. Cotiza en el mínimo de su historia reciente, algo por debajo de la mediana de 27,5x: el mercado ya no paga la prima de crecimiento de 2020-2021, con razón, porque el ROIC con fondo de comercio ha caído a un tercio.',
    },
    comparables: {
      criterio: 'Seis grupos de ingredientes especiales cotizados que venden a la industria de alimentos, hogar y nutrición: Symrise, Givaudan, DSM-Firmenich, IFF (el gran rival en enzimas), Kerry y Croda. No hay otra empresa cotizada de enzimas pura; AB Enzymes va dentro de AB Foods. Todos son de crecimiento similar (3-5 %) y márgenes mucho menores (18-24 %). El PER de DSM-Firmenich e IFF se deja fuera de la mediana: su BPA NIIF está lastrado por amortizaciones de compras y desinversiones (PER de 36-51 veces) [B6, B7]. Cifras de MarketScreener del 14-oct-2026 en EUR.',
      comentario: 'Novonesis cotiza a 17,0 veces el EBITDA de los próximos 12 meses y 26,0 veces su BPA ajustado sin PPA, con prima frente a la mediana de los comparables en EV/EBITDA (16,2x) y PER (23,0x), pero con un margen EBITDA del 37,3 % frente al ~21 % y un crecimiento esperado del 7,8 % frente al ~5 %. La prima está justificada en margen y crecimiento; no en ROIC con fondo de comercio (5,7 % frente al 7-14 % de Symrise, Kerry o Givaudan). Por múltiplos, el valor implícito queda por debajo del precio porque los comparables tienen la mitad de margen: aplicar su EV/ventas a Novonesis no tiene sentido y por eso pesamos solo el 20 % a los comparables.',
    },
    transacciones: {
      comentario: 'Tres operaciones con múltiplo publicado o derivable dan una horquilla muy amplia: 21,4 veces el EBITDA por la parte de dsm-firmenich en enzimas de piensos (2025), 13 veces por Pharma Solutions de IFF (2024) y 7 veces por el negocio de vitaminas y premezclas de dsm-firmenich (2026) [A5, B11]. Las enzimas cotizan en lo alto del rango, lo que confirma la calidad del activo. Novonesis no puede ser objeto de una OPA: Novo Holdings controla el 63,4 % de los votos [C1]. Por eso las transacciones no pesan en el valor objetivo.',
    },
    sentimiento: {
      temas: [
        { tema: 'Valoración exigente (PER de 35 veces el BPA NIIF)', postura: 'Bajista', peso: 'Alto', contraste: 'Tienen razón a medias: sobre el BPA NIIF de 2026 (1,58 EUR de consenso) el PER es de 38 veces, pero el BPA ajustado sin PPA (2,16 nuestro) lo deja en 27,8 veces y en el mínimo de su historia adelantada [D2].' },
        { tema: 'Crecimiento orgánico del 7-8 % y subida de la guía', postura: 'Alcista', peso: 'Medio', contraste: 'Confirmado: 8 % en el 1S26 y guía elevada [A2]; nuestro base proyecta un 7 % en euros hasta 2028.' },
        { tema: 'Recompra de 1.000 M EUR hasta 2029', postura: 'Alcista', peso: 'Medio', contraste: 'Es el 3,6 % de la capitalización en tres años y medio; suma ~1 % anual al BPA [A2].' },
        { tema: 'Novo Holdings y el «sello Novo» tras la caída de Novo Nordisk', postura: 'Dividida', peso: 'Bajo', contraste: 'Los negocios no tienen relación operativa; el riesgo es de gobierno (control del 63,4 % de los votos), no de contagio [C1].' },
      ],
      lectura: 'El debate de particulares es escaso: Novonesis es una acción institucional (el 65 % de las B está en 50 inversores) [C1]. Lo que se lee gira en torno a si está cara, y casi siempre se mide con el BPA NIIF, que exagera el PER. No hay euforia ni capitulación: el tono mejora con la guía y la recompra, en línea con las subidas de objetivos de los analistas. No aporta un riesgo que el informe no recoja.',
    },
  },
  catalizadores: {
    items: [
      { fecha: '2026-11-05', evento: 'Ventas y resultados de 9M 2026', efecto: 'Confirmar el 7-8 % orgánico tras el adelanto de compras de piensos del 1T', probabilidad: 'Alta', sentido: '+/−' },
      { fecha: '2S26-2029', evento: 'Recompra de 1.000 M EUR', efecto: '~1 % anual de BPA', probabilidad: 'Alta', sentido: '+' },
      { fecha: 'Febrero de 2027', evento: 'Resultados 2026 y guía 2027', efecto: 'Primer año sin la Feed Enzyme Alliance como crecimiento comprado; margen camino del 39 %', probabilidad: 'Alta', sentido: '+/−' },
      { fecha: '2026-2027', evento: 'Cierre de la compra de MicroBioGen (aprobación de la ACCC)', efecto: 'Levaduras para etanol y alimentos', probabilidad: 'Media', sentido: '+' },
      { fecha: '2027', evento: 'Paso a actualizaciones de ventas en el 1T y 3T', efecto: 'Menos visibilidad del margen', probabilidad: 'Alta', sentido: '−' },
      { fecha: '2026-2027', evento: 'Ley de Biotecnología de la UE', efecto: 'Aprobaciones más rápidas para enzimas y cultivos', probabilidad: 'Media', sentido: '+' },
    ],
    confianza: 'Media',
  },
  riesgos: {
    items: [
      { riesgo: 'Pagar un múltiplo de calidad por un ROIC con fondo de comercio por debajo del WACC', tipo: 'Valoración', probabilidad: 'Alta', impacto: 'Alto', efecto_valor: '−25 % (valor intrínseco frente al precio)', mitigante: 'ROIC sin fondo de comercio del 10,1 % y objetivo del ~16 % en 2030 [B1]', senal: 'ROIC ajustado sin fondo de comercio por debajo del 11 % en 2026' },
      { riesgo: 'Desaceleración del etanol y de los piensos en EE. UU. (precio del maíz, mandatos)', tipo: 'Mercado', probabilidad: 'Media', impacto: 'Medio', efecto_valor: '−10 % (escenario bajista: −2,5 p.p. de crecimiento)', mitigante: 'Diversificación: agricultura, energía y técnica es el 36 % de las ventas', senal: 'Crecimiento orgánico de AET por debajo del 3 % un trimestre' },
      { riesgo: 'Dólar débil', tipo: 'Divisa', probabilidad: 'Media', impacto: 'Medio', efecto_valor: '−3 % del EBITDA por cada 5 % de caída del USD', mitigante: 'Cobertura del 72 % de 2026 a 1,15 EUR/USD [A2]', senal: 'EUR/USD por encima de 1,20' },
      { riesgo: 'Competencia de IFF en precio tras desapalancarse', tipo: 'Competencia', probabilidad: 'Media', impacto: 'Medio', efecto_valor: '−8 % (−1,5 p.p. de margen)', mitigante: 'Costes de cambio y escala', senal: 'Contribución del precio al crecimiento por debajo de 1 punto' },
      { riesgo: 'Partidas especiales que no desaparecen y compras caras', tipo: 'Asignación de capital', probabilidad: 'Media', impacto: 'Medio', efecto_valor: '−5 %', mitigante: 'Objetivo de deuda de 1,3-1,7x; recompra en marcha', senal: 'Partidas especiales por encima de 50 M en 2027 o compra a más de 20 veces el EBITDA' },
      { riesgo: 'Suplementos y HMO débiles (Human Health)', tipo: 'Mercado', probabilidad: 'Media', impacto: 'Bajo', efecto_valor: '−3 %', mitigante: 'Human Health es el 12 % de las ventas', senal: 'Human Health negativo en orgánico' },
      { riesgo: 'Gobierno: control de Novo Holdings con el 63,4 % de los votos', tipo: 'Gobierno', probabilidad: 'Baja', impacto: 'Medio', efecto_valor: 'Descuento de control (no cuantificado)', mitigante: 'Accionista estable de largo plazo', senal: 'Operaciones con partes vinculadas fuera de la recompra' },
      { riesgo: 'IA y biología sintética que abaratan el diseño de enzimas a rivales', tipo: 'Tecnológico', probabilidad: 'Baja', impacto: 'Medio', efecto_valor: '−10 % a largo plazo', mitigante: 'La barrera es la fermentación a escala y el registro; Novonesis usa la IA en su propio I+D [A1]', senal: 'Entrada de un rival con planta propia en detergentes o lácteos' },
    ],
    premortem: 'Octubre de 2029: la acción ha perdido un 40 %. Lo más probable es que no haya fallado el negocio, sino el precio. En 2027 el etanol de EE. UU. frenó con el maíz caro y los piensos normalizaron tras los adelantos de compras: el crecimiento orgánico bajó al 4-5 %, por debajo del 6-9 % prometido. El margen se quedó en el 37,5 % porque las partidas especiales y la inflación salarial danesa se comieron el apalancamiento operativo, y el dólar a 1,25 restó 3 puntos de EBITDA. Con un crecimiento de un dígito medio, el mercado dejó de pagar 26 veces el BPA ajustado y lo llevó a las 20 veces de Symrise o Kerry: −23 % de múltiplo y −15 % de beneficio. Una compra cara más (fermentación de precisión a 25 veces el EBITDA) bajó otra vez el ROIC. Las señales que lo habrían anticipado: crecimiento orgánico de Agricultura, Energía y Técnica por debajo del 3 % dos trimestres, contribución del precio por debajo de 1 punto y ROIC sin fondo de comercio estancado en el 10 %.',
    confianza: 'Media',
  },
  esg: {
    calificaciones: [],
    materialidad: 'El producto es el argumento ESG: las enzimas y microorganismos reducen el consumo de energía y química de los clientes, y la empresa fija un objetivo de reducción del 75 % de las emisiones de alcance 1 y 2 desde 2018 para 2030 (67 % logrado en 2025) con un 100 % de electricidad renovable [A1]. El 20 % del incentivo a largo plazo depende de objetivos de sostenibilidad [C1]. El asunto material con cifra es la energía de la fermentación en Dinamarca y EE. UU.; un precio del CO₂ alto favorece a sus clientes más que la perjudica a ella.',
    controversias: 'No hemos encontrado sanciones ni litigios relevantes en tres años. La fusión obligó a vender el negocio de lactasa a Kerry por exigencia de la Comisión Europea (2024) [A1], y la salida de Rusia y Bielorrusia restó ~1 punto de crecimiento en 2025-2026 [A2].',
    confianza: 'Media',
  },
  preguntas: {
    items: [
      { tema: 'ROIC', pregunta: '¿Qué ROIC sin fondo de comercio espera para 2027 y con qué capex? ¿El 12-14 % de las ventas de 2026 es un pico?', por_que: 'Con el ROIC publicado por debajo del WACC, la tesis depende de que el capital nuevo rinda por encima del 15 %.' },
      { tema: 'Partidas especiales', pregunta: '¿Cuándo dejarán de existir las partidas especiales de la fusión y del ERP?', por_que: 'Llevan cuatro años y el «ajustado» las excluye.' },
      { tema: 'Bioenergía', pregunta: '¿Qué parte del crecimiento de AET viene del etanol de EE. UU. y cuánto depende del precio del maíz?', por_que: 'Es el negocio más cíclico (36 % de las ventas).' },
      { tema: 'Recompra', pregunta: '¿A qué PER deja de tener sentido recomprar frente a compras o deuda?', por_que: 'La recompra se hace a ~26 veces el BPA ajustado.' },
      { tema: 'IFF', pregunta: '¿Ve más agresividad de IFF en precio en detergentes y etanol tras su desapalancamiento?', por_que: 'Es el único rival con escala.' },
      { tema: 'Información', pregunta: '¿Por qué reducir los informes del 1T y 3T a ventas desde 2027?', por_que: 'Menos visibilidad del margen para el inversor.' },
    ],
    confianza: 'Media',
  },
  dcf_justificacion: {
    crecimiento: 'Base: 7,0 % en euros en 2026 (fijo: guía orgánica del 7-8 % menos ~0,5 puntos de divisa y perímetro [A2]), 7,0 % en 2027-2028, 6,5 % en 2029 y 6,0 % en 2030, en la parte baja del 6-9 % del plan 2030 [B1] y en línea con el 6,6-7,3 % previsto para el mercado de enzimas [B2, B3]; después baja al 3 % en 2033. El consenso de MarketScreener da +7,6 %, +7,6 % y +7,2 % para 2026-2028 [D2]: vamos algo por debajo.',
    margenes: 'Margen EBITDA del DCF = ajustado de la guía (37,9 % en 2026, camino del ~39 % de 2030 [A2, B1]) menos las partidas especiales que se repiten (1,1 puntos en 2026 por los ~50 M guiados; 0,5 en 2027 y 0,3 después). Queda en 36,8 % en 2026 y 38,7 % desde 2030. El consenso de EBITDA (ajustado) es de 1.684 M en 2026, el 37,9 % de las ventas [D2].',
    inversion: 'Capex del 13 % de las ventas en 2026 y 12 % en 2027 (guía del 12-14 % por ampliaciones [A2]), bajando al 8,2 % en 2033, por encima de la amortización sin PPA (8,0 %). La amortización del DCF excluye la de intangibles comprados (~300 M al año), que no es caja y no desgrava como tal: incluirla bajaría el impuesto y subiría el valor ~6 %. Circulante del 26 % de las ventas, como en 2025 [A1].',
    wacc: 'Tasa libre: Bund a 10 años del 3,51 % del 14-oct-2026 [D3] (la corona está anclada al euro). Beta de 0,86: la mensual de cinco años frente al OMXC25 es 0,79 (ajustada 0,86) y la semanal de dos años 0,46, sesgada porque el índice lo domina Novo Nordisk [D1]; usamos la ajustada. Prima de mercado del 5,5 %, sin prima adicional (rating A- [A2], 64 % de ventas en mercados desarrollados). Coste de la deuda del 3,8 % (bonos al 3,25-4,00 % [A2]) y 10 % de deuda a valor de mercado. WACC del 7,71 %.',
    terminal: 'Crecimiento a perpetuidad del 2,5 % en euros (inflación del 2 % y 0,5 puntos reales), por debajo de la tasa libre menos medio punto (3,0 %). El múltiplo de salida implícito en Gordon es 11,6 veces el EBITDA, frente a 17,0 veces hoy y a 21 veces en la compra de piensos: el terminal es prudente frente al mercado. Con un múltiplo de salida de 18 veces el valor terminal sería de 45.050 M frente a 29.051 M.',
  },
  puente_comentarios: {
    '2026e': 'Guía: 7-8 % orgánico (precio cerca de 2 puntos y sinergias de ingresos ~1 punto) con la salida de países restando ~1 punto; divisa −1,5 y piensos +1 punto [A2].',
    '2027e': 'Volumen del 5 % (mercado de enzimas al 6,6-7,3 % [B2, B3]) y precio del 1,5 %; recompra y MicroBioGen sin efecto en ventas, +0,5 de compras pequeñas.',
    '2028e': 'Igual que 2027: parte baja del 6-9 % del plan 2030 [B1].',
    '2029e': 'Volumen del 5 % y precio del 1,5 %.',
    '2030e': 'Volumen del 4,5 %: empieza la convergencia hacia el terminal.',
  },
  veredicto: 'Sí',
  sostenibilidad_justificacion: 'El motor no hace la prueba de reinversión (la reinversión neta es el 14 % del NOPAT, por debajo del 15 %), así que la hacemos a mano. Con el ROIC con fondo de comercio (5,7 %) el crecimiento financiable sería del 0,8 %, pero esa cifra mide el precio de la fusión, no el rendimiento del capital nuevo: el capital operativo sin fondo de comercio ni intangibles comprados es de ~2.480 M y rinde ~39 % (NOPAT sin PPA de ~978 M) [A1], así que una reinversión del 14 % financia un 5,5 % de crecimiento en volumen; el precio aporta 1,5-2 puntos (2 puntos en 2026 [A2]). La cuota es estable: proyectamos un 5,7 % medio frente al 6,6-7,3 % del mercado de enzimas [B2, B3] (prueba de cuota a mano: el mercado final va en null porque la cuota publicada es de enzimas y las ventas incluyen cultivos y probióticos). Foso amplio y precio demostrado: veredicto «Sí»; no se rebaja el base.',
  dcf_lectura: 'El DCF da 44,15 EUR por acción (330 DKK), un 26,5 % por debajo del precio, con el valor terminal en el 73 % del total. El DCF inverso dice que a 60,06 EUR el mercado descuenta un crecimiento del 11,4 % anual en 2027-2033, el doble del 5,5 % de nuestro caso base en esos años, o un margen EBITDA del 47,9 % en vez del 38,7 %: la rentabilidad implícita es del 6,5 %, por debajo de nuestro WACC del 7,71 % y cerca del 6,7 % que pide el mercado con su prima implícita. Es exigente: ni el plan 2030 de la empresa (6-9 % orgánico, ~39 % de margen) [B1] llega a esas cifras. Con la prima implícita del mercado el DCF sube a 56,51 EUR (−5,9 %). Lo que sostiene el precio no es el flujo de caja de los próximos siete años sino la confianza en un crecimiento largo y estable con márgenes del 38-39 %, que el mercado capitaliza a una tasa más baja que la nuestra.',
  narrativas: {
    Bajista: 'El etanol y los piensos de EE. UU. frenan y el dólar cae a 1,25: crecimiento del 4-5 % y margen 1,5 puntos por debajo del base, como Novozymes en 2023 (5 % orgánico y 33,2 % de margen) [A1].',
    Base: 'Se cumple la parte baja del plan 2030: 7 % en euros hasta 2028 y margen camino del 39 %.',
    Alcista: 'Las sinergias de ingresos y la Ley de Biotecnología de la UE llevan el crecimiento al 8,5 % y el margen al 39,5 % antes de 2030.',
  },
  escenarios_comentario: 'La asimetría es desfavorable con nuestro WACC: el bajista vale 32,52 EUR (−45,9 %) y el alcista 49,36 (−17,8 %); ningún escenario del DCF llega al precio. A 12 meses, con la regla de múltiplos, el bajista da 48,35 EUR (−19,5 %) y el alcista 74,75 (+24,5 %): la acción depende del múltiplo que el mercado sigue dispuesto a pagar, no de los flujos. El bajista es verosímil: es lo que pasó en 2022-2023, cuando la acción cayó un 47 % desde su máximo.',
  casos_12m: {
    Bajista: 'Crecimiento del 4,5 % en 2027-2028 y margen EBITDA ajustado 1,5 puntos por debajo (37,1 % en 2028): beneficio ajustado sin PPA de ~1.037 M sobre 457 M de acciones (tras la recompra) = 2,27 EUR.',
    Base: 'Ventas de 5.094 M en 2028 (+7 % anual), margen ajustado del 38,6 %, amortización sin PPA del 7,6 %, financieros de −95 M y tipo del 22,5 %: 1.154 M ÷ 457 M de acciones = 2,52 EUR.',
    Alcista: 'Crecimiento del 8,5 % y margen del 39,4 % en 2028: 1.217 M ÷ 457 M = 2,66 EUR.',
  },
  per_excluidos: 'Historia adelantada en base ajustada sin PPA y en EUR (precio de cierre del año pasado a EUR con el BCE ÷ BPA ajustado sin PPA del año siguiente) [D1, A1]: 2020 46,97 / 1,51 = 31,1x; 2022 47,32 / 1,72 = 27,5x; 2023 49,79 / 1,72 = 28,9x; 2024 54,67 / 1,99 = 27,5x; 2025 54,60 / 2,16 (nuestro 2026e) = 25,3x. Excluido 2021 (72,24 / 1,81 = 39,9x): burbuja de múltiplos de tipos cero. 2020-2023 son Novozymes sola; el BPA por acción es continuo porque las acciones de Novozymes no cambiaron en la fusión. Mediana 5 años 27,5x; mínimo 25,3x; media larga (2020, 2022-2025) 28,1x. Actual = 60,06 / 2,33 (nuestro 2027e) = 25,8x.',
  diferencia_consenso: 'Nuestro BPA ajustado sin PPA de 2026 (2,16 EUR) supera en un 2 % al consenso llevado a esa base (2,11) y el de 2028 (2,52) queda un 4 % por debajo (2,62) [D2]: vamos algo más prudentes en crecimiento (7 % frente a 7,6 %). Nuestro precio base (67,03 EUR, 501 DKK) coincide con el objetivo medio de los analistas (66,80 EUR, 499,33 DKK) [D2]. La diferencia con el consenso es pequeña y está en las ventas, no en el múltiplo.',
  objetivo_comentario: 'El salto del BPA desde 1,25 EUR (NIIF de 2025) hasta 2,52 (2028e) no es crecimiento: el primero lleva 302,7 M de amortización PPA y 129,7 M de partidas especiales y de inventario; en la misma base (ajustado sin PPA) el BPA pasa de 1,99 a 2,52, un 8,2 % anual. El objetivo a 12 meses (64,29 EUR, 480,60 DKK) queda un 43 % por encima del valor intrínseco (44,94): la tesis de valor es a más de un año y el precio descansa en que el mercado siga pagando ~26 veces el beneficio ajustado. Para cerrar la distancia haría falta que el ROIC sin fondo de comercio llegara al ~16 % del plan 2030 o que el mercado aceptara una rentabilidad del 6,5 %.',
  valoracion_comentario: 'DCF y escenarios pesan un 40 % cada uno: el negocio es estable y su valor depende del crecimiento y del margen a largo plazo, que es lo que recogen. Los comparables, un 20 %: ninguno tiene su margen (37 % frente a ~21 %) y su EV/ventas o EV/EBITDA infravaloran a Novonesis. Las transacciones no pesan: Novo Holdings controla el 63,4 % de los votos. Todos los métodos quedan por debajo del precio salvo el DCF con la prima implícita del mercado (56,51, aún −5,9 %): el valor objetivo es de 44,94 EUR, un 25,2 % por debajo. La dispersión dice que el precio solo se justifica con una tasa de descuento cercana al 6,5 %.',
  resumen: {
    recomendacion: 'Mantener', conviccion: 'Media', justificacion_recomendacion: null, horizonte: '12 meses',
    sintesis: `**La recomendación y por qué.** Mantener, con convicción media. El objetivo a 12 meses es de 64,29 EUR (480,60 DKK) frente a un precio de 60,06 EUR (449 DKK, cierre del 14-oct-2026): una rentabilidad ponderada del 8,5 % y del 13,1 % en el caso base, con dividendo, casi en línea con el objetivo medio de los analistas (66,80 EUR, nuestro base +0,3 %) [D2]. El valor intrínseco es de 44,94 EUR, un 25,2 % por debajo del precio, y la asimetría de los escenarios del DCF es desfavorable (−0,39x: alcista −17,8 %, bajista −45,9 %). La razón: el precio ya paga el crecimiento con una rentabilidad implícita del 6,5 %, inferior a nuestro WACC del 7,7 %. La convicción es media porque las dos reglas coinciden y el precio queda lejos de los umbrales; subiría si el ROIC ajustado con fondo de comercio pasa del 7 % en 2026, y bajaría si el crecimiento orgánico del 3T26 (5-nov) cae por debajo del 6 %.

**El negocio.** Novonesis es el líder mundial en enzimas y microorganismos industriales, con un margen EBITDA ajustado del 37,1 % en 2025 frente al 20-24 % de Symrise, Kerry o dsm-firmenich [A1, B5-B10]. Su calidad es «en parte»: la empresa publica un ROIC ajustado del 5,6 % con fondo de comercio y del 10,1 % sin él [A1]; con el WACC del 7,71 % el diferencial es de −2,0 puntos con el publicado y de +2,4 sin fondo de comercio. Antes de la fusión Novozymes ganaba un 17-20 %; el ROIC incremental de la fusión y de la compra de piensos es del 2,9 %. La calidad sí sostiene el crecimiento que proyectamos (7 % anual hasta 2028): el capital operativo sin fondo de comercio rinde cerca del 39 % y la cuota se mantiene en un mercado que crece un 6,6-7,3 % [B2, B3].

**Finanzas.** Las cuentas de 2024-2025 no son comparables con las de Novozymes sola: la amortización de intangibles de la fusión (302,7 M en 2025) y las partidas especiales bajan el BPA NIIF a 1,25 EUR, mientras el ajustado sin PPA fue 1,99 EUR [A1]. La deuda neta es de 1,8 veces el EBITDA a junio de 2026, con rating A- y una recompra de 1.000 M EUR hasta 2029 [A2].

**Equipo y gobierno.** Novo Holdings controla el 63,4 % de los votos con el 25,5 % del capital [C1]: da estabilidad, pero limita la influencia del minoritario y explica una fusión pagada con prima del 49 % [B4].

**Valoración.** El DCF da 44,15 EUR y los comparables 51,32 EUR; el DCF inverso exige un crecimiento del 11,4 % anual o un margen del 47,9 %, muy por encima del plan 2030 [B1]. Con la prima de riesgo que hoy descuenta el mercado (4,2 %) el valor sube a 54,57 EUR (−9,1 %): la distancia es de tasa de descuento, no de cifras. En múltiplos, 25,8 veces el BPA ajustado sin PPA de 2027, en el mínimo de su historia adelantada (mediana 27,5x) pero con prima frente a los comparables (23,0x).

**Riesgos y catalizadores.** Los riesgos de más impacto son la bioenergía de EE. UU., el dólar (un 5 % mueve el EBITDA en 40-45 M) y otra compra cara que vuelva a diluir el ROIC [A2]. El riesgo de que la IA se coma el negocio es bajo: abarata el diseño de enzimas, pero la barrera es la fermentación a escala y el registro, donde Novonesis tiene ventaja. Los foros, divididos, no señalan riesgos nuevos [E1]. Catalizadores: resultados del 3T26 el 5-nov y guía de 2027 en febrero.

**Qué cambiaría la decisión.** Compraríamos por debajo de 44,94 EUR (unos 336 DKK) y venderíamos por encima de 72,40 EUR (unos 541 DKK). También: un crecimiento orgánico por debajo del 5 % durante dos trimestres, o una compra grande pagada a más de 20 veces el EBITDA.`,
    tesis: 'Novonesis es el líder mundial en enzimas y microorganismos industriales: margen EBITDA ajustado del 37,7 % en el 1S26, crecimiento orgánico del 8 % y una cuota cercana a la mitad del mercado de enzimas, con costes de cambio y escala de fermentación que ningún rival salvo IFF iguala [A1, A2]. El problema es el precio pagado por crecer: la fusión con Chr. Hansen y la compra de piensos llevaron el capital invertido de 2.764 M a 13.139 M y el ROIC con fondo de comercio al 5,7 %, por debajo del WACC del 7,71 %.\n\nA 60,06 EUR (449 DKK) el precio descuenta, según el DCF inverso, un crecimiento del 11,4 % anual hasta 2033 o un margen del 47,9 %, el doble de lo que la propia empresa promete en su plan 2030 [B1]. En múltiplos cotiza a 25,8 veces nuestro BPA ajustado sin PPA de 2027, en el mínimo de su historia adelantada (mediana 27,5x) pero con prima frente a los comparables (23,0x).\n\nPara invertir hay que creer que el mercado seguirá aceptando una rentabilidad del 6,5 % por un negocio de crecimiento largo y estable. Es razonable para mantener: el beneficio ajustado crece un 8 % al año y la recompra suma un 1 %. No lo es para comprar: el valor intrínseco queda un 25,2 % por debajo y la rentabilidad a 12 meses (8,5 % ponderada) no llega al 15 %.',
    vision_diferencial: {
      mercado_descuenta: 'Un compuesto de calidad con crecimiento del 7-8 % durante muchos años y márgenes del 38-39 %, por el que acepta una rentabilidad implícita del 6,5 %, por debajo de nuestro WACC del 7,71 %. El consenso es de compra (15 analistas) con un objetivo de 499 DKK.',
      nuestra_vision: 'Coincidimos en el negocio (nuestro BPA de 2028 está un 4 % por debajo del consenso) pero no en lo que vale: con el coste de capital de una empresa de beta 0,86 el DCF da 44,15 EUR. El accionista de hoy compra un ROIC con fondo de comercio del 5,7 %, no el 18 % de Novozymes antes de la fusión.',
      por_que: 'Porque el crecimiento ya no es barato: cada punto de crecimiento futuro exige capex del 12-14 % de las ventas y las compras se pagan a 21 veces el EBITDA. Mientras el ROIC sin fondo de comercio no se acerque al 16 % del plan, la prima sobre los comparables descansa en la tasa de descuento, no en la caja.',
    },
    a_favor: [
      '**Margen líder**: EBITDA ajustado del 37,7 % en el 1S26 frente al ~21 % de los comparables [A2].',
      '**Crecimiento orgánico del 7-8 %** en 2026, con la guía elevada en agosto [A2].',
      '**Poder de precio**: cerca de 2 puntos de precio en 2026 [A2].',
      '**Recompra de 1.000 M EUR** hasta 2029 (3,6 % de la capitalización) [A2].',
      '**Balance sólido**: rating A-, deuda neta de 1,8 veces el EBITDA [A2].',
    ],
    en_contra: [
      '**ROIC con fondo de comercio del 5,7 %**, por debajo del WACC del 7,71 % (−2,0 puntos).',
      '**El precio descuenta un 11,4 % anual de crecimiento** hasta 2033 (DCF inverso).',
      '**Valor intrínseco de 44,94 EUR**, un 25,2 % por debajo del precio.',
      '**Compras caras**: 21 veces el EBITDA por la parte de piensos de dsm-firmenich [A5].',
      '**Control de Novo Holdings** con el 63,4 % de los votos y el 25,5 % del capital [C1].',
    ],
    que_vigilar: 'La tesis de mantener depende de que el crecimiento orgánico siga en el 7-8 % y el margen ajustado suba hacia el 38-39 % mientras el capex del 12-14 % se traduce en ROIC sin fondo de comercio por encima del 11 %. La señal de que no se cumple sería un crecimiento orgánico por debajo del 5 % en dos informes seguidos (sobre todo en Agricultura, Energía y Técnica) o una contribución del precio por debajo de 1 punto.',
    cambiaria_recomendacion: [
      'Por debajo de 44,94 EUR (≈ 336 DKK) pasaríamos a Comprar si se mantiene el crecimiento del 7 %.',
      'Por encima de 72,40 EUR (≈ 541 DKK) pasaríamos a Vender.',
      'Si el crecimiento orgánico de 9M 2026 (5-nov) baja del 6 %, revisaríamos el base a la baja.',
      'Si el ROIC ajustado sin fondo de comercio de 2026 supera el 12 %, subiríamos el valor intrínseco.',
    ],
    kpis_seguimiento: [
      { kpi: 'Crecimiento orgánico', nivel_actual: '8 % (1S26)', umbral_alerta: '< 5 %', por_que: 'Sostiene el múltiplo' },
      { kpi: 'Margen EBITDA ajustado', nivel_actual: '37,7 %', umbral_alerta: '< 36,5 %', por_que: 'Apalancamiento operativo' },
      { kpi: 'ROIC ajustado sin fondo de comercio', nivel_actual: '10,1 % (2025)', umbral_alerta: '< 10 %', por_que: 'Rendimiento del capital nuevo' },
      { kpi: 'Contribución del precio', nivel_actual: '≈ 2 puntos', umbral_alerta: '< 1 punto', por_que: 'Poder de precio' },
      { kpi: 'Deuda neta / EBITDA', nivel_actual: '1,8x', umbral_alerta: '> 2,3x', por_que: 'Recompra y compras' },
    ],
  },
};
