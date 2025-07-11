<script lang="ts">
	// Página de About
</script>

<svelte:head>
	<title>About - WellPlayApp</title>
	<meta name="description" content="Acerca de WellPlay" />
</svelte:head>

<section class="page-content">
	<div class="container">
		<h1>ℹ️ About WellPlay</h1>
		<p>Conoce más sobre nuestra misión de promover el bienestar y la vida saludable.</p>
		
		<div class="about-grid">
			<div class="about-card">
				<h3>🎯 Nuestra Misión</h3>
				<p>Inspirar y acompañar a las personas en su camino hacia una vida más saludable y equilibrada, proporcionando herramientas, comunidad y motivación constante.</p>
			</div>
			
			<div class="about-card">
				<h3>👥 Nuestra Comunidad</h3>
				<p>Somos una comunidad global de personas comprometidas con su bienestar, donde cada logro se celebra y cada desafío se supera juntos.</p>
			</div>
			
			<div class="about-card">
				<h3>🚀 Nuestra Visión</h3>
				<p>Ser la plataforma líder mundial que democratiza el acceso al bienestar, haciendo que la vida saludable sea accesible y divertida para todos.</p>
			</div>
		</div>
		
		<div class="team-section">
			<h2>Nuestro Equipo</h2>
			<div class="team-grid">
				<div class="team-member">
					<div class="member-avatar">👨‍💻</div>
					<h4>Carlos Desarrollador</h4>
					<p>Fundador & CEO</p>
				</div>
				<div class="team-member">
					<div class="member-avatar">👩‍🔬</div>
					<h4>Ana Nutrición</h4>
					<p>Directora de Contenido</p>
				</div>
				<div class="team-member">
					<div class="member-avatar">👨‍⚕️</div>
					<h4>Dr. Martinez</h4>
					<p>Asesor Médico</p>
				</div>
			</div>
		</div>
		
		<div class="values-section">
			<h2>Nuestros Valores</h2>
			<div class="values-list">
				<div class="value-item">
					<span class="value-icon">💪</span>
					<div>
						<h4>Fortaleza</h4>
						<p>Creemos en el poder de la constancia y la disciplina</p>
					</div>
				</div>
				<div class="value-item">
					<span class="value-icon">🤝</span>
					<div>
						<h4>Comunidad</h4>
						<p>Juntos somos más fuertes y llegamos más lejos</p>
					</div>
				</div>
				<div class="value-item">
					<span class="value-icon">🌱</span>
					<div>
						<h4>Crecimiento</h4>
						<p>Cada día es una oportunidad para mejorar</p>
					</div>
				</div>
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

	h2 {
		font-size: 2rem;
		margin: 3rem 0 2rem 0;
		color: #333;
		text-align: center;
	}

	p {
		font-size: 1.1rem;
		color: #666;
		margin-bottom: 2rem;
	}

	.about-grid {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
		gap: 2rem;
		margin-bottom: 3rem;
	}

	.about-card {
		background: white;
		padding: 2rem;
		border-radius: 12px;
		box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
		transition: transform 0.3s ease;
	}

	.about-card:hover {
		transform: translateY(-5px);
	}

	.about-card h3 {
		color: #667eea;
		margin-bottom: 1rem;
		font-size: 1.3rem;
	}

	.team-section {
		background: #f8f9fa;
		padding: 3rem 2rem;
		border-radius: 12px;
		margin: 3rem 0;
	}

	.team-grid {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
		gap: 2rem;
	}

	.team-member {
		text-align: center;
		background: white;
		padding: 2rem;
		border-radius: 12px;
		box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
	}

	.member-avatar {
		font-size: 4rem;
		margin-bottom: 1rem;
	}

	.team-member h4 {
		color: #333;
		margin-bottom: 0.5rem;
	}

	.team-member p {
		color: #667eea;
		margin: 0;
		font-weight: 500;
	}

	.values-section {
		margin-top: 3rem;
	}

	.values-list {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
		gap: 2rem;
	}

	.value-item {
		display: flex;
		align-items: flex-start;
		gap: 1rem;
		background: white;
		padding: 2rem;
		border-radius: 12px;
		box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
	}

	.value-icon {
		font-size: 2rem;
		flex-shrink: 0;
	}

	.value-item h4 {
		color: #667eea;
		margin-bottom: 0.5rem;
	}

	.value-item p {
		margin: 0;
		color: #666;
	}
</style>
