import { ApiResponse, Comment } from "../../types/api";
import { post } from "../../utils/api";

/**
 * Добавляет комментарий к посту
 */
export async function addComment(
	postId: string,
	content: string,
): Promise<ApiResponse<Comment>> {
	return post<Comment>(`/posts/${postId}/comments`, { content });
}

