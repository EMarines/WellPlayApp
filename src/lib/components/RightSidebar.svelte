<script lang="ts">
	// Datos para espacios publicitarios de Google AdSense
	const adSpaces = [
		{
			id: 1,
			type: "rectangle",
			size: "300x250",
			position: "top"
		},
		{
			id: 2,
			type: "skyscraper",
			size: "300x600",
			position: "middle"
		},
		{
			id: 3,
			type: "square",
			size: "250x250",
			position: "bottom"
		}
	];
</script>

<aside class="right-sidebar">
	<!-- Espacios para Google AdSense -->
	{#each adSpaces as adSpace}
		<div class="ad-container" data-ad-type={adSpace.type}>
			<div class="ad-label">Publicidad</div>
			<div class="ad-placeholder {adSpace.type}" data-size={adSpace.size}>
				<div class="ad-content">
					<div class="ad-icon">📢</div>
					<p>Google AdSense</p>
					<span>{adSpace.size}</span>
					<div class="ad-placeholder-text">
						Espacio publicitario disponible
					</div>
				</div>
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

	.ad-container {
		background: rgba(255, 255, 255, 0.9);
		border-radius: 12px;
		padding: 1rem;
		box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
		border: 1px solid rgba(255, 255, 255, 0.2);
	}

	.ad-label {
		font-size: 0.75rem;
		color: #666;
		text-transform: uppercase;
		margin-bottom: 0.5rem;
		text-align: center;
		font-weight: 500;
	}

	.ad-placeholder {
		background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
		border: 2px dashed #ccc;
		border-radius: 8px;
		display: flex;
		align-items: center;
		justify-content: center;
		position: relative;
		overflow: hidden;
		margin: 0 auto;
		transition: all 0.3s ease;
	}

	.ad-placeholder:hover {
		border-color: #667eea;
		background: linear-gradient(135deg, #667eea20 0%, #764ba220 100%);
	}

	.ad-placeholder.rectangle {
		width: 250px;
		height: 200px;
	}

	.ad-placeholder.skyscraper {
		width: 250px;
		height: 400px;
	}

	.ad-placeholder.square {
		width: 200px;
		height: 200px;
	}

	.ad-content {
		text-align: center;
		color: #888;
		padding: 1rem;
	}

	.ad-icon {
		font-size: 2rem;
		margin-bottom: 0.5rem;
	}

	.ad-content p {
		margin: 0 0 0.25rem 0;
		font-weight: 600;
		font-size: 1rem;
	}

	.ad-content span {
		font-size: 0.8rem;
		opacity: 0.7;
		display: block;
		margin-bottom: 0.5rem;
	}

	.ad-placeholder-text {
		font-size: 0.7rem;
		opacity: 0.6;
		font-style: italic;
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

		.ad-placeholder.rectangle {
			width: 200px;
			height: 160px;
		}

		.ad-placeholder.skyscraper {
			width: 200px;
			height: 320px;
		}

		.ad-placeholder.square {
			width: 180px;
			height: 180px;
		}
	}

	@media (max-width: 1200px) {
		.right-sidebar {
			display: none;
		}
	}
</style>
