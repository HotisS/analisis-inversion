# Diario · Tyler Technologies (TYL) · 14-oct-2026

- Commit de partida: 209014f. Sin `git pull` ni commits (los hace el coordinador). Trabajo interrumpido por el límite de uso y retomado a las ~19:55 UTC; terminado a las ~20:10 UTC.
- Entorno: nube de Claude Code. Cuentas con `cuentas.mjs --sec TYL` (XBRL 2016-2025); documentos de EDGAR con `descargar.mjs` (10-K 2025, 10-Q 2T26, notas de resultados 4T21-4T25, 1T26 y 2T26, proxy 2026, 8-K de convertibles, recompra, plan 10b5-1 y junta); Form 4 con `form4.mjs --salida`; precio y bolsa con `bolsa.mjs` (cierre del 13-oct, 346,90 USD); bono a 10 años (5,21 %) del informe de Roper; consenso de MarketScreener (23 analistas); sentimiento del RSS de Seeking Alpha y de Stocktwits. Cambio del BCE del 13-oct (1,1188 USD/EUR): una acción = 310,06 EUR (1 % de 30.000 EUR).
- Notas A-E y propio hechos por mí sin subagentes (`notas/construir-notas.mjs` escribe A-E; `propio.mjs` + `supuestos.mjs` + `textos.mjs`).
- Decisiones:
  - BPA normalizado = BAI × 0,77 / acciones diluidas: el tipo efectivo de Tyler va de −11 % a 16 % por las deducciones de los pagos en acciones; se excluye la plusvalía de 25 M de 2025.
  - Selector: desrateada (mediana adelantada 80,4x = 2,3 veces el PER de hoy, 35,7x) → decide la v2: 20,4 % / 20,5 % (v3 sin selector: 32,4 % / 32,7 %). Mantener porque el valor intrínseco (248,39) queda un 28 % bajo el precio.
  - Excluidos del PER 2020-2021 (BPA hundido por la compra de NIC y burbuja de la pandemia).
  - Puente: convertibles 2031 (1.437,5 M) como deuda; caja + inversiones a corto y largo (1.015,3 M); sin arrendamientos (US GAAP).
  - WACC 9,63 % con beta 0,90 (subida desde 0,86 por el riesgo de IA) y coste de la deuda de mercado (5,5 %), no el cupón del 0,5 %.
  - Calidad: ROIC publicado 8,9 % < WACC 9,63 % → no pasa; sin fondo de comercio ~57 %.
  - Sector: ficha corta nueva `sectores/software-2026-10-14.md` (+ `-comparables.json`, solo empresas en USD) con el mapa de riesgo de IA por tipo de software y el análisis del software para gobiernos.
- Robustez: SÓLIDA; acción robusta «No mantener» (V1: valor intrínseco −28 %); sin CORREGIR. Aviso D3: `precios.json` no tiene el cierre de TYL (archivo compartido, no lo toco).
- Pendiente de confirmar: recompras del 3T26 (28-oct), mezcla de ingresos registro/atención (estimación propia ~65/35), objetivos mínimo y máximo de los analistas, años del auditor y rating.

## Lecciones

- En empresas con convertibles a cupón casi nulo (Tyler, 0,5 %), el coste de la deuda del WACC debe ser el de mercado, no el cupón; y la deuda va al puente por su nominal.
- En software con tipo efectivo distorsionado por los pagos en acciones, normalizar el BPA de la historia del PER y del objetivo con un impuesto teórico (BAI × (1 − t)) para que historia y previsión tengan la misma base.
- `form4.mjs` usa `--salida`, no `--json`.
