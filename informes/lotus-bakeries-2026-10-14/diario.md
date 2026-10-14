# Diario · Lotus Bakeries (LOTB.BR) · 14-oct-2026

- Commit de partida: 4198f95 («Seguimiento: regenerado»). Sin commits ni push (lo hace el coordinador). Inicio 17:56 UTC, fin 18:15 UTC.
- Entorno: nube de Claude Code, sin subagentes. Notas A-E con `notas/construir-notas.mjs`; parte del analista en `propio.mjs` + `supuestos.mjs` + `textos.mjs`.
- Documentos primarios (en `notas/docs/`): informe anual 2025, resultados 2025 y 1S26 (y 1S25), nota de Lembeke y junta de 2026; XBRL ESEF 2025 y 2022 con `cuentas.mjs --esef` (LEI 5493004C0K34IFI67I03); nota de prensa Lotus/Mondelez/Froneri del 12-mar-2025.
- Bolsa: `bolsa.mjs` con LOTB.BR y ^BFX. Precio 12.800,00 EUR (cierre del 14-oct-2026).
- **Ficha sectorial**: la del chocolate excluye las galletas; se hizo `sectores/galletas-snacks-2026-10-14.md` («Galletas y snacks de marca»), con los comparables del chocolate pasados a EUR (÷0,9313). Siete comparables (Mondelez, Hershey, Lindt, Nestlé, Barry Callebaut, Meiji, Ezaki Glico); Kellanova ya no cotiza (Mars) y entra solo como transacción.

## Decisiones

- **XBRL ESEF revisado (encargo)**: `deuda_financiera` solo recogía LongtermBorrowings; se suma el corto plazo y los arrendamientos con la nota 22 del informe anual (2025: préstamos 291,0 + arrendamientos 21,25 = 312,25 M). El `dpa` de la herramienta era el pagado en el año (el del ejercicio anterior); se corrige al del ejercicio: 40 / 45 / 58 / 76 / 90 EUR (2021-2025), dividendo total 2025 = 73,1 M. Caja = efectivo + depósitos a plazo (200,1 M en 2025). Ingresos: total de ventas del grupo, comprobado con la cuenta de resultados.
- **Prueba de sostenibilidad**: la primera versión fallaba (rentabilidad del capital nuevo 42,2 % > límite 30,6 %). Se subió el capex de los últimos años (programa de ≥ 500 M en 2026-2030) y se moderó crecimiento y margen; pasa con 29,2 %. Queda la salvedad de que el crecimiento financiable al ROIC actual es 3,9 % frente al 7,3 % proyectado (explicada en el texto).
- Puente a 30-jun-2026: caja estimada (196,8 M) a falta del balance completo del semestre.
- Recomendación: **Mantener, convicción media** (la regla 12m dice Mantener; el valor intrínseco, Vender).

## Resultado

- Valor intrínseco 5.296,97 EUR (−58,6 %); DCF 5.342,04 (WACC 7,98 %); el DCF inverso pide un 19,4 % de crecimiento anual. ROIC 18,2 % − WACC 7,98 % ≈ 10,2 pp: calidad Sí; sostenibilidad Sí.
- 12m (selector v3): 31,4x / 45,0x / 45,0x → objetivo 12.773,93 EUR; ponderada +0,5 %, base +8,6 % → Mantener. v2: +6,2 % / +11,5 % → Mantener. `apuntar-12m.mjs --simular` coincide.
- Robustez (`robustez.mjs` sin `--escribir`): SÓLIDA; acción robusta «No mantener»; avisos D3 y V1. Colchón: BPA −10 % → −9,5 %.
- Comprar por debajo de 5.296,97 EUR; vender por encima de 14.293,25 EUR. Próximos resultados: 5-feb-2027.
- **Riesgo de IA: bajo** (producto físico de marca; solo efecto indirecto de los asistentes de compra en el comercio electrónico hacia la marca blanca). Está en riesgos y en la síntesis.
- Foros: dividido, mejorando; negocio excelente, acción cara. Beursduivel, IEX y Reddit no accesibles.

## Lecciones

- `cuentas.mjs --esef` asigna `deuda_financiera` solo a LongtermBorrowings: hay que sumar la deuda a corto y los arrendamientos a mano.
- El `dpa` del ESEF que saca la herramienta es el dividendo pagado en el año (el del ejercicio anterior), no el del ejercicio: comprobar con la tabla a cinco años.
- El informe anual de Lotus (31 MB) corta la descarga de `descargar.mjs`; funciona con un bucle de `curl -C -`.
- En empresas que crecen mucho con ROIC alto, la prueba de sostenibilidad obliga a llevar capex realista en los años finales (no solo moderar el crecimiento).
