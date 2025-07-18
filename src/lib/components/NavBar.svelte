<script lang="ts">
	import { page } from '$app/stores';
	import { browser } from '$app/environment';
	import { onMount } from 'svelte';
	
	let name = 'WellPlay';
	let isMobileMenuOpen = false;

	function toggleMobileMenu() {
		isMobileMenuOpen = !isMobileMenuOpen;
	}

	function closeMobileMenu() {
		isMobileMenuOpen = false;
	}

	// Cerrar menú al hacer clic fuera
	onMount(() => {
		const handleClickOutside = (event: MouseEvent) => {
			const target = event.target as Element;
			if (isMobileMenuOpen && !target.closest('.mobile-menu') && !target.closest('.mobile-menu-btn')) {
				closeMobileMenu();
			}
		};

		document.addEventListener('click', handleClickOutside);
		
		return () => {
			document.removeEventListener('click', handleClickOutside);
		};
	});

	// Prevenir scroll cuando el menú está abierto
	$: if (browser) {
		if (isMobileMenuOpen) {
			document.body.style.overflow = 'hidden';
		} else {
			document.body.style.overflow = '';
		}
	}
</script>

<nav class="navbar">
	<div class="navbar-container">
		<!-- Logo a la izquierda -->
		<div class="navbar-brand">
			<a href="/" class="logo-link">
				<img src="/logo.png" alt="WellPlay" class="logo-img" />
			</a>
		</div>

		<!-- Menú de navegación a la derecha -->
		<div class="navbar-menu">
			<ul class="navbar-nav">
				<li class="nav-item">
					<a href="/" class="nav-link" class:active={browser && $page?.url?.pathname === '/'}>Home</a>
				</li>
				<li class="nav-item">
					<a href="/retos" class="nav-link" class:active={browser && $page?.url?.pathname === '/retos'}>Retos</a>
				</li>
				<li class="nav-item">
					<a href="/blog" class="nav-link" class:active={browser && $page?.url?.pathname === '/blog'}>Blog</a>
				</li>
				<li class="nav-item">
					<a href="/store" class="nav-link" class:active={browser && $page?.url?.pathname === '/store'}>Store</a>
				</li>
				<li class="nav-item">
					<a href="/chat" class="nav-link" class:active={browser && $page?.url?.pathname === '/chat'}>Chat</a>
				</li>
				<li class="nav-item">
					<a href="/about" class="nav-link" class:active={browser && $page?.url?.pathname === '/about'}>About</a>
				</li>
				<li class="nav-item profile">
					<div class="profile-avatar">
						<img src="/profile-placeholder.svg" alt="Perfil" class="avatar-img" />
					</div>
				</li>
			</ul>
		</div>

		<!-- Botón de menú móvil -->
		<button 
			class="mobile-menu-btn" 
			class:active={isMobileMenuOpen}
			on:click={toggleMobileMenu}
			aria-label="Toggle menu"
		>
			<span class="hamburger-line"></span>
			<span class="hamburger-line"></span>
			<span class="hamburger-line"></span>
		</button>
	</div>

	<!-- Overlay para el menú móvil -->
	{#if isMobileMenuOpen}
		<button 
			class="mobile-overlay" 
			on:click={closeMobileMenu} 
			on:keydown={(e) => e.key === 'Escape' && closeMobileMenu()}
			aria-label="Close menu"
			tabindex="0"
		></button>
	{/if}

	<!-- Menú móvil -->
	<div class="mobile-menu" class:open={isMobileMenuOpen}>
		<div class="mobile-menu-content">
			<ul class="mobile-nav">
				<li class="mobile-nav-item">
					<a 
						href="/" 
						class="mobile-nav-link" 
						class:active={browser && $page?.url?.pathname === '/'}
						on:click={closeMobileMenu}
					>
						🏠 Home
					</a>
				</li>
				<li class="mobile-nav-item">
					<a 
						href="/retos" 
						class="mobile-nav-link" 
						class:active={browser && $page?.url?.pathname === '/retos'}
						on:click={closeMobileMenu}
					>
						🏆 Retos
					</a>
				</li>
				<li class="mobile-nav-item">
					<a 
						href="/blog" 
						class="mobile-nav-link" 
						class:active={browser && $page?.url?.pathname === '/blog'}
						on:click={closeMobileMenu}
					>
						📝 Blog
					</a>
				</li>
				<li class="mobile-nav-item">
					<a 
						href="/store" 
						class="mobile-nav-link" 
						class:active={browser && $page?.url?.pathname === '/store'}
						on:click={closeMobileMenu}
					>
						🛍️ Store
					</a>
				</li>
				<li class="mobile-nav-item">
					<a 
						href="/chat" 
						class="mobile-nav-link" 
						class:active={browser && $page?.url?.pathname === '/chat'}
						on:click={closeMobileMenu}
					>
						💬 Chat
					</a>
				</li>
				<li class="mobile-nav-item">
					<a 
						href="/about" 
						class="mobile-nav-link" 
						class:active={browser && $page?.url?.pathname === '/about'}
						on:click={closeMobileMenu}
					>
						ℹ️ About
					</a>
				</li>
				<li class="mobile-nav-item profile-mobile">
					<div class="mobile-profile">
						<img src="/profile-placeholder.svg" alt="Perfil" class="mobile-avatar" />
						<span>Mi Perfil</span>
					</div>
				</li>
			</ul>
		</div>
	</div>
</nav>

<style>
	.navbar {
		position: fixed;
		top: 0;
		left: 0;
		right: 0;
		width: 100%;
		background: rgba(255, 255, 255, 0.95);
		backdrop-filter: blur(10px);
		-webkit-backdrop-filter: blur(10px);
		box-shadow: 0 2px 20px rgba(0, 0, 0, 0.1);
		z-index: 1000;
		padding: 0;
	}

	.navbar-container {
		max-width: 1200px;
		margin: 0 auto;
		padding: 0 1rem;
		display: flex;
		justify-content: space-between;
		align-items: center;
		height: 100px;
	}

	.navbar-brand {
		display: flex;
		align-items: center;
		margin: 0;
		padding: 0;
		height: 100%;
	}

	.logo-link {
		text-decoration: none;
		display: flex;
		align-items: center;
		transition: all 0.3s ease;
		margin: 0;
		padding: 0;
		height: 100%;
		line-height: 0;
	}

	.logo-img {
		height: 50px; /* Reducido significativamente por el logo más grande */
		width: auto;
		transition: transform 0.3s ease;
		margin: 0;
		padding: 0;
		display: block;
		transform: scale(1);
	}

	.logo-link:hover .logo-img {
		transform: scale(1.05); /* Efecto hover más sutil */
	}

	.navbar-menu {
		display: flex;
		align-items: center;
		height: 100%;
	}

	.navbar-nav {
		display: flex;
		list-style: none;
		margin: 0;
		padding: 0;
		align-items: center;
		gap: 0.5rem;
		height: 100%;
	}

	.nav-item {
		margin: 0;
		height: 100%;
		display: flex;
		align-items: center;
	}

	.nav-link {
		display: block;
		padding: 0.75rem 1rem;
		color: #333;
		text-decoration: none;
		font-weight: 500;
		border-radius: 8px;
		transition: all 0.3s ease;
		position: relative;
	}

	.nav-link:hover {
		color: #667eea;
		background: rgba(102, 126, 234, 0.1);
		transform: translateY(-1px);
	}

	.nav-link.active {
		color: #667eea;
		background: linear-gradient(135deg, rgba(102, 126, 234, 0.1), rgba(118, 75, 162, 0.1));
		border-bottom: 2px solid #667eea;
	}

	.profile {
		margin-left: 1rem;
	}

	.profile-avatar {
		width: 40px;
		height: 40px;
		border-radius: 50%;
		overflow: hidden;
		border: 2px solid #667eea;
		cursor: pointer;
		transition: all 0.3s ease;
	}

	.profile-avatar:hover {
		transform: scale(1.1);
		box-shadow: 0 4px 15px rgba(102, 126, 234, 0.3);
	}

	.avatar-img {
		width: 100%;
		height: 100%;
		object-fit: cover;
		background: linear-gradient(135deg, #667eea, #764ba2);
	}

	.mobile-menu-btn {
		display: none;
		background: none;
		border: none;
		padding: 0.5rem;
		cursor: pointer;
		flex-direction: column;
		gap: 4px;
		width: 30px;
		height: 30px;
		z-index: 1001;
		position: relative;
	}

	.hamburger-line {
		width: 25px;
		height: 3px;
		background: #333;
		transition: all 0.3s ease;
		display: block;
		transform-origin: center;
	}

	/* Animación del hamburger cuando está activo */
	.mobile-menu-btn.active .hamburger-line:nth-child(1) {
		transform: rotate(45deg) translate(5px, 5px);
	}

	.mobile-menu-btn.active .hamburger-line:nth-child(2) {
		opacity: 0;
	}

	.mobile-menu-btn.active .hamburger-line:nth-child(3) {
		transform: rotate(-45deg) translate(5px, -5px);
	}
	
	/* Overlay para el menú móvil */
	.mobile-overlay {
		position: fixed;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		background: rgba(0, 0, 0, 0.3);
		z-index: 998;
		animation: fadeIn 0.3s ease;
		border: none;
		cursor: pointer;
		appearance: none;
		-webkit-appearance: none;
		padding: 0;
		margin: 0;
	}

	@keyframes fadeIn {
		from { opacity: 0; }
		to { opacity: 1; }
	}

	/* Menú móvil */
	.mobile-menu {
		position: fixed;
		top: 100px;
		left: 0;
		right: 0;
		background: rgba(255, 255, 255, 0.98);
		backdrop-filter: blur(15px);
		border-top: 1px solid rgba(102, 126, 234, 0.2);
		box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
		z-index: 999;
		max-height: 0;
		overflow: hidden;
		transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
		opacity: 0;
		transform: translateY(-20px);
	}

	.mobile-menu.open {
		max-height: calc(100vh - 100px);
		opacity: 1;
		transform: translateY(0);
	}

	.mobile-menu-content {
		padding: 1rem 0;
	}

	.mobile-nav {
		list-style: none;
		margin: 0;
		padding: 0;
	}

	.mobile-nav-item {
		margin: 0;
		border-bottom: 1px solid rgba(102, 126, 234, 0.1);
	}

	.mobile-nav-item:last-child {
		border-bottom: none;
	}

	.mobile-nav-link {
		display: block;
		padding: 1rem 1.5rem;
		color: #333;
		text-decoration: none;
		font-weight: 500;
		transition: all 0.3s ease;
		font-size: 1.1rem;
		display: flex;
		align-items: center;
		gap: 0.75rem;
	}

	.mobile-nav-link:hover {
		background: rgba(102, 126, 234, 0.1);
		color: #667eea;
		transform: translateX(8px);
	}

	.mobile-nav-link.active {
		background: linear-gradient(135deg, rgba(102, 126, 234, 0.15), rgba(118, 75, 162, 0.15));
		color: #667eea;
		border-left: 4px solid #667eea;
	}

	.profile-mobile {
		border-top: 2px solid rgba(102, 126, 234, 0.2);
		margin-top: 1rem;
		padding-top: 1rem;
	}

	.mobile-profile {
		display: flex;
		align-items: center;
		gap: 1rem;
		padding: 1rem 1.5rem;
		color: #333;
		font-weight: 500;
	}

	.mobile-avatar {
		width: 40px;
		height: 40px;
		border-radius: 50%;
		border: 2px solid #667eea;
		object-fit: cover;
		background: linear-gradient(135deg, #667eea, #764ba2);
	}

	/* Responsive Design */
	@media (max-width: 768px) {
		.navbar-menu {
			display: none;
		}

		.mobile-menu-btn {
			display: flex;
		}

		.logo-link {
			font-size: 1.5rem;
		}
		
		.navbar-container {
			padding: 0 1rem;
		}
	}
	
	@media (min-width: 769px) {
		.mobile-menu-btn {
			display: none !important;
		}
		
		.navbar-menu {
			display: flex !important;
		}
	}

	/* Espaciado para el contenido debajo del navbar */
	:global(body) {
		padding-top: 100px !important;
	}
</style>
