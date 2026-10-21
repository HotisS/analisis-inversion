// D: actualiza notas/D.json con los resultados del 3T26 (21-oct-2026) y el cierre del 20-oct.
// Ejecutar: node informes/philip-morris-2026-10-21/notas/D-actualiza.mjs
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const dir = path.dirname(fileURLToPath(import.meta.url));
const ruta = path.join(dir, 'D.json');
const d = JSON.parse(fs.readFileSync(ruta, 'utf8'));
const bt = JSON.parse(fs.readFileSync(path.join(dir, 'D-bolsa-total.json'), 'utf8'));
const pre = JSON.parse(fs.readFileSync(path.join(dir, 'D-yahoo-premercado.json'), 'utf8')).datos.PM;

// Fuentes nuevas (ids consecutivos)
const nuevas = [
  { id: 19, titulo: 'PMI Reports 2026 Third-Quarter & First Nine-Months Results and Updates 2026 Full-Year Adjusted Diluted EPS Forecast for Currency Only (Exhibit 99.1 del 8-K)', editor: 'Philip Morris International Inc. (SEC, 8-K)', tipo: 'Primaria', fecha: '2026-10-21', url: 'https://www.sec.gov/Archives/edgar/data/1413329/000162828026066596/earningsreleasepm-ex991xq3.htm' },
  { id: 20, titulo: 'PMI Participates in 2026 Barclays Global Consumer Conference; Raises 2026 Full-Year Diluted EPS Forecast for Currency Only (guía del 3T de 2,29-2,34 USD)', editor: 'Philip Morris International Inc. (SEC, 8-K)', tipo: 'Primaria', fecha: '2026-09-08', url: 'https://www.sec.gov/Archives/edgar/data/1413329/000162828026060806/a2026barclaysrelease.htm' },
  { id: 21, titulo: 'PM: cotización de premercado del 21-oct-2026 (7:02 ET), consenso por trimestre y año (earningsTrend) y cambios de objetivo: quoteSummary', editor: 'Yahoo Finance', tipo: 'Datos de mercado', fecha: '2026-10-21', url: 'https://finance.yahoo.com/quote/PM/' },
  { id: 22, titulo: 'Philip Morris International: estimaciones y «Earnings Flash» del 3T26 (ventas de 11.440 M frente a 11.320 M de FactSet)', editor: 'MarketScreener', tipo: 'Datos de mercado', fecha: '2026-10-21', url: 'https://www.marketscreener.com/quote/stock/PHILIP-MORRIS-INTERNATION-2836703/finances/' },
];
d.fuentes = d.fuentes.filter((f) => f.id < 19).concat(nuevas);
const f = (id) => d.fuentes.find((x) => x.id === id);
f(1).titulo = 'Históricos diarios de PM, SPY y XLP (precio, rango, rentabilidades totales, beta, cierres de ejercicio): herramientas/bolsa.mjs';
f(1).fecha = '2026-10-20';
f(11).fecha = '2026-10-20';
f(11).titulo = 'Movimiento del precio al cierre del 20-oct-2026 (1-12 meses, máximos, media de 200, tendencia): herramientas/movimiento.mjs PM';
f(7).titulo = 'Notas de resultados anuales 2017-2025 (BPA ajustado de cada año) y objetivos 2026-2028 (comunicado del 4T25)';

// Identificación
const id = d.identificacion;
id.precio = bt.identificacion.precio; // 199,90
id.fecha_precio = bt.identificacion.fecha_precio; // 2026-10-20
id.acciones = 1560; // acciones diluidas medias del 3T26 [19]
id.capitalizacion_publicada = 311567; // 1.558,6 M de acciones de Yahoo × 199,90
id.max_52s = bt.identificacion.max_52s;
id.min_52s = bt.identificacion.min_52s;
id.volumen_medio_diario = '≈ 894 M USD/día (4,7 M de acciones; 3 meses)';
id.proximos_resultados = '2027-02';

