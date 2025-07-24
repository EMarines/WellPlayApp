<script lang="ts">
import { onMount } from 'svelte';
import { goto } from '$app/navigation';
	// Update the import path below to the correct location of your auth store/module.
	// For example, if your auth store is at $lib/stores/auth.ts, use:
	import { user, isAuthenticated } from '$lib/auth';
	import { UserProfileService } from '$lib/services/userProfile';
	import type { UserProfile } from '$lib/types';

	let loading = true;
	let saving = false;
	let error = '';
	let success = '';

	let profile: UserProfile | null = null;

	// Form bindings
	let bio = '';
	let age = '';
	let weight = '';
	let height = '';
	let fitnessLevel: 'beginner' | 'intermediate' | 'advanced' = 'beginner';
	let goals: string[] = [];
	let customGoal = '';
	let units: 'metric' | 'imperial' = 'metric';
	let notifications = true;
	let privacy: 'public' | 'friends' | 'private' = 'public';

	// Photo upload state
	let photoFile: File | null = null;
	let photoURL = '';
	let photoUploading = false;
	let photoError = '';
	let fileInput: HTMLInputElement;

	const fitnessLevels = [
		{ value: 'beginner', label: 'Principiante' },
		{ value: 'intermediate', label: 'Intermedio' },
		{ value: 'advanced', label: 'Avanzado' }
	];

	const commonGoals = [
		'Perder peso',
		'Ganar músculo',
		'Mejorar resistencia',
		'Aumentar fuerza',
		'Mantener forma física',
		'Reducir estrés',
		'Mejorar flexibilidad',
		'Preparar competencia'
	];

	onMount(async () => {
		if (!$user || !$isAuthenticated) {
			goto('/auth');
			return;
		}
		await loadProfile();
	});

	async function loadProfile() {
		if ($user?.uid) {
			loading = true;
			try {
				profile = await UserProfileService.ensureUserProfile(
					$user.uid,
					$user.email || '',
					$user.displayName || ''
				);
				if (profile) {
					bio = profile.bio || '';
					age = profile.age?.toString() || '';
					weight = profile.weight?.toString() || '';
					height = profile.height?.toString() || '';
					fitnessLevel = profile.fitnessLevel;
					goals = [...profile.goals];
					units = profile.preferences.units;
					notifications = profile.preferences.notifications;
					privacy = profile.preferences.privacy;
					photoURL = profile.photoURL || '';
				}
			} catch (err) {
				console.error('Error al cargar perfil:', err);
				error = 'Error al cargar el perfil';
			} finally {
				loading = false;
			}
		}
	}

	function addCustomGoal() {
		if (customGoal.trim() && !goals.includes(customGoal.trim())) {
			goals = [...goals, customGoal.trim()];
			customGoal = '';
		}
	}

	function removeGoal(goalToRemove: string) {
		goals = goals.filter((g) => g !== goalToRemove);
	}

	function toggleGoal(goal: string) {
		if (goals.includes(goal)) {
			removeGoal(goal);
		} else {
			goals = [...goals, goal];
		}
	}

	function triggerFileInput() {
		fileInput.click();
	}

	function handleFileChange(event: Event) {
		const target = event.target as HTMLInputElement;
		const file = target.files?.[0];
		if (file) {
			if (!file.type.startsWith('image/')) {
				photoError = 'Por favor selecciona una imagen válida';
				return;
			}
			if (file.size > 1 * 1024 * 1024) {
				// 1MB limit for free tier
				photoError = 'La imagen debe ser menor a 1MB';
				return;
			}
			photoFile = file;
			photoError = '';

			// Show preview
			const reader = new FileReader();
			reader.onload = (e) => {
				photoURL = e.target?.result as string;
			};
			reader.readAsDataURL(file);
		}
	}

	async function uploadPhoto(): Promise<string> {
		if (!photoFile || !$user?.uid) return '';
		photoUploading = true;
		photoError = '';
		try {
			const uploadedURL = await UserProfileService.uploadProfilePhotoBase64($user.uid, photoFile);
			photoURL = uploadedURL;
			photoFile = null; // Clear after upload
			return uploadedURL;
		} catch (err) {
			console.error('Error al subir foto:', err);
			photoError = 'Error al subir la foto';
			return '';
		} finally {
			photoUploading = false;
		}
	}

	async function removePhoto() {
		if (!$user?.uid || !photoURL) return;
		try {
			await UserProfileService.deleteProfilePhoto($user.uid, photoURL);
			photoURL = '';
			photoFile = null;
		} catch (err) {
			console.error('Error al eliminar foto:', err);
			photoError = 'Error al eliminar la foto';
		}
	}

	async function saveProfile() {
		if (!$user?.uid || !profile) return;

		saving = true;
		error = '';
		success = '';

		try {
			let finalPhotoURL = photoURL;
			if (photoFile) {
				finalPhotoURL = await uploadPhoto();
			}

			const updatedProfile: Partial<UserProfile> = {
				bio,
				age: age ? parseInt(age) : undefined,
				weight: weight ? parseFloat(weight) : undefined,
				height: height ? parseFloat(height) : undefined,
				fitnessLevel,
				goals,
				preferences: {
					units,
					notifications,
					privacy
				}
			};

			if (finalPhotoURL) {
				updatedProfile.photoURL = finalPhotoURL;
			}

			await UserProfileService.updateUserProfile($user.uid, updatedProfile);
			success = 'Perfil actualizado correctamente';
			setTimeout(() => {
				goto('/profile');
			}, 1500);
		} catch (err) {
			console.error('Error al guardar perfil:', err);
			error = 'Error al guardar el perfil';
		} finally {
			saving = false;
		}
	}

	function skipSetup() {
		goto('/profile');
	}
