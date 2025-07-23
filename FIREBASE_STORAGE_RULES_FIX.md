# 🔥 SOLUCIÓN URGENTE - Reglas de Firebase Storage

## 🚨 Problema Actual
Error CORS al subir fotos: "Access to XMLHttpRequest has been blocked by CORS policy"

## ✅ SOLUCIÓN INMEDIATA

### Paso 1: Ir a Firebase Console - Storage Rules
1. Ve a [Firebase Console](https://console.firebase.google.com/)
2. Selecciona tu proyecto "wellplay-app"
3. Ve a **Storage** → **Rules** (NO Firestore Rules)

### Paso 2: Aplicar Reglas de Storage
Reemplaza TODAS las reglas de Storage con estas:

```javascript
rules_version = '2';
service firebase.storage {
  match /b/{bucket}/o {
    // Permitir a usuarios autenticados subir/leer sus propias fotos
    match /users/{userId}/{allPaths=**} {
      allow read, write: if request.auth != null && request.auth.uid == userId;
    }
    
    // Regla más permisiva para debugging (temporal)
    match /{allPaths=**} {
      allow read, write: if request.auth != null;
    }
  }
}
```

### Paso 3: Publicar Reglas de Storage
1. Haz clic en **"Publish"** en la sección de Storage Rules
2. Confirma la acción

### Paso 4: Configurar CORS
También necesitamos configurar CORS para Storage. Ve a la siguiente sección.

## 📋 Verificación Rápida
- ✅ Firestore Rules: Aplicadas
- ❌ Storage Rules: NECESARIAS
- ❌ CORS Config: NECESARIA

## 🔧 Configuración CORS (Opcional si Storage Rules no funcionan)

Si después de aplicar las reglas de Storage sigues teniendo problemas, necesitarás configurar CORS usando Google Cloud Console.
