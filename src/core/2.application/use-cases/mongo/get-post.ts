import { ApiResponse, Post } from "../../types/api";
import { get } from "../../utils/api";

/**
 * Получает пост по идентификатору
 */
export async function getPost(id: string): Promise<ApiResponse<Post>> {
	console.log("getPost - id:", id);
	const response = await get<Post>(`/posts/${id}`);
	console.log("getPost - response:", response);
	return response;
}

