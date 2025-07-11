

<script lang="ts">
	// Página de Blog
</script>

<svelte:head>
	<title>Blog - WellPlayApp</title>
	<meta name="description" content="Tips, novedades y consejos de bienestar" />
</svelte:head>

<section class="page-content">
	<div class="container">
		<h1>📝 Blog</h1>
		<p>Tips, novedades y consejos para tu bienestar diario.</p>
		
		<div class="blog-grid">
			<article class="blog-post">
				<div class="post-image">🏃‍♂️</div>
				<div class="post-content">
					<h3>5 Tips para Mantener la Motivación en el Ejercicio</h3>
					<p class="post-excerpt">Descubre las estrategias más efectivas para mantener la constancia en tu rutina de ejercicios...</p>
					<div class="post-meta">
						<span class="post-date">15 Julio 2025</span>
						<span class="post-category">Ejercicio</span>
					</div>
					<button class="read-more-btn">Leer más</button>
				</div>
			</article>
			
			<article class="blog-post">
				<div class="post-image">🥗</div>
				<div class="post-content">
					<h3>Nutrición Balanceada: Guía para Principiantes</h3>
					<p class="post-excerpt">Aprende los fundamentos de una alimentación equilibrada que te ayude a alcanzar tus objetivos...</p>
					<div class="post-meta">
						<span class="post-date">12 Julio 2025</span>
						<span class="post-category">Nutrición</span>
					</div>
					<button class="read-more-btn">Leer más</button>
				</div>
			</article>
			
			<article class="blog-post">
				<div class="post-image">🧘‍♀️</div>
				<div class="post-content">
					<h3>Mindfulness: Tu Aliado para Reducir el Estrés</h3>
					<p class="post-excerpt">Explora técnicas de atención plena que puedes incorporar en tu día a día para una vida más tranquila...</p>
					<div class="post-meta">
						<span class="post-date">10 Julio 2025</span>
						<span class="post-category">Bienestar Mental</span>
					</div>
					<button class="read-more-btn">Leer más</button>
				</div>
			</article>
			
			<article class="blog-post">
				<div class="post-image">💤</div>
				<div class="post-content">
					<h3>La Importancia del Sueño en tu Rendimiento</h3>
					<p class="post-excerpt">Conoce cómo un buen descanso nocturno puede mejorar tu rendimiento físico y mental...</p>
					<div class="post-meta">
						<span class="post-date">8 Julio 2025</span>
						<span class="post-category">Descanso</span>
					</div>
					<button class="read-more-btn">Leer más</button>
				</div>
			</article>
			
			<article class="blog-post">
				<div class="post-image">💪</div>
				<div class="post-content">
					<h3>Rutina de Ejercicios en Casa: Sin Equipos</h3>
					<p class="post-excerpt">Una rutina completa que puedes hacer desde la comodidad de tu hogar sin necesidad de equipos...</p>
					<div class="post-meta">
						<span class="post-date">5 Julio 2025</span>
						<span class="post-category">Ejercicio</span>
					</div>
					<button class="read-more-btn">Leer más</button>
				</div>
			</article>
			
			<article class="blog-post">
				<div class="post-image">🌱</div>
				<div class="post-content">
					<h3>Hábitos Saludables: Cómo Empezar Gradualmente</h3>
					<p class="post-excerpt">Estrategias probadas para incorporar nuevos hábitos saludables de manera sostenible...</p>
					<div class="post-meta">
						<span class="post-date">3 Julio 2025</span>
						<span class="post-category">Estilo de Vida</span>
					</div>
					<button class="read-more-btn">Leer más</button>
				</div>
			</article>
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

	.blog-grid {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
		gap: 2rem;
	}

	.blog-post {
		background: white;
		border-radius: 12px;
		box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
		overflow: hidden;
		transition: transform 0.3s ease;
	}

	.blog-post:hover {
		transform: translateY(-5px);
	}

	.post-image {
		font-size: 4rem;
		text-align: center;
		padding: 2rem;
		background: linear-gradient(135deg, #f8f9fa, #e9ecef);
	}

	.post-content {
		padding: 1.5rem;
	}

	.post-content h3 {
		color: #333;
		margin-bottom: 1rem;
		font-size: 1.3rem;
	}

	.post-excerpt {
		color: #666;
		line-height: 1.6;
		margin-bottom: 1rem;
		font-size: 1rem;
	}

	.post-meta {
		display: flex;
		justify-content: space-between;
		margin-bottom: 1.5rem;
		font-size: 0.9rem;
	}

	.post-date {
		color: #999;
	}

	.post-category {
		color: #667eea;
		font-weight: 500;
		background: rgba(102, 126, 234, 0.1);
		padding: 0.25rem 0.75rem;
		border-radius: 20px;
	}

	.read-more-btn {
		background: linear-gradient(135deg, #667eea, #764ba2);
		color: white;
		border: none;
		padding: 0.75rem 1.5rem;
		border-radius: 8px;
		cursor: pointer;
		font-weight: 500;
		transition: all 0.3s ease;
		width: 100%;
	}

	.read-more-btn:hover {
		transform: translateY(-2px);
		box-shadow: 0 4px 15px rgba(102, 126, 234, 0.3);
	}

	@media (max-width: 768px) {
		.blog-grid {
			grid-template-columns: 1fr;
		}
	}
</style>