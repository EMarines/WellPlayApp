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
			¡La Salud Es La Meta!
		</p>

		<!-- Carrusel de características -->
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
		padding: 2rem;
		color: var(--text-white);
	}

	/* Responsive */
	@media (max-width: 768px) {
		.main-content {
			padding: 1rem;
		}
	}
</style>
