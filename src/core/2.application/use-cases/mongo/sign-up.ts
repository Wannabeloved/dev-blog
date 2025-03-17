import { ApiResponse, isErrorResponse } from "../../types/api";
import { User } from "../../types/auth";

interface SignUpCredentials {
	email: string;
	password: string;
	confirmPassword: string;
}

export async function signUp(
	credentials: SignUpCredentials,
): Promise<ApiResponse<User>> {
	try {
		const res = await fetch(`http://localhost:5000/api/auth/register`, {
			method: "post",
			body: JSON.stringify(credentials),
			headers: {
				"Content-Type": "application/json",
				credentials: "include",
			},
		});

		const token = res.headers.get("set-cookie");
		if (token) {
			await import("next/headers").then(async ({ cookies }) =>
				(await cookies()).set(
					"token",
					decodeURIComponent(token.split(";")[0].split("=")[1]),
					{ httpOnly: true },
				),
			);
		}

		const data = await res.json();

		if (isErrorResponse(data)) throw data;

		return { ok: true, ...data };
	} catch (err) {
		console.error("signUp - error:", err);
		return { ok: false, ...(err as any) };
	}
}

