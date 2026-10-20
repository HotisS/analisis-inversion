# Diario · solutions by stc (7202.SR) · análisis value 20-oct-2026

- Commit de partida: `9598416 Ensign Group: análisis value completo 20-oct (no compra; límite 92,27 USD)`. Checkout compartido con otro análisis (Philip Morris): sin pull, commit ni push; solo esta carpeta, mi entrada de `simbolos.json` y lo que escriben `precios.mjs` y `apuntar-12m.mjs`.
- Inicio ≈ 13:38 UTC; notas A-E ≈ 13:56; motor y Word ≈ 14:08; robustez ≈ 14:09; cierre ≈ 14:10 UTC.
- Primer análisis de la empresa (no había informe anterior).

## Pasos y fecha de los datos

| Paso | Herramienta o fuente | Fecha del dato |
|---|---|---|
| Símbolo | `simbolos.json` (7202.SR, comprobado en Yahoo) | 2026-10-20 |
| Cuentas anuales 2022-2025 | Cuentas auditadas en solutions.com.sa (EY 2022-2024, Deloitte 2025); 2021 del Data Supplement (PDF escaneado) | 31-dic-2025 |
| Cuentas intermedias | 1T26 y 1S26 revisados (Deloitte) y Data Supplement 2T26 (Excel) | 30-jun-2026 |
| Bolsa, beta, rentabilidades | `bolsa.mjs --accion 7202.SR --indice KSA --sector IGV --incluir-hoy 1` | 2026-10-20 (cierre) |
| Comparables | `notas/yahoo.mjs` (Yahoo quoteSummary) | 2026-10-20 |
| Consenso | MarketScreener (14 analistas), Argaam | 2026-10-20 |
| Previsiones 3T26 | Argaam (Ubhar, Riyad Capital, ANB Capital) | 12/19-oct-2026 |
| Tasa libre | FRED DGS10 (5,09 %) | 2026-10-16 |
| Prima de país y ERP implícita | Damodaran (ctryprem, ERPbymonth) | oct-2026 |
| Sector | IMARC, IDC (informe anual) | 2025 |
| Gobierno | Informe anual 2025, actas de juntas (6-oct, 19-may, 7-abr-2026) | 2026-10-06 |
| Regla 13 | `movimiento.mjs 7202.SR` | 2026-10-20 |
| Precio | `precios.mjs 7202.SR` (92,55 SAR) | 2026-10-20 (cierre 12:00 UTC) |
| Robustez | `robustez.mjs --actual` | 2026-10-20 |

## Decisiones

- Base de acciones: 240 M (gratuita 1×1 aprobada el 6-oct-2026); BPA y DPA publicados divididos entre dos. Precios de Yahoo ya ajustados.
- Crecimiento 2026e del 7,5 % (guía 6-8 %, 1S26 +9 %) y margen EBITDA del 15,5 % (sin la reversión de 63 M de regalías y con el 4T estacional), bajando al 15,0 % en 2032e por la IA y la mezcla.
- Circulante del 11 % de las ventas: no supongo que vuelva el circulante negativo de 2021-2024.
- Puente con arrendamientos ESTIMADOS (≈ 347 M) porque el intermedio no da la parte corriente; asociadas a valor en libros de dic-25 (Devoteam ME).
- Beta 1,05 (entre la mensual de 5 años, 1,12, y la semanal de 2 años, 1,04); WACC 11,87 %.
- Comparables: fuera Wipro, HCL y TCS (divisas mezcladas en Yahoo) y Al Moammar (PER 99x).
- Controles explicados: tipo efectivo 2024 y 2025 (zakat) y caja proyectada frente a la histórica (2025 anómalo por el circulante).
- Resultado: Mantener (v3 +24,8 % / +20,7 %, pero valor intrínseco 79,58 SAR < 92,55). Robustez: Mantener en cartera; límite común 79,58 SAR.

## Lecciones propuestas (no escritas en lecciones*.md por la restricción del encargo)

- solutions.com.sa: el cortafuegos rechaza el UA simple y las rutas con `/en/` (usar UA de Chrome completo y rutas sin `/en/`), y el servidor no envía el intermedio DigiCert Global G2 TLS RSA SHA256 2020 CA1: añadirlo al paquete de CA (sin desactivar TLS). `descargar.mjs` también es rechazado.
- Las empresas saudíes del grupo stc publican un «Data Supplement» en Excel con cuenta, balance y flujos de 2019 en adelante y trimestres: más fiable que leer PDF escaneados.
- Ampliaciones gratuitas saudíes (1×1): pasar todos los BPA y DPA históricos a la base nueva; Yahoo ajusta los precios.