// Consenso
const c = d.consenso;
c.guidance = 'Guía de 2026 actualizada el 21-oct-2026 solo por divisa: BPA ajustado de 8,29-8,44 USD (antes 8,35-8,50; +9,9-11,9 %), con un efecto divisa favorable de 0,18 USD (antes 0,24); sin divisa sigue en 8,11-8,26 (+7,5-9,5 %). Ingresos orgánicos +5-7 %, ahora más probable en la mitad o la parte alta; resultado operativo orgánico +7-9 %, más probable en la mitad o la parte baja por el encarecimiento de la energía (Oriente Medio) y la mayor inversión en ZYN en EE. UU. en el 4T, y esa inclinación pasa al BPA. Volumen total al alza (antes estable o algo al alza), flujo operativo ≈ 13.500 M, inversión 1.400-1.600 M, deuda neta cerca de 2,0 veces el EBITDA y sin recompras [19]. El 4T implícito es de 1,77-1,92 USD. Objetivos 2026-2028 (6-feb-2026): ingresos orgánicos +6-8 % anual, resultado operativo +8-10 % y BPA ajustado sin divisa +9-11 % [7].';
c.estimaciones[0].fuente = 'Yahoo (BPA ajustado, 12 analistas, antes de los resultados del 3T) [2, 21]; MarketScreener (ventas, EBITDA, EBIT y dividendo) [3, 22]';
c.estimaciones[1].fuente = 'Yahoo (BPA ajustado, 14 analistas) [2, 21]; MarketScreener [3, 22]';
c.estimaciones[2].fuente = 'MarketScreener [3, 22]; su BPA de 9,60 USD es el publicado (con amortizaciones), no el ajustado';
c.revisiones = 'Antes de los resultados, el BPA ajustado de 2026 apenas se había movido (8,39 USD hace 90 días, 8,41 el 20-oct) y el de 2027 tampoco (9,14 a 9,18); el del 3T bajó de 2,43 a 2,32 tras el aviso de más inversión en EE. UU. en el 2S [2, 21]. El 3T supera: 2,36 USD de BPA ajustado frente a 2,32 de consenso y a la guía de 2,29-2,34 [19, 20, 21], y 11.438 M de ventas frente a 11.338 M (MarketScreener; 11.320 M según FactSet) [19, 22]. Pero la nueva guía (8,29-8,44, inclinada a la parte baja en resultado operativo) deja un 4T de 1,77-1,92 USD frente a 1,94 de consenso: cabe esperar recortes del BPA de 2026 de hasta 0,05-0,10 USD. A las 7:18 ET del 21-oct Yahoo aún no recogía revisiones [21].';
c.recomendaciones.n_analistas = 15;
c.confianza = 'Media';

