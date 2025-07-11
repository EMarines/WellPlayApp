<script lang="ts">
	// import { page } from '$app/stores';
	// Temporalmente comentado para evitar errores de tipos
	
	let name = 'WellPlay';
	
	// Función simple para determinar la página activa
	function isActive(path: string): boolean {
		if (typeof window !== 'undefined') {
			return window.location.pathname === path;
		}
		return false;
	}
</script>

<nav class="navbar">
	<div class="navbar-container">
		<!-- Logo a la izquierda -->
		<div class="navbar-brand">
			<a href="/" class="logo-link">
				<span class="logo">{name}</span>
			</a>
		</div>

		<!-- Menú de navegación a la derecha -->
		<div class="navbar-menu">
			<ul class="navbar-nav">
				<li class="nav-item">
					<a href="/" class="nav-link" class:active={isActive('/')}>Home</a>
				</li>
				<li class="nav-item">
					<a href="/retos" class="nav-link" class:active={isActive('/retos')}>Retos</a>
				</li>
				<li class="nav-item">
					<a href="/blog" class="nav-link" class:active={isActive('/blog')}>Blog</a>
				</li>
				<li class="nav-item">
					<a href="/store" class="nav-link" class:active={isActive('/store')}>Store</a>
				</li>
				<li class="nav-item">
					<a href="/chat" class="nav-link" class:active={isActive('/chat')}>Chat</a>
				</li>
				<li class="nav-item">
					<a href="/about" class="nav-link" class:active={isActive('/about')}>About</a>
				</li>
				<li class="nav-item profile">
					<div class="profile-avatar">
						<img src="/profile-placeholder.svg" alt="Perfil" class="avatar-img" />
					</div>
				</li>
			</ul>
		</div>

		<!-- Botón de menú móvil -->
		<button class="mobile-menu-btn" aria-label="Toggle menu">
			<span class="hamburger"></span>
		</button>
	</div>
</nav>

<style>
	:root {
		--navbar-bg: rgba(255, 255, 255, 0.95);
		--navbar-shadow: 0 2px 20px rgba(0, 0, 0, 0.1);
		--logo-color-1: #ffd700;
		--logo-color-2: #ff6b35;
		--primary-color: #667eea;
		--secondary-color: #764ba2;
		--text-color: #333;
		--nav-link-hover: #667eea;
		--border-radius: 8px;
	}

	.navbar {
		position: fixed;
		top: 0;
		left: 0;
		right: 0;
		background: var(--navbar-bg);
		backdrop-filter: blur(10px);
		box-shadow: var(--navbar-shadow);
		z-index: 1000;
		padding: 0.5rem 0;
	}

	.navbar-container {
		max-width: 1200px;
		margin: 0 auto;
		padding: 0 1rem;
		display: flex;
		justify-content: space-between;
		align-items: center;
	}

	.navbar-brand {
		display: flex;
		align-items: center;
	}

	.logo-link {
		text-decoration: none;
		font-size: 1.8rem;
		font-weight: 700;
	}

	.logo {
		background: linear-gradient(45deg, var(--logo-color-1), var(--logo-color-2));
		background-clip: text;
		-webkit-background-clip: text;
		-webkit-text-fill-color: transparent;
		text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.1);
		transition: all 0.3s ease;
	}

	.logo:hover {
		transform: scale(1.05);
	}

	.navbar-menu {
		display: flex;
		align-items: center;
	}

	.navbar-nav {
		display: flex;
		list-style: none;
		margin: 0;
		padding: 0;
		align-items: center;
		gap: 0.5rem;
	}

	.nav-item {
		margin: 0;
	}

	.nav-link {
		display: block;
		padding: 0.75rem 1rem;
		color: var(--text-color);
		text-decoration: none;
		font-weight: 500;
		border-radius: var(--border-radius);
		transition: all 0.3s ease;
		position: relative;
	}

	.nav-link:hover {
		color: var(--nav-link-hover);
		background: rgba(102, 126, 234, 0.1);
		transform: translateY(-1px);
	}

	.nav-link.active {
		color: var(--nav-link-hover);
		background: linear-gradient(135deg, rgba(102, 126, 234, 0.1), rgba(118, 75, 162, 0.1));
		border-bottom: 2px solid var(--nav-link-hover);
	}

	.profile {
		margin-left: 1rem;
	}

	.profile-avatar {
		width: 40px;
		height: 40px;
		border-radius: 50%;
		overflow: hidden;
		border: 2px solid var(--primary-color);
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
		background: linear-gradient(135deg, var(--primary-color), var(--secondary-color));
	}

	.mobile-menu-btn {
		display: none;
		background: none;
		border: none;
		padding: 0.5rem;
		cursor: pointer;
		flex-direction: column;
		gap: 3px;
	}

	.hamburger {
		width: 25px;
		height: 3px;
		background: var(--text-color);
		transition: all 0.3s ease;
	}

	.hamburger::before,
	.hamburger::after {
		content: '';
		width: 25px;
		height: 3px;
		background: var(--text-color);
		display: block;
		transition: all 0.3s ease;
	}

	.hamburger::before {
		transform: translateY(-8px);
	}

	.hamburger::after {
		transform: translateY(5px);
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
	}

	/* Espaciado para el contenido debajo del navbar */
	:global(body) {
		padding-top: 80px;
	}
</style>
