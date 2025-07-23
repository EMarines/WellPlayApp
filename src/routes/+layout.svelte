<script lang="ts">
	import './app.css';
	import NavBar from '$lib/components/NavBar.svelte';
	import SponsorsFooter from '$lib/components/SponsorsFooter.svelte';
	import LeftSidebar from '$lib/components/LeftSidebar.svelte';
	import RightSidebar from '$lib/components/RightSidebar.svelte';
	import MobileLeftSidebar from '$lib/components/MobileLeftSidebar.svelte';
	import MobileRightSidebar from '$lib/components/MobileRightSidebar.svelte';
	
	// Importar debug service para desarrollo
	import { DebugService } from '$lib/debug';
	import { browser } from '$app/environment';
	
	// Hacer disponible el debug service en la consola del navegador
	if (browser) {
		(window as any).debugWellPlay = DebugService;
		console.log('🛠️ Debug service disponible: debugWellPlay.debugUserFlow() o debugWellPlay.debugPersistenceFlow()');
	}
</script>

<svelte:head>
	<meta name="viewport" content="width=device-width, initial-scale=1.0" />
</svelte:head>

<!-- Layout con estructura completa -->
<NavBar />

<!-- Sidebars fijos para desktop -->
<LeftSidebar />
<RightSidebar />

<main class="main-layout">
	<slot />
</main>

<!-- Sidebars móviles -->
<div class="mobile-sidebars">
	<div class="mobile-sidebar-container">
		<h3 class="mobile-sidebar-title">💡 Consejos y Productos</h3>
		<div class="mobile-sidebar-content">
			<MobileLeftSidebar />
		</div>
	</div>
	
	<div class="mobile-sidebar-container">
		<h3 class="mobile-sidebar-title">📢 Publicidad y Ofertas</h3>
		<div class="mobile-sidebar-content">
			<MobileRightSidebar />
		</div>
	</div>
</div>

<SponsorsFooter />

<style>
	:global(body) {
		margin: 0;
		padding: 0;
		min-height: 100vh;
		background: linear-gradient(135deg, var(--primary-color) 0%, var(--secondary-color) 100%);
		background-attachment: fixed;
	}

	.main-layout {
		min-height: calc(100vh - 80px); /* Ajustar por altura del navbar */
		display: flex;
		flex-direction: column;
		background: transparent; /* Transparente para mostrar el background del body */
		margin: 0 320px; /* Espacio para ambos sidebars */
		padding: 2rem;
		max-width: none; /* Permitir que use todo el espacio disponible */
	}

	/* Asegurar que el layout funcione correctamente */
	:global(#app) {
		display: flex;
		flex-direction: column;
		min-height: 100vh;
	}

	/* Sidebars móviles */
	.mobile-sidebars {
		display: none;
	}

	.mobile-sidebar-container {
		background: rgba(255, 255, 255, 0.95);
		backdrop-filter: blur(10px);
		border-radius: 12px;
		margin: 1rem;
		padding: 1rem;
		box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
		border: 1px solid rgba(255, 255, 255, 0.2);
	}

	.mobile-sidebar-title {
		margin: 0 0 1rem 0;
		color: #333;
		font-size: 1.1rem;
		font-weight: 600;
		text-align: center;
		padding-bottom: 0.5rem;
		border-bottom: 2px solid rgba(102, 126, 234, 0.2);
	}

	.mobile-sidebar-content {
		display: flex;
		gap: 1rem;
		overflow-x: auto;
		padding: 1rem 0;
		scroll-behavior: smooth;
	}

	.mobile-sidebar-content::-webkit-scrollbar {
		height: 6px;
	}

	.mobile-sidebar-content::-webkit-scrollbar-track {
		background: rgba(102, 126, 234, 0.1);
		border-radius: 3px;
	}

	.mobile-sidebar-content::-webkit-scrollbar-thumb {
		background: rgba(102, 126, 234, 0.3);
		border-radius: 3px;
	}

	.mobile-sidebar-content::-webkit-scrollbar-thumb:hover {
		background: rgba(102, 126, 234, 0.5);
	}

	/* Responsive para sidebars */
	@media (max-width: 1440px) {
		.main-layout {
			margin: 0 260px; /* Ajustar para sidebars más pequeños */
		}
	}

	@media (max-width: 1200px) {
		.main-layout {
			margin: 0 2rem; /* Sin sidebars en pantallas pequeñas */
		}

		.mobile-sidebars {
			display: block;
		}
	}

	@media (max-width: 768px) {
		.main-layout {
			margin: 0 1rem;
			padding: 1rem;
		}

		.mobile-sidebar-container {
			margin: 0.5rem;
		}

		.mobile-sidebar-content {
			padding: 0.5rem 0;
		}
	}

	@media (max-width: 480px) {
		.main-layout {
			margin: 0 0.5rem;
			padding: 0.5rem;
		}

		.mobile-sidebar-container {
			margin: 0.25rem;
			padding: 0.75rem;
		}

		.mobile-sidebar-title {
			font-size: 1rem;
		}
	}
</style>
