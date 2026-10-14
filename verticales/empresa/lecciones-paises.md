# Lecciones por país (anexo de `lecciones.md`)

Lee solo la sección del país que toque.

## EE. UU. y emisores extranjeros en EE. UU.
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

## Alemania
- `^GDAXI` ya es de rentabilidad total aunque `bolsa.mjs` lo trate como índice de precio: usa `EXS1.DE`.

## Suiza
- Participaciones significativas en la API pública de la SIX; las operaciones de directivos son anónimas (solo cargo e importe); no hay registro público de posiciones cortas.

## Nórdicos (Dinamarca, Suecia, Noruega)
- MFN (`https://www.mfn.se/all/a/<empresa>`) abre con `descargar.mjs` y enlaza los PDF de GlobeNewswire; las notas de Nasdaq Copenhague (`view.news.eu.nasdaq.com`) también bajan bien.
- Dinamarca: posiciones cortas ≥ 0,5 % en un xlsx mensual de la Finanstilsynet; las juntas aprueban la remuneración sin recuento (voto libre en contra: hueco, con la asistencia). Tasa libre: el Bund (corona anclada al euro).

## Reino Unido
- PER adelantado de Yahoo y otros agregadores en PENIQUES para cotizadas de Londres: comprobar la unidad antes de usarlo de contraste (precio en GBp, BPA en GBP). ESEF británico: la deuda a corto y el dividendo a cuenta van en conceptos aparte; `cuentas.mjs` los marca en `parciales` y `dpa_base`.
- Las notas de prensa de resultados anuales traen cuentas y notas completas en ~40 páginas: la vía más barata para series de diez años.
- Investegate: el `.txt` empieza por un «Summary by AI» con cifras; no lo uses, lee el cuerpo del RNS.
- Cotizaciones en GBp: `bolsa.mjs` no las pasa a GBP.
- Sentimiento: interactive investor, Motley Fool UK y prensa sectorial; LSE Chat da 403.

## Japón
- Web de inversores en inglés (*Securities Report*, *Kessan Tanshin*); EDINET sin clave a través de IR BANK y `disclosure2dl`. Muchos PDF en japonés salen ilegibles: busca la versión inglesa.
- Ejercicio a marzo (Keyence al 20 de marzo: `--cierre-dia`); unas empresas nombran el ejercicio por el año en que empieza y los proveedores por el de cierre: fija la equivalencia al principio.
- Sin arrendamientos en balance hasta 2028; la remuneración no se vota cada año (`voto_cupula_pct`); no hay registro público de operaciones de directivos; cortos solo por encima del 0,5 %.

## Australia
- Anuncios de la ASX: la API solo da los 5 últimos; los antiguos salen del listado anual (`announcements.do?...&year=`) y `displayAnnouncement.do?display=pdf&idsId=` da el PDF directo (un script corto resolvió 346 anuncios en un minuto; merecería ser `herramientas/asx.mjs`).
- Operaciones de directivos en los «Appendix 3Y»; accionistas significativos en los formularios 603/604/605; posiciones cortas en `download.asic.gov.au/short-selling/RR<AAAAMMDD>-001-SSDailyAggShortPos.csv` (~4 días hábiles de retraso); tasa libre en la tabla F2 del RBA (Excel de 8 MB).
- Sentimiento: solo abre Motley Fool Australia (`fool.com.au/tickers/asx-<ticker>/page/N/`); HotCopper, Strawman, Market Index, Livewire y Simply Wall St dan 403 o piden JavaScript.
- Cotiza en AUD y publica en USD (CSL): ver la beta en `lecciones.md`; con ADR, comprueba la equivalencia con el precio.

## Canadá
- SEDAR+ (403) y SEDI (antibot) no abren sin navegador: web de la empresa (solo el ciclo en curso), MFN y GlobeNewswire, e InsiderTrades para directivos. El voto consultivo de remuneración puede no existir (hueco con sus intentos).
- Sentimiento: Stockchase; Stockhouse da 403.
