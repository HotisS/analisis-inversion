---
description: Escanea Europa, Américas y Asia-Pacífico en busca de candidatas para /analiza-empresa (sin coste de API)
argument-hint: "[perfiles] [regiones] [tema o palabras clave]"
---

# Escanear el mercado

Objetivo: proponer al usuario **qué analizar después** con `/analiza-empresa`, a partir de todas las cotizadas de más de 1.000 M USD de las tres regiones. El escáner es código (`herramientas/escaner.mjs`): **no gasta tokens ni API de pago** al ejecutarse; solo cuesta leer y comentar el resultado.

## Regla estricta de carpetas
Solo el repo y `%TEMP%` (la caché de fichas vive en `%TEMP%\analisis-inversion\escaner\cache`). Jamás ninguna otra carpeta del OneDrive.

## Cómo funciona (embudo)
1. **Buscador de Yahoo** por bolsas de cada región con los filtros base (capitalización, sin financieras ni inmobiliarias) y los del perfil: de decenas de miles a unos cientos por perfil y región, en segundos.
2. **Ficha de cada superviviente** (perfil, consenso, cuatro-cinco ejercicios de cuentas), en caché una semana, y métricas propias: ROIC medio y mínimo, WACC orientativo, crecimiento, margen y su estabilidad, conversión en caja, FCF yield, DN/EBITDA, caída desde máximos, **crecimiento que descuenta el precio** (Gordon sobre el flujo libre, versión rápida del DCF inverso) y su margen de seguridad frente al crecimiento histórico.
3. **Perfiles** de `escaner/perfiles.json`: filtros y puntuación por percentiles dentro de la región. Se editan sin tocar código; la hoja «Métricas» del Excel lista las claves.

## Pasos
1. Si el usuario pide un tema («agua», «defensa», «software vertical»…), úsalo con `--buscar "regex"` (inglés: las descripciones de Yahoo están en inglés) y, si encaja, un perfil más laxo o uno nuevo en `perfiles.json`. Si pide una región o perfil, `--regiones` / `--perfiles`.
2. Ejecuta (en segundo plano si son las tres regiones; la primera pasada tarda 10-20 min por las fichas, las siguientes de la semana, 1-2 min):
   `node herramientas/escaner.mjs [--perfiles …] [--regiones …] [--buscar …]`
   Para afinar filtros sin descargar fichas: `--contar`. Para mirar empresas sueltas: `--simbolos AZN.L,TOM.OL`.
3. Sale `escaneos/escaneo-AAAA-MM-DD.xlsx`: hojas «Candidatas» (ranking por perfil y región, con marcas ✓ = ✗ como en `seguimiento.xlsx` y la señal si ya está analizada), «Sectores» (medianas por industria: dónde hay calidad castigada), «Perfiles» y «Métricas».
4. **Revisa a mano las primeras de cada lista antes de proponerlas.** El escáner trabaja con datos de Yahoo y se equivoca en casos conocidos:
   - arrendamientos (aerolíneas, turoperadores, distribución) inflan el ROIC y el FCF yield;
   - holdings, conglomerados y empresas con grandes participadas;
   - años con extraordinarios (ventas de negocios, deterioros) o cambios de perímetro recientes;
   - flujo libre de un solo año anómalo (capital circulante);
   - empresas de un solo producto o con un litigio que el precio ya descuenta.
   Mira «Qué hace», el sector y, si hace falta, `--simbolos` para ver la serie. Descarta las que el motor no sabe valorar (bancos, aseguradoras, holdings con NAV, biotecnológicas sin ventas).
5. **Entrega (regla de Hotis, 19-oct-2026: «la cosa es que me des todas las que pasan, tus favoritas y yo te digo cuáles analizamos o metemos en cola»)**: (a) la **lista completa de todas las que pasan** el cribado, por mercado (en archivo, no en el chat: Excel de `escaneos/` y un .md con una línea por empresa), con cuántas cribó cada mercado; (b) **tus favoritas** (8-12) en una tabla corta: empresa, país, perfil, por qué (una línea con dos o tres cifras), el riesgo que más pesa y la señal si ya está analizada. **No lances ningún análisis ni añadas nada a la cola: decide Hotis.** Por defecto, el escaneo amplio: `--config escaner/perfiles-amplio.json` (16 regiones, 61 bolsas), más `indices.mjs --huecos` y `salidas-bolsa.mjs`.
6. Si el usuario lo aprueba, haz commit del Excel de `escaneos/` (y de `perfiles.json` si lo cambiaste).

## Límites (dilos si vienen al caso)
- Yahoo no es una API oficial: puede cambiar o cortar. `herramientas/yahoo.mjs` reintenta con espera; si el buscador falla entero, avisa.
- Solo cuentas de cuatro-cinco ejercicios: el ROIC y el crecimiento son de ciclo corto.
- WACC orientativo (tasa libre de la divisa + beta acotada × 4,20 % + prima país): sirve para ordenar, no para valorar.
- Sin China continental por defecto (se añade con las bolsas SHH y SHZ en `perfiles.json`).
