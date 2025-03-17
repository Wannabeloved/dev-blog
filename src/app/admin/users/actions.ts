"use server";

import { cookies } from "next/headers";
import { User } from "@/core/2.application/use-cases/mongo/get-users";

export async function updateUserRoleAction(userId: string, roleId: number) {
	try {
		const cookieStore = await cookies();
		const token = cookieStore.get("token")?.value;

		if (!token) {
			return {
				ok: false,
				status: "error",
				message: "Необходима авторизация",
			};
		}

		const response = await fetch(
			`http://localhost:5000/api/admin/users/${userId}`,
			{
				method: "PATCH",
				headers: {
					"Content-Type": "application/json",
					Cookie: `token=${token}`,
				},
				body: JSON.stringify({ role: roleId }),
				credentials: "include",
			},
		);

		const data = await response.json();

		if (!response.ok) {
			return {
				ok: false,
				status: "error",
				message: data.message || "Ошибка при изменении роли пользователя",
			};
		}

		return {
			ok: true,
			status: "success",
			message: "Роль пользователя успешно изменена",
			data: data.data,
		};
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

export async function deleteUserAction(userId: string) {
	try {
		const cookieStore = await cookies();
		const token = cookieStore.get("token")?.value;

		if (!token) {
			return {
				ok: false,
				status: "error",
				message: "Необходима авторизация",
			};
		}

		const response = await fetch(
			`http://localhost:5000/api/admin/users/${userId}`,
			{
				method: "DELETE",
				headers: {
					Cookie: `token=${token}`,
				},
				credentials: "include",
			},
		);

		const data = await response.json();

		if (!response.ok) {
			return {
				ok: false,
				status: "error",
				message: data.message || "Ошибка при удалении пользователя",
			};
		}

		return {
			ok: true,
			status: "success",
			message: "Пользователь успешно удален",
		};
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

