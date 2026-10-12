# Diario — PLUXEE N.V. (PLX) — corte 2026-10-12

- Inicio: 2026-10-12 11:29 (hora local, París).
- Commit de partida: `05f3d84 Cola reanudada de 3 en 3: SPGI, Amazon y ATOSS en curso; Pro Medicus y Medpace vuelven en la tanda 3`. No se cambia de versión del prompt durante el análisis.
- Procedimiento: `.claude/commands/analiza-empresa.md` + `verticales/empresa/prompt.md` (leído entero) + `lecciones.md` (leído entero).
- En paralelo corren otros dos análisis: solo se escribe en `informes/pluxee-2026-10-12/` y en `%TEMP%`. Sin commit ni push, sin `seguimiento.mjs`, sin tocar `cola.md`, `MEMORIA.md`, `lecciones.md`, `motor/`, `construccion/`, `verticales/`.
- Se copian (no se mueven) los documentos de `informes/pluxee-2026-10-11/notas/docs/` (MFN: 3T FY26, 1S FY26, Chile, página IR). `bolsa.json` se rehace con la fecha de corte nueva.

## Fase 1 — Identificación (11:29-11:35)
- Pluxee N.V. (sociedad neerlandesa, sede operativa en Issy-les-Moulineaux), Euronext París `PLX` (Yahoo `PLX.PA`). Cuentas en EUR, NIIF-UE. Cotiza en EUR: tipo de cambio 1.
- **Ejercicio a 31 de agosto. Etiqueta «fin»**: FY2026 = sep-2025 a ago-2026 (la de la empresa: «Fiscal 2026»). El último ejercicio auditado es el FY2025 (informe anual del 30-oct-2025). FY2026 cerrado pero sin publicar.
- **Próximos resultados: FY2026 el 29-oct-2026** (calendario financiero de la nota del 3T FY26, 3-jul-2026); junta el 17-dic-2026.
- Último dato: 3T FY26 (3-jul-2026): ingresos totales 9 meses 967 M (+2,7 % orgánico), 3T 312 M (−3,3 % orgánico) por el tope del 3,6 % de la tasa de descuento al comercio en Brasil (reforma PAT) y Europa continental. Guía FY26 confirmada: ingresos totales estables en orgánico, ligera mejora orgánica del margen EBITDA recurrente, conversión de caja ≈80 % media FY24-26. Vuelta al crecimiento desde el 2S FY27.
- Sesión de París abierta a las 11:29 del 12-oct: el precio es el **cierre del viernes 9-oct**.
- Riesgo regulatorio Francia: debate de la ley del título restaurante en la Asamblea Nacional el 12-oct-2026.
- Comparable natural: Edenred (informe propio de 7-oct-2026: Comprar, objetivo 42,22 EUR; ahí se decidió la «visión operativa del float»: la caja financiada por clientes no es caja libre).

## Fases 2-4 bis — Subagentes A-E (11:35-11:42)
- Lanzados los cinco en un solo mensaje, en primer plano. Terminaron todos (A 76 llamadas, B 77, C 72, D 74, E 30), con nota completa en disco.
- C corrigió dos premisas del encargo: preside Didier Michaud-Daniel (Executive Chair, cedido por Bellon S.A.), no Sophie Bellon (dominical); el CEO no es consejero. Bellon: 46,16 % del capital y 62,30 % de los votos.
- B: el texto de comisión de la PPL 2892 (n.º 3274, 7-oct) añade el art. L.3262-1-3, que permite topar por decreto la comisión al comercio; el pleno empieza el 12-oct sin texto adoptado a la hora de corte.
- A y D llegaron a lo mismo con el flotante: de la caja neta publicada de 1.270 M (feb-26), 2.102 M son caja de clientes no restringida; caja propia 458 M; deuda neta operativa 832 M (875 ajustada).

## Integración y cálculo (11:43-12:00)
- Criterio del flotante = visión operativa, como en Edenred: puente con caja 458 M; ingresos del flotante dentro del EBITDA; circulante del DCF sin flotante (−27 % de las ventas). Para que el motor parta del circulante correcto, se parchean en `propio` las cuentas a cobrar de FY2023-25 (sin las ligadas al flotante) y la caja de FY2023-25 (solo la propia): el ROIC pasa de −33 % a 20,2 %.
- Otros gastos operativos de FY2025 y LTM (21-26 M) se dejan como recurrentes (lección: lo que se repite no es no recurrente) y el consenso va como «ajustado» con un 2,0 % de las ventas.
- Minoritarios a 10x su beneficio (210 M frente a 97 contables). `ltm.fcf` a null (el FCF publicado mezcla el flotante).
- Primer DCF (prima adicional 1,0, margen hasta 36,2 %): 29,73 EUR (+105 %). Revisado por la regla del 30 %: prima adicional a 2,0 (38 % de ingresos en Latinoamérica más Turquía) y margen plano en el 35 % (el rendimiento del flotante bajará). DCF final 24,43 (+68,6 %), WACC 8,94 %, VT 66 %.
- DCF inverso: crecimiento −1,4 % (base 3,7 %), margen 26,4 % (base 35,0 %), rentabilidad implícita 11,8 %.
- Objetivo 22,02 (+52,0 %), RT 12 m +54,6 %, escenarios 11,01 / 24,43 / 29,88 (−24,0 % / +106,2 %), asimetría 4,42x. Relativa: 26,49 (+82,8 %). Comprar; convicción sugerida Alta, se pone Media por el riesgo binario de la ley francesa (pleno 12-oct) y por la dependencia del criterio del flotante.
- Sostenibilidad: En parte (reinversión neta −103 M, cuota implícita 21,1 % frente a 25 %; mercado en ingresos equivalentes, estimación propia).
- Controles: 18 correctos y 3 explicados (tipo impositivo FY2023 y FY2024, comparables frágiles). Word de 61 páginas y 27 gráficos, cobertura 92,1 %; PDF generado; revisadas como imagen las páginas 1 y 3.
- Omitidos: múltiplos históricos (solo dos cierres de ejercicio desde la salida a bolsa: el motor necesita tres) y suma de partes (no aplica).

## Revisión de comité (resumen)
1. Convergencia: el precio pide un 11,8 % anual con cifras que coinciden con el consenso (EBITDA −1,2 % a +1,5 %); el catalizador es la ley francesa y la guía de FY2027 del 29-oct.
3. Supuesto más agresivo: crecimiento del 5-5,5 % en FY2028e-FY2030e con precio +1,5-2 %, tras tres topes regulatorios.
8. Bajista −24 %: tope francés + segunda ronda en Brasil + tipos; queda por encima del mínimo de 52 semanas.
9. Dato crítico: el criterio del flotante (≈15 EUR por acción de diferencia en el puente) y el rendimiento del flotante (−2,3 EUR por cada 100 pb).

## Lecciones nuevas
- **Flotante y motor**: con la visión operativa no basta con el puente; hay que limpiar también el balance histórico (caja propia y cuentas a cobrar sin las del flotante), porque el motor parte del circulante del último balance y calcula el ROIC con esa caja. Sin ello, el circulante salía en +72 % de las ventas y el ROIC en −33 %. Mismo fallo de sistema que en Edenred (falta un campo `float` en el motor).
- **Múltiplos históricos con menos de tres ejercicios cotizados** (escisiones recientes): el motor omite la sección; regístralo sin buscar más.
- **Subagente C y encargos con nombres**: no pongas en el encargo nombres de cargos que no hayas comprobado (presidenta de Pluxee); C lo corrigió, pero pudo contaminar la nota.