</script>

<!-- El resto del archivo (HTML y CSS) está correcto y no necesita cambios. -->

<svelte:head>
	<title>Completar Perfil - WellPlay</title>
</svelte:head>

<div class="profile-setup-container">
	<div class="setup-card">
		<div class="setup-header">
			<h1>Completa tu Perfil</h1>
			<p>Ayúdanos a personalizar tu experiencia en WellPlay</p>
		</div>

		{#if loading}
			<div class="loading">
				<p>Cargando...</p>
			</div>
		{:else}
			<form on:submit|preventDefault={saveProfile}>
				<!-- Foto de perfil -->
				<div class="section">
					<h2>Foto de Perfil</h2>
					<p class="size-limit-notice">📏 Tamaño máximo: 1MB (versión gratuita)</p>
					<div class="photo-upload-container">
						<div class="photo-preview">
							{#if photoURL}
								<img src={photoURL} alt="Vista previa de perfil" class="profile-image" />
								<button type="button" class="remove-photo-btn" title="Eliminar foto" on:click={removePhoto}><span>✕</span></button>
							{:else}
								<div class="photo-placeholder">
									<span class="placeholder-icon">📷</span>
									<p>Sin foto</p>
								</div>
							{/if}
						</div>
						<div class="photo-controls">
							<button type="button" class="photo-btn" on:click={triggerFileInput} disabled={photoUploading}>
								{#if photoUploading}
									<span class="spinner"></span>
									Subiendo...
								{:else}
									📷 {photoURL ? 'Cambiar foto' : 'Agregar foto'}
								{/if}
							</button>
							{#if photoError}
								<p class="error-text">{photoError}</p>
							{/if}
						</div>
						<input type="file" accept="image/*" on:change={handleFileChange} bind:this={fileInput} style="display: none;" class="svelte-ulck9g">
					</div>
				</div>

				<!-- Información personal -->
				<div class="section">
					<h2>Información Personal</h2>
					<div class="form-group">
						<label for="bio">Biografía (opcional)</label>
						<textarea id="bio" bind:value={bio} placeholder="Cuéntanos un poco sobre ti..." rows="3"></textarea>
					</div>
					<div class="form-row">
						<div class="form-group">
							<label for="age">Edad (opcional)</label>
							<input id="age" type="number" bind:value={age} placeholder="Ej: 25" min="13" max="100" />
						</div>
						<div class="form-group">
							<label for="weight">Peso (opcional)</label>
							<input id="weight" type="number" bind:value={weight} placeholder={units === 'metric' ? 'kg' : 'lbs'} step="0.1" min="20" max="300" />
						</div>
						<div class="form-group">
							<label for="height">Altura (opcional)</label>
							<input id="height" type="number" bind:value={height} placeholder={units === 'metric' ? 'cm' : 'in'} step="0.1" min="100" max="250" />
						</div>
					</div>
				</div>

				<!-- Nivel de fitness -->
				<div class="section">
					<h2>Nivel de Fitness</h2>
					<div class="radio-group">
						{#each fitnessLevels as level}
							<label class="radio-option">
								<input type="radio" bind:group={fitnessLevel} value={level.value} />
								<span class="radio-label">{level.label}</span>
							</label>
						{/each}
					</div>
				</div>

				<!-- Objetivos -->
				<div class="section">
					<h2>Objetivos de Fitness</h2>
					<div class="goals-common">
						<p>Selecciona tus objetivos:</p>
						<div class="goals-grid">
							{#each commonGoals as goal}
								<button type="button" class="goal-chip" class:selected={goals.includes(goal)} on:click={() => toggleGoal(goal)}>
									{goal}
								</button>
							{/each}
						</div>
					</div>
					<div class="form-group">
						<label for="newGoal">Agregar objetivo personalizado</label>
						<div class="input-with-button">
							<input id="newGoal" type="text" bind:value={customGoal} on:keydown={(e) => e.key === 'Enter' && addCustomGoal()} placeholder="Ej: Correr 5km sin parar" />
							<button type="button" on:click={addCustomGoal}>Agregar</button>
						</div>
					</div>
					{#if goals.length > 0}
						<div class="selected-goals">
							<p>Tus objetivos:</p>
							<div class="goals-list">
								{#each goals as goal}
									<span class="goal-tag">
										{goal}
										<button type="button" on:click={() => removeGoal(goal)}>×</button>
									</span>
								{/each}
							</div>
						</div>
					{/if}
				</div>

				<!-- Preferencias -->
				<div class="section">
					<h2>Preferencias</h2>
					<div class="form-group">
						<label for="units">Sistema de medidas</label>
						<select id="units" bind:value={units}>
							<option value="metric">Métrico (kg, cm)</option>
							<option value="imperial">Imperial (lbs, in)</option>
						</select>
					</div>
					<div class="form-group">
						<label class="checkbox-label">
							<input type="checkbox" bind:checked={notifications} />
							<span>Recibir notificaciones</span>
						</label>
					</div>
					<div class="form-group">
						<label for="privacy">Privacidad del perfil</label>
						<select id="privacy" bind:value={privacy}>
							<option value="public">Público</option>
							<option value="friends">Solo amigos</option>
							<option value="private">Privado</option>
						</select>
					</div>
				</div>

				{#if error}
					<div class="error-message">{error}</div>
				{/if}
				{#if success}
					<div class="success-message">{success}</div>
				{/if}

				<div class="form-actions">
					<button type="button" class="skip-btn" on:click={skipSetup} disabled={saving}>Saltar por ahora</button>
					<button type="submit" class="save-btn" disabled={saving}>{saving ? 'Guardando...' : 'Guardar Perfil'}</button>
				</div>
			</form>
		{/if}
	</div>
</div>

<style>
	.profile-setup-container {
		display: flex;
		flex-direction: column;
		align-items: center;
		padding: 1rem;
		min-height: 100vh;
	}

	.setup-card {
		background: rgba(255, 255, 255, 0.95);
		backdrop-filter: blur(10px);
		border-radius: 16px;
		padding: 2rem;
		max-width: 800px;
		width: 100%;
		box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
		margin: 2rem 0;
	}

	.setup-header {
		text-align: center;
		margin-bottom: 2rem;
	}

	.setup-header h1 {
		color: #333;
		margin-bottom: 0.5rem;
		font-size: 2rem;
		font-weight: 700;
	}

	.setup-header p {
		color: #666;
		font-size: 1.1rem;
	}

	.section {
		margin-bottom: 2rem;
		padding-bottom: 1.5rem;
		border-bottom: 1px solid #e1e5e9;
	}

	.section:last-of-type {
		border-bottom: none;
	}

	.section h2 {
		color: #333;
		margin-bottom: 1rem;
		font-size: 1.3rem;
		font-weight: 600;
	}

	/* Estilos para la foto de perfil */
	.photo-upload-container {
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 1rem;
	}

	.photo-preview {
		position: relative;
		width: 120px;
		height: 120px;
		border-radius: 50%;
		overflow: hidden;
		border: 3px solid #e1e5e9;
		background: #f8f9fa;
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.profile-image {
		width: 100%;
		height: 100%;
		object-fit: cover;
	}

	.photo-placeholder {
		text-align: center;
		color: #999;
	}

	.placeholder-icon {
		font-size: 2rem;
		display: block;
		margin-bottom: 0.25rem;
	}

	.photo-placeholder p {
		font-size: 0.8rem;
		margin: 0;
	}

	.remove-photo-btn {
		position: absolute;
		top: -5px;
		right: -5px;
		background: #ff4757;
		color: white;
		border: none;
		border-radius: 50%;
		width: 25px;
		height: 25px;
		display: flex;
		align-items: center;
		justify-content: center;
		cursor: pointer;
		font-size: 0.8rem;
		transition: all 0.2s ease;
	}

	.remove-photo-btn:hover {
		background: #ff3742;
		transform: scale(1.1);
	}

	.photo-controls {
		text-align: center;
	}

	.photo-btn {
		background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
		color: white;
		border: none;
		padding: 0.6rem 1.2rem;
		border-radius: 20px;
		cursor: pointer;
		font-weight: 500;
		transition: all 0.2s ease;
		display: flex;
		align-items: center;
		gap: 0.5rem;
		justify-content: center;
		min-width: 120px;
	}

	.photo-btn:hover:not(:disabled) {
		transform: translateY(-2px);
		box-shadow: 0 4px 12px rgba(102, 126, 234, 0.4);
	}

	.photo-btn:disabled {
		opacity: 0.7;
		cursor: not-allowed;
	}

	.spinner {
		width: 14px;
		height: 14px;
		border: 2px solid transparent;
		border-top: 2px solid currentColor;
		border-radius: 50%;
		animation: spin 1s linear infinite;
	}

	@keyframes spin {
		0% { transform: rotate(0deg); }
		100% { transform: rotate(360deg); }
	}

	.error-text {
		color: #ff4757;
		font-size: 0.8rem;
		margin-top: 0.5rem;
		margin-bottom: 0;
	}

	.size-limit-notice {
		color: #2196F3;
		font-size: 0.8rem;
		margin: 0.5rem 0;
		padding: 0.5rem 0.75rem;
		background: rgba(33, 150, 243, 0.1);
		border-radius: 4px;
		border-left: 3px solid #2196F3;
	}

	.form-group {
		margin-bottom: 1rem;
	}

	.form-row {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
		gap: 1rem;
	}

	label {
		display: block;
		margin-bottom: 0.5rem;
		color: #555;
		font-weight: 500;
	}

	input, textarea, select {
		width: 100%;
		padding: 0.75rem;
		border: 2px solid #e1e5e9;
		border-radius: 8px;
		font-size: 1rem;
		transition: border-color 0.3s ease;
		box-sizing: border-box;
	}

	input:focus, textarea:focus, select:focus {
		outline: none;
		border-color: #667eea;
		box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
	}

	.radio-group {
		display: flex;
		gap: 1rem;
		flex-wrap: wrap;
	}

	.radio-option {
		display: flex;
		align-items: center;
		gap: 0.5rem;
		padding: 0.75rem 1rem;
		border: 2px solid #e1e5e9;
		border-radius: 8px;
		cursor: pointer;
		transition: all 0.3s ease;
	}

	.radio-option:hover {
		border-color: #667eea;
	}

	.radio-option:has(input:checked) {
		border-color: #667eea;
		background: rgba(102, 126, 234, 0.1);
	}

	.radio-label {
		font-weight: 500;
		color: #333;
	}

	.goals-common p {
		margin-bottom: 0.75rem;
	}

	.goals-grid {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
		gap: 0.5rem;
		margin-bottom: 1rem;
	}

	.goal-chip {
		padding: 0.5rem 1rem;
		border: 2px solid #e1e5e9;
		border-radius: 20px;
		background: white;
		cursor: pointer;
		text-align: center;
		font-size: 0.9rem;
		transition: all 0.3s ease;
	}

	.goal-chip:hover {
		border-color: #667eea;
		transform: translateY(-2px);
	}

	.goal-chip.selected {
		background: #667eea;
		color: white;
		border-color: #667eea;
	}

	.input-with-button {
		display: flex;
		gap: 0.5rem;
	}

	.input-with-button input {
		flex: 1;
	}

	.input-with-button button {
		padding: 0.75rem 1rem;
		background: #667eea;
		color: white;
		border: none;
		border-radius: 8px;
		cursor: pointer;
		font-weight: 600;
	}

	.goals-list {
		display: flex;
		flex-wrap: wrap;
		gap: 0.5rem;
	}
	
	.selected-goals {
		margin-top: 1rem;
	}

	.selected-goals p { margin-bottom: 0.5rem; }

	.goal-tag {
		display: inline-flex;
		align-items: center;
		gap: 0.5rem;
		padding: 0.5rem 1rem;
		background: rgba(102, 126, 234, 0.1);
		border: 1px solid #667eea;
		border-radius: 20px;
		font-size: 0.9rem;
		color: #333;
	}

	.goal-tag button {
		background: none;
		border: none;
		color: #667eea;
		cursor: pointer;
		font-size: 1.2rem;
		padding: 0;
		width: 20px;
		height: 20px;
		display: flex;
		align-items: center;
		justify-content: center;
		border-radius: 50%;
	}

	.goal-tag button:hover {
		background: rgba(102, 126, 234, 0.2);
	}

	.checkbox-label {
		display: flex;
		align-items: center;
		gap: 0.75rem;
		cursor: pointer;
	}

	.checkbox-label input {
		width: auto;
		height: 1.2em;
	}

	.form-actions {
		display: flex;
		gap: 1rem;
		justify-content: center;
		margin-top: 2rem;
		padding-top: 1rem;
		border-top: 1px solid #e1e5e9;
	}

	.skip-btn, .save-btn {
		padding: 0.875rem 2rem;
		border: none;
		border-radius: 8px;
		font-size: 1rem;
		font-weight: 600;
		cursor: pointer;
		transition: all 0.3s ease;
	}

	.skip-btn {
		background: #f8f9fa;
		color: #666;
		border: 2px solid #e1e5e9;
	}

	.skip-btn:hover:not(:disabled) {
		background: #e9ecef;
		border-color: #ced4da;
	}

	.save-btn {
		background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
		color: white;
	}

	.save-btn:hover:not(:disabled) {
		transform: translateY(-2px);
		box-shadow: 0 8px 25px rgba(102, 126, 234, 0.3);
	}

	.save-btn:disabled, .skip-btn:disabled {
		opacity: 0.7;
		cursor: not-allowed;
		transform: none;
	}

	.error-message {
		background: rgba(239, 68, 68, 0.1);
		color: #dc2626;
		padding: 0.75rem;
		border-radius: 8px;
		border-left: 4px solid #dc2626;
		margin: 1rem 0;
	}

	.success-message {
		background: rgba(34, 197, 94, 0.1);
		color: #16a34a;
		padding: 0.75rem;
		border-radius: 8px;
		border-left: 4px solid #16a34a;
		margin: 1rem 0;
	}

	.loading {
		text-align: center;
		padding: 2rem;
		color: #666;
	}

	@media (max-width: 768px) {
		.profile-setup-container {
			padding: 1rem;
		}

		.setup-card {
			padding: 1.5rem;
			margin: 1rem 0;
		}

		.form-row {
			grid-template-columns: 1fr;
		}

		.radio-group {
			flex-direction: column;
		}

		.goals-grid {
			grid-template-columns: 1fr;
		}

		.form-actions {
			flex-direction: column;
		}
	}
</style>
