// Riesgos y pre-mortem (Daiichi Sankyo, corte 2026-10-08). Los efectos en valor salen del motor (escenarios y sensibilidades).
export function riesgos(v) {
  return {
    items: [
      { riesgo: 'Datroway no llega a la primera línea de pulmón (AVANZAR, TROPION-Lung07/08 negativos o con beneficio marginal)', tipo: 'Cartera de I+D', probabilidad: 'Media', impacto: 'Alto',
        efecto_valor: v.datroway, mitigante: 'Datroway ya está aprobado en mama HR+, triple negativa de primera línea y pulmón EGFR mutado [A4]; el valor de Enhertu no depende de estos ensayos.',
        senal: 'Resultados principales de AVANZAR (2S del año natural 2026) y de TROPION-Lung07/08 (FY2027).' },
      { riesgo: 'Compromisos mínimos con fabricantes externos sin provisionar', tipo: 'Balance y contable', probabilidad: 'Media', impacto: 'Medio',
        efecto_valor: v.cmo, mitigante: 'La empresa renegocia y reasigna capacidad a los cinco DXd y a nuevos candidatos [C21].',
        senal: 'Nuevas provisiones por compensación a fabricantes en los trimestres de FY2026, por encima de los 80.000 M JPY previstos en el año [B2].' },
      { riesgo: 'Competencia en ADC: TROP2 y HER2 de Merck/Kelun, Gilead y biotecnológicas chinas licenciadas a Occidente', tipo: 'Competencia', probabilidad: 'Alta', impacto: 'Alto',
        efecto_valor: v.competencia, mitigante: 'Enhertu tiene datos de supervivencia en primera línea de mama HER2+ y en adyuvancia; cada nueva indicación la ancla antes que a sus rivales [A4].',
        senal: 'Cuota de nuevos pacientes de Enhertu en primera línea HER2+ en EE. UU. y precio neto en China.' },
      { riesgo: 'Seguridad: enfermedad pulmonar intersticial (neumonitis) de los DXd', tipo: 'Regulatorio y clínico', probabilidad: 'Baja', impacto: 'Alto',
        efecto_valor: v.ild, mitigante: 'Riesgo conocido, en ficha técnica y con protocolo de vigilancia desde 2019; la tasa de casos mortales cayó con el manejo precoz.',
        senal: 'Advertencias nuevas de la FDA o la EMA, o tasas de casos graves superiores en adyuvancia (pacientes curables).' },
      { riesgo: 'Fracaso de los tres DXd de Merck (I-DXd, HER3-DXd, R-DXd)', tipo: 'Cartera de I+D', probabilidad: 'Media', impacto: 'Medio',
        efecto_valor: v.merck, mitigante: 'Los pagos iniciales (4.000 M USD más 1.500 M de pagos continuos) ya se cobraron y no se devuelven [B6].',
        senal: 'IDeate-Lung02 en FY2027 y datos de ESMO de octubre de 2026 [A4, C23].' },
      { riesgo: 'Calidad contable y control interno tras la corrección de FY2025', tipo: 'Gobierno', probabilidad: 'Baja', impacto: 'Medio',
        efecto_valor: v.contable, mitigante: 'El error fue de clasificación entre periodos y elevó el beneficio, no lo redujo [A4].',
        senal: 'Salvedades del auditor, nuevas correcciones o cambio del director financiero.' },
      { riesgo: 'Recortes de precios en Japón y pérdida de exclusividad de Lixiana/edoxabán', tipo: 'Regulatorio', probabilidad: 'Alta', impacto: 'Bajo',
        efecto_valor: v.japon, mitigante: 'Japón pesa cada vez menos en los ingresos y Lixiana ya está en la proyección con caída [A4].',
        senal: 'Revisión de precios de abril de 2027 y entrada de genéricos de edoxabán.' },
      { riesgo: 'Yen: el 60 % largo de los ingresos está en dólares y euros', tipo: 'Mercado', probabilidad: 'Media', impacto: 'Medio',
        efecto_valor: v.yen, mitigante: 'Parte de los costes (reparto con AstraZeneca, I+D en EE. UU.) está en las mismas divisas.',
        senal: 'USD/JPY por debajo de 145 (la guía supone 155 desde el 2T) [A4].' },
    ],
    premortem: v.premortem,
    confianza: 'Media',
  };
}
