<script lang="ts">
	import { onMount } from 'svelte';
	import { features, type Feature } from '$lib/data/features';
	
	let currentIndex = 0;
	let intervalId: number;
	let carouselElement: HTMLElement;
	let isDragging = false;
	let startX = 0;
	let currentX = 0;
	let translateX = 0;
	let containerWidth = 0;
	let cardWidth = 320;
	let gap = 20;
	
	$: currentFeature = features[currentIndex];
	$: centerOffset = containerWidth ? (containerWidth / 2) - (cardWidth / 2) : 0;
	
	onMount(() => {
		// Actualizar anchos según el tamaño de pantalla
		updateResponsiveValues();
		
		// Cambiar tarjeta cada 5 segundos
		startAutoSlide();
		
		// Escuchar cambios de tamaño de ventana
		const handleResize = () => {
			updateResponsiveValues();
		};
		window.addEventListener('resize', handleResize);
		
		// Limpiar intervalo cuando el componente se destruye
		return () => {
			if (intervalId) {
				clearInterval(intervalId);
			}
			window.removeEventListener('resize', handleResize);
		};
	});
	
	function updateResponsiveValues() {
		const width = window.innerWidth;
		if (width <= 480) {
			cardWidth = 260;
			gap = 10;
		} else if (width <= 768) {
			cardWidth = 280;
			gap = 15;
		} else {
			cardWidth = 320;
			gap = 20;
		}
	}
	
	function startAutoSlide() {
		intervalId = setInterval(() => {
			if (!isDragging) {
				currentIndex = (currentIndex + 1) % features.length;
			}
		}, 5000);
	}
	
	function goToFeature(index: number) {
		currentIndex = index;
		// Reiniciar el intervalo cuando se hace click manual
		clearInterval(intervalId);
		startAutoSlide();
	}
	
	// Soporte para gestos táctiles
	function handleTouchStart(e: TouchEvent) {
		isDragging = true;
		startX = e.touches[0].clientX;
		clearInterval(intervalId);
	}
	
	function handleTouchMove(e: TouchEvent) {
		if (!isDragging) return;
		currentX = e.touches[0].clientX;
		const diffX = currentX - startX;
		translateX = diffX;
	}
	
	function handleTouchEnd() {
		if (!isDragging) return;
		isDragging = false;
		
		const threshold = 50; // Mínimo deslizamiento para cambiar
		
		if (Math.abs(translateX) > threshold) {
			if (translateX > 0) {
				// Deslizar hacia la derecha (anterior)
				currentIndex = currentIndex === 0 ? features.length - 1 : currentIndex - 1;
			} else {
				// Deslizar hacia la izquierda (siguiente)
				currentIndex = (currentIndex + 1) % features.length;
			}
		}
		
		translateX = 0;
		startAutoSlide();
	}
	
	// Soporte para mouse
	function handleMouseDown(e: MouseEvent) {
		isDragging = true;
		startX = e.clientX;
		clearInterval(intervalId);
	}
	
	function handleMouseMove(e: MouseEvent) {
		if (!isDragging) return;
		currentX = e.clientX;
		const diffX = currentX - startX;
		translateX = diffX;
	}
	
	function handleMouseUp() {
		if (!isDragging) return;
		isDragging = false;
		
		const threshold = 50;
		
		if (Math.abs(translateX) > threshold) {
			if (translateX > 0) {
				currentIndex = currentIndex === 0 ? features.length - 1 : currentIndex - 1;
			} else {
				currentIndex = (currentIndex + 1) % features.length;
			}
		}
		
		translateX = 0;
		startAutoSlide();
	}
</script>

<div class="feature-carousel" 
	 bind:this={carouselElement}
	 bind:clientWidth={containerWidth}
	 on:touchstart={handleTouchStart}
	 on:touchmove={handleTouchMove}
	 on:touchend={handleTouchEnd}
	 on:mousedown={handleMouseDown}
	 on:mousemove={handleMouseMove}
	 on:mouseup={handleMouseUp}
	 on:mouseleave={handleMouseUp}
