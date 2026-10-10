// Textos del analista (Dunelm, corte 2026-10-10). Citas: [A3] = fuente 3 de A.json; [D13] = fuente 13 de D.json.
import { resumen as resumenTxt } from './resumen.mjs';
export const resumen = resumenTxt;

export const limitaciones = `Se valora la acción ordinaria de la Bolsa de Londres (DNLM), que cotiza en peniques; precio y valores por acción en libras (cierre del viernes 9-oct-2026, 7,995 GBP; el corte cae en sábado) [D2]. El ejercicio es de 52/53 semanas, cierra a finales de junio y se nombra por el año en que termina (FY2026 = jul-25 a jun-26); FY2022 tuvo 53 semanas y FY2027 también las tendrá [A1]. FY2017-FY2019 no aplican la NIIF 16 (el alquiler está dentro del EBITDA). Las cifras son las publicadas; desde FY2027 la empresa pasará a dar cifras ajustadas por las partidas del plan «Winning Hearts & Homes» (30-40 M en FY2027-FY2028) [A3]. Un solo segmento (NIIF 8): no hay cifras por categoría, canal en importe ni geografía. El capex del DCF suma las altas de derechos de uso de las tiendas. El puente es del 27-jun-2026; el dividendo final de 28,5 p se paga el 17-nov, después del corte [D1]. Comparables y consenso de MarketScreener [D3, D7-D15]. La actualización del 1T FY27 (15-oct-2026) llega después del corte.`;

export const controles_explicados = [];

const multiplos_historicos = {
  comentario: `Dunelm cotiza a 6,3 veces el EBITDA de los últimos 12 meses y 10,4 veces el beneficio, en el percentil 11 y 22 de su historia (medias de 9,0 y 14,9 veces) [D2]. El descuento tiene una causa clara: el beneficio antes de impuestos lleva cuatro años plano en unos 211 M aunque las ventas suben, porque los salarios se comen el crecimiento [A1]. El mercado ha dejado de pagar por una cuota que ya no sube (7,9 %, +10 puntos básicos en FY2026 frente a +60 en FY2024) [B1].`,
};

const comparables = {
  comentario: `Dunelm cotiza a 6,2 veces el EBITDA de los próximos 12 meses y 10,7 veces el beneficio, cerca de la mediana de los minoristas británicos con NIIF 16 (5,5 y 11,4 veces) pese a tener un margen EBITDA mayor (17,2 % frente al 15,4 %) y un ROIC del 33,8 % [D7-D15]. Next, el comparable de más calidad, cotiza con prima; los de bricolaje y muebles (Kingfisher, Wickes, DFS), con descuento por su ciclo. La mediana da 7,75 GBP (−3,1 %): el mercado paga a Dunelm como a un minorista medio, no como al líder de su categoría. Pesan un 25 %.`,
};

const transacciones = {
  comentario: `Cinco operaciones con múltiplo, de 4,6 a 9,3 veces el EBITDA: Fnac Darty, Ceconomy, Unieuro, Dreams y Mattress Firm [D16-D21]. Su mediana da 7,04 GBP, por debajo del precio: en distribución especializada, los compradores pagan poco más que la bolsa. Con la familia Adderley en el 37,1 % y un acuerdo de relación, una opa solo sería posible con su apoyo [C1]. Pesan un 5 %.`,
};

const sentimiento = {
  lectura: `El poco debate que se puede leer es negativo: la acción cayó un 10,5 % el día de los resultados de FY2026 por el arranque flojo de FY2027 y el plan a tres años, que el mercado ve como gasto que resta caja a los dividendos [1]. Coincide con el precio, que ya descuenta casi nada de crecimiento (0,8 % anual), así que el pesimismo es la tesis: si la actualización del 1T del 15-oct confirma que el calor fue puntual, el sentimiento puede girar. Los foros de particulares no se pudieron leer.`,
};

export const secciones = { multiplos_historicos, comparables, transacciones, sentimiento };

