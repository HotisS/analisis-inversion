// Actualización v3 de Enagás (13 oct 2026): sostenibilidad del crecimiento (`dcf.sostenibilidad`, metodología del 10-oct).
// Sin investigación nueva: parte de datos-v2.json, borra calc y añade el puente de ingresos (desde el modelo regulado de
// notas/regulado.mjs), el mercado final (retribución reconocida del sector por la CNMC) y el veredicto. No cambia
// supuestos del DCF, precio ni fecha de corte. Escribe datos-v3.json.
//   node informes/enagas-2026-10-07/notas/actualizacion-v3.mjs
//   node motor/calcular-empresa.mjs --datos informes/enagas-2026-10-07/datos-v3.json
import { readFileSync, writeFileSync } from 'node:fs';

const dir = new URL('../', import.meta.url);
const d = JSON.parse(readFileSync(new URL('datos-v2.json', dir), 'utf8'));
delete d.calc;

// ── Puente de ingresos (estimación propia sobre notas/regulado.mjs) ──
// En una regulada, «precio» es la retribución unitaria que fija la CNMC (TRF, valores unitarios de O&M, REVU) y la
// indexación del 2 % de almacenamiento y GTS; «volumen» es la base de activos que se retribuye (la RAB que se amortiza);
// «otros», las obras de sellado de Castor (ingreso = gasto) y los ingresos no regulados (+3 %/año).
// Componentes en M EUR (regulado.mjs): retribución transporte + regasificación de Enagás = 73,5 % × sector
// (883 → 961 → 956,8 → 952,6 → 948,4); resto regulado 176 × 1,02^t; otros 48 × 1,03^t; Castor 45 en 2026 (125,9 en 2025).
//  2026e: −58,8 M sobre 976,8 = −6,0 %: Castor −80,9 (−8,3 pp); el resto, +22,1 M (+2,3 pp), retribución y otros sin
//         reparto publicado para 2025 → precio.
//  2027e: retribución +57,3 (+6,2 pp, nuevo marco), resto +3,5 y otros +1,4 (+0,5 pp), Castor −45 (−4,9 pp).
//  2028e-2030e: retribución del sector −0,44 %/año (RAB que se amortiza: −0,33 pp, volumen); resto +2 % (+0,39 pp,
//         precio); otros +3 % (+0,16 pp).
d.dcf.sostenibilidad = {
  puente_ingresos: [
    { periodo: '2026e', volumen_pct: 0, precio_pct: 2.3, otros_pct: -8.3, comentario: 'Las obras de sellado de Castor (125,9 M en 2025, ≈ 45 M en 2026, ingreso igual al gasto) restan 8,3 puntos [6, 7]; el resto de la retribución regulada y los otros ingresos suman 2,3 puntos (sin reparto publicado entre RAB y tarifa: va como precio, estimación propia) [6].' },
    { periodo: '2027e', volumen_pct: 0, precio_pct: 6.6, otros_pct: -4.7, comentario: 'Precio: el nuevo marco sube la retribución del transporte y la regasificación del sector de 883 a 961 M (TRF del 5,44 % al 6,46 % y O&M +32,6 %, sin la retribución por continuidad de suministro) [22, 23]; con el 73,5 % de Enagás, +6,2 puntos; almacenamiento y GTS indexados al 2 %, +0,4. Otros: fin de las obras de Castor (−4,9) e ingresos no regulados (+0,2) [6].' },
    { periodo: '2028e', volumen_pct: -0.3, precio_pct: 0.4, otros_pct: 0.1, comentario: 'Volumen: la retribución del sector baja de 961 a 940 M en 2032 porque la RAB se amortiza sin inversión que la reponga [9, 23]. Precio: almacenamiento y GTS al 2 % (real decreto en tramitación) [6]. Otros: buque Alisios y Axent, +3 % [1].' },
    { periodo: '2029e', volumen_pct: -0.3, precio_pct: 0.4, otros_pct: 0.1, comentario: 'Igual que 2028e: RAB que se amortiza (−0,44 % al año en la retribución del sector) frente a la indexación del resto regulado [9, 23].' },
    { periodo: '2030e', volumen_pct: -0.3, precio_pct: 0.4, otros_pct: 0.1, comentario: 'Igual que 2028e; la RAB de gas del plan baja a ≈ 2.100 M en 2030 [9].' },
  ],
  // Mercado final: la retribución reconocida del transporte y la regasificación del sector, la base de la cuota del
  // 73,5 % (competencia.cuota_pct). La CNMC la publica hasta 2032 (940,1 M) [23]; 2033-2035 no tienen metodología, así
  // que el periodo es 2032e (no el último año explícito, 2035e) para no usar una cifra propia.
  mercado_final: { periodo: '2032e', tamano: 940.1 },
  veredicto: 'Sí',
  justificacion: 'Sí: proyectamos −0,3 % anual. El foso es legal (85,5 % de la retribución del transporte y 53,9 % de la regasificación) y el precio lo fija la CNMC hasta 2032 [22, 23]. El crecimiento de 2027 (+1,9 %) es la nueva TRF, ya publicada; después, la RAB se amortiza [9]. La prueba de reinversión no aplica: hasta 2032 el capex queda por debajo de la amortización (desinversión, no «activos ligeros») y el ROIC (4,1 %) no llega al WACC. Cuota: el motor divide los ingresos del grupo, con almacenamiento, GTS y otros (≈ 255 M), entre la retribución del sector en 2032 (940,1 M) [23] y sale un 100,6 %; en el mismo perímetro, Enagás sigue en el 73,5 %.',
};

// ── Textos: la frase del veredicto en «El negocio» (y se acortan «Riesgos» y «Valoración» para seguir en ≤ 650 palabras) ──
const r = d.resumen;
const S = r.sintesis.split('\n\n');
const iN = S.findIndex((t) => t.startsWith('**El negocio.**'));
const iR = S.findIndex((t) => t.startsWith('**Riesgos y catalizadores.**'));
if (iN < 0 || iR < 0) throw new Error('Párrafos de la síntesis no encontrados');
S[iN] += ' ¿Sostiene su calidad el crecimiento proyectado? Sí, porque es casi nulo (−0,3 % anual), sale de la tarifa ya fijada por la CNMC y no pide capital.';
const iV = S.findIndex((t) => t.startsWith('**Valoración.**'));
const tresEtapas = ' Sin DCF en tres etapas: el ROIC no llega al WACC.';
if (iV < 0 || !S[iV].includes(tresEtapas)) throw new Error('No encuentro la frase de las tres etapas');
S[iV] = S[iV].replace(tresEtapas, ''); // ya está en dcf.etapa2
const viejo = 'Catalizadores: resultados de 9M26 a finales de octubre, cobro de 129 M de Castor en el 4T26 y anulación del laudo de GSP en el 1S27.';
if (!S[iR].includes(viejo)) throw new Error('No encuentro los catalizadores');
S[iR] = S[iR].replace(viejo, 'Catalizadores: 9M26 (finales de octubre), cobro de Castor (4T26) y laudo de GSP (1S27).');
r.sintesis = S.join('\n\n');
const palabras = r.sintesis.split(/\s+/).length;
if (palabras > 650) throw new Error(`Síntesis de ${palabras} palabras`);

writeFileSync(new URL('datos-v3.json', dir), JSON.stringify(d, null, 2));
console.log(`datos-v3.json escrito (síntesis: ${palabras} palabras).`);
