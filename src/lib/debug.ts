// Archivo temporal para debuggear el problema de persistencia
// Este archivo se puede eliminar después de resolver el problema

import { UserProfileService } from '$lib/services/userProfile';
import { auth, storage, db } from '$lib/firebase';
import { onAuthStateChanged } from 'firebase/auth';
import { ref, uploadBytes, getDownloadURL, deleteObject } from 'firebase/storage';
import { doc, getDoc } from 'firebase/firestore';

export class DebugService {
	
	/**
	 * Función para debuggear permisos de Firestore
	 */
	static async debugFirestorePermissions() {
		console.log('🔍 DEBUGGEANDO PERMISOS DE FIRESTORE...');
		
		// 1. Verificar autenticación
		if (!auth.currentUser) {
			console.log('❌ Usuario no autenticado');
			return;
		}
		
		const uid = auth.currentUser.uid;
		console.log('✅ Usuario autenticado:', uid);
		console.log('📧 Email:', auth.currentUser.email);
		
		// 2. Verificar token de autenticación
		try {
			const token = await auth.currentUser.getIdToken();
			console.log('🎫 Token de autenticación obtenido (primeros 50 chars):', token.substring(0, 50) + '...');
		} catch (error) {
			console.error('❌ Error al obtener token:', error);
		}
		
		// 3. Intentar operación básica de lectura
		try {
			console.log('📖 Intentando leer documento de usuario...');
			const docRef = doc(db, 'users', uid);
			const docSnap = await getDoc(docRef);
			
			if (docSnap.exists()) {
				console.log('✅ Documento encontrado:', Object.keys(docSnap.data()));
			} else {
				console.log('📝 Documento no existe, se puede crear uno');
			}
		} catch (error: any) {
			console.error('❌ Error de permisos al leer documento:', error);
			console.log('🔍 Código de error:', error.code);
			console.log('🔍 Mensaje:', error.message);
			
			if (error.code === 'permission-denied') {
				console.log('🚨 PROBLEMA: Las reglas de Firestore no permiten el acceso');
				console.log('🔧 SOLUCIÓN: Actualizar reglas en Firebase Console');
			}
		}
		
		// 4. Verificar configuración de proyecto
		console.log('🏗️ Proyecto ID:', db.app.options.projectId);
		console.log('🔧 Configuración Auth Domain:', auth.app.options.authDomain);
	}
	
	/**
	 * Función para debuggear Firebase Storage
	 */
	static async debugStorageConfig() {
		console.log('🔍 DEBUGGEANDO CONFIGURACIÓN DE FIREBASE STORAGE...');
		
		// 1. Verificar autenticación
		if (!auth.currentUser) {
			console.log('❌ Usuario no autenticado - necesario para Storage');
			return;
		}
		
		console.log('✅ Usuario autenticado:', auth.currentUser.uid);
		
		// 2. Verificar configuración de Storage
		try {
			console.log('📦 Storage configurado:', !!storage);
			console.log('🏪 Storage bucket:', storage.app.options.storageBucket);
		} catch (error) {
			console.error('❌ Error en configuración de Storage:', error);
			return;
		}
		
		// 3. Test básico de referencia
		try {
			const testRef = ref(storage, 'test/debug.txt');
			console.log('✅ Referencia de Storage creada correctamente');
		} catch (error) {
			console.error('❌ Error al crear referencia de Storage:', error);
			return;
		}
		
		// 4. Verificar que Storage esté realmente habilitado
		console.log('🔍 Verificando si Storage está habilitado...');
		console.log('💡 Si ves errores CORS después de esto, significa que Storage no está habilitado en Firebase Console');
		console.log('📋 Pasos para habilitar:');
		console.log('   1. Ve a Firebase Console');
		console.log('   2. Storage → Get started');
		console.log('   3. Start in test mode');
		console.log('   4. Selecciona región southamerica-east1');
		console.log('   5. Aplica las reglas de Storage que se proporcionaron');
		
		// 5. Test de permisos simplificado
		try {
			const uid = auth.currentUser.uid;
			const testFile = new Blob(['storage-test'], { type: 'text/plain' });
			const testRef = ref(storage, `users/${uid}/test/debug_${Date.now()}.txt`);
			
			console.log('🧪 Probando subida de archivo de prueba...');
			await uploadBytes(testRef, testFile);
			console.log('🎉 ¡ÉXITO! Storage configurado correctamente');
		} catch (error: any) {
			console.error('❌ Error en test de subida:', error);
			
			if (error.code === 'storage/project-not-found') {
				console.log('� ERROR: Storage no está habilitado en este proyecto');
				console.log('🔧 SOLUCIÓN: Ve a Firebase Console → Storage → Get started');
			} else if (error.message?.includes('cors') || error.message?.includes('CORS')) {
				console.log('🚨 ERROR: Problema de CORS - Storage no configurado correctamente');
				console.log('🔧 SOLUCIÓN: Habilitar Storage en Firebase Console');
			} else if (error.code === 'storage/unauthorized') {
				console.log('🚨 ERROR: Sin permisos - Verifica reglas de Storage');
				console.log('🔧 SOLUCIÓN: Aplicar reglas de Storage proporcionadas');
			} else {
				console.log('🚨 ERROR desconocido:', error.code, error.message);
			}
		}
	}
	
