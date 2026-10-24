// Textos del analista (Regeneron, corte 2026-10-24). Citas con la letra de la nota ([A3] = fuente 3 de A.json).
export default {
  limitaciones: 'Cifras en millones de USD, ejercicio natural, US GAAP. Último trimestre publicado: 2T26 (30-jun-2026); el 3T26 se publica el 30-oct-2026 antes de la apertura [D6]. El BPA de la valoración es el AJUSTADO (no GAAP) que publica la empresa, porque el GAAP lo mueven las ganancias y pérdidas de valor de su cartera de acciones; la diferencia se explica en financieros.ajustes. Regeneron no da guía de ventas ni de beneficio, solo de gastos [A3]. El tamaño del mercado de cada fármaco viene de resúmenes públicos de casas de estudios (GMI, Straits), de calidad media [B1-B3]. El cobro inicial de 1.000 M USD de Sanofi (sexta enmienda, octubre de 2026) va al puente y no al BPA [A12].',
  controles_explicados: [
    { control: 'Capitalización calculada ≈ publicada', explicacion: 'La publicada (82.881 M USD) usa las acciones ordinarias en circulación sin la dilución; la calculada (86.942 M) usa 108,0 M de acciones diluidas del BPA ajustado del 2T26 (101,14 M ordinarias + 1,82 M de clase A + opciones y acciones restringidas) [A2, D5]. Se usa la diluida en toda la valoración.' },
    { control: 'Tipo impositivo efectivo razonable (2023)', explicacion: '5,9 % en 2023: deducciones fiscales por el ejercicio de opciones de empleados, el crédito de I+D y la parte de beneficios en Irlanda (12,5 %) [A1, A8]. No se proyecta: el DCF usa un 15-16 %, con el mínimo global del 15 %.' },
    { control: 'Tipo impositivo efectivo razonable (2024)', explicacion: '7,7 % en 2024, por las mismas causas (opciones ejercidas, crédito de I+D, Irlanda) [A1, A13]. El DCF usa un 15-16 %.' },
    { control: 'Veredicto de sostenibilidad del analista coherente con las pruebas del motor', explicacion: 'El motor compara con 2021, el año del anticuerpo de la COVID (16.072 M de ingresos y 7.747 M de NOPAT), que cayó a cero en 2022: por eso el crecimiento histórico sale en −2,8 % y el ROIC incremental en −82 %. Sin la COVID, los ingresos crecieron un 5,6 % anual de 2022 a 2025 (12.173 → 14.343 M) [A5, A9], lo mismo que el 5,4 % proyectado. La subida del margen de 2026-2027 no pide capital: es la parte de Dupixent que Sanofi ya no descuenta desde el 3T26 (deuda de desarrollo pagada) [A3]. Ver sostenibilidad.justificacion.' },
    { control: 'Rendimiento del capital nuevo de la proyección ≤ 1,25 × el histórico', explicacion: 'Mismo motivo: el histórico (−82 %) lo hunde la COVID de 2021. El 31 % que supone la proyección viene de que el margen sube por el fin de la deuda de desarrollo con Sanofi, no de inversión nueva; con el ROIC de 2022-2025 (27-42 %) el supuesto es razonable [A3].' },
  ],
  huecos: [],
  parches: [],
  huecos_resueltos: [],
  secciones: {
    rentabilidad: {
      comentario: 'Regeneron crea valor, pero cada vez menos. El ROIC pasó del 86,7 % de 2021 (año de la COVID) al 42,4 % de 2022 y al 21,1 % de 2025, frente a un WACC del 10,0 %: sigue 11 puntos por encima, pero la tendencia es mala. Bajan las dos cosas: el NOPAT (de 4.231 M en 2022 a 3.081 M en 2025, porque la I+D subió de 3.593 a 5.850 M y EYLEA cae) y la rotación (el capital invertido sube de 9.984 a 14.621 M por las cuentas a cobrar de Sanofi y Bayer y las fábricas nuevas) [A1, A5]. La caja (18.866 M) no cuenta como capital. El ROE (14,9 %) es menor que el ROIC porque la caja rinde poco. Desde 2026 debe mejorar: el 1S26 ya muestra ventas +17,8 % y, desde el 3T, la parte de Dupixent sin la deuda de desarrollo [A3, A4]. Sin compras relevantes: el fondo de comercio es cero.',
      confianza: 'Media',
    },
    capital: {
      politica: 'Prioridad declarada: invertir en la cartera propia (I+D del 41 % de los ingresos), licencias de fármacos en desarrollo y fábricas en EE. UU.; el resto vuelve al accionista con recompras y, desde 2025, un dividendo trimestral (0,88 USD en 2025, 0,94 en 2026) [A1, A2]. Recompras de 2.214,6 M en 2023, 2.613,9 M en 2024, 3.456,2 M en 2025 y 1.967,7 M en el 1S26; programa nuevo de 3.000 M aprobado en abril de 2026 [A1, A2]. Sin deuda neta: 1.986,6 M de bonos (2030 y 2050) frente a 17.822,9 M de caja e inversiones a 30-jun-2026 [A2].',
      adquisiciones: [
        { anio: '2022', objetivo: 'Checkmate Pharmaceuticals (vacuna inmunoestimulante para el cáncer)', importe: null, ev_ebitda: null, financiacion: 'Caja', resultado: 'Importe pequeño; sin ventas; se integró en la cartera de oncología [A1].' },
        { anio: '2023', objetivo: 'Decibel Therapeutics (terapia génica para la sordera)', importe: null, ev_ebitda: null, financiacion: 'Caja', resultado: 'Importe pequeño; DB-OTO en ensayos; cargo de 53,4 M en 2024 por subir el pago contingente [A1].' },
        { anio: '2024', objetivo: 'Cartera de terapia celular de 2seventy bio (derechos completos)', importe: null, ev_ebitda: null, financiacion: 'Caja', resultado: 'Preclínico y fase 1; sin ventas [A1].' },
        { anio: '2025', objetivo: 'Licencia de olatorepatide (GLP-1/GIP de Hansoh, fuera de China)', importe: 80, ev_ebitda: null, financiacion: 'Caja', resultado: 'Pago inicial de 80 M; en fase 3 en China, la entrada de Regeneron en obesidad [A2].' },
      ],
      comentario: 'Buena asignadora en lo grande (EYLEA, Dupixent y Libtayo salieron de sus laboratorios, no de compras caras) y prudente en adquisiciones: todas pequeñas, sobre todo licencias de fármacos en desarrollo. Las recompras son crecientes (10.250 M desde 2023) pero bajan poco las acciones (de 115,1 M diluidas en 2024 a 108,6 M en 2025 y 108,0 M en el 2T26), porque compensan los pagos en acciones (≈ 1.000 M al año) [A1, A2, A5]. El punto débil es la I+D: 5.850 M en 2025 con fracasos recientes (fianlimab en melanoma, mayo de 2026) [D14]. El plan de acciones a 10 años del consejero delegado y del director científico (hasta 5,6 M de acciones si la acción se multiplica) liga su premio al precio, pero diluye [C4].',
      confianza: 'Media',
    },
    bolsa: {
      contexto: {
        movimiento: { fecha: '2026-10-23', var_1m_pct: 1.1, var_3m_pct: 20.7, var_6m_pct: 7.1, var_12m_pct: 37.7, dist_max_52s_pct: -5.5, dist_min_52s_pct: 39.8, dist_max_historico_pct: -33.0, tendencia: 'alcista', volatilidad_60d_pct: 28.0, avisos: [] },
        movimientos_fuertes: [
          { periodo: '18-may-2026 (−16,6 % en el mes al 22-may)', var_pct: -16.6, causa: 'Fianlimab con Libtayo no mejora la supervivencia sin progresión en melanoma avanzado frente a Keytruda; la acción cae un 9,8 % ese día [D14, B8].', veredicto: 'no cambia', condicion: null },
          { periodo: '22-jul a 21-ago-2026', var_pct: 27.9, causa: 'Resultados del 2T26 por encima de lo esperado (ventas +16,7 %, EYLEA HD +52 %, Dupixent +38 %) y aprobación de la FDA en fibrodisplasia osificante progresiva (19-ago) [A3, D11, D12].', veredicto: 'no cambia', condicion: null },
          { periodo: '28-sep y 1-oct-2026', var_pct: -4.5, causa: 'Primeros datos en cáncer de ovario recibidos con dudas; el 1-oct, sexta enmienda con Sanofi (1.000 M de cobro inicial y hasta 7.000 M en hitos, pleito retirado) [A12, D11].', veredicto: 'no cambia', condicion: null },
        ],
        noticias: [
          { fecha: '2026-10-14', tipo: 'recomendación', hecho: 'UBS sube a Comprar con precio objetivo de 978 USD [D11].', veredicto: 'no cambia', condicion: null },
          { fecha: '2026-10-06', tipo: 'resultados', hecho: 'Cargo de I+D adquirida de 22 M en el 3T26 (−0,18 USD por acción) [A14].', veredicto: 'no cambia', condicion: null },
          { fecha: '2026-10-01', tipo: 'demanda o regulador', hecho: 'Sexta enmienda con Sanofi: cuatro anticuerpos nuevos, 1.000 M de cobro inicial, hasta 7.000 M en hitos y fin del pleito por la información de Dupixent [A12].', veredicto: 'no cambia', condicion: null },
          { fecha: '2026-09-24', tipo: 'directivos', hecho: 'Plan de acciones por objetivos a 10 años para el consejero delegado y el director científico (hasta 2,7 y 2,9 M de acciones) [C4].', veredicto: 'no cambia', condicion: null },
          { fecha: '2026-08-03', tipo: 'demanda o regulador', hecho: 'Biocon lanza Yesafili, otro biosimilar de EYLEA en EE. UU. [B6].', veredicto: 'no cambia', condicion: null },
          { fecha: '2026-04-08', tipo: 'demanda o regulador', hecho: 'Acuerdos con el Gobierno de EE. UU.: precios de nación más favorecida en Medicaid y fármacos nuevos, a cambio de alivio en aranceles [B5].', veredicto: 'no cambia', condicion: null },
          { fecha: '2026-10-24', tipo: 'directivos', hecho: 'Ventas de directivos de 16,1 M USD en 12 meses, ninguna compra; el consejero delegado y el director científico no han vendido [C3].', veredicto: 'no cambia', condicion: null },
          { fecha: '2026-10-30', tipo: 'resultados', hecho: 'Resultados del 3T26 antes de la apertura: consenso de BPA ajustado de 16,19 USD [D2, D6].', veredicto: 'no cambia', condicion: null },
        ],
        proximos_resultados: '2026-10-30',
        veredicto: 'no cambia',
        condicion: null,
        comentario: 'La acción sube un 37,7 % en un año y un 20,7 % en tres meses, con la media de 200 sesiones al alza, pero sigue un 33 % por debajo de su máximo de 2024 [D1]. Cada movimiento fuerte tiene causa en un hecho de la empresa (fianlimab, resultados del 2T, FOP, Sanofi); no hay colocaciones, y los directivos venden poco (16,1 M en un año) [C3]. Los resultados del 30-oct llegan en 6 días, pero con tendencia alcista no retrasan (regla 11). Veredicto: no cambia.',
      },
    },
  },
  dcf_justificacion: {
    crecimiento: '2026e (+19,2 %, fijo): el 1S26 creció un 17,8 % (+19,0 % y +16,7 %) y, desde el 3T, la parte de Dupixent ya no descuenta la deuda de desarrollo con Sanofi [A3, A4]; consenso de 17.600 M [D2]. 2027e-2030e (+8,5 % a +4,0 %): Dupixent crece cada vez menos y EYLEA cae con los biosimilares, compensado por EYLEA HD, Libtayo, Lynozyfic y los lanzamientos de 2026-2027 (FOP, cemdisiran); el consenso de 2027e es de 18.592 M, casi igual que el nuestro (18.550) [D2]. 2031e-2032e (0 % y −3 %): las patentes de Dupixent vencen en marzo y octubre de 2031 [A1]. 2033e: +2 % con la cartera.',
    margenes: 'Margen EBITDA (con los pagos en acciones como gasto) del 32 % en 2026e, frente al 28,1 % de los últimos doce meses: la parte de Dupixent sin la deuda de desarrollo es casi todo margen [A3]. Sube al 35,5 % en 2029e-2030e con la I+D estable (≈ 5.900-6.200 M según la guía) y baja al 33 % cuando Dupixent pierde la patente [A3].',
    inversion: 'Capex del 6,2 % de las ventas en 2026e (guía de 1.030-1.100 M) y del 7 % en 2027e por la fábrica de Saratoga Springs y el compromiso de invertir en EE. UU.; baja al 4,5 % en 2031e [A3, B5]. Circulante del 54 % de las ventas, el nivel de 2025: cuentas a cobrar de Sanofi y Bayer y existencias de biológicos [A1].',
    wacc: 'Tasa libre del 5,00 % (Tesoro a 10 años, 23-oct-2026 [D3]); beta de 0,85, por encima de la medida (0,62 [D2]) porque la acción se mueve por ensayos binarios y por la política de precios de EE. UU.; prima del mercado del 5,5 % y prima adicional de 0,5 puntos por la dependencia de Dupixent (≈ 40 % de los ingresos) con patente hasta 2031. Coste de la deuda del 4,5 % con un peso del 3,2 %. WACC del 10,0 %.',
    terminal: 'Crecimiento a perpetuidad del 2,0 %: después de 2033 los ingresos dependerán de la cartera de hoy (unos 50 candidatos), no de Dupixent ni de EYLEA; es una empresa de I+D que repone su cartera, por eso no es cero, pero tampoco más que la inflación.',
  },
  puente_comentarios: {
    '2026e': 'Volumen +15,2 % (Dupixent +30 %, EYLEA HD, Libtayo), precio −1 % (EYLEA y EYLEA HD con menor precio neto) y +5 puntos de la parte de Sanofi sin la deuda de desarrollo desde el 3T [A3].',
    '2027e': 'Volumen +9,5 %: Dupixent en EPOC y urticaria, EYLEA HD, Libtayo adyuvante, Lynozyfic y FOP, menos EYLEA con biosimilares; precio −1 % [A3, B6].',
    '2028e': 'Volumen +8 % con los lanzamientos de 2026-2027; precio −1 % por los acuerdos de nación más favorecida [B5].',
    '2029e': 'Volumen +6,5 %: Dupixent madura.',
    '2030e': 'Volumen +5 %: último año completo de Dupixent con patente.',
  },
  veredicto: 'Sí',
  sostenibilidad_justificacion: 'Las pruebas del motor dan «En parte» porque comparan con 2021, el año del anticuerpo de la COVID (5.800 M de ventas que desaparecieron en 2022). Sin la COVID, los ingresos crecieron un 5,6 % anual en 2022-2025 [A5, A9], igual que el 5,4 % proyectado para 2026e-2033e, y el ROIC de esos años (21-42 %) está muy por encima del WACC (10 %). La mejora del margen de 2026-2027 no pide capital: es la parte de Dupixent que Sanofi deja de descontar desde el 3T26 [A3]. Lo que sí limita el veredicto es la caída del ROIC (de 42,4 % a 21,1 % en tres años) y la patente de Dupixent en 2031: por eso el caso base baja los ingresos en 2031-2032.',
  dcf_lectura: 'El DCF da 657,62 USD por acción, un 18,3 % por debajo del precio, con un WACC del 10,0 % y un valor terminal que pesa el 58 %. El DCF inverso dice que el precio descuenta un crecimiento del 11,6 % anual en 2027e-2033e (o un margen del 40,8 %), frente al 3,4 % y el 33 % de nuestro base: el mercado no cree que Dupixent pierda tanto en 2031 o confía en la cartera. Con la prima implícita del mercado (4,2 %, WACC del 8,9 %), el DCF sube a 735,51 USD, todavía un 8,6 % por debajo. Lo que separa el DCF de la regla a 12 meses es el horizonte: el BPA de 2028e (64,40) es bueno; lo que pesa en el DCF es lo que pasa después de 2031.',
  narrativas: {
    Bajista: 'Dupixent pierde cuota antes de 2031 con los orales y los anti-OX40, EYLEA cae más deprisa con cuatro biosimilares y los acuerdos de precios de EE. UU. aprietan; la cartera no da otro gran éxito: 4 puntos menos de crecimiento y 3 de margen.',
    Base: 'Dupixent crece hasta 2030 y pierde la patente en 2031; EYLEA HD sostiene la retina; Libtayo, Lynozyfic, FOP y cemdisiran suman; margen EBITDA del 32-35,5 %.',
    Alcista: 'La cartera da uno o dos éxitos grandes (obesidad con olatorepatide, alergia, hematología) y Dupixent resiste más: 3 puntos más de crecimiento y 1,5 puntos más de margen.',
  },
  escenarios_comentario: 'Los tres escenarios del DCF quedan por debajo del precio: alcista 741,75 USD (−7,9 %), base 657,62 (−18,3 %) y bajista 504,76 (−37,3 %). El DCF castiga la caída de Dupixent en 2031 y un WACC del 10 %; con la prima del mercado el rango es de 547,79 a 835,34 USD.',
  suma_partes_comentario: 'No aplica: los negocios (retina, colaboración con Sanofi, oncología, otros) comparten I+D, fábricas y clientes, y no hay cifras de resultado por segmento [A1].',
  casos_12m: {
    Bajista: 'Ventas un 4 % menos al año en 2027e-2028e y margen 3 puntos menor (Dupixent frena, EYLEA cae más, precios): BPA de 56,48 USD en 2028e × 11,8 veces (el base × 0,8, por debajo del mínimo adelantado de 14,0) = 666,46 USD.',
    Base: 'Ventas de 18.550 M en 2027e y 19.848 M en 2028e, margen EBITDA del 35 %, pagos en acciones de 1.100 M, intereses de la caja de 650 M, tipo del 15 % y 108 M de acciones sin recompras nuevas: BPA de 64,40 USD × 14,7 veces (a mitad de camino del actual, 13,5, hacia la mediana adelantada, 16,1) = 946,68 USD.',
    Alcista: 'Ventas un 3 % más al año y margen 1,5 puntos mayor: BPA de 69,64 USD × 16,1 veces (la mediana adelantada) = 1.121,20 USD.',
  },
  diferencia_consenso: 'Nuestro BPA de 2026e (55,30 USD) queda un 6 % por debajo del consenso (58,85), que parece incluir parte del cobro inicial de Sanofi; nosotros lo dejamos fuera del BPA y lo sumamos en el puente (850 M después de impuestos). En 2027e estamos un 15 % por encima (59,73 frente a 52,03), pero ese consenso es de solo 9 analistas y no es fiable; en ventas de 2027e coincidimos (18.550 frente a 18.592 M) [D2].',
  objetivo_comentario: 'El objetivo a 12 meses (920,26 USD, ponderado) queda un 14,3 % por encima del precio, con un 14,8 % de rentabilidad ponderada y un 18,0 % en el caso base: casi en el umbral de compra (15 %), pero el valor intrínseco (677,23 USD) está un 16 % por debajo del precio y la regla pide las dos cosas. El objetivo medio de los analistas (867,33) queda un 8 % por debajo de nuestro base.',
  valoracion_comentario: 'Pesos: DCF 45 %, escenarios 40 % y comparables 15 %. El DCF es el método que recoge la patente de Dupixent en 2031 y la caída de EYLEA; los comparables (PER de 15,7 veces) se usan poco porque las grandes farmacéuticas tienen sus propios vencimientos de patentes. El valor intrínseco (677,23 USD) es el que limita la compra.',
  catalizadores: {
    items: [
      { fecha: '2026-10-30', evento: 'Resultados del 3T26 (antes de la apertura)', efecto: 'Primer trimestre de Dupixent sin la deuda de desarrollo; consenso de BPA de 16,19 USD', probabilidad: 'Alta', sentido: '+/−' },
      { fecha: '2026-11', evento: 'Decisión de la FDA sobre cemdisiran (miastenia grave)', efecto: 'Lanzamiento nuevo en 2027', probabilidad: 'Media', sentido: '+' },
      { fecha: '2026-4T', evento: 'Cobro de 1.000 M USD de Sanofi (sexta enmienda)', efecto: '≈ 7,9 USD por acción después de impuestos, en el puente', probabilidad: 'Alta', sentido: '+' },
      { fecha: '2027', evento: 'Avances de olatorepatide (obesidad) y del resto de la cartera', efecto: 'La apuesta grande para después de 2031', probabilidad: 'Media', sentido: '+/−' },
      { fecha: '2027-2028', evento: 'Más biosimilares de EYLEA en EE. UU.', efecto: 'EYLEA sin HD (≈ 410 M en el 2T26) sigue cayendo', probabilidad: 'Alta', sentido: '−' },
      { fecha: '2031-03 y 2031-10', evento: 'Vencen las patentes de Dupixent', efecto: 'Biosimilares del producto que da ≈ 40 % de los ingresos', probabilidad: 'Alta', sentido: '−' },
    ],
    confianza: 'Media',
  },
  riesgos: {
    items: [
      { riesgo: 'Dupixent pierde la patente en 2031 (o antes cuota frente a orales y anti-OX40)', tipo: 'Patentes', probabilidad: 'Alta', impacto: 'Alto', efecto_valor: '−15 a −25 %', mitigante: 'Cartera de ≈ 50 candidatos y 18.866 M de caja para licencias [A1].' },
      { riesgo: 'EYLEA y EYLEA HD con biosimilares y Vabysmo', tipo: 'Competencia', probabilidad: 'Alta', impacto: 'Medio', efecto_valor: '−5 a −10 %', mitigante: 'EYLEA HD (+52 % en el 2T26) con dosis cada 4 meses [A3].' },
      { riesgo: 'Precios de los medicamentos en EE. UU. (nación más favorecida, Medicare negociado)', tipo: 'Regulación', probabilidad: 'Media', impacto: 'Medio', efecto_valor: '−5 a −10 %', mitigante: 'Acuerdos de abril de 2026 con el Gobierno ya firmados [B5].' },
      { riesgo: 'Fracasos de la I+D (fianlimab en melanoma, mayo de 2026)', tipo: 'Ensayos', probabilidad: 'Media', impacto: 'Medio', efecto_valor: '−5 a −15 % por fracaso grande', mitigante: 'Muchos programas a la vez; ninguno pesa más del 10 % del valor.' },
      { riesgo: 'Dependencia de Sanofi para la información y la venta de Dupixent', tipo: 'Socio', probabilidad: 'Baja', impacto: 'Alto', efecto_valor: '−5 %', mitigante: 'Sexta enmienda de 2026 y fin del pleito [A12].' },
      { riesgo: 'Pleito civil del Departamento de Justicia (2020) por donaciones a fundaciones de pacientes', tipo: 'Legal', probabilidad: 'Baja', impacto: 'Bajo', efecto_valor: '−1 a −2 %', mitigante: 'Sigue abierto sin cifra; la caja lo cubre [A1].' },
      { riesgo: 'Riesgo de IA (descubrimiento de fármacos más rápido de rivales)', tipo: 'Tecnología', probabilidad: 'Baja', impacto: 'Bajo', efecto_valor: '±2 % a 3-5 años', mitigante: 'Regeneron usa su base genética (Regeneron Genetics Center) con IA.' },
    ],
    premortem: 'Octubre de 2029: la acción ha perdido un 35 %. Dupixent siguió vendiendo, pero los orales y los anti-OX40 frenaron su crecimiento antes de lo esperado, y el mercado empezó a descontar la patente de 2031. EYLEA cayó a la mitad con cuatro biosimilares y Vabysmo, y la cartera no dio un gran éxito: olatorepatide llegó tarde a un mercado de obesidad dominado por Lilly y Novo. El BPA quedó plano en ≈ 55 USD y el PER bajó a 12 veces.',
    ia: {
      exposicion: 'Baja', sentido: 'Mixto', efecto_valor: '±2 % a 3-5 años',
      comentario: 'La IA no sustituye lo que vende Regeneron: anticuerpos con patente, fabricados por ella y recetados por especialistas. Puede ayudarla (su base de datos genéticos de más de 2 millones de personas acelera la búsqueda de dianas) y puede ayudar a sus rivales a diseñar moléculas más deprisa. El efecto neto en 3-5 años es pequeño.',
    },
    confianza: 'Media',
  },
  preguntas: {
    items: [
      { tema: 'Dupixent', pregunta: '¿Cuánto sube la parte de Regeneron en Dupixent desde el 3T26 sin la deuda de desarrollo, y qué plan hay para 2031?', por_que: 'Es la mitad del beneficio y el riesgo mayor del DCF.' },
      { tema: 'EYLEA', pregunta: '¿Qué cuota mantiene EYLEA HD frente a Vabysmo y los biosimilares en 2027?', por_que: 'La retina es un tercio de los ingresos y cae.' },
      { tema: 'I+D', pregunta: '¿Cuándo baja la I+D del 41 % de los ingresos, o qué ensayos la justifican?', por_que: 'Explica la caída del ROIC de 2022-2025.' },
      { tema: 'Recompras', pregunta: '¿Por qué las recompras (10.250 M desde 2023) bajan poco las acciones?', por_que: 'Los pagos en acciones (≈ 1.000 M al año) se comen buena parte.' },
      { tema: 'Obesidad', pregunta: '¿Qué espera de olatorepatide frente a Lilly y Novo?', por_que: 'Es la apuesta grande para después de 2031.' },
    ],
    confianza: 'Media',
  },
  resumen: {
    recomendacion: 'Mantener', conviccion: 'Media', justificacion_recomendacion: null, horizonte: '12 meses',
    sintesis: `**La recomendación y por qué.** Mantener, con convicción media; para quien no la tiene, no comprar hoy. El objetivo a 12 meses es de 920,26 USD (nuestro BPA de 2028e × el PER de la regla común), un +14,8 % de rentabilidad ponderada y un +18,0 % en el base, casi en el umbral de compra (15 %). Pero el valor intrínseco (677,23 USD) está un 16 % por debajo del precio de 805,02 USD (cierre del 23-oct-2026), y la regla pide las dos cosas. Con el BPA un 10 % más bajo, la ponderada cae al 3,4 %. La convicción es media porque el BPA de 2026-2028 se ve bien (Dupixent, EYLEA HD) pero el valor depende de lo que pase tras 2031; subiría la convicción un 3T que confirme el salto de la parte de Dupixent, y la bajaría que EYLEA HD deje de crecer.

**El negocio.** Regeneron descubre y fabrica anticuerpos. La mitad del beneficio llega de Dupixent, que vende Sanofi y del que cobra la mitad; el resto es EYLEA HD y EYLEA (retina, en EE. UU.), Libtayo y otros [A1]. Ingresos de 14.343 M USD en 2025 y margen operativo del 24,9 %, con una I+D del 41 % de las ventas [A5].

**Finanzas.** Vuelve a crecer: +17,8 % en el 1S26 y, desde el 3T, la parte de Dupixent ya no descuenta la deuda de desarrollo con Sanofi [A3]. Sin deuda neta: 17.823 M de caja e inversiones frente a 1.987 M de bonos [A2]. El ROIC bajó del 42,4 % de 2022 al 21,1 % de 2025, frente a un WACC del 10,0 %: crea valor (11 puntos), pero menos cada año.

**Equipo y gobierno.** Los fundadores, Leonard Schleifer y George Yancopoulos, dirigen desde 1988-1989 [B4]. Hay acciones de clase A con más votos (≈ 15 % del voto) y un plan de acciones a 10 años para los dos de hasta 5,6 M de acciones [C1, C4]. No venden: los directivos vendieron solo 16,1 M en un año [C3].

**Valoración.** El DCF da 657,62 USD (−18,3 %) y el DCF inverso descuenta un 11,6 % de crecimiento anual frente al 3,4 % de nuestro base, que incluye la pérdida de la patente de Dupixent en 2031. Con la prima del mercado (4,2 %), el DCF sube a 735,51 USD. La regla a 12 meses es más generosa porque el BPA de 2028e es bueno (64,40 USD) y el PER actual (13,5 veces el de 2027e) está por debajo de su mediana (16,1).

**Riesgos y catalizadores.** El riesgo de mayor impacto es Dupixent en 2031 (−15 a −25 %); después, EYLEA con biosimilares y los precios de EE. UU. Resultados del 3T el 30-oct; cobro de 1.000 M de Sanofi en el 4T.

**Qué cambiaría la decisión.** Comprar por debajo de 677,23 USD (−16 %), donde se cumplen la regla a 12 meses y el valor intrínseco; Vender por encima de 1.026,55. Unos resultados del 3T que suban el BPA de 2027-2028 más de un 10 %, o un éxito grande de la cartera, subirían el valor intrínseco.`,
    tesis: 'Regeneron es una empresa de ciencia con un gran producto (Dupixent) hasta 2031, un negocio de retina que cae y una cartera amplia. Crea valor (ROIC del 21 % frente a un WACC del 10 %) y tiene 18.000 M de caja. A 805 USD el precio ya descuenta que el crecimiento de 2026-2028 sigue después de 2031: el valor intrínseco es de 677 USD.',
    vision_diferencial: {
      mercado_descuenta: 'Que Dupixent y la cartera mantienen un crecimiento del 11-12 % anual durante siete años; los analistas ponen un objetivo medio de 867 USD con 19 de 28 en comprar [D2].',
      nuestra_vision: 'Coincidimos en 2026-2028 (BPA de 64,40 en 2028e); discrepamos en lo que viene después: con la patente de Dupixent en 2031 el flujo de caja baja, y eso pesa en el valor intrínseco.',
      por_que: 'Las fechas de las patentes están en el 10-K (marzo y octubre de 2031) [A1]; el ROIC lleva tres años bajando aunque la I+D sube.',
    },
    a_favor: [
      '**Dupixent**: +38 % en el 2T26 y, desde el 3T, sin la deuda de desarrollo.',
      '**Sin deuda neta**: 17.823 M USD de caja e inversiones.',
      '**PER bajo**: 13,5 veces el BPA de 2027e frente a una mediana de 16,1.',
      '**EYLEA HD**: +52 % en el 2T26.',
      '**Recompras y dividendo**: 3.456 M en 2025 y programa nuevo de 3.000 M.',
    ],
    en_contra: [
      '**Valor intrínseco por debajo**: 677 USD frente a 805.',
      '**Patente de Dupixent en 2031**: ≈ 40 % de los ingresos.',
      '**ROIC a la baja**: del 42 % al 21 % en tres años.',
      '**EYLEA cae** con biosimilares y Vabysmo.',
      '**I+D cara**: 41 % de los ingresos, con fracasos recientes.',
    ],
    que_vigilar: 'La tesis depende de cuánto sube el beneficio de Dupixent sin la deuda de desarrollo (se verá el 30-oct) y de que la cartera dé algo grande antes de 2031. La señal en contra sería que EYLEA HD deje de crecer o que Dupixent frene antes de 2030.',
    cambiaria_recomendacion: [
      'Precio por debajo de 677,23 USD: Comprar (ponderada ≥ 15 %, base ≥ 12 % y valor intrínseco por encima).',
      'Precio por encima de 1.026,55 USD: Vender (ponderada ≤ −10 %).',
      'Resultados del 3T que suban el BPA de 2027-2028 más de un 10 %: repetir el análisis.',
      'Fracaso de olatorepatide en fase 3: revisar a la baja.',
    ],
    kpis_seguimiento: [
      { kpi: 'Parte de Regeneron en Dupixent (colaboración con Sanofi)', nivel_actual: '2.174 M en el 2T26 (2.033 M de parte del beneficio)', umbral_alerta: 'Crecimiento < 15 %', por_que: 'Es la mitad del beneficio.' },
      { kpi: 'Ventas de EYLEA HD', nivel_actual: '+52 % (2T26)', umbral_alerta: 'Caída interanual', por_que: 'Sostiene la retina.' },
      { kpi: 'Margen operativo GAAP', nivel_actual: '24,5 % (1S26)', umbral_alerta: '< 25 % en 2027', por_que: 'Debe subir sin la deuda de desarrollo.' },
      { kpi: 'ROIC', nivel_actual: '21,1 % (2025)', umbral_alerta: '< 15 %', por_que: 'Lleva tres años bajando.' },
    ],
  },
  fuentes: [],
};
