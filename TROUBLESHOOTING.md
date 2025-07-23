# 🛠️ Solución de Problemas EPERM - WellPlay

## ❌ Problema
Error `EPERM: operation not permitted` en Windows/OneDrive al trabajar con SvelteKit.

## ✅ Soluciones Automáticas

### Opción 1: Script de Limpieza Rápida
```bash
npm run clean
```

### Opción 2: Limpieza Completa (reinstala dependencias)
```bash
npm run clean:full
```

### Opción 3: Reinicio Rápido
```bash
npm run restart
```

### Opción 4: Desarrollo con Limpieza
```bash
npm run dev:clean
```

## 🔧 Solución Manual

Si los scripts no funcionan, ejecuta estos comandos en PowerShell:

```powershell
# 1. Terminar procesos Node.js
taskkill /F /IM node.exe

# 2. Limpiar archivos temporales
Remove-Item -Recurse -Force .svelte-kit -ErrorAction SilentlyContinue
Remove-Item -Recurse -Force node_modules\.vite -ErrorAction SilentlyContinue
Remove-Item -Recurse -Force node_modules\.cache -ErrorAction SilentlyContinue

# 3. Reiniciar desarrollo
npm run dev
```

## 🚨 Prevención

### Configuraciones implementadas:
- ✅ Vite configurado para ignorar archivos temporales de OneDrive
- ✅ `.gitignore` mejorado para cache y archivos temporales
- ✅ Scripts automatizados para limpieza
- ✅ Configuración de build optimizada

### Recomendaciones:
1. **Siempre usa los scripts npm**: `npm run clean` antes de reportar errores
2. **No edites archivos en `.svelte-kit/`**: Son generados automáticamente
3. **Si persiste**: Usa `npm run clean:full` para reinstalar todo
4. **OneDrive**: Considera excluir `node_modules` y `.svelte-kit` de la sincronización

## 🔄 En caso de emergencia

Si nada funciona:
```bash
# Limpieza nuclear
npm run clean:full
# O manualmente:
rm -rf node_modules .svelte-kit
npm install
npm run dev
```

## 📝 Notas Técnicas

- **Causa**: Windows/OneDrive bloquea archivos temporales de Vite/SvelteKit
- **Solución**: Limpieza automática de archivos de cache y procesos
- **Prevención**: Configuración optimizada de Vite y ignorar archivos problemáticos
