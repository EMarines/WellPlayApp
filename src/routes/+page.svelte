<script lang="ts">
	let name = 'WellPlay';
</script>

<svelte:head>
	<title>WellPlayApp</title>
	<meta name="description" content="Bienvenido a WellPlayApp" />
</svelte:head>

<section>
	<h1>
		Bienvenido a <span class="logo">{name}</span>
	</h1>

	<p>
		¡La Salud Es La Meta!
	</p>

	<div class="features">
		<div class="feature">
			<h3>🏆 Retos</h3>
			<p>Demuestra que eres el Mejor</p>
		</div>
		<div class="feature">
			<h3>� Blog</h3>
			<p>Tips, Novedades, Consejos</p>
		</div>
		<div class="feature">
			<h3>�️ Store</h3>
			<p>Tu tienda especializada en tu palma de la mano</p>
		</div>
		<div class="feature">
			<h3>💬 Chat</h3>
			<p>Conéctate con otros usuarios y comparte tus experiencias</p>
		</div>
	</div>
</section>

<style>
	:root {
		--primary-color: #667eea;
		--secondary-color: #764ba2;
		--logo-color-1: #ffd700;
		--logo-color-2: #ff6b35;
		--text-color: white;
	}

	section {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		text-align: center;
		min-height: calc(100vh - 80px);
		padding: 2rem;
		background: linear-gradient(135deg, var(--primary-color) 0%, var(--secondary-color) 100%);
		color: var(--text-color);
	}

	h1 {
		font-size: 3rem;
		margin-bottom: 1rem;
		font-weight: 700;
	}

	.logo {
		background: linear-gradient(45deg, var(--logo-color-1), var(--logo-color-2));
		background-clip: text;
		-webkit-background-clip: text;
		-webkit-text-fill-color: transparent;
		text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3);
	}

	p {
		font-size: 1.2rem;
		margin-bottom: 2rem;
		opacity: 0.9;
	}

	.features {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
		gap: 2rem;
		max-width: 800px;
		width: 100%;
	}

	.feature {
		background: rgba(255, 255, 255, 0.1);
		backdrop-filter: blur(10px);
		border-radius: 12px;
		padding: 1.5rem;
		border: 1px solid rgba(255, 255, 255, 0.2);
	}

	.feature h3 {
		font-size: 1.5rem;
		margin-bottom: 0.5rem;
	}

	.feature p {
		margin: 0;
		font-size: 1rem;
		opacity: 0.8;
	}

	@media (max-width: 768px) {
		h1 {
			font-size: 2rem;
		}
		
		.features {
			grid-template-columns: 1fr;
		}
	}
</style>
