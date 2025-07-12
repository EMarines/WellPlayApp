<script>
	import './app.css';
	import NavBar from '$lib/NavBar.svelte';
	import { page } from '$app/stores';
	import { browser } from '$app/environment';
	
	let mobileMenuOpen = false;
	
	function toggleMobileMenu() {
		mobileMenuOpen = !mobileMenuOpen;
	}
	
	function closeMobileMenu() {
		mobileMenuOpen = false;
	}
</script>

<!-- NavBar directo con estilos inline como backup -->
<nav style="
	position: fixed;
	top: 0;
	left: 0;
	right: 0;
	width: 100%;
	background: rgba(255, 255, 255, 0.95);
	backdrop-filter: blur(10px);
	box-shadow: 0 2px 20px rgba(0, 0, 0, 0.1);
	z-index: 1000;
	padding: 0.5rem 0;
	border-bottom: 1px solid rgba(255, 255, 255, 0.2);
">
	<div style="
		max-width: 1200px;
		margin: 0 auto;
		padding: 0 1rem;
		display: flex;
		justify-content: space-between;
		align-items: center;
		height: 60px;
	">
		<!-- Logo -->
		<div style="display: flex; align-items: center;">
			<a href="/" style="
				text-decoration: none;
				font-size: 1.8rem;
				font-weight: 700;
				background: linear-gradient(45deg, #ffd700, #ff6b35);
				background-clip: text;
				-webkit-background-clip: text;
				-webkit-text-fill-color: transparent;
				color: #333;
			" on:click={closeMobileMenu}>
				WellPlay
			</a>
		</div>

		<!-- Desktop Navigation Menu -->
		<div style="display: flex; align-items: center;" class="desktop-menu">
			<ul style="
				display: flex;
				list-style: none;
				margin: 0;
				padding: 0;
				align-items: center;
				gap: 0.5rem;
			">
				<li><a href="/" style="
					display: block;
					padding: 0.75rem 1rem;
					color: #333;
					text-decoration: none;
					font-weight: 500;
					border-radius: 8px;
					transition: all 0.3s ease;
				" class:active={browser && $page?.url?.pathname === '/'} on:click={closeMobileMenu}>Home</a></li>
				<li><a href="/retos" style="
					display: block;
					padding: 0.75rem 1rem;
					color: #333;
					text-decoration: none;
					font-weight: 500;
					border-radius: 8px;
					transition: all 0.3s ease;
				" class:active={browser && $page?.url?.pathname === '/retos'} on:click={closeMobileMenu}>Retos</a></li>
				<li><a href="/blog" style="
					display: block;
					padding: 0.75rem 1rem;
					color: #333;
					text-decoration: none;
					font-weight: 500;
					border-radius: 8px;
					transition: all 0.3s ease;
				" class:active={browser && $page?.url?.pathname === '/blog'} on:click={closeMobileMenu}>Blog</a></li>
				<li><a href="/store" style="
					display: block;
					padding: 0.75rem 1rem;
					color: #333;
					text-decoration: none;
					font-weight: 500;
					border-radius: 8px;
					transition: all 0.3s ease;
				" class:active={browser && $page?.url?.pathname === '/store'} on:click={closeMobileMenu}>Store</a></li>
				<li><a href="/chat" style="
					display: block;
					padding: 0.75rem 1rem;
					color: #333;
					text-decoration: none;
					font-weight: 500;
					border-radius: 8px;
					transition: all 0.3s ease;
				" class:active={browser && $page?.url?.pathname === '/chat'} on:click={closeMobileMenu}>Chat</a></li>
				<li><a href="/about" style="
					display: block;
					padding: 0.75rem 1rem;
					color: #333;
					text-decoration: none;
					font-weight: 500;
					border-radius: 8px;
					transition: all 0.3s ease;
				" class:active={browser && $page?.url?.pathname === '/about'} on:click={closeMobileMenu}>About</a></li>
			</ul>
		</div>
		
		<!-- Mobile Menu Button -->
		<button 
			style="
				background: none;
				border: none;
				padding: 0.5rem;
				cursor: pointer;
				flex-direction: column;
				gap: 4px;
				width: 30px;
				height: 30px;
			"
			class="mobile-menu-btn"
			on:click={toggleMobileMenu}
			aria-label="Toggle menu"
		>
			<span style="
				width: 25px;
				height: 3px;
				background: #333;
				transition: all 0.3s ease;
				display: block;
				transform: {mobileMenuOpen ? 'rotate(45deg) translate(6px, 6px)' : 'none'};
			"></span>
			<span style="
				width: 25px;
				height: 3px;
				background: #333;
				transition: all 0.3s ease;
				display: block;
				opacity: {mobileMenuOpen ? '0' : '1'};
			"></span>
			<span style="
				width: 25px;
				height: 3px;
				background: #333;
				transition: all 0.3s ease;
				display: block;
				transform: {mobileMenuOpen ? 'rotate(-45deg) translate(8px, -8px)' : 'none'};
			"></span>
		</button>
	</div>
	
	<!-- Mobile Menu Dropdown -->
	<div style="
		position: absolute;
		top: 100%;
		left: 0;
		right: 0;
		background: rgba(255, 255, 255, 0.98);
		backdrop-filter: blur(10px);
		box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
		transform: translateY({mobileMenuOpen ? '0' : '-100%'});
		opacity: {mobileMenuOpen ? '1' : '0'};
		visibility: {mobileMenuOpen ? 'visible' : 'hidden'};
		transition: all 0.3s ease;
		z-index: 999;
	" class="mobile-menu-dropdown">
		<ul style="
			list-style: none;
			margin: 0;
			padding: 1rem;
		">
			<li style="margin-bottom: 0.5rem;">
				<a href="/" style="
					display: block;
					padding: 1rem;
					color: #333;
					text-decoration: none;
					font-weight: 500;
					border-radius: 8px;
					transition: all 0.3s ease;
				" class:active={browser && $page?.url?.pathname === '/'} on:click={closeMobileMenu}>🏠 Home</a>
			</li>
			<li style="margin-bottom: 0.5rem;">
				<a href="/retos" style="
					display: block;
					padding: 1rem;
					color: #333;
					text-decoration: none;
					font-weight: 500;
					border-radius: 8px;
					transition: all 0.3s ease;
				" class:active={browser && $page?.url?.pathname === '/retos'} on:click={closeMobileMenu}>🏆 Retos</a>
			</li>
			<li style="margin-bottom: 0.5rem;">
				<a href="/blog" style="
					display: block;
					padding: 1rem;
					color: #333;
					text-decoration: none;
					font-weight: 500;
					border-radius: 8px;
					transition: all 0.3s ease;
				" class:active={browser && $page?.url?.pathname === '/blog'} on:click={closeMobileMenu}>📝 Blog</a>
			</li>
			<li style="margin-bottom: 0.5rem;">
				<a href="/store" style="
					display: block;
					padding: 1rem;
					color: #333;
					text-decoration: none;
					font-weight: 500;
					border-radius: 8px;
					transition: all 0.3s ease;
				" class:active={browser && $page?.url?.pathname === '/store'} on:click={closeMobileMenu}>🛍️ Store</a>
			</li>
			<li style="margin-bottom: 0.5rem;">
				<a href="/chat" style="
					display: block;
					padding: 1rem;
					color: #333;
					text-decoration: none;
					font-weight: 500;
					border-radius: 8px;
					transition: all 0.3s ease;
				" class:active={browser && $page?.url?.pathname === '/chat'} on:click={closeMobileMenu}>💬 Chat</a>
			</li>
			<li style="margin-bottom: 0.5rem;">
				<a href="/about" style="
					display: block;
					padding: 1rem;
					color: #333;
					text-decoration: none;
					font-weight: 500;
					border-radius: 8px;
					transition: all 0.3s ease;
				" class:active={browser && $page?.url?.pathname === '/about'} on:click={closeMobileMenu}>ℹ️ About</a>
			</li>
		</ul>
	</div>
</nav>

<!-- NavBar component como backup (comentado para evitar duplicado) -->
<!-- <NavBar /> -->

<main style="padding-top: 80px;">
	<slot />
</main>

<style>
	main {
		display: flex;
		flex-direction: column;
		min-height: 100vh;
	}
	
	/* Estilos para hover de los links */
	:global(nav a:hover) {
		color: #667eea !important;
		background: rgba(102, 126, 234, 0.1) !important;
	}
	
	:global(nav a.active) {
		color: #667eea !important;
		background: linear-gradient(135deg, rgba(102, 126, 234, 0.1), rgba(118, 75, 162, 0.1)) !important;
		border-bottom: 2px solid #667eea !important;
	}
	
	/* Mobile menu button - hidden by default, shown on mobile */
	:global(.mobile-menu-btn) {
		display: none !important;
	}
	
	/* Mobile responsive */
	@media (max-width: 768px) {
		:global(.desktop-menu) {
			display: none !important;
		}
		
		:global(.mobile-menu-btn) {
			display: flex !important;
		}
	}
	
	@media (min-width: 769px) {
		:global(.desktop-menu) {
			display: flex !important;
		}
		
		:global(.mobile-menu-btn) {
			display: none !important;
		}
		
		:global(.mobile-menu-dropdown) {
			display: none !important;
		}
	}
</style>
