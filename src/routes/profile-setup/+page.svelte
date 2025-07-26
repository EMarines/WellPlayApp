<script lang="ts">
	import { onMount } from 'svelte';
	import { user, isAuthenticated, loading } from '$lib/auth';
	import { goto } from '$app/navigation';
	import { UserProfileService } from '$lib/services/userProfile';

	let displayName = '';
	let alias = '';
	let bio = '';
	let photoURL = '';
	let selectedFile: File | null = null;
	let feedbackMessage = '';
	let isSaving = false;

	// --- LA CLAVE DE LA SOLUCIÓN ---
	// Este bloque reactivo se ejecuta cuando $loading o $isAuthenticated cambian.
	// Si la carga ha terminado Y el usuario NO está autenticado, lo redirige.
	$: if (!$loading && !$isAuthenticated) {
		goto('/auth?redirect=/profile-setup');
	}

	// Cargar los datos del perfil del usuario una vez que la autenticación esté lista
	onMount(() => {
		const unsubscribe = user.subscribe(async ($user) => {
			// Solo proceder si tenemos un usuario después de la carga
			if (!$loading && $user) {
				try {
					const profile = await UserProfileService.getUserProfile($user.uid);
					if (profile) {
						displayName = profile.displayName || '';
						alias = profile.alias || '';
						bio = profile.bio || '';
						photoURL = profile.photoURL || '';
					}
				} catch (error) {
					console.error("Error al cargar el perfil:", error);
					feedbackMessage = "No se pudo cargar tu perfil.";
				}
				// Nos desuscribimos para evitar que se vuelva a ejecutar si los datos cambian en esta misma página
				unsubscribe();
			}
		});
	});

	function handleFileSelect(e: Event) {
		const target = e.target as HTMLInputElement;
		if (target.files && target.files[0]) {
			selectedFile = target.files[0];
			const reader = new FileReader();
			reader.onload = (event) => {
				if (event.target?.result) {
					// Muestra una vista previa de la imagen seleccionada
					photoURL = event.target.result as string;
				}
			};
			reader.readAsDataURL(selectedFile);
		}
	}

	async function handleSaveProfile() {
		if (!$user) {
			feedbackMessage = 'Error: Usuario no encontrado.';
			return;
		}
		isSaving = true;
		feedbackMessage = 'Guardando...';

		try {
			let finalPhotoURL = photoURL;
			if (selectedFile) {
				// Usamos la subida en Base64 que es gratuita.
				// Si tienes Firebase Storage configurado, puedes cambiar esto a:
				// finalPhotoURL = await UserProfileService.uploadProfilePhoto($user.uid, selectedFile);
				finalPhotoURL = await UserProfileService.uploadProfilePhotoBase64($user.uid, selectedFile);
			}

			const updates = {
				displayName,
				alias,
				bio,
				photoURL: finalPhotoURL
			};

			await UserProfileService.updateUserProfile($user.uid, updates);
			feedbackMessage = '¡Perfil guardado con éxito!';
			setTimeout(() => goto('/'), 1500); // Redirigir a la página principal
		} catch (error: any) {
			console.error('Error al guardar el perfil:', error);
			feedbackMessage = `Error: ${error.message}`;
		} finally {
			isSaving = false;
		}
	}
</script>

<svelte:head>
	<title>Configurar Perfil - WellPlay</title>
</svelte:head>

