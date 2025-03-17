import { ApiResponse, isErrorResponse } from "../../types/api";
import { Role } from "../../types/auth";

export async function getRoles(): Promise<ApiResponse<Role[]>> {
	try {
		const res = await fetch("http://localhost:5000/api/admin/roles", {
			method: "GET",
			credentials: "include",
		});

		const data = await res.json();

		if (isErrorResponse(data)) throw data;

		return { ok: true, ...data };
	} catch (err) {
		console.error("getRoles - error:", err);
		return { ok: false, ...(err as any) };
	}
}

