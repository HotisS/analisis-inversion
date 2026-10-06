# Convierte cada página de un PDF en PNG con el lector de PDF de Windows (sin instalar nada).
#   powershell -File construccion/pdf-a-png.ps1 informes/ejemplo-empresa.pdf <carpeta-salida> [anchoPx]
param([Parameter(Mandatory = $true)][string]$Pdf, [Parameter(Mandatory = $true)][string]$Salida, [int]$Ancho = 1100)
Add-Type -AssemblyName System.Runtime.WindowsRuntime
$metodos = [System.WindowsRuntimeSystemExtensions].GetMethods()
$asTaskOp = ($metodos | Where-Object { $_.Name -eq 'AsTask' -and $_.GetParameters().Count -eq 1 -and $_.GetParameters()[0].ParameterType.Name -eq 'IAsyncOperation`1' })[0]
$asTaskAc = ($metodos | Where-Object { $_.Name -eq 'AsTask' -and $_.GetParameters().Count -eq 1 -and $_.GetParameters()[0].ParameterType.Name -eq 'IAsyncAction' })[0]
function Esperar($op, $tipo) { $t = $asTaskOp.MakeGenericMethod($tipo).Invoke($null, @($op)); $t.Wait(-1) | Out-Null; $t.Result }
function EsperarAccion($ac) { $t = $asTaskAc.Invoke($null, @($ac)); $t.Wait(-1) | Out-Null }
[Windows.Storage.StorageFile, Windows.Storage, ContentType = WindowsRuntime] | Out-Null
[Windows.Data.Pdf.PdfDocument, Windows.Data.Pdf, ContentType = WindowsRuntime] | Out-Null
New-Item -ItemType Directory -Force $Salida | Out-Null
$archivo = Esperar ([Windows.Storage.StorageFile]::GetFileFromPathAsync((Resolve-Path $Pdf).Path)) ([Windows.Storage.StorageFile])
$doc = Esperar ([Windows.Data.Pdf.PdfDocument]::LoadFromFileAsync($archivo)) ([Windows.Data.Pdf.PdfDocument])
$carpeta = Esperar ([Windows.Storage.StorageFolder]::GetFolderFromPathAsync((Resolve-Path $Salida).Path)) ([Windows.Storage.StorageFolder])
for ($i = 0; $i -lt $doc.PageCount; $i++) {
  $pag = $doc.GetPage($i)
  $opc = New-Object Windows.Data.Pdf.PdfPageRenderOptions
  $opc.DestinationWidth = $Ancho
  $png = Esperar ($carpeta.CreateFileAsync(('p{0:D2}.png' -f ($i + 1)), [Windows.Storage.CreationCollisionOption]::ReplaceExisting)) ([Windows.Storage.StorageFile])
  $flujo = Esperar ($png.OpenAsync([Windows.Storage.FileAccessMode]::ReadWrite)) ([Windows.Storage.Streams.IRandomAccessStream])
  EsperarAccion ($pag.RenderToStreamAsync($flujo, $opc))
  $flujo.Dispose()
}
"Paginas: $($doc.PageCount)"
