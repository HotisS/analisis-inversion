# Diario · Sonova (SOON.SW) · 14-oct-2026

- Commit de partida: bed0cd4. Inicio 18:27 UTC; parada por límite y reanudado 19:53 UTC; terminado ≈ 20:10 UTC. Notas A-E y propio hechos por mí sin subagentes (`notas/construir-notas.mjs` escribe A-E; `propio.mjs` + `supuestos.mjs` + `textos.mjs`), como Kuehne+Nagel y Demant.
- Fecha de corte 2026-10-14; CHF; ejercicio de abril a marzo, etiqueta «fin» (FY2026 = abr-25 a mar-26). Precio 270,40 CHF, cierre del 14-oct (Yahoo, `notas/bolsa.json`). Próximos resultados: semestre 1S FY2027 el 17-nov-2026.
- Fuentes primarias (Suiza no tiene XBRL): informes financieros FY2025/26, FY2024/25 y FY2022/23, informe de gobierno y remuneración 2025/26, presentación y nota de resultados FY2025/26, FY2024/25 y FY2023/24, cifras reexpresadas sin Consumer, semestre 1S FY2025/26, día del inversor (estrategia, 23-mar-2026), EuroTrak/EUHA, BCE (cambios). Consenso y objetivos de MarketScreener (19 analistas). Comparables (8) llevados a CHF.
- **Confianza de los datos: media.** Cuentas completas y cuadradas a mano (sin XBRL). Falta confirmar: margen del primer semestre FY2027 (17-nov), el precio y fecha de cierre de la venta de Consumer Hearing, el efecto de los aranceles de EE. UU. y la remuneración por persona. Sentimiento con pocas fuentes (finanzen.net 404, parqet 403, Stocktwits sin símbolo).
- Decisiones:
  - Actividades continuadas: FY2025 reexpresado y FY2026 sin Consumer Hearing; FY2022-24 publicados con Consumer (la tabla lo dice). Los activos netos en venta (110,7 M) restan en el puente (`otros_ajustes`): Consumer vale ≈ 1,9 CHF por acción, no mueve la tesis.
  - BPA en base normalizada de la empresa (FY2026 10,42), que deja la reestructuración dentro; el «core» nuevo (desde FY2027) daría 10,66. Historia del PER con el normalizado; FY2019-21 con el «ajustado» viejo (algo más alto).
  - Capex 6 % de las ventas: incluye altas de derechos de uso de clínicas y compras pequeñas de clínicas, porque el crecimiento proyectado lleva ≈ 1 punto de compras.
  - WACC 6,46 % (tasa libre suiza 0,54 % + prima 5,5 + 1,0 adicional, beta 1,0). Terminal Gordon 1 %. VT 73 % del valor.
  - OTC y AirPods Pro: riesgo de tecnología con probabilidad baja e impacto alto; afectan al tramo leve, no a la pérdida moderada a profunda con receta y adaptación.
- Resultado: DCF 259,56; valor intrínseco 255,13 (−5,6 %); con la prima implícita del mercado 314,77 (+16,4 %). ROIC 16,7 % frente a WACC 6,46 % (+10,2 puntos); sostenibilidad «Sí» (DCF inverso pide 6,3 % frente al 5,5 % del base). Calidad: Sí (pero ROIC incremental FY22-26 negativo).
- Comparación con Demant (mismo día): Demant ROIC 11,1 % frente a WACC 7,69 %, valor intrínseco −14 %, v3 +11,4 % Mantener, DCF inverso pide 10,5 % frente al 5,8 % del base. Sonova tiene más diferencial de calidad y un precio menos exigente frente a su DCF; las dos quedan en Mantener.
- **Línea 12 m** (apuntar-12m --simular): v3 ponderada 9,7 %, base 17,0 % (17,1 % en el informe, redondeo del dividendo) → Mantener; selector «sin marcas: decide la v3»; v2 9,4 % / 11,7 % Mantener. Objetivo 292,05 CHF. Comprar < 255,13; vender > 329,72.
- **Robustez**: FRÁGIL; acción robusta **No mantener** (9,7 % < 10 % del filtro de mantener; límite 269,68). Cambia con «sin doble castigo» (12,2 % v3; 10,5 % v2 → Mantener en cartera). Aviso D3: SOON no está en `precios.json` (compartido; no se toca).

## Lecciones

- Ejercicio objetivo con cierre a 31 de marzo: la regla (primer ejercicio que cierra más de 18 meses después del corte) da FY2029e para un corte de octubre de 2026 y el PER actual sale con FY2028e, como hizo Daiichi. Alibaba usó FY2028e como objetivo: parece inconsistente con la regla; conviene revisarlo.
- Suiza sin XBRL: las cuentas se teclean del PDF del informe financiero; las URL de Sonova están en /wp-content/uploads/ y se encuentran con `descargar.mjs --lista` (las de /sites/default/files/ dan 404).
- Cuando la empresa cambia de BPA «normalizado» a «core» (Sonova en FY2027), la historia del PER y los casos deben quedar en la misma base; mezclar sube el PER histórico ≈ 2 %.
- Actividades interrumpidas: el CFO publicado incluye el de Consumer; para la conversión de caja, restar el flujo de la actividad en venta o decirlo en el comentario.
- MarketScreener: el id de Sonova es SONOVA-HOLDING-AG-70127 (el 9365136 lleva a la portada).
