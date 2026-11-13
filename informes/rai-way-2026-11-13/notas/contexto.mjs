// Bloque de precio y noticias (regla 13, sección 16 bolsa.contexto). Cifras de herramientas/movimiento.mjs RWAY.MI (13-nov-2026, datos al 11-nov).
export default {
  movimiento: {
    fecha: '2026-11-11', var_1m_pct: -2.4, var_3m_pct: -14.2, var_6m_pct: -26.6, var_12m_pct: -28.3,
    dist_max_52s_pct: -33.7, dist_min_52s_pct: 0.0, dist_max_historico_pct: -34.7, tendencia: 'bajista', volatilidad_60d_pct: 16,
    avisos: ['P4 En mínimos de 52 semanas (0 % sobre el mínimo, 11-nov)', 'P5 Un 21 % por debajo de la media de 200 sesiones (tendencia bajista)'],
  },
  movimientos_fuertes: [
    { periodo: 'jun-jul 2026', var_pct: -17.7, causa: 'Mayor caída de un mes en seis (hasta el 9-jul): expira sin acuerdo el memorando con F2i y MFE para la fusión con EI Towers (1-jul, −5,1 % ese día) y se va la prima de operación (dividendo extraordinario esperado) [B7].', veredicto: 'no cambia', condicion: null },
    { periodo: '18-may-2026', var_pct: -5.1, causa: 'Fecha de corte del dividendo de 0,33 EUR aprobado en la junta: es el cupón, no una caída del valor [A11].', veredicto: 'no cambia', condicion: null },
    { periodo: '30-oct-2026', var_pct: -2.7, causa: 'Caída de hasta −5,1 % en sesión (mínimo de 4,04 EUR) con 1,1 M de acciones, cierre en −2,7 %; sin noticia de la empresa ni de RAI ese día, el mismo día en que el Istat publicó la inflación de octubre [D16, D15]. Se recuperó en la semana siguiente.', veredicto: 'no cambia', condicion: null },
  ],
  noticias: [
    { fecha: '2026-07-06', tipo: 'accionista de referencia', hecho: 'RAI mantiene abierta la opción de vender un 10 % de Rai Way (≈ 130 M EUR); sin fusión, una colocación tendría poca demanda y descuento elevado [D13].', veredicto: 'retrasa', condicion: 'Hasta que RAI decida sobre su participación excedente.' },
    { fecha: '2026-10-01', tipo: 'accionista de referencia', hecho: 'La previsión de deuda neta de RAI para fin de 2026 (−510 M EUR) sigue incluyendo la venta del 15 % de Rai Way (≈ 185 M); sin ella sería de ≈ −600 M. Decisión posible «antes de noviembre»; si no hay comprador industrial o financiero, colocación acelerada con descuento [D11].', veredicto: 'retrasa', condicion: 'Hasta el anuncio de RAI (venta, colocación o renuncia) o un precio que ya descuente la colocación: ≤ 3,85 EUR (≈ −9 % sobre 4,215).' },
    { fecha: '2026-10-15', tipo: 'fusión u oferta', hecho: 'El consejero delegado de EI Towers dice que la fusión sigue siendo «válida» en lo industrial pero ve improbable reabrirla a corto plazo [D14].', veredicto: 'no cambia', condicion: null },
    { fecha: '2026-10-30', tipo: 'demanda o regulador', hecho: 'Inflación italiana de octubre del +5,4 % (preliminar del Istat; inflación adquirida de 2026 del 3,4 %): casi todos los contratos se indexan a la inflación del año anterior; Intermonte calcula al menos un 4 % más de ingresos de 2027 que en su modelo [D15, D10].', veredicto: 'no cambia', condicion: null },
    { fecha: '2026-11-03', tipo: 'accionista de referencia', hecho: 'La reforma de la gobernanza de RAI está bloqueada y la renovación de su consejo podría aplazarse; la venta del 15 % (≈ 170 M EUR) sigue como hipótesis sin calendario [D12].', veredicto: 'retrasa', condicion: 'Igual que el punto del 1-oct.' },
    { fecha: '2026-11-11', tipo: 'resultados', hecho: '9M26: ingresos +2,3 %, EBITDA ajustado +0,2 % (energía), beneficio −6,1 % (amortizaciones); guía 2026 confirmada; la dirección prioriza crecimiento externo y anota costes de operaciones corporativas. La acción sube un 2,9 % el 12-nov [D17, D3].', veredicto: 'no cambia', condicion: null },
    { fecha: '2026-11-13', tipo: 'recomendación', hecho: 'Consenso: 3 comprar y 3 mantener; objetivo medio de 6,00 EUR (6,18 el 15-oct) y mínimo de 4,60 (5,20); BPA de 2026 −4,5 % en tres meses [D3].', veredicto: 'no cambia', condicion: null },
    { fecha: '2026-11-13', tipo: 'directivos', hecho: 'Sin comunicaciones de internal dealing de consejeros o directivos desde febrero de 2025 [C9].', veredicto: 'no cambia', condicion: null },
  ],
  proximos_resultados: 'mar-2027',
  veredicto: 'retrasa',
  condicion: 'Hasta que RAI anuncie qué hace con el 15 % excedente (colocación, venta a un socio o renuncia) o hasta ≤ 3,85 EUR, precio que ya descuenta una colocación acelerada con un ≈ 9 % de descuento.',
  comentario: 'La acción cae un 26,6 % en seis meses y está en el mínimo de 52 semanas por la fusión fallida y el dividendo de mayo; los resultados de 9M26 no cambian la tesis (guía confirmada, +2,9 % el día después). El hecho pendiente que puede mover el precio más de un 5 % es la decisión de RAI sobre su 15 % excedente: unos 40 M de acciones, ≈ 130 días de volumen medio, que su propio plan de deuda da por vendidos en 2026 [D11]. Una colocación acelerada se haría con descuento sobre el cierre; una venta a un socio industrial o la renuncia la despejarían. Por eso el veredicto es «retrasa» hasta esa decisión o hasta un precio que la descuente (≤ 3,85 EUR). La inflación italiana de octubre (+5,4 %) juega a favor del valor, no del calendario.',
};
