# 🔧 Solución de Firebase Storage CORS

## ❌ Error Actual
```
Access to XMLHttpRequest at 'https://firebasestorage.googleapis.com/...' 
from origin 'http://localhost:5173' has been blocked by CORS policy
```

## ✅ Soluciones

### 1. Configurar Reglas de Firebase Storage

**Ve a Firebase Console → Storage → Rules y aplica:**

```javascript
rules_version = '2';
service firebase.storage {
  match /b/{bucket}/o {
    // Reglas para fotos de perfil
    match /users/{userId}/profile/{allPaths=**} {
      allow read, write: if request.auth != null && request.auth.uid == userId;
    }
    
    // Regla general (para debugging)
    match /{allPaths=**} {
      allow read, write: if request.auth != null;
    }
  }
}
```

### 2. Verificar Storage está habilitado

1. Firebase Console → Storage
2. Si no está activo: "Get started" → "Test mode"
3. Seleccionar región: southamerica-east1

### 3. Configuración CORS (si persiste el error)

Si el error continúa, ejecutar desde Google Cloud Shell:

```bash
# Crear archivo cors.json
echo '[
  {
    "origin": ["http://localhost:5173", "https://tu-dominio.com"],
    "method": ["GET", "POST", "PUT", "DELETE"],
    "maxAgeSeconds": 3600
  }
]' > cors.json

# Aplicar configuración CORS
gsutil cors set cors.json gs://wellplay-app.firebasestorage.app
```

### 4. Verificación de Configuración

**Ejecutar en la consola del navegador para verificar:**

```javascript
// Test de autenticación
console.log('Usuario autenticado:', !!firebase.auth().currentUser);

// Test de Storage
console.log('Storage configurado:', !!firebase.storage());
```

## 🚨 Pasos Inmediatos

1. **Ir a Firebase Console**
2. **Storage → Rules → Aplicar reglas nuevas**
3. **Verificar que Storage esté habilitado**
4. **Probar subida de foto nuevamente**

## 📝 Notas Técnicas

- El error CORS indica que el navegador bloquea la petición
- Firebase Storage necesita reglas específicas para cada operación
- Las reglas deben permitir operaciones read/write para usuarios autenticados
- El bucket debe estar configurado correctamente en la región seleccionada

---

**Una vez aplicadas las reglas de Storage, el error debería desaparecer.**
