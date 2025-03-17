import { ApiResponse, isErrorResponse } from "../../types/api";
import { User } from "../../types/auth";

export async function getUsers(): Promise<ApiResponse<User[]>> {
	try {
		const res = await fetch("http://localhost:5000/api/admin/users", {
			method: "GET",
			credentials: "include",
		});

		const data = await res.json();

		if (isErrorResponse(data)) throw data;

		return { ok: true, ...data };
	} catch (err) {
		console.error("getUsers - error:", err);
		return { ok: false, ...(err as any) };
	}
}

