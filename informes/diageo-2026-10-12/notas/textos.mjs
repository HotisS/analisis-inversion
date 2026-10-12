// Textos y ajustes del analista (Diageo, corte 2026-10-12). Citas con la letra de la nota: [A1] = fuente 1 de A.json.
import D from './D.json' with { type: 'json' };
const fuera = ['Kweichow Moutai', 'Becle (Cuervo)'];

export const limitaciones = `Se valora la acción ordinaria de la Bolsa de Londres (DGE), que cotiza en peniques: 1.673 p = 16,73 GBP al cierre del lunes 12-oct-2026, con la sesión ya cerrada [D1]. Las cuentas están en dólares desde el FY2024, así que todo el informe va en USD y el precio se convierte a 1,32354 USD por GBP, cruce de los tipos del BCE del 12-oct-2026 [D3]; el ADR de Nueva York (DEO, 1 ADR = 4 acciones) se usa solo para la beta en dólares [D2]. El ejercicio cierra el 30 de junio y se nombra por el año en que termina (FY2026 = jul-25 a jun-26) [A1]. FY2023-FY2026 salen de las notas de prensa de resultados, que en el Reino Unido traen las cuentas completas; FY2022 sale del XBRL del 20-F de FY2024 reexpresado en USD, con los excepcionales, la amortización y el dividendo convertidos desde GBP (estimación) [A6]. No se incluyen FY2017-FY2021 para no mezclar divisas. Diageo publica semestres y solo ventas en el 1T y el 3T; los segundos semestres salen por diferencia [A1, A7]. El EBITDA y el EBIT del informe son los antes de excepcionales y sin asociadas (Moët Hennessy va fuera del beneficio operativo y se valora en el puente) [A1]. Consenso y comparables de un solo proveedor (MarketScreener), contrastado con Stock Analysis [D8, D10]. La venta de EABL a Asahi y la del equipo de críquet RCB por United Spirits están pendientes de cierre: su producto entra en el puente y EABL sale de la proyección [D25, D30].`;

export const controles_explicados = [
  { control: 'Regresión múltiplo-crecimiento', explicacion: 'Con ocho comparables que crecen entre −0,2 % y +6,8 %, el múltiplo depende más del perfil (cerveza frente a destilados, coñac, control familiar) que del crecimiento. No se usa la regresión.' },
];

export const huecos_resueltos = [{ seccion: 'consenso', campo: 'rating crediticio (S&P, Moody\'s)' }];

