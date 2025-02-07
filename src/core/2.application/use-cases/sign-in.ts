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
		const user = await UsersDB.getUsers().then((res) =>
			res.filter((user: any) => user.login === login),
		);
		return user[0];
	} catch (error) {
		console.error("Failed to fetch user:", error);
		throw new Error("Failed to fetch user.");
	}
}

export const { auth, signIn, signOut } = NextAuth({
	...authConfig,
	providers: [
		Credentials(
			Credentials({
				async authorize(credentials) {
					const parsedCredentials = {
						success: true,
						data: { login: "", password: "" },
					};

					if (parsedCredentials.success) {
						const { login, password } = parsedCredentials.data;
						const user = await getUser(login);
						if (!user) return null;
						const passwordsMatch = password === user.password;

						if (passwordsMatch) return user;
					}

					return null;
				},
			}),
		),
	],
});
