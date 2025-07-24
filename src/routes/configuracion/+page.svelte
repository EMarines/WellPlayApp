<script lang="ts">
	import { onMount } from 'svelte';
	import { user, isAuthenticated } from '$lib/auth';
	let units: 'metric' | 'imperial' = 'metric';
	let privacy: 'public' | 'friends' | 'private' = 'public';
	let notifications = true;
</script>

<div class="settings-page">
	<h1>Configuración</h1>
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
			<label for="privacy">Privacidad del perfil</label>
			<select id="privacy" bind:value={privacy}>
				<option value="public">Público</option>
				<option value="friends">Solo amigos</option>
				<option value="private">Privado</option>
			</select>
		</div>
		<div class="form-group">
			<label class="checkbox-label">
				<input type="checkbox" bind:checked={notifications} />
				<span>Recibir notificaciones</span>
			</label>
		</div>
	</div>
</div>

<style>
.settings-page {
	max-width: 600px;
	margin: 2rem auto;
	padding: 2rem;
	background: #fff;
	border-radius: 12px;
	box-shadow: 0 2px 16px rgba(0,0,0,0.08);
}
.section {
	margin-bottom: 2rem;
}
.form-group {
	margin-bottom: 1.5rem;
}
label {
	font-weight: 500;
	margin-bottom: 0.5rem;
	display: block;
}
select, input[type="checkbox"] {
	margin-top: 0.5rem;
	padding: 0.5rem;
	border-radius: 6px;
	border: 1px solid #ccc;
	font-size: 1rem;
}
.checkbox-label {
	display: flex;
	align-items: center;
	gap: 0.5rem;
}
</style>