export const secciones = {
  comparables: {
    ...D.comparables,
    empresas: D.comparables.empresas.filter((e) => !fuera.includes(e.nombre)),
    criterio: 'Ocho grupos de bebidas alcohólicas con marcas globales: los cinco grandes de destilados que cotizan (Pernod Ricard, Brown-Forman, Rémy Cointreau, Campari y Constellation Brands, este con cerveza mexicana en EE. UU.), dos cerveceras globales por el 18 % de cerveza de Diageo (Heineken y AB InBev) y LVMH, que consolida el 66 % de Moët Hennessy [D15-D24]. Quedan fuera Kweichow Moutai (margen EBITDA del 67 %, mercado chino y precio regulado) y Becle, cuyo EBITDA de 2025 no cuadra con el estimado (5,5x frente a 7,5x) [D20, D23]. Bacardi y Suntory Global Spirits no cotizan.',
    comentario: `Diageo cotiza a 10,6x el EBITDA de los últimos 12 meses y 10,8x el de los próximos, frente a una mediana de 9,9x y 9,4x de los comparables; su PER de los próximos 12 meses (13,4x) está por debajo de la mediana (15,7x) por el apalancamiento: 3,2x deuda neta/EBITDA frente a 2,7x [D8]. La prima en EBITDA se explica por el margen (32,7 % frente al 29,0 % de la mediana) y el ROIC (12,6 %), no por el crecimiento: el consenso le da casi el mismo que a Pernod (−0,2 %) y menos que a la mediana (2,8 %). La mediana de EV/EBITDA da 18,05 USD por acción y la de PER 25,87: la distancia entre ambas es la deuda. Usamos la media de los dos, que da 21,96 USD, un 0,8 % por debajo del precio: por múltiplos la acción está en su sitio frente a un sector que también está en mínimos.`,
  },
  calidad: {
    comentario: `PwC audita desde el FY2016 (11 ejercicios), con concurso en el FY2024 y opinión favorable; sus cuestiones clave son el valor de marcas, fondo de comercio y asociadas, las posiciones fiscales de Brasil y las pensiones [A2]. La señal más importante es que **los excepcionales se repiten**: 766 M USD en FY2023, 1.369 M en FY2025 y 2.527 M en FY2026, casi todo deterioros de marcas compradas (Aviation, Don Papa, Mey İçki por la hiperinflación turca) y reestructuraciones [A1, A3, A4]. Por eso el informe usa el beneficio antes de excepcionales para el EBITDA, pero descuenta en el puente la caja de reestructuración pendiente (c.800 M después de impuestos) [A13]. El beneficio operativo antes de excepcionales incluye además ganancias por revalorizar pagos contingentes (+89 M y +139 M), que no son negocio [A1]. La hiperinflación de Türkiye y Venezuela mueve la cuenta (ajuste de 332 M en ventas del FY2026) y los cambios de perímetro africanos restan comparabilidad [A1]. De los indicadores del motor, el Altman Z (2,11, zona gris) refleja el apalancamiento y no un riesgo de quiebra con un rating A3/A- [A12]; el Piotroski (6 de 9) cae por el margen bruto y la rotación; el Beneish M (−2,83) no apunta a manipulación. La exposición fiscal de Brasil (hasta 1.032 M sin provisión) es el pasivo contingente más relevante [A2].`,
  },
  rentabilidad: {
    comentario: `Diageo crea valor, pero cada vez menos. El ROIC del motor (NOPAT antes de excepcionales sobre capital invertido) bajó del 17,0 % en FY2022 al 12,6 % en FY2026, frente a un WACC del 8,01 %: sigue cuatro puntos y medio por encima, pero el diferencial se ha estrechado a la mitad. La causa es doble: el margen EBIT cayó del 31,3 % al 28,9 % y la rotación del capital, de 0,46 a 0,41 veces, porque el capital invertido subió de 28.706 M a 33.630 M sin ventas nuevas. El ROIC incremental de los cinco años es negativo: se añadieron unos 5.000 M de capital (sobre todo existencias de whisky en envejecimiento, de c.6.300 M a 8.510 M, y capex de capacidad en tequila y Guinness) y el NOPAT bajó [A1, A2]. La propia empresa calcula un ROIC del 13,4 % con las asociadas [A1]. Pernod Ricard, con margen EBIT del 25,8 % y más existencias de coñac, está en una situación parecida [B13]. La nueva remuneración mide la mejora del ROIC (20 % del plan a largo plazo), lo que va en la buena dirección [C1].`,
  },
  capital: {
    comentario: `El historial de asignación de capital de la última década es pobre. Entre FY2022 y FY2024 Diageo recompró acciones por 5.664 M USD a precios de 27-35 GBP, el doble del actual, mientras subía la deuda neta de 17.195 M a 20.975 M y el apalancamiento pasaba de 2,4x a 3,2x [A1, A4, A6]. Las compras de marcas pequeñas de alto crecimiento (Aviation, Don Papa, 21Seeds, Casamigos con su pago variable) han terminado en deterioros: 910 M en FY2025 y 1.489 M en FY2026 [A1, A3]. La dilución es nula y las acciones bajaron de 2.325 M a 2.231 M por las recompras. El cambio de rumbo de 2026 es creíble en lo financiero: dividendo recortado a 50 c (suelo de una política del 30-50 % del beneficio), recompras suspendidas, venta de EABL y RCB y un plan sin compras que lleva el apalancamiento a 2x en FY2029 si no reparte la caja sobrante [A1, A13]. Pagar el dividendo de FY2025 con el 98 % del beneficio y recortarlo después destruyó credibilidad; la nueva política la recupera a costa de la renta.`,
  },
  multiplos_historicos: {
    ...D.multiplos_historicos,
    comentario: `El EV/EBITDA de los últimos 12 meses (10,6x) está en el mínimo de cinco años, un 25 % por debajo de la media (14,1x; máximo de 17,2x en FY2022) y en el percentil 20. El PER sale caro (28,4x) solo porque el beneficio publicado del FY2026 lleva 2.527 M de excepcionales: con el BPA antes de excepcionales (1,653 USD) sería de 13,4x [A1]. El descuento frente a la historia tiene causas estructurales: el crecimiento orgánico pasó del 6,5 % de FY2023 al −2,0 % de FY2026, el Tesoro a 10 años está en el 5,22 % frente al 3 % de 2022 y el apalancamiento subió de 2,4x a 3,1x [A1, D11]. La prima de 2021-2022 era la de una empresa que crecía a un dígito alto con tipos bajos; no volverá sin crecimiento.`,
  },
};

export const parches = [
  { ruta: 'consenso.base_ebitda', valor: 'ajustado' },
  { ruta: 'identificacion.fundacion', valor: '1997' },
  { ruta: 'identificacion.empleados', valor: 27938 },
  { ruta: 'consenso.ajuste_ebitda_pct_ventas', valor: 1.11 },
];

