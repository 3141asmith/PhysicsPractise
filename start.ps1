$ErrorActionPreference = 'Stop'
$node = Get-Command node -ErrorAction SilentlyContinue
if ($node) {
    & $node.Source "--env-file-if-exists=$PSScriptRoot\.env" (Join-Path $PSScriptRoot 'server.cjs')
} else {
    $portable = Join-Path (Split-Path $PSScriptRoot) '.runtime\node-v24.13.0-win-x64\node.exe'
    if (-not (Test-Path -LiteralPath $portable)) { throw 'Install Node.js 24 or later, then run this script again.' }
    & $portable "--env-file-if-exists=$PSScriptRoot\.env" (Join-Path $PSScriptRoot 'server.cjs')
}
