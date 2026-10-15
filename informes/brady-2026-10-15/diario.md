# Diario · Brady (BRC) · 15-oct-2026

- Commit de partida: `d5a9b2c` (Seguimiento: regenerado). Origen: escáner «calidad a precio».
- Tiempos: inicio ≈10:04 UTC; cuentas, documentos y notas hasta ≈10:15; supuestos, textos y motor hasta ≈10:22; Word, PDF y robustez a las 10:25 (con la pausa de contexto, ≈25 minutos de trabajo efectivo registrados por el reloj de la máquina).

## Decisiones

- Base de BPA: el ajustado de la empresa (sin amortización de intangibles comprados ni no recurrentes) para la historia, la proyección y el consenso. La amortización de los intangibles de PSS aún no se conoce (sin asignación del precio) y el GAAP de FY2027-28 estaría deformado.
- FY2027e fijo (+74,2 %): es el perímetro de PSS (cerrada el 3-ago-2026, ≈1.150 M de ventas según la guía), no crecimiento; los escenarios mueven desde FY2028e.
- Circulante al 13,7 % de las ventas: el de PSS se pagó en el precio que ya resta el puente; al 22,7 % el DCF lo cobraría dos veces.
- Puente: deuda y caja al 31-jul-2026 + 1.400 M del precio de PSS en `otros_ajustes` (hecho posterior al balance).
- EV/EBITDA LTM pro forma con PSS (2.761,6 M de ventas, 483,4 M de EBITDA) para no mezclar un EV con PSS y un EBITDA sin PSS.
- Pesos: DCF 50, comparables 20, escenarios 30; transacciones 0 (control familiar: no hay prima de control posible).
- Ficha sectorial nueva: `sectores/identificacion-industrial-2026-10-15.md` (+ JSON de comparables). Ni equipos de seguridad ni distribución industrial encajan con el perímetro de etiquetas y terminales.
- Recomendación: **Mantener**, convicción media, frente al Comprar de la regla (v3 17,1 % / 13,0 %): calidad «En parte» (ROIC pro forma ≈12 % frente a un WACC de 9,1 %; sostenibilidad En parte), colchón de BPA del 1 %, CEO nuevo e integración de PSS. La acción robusta coincide: Mantener en cartera.

## Línea a 12 meses

BRC · 2026-10-14 · 83,65 USD · FY2028e BPA 5,89 / 7,14 / 7,81 · PER 10,5 / 13,1 / 17,8 · objetivo 96,98 · v3 17,1 % / 13,0 % (Comprar por la regla) · v2 15,5 % / 12,1 % · valor intrínseco 101,73 (+21,6 %) · comprar < 84,38 · vender > 108,85 · próximos resultados 17-nov-2026 (1T FY2027).

Una acción ≈ 74,55 EUR (EUR/USD 1,122): el 0,25 % de una cartera de 30.000 EUR, muy por debajo del 7 %.

## Pendiente para el coordinador

- Añadir BRC a `simbolos.json` si no está (el escáner y `precios.mjs`), y ejecutar `apuntar-12m.mjs` (sin `--simular`) y `seguimiento.mjs`. Aquí solo se simuló: «v3 ponderada 17,1 %, base 13 % → Comprar (v2: 15,5 % Comprar)».
- Robustez D3: no hay cierre de BRC en `precios.json`.

## Lecciones

- El XBRL de Brady no trae BPA (dos clases de acciones con la misma participación económica): calcular beneficio neto ÷ acciones diluidas o tomarlo de la nota de resultados.
- El patrimonio del XBRL de FY2018-FY2020 sale mal (no cuadra activo = pasivo + patrimonio): usar activo − pasivo.
- Compra grande cerrada después del balance: el EV de mercado ya la incluye, así que el EV/EBITDA LTM debe ser pro forma (sumar las ventas y el EBITDA publicados de lo comprado) y el precio pagado va al puente; el circulante comprado no debe volver a cobrarse en el primer año del DCF.
- Salto de perímetro de un año: marcar ese año como `fijo` para que ni los escenarios ni el DCF inverso lo traten como crecimiento orgánico. Aun así, la sostenibilidad del motor compara el crecimiento proyectado con compras (15,6 %) con el histórico (4,5 %) y da «En parte».
- La prueba D6 de robustez compara el BPA ajustado proyectado con el GAAP de `financieros.cuenta`: con amortización de intangibles grande, el salto parece mayor (29 % frente a 16 % en la misma base).
