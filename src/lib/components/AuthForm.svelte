<script lang="ts">
	import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from 'firebase/auth';
	import { auth } from '$lib/firebase';
	import { UserProfileService } from '$lib/services/userProfile';
	
	let isLoginMode = true;
	let email = '';
	let password = '';
	let confirmPassword = '';
	let displayName = '';
	let alias = '';
	let error = '';
	let loading = false;

	function toggleMode() {
		isLoginMode = !isLoginMode;
		error = '';
		email = '';
		password = '';
		confirmPassword = '';
		displayName = '';
		alias = '';
	}

	async function handleAuth() {
		if (!email || !password) {
			error = 'Por favor completa todos los campos';
			return;
		}

		if (!isLoginMode && password !== confirmPassword) {
			error = 'Las contraseñas no coinciden';
			return;
		}

		if (!isLoginMode && password.length < 6) {
			error = 'La contraseña debe tener al menos 6 caracteres';
			return;
		}

		if (!isLoginMode && !displayName.trim()) {
			error = 'Por favor ingresa tu nombre';
			return;
		}

		if (!isLoginMode && !alias.trim()) {
			error = 'Por favor ingresa tu alias';
			return;
		}

		loading = true;
		error = '';

		try {
			if (isLoginMode) {
				console.log('Intentando login con:', email);
				await signInWithEmailAndPassword(auth, email, password);
				console.log('Login exitoso');
			} else {
				console.log('Intentando registro con:', email);
				const userCredential = await createUserWithEmailAndPassword(auth, email, password);
				console.log('Registro exitoso');
				
				// Crear perfil del usuario en Firestore
				await UserProfileService.createUserProfile(
					userCredential.user.uid,
					email,
					displayName.trim(),
					alias.trim()
				);
				console.log('Perfil creado exitosamente');
			}
		} catch (err: any) {
			console.error('Error de autenticación:', err);
			console.error('Código de error:', err.code);
			console.error('Mensaje:', err.message);
			
			switch (err.code) {
				case 'auth/user-not-found':
					error = 'Usuario no encontrado. ¿Quieres crear una cuenta?';
					break;
				case 'auth/wrong-password':
					error = 'Contraseña incorrecta';
					break;
				case 'auth/email-already-in-use':
					error = 'El email ya está registrado';
					break;
				case 'auth/weak-password':
					error = 'La contraseña es muy débil';
					break;
				case 'auth/invalid-email':
					error = 'Email inválido';
					break;
				case 'auth/invalid-credential':
					error = 'Credenciales inválidas. Verifica email y contraseña';
					break;
				case 'auth/too-many-requests':
					error = 'Demasiados intentos. Espera un momento';
					break;
				default:
					error = `Error: ${err.code} - ${err.message}`;
			}
		} finally {
			loading = false;
		}
	}
</script>

<div class="auth-container">
	<div class="auth-card">
		<h2>{isLoginMode ? 'Iniciar Sesión' : 'Crear Cuenta'}</h2>
		
		<form on:submit|preventDefault={handleAuth}>
			<div class="form-group">
				<label for="email">Email</label>
				<input 
					id="email"
					type="email" 
					bind:value={email}
					placeholder="tu-email@ejemplo.com"
					required
				/>
			</div>

			<div class="form-group">
				<label for="password">Contraseña</label>
				<input 
					id="password"
					type="password" 
					bind:value={password}
					placeholder="Mínimo 6 caracteres"
					required
				/>
			</div>

			{#if !isLoginMode}
				<div class="form-group">
					<label for="displayName">Nombre completo</label>
					<input 
						id="displayName"
						type="text" 
						bind:value={displayName}
						placeholder="Tu nombre completo"
						required
					/>
				</div>

				<div class="form-group">
					<label for="alias">Alias (nombre de usuario)</label>
					<input 
						id="alias"
						type="text" 
						bind:value={alias}
						placeholder="Tu alias único"
						required
					/>
				</div>
				
				<div class="form-group">
					<label for="confirmPassword">Confirmar Contraseña</label>
					<input 
						id="confirmPassword"
						type="password" 
						bind:value={confirmPassword}
						placeholder="Repite tu contraseña"
						required
					/>
				</div>
			{/if}

			{#if error}
				<div class="error-message">
					{error}
				</div>
			{/if}

			<button 
				type="submit" 
				class="auth-button"
				disabled={loading}
			>
				{#if loading}
					Cargando...
				{:else}
					{isLoginMode ? 'Iniciar Sesión' : 'Crear Cuenta'}
				{/if}
			</button>
		</form>

		<div class="auth-toggle">
			{#if isLoginMode}
				¿No tienes cuenta? 
				<button type="button" class="link-button" on:click={toggleMode}>
					Crear una aquí
				</button>
			{:else}
				¿Ya tienes cuenta? 
				<button type="button" class="link-button" on:click={toggleMode}>
					Iniciar sesión aquí
				</button>
			{/if}
		</div>
	</div>
</div>

<style>
	.auth-container {
		display: flex;
		justify-content: center;
		align-items: center;
		min-height: 60vh;
		padding: 2rem;
	}

	.auth-card {
		background: rgba(255, 255, 255, 0.95);
		backdrop-filter: blur(10px);
		border: 1px solid rgba(255, 255, 255, 0.2);
		border-radius: 16px;
		padding: 2rem;
		box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
		max-width: 400px;
		width: 100%;
	}

	h2 {
		text-align: center;
		margin-bottom: 1.5rem;
		color: #333;
		font-weight: 700;
	}

	.form-group {
		margin-bottom: 1rem;
	}

	label {
		display: block;
		margin-bottom: 0.5rem;
		color: #555;
		font-weight: 500;
	}

	input {
		width: 100%;
		padding: 0.75rem;
		border: 2px solid #e1e5e9;
		border-radius: 8px;
		font-size: 1rem;
		transition: border-color 0.3s ease;
		box-sizing: border-box;
	}

	input:focus {
		outline: none;
		border-color: #667eea;
		box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
	}

	.auth-button {
		width: 100%;
		padding: 0.875rem;
		background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
		color: white;
		border: none;
		border-radius: 8px;
		font-size: 1rem;
		font-weight: 600;
		cursor: pointer;
		transition: all 0.3s ease;
		margin-top: 1rem;
	}

	.auth-button:hover:not(:disabled) {
		transform: translateY(-2px);
		box-shadow: 0 8px 25px rgba(102, 126, 234, 0.3);
	}

	.auth-button:disabled {
		opacity: 0.7;
		cursor: not-allowed;
		transform: none;
	}

	.error-message {
		background: rgba(239, 68, 68, 0.1);
		color: #dc2626;
		padding: 0.75rem;
		border-radius: 8px;
		margin: 1rem 0;
		border-left: 4px solid #dc2626;
		font-size: 0.9rem;
	}

	.auth-toggle {
		text-align: center;
		margin-top: 1.5rem;
		color: #666;
	}

	.link-button {
		background: none;
		border: none;
		color: #667eea;
		cursor: pointer;
		text-decoration: underline;
		font-size: inherit;
	}

	.link-button:hover {
		color: #764ba2;
	}

	@media (max-width: 480px) {
		.auth-container {
			padding: 1rem;
		}
		
		.auth-card {
			padding: 1.5rem;
		}
	}
</style>