export const dcf_justificacion = {
  crecimiento: `FY2027e +3,5 %: el consenso da 1.894 M (+3,8 %) con un arranque flojo por el calor y una semana más (53) [D3, A1]. Luego +4 % dos años con el plan (más tiendas y web) y bajada al 2,5 % en FY2033e. Las ventas crecieron un 3,1-4,1 % en FY2023-FY2026 y el mercado británico de hogar, un 2,0 % anual de 2019 a 2025 [A1, B6]: el caso base supone que Dunelm sigue ganando algo de cuota.`,
  margenes: `Margen EBITDA del 16,5 % en FY2027e, con las partidas del plan (30-40 M) dentro, y vuelta al 17,5 % en FY2029e con los ahorros de c. 100 M (la mitad reinvertidos), algo por encima del 17,2 % de FY2023-FY2026 y por debajo del 18,5-18,8 % de FY2020-FY2022 [A1, A3]. El margen bruto se ha movido entre el 50,1 % y el 52,5 % sin subidas de precio [B1].`,
  inversion: `Capex del 8,0 % de las ventas en FY2027e que baja al 5,0 %: el de caja (guía de 60-70 M más los 125 M adicionales del plan en tres años) y las altas de derechos de uso de las tiendas (NIIF 16: 82,4 M en FY2026, 32-50 M en FY2023-FY2025), para no contar las tiendas sin pagar su alquiler [A1, A3]. Amortización del 5,0 %, con la de los derechos de uso. Circulante del 7,0 % de las ventas.`,
  wacc: `Tasa libre del 5,39 %, el gilt a 10 años del Banco de Inglaterra del 7-oct-2026 [D22]. Beta de 1,11, la ajustada mensual a 5 años frente al FTSE 250 [D2]. Prima de mercado del 5,5 %, coste de la deuda del 6,0 % y un 19 % de deuda a valor de mercado, con los arrendamientos. WACC del 10,17 %; con la prima implícita del mercado (4,20 %), el 9,00 % [D5].`,
  terminal: `Crecimiento a perpetuidad del 2,5 %: algo menos que la inflación británica esperada, porque el gasto real en muebles sigue por debajo de 2019 [B6]. El múltiplo implícito es de 7,0 veces el EBITDA, por encima de los 6,3 de hoy y por debajo de su media de 9,0.`,
};

export const etapa2_justificacion = `No se usa: con un mercado que crece al 2 % y una cuota del 7,9 % que ya apenas sube, no hay base para alargar el crecimiento.`;

export const dcf_lectura = `El DCF da 9,38 GBP por acción, un 17,3 % por encima del precio, con un 65 % del valor en el terminal. **El precio descuenta un Dunelm que deja de crecer.** El DCF inverso dice que, con nuestros márgenes, los 7,995 GBP de hoy suponen un crecimiento de las ventas del 0,8 % anual de FY2027e a FY2033e, frente al 3,4 % de nuestro caso base; o, con nuestro crecimiento, un margen EBITDA del 16,1 % en vez del 17,5 %. Comprar a este precio rinde un 11,2 % anual si se cumple el caso base, un punto por encima del WACC. No es una ganga: el precio está justificado si el plan no consigue nada; el valor aparece si las ventas crecen como en FY2023-FY2026 y los ahorros vuelven a mover el beneficio, algo que no ocurre desde FY2022.`;

export const narrativas = {
  Bajista: `El consumo británico sigue flojo y la competencia de precio (B&M, IKEA, Temu) quita cuota: ventas casi planas, margen EBITDA del 15,5 % y crecimiento a perpetuidad del 1,5 %.`,
  Base: `El plan da algo de crecimiento (3-4 % al año) y devuelve el margen al 17,5 % en FY2029 con los ahorros: crecimiento medio del 3,4 %.`,
  Alcista: `El plan funciona: c. 100 M de ahorros, más tiendas y web, y la cuota sube hacia el 9-10 %: crecimiento medio del 4,9 % y margen del 19 %.`,
};

export const escenarios_comentario = `La asimetría es correcta, sin más: el alcista vale 11,86 GBP (+48,3 %) y el bajista 5,51 (−31,1 %), 1,55 veces. El bajista es verosímil: es prolongar los cuatro años de beneficio plano con algo menos de margen. Con la prima de riesgo que hoy pide el mercado (4,20 %), el alcista sube a 14,44 GBP y el bajista a 6,70. El valor ponderado por probabilidad es de 9,03 GBP.`;

