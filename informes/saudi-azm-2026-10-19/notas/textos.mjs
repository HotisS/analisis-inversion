// Textos del analista (Saudi Azm, corte 2026-10-19). Citas con la letra de la nota ([A1] = fuente 1 de A.json).
// Las cifras del motor (DCF, escenarios, objetivo a 12 meses, controles) van sin cita y se comprueban tras el último cálculo.
import F from './textos-final.mjs';

const limitaciones = 'Ejercicio a 30 de JUNIO (FY2026 = jul-2025 a jun-2026), no a 31-dic como decía el encargo; los trimestres llevan etiqueta fiscal (1T26 = jul-sep 2025) y el objetivo a 12 meses usa FY2028e (jul-2027 a jun-2028), el primer ejercicio que cierra más de 18 meses después del corte. Cotiza en el mercado principal de Tadawul, en SAR (anclado al USD a 3,75) y de domingo a jueves; se puede comprar desde IBKR (acceso minorista vía SNB Capital, permiso «Saudi Arabia») [D11]. Liquidez justa: ≈ 200.000 acciones y ≈ 5,4 M SAR (1,4 M USD) al día de media en tres meses; una posición de 1.000-5.000 EUR es < 0,5 % de una sesión, pero con horquillas amplias conviene orden limitada [D1, D2]. Cuentas: sin XBRL; se leyeron en árabe las cuentas auditadas de FY2022-FY2025 y los intermedios de FY2026 (de estos, los estados están escaneados y solo las notas se leen como texto) [A1-A7]. Las cuentas auditadas de FY2026 aún no están publicadas en la web de la empresa: la cuenta de FY2026 sale del anuncio a Tadawul y de Yahoo, y el balance y los flujos de FY2026, de Stock Analysis (fuente SECUNDARIA) [A8-A10]. Índice: el TASI no tiene serie en Yahoo; beta y rentabilidades relativas contra el ETF KSA [D1]. Precio: cierre del 19-oct-2026 (29,52 SAR; Tadawul cierra ≈ 15:00 hora de Riad, 12:00 UTC) [D2]. Fecha de los próximos resultados (1T FY2027) estimada: el calendario de Tadawul no es accesible. Sin foros ni redes con opiniones útiles: la sección de sentimiento no se imprime.';

const huecos = [];
const parches = [];

const controles_explicados = [
  { control: 'Tipo impositivo efectivo razonable (FY2022)', explicacion: 'Saudi Azm solo paga zakat (2,5 % de una base patrimonial), no impuesto de sociedades: el 6,8 % del BAI de FY2022 es zakat, no un crédito fiscal [A4]. El DCF proyecta un 6,5 %.' },
  { control: 'Tipo impositivo efectivo razonable (FY2023)', explicacion: 'Zakat del 2,5 % sobre la base patrimonial: 6,4 % del BAI [A3].' },
  { control: 'Tipo impositivo efectivo razonable (FY2024)', explicacion: 'Zakat: 9,2 % del BAI [A2].' },
  { control: 'Tipo impositivo efectivo razonable (FY2025)', explicacion: 'Zakat: 4,3 % del BAI (la base patrimonial descuenta las inversiones a largo plazo) [A1].' },
  { control: 'Tipo impositivo efectivo razonable (FY2026)', explicacion: 'Zakat: 6,1 % del BAI [A9]. Es el que proyecta el DCF (6,5 %).' },
  { control: 'Cambio de perímetro declarado (FY2023)', explicacion: 'Sin compras: el activo crece porque la caja se invierte en sukuk a coste amortizado (25,0 M) y fondos (25,0 M frente a 17,0 M), y suben los activos de contrato (20,5 M frente a 13,4 M) [A3].' },
  { control: 'Cambio de perímetro declarado (FY2025)', explicacion: 'Sin compras relevantes (3,0 M de minoritarios de una filial y 2,8 M en una asociada): el activo crece porque los anticipos de clientes (pasivos de contrato +53,8 M) y el flujo operativo de 108,9 M se invierten en fondos a valor razonable (102,5 M frente a 26,0 M) [A1].' },
  { control: 'Al menos 10 fuentes primarias', explicacion: 'Saudi Exchange da 403 y las cuentas de FY2026 no están en la web. Primarias usadas: cuatro cuentas anuales auditadas, tres intermedios, dos informes del consejo (y el de 2023), la página de IBKR; los anuncios oficiales a Tadawul se leen reproducidos por Argaam y Mubasher (contados como prensa) [A1-A7, A11, A12, D11].' },
];

