import { doc, setDoc, getDoc, updateDoc, collection, query, where, getDocs } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL, deleteObject } from 'firebase/storage';
import { updateProfile } from 'firebase/auth';
import { db, storage, auth } from '$lib/firebase';
import type { UserProfile } from '$lib/types';

export class UserProfileService {
	
	/**
	 * Asegurar que el usuario tenga un perfil (crear si no existe)
	 */
	static async ensureUserProfile(uid: string, email: string, displayName?: string): Promise<UserProfile> {
		// Verificar que el usuario esté autenticado antes de proceder
		if (!auth.currentUser || auth.currentUser.uid !== uid) {
			throw new Error('Usuario no autenticado o UID no coincide');
		}

		const docRef = doc(db, 'users', uid);
		const docSnap = await getDoc(docRef);
		
		if (!docSnap.exists()) {
			// Crear perfil si no existe
			console.log('📝 Creando perfil inicial para nuevo usuario:', uid);
			await this.createUserProfile(uid, email, displayName);
			
			// Obtener el perfil recién creado
			const newDocSnap = await getDoc(docRef);
			if (newDocSnap.exists()) {
				const data = newDocSnap.data();
				return {
					...data,
					createdAt: data.createdAt?.toDate() || new Date(),
					lastActive: data.lastActive?.toDate() || new Date()
				} as UserProfile;
			}
		} else {
			// Perfil existe, devolverlo
			const data = docSnap.data();
			return {
				...data,
				createdAt: data.createdAt?.toDate() || new Date(),
				lastActive: data.lastActive?.toDate() || new Date()
			} as UserProfile;
		}
		
		throw new Error('No se pudo crear o obtener el perfil del usuario');
	}
	
	/**
	 * Crear perfil inicial del usuario después del registro
	 */
	static async createUserProfile(uid: string, email: string, displayName?: string, alias?: string): Promise<void> {
		const userProfile: UserProfile = {
			uid,
			email,
			displayName: displayName || email.split('@')[0],
			alias: alias || email.split('@')[0],
			photoURL: '',
			bio: '',
			fitnessLevel: 'beginner',
			goals: [],
			preferences: {
				units: 'metric',
				notifications: true,
				privacy: 'public'
			},
			stats: {
				challengesCompleted: 0,
				totalWorkouts: 0,
				totalPoints: 0,
				level: 1,
				currentStreak: 0,
				longestStreak: 0
			},
			createdAt: new Date(),
			lastActive: new Date()
		};

		await setDoc(doc(db, 'users', uid), userProfile);
	}

	/**
	 * Obtener perfil del usuario
	 */
	static async getUserProfile(uid: string): Promise<UserProfile | null> {
		const docRef = doc(db, 'users', uid);
		const docSnap = await getDoc(docRef);
		
		if (docSnap.exists()) {
			const data = docSnap.data();
			return {
				...data,
				createdAt: data.createdAt?.toDate() || new Date(),
				lastActive: data.lastActive?.toDate() || new Date()
			} as UserProfile;
		}
		
		return null;
	}

	/**
	 * Actualizar perfil del usuario (o crear si no existe)
	 */
	static async updateUserProfile(uid: string, updates: Partial<UserProfile>): Promise<void> {
		const docRef = doc(db, 'users', uid);
		
		// Verificar si el documento existe
		const docSnap = await getDoc(docRef);
		
		if (!docSnap.exists()) {
			// Si no existe, crear perfil básico primero
			console.log('📝 Creando perfil inicial para usuario:', uid);
			
			// Obtener email del usuario autenticado
			const userEmail = auth.currentUser?.email || 'unknown@email.com';
			const userDisplayName = auth.currentUser?.displayName || userEmail.split('@')[0];
			
			await this.createUserProfile(uid, userEmail, userDisplayName);
		}
		
		// Ahora actualizar con los datos proporcionados
		const updateData = {
			...updates,
			lastActive: new Date()
		};

		// Usar setDoc con merge para actualizar campos existentes sin sobrescribir todo
		await setDoc(docRef, updateData, { merge: true });
		
		// Si se actualiza displayName, también actualizar en Auth
		if (updates.displayName && auth.currentUser) {
			await updateProfile(auth.currentUser, {
				displayName: updates.displayName
			});
		}

		// Si se actualiza photoURL y NO es Base64, también actualizar en Auth
		if (updates.photoURL && auth.currentUser && !updates.photoURL.startsWith('data:')) {
			await updateProfile(auth.currentUser, {
				photoURL: updates.photoURL
			});
		}
	}

