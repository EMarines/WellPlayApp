<script lang="ts">
	// Página de Chat
</script>

<svelte:head>
	<title>Chat - WellPlayApp</title>
	<meta name="description" content="Chat comunitario de WellPlay" />
</svelte:head>

<section class="page-content">
	<div class="container">
		<h1>💬 Chat</h1>
		<p>Conéctate con otros usuarios y comparte tus experiencias de bienestar.</p>
		
		<div class="chat-container">
			<div class="chat-sidebar">
				<h3>Canales</h3>
				<ul class="channel-list">
					<li class="channel active">💬 General</li>
					<li class="channel">🏃‍♂️ Entrenamiento</li>
					<li class="channel">🥗 Nutrición</li>
					<li class="channel">🧘‍♀️ Mindfulness</li>
					<li class="channel">🎯 Retos</li>
				</ul>
			</div>
			
			<div class="chat-main">
				<div class="chat-header">
					<h3>💬 General</h3>
				</div>
				
				<div class="chat-messages">
					<div class="message">
						<div class="message-avatar">👤</div>
						<div class="message-content">
							<div class="message-user">Usuario1</div>
							<div class="message-text">¡Hola a todos! ¿Cómo van con sus entrenamientos?</div>
						</div>
					</div>
					
					<div class="message">
						<div class="message-avatar">👤</div>
						<div class="message-content">
							<div class="message-user">Usuario2</div>
							<div class="message-text">¡Muy bien! Acabo de completar mi sesión de yoga matutina 🧘‍♀️</div>
						</div>
					</div>
				</div>
				
				<div class="chat-input">
					<input type="text" placeholder="Escribe tu mensaje..." class="input-field">
					<button class="send-btn">Enviar</button>
				</div>
			</div>
		</div>
	</div>
</section>

<style>
	.page-content {
		padding: 2rem 0;
		min-height: calc(100vh - 80px);
	}

	.container {
		max-width: 1200px;
		margin: 0 auto;
		padding: 0 1rem;
	}

	h1 {
		font-size: 2.5rem;
		margin-bottom: 1rem;
		color: #333;
	}

	p {
		font-size: 1.1rem;
		color: #666;
		margin-bottom: 2rem;
	}

	.chat-container {
		display: grid;
		grid-template-columns: 250px 1fr;
		gap: 2rem;
		background: white;
		border-radius: 12px;
		box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
		overflow: hidden;
		height: 500px;
	}

	.chat-sidebar {
		background: #f8f9fa;
		padding: 1rem;
	}

	.chat-sidebar h3 {
		margin-bottom: 1rem;
		color: #333;
	}

	.channel-list {
		list-style: none;
		padding: 0;
		margin: 0;
	}

	.channel {
		padding: 0.75rem;
		border-radius: 8px;
		cursor: pointer;
		transition: background 0.3s ease;
		margin-bottom: 0.5rem;
	}

	.channel:hover {
		background: #e9ecef;
	}

	.channel.active {
		background: #667eea;
		color: white;
	}

	.chat-main {
		display: flex;
		flex-direction: column;
	}

	.chat-header {
		padding: 1rem;
		border-bottom: 1px solid #e9ecef;
	}

	.chat-header h3 {
		margin: 0;
		color: #333;
	}

	.chat-messages {
		flex: 1;
		padding: 1rem;
		overflow-y: auto;
	}

	.message {
		display: flex;
		margin-bottom: 1rem;
	}

	.message-avatar {
		width: 40px;
		height: 40px;
		border-radius: 50%;
		background: #667eea;
		display: flex;
		align-items: center;
		justify-content: center;
		margin-right: 1rem;
		flex-shrink: 0;
	}

	.message-content {
		flex: 1;
	}

	.message-user {
		font-weight: bold;
		color: #667eea;
		margin-bottom: 0.25rem;
	}

	.message-text {
		color: #333;
	}

	.chat-input {
		display: flex;
		padding: 1rem;
		border-top: 1px solid #e9ecef;
		gap: 1rem;
	}

	.input-field {
		flex: 1;
		padding: 0.75rem;
		border: 1px solid #ddd;
		border-radius: 8px;
		outline: none;
	}

	.input-field:focus {
		border-color: #667eea;
	}

	.send-btn {
		background: linear-gradient(135deg, #667eea, #764ba2);
		color: white;
		border: none;
		padding: 0.75rem 1.5rem;
		border-radius: 8px;
		cursor: pointer;
		font-weight: 500;
		transition: all 0.3s ease;
	}

	.send-btn:hover {
		transform: translateY(-2px);
		box-shadow: 0 4px 15px rgba(102, 126, 234, 0.3);
	}

	@media (max-width: 768px) {
		.chat-container {
			grid-template-columns: 1fr;
			height: auto;
		}
		
		.chat-sidebar {
			display: none;
		}
	}
</style>
