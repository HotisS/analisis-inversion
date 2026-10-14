# Histórico de cambios importantes

**No se lee en las sesiones normales** (análisis, cola, cartera del día). Solo cuando el usuario pide revisar cambios históricos o hace falta saber por qué se decidió algo. Lo vigente está en `MEMORIA.md`, `cola.md` y `verticales/`.

**Qué se apunta aquí** (una entrada por cambio, la más reciente arriba, dos o tres líneas): cambios de método o de reglas, decisiones de cartera que sustituyen a otras, cambios de estructura del repo o del flujo de trabajo, y lo que se retira de `MEMORIA.md`, `cola.md` o `lecciones.md` cuando ya no está vigente. No se apuntan análisis sueltos (están en `seguimiento.xlsx` y en cada `diario.md`).

## Archivos de detalle (en esta carpeta)

- `memoria-decisiones-hasta-2026-10-14.md`: `MEMORIA.md` completa tal como estaba el 14-oct, con todas las decisiones del 10 al 14-oct (versiones 3-9 de la cartera y sus motivos).
- `cola-hasta-2026-10-13.md`: las colas del 10 al 13-oct con el estado y la señal de cada empresa.

## Cambios

### 14-oct-2026
- **Cartera de las 13:45** (`informes/cartera-2026-10-14-14h.md`) sustituye a la de las 13:00: Rightmove fuera por decisión del usuario; 16 análisis de la tercera hora, ninguno pasa los requisitos (Sanofi falla calidad). Suplentes nuevos: Deutsche Börse y Amadeus.
- **Cartera de las 13:00** (`informes/cartera-2026-10-14-13h.md`) sustituye a la de las 11:50: entra Rightmove (pasa los tres requisitos al límite). 12 análisis más en la segunda hora.
- **Cartera de la tarde** (`informes/cartera-2026-10-14-tarde.md`) sustituye a la de la mañana: 4.000 EUR más de liquidez, Nemetschek 29 y LVMH 5, liquidez ≈6.300 EUR con suplentes (Experian nueva). 14 análisis nuevos desde la nube, ninguno pasa los tres requisitos al precio de hoy.
- **Repo más ligero** (petición del usuario: se gastaban demasiados tokens por sesión). `cola.md` y `MEMORIA.md` quedan solo con lo pendiente y vigente; lo cerrado, a `archivo/`. `verticales/empresa/lecciones.md` se parte en núcleo + `lecciones-paises.md` + `lecciones-casos.md`; se retiran lecciones obsoletas (fallos de herramientas ya arreglados, elección manual del PER del bajista y del alcista). Regla de mantenimiento en `CLAUDE.md` y este histórico.
- **Cartera propuesta con la regla común** (`informes/cartera-2026-10-14.md`): vender Zoetis, Puig, Hermès, ICE, Equifax e IBKR; comprar Nemetschek y LVMH; cancelar Wolters Kluwer y Auto Trader. Con la regla común, la cartera del 13-oct rendía +9,4 % y no +15,5 %. Pendiente de que el usuario la acepte.
- Explicación del día para el usuario (método, tres fotos de la cartera y por qué no entran Wolters Kluwer, Auto Trader y Group 1): `informes/cambios-2026-10-14.md`.
- **Group 1 Automotive** analizado desde la nube solo con búsqueda web (confianza baja): Mantener.
- **Regla de múltiplos común para el objetivo a 12 meses**, aplicada por el motor (`motor/objetivo12m.mjs`). Las 73 revisiones del 13-oct elegían los múltiplos a mano, casi siempre al alza; se recalcularon todas.

### 13-oct-2026
- **Cartera, versiones 3 a 9** en un día (`informes/cartera-concentrada-2026-10-13.md`): Grifols, Puig, ICE, Hermès, Equifax y PepsiCo fuera; Alphabet se queda por decisión del usuario; Dunelm y Adobe fuera; entra Intuit; tope del 7 % por valor; no se amplían posiciones existentes. Órdenes con precio límite hasta el 7-nov. Detalle en `memoria-decisiones-hasta-2026-10-14.md`.
- **Rentabilidad a 12 meses = media ponderada** por las probabilidades de los escenarios, y filtro de valor real (base ≥ 12 % y valor intrínseco ≥ precio).
- **La «nueva metodología» era la rentabilidad a 12 meses v2** (PER propio × BPA propio, del hilo de claude.ai del 12-oct), no la sostenibilidad; una reconstrucción anterior («cerrar la mitad del descuento») se retiró.
- **Las 73 empresas pasadas a la metodología del 10-oct** (sostenibilidad del crecimiento, con rebaja del caso base si falla) en actualización rápida, sin investigación nueva. Cambian de señal: Olympus, Microsoft y Kongsberg a Vender; Tomra, On, Rentokil y bioMérieux a Mantener.
- Presupuesto del usuario para la nube: 210 USD.

### 12-oct-2026
- **Fuera el juego y las apuestas** (Betsson analizada pero excluida; Evolution no se actualiza).
- La cola pasa a de tres en tres; S&P Global y Amazon por delante.

### 10-11-oct-2026
- **Metodología nueva del informe**: prueba de sostenibilidad del crecimiento en el DCF y capa de sentimiento (sección 28, subagente E).
- Cola rehecha con el escáner (la lista anterior no llegó a GitHub); pares de valor y crecimiento. Análisis de la cartera del usuario (Puig, SAP, Grifols, Netflix, Hermès) y primer rebalanceo (`informes/rebalanceo-2026-10-11.md`).
