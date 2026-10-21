# Lecciones por país (anexo de `lecciones.md`)

Lee solo la sección del país que toque.

## EE. UU. y emisores extranjeros en EE. UU.
- Emisores extranjeros recién salidos (Aeroméxico): `cuentas.mjs --sec` puede traer solo la portada; usar el folleto F-1 y los 6-K. Una salida a bolsa sin historia de PER cae a v2 y lleva el aviso M2.
- Cambio de ejercicio (Ferguson, julio → diciembre): usar los años naturales que publica la empresa y que cuadran con el 10-KT; avisar del salto de meses en la TCAC y el PER histórico.
- EDGAR: 10-K/10-Q o 20-F/6-K, 13G, Form 4 (`form4.mjs`), Form 144 (avisos de venta, no ventas). `curl` a sec.gov da 403: usa `descargar.mjs`, que lleva el User-Agent que exige la SEC.
- Series anuales limpias en `https://data.sec.gov/api/xbrl/companyfacts/CIK##########.json`; lista de presentaciones en `https://data.sec.gov/submissions/CIK##########.json` (CIK con ceros hasta 10 cifras; lo antiguo en `submissions-001.json`).
- Tasa libre: FRED `DGS10` (un día por detrás) o el CSV del Tesoro (trae el día).
- US GAAP con arrendamientos operativos: el alquiler ya está en el EBITDA; sumar sus pasivos a la deuda lo cuenta dos veces.
- El rating suele estar en EDGAR (folleto de la última emisión).

## España
- Web de inversores de la empresa (los PDF bajan aunque la web tenga antibot; a veces desde otro dominio: uploads.puig.com, blob.almirall.com). Grifols enlaza PDF sin `.pdf`: mejor sus 20-F y 6-K en EDGAR.
- CNMV: hechos relevantes; posiciones cortas con `descargar.mjs` (`https://www.cnmv.es/portal/Consultas/EE/PosicionesCortas?nif=<NIF>`); operaciones de directivos con el navegador integrado (sin `descargar.mjs` da 403) y sus PDF (verdocumento) con `descargar.mjs`.
- Muchas españolas presentan la cuenta por naturaleza: `meta.formato_cuenta: "naturaleza"`.

## Unión Europea (general)
- ESEF: filings.xbrl.org guarda gratis los informes (`/api/filings?filter[entity.identifier]=<LEI>`); sirvió con la web de la empresa bloqueada. El `.txt` de `descargar.mjs` parte las tablas de los XHTML.

## Francia
- MFN (`mfn.se/one/a/<empresa>/…`) da los comunicados de resultados con estados completos en HTML.
- Operaciones de directivos: API de BDIF de la AMF (`bdif.amf-france.org/back/api/v1/informations?RechercheTexte=<EMISOR>&TypesInformation=DD&From=0&Size=40`; PDF en `/back/api/v1/documents/<path>`).
- Emisores neerlandeses que cotizan en París: participaciones y operaciones de directivos en el registro de la AFM (CSV), no en la BDIF.
- ESEF 2025 que no está en filings.xbrl.org: va dentro del zip del URD en la BDIF de la AMF (extractor iXBRL). `--esef "Orange"` coge Orange Polska: pasar el LEI (969500MCOONR8990S771).
- Cierre de París que Yahoo aún no tiene a primera hora: CSV de Euronext (`live.euronext.com/en/ajax/AwlHistoricalPrice/getFullDownloadAjax/<ISIN>-XPAR`) o `previousClose` del gráfico de Yahoo. Comunicados completos con la web bloqueada: bourse.lavenir.net.
- Riesgo país (oct-2026, diferencial OAT-Bund ≈1,45-1,60): dar en el comentario del DCF el valor con la OAT en vez del Bund (en las endeudadas cae un 20-35 %), sin sumar además la prima por Francia; para separar riesgo país de causa propia, comparar desde el 31-jul con el CAC 40 y con las domésticas (BNP, Orange, Engie), no solo con el STOXX 600.