	/**
	 * Subir foto de perfil (ALTERNATIVA GRATUITA - Base64)
	 */
	static async uploadProfilePhotoBase64(uid: string, file: File): Promise<string> {
		try {
			// Verificar que el usuario esté autenticado
			if (!auth.currentUser) {
				throw new Error('Usuario no autenticado');
			}

			// Verificar tamaño del archivo (máximo 1MB para Base64)
			const maxSize = 1 * 1024 * 1024; // 1MB
			if (file.size > maxSize) {
				throw new Error('❌ La imagen es muy grande. Máximo 1MB para el modo gratuito.');
			}

			// Verificar tipo de archivo
			const allowedTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp'];
			if (!allowedTypes.includes(file.type)) {
				throw new Error('❌ Formato no soportado. Usa JPG, PNG, GIF o WebP.');
			}

			console.log('📋 Convirtiendo archivo a Base64:', {
				name: file.name,
				size: `${(file.size / 1024 / 1024).toFixed(2)} MB`,
				type: file.type
			});

			// Convertir a Base64
			const base64 = await new Promise<string>((resolve, reject) => {
				const reader = new FileReader();
				reader.onload = () => resolve(reader.result as string);
				reader.onerror = reject;
				reader.readAsDataURL(file);
			});

			console.log('✅ Imagen convertida a Base64');

			// Actualizar perfil SOLO en Firestore (Base64 es muy largo para Firebase Auth)
			await this.updateUserProfile(uid, { photoURL: base64 });
			
			console.log('✅ Foto de perfil actualizada exitosamente en Firestore');
			console.log('ℹ️ Base64 guardado solo en Firestore (Firebase Auth no soporta URLs tan largas)');
			return base64;

		} catch (error) {
			console.error('❌ Error al subir foto de perfil:', error);
			
			if (error instanceof Error) {
				throw new Error(`❌ Error al procesar la imagen: ${error.message}`);
			}
			
			throw new Error('❌ Error desconocido al procesar la imagen');
		}
	}

	/**
	 * Subir foto de perfil (Firebase Storage - REQUIERE PLAN BLAZE)
	 */
	static async uploadProfilePhoto(uid: string, file: File): Promise<string> {
		try {
			// Verificar que el usuario esté autenticado
			if (!auth.currentUser) {
				throw new Error('Usuario no autenticado');
			}

			// Verificar tamaño del archivo (máximo 5MB)
			const maxSize = 5 * 1024 * 1024; // 5MB
			if (file.size > maxSize) {
				throw new Error('❌ La imagen es muy grande. Máximo 5MB permitido.');
			}

			// Verificar tipo de archivo
			const allowedTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp'];
			if (!allowedTypes.includes(file.type)) {
				throw new Error('❌ Formato no soportado. Usa JPG, PNG, GIF o WebP.');
			}

			console.log('📋 Subiendo archivo:', {
				name: file.name,
				size: `${(file.size / 1024 / 1024).toFixed(2)} MB`,
				type: file.type
			});

			// Crear referencia única para la foto
			const fileExtension = file.name.split('.').pop();
			const fileName = `profile_${uid}_${Date.now()}.${fileExtension}`;
			const storageRef = ref(storage, `users/${uid}/profile/${fileName}`);

			console.log('📤 Subiendo foto a:', `users/${uid}/profile/${fileName}`);

			// Subir archivo
			const snapshot = await uploadBytes(storageRef, file);
			console.log('✅ Foto subida exitosamente');
			
			// Obtener URL de descarga
			const downloadURL = await getDownloadURL(snapshot.ref);
			console.log('🔗 URL generada:', downloadURL);
			
			// Actualizar perfil con nueva URL (Firebase Auth se actualiza automáticamente)
			await this.updateUserProfile(uid, { photoURL: downloadURL });

			return downloadURL;
		} catch (error) {
			console.error('❌ Error al subir foto de perfil:', error);
			console.error('❌ Error completo:', JSON.stringify(error, null, 2));
			
			// Proporcionar mensajes de error más específicos
			if (error instanceof Error) {
				console.log('❌ Mensaje del error:', error.message);
				
				if (error.message.includes('storage/unauthorized')) {
					throw new Error('❌ Sin permisos para Storage. Verifica que las reglas de Firebase Storage permitan escritura para usuarios autenticados.');
				}
				if (error.message.includes('cors') || error.message.includes('CORS')) {
					throw new Error('❌ Error CORS: Las reglas de Firebase Storage están bloqueando la subida desde localhost. Configura Storage Rules.');
				}
				if (error.message.includes('ERR_FAILED') || error.message.includes('XMLHttpRequest')) {
					throw new Error('❌ Error de Storage: Firebase Storage rechaza la subida. Verifica Storage Rules en Firebase Console.');
				}
				if (error.message.includes('network')) {
					throw new Error('❌ Error de conexión. Verifica tu internet e intenta de nuevo.');
				}
				if (error.message.includes('storage/unknown')) {
					throw new Error('❌ Error desconocido de Storage. Verifica configuración de Firebase Storage.');
				}
			}
			
			// Error genérico con más información
			throw new Error(`❌ Error al subir la foto PNG. Posible problema con Storage Rules de Firebase. Error: ${error instanceof Error ? error.message : 'Desconocido'}`);
		}
	}

