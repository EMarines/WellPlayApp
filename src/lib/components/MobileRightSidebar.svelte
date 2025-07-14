<script lang="ts">
	// Datos para espacios publicitarios y ofertas (versión móvil)
	const adSpaces = [
		{
			id: 1,
			type: "mobile-banner",
			size: "320x100",
			title: "Google AdSense"
		},
		{
			id: 2,
			type: "mobile-square",
			size: "200x200",
			title: "Publicidad"
		},
		{
			id: 3,
			type: "mobile-banner",
			size: "320x100",
			title: "Banner Premium"
		}
	];

	const partners = [
		{ name: "FitTech Pro", category: "Sponsor Oficial" },
		{ name: "NutriMax", category: "Nutrición" },
		{ name: "SportZone", category: "Equipamiento" },
		{ name: "HealthFirst", category: "Bienestar" }
	];

	const promoOffers = [
		{
			title: "Descuento 20%",
			description: "En suplementos premium",
			color: "#f093fb"
		},
		{
			title: "Envío Gratis",
			description: "En compras +$50",
			color: "#4facfe"
		},
		{
			title: "Pack Fitness",
			description: "3x2 en proteínas",
			color: "#667eea"
		}
	];
</script>

<div class="mobile-right-sidebar">
	<!-- Espacios publicitarios -->
	{#each adSpaces as adSpace}
		<div class="mobile-ad-card">
			<div class="ad-header">
				<span class="ad-label">Publicidad</span>
			</div>
			<div class="ad-content {adSpace.type}">
				<div class="ad-icon">📢</div>
				<p>{adSpace.title}</p>
				<span>{adSpace.size}</span>
			</div>
		</div>
	{/each}

	<!-- Partners Premium -->
	{#each partners as partner}
		<div class="mobile-partner-card">
			<div class="partner-logo">
				<span class="logo-text">{partner.name.slice(0, 2).toUpperCase()}</span>
			</div>
			<div class="partner-info">
				<h4>{partner.name}</h4>
				<p>{partner.category}</p>
			</div>
		</div>
	{/each}

	<!-- Ofertas promocionales -->
	{#each promoOffers as offer}
		<div class="mobile-promo-card" style="background: linear-gradient(135deg, {offer.color}30, {offer.color}60);">
			<div class="promo-content">
				<h4>{offer.title}</h4>
				<p>{offer.description}</p>
				<button class="promo-btn">Ver Más</button>
			</div>
		</div>
	{/each}
</div>

<style>
	.mobile-right-sidebar {
		display: flex;
		gap: 1rem;
		min-width: max-content;
	}

	.mobile-ad-card {
		min-width: 200px;
		max-width: 220px;
		background: white;
		border-radius: 12px;
		overflow: hidden;
		box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
		flex-shrink: 0;
	}

	.ad-header {
		background: #f8f9fa;
		padding: 0.5rem;
		text-align: center;
		border-bottom: 1px solid #e9ecef;
	}

	.ad-label {
		font-size: 0.7rem;
		color: #666;
		text-transform: uppercase;
		font-weight: 500;
	}

	.ad-content {
		padding: 1rem;
		text-align: center;
		color: #888;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
	}

	.ad-content.mobile-banner {
		height: 80px;
		background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
	}

	.ad-content.mobile-square {
		height: 120px;
		background: linear-gradient(135deg, #e0c3fc 0%, #9bb5ff 100%);
	}

	.ad-icon {
		font-size: 1.5rem;
		margin-bottom: 0.5rem;
	}

	.ad-content p {
		margin: 0 0 0.25rem 0;
		font-weight: 600;
		font-size: 0.9rem;
	}

	.ad-content span {
		font-size: 0.7rem;
		opacity: 0.7;
	}

	.mobile-partner-card {
		min-width: 140px;
		max-width: 160px;
		background: white;
		border-radius: 12px;
		padding: 1rem;
		box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
		display: flex;
		flex-direction: column;
		align-items: center;
		text-align: center;
		flex-shrink: 0;
	}

	.partner-logo {
		width: 50px;
		height: 50px;
		background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
		border-radius: 50%;
		display: flex;
		align-items: center;
		justify-content: center;
		margin-bottom: 0.5rem;
	}

	.logo-text {
		color: white;
		font-weight: 700;
		font-size: 0.8rem;
	}

	.partner-info h4 {
		margin: 0 0 0.25rem 0;
		font-size: 0.8rem;
		font-weight: 600;
		color: #333;
	}

	.partner-info p {
		margin: 0;
		font-size: 0.7rem;
		color: #666;
	}

	.mobile-promo-card {
		min-width: 160px;
		max-width: 180px;
		border-radius: 12px;
		padding: 1rem;
		color: white;
		box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
		text-align: center;
		flex-shrink: 0;
	}

	.promo-content h4 {
		margin: 0 0 0.5rem 0;
		font-size: 1rem;
		font-weight: 600;
	}

	.promo-content p {
		margin: 0 0 1rem 0;
		font-size: 0.8rem;
		opacity: 0.9;
	}

	.promo-btn {
		background: rgba(255, 255, 255, 0.2);
		color: white;
		border: 1px solid rgba(255, 255, 255, 0.3);
		padding: 0.5rem 1rem;
		border-radius: 6px;
		font-size: 0.7rem;
		font-weight: 600;
		cursor: pointer;
		transition: all 0.3s ease;
	}

	.promo-btn:hover {
		background: rgba(255, 255, 255, 0.3);
		transform: translateY(-1px);
	}
</style>
