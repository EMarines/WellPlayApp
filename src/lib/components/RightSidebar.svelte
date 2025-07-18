<script lang="ts">
	// Google AdSense - Anuncios premium de salud y fitness
	const premiumAds = [
		{
			id: 1,
			type: "premium-banner",
			company: "Total Life Changes",
			title: "Transforma Tu Vida en 30 Días",
			description: "Suplementos naturales respaldados por ciencia. Resultados garantizados.",
			image: "/logo.png",
			cta: "Descubre Más",
			price: "Desde $89.99",
			discount: "20% OFF",
			size: "300x250"
		},
		{
			id: 2,
			type: "app-ad",
			company: "Calm - Meditation App",
			title: "Medita y Reduce el Estrés",
			description: "La app #1 para meditación y sueño reparador. Prueba gratis 7 días.",
			image: "/logo.png",
			cta: "Descargar Gratis",
			rating: "⭐⭐⭐⭐⭐ 4.8",
			users: "50M+ usuarios",
			size: "300x150"
		},
		{
			id: 3,
			type: "service-ad",
			company: "Nutri Coach Online",
			title: "Plan Nutricional Personalizado",
			description: "Nutriólogos certificados crean tu plan ideal. Consulta online 24/7.",
			image: "/logo.png",
			cta: "Programa Tu Cita",
			offer: "Primera consulta GRATIS",
			certification: "Certificado por COFEPRIS",
			size: "300x300"
		}
	];

	// Google AdSense - Display ads
	const displayAds = [
		{
			id: 4,
			type: "display",
			title: "Gimnasio Premium Cerca de Ti",
			company: "SmartFit",
			description: "Equipos de última generación, clases grupales y entrenadores certificados.",
			cta: "Conocer Ubicaciones",
			size: "300x100"
		},
		{
			id: 5,
			type: "shopping",
			title: "Ropa Deportiva Nike - 40% OFF",
			company: "Nike Store",
			description: "Colección nueva de running y training. Envío gratis en compras +$99.",
			cta: "Comprar Ahora",
			size: "300x200"
		}
	];
</script>

