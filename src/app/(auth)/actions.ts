"use server";

import { signIn, signUp } from "@/core/interface-adapters/auth/auth";
import { AuthError } from "next-auth";

export async function authenticateAction(
	prevState: string | undefined,
	formData: FormData,
) {
	try {
		console.log("START");
		await signIn("credentials", formData);
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
			login: formData.get("login"),
			password: formData.get("password"),
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
