import { ApiResponse, User } from "../../types/api";
import { patch } from "../../utils/api";

/**
 * Обновляет роль пользователя
 */
export async function updateUserRole(
	userId: string,
	roleId: number,
): Promise<ApiResponse<User>> {
	return patch<User>(`/admin/users/${userId}`, { role: roleId });
}

