// Resumen ejecutivo (Trigano, corte 2026-10-11). Se escribe el último; cifras del motor tal cual.

const sintesis = `**La recomendación y por qué.** Comprar, con convicción media. El valor objetivo es de 193,43 EUR, un 54,4 % por encima del precio de 125,30 EUR, y con el dividendo la rentabilidad total esperada a 12 meses es del 57,2 %. Asimetría de 8,4 veces (+81,2 % frente a −9,7 %). Las dos reglas dan Comprar. El precio descuenta un margen EBITDA del 8 % para siempre, por debajo del peor año de la última década, en una empresa con caja neta y un ROIC del 13,9 %. Los criterios sugieren convicción alta; la dejamos en media porque el riesgo es de calendario, no de valor: la propia empresa habla de «attentisme» de los particulares y una cíclica puede pasar dos años en múltiplos de crisis, como en 2018 y 2022 [A15, D7]. La subiríamos si los resultados del 24-nov y las ventas del 1T27 muestran ventas al público estables (1T27 por encima del +3 %); la bajaríamos si la producción del 1S27 se recorta.

**El negocio.** Trigano es el primer fabricante europeo de autocaravanas, con cerca del 31 % del mercado, y el de mayor margen: un EBITDA del 11,2 % en FY2025 frente al 5,7 % de Thor y el 4,4 % de Winnebago, y un ROIC del 13,9 % frente a un WACC del 10,0 % [B1, D12, D13]. Su ventaja es de costes y de escala, no de marca: el foso es estrecho [B1]. Su calidad sostiene **en parte** el crecimiento que proyectamos (3,1 % anual): apenas necesita capital, pero dos tercios son subidas de tarifa y el poder de precios no se ha visto desde 2024, cuando Trigano rebajó la gama para ganar cuota [B1].

**Sector y ciclo.** Las matriculaciones europeas de autocaravanas llevan seis años en torno a 160.000 unidades [B4]. El ajuste de 2024-2025 fue de existencias: Trigano recortó la producción un 25 % y su margen cayó 350 puntos básicos [A9].

**Finanzas.** Unos 500 M de tesorería neta a 31-ago-2026 tras 60 M de recompras [A15]. El circulante es el amortiguador del ciclo: absorbió caja en FY2024 (flujo libre de −39,8 M) y la devolvió en FY2025 (494,1 M).

**Equipo y gobierno.** Neutro. La familia Feuillet tiene el 57,87 % del capital y el 66,42 % de los votos y ha pasado la propiedad a las dos hijas [C2]. El directorio cumplió 4 de sus 7 guías cualitativas; falló en FY2020 (COVID) y FY2025 (existencias) [C11, C18]. El ROIC incremental del 9,8 % dice que las compras de distribución y BIO Habitat no han creado valor.

**Valoración.** El DCF da 197,79 EUR; los comparables, 204,17 (4,1 veces el EBITDA de los próximos 12 meses frente a una mediana de 7,2 veces); las transacciones, 190,23, y los escenarios ponderados, 178,26. El DCF inverso dice que el precio supone ventas cayendo un 15,5 % al año hasta FY2033e o un margen del 8,0 %: comprar hoy rinde un 15,6 % anual con nuestro caso base, frente a un WACC del 10,0 %. Nuestro EBITDA de FY2027e-FY2028e está un 9-10 % por debajo del consenso; discrepamos del mercado, no de los analistas (179,88 EUR) [D9].

**Riesgos y catalizadores.** Una recesión como la de 2009 (ventas −27 % en dos años y margen del 4 %) deja el valor en 113,18 EUR; una guerra de precios con Erwin Hymer y Knaus Tabbert resta un 11 % por punto de margen. El catalizador son los resultados del 24-nov-2026 y la junta de enero, que puede amortizar la autocartera. Los foros muestran apatía, sin riesgos nuevos [E4, E6].

**Qué cambiaría la decisión.** Comprar por debajo de 187,63 EUR y vender por encima de 224,77. Pasaríamos a Mantener si el margen operativo de FY2027 baja del 8 % o si las matriculaciones europeas caen más de un 10 % dos trimestres seguidos.`;

