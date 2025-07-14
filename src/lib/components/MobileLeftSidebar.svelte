<script lang="ts">
	// Datos para el consejo del día y productos recomendados (versión móvil)
	const tipOfDay = "💡 Bebe al menos 8 vasos de agua al día para mantener tu cuerpo hidratado y mejorar tu rendimiento.";

	const recommendedProducts = [
		{
			id: 1,
			title: "Proteína Whey Premium",
			image: "/logo.png",
			link: "/store",
			price: "$49.99",
			description: "Proteína de alta calidad"
		},
		{
			id: 2,
			title: "Pre-Workout",
			image: "/logo.png",
			link: "/store",
			price: "$34.99",
			description: "Energía para entrenar"
		},
		{
			id: 3,
			title: "Multivitamínico",
			image: "/logo.png",
			link: "/store",
			price: "$24.99",
			description: "Vitaminas esenciales"
		},
		{
			id: 4,
			title: "Creatina Premium",
			image: "/logo.png",
			link: "/store",
			price: "$29.99",
			description: "Fuerza y potencia"
		}
	];

	const quickLinks = [
		{ title: "Retos", href: "/retos", emoji: "🏆" },
		{ title: "Blog", href: "/blog", emoji: "📝" },
		{ title: "Store", href: "/store", emoji: "🛍️" },
		{ title: "Chat", href: "/chat", emoji: "💬" }
	];
</script>

<div class="mobile-left-sidebar">
	<!-- Tip del día (tarjeta horizontal) -->
	<div class="mobile-tip-card">
		<div class="tip-icon">💡</div>
		<div class="tip-content">
			<h4>Consejo del Día</h4>
			<p>{tipOfDay}</p>
		</div>
	</div>

	<!-- Productos recomendados (scroll horizontal) -->
	{#each recommendedProducts as product}
		<div class="mobile-product-card">
			<a href={product.link} class="product-link">
				<div class="product-image">
					<img src={product.image} alt={product.title} />
				</div>
				<div class="product-info">
					<h4>{product.title}</h4>
					<p>{product.description}</p>
					<span class="price">{product.price}</span>
				</div>
			</a>
		</div>
	{/each}

	<!-- Enlaces rápidos -->
	{#each quickLinks as link}
		<div class="mobile-quick-link">
			<a href={link.href}>
				<div class="link-icon">{link.emoji}</div>
				<span>{link.title}</span>
			</a>
		</div>
	{/each}
</div>

<style>
	.mobile-left-sidebar {
		display: flex;
		gap: 1rem;
		min-width: max-content;
	}

	.mobile-tip-card {
		min-width: 300px;
		max-width: 320px;
		background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
		border-radius: 12px;
		padding: 1rem;
		color: white;
		display: flex;
		align-items: center;
		gap: 1rem;
		flex-shrink: 0;
	}

	.tip-icon {
		font-size: 2rem;
		flex-shrink: 0;
	}

	.tip-content h4 {
		margin: 0 0 0.5rem 0;
		font-size: 1rem;
		font-weight: 600;
	}

	.tip-content p {
		margin: 0;
		font-size: 0.8rem;
		line-height: 1.3;
		opacity: 0.9;
	}

	.mobile-product-card {
		min-width: 160px;
		max-width: 180px;
		background: white;
		border-radius: 12px;
		overflow: hidden;
		box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
		transition: transform 0.3s ease;
		flex-shrink: 0;
	}

	.mobile-product-card:hover {
		transform: translateY(-2px);
	}

	.product-link {
		text-decoration: none;
		color: inherit;
		display: block;
	}

	.product-image {
		height: 80px;
		background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%);
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
	}

	.product-info h4 {
		margin: 0 0 0.5rem 0;
		font-size: 0.9rem;
		font-weight: 600;
		color: #333;
	}

	.product-info p {
		margin: 0 0 0.5rem 0;
		font-size: 0.7rem;
		color: #666;
		line-height: 1.2;
	}

	.price {
		font-weight: 700;
		color: #667eea;
		font-size: 0.9rem;
	}

	.mobile-quick-link {
		min-width: 100px;
		max-width: 120px;
		background: rgba(255, 255, 255, 0.9);
		border-radius: 12px;
		overflow: hidden;
		box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
		flex-shrink: 0;
	}

	.mobile-quick-link a {
		text-decoration: none;
		color: #333;
		display: flex;
		flex-direction: column;
		align-items: center;
		padding: 1rem 0.5rem;
		transition: all 0.3s ease;
	}

	.mobile-quick-link:hover a {
		background: rgba(102, 126, 234, 0.1);
	}

	.link-icon {
		font-size: 1.5rem;
		margin-bottom: 0.5rem;
	}

	.mobile-quick-link span {
		font-size: 0.8rem;
		font-weight: 600;
		text-align: center;
	}
</style>
