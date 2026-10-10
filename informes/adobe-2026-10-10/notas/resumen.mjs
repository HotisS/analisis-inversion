// Resumen ejecutivo (Adobe, corte 2026-10-10). Se escribe el último; cifras del motor tal cual.

const sintesis = `**La recomendación y por qué.** Comprar, con convicción media. El valor objetivo es de 306,45 USD, un 26,5 % por encima del precio de 242,27 USD, y esa es la rentabilidad total esperada a 12 meses (no paga dividendo). El alcista gana un 38,3 % y el bajista pierde un 30,2 %: asimetría de 1,27 veces. Las dos reglas dan Comprar; con la prima de riesgo que hoy pide el mercado, el objetivo sube a 361,21 USD (+49,1 %). La razón en una frase: el precio descuenta que Adobe crece un 2 % al año cuando crece un 12 % y sube la guía. La convicción es media, la que sugieren los criterios, porque el bajista pierde más de un 25 %: subiría si el ARR de FY2027 crece por encima del 9 % sin compras y bajaría si Adobe recorta precios de Creative Cloud.

**El negocio.** Adobe es el estándar del software creativo y de documentos (Photoshop, Premiere, Acrobat): 23.769 M de ingresos en FY2025, casi todo por suscripción, con un margen EBIT del 36,6 % y un ROIC del 61,6 %, cinco veces su WACC [A1]. Su calidad sostiene nuestro caso base (5,9 % anual, la mitad de lo que crece hoy) sin necesitar capital: subió Creative Cloud un 16,7 % en 2025 y el ARR siguió creciendo un 11 % [B5, A6].

**Finanzas.** Los ingresos crecieron al 16,8 % anual en la década y el BPA al 24,5 %. Convierte en caja el 137 % del beneficio: 10.592 M de flujo libre en los últimos 12 meses, un 11,2 % de la capitalización [A1]. Recompró 45.706 M de acciones en diez años; en FY2024-FY2025 más que su flujo libre, con deuda, aunque la deuda neta sigue en 0,1 veces el EBITDA [A1].

**Equipo y gobierno.** Restan. En 2026 se fueron el director financiero y el responsable del negocio creativo, y el consejero delegado será desde el 1 de diciembre Anil Chakravarthy, que no esperaba el mercado [C5, C8]. La remuneración tuvo un 49,23 % de votos en contra en la junta de 2026 y Narayen vendió 49,6 M en acciones tras anunciar su relevo [C2, C12].

**Valoración.** El DCF da 295,24 USD (+21,9 %) con un WACC alto (11,6 %, beta de 1,26). El DCF inverso dice que el precio supone un crecimiento del 2,0 % anual en FY2027-FY2033, o un margen EBITDA del 33,6 % en vez del 40,5 %: comprar hoy rinde un 13,5 % anual con nuestro caso base. Cotiza a 9,4 veces el EBITDA y 13,5 veces el beneficio, los mínimos de su década (medias de 36,6 y 46,5 veces), y a la mitad del múltiplo del software. Comparables y transacciones darían el doble, pero no los usamos: el mercado no aplica a Adobe un riesgo que los demás no tienen. Discrepamos del mercado en la probabilidad de ese riesgo.

**Riesgos y catalizadores.** El mayor riesgo es que la IA generativa convierta la edición creativa en algo gratuito (el bajista: 169,00 USD, −30,2 %) y obligue a Adobe a bajar precios, como sugiere el aplazamiento de las subidas en 2026 [A16]. Los comentarios de gestores son más negativos que los números: el pesimismo es la tesis. Catalizadores: llegada de Chakravarthy el 1-dic-2026 y resultados del 4T26 con la guía de FY2027 a mediados de diciembre.

**Qué cambiaría la decisión.** Seguiría siendo Comprar por debajo de 291,74 USD y pasaría a Vender por encima de 361,30 USD. Bajaríamos a Mantener si el ARR crece menos del 8 % sin compras, si Adobe rebaja precios de Creative Cloud o si la guía de FY2027 apunta a menos del 6 % de crecimiento.`;

