// Riesgos, preguntas y narrativas de los escenarios. Los efectos en valor salen de los escenarios y sensibilidades del motor.
export const riesgos = {
  items: [
    { riesgo: 'Precio neto en EE. UU. más bajo de lo previsto en 2027-2028', tipo: 'Regulatorio y comercial', probabilidad: 'Alta', impacto: 'Alto',
      efecto_valor: '−12 % (un punto menos de crecimiento y dos de margen cada año)', mitigante: 'La rebaja del precio de lista a 675 USD reduce sobre todo descuentos ya concedidos; el volumen sube con Medicare Bridge y el autopago [P6]',
      senal: 'Precio realizado en EE. UU. en los resultados de 2027 y guía de 2027 del 3-feb-2027' },
    { riesgo: 'Más cuota para Eli Lilly (tirzepatida inyectable y orforglipron oral)', tipo: 'Competencia', probabilidad: 'Alta', impacto: 'Alto',
      efecto_valor: '−12 % (dos puntos menos de crecimiento cada año)', mitigante: 'La franquicia Wegovy sigue siendo líder en nuevos pacientes de los fármacos de obesidad de marca en EE. UU. y CagriSema llega en 2027 [P5, P6]',
      senal: 'Recetas semanales (IQVIA) de Wegovy oral frente a orforglipron y cuota de nuevos pacientes' },
    { riesgo: 'Pérdida de exclusividad de la semaglutida en EE. UU. y Europa (2031-2033) sin relevo suficiente', tipo: 'Patentes', probabilidad: 'Media', impacto: 'Alto',
      efecto_valor: '−41 % (escenario bajista frente al DCF base)', mitigante: 'Ambición de más de 150.000 M DKK de ventas de la cartera nueva en 2035, ajustadas por riesgo [P2]',
      senal: 'Litigios de patentes (ANDA de Cipla) y resultados de fase 3 de CagriSema, cagrilintida y zenagamtida' },
    { riesgo: 'Fracasos de la cartera de I+D', tipo: 'I+D', probabilidad: 'Media', impacto: 'Medio',
      efecto_valor: '−9 % (un punto menos de crecimiento y uno de margen)', mitigante: 'Cartera amplia: más de cinco programas de fase 3 en obesidad y diabetes y otros tantos fuera [P2]',
      senal: 'ARTEMIS y HERMES (1S 2027) tras el fracaso de ZEUS; REDEFINE 11 (1T 2027)' },
    { riesgo: 'Exceso de capacidad productiva y deterioros', tipo: 'Operativo', probabilidad: 'Media', impacto: 'Medio',
      efecto_valor: '−3 % (un punto menos de margen)', mitigante: 'El capex baja desde el máximo de 60.000 M DKK de 2025 y ya hay costes de reajuste de contratos de capacidad (~3.000 M DKK en el 2T26) [P3, P6]',
      senal: 'Capex anual y nuevos deterioros de inmovilizado' },
    { riesgo: 'Genéricos en China, Canadá, Brasil e India desde 2026', tipo: 'Patentes', probabilidad: 'Alta', impacto: 'Medio',
      efecto_valor: 'Incluido en el caso base', mitigante: 'Volumen de obesidad en Internacional (+40 % en el 1S26 a tipo constante) [P6]',
      senal: 'Ventas de la región China y de Mercados Emergentes' },
    { riesgo: 'Gobierno: la Fundación decide sola', tipo: 'Gobierno', probabilidad: 'Media', impacto: 'Medio',
      efecto_valor: 'Sin efecto directo en el valor; sube la prima de riesgo exigible', mitigante: 'Interés de la Fundación alineado con el valor a largo plazo (vive de los dividendos)',
      senal: 'Operaciones vinculadas con Novo Holdings y salidas de independientes' },
  ],
};
export const preguntas = {
  items: [
    { tema: 'Precio neto en EE. UU.', pregunta: '¿Cuánto baja el precio neto medio por receta de la semaglutida en 2027 con la lista a 675 USD, el precio de Medicare y los acuerdos MFN?', por_que: 'Es la variable que más mueve 2027-2028 y la empresa solo dice que afectará a la caja [P6]' },
    { tema: 'Cartera frente a la pérdida de exclusividad', pregunta: '¿Qué parte de los más de 150.000 M DKK de ventas de la cartera en 2035 depende de productos con datos de fase 3 ya publicados?', por_que: 'Sin rNPV, el valor terminal descansa en esa cifra [P2]' },
    { tema: 'Capacidad productiva', pregunta: '¿Cuánta de la capacidad construida en 2023-2026 (unos 190.000 M DKK de capex en 2023-2026, con los 55.000 M previstos para este año) se usará en 2030?', por_que: 'Si sobra, vendrán deterioros y la amortización frenará el margen' },
    { tema: 'Patentes en EE. UU.', pregunta: '¿Hasta cuándo protegen las patentes de formulación y dispositivo a Ozempic y Wegovy frente al ANDA de Cipla?', por_que: 'Un adelanto de dos años de la entrada de genéricos en EE. UU. cambia el valor más que cualquier supuesto de margen' },
    { tema: 'Cuota frente a Lilly', pregunta: '¿Qué cuota de nuevos pacientes necesita la Wegovy oral para que las ventas de obesidad en EE. UU. crezcan en 2027?', por_que: 'El mercado descuenta que la oral de Lilly se impondrá' },
    { tema: 'Asignación de capital', pregunta: '¿Qué umbral de rentabilidad exige el consejo a las compras de cartera tras Akero y los deterioros de monlunabant?', por_que: 'Las compras de I+D sustituyen a la recompra y su historial reciente es de deterioros' },
  ],
  confianza: "Media",
};
export const narrativas = {
  Bajista: 'La orforglipron y la tirzepatida ganan la mayor parte de los pacientes nuevos, el precio neto en EE. UU. cae más de lo previsto con la nueva lista y Medicare, y CagriSema no se diferencia. Las ventas no se recuperan antes de la pérdida de exclusividad de 2031-2033, como ya le pasó a la insulina de Novo, que perdió cuota y precio a la vez.',
  Base: 'Las ventas tocan fondo en 2026-2027 y vuelven a crecer en torno al 4 % entre 2028 y 2030 con la Wegovy oral, CagriSema y enfermedades raras; el margen operativo se mantiene cerca del 40 %, el capex baja hacia el 7 % de las ventas y la pérdida de exclusividad resta un 9 % de ventas en 2032-2033.',
  Alcista: 'La Wegovy oral y CagriSema recuperan cuota frente a Lilly, el volumen de Medicare y del autopago compensa el precio y la cartera nueva cubre la pérdida de exclusividad; Novo crece al ritmo de sus pares, como promete el CMD.',
};
