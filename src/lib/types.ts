export interface UserProfile {
	uid: string;
	email: string;
	displayName?: string;
	alias?: string;
	photoURL?: string;
	bio?: string;
	age?: number;
	weight?: number;
	height?: number;
	fitnessLevel: 'beginner' | 'intermediate' | 'advanced';
	goals: string[];
	preferences: {
		units: 'metric' | 'imperial';
		notifications: boolean;
		privacy: 'public' | 'friends' | 'private';
	};
	stats: {
		challengesCompleted: number;
		totalWorkouts: number;
		totalPoints: number;
		level: number;
		currentStreak: number;
		longestStreak: number;
	};
	createdAt: Date;
	lastActive: Date;
}

export interface UserStats {
	challengesCompleted: number;
	totalWorkouts: number;
	totalPoints: number;
	level: number;
	currentStreak: number;
	longestStreak: number;
	weeklyGoal: number;
	weeklyProgress: number;
}
