<script lang="ts">
	import { onMount } from 'svelte';
	
	// Datos de sponsors/patrocinadores
	const sponsors = [
		{ id: 1, name: "FitTech Pro", logo: "/logo.png" },
		{ id: 2, name: "NutriMax", logo: "/logo.png" },
		{ id: 3, name: "PowerGym", logo: "/logo.png" },
		{ id: 4, name: "VitalSupps", logo: "/logo.png" },
		{ id: 5, name: "HealthFirst", logo: "/logo.png" },
		{ id: 6, name: "SportZone", logo: "/logo.png" }
	];

	let currentSponsorIndex = 0;
	let intervalId: number;

	onMount(() => {
		// Rotar sponsors cada 3 segundos
		intervalId = setInterval(() => {
			currentSponsorIndex = (currentSponsorIndex + 1) % sponsors.length;
		}, 3000);

		return () => {
			if (intervalId) {
				clearInterval(intervalId);
			}
		};
	});
</script>

<footer class="sponsors-footer">
	<div class="footer-container">
		<!-- Banner principal de patrocinio -->
		<div class="main-sponsor-banner">
			<div class="banner-placeholder horizontal">
				<div class="banner-content">
					<p>Banner Principal de Patrocinios</p>
					<span>728 x 90</span>
				</div>
			</div>
		</div>

		<!-- Carrusel de logos de sponsors -->
		<div class="sponsors-section">
			<h3 class="sponsors-title">Nuestros Patrocinadores</h3>
			
			<div class="sponsors-carousel">
				<div class="sponsors-track">
					{#each sponsors as sponsor, index}
						<div 
							class="sponsor-logo"
							class:active={index === currentSponsorIndex}
						>
							<div class="logo-placeholder">
								<span>{sponsor.name}</span>
							</div>
						</div>
					{/each}
				</div>
			</div>
		</div>

		<!-- Links de partners -->
		<div class="partners-links">
			<div class="partner-category">
				<h4>Fitness & Entrenamiento</h4>
				<ul>
					<li><a href="#">Rutinas Premium</a></li>
					<li><a href="#">Entrenadores Certificados</a></li>
					<li><a href="#">Equipos Deportivos</a></li>
				</ul>
			</div>
			
			<div class="partner-category">
				<h4>Nutrición & Suplementos</h4>
				<ul>
					<li><a href="#">Planes Nutricionales</a></li>
					<li><a href="#">Suplementos Naturales</a></li>
					<li><a href="#">Consultoría Nutricional</a></li>
				</ul>
			</div>
			
			<div class="partner-category">
				<h4>Bienestar & Salud</h4>
				<ul>
					<li><a href="#">Chequeos Médicos</a></li>
					<li><a href="#">Terapias Alternativas</a></li>
					<li><a href="#">Programas de Bienestar</a></li>
				</ul>
			</div>
		</div>

		<!-- Copyright y disclaimer -->
		<div class="footer-bottom">
			<p class="copyright">© 2025 WellPlay. Todos los derechos reservados.</p>
			<p class="disclaimer">Los enlaces patrocinados pueden generar comisiones de afiliado.</p>
		</div>
	</div>
</footer>

<style>
	.sponsors-footer {
		background: rgba(255, 255, 255, 0.1);
		backdrop-filter: blur(10px);
		color: white;
		margin-top: 3rem;
		border-top: 1px solid rgba(255, 255, 255, 0.2);
		box-shadow: 0 -4px 20px rgba(0, 0, 0, 0.1);
	}

	.footer-container {
		max-width: 1200px;
		margin: 0 auto;
		padding: 2rem 1rem;
	}

	.main-sponsor-banner {
		margin-bottom: 2rem;
		display: flex;
		justify-content: center;
	}

	.banner-placeholder.horizontal {
		background: rgba(255, 255, 255, 0.1);
		border: 2px dashed rgba(255, 255, 255, 0.3);
		border-radius: 8px;
		width: 728px;
		height: 90px;
		max-width: 100%;
		display: flex;
		align-items: center;
		justify-content: center;
		transition: all 0.3s ease;
	}

	.banner-placeholder.horizontal:hover {
		background: rgba(255, 255, 255, 0.15);
		transform: translateY(-2px);
	}

	.banner-content {
		text-align: center;
		color: rgba(255, 255, 255, 0.8);
	}

	.banner-content p {
		margin: 0;
		font-weight: 600;
		font-size: 1rem;
	}

	.banner-content span {
		font-size: 0.8rem;
		opacity: 0.7;
	}

	.sponsors-section {
		margin-bottom: 2rem;
		text-align: center;
	}

	.sponsors-title {
		margin: 0 0 1.5rem 0;
		font-size: 1.3rem;
		font-weight: 600;
		color: white;
	}

	.sponsors-carousel {
		overflow: hidden;
		border-radius: 12px;
		background: rgba(255, 255, 255, 0.1);
		padding: 1rem;
		border: 1px solid rgba(255, 255, 255, 0.2);
	}

	.sponsors-track {
		display: flex;
		gap: 1rem;
		justify-content: center;
		align-items: center;
		flex-wrap: wrap;
	}

	.sponsor-logo {
		transition: all 0.3s ease;
		opacity: 0.6;
		transform: scale(0.9);
	}

	.sponsor-logo.active {
		opacity: 1;
		transform: scale(1.1);
	}

	.logo-placeholder {
		background: rgba(102, 126, 234, 0.9);
		color: white;
		border-radius: 8px;
		padding: 1rem 1.5rem;
		font-weight: 600;
		font-size: 0.9rem;
		box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
		transition: all 0.3s ease;
	}

	.sponsor-logo:hover .logo-placeholder {
		background: var(--primary-color);
		transform: translateY(-2px);
		box-shadow: 0 6px 25px rgba(0, 0, 0, 0.15);
	}

	.partners-links {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
		gap: 2rem;
		margin-bottom: 2rem;
	}

	.partner-category h4 {
		margin: 0 0 1rem 0;
		font-size: 1.1rem;
		font-weight: 600;
		color: white;
		border-bottom: 2px solid rgba(255, 255, 255, 0.3);
		padding-bottom: 0.5rem;
	}

	.partner-category ul {
		list-style: none;
		padding: 0;
		margin: 0;
	}

	.partner-category li {
		margin-bottom: 0.5rem;
	}

	.partner-category a {
		color: rgba(255, 255, 255, 0.8);
		text-decoration: none;
		font-size: 0.9rem;
		transition: all 0.3s ease;
		display: inline-block;
	}

	.partner-category a:hover {
		color: white;
		transform: translateX(4px);
		text-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
	}

	.footer-bottom {
		border-top: 1px solid rgba(255, 255, 255, 0.2);
		padding-top: 1.5rem;
		text-align: center;
	}

	.copyright {
		margin: 0 0 0.5rem 0;
		font-size: 0.9rem;
		color: rgba(255, 255, 255, 0.8);
	}

	.disclaimer {
		margin: 0;
		font-size: 0.8rem;
		color: rgba(255, 255, 255, 0.6);
		font-style: italic;
	}

	/* Responsive */
	@media (max-width: 768px) {
		.footer-container {
			padding: 1.5rem 1rem;
		}

		.banner-placeholder.horizontal {
			width: 100%;
			height: 80px;
		}

		.sponsors-track {
			flex-direction: column;
			gap: 0.5rem;
		}

		.sponsor-logo {
			opacity: 0.8;
			transform: scale(1);
		}

		.sponsor-logo.active {
			transform: scale(1.05);
		}

		.partners-links {
			grid-template-columns: 1fr;
			gap: 1.5rem;
		}
	}
</style>
