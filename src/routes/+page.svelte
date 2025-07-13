<script lang="ts">
	let name = 'WellPlay';
</script>

<svelte:head>
	<title>WellPlayApp</title>
	<meta name="description" content="Bienvenido a WellPlayApp" />
</svelte:head>

<section class="page-section">
	<header class="page-header">
		<h1 class="page-title">Bienvenido a</h1>
		<div class="logo-container">
			<img src="/logo.png" alt="WellPlay" class="logo-inline" />
		</div>
	</header>

	<p class="page-subtitle">
		¡La Salud Es La Meta!
	</p>

	<div class="features-grid">
		<div class="feature-card">
			<h3 class="feature-title">🏆 Retos</h3>
			<p class="feature-description">Demuestra que eres el Mejor</p>
		</div>
		<div class="feature-card">
			<h3 class="feature-title">📝 Blog</h3>
			<p class="feature-description">Tips, Novedades, Consejos</p>
		</div>
		<div class="feature-card">
			<h3 class="feature-title">🛍️ Store</h3>
			<p class="feature-description">Tu tienda especializada en tu palma de la mano</p>
		</div>
		<div class="feature-card">
			<h3 class="feature-title">💬 Chat</h3>
			<p class="feature-description">Conéctate con otros usuarios y comparte tus experiencias</p>
		</div>
	</div>
</section>

<!-- Estilos removidos - ahora usa clases CSS globales desde app.css -->
