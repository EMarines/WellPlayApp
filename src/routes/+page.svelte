<script lang="ts">
	import FeatureCarousel from '$lib/components/FeatureCarousel.svelte';
	let name = 'WellPlay';
</script>

<svelte:head>
	<title>WellPlayApp</title>
	<meta name="description" content="Bienvenido a WellPlayApp" />
</svelte:head>

<div class="home-content">
	<section class="main-content">
		<header class="page-header">
			<h1 class="page-title">Bienvenido a</h1>
			<div class="logo-container">
				<img src="/logo.png" alt="WellPlay" class="logo-inline" />
			</div>
		</header>

		<p class="page-subtitle">
			¡La Salud Es La Meta Pero Disfurtemos El Camino!
		</p>

		<FeatureCarousel />
	</section>
</div>

<style>
	.home-content {
		width: 100%;
		max-width: 1000px;
		margin: 0 auto;
		padding: 0;
	}

	.main-content {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		text-align: center;
		min-height: calc(100vh - 200px);
		padding: 1rem;
		color: var(--text-white);
	}

	.page-header {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		margin-bottom: 1rem;
		padding: 0;
	}

	.page-title {
		font-size: 2.5rem;
		margin: 0 0 0.5rem 0; /* Reducido el margen inferior */
		font-weight: 700;
		text-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
	}

	.logo-container {
		display: flex;
		justify-content: center;
		margin-bottom: 0.5rem; /* Pequeño margen para separar del subtitle */
	}

	.logo-inline {
		height: 85px; /* Reducido de 120px a 80px */
		width: auto;
		filter: drop-shadow(0 4px 8px rgba(0, 0, 0, 0.3));
		transition: transform 0.3s ease;
	}

	.logo-inline:hover {
		transform: scale(1.05);
	}

	.page-subtitle {
		font-size: 1.5rem;
		margin: 0 0 2.5rem 0; /* Reducido ligeramente el margen */
		font-weight: 500;
		opacity: 0.9;
		text-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
	}

	/* Responsive */
	@media (max-width: 768px) {
		.main-content {
			padding: 1rem;
		}

		.page-title {
			font-size: 2rem;
		}

		.logo-inline {
			height: 60px; /* Reducido de 80px a 60px para tablet */
		}

		.page-subtitle {
			font-size: 1.2rem;
			margin-bottom: 2rem;
		}
	}

	@media (max-width: 480px) {
		.page-title {
			font-size: 1.5rem;
		}

		.logo-inline {
			height: 45px; /* Reducido de 60px a 45px para móvil */
		}

		.page-subtitle {
			font-size: 1rem;
		}
	}
</style>
