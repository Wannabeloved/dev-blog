export enum AuthProviders {
	GOOGLE = "google",
	GITHUB = "github",
	CREDENTIALS = "credentials",
}

export interface User {
	id: string;
	email: string;
	roleId: number;
	createdAt: string;
}

export interface Role {
	id: number;
	name: string;
}

export interface Comment {
	id: string;
	content: string;
	author: string;
	publishedAt: string;
}

