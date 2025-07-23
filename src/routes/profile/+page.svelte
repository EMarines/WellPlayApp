<script lang="ts">
	import { onMount } from 'svelte';
	import { goto } from '$app/navigation';
	import { user, isAuthenticated } from '$lib/auth';
	import { UserProfileService } from '$lib/services/userProfile';
	import type { UserProfile } from '$lib/types';

	let userProfile: UserProfile | null = null;
	let loading = true;
	let error = '';
	let editing = false;
	let photoFile: File | null = null;
	let uploadingPhoto = false;

	// Formulario de edición
	let editForm = {
		displayName: '',
		bio: '',
		age: undefined as number | undefined,
		weight: undefined as number | undefined,
		height: undefined as number | undefined,
		fitnessLevel: 'beginner' as 'beginner' | 'intermediate' | 'advanced',
		goals: [] as string[],
		preferences: {
			units: 'metric' as 'metric' | 'imperial',
			notifications: true,
			privacy: 'public' as 'public' | 'friends' | 'private'
		}
	};

	onMount(() => {
		// Verificar autenticación
		const unsubscribe = isAuthenticated.subscribe(async (authenticated) => {
			if (!authenticated) {
				goto('/auth');
				return;
			}

			if ($user) {
				try {
					userProfile = await UserProfileService.ensureUserProfile($user.uid, $user.email || '', $user.displayName || undefined);
					if (userProfile) {
						// Llenar formulario con datos actuales
						editForm = {
							displayName: userProfile.displayName || '',
							bio: userProfile.bio || '',
							age: userProfile.age,
							weight: userProfile.weight,
							height: userProfile.height,
							fitnessLevel: userProfile.fitnessLevel,
							goals: [...userProfile.goals],
							preferences: { ...userProfile.preferences }
						};
					}
				} catch (err) {
					error = 'Error al cargar perfil';
					console.error(err);
				} finally {
					loading = false;
				}
			}
		});

		return unsubscribe;
	});

	async function handleSaveProfile() {
		if (!$user || !userProfile) return;

		try {
			loading = true;
			await UserProfileService.updateUserProfile($user.uid, editForm);
			
			// Actualizar perfil local
			userProfile = { ...userProfile, ...editForm };
			editing = false;
			error = '';
		} catch (err) {
			error = 'Error al guardar perfil';
			console.error(err);
		} finally {
			loading = false;
		}
	}

	async function handlePhotoUpload() {
		if (!photoFile || !$user) return;

		try {
			uploadingPhoto = true;
			// Usar versión gratuita Base64 (máximo 1MB)
			const photoURL = await UserProfileService.uploadProfilePhotoBase64($user.uid, photoFile);
			
			if (userProfile) {
				userProfile.photoURL = photoURL;
			}
			
			photoFile = null;
			error = '';
		} catch (err) {
			error = 'Error al subir foto';
			console.error(err);
		} finally {
			uploadingPhoto = false;
		}
	}

	async function handleDeletePhoto() {
		if (!$user || !userProfile?.photoURL) return;

		try {
			await UserProfileService.deleteProfilePhoto($user.uid, userProfile.photoURL);
			userProfile.photoURL = '';
			error = '';
		} catch (err) {
			error = 'Error al eliminar foto';
			console.error(err);
		}
	}

	function handleFileSelect(event: Event) {
		const target = event.target as HTMLInputElement;
		if (target.files && target.files[0]) {
			photoFile = target.files[0];
		}
	}

	function addGoal() {
		const goalInput = document.getElementById('newGoal') as HTMLInputElement;
		const goal = goalInput.value.trim();
		if (goal && !editForm.goals.includes(goal)) {
			editForm.goals = [...editForm.goals, goal];
			goalInput.value = '';
		}
	}

	function removeGoal(index: number) {
		editForm.goals = editForm.goals.filter((_, i) => i !== index);
	}

	function calculateLevel(points: number): number {
		return Math.floor(points / 100) + 1;
	}

	function getProgressToNextLevel(points: number): number {
		const currentLevelPoints = (calculateLevel(points) - 1) * 100;
		const pointsInCurrentLevel = points - currentLevelPoints;
		return (pointsInCurrentLevel / 100) * 100;
	}
</script>

<svelte:head>
	<title>Mi Perfil - WellPlay</title>
	<meta name="description" content="Gestiona tu perfil de usuario en WellPlay" />
</svelte:head>

