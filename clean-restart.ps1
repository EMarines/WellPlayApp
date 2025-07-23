# Script para limpiar y reiniciar el servidor de desarrollo
# Soluciona problemas EPERM de manera definitiva

Write-Host "🧹 Limpiando proyecto WellPlay..." -ForegroundColor Cyan

# 1. Terminar todos los procesos de Node.js
Write-Host "⏹️ Terminando procesos de Node.js..." -ForegroundColor Yellow
taskkill /F /IM node.exe 2>$null
Start-Sleep -Seconds 2

# 2. Limpiar archivos temporales y cache
Write-Host "🗑️ Eliminando archivos temporales..." -ForegroundColor Yellow
Remove-Item -Recurse -Force .svelte-kit -ErrorAction SilentlyContinue
Remove-Item -Recurse -Force node_modules\.vite -ErrorAction SilentlyContinue
Remove-Item -Recurse -Force node_modules\.cache -ErrorAction SilentlyContinue
Remove-Item -Recurse -Force .turbo -ErrorAction SilentlyContinue

# 3. Limpiar archivos de VS Code temporales
Write-Host "🔧 Limpiando archivos de VS Code..." -ForegroundColor Yellow
Remove-Item -Recurse -Force .vscode\settings.json.backup -ErrorAction SilentlyContinue

# 4. Verificar que no hay procesos activos
$nodeProcesses = Get-Process -Name "node" -ErrorAction SilentlyContinue
if ($nodeProcesses) {
    Write-Host "⚠️ Aún hay procesos de Node.js activos, terminándolos..." -ForegroundColor Red
    $nodeProcesses | ForEach-Object { Stop-Process -Id $_.Id -Force -ErrorAction SilentlyContinue }
    Start-Sleep -Seconds 2
}

# 5. Reinstalar dependencias si es necesario
if ($args[0] -eq "--full") {
    Write-Host "📦 Reinstalando dependencias..." -ForegroundColor Magenta
    Remove-Item -Recurse -Force node_modules -ErrorAction SilentlyContinue
    npm install
}

# 6. Iniciar servidor de desarrollo
Write-Host "🚀 Iniciando servidor de desarrollo..." -ForegroundColor Green
npm run dev

Write-Host "✅ Limpieza completada. Servidor iniciando..." -ForegroundColor Green
