# Diario · Constellation Energy (CEG) · 15-oct-2026

Encargo del hilo principal (brief-value.md), sin subagentes, sin commits ni escritura fuera de la carpeta. Commit de partida a2aa204. Foco pedido por Hotis: electricidad (nuclear, contratos con centros de datos, Calpine) y la causa de la caída del 32 % desde máximos.

## Pasos
- Cuentas XBRL 2020-2025 (cuentas.mjs), precios y beta (bolsa), Form 4, comparables por Yahoo, 10-K 2025, 10-Q 2T26, notas de prensa 4T24-2T26, proxy y 8-K.
- Notas A-E con `notas/construir-notas.mjs` (un solo analista); supuestos en `notas/supuestos.mjs`, textos en `notas/textos.mjs`, parte propia en `notas/propio.mjs`.
- integrar → calcular (19/23 controles correctos y 4 explicados) → rellenar (cobertura 90,5 %) → PDF con soffice.
- Robustez (--actual y --bpa-factor 0.9) y apuntar-12m --simular: solo impresión.

## Decisiones contables
- BPA del objetivo: el ajustado de la empresa (operating EPS). El MtM no realizado de las coberturas va a no recurrentes (2021 633; 2022 1.188; 2023 −1.399; 2024 −316; 2025 805).
- Flujo operativo con los cobros de cuentas titulizadas (DPP) que la empresa presenta en inversión (2021 3.902; 2022 4.964; 2023 7.340; 2024 10.217): sin ellos el flujo operativo sale casi nulo o negativo.
- Capex con combustible nuclear; EBITDA = EBIT + amortizaciones del estado de flujos (incluye combustible y actualización de desmantelamiento). Excedente de los fondos de desmantelamiento fuera del puente.
- Puente al 30-jun-2026 con −4.250 M de otros ajustes (cobro neto estimado por las ventas a LS Power menos recompras de julio).

## Causa de la caída (−32 % desde 411,69 el 16-oct-2025)
Compresión del múltiplo de 29x a 21x con el BPA subiendo: intervención política en PJM (16-ene, −9,8 %: subasta de emergencia y topes de capacidad), guía 2026 floja y venta sectorial de marzo, colocación de 11 M de acciones de los vendedores de Calpine (1-jun) y llegada de más papel en septiembre, retrasos de FERC al mecanismo de PJM (30-sep y 12-oct). El contrato con Google (6-oct, +12 %) se devolvió.

## Lecciones (para quien mantenga lecciones.md; aquí por encargo)
- `herramientas/yahoo.mjs`: `json()` devuelve el objeto ya parseado, no `{body}`.
- CEG (y eléctricas con titulización de cuentas): los cobros DPP van en inversión; hay que sumarlos al flujo operativo o el FCF y la conversión salen absurdos.
- MarketScreener por WebFetch solo devuelve la portada; el IR de Constellation y Benzinga dan 403. Consenso: Yahoo y Stock Analysis.
- El gráfico comps_ev necesita EV/EBITDA NTM; con solo LTM se omite (aviso esperado).
