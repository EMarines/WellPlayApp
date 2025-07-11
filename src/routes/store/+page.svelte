<script lang="ts">
	// Página de Store
</script>

<svelte:head>
	<title>Store - WellPlayApp</title>
	<meta name="description" content="Tienda de productos WellPlay" />
</svelte:head>

<section class="page-content">
	<div class="container">
		<h1>🛍️ Store</h1>
		<p>Tu tienda especializada en tu palma de la mano. Encuentra todo lo que necesitas para tu bienestar.</p>
		
		<div class="products-grid">
			<div class="product-card">
				<div class="product-image">🏃‍♂️</div>
				<h3>Equipamiento Deportivo</h3>
				<p>Las mejores marcas para tu entrenamiento</p>
				<div class="price">$49.99</div>
				<button class="btn-primary">Comprar</button>
			</div>
			<div class="product-card">
				<div class="product-image">🥗</div>
				<h3>Suplementos Nutricionales</h3>
				<p>Complementa tu dieta de forma saludable</p>
				<div class="price">$29.99</div>
				<button class="btn-primary">Comprar</button>
			</div>
			<div class="product-card">
				<div class="product-image">📱</div>
				<h3>Accesorios Tech</h3>
				<p>Gadgets para mejorar tu rendimiento</p>
				<div class="price">$89.99</div>
				<button class="btn-primary">Comprar</button>
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

	.products-grid {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
		gap: 2rem;
	}

	.product-card {
		background: white;
		padding: 2rem;
		border-radius: 12px;
		box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
		transition: transform 0.3s ease;
		text-align: center;
	}

	.product-card:hover {
		transform: translateY(-5px);
	}

	.product-image {
		font-size: 4rem;
		margin-bottom: 1rem;
	}

	.product-card h3 {
		color: #667eea;
		margin-bottom: 1rem;
	}

	.price {
		font-size: 1.5rem;
		color: #ff6b35;
		font-weight: bold;
		margin: 1rem 0;
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
		width: 100%;
	}

	.btn-primary:hover {
		transform: translateY(-2px);
		box-shadow: 0 4px 15px rgba(102, 126, 234, 0.3);
	}
</style>