## Alemania
- `^GDAXI` ya es de rentabilidad total aunque `bolsa.mjs` lo trate como índice de precio: usa `EXS1.DE`.
- `cuentas.mjs --esef` no encuentra emisores alemanes (filings.xbrl.org no los tiene): usar los Excel oficiales «All tables» del informe anual y semestral de la empresa (KION, 19-oct-2026).

## Suiza
- Participaciones significativas en la API pública de la SIX; las operaciones de directivos son anónimas (solo cargo e importe); no hay registro público de posiciones cortas.
- **Swiss GAAP FER** (SFS, 9ª hora): el fondo de comercio se resta del patrimonio al comprar y no se amortiza; sin sumarlo de vuelta, el capital invertido queda corto y el ROIC sale inflado (SFS: 14,8 % en vez de 8,1 %, y la calidad pasaba por error). Sumar el fondo de comercio acumulado (nota de patrimonio) al patrimonio y al capital invertido; el BPA FER no lleva su amortización (comparable con el ajustado de NIIF, no con el estatutario).

## Italia y Polonia
- Sin XBRL utilizable en filings.xbrl.org (Rai Way, Diagnostyka, 8ª hora): `cuentas.mjs --esef` no encuentra el informe o lo trae sin las etiquetas que usa el mapa. Las cuentas se sacan del PDF del informe anual (nota A con la tabla de la cuenta, balance y flujos) y la confianza del informe no pasa de media hasta que haya dos ejercicios cuadrados contra el PDF.

## Nórdicos (Dinamarca, Suecia, Noruega)
- filings.xbrl.org (`cuentas.mjs --esef`) va con retraso en Noruega y Suecia: en octubre de 2026 el último ejercicio cargado de Borregaard y Sweco es 2024 (los índices se cargan por tandas, la última de mayo de 2025). El 2025 sale del informe anual (MFN) y se cuadra con 2024 del XBRL.
- MFN (`https://www.mfn.se/all/a/<empresa>`) abre con `descargar.mjs` y enlaza los PDF de GlobeNewswire; las notas de Nasdaq Copenhague (`view.news.eu.nasdaq.com`) también bajan bien.
- Dinamarca: posiciones cortas ≥ 0,5 % en un xlsx mensual de la Finanstilsynet; las juntas aprueban la remuneración sin recuento (voto libre en contra: hueco, con la asistencia). Tasa libre: el Bund (corona anclada al euro).

## Reino Unido
- PER adelantado de Yahoo y otros agregadores en PENIQUES para cotizadas de Londres: comprobar la unidad antes de usarlo de contraste (precio en GBp, BPA en GBP). ESEF británico: la deuda a corto y el dividendo a cuenta van en conceptos aparte; `cuentas.mjs` los marca en `parciales` y `dpa_base`.
- Las notas de prensa de resultados anuales traen cuentas y notas completas en ~40 páginas: la vía más barata para series de diez años.
- Investegate: el `.txt` empieza por un «Summary by AI» con cifras; no lo uses, lee el cuerpo del RNS.
- Cotizaciones en GBp: `bolsa.mjs` no las pasa a GBP.
- Cambio de divisa de cotización en Londres (Compass, `CPG.L`, a USD desde el 1-abr-2026): Yahoo rompe la serie; usar el ADR (`CMPGY`) para la historia del PER y apuntarlo en `simbolos.json`.
- Sentimiento: interactive investor, Motley Fool UK y prensa sectorial; LSE Chat da 403.

## Japón
- Web de inversores en inglés (*Securities Report*, *Kessan Tanshin*); EDINET sin clave a través de IR BANK y `disclosure2dl`. Muchos PDF en japonés salen ilegibles: busca la versión inglesa.
- Ejercicio a marzo (Keyence al 20 de marzo: `--cierre-dia`); unas empresas nombran el ejercicio por el año en que empieza y los proveedores por el de cierre: fija la equivalencia al principio.
- Sin arrendamientos en balance hasta 2028; la remuneración no se vota cada año (`voto_cupula_pct`); no hay registro público de operaciones de directivos; cortos solo por encima del 0,5 %.
- Si la web de RI está bloqueada, el feed de eir-parts (`announcement_3.js`) y `disclosure2dl` de EDINET funcionan sin clave; los PDF que salen vacíos con `pdftotext` se leen con pdfminer. Las participaciones cruzadas van al puente a valor de mercado tras el impuesto latente (Takasago, 19-oct).

