<script>
	import './app.css';
	import NavBar from '$lib/NavBar.svelte';
</script>

<NavBar />

<main>
	<slot />
</main>

<style>
	main {
		display: flex;
		flex-direction: column;
		min-height: 100vh;
	}
</style>
