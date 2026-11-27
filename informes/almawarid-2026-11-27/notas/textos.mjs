// Textos del analista (Almawarid, corte 2026-11-27; iteración tras el 3T26). Citas con la letra de la nota ([A12] = fuente 12 de A.json).
// Las cifras del motor (DCF, escenarios, objetivo a 12 meses, controles) van sin cita y se comprueban tras el último cálculo.
import F from './textos-final.mjs';

const limitaciones = 'Cotiza en el mercado principal de Tadawul (Arabia Saudí), en SAR y de domingo a jueves; un extranjero entra por un bróker con acceso a Tadawul. Es pequeña: 1.640 M SAR de capitalización (≈ 437 M USD) y ≈ 5,4 M SAR (≈ 60.000 acciones) al día de media en tres meses [D1]. Cuentas: Saudi Exchange sigue dando 403, pero sus XBRL oficiales se leen en la copia de financialfilings.com: cuentas anuales auditadas de 2025 (con 2024 comparativo) y estados del 3T26 con revisión limitada de BDO (fuente primaria) [A13, A12]. Los años 2021-2023 siguen viniendo de los anuncios a Tadawul reproducidos por Argaam, de Yahoo y de Stock Analysis (secundaria) [A4-A8]. En 2023-2024 hay un cambio de presentación de las ventas (el crecimiento publicado del 9M24 era del 37 % y las cifras dan un 60 %) [A5]. Índice: el TASI no tiene serie en Yahoo; la beta y las rentabilidades relativas se miden contra el ETF KSA [D1]. Precio: cierre del jueves 26-nov-2026 (82,00 SAR); el 27-nov es viernes y Tadawul no abre [D1, D2]. **Ampliación gratuita pendiente**: el consejo propuso el 5-nov una acción gratuita por cada cuatro (20 → 25 M de acciones) y la CMA la aprobó el 22-nov; falta la junta extraordinaria. Todo el informe va en 20 M de acciones y en el precio actual: tras la ampliación, precio, BPA, objetivo y límites se dividen por 1,25 [C7, C8]. Sin foros ni redes con opiniones útiles: la sección de sentimiento no se imprime.';

const huecos = [];
const parches = [];

const controles_explicados = [
  { control: 'Tipo impositivo efectivo razonable (2023)', explicacion: 'Almawarid solo registra zakat (sus estados no tienen impuesto de sociedades): el 2,5 % de una base patrimonial (patrimonio y provisiones menos inmovilizado), que sobre el beneficio da un 7-10 % [A6, A13]. El 10,1 % de 2023 es zakat, no un crédito fiscal; el DCF proyecta un 7 %, el tipo de 2025 y de 9M26 (6,6 %).' },
  { control: 'Tipo impositivo efectivo razonable (2024)', explicacion: 'Mismo motivo: zakat del 2,5 % sobre la base patrimonial, que da un 9,0 % del beneficio antes de impuestos (9,43 M sobre 104,85 M en las cuentas auditadas); baja a medida que el beneficio crece más que el patrimonio [A13].' },
  { control: 'Tipo impositivo efectivo razonable (2025)', explicacion: 'El 7,2 % de 2025 (10,71 M sobre 149,17 M, cuentas auditadas) y el 6,6 % de 9M26 son zakat sobre la base patrimonial [A13, A12]. La empresa dice que el impuesto mínimo complementario (DMTT, desde 2027) no le aplica: no es parte de un grupo multinacional [C9].' },
];

