# Script de instalación automática para Dinastía MVP
# Ejecutar en PowerShell como Administrador

Write-Host "╔══════════════════════════════════════════════════════╗" -ForegroundColor Cyan
Write-Host "║     DINASTIA MVP - INSTALACIÓN AUTOMÁTICA           ║" -ForegroundColor Cyan
Write-Host "╚══════════════════════════════════════════════════════╝" -ForegroundColor Cyan
Write-Host ""

# Verificar Node.js
Write-Host "→ Verificando Node.js..." -ForegroundColor Yellow
if (Get-Command node -ErrorAction SilentlyContinue) {
    $nodeVersion = node --version
    Write-Host "✓ Node.js instalado: $nodeVersion" -ForegroundColor Green
} else {
    Write-Host "✗ Node.js NO encontrado" -ForegroundColor Red
    Write-Host "  Descarga Node.js de: https://nodejs.org/" -ForegroundColor Yellow
    Write-Host "  Instala y ejecuta este script de nuevo" -ForegroundColor Yellow
    pause
    exit
}

# Verificar npm
Write-Host "→ Verificando npm..." -ForegroundColor Yellow
if (Get-Command npm -ErrorAction SilentlyContinue) {
    $npmVersion = npm --version
    Write-Host "✓ npm instalado: v$npmVersion" -ForegroundColor Green
} else {
    Write-Host "✗ npm NO encontrado" -ForegroundColor Red
    pause
    exit
}

# Instalar Angular CLI
Write-Host ""
Write-Host "→ Instalando Angular CLI globalmente..." -ForegroundColor Yellow
Write-Host "  (Esto puede tardar 1-2 minutos)" -ForegroundColor Gray

npm install -g @angular/cli

if ($LASTEXITCODE -eq 0) {
    Write-Host "✓ Angular CLI instalado correctamente" -ForegroundColor Green
} else {
    Write-Host "✗ Error instalando Angular CLI" -ForegroundColor Red
    Write-Host "  Intenta ejecutar PowerShell como Administrador" -ForegroundColor Yellow
    pause
    exit
}

# Verificar Angular CLI
Write-Host ""
Write-Host "→ Verificando Angular CLI..." -ForegroundColor Yellow
$ngVersion = ng version 2>$null
if ($LASTEXITCODE -eq 0) {
    Write-Host "✓ Angular CLI verificado" -ForegroundColor Green
} else {
    Write-Host "⚠ Angular CLI instalado pero no verificado" -ForegroundColor Yellow
}

# Navegar al proyecto
Write-Host ""
Write-Host "→ Navegando al proyecto..." -ForegroundColor Yellow
$projectPath = Split-Path -Parent $MyInvocation.MyCommand.Path
Set-Location $projectPath
Write-Host "✓ Ubicación: $projectPath" -ForegroundColor Green

# Instalar dependencias del proyecto
Write-Host ""
Write-Host "→ Instalando dependencias del proyecto..." -ForegroundColor Yellow
Write-Host "  (Esto puede tardar 2-3 minutos)" -ForegroundColor Gray

npm install

if ($LASTEXITCODE -eq 0) {
    Write-Host "✓ Dependencias instaladas correctamente" -ForegroundColor Green
} else {
    Write-Host "✗ Error instalando dependencias" -ForegroundColor Red
    pause
    exit
}

# Resumen final
Write-Host ""
Write-Host "╔══════════════════════════════════════════════════════╗" -ForegroundColor Green
Write-Host "║            ✓ INSTALACIÓN COMPLETADA                 ║" -ForegroundColor Green
Write-Host "╚══════════════════════════════════════════════════════╝" -ForegroundColor Green
Write-Host ""
Write-Host "Para iniciar el servidor:" -ForegroundColor Cyan
Write-Host "  npm start" -ForegroundColor White
Write-Host ""
Write-Host "Luego abre tu navegador en:" -ForegroundColor Cyan
Write-Host "  http://localhost:4200" -ForegroundColor White
Write-Host ""

# Preguntar si quiere iniciar ahora
$response = Read-Host "¿Quieres iniciar el servidor ahora? (S/N)"
if ($response -eq 'S' -or $response -eq 's') {
    Write-Host ""
    Write-Host "→ Iniciando servidor..." -ForegroundColor Yellow
    Write-Host "  Presiona Ctrl+C para detener" -ForegroundColor Gray
    Write-Host ""
    
    Start-Sleep -Seconds 2
    
    # Abrir navegador después de 5 segundos
    Start-Job -ScriptBlock {
        Start-Sleep -Seconds 5
        Start-Process "http://localhost:4200"
    } | Out-Null
    
    npm start
} else {
    Write-Host ""
    Write-Host "Para iniciar cuando quieras:" -ForegroundColor Cyan
    Write-Host "  cd $projectPath" -ForegroundColor White
    Write-Host "  npm start" -ForegroundColor White
    Write-Host ""
    pause
}
