// Textos del analista (Almawarid, corte 2026-10-19). Citas con la letra de la nota ([A1] = fuente 1 de A.json).
// Las cifras del motor (DCF, escenarios, objetivo a 12 meses, controles) van sin cita y se comprueban tras el último cálculo.
import F from './textos-final.mjs';

const limitaciones = 'Cotiza en el mercado principal de Tadawul (Arabia Saudí), en SAR y de domingo a jueves; un extranjero entra por un bróker con acceso a Tadawul (inversor extranjero cualificado o swap). Liquidez suficiente para posiciones pequeñas: ≈ 70.000 acciones y ≈ 7 M SAR al día de media en tres meses [D1, D2]. Cuentas: sin XBRL y con Saudi Exchange cerrado (403), las cuentas anuales auditadas de 2021-2025 no se han podido leer; se usaron los estados intermedios del 1T26 y del 2T26 (fuente primaria, con el balance auditado a 31-dic-2025 y la revisión limitada de BDO), los anuncios de resultados a Tadawul reproducidos por Argaam para 2023-2025 y Yahoo para BAI, zakat, intereses y amortización; los balances de 2021-2024 y los flujos de 2021-2025 vienen de Stock Analysis (secundaria) [A1-A8]. En 2023-2024 hay un cambio de presentación de las ventas (el crecimiento publicado del 9M24 era del 37 % y las cifras dan un 60 %) [A5]. Índice: el TASI no tiene serie en Yahoo; la beta y las rentabilidades relativas se miden contra el ETF KSA [D1]. Precio: cierre del 19-oct-2026 (87,80 SAR) [D2]. Sin foros ni redes con opiniones útiles: la sección de sentimiento no se imprime.';

const huecos = [];
const parches = [];

const controles_explicados = [
  { control: 'Tipo impositivo efectivo razonable (2023)', explicacion: 'Almawarid solo registra zakat (sus estados no tienen impuesto de sociedades): el 2,5 % de una base patrimonial (patrimonio y provisiones menos inmovilizado), que sobre el beneficio da un 7-10 % [A6, A1]. El 10,1 % de 2023 es zakat, no un crédito fiscal; el DCF proyecta un 7 %, el tipo de 2025 y del 1S26.' },
  { control: 'Tipo impositivo efectivo razonable (2024)', explicacion: 'Mismo motivo: zakat del 2,5 % sobre la base patrimonial, que da un 9,0 % del beneficio antes de impuestos; baja a medida que el beneficio crece más que el patrimonio [A6].' },
  { control: 'Tipo impositivo efectivo razonable (2025)', explicacion: 'El 7,2 % de 2025 (6,6 % en el 1S26) es zakat sobre la base patrimonial; liquidaciones cerradas con la autoridad hasta 2024 sin diferencias [A1, A6]. Es el que proyecta el DCF (7 %).' },
  { control: 'Al menos 10 fuentes primarias', explicacion: 'Saudi Exchange y tadawul.com.sa dan 403 (también con otro User-Agent), Euroland no tiene la empresa y las cuentas anuales de 2022-2025 son de pago en Argaam; web.archive.org corta la conexión. Primarias usadas: los dos estados intermedios de 2026 (con el balance auditado de 2025), la web de inversores (dos veces), el perfil de la empresa y el Ministerio de Recursos Humanos. Los anuncios oficiales de resultados a Tadawul de 2023-2025 se leen reproducidos por Argaam (contados como datos de mercado) [A1-A5, A11, B2, B6, C1].' },
];

