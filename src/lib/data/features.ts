// Base de datos de características/features de WellPlay
export interface Feature {
	id: number;
	title: string;
	description: string;
	emoji: string;
	image: string;
	href: string;
	color: string;
}

export const features: Feature[] = [
	{
		id: 1,
		title: "¡Namúrachi 2025 Mejor que Nunca!",
		description: "No te pierdas la carrer este noviembre, se espera una participación de tres mil corredores...",
		emoji: "🏆",
		image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTmL8iHNvyxEBhipHYAOZF1Q04WSp3R2_4UCA&s", // Usando logo existente como placeholder
		href: "/retos",
		color: "#667eea"
	},
	{
		id: 2,
		title: "La Salud es El Cimiento de Todo",
		description: "Tips, Novedades, Consejos",
		emoji: "📝",
		image: "https://universidadeuropea.com/resources/media/images/blog-medicina-salud-1440x464.2e16d0ba.fill-767x384.jpg", // Usando logo existente como placeholder
		href: "/blog",
		color: "#764ba2"
	},
	{
		id: 3,
		title: "Abre la Nueva Tienda Virtual WellPlay",
		description: "Tu tienda especializada en tu palma de la mano",
		emoji: "🛍️",
		image: "https://torontolife.mblycdn.com/tl/resized/2000/04/w1280/TL-FWD-INLINE1.png", // Usando logo existente como placeholder
		href: "/store",
		color: "#f093fb"
	},
	{
		id: 4,
		title: "Chatea con Tus Amigos",
		description: "Conéctate con otros usuarios y comparte tus experiencias",
		emoji: "💬",
		image: "/logo.png", // Usando logo existente como placeholder
		href: "/chat",
		color: "#4facfe"
	}
];
