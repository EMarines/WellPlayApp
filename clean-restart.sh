#!/bin/bash
# Script de emergencia para Linux/Mac (equivalente al .ps1)

echo "🧹 Limpiando proyecto WellPlay..."

# Terminar procesos Node.js
pkill -f node 2>/dev/null || true
sleep 2

# Limpiar archivos temporales
rm -rf .svelte-kit
rm -rf node_modules/.vite
rm -rf node_modules/.cache
rm -rf .turbo

echo "🚀 Iniciando servidor..."
npm run dev