const secciones = {
  calidad: {
    comentario: 'Las cuentas de 2025 las audita BDO sin salvedades (asunto clave: reconocimiento de ingresos) y el 3T26 lo revisa sin salvedades [A13, A12]. Lo que más cuidado pide: (1) los cobros, porque los clientes netos (491,8 M a sep-2026) crecieron un 32 % en nueve meses con ventas +22 %, y la provisión de insolvencias sube (62,0 M frente a 54,1 M); (2) las ventas al grupo Al Ayuni (accionista del 23,94 %), el 13,6 % de 9M26, cuyo margen no se publica; (3) el deterioro de anticipos a agencias de contratación (8,9 M acumulado) [A12]. Como mejora, el flujo operativo de 9M26 llega al 77 % del beneficio (68 % en 9M25) [A12].',
    senales: [
      { senal: 'Cobros que crecen más que las ventas', nivel: 'Media', comentario: 'Clientes netos +32 % en 9M26 frente a ventas +22 %; provisión de 62,0 M [A12].' },
      { senal: 'Ventas a un accionista de referencia', nivel: 'Media', comentario: 'Al Ayuni y Limak Al Ayuni: 316,2 M en 9M26 (13,6 %), 410,6 M en 2025 (15,7 %) [A12, A9].' },
      { senal: 'Años 2021-2023 de fuente secundaria', nivel: 'Baja', comentario: 'Solo 2024-2026 están en XBRL oficial [A13, A12].' },
    ],
  },
  rentabilidad: {
    comentario: 'La rentabilidad sobre el capital es alta: el ROIC del modelo es del 46,6 % en 2025 y el ROE del 30,6 %, porque casi no hay activo fijo (13 M de inmovilizado y 64 M de derechos de uso de alojamientos a sep-2026) y el circulante se financia en parte con las vacaciones y billetes devengados de los trabajadores [A12]. El margen es fino (EBIT del 7,1 % de las ventas en doce meses), pero el capital rota varias veces al año. Lo que puede bajarlo: más días de cobro (clientes +32 % en nueve meses) y provisiones. Los competidores saudíes tienen márgenes parecidos (Maharah 6,5 % de margen operativo, SMASCO 8,2 %, Tamkeen 8,4 %) y los occidentales mucho menores (1-3 %) [B4].',
    confianza: 'Media',
  },
  capital: {
    politica: 'Dividendos semestrales desde 2025 (1,40 SAR por el 2S25, pagado el 19-abr-2026, y 1,60 por el 1S26, pagado el 25-ago; 60 M en 9M26) y dos ampliaciones gratuitas: 4 por 3 en feb-2026 y la propuesta de 5 por 4 del 5-nov-2026, aprobada por la CMA el 22-nov y pendiente de la junta [A12, C7, C8]. Ninguna cambia el valor. No hay recompras ni compras de empresas [A12].',
    comentario: 'La asignación de capital es sencilla y buena: crecer con el circulante, alquilar alojamientos en vez de comprarlos y repartir un tercio del beneficio, sin deuda [A12]. El patrimonio pasó de 233 M en 2021 a 612 M en sep-2026 sin ampliaciones de dinero [A7, A12]. La caja (238 M con el fondo y los sukuk) es mayor de lo que necesita el negocio; en 2026 puso 20 M más en sukuk de capital de Riyad Bank, que contabiliza como patrimonio [A12]. Lo que pide vigilancia: las ventas al grupo Al Ayuni, aprobadas en junta pero con un accionista del 23,94 % al otro lado [A9].',
  },
  multiplos_historicos: {
    comentario: 'Almawarid cotiza a 7,4 veces nuestro BPA de 2027e, por debajo de toda su historia adelantada (19,6 veces a fin de 2023, recién salida a bolsa; 11,4 a fin de 2024; 9,7 a fin de 2025 con nuestro BPA de 2026e) [A13, D13]. La historia es corta (tres cierres desde la salida a bolsa de jun-2023) y bajista: el mercado ha pagado cada año menos por un beneficio que ha crecido un 45 % anual. La mediana de los comparables (8,6 veces) está por encima del PER actual.',
  },
  comparables: {
    criterio: 'Dos grupos con datos del 26-nov-2026: las otras tres cotizadas saudíes de cesión de mano de obra (Maharah, SMASCO y Tamkeen), las más parecidas por licencia, clientes y regulación, y los grandes de trabajo temporal de Europa, EE. UU. y Japón (Randstad, Adecco, ManpowerGroup, Kelly y Persol), que dan la referencia de múltiplos del sector con crecimientos bajos [D3]. Ninguno combina, como Almawarid, +22 % de ventas en 9M26, sin deuda, y un 14 % de las ventas a un accionista.',
    comentario: 'Las saudíes cotizan a 4,6-7,3 veces el EBITDA de doce meses y 7,8-8,4 veces el beneficio adelantado, con crecimientos del 6-9 %; los occidentales a 6-13 veces el EBITDA con crecimientos del 1-4 % y márgenes del 2-3 % [D3]. Almawarid crece más que todos y no tiene una prima: cotiza a 6,5 veces el EBITDA de doce meses. Los comparables pesan un 20 %.',
  },
  bolsa: {
    comentario: 'La acción cerró a 82,00 SAR el 26-nov-2026: −24 % en un año de precio (−17 % con dividendos, frente al −4 % del ETF KSA) y −27 % desde el máximo de 52 semanas (112,2 SAR el 6-ago-2026), un 12 % por encima del mínimo (73 SAR el 1-mar-2026) [D1]. Desde la salida a bolsa (48 SAR ajustados en jun-2023) gana un 71 % [D5]. Vale 1.640 M SAR. Volatilidad del 28-32 % y beta de 0,94 frente al KSA; caída máxima del 34 % entre abr-2025 y mar-2026 [D1].',
    contexto: {
      movimiento: { fecha: '2026-11-26', var_1m_pct: -5.2, var_3m_pct: -21.2, var_6m_pct: -14.5, var_12m_pct: -23.8, dist_max_52s_pct: -26.1, dist_min_52s_pct: 9.6, dist_max_historico_pct: -28.9, tendencia: 'bajista', volatilidad_60d_pct: 32, avisos: [] },
      movimientos_fuertes: [
        { periodo: 'abr-2026 a jul-2026', var_pct: 37, causa: 'Del mínimo de 73 SAR (1-mar) a ≈ 110 en julio: resultados del 1T26 (beneficio +74 %) y del 2T26 (+55 %), dividendos semestrales y la subida del 16,5 % de un mes hasta el 10-jun, con volumen alto [D1, A5, D10].', veredicto: 'no cambia', condicion: null },
        { periodo: 'ago-2026 a oct-2026', var_pct: -30, causa: 'Del máximo de 112,2 SAR (6-ago) a 78,60 (25-oct), con una caída de un mes del 16,8 % hasta el 25-oct: sin noticia propia, dividendo de 1,60 SAR descontado el 18-ago, previsiones del 3T26 que apuntaban a una desaceleración y mercado saudí débil; el 26-28-oct rebotó a 87,95 [D1, D8, D9].', veredicto: 'no cambia', condicion: null },
      ],
      noticias: [
        { fecha: '2026-11-26', tipo: 'litigios y reguladores', hecho: 'Impuesto mínimo complementario (DMTT) desde 2027: la empresa dice que no le aplica (solo opera en Arabia Saudí y no es parte de un grupo multinacional) y no espera efecto material [C9].', veredicto: 'no cambia', condicion: null },
        { fecha: '2026-11-22', tipo: 'ampliación o convertible', hecho: 'La CMA aprueba la ampliación gratuita de una acción por cada cuatro (200 → 250 M SAR con 50 M de reservas) propuesta el 5-nov; junta extraordinaria en seis meses [C7, C8]. Sin dinero nuevo ni efecto en el valor.', veredicto: 'no cambia', condicion: 'Tras la junta, dividir precio, objetivo y límites por 1,25' },
        { fecha: '2026-11-16', tipo: 'resultados', hecho: 'Conferencia del 3T26: la dirección espera que el beneficio del 4T26 crezca frente al 4T25 y dice que HemahTech ya cubre costes [C10].', veredicto: 'no cambia', condicion: null },
        { fecha: '2026-11-05', tipo: 'resultados', hecho: '3T26: ventas +14 % (775,1 M, −1 % sobre el 2T26) y beneficio +34 % (49,4 M, −1 %); un 10 % por debajo de AlJazira (54,8 M) y en línea con GIB (49 M). Construcción −8 % y Limak Al Ayuni −65 %. La acción subió un 2,3 % la sesión siguiente y luego volvió a 82 [A14, D8, D9, D1].', veredicto: 'no cambia', condicion: null },
        { fecha: '2026-11-05', tipo: 'cambio de recomendación', hecho: 'El objetivo medio de Yahoo baja de 126,14 SAR (4 analistas) a 117,93 (3; el mínimo de 118,80 a 102) y el BPA de 2027e de 10,31 a 9,86 [D3].', veredicto: 'no cambia', condicion: null },
        { fecha: '2026-05-11', tipo: 'accionista de referencia', hecho: 'Junta: aprueba los contratos con Al Ayuni y Limak Al Ayuni (410,6 M en 2025) y autoriza dividendos a cuenta de 2026 [A9].', veredicto: 'no cambia', condicion: null },
        { fecha: '2026-03-31', tipo: 'litigios y reguladores', hecho: 'Proyecto de reforma del reglamento de trabajadoras domésticas a consulta pública; sin fecha de aprobación. Desde el 1-ene-2026 los sueldos de las domésticas se pagan por canales oficiales de Musaned [B3, B2].', veredicto: 'no cambia', condicion: 'Vigilar: aprobación del reglamento (particulares y por horas son el 19 % de las ventas)' },
        { fecha: '2023-12-18', tipo: 'accionista de referencia', hecho: 'Venció el bloqueo de los grandes accionistas de la salida a bolsa (Alomaier y Al-Ayuni, 23,94 % cada uno); no se conocen colocaciones ni ventas desde entonces (registro de Tadawul no accesible) [C4].', veredicto: 'no cambia', condicion: null },
      ],
      proximos_resultados: '2027-03-30',
      veredicto: 'no cambia',
      condicion: null,
      comentario: 'La caída del 27 % desde agosto tiene una causa de negocio que el informe ya recoge: el crecimiento frena (ventas +14 % en el 3T26 frente a +25 % en el 2T26, construcción −8 %) y los analistas bajan objetivos; el informe la incorpora rebajando el BPA de 2028e un 3 % (11,68 frente a 12,04). No es un deterioro que la tesis no recoja (el beneficio sigue creciendo un 34 %, los márgenes suben y la caja va mejor) ni hay fraude ni recorte de guía. No hay colocación anunciada, bloqueo por vencer ni ampliación con dinero: la ampliación gratuita no cambia el valor. Veredicto: no cambia.',
    },
  },
};

