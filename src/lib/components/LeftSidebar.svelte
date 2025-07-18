<script lang="ts">
	// Datos para el consejo del día y productos recomendados
	const tipOfDay = "💡 Bebe al menos 8 vasos de agua al día para mantener tu cuerpo hidratado y mejorar tu rendimiento.";

	// Google AdSense - Anuncios de fitness y salud
	const fitnessAds = [
		{
			id: 1,
			title: "FitBit Charge 5 - Monitor Fitness",
			brand: "Fitbit",
			image: "/logo.png",
			link: "#",
			price: "Desde $199.99",
			description: "Monitoreo 24/7 de salud y fitness. GPS integrado.",
			badge: "Más Vendido",
			rating: "⭐⭐⭐⭐⭐"
		},
		{
			id: 2,
			title: "Nike Training Club Premium",
			brand: "Nike",
			image: "/logo.png",
			link: "#",
			price: "Gratis - $9.99/mes",
			description: "Entrenamientos personalizados y nutrición premium",
			badge: "Nuevo",
			rating: "⭐⭐⭐⭐⭐"
		},
		{
			id: 3,
			title: "MyProtein - 40% Descuento",
			brand: "MyProtein",
			image: "/logo.png",
			link: "#",
			price: "Desde $29.99",
			description: "Proteína Whey | Creatina | BCAAs - Envío gratis",
			badge: "Oferta",
			rating: "⭐⭐⭐⭐"
		}
	];

	// Google AdSense - Banners de salud y bienestar
	const healthBanners = [
		{
			id: 1,
			type: "banner",
			title: "Seguro Médico Familiar",
			company: "Seguros Atlas",
			description: "Protege a tu familia con cobertura completa",
			cta: "Cotizar Ahora",
			color: "#2E8B57",
			icon: "🏥"
		},
		{
			id: 2,
			type: "banner", 
			title: "Nutriólogo Online 24/7",
			company: "HealthTech",
			description: "Consultas virtuales con especialistas certificados",
			cta: "Primera Consulta Gratis",
			color: "#FF6B6B",
			icon: "👩‍⚕️"
		}
	];
</script>

<aside class="left-sidebar">
	<!-- Tip del día -->
	<div class="widget tip-widget">
		<h3 class="widget-title">💡 Consejo del Día</h3>
		<p class="tip-content">{tipOfDay}</p>
	</div>

	<!-- Google AdSense - Banner de Salud -->
	<div class="ad-widget">
		{#each healthBanners as banner}
			<div class="health-banner" style="background: linear-gradient(135deg, {banner.color}15, {banner.color}25);">
				<div class="ad-label">Anuncio</div>
				<div class="banner-content">
					<div class="banner-icon">{banner.icon}</div>
					<div class="banner-info">
						<h4 class="banner-title">{banner.title}</h4>
						<p class="banner-company">{banner.company}</p>
						<p class="banner-description">{banner.description}</p>
						<button class="banner-cta" style="background: {banner.color};">{banner.cta}</button>
					</div>
				</div>
			</div>
		{/each}
	</div>

	<!-- Google AdSense - Productos Fitness -->
	<div class="widget products-widget">
		<div class="widget-header">
			<h3 class="widget-title">🛍️ Productos Recomendados</h3>
			<span class="ad-disclosure">Anuncios</span>
		</div>
		
		<div class="products-list">
			{#each fitnessAds as product}
				<div class="product-card ad-product">
					<a href={product.link} class="product-link">
						{#if product.badge}
							<div class="product-badge">{product.badge}</div>
						{/if}
						<div class="product-image">
							<img src={product.image} alt={product.title} />
						</div>
						<div class="product-info">
							<div class="product-brand">{product.brand}</div>
							<h4 class="product-title">{product.title}</h4>
							<div class="product-rating">{product.rating}</div>
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

	.widget-header {
		display: flex;
		justify-content: space-between;
		align-items: center;
		margin-bottom: 1rem;
	}

	.ad-disclosure {
		font-size: 0.7rem;
		color: #999;
		background: #f0f0f0;
		padding: 2px 6px;
		border-radius: 3px;
		text-transform: uppercase;
		letter-spacing: 0.5px;
	}

	/* Google AdSense - Health Banners */
	.ad-widget {
		display: flex;
		flex-direction: column;
		gap: 1rem;
	}

	.health-banner {
		border-radius: 8px;
		padding: 1rem;
		position: relative;
		border: 1px solid rgba(0, 0, 0, 0.1);
		cursor: pointer;
		transition: transform 0.3s ease;
	}

	.health-banner:hover {
		transform: translateY(-2px);
		box-shadow: 0 6px 25px rgba(0, 0, 0, 0.15);
	}

	.ad-label {
		position: absolute;
		top: 5px;
		right: 8px;
		font-size: 0.6rem;
		color: #666;
		background: rgba(255, 255, 255, 0.9);
		padding: 2px 4px;
		border-radius: 2px;
		text-transform: uppercase;
	}

	.banner-content {
		display: flex;
		align-items: center;
		gap: 0.75rem;
	}

	.banner-icon {
		font-size: 2rem;
		min-width: 40px;
	}

	.banner-info {
		flex: 1;
	}

	.banner-title {
		margin: 0 0 0.25rem 0;
		font-size: 0.9rem;
		font-weight: 600;
		color: #333;
	}

	.banner-company {
		margin: 0 0 0.5rem 0;
		font-size: 0.7rem;
		color: #666;
		font-weight: 500;
	}

	.banner-description {
		margin: 0 0 0.75rem 0;
		font-size: 0.8rem;
		color: #555;
		line-height: 1.3;
	}

	.banner-cta {
		background: #667eea;
		color: white;
		border: none;
		padding: 0.4rem 0.8rem;
		border-radius: 4px;
		font-size: 0.75rem;
		font-weight: 600;
		cursor: pointer;
		transition: background 0.3s ease;
		text-transform: uppercase;
		letter-spacing: 0.5px;
	}

	.banner-cta:hover {
		filter: brightness(1.1);
	}

	/* Google AdSense - Product Ads */
	.ad-product {
		position: relative;
		border: 1px solid rgba(102, 126, 234, 0.2);
	}

	.product-badge {
		position: absolute;
		top: 8px;
		right: 8px;
		background: #FF4757;
		color: white;
		font-size: 0.6rem;
		padding: 2px 6px;
		border-radius: 8px;
		font-weight: 600;
		text-transform: uppercase;
		z-index: 2;
		letter-spacing: 0.5px;
	}

	.product-brand {
		font-size: 0.7rem;
		color: #667eea;
		font-weight: 600;
		text-transform: uppercase;
		letter-spacing: 0.5px;
		margin-bottom: 0.25rem;
	}

	.product-rating {
		font-size: 0.8rem;
		margin: 0.25rem 0;
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
