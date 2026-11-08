# Ficha sectorial: generación renovable ibérica (fotovoltaica) — 8-nov-2026

Hecha durante el análisis de Solaria (informes/solaria-2026-11-08). Corta: solo lo investigado allí. Fuentes completas en `informes/solaria-2026-11-08/notas/B.json` (los [n] de abajo remiten a esa lista).

## 1. Perímetro
- Generación eléctrica renovable conectada a red en España (mercado ibérico MIBEL/OMIE), con foco en la fotovoltaica en suelo. Fuera: autoconsumo (9.276 MW acumulados a fin de 2025, no vende al pool), fabricación de equipos, redes reguladas. GICS 55105020 (Renewable Electricity); NACE 35.11.
- `mercado_final` para informes value: producción FV española en GWh × precio capturado solar (estimación). Los servicios de acceso a red para centros de datos no tienen estadística: se tratan aparte.

## 2. Tamaño y crecimiento
- Producción FV España: 27.906 GWh (2022) → 44.520 GWh (2024) → 50.273 GWh (2025), 18,5 % de la generación (REE REData [7]; UNEF da 50.188 GWh [9]). Cuota FV en el mix: 6,2 % (2020), 8,2 % (2021), 10,2 % (2022), 14,2 % (2023), 17 % (2024), 18,5 % (2025) [9].
- Potencia FV: 50.788 MW (fin 2025), 41.512 MW en suelo; récord de 8.966 MW en suelo instalados en 2025 [9]. REE: 8,8 GW FV nuevos en 2025, parque total 142,5 GW [6].
- Valor (estimación propia): ~1.880 M EUR en 2024 (44.520 GWh × 42,28 EUR/MWh) y ~1.830 M EUR en 2025 (50.273 GWh × 36,39 EUR/MWh) [8, 10]: el volumen sube un 13 % y el valor baja un 3 %.
- Previsto: PNIEC 2030 = 76 GW FV (57 GW en suelo) → ~6,5 % anual de potencia en suelo 2025-2030 [14]; el valor depende del precio capturado, no del volumen.

## 3. Estructura competitiva y cotizadas (último ejercicio, 2025, M EUR)
| Empresa | Ticker | Ingresos | Margen EBIT | Nota |
|---|---|---|---|---|
| Solaria | SLR.MC | 197,4 (ventas) / 303,4 (ingresos totales) | 72 % s/ ingresos totales | 105,5 M de «otros ingresos» (plusvalía Generia 54,6) [1, 2] |
| Acciona Energía | ANE.MC | 2.925 | 32,5 % | XBRL [20] |
| EDP Renováveis | EDPR.LS | 2.688 | 35,6 % | España: 65,9 EUR/MWh (sobre todo eólica) [18] |
| Grenergy | GRE.MC | 698 (XBRL; 1.070 según la empresa) | ~21 % (estimado) | promotor que rota activos [19, 23] |
| Ecoener | ENER.MC | 84,7 | 25,6 % | [21] |
| Audax Renovables | ADX.MC | 1.875 | 4,3 % | comercializadora [22] |
- Estructura fragmentada; Solaria ≈ 4,6 % de la producción FV española 2025 y ≈ 7 % de la potencia en suelo. CR5/HHI: n.d.
- Sin tabla de múltiplos (no se hizo aquí): ver `comparables` del informe de Solaria cuando esté.

## 4. Economía del negocio
- Coste marginal ~0; opex de Solaria ≈ 15 EUR/MWh (37,4 M EUR / 2.434 GWh en 2025) [2]. Capex FV modelizado 375.000 EUR/MW; baterías 75.000 EUR/MWh (híbridas 70.000) [4].
- Intensidad de capital alta y apalancamiento con deuda de proyecto (Solaria: DN/EBITDA 3,9x en 1S26) [3].
- Lo que separa a las mejores: contratos a largo plazo (PPA) frente a mercado, hibridación con baterías y acceso a red (Solaria lo monetiza con centros de datos). Precio medio realizado 2025: Solaria España 47,4 EUR/MWh frente a 36,39 de captura solar media [2, 10].

## 5. Ciclo y regulación
- Pool España (media diaria): 167,52 (2022), 87,10 (2023), 63,04 (2024), 65,29 EUR/MWh (2025) [11-13]. Apuntamiento solar CNMC: 0,6672 (2024) → 0,5784 (2025) [1]. Precio capturado solar: 42,28 → 36,39 → 29,68 EUR/MWh (1S26) [10]. Horas a precio ≤0 con FV: 797 en 2025; ~900 a inicio de sep-2026 [10]. Futuros solares OMIP (24-sep-2026): 76 EUR/MWh 4T26, 84 1T27 [3].
- Apagón 28-abr-2025: fallo de control de tensión (ENTSO-E) [16]; REE en «modo reforzado» → más restricciones técnicas [9, 17]. RDL 7/2025 decayó; RD 917/2025 (horas a precio cero y restricciones no restan retribución regulada) [1]; RDL 7/2026 (20-mar-2026; hibridación, hitos de acceso de demanda) [9]; Orden TED/966/2026 crea el mercado de capacidad (en vigor 18-sep-2026) [15]; concursos de acceso de demanda desde jul-2025 (8 nudos, 3.681 MW) [9]; 56 expedientes sancionadores de la CNMC por el apagón (mayo 2026) [9].
- Más expuestas al precio: las solares con mayor parte a mercado y sin baterías.

## 6. Lo que vigilar
- Precio capturado solar y horas a precio cero (OMIE diario; UNEF anual).
- Futuros OMIP de carga solar/base (diario).
- Conexiones FV y de baterías (REE mensual; UNEF anual) y fin del «modo reforzado».
- Precio de los PPA en España (LevelTen trimestral: −13 % interanual en 1T26) [9] y subastas del mercado de capacidad.
- Riesgos para la sección 25: canibalización, regulación de red tras el apagón, caducidad de permisos de acceso, dependencia de plusvalías y rotaciones para el EBITDA.

## Cierre
- En la cadena, el dinero está hoy en el acceso a red y la flexibilidad (baterías, control de tensión), no en el MWh solar a mediodía.
- Merece buscar en quien tenga acceso concedido y almacenamiento, no en solar pura a mercado.
- Solaria gana con el acceso a red para centros de datos y sufre con su mayor exposición a mercado; Grenergy y EDPR tienen menos peso de solar española a mercado.
- Iberdrola y Endesa (ya analizadas en el repo) sufren menos: su generación es más diversificada y tienen redes reguladas.
- Ficha a actualizar cuando haya serie completa de producción 2020-2023 (REE REData bloqueó varias consultas).