export const resumen = {
  recomendacion: 'Comprar',
  conviccion: 'Media',
  justificacion_recomendacion: null,
  horizonte: '12 meses',
  sintesis,
  tesis: `Adobe es el estándar del trabajo creativo y de documentos: Creative Cloud, Acrobat y Experience Cloud facturaron 23.769 M en FY2025 con un margen EBIT del 36,6 % y un ROIC del 61,6 %, y el ARR crece un 11,2 % [A1, A6]. Genera un flujo libre de 10.592 M al año, un 11,2 % de su capitalización.

El precio de 242,27 USD, un 33 % por debajo del máximo de 52 semanas, descuenta que la IA generativa le quita el poder de precios: un crecimiento del 2,0 % anual hasta FY2033. Cotiza a 9,4 veces el EBITDA, el mínimo de su década y la mitad que el software comparable [D6, D10-D23].

El mercado acierta en que el riesgo es real: Canva regala software, Google y OpenAI generan imagen y vídeo, y Adobe aplazó sus subidas de precio en 2026 [B7, B23, A16]. Se equivoca en la velocidad: los ingresos crecen un 12 %, la guía de FY2026 subió en septiembre y los usuarios superan los 1.000 millones al mes [A7, C23]. Para invertir hay que creer que Adobe seguirá cobrando por el flujo de trabajo profesional aunque crear una imagen sea gratis.`,
  vision_diferencial: {
    mercado_descuenta: `Que Adobe es la próxima víctima de la IA generativa: la creación de contenidos se vuelve gratuita, Creative Cloud pierde usuarios de pago frente a Canva y los generadores de Google y OpenAI, y los ingresos se estancan.`,
    nuestra_vision: `El crecimiento se frenará a la mitad (5,9 % anual de media), pero Adobe conserva el flujo de trabajo profesional, los formatos estándar y los clientes empresariales, y cobra la IA dentro de sus planes: el ARR de productos de IA crece más de un 150 % [A7].`,
    por_que: `Porque los datos que mostrarían la sustitución no aparecen todavía: el ARR crece un 11,2 %, la guía sube y la empresa subió precios un 16,7 % en 2025 sin perder crecimiento [A6, B5]. A este precio no hace falta tener razón del todo: con un crecimiento del 4 % anual el valor ya supera el precio.`,
  },
  a_favor: [
    '**Precio de crisis**: 9,4 veces el EBITDA y 13,5 veces el beneficio, mínimos de la década.',
    '**Caja**: 10.592 M de flujo libre, un 11,2 % de la capitalización [A1].',
    '**Crecimiento intacto**: ingresos +12 % en FY2026 y ARR +11,2 % [A6, A7].',
    '**Rentabilidad**: ROIC del 61,6 % y margen EBIT del 36,6 % [A1].',
    '**Recompras**: 24.550 M pendientes hasta 2030, un 26 % del capital al precio de hoy.',
  ],
  en_contra: [
    '**Riesgo de sustitución por la IA**: Canva gratis y generadores de Google y OpenAI [B7, B23].',
    '**Poder de precios en duda**: subidas de Creative Cloud aplazadas en 2026 [A16].',
    '**Cúpula en transición**: consejero delegado nuevo, director financiero interino [C5, C8].',
    '**Gobierno**: 49,23 % de votos en contra de la remuneración en 2026 [C2].',
    '**RPO al +8 %**, por debajo del ARR [A16].',
  ],
  que_vigilar: `La tesis depende del ARR: hoy crece un 11,2 % con Semrush; tiene que seguir por encima del 8 % sin compras para que el precio sea un error. La señal de que no ocurre sería una guía de FY2027 por debajo del 6 % de crecimiento o una rebaja de precios de Creative Cloud: confirmaría el escenario que el mercado ya descuenta.`,
  cambiaria_recomendacion: [
    'Si el precio supera 361,30 USD, pasaríamos a Vender.',
    'Si el ARR crece menos del 8 % sin compras en el 4T26 o el 1T27, pasaríamos a Mantener.',
    'Si Adobe rebaja los precios de Creative Cloud, revisaríamos el caso base hacia el bajista.',
    'Si la guía de FY2027 apunta a menos del 6 % de crecimiento, pasaríamos a Mantener.',
    'Si el ARR de FY2027 crece por encima del 9 % sin compras, subiríamos la convicción.',
  ],
  kpis_seguimiento: [
    { kpi: 'ARR total', nivel_actual: '27,50 mil M (+11,2 %, con Semrush)', umbral_alerta: '< 8 % sin compras', por_que: 'Mide si la IA erosiona la base de suscripción.' },
    { kpi: 'Precio de Creative Cloud Pro', nivel_actual: '69,99 USD/mes', umbral_alerta: 'Rebaja o planes con IA más baratos', por_que: 'El poder de precios es lo que el mercado da por perdido.' },
    { kpi: 'RPO', nivel_actual: '+8 % (3T26)', umbral_alerta: '< 5 %', por_que: 'Adelanta el crecimiento de los contratos.' },
    { kpi: 'Flujo libre', nivel_actual: '10.592 M (12 meses)', umbral_alerta: 'Caída interanual', por_que: 'Paga las recompras.' },
    { kpi: 'Margen operativo no GAAP', nivel_actual: '≈45 % (guía FY2026)', umbral_alerta: '< 42 %', por_que: 'El coste de la IA puede comerse el margen.' },
  ],
  confianza: 'Media',
};
