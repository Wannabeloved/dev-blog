import { ApiResponse, isErrorResponse } from "../../types/api";
import { User } from "../../types/auth";

export async function updateUserRole(
	userId: string,
	roleId: number,
): Promise<ApiResponse<User>> {
	try {
		// Для клиентских компонентов нельзя использовать cookies() напрямую
		// Поэтому эта функция должна вызываться из серверного экшена

		const res = await fetch(`http://localhost:5000/api/admin/users/${userId}`, {
			method: "PATCH",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({ role: roleId }),
			credentials: "include", // Это передаст куки автоматически
		});

		const data = await res.json();

		if (isErrorResponse(data)) throw data;

		return { ok: true, ...data };
	} catch (err) {
		console.error("updateUserRole - error:", err);
		return { ok: false, ...(err as any) };
	}
}