export default {
  limitaciones, huecos, controles_explicados, secciones,
  dcf_justificacion: {
    crecimiento: '2026e se apoya en los 9M26 publicados (ventas de 2.316,8 M, +22 %) y en un 4T26 de ≈ 790 M (+10 % sobre el 4T25 y +2 % sobre el 3T26): +19 % (≈ 3.107 M SAR) [A12]. 2027e +11 % (antes +13 %) y después del 9 % al 5 % en 2032e: el 3T26 creció un 14 %, con la construcción (43 % de las ventas del trimestre) cayendo un 8 % y Limak Al Ayuni un 65 %, mientras hostelería (+56 %) y comercio (+129 %) siguen tirando; la plantilla media sube un 13 % [A12, A14]. El sector crece ≈ 7 % al año según el estudio disponible [B1].',
    margenes: 'El margen EBITDA (con NIIF 16 y los otros ingresos de explotación) fue del 8,5 % en 2023, 6,6 % en 2024, 7,2 % en 2025 y 8,4 % en 9M26 (8,3 % en el 3T26) [A6, A13, A12]. Proyecto un 8,4 % en 2026e y una bajada al 7,7 % en 2032e: crece más el segmento de empresas (margen bruto del 8,5 % en 9M26) que particulares (13,9 %) y por horas (17,8 %), y la competencia en particulares aprieta [A12, B2].',
    inversion: 'Amortización del 1,1 % de las ventas (casi toda de derechos de uso de alojamientos y sucursales) y capex del 1,2 %, con las altas de derechos de uso: con los arrendamientos en la deuda, el capex paga los alquileres [A12]. Circulante (clientes + activos de contrato − proveedores − pasivos de contrato) del 8 % de las ventas (7,5 % en el informe anterior), porque los clientes crecen más que las ventas (+32 % en nueve meses) [A12]. Zakat del 7 % (7,2 % en 2025 y 6,6 % en 9M26) [A13, A12].',
    wacc: 'Flujos en SAR, anclado al USD a 3,75: tasa libre del 5,36 %, el Treasury a 10 años (4,85 %, Tesoro de EE. UU., 25-nov-2026) más el diferencial soberano saudí (0,51 %, Damodaran) [D4, D6]. Beta de 0,95 (0,94 medida contra el ETF KSA) [D1]. Prima de mercado del 5,5 % y prima adicional del 1,78 %: 0,78 % de país (Damodaran) y 1,0 % por tamaño y liquidez (≈ 437 M USD; ≈ 5,4 M SAR al día) [D6, D1]. Sin deuda financiera: los arrendamientos (4 % del valor) al 6 % [A12].',
    terminal: 'Crecimiento a perpetuidad del 3,0 % en SAR/USD: inflación del dólar y algo de crecimiento real de la población activa extranjera y del empleo saudí. Gordon con un WACC de ≈ 12,1 % implica ≈ 7 veces el EBITDA terminal, en línea con los comparables (4,6-7,3 veces el EBITDA de las saudíes) [D3].',
  },
  puente_comentarios: {
    '2026e': 'Volumen: plantilla media +16 % en 9M26 (empresas +15 %, particulares +18 %); precio: mejor ocupación y tarifas en particulares (margen bruto del 9,6 % al 13,9 %) [A14, A12].',
    '2027e': 'Hostelería, ocio y comercio; la construcción, a la baja (−8 % en el 3T26) [A12].',
    '2028e': 'Volumen al ritmo del empleo extranjero y de la saudización; precio con las tasas que se repercuten [A12].',
    '2029e': 'Sector al ≈ 7 % anual (estudio de Innovations Group) [B1].',
    '2030e': 'Expo 2030 y Mundial 2034; después, madurez [B1].',
  },
  veredicto: 'Sí',
  sostenibilidad_justificacion: null,
  dcf_lectura: null,
  narrativas: {
    Bajista: 'Los gigaproyectos se recortan, la construcción sigue cayendo y las tasas o el nuevo reglamento de domésticas suben costes que no se repercuten: el crecimiento baja 5 puntos cada año (+6 % en 2027e, +4 % en 2028e) y el margen EBITDA 1,5 puntos, hasta el 6,6 % de 2024 [A12, B3].',
    Base: 'Almawarid sigue ganando cuota con empresas de hostelería, ocio y comercio y con la saudización, la construcción baja poco y particulares conserva el margen: ventas +11 % en 2027e frenando al 5 % en 2032e, margen EBITDA del 8,4 % al 7,7 %.',
    Alcista: 'Expo 2030, el Mundial 2034 y la saudización tiran más de la demanda y la ocupación mejora: 3 puntos más de crecimiento y 0,7 de margen [A12].',
  },
  ...F,
};
