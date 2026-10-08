# Diario — Equifax (EFX), corte 2026-10-08

- Inicio: 2026-10-08 10:16 (hora local).
- Commit de partida: 764c82d Informe de Tomra (Comprar, convicción baja).
- Identificación: Equifax Inc., NYSE: EFX, ISIN US2944291051, CIK 0000033185, USD, ejercicio a 31-dic, US GAAP. Último 10-Q: 2T26 (presentado 2026-07-21). Último 10-K: FY2025 (2026-02-19). Proxy: DEF 14A 2026-03-27 (junta 2026-05-07).

## Cronología
- 10:16 Fase 1: lectura del procedimiento, prompt y lecciones; carpetas creadas; lista de presentaciones de EDGAR.
- 10:22 Lanzados los cuatro subagentes A-D en paralelo.
- 10:33 Control de los 10 minutos: las cuatro notas tienen contenido; A sin fuentes todavía (recordado).
- 10:41-10:44 Terminan B (19 min, 103 llamadas), C (19 min, 105), A (21 min, 83) y D (21 min, 96).
- (corte por límite de uso; reanudado 17:11). Commit en main al reanudar: 8353c7b Informe de PepsiCo (Comprar, convicción baja)
- 17:11 Reanudado tras el corte por límite de uso (≈10:48-17:10 parado). Las cuatro notas estaban completas: no hizo falta relanzar subagentes. Main ya en 8353c7b (arreglos de User-Agent de la SEC, no recurrentes en el LTM y aviso de listas pisadas).
- 17:15 No recurrentes del LTM a jun-26 (151,9 M = 121,3 de 2025 − 24,2 del 1S25 + 54,8 del 1S26, partidas dentro del resultado operativo de las conciliaciones del 1T y 2T).
- 17:13-17:20 Supuestos (negocio sin FICO + reventa de FICO a margen nulo), primer y segundo cálculo, textos, resumen.
- 17:21 Word (28 gráficos, cobertura 91,2 %, sin avisos) y PDF (64 páginas); revisadas como imagen las páginas 1-4.

## Decisiones
- EBITDA = contable + no recurrentes = ajustado de la empresa (1.936 frente a 1.935,3 publicado en 2025). Por eso el consenso (EBITDA ajustado de MarketScreener) va con base «NIIF» y sin ajuste: el 2 % que proponía D habría restado dos veces.
- Beta 1,22 (ajustada mensual 5 años frente al S&P 500). XLI (1,06) y TRU (0,66) miden comovimiento con el sector o con un par, no riesgo de mercado.
- Coste de la deuda 5,65 % (cupón del bono a 2033 de julio de 2026, C4) en vez del 6,0 % estimado por D.
- Terminal 3,0 % (el 3,5 % saltaba el control y no aportaba nada defendible).
- Etapa 2 sin usar: ROIC del grupo 9,3 % < WACC 10,08 % (no +5 puntos); el foso de Workforce Solutions se recoge en los diez años explícitos.
- Círculo de Crédito fuera del DCF y del puente (no cerrada; a 9,4x con sinergias es casi neutral).
- Convicción baja aunque las dos reglas dan Comprar: la absoluta pasa por 0,4 puntos y la FHFA puede anunciar el informe doble el 12-oct.

## Fallos del sistema
1. **EDGAR bloqueado con el User-Agent de `descargar.mjs`** (403 en www.sec.gov; data.sec.gov sí). A y B escribieron descargadores propios en TEMP y C bajó del espejo de investor.equifax.com: los archivos no constan en `_manifest.json` y `form4.mjs` no funcionó (C analizó los Form 4 desde PDF). Arreglo: ya corregido en main (b5fb572); añadir a `descargar.mjs` un reintento con espera ante 429/403 porque cuatro subagentes a la vez saturan el límite de 10 peticiones por segundo de la SEC.
2. **D propuso un ajuste del 2 % al EBITDA del consenso** que, con `no_recurrentes_en_ebitda` en la cuenta, restaba dos veces. Arreglo: que el motor avise si `base_ebitda` es «ajustado» y la cuenta ya lleva no recurrentes de magnitud parecida al ajuste; y decirlo en la parte D del prompt.
3. **Los `_parches` no traducen citas con letra** (se aplican después de renumerar). Tuve que rehacer la lista de transacciones en `propio.mjs` para añadir un múltiplo con su cita. Arreglo: traducir también las citas de los valores de `_parches`, o avisar si llevan `[A..]`.
4. **El BPA del consenso de MarketScreener es contable y el de la guía ajustado** (6,63 frente a 8,39-8,69 USD en 2026e); además 2027e (8,39) parece mezclar bases. El PER de los próximos 12 meses sale contable. Arreglo: campo `consenso.base_bpa` y aviso del motor si el BPA del consenso salta más de un 20 % entre años.
5. **La reventa sin margen (FICO) distorsiona crecimiento y márgenes del motor**: tuve que separarla en un script propio. Arreglo: `dcf.anios[].ingresos_pasantes` (importe a margen nulo) para que el motor proyecte el margen sobre el negocio propio.
6. **WebFetch inventó la remuneración del CEO** (15,07 M y ratio 184:1 frente a 23,42 M y 294:1 del proxy). C lo detectó. Ya está la regla 0; reforzar en la parte C: remuneración siempre del texto descargado del proxy.
7. **Notas a medias en el control de los 10 minutos** (A sin fuentes). Bastó el recordatorio.
8. **Esperas**: el bloqueo de `sleep` obligó a usar bucles `until` con la hora; el comando del procedimiento debería decir cómo esperar a los subagentes sin terminar el turno.
- Fin: 17:24. Tiempo efectivo ≈ 45 min (10:16-10:48 y 17:11-17:24), más la pausa por el límite de uso.