// Bolsa: rentabilidad total (SPY y XLP) al cierre del 20-oct
const b = d.bolsa;
b.tipo_rentabilidad = bt.bolsa.tipo_rentabilidad;
b.rentabilidades = bt.bolsa.rentabilidades;
b.anual = bt.bolsa.anual;
b.beta = bt.bolsa.beta;
b.volatilidad_pct = bt.bolsa.volatilidad_pct;
b.max_drawdown_pct = bt.bolsa.max_drawdown_pct;
b.tramo_drawdown = bt.bolsa.tramo_drawdown;
b.comentario = 'La acción ha subido un 36,2 % en un año con dividendos frente al 15,8 % del S&P 500 y el 13,7 % del consumo básico (XLP), y un 34,7 % anual a tres años [1]. Lo explican tres cosas: el BPA ajustado crece a doble dígito (+14,8 % en 2025, +11,8 % en los nueve primeros meses de 2026), el paso de IQOS a primera marca en sus mercados y la búsqueda de defensivas cuando el mercado rota fuera de la tecnología (octubre de 2026) [7, 19, 16]. El PER adelantado ha pasado de ≈ 14 veces a final de 2023 a 22 veces: casi toda la subida desde 2024 es expansión del múltiplo. La caída máxima de cinco años es del −22,8 % (feb-sep 2022, Rusia y divisa) [1]. El 21-oct, con los resultados del 3T, cotizaba un 2,5 % por debajo en el premercado [21].';
const ctx = b.contexto;
ctx.movimiento = { fecha: '2026-10-20', var_1m_pct: 6.6, var_3m_pct: 2.9, var_6m_pct: 30.4, var_12m_pct: 26.5, dist_max_52s_pct: -2.8, dist_min_52s_pct: 38.5, dist_max_historico_pct: -2.8, tendencia: 'alcista', volatilidad_60d_pct: 24, avisos: [] };
const prePct = Math.round(pre.premercado_var_pct * 1000) / 10;
ctx.noticias = ctx.noticias.filter((n) => !(n.fecha === '2026-10-21'));
ctx.noticias.unshift({
  fecha: '2026-10-21', tipo: 'resultados',
  hecho: `3T26 por encima de lo esperado (BPA ajustado 2,36 USD frente a 2,32 de consenso y 2,29-2,34 de guía; ventas 11.438 M, +7,1 % orgánico), pero guía de 2026 recortada por divisa a 8,29-8,44 USD e inclinada a la parte baja en resultado operativo, con un 4T implícito de 1,77-1,92 frente a 1,94 de consenso. Premercado: ${String(pre.premercado).replace('.', ',')} USD (${String(prePct).replace('.', ',')} %) a las 7:02 ET [19, 20, 21].`,
  veredicto: 'no cambia', condicion: null,
});
const iFda = ctx.noticias.findIndex((n) => n.fecha === '2026-09-23');
ctx.noticias.splice(iFda, 0, { fecha: '2026-08-21', tipo: 'demanda o regulador', hecho: 'La FDA autoriza (PMTA) 11 variantes de ZYN ULTRA; ZYN suma 31 variantes autorizadas [19].', veredicto: 'no cambia', condicion: null });
ctx.proximos_resultados = '2027-02';
ctx.veredicto = 'no cambia';
ctx.condicion = null;
ctx.comentario = `Al cierre del 20-oct (199,90 USD) la acción estaba un 2,8 % por debajo de su máximo histórico, un 10,9 % por encima de la media de 200 sesiones y en tendencia alcista, sin avisos P1-P5 [11]. Las subidas y bajadas de más de un 10 % en un mes tienen causa conocida (resultados, FDA, Oriente Medio) y ninguna contradice la tesis. Los resultados del 3T, publicados hoy antes de la apertura, superan al consenso, pero la guía de 2026 baja 0,06 USD por divisa y apunta a la parte baja del resultado operativo: el premercado cae un ${String(Math.abs(prePct)).replace('.', ',')} % [19, 21]. Es un hecho ya publicado, no pendiente, y no cambia la tesis de largo plazo (objetivos 2026-2028 intactos). No hay colocaciones ni decisiones regulatorias con fecha. Veredicto: no cambia.`;

d.huecos = (d.huecos || []).filter((h) => h.campo !== 'posicion_corta_pct');
d.huecos.push({ seccion: 'bolsa', campo: 'posicion_corta_pct', tipo: 'Complemento', intentos: '1) Yahoo quoteSummary: 1,1 % del flotante (dato de proveedor, sin fecha de liquidación ni registro oficial); 2) MarketBeat: no abrió la ficha; 3) NYSE/FINRA: de pago o sin acceso directo', decision: 'Omitido (no hay registro oficial gratuito)' });

d._estado = 'en curso';
fs.writeFileSync(ruta, JSON.stringify(d, null, 2));
JSON.parse(fs.readFileSync(ruta, 'utf8'));
console.log('D.json actualizado', id.precio, id.fecha_precio, pre.premercado, prePct);