	/**
	 * Debug específico para problemas de subida a Storage (CORS)
	 */
	static async debugStorageUpload(): Promise<void> {
		console.log('🔍 DEBUGGEANDO SUBIDA A FIREBASE STORAGE...');
		console.log('-------------------------------------------');
		
		try {
			// Verificar autenticación
			const user = auth.currentUser;
			if (!user) {
				console.log('❌ Usuario no autenticado');
				return;
			}
			
			console.log('✅ Usuario autenticado:', user.uid);
			console.log('📧 Email:', user.email);
			
			// Obtener token de autenticación
			const token = await user.getIdToken();
			console.log('🎫 Token de autenticación obtenido (primeros 50 chars):', token.substring(0, 50) + '...');
			
			// Intentar crear una referencia de Storage
			console.log('📁 Intentando crear referencia de Storage...');
			const testRef = ref(storage, `users/${user.uid}/test/test.txt`);
			console.log('✅ Referencia creada:', testRef.fullPath);
			
			// Intentar subir un archivo pequeño de prueba
			console.log('📤 Intentando subir archivo de prueba...');
			const testBlob = new Blob(['test'], { type: 'text/plain' });
			const testFile = new File([testBlob], 'test.txt', { type: 'text/plain' });
			
			const snapshot = await uploadBytes(testRef, testFile);
			console.log('✅ Archivo de prueba subido exitosamente');
			
			// Obtener URL de descarga
			const downloadURL = await getDownloadURL(snapshot.ref);
			console.log('🔗 URL de descarga:', downloadURL);
			
			// Eliminar archivo de prueba
			await deleteObject(testRef);
			console.log('🗑️ Archivo de prueba eliminado');
			
			console.log('✅ STORAGE FUNCIONA CORRECTAMENTE');
			
		} catch (error) {
			console.error('❌ Error en Storage:', error);
			console.log('🔍 Código de error:', (error as any).code);
			console.log('🔍 Mensaje:', (error as any).message);
			
			if ((error as any).message?.includes('cors') || (error as any).message?.includes('CORS')) {
				console.log('🚨 PROBLEMA: Error CORS de Firebase Storage');
				console.log('🔧 SOLUCIÓN: Verificar reglas de Storage en Firebase Console');
				console.log('📋 Reglas necesarias:');
				console.log('rules_version = "2";');
				console.log('service firebase.storage {');
				console.log('  match /b/{bucket}/o {');
				console.log('    match /{allPaths=**} {');
				console.log('      allow read, write: if request.auth != null;');
				console.log('    }');
				console.log('  }');
				console.log('}');
			}
			
			if ((error as any).code === 'storage/unauthorized') {
				console.log('🚨 PROBLEMA: Sin permisos para Storage');
				console.log('🔧 SOLUCIÓN: Actualizar reglas de Storage en Firebase Console');
			}
		}
	}
	
