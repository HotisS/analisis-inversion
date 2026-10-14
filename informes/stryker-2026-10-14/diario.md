# Diario · Stryker (SYK) · 14-oct-2026

- Commit de partida: 0dfc8f4 (Seguimiento: regenerado). Sin `git pull` ni commits (encargo de la 7ª hora: los hace el coordinador).
- Entorno: nube de Claude Code con red abierta. Un solo analista, sin subagentes: notas A-E escritas por `notas/construir-notas.mjs` (fuentes en `notas/fuentes.mjs`), parte propia en `notas/propio.mjs` + `notas/textos.mjs`.
- Fecha de corte 2026-10-14; USD; ejercicio natural; US GAAP. Precio 281,62 USD, cierre del 14-oct (bolsa.mjs, sesión cerrada a las 16:45 ET). Una acción = 251,56 EUR (BCE 1,1195): 0,8 % de una cartera de 30.000 EUR.
- Cuentas: `cuentas.mjs --sec SYK` (10 ejercicios). Comprobado contra la nota de deuda del 10-K: **la deuda del XBRL no sumaba el vencimiento corriente** (2025: 14.859 frente a 15.859 del 10-K); corregida con `DebtCurrent` en todos los años (2021-2025 cuadran con la tabla de 5 años del 10-K). Patrimonio de 2019-2025 del 10-K (el XBRL solo lo da hasta 2018). Proveedores de `AccountsPayableTradeCurrent`. Arrendamientos operativos (US GAAP): fuera del puente. La amortización del XBRL (DepreciationDepletionAndAmortization) sí incluye la de intangibles (732 M en 2025). Deterioros («Goodwill and other impairments») en no recurrentes del EBITDA.
- Puente a 30-jun-2026: deuda 14.942 (incluye 250 de papel comercial), caja e inversiones 3.476, contraprestación contingente 756 en `otros_ajustes`. CMR Surgical (≈400 M, anunciada el 12-oct) sin cerrar: fuera.
- Decisiones: BPA AJUSTADO de la empresa para el objetivo a 12 meses, la historia del PER (adelantada y al cierre, de las notas de resultados 2017-2025) y los comparables, como en Edwards y Alcon; la cuenta en contable. DCF solo orgánico (8,5 % → 5 %), EBITDA contable sin deterioros (resta reestructuración e integración), WACC 9,27 % con el bono al 5,21 %. Pesos DCF 40 / comparables 20 / escenarios 40. Comparables reutilizados de Edwards, Intuitive y Straumann (repositorio). Sostenibilidad «Sí» con la prueba a mano (el motor no la hace: reinversión del 6 % del NOPAT por la amortización de intangibles).
- Resultado: DCF 248,23 (−11,9 %); valor intrínseco 241,89 (−14,1 %); con la prima del mercado 283,90. DCF inverso: 10,2 % anual 2027e-2032e frente a 7,0 %. ROIC publicado 11,2 % frente a WACC 9,27 % (1,9 puntos); sin fondo de comercio 27,7 %. Calidad: En parte.
- **Línea 12 m (v3 ×1,1, selector: decide v3)**: objetivo 350,47 USD, ponderada +25,6 %, base +22,1 %; v2 +15,2 % / +11,1 %. **Mantener**, convicción baja (absoluta Vender, relativa Mantener). Comprar < 241,89; vender > 393,33. Detalle en revision-12m-2026-10-14.md.
- Robustez (`robustez.mjs`, sin escribir): SÓLIDA, acción robusta Mantener. D6 CONFIANZA (29 % anual desde el BPA contable 8,40): es diferencia de base, en ajustado el crecimiento es del 10,1 % anual; D3 AVISO (SYK aún no está en precios.json: falta el símbolo en `verticales/empresa/simbolos.json`, lo añade el coordinador).
- Word y PDF (soffice): 16 de 17 controles y 1 explicado (crecimiento del BPA por la base). Cobertura 89,4 %.
- Próximos resultados: 3T26 el 29-oct-2026.
- Ficha sectorial nueva: `sectores/medtech-ortopedia-2026-10-14.md` y su JSON de comparables.
- Tiempo: unos 50 minutos de reloj.

## Lecciones

- `cuentas.mjs --sec` en Stryker: `deuda_financiera` = LongTermDebtNoncurrent + CommercialPaper, sin `DebtCurrent` (el concepto que usa Stryker para el vencimiento corriente, no LongTermDebtCurrent): sumar `DebtCurrent` del companyfacts. El patrimonio desaparece desde 2019 (la empresa deja de etiquetar StockholdersEquity en el 10-K): sacarlo de pasivo + patrimonio menos pasivo.
- Con BPA ajustado en el objetivo y contable en la cuenta, el control del motor y D6 de `robustez.mjs` marcan un crecimiento falso (29 % anual) en compradores en serie con amortización de intangibles e impuestos raros: explicarlo en `controles_explicados` y en la entrega (pendiente de herramienta ya apuntado en METODO-VIGENTE).
- En propio.mjs, no declarar `catalizadores: T.catalizadores ?? null` después de `...T.secciones`: la clave explícita pisa la de la sección y el informe sale sin riesgos.
