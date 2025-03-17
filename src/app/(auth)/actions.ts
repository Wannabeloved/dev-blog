"use server";

import { signIn, signOut, signUp } from "@/core/interface-adapters/auth/auth";
import { AuthError } from "next-auth";
import { AuthProviders } from "@/core/2.application/types/auth";

export async function authenticateAction(
	prevState: string | undefined,
	formData: FormData,
) {
	try {
		console.log("START");
		const provider: AuthProviders = formData.get("p") as AuthProviders;
		const res = await signIn(provider);
		console.log("FINISH!!!");
	} catch (error) {
		if (error instanceof AuthError) {
			switch (error.type) {
				case "CredentialsSignin":
					return "Invalid credentials.";
				default:
					return "Something went wrong.";
			}
		}
		throw error;
	}
}

export async function registerAction(
	prevState: string | undefined,
	formData: FormData,
) {
	try {
		console.log("START REGISTER");
		await signUp({
			login: formData.get("login") as string,
			password: formData.get("password") as string,
		});

		console.log("FINISH!!!");
	} catch (error) {
		if (error instanceof AuthError) {
			switch (error.type) {
				case "CredentialsSignin":
					return "Invalid credentials.";
				default:
					return "Something went wrong.";
			}
		}
		throw error;
	}
}

export async function signOutAction() {
	await signOut({ redirectTo: "/sign-in" });
}

