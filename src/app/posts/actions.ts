"use server";

import { createPost } from "@/core/2.application/use-cases/mongo/create-post";
import { redirect } from "next/navigation";
import { cookies } from "next/headers";
export async function createPostAction(formData: FormData) {
	try {
		const title = formData.get("title") as string;
		const content = formData.get("content") as string;
		const imageUrl = formData.get("imageUrl") as string;

		if (!title || !content || !imageUrl) {
			return {
				ok: false,
				message: "Все поля должны быть заполнены",
			};
		}
		const cookieStore = await cookies();
		const token = cookieStore.get("token")?.value;
		const response = await createPost({ title, content, imageUrl }, token);

		if (response.ok) {
			// Перенаправляем на страницу созданного поста
			redirect(`/posts/${response.data.id}`);
		}

		return response;
	} catch (error) {
		console.error("Ошибка при создании поста:", error);
		return {
			ok: false,
			message:
				error instanceof Error ? error.message : "Ошибка при создании поста",
		};
	}
}

