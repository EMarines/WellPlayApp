# 🔥 Configuración de Firebase para WellPlay

## ❌ PROBLEMA ACTUAL - SOLUCIÓN URGENTE
**Error:** "Missing or insufficient permissions" al cargar perfiles de usuario.

### � SOLUCIÓN INMEDIATA - Aplicar Reglas de Firestore

#### Paso 1: Ir a Firebase Console
1. Ve a [Firebase Console](https://console.firebase.google.com/)
2. Selecciona tu proyecto WellPlay
3. En el menú lateral, ve a **Firestore Database**
4. Haz clic en la pestaña **Rules**

#### Paso 2: Reemplazar Reglas Actuales
Copia y pega estas reglas (reemplaza todo el contenido actual):

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Permitir acceso completo a usuarios autenticados a sus propios documentos
    match /users/{userId} {
      allow read, write: if request.auth != null && request.auth.uid == userId;
    }
    
    // Reglas para futuras colecciones
    match /challenges/{document=**} {
      allow read, write: if request.auth != null;
    }
    
    match /workouts/{document=**} {
      allow read, write: if request.auth != null;
    }
  }
}
```

#### Paso 3: Publicar Reglas
1. Haz clic en **"Publish"** o **"Publicar"**
2. Confirma la acción
3. ✅ El error debería desaparecer inmediatamente

---

## �🔥 Pasos para configurar Firebase (Configuración inicial)

### 1. Crear proyecto en Firebase Console

1. Ve a [Firebase Console](https://console.firebase.google.com/)
2. Haz clic en "Crear proyecto"
3. Nombre del proyecto: `wellplay-app`
4. Acepta los términos y crea el proyecto

### 2. Configurar Authentication

1. En el panel izquierdo, ve a **Authentication**
2. Haz clic en "Comenzar"
3. Ve a la pestaña **Sign-in method**
4. Habilita **Email/Password**
5. (Opcional) Habilita Google, Facebook, etc.

### 3. Configurar Firestore Database

1. En el panel izquierdo, ve a **Firestore Database**
2. Haz clic en "Crear base de datos"
3. Selecciona "Comenzar en modo de prueba"
4. Elige la ubicación más cercana (ej: southamerica-east1)

### 4. Configurar Storage

1. En el panel izquierdo, ve a **Storage**
2. Haz clic en "Comenzar"
3. Acepta las reglas por defecto

### 5. Obtener configuración de la app

1. Ve a **Project Settings** (ícono de engranaje)
2. Baja hasta "Tus apps"
3. Haz clic en "Agregar app" → Web (icono </>)
4. Registra la app: `WellPlay`
5. **NO** configures hosting por ahora
6. Copia el objeto `firebaseConfig`

### 6. Actualizar archivo de configuración

Reemplaza el contenido en `src/lib/firebase.ts`:

```typescript
const firebaseConfig = {
  apiKey: "tu-api-key-real",
  authDomain: "wellplay-app.firebaseapp.com",
  projectId: "wellplay-app",
  storageBucket: "wellplay-app.appspot.com",
  messagingSenderId: "123456789012",
  appId: "1:123456789012:web:abcdef123456789"
};
```

### 7. Configurar reglas de seguridad

#### Firestore Rules:
```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Usuarios pueden leer/escribir sus propios datos
    match /users/{userId} {
      allow read, write: if request.auth != null && request.auth.uid == userId;
    }
    
    // Datos públicos de la app
    match /app_data/{document} {
      allow read: if true;
      allow write: if request.auth != null;
    }
  }
}
```

#### Storage Rules:
```javascript
rules_version = '2';
service firebase.storage {
  match /b/{bucket}/o {
    // Usuarios pueden subir sus propias fotos
    match /users/{userId}/{allPaths=**} {
      allow read, write: if request.auth != null && request.auth.uid == userId;
    }
  }
}
```

## 🚀 Estructura de datos recomendada

### Colección `users`:
```javascript
{
  uid: "user-id",
  email: "user@example.com",
  displayName: "Usuario",
  photoURL: "url-to-photo",
  createdAt: timestamp,
  lastLoginAt: timestamp,
  preferences: {
    theme: "light",
    notifications: true
  },
  stats: {
    challengesCompleted: 0,
    totalPoints: 0,
    level: 1
  }
}
```

### Colección `challenges`:
```javascript
{
  id: "challenge-id",
  title: "Reto de 30 días",
  description: "Descripción del reto",
  difficulty: "beginner|intermediate|advanced",
  category: "fitness|nutrition|mindfulness",
  duration: 30, // días
  points: 100,
  isActive: true,
  createdAt: timestamp
}
```

## 🔧 Comandos útiles

```bash
# Verificar que funciona
npm run dev

# Construir para producción
npm run build
```

## 🌟 Funcionalidades implementadas

- ✅ Registro de usuarios
- ✅ Inicio de sesión
- ✅ Cierre de sesión
- ✅ Persistencia de sesión
- ✅ Protección de rutas
- ✅ UI responsive

## 📋 Siguientes pasos

1. **Configurar Firebase Console** (usar este documento)
2. **Agregar perfil de usuario**
3. **Implementar retos y progreso**
4. **Agregar chat en tiempo real**
5. **Implementar notificaciones**
6. **Migrar a AWS** (cuando sea necesario)

## 🆘 Solución de problemas

### Error: "Firebase not configured"
- Verifica que copiaste correctamente la configuración
- Asegúrate de que el proyecto esté activo en Firebase Console

### Error: "Auth domain not authorized"
- Ve a Authentication → Settings → Authorized domains
- Agrega `localhost` y tu dominio de producción

### Error: "Firestore rules deny"
- Verifica las reglas de Firestore
- En modo desarrollo puedes usar: `allow read, write: if true;`