{#if loading}
	<div class="loading-container">
		<div class="loading-spinner"></div>
		<p>Cargando perfil...</p>
	</div>
{:else if error}
	<div class="error-container">
		<p class="error-message">{error}</p>
		<button on:click={() => window.location.reload()}>Reintentar</button>
	</div>
{:else if userProfile}
	<div class="profile-container">
		<!-- Header del perfil -->
		<div class="profile-header">
			<div class="profile-photo-section">
				<div class="profile-photo">
					{#if userProfile.photoURL}
						<img src={userProfile.photoURL} alt="Foto de perfil" />
					{:else}
						<div class="photo-placeholder">
							<span class="photo-icon">👤</span>
						</div>
					{/if}
				</div>
				
				{#if editing}
					<div class="photo-controls">
						<p class="size-limit-notice">📏 Tamaño máximo: 1MB (versión gratuita)</p>
						<input 
							type="file" 
							accept="image/*" 
							on:change={handleFileSelect}
							id="photoInput"
							style="display: none;"
						/>
						<button 
							type="button" 
							class="photo-btn"
							on:click={() => document.getElementById('photoInput')?.click()}
						>
							📷 Cambiar foto
						</button>
						
						{#if photoFile}
							<button 
								type="button" 
								class="photo-btn upload"
								on:click={handlePhotoUpload}
								disabled={uploadingPhoto}
							>
								{uploadingPhoto ? '⏳ Subiendo...' : '✅ Guardar foto'}
							</button>
						{/if}
						
						{#if userProfile.photoURL}
							<button 
								type="button" 
								class="photo-btn delete"
								on:click={handleDeletePhoto}
							>
								🗑️ Eliminar
							</button>
						{/if}
					</div>
				{/if}
			</div>

			<div class="profile-info">
				<h1>{userProfile.displayName || userProfile.email}</h1>
				<p class="email">{userProfile.email}</p>
				{#if userProfile.bio}
					<p class="bio">{userProfile.bio}</p>
				{/if}
				
				<div class="profile-actions">
					{#if !editing}
						<button class="edit-btn" on:click={() => editing = true}>
							✏️ Editar perfil
						</button>
					{:else}
						<button class="save-btn" on:click={handleSaveProfile} disabled={loading}>
							💾 Guardar cambios
						</button>
						<button class="cancel-btn" on:click={() => editing = false}>
							❌ Cancelar
						</button>
					{/if}
				</div>
			</div>
		</div>

		<!-- Estadísticas -->
		<div class="stats-section">
			<h2>📊 Estadísticas</h2>
			<div class="stats-grid">
				<div class="stat-card">
					<span class="stat-number">{userProfile.stats.level}</span>
					<span class="stat-label">Nivel</span>
				</div>
				<div class="stat-card">
					<span class="stat-number">{userProfile.stats.totalPoints}</span>
					<span class="stat-label">Puntos</span>
				</div>
				<div class="stat-card">
					<span class="stat-number">{userProfile.stats.challengesCompleted}</span>
					<span class="stat-label">Retos</span>
				</div>
				<div class="stat-card">
					<span class="stat-number">{userProfile.stats.totalWorkouts}</span>
					<span class="stat-label">Entrenamientos</span>
				</div>
				<div class="stat-card">
					<span class="stat-number">{userProfile.stats.currentStreak}</span>
					<span class="stat-label">Racha actual</span>
				</div>
				<div class="stat-card">
					<span class="stat-number">{userProfile.stats.longestStreak}</span>
					<span class="stat-label">Mejor racha</span>
				</div>
			</div>

			<!-- Progreso al siguiente nivel -->
			<div class="level-progress">
				<h3>Progreso al nivel {userProfile.stats.level + 1}</h3>
				<div class="progress-bar">
					<div 
						class="progress-fill" 
						style="width: {getProgressToNextLevel(userProfile.stats.totalPoints)}%"
					></div>
				</div>
				<p>{userProfile.stats.totalPoints % 100}/100 puntos</p>
			</div>
		</div>

		{#if editing}
			<!-- Formulario de edición -->
			<div class="edit-section">
				<h2>✏️ Editar información</h2>
				
				<div class="form-grid">
					<div class="form-group">
						<label for="displayName">Nombre completo</label>
						<input 
							id="displayName"
							type="text" 
							bind:value={editForm.displayName}
							placeholder="Tu nombre completo"
						/>
					</div>

					<div class="form-group">
						<label for="bio">Biografía</label>
						<textarea 
							id="bio"
							bind:value={editForm.bio}
							placeholder="Cuéntanos sobre ti..."
							rows="3"
						></textarea>
					</div>

					<div class="form-group">
						<label for="age">Edad</label>
						<input 
							id="age"
							type="number" 
							bind:value={editForm.age}
							placeholder="Tu edad"
							min="13"
							max="120"
						/>
					</div>

					<div class="form-group">
						<label for="weight">Peso ({editForm.preferences.units === 'metric' ? 'kg' : 'lbs'})</label>
						<input 
							id="weight"
							type="number" 
							bind:value={editForm.weight}
							placeholder={editForm.preferences.units === 'metric' ? 'Peso en kg' : 'Peso en lbs'}
						/>
					</div>

					<div class="form-group">
						<label for="height">Altura ({editForm.preferences.units === 'metric' ? 'cm' : 'in'})</label>
						<input 
							id="height"
							type="number" 
							bind:value={editForm.height}
							placeholder={editForm.preferences.units === 'metric' ? 'Altura en cm' : 'Altura en pulgadas'}
						/>
					</div>

					<div class="form-group">
						<label for="fitnessLevel">Nivel de fitness</label>
						<select id="fitnessLevel" bind:value={editForm.fitnessLevel}>
							<option value="beginner">Principiante</option>
							<option value="intermediate">Intermedio</option>
							<option value="advanced">Avanzado</option>
						</select>
					</div>

					<div class="form-group">
						<label for="units">Sistema de medidas</label>
						<select id="units" bind:value={editForm.preferences.units}>
							<option value="metric">Métrico (kg, cm)</option>
							<option value="imperial">Imperial (lbs, in)</option>
						</select>
					</div>

					<div class="form-group">
						<label for="privacy">Privacidad del perfil</label>
						<select id="privacy" bind:value={editForm.preferences.privacy}>
							<option value="public">Público</option>
							<option value="friends">Solo amigos</option>
							<option value="private">Privado</option>
						</select>
					</div>
				</div>

				<!-- Objetivos -->
				<div class="goals-section">
					<h3>🎯 Objetivos</h3>
					<div class="goals-input">
						<input 
							id="newGoal"
							type="text" 
							placeholder="Agregar nuevo objetivo..."
							on:keydown={(e) => e.key === 'Enter' && addGoal()}
						/>
						<button type="button" on:click={addGoal}>Agregar</button>
					</div>
					
					<div class="goals-list">
						{#each editForm.goals as goal, index}
							<div class="goal-tag">
								<span>{goal}</span>
								<button type="button" on:click={() => removeGoal(index)}>×</button>
							</div>
						{/each}
					</div>
				</div>

				<!-- Notificaciones -->
				<div class="notifications-section">
					<label class="checkbox-label">
						<input 
							type="checkbox" 
							bind:checked={editForm.preferences.notifications}
						/>
						<span>Recibir notificaciones</span>
					</label>
				</div>
			</div>
		{:else}
			<!-- Vista de información -->
			<div class="info-section">
				<div class="info-grid">
					{#if userProfile.age}
						<div class="info-item">
							<span class="info-label">Edad:</span>
							<span class="info-value">{userProfile.age} años</span>
						</div>
					{/if}
					
					{#if userProfile.weight}
						<div class="info-item">
							<span class="info-label">Peso:</span>
							<span class="info-value">
								{userProfile.weight} {userProfile.preferences.units === 'metric' ? 'kg' : 'lbs'}
							</span>
						</div>
					{/if}
					
					{#if userProfile.height}
						<div class="info-item">
							<span class="info-label">Altura:</span>
							<span class="info-value">
								{userProfile.height} {userProfile.preferences.units === 'metric' ? 'cm' : 'in'}
							</span>
						</div>
					{/if}
					
					<div class="info-item">
						<span class="info-label">Nivel:</span>
						<span class="info-value fitness-level {userProfile.fitnessLevel}">
							{userProfile.fitnessLevel === 'beginner' ? 'Principiante' : 
							 userProfile.fitnessLevel === 'intermediate' ? 'Intermedio' : 'Avanzado'}
						</span>
					</div>
					
					<div class="info-item">
						<span class="info-label">Miembro desde:</span>
						<span class="info-value">{userProfile.createdAt.toLocaleDateString()}</span>
					</div>
				</div>

				{#if userProfile.goals.length > 0}
					<div class="goals-display">
						<h3>🎯 Objetivos</h3>
						<div class="goals-list">
							{#each userProfile.goals as goal}
								<span class="goal-tag readonly">{goal}</span>
							{/each}
						</div>
					</div>
				{/if}
			</div>
		{/if}
	</div>
{:else}
	<div class="error-container">
		<p>No se pudo cargar el perfil</p>
		<button on:click={() => goto('/auth')}>Ir a login</button>
	</div>
{/if}

<style>
	.loading-container, .error-container {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		min-height: 50vh;
		gap: 1rem;
	}

	.loading-spinner {
		width: 40px;
		height: 40px;
		border: 3px solid #f3f3f3;
		border-top: 3px solid #667eea;
		border-radius: 50%;
		animation: spin 1s linear infinite;
	}

	@keyframes spin {
		0% { transform: rotate(0deg); }
		100% { transform: rotate(360deg); }
	}

	.profile-container {
		max-width: 1000px;
		margin: 0 auto;
		padding: 2rem;
		gap: 2rem;
		display: flex;
		flex-direction: column;
	}

	.profile-header {
		background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
		color: white;
		padding: 2rem;
		border-radius: 16px;
		display: flex;
		gap: 2rem;
		align-items: center;
	}

	.profile-photo-section {
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 1rem;
	}

	.profile-photo {
		width: 120px;
		height: 120px;
		border-radius: 50%;
		overflow: hidden;
		border: 4px solid rgba(255, 255, 255, 0.3);
		background: rgba(255, 255, 255, 0.1);
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.profile-photo img {
		width: 100%;
		height: 100%;
		object-fit: cover;
	}

	.photo-placeholder {
		display: flex;
		align-items: center;
		justify-content: center;
		width: 100%;
		height: 100%;
	}

	.photo-icon {
		font-size: 3rem;
		opacity: 0.7;
	}

	.photo-controls {
		display: flex;
		flex-direction: column;
		gap: 0.5rem;
		align-items: center;
	}

	.photo-btn {
		background: rgba(255, 255, 255, 0.2);
		border: 1px solid rgba(255, 255, 255, 0.3);
		color: white;
		padding: 0.5rem 1rem;
		border-radius: 8px;
		font-size: 0.8rem;
		cursor: pointer;
		transition: all 0.3s ease;
		white-space: nowrap;
	}

	.photo-btn:hover {
		background: rgba(255, 255, 255, 0.3);
	}

	.photo-btn.upload {
		background: rgba(34, 197, 94, 0.3);
		border-color: rgba(34, 197, 94, 0.5);
	}

	.photo-btn.delete {
		background: rgba(239, 68, 68, 0.3);
		border-color: rgba(239, 68, 68, 0.5);
	}

	.profile-info {
		flex: 1;
	}

	.profile-info h1 {
		margin: 0 0 0.5rem 0;
		font-size: 2rem;
		font-weight: 700;
	}

	.email {
		opacity: 0.8;
		margin: 0 0 1rem 0;
	}

	.bio {
		margin: 0 0 1rem 0;
		opacity: 0.9;
		line-height: 1.5;
	}

	.profile-actions {
		display: flex;
		gap: 1rem;
		flex-wrap: wrap;
	}

	.edit-btn, .save-btn, .cancel-btn {
		padding: 0.75rem 1.5rem;
		border: 2px solid rgba(255, 255, 255, 0.3);
		background: rgba(255, 255, 255, 0.1);
		color: white;
		border-radius: 8px;
		font-weight: 600;
		cursor: pointer;
		transition: all 0.3s ease;
	}

	.edit-btn:hover, .cancel-btn:hover {
		background: rgba(255, 255, 255, 0.2);
	}

	.save-btn {
		background: rgba(34, 197, 94, 0.3);
		border-color: rgba(34, 197, 94, 0.5);
	}

	.save-btn:hover {
		background: rgba(34, 197, 94, 0.4);
	}

	.stats-section {
		background: white;
		padding: 2rem;
		border-radius: 16px;
		box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
	}

	.stats-section h2 {
		margin: 0 0 1.5rem 0;
		color: #333;
	}

	.stats-grid {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
		gap: 1rem;
		margin-bottom: 2rem;
	}

	.stat-card {
		background: linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%);
		padding: 1.5rem;
		border-radius: 12px;
		text-align: center;
		border: 1px solid #e2e8f0;
	}

	.stat-number {
		display: block;
		font-size: 2rem;
		font-weight: 700;
		color: #667eea;
		margin-bottom: 0.5rem;
	}

	.stat-label {
		font-size: 0.9rem;
		color: #64748b;
		font-weight: 500;
	}

	.level-progress {
		background: #f8fafc;
		padding: 1.5rem;
		border-radius: 12px;
		border: 1px solid #e2e8f0;
	}

	.level-progress h3 {
		margin: 0 0 1rem 0;
		color: #333;
	}

	.progress-bar {
		width: 100%;
		height: 12px;
		background: #e2e8f0;
		border-radius: 6px;
		overflow: hidden;
		margin-bottom: 0.5rem;
	}

	.progress-fill {
		height: 100%;
		background: linear-gradient(90deg, #667eea 0%, #764ba2 100%);
		transition: width 0.3s ease;
	}

	.edit-section, .info-section {
		background: white;
		padding: 2rem;
		border-radius: 16px;
		box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
	}

	.edit-section h2 {
		margin: 0 0 1.5rem 0;
		color: #333;
	}

	.form-grid {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
		gap: 1rem;
		margin-bottom: 2rem;
	}

	.form-group {
		display: flex;
		flex-direction: column;
		gap: 0.5rem;
	}

	.form-group label {
		font-weight: 600;
		color: #374151;
	}

	.form-group input, .form-group select, .form-group textarea {
		padding: 0.75rem;
		border: 2px solid #e5e7eb;
		border-radius: 8px;
		font-size: 1rem;
		transition: border-color 0.3s ease;
	}

	.form-group input:focus, .form-group select:focus, .form-group textarea:focus {
		outline: none;
		border-color: #667eea;
		box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
	}

	.goals-section {
		margin-bottom: 2rem;
	}

	.goals-section h3 {
		margin: 0 0 1rem 0;
		color: #333;
	}

	.goals-input {
		display: flex;
		gap: 0.5rem;
		margin-bottom: 1rem;
	}

	.goals-input input {
		flex: 1;
		padding: 0.75rem;
		border: 2px solid #e5e7eb;
		border-radius: 8px;
	}

	.goals-input button {
		padding: 0.75rem 1.5rem;
		background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
		color: white;
		border: none;
		border-radius: 8px;
		font-weight: 600;
		cursor: pointer;
	}

	.goals-list {
		display: flex;
		flex-wrap: wrap;
		gap: 0.5rem;
	}

	.goal-tag {
		background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
		color: white;
		padding: 0.5rem 1rem;
		border-radius: 20px;
		font-size: 0.9rem;
		display: flex;
		align-items: center;
		gap: 0.5rem;
	}

	.goal-tag.readonly {
		background: #f3f4f6;
		color: #374151;
	}

	.goal-tag button {
		background: rgba(255, 255, 255, 0.3);
		border: none;
		color: white;
		width: 20px;
		height: 20px;
		border-radius: 50%;
		cursor: pointer;
		display: flex;
		align-items: center;
		justify-content: center;
		font-size: 14px;
	}

	.notifications-section {
		border-top: 1px solid #e5e7eb;
		padding-top: 1rem;
	}

	.checkbox-label {
		display: flex;
		align-items: center;
		gap: 0.5rem;
		cursor: pointer;
		font-weight: 600;
		color: #374151;
	}

	.info-grid {
		display: grid;
		gap: 1rem;
		margin-bottom: 2rem;
	}

	.info-item {
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: 1rem;
		background: #f8fafc;
		border-radius: 8px;
		border: 1px solid #e2e8f0;
	}

	.info-label {
		font-weight: 600;
		color: #64748b;
	}

	.info-value {
		font-weight: 500;
		color: #1e293b;
	}

	.fitness-level {
		padding: 0.25rem 0.75rem;
		border-radius: 12px;
		font-size: 0.8rem;
		font-weight: 600;
		text-transform: uppercase;
	}

	.fitness-level.beginner {
		background: #dcfce7;
		color: #166534;
	}

	.fitness-level.intermediate {
		background: #fef3c7;
		color: #92400e;
	}

	.fitness-level.advanced {
		background: #fee2e2;
		color: #991b1b;
	}

	.goals-display {
		border-top: 1px solid #e5e7eb;
		padding-top: 1rem;
	}

	.goals-display h3 {
		margin: 0 0 1rem 0;
		color: #333;
	}

	.error-message {
		background: rgba(239, 68, 68, 0.1);
		color: #dc2626;
		padding: 1rem;
		border-radius: 8px;
		border-left: 4px solid #dc2626;
		margin: 1rem 0;
	}

	/* Responsive */
	@media (max-width: 768px) {
		.profile-container {
			padding: 1rem;
		}

		.profile-header {
			flex-direction: column;
			text-align: center;
		}

		.profile-actions {
			justify-content: center;
		}

		.stats-grid {
			grid-template-columns: repeat(2, 1fr);
		}

		.form-grid {
			grid-template-columns: 1fr;
		}

		.goals-input {
			flex-direction: column;
		}
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
</style>