	/**
	 * Función para debuggear el flujo completo de datos
	 */
	static async debugUserFlow() {
		console.log('🔍 INICIANDO DEBUG DE PERSISTENCIA DE DATOS...');
		
		// 1. Verificar estado de autenticación
		console.log('👤 Usuario actual:', auth.currentUser);
		
		if (!auth.currentUser) {
			console.log('❌ No hay usuario autenticado');
			return;
		}
		
		const uid = auth.currentUser.uid;
		console.log('🆔 UID del usuario:', uid);
		
		// 2. Intentar cargar perfil existente
		try {
			console.log('📖 Intentando cargar perfil existente...');
			const existingProfile = await UserProfileService.getUserProfile(uid);
			
			if (existingProfile) {
				console.log('✅ Perfil encontrado:', existingProfile);
			} else {
				console.log('❌ No se encontró perfil para este usuario');
			}
		} catch (error) {
			console.error('❌ Error al cargar perfil:', error);
		}
		
		// 3. Crear datos de prueba
		const testData = {
			bio: 'Bio de prueba - ' + new Date().toISOString(),
			age: 25,
			weight: 70,
			height: 175,
			fitnessLevel: 'intermediate' as const,
			goals: ['Ganar masa muscular'],
			preferences: {
				units: 'metric' as const,
				notifications: true,
				privacy: 'public' as const
			}
		};
		
		// 4. Intentar guardar datos de prueba
		try {
			console.log('💾 Intentando guardar datos de prueba...', testData);
			await UserProfileService.updateUserProfile(uid, testData);
			console.log('✅ Datos guardados correctamente');
		} catch (error) {
			console.error('❌ Error al guardar datos:', error);
			return;
		}
		
		// 5. Verificar que los datos se guardaron
		try {
			console.log('🔄 Verificando que los datos se guardaron...');
			const updatedProfile = await UserProfileService.getUserProfile(uid);
			
			if (updatedProfile) {
				console.log('✅ Datos verificados después de guardar:', updatedProfile);
				
				// Verificar campos específicos
				console.log('📊 Verificación de campos:');
				console.log('  - Bio:', updatedProfile.bio);
				console.log('  - Edad:', updatedProfile.age);
				console.log('  - Peso:', updatedProfile.weight);
				console.log('  - Altura:', updatedProfile.height);
				console.log('  - Nivel fitness:', updatedProfile.fitnessLevel);
				console.log('  - Metas:', updatedProfile.goals);
			} else {
				console.log('❌ No se pudieron verificar los datos guardados');
			}
		} catch (error) {
			console.error('❌ Error al verificar datos guardados:', error);
		}
	}
	
	/**
	 * Función para testear el ciclo completo: guardar → cerrar sesión → iniciar sesión → cargar
	 */
	static async debugPersistenceFlow() {
		console.log('🔄 TESTING FLUJO COMPLETO DE PERSISTENCIA...');
		
		if (!auth.currentUser) {
			console.log('❌ Necesitas estar autenticado para ejecutar este test');
			return;
		}
		
		const uid = auth.currentUser.uid;
		const email = auth.currentUser.email;
		
		// 1. Guardar datos únicos
		const uniqueData = {
			bio: `Test bio - ${Date.now()}`,
			age: Math.floor(Math.random() * 30) + 20,
			weight: Math.floor(Math.random() * 50) + 50,
			lastActive: new Date()
		};
		
		console.log('💾 Guardando datos únicos:', uniqueData);
		
		try {
			await UserProfileService.updateUserProfile(uid, uniqueData);
			console.log('✅ Datos únicos guardados');
			
			// 2. Verificar inmediatamente
			const immediateCheck = await UserProfileService.getUserProfile(uid);
			console.log('🔍 Verificación inmediata:', immediateCheck?.bio, immediateCheck?.age, immediateCheck?.weight);
			
			// 3. Simular cierre de sesión (limpiar caché local si existe)
			console.log('🚪 Simulando cierre de sesión...');
			
			// 4. Simular nueva carga (como si fuera un nuevo login)
			setTimeout(async () => {
				console.log('🔑 Simulando nueva carga de datos...');
				try {
					const reloadedProfile = await UserProfileService.getUserProfile(uid);
					
					if (reloadedProfile) {
						console.log('✅ Datos encontrados después de "reconexión":', {
							bio: reloadedProfile.bio,
							age: reloadedProfile.age,
							weight: reloadedProfile.weight,
							lastActive: reloadedProfile.lastActive
						});
						
						// Verificar si coinciden
						if (reloadedProfile.bio === uniqueData.bio && 
							reloadedProfile.age === uniqueData.age && 
							reloadedProfile.weight === uniqueData.weight) {
							console.log('🎉 ¡PERSISTENCIA FUNCIONANDO CORRECTAMENTE!');
						} else {
							console.log('❌ Los datos no coinciden:');
							console.log('  Esperado:', uniqueData);
							console.log('  Encontrado:', {
								bio: reloadedProfile.bio,
								age: reloadedProfile.age,
								weight: reloadedProfile.weight
							});
						}
					} else {
						console.log('❌ No se encontraron datos después de reconexión');
					}
				} catch (error) {
					console.error('❌ Error en verificación de persistencia:', error);
				}
			}, 2000);
			
		} catch (error) {
			console.error('❌ Error en test de persistencia:', error);
		}
	}
}

// Agregar al objeto window para fácil acceso desde la consola del navegador
if (typeof window !== 'undefined') {
	(window as any).debugWellPlay = DebugService;
}
