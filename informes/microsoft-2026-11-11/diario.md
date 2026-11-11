# Diario: Microsoft (MSFT), corte 2026-11-11

- Commit de partida: `dab0510 Precios del escáner 11-nov`.
- Inicio: 11:47 (hora de Madrid). Petición de Hotis del 11-nov 11:47: «actualiza microsoft». Iteración nueva (anterior: `informes/microsoft-2026-10-08`, v3 Mantener).
- Precio: cierre del 10-nov-2026 (Nasdaq aún cerrado a la hora de corte).

## Fase 1. Identificación (11:47-11:55)
- Microsoft Corporation, MSFT (Nasdaq), ISIN US5949181045, CIK 789019. USD, US GAAP, ejercicio a 30 de junio, etiqueta «fin».
- 11:52 cuentas.mjs --sec MSFT: FY2017-FY2026 en notas/cuentas-xbrl.json. Notas del 8-oct copiadas a notas/previo/ como punto de partida (cada dato se vuelve a comprobar).
- 11:54 E termina: tono Dividido, estable; tema principal el lanzamiento de herramientas ofimáticas de Anthropic (10-nov) y el capex de IA. Reddit bloqueado.
- 11:56 A termina: 1T27 ventas 92.279 M (+19 %), EBITDA 57.659 M (62,5 %), BPA 4,92 (4,89 sin OpenAI); LTM sep-26 ventas 346.445 M, BPA 19,16; capex 1T27 45.200 M con arrendamientos financieros; guía 2T27 96.000-97.100 M; bonos nuevos 25.000 M liquidados el 4-nov (hecho posterior al balance); segmentos nuevos con historia reexpresada FY2024-FY2026 (8-K 28-oct). Ingresos de OpenAI 10.000 M en el trimestre (10,8 %). Arrendamientos firmados no iniciados 364.600 M.
- 11:57 C termina: DEF 14A 21-oct-2026, junta 8-dic; CEO FY2026 90,63 M; salen Hoffman, Johnston (Auditoría) y Walmsley; ventas de directivos 102,6 M en 12 meses (72,1 M con 10b5-1), compra de Stanton 2,0 M; Form 144 de Numoto (≈8,7 M).
- 11:58 D termina: precio 533,16 (10-nov); acciones diluidas 7.446,2 M; consenso BPA FY27e 20,01 y FY28e 24,20 (Yahoo); PO medio 634,14 (58 analistas, 53 comprar); bono 4,98 % (Tesoro 10-nov); Damodaran nov 4,41 %; beta 1,03.
- 11:59 B termina: Synergy 3T26 mercado 167.700 M (+55 %), cuotas AWS 26 %, Microsoft 19 %, Google 16 %; serie 2021-2025 cerrada; CMA propone estatus de mercado estratégico (consulta hasta 13-nov); Amazon invierte en OpenAI.
## Integración, cálculo y redacción (11:59-)
- Puente a 30-sep-2026: deuda 35.481, arrendamientos financieros 70.973, caja 64.509, otras inversiones −25.408; OpenAI 97.400 M (135.000 M de referencia de Microsoft al 27 % → 120.000 M al 24 %, menos un 21 % de impuesto latente sobre la plusvalía frente a 12.400 M contables). Bonos del 4-nov sin ajuste (caja y deuda por igual).
- Supuestos: los del v2 del 8-oct con FY2027 al 18,5 % (antes 17,5 %), margen 62 % (antes 61 %), amortización 14 % (antes 14,5 %) y capex 51 % (antes 52 %, por la guía de 170.000 M en el año natural 2026). WACC 10,03 % (tasa libre 4,98 %, beta 1,05, deuda al 5 %, peso 3,2 %). Terminal 3,5 % con etapa de transición de 5 años.
- Resultado: DCF 448,72; valor objetivo 442,95 (−16,9 %); con la prima de mercado de noviembre (4,41 %) 487,28. Regla absoluta Vender, relativa Mantener → Mantener, convicción baja. DCF inverso: 14,3 % frente a 12,6 %, rentabilidad implícita 9,1 %. Sostenibilidad «En parte» (motor «Sí»: financiable 10,4 % + 2 de precio cubre 12,6 %; se mantiene «En parte» por la caída del ROIC y la pérdida de cuota de Azure).
- Controles: 20 de 22 correctos y 2 explicados (terminal 3,5 %, regresión). Síntesis de 648 palabras. Word y PDF (LibreOffice en la nube) de 59 páginas; revisadas como imagen las páginas 1 y 3.
- Revisión a 12 meses (revision-12m-2026-11-11.md): FY2028e, BPA 19,70 / 22,68 / 24,23; PER 18,4 / 27,4 / 28,5; ponderada 570,52 (+7,7 %), base 621,43 (+17,3 %) → Mantener. Apuntada con apuntar-12m.mjs (+ --precios).
- Robustez: SÓLIDA. Si la tienes: Vender (filtro de mantener hasta 521,12; valor intrínseco 17 % bajo el precio). Compra robusta: no. Nivel hoy: ninguno; límites B2 442,95 y C 442,94 (A y B1 imposibles con sostenibilidad «En parte»). Variantes: BPA −10 % −3,0/5,6; precio −5 % 13,4/23,4. Informe anterior al precio de hoy: 10,2 %/17,1 %, B2 413,69.
- simbolos.json apunta a la carpeta nueva; cobertura --arreglar, seguimiento y comprobar (0 errores).
- Fin: 12:05.

## Fallos del sistema
1. El subagente D fechó el 8-K de la reexpresión de segmentos el 4-nov (era el 28-oct; el del 4-nov es el de los bonos): corregido con un parche en bolsa.contexto.noticias.
2. La historia adelantada mete el cierre del último ejercicio (FY2026, en el mínimo de junio) sobre nuestro BPA del año en curso: baja el mínimo de 5 años de 26,5x a 18,4x y con él el bajista. Es la regla, pero mueve la ponderada 3 puntos sin cambio de negocio.
3. En la nube no hay PowerShell: el PDF sale de LibreOffice (soffice --headless --convert-to pdf).