const secciones = {
  calidad: {
    comentario: 'Los estados intermedios de 2026 los revisa BDO sin salvedades y traen el balance auditado de 2025 [A1]. Lo que más cuidado pide: (1) los cobros, porque clientes y activos de contrato (699 M a jun-2026) crecen más deprisa que las ventas y la provisión de insolvencias (60,1 M) sube cada semestre; (2) las ventas al grupo Al Ayuni (accionista del 23,94 %), el 15,7 % de 2025, cuyo margen no se publica; (3) el flujo operativo de 2025, que incluye 39,2 M de ventas de fondos a valor razonable [A1, A9, A7]. En 2023-2024 cambió la presentación de las ventas, lo que infla el crecimiento de 2024 [A5].',
    senales: [
      { senal: 'Cobros que crecen más que las ventas', nivel: 'Media', comentario: 'Clientes + activos de contrato del 21 % al 24 % de las ventas en seis meses; flujo operativo del 49 % del beneficio en el 1S26 [A1].' },
      { senal: 'Ventas a un accionista de referencia', nivel: 'Media', comentario: 'Al Ayuni y Limak Al Ayuni: 410,6 M en 2025 (15,7 %) [A9].' },
      { senal: 'Cuentas anuales no leídas', nivel: 'Baja', comentario: 'Tadawul (403); cifras anuales de anuncios oficiales reproducidos y de fuentes secundarias [A3, A7].' },
    ],
  },
  rentabilidad: {
    comentario: 'La rentabilidad sobre el capital es alta: el beneficio operativo después de zakat (≈ 147 M en 2025) sobre un capital invertido de ≈ 400 M (patrimonio de 506 M menos 203 M de caja e inversiones, más 61 M de arrendamientos y 133 M de indemnizaciones) da un ROIC de ≈ 35-40 %, y el ROE fue del 31 % [A1, A6]. La causa es el modelo: casi sin activos fijos (77 M de inmovilizado, la mayor parte derechos de uso de alojamientos) y con el circulante financiado en parte por los cobros anticipados y las vacaciones y billetes devengados de los trabajadores [A1]. El margen es fino (EBIT del 6 % de las ventas), pero el capital rota más de seis veces al año. Lo que puede bajarlo: más días de cobro y provisiones. Los competidores saudíes tienen márgenes parecidos o mayores (SMASCO, Tamkeen) y los europeos, mucho menores (2-3 %) [B4].',
    confianza: 'Media',
  },
  capital: {
    politica: 'Dividendos semestrales desde 2025 (1,40 SAR por el 2S25 y 1,60 por el 1S26; 48,25 M con cargo a 2025, el 35 % del beneficio) y una ampliación gratuita de 4 por 3 en feb-2026 sin efecto en el valor [A11, A9, C5]. El consejo estudia una política de dividendos [C6]. No hay recompras ni compras de empresas [A1].',
    comentario: 'La asignación de capital es sencilla y buena: crecer con el circulante, alquilar alojamientos en vez de comprarlos y repartir un tercio del beneficio, sin deuda [A1]. El patrimonio pasó de 233 M en 2021 a 588 M en jun-2026 sin ampliaciones de dinero [A7, A1]. La caja (233 M con fondos y sukuk) es mayor de lo que necesita el negocio: hay margen para subir el reparto. Lo que pide vigilancia: las ventas al grupo Al Ayuni, aprobadas en junta pero con un accionista del 23,94 % al otro lado [A9].',
  },
  multiplos_historicos: {
    comentario: 'Almawarid cotiza a 7,8 veces nuestro BPA de 2027e, por debajo de toda su historia adelantada (19,6 veces a fin de 2023, recién salida a bolsa; 11,4 a fin de 2024; 9,6 a fin de 2025 con nuestro BPA de 2026e) [D13]. La historia es corta (tres cierres desde la salida a bolsa de jun-2023) y bajista: el mercado ha pagado cada año menos por un beneficio que ha crecido un 45 % anual. La mediana de los comparables (≈ 9 veces) está por encima del PER actual.',
  },
  comparables: {
    criterio: 'Dos grupos con datos del mismo día: las otras tres cotizadas saudíes de cesión de mano de obra (Maharah, SMASCO y Tamkeen), las más parecidas por licencia, clientes y regulación, y los grandes de trabajo temporal de Europa, EE. UU. y Japón (Randstad, Adecco, ManpowerGroup, Kelly y Persol), que dan la referencia de múltiplos del sector con crecimientos bajos [D3]. Ninguno combina, como Almawarid, +25 % de ventas, sin deuda, y un 15 % de las ventas a un accionista.',
    comentario: 'Las saudíes cotizan a 5,5-8,7 veces el EBITDA de doce meses y 8,4-9,7 veces el beneficio adelantado, con crecimientos del 6-11 %; los occidentales a 6-12 veces el EBITDA con crecimientos del 2-5 % y márgenes del 2-3 % [D3]. Almawarid crece más que todos (+27 % en el 1S26) y no tiene una prima: cotiza a ≈ 7,3 veces el EBITDA de doce meses. Los comparables pesan un 20 %.',
  },
  bolsa: {
    comentario: 'La acción cerró a 87,80 SAR el 19-oct-2026: −15 % en un año (el mercado saudí, medido con el ETF KSA, −11 %) y −21 % desde el máximo de 52 semanas (112,2 SAR el 6-ago-2026), aunque un 17 % por encima del mínimo (73 SAR el 1-mar-2026) [D1]. Desde la salida a bolsa (48 SAR ajustados en jun-2023) ha ganado un 83 % [D5]. Vale 1.756 M SAR. Volatilidad del 24-28 % y beta de 0,94 frente al KSA; caída máxima del 34 % entre abr-2025 y mar-2026 [D1].',
    contexto: {
      movimiento: { fecha: '2026-10-19', var_1m_pct: -9.1, var_3m_pct: -20.9, var_6m_pct: 2.3, var_12m_pct: -15.2, dist_max_52s_pct: -20.9, dist_min_52s_pct: 17.3, dist_max_historico_pct: -23.9, tendencia: 'lateral', volatilidad_60d_pct: 24, avisos: [] },
      movimientos_fuertes: [
        { periodo: 'abr-2026 a jul-2026', var_pct: 37, causa: 'Del mínimo de 73 SAR (1-mar) a ≈ 110 en julio: resultados del 1T26 (beneficio +74 %) y del 2T26 (+55 %), dividendos semestrales y la subida del 16,5 % de un mes hasta el 10-jun, con volumen alto (hasta 337.000 acciones al día) [D1, A5, D10].', veredicto: 'no cambia', condicion: null },
        { periodo: 'ago-2026 a oct-2026', var_pct: -21, causa: 'Del máximo de 112,2 SAR (6-ago) a 87,80 (19-oct), con caídas de un mes del 14,5 % hasta el 30-sep: caída gradual con poco volumen (20.000-100.000 acciones al día), sin noticia propia; resultados del 2T26 en línea con lo esperado, dividendo de 1,60 SAR descontado el 18-ago y mercado saudí débil (el TASI cae ≈ 13 % en un año) [D1, D2, D10].', veredicto: 'no cambia', condicion: null },
      ],
      noticias: [
        { fecha: '2026-10-28', tipo: 'resultados', hecho: 'Resultados del 3T26 previstos el 28-oct (web de inversores); AlJazira espera 54,8 M (+48 %) y GIB 49 M (+32,5 %) [D12, D8, D9].', veredicto: 'no cambia', condicion: null },
        { fecha: '2026-08-10', tipo: 'resultados', hecho: '2T26: ventas +25 % (783 M) y beneficio +55 % (50,0 M), en línea con AlJazira, que reitera sobreponderar; SNB Capital también sobreponderar [D10, D2].', veredicto: 'no cambia', condicion: null },
        { fecha: '2026-05-11', tipo: 'accionista de referencia', hecho: 'Junta: aprueba los contratos con Al Ayuni y Limak Al Ayuni (410,6 M en 2025) y autoriza dividendos a cuenta de 2026 [A9].', veredicto: 'no cambia', condicion: null },
        { fecha: '2026-03-31', tipo: 'litigios y reguladores', hecho: 'Proyecto de reforma del reglamento de trabajadoras domésticas a consulta pública; sin fecha de aprobación. Desde el 1-ene-2026 los sueldos de las domésticas se pagan por canales oficiales de Musaned [B3, B2].', veredicto: 'no cambia', condicion: 'Vigilar: aprobación del reglamento (particulares y por horas son el 19 % de las ventas)' },
        { fecha: '2026-02-15', tipo: 'ampliación o convertible', hecho: 'Ampliación gratuita de una acción por cada tres (de 150 a 200 M SAR de capital): sin dinero nuevo ni efecto en el valor [C5].', veredicto: 'no cambia', condicion: null },
        { fecha: '2023-12-18', tipo: 'accionista de referencia', hecho: 'Venció el bloqueo de los grandes accionistas de la salida a bolsa (Alomaier y Al-Ayuni, 23,94 % cada uno); no se conocen colocaciones ni ventas desde entonces (registro de Tadawul no accesible) [C4].', veredicto: 'no cambia', condicion: null },
      ],
      proximos_resultados: '2026-10-28',
      veredicto: 'no cambia',
      condicion: null,
      comentario: 'La caída del 21 % desde agosto no tiene causa propia: los resultados del 2T26 salieron en línea, las casas de análisis mantienen sobreponderar y la caída fue gradual, con poco volumen, en un mercado saudí que cae ≈ 13 % en un año [D10, D2]. No hay colocación anunciada ni bloqueo por vencer (venció en dic-2023), ni ampliación con dinero, ni oferta. El proyecto de reglamento de trabajadoras domésticas no tiene fecha y afecta a la parte pequeña del negocio. Los resultados del 28-oct no son motivo para esperar (regla 13). Veredicto: no cambia.',
    },
  },
};

