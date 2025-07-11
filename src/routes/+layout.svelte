<script>
	import './app.css';
</script>

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
