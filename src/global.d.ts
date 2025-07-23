// Declaraciones globales para TypeScript

declare global {
	interface Window {
		debugWellPlay?: {
			debugFirestorePermissions: () => void;
			debugUserFlow: () => void;
			debugPersistenceFlow: () => void;
			debugStorageUpload: (file: File) => Promise<void>;
		};
	}
}

export {};
