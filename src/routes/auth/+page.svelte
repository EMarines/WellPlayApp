<script lang="ts">
	import { goto } from '$app/navigation';
	import { onMount } from 'svelte';
	import { isAuthenticated } from '$lib/auth';
	import AuthForm from '$lib/components/AuthForm.svelte';

	// Redirigir si ya está autenticado
	onMount(() => {
		const unsubscribe = isAuthenticated.subscribe((authenticated) => {
			if (authenticated) {
				goto('/');
			}
		});

		return unsubscribe;
	});
</script>

<svelte:head>
	<title>Iniciar Sesión - WellPlay</title>
	<meta name="description" content="Inicia sesión en WellPlay para acceder a todas las funcionalidades." />
</svelte:head>

<div class="auth-page">
	<div class="auth-content">
		<div class="welcome-section">
			<h1>¡Bienvenido a WellPlay! 🏋️‍♂️</h1>
			<p>Tu plataforma de bienestar y ejercicio favorita</p>
			
			<div class="features-list">
				<div class="feature-item">
					<span class="feature-icon">🎯</span>
					<span>Retos personalizados</span>
				</div>
				<div class="feature-item">
					<span class="feature-icon">📊</span>
					<span>Seguimiento de progreso</span>
				</div>
				<div class="feature-item">
					<span class="feature-icon">🏆</span>
					<span>Logros y recompensas</span>
				</div>
				<div class="feature-item">
					<span class="feature-icon">💬</span>
					<span>Chat con la comunidad</span>
				</div>
			</div>
		</div>

		<div class="form-section">
			<AuthForm />
		</div>
	</div>
</div>

<style>
	.auth-page {
		min-height: 100vh;
		background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
		display: flex;
		align-items: center;
		justify-content: center;
		padding: 2rem;
	}

	.auth-content {
		display: grid;
		grid-template-columns: 1fr 1fr;
		gap: 3rem;
		max-width: 1000px;
		width: 100%;
		align-items: center;
	}

	.welcome-section {
		color: white;
		text-align: center;
	}

	.welcome-section h1 {
		font-size: 2.5rem;
		font-weight: 700;
		margin-bottom: 1rem;
		text-shadow: 0 2px 10px rgba(0, 0, 0, 0.3);
	}

	.welcome-section p {
		font-size: 1.2rem;
		margin-bottom: 2rem;
		opacity: 0.9;
	}

	.features-list {
		display: flex;
		flex-direction: column;
		gap: 1rem;
		align-items: center;
	}

	.feature-item {
		display: flex;
		align-items: center;
		gap: 1rem;
		background: rgba(255, 255, 255, 0.1);
		backdrop-filter: blur(10px);
		padding: 1rem 1.5rem;
		border-radius: 12px;
		border: 1px solid rgba(255, 255, 255, 0.2);
		width: 100%;
		max-width: 300px;
	}

	.feature-icon {
		font-size: 1.5rem;
	}

	.form-section {
		display: flex;
		justify-content: center;
	}

	/* Responsive */
	@media (max-width: 768px) {
		.auth-content {
			grid-template-columns: 1fr;
			gap: 2rem;
		}

		.welcome-section h1 {
			font-size: 2rem;
		}

		.welcome-section p {
			font-size: 1rem;
		}

		.auth-page {
			padding: 1rem;
		}
	}
</style>