export const valoracion_comentario = `Pesos: DCF 50 %, comparables 25 %, escenarios 20 %, transacciones 5 % y suma de partes 0 %. El DCF manda porque el negocio es estable y convierte en caja el 99 % de su beneficio; los comparables pesan un 25 % porque hay un buen grupo de minoristas británicos con NIIF 16. Las transacciones (7,04 GBP) pesan poco porque una opa necesitaría a la familia. La dispersión es moderada: de 7,04 GBP (transacciones) a 9,38 GBP (DCF), con el precio en medio. El valor objetivo es de 8,79 GBP; con el dividendo ordinario (5,7 %), la rentabilidad total esperada es del 15,6 %.`;

export const sostenibilidad = {
  puente_ingresos: [
    { periodo: 'FY2027e', volumen_pct: 2.0, precio_pct: 0.5, otros_pct: 1.0, comentario: 'Arranque flojo por el calor; semana 53 (≈ +1,5 %, estimación propia) menos efecto del clima; precios estables como en FY2024-FY2026 [A1, B1].' },
    { periodo: 'FY2028e', volumen_pct: 3.0, precio_pct: 1.0, otros_pct: 0.0, comentario: 'Plan «Winning Hearts & Homes»: más tiendas y web (42 % de las ventas) [A3].' },
    { periodo: 'FY2029e', volumen_pct: 3.0, precio_pct: 1.0, otros_pct: 0.0, comentario: 'Cuota al alza como en FY2023-FY2026 (de 7,2 % a 7,9 %) [B1].' },
  ],
  mercado_final: null,
  veredicto: 'Sí',
  justificacion: `Sí para nuestro caso base, que es modesto: un 3,4 % anual, por debajo del 4-5 % de FY2023-FY2026, en un mercado que crece al 2 % y en el que Dunelm ha ganado cuota todos los años (de 5 % en FY2019 a 7,9 % en FY2026) [B1]. Lo financia con holgura: la reinversión prevista al ROIC actual (33,8 %) da para crecer un 5,5 % al año, y supone que el capital nuevo rinde un 22 %, por debajo del 30 % histórico. El límite no es la calidad sino el mercado: el gasto real en muebles está un 8 % por debajo de 2019 [B6] y el foso es estrecho, de escala y marca, sin poder de precios (no sube precios).`,
};

export const catalizadores = {
  items: [
    { fecha: '15-oct-2026', evento: 'Actualización del 1T FY2027', efecto: 'Dirá si el arranque flojo por el calor fue puntual', probabilidad: 'Alta', sentido: '+/−' },
    { fecha: '10-nov-2026', evento: 'Junta: nueva política de remuneración (LTIP hasta el 275 % del sueldo)', efecto: 'Voto de la familia decisivo; poco efecto en el valor', probabilidad: 'Alta', sentido: '+/−' },
    { fecha: '17-nov-2026', evento: 'Dividendo final de 28,5 p (ex el 22-oct)', efecto: 'Rentabilidad por dividendo ordinario del 5,7 %', probabilidad: 'Alta', sentido: '+' },
    { fecha: 'Febrero de 2027', evento: 'Resultados del 1S FY2027', efecto: 'Primeros ahorros del plan y margen bruto', probabilidad: 'Alta', sentido: '+/−' },
    { fecha: 'FY2027-FY2029', evento: 'Plan «Winning Hearts & Homes»: c. 100 M de ahorros y 125 M de capex adicional', efecto: 'Si funciona, el beneficio vuelve a crecer tras cuatro años plano', probabilidad: 'Media', sentido: '+' },
    { fecha: 'Continuo', evento: 'Ventas de la familia Adderley (37,1 %)', efecto: 'Presión sobre el precio, como en sept-2024', probabilidad: 'Baja', sentido: '−' },
  ],
  confianza: 'Media',
};