export const dcf_justificacion = {
  crecimiento: `FY2027e cae un 2,5 %: la guía del CMD es de ventas orgánicas planas, con Norteamérica cayendo a un dígito medio, y EABL (≈ 1.000 M de ventas, el 5 % del grupo) sale hacia diciembre de 2026 [A13, D25]. FY2028e cae un 0,5 %: +1,5 % orgánico del algoritmo menos el otro medio año de EABL. Desde FY2029e, +2,5-3,5 %, el ritmo de salida del plan (2,5-3 %) y el del mercado de espirituosos (IWSR, 1-3 % en valor) más inflación, bajando al 2,75 % en FY2036e [A13, B20]. La media de la proyección (2,2 %) queda muy por debajo del 5-7 % que Diageo prometió en 2021 y no cumplió [C20]. Coincide con el consenso en FY2027e (19.152 M) y queda un 1,7 % por debajo en FY2028e-FY2029e, porque el consenso no descuenta del todo la salida de EABL [D8].`,
  margenes: `El margen EBITDA (sin asociadas ni excepcionales) pasa del 32,7 % de FY2026 al 34,5 % en FY2031e. El motor es el plan de ahorro de c.1.000 M (850 M de estructura y 150 M de cadena de suministro), el 40 % en FY2027 y el 55 % en FY2028, del que la empresa reinvierte una parte en marketing (c.16 % de las ventas) [A13]. Solo algo más de un tercio de esos ahorros (≈ 350 M) llega al margen en nuestra proyección: el resto se va en precio, mezcla negativa en EE. UU. y aranceles (c.200 M anuales sin mitigar, la mitad compensable) [A7]. El 34,5 % final es el de FY2022 y está por debajo del 36,8 % de Constellation Brands [D19]; el consenso llega al 34,1 % en FY2029e.`,
  inversion: `Capex del 7,0 % de las ventas en FY2027e-FY2028e: la guía de c.1.250 M al año (tequila en Jalisco, Guinness en Littleconnell, almacenes de whisky) más c.0,6 puntos de altas de derechos de uso, porque los arrendamientos están en la deuda [A2, A13]. Baja al 5,4 % en FY2036e cuando termina el ciclo de capacidad, frente al 6,1-8,0 % de FY2022-FY2026, y sigue por encima de la amortización (4,2 %). **El circulante es la inversión que más pesa**: las existencias de whisky en envejecimiento suben de c.6.300 M en FY2022 a 8.510 M en FY2026 y llevan el circulante del 24,4 % al 37,6 % de las ventas [A2]. Lo dejamos en el 38,6 % (constante en importe al salir EABL): cada dólar de ventas nuevas inmoviliza unos 39 céntimos. Tipo impositivo del 24 %, la guía antes de excepcionales [A1].`,
  wacc: `Tasa libre del 5,22 %, el Tesoro de EE. UU. a 10 años del 8-oct-2026, porque los flujos están en dólares [D11]; el gilt está en el 4,99 % [D13]. Beta de 0,77, la ajustada (Blume) del ADR DEO frente al MSCI ACWI, mensual a 5 años, en dólares; la bruta es 0,65 y con la acción de Londres convertida a dólares sale 0,61 mensual y 0,70 semanal [D2]. Frente al FTSE 100 en libras daría 0,40, artificialmente baja por la divisa (lección de CSL). Prima de mercado del 5,5 % y sin prima adicional: el 63 % de las ventas está en Norteamérica y Europa [A1]. Coste de la deuda del 5,9 %, el marginal en dólares de un emisor A3/A- (el medio histórico es 3,9 %) [A12, D6]; peso de la deuda del 29 % a valor de mercado. WACC del 8,01 %; con la prima implícita del mercado (4,2 %), 7,3 % [D14].`,
  terminal: `Método «media»: Gordon con un crecimiento del 2,5 % (inflación del dólar y casi nada real, coherente con un consumo de alcohol que baja en volumen en los países ricos) y un múltiplo de salida de 11,0x EBITDA, entre el 10,6x actual y la media de cinco años (14,1x), y por encima de la mediana de comparables (9,9x). El múltiplo implícito del terminal resultante es de 11,2x y el valor terminal pesa el 61 % del valor. Un terminal del 3 % sería defendible con la premiumización histórica; no lo usamos porque el volumen de destilados en EE. UU. cayó un 9 % en FY2026 [A1].`,
};

export const dcf_lectura = `El DCF da 23,99 USD por acción, un 8,4 % por encima del precio, con el 61 % del valor en el terminal. **El precio descuenta una Diageo que apenas vuelve a crecer.** El DCF inverso dice que, con nuestros márgenes, el precio pide un crecimiento de las ventas del 1,3 % anual entre FY2027e y FY2036e, frente al 2,2 % de nuestro caso base y al 2,5-3 % que la empresa promete a la salida del plan [A13]; con nuestro crecimiento, pide un margen EBITDA del 32,9 %, el de FY2026, es decir, que el plan de ahorro de c.1.000 M no deje nada. Es una expectativa baja para un negocio que no ha bajado del 31,9 % de margen en cinco años. Pero la rentabilidad implícita en el precio es del 8,5 %, apenas medio punto por encima de nuestro WACC (8,01 %): con un Tesoro al 5,22 % el margen de seguridad es estrecho, y la diferencia frente al mercado sale de la tasa, no de las cifras. Con la prima implícita del mercado (4,2 %, WACC del 7,3 %) el DCF da 27,26 USD. Nuestras cifras coinciden con el consenso en FY2027e y quedan algo por debajo después: no hay una visión muy distinta de la del mercado en el negocio, sino en lo que cuesta esperar.`;

