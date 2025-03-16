import { ApiResponse } from "../../types/api";
import { del } from "../../utils/api";

/**
 * Удаляет пользователя
 */
export async function deleteUser(userId: string): Promise<ApiResponse<void>> {
	return del<void>(`/admin/users/${userId}`);
}

