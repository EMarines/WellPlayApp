<script lang="ts">
	import { page } from '$app/stores';
	import { browser } from '$app/environment';
	import { onMount } from 'svelte';
	import { user, isAuthenticated, loading } from '$lib/auth';
	import { UserProfileService } from '$lib/services/userProfile';
	import { signOut } from 'firebase/auth';
	import { auth } from '$lib/firebase';
	
let name = 'WellPlay';
let isMobileMenuOpen = false;
let userAlias = '';
let userPhotoURL = '';
let isDropdownOpen = false;

function toggleDropdown() {
	isDropdownOpen = !isDropdownOpen;
}

function closeDropdown() {
	isDropdownOpen = false;
}

// Helper for dropdown blur event
function handleDropdownBlur(e: FocusEvent) {
	const related = e.relatedTarget as Element | null;
	// Only close if focus moves outside the dropdown menu
	if (!related || !related.closest('.dropdown-menu')) {
		closeDropdown();
	}
}

	// Función para obtener el nombre a mostrar
	function getDisplayName(user: any, alias: string): string {
		if (alias) {
			return alias;
		}
		if (user?.email) {
			return user.email.split('@')[0];
		}
		return 'Usuario';
	}

	// Cargar alias del usuario cuando está autenticado Y la autenticación ha terminado de cargar
	$: if (!$loading && $isAuthenticated && $user) {
		console.log('🔍 NavBar: Intentando cargar perfil para usuario:', $user.uid);
		console.log('🔍 Usuario autenticado en Firebase:', !!auth.currentUser);
		console.log('🔍 UID coincide:', auth.currentUser?.uid === $user.uid);
		console.log('🔍 Email del usuario:', $user.email);
		
		UserProfileService.ensureUserProfile($user.uid, $user.email || '', $user.displayName || undefined)
			.then(profile => {
				console.log('✅ NavBar: Perfil cargado exitosamente:', profile.alias, profile.photoURL ? 'con foto' : 'sin foto');
				if (profile?.alias) {
					userAlias = profile.alias;
				}
				if (profile?.photoURL) {
					userPhotoURL = profile.photoURL;
				}
			})
			.catch(error => {
				console.error('❌ NavBar: Error al cargar perfil:', error);
				console.log('🔍 Código de error:', error.code);
				console.log('🔍 Mensaje:', error.message);
				console.log('🔍 Usuario actual:', auth.currentUser?.uid);
				console.log('🔍 Email actual:', auth.currentUser?.email);
				
				// Obtener token de manera asíncrona
				if (auth.currentUser) {
					auth.currentUser.getIdToken().then(token => {
						console.log('🔍 Token auth disponible:', !!token);
					}).catch(() => {
						console.log('🔍 No se pudo obtener el token');
					});
				}
				
				// Ejecutar debug automático de permisos
				if (typeof window !== 'undefined' && window.debugWellPlay) {
					console.log('🧪 Ejecutando debug automático de permisos...');
					setTimeout(() => {
						window.debugWellPlay.debugFirestorePermissions();
					}, 1000);
				}
				
				userAlias = '';
				userPhotoURL = '';
			});
	} else if (!$loading && !$isAuthenticated) {
		// Limpiar datos cuando no está autenticado (solo después de que termine de cargar)
		userAlias = '';
		userPhotoURL = '';
	}

	function toggleMobileMenu() {
		isMobileMenuOpen = !isMobileMenuOpen;
	}

	function closeMobileMenu() {
		isMobileMenuOpen = false;
	}

	async function handleLogout() {
	try {
		await signOut(auth);
		closeMobileMenu();
		window.location.href = '/';
	} catch (error) {
		console.error('Error al cerrar sesión:', error);
	}
	}

	// Cerrar menú al hacer clic fuera
	onMount(() => {
const handleClickOutside = (event: MouseEvent) => {
	const target = event.target as Element | null;
	if (isMobileMenuOpen && target && typeof target.closest === 'function' && !target.closest('.mobile-menu') && !target.closest('.mobile-menu-btn')) {
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
		{#if $isAuthenticated}
			<li class="nav-item profile-dropdown">
				<button
					class="profile-btn"
					tabindex="0"
					aria-haspopup="true"
					aria-expanded={isDropdownOpen}
					on:click={toggleDropdown}
					on:keydown={(e) => e.key === 'Enter' && toggleDropdown()}
					on:mousedown={(e) => e.preventDefault()}
					on:blur={handleDropdownBlur}
				>
					<div class="profile-avatar">
						{#if userPhotoURL}
							<img src={userPhotoURL} alt="Perfil" class="avatar-img" />
						{:else}
							<img src="/profile-placeholder.svg" alt="Perfil" class="avatar-img" />
						{/if}
					</div>
					<span class="user-name">{getDisplayName($user, userAlias)}</span>
					<svg class="dropdown-arrow" width="16" height="16" viewBox="0 0 16 16"><path d="M4 6l4 4 4-4" stroke="currentColor" stroke-width="2" fill="none"/></svg>
				</button>
				{#if isDropdownOpen}
					<div class="dropdown-menu">
						<a href="/profile-setup" class="dropdown-item" on:mousedown={(e) => e.stopPropagation()} on:click={(e) => { e.preventDefault(); closeDropdown(); window.location.href = '/profile-setup'; }}>
							Editar perfil
						</a>
						<a href="/configuracion" class="dropdown-item" on:mousedown={(e) => e.stopPropagation()} on:click={(e) => { e.preventDefault(); closeDropdown(); window.location.href = '/configuracion'; }}>
							Configuración
						</a>
						<button class="dropdown-item logout" on:mousedown={(e) => e.stopPropagation()} on:click={() => { handleLogout(); closeDropdown(); }}>
							Cerrar sesión
						</button>
					</div>
				{/if}
			</li>
		{:else}
			<li class="nav-item">
				<a href="/auth" class="nav-link auth-link">
					<div class="auth-icon">
						<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 16 16">
							<path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6Zm2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0Zm4 8c0 1-1 1-1 1H3s-1 0-1-1 1-4 6-4 6 3 6 4Zm-1-.004c-.001-.246-.154-.986-.832-1.664C11.516 10.68 10.289 10 8 10c-2.29 0-3.516.68-4.168 1.332-.678.678-.83 1.418-.832 1.664h10Z"/>
						</svg>
					</div>
					Iniciar Sesión
				</a>
			</li>
		{/if}
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
				{#if $isAuthenticated}
					<li class="mobile-nav-item profile-mobile">
						<a 
							href="/profile-setup" 
							class="mobile-profile"
							on:click={closeMobileMenu}
						>
							<img src="/profile-placeholder.svg" alt="Perfil" class="mobile-avatar" />
							<span>{getDisplayName($user, userAlias)}</span>
						</a>
					</li>
					<li class="mobile-nav-item">
						<button class="mobile-logout-btn" on:click={handleLogout}>
							🚪 Cerrar Sesión
						</button>
					</li>
				{:else}
					<li class="mobile-nav-item">
						<a 
							href="/auth" 
							class="mobile-nav-link auth-mobile"
							on:click={closeMobileMenu}
						>
							<div class="mobile-auth-icon">
								<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 16 16">
									<path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6Zm2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0Zm4 8c0 1-1 1-1 1H3s-1 0-1-1 1-4 6-4 6 3 6 4Zm-1-.004c-.001-.246-.154-.986-.832-1.664C11.516 10.68 10.289 10 8 10c-2.29 0-3.516.68-4.168 1.332-.678.678-.83 1.418-.832 1.664h10Z"/>
								</svg>
							</div>
							Iniciar Sesión
						</a>
					</li>
				{/if}
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

	/* .logo-link styles are defined below, remove empty ruleset */
   .profile-dropdown {
	   position: relative;
	   cursor: pointer;
	   display: flex;
	   align-items: center;
	   outline: none;
   }
   .profile-btn {
	   display: flex;
	   flex-direction: column;
	   align-items: center;
	   gap: 0.25rem;
	   background: none;
	   border: none;
	   padding: 0.5rem 0.75rem;
	   cursor: pointer;
	   border-radius: 8px;
	   transition: background 0.2s;
	   position: relative;
   }
   .profile-btn:focus, .profile-btn:hover {
	   background: rgba(102, 126, 234, 0.08);
   }
   .profile-avatar {
	   margin-bottom: 0.25rem;
	   background: transparent !important;
	   box-shadow: none !important;
   }
   .avatar-img {
	   background: transparent !important;
   }
   .user-name {
	   font-size: 0.8rem;
	   color: #666;
	   font-weight: 500;
	   text-align: center;
	   white-space: nowrap;
	   max-width: 80px;
	   overflow: hidden;
	   text-overflow: ellipsis;
   }
	.profile-dropdown:focus .dropdown-menu,
	.profile-dropdown:active .dropdown-menu {
		display: block;
	}
	.dropdown-arrow {
		margin-left: 0.25rem;
		transition: transform 0.2s;
	}
	.dropdown-menu {
		position: absolute;
		top: 110%;
		right: 0;
		background: #fff;
		box-shadow: 0 2px 8px rgba(0,0,0,0.12);
		border-radius: 8px;
		min-width: 180px;
		z-index: 1001;
		display: block;
		padding: 0.5rem 0;
	}
	.dropdown-item {
		display: block;
		width: 100%;
		padding: 0.75rem 1.5rem;
		color: #333;
		text-align: left;
		background: none;
		border: none;
		outline: none;
		font-size: 1rem;
		cursor: pointer;
		transition: background 0.15s;
		text-decoration: none;
	}
	.dropdown-item:hover {
		background: #f5f5f5;
	}
   .dropdown-item.logout {
	   color: #d32f2f;
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

	/* .profile {
		margin-left: 1rem;
	} */

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

	/* .profile-link {
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 0.25rem;
		text-decoration: none;
		color: inherit;
		padding: 0.5rem;
		border-radius: 8px;
		transition: background-color 0.3s ease;
		min-width: 70px;
	} */

	/* .profile-link:hover {
		background-color: rgba(102, 126, 234, 0.1);
	} */

	.user-name {
		font-size: 0.8rem;
		color: #666;
		font-weight: 500;
		text-align: center;
		white-space: nowrap;
		max-width: 80px;
		overflow: hidden;
		text-overflow: ellipsis;
	}

	/* .logout-btn {
		background: linear-gradient(135deg, #ef4444, #dc2626);
		color: white;
		border: none;
		padding: 0.5rem 1rem;
		border-radius: 8px;
		font-size: 0.9rem;
		font-weight: 500;
		cursor: pointer;
		transition: all 0.3s ease;
	}

	.logout-btn:hover {
		transform: translateY(-2px);
		box-shadow: 0 4px 12px rgba(239, 68, 68, 0.3);
	} */

	.auth-link {
		background: linear-gradient(135deg, #667eea, #764ba2);
		color: white !important;
		padding: 0.5rem 1rem;
		border-radius: 8px;
		font-weight: 500;
		transition: all 0.3s ease;
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 0.25rem;
		min-width: 80px;
	}

	.auth-link:hover {
		transform: translateY(-2px);
		box-shadow: 0 4px 12px rgba(102, 126, 234, 0.3);
		background: linear-gradient(135deg, #5a67d8, #6b46c1);
	}

	.auth-icon {
		display: flex;
		align-items: center;
		justify-content: center;
		width: 20px;
		height: 20px;
	}

	.auth-icon svg {
		transition: transform 0.3s ease;
	}

	.auth-link:hover .auth-icon svg {
		transform: scale(1.1);
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
		flex-direction: column;
		align-items: center;
		gap: 0.5rem;
		padding: 1rem 1.5rem;
		color: #333;
		font-weight: 500;
		text-align: center;
	}

	.mobile-avatar {
		width: 40px;
		height: 40px;
		border-radius: 50%;
		border: 2px solid #667eea;
		object-fit: cover;
		background: linear-gradient(135deg, #667eea, #764ba2);
	}

	.mobile-logout-btn {
		width: 100%;
		background: linear-gradient(135deg, #ef4444, #dc2626);
		color: white;
		border: none;
		padding: 1rem 1.5rem;
		font-size: 1.1rem;
		font-weight: 500;
		cursor: pointer;
		transition: all 0.3s ease;
		text-align: left;
		border-radius: 0;
	}

	.mobile-logout-btn:hover {
		background: linear-gradient(135deg, #dc2626, #b91c1c);
		transform: translateX(5px);
	}

	.auth-mobile {
		background: linear-gradient(135deg, #667eea, #764ba2) !important;
		color: white !important;
		margin-top: 1rem;
		border-top: 2px solid rgba(102, 126, 234, 0.2);
		padding-top: 1rem;
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 0.5rem;
		text-align: center;
	}

	.auth-mobile:hover {
		background: linear-gradient(135deg, #5a67d8, #6b46c1) !important;
		transform: translateY(-2px);
	}

	.mobile-auth-icon {
		display: flex;
		align-items: center;
		justify-content: center;
		width: 24px;
		height: 24px;
	}

	.mobile-auth-icon svg {
		transition: transform 0.3s ease;
	}

	.auth-mobile:hover .mobile-auth-icon svg {
		transform: scale(1.1);
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
