# Diario · Tetra Tech (TTEK) · 15-oct-2026

Análisis value completo hecho por un solo agente (fases 2-4 sin subagentes), encargo 9 de la octava hora. Commit de partida: `d101b73`. Inicio 10:17 UTC, fin ≈10:45 UTC. Origen: reserva de la octava hora y escáner «calidad a precio» (agua, medio ambiente e ingeniería; ROIC alto).

## Datos

- Cuentas: `cuentas.mjs --sec TTEK` funcionó con el cierre de finales de septiembre (FY2016-FY2025). BPA y DPA de FY2017-FY2021 sin reexpresar por el split 5:1 de feb-2024: divididos por 5 en `construir-notas.mjs` (acciones ×5).
- No recurrentes dentro del EBITDA sacados de las conciliaciones de las notas anuales (FY2017-FY2025); FY2023 en imágenes: BPA ajustado deducido (≈1,04) del de FY2024 y su crecimiento.
- Precio: cierre del 14-oct-2026 (33,61 USD); 15-oct sin cerrar. BCE 1,1195 → 30,02 EUR por acción (0,1 % de una cartera de 30.000 EUR, muy por debajo del 7 %).
- Consenso de MarketScreener (página uk., slug `TETRA-TECH-INC-11172`); comparables de Stock Analysis; Montrose excluido (301).
- Ficha sectorial: reutilizada `sectores/ingenieria-consultoria-2026-10-15.md` (la hizo Sweco), citada como [P1]. No se escribió ficha propia.

## Decisiones

- DCF sobre ingresos brutos (XBRL); guía y consenso en ingresos netos: se comparan EBITDA y BPA, no ventas. `consenso.base_ebitda: 'NIIF'` porque el EBITDA ajustado de la empresa solo quita no recurrentes, como el motor.
- FY2026e fijo (−6,8 %, margen 12,9 %): 9M publicados + 4T de la guía. WACC 9,56 % (rf 5,19 %, beta 0,90, ERP 5,5 %). g = 3,0 %.
- Puente a 28-jun-2026: deuda 810 M (convertibles 575 + banco 235), caja 230,8, earn-outs −114 M como deuda.
- 12 meses: FY2028e; BPA 1,57 / 1,90 / 2,08. Historia adelantada con BPA ajustado de la empresa, incluido FY2026 (cerrado el 27-sep: 32,95 / 1,76).
- Sostenibilidad «Sí» (el motor también): orgánico del 8 % sin USAID ni catástrofes, cuota del 2,9 % al 3,0 %, compras ya pagadas y sin compras nuevas en la proyección.
- Recomendación Mantener, convicción Baja (la del motor: regla absoluta Vender, relativa Mantener): +19,2 % a 12 meses, pero el valor intrínseco (28,27) queda un 16 % bajo el precio.
- IA: exposición Media, sentido Mixto (52 % por horas o costes; 48 % a precio fijo y subiendo; trabajo de campo y con responsabilidad técnica).

## Comprobaciones

- Controles: 19 de 20 correctos y 1 explicado (crecimiento del BPA desde el FY2025 deprimido).
- `apuntar-12m.mjs --simular`: TTEK: v3 ponderada 19.2 %, base 19.5 % → Mantener (v2: 12.1 % Mantener).
- `robustez.mjs`: SÓLIDA; acción robusta No mantener (V1: valor intrínseco −16 %; D6 explicado como rebote; D3 solo aviso de `precios.json`).

## Línea 12 meses

TTEK · v3 +19,2 % / base +19,5 % · v2 +12,1 % / +8,8 % · objetivo 39,81 USD · Mantener (VI 28,27) · calidad Sí (ROIC − WACC 6,9 pt) · SÓLIDA, No mantener · próximos resultados ≈18-nov-2026.

## Lecciones

- Ejercicios que cierran en septiembre con el año ya terminado pero sin publicar (FY2026 cerrado el 27-sep): el primer año del DCF va `fijo` con 9M + guía del 4T, y la historia de PER adelantada debe incluir el cierre de ese ejercicio (con nuestro BPA del siguiente); si no, la mediana y el mínimo salen más altos.
- Empresas que publican «ingresos netos de subcontratas»: el XBRL da los brutos y el consenso los netos. Dejar `ingresos` del consenso en `null` y comparar EBITDA y BPA; si no, EV/Ventas y la diferencia con el consenso salen falsos.
- Splits recientes: el XBRL de la SEC reexpresa solo los años de los últimos 10-K (aquí FY2022+); los anteriores hay que dividirlos a mano.