export const riesgos = {
  items: [
    { riesgo: 'Consumo británico débil y gasto en hogar por debajo de 2019', tipo: 'Mercado', probabilidad: 'Media', impacto: 'Alto', efecto_valor: 'Bajista: 5,51 GBP, −41 % sobre el valor base', mitigante: 'Cuota al alza y precios estables', senal: 'Ventas comparables negativas en el 1S FY2027' },
    { riesgo: 'Costes salariales que se comen el crecimiento (beneficio plano desde FY2022)', tipo: 'Operativo', probabilidad: 'Alta', impacto: 'Medio', efecto_valor: 'Un punto menos de margen: el DCF baja a 8,40 GBP (−10 %)', mitigante: 'Ahorros de c. 100 M del plan', senal: 'BAI ajustado de FY2027 por debajo de 211 M' },
    { riesgo: 'Competencia de precio (B&M, IKEA, Temu, Amazon)', tipo: 'Competencia', probabilidad: 'Media', impacto: 'Medio', efecto_valor: 'Parte del bajista', mitigante: 'Escala, marca propia y web (42 % de las ventas)', senal: 'Margen bruto por debajo del 51 %' },
    { riesgo: 'Ejecución del plan de nueva consejera delegada (desde oct-2025)', tipo: 'Gobierno', probabilidad: 'Media', impacto: 'Medio', efecto_valor: 'Gasta caja que hoy va a dividendos especiales', mitigante: 'Objetivos públicos (margen c. 11 %, ROCE c. 30 %)', senal: 'Nuevo recorte del dividendo especial' },
    { riesgo: 'Accionista de control (familia Adderley, 37,1 %)', tipo: 'Gobierno', probabilidad: 'Baja', impacto: 'Bajo', efecto_valor: 'Ventas en bloque como la de sept-2024 a 11,40 GBP', mitigante: 'Acuerdo de relación desde 2006', senal: 'Avisos de venta de la familia' },
    { riesgo: 'Tipos: gilt a 10 años en el 5,39 %', tipo: 'Valoración', probabilidad: 'Media', impacto: 'Medio', efecto_valor: 'WACC del 11,2 %: el DCF baja a 8,04 GBP', mitigante: 'Deuda neta de 1,2 veces el EBITDA, casi toda arrendamientos', senal: 'Gilt por encima del 5,75 %' },
  ],
  premortem: `Octubre de 2029: la acción ha caído un 40 %, a unos 4,80 GBP. La historia más probable: el consumo británico sigue sin despegar en 2027-2028 y los salarios mínimos suben otra vez por encima de la inflación. El plan de la nueva consejera delegada gasta 125 M más en tiendas y web, pero los ahorros se van en costes y el beneficio antes de impuestos baja de 211 M a 190 M. El dividendo especial desaparece y los inversores de rentas, que sostienen la acción, se van; la familia aprovecha para vender otro bloque. El múltiplo baja a 5 veces el EBITDA, como DFS o Wickes. El indicador que lo habría anticipado: cuatro años de beneficio plano y una cuota que ya no subía.`,
  confianza: 'Media',
};

export const preguntas = {
  items: [
    { tema: 'Plan', pregunta: '¿Qué parte de los c. 100 M de ahorros llegará al beneficio y cuánto se reinvierte?', por_que: 'El beneficio lleva cuatro años plano en 211 M.' },
    { tema: 'Arranque de FY2027', pregunta: '¿Cuánto cayeron las ventas comparables en julio-agosto y cómo fue septiembre?', por_que: 'El precio cayó un 10,5 % por ese aviso.' },
    { tema: 'Capital', pregunta: '¿Se mantendrán los dividendos especiales con 125 M de capex adicional?', por_que: 'El especial ya bajó de 35 a 25 p.' },
    { tema: 'Cuota', pregunta: '¿Por qué la cuota solo subió 10 puntos básicos en FY2026 y qué categorías la perdieron?', por_que: 'Es la base del crecimiento del caso base.' },
    { tema: 'Familia', pregunta: '¿Tiene la familia Adderley intención de seguir reduciendo su participación?', por_que: 'La colocación de 2024 presionó el precio.' },
  ],
  confianza: 'Media',
};

export const fuentes = [];
export const huecos = [];
