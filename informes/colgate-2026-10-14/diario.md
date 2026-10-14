# Diario · Colgate-Palmolive (CL) · 14-oct-2026

- Commit de partida: 96aaea5 (Seguimiento: regenerado). Sin `git pull` (encargo del coordinador: otros análisis en la misma copia).
- Entorno: nube de Claude Code con red abierta. Sin subagentes: notas A-E escritas por mí con `notas/construir-notas.mjs`; `propio.mjs` + `supuestos.mjs` + `textos.mjs`.
- Fuentes: XBRL de la SEC (`cuentas.mjs --sec CL`), 10-K 2017/2019/2021/2023/2025, 10-Q 1T25-2T26, notas de resultados 4T25 y 2T26, proxy 2026, 8-K de la junta y de cambios en el consejo, Form 4 (`form4.mjs`), Yahoo (bolsa.mjs y consenso/comparables con `herramientas/yahoo.mjs`), FRED DGS10 5,21 % (13-oct), Damodaran (ERP 4,20 %, betas de Household Products), comunicados de Kimberly-Clark/Kenvue y Church & Dwight/Touchland, Reuters (venta de marcas). Foros: RSS de Seeking Alpha y API de Stocktwits.
- Fecha de corte 2026-10-14; USD; ejercicio natural; US GAAP. Precio 92,78 (cierre del 14-oct). Una acción = 83,16 EUR (1,1157 USD/EUR): 0,3 % de una cartera de 30.000 EUR.
- Decisiones:
  - Cuenta 2019-2025 (segmentación por producto vigente). `no_recurrentes_en_ebitda` de las conciliaciones no GAAP (2025: 1.040 M; deterioros de skin health 919 M).
  - BPA de la regla a 12 meses = BPA base («Base Business») publicado, el mismo del consenso; historia 2016-2025 de los 10-K. Reestructuraciones casi anuales: el DCF descuenta 0,2-0,3 p. de margen.
  - Deuda: `cuentas.mjs` suma largo + corriente; el papel comercial ya va dentro del largo (Colgate lo clasifica así) y solo faltan los pagarés a corto (2-8 M): comprobado en la nota 6 del 10-K (7.988 M a dic-25) y en el 10-Q (7.857 M a jun-26). La amortización del XBRL (630 M) incluye la de intangibles (78 M).
  - DPA 2024 corregido a 2,00 (el XBRL da 2,48 por un dividendo declarado de más en el año).
  - Arrendamientos operativos (566 M) fuera de deuda y puente (US GAAP). Pensiones netas de impuestos 988 M. Minoritarios a 25 × su beneficio (3.125 M; la filial india cotizada).
  - ROIC sobre capital invertido financiero (deuda + patrimonio + minoritarios − caja): 44,4 % en 2025; sobre capital operativo bruto ≈30 %. Patrimonio casi nulo por 28.931 M de autocartera; ROE sin sentido.
  - WACC 8,19 %: Tesoro 5,21 %, beta 0,68 (media de 0,55 ajustada y 0,80 sectorial reapalancada), prima 5 %, deuda 9,6 %. Terminal 3,0 %.
  - Sostenibilidad «Sí» (3,5 % de crecimiento, reinversión 2 % del NOPAT, poder de precios 2022-23); sin rebaja del base.
  - Comparables: 10 de Yahoo con PER de 12 meses en BPA ajustado (mediana 16,5); Kenvue fuera por la oferta de Kimberly-Clark.
  - Ficha sectorial de higiene y cosmética (sectores/higiene-cosmetica-2026-10-14.md) aún no existía al llegar a comparables: no reutilizada.
- Resultado: DCF 72,50; valor intrínseco 70,51 (−24,0 %); con la prima del mercado 77,47. DCF inverso: crecimiento 8,0 % frente a 3,3 %; rentabilidad implícita 7,2 %. Controles 18 de 18. Cobertura 88,5 % (40 páginas).
- **Línea 12 m (v3, selector sin marcas)**: objetivo 96,05 USD; ponderada +5,8 %, base +10,7 % → **Mantener**, convicción media; v2 +6,9 % / +7,0 %. Comprar < 70,51; vender > 109,05. Robustez SÓLIDA, acción robusta «No mantener» (no pasa el filtro de mantener). Detalle en revision-12m-2026-10-14.md.
- Confianza de los datos: alta (cuentas de la SEC); media en sector (estudios de mercado por sus notas de prensa) y consenso (un solo proveedor).
- Pendiente: añadir CL a `verticales/empresa/simbolos.json` (aviso D3; archivo compartido, lo hace el coordinador). Próximos resultados 3T26: 30-oct-2026 (estimado).
- Tiempo: ≈45 minutos (20:20-21:05 UTC).

## Lecciones

- SEC: `curl` a `www.sec.gov` con el User-Agent sin contacto da 403, pero los índices `…/<acceso>/index.json` responden con un User-Agent que lleve una dirección de contacto genérica; `descargar.mjs` baja los documentos sin problema.
- En Colgate (y en general en US GAAP) el papel comercial va dentro de la deuda a largo: el aviso de `cuentas.mjs` de «falta CommercialPaper» es un falso positivo si la nota de deuda lo incluye; comprobar la nota antes de sumarlo.
- El XBRL `CommonStockDividendsPerShareDeclared` puede traer cinco dividendos en un año (Colgate 2024: 2,48): mirar el DPA trimestral.
- Con el Tesoro al 5,2 %, los defensivos de calidad sin crecimiento (Colgate) salen con el DCF bajo el precio aunque el BPA coincida con el consenso; la regla a 12 meses los deja en Mantener por el múltiplo histórico.
