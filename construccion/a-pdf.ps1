# Abre un .docx con Word y lo exporta a PDF (sirve para revisar que Word lo abre sin quejarse).
#   powershell -File construccion/a-pdf.ps1 informes/ejemplo-empresa.docx
param([Parameter(Mandatory = $true)][string]$Docx)
$ruta = (Resolve-Path $Docx).Path
$pdf = [System.IO.Path]::ChangeExtension($ruta, '.pdf')
$word = New-Object -ComObject Word.Application
$word.Visible = $false
$word.DisplayAlerts = 0
try {
  # OpenAndRepair = $false: si Word necesita reparar el archivo, falla y lo vemos.
  $doc = $word.Documents.Open($ruta, $false, $true, $false)
  $doc.ExportAsFixedFormat($pdf, 17)
  "Paginas: " + $doc.ComputeStatistics(2)
  $doc.Close([ref]0)
  "PDF: $pdf"
} finally {
  $word.Quit()
}
