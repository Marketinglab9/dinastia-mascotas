# Script de limpieza y reinstalación para Dinastía MVP
# Soluciona el error de @rollup/rollup-win32-x64-msvc

Write-Host "╔══════════════════════════════════════════════════════╗" -ForegroundColor Cyan
Write-Host "║     LIMPIEZA Y REINSTALACIÓN - Dinastía MVP          ║" -ForegroundColor Cyan
Write-Host "╚══════════════════════════════════════════════════════╝" -ForegroundColor Cyan
Write-Host ""

# Paso 1: Limpiar cache de npm
Write-Host "→ Paso 1/5: Limpiando cache de npm..." -ForegroundColor Yellow
npm cache clean --force
if ($LASTEXITCODE -eq 0) {
    Write-Host "✓ Cache limpiado" -ForegroundColor Green
}

# Paso 2: Eliminar node_modules
Write-Host ""
Write-Host "→ Paso 2/5: Eliminando node_modules..." -ForegroundColor Yellow
if (Test-Path "node_modules") {
    Remove-Item -Recurse -Force node_modules
    Write-Host "✓ node_modules eliminado" -ForegroundColor Green
} else {
    Write-Host "⚠ node_modules no existe (saltando)" -ForegroundColor Yellow
}

# Paso 3: Eliminar package-lock.json
Write-Host ""
Write-Host "→ Paso 3/5: Eliminando package-lock.json..." -ForegroundColor Yellow
if (Test-Path "package-lock.json") {
    Remove-Item -Force package-lock.json
    Write-Host "✓ package-lock.json eliminado" -ForegroundColor Green
} else {
    Write-Host "⚠ package-lock.json no existe (saltando)" -ForegroundColor Yellow
}

# Paso 4: Reinstalar dependencias
Write-Host ""
Write-Host "→ Paso 4/5: Reinstalando dependencias..." -ForegroundColor Yellow
Write-Host "  (Esto puede tardar 2-3 minutos)" -ForegroundColor Gray
Write-Host ""

npm install

if ($LASTEXITCODE -eq 0) {
    Write-Host ""
    Write-Host "✓ Dependencias instaladas correctamente" -ForegroundColor Green
} else {
    Write-Host ""
    Write-Host "✗ Error instalando dependencias" -ForegroundColor Red
    Write-Host ""
    Write-Host "Intenta ejecutar manualmente:" -ForegroundColor Yellow
    Write-Host "  npm install --legacy-peer-deps" -ForegroundColor White
    Write-Host ""
    pause
    exit
}

# Paso 5: Verificar instalación
Write-Host ""
Write-Host "→ Paso 5/5: Verificando instalación..." -ForegroundColor Yellow

if (Test-Path "node_modules\@rollup\rollup-win32-x64-msvc") {
    Write-Host "✓ Rollup instalado correctamente" -ForegroundColor Green
} else {
    Write-Host "⚠ Rollup no encontrado (puede ser normal)" -ForegroundColor Yellow
}

# Resumen final
Write-Host ""
Write-Host "╔══════════════════════════════════════════════════════╗" -ForegroundColor Green
Write-Host "║            ✓ REINSTALACIÓN COMPLETADA               ║" -ForegroundColor Green
Write-Host "╚══════════════════════════════════════════════════════╝" -ForegroundColor Green
Write-Host ""
Write-Host "Ahora puedes iniciar el servidor:" -ForegroundColor Cyan
Write-Host "  npm start" -ForegroundColor White
Write-Host ""

# Preguntar si quiere iniciar
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
    Write-Host "  npm start" -ForegroundColor White
    Write-Host ""
    pause
}
