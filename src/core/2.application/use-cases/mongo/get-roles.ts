import { ApiResponse, Role } from "../../types/api";
import { get } from "../../utils/api";

/**
 * Получает список ролей пользователей
 */
export async function getRoles(): Promise<ApiResponse<Role[]>> {
	return get<Role[]>("/admin/roles");
}

