import { ApiResponse, Post } from "../../types/api";
import { patch } from "../../utils/api";

/**
 * Обновляет содержимое поста
 */
export async function updatePost(
	postId: string,
	content: string,
): Promise<ApiResponse<Post>> {
	return patch<Post>(`/posts/update/${postId}`, { content });
}

