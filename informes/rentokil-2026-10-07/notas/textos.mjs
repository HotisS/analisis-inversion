// Textos del analista para Rentokil Initial (corte 2026-10-07). Citas con prefijo de nota: [A3], [B6], [C34], [D2], [P1].
export const textos = {
  financieros: { ltm: { fcf: 515, no_recurrentes_en_ebitda: 287 } },
  valoracion: {
    puente: { fecha: '2026-06-30', deuda_financiera: 5503, arrendamientos: 543, caja: 2471, minoritarios: 0, pensiones: 14, asociadas: 44, otros_ajustes: 313 },
  },
  suma_partes: { aplica: false, descuento_holding_pct: 0, partes: [], comentario: 'No aplica. Las tres líneas (plagas en Norteamérica, plagas internacional e higiene) comparten clientes, rutas y centros, y la empresa no publica el EBITDA de cada una, solo el beneficio operativo ajustado por región [A2]. Aplicar el múltiplo de Rollins a Norteamérica supondría que su crecimiento y su retención son los de Rollins, que es justo lo que no ocurre. La diferencia de calidad entre negocios se recoge en los escenarios.', confianza: 'Media' },
  meta: {
    limitaciones: 'Línea cotizada: la acción ordinaria de Londres (RTO, en peniques), que es el mercado principal; el ADS de Nueva York equivale a cinco acciones. Las cuentas se presentan en dólares desde el ejercicio 2025 y todo el informe va en millones de USD; el precio en peniques se pasa a dólares con el tipo GBP/USD del cierre del 6 de octubre de 2026 (la sesión del 7 no había cerrado en Londres a la hora del corte). 2023-2025 son las cifras en dólares reexpresadas por la empresa, sin Workwear de Francia (actividad interrumpida); 2021-2022 se han convertido desde libras con los tipos del Banco de Inglaterra (medio del año para la cuenta y los flujos, de cierre para el balance) y aún incluyen Workwear de Francia. 2022 solo lleva dos meses y medio de Terminix. Las cifras de 2025 y de los últimos doce meses incluyen SOLitude, en venta. No hay datos de segmentos de 2021-2022 con la estructura actual.',
    controles_explicados: [
      { control: 'EBIT + resultado financiero = BAI', explicacion: 'La diferencia de cada año es exactamente la suma de partidas «one-off» que el informe devuelve al EBITDA y al EBIT (29, 168, 119, 110 y 287 M); el BAI es el publicado. El DCF las vuelve a restar como coste recurrente.' },
      { control: 'Comparables estables al quitar una empresa', explicacion: 'La muestra mezcla tres compañías de calidad (Rollins, Ecolab, Cintas, a 16-23 veces) con cuatro de servicios intensivos en mano de obra o textil (5-9 veces); por eso la mediana salta. Está explicado en el comentario de comparables y el método pesa solo un 15 %.' },
    ],
  },
};