export const sost_veredicto = 'En parte';
export const sost_justificacion = `El crecimiento que proyectamos es modesto (2,2 % anual) y sale sobre todo de precio, no de volumen. La reinversión no lo sostiene sola: la proyección reinvierte el 13 % del NOPAT, que al ROIC actual del 12,6 % financia en torno al 1,6 % anual, y el ROIC incremental de cinco años es negativo (capital invertido +17 % con ventas planas). La cuota implícita no exige ganar mercado: del 4,5 % sin EABL al 4,8 % en FY2036e, con el mercado al 2,0 % anual (estimación propia sobre la cuota del 4,7 % de IWSR) [B7]. El foso existe (ventas 1,8 veces las del segundo, whisky de diez años en existencias) [B1], pero el poder de precios se ha debilitado: precio/mezcla −1,6 % en FY2026 [A1, B3]. Por eso el caso base queda por debajo de la guía.`;

export const narrativas = {
  Bajista: 'La caída del consumo de destilados en EE. UU. se hace estructural (moderación, fármacos GLP-1, cannabis) y el tequila sigue cayendo como en FY2026 (−21 %); el precio/mezcla queda negativo y los ahorros se reinvierten para defender cuota, con el margen en el 31-32 % de FY2025. Es lo que le pasó a Diageo en FY2024-FY2026 y a Brown-Forman y Rémy en 2024-2025 [A1, B11].',
  Base: 'Ventas orgánicas planas en FY2027 y un 2,5-3,5 % desde FY2029, con Norteamérica estabilizada y Europa, Latinoamérica e India creciendo; el plan de ahorro sube el margen EBITDA hasta el 34,5 % y la deuda baja a 2,5x con EABL y RCB [A13].',
  Alcista: 'Norteamérica vuelve a crecer en FY2029, el tequila se estabiliza y la mitad del ahorro de c.1.000 M llega al margen (35-36 %, como en FY2021-FY2022); el mercado vuelve a pagar 13x EBITDA, por debajo de su media de cinco años (14,1x).',
};

export const escenarios_comentario = `El alcista da 31,52 USD (+42,4 %) y el bajista 15,45 USD (−30,2 %): la asimetría es de 1,40 veces, favorable pero no holgada. El bajista es verosímil, porque es la prolongación de los dos últimos años, y su pérdida (−30 %) es parecida a la caída de la acción en 2025 (−36,8 %) [D1]. Con la prima implícita del mercado los extremos son 35,55 y 17,65 USD y la asimetría sube a 2,99 veces. Compensa para quien acepte la tasa del mercado; con nuestro coste de capital, la recompensa esperada es justa.`;

export const sdp_comentario = 'No aplica: Diageo reporta por regiones y no publica el resultado de la cerveza (18 % de las ventas) ni de cada categoría [A1]. La única pieza con perfil distinto, el 34 % de Moët Hennessy, va fuera del beneficio operativo y se valora en el puente.';

export const valoracion_comentario = `El DCF pesa el 50 % porque es el único método que recoge el cambio de perímetro (EABL), el plan de ahorro y el coste del circulante de whisky; los escenarios, el 20 %, por la incertidumbre del consumo en EE. UU. Los comparables (25 %) están ellos mismos en mínimos de valoración y los sesga la deuda (EV/EBITDA da 18,05 USD y PER 25,87); las transacciones (5 %) llevan prima de control y casi no publican múltiplo, y una OPA sobre Diageo es improbable por su tamaño y por la cláusula de Moët Hennessy [A2]. **El puente** usa la deuda neta publicada (20.482 M a 30-jun-2026) [A1] y tres ajustes: United Spirits a valor de mercado en los minoritarios (4.282 M frente a 755 M contables; −1,58 USD por acción) [D31, A2]; el producto pendiente de EABL (2.300 M) y de RCB (c.665 M, el 0,1x de desapalancamiento que da la empresa, prudente frente a los 1.739 M del precio) menos la caja de reestructuración pendiente (c.800 M después de impuestos), en total +0,97 USD por acción [D25, D30, A13]. **Moët Hennessy** va a valor contable (5.107 M; 2,29 USD por acción): a 16x su beneficio normalizado de FY2024-FY2026 valdría ≈ 4.700 M, y la opción de venta a LVMH al 80 % del valor razonable pone una cota superior de ≈ 7.300 M (lo que LVMH registra como compromiso) [A2, D32]. La dispersión es moderada: todos los métodos quedan entre 21,96 y 23,99 USD salvo las transacciones.`;

