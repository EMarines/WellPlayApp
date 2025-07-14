<script lang="ts">
	import FeatureCarousel from '$lib/components/FeatureCarousel.svelte';
	import Sidebar from '$lib/components/Sidebar.svelte';
	let name = 'WellPlay';
</script>

<svelte:head>
	<title>WellPlayApp</title>
	<meta name="description" content="Bienvenido a WellPlayApp" />
</svelte:head>

<div class="home-layout">
	<!-- Contenido principal -->
	<section class="main-content">
		<header class="page-header">
			<h1 class="page-title">Bienvenido a</h1>
			<div class="logo-container">
				<img src="/logo.png" alt="WellPlay" class="logo-inline" />
			</div>
		</header>

		<p class="page-subtitle">
			¡La Salud Es La Meta!
		</p>

		<!-- Carrusel de características -->
		<FeatureCarousel />
	</section>

	<!-- Sidebar con publicidad -->
	<aside class="sidebar-container">
		<Sidebar />
	</aside>
</div>

<style>
	.home-layout {
		display: grid;
		grid-template-columns: 1fr;
		gap: 2rem;
		max-width: 1400px;
		margin: 0 auto;
		padding: 2rem 1rem;
	}

	.main-content {
		/* Contenido principal sin background propio */
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		text-align: center;
		min-height: calc(100vh - var(--nav-padding));
		padding: 2rem;
		color: var(--text-white);
	}

	.sidebar-container {
		display: none; /* Oculto en móvil por defecto */
	}

	/* Desktop: Layout de 2 columnas */
	@media (min-width: 1024px) {
		.home-layout {
			grid-template-columns: 1fr 320px; /* Sidebar más estrecho */
			gap: 2rem;
			max-width: 1200px; /* Contenedor más controlado */
		}

		.sidebar-container {
			display: block;
		}
	}

	/* Tablet: Sidebar abajo */
	@media (min-width: 768px) and (max-width: 1023px) {
		.home-layout {
			grid-template-columns: 1fr;
		}

		.sidebar-container {
			display: block;
			order: 2;
		}

		.main-content {
			order: 1;
		}
	}
</style>
