# 🔥 SOLUCIÓN URGENTE - Reglas de Firestore Actualizadas

## 🚨 Problema Actual
"Missing or insufficient permissions" después de login exitoso.

## ✅ SOLUCIÓN INMEDIATA

### Paso 1: Ir a Firebase Console
1. Ve a [Firebase Console](https://console.firebase.google.com/)
2. Selecciona tu proyecto "wellplay-app"
3. Ve a **Firestore Database** → **Rules**

### Paso 2: Aplicar Reglas Simplificadas
Reemplaza TODAS las reglas actuales con estas (más permisivas para debugging):

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Regla muy permisiva para usuarios autenticados
    match /{document=**} {
      allow read, write: if request.auth != null;
    }
    
    // Regla específica para usuarios (redundante pero necesaria)
    match /users/{userId} {
      allow read, write: if request.auth != null;
    }
  }
}
```

### Paso 3: Publicar Reglas
1. Haz clic en **"Publish"**
2. Confirma la acción

## 🧪 Verificación

Después de aplicar las reglas:
1. Recarga la aplicación web
2. Inicia sesión
3. Haz clic en "Profile"
4. El error debería desaparecer

## 📋 Reglas de Producción (Aplicar después)

Una vez que funcione, puedes usar reglas más restrictivas:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Reglas específicas para usuarios
    match /users/{userId} {
      allow read, write: if request.auth != null && request.auth.uid == userId;
    }
    
    // Reglas para otras colecciones
    match /challenges/{challengeId} {
      allow read: if request.auth != null;
      allow write: if request.auth != null && 
                   (request.auth.uid == resource.data.createdBy || 
                    request.auth.uid in resource.data.participants);
    }
    
    match /workouts/{workoutId} {
      allow read, write: if request.auth != null && request.auth.uid == resource.data.userId;
    }
  }
}
```

---

**🎯 ACCIÓN REQUERIDA: Aplicar las reglas simplificadas AHORA en Firebase Console.**
