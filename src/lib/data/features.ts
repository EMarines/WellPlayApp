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
		title: "Retos",
		description: "Demuestra que eres el Mejor",
		emoji: "🏆",
		image: "/logo.png", // Usando logo existente como placeholder
		href: "/retos",
		color: "#667eea"
	},
	{
		id: 2,
		title: "Blog",
		description: "Tips, Novedades, Consejos",
		emoji: "📝",
		image: "/logo.png", // Usando logo existente como placeholder
		href: "/blog",
		color: "#764ba2"
	},
	{
		id: 3,
		title: "Store",
		description: "Tu tienda especializada en tu palma de la mano",
		emoji: "🛍️",
		image: "/logo.png", // Usando logo existente como placeholder
		href: "/store",
		color: "#f093fb"
	},
	{
		id: 4,
		title: "Chat",
		description: "Conéctate con otros usuarios y comparte tus experiencias",
		emoji: "💬",
		image: "/logo.png", // Usando logo existente como placeholder
		href: "/chat",
		color: "#4facfe"
	}
];
