<script lang="ts">
	// Datos de ejemplo para anuncios y widgets
	const adBanners = [
		{
			id: 1,
			title: "Suplementos Premium",
			image: "/logo.png", // Usando logo como placeholder
			link: "/store",
			size: "300x250"
		},
		{
			id: 2,
			title: "Equipos de Fitness",
			image: "/logo.png", // Usando logo como placeholder
			link: "/store",
			size: "300x250"
		}
	];

	const tipOfDay = "💡 Bebe al menos 8 vasos de agua al día para mantener tu cuerpo hidratado y mejorar tu rendimiento.";
</script>

<aside class="sidebar">
	<!-- Espacio para Google AdSense -->
	<div class="ad-container google-ads">
		<div class="ad-label">Publicidad</div>
		<div class="ad-placeholder large">
			<div class="ad-content">
				<p>Google AdSense</p>
				<span>300 x 250</span>
			</div>
		</div>
	</div>

	<!-- Tip del día -->
	<div class="widget tip-widget">
		<h3 class="widget-title">💡 Tip del Día</h3>
		<p class="tip-content">{tipOfDay}</p>
	</div>

	<!-- Banners de afiliados -->
	<div class="affiliate-section">
		<h3 class="section-title">Productos Recomendados</h3>
		{#each adBanners as banner}
			<div class="affiliate-banner">
				<a href={banner.link} target="_blank" rel="noopener">
					<div class="banner-placeholder">
						<div class="banner-content">
							<p>{banner.title}</p>
							<span>{banner.size}</span>
						</div>
					</div>
				</a>
			</div>
		{/each}
	</div>

	<!-- Segundo espacio para Google AdSense -->
	<div class="ad-container google-ads">
		<div class="ad-label">Publicidad</div>
		<div class="ad-placeholder skyscraper">
			<div class="ad-content">
				<p>Google AdSense</p>
				<span>300 x 600</span>
			</div>
		</div>
	</div>

	<!-- Widget de enlaces patrocinados -->
	<div class="widget sponsored-links">
		<h3 class="widget-title">🔗 Enlaces Patrocinados</h3>
		<ul class="sponsored-list">
			<li><a href="/retos" rel="sponsored">Rutinas de Entrenamiento Premium</a></li>
			<li><a href="/store" rel="sponsored">Planes Nutricionales Personalizados</a></li>
			<li><a href="/store" rel="sponsored">Equipos de Fitness en Oferta</a></li>
			<li><a href="/store" rel="sponsored">Suplementos Certificados</a></li>
		</ul>
	</div>
</aside>

<style>
	.sidebar {
		width: 320px;
		padding: 1rem;
		display: flex;
		flex-direction: column;
		gap: 1.5rem;
		position: sticky;
		top: 120px;
		height: fit-content;
		max-height: calc(100vh - 140px);
		overflow-y: auto;
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
	}

	.ad-placeholder.large {
		width: 300px;
		height: 250px;
		margin: 0 auto;
	}

	.ad-placeholder.skyscraper {
		width: 300px;
		height: 600px;
		margin: 0 auto;
	}

	.ad-content {
		text-align: center;
		color: #888;
	}

	.ad-content p {
		margin: 0;
		font-weight: 600;
		font-size: 1rem;
	}

	.ad-content span {
		font-size: 0.8rem;
		opacity: 0.7;
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

	.section-title {
		margin: 0 0 1rem 0;
		color: #333;
		font-size: 1rem;
		font-weight: 600;
	}

	.tip-content {
		margin: 0;
		color: #555;
		line-height: 1.5;
		font-style: italic;
	}

	.affiliate-section {
		background: rgba(255, 255, 255, 0.95);
		backdrop-filter: blur(10px);
		border-radius: 12px;
		padding: 1.5rem;
		box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
		border: 1px solid rgba(255, 255, 255, 0.2);
	}

	.affiliate-banner {
		margin-bottom: 1rem;
	}

	.affiliate-banner:last-child {
		margin-bottom: 0;
	}

	.affiliate-banner a {
		text-decoration: none;
		display: block;
	}

	.banner-placeholder {
		background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
		border-radius: 8px;
		height: 120px;
		display: flex;
		align-items: center;
		justify-content: center;
		transition: transform 0.3s ease;
		color: white;
	}

	.banner-placeholder:hover {
		transform: translateY(-2px);
	}

	.banner-content {
		text-align: center;
	}

	.banner-content p {
		margin: 0;
		font-weight: 600;
		font-size: 0.9rem;
	}

	.banner-content span {
		font-size: 0.7rem;
		opacity: 0.8;
	}

	.sponsored-list {
		list-style: none;
		padding: 0;
		margin: 0;
	}

	.sponsored-list li {
		margin-bottom: 0.75rem;
	}

	.sponsored-list li:last-child {
		margin-bottom: 0;
	}

	.sponsored-list a {
		color: #667eea;
		text-decoration: none;
		font-size: 0.9rem;
		display: block;
		padding: 0.5rem;
		border-radius: 6px;
		transition: all 0.3s ease;
	}

	.sponsored-list a:hover {
		background: rgba(102, 126, 234, 0.1);
		transform: translateX(4px);
	}

	/* Responsive */
	@media (max-width: 1024px) {
		.sidebar {
			width: 280px;
		}

		.ad-placeholder.large {
			width: 250px;
			height: 200px;
		}

		.ad-placeholder.skyscraper {
			width: 250px;
			height: 400px;
		}
	}

	@media (max-width: 768px) {
		.sidebar {
			width: 100%;
			position: static;
			max-height: none;
			margin-top: 2rem;
		}

		.ad-placeholder.skyscraper {
			width: 300px;
			height: 250px;
		}
	}
</style>
