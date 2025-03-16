"use server";

import { cookies } from "next/headers";
import { ApiResponse, User } from "@/core/2.application/types/api";
import { updateUserRole } from "@/core/2.application/use-cases/mongo/update-user-role";
import { deleteUser } from "@/core/2.application/use-cases/mongo/delete-user";

/**
 * Серверное действие для обновления роли пользователя
 */
export async function updateUserRoleAction(
	userId: string,
	roleId: number,
): Promise<ApiResponse<User>> {
	try {
		// Проверяем наличие токена
		const cookieStore = await cookies();
		const token = cookieStore.get("token")?.value;

		if (!token) {
			return {
				ok: false,
				status: "error",
				message: "Необходима авторизация",
			};
		}

		// Используем функцию из core слоя
		return await updateUserRole(userId, roleId);
	} catch (error) {
		return {
			ok: false,
			status: "error",
			message:
				error instanceof Error
					? error.message
					: "Ошибка при изменении роли пользователя",
		};
	}
}

/**
 * Серверное действие для удаления пользователя
 */
export async function deleteUserAction(
	userId: string,
): Promise<ApiResponse<void>> {
	try {
		// Проверяем наличие токена
		const cookieStore = await cookies();
		const token = cookieStore.get("token")?.value;

		if (!token) {
			return {
				ok: false,
				status: "error",
				message: "Необходима авторизация",
			};
		}

		// Используем функцию из core слоя
		return await deleteUser(userId);
	} catch (error) {
		return {
			ok: false,
			status: "error",
			message:
				error instanceof Error
					? error.message
					: "Ошибка при удалении пользователя",
		};
	}
}

