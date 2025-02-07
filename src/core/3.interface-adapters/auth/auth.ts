import NextAuth from "next-auth";
import { authConfig } from "@/config/auth.config";
import Credentials from "next-auth/providers/credentials";

// import type { User } from "@/app/lib/definitions";
import { UsersDB } from "@/core/infrastructure/db";
// import bcrypt from "bcrypt";
// import postgres from "postgres";

// const sql = postgres(process.env.POSTGRES_URL!, { ssl: "require" });

async function getUser(login: string) {
	try {
		console.log("FIND USER");
		const user = await UsersDB.getUsers().then((res) =>
			res.find((user: any) => user.login === login),
		);
		console.log("USER FINDED");
		console.log(user);
		return user;
	} catch (error) {
		console.error("Failed to fetch user:", error);
		throw new Error("Failed to fetch user.");
	}
}
async function createUser(credentials) {
	try {
		console.log("FIND USER");
		const user = await UsersDB.createUser(credentials);
		console.log("USER CREATED");
		console.log(user);
		return user;
	} catch (error) {
		console.error("Failed to create user:", error);
		throw new Error("Failed to create user.");
	}
}
export const signUp = async (credentials: Partial<Record<string, unknown>>) => {
	const user = await createUser(credentials);
	return user;
};

export const { auth, signIn, signOut } = NextAuth({
	...authConfig,
	providers: [
		Credentials({
			async authorize(credentials) {
				console.log("START VALIDATING");
				const parsedCredentials = {
					success: true,
					data: { login: "User", password: "7127" },
				};

				// if (!(parsedCredentials?.success)) return null;

				const { login, password } = parsedCredentials.data;
				const user = await getUser(login);
				if (!user) return console.log("IT'S BIG FAIL"), null;
				const passwordsMatch = password === user.password;
				console.log("SEND RESPONSE");
				if (passwordsMatch) return user;
			},
		}),
	],
});