>
	<!-- Contenedor de todas las tarjetas -->
	<div 
		class="carousel-track" 
		style="transform: translateX(calc(-{currentIndex * (cardWidth + gap)}px + {centerOffset}px + {isDragging ? translateX : 0}px))"
	>
		{#each features as feature, index}
			<div 
				class="feature-slide"
				class:active={index === currentIndex}
				class:side-card={Math.abs(index - currentIndex) === 1}
				style="width: {cardWidth}px; min-width: {cardWidth}px; max-width: {cardWidth}px;"
			>
				<a href={feature.href} class="feature-card-link">
					<div 
						class="feature-card-animated" 
						style="--card-color: {feature.color}"
					>
						<div class="feature-image">
							<img 
								src={feature.image} 
								alt={feature.title}
								class="card-image"
								draggable="false"
							/>
							<div class="emoji-overlay">
								{feature.emoji}
							</div>
						</div>
						
						<div class="feature-content">
							<h3 class="feature-title-carousel">
								{feature.title}
							</h3>
							<p class="feature-description-carousel">
								{feature.description}
							</p>
						</div>
					</div>
				</a>
			</div>
		{/each}
	</div>
	
	<!-- Indicadores -->
	<div class="carousel-indicators">
		{#each features as _, index}
			<button 
				class="indicator"
				class:active={index === currentIndex}
				on:click={() => goToFeature(index)}
				aria-label="Ir a {features[index].title}"
			>
			</button>
		{/each}
	</div>
</div>

<style>
	.feature-carousel {
		width: 100%;
		max-width: 500px; /* Reducido para que quepa el sidebar */
		margin: 0 auto;
		position: relative;
		overflow: hidden;
		cursor: grab;
		user-select: none;
		-webkit-user-select: none;
		-moz-user-select: none;
		-ms-user-select: none;
		padding: 0 20px;
	}

	.feature-carousel:active {
		cursor: grabbing;
	}

	.carousel-track {
		display: flex;
		transition: transform 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94);
		will-change: transform;
		gap: 20px; /* Espacio entre tarjetas */
		padding: 20px 0; /* Padding vertical para sombras */
		align-items: center;
	}

	.carousel-track.dragging {
		transition: none;
	}

	.feature-slide {
		height: 280px;
		flex-shrink: 0;
		flex-grow: 0;
		transition: all 0.5s ease;
		opacity: 0.15; /* Muy opacas las lejanas */
		transform: scale(0.8); /* Más pequeñas las lejanas */
		box-sizing: border-box;
	}

	.feature-slide.active {
		opacity: 1;
		transform: scale(1.1); /* Más grande la tarjeta activa */
		z-index: 2;
	}

	.feature-slide.side-card {
		opacity: 0.4; /* Bastante opacas las laterales */
		transform: scale(0.88); /* Notablemente más pequeñas las laterales */
	}

	.feature-card-link {
		text-decoration: none;
		color: inherit;
		display: block;
		height: 100%;
		pointer-events: none; /* Evita que interfiera con el drag */
	}

	.feature-card-animated {
		height: 100%;
		background: linear-gradient(135deg, var(--card-color), rgba(255, 255, 255, 0.9));
		backdrop-filter: blur(10px);
		border: 1px solid rgba(255, 255, 255, 0.2);
		border-radius: 16px;
		overflow: hidden;
		transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
		position: relative;
		cursor: pointer;
		pointer-events: auto;
		box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
		transform-origin: center center; /* Asegurar transformación centrada */
	}

	.feature-card-animated:hover {
		transform: translateY(-4px) scale(1.02);
		box-shadow: 0 16px 48px rgba(0, 0, 0, 0.15);
	}

	.feature-image {
		height: 60%;
		position: relative;
		overflow: hidden;
	}

	.card-image {
		width: 100%;
		height: 100%;
		object-fit: cover;
		transition: transform 0.5s ease;
		user-select: none;
		-webkit-user-drag: none;
		-khtml-user-drag: none;
		-moz-user-drag: none;
		-o-user-drag: none;
		pointer-events: none;
	}

	.feature-card-animated:hover .card-image {
		transform: scale(1.1);
	}

	.emoji-overlay {
		position: absolute;
		top: 12px;
		right: 12px;
		font-size: 2rem;
		background: rgba(255, 255, 255, 0.9);
		backdrop-filter: blur(8px);
		border-radius: 12px;
		padding: 8px;
		box-shadow: 0 4px 16px rgba(0, 0, 0, 0.1);
	}

	.feature-content {
		height: 40%;
		padding: 16px 20px;
		display: flex;
		flex-direction: column;
		justify-content: center;
		background: rgba(255, 255, 255, 0.95);
		backdrop-filter: blur(10px);
	}

	.feature-title-carousel {
		font-size: 1.4rem;
		font-weight: 700;
		margin: 0 0 8px 0;
		color: #333;
		text-align: center;
	}

	.feature-description-carousel {
		font-size: 0.9rem;
		margin: 0;
		color: #666;
		text-align: center;
		line-height: 1.4;
		opacity: 0.9;
	}

	.carousel-indicators {
		display: flex;
		justify-content: center;
		gap: 8px;
		margin-top: 16px;
	}

	.indicator {
		width: 12px;
		height: 12px;
		border-radius: 50%;
		border: none;
		background: rgba(255, 255, 255, 0.4);
		cursor: pointer;
		transition: all 0.3s ease;
	}

	.indicator.active {
		background: rgba(255, 255, 255, 0.9);
		transform: scale(1.2);
	}

	.indicator:hover {
		background: rgba(255, 255, 255, 0.7);
		transform: scale(1.1);
	}

	/* Responsive */
	@media (max-width: 768px) {
		.feature-carousel {
			max-width: 400px; /* Más controlado en tablet */
			padding: 0 15px;
		}

		.feature-slide {
			height: 240px;
			opacity: 0.1; /* Muy opacas en tablet */
		}

		.feature-slide.active {
			opacity: 1;
			transform: scale(1.08); /* Ligeramente menos grande en tablet */
		}

		.carousel-track {
			gap: 15px;
		}

		.feature-slide.side-card {
			opacity: 0.3; /* Bastante opacas en tablet */
		}
		
		.feature-title-carousel {
			font-size: 1.2rem;
		}
		
		.feature-description-carousel {
			font-size: 0.8rem;
		}
	}

	@media (max-width: 480px) {
		.feature-carousel {
			max-width: 350px; /* Más controlado en móvil */
			padding: 0 10px;
		}

		.feature-slide {
			height: 220px;
			opacity: 0.05; /* Casi invisibles en móvil */
		}

		.feature-slide.active {
			opacity: 1;
			transform: scale(1.05); /* Menos grande en móvil */
		}

		.carousel-track {
			gap: 10px;
		}

		.feature-slide.side-card {
			opacity: 0.2; /* Muy opacas en móvil */
		}
	}
</style>
