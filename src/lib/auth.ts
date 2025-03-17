"use server";

import { cookies } from "next/headers";

export async function getUserRole(): Promise<number | null> {
	try {
		const cookiesList = await cookies();
		const token = cookiesList.get("token")?.value;

		if (!token) {
			return null;
		}

		const response = await fetch("http://localhost:5000/api/auth/me", {
			headers: {
				Cookie: `token=${token}`,
			},
			credentials: "include",
		});

		if (!response.ok) {
			return null;
		}

		const data = await response.json();
		return data.data?.roleId ?? null;
	} catch (error) {
		console.error("Ошибка при получении данных пользователя:", error);
		return null;
	}
}

export async function isAdmin(roleId: number | null): boolean {
	return roleId === 0;
}

