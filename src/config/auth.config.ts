import type { NextAuthConfig } from "next-auth";

export const authConfig = {
	pages: {
		signIn: "/sign-in",
		signOut: "/sign-out",
		newUser: "/sign-up",
		error: "/posts",
	},
	callbacks: {
		async signIn() {
			console.log("signIn !!!");
			// console.log(...args);
			console.log("Проверка...");
			return false;
		},
		authorized({ auth, request: { nextUrl } }) {
			// const isLoggedIn = !!auth?.user;
			// const isOnDashboard = nextUrl.pathname.startsWith("/");
			// if (isOnDashboard) {
			// 	if (isLoggedIn) return true;
			// 	return false; // Redirect unauthenticated users to login page
			// } else if (isLoggedIn) {
			// 	return Response.redirect(new URL("/", nextUrl));
			// }
			console.log("WTF??");
			return true;
		},
	},
	providers: [], // Add providers with an empty array for now
} satisfies NextAuthConfig;