<!-- 1. Muestra el estado de carga -->
{#if $loading}
	<div class="loading-container">
		<p>Cargando tu perfil...</p>
		<!-- Aquí podrías poner un componente de spinner más elaborado -->
	</div>
<!-- 2. Si la carga terminó y el usuario está autenticado, muestra el formulario -->
{:else if $isAuthenticated && $user}
	<div class="profile-setup-container">
		<h1>Configura tu Perfil</h1>
		<p>Completa y personaliza tu información para que otros puedan conocerte.</p>

		<form on:submit|preventDefault={handleSaveProfile}>
			<div class="avatar-section">
				<img src={photoURL || '/profile-placeholder.svg'} alt="Avatar" class="avatar-preview" />
				<label for="photo-upload" class="photo-upload-label">Cambiar foto</label>
				<input id="photo-upload" type="file" on:change={handleFileSelect} accept="image/*" />
			</div>

			<div class="form-group">
				<label for="displayName">Nombre Completo</label>
				<input id="displayName" type="text" bind:value={displayName} placeholder="Tu nombre y apellido" />
			</div>

			<div class="form-group">
				<label for="alias">Alias (público)</label>
				<input id="alias" type="text" bind:value={alias} placeholder="Tu nombre de usuario único" />
			</div>

			<div class="form-group">
				<label for="bio">Biografía</label>
				<textarea id="bio" bind:value={bio} placeholder="Cuéntanos un poco sobre ti, tus metas y lo que te motiva." rows="4"></textarea>
			</div>

			<button type="submit" class="save-button" disabled={isSaving}>
				{#if isSaving}
					Guardando...
				{:else}
					Guardar Cambios
				{/if}
			</button>

			{#if feedbackMessage}
				<p class="feedback-message">{feedbackMessage}</p>
			{/if}
		</form>
	</div>
{/if}
<!-- 3. Si la carga terminó y no hay usuario, no se renderiza nada aquí
	  porque el bloque $: if se encargó de la redirección. -->

<style>
	.loading-container {
		display: flex;
		justify-content: center;
		align-items: center;
		height: 60vh;
		font-size: 1.2rem;
		color: #555;
	}
	.profile-setup-container {
		max-width: 600px;
		margin: 2rem auto;
		padding: 2rem 2.5rem;
		background: white;
		border-radius: 12px;
		box-shadow: 0 8px 30px rgba(0, 0, 0, 0.1);
	}
	h1 {
		text-align: center;
		color: #333;
		margin-bottom: 0.5rem;
	}
	p {
		text-align: center;
		color: #666;
		margin-bottom: 2rem;
	}
	.avatar-section {
		display: flex;
		flex-direction: column;
		align-items: center;
		margin-bottom: 2rem;
	}
	.avatar-preview {
		width: 120px;
		height: 120px;
		border-radius: 50%;
		object-fit: cover;
		border: 4px solid #eee;
		box-shadow: 0 2px 10px rgba(0,0,0,0.1);
		margin-bottom: 1rem;
	}
	#photo-upload {
		display: none;
	}
	.photo-upload-label {
		background: #667eea;
		color: white;
		padding: 0.5rem 1rem;
		border-radius: 8px;
		cursor: pointer;
		transition: background 0.3s;
	}
	.photo-upload-label:hover {
		background: #5a67d8;
	}
	.form-group {
		margin-bottom: 1.5rem;
	}
	label {
		display: block;
		margin-bottom: 0.5rem;
		font-weight: 500;
		color: #444;
	}
	input[type='text'],
	textarea {
		width: 100%;
		padding: 0.75rem;
		border: 1px solid #ddd;
		border-radius: 8px;
		font-size: 1rem;
		transition: border-color 0.3s, box-shadow 0.3s;
	}
	input[type='text']:focus,
	textarea:focus {
		outline: none;
		border-color: #667eea;
		box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.2);
	}
	textarea {
		resize: vertical;
		min-height: 80px;
	}
	.save-button {
		width: 100%;
		padding: 1rem;
		background: linear-gradient(135deg, #667eea, #764ba2);
		color: white;
		border: none;
		border-radius: 8px;
		font-size: 1.1rem;
		font-weight: 600;
		cursor: pointer;
		transition: all 0.3s;
	}
	.save-button:hover:not(:disabled) {
		transform: translateY(-2px);
		box-shadow: 0 4px 15px rgba(102, 126, 234, 0.3);
	}
	.save-button:disabled {
		background: #ccc;
		cursor: not-allowed;
	}
	.feedback-message {
		text-align: center;
		margin-top: 1rem;
		color: #d32f2f;
	}
	.feedback-message:not(:empty) {
		padding: 0.75rem;
		background: #f0f0f0;
		border-radius: 8px;
	}
</style>
