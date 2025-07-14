<script lang="ts">
	// Datos para el consejo del día y productos recomendados
	const tipOfDay = "💡 Bebe al menos 8 vasos de agua al día para mantener tu cuerpo hidratado y mejorar tu rendimiento.";

	const recommendedProducts = [
		{
			id: 1,
			title: "Proteína Whey Premium",
			image: "/logo.png",
			link: "/store",
			price: "$49.99",
			description: "Proteína de alta calidad para desarrollo muscular"
		},
		{
			id: 2,
			title: "Suplemento Pre-Workout",
			image: "/logo.png",
			link: "/store",
			price: "$34.99",
			description: "Energía y resistencia para tus entrenamientos"
		},
		{
			id: 3,
			title: "Multivitamínico Deportivo",
			image: "/logo.png",
			link: "/store",
			price: "$24.99",
			description: "Vitaminas esenciales para atletas"
		}
	];
</script>

<aside class="left-sidebar">
	<!-- Tip del día -->
	<div class="widget tip-widget">
		<h3 class="widget-title">💡 Consejo del Día</h3>
		<p class="tip-content">{tipOfDay}</p>
	</div>

	<!-- Productos recomendados -->
	<div class="widget products-widget">
		<h3 class="widget-title">🛍️ Productos Recomendados</h3>
		
		<div class="products-list">
			{#each recommendedProducts as product}
				<div class="product-card">
					<a href={product.link} class="product-link">
						<div class="product-image">
							<img src={product.image} alt={product.title} />
						</div>
						<div class="product-info">
							<h4 class="product-title">{product.title}</h4>
							<p class="product-description">{product.description}</p>
							<span class="product-price">{product.price}</span>
						</div>
					</a>
				</div>
			{/each}
		</div>
	</div>

	<!-- Widget de enlaces rápidos -->
	<div class="widget quick-links">
		<h3 class="widget-title">🔗 Enlaces Rápidos</h3>
		<ul class="links-list">
			<li><a href="/retos">Retos y Competencias</a></li>
			<li><a href="/blog">Blog de Salud</a></li>
			<li><a href="/store">Tienda Premium</a></li>
			<li><a href="/chat">Comunidad Chat</a></li>
		</ul>
	</div>
</aside>

<style>
	.left-sidebar {
		width: 280px;
		padding: 1rem;
		display: flex;
		flex-direction: column;
		gap: 1.5rem;
		position: fixed;
		top: 100px;
		left: 20px;
		height: calc(100vh - 120px);
		overflow-y: auto;
		z-index: 10;
	}

	/* Scrollbar personalizada */
	.left-sidebar::-webkit-scrollbar {
		width: 6px;
	}

	.left-sidebar::-webkit-scrollbar-track {
		background: rgba(255, 255, 255, 0.1);
		border-radius: 3px;
	}

	.left-sidebar::-webkit-scrollbar-thumb {
		background: rgba(255, 255, 255, 0.3);
		border-radius: 3px;
	}

	.left-sidebar::-webkit-scrollbar-thumb:hover {
		background: rgba(255, 255, 255, 0.5);
	}

	.widget {
		background: rgba(255, 255, 255, 0.95);
		backdrop-filter: blur(10px);
		border-radius: 12px;
		padding: 1.5rem;
		box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
		border: 1px solid rgba(255, 255, 255, 0.2);
	}

	.widget-title {
		margin: 0 0 1rem 0;
		color: #333;
		font-size: 1.1rem;
		font-weight: 600;
	}

	.tip-content {
		margin: 0;
		color: #555;
		line-height: 1.5;
		font-style: italic;
		font-size: 0.9rem;
	}

	.products-list {
		display: flex;
		flex-direction: column;
		gap: 1rem;
	}

	.product-card {
		border-radius: 8px;
		overflow: hidden;
		transition: transform 0.3s ease;
	}

	.product-card:hover {
		transform: translateY(-2px);
	}

	.product-link {
		text-decoration: none;
		color: inherit;
		display: block;
	}

	.product-image {
		height: 80px;
		overflow: hidden;
		background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.product-image img {
		width: 40px;
		height: 40px;
		object-fit: contain;
		filter: brightness(0) invert(1);
	}

	.product-info {
		padding: 1rem;
		background: white;
	}

	.product-title {
		margin: 0 0 0.5rem 0;
		font-size: 0.9rem;
		font-weight: 600;
		color: #333;
	}

	.product-description {
		margin: 0 0 0.5rem 0;
		font-size: 0.8rem;
		color: #666;
		line-height: 1.3;
	}

	.product-price {
		font-weight: 700;
		color: #667eea;
		font-size: 0.9rem;
	}

	.links-list {
		list-style: none;
		padding: 0;
		margin: 0;
	}

	.links-list li {
		margin-bottom: 0.75rem;
	}

	.links-list li:last-child {
		margin-bottom: 0;
	}

	.links-list a {
		color: #667eea;
		text-decoration: none;
		font-size: 0.9rem;
		display: block;
		padding: 0.5rem;
		border-radius: 6px;
		transition: all 0.3s ease;
	}

	.links-list a:hover {
		background: rgba(102, 126, 234, 0.1);
		transform: translateX(4px);
	}

	/* Responsive */
	@media (max-width: 1440px) {
		.left-sidebar {
			width: 240px;
			left: 10px;
		}
	}

	@media (max-width: 1200px) {
		.left-sidebar {
			display: none;
		}
	}
</style>
