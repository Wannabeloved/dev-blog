import { ApiResponse, Post, isSuccessResponse } from "../../types/api";
import { get } from "../../utils/api";

interface PostsResponse {
	posts: Post[];
	lastPage: number;
}

/**
 * Получает список постов с пагинацией и поиском
 */
export async function getPosts(
	page: number = 1,
	search: string = "",
	limit: number = 9,
): Promise<PostsResponse> {
	const params: Record<string, string> = {
		page: page.toString(),
		limit: limit.toString(),
	};

	if (search) {
		params.search = search;
	}

	const response = await get<PostsResponse>("/posts", params);

	if (!response.ok) {
		throw new Error(response.message || "Не удалось загрузить посты");
	}

	if (!isSuccessResponse<PostsResponse>(response)) {
		throw new Error("Неверный формат ответа от сервера");
	}

	return response.data;
}