export const resumen = {
  recomendacion: 'Comprar',
  conviccion: 'Media',
  justificacion_recomendacion: null,
  horizonte: '12 meses',
  sintesis,
  tesis: `Trigano es el primer fabricante europeo de autocaravanas: 3.800 M de ventas en FY2026, cerca del 31 % de las matriculaciones europeas y el mayor margen del sector (EBITDA del 11,2 % en FY2025, frente al 5,7 % de Thor y el −1,3 % de margen EBIT de Knaus Tabbert) [A15, B1, B11, D12]. Ha creado valor en todo el ciclo, con un ROIC que nunca bajó del 13,9 %, y llega al ciclo bajista con unos 500 M de caja neta [A15].

El precio, 125,30 EUR, es 4,1 veces el EBITDA de los próximos 12 meses y 7,9 veces el beneficio, frente a 7,2 y 12,7 veces de sus comparables y a una media histórica de 6,7 veces. El DCF inverso dice que el mercado descuenta un margen EBITDA del 8 % para siempre, o ventas cayendo un 15,5 % al año durante siete años.

El mercado acierta en la dirección: las ventas a particulares se han frenado y la empresa planifica una producción estable en el 1S27 [A15]. Se equivoca en la magnitud: incluso una recesión como la de 2009 deja el valor en 113,18 EUR, un 9,7 % por debajo del precio, porque el circulante devuelve caja en las caídas. Para invertir hay que creer que el margen de ciclo medio de Trigano es del 11-12 %, como en FY2017-FY2025, y tener paciencia de dos o tres temporadas.`,
  vision_diferencial: {
    mercado_descuenta: 'Que el margen de FY2021-FY2024 (12,7-14,7 %) fue un accidente de la escasez de chasis y que el de ciclo medio será del 8 % de EBITDA, por debajo del 9,8 % de FY2020, con las fábricas cerradas por la COVID; o ventas cayendo un 15,5 % anual hasta 2033.',
    nuestra_vision: 'El margen de ciclo medio es del 11,5 %, por debajo de la media de FY2017-FY2025 (12,0 %) y del consenso (12,2-12,5 %), y las ventas crecen con la inflación. El año 2027 será flojo, pero no una crisis permanente.',
    por_que: 'Trigano mantuvo un margen operativo del 8,3 % en FY2020 con las fábricas cerradas y del 9,2 % en FY2025 con la producción recortada un 25 % [A4, A9]. Su escala de compras y la red propia le dan costes más bajos que los de Erwin Hymer y Knaus Tabbert, que ganan entre el −1 % y el 2 %, y la caja neta le permite aguantar una guerra de precios mejor que nadie [B11, B14].',
  },
  a_favor: [
    '**Muy barata**: 4,1 veces el EBITDA de los próximos 12 meses frente a una mediana de 7,2 veces de sus comparables.',
    '**El precio descuenta una crisis permanente**: un margen EBITDA del 8,0 % frente al 11,5 % de nuestro caso base.',
    '**Caja neta**: unos 500 M a 31-ago-2026, el 21 % de la capitalización [A15].',
    '**El mejor del sector**: margen EBITDA del 11,2 % frente al 5,7 % de Thor y ROIC del 13,9 % [D12, D21].',
    '**Asimetría**: el alcista gana un 81,2 % y el bajista pierde un 9,7 %.',
    '**Recompras**: 60 M en FY2026 con la acción en mínimos y la junta autorizó amortizar acciones [A15, C10].',
  ],
  en_contra: [
    '**Demanda frenada**: «attentisme» de los particulares y producción estable en el 1S27 [A15].',
    '**Sin poder de precios reciente**: ingreso por autocaravana plano (56.300 EUR) tras rebajar la gama 2025 [B1].',
    '**ROIC a la baja**: del 23,9 % en FY2024 al 13,9 % en FY2025, con un ROIC incremental del 9,8 %.',
    '**Compras que no rinden**: BIO Habitat ganó 0,8 M de resultado operativo en FY2025 [A9].',
    '**Control familiar**: el 66,42 % de los votos y un presidente del consejo de 77 años [C2].',
  ],
  que_vigilar: `La tesis depende de que las ventas a particulares no caigan más de lo que la empresa ya anticipa (producción estable en el 1S27) y de que el margen operativo se mantenga cerca del 9-10 %. La señal de que no se cumple sería un recorte de la producción o unas ventas del 1T27 o 2T27 por debajo del −5 %, o matriculaciones europeas de autocaravanas cayendo más de un 10 % durante dos trimestres.`,
  cambiaria_recomendacion: [
    'Si el margen operativo corriente de FY2027 baja del 8 %, pasaríamos a Mantener.',
    'Si las matriculaciones europeas de autocaravanas caen más de un 10 % durante dos trimestres seguidos, revisaríamos el caso base hacia el bajista.',
    'Si la familia destina más de 300 M de la caja a compras fuera de las autocaravanas, bajaríamos la convicción.',
    'Si el precio supera 224,77 EUR, pasaríamos a Vender; por debajo de 187,63 EUR seguimos en Comprar.',
  ],
  kpis_seguimiento: [
    { kpi: 'Margen operativo corriente', nivel_actual: '≈ 10 % (FY2026, anticipo)', umbral_alerta: '< 8 %', por_que: 'El precio descuenta un margen EBITDA del 8 % (≈ 6 % operativo).' },
    { kpi: 'Crecimiento de ventas trimestrales', nivel_actual: '+2,1 % (4T26)', umbral_alerta: '< −5 % dos trimestres', por_que: 'Marca la entrada en el escenario bajista.' },
    { kpi: 'Matriculaciones europeas de autocaravanas', nivel_actual: '159.824 (temporada 2025/26, plana)', umbral_alerta: 'Caída > 10 %', por_que: 'Es la demanda final, por delante de los pedidos de la red.' },
    { kpi: 'Existencias sobre ventas', nivel_actual: '24,6 % (ago-25); 27,9 % (feb-26, estacional)', umbral_alerta: '> 27 % al cierre de agosto', por_que: 'En FY2024 el sobrestock precedió a la caída del margen.' },
    { kpi: 'Tesorería neta sin NIIF 16', nivel_actual: '≈ 500 M (ago-26)', umbral_alerta: '< 300 M sin recompras', por_que: 'Es el colchón que limita el bajista.' },
  ],
  confianza: 'Media',
};
