// actualizacion-v3.mjs — VAT v3 (13 oct 2026): prueba de sostenibilidad del crecimiento (`dcf.sostenibilidad`).
// Sin investigación nueva: parte de datos-v2.json, borra calc y añade el puente de ingresos, el mercado final y el
// veredicto con las cifras que ya están en el informe. Escribe datos-v3.json; después:
//   node motor/calcular-empresa.mjs --datos informes/vat-2026-10-06/datos-v3.json
import { readFileSync, writeFileSync } from 'node:fs';

const dir = new URL('../', import.meta.url);
const d = JSON.parse(readFileSync(new URL('datos-v2.json', dir), 'utf8'));
delete d.calc;

const cambiar = (obj, k, viejo, nuevo) => {
  if (typeof obj[k] !== 'string' || !obj[k].includes(viejo)) throw new Error(`No encuentro en ${k}: «${viejo.slice(0, 60)}…»`);
  obj[k] = obj[k].replace(viejo, nuevo);
};

// ── Sostenibilidad del crecimiento ──
// Cuota publicada: ≈ 70 % del nicho de válvulas de vacío para semiconductores (≈ 900 M CHF en 2025, estimación del
// propio informe) [1]. Es la cuota de un segmento (la unidad Semiconductors, 724,7 M de 1.073,5 M): el motor
// dividiría los ingresos del grupo entre el nicho, así que `mercado_final` va en null y la prueba se hace a mano.
d.dcf.sostenibilidad = {
  puente_ingresos: [
    { periodo: '2026e', volumen_pct: 30, precio_pct: 1, otros_pct: -7.4, comentario: 'Año fijado en el consenso (+23,6 %) [84]. Volumen: pedidos del 1S26 +75 % (+91 % a tipo constante) y cartera de 647,9 M a junio [6, 9]. Divisa: las ventas del 1S26 cayeron un 8 % en francos y quedaron planas a tipo constante [9]; se supone el mismo efecto en el año. Precio: VAT no publica subidas; el margen bruto estable (63,5-67 %) con franco fuerte apunta a un precio algo positivo [1]. Reparto: estimación propia.' },
    { periodo: '2027e', volumen_pct: 37, precio_pct: 1, otros_pct: 0, comentario: 'Volumen: WFE +21,8 % según SEMI [46], más ganancia de cuota (objetivo de más del 80 % en válvulas en 2029) [7] y la cartera récord; capacidad instalada para más de 2.000 M de ventas [1]. Precio: el mismo supuesto prudente. Divisa constante.' },
    { periodo: '2028e', volumen_pct: 11, precio_pct: 1, otros_pct: 0, comentario: 'Volumen: WFE +14,1 % según SEMI [46], algo menos por la base alta de 2027. Precio: +1 %. Divisa constante.' },
    { periodo: '2029e', volumen_pct: -16, precio_pct: 1, otros_pct: 0, comentario: 'Corrección del ciclo, calibrada con 2019 (−18,3 %) y 2023 (−22,7 %), algo más suave por el servicio (18,5 % de las ventas) [1, 2, 4].' },
  ],
  mercado_final: null,
  veredicto: 'Sí',
  justificacion: 'Sí. Foso amplio: ≈ 70 % del nicho y una válvula que se especifica en el diseño de cada equipo y pesa menos del 2 % de su coste; el margen bruto aguanta en el 63,5-67 % con el franco fuerte [1]. El base crece un 8,3 % anual hasta 2035, como en 2016-2025. Las pruebas pasan: reinversión baja (10 % del NOPAT) porque hay capacidad para 2.500 M de ventas [7] y el base acaba en 2.390 M; el capital nuevo rendiría un 74 % (56 % a margen constante), bajo el límite del 76,5 % (1,25 veces el 61,2 % incremental); la cuota en válvulas para semiconductores pasaría al ≈ 79 % en 2028e (cálculo propio con SEMI [46]), cerca del objetivo de VAT (más del 80 %) [7].',
};

// ── Textos con cifras que cambian ──
const r = d.resumen;
// Frase obligatoria del veredicto en «El negocio».
cambiar(r, 'sintesis', 'La vulnerabilidad es la concentración:', 'La calidad sostiene el crecimiento proyectado (8,3 % anual hasta 2035): hay capacidad para 2.500 M de ventas y el capital nuevo rendiría un 74 %, cerca del 61 % incremental histórico [7]. La vulnerabilidad es la concentración:');
// Recorte para seguir por debajo de 650 palabras.
cambiar(r, 'sintesis', 'Cuentas NIIF limpias (KPMG, sin salvedades, Altman Z de 29,33, Beneish M de −2,83) y balance holgado', 'Cuentas NIIF limpias (KPMG, sin salvedades) y balance holgado');
cambiar(r, 'sintesis', ' Un negocio excelente a un precio que solo se sostiene si el ciclo de los semiconductores deja de serlo.', '');
cambiar(r, 'sintesis', 'una rentabilidad del 3,8 % en francos, 3,3 puntos sobre el bono suizo para una acción que perdió un 58 % en 2021-2022 [83].', 'una rentabilidad del 3,8 % en francos, 3,3 puntos sobre el bono suizo [83].');
// Niveles del motor actual (antes 238,61 / 305,64 en el texto, 282,35 / 395,50 en la tabla de v2).
cambiar(r, 'sintesis', 'Compraríamos por debajo de 238,61 CHF y venderíamos por encima de 305,64.', 'Compraríamos por debajo de 265,48 CHF y venderíamos por encima de 395,50.');
r.cambiaria_recomendacion[0] = 'Si el precio baja de 395,50 CHF pasaríamos a Mantener, y por debajo de 265,48 CHF a Comprar.';

writeFileSync(new URL('datos-v3.json', dir), JSON.stringify(d, null, 2));
console.log('datos-v3.json escrito.');
