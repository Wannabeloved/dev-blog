"use server";

import { cookies } from "next/headers";

export async function addCommentAction(postId: string, formData: FormData) {
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

		const response = await fetch(
			`http://localhost:5000/api/posts/${postId}/comments`,
			{
				method: "POST",
				headers: {
					"Content-Type": "application/json",
					Cookie: `token=${token}`,
				},
				credentials: "include",
				body: JSON.stringify({ content }),
			},
		);

		const data = await response.json();

		if (!response.ok) {
			return {
				ok: false,
				status: "error",
				message: data.message || "Ошибка при добавлении комментария",
			};
		}

		return {
			ok: true,
			status: "success",
			message: "Комментарий успешно добавлен",
			data: data.data,
		};
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

export async function deleteCommentAction(postId: string, commentId: string) {
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
			`http://localhost:5000/api/posts/${postId}/comments/${commentId}`,
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
				message: data.message || "Ошибка при удалении комментария",
			};
		}

		return {
			ok: true,
			status: "success",
			message: data.data || "Комментарий успешно удален",
		};
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

export async function editCommentAction(
	postId: string,
	commentId: string,
	formData: FormData,
) {
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

		const response = await fetch(
			`http://localhost:5000/api/posts/${postId}/comments/${commentId}`,
			{
				method: "PATCH",
				headers: {
					"Content-Type": "application/json",
					Cookie: `token=${token}`,
				},
				credentials: "include",
				body: JSON.stringify({ content }),
			},
		);

		const data = await response.json();

		if (!response.ok) {
			return {
				ok: false,
				status: "error",
				message: data.message || "Ошибка при редактировании комментария",
			};
		}

		return {
			ok: true,
			status: "success",
			message: "Комментарий успешно отредактирован",
			data: data.data,
		};
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

export async function updatePostAction(postId: string, content: string) {
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

		const response = await fetch(
			`http://localhost:5000/api/posts/update/${postId}`,
			{
				method: "PATCH",
				headers: {
					"Content-Type": "application/json",
					Cookie: `token=${token}`,
				},
				credentials: "include",
				body: JSON.stringify({ content }),
			},
		);

		const data = await response.json();
		console.log("data: ", data);
		if (!response.ok) {
			return {
				ok: false,
				status: "error",
				message: data.message || "Ошибка при обновлении статьи",
			};
		}

		return {
			ok: true,
			status: "success",
			message: "Статья успешно обновлена",
			data: data.data,
		};
	} catch (error) {
		return {
			ok: false,
			status: "error",
			message:
				error instanceof Error ? error.message : "Ошибка при обновлении статьи",
		};
	}
}

export async function deletePostAction(postId: string) {
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
			`http://localhost:5000/api/posts/delete/${postId}`,
			{
				method: "DELETE",
				headers: {
					Cookie: `token=${token}`,
				},
				credentials: "include",
			},
		);

		const data = await response.json();

		if (!response.ok || data.status === "error") {
			return {
				ok: false,
				status: "error",
				message: "Ошибка при удалении статьи",
			};
		}

		return {
			ok: true,
			status: "success",
			message: "Статья успешно удалена",
		};
	} catch (error) {
		return {
			ok: false,
			status: "error",
			message:
				error instanceof Error ? error.message : "Ошибка при удалении статьи",
		};
	}
}