export const catalizadores = {
  items: [
    { fecha: '5-nov-2026', evento: 'Actualización de ventas del 1T FY2027 y junta general (vota la nueva política de remuneración)', efecto: 'Primera prueba de la guía de ventas orgánicas planas y de Norteamérica tras el CMD', probabilidad: 'Alta', sentido: '+/−' },
    { fecha: 'Antes del 31-dic-2026', evento: 'Cierre de la venta de EABL a Asahi', efecto: 'Entran c.2.300 M USD y el apalancamiento baja c.0,25x', probabilidad: 'Alta', sentido: '+' },
    { fecha: 'FY2027 (antes de jun-2027)', evento: 'Cierre de la venta de RCB por United Spirits', efecto: 'Caja en United Spirits y c.0,1x menos de apalancamiento', probabilidad: 'Media', sentido: '+' },
    { fecha: 'Feb-2027', evento: 'Resultados del 1S FY2027', efecto: 'Primeros ahorros del nuevo modelo operativo (c.40 % en FY2027) y evolución del margen', probabilidad: 'Alta', sentido: '+/−' },
    { fecha: '2027', evento: 'Relevo del director financiero (Joanne Wilson sustituye a Nik Jhangiani)', efecto: 'Riesgo de continuidad en mitad del plan de ahorro', probabilidad: 'Alta', sentido: '−' },
    { fecha: 'Ago-2027', evento: 'Resultados del FY2027', efecto: 'Cumplimiento de la guía (beneficio operativo +bajo-medio dígito, flujo libre c.2.000 M)', probabilidad: 'Alta', sentido: '+/−' },
  ],
  confianza: 'Alta',
};

export const riesgos = {
  items: [
    { riesgo: 'Caída estructural del consumo de destilados en EE. UU. (moderación, GLP-1, cannabis, generación Z)', tipo: 'Demanda', probabilidad: 'Media', impacto: 'Alto', efecto_valor: '−30 % (escenario bajista)', mitigante: 'Guinness, Europa, Latinoamérica e India crecen; precio de la cartera escocesa', senal: 'Volumen de destilados en EE. UU. por debajo de −5 % en el 1S FY2027 (−9 % en FY2026) [A1]' },
    { riesgo: 'Tequila: exceso de oferta y reposicionamiento de precios (Casamigos −25 %, Don Julio −14 %)', tipo: 'Competencia', probabilidad: 'Media', impacto: 'Medio', efecto_valor: '≈ −9 % por cada punto menos de crecimiento anual (−2,11 USD por acción)', mitigante: 'Coste del agave más bajo; capacidad propia en Jalisco', senal: 'Precio/mezcla de Norteamérica negativo dos semestres más [A1]' },
    { riesgo: 'Aranceles de EE. UU. sobre el whisky escocés y los destilados de la UE, o fin de la exención de México y Canadá en la revisión del T-MEC', tipo: 'Regulatorio', probabilidad: 'Media', impacto: 'Medio', efecto_valor: '≈ −5 % (200 M anuales sin mitigar capitalizados)', mitigante: 'La empresa compensa la mitad; producción en EE. UU.', senal: 'Cambios arancelarios publicados por la oficina comercial de EE. UU. [A7]' },
    { riesgo: 'Ejecución del plan de ahorro de c.1.000 M con un equipo nuevo (tres consejeros delegados en 15 meses y relevo del director financiero en 2027)', tipo: 'Gestión', probabilidad: 'Media', impacto: 'Medio', efecto_valor: '−1,5 puntos de margen ≈ −7 %', mitigante: 'El 70 % del coste ya está cargado en FY2026; Lewis ya hizo un plan así en Tesco', senal: 'Margen operativo del 1S FY2027 sin mejora interanual [C7, C8]' },
    { riesgo: 'China (baijiu, −47 % en FY2026) y la austeridad en el consumo oficial', tipo: 'Demanda', probabilidad: 'Alta', impacto: 'Bajo', efecto_valor: '≈ −2 %', mitigante: 'Shui Jing Fang pesa ya el 2 % de las ventas', senal: 'Resultados semestrales de Shui Jing Fang [A1]' },
    { riesgo: 'Apalancamiento de 3,1x con un Tesoro al 5,2 %: refinanciar a tipos más altos', tipo: 'Financiero', probabilidad: 'Baja', impacto: 'Medio', efecto_valor: '≈ −2 % por cada punto de coste de deuda', mitigante: 'Rating A3/A-, vencimientos repartidos, ventas de EABL y RCB', senal: 'Rebaja de rating o apalancamiento por encima de 3,0x en jun-2027 [A12]' },
    { riesgo: 'Contingencias fiscales en Brasil (hasta c.1.032 M USD sin provisión) y litigios de United Spirits en India', tipo: 'Legal', probabilidad: 'Baja', impacto: 'Bajo', efecto_valor: '≈ −2 % (0,46 USD por acción en el peor caso)', mitigante: 'Recurridas; la empresa no las provisiona', senal: 'Sentencias del Supremo brasileño sobre impuestos indirectos [A2]' },
    { riesgo: 'Coñac y champán en Moët Hennessy (beneficio de 1.299 M a 668 M en dos años)', tipo: 'Participadas', probabilidad: 'Media', impacto: 'Bajo', efecto_valor: '≈ −2 % si se deteriora a 4.700 M', mitigante: 'Opción de venta a LVMH al 80 % del valor razonable', senal: 'Resultados de Vinos y Licores de LVMH [A2, D32]' },
  ],
  premortem: `Es octubre de 2029 y Diageo vale un 40 % menos. Lo que pasó: la caída del volumen de destilados en EE. UU. no era desestocaje ni ciclo, sino un cambio de hábitos. Los fármacos GLP-1 se abarataron en 2027, la generación Z siguió bebiendo menos y el cannabis legal ganó estados; el volumen de Diageo en EE. UU. cayó otro 4-5 % al año, como en FY2026 (−9 %) [A1]. Para defender la cuota, Lewis reinvirtió casi todos los ahorros en marketing y en precio, y el margen EBITDA se quedó en el 31-32 %. El tequila siguió en guerra de precios. A la vez, la revisión del T-MEC acabó con la exención de los destilados mexicanos y canadienses, y el arancel sobre el escocés subió. Con el beneficio plano y la deuda en 3x, el consejo tuvo que elegir entre recortar otra vez el dividendo o vender Guinness, y el mercado dejó de ver a Diageo como un valor de calidad: el EV/EBITDA pasó de 10,6x a 8,5x, el de Pernod. El indicador que lo habría anticipado es el volumen de destilados de Norteamérica en las actualizaciones trimestrales: dos trimestres seguidos por debajo de −5 % en FY2027 desmienten la guía de estabilización del CMD.`,
  confianza: 'Media',
};

