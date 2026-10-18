# Diario · Grupo Aeroméxico · 2026-10-18

- **Inicio:** commit 583cbbe («Precios del 18-oct»), hacia las 16:12 UTC. Análisis value nuevo, sin informe previo y sin subagentes.
- **Símbolo de Yahoo:** AERO (ADS de la NYSE, en USD; 1 ADS = 10 acciones). En la BMV: AERO.MX.
- **Próximos resultados:** 3T26 el **2026-10-19**, tras el cierre, con conferencia el 20-oct. Fuente: nota de la empresa del 30-sep-2026, «Aeromexico Announces Webcast of Third Quarter 2026 Financial Results», copiada en finviz [D18].

## Proceso

1. `cuentas.mjs --sec AERO` falla con «companyfacts sin us-gaap ni ifrs-full»: la SEC solo tiene datos de portada (dei). Las cuentas se sacaron a mano:
   - 2023-2025 del 20-F de 2025;
   - 2022-2024 y 1S25 del folleto 424B1;
   - 2021 del F-1 de mayo de 2024;
   - los trimestres de los 6-K (anexos 99.1 y 99.2).
2. Notas A-D generadas con `notas/construir-notas.mjs`. Sentimiento omitido como hueco tras tres intentos (Stocktwits sin mensajes, Seeking Alpha solo noticias, búsqueda web sin debate en foros).
3. `bolsa.mjs` y `movimiento.mjs AERO`: 15,98 el 16-oct; −27,2 % en el año; −30,2 % desde el máximo; tendencia bajista.

## Decisiones

- **ROIC.** El motor ya usa patrimonio + deuda + arrendamientos − caja (2.199 M de media en 2025). Da un 32,9 % frente a un WACC del 9,78 % (+23,1 puntos).
  - Comprobado por el activo (capital operativo de 2.708 M de media): 26,7 %.
  - A mitad de ciclo, con el 30 % de impuestos: 17,5 %.
  - Los +150 puntos de Yahoo vienen de dividir por un patrimonio negativo (−594 M) y de dejar fuera los arrendamientos. Explicado en `rentabilidad.comentario` y en la síntesis.
- **Capex del DCF con altas de derechos de uso.** En 2025 hubo 854 M de altas más 386 M de inversión propia (23 % de las ventas). El DCF proyecta un 19 % en 2026 que baja al 15,5 %, porque el puente resta los arrendamientos como deuda.
  - Un primer cálculo con capex del 17 % y margen terminal del 26,5 % daba 40,83 USD. Se rehízo con el margen de mitad de ciclo y el capex con aviones arrendados.
- **Margen de mitad de ciclo** del 25,5 % desde 2031, equivalente a cuatro años al 27,5 % y uno de crisis al 17,5 %.
- **Impuestos:** 20 % en 2026-2028 por las pérdidas fiscales sin reconocer (1.918 M), 25 % en 2029-2030 y 30 % desde 2031.
- **WACC en USD:**
  - tasa libre del 5,10 % (DGS10) más la prima país de México de Damodaran (2,46 %);
  - beta de 1,7: 0,76 desapalancada, reapalancada con deuda y arrendamientos de 1,75 veces la capitalización;
  - peso de la deuda del 60 %;
  - resultado: 9,78 %.
- **Comparables.**
  - EV/EBITDA solo de Copa y LATAM, que aplican NIIF 16. Las de EE. UU. van con US GAAP, con el alquiler dentro del EBITDA.
  - Volaris queda fuera del EV/EBITDA: el margen del proveedor (6,3 %) no es el de sus cuentas.
  - EV/ventas anulado en todas.
  - Los comparables entran solo por PER: 21,49.
- **Objetivo a 12 meses.** Sin historia del PER, la regla cae en la v2: base 7,1x, bajista 6,0x y alcista 9,2x.
- **Recomendación: Mantener / Esperar, aunque la regla da Comprar.** Justificada por:
  - la regla 13: «retrasa» hasta el convenio de los pilotos;
  - la acción robusta Esperar;
  - M2: sin historia.

## Resultado

- **Señal:** la regla del motor da Comprar; el análisis da Mantener.
- **Rentabilidad a 12 meses:** ponderada +20,4 % y base +15,1 %. Igual en v3 y en v2.
- **Valor:** valor intrínseco 22,65 USD; DCF 23,34; ROIC − WACC +23,1.
- **Sostenibilidad:** «Sí».
- **Robustez:** SÓLIDA.
  - Acción vigente Comprar; acción robusta **Esperar**.
  - Límite robusto 14,78 USD; límite con el objetivo fijo 16,42.
  - Colchón de BPA: 3 % para Comprar y 9 % para mantener.

## Línea a 12 meses (para `apuntar-12m.mjs`; solo se ha simulado)

`AERO: v2 ponderada 20.4 %, base 15.1 % → Comprar (v2: 20.4 % Comprar)`. El informe recomienda Mantener por la regla 13; comprar por debajo de 14,78 con el convenio de pilotos firmado.

## Lecciones nuevas (para que las pase quien mantiene `lecciones*.md`)

1. **`cuentas.mjs --sec` y los emisores extranjeros recién cotizados.** Con un primer 20-F, la API companyfacts de la SEC puede tener solo datos de portada (dei) y la herramienta falla con «companyfacts sin us-gaap ni ifrs-full». Las cuentas salen a mano del 20-F, del folleto y del F-1.
2. **Formularios 3/4 de emisores extranjeros.** Desde marzo de 2026 los consejeros y directivos de los emisores extranjeros presentan Form 3/4. `form4.mjs` funciona con ellos (aquí: Tricio compra 1,32 M; Murray vende 2,01 M).
3. **ROIC tras un Chapter 11 con patrimonio negativo.** El ROIC del motor no se infla, porque suma deuda y arrendamientos; los filtros que dividen por el patrimonio sí. Conviene comprobarlo por el activo (inmovilizado con derechos de uso + intangibles + circulante − anticipos de clientes − programas de puntos) y dar también una cifra de mitad de ciclo.
4. **Capex de aerolíneas con NIIF 16.** Si el puente resta los arrendamientos, el capex del DCF debe incluir las altas de derechos de uso (aviones nuevos arrendados). Con solo la inversión propia, el DCF casi se duplica.
5. **EV/EBITDA de aerolíneas.** Las de EE. UU. (US GAAP) y las NIIF 16 no son comparables. Se usa el PER, o el EV/EBITDA solo entre las que aplican NIIF 16.
6. **Sin historia del PER (salida a bolsa reciente):** la regla cae en la v2 con base = PER actual, y robustez marca M2. Hay que tratarlo como motivo para esperar.

## Pendiente

- Resultados del 3T26 (19-oct): revisar el margen operativo frente a la guía del 14-17 % y el BPA de 2027.
- Negociación con ASPA: la prórroga del emplazamiento vence a mediados de noviembre.
- Junta del 26-oct: votación de la recompra de hasta 100 M al año.
- Sin ISIN en los documentos leídos.
- Sin sentimiento de foros.
- Consenso de MarketScreener incoherente: su BPA no cuadra con su beneficio neto.
