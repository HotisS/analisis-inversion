// Precio y tipo de cambio del informe (corte 2026-11-13). Un solo sitio para que notas y parte propia usen lo mismo.
export const PH = 42.00;            // cierre de 2636.HK (HKD), Yahoo Finance
export const PA = 61.62;            // cierre de 688036.SS (CNY), Yahoo Finance
export const FECHA = '2026-11-13';
export const TC = 0.8498;           // CNY por HKD (HKDCNY=X, 13-nov-2026)
export const HA = Math.round((PH * TC / PA) * 10000) / 10000; // cociente H/A en la misma divisa
export const PRECIO = Math.round(PH * TC * 100) / 100;         // precio H en CNY
export const ACC = 1244.333445;     // acciones tras la sobreasignación parcial (1.151.184.545 A + 93.148.900 H)
