import { ApiResponse, User } from "../../types/api";
import { get } from "../../utils/api";

/**
 * Получает список пользователей
 */
export async function getUsers(): Promise<ApiResponse<User[]>> {
	return get<User[]>("/admin/users");
}