const secciones = {
  calidad: {
    comentario: 'Cuentas auditadas sin salvedades hasta FY2025 (PKF Al-Bassam, que sustituyó a otra firma en FY2025) [A1]. Lo que más cuidado pide: (1) la mitad de las ventas la ejecutan como subcontratistas AZM FinTech y Azm Digital, de los dos fundadores, y la nota dice que se compensa «como agencia» contra los ingresos, así que el margen real del grupo depende de precios fijados entre partes vinculadas [A1, A5]; (2) los cobros públicos: clientes y activos de contrato del 44 % de las ventas y flujo operativo muy irregular (1,6 M en FY2024, 108,9 M en FY2025) [A2, A1, A10]; (3) la capitalización de desarrollo (29,1 M de intangibles en FY2026, el 57 % del beneficio), que infla el EBIT de hoy [A10]; (4) las cuentas de FY2026 de fuente secundaria [A10].',
    senales: [
      { senal: 'Subcontratación a vinculadas', nivel: 'Alta', comentario: '≈ 116 M en FY2025 (46 % de las ventas) y 115,5 M en 9M FY2026 [A1, A5].' },
      { senal: 'Capitalización de desarrollo', nivel: 'Media', comentario: 'Intangibles de 7,8 M a 37,3 M en un año; 17,2 M aún sin amortizar a mar-2026 [A10, A5].' },
      { senal: 'Cobros que dependen de la Administración', nivel: 'Media', comentario: 'Activos de contrato de 82,7 M en FY2024 (38 % de las ventas) [A2].' },
      { senal: 'Cambio de auditor y cuentas de FY2026 no publicadas', nivel: 'Baja', comentario: 'PKF desde FY2025; FY2026 de Stock Analysis [A1, A10].' },
    ],
  },
  rentabilidad: {
    comentario: 'La rentabilidad sobre el capital es muy alta porque el negocio casi no usa capital: patrimonio de 182 M menos 147 M de caja, fondos y sukuk, más 28 M de deuda y arrendamientos, deja ≈ 63 M de capital invertido para un EBIT después de zakat de ≈ 45 M en FY2026 [A10, A9]. El ROE fue del 31 % [D3]. La causa es el modelo: los clientes públicos adelantan dinero (pasivos de contrato de 68-88 M) y la mitad del trabajo la hacen subcontratistas que cobran después (devengos de 75 M) [A1, A10]. Ese ROIC es frágil: depende de anticipos que no son permanentes y de precios con vinculadas, y sube artificialmente si el desarrollo se capitaliza. Los comparables saudíes tienen ROE del 20-56 % (Elm 56 %, solutions by stc 39 %) [D3].',
    confianza: 'Media',
  },
  capital: {
    politica: 'Nunca ha pagado dividendos. Recompra acciones para el plan de empleados (11,1 M en FY2023, 12,0 M en FY2024, 29,8 M en FY2026) y la junta del 5-nov-2026 vota recomprar hasta 3,6 M más (6 % del capital; ≈ 106 M al precio de hoy) [A10, D12]. La caja sobrante va a fondos y sukuk (≈ 129 M) [A10].',
    comentario: 'La asignación de capital es discutible: el dinero no vuelve al accionista, sino que paga acciones para empleados (16,6 M de gasto en FY2026, 33 % del beneficio) y desarrollo capitalizado (29,1 M) [A9, A10]. La operación que más va a decir de la dirección es la compra de AZM FinTech a los propios fundadores, aún sin precio [C3]. Hasta ahora no hay compras de empresas relevantes (3,0 M de minoritarios y 2,8 M en una asociada en FY2025) [A1].',
  },
  multiplos_historicos: {
    comentario: 'Saudi Azm cotiza a ≈ 27 veces nuestro BPA de los próximos doce meses, por encima de la mediana de su historia adelantada (≈ 24 veces; de 20 a 38 veces entre FY2022 y FY2026) [D1]. La historia es corta (cinco cierres, el primero en Nomu) y se cotizó siempre como una empresa de crecimiento: el mercado pagó 38 veces el beneficio siguiente en jun-2025 y 20 veces un año después. Los comparables cotizan a 9-16 veces el beneficio adelantado (mediana ≈ 11,5).',
  },
  comparables: {
    criterio: 'Dos grupos con datos del mismo día: los integradores y empresas de servicios digitales que cotizan en Tadawul (solutions by stc, Elm, 2P, MIS y Edarat), con los mismos clientes públicos y la misma regulación, y tres grandes de servicios informáticos globales (Infosys, Cognizant, EPAM) que miden lo que el mercado paga hoy por el sector expuesto a la IA [D3]. Ninguno es tan pequeño ni depende tanto de subcontratistas vinculados.',
    comentario: 'Las grandes saudíes cotizan a 11-17 veces el EBITDA y 12-16 veces el beneficio adelantado, creciendo ≈ 9-15 %; las pequeñas de Tadawul (MIS, Edarat) a 40-97 veces el EBITDA, sin consenso; las globales a 8-22 veces el EBITDA y 9-15 veces el beneficio, creciendo ≈ 4-5 % [D3]. Saudi Azm cotiza a ≈ 31 veces el EBITDA de FY2026 y ≈ 27 veces el beneficio de doce meses: el doble que Elm, una empresa mucho mayor, más rentable y con más foso. Los comparables pesan un 20 %.',
  },
  bolsa: {
    comentario: 'La acción cerró a 29,52 SAR el 19-oct-2026: +16 % en un año (el ETF KSA −11 %) y +36 % anual en tres años (KSA +1 %), a un 7 % del máximo de 52 semanas (32,40 SAR el 7-oct) y un 46 % por encima del mínimo (20,16 el 14-jul) [D1]. Vale 1.771 M SAR (≈ 470 M USD) [D2]. Volatilidad del 27-35 %, beta de 0,5-0,7 contra el KSA y caída máxima del 46 % [D1]. Muy irregular: +221 % en 2024 y −28 % en 2025 [D1].',
    contexto: {
      movimiento: { fecha: '2026-10-19', var_1m_pct: 6.9, var_3m_pct: 33.6, var_6m_pct: 21.0, var_12m_pct: 11.0, dist_max_52s_pct: -6.6, dist_min_52s_pct: 43.2, dist_max_historico_pct: -15.7, tendencia: 'alcista', volatilidad_60d_pct: 35, avisos: [] },
      movimientos_fuertes: [
        { periodo: 'jul-2026 a sep-2026', var_pct: 33.6, causa: 'De 20,16 SAR (14-jul) a 28,18 (13-sep; +28 % en el mes desde el 13-ago): adjudicación del Ministerio de Recursos Humanos el 16/19-jul (volumen de 333.000 acciones frente a 30.000-50.000), resultados de FY2026 el 2/3-ago (beneficio +36 %), recomendación de recompra y memorando de AZM FinTech el 3-ago, subida del 14 % entre el 20 y el 23-ago sin noticia propia encontrada, alianza con Elm el 1-sep (+6 %, 1,18 M acciones) y guía de beneficio +40 % en la conferencia del 7-sep [B6, D13, D9, D1].', veredicto: 'no cambia', condicion: null },
        { periodo: 'oct-2026', var_pct: 10.9, causa: 'Del 4 al 7-oct, de 28,52 a 31,62 SAR con 1,65 M acciones en dos sesiones, sin anuncio propio encontrado (GIB subió su objetivo el 27-sep); devolvió un 10 % hasta el 15-oct y cerró a 29,52 [D1, D10].', veredicto: 'no cambia', condicion: null },
        { periodo: '2025-11-25 y 2026-03-05', var_pct: -7.8, causa: 'Caídas diarias del 6,1 % (25-nov-2025, KSA −1,5 %) y del 7,8 % (5-mar-2026, tras dos sesiones sin cruces) sin anuncio propio encontrado; la segunda coincide con la época de resultados del 2T FY2026, con beneficio de 9,7 M frente a 14,1 M del trimestre anterior [D1, D3].', veredicto: 'no cambia', condicion: null },
      ],
      noticias: [
        { fecha: '2026-11-05', tipo: 'accionista de referencia', hecho: 'Junta extraordinaria: recompra de hasta 3,6 M acciones para el plan de empleados (≈ 106 M al precio de hoy), contratos marco de 5 años con empresas vinculadas a los fundadores por 191,6 M (Azm Digital 105,79 M, AZM FinTech 74,67 M) y consejo a seis miembros [D12, D13].', veredicto: 'no cambia', condicion: 'Vigilar el voto de los contratos vinculados' },
        { fecha: '2026-11-05', tipo: 'resultados', hecho: 'Resultados del 1T FY2027 (jul-sep 2026) previstos a primeros de noviembre (fecha estimada); GIB espera 17 M de beneficio [D7].', veredicto: 'no cambia', condicion: null },
        { fecha: '2026-09-27', tipo: 'recomendación', hecho: 'GIB Capital mantiene sobreponderar y sube el precio objetivo (cifra de pago) [D10].', veredicto: 'no cambia', condicion: null },
        { fecha: '2026-09-07', tipo: 'resultados', hecho: 'La dirección espera +40 % de beneficio en FY2027 y una cartera de más de 300 M [D9].', veredicto: 'no cambia', condicion: null },
        { fecha: '2026-08-03', tipo: 'fusión u oferta', hecho: 'Memorando no vinculante para comprar el 100 % de AZM FinTech, de los propios presidente y consejero delegado; precio, forma de pago (dinero o acciones nuevas) y fecha sin fijar; vigencia de 12 meses [C3, D13].', veredicto: 'retrasa', condicion: 'Hasta conocer el precio y la forma de pago de la compra de AZM FinTech (una ampliación para pagar a los fundadores diluiría)' },
        { fecha: '2026-08-02', tipo: 'resultados', hecho: 'FY2026: ventas 307,4 M (+21 %) y beneficio 51,0 M (+36 %); 4T con 16,2 M frente a 13 M que esperaba GIB [D13, D8].', veredicto: 'no cambia', condicion: null },
        { fecha: '2026-08-06', tipo: 'demanda o regulador', hecho: 'Wasl obtiene la licencia de intermediación digital de financiación del banco central (SAMA) [D13].', veredicto: 'no cambia', condicion: null },
        { fecha: '2026-06-30', tipo: 'directivos', hecho: 'Nuevo mandato del consejo (22-jun-2026 a 21-jun-2030), con los mismos presidente y consejero delegado [D13].', veredicto: 'no cambia', condicion: null },
      ],
      proximos_resultados: '2026-11-05',
      veredicto: 'retrasa',
      condicion: 'Hasta conocer el precio y la forma de pago de la compra de AZM FinTech a los fundadores (memorando de ago-2026, vigente hasta ago-2027)',
      comentario: 'La subida del 34 % en tres meses tiene causa propia: un contrato ministerial, resultados de FY2026 (+36 %), la alianza con Elm y una guía de +40 % de beneficio, en un mercado saudí que cae [D13, D9, D1]. No hay colocaciones ni bloqueos pendientes. Lo que queda abierto es la compra de AZM FinTech a los dos fundadores: sin precio ni forma de pago, puede mover la acción más de un 5 % (una ampliación para pagarles diluiría y un precio alto trasladaría valor a los fundadores), y la junta del 5-nov vota además 191,6 M de contratos con sus empresas. Veredicto: retrasa hasta conocer esos términos.',
    },
  },
};

