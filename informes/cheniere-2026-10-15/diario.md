# Diario · Cheniere Energy (LNG) · 15-oct-2026

- Commit de partida: 70ba47e. Encargo del coordinador (megatendencia energía: GNL con contratos largos, seguridad energética de Europa y Asia, demanda eléctrica de la IA). Sin subagentes, sin commits ni escrituras fuera de la carpeta.
- Entorno: nube. Cuentas 2016-2025 del XBRL de la SEC (`cuentas.mjs --sec LNG`, CIK 3570), comprobadas con el 10-K 2025 y las notas de resultados 3T25-2T26; 10-Q del 2T26; proxy 2026 y 8-K de la junta; Form 4 (`form4.mjs`). Precio y cierres con `bolsa.mjs` (cierre del 14-oct, 279,69 USD; la sesión del 15 no había cerrado a las 16:40 UTC). CQP con `bolsa.mjs` (62,26). Tasa libre FRED DGS10 5,21 % (curl). Sin ficha sectorial previa de GNL (no se escribe en `sectores/` por el encargo).
- Decisiones: los derivados de los contratos IPM (cambios de valor sin caja, miles de millones al año) van en `no_recurrentes_en_ebitda` (2018-2023 con el concepto XBRL de derivados no designados, que cuadra con el EBITDA ajustado ±6 %; 2024-2025 de las notas). BPA de la regla = ajustado sin derivados; 2018-2025 estimado (GAAP − derivados × 0,71; comprobado con el 1S25: 1.327 frente a 1.292 publicado). EBITDA con los pagos en acciones como gasto. DCF consolidado y minoritarios de CQP a mercado (51,4 % × 484,05 M × 62,26 = 15.490 M). Deuda 24.257 + arrendamientos financieros 1.413 (los operativos, dentro del EBITDA). Beta 0,9 (la regresión da 0,04-0,38: se mueve con el gas). Incluida la fase 1 de la ampliación de Sabine Pass (EPC firmado, FID pendiente); no el resto. Comparables a peso 0. Consenso de BPA anual descartado (otra base).
- Resultado: DCF 223,96; valor intrínseco 222,90 (−20,3 %); DCF inverso 5,9 % (base 3,6 %); con la prima del mercado 283,85-284,97. ROIC 13,61 − WACC 8,65 = 4,96 (no llega a 5). Sostenibilidad Sí (analista y motor).
- **Línea 12 m (v3 ×1,1, selector sin marcas)**: objetivo 234,02 USD, ponderada −15,6 %, base −6,6 % → **Vender**, convicción baja (absoluta Vender, relativa Mantener). v2 −30,2 %. Comprar < 205,37; vender > 262,42; límite robusto 169,90. Robustez SÓLIDA: acción robusta «No mantener» (no comprar). BPA −10 %: −23,9 %. Variante sin doble castigo del bajista: −8,9 % (Mantener).
- Regla 13: veredicto «no cambia» (tendencia alcista, a un 6 % de máximos; sin colocaciones ni ampliaciones; ventas de directivos en marzo). Próximos resultados: 29-oct-2026.
- Word y PDF (soffice): 20 de 21 controles correctos y 1 explicado.
- Tiempo: unos 75 minutos.

## Lecciones (para integrar)

- Empresas con contratos de materias primas valorados como derivados (Cheniere, IPM): el XBRL `DerivativeInstrumentsNotDesignatedAsHedgingInstrumentsGainLossNet` da la serie larga para llevarla a `no_recurrentes_en_ebitda` (signo: ganancia = negativo); el BPA ajustado histórico se estima con un factor de impuestos y minoritarios comprobado con un semestre publicado.
- El BPA anual de consenso de Stock Analysis puede estar en otra base (LNG: 23,16 frente a ≈15,6 ajustado): contrastarlo con el trimestral (TipRanks) antes de usarlo.
- Filiales cotizadas con minoritarios mayoritarios (CQP 51,4 %): DCF consolidado y minoritarios a mercado en el puente; precio de la filial con `bolsa.mjs` al mismo cierre.
- `robustez.mjs --actual` sin escribir `precios.json` da el aviso D3 (no puede comprobar el precio): normal en encargos que no tocan archivos comunes.
