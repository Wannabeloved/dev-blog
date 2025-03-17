import { ApiResponse, isErrorResponse, SuccessResponse } from "../../types/api";
import { User } from "../../types/auth";

interface SignInCredentials {
	email: string;
	password: string;
}

export async function signIn(
	credentials: SignInCredentials,
): Promise<ApiResponse<User>> {
	try {
		const res = await fetch("http://localhost:5000/api/auth/login", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(credentials),
			credentials: "include",
		});
		const token = res.headers.get("set-cookie");
		if (token)
			await import("next/headers").then(async ({ cookies }) =>
				(await cookies()).set(
					"token",
					decodeURIComponent(token.split(";")[0].split("=")[1]),
					{ httpOnly: true },
				),
			);
		const data = (await res.json()) as SuccessResponse | ErrorResponse;
		console.log("res:", res);
		console.log("data:", data);
		if (isErrorResponse(data)) throw data;

		return { ok: true, ...data };
	} catch (err) {
		console.error("signIn - error:", err);
		return { ok: false, ...(err as any) };
	}
}