export default {
  limitaciones, huecos, controles_explicados, secciones,
  dcf_justificacion: {
    crecimiento: '2026e se apoya en el 1S26 (ventas +27 %, 1.541,7 M) y en un 2S26 +17 %, porque los trimestres crecen ≈ 3-4 % sobre el anterior: +21 % (3.159 M SAR) [A1, A5]. 2027e +13 % y después del 10 % al 5 % en 2032e: la plantilla cedida crece (hostelería y ocio +91 %, saudización +199 %), pero la construcción, el 46 % de las ventas, ya está plana y el sector crece ≈ 7 % al año según el estudio disponible [A1, B1].',
    margenes: 'El margen EBITDA (con NIIF 16 y los otros ingresos de explotación) fue del 8,5 % en 2023, 6,6 % en 2024, 7,2 % en 2025 y 8,5 % en el 1S26 (7,9 % en doce meses) [A6, A1]. Proyecto un 8,3 % en 2026e y una bajada al 7,6 % en 2032e: crece más el segmento de empresas (margen bruto del 8,4 %) que particulares (13,9 %) y por horas (20,1 %), y la competencia en particulares aprieta [A1, B2].',
    inversion: 'Amortización del 1,1 % de las ventas (casi toda de derechos de uso de alojamientos y sucursales) y capex del 1,2 %, con las altas de derechos de uso: con los arrendamientos en la deuda, el capex paga los alquileres [A1]. Circulante (clientes + activos de contrato − proveedores − pasivos de contrato) del 7,5 % de las ventas (6,4 % a dic-2025 y 8,9 % a jun-2026) [A1]. Zakat del 7 % (7,2 % en 2025) [A6].',
    wacc: 'Flujos en SAR, anclado al USD a 3,75: tasa libre del 5,61 %, el Treasury a 10 años (5,10 %, FRED, 15-oct-2026) más el diferencial soberano saudí (0,51 %, Damodaran) [D4, D6]. Beta de 0,95 (0,94 medida contra el ETF KSA, 0,96 ajustada) [D1]. Prima de mercado del 5,5 % y prima adicional del 1,78 %: 0,78 % de país (Damodaran) y 1,0 % por tamaño y liquidez [D6]. Sin deuda financiera: los arrendamientos (4 % del valor) al 6 % [A1].',
    terminal: 'Crecimiento a perpetuidad del 3,0 % en SAR/USD: inflación del dólar y algo de crecimiento real de la población activa extranjera y del empleo saudí. Gordon con un WACC de ≈ 12,3 % implica ≈ 7 veces el EBITDA terminal, en línea con los comparables (5,5-8,7 veces el EBITDA de las saudíes) [D3].',
  },
  puente_comentarios: {
    '2026e': 'Volumen: plantilla cedida a empresas +17 % y saudíes contratados (+199 %); precio: subidas en particulares y por horas (margen bruto +5,6 y +6,0 puntos) [A1, A5].',
    '2027e': 'Hostelería, ocio y comercio; la construcción, plana [A1].',
    '2028e': 'Volumen al ritmo del empleo extranjero y de la saudización; precio con las tasas que se repercuten [A1].',
    '2029e': 'Sector al ≈ 7 % anual (estudio de Innovations Group) [B1].',
    '2030e': 'Expo 2030 y Mundial 2034; después, madurez [B1].',
  },
  veredicto: 'Sí',
  sostenibilidad_justificacion: null,
  dcf_lectura: null,
  narrativas: {
    Bajista: 'Los gigaproyectos se recortan, la construcción cae y las tasas o el nuevo reglamento de domésticas suben costes que no se repercuten: el crecimiento baja 5 puntos cada año (+8 % en 2027e, +5 % en 2028e) y el margen EBITDA 1,5 puntos, hasta el 6,5 % de 2024 [A1, B3].',
    Base: 'Almawarid sigue ganando cuota con empresas de hostelería, ocio y comercio y con la saudización, la construcción se mantiene y particulares conserva el margen: ventas +13 % en 2027e frenando al 5 % en 2032e, margen EBITDA del 8,3 % al 7,6 %.',
    Alcista: 'Expo 2030, el Mundial 2034 y la saudización tiran más de la demanda y la ocupación mejora: 3 puntos más de crecimiento y 0,7 de margen [A1].',
  },
  ...F,
};