export const preguntas = {
  items: [
    { tema: 'Norteamérica', pregunta: '¿Qué parte de la caída del 9 % del volumen de destilados en EE. UU. en FY2026 es desestocaje de mayoristas y qué parte consumo?', por_que: 'Separa un bache de un cambio estructural: es la diferencia entre el escenario base y el bajista [A1, B3].' },
    { tema: 'Ahorros', pregunta: '¿Cuánto de los c.1.000 M de ahorro llegará al margen y cuánto se reinvierte en marketing y precio?', por_que: 'El DCF inverso dice que el precio descuenta que no llegue nada; cada punto de margen vale ≈ 1,1 USD por acción [A13].' },
    { tema: 'Existencias de whisky', pregunta: '¿Cuál es el plan de existencias en envejecimiento para FY2027-FY2029 y su peso sobre ventas?', por_que: 'Subieron de c.6.300 M a 8.510 M en cuatro años y son la inversión que más pesa en el flujo libre [A2].' },
    { tema: 'Moët Hennessy', pregunta: '¿Contempla Diageo ejercer la opción de venta del 34 % de Moët Hennessy, y a qué valor la tiene en cuenta?', por_que: 'Entre el múltiplo de beneficio (≈ 4.700 M) y la cota de la opción (≈ 7.300 M) hay 1,2 USD por acción [A2, D32].' },
    { tema: 'Aranceles', pregunta: '¿Qué pasa con la exención de México y Canadá si la revisión del T-MEC no se renueva?', por_que: 'Tequila y whisky canadiense pesan el 18 % de las ventas y se venden sobre todo en EE. UU. [A1, A7].' },
    { tema: 'Cartera', pregunta: '¿Hay más ventas de activos en estudio (cervezas africanas restantes, marcas locales) y para qué se usaría la caja?', por_que: 'El plan lleva el apalancamiento a 2x en FY2029 sin decir si se repartirá la caja sobrante [A13].' },
    { tema: 'Remuneración', pregunta: '¿Por qué subir el plan a largo plazo del consejero delegado al 650 % del salario y quitar condiciones a las opciones?', por_que: 'El voto en contra subió al 10,81 % en 2025 y la nueva política se vota el 5-nov-2026 [C1, C2].' },
  ],
  confianza: 'Media',
};

