# Abre un .docx con Word y lo exporta a PDF (sirve para revisar que Word lo abre sin quejarse).
#   powershell -File construccion/a-pdf.ps1 informes/ejemplo-empresa.docx
# Word se cierra siempre al terminar, aunque falle la exportación (si no, deja el archivo bloqueado).
param([Parameter(Mandatory = $true)][string]$Docx)
$ruta = (Resolve-Path $Docx).Path
$pdf = [System.IO.Path]::ChangeExtension($ruta, '.pdf')
$word = $null; $doc = $null
try {
  $word = New-Object -ComObject Word.Application
  $word.Visible = $false
  $word.DisplayAlerts = 0
  # OpenAndRepair = $false: si Word necesita reparar el archivo, falla y lo vemos.
  $doc = $word.Documents.Open($ruta, $false, $true, $false)
  $doc.ExportAsFixedFormat($pdf, 17)
  "Paginas: " + $doc.ComputeStatistics(2)
  "PDF: $pdf"
} catch {
  "ERROR: " + $_.Exception.Message
  exit 1
} finally {
  if ($doc) { $doc.Close([ref]0) | Out-Null; [void][System.Runtime.InteropServices.Marshal]::ReleaseComObject($doc) }
  # Solo se cierra Word si no queda ningún otro documento abierto en esa instancia (puede ser la del usuario).
  if ($word) { if ($word.Documents.Count -eq 0) { $word.Quit() | Out-Null }; [void][System.Runtime.InteropServices.Marshal]::ReleaseComObject($word) }
  [GC]::Collect(); [GC]::WaitForPendingFinalizers()
}
