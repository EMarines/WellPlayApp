<script lang="ts">
	import { page } from '$app/stores';
	import { browser } from '$app/environment';
	
	let name = 'WellPlay';
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
		<button class="mobile-menu-btn" aria-label="Toggle menu">
			<span class="hamburger-line"></span>
			<span class="hamburger-line"></span>
			<span class="hamburger-line"></span>
		</button>
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
		padding: 0.5rem 0;
		border-bottom: 1px solid rgba(255, 255, 255, 0.2);
	}

	.navbar-container {
		max-width: 1200px;
		margin: 0 auto;
		padding: 0 1rem;
		display: flex;
		justify-content: space-between;
		align-items: center;
		height: 60px;
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
		background: linear-gradient(45deg, #ffd700, #ff6b35);
		background-clip: text;
		-webkit-background-clip: text;
		-webkit-text-fill-color: transparent;
		color: #333; /* fallback */
		text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.1);
		transition: all 0.3s ease;
	}

	.logo:hover {
		transform: scale(1.05);
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
	}

	.hamburger-line {
		width: 25px;
		height: 3px;
		background: #333;
		transition: all 0.3s ease;
		display: block;
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
		padding-top: 80px !important;
	}
</style>
