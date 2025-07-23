import { writable } from 'svelte/store';
import { auth } from '$lib/firebase';
import { onAuthStateChanged, type User } from 'firebase/auth';

// Store para el usuario autenticado
export const user = writable<User | null>(null);

// Store para el estado de carga
export const loading = writable(true);

// Inicializar el listener de autenticación
onAuthStateChanged(auth, (firebaseUser) => {
	user.set(firebaseUser);
	loading.set(false);
});

// Función helper para verificar si el usuario está autenticado
export const isAuthenticated = writable(false);

user.subscribe((u) => {
	isAuthenticated.set(!!u);
});
