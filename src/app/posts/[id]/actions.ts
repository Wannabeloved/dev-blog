"use server";

import { cookies } from "next/headers";
import { ApiResponse, Comment, Post } from "@/core/2.application/types/api";
import { addComment } from "@/core/2.application/use-cases/mongo/add-comment";
import { deleteComment } from "@/core/2.application/use-cases/mongo/delete-comment";
import { editComment } from "@/core/2.application/use-cases/mongo/edit-comment";
import { updatePost } from "@/core/2.application/use-cases/mongo/update-post";
import { deletePost } from "@/core/2.application/use-cases/mongo/delete-post";

/**
 * Серверное действие для добавления комментария
 */
export async function addCommentAction(
	postId: string,
	formData: FormData,
): Promise<ApiResponse<Comment>> {
	try {
		const content = formData.get("content");
		const cookieStore = await cookies();
		const token = cookieStore.get("token")?.value;

		if (!token) {
			return {
				ok: false,
				status: "error",
				message: "Необходима авторизация",
			};
		}

		if (!content || typeof content !== "string") {
			return {
				ok: false,
				status: "error",
				message: "Комментарий не может быть пустым",
			};
		}

		return await addComment(postId, content);
	} catch (error) {
		return {
			ok: false,
			status: "error",
			message:
				error instanceof Error
					? error.message
					: "Ошибка при добавлении комментария",
		};
	}
}

/**
 * Серверное действие для удаления комментария
 */
export async function deleteCommentAction(
	postId: string,
	commentId: string,
): Promise<ApiResponse<void>> {
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

		return await deleteComment(postId, commentId);
	} catch (error) {
		return {
			ok: false,
			status: "error",
			message:
				error instanceof Error
					? error.message
					: "Ошибка при удалении комментария",
		};
	}
}

/**
 * Серверное действие для редактирования комментария
 */
export async function editCommentAction(
	postId: string,
	commentId: string,
	formData: FormData,
): Promise<ApiResponse<Comment>> {
	try {
		const content = formData.get("content");
		const cookieStore = await cookies();
		const token = cookieStore.get("token")?.value;

		if (!token) {
			return {
				ok: false,
				status: "error",
				message: "Необходима авторизация",
			};
		}

		if (!content || typeof content !== "string") {
			return {
				ok: false,
				status: "error",
				message: "Комментарий не может быть пустым",
			};
		}

		return await editComment(postId, commentId, content);
	} catch (error) {
		return {
			ok: false,
			status: "error",
			message:
				error instanceof Error
					? error.message
					: "Ошибка при редактировании комментария",
		};
	}
}

/**
 * Серверное действие для обновления поста
 */
export async function updatePostAction(
	postId: string,
	content: string,
): Promise<ApiResponse<Post>> {
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

		if (!content || typeof content !== "string") {
			return {
				ok: false,
				status: "error",
				message: "Содержимое статьи не может быть пустым",
			};
		}

		return await updatePost(postId, content);
	} catch (error) {
		return {
			ok: false,
			status: "error",
			message:
				error instanceof Error ? error.message : "Ошибка при обновлении статьи",
		};
	}
}

/**
 * Серверное действие для удаления поста
 */
export async function deletePostAction(
	postId: string,
): Promise<ApiResponse<void>> {
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

		return await deletePost(postId);
	} catch (error) {
		return {
			ok: false,
			status: "error",
			message:
				error instanceof Error ? error.message : "Ошибка при удалении статьи",
		};
	}
}

