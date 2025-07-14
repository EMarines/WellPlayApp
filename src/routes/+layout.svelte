<script>
	import './app.css';
	import NavBar from '$lib/NavBar.svelte';
	import SponsorsFooter from '$lib/components/SponsorsFooter.svelte';
</script>

<svelte:head>
	<meta name="viewport" content="width=device-width, initial-scale=1.0" />
</svelte:head>

<!-- Layout con estructura completa -->
<NavBar />

<main class="main-layout">
	<slot />
</main>

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
	}

	/* Asegurar que el layout funcione correctamente */
	:global(#app) {
		display: flex;
		flex-direction: column;
		min-height: 100vh;
	}
</style>