<aside class="right-sidebar">
	<!-- Título principal del sidebar -->
	<div class="sidebar-header">
		<h2 class="sidebar-title">🎯 Cosas que te interesan</h2>
	</div>

	<!-- Google AdSense - Premium Ads -->
	{#each premiumAds as ad}
		<div class="ad-container premium-ad" data-ad-type={ad.type}>
			<div class="ad-label">Anuncio</div>
			{#if ad.discount}
				<div class="ad-discount">{ad.discount}</div>
			{/if}
			
			<div class="premium-ad-content">
				<div class="ad-header">
					<div class="ad-image">
						<img src={ad.image} alt={ad.company} />
					</div>
					<div class="ad-company">
						<h4>{ad.company}</h4>
						{#if ad.rating}
							<div class="ad-rating">{ad.rating}</div>
						{/if}
						{#if ad.users}
							<div class="ad-users">{ad.users}</div>
						{/if}
					</div>
				</div>
				
				<div class="ad-body">
					<h3 class="ad-title">{ad.title}</h3>
					<p class="ad-description">{ad.description}</p>
					
					{#if ad.price}
						<div class="ad-price">{ad.price}</div>
					{/if}
					
					{#if ad.offer}
						<div class="ad-offer">{ad.offer}</div>
					{/if}
					
					{#if ad.certification}
						<div class="ad-certification">✓ {ad.certification}</div>
					{/if}
				</div>
				
				<button class="ad-cta">{ad.cta}</button>
			</div>
		</div>
	{/each}

	<!-- Google AdSense - Display Ads -->
	{#each displayAds as ad}
		<div class="ad-container display-ad">
			<div class="ad-label">Anuncio</div>
			<div class="display-ad-content">
				<div class="display-header">
					<h4 class="display-company">{ad.company}</h4>
				</div>
				<h3 class="display-title">{ad.title}</h3>
				<p class="display-description">{ad.description}</p>
				<button class="display-cta">{ad.cta}</button>
			</div>
		</div>
	{/each}

	<!-- Widget de partners premium -->
	<div class="widget premium-partners">
		<h3 class="widget-title">⭐ Partners Premium</h3>
		<div class="partners-grid">
			<div class="partner-badge">
				<div class="partner-logo">FitTech</div>
				<span>Sponsor Oficial</span>
			</div>
			<div class="partner-badge">
				<div class="partner-logo">NutriMax</div>
				<span>Partner Nutrición</span>
			</div>
			<div class="partner-badge">
				<div class="partner-logo">SportZone</div>
				<span>Equipamiento</span>
			</div>
		</div>
	</div>

	<!-- Banner promocional adicional -->
	<div class="promo-banner">
		<div class="promo-content">
			<h4>🎯 Oferta Especial</h4>
			<p>Descuento 20% en suplementos premium</p>
			<a href="/store" class="promo-button">Ver Ofertas</a>
		</div>
	</div>
</aside>

<style>
	.right-sidebar {
		width: 280px;
		padding: 1rem;
		display: flex;
		flex-direction: column;
		gap: 1.5rem;
		position: fixed;
		top: 100px;
		right: 20px;
		height: calc(100vh - 120px);
		overflow-y: auto;
		z-index: 10;
	}

	/* Scrollbar personalizada */
	.right-sidebar::-webkit-scrollbar {
		width: 6px;
	}

	.right-sidebar::-webkit-scrollbar-track {
		background: rgba(255, 255, 255, 0.1);
		border-radius: 3px;
	}

	.right-sidebar::-webkit-scrollbar-thumb {
		background: rgba(255, 255, 255, 0.3);
		border-radius: 3px;
	}

	.right-sidebar::-webkit-scrollbar-thumb:hover {
		background: rgba(255, 255, 255, 0.5);
	}

	/* Título del sidebar */
	.sidebar-header {
		background: rgba(255, 255, 255, 0.95);
		backdrop-filter: blur(10px);
		border-radius: 12px;
		padding: 1.5rem;
		box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
		border: 1px solid rgba(255, 255, 255, 0.2);
		text-align: center;
		margin-bottom: 1rem;
	}

	.sidebar-title {
		margin: 0;
		color: #333;
		font-size: 1.3rem;
		font-weight: 700;
		background: linear-gradient(135deg, #667eea, #764ba2);
		-webkit-background-clip: text;
		-webkit-text-fill-color: transparent;
		background-clip: text;
		text-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
	}

	.ad-container {
		background: rgba(255, 255, 255, 0.9);
		border-radius: 12px;
		padding: 1rem;
		box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
		border: 1px solid rgba(255, 255, 255, 0.2);
		position: relative;
		transition: transform 0.3s ease;
	}

	.ad-container:hover {
		transform: translateY(-2px);
		box-shadow: 0 6px 25px rgba(0, 0, 0, 0.15);
	}

	.ad-label {
		position: absolute;
		top: 8px;
		right: 8px;
		font-size: 0.65rem;
		color: #666;
		background: rgba(240, 240, 240, 0.9);
		padding: 2px 6px;
		border-radius: 3px;
		text-transform: uppercase;
		letter-spacing: 0.5px;
	}

	.ad-discount {
		position: absolute;
		top: 8px;
		left: 8px;
		background: #FF4757;
		color: white;
		font-size: 0.7rem;
		padding: 4px 8px;
		border-radius: 12px;
		font-weight: 600;
		text-transform: uppercase;
		z-index: 2;
	}

	/* Premium Ads */
	.premium-ad {
		border: 2px solid #667eea;
	}

	.premium-ad-content {
		padding-top: 1rem;
	}

	.ad-header {
		display: flex;
		align-items: center;
		gap: 0.75rem;
		margin-bottom: 1rem;
	}

	.ad-image {
		width: 40px;
		height: 40px;
		border-radius: 8px;
		overflow: hidden;
		background: linear-gradient(135deg, #667eea, #764ba2);
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.ad-image img {
		width: 24px;
		height: 24px;
		filter: brightness(0) invert(1);
	}

	.ad-company h4 {
		margin: 0 0 0.25rem 0;
		font-size: 0.8rem;
		color: #667eea;
		font-weight: 600;
	}

	.ad-rating {
		font-size: 0.7rem;
		color: #666;
		margin-bottom: 0.1rem;
	}

	.ad-users {
		font-size: 0.65rem;
		color: #999;
	}

	.ad-body {
		margin-bottom: 1rem;
	}

	.ad-title {
		margin: 0 0 0.5rem 0;
		font-size: 1rem;
		font-weight: 600;
		color: #333;
		line-height: 1.3;
	}

	.ad-description {
		margin: 0 0 0.75rem 0;
		font-size: 0.85rem;
		color: #555;
		line-height: 1.4;
	}

	.ad-price {
		font-size: 1.1rem;
		font-weight: 700;
		color: #667eea;
		margin-bottom: 0.5rem;
	}

	.ad-offer {
		background: #2ECC71;
		color: white;
		font-size: 0.75rem;
		padding: 4px 8px;
		border-radius: 4px;
		display: inline-block;
		margin-bottom: 0.5rem;
		font-weight: 600;
		text-transform: uppercase;
	}

	.ad-certification {
		font-size: 0.7rem;
		color: #27AE60;
		font-weight: 500;
	}

	.ad-cta {
		width: 100%;
		background: linear-gradient(135deg, #667eea, #764ba2);
		color: white;
		border: none;
		padding: 0.75rem;
		border-radius: 8px;
		font-size: 0.9rem;
		font-weight: 600;
		cursor: pointer;
		transition: all 0.3s ease;
		text-transform: uppercase;
		letter-spacing: 0.5px;
	}

	.ad-cta:hover {
		background: linear-gradient(135deg, #5a67d8, #6b46c1);
		transform: translateY(-1px);
	}

	/* Display Ads */
	.display-ad {
		border: 1px solid rgba(102, 126, 234, 0.3);
	}

	.display-ad-content {
		padding-top: 1rem;
	}

	.display-header {
		margin-bottom: 0.5rem;
	}

	.display-company {
		margin: 0;
		font-size: 0.75rem;
		color: #667eea;
		font-weight: 600;
		text-transform: uppercase;
		letter-spacing: 0.5px;
	}

	.display-title {
		margin: 0 0 0.5rem 0;
		font-size: 0.9rem;
		font-weight: 600;
		color: #333;
		line-height: 1.3;
	}

	.display-description {
		margin: 0 0 1rem 0;
		font-size: 0.8rem;
		color: #555;
		line-height: 1.4;
	}

	.display-cta {
		width: 100%;
		background: #667eea;
		color: white;
		border: none;
		padding: 0.6rem;
		border-radius: 6px;
		font-size: 0.8rem;
		font-weight: 600;
		cursor: pointer;
		transition: background 0.3s ease;
		text-transform: uppercase;
	}

	.display-cta:hover {
		background: #5a67d8;
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

	.partners-grid {
		display: flex;
		flex-direction: column;
		gap: 0.75rem;
	}

	.partner-badge {
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding: 0.75rem;
		background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
		border-radius: 8px;
		color: white;
		font-size: 0.8rem;
	}

	.partner-logo {
		font-weight: 600;
		font-size: 0.9rem;
	}

	.partner-badge span {
		opacity: 0.9;
		font-size: 0.7rem;
	}

	.promo-banner {
		background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%);
		border-radius: 12px;
		padding: 1.5rem;
		color: white;
		text-align: center;
	}

	.promo-content h4 {
		margin: 0 0 0.5rem 0;
		font-size: 1.1rem;
	}

	.promo-content p {
		margin: 0 0 1rem 0;
		font-size: 0.9rem;
		opacity: 0.9;
	}

	.promo-button {
		background: rgba(255, 255, 255, 0.2);
		color: white;
		padding: 0.5rem 1rem;
		border-radius: 6px;
		text-decoration: none;
		font-weight: 600;
		font-size: 0.8rem;
		transition: all 0.3s ease;
		display: inline-block;
		border: 1px solid rgba(255, 255, 255, 0.3);
	}

	.promo-button:hover {
		background: rgba(255, 255, 255, 0.3);
		transform: translateY(-1px);
	}

	/* Responsive */
	@media (max-width: 1440px) {
		.right-sidebar {
			width: 240px;
			right: 10px;
		}
	}

	@media (max-width: 1200px) {
		.right-sidebar {
			display: none;
		}
	}
</style>
