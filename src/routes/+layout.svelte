<script>
	import './app.css';
	import NavBar from '$lib/NavBar.svelte';
</script>

<svelte:head>
	<meta name="viewport" content="width=device-width, initial-scale=1.0" />
</svelte:head>

<!-- Usar el componente NavBar que ya tiene el logo integrado -->
<NavBar />

<main>
	<slot />
</main>
