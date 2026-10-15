# Diario · ADP (Automatic Data Processing) · 15-oct-2026

Commit de partida: `6aa019b Seguimiento: regenerado`. Análisis value hecho sin subagentes (notas A-E y `propio` escritas por el mismo analista), por encargo del coordinador; origen de la idea: escáner «calidad a precio» y cartas de gestores de calidad.

## Pasos y decisiones

- **Cuentas**: `cuentas.mjs --sec ADP` falla con el ejercicio a junio (periodos duplicados a 31-dic y solo 5 años). Serie propia FY2017-FY2026 desde companyfacts de la SEC (`notas/construir-notas.mjs`), comprobada con el 10-K de FY2026.
- **EBIT propio**: BAI + gastos por intereses − intereses de la caja corporativa. Los intereses de los fondos de clientes (1.354,8 M en FY2026) son ingreso de explotación y quedan dentro; la financiación de la estrategia de fondos (papel comercial y repos) también. Los fondos de clientes y sus obligaciones quedan fuera del puente (deuda 4.965,1 M, caja 4.230,1 M).
- **Partidas únicas**: 96,2 M en FY2026 (reorganización 91,1 + litigios 18,0 − reversión 4,5 − plusvalías de ADP Ventures 8,4) y 16,4 M en FY2025.
- **Capex**: inmovilizado + software activado + aumento neto de costes de contratos activados (772,5 M en FY2026).
- **ROIC**: el motor da 67,1 % (129,7 % sin fondo de comercio); a mano, sobre capital operativo (patrimonio + deuda neta, con el flotante excluido): 56,7 %, 43,7 % si se descuenta el ingreso del flotante del NOPAT. El patrimonio es pequeño por las recompras, por eso el cálculo sobre capital operativo.
- **Supuestos**: crecimiento 5,5 % (guía de FY2027 de 5-6 %) que baja al 3,5 %; margen EBITDA 30,2 % → 32,3 %; WACC 9,62 % (beta 0,85); Gordon 3 %.
- **Sostenibilidad**: «Sí» en el análisis y en el motor (sin inversión neta); no salta el control.
- **Calidad**: Sí (ROIC − WACC ≈ 47 puntos a mano, 57,5 con el motor).
- **IA**: exposición Media, sentido Mixto, −10 % de valor en el caso central de riesgo (hasta −27 %).
- Ficha sectorial nueva: `sectores/nominas-rrhh-2026-10-15.md` (la de software cubre la nómina solo de pasada y no trata el flotante ni el PEO).

## Resultado

- DCF 210,32 USD; escenarios 153,54 / 210,32 / 254,40; valor intrínseco 221,23 USD (−21,1 % frente a 280,32 USD del 14-oct). DCF inverso: el precio descuenta un 9,8 % de crecimiento anual o una rentabilidad del 8,0 %.
- Señal: **Mantener**, convicción Media. Comprar por debajo de 221,23 USD; vender por encima de 337,31 USD.
- Revisión a 12 meses (v3 ×1,1, FY2028e): ponderada 8,3 %, base 12,6 %, objetivo 296,94 USD → Mantener (v2: 11,8 % / 10,3 %). Ver `revision-12m-2026-10-15.md`. `apuntar-12m --simular`: «ADP: v3 ponderada 8.3 %, base 12.6 % → Mantener (v2: 11.8 % Mantener)».
- Robustez: SÓLIDA; acción robusta «No mantener» (no comprar). Avisos D3 (sin cierre en `precios.json`), V1 y E2 (resultados el 28-oct-2026).
- Controles: 18 de 19 correctos y 1 explicado (R² de la regresión 0,29). Cobertura del Word 89,8 %.

## Lecciones

- `herramientas/cuentas.mjs` con ejercicios que cierran en junio (ADP, y probablemente Paychex, Microsoft…): mezcla periodos a 31-dic y da solo 5 años; hay que construir la serie desde companyfacts filtrando por `fp: FY` y fechas de fin a 30-jun.
- ADP no publica ingresos trimestrales en el concepto `Revenues` del XBRL (usa `RevenueFromContractWithCustomer…`): mirar los dos.
- Empresas con flotante de clientes (nóminas, brókeres): el ingreso por intereses de los fondos es de explotación y va dentro del EBIT; el ROIC hay que darlo también sin el flotante, porque el capital que lo genera no está en el balance operativo.