export default {
  limitaciones, huecos, controles_explicados, secciones,
  dcf_justificacion: {
    crecimiento: 'FY2027e +22 %: el 4T de FY2026 facturó 87,0 M (+36 %), que anualizado ya es +13 % sobre FY2026; la cartera supera los 300 M (≈ un año de ventas) y entran el contrato del Ministerio de Recursos Humanos (> 12,7 M) y los proyectos con Elm [A9, D9, B6, B5]. Después, del +18 % al +8 % en FY2032e: el histórico es +19 % anual (FY2022-FY2026) y el mercado crece ≈ 7 % (IMARC), así que Azm sigue ganando cuota desde ≈ 0,7 % [A8, B1]. No hay consenso de ventas publicado.',
    margenes: 'El margen EBITDA subió del 10,2 % de FY2022 al 17,2 % de FY2026, con 16,6 M de pagos en acciones dentro (5,4 % de las ventas) [A9]. Proyecto un 19 % en FY2027e-FY2028e (el 4T26 tuvo ≈ 21 % y la dirección espera +40 % de beneficio) y una bajada al 17 % en FY2032e: la IA abarata el desarrollo y la Administración renegociará precios; las grandes estatales (Elm 23 %, solutions by stc 15 %) marcan la referencia [A9, D3].',
    inversion: 'Amortización del 2,5 % al 3,5 % de las ventas, porque empiezan a amortizarse las plataformas capitalizadas (29,1 M de intangibles en FY2026) [A10]. Capex (inmovilizado, intangibles y altas de derechos de uso) del 7 % en FY2027e al 4,5 %: 10,2 % en FY2026 y 4,8 % en FY2025 [A10, A1]. Circulante del −5 % de las ventas en FY2027e que converge a 0 en FY2030e: hoy es −7,8 % gracias a anticipos de clientes y devengos con subcontratistas que no son permanentes (fue +7,3 % en FY2024) [A10, A2]. Zakat del 6,5 % [A9].',
    wacc: 'Flujos en SAR, anclado al USD a 3,75: tasa libre del 5,61 %, el Treasury a 10 años (5,10 %, FRED, 15-oct-2026) más el diferencial soberano saudí (0,51 %, Damodaran) [D4, D5]. Beta de 0,90: la medida contra el ETF KSA es baja (0,52 mensual, 0,71 semanal) por la poca liquidez y el poco peso tecnológico del índice; Argaam da 0,89 y el sector ≈ 1,0-1,1 [D1, D2]. Prima de mercado del 5,5 % y prima adicional del 2,28 %: 0,78 % de país y 1,5 % por tamaño (≈ 470 M USD) y liquidez [D5]. Deuda del 2 % al 6,5 %.',
    terminal: 'Crecimiento a perpetuidad del 3,0 % en SAR/USD: inflación del dólar y algo de crecimiento real de la digitalización saudí. Con un WACC de ≈ 12,7 %, Gordon implica ≈ 10 veces el EBITDA terminal, en línea con las grandes saudíes (11-17 veces) y por encima de las globales (8 veces) [D3].',
  },
  puente_comentarios: {
    'FY2027e': 'Volumen: cartera de más de 300 M, contrato del Ministerio de Recursos Humanos y proyectos con Elm; otros: plataformas de terceros y Wasl (licencia de SAMA). Sin subidas de precio: la Administración licita [D9, B6, B5, B7].',
    'FY2028e': 'Volumen: nuevos contratos públicos al ritmo de la cartera; colaboración público-privada (guía de la dirección) [D9].',
    'FY2029e': 'Volumen: cuota creciente en un mercado al ≈ 7 % anual [B1].',
    'FY2030e': 'Volumen: madurez de los grandes programas de la Visión 2030 [B1].',
    'FY2031e': 'Volumen: crecimiento hacia el del mercado [B1].',
  },
  veredicto: 'En parte',
  sostenibilidad_justificacion: null,
  dcf_lectura: null,
  narrativas: {
    Bajista: 'El petróleo bajo frena el gasto público, la Administración paga tarde y la IA abarata los proyectos al renovarlos: el crecimiento baja 8 puntos cada año (+14 % en FY2027e, +10 % en FY2028e) y el margen EBITDA 3 puntos, al nivel de FY2025 (≈ 16 %) [A1].',
    Base: 'Azm ejecuta su cartera, crece +22 % en FY2027e y frena hacia el +8 % en FY2032e, con margen EBITDA del 19 % que baja al 17 % por la presión de precios.',
    Alcista: 'Los proyectos de colaboración público-privada, Elm y Wasl aceleran: 5 puntos más de crecimiento y 1,5 de margen (cerca del 21 % del 4T26) [D9, A9].',
  },
  ...F,
};