const sintesis = `**La recomendación y por qué.** Comprar, con convicción baja. El valor objetivo es de 23,85 USD por acción (18,02 GBP), un 7,7 % por encima del precio de 22,14 USD (16,73 GBP); con el dividendo, la rentabilidad total esperada a 12 meses es del 10,0 %, con una asimetría de 1,40 veces (alcista +42,4 %, bajista −30,2 %). La regla absoluta da Mantener y la relativa Comprar: con la prima que hoy pide el mercado (4,2 %), el valor es de 26,12 USD y la rentabilidad del 20,2 %. La convicción es baja porque las dos reglas discrepan y porque la diferencia es de tasa, no de cifras: nuestras ventas coinciden con el consenso. Subiría si el 1S FY2027 (febrero) muestra el volumen de Norteamérica por encima de −3 % y el margen al alza.

**El negocio.** Diageo es el n.º 1 mundial de espirituosos, con ventas 1,8 veces las del segundo, un margen EBITDA del 32,7 % frente al 29,0 % de la mediana de comparables y un ROIC del 12,6 % frente a un WACC del 8,01 % [B1]. Pero el diferencial se ha reducido a la mitad desde FY2022 (17,0 %) y el ROIC incremental es negativo: el capital subió con ventas planas. **La calidad de la empresa sostiene solo en parte el crecimiento que proyectamos (2,2 % anual)**: el foso de marcas y de whisky envejecido es real, pero el precio/mezcla fue negativo en FY2026 (−1,6 %) [A1].

**Finanzas.** Ventas de 19.643 M USD en FY2026 (−2,0 % orgánico) y EBITDA antes de excepcionales de 6.432 M [A1]. Los excepcionales se repiten cada año (2.527 M en FY2026), así que descontamos la caja de reestructuración pendiente. Las existencias de whisky en envejecimiento (8.510 M) llevan el circulante al 37,6 % de las ventas: cada dólar de crecimiento inmoviliza unos 39 céntimos [A2]. Deuda neta de 20.482 M (3,1x), que baja con la venta de EABL (c.2.300 M) [A1, D25].

**Equipo y gobierno.** Consejo independiente (10 de 13 criterios), sin accionista de control. Resta la rotación: tres consejeros delegados en 15 meses y relevo del director financiero en 2027 [C5-C8]. La nueva política sube el plan a largo plazo del consejero delegado al 650 % del salario [C1].

**Valoración.** El DCF da 23,99 USD (+8,4 %); comparables, 21,96; escenarios, 23,46. El DCF inverso dice que el precio pide un crecimiento del 1,3 % anual frente a nuestro 2,2 %, o un margen del 32,9 %: que los c.1.000 M de ahorro no dejen nada. Es poco exigente; lo exigente es la tasa: la rentabilidad implícita (8,5 %) apenas supera nuestro WACC. El EV/EBITDA (10,6x) está en mínimos de cinco años (media 14,1x). Moët Hennessy (34 %) va a valor contable, 2,29 USD por acción, con una cota de c.3,3 USD por la opción de venta a LVMH [A2, D32].

**Riesgos y catalizadores.** El principal es que la caída del consumo en EE. UU. (volumen de destilados −9 % en FY2026) sea estructural: es el bajista, −30 % [A1]. Le siguen los aranceles (c.200 M anuales sin mitigar) y la ejecución del plan con un equipo nuevo [A7]. Catalizadores: actualización del 1T y junta el 5-nov-2026, cierre de EABL antes de fin de año y resultados del 1S en febrero. En los foros el tono está dividido: confían en Lewis, pero piden crecimiento y no solo recortes [E3, E5].

**Qué cambiaría la decisión.** La regla da Comprar por debajo de 23,13 USD (17,48 GBP), donde está hoy el precio, Mantener hasta 29,60 USD (22,36 GBP) y Vender por encima; la convicción subiría si el volumen de Norteamérica se estabiliza. Pasaríamos a Mantener si el 1S FY2027 trae ventas orgánicas por debajo de −2 % o el margen operativo baja, o si la venta de EABL se retrasa más allá de junio de 2027.`;

