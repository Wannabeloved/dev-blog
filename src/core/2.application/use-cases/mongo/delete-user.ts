import { ApiResponse, isErrorResponse } from "../../types/api";

export async function deleteUser(userId: string): Promise<ApiResponse<void>> {
	try {
		const res = await fetch(`http://localhost:5000/api/admin/users/${userId}`, {
			method: "DELETE",
			credentials: "include",
		});

		const data = await res.json();

		if (isErrorResponse(data)) throw data;

		return { ok: true, ...data };
	} catch (err) {
		console.error("deleteUser - error:", err);
		return { ok: false, ...(err as any) };
	}
}

