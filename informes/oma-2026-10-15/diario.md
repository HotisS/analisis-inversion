# Diario · Grupo Aeroportuario del Centro Norte (OMA B; ADS OMAB) · 15-oct-2026

## Partida y entorno

- Commit de partida: fab7def. Sin pull ni commits propios (los hace el coordinador).
- Origen: escáner «calidad a precio» (ROIC alto, márgenes altos, deuda baja). Encargo 9.
- Entorno: nube de Claude Code con red. Sin subagentes:
  - las notas A-E las escribe `notas/construir-notas.mjs`;
  - la parte propia está en `propio.mjs`, `supuestos.mjs` y `textos.mjs`;
  - los temporales, en `notas/tmp/`.

## Documentos y cuentas

- Documentos en `notas/docs` (EDGAR, CIK 1378239):
  - 20-F de 2025, 2022 y 2019;
  - 6-K de los resultados del 4T25 y el 2T26 (las tablas son imágenes y se leyeron a mano);
  - 6-K de tráfico de junio a septiembre de 2026, de la emisión de julio, de la junta de abril y del cambio de auditor a EY (13-oct);
  - informes de Ve por Más del 1T26 y el 2T26;
  - transcripción de la llamada del 2T26;
  - bono a 10 años de México en FRED/OCDE;
  - Stocktwits y Seeking Alpha.
- Cuentas: XBRL con `cuentas.mjs --sec OMAB` para 2015-2024, completado con los 20-F.

## Ficha sectorial

- **Nueva**: `sectores/aeropuertos-2026-10-15.md`, más `-comparables.json`.
- La de infraestructuras y concesiones es de autopistas y no encaja: allí no hay una tarifa máxima por quinquenios con plan maestro ni la dependencia de las aerolíneas.

## Corte, divisa y precio

- Fecha de corte: 2026-10-15. MXN, ejercicio natural.
- Precio: cierre del 14-oct, 204,78 MXN.
  - Una acción = 9,96 EUR (BCE: EUR/MXN 20,56), un 0,03 % de una cartera de 30.000 EUR, lejos del 7 %.
  - ADS (8 acciones B) = 1.638,24 MXN ≈ 88,7 USD.

## Decisiones de datos

- **CINIIF 12**: ingresos = aeronáuticos + no aeronáuticos, sin los ingresos ni los costes de construcción (que son iguales).
- **EBITDA del informe**: va después de la provisión de mantenimiento mayor, así que queda por debajo del «EBITDA ajustado» de la empresa (74-75 %).
- **Capex**: mejoras en la concesión más compra de inmovilizado.
- **Deuda**: el «Borrowings» del XBRL no incluye la deuda bancaria a corto. Fijada a mano en 2021, 2022, 2024 y 2025 desde los 20-F.
- **Arrendamientos de 2019-2022**: sacados de los 20-F.
- **Puente a 30-jun-26**:
  - deuda 14.130,6; caja 2.577,4; minoritarios 183,5; pensiones 149,4;
  - la provisión de mantenimiento mayor (2.912,4) va como deuda en `otros_ajustes`, porque es una obligación de la concesión.
- **Consenso**: sus ingresos incluyen construcción, así que van a null. Su EBITDA ajustado se pasa a base NIIF restándole la provisión estimada.
- **WACC 13,33 %**: bono MX 10 años 9,16 %, beta 1,07, prima 5 %, Kd 9,5 %, deuda al 15 %.
- **Terminal**: Gordon al 0,5 %, porque la concesión vence en 2048. Una anualidad de 13 años equivale a crecer ≈0 %; el medio punto es la opción de prórroga.
- **Riesgo IA**: exposición Baja, sentido Neutral, efecto en valor de 0 % a +2 %.
- Calidad: veredicto Sí.

## Resultado

- **Valoración a largo plazo**:
  - DCF: 108,73 (−46,9 %), con el terminal en el 43 % del valor.
  - Valor intrínseco: 143,08 (−30,1 %); con la prima del mercado, 151,33.
  - DCF inverso: el precio exige crecer un 14,5 % (frente al 6,2 % del caso base) o supone una rentabilidad implícita del 8,8 %.
  - Lectura: el mercado valora la concesión como si fuera perpetua.
- **Rentabilidad y salud**:
  - ROIC 29,7 % frente a WACC 13,33 % (+16,4 puntos).
  - Altman 4,31; Piotroski 5; Beneish −2,76.
- **Sostenibilidad**: «Sí» tanto el analista como el motor, así que no salta el control. El 6,1 % proyectado está por debajo del 7,6 % financiable.
- **Línea a 12 meses**:
  - Selector → v3 ×1,1 (sin marcas).
  - v3: ponderada 14,9 % (14,8 % en `apuntar-12m --simular`), base 15,9 %.
  - v2: 16,4 % / 15,1 %.
  - Objetivo: 222,70 MXN.
- **Señal**: **Mantener**, convicción media (la que sugiere el motor). No es Comprar porque el valor intrínseco está por debajo del precio y la ponderada se queda 0,1 puntos bajo el 15 %.
  - Comprar por debajo de 143,08; vender por encima de 261,40.
- **Robustez**: SÓLIDA; acción vigente y robusta «No mantener».
  - Avisos: D3 (OMA no está en `precios.json`, que es compartido y no se toca), D7 (BPA de 2028 un 22 % bajo el consenso, por prudencia), V1 y E2 (resultados el 26-oct, fecha estimada).
  - Ningún CORREGIR.
- **Word y PDF**: 42 páginas; cobertura del 82,9 %; 19 de 19 controles.
  - Avisos de gráficos sin datos: vencimientos, mapa de comparables (sin EV/EBITDA ni crecimiento de los próximos 12 meses) y serie del sector.

## Para subir la confianza

- Resultados del 3T26 (26-oct, fecha estimada).
- Tráfico de octubre.
- Cumplimiento de la tarifa máxima.
- Autorización de la fusión Viva-Volaris y rutas que se cierren.
- Calendario de vencimientos de la deuda.
- Calificaciones ESG.
- Cualquier señal sobre una prórroga de la concesión.

## Lecciones

- **Concesionarios con CINIIF 12** (aeropuertos mexicanos, autopistas): quitar los ingresos y costes de construcción de las ventas.
  - El consenso de MarketScreener los incluye, así que sus ingresos no se comparan.
  - Pasar su EBITDA ajustado a la base del informe (después de la provisión de mantenimiento).
  - Los márgenes de los comparables de Yahoo (ASUR, GAP) también los incluyen.
- **XBRL de emisores extranjeros (20-F)**: el concepto «Borrowings» puede excluir la deuda bancaria a corto. Cuadrar la deuda con la nota del 20-F antes de calcular.
- **Concesión con fecha de fin**: el DCF con Gordon al ≈0 % da un valor intrínseco muy por debajo del precio, porque el mercado la valora como perpetua. A 12 meses decide el PER, y la regla impide comprar mientras el valor intrínseco esté por debajo del precio. Decirlo en la síntesis como la tesis en contra.
- **6-K mexicanos**: las tablas de resultados vienen como imágenes JPG. Hay que leerlas a mano; no hay XBRL trimestral.
