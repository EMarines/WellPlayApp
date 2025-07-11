<script>
	import './app.css';
	import NavBar from '$lib/NavBar.svelte';
	import { page } from '$app/stores';
	import { browser } from '$app/environment';
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
			">
				WellPlay
			</a>
		</div>

		<!-- Navigation Menu -->
		<div style="display: flex; align-items: center;">
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
				">Home</a></li>
				<li><a href="/retos" style="
					display: block;
					padding: 0.75rem 1rem;
					color: #333;
					text-decoration: none;
					font-weight: 500;
					border-radius: 8px;
					transition: all 0.3s ease;
				">Retos</a></li>
				<li><a href="/blog" style="
					display: block;
					padding: 0.75rem 1rem;
					color: #333;
					text-decoration: none;
					font-weight: 500;
					border-radius: 8px;
					transition: all 0.3s ease;
				">Blog</a></li>
				<li><a href="/store" style="
					display: block;
					padding: 0.75rem 1rem;
					color: #333;
					text-decoration: none;
					font-weight: 500;
					border-radius: 8px;
					transition: all 0.3s ease;
				">Store</a></li>
				<li><a href="/chat" style="
					display: block;
					padding: 0.75rem 1rem;
					color: #333;
					text-decoration: none;
					font-weight: 500;
					border-radius: 8px;
					transition: all 0.3s ease;
				">Chat</a></li>
				<li><a href="/about" style="
					display: block;
					padding: 0.75rem 1rem;
					color: #333;
					text-decoration: none;
					font-weight: 500;
					border-radius: 8px;
					transition: all 0.3s ease;
				">About</a></li>
			</ul>
		</div>
	</div>
</nav>

<!-- NavBar component como backup -->
<NavBar />

<main style="padding-top: 80px;">
	<slot />
</main>

<style>
	main {
		display: flex;
		flex-direction: column;
		min-height: 100vh;
	}
</style>
