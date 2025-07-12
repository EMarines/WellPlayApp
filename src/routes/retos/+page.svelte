<script lang="ts">
	// Página de Retos
</script>

<svelte:head>
	<title>Retos - WellPlayApp</title>
	<meta name="description" content="Desafíos y retos de WellPlay" />
</svelte:head>

<section class="page-content">
	<div class="container">
		<h1>🏆 Retos</h1>
		<p>Demuestra que eres el mejor. Aquí encontrarás todos los desafíos disponibles.</p>
		
		<div class="retos-grid">
			<div class="reto-card">
				<h3>Reto Semanal</h3>
				<p>Completa 5 entrenamientos esta semana</p>
				<button class="btn-primary">Participar</button>
			</div>
			<div class="reto-card">
				<h3>Reto de Resistencia</h3>
				<p>Corre 10km sin parar</p>
				<button class="btn-primary">Participar</button>
			</div>
			<div class="reto-card">
				<h3>Reto de Flexibilidad</h3>
				<p>30 días de yoga consecutivos</p>
				<button class="btn-primary">Participar</button>
			</div>
		</div>
	</div>
</section>

<style>
	.page-content {
		padding: 2rem 0;
		min-height: calc(100vh - 80px);
	}

	.container {
		max-width: 1200px;
		margin: 0 auto;
		padding: 0 1rem;
	}

	h1 {
		font-size: 2.5rem;
		margin-bottom: 1rem;
		color: #333;
	}

	p {
		font-size: 1.1rem;
		color: #666;
		margin-bottom: 2rem;
	}

	.retos-grid {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
		gap: 2rem;
	}

	.reto-card {
		background: white;
		padding: 2rem;
		border-radius: 12px;
		box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
		transition: transform 0.3s ease;
	}

	.reto-card:hover {
		transform: translateY(-5px);
	}

	.reto-card h3 {
		color: #667eea;
		margin-bottom: 1rem;
	}

	.btn-primary {
		background: linear-gradient(135deg, #667eea, #764ba2);
		color: white;
		border: none;
		padding: 0.75rem 1.5rem;
		border-radius: 8px;
		cursor: pointer;
		font-weight: 500;
		transition: all 0.3s ease;
	}

	.btn-primary:hover {
		transform: translateY(-2px);
		box-shadow: 0 4px 15px rgba(102, 126, 234, 0.3);
	}
</style>