	/**
	 * Eliminar foto de perfil (funciona con Storage URLs y Base64)
	 */
	static async deleteProfilePhoto(uid: string, photoURL: string): Promise<void> {
		if (photoURL && !photoURL.startsWith('data:')) {
			// Solo intentar eliminar de Firebase Storage si NO es Base64
			try {
				const photoRef = ref(storage, photoURL);
				await deleteObject(photoRef);
				console.log('🗑️ Foto eliminada de Firebase Storage');
			} catch (error) {
				console.warn('Error deleting photo from Storage:', error);
			}
		} else if (photoURL.startsWith('data:')) {
			console.log('🗑️ Eliminando foto Base64 de Firestore');
		}

		// Actualizar Firestore
		await this.updateUserProfile(uid, { photoURL: '' });
		
		// Limpiar Firebase Auth solo si no era Base64
		if (auth.currentUser && !photoURL.startsWith('data:')) {
			await updateProfile(auth.currentUser, {
				photoURL: ''
			});
		}
	}

	/**
	 * Buscar usuarios por nombre
	 */
	static async searchUsers(searchTerm: string, limit: number = 10): Promise<UserProfile[]> {
		const usersRef = collection(db, 'users');
		const q = query(
			usersRef,
			where('displayName', '>=', searchTerm),
			where('displayName', '<=', searchTerm + '\uf8ff')
		);
		
		const querySnapshot = await getDocs(q);
		const users: UserProfile[] = [];
		
		querySnapshot.forEach((doc) => {
			const data = doc.data();
			users.push({
				...data,
				createdAt: data.createdAt?.toDate() || new Date(),
				lastActive: data.lastActive?.toDate() || new Date()
			} as UserProfile);
		});
		
		return users.slice(0, limit);
	}

	/**
	 * Actualizar estadísticas del usuario
	 */
	static async updateUserStats(uid: string, statsUpdate: Partial<UserProfile['stats']>): Promise<void> {
		const currentProfile = await this.getUserProfile(uid);
		if (!currentProfile) return;

		const newStats = {
			...currentProfile.stats,
			...statsUpdate
		};

		// Calcular nivel basado en puntos
		const newLevel = Math.floor(newStats.totalPoints / 100) + 1;
		newStats.level = newLevel;

		await this.updateUserProfile(uid, { stats: newStats });
	}

	/**
	 * Incrementar contador de actividades
	 */
	static async incrementActivity(uid: string, activity: 'workout' | 'challenge', points: number = 10): Promise<void> {
		const currentProfile = await this.getUserProfile(uid);
		if (!currentProfile) return;

		const updates: Partial<UserProfile['stats']> = {
			totalPoints: currentProfile.stats.totalPoints + points
		};

		if (activity === 'workout') {
			updates.totalWorkouts = currentProfile.stats.totalWorkouts + 1;
		} else if (activity === 'challenge') {
			updates.challengesCompleted = currentProfile.stats.challengesCompleted + 1;
		}

		await this.updateUserStats(uid, updates);
	}
}