export const resumen = {
  recomendacion: 'Comprar',
  conviccion: 'Baja',
  justificacion_recomendacion: null,
  horizonte: '12 meses',
  sintesis,
  tesis: `Diageo es el mayor grupo de espirituosos del mundo, con marcas que llevan siglos (Johnnie Walker, Guinness, Smirnoff, Baileys, Don Julio) y un margen EBITDA del 32,7 % que ningún rival cotizado de su tamaño iguala salvo Constellation [A1, D19]. Su ventaja es difícil de copiar: 8.510 M USD de whisky envejeciendo en barricas y una distribución en casi 180 países [A2]. Pero lleva tres años sin crecer: ventas de 20.516 M en FY2022 y 19.643 M en FY2026, con el volumen de destilados en EE. UU. cayendo un 9 % el último año [A1].

El precio descuenta casi un estancamiento. El DCF inverso da un crecimiento implícito del 1,3 % anual con nuestros márgenes, o un margen del 32,9 % con nuestro crecimiento: el plan de ahorro de c.1.000 M no dejaría nada [A13]. El EV/EBITDA de 10,6x está un 25 % por debajo de su media de cinco años, en la zona de Pernod.

El mercado acierta en que el crecimiento ya no es el de antes y en que el capital rinde menos (ROIC del 17,0 % al 12,6 %). Se equivoca, creemos, en dar por perdido el margen: el 70 % del coste del plan ya está cargado y Lewis tiene precedente en Tesco [C7]. Para invertir hay que creer que Norteamérica se estabiliza en dos años y aceptar una rentabilidad propia del 10,0 % con un Tesoro al 5,22 %.`,
  vision_diferencial: {
    mercado_descuenta: 'Un crecimiento de las ventas del 1,3 % anual durante diez años, o el margen de FY2026 sin mejora, con una rentabilidad implícita del 8,5 %. Es decir, que el plan de Lewis estabiliza el negocio pero no recupera márgenes, y que el consumo de destilados en EE. UU. no vuelve a crecer.',
    nuestra_vision: 'Un crecimiento del 2,2 % anual, por debajo de la salida del plan (2,5-3 %), y un margen que sube 1,8 puntos hasta el 34,5 % de FY2022 porque llega algo más de un tercio (≈ 350 M) de los ahorros. Coincidimos con el consenso en FY2027e y estamos algo por debajo después.',
    por_que: 'El coste de los ahorros ya está pagado en buena parte (c.70 % cargado en FY2026) y el 40 % llega en FY2027; incluso reinvirtiendo la mayoría, el margen tiene recorrido [A13]. Pero la diferencia con el mercado es pequeña: no es una visión contraria, sino una apuesta a que la tasa que pide el mercado es la buena.',
  },
  a_favor: [
    '**Precio de mínimos**: EV/EBITDA de 10,6x, un 25 % por debajo de su media de cinco años (14,1x).',
    '**Ahorro ya pagado**: c.1.000 M de ahorros con el 70 % del coste cargado en FY2026; el precio descuenta que no deje nada [A13].',
    '**Desapalancamiento con fecha**: la venta de EABL (c.2.300 M) baja la deuda 0,25x antes de fin de 2026 [D25].',
    '**Marcas que sí crecen**: Guinness +12 % y el escocés +2 % en FY2026, con Europa (+5,7 %) y Latinoamérica creciendo [A1].',
    '**Moët Hennessy con suelo**: 2,29 USD por acción a valor contable, con una opción de venta a LVMH al 80 % del valor razonable [A2].',
  ],
  en_contra: [
    '**EE. UU. no para de caer**: volumen de destilados −9 % y tequila −21 % en FY2026 [A1].',
    '**El capital rinde menos**: ROIC del 17,0 % al 12,6 % en cuatro años y ROIC incremental negativo.',
    '**El whisky inmoviliza caja**: el circulante pasó del 24,4 % al 37,6 % de las ventas [A2].',
    '**Equipo nuevo**: tres consejeros delegados en 15 meses y otro director financiero en 2027 [C5-C8].',
    '**Excepcionales cada año**: 2.527 M en FY2026; el beneficio publicado es menos de la mitad del ajustado [A1].',
    '**Tasa exigente**: la rentabilidad implícita (8,5 %) apenas supera nuestro WACC (8,01 %).',
  ],
  que_vigilar: 'La tesis depende de que Norteamérica deje de caer en FY2027-FY2028, como promete el CMD (de −medio dígito a plano), y de que el margen operativo suba con los primeros ahorros [A13]. La señal de que no se cumple sería un volumen de destilados en EE. UU. por debajo de −5 % en la actualización del 1T (5-nov-2026) o en el 1S (febrero de 2027), o un margen operativo semestral sin mejora pese al 40 % del ahorro.',
  cambiaria_recomendacion: [
    'Si las ventas orgánicas del 1S FY2027 caen más de un 2 %, pasaríamos a Mantener.',
    'Si el margen operativo antes de excepcionales del 1S FY2027 no mejora frente al 1S FY2026, pasaríamos a Mantener.',
    'Si la venta de EABL no se cierra antes de junio de 2027, revisaríamos el puente (−1,03 USD por acción) y la recomendación.',
    'Si el precio supera 29,60 USD (22,36 GBP) sin cambio en las cifras, pasaríamos a Vender o reducir.',
    'Si EE. UU. sube los aranceles sobre el escocés o retira la exención del T-MEC al tequila, rebajaríamos el caso base.',
  ],
  kpis_seguimiento: [
    { kpi: 'Ventas orgánicas de Norteamérica', nivel_actual: '−9,1 % reportado en FY2026', umbral_alerta: 'Por debajo de −5 % en el 1S FY2027', por_que: 'Es el 37 % de las ventas y el centro del bajista [A1].' },
    { kpi: 'Margen operativo antes de excepcionales', nivel_actual: '28,9 % en FY2026', umbral_alerta: 'Sin mejora en el 1S FY2027', por_que: 'Mide si los ahorros llegan al margen [A1, A13].' },
    { kpi: 'Precio/mezcla del grupo', nivel_actual: '−1,6 % en FY2026', umbral_alerta: 'Negativo dos semestres más', por_que: 'Mide el poder de precios que sostiene el foso [A1].' },
    { kpi: 'Existencias en envejecimiento', nivel_actual: '8.510 M USD (43 % de las ventas)', umbral_alerta: 'Por encima de 9.000 M sin crecimiento', por_que: 'Es la inversión que más resta al flujo libre [A2].' },
    { kpi: 'Apalancamiento', nivel_actual: '3,1x deuda neta/EBITDA ajustado', umbral_alerta: 'Por encima de 3,0x en jun-2027', por_que: 'La guía es el punto medio de 2,5-3,0x tras EABL [A13].' },
  ],
  confianza: 'Media',
};

export const fuentes = [];
export const huecos = [];
