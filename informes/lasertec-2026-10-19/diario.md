# Diario · Lasertec (6920.T) · 19-oct-2026

Subagente del lote de seis análisis value del 19-oct. Commit de partida: `99bd934` («Escáner fuera de hora 19-oct 10:34»). Sin git pull, commit ni push (repo compartido): lo cierra la sesión principal.
Inicio 09:17 UTC; fin ≈ 09:45 UTC de reloj de la máquina (con el corte de contexto intermedio, unos 60 minutos de trabajo real).

## Pasos y fecha de los datos

| Paso | Datos de | Fuente |
|---|---|---|
| Bolsa (`bolsa.mjs --cierre-mes 6 --etiqueta fin`, índice 1305.T, sector 1625.T) | cierre del 19-oct-2026 (39.590 JPY) | Yahoo Finance |
| Movimiento (`movimiento.mjs 6920.T --json`, regla 13) | 19-oct-2026 | Yahoo Finance |
| Cuentas FY2020-FY2026 (J-GAAP) | tanshin del 6-ago-2026 y anteriores; Financial Highlights del 6-ago-2026 | web de IR (feed eir-parts) |
| Trimestres 1T25-4T26 | tanshin 3T (30-abr-2026) y Financial Highlights | web de IR |
| Riesgos, clientes, accionistas | yuho FY2026 (traducción parcial, 15-oct-2026); informe de gobierno 28-sep-2026 | web de IR |
| Junta y votaciones | 25-sep-2026 (informe extraordinario del 28-sep) | web de IR |
| Sector | Market Intelo (10-jun-2026); KLA 10-K FY2026 (6-ago-2026) | web |
| Consenso | MarketScreener, 19-oct-2026; Macquarie 17-oct; Goldman 7-oct | web |
| Tasa libre | JGB 10 años 2,958 % del 16-oct-2026 | MoF (CSV) |
| Prima de mercado | Damodaran, octubre de 2026 (4,2 %) | ERPbymonth.xlsx |
| Comparables | cierres del 14-19-oct-2026 sobre las notas D de Advantest (15-oct) y KLA (14-oct) | Yahoo / repo |
| Sentimiento | tablón de Yahoo! Finance Japón, 19-oct-2026 | web |
| Precio común | `precios.mjs 6920`: cierre del 19-oct-2026, 39.590 JPY | Yahoo Finance |

## Decisiones

- **Ejercicio**: etiqueta «fin» (FY2026 = jul-25 a jun-26); objetivo a 12 meses sobre FY2028e.
- **Anticipos de clientes** (44.284 M; pico de 95.155 M en FY2023): se compensan con entregas → `pasivos_contrato` (circulante), no van al puente. El circulante del DCF baja del 59,8 % (FY2026) al 57 %, 52 % y 48 % (media FY2022-FY2026) suponiendo que los anticipos se recuperan en parte con los pedidos.
- **Puente**: caja 91.503 M, sin deuda; `otros_ajustes` +17.657 M por el dividendo final de 197 JPY pagado el 28-sep-2026, después del balance.
- **DCF**: guía FY2027 (+25,8 %); FY2028e +22 % (pedidos en el punto medio de la guía, 350.000 M); corrección del −10 % en FY2030e; margen EBITDA terminal 42,5 %; WACC 11,48 % (beta 1,55); Gordon 2,4 %.
- **Mercado**: Market Intelo (1.800 M USD, +7,2 % anual); DataHorizzon descartado (perímetro incoherente). `mercado_final` null: la cuota es del segmento de máscaras, prueba hecha a mano en la justificación.
- **PER adelantado**: FY2021 (78,4x) excluido por burbuja; FY2019 por régimen anterior a la EUV.
- **Escáner frente al informe**: el +40 % anual de ventas es el de FY2020-FY2024 (despegue de la EUV); FY2026 cayó un 8,3 %. El margen de seguridad del escáner no aparece en el DCF: el precio pide un 28,6 % anual durante 10 años.

## Resultado

Mantener (regla) / acción robusta «No mantener» (SÓLIDA). v3 4,2 % ponderada, 16,2 % base; v2 22,1 %; BPA −10 %: −6,2 %. Objetivo 12 m 40.931 JPY; valor intrínseco 19.724 JPY (−50,2 %); límite de compra común 19.723,91 JPY. ROIC 54,2 % − WACC 11,48 %.

## Riesgo de IA

Exposición alta, sentido oportunidad: la IA llena las líneas EUV de TSMC, Intel y Samsung y con ellas la demanda de inspección de máscaras; no sustituye el producto. El riesgo es de ciclo (frenazo del gasto en centros de datos → aplazamiento de capacidad → pedidos como en FY2025). A 3-5 años: positivo en volumen con pedidos volátiles.

## Lecciones propuestas (para la sesión principal; no se tocan los archivos de lecciones)

- Japón: la biblioteca de IR de muchas cotizadas (eir-parts) se carga con JS; el feed JSON `https://ssl4.eir-parts.net/V4Public/eir/<código>/en/announcement/announcement_14.js` lista todos los PDF (el host v4 da reset; ssl4 funciona). Útil para `descargar.mjs --lista`.
- Japón: el yuho en japonés suele no tener texto extraíble (fuentes CJK sin incrustar); remuneración individual y años del auditor quedan como hueco salvo OCR.
- `precios.mjs` se llama con la clave del mapa (`6920`), no con el símbolo de Yahoo (`6920.T`).