## Australia
- Anuncios de la ASX: la API solo da los 5 últimos; los antiguos salen del listado anual (`announcements.do?...&year=`) y `displayAnnouncement.do?display=pdf&idsId=` da el PDF directo (un script corto resolvió 346 anuncios en un minuto; merecería ser `herramientas/asx.mjs`).
- Operaciones de directivos en los «Appendix 3Y»; accionistas significativos en los formularios 603/604/605; posiciones cortas en `download.asic.gov.au/short-selling/RR<AAAAMMDD>-001-SSDailyAggShortPos.csv` (~4 días hábiles de retraso); tasa libre en la tabla F2 del RBA (Excel de 8 MB).
- Sentimiento: solo abre Motley Fool Australia (`fool.com.au/tickers/asx-<ticker>/page/N/`); HotCopper, Strawman, Market Index, Livewire y Simply Wall St dan 403 o piden JavaScript.
- Cotiza en AUD y publica en USD (CSL): ver la beta en `lecciones.md`; con ADR, comprueba la equivalencia con el precio.

## Canadá
- SEDAR+ (403) y SEDI (antibot) no abren sin navegador: web de la empresa (solo el ciclo en curso), MFN y GlobeNewswire, e InsiderTrades para directivos. El voto consultivo de remuneración puede no existir (hueco con sus intentos).
- Sentimiento: Stockchase; Stockhouse da 403.
- El pago en acciones liquidado en efectivo deforma EBITDA y BPA (Hammond Power, 19-oct).

## China y Hong Kong (18-oct-2026)
- Línea H recién salida (Transsion, 2636.HK): la historia del PER es la de la A × el cociente H/A de hoy (sin suponer que el descuento se cierra); beta y rentabilidades con la A. Lote de 100 H: comprobar que el mínimo de 1.000 € cabe en lotes enteros. El folleto de HKEX trae tres años de NIIF auditadas.
- Guba (Eastmoney) abre con curl: los mensajes van en un JSON incrustado como `article_list=`. ChinaBond da el 10 años con POST al servicio de la curva, no por GET. El EBITDA de consenso de MarketScreener en chinas puede incluir ganancias financieras: usar solo BPA y ventas.
- Stock Connect: la lista de HKEX («China Connect Securities») en xls se lee pasándola a csv con soffice. Consenso de acciones A con la F10 de Eastmoney o el `earningsTrend` de Yahoo; estados del anual de CNINFO a veces en imagen (leer páginas renderizadas) (DunAn, Sieyuan, Wasion, 19-oct).

## Corea (19-oct-2026)
- Sin XBRL en `cuentas.mjs`: DART responde desde la nube con el visor por secciones (avisos en cp949; el PDF devuelve 0 bytes). Consenso en FnGuide. Separar mercado, sector y empresa con `movimiento.mjs` (HD Hyundai Electric).

## Arabia Saudí (19-oct-2026)
- Documentos con la API de Argaam IR (estados a menudo escaneados); `^TASI.SR` no da datos en Yahoo: índice con el ETF KSA; Tadawul cotiza de domingo a jueves y cierra a las 12:00 UTC; el zakat sube el tipo impositivo aparente y `robustez` D5 lo marca sin que el BPA esté inflado (EIC).

## Taiwán (21-oct-2026)
- TSMC: pr.tsmc.com e investor.tsmc.com dan 403 desde la nube; todo está en EDGAR (6-K de resultados, ventas mensuales y estados semestrales; 20-F). El XBRL de `cuentas.mjs --sec` no trae el último 20-F a tiempo: el último año, del 20-F.
- Emisores 20-F con Form 4 (TSMC desde marzo de 2026): `form4.mjs` cuenta como compras en mercado las del plan de empleados (código «P»): filtrarlas a mano.
- Sentimiento: PTT (foro Stock) abre con curl y la cookie `over18=1`.
