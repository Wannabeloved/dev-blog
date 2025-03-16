import { ApiResponse, Comment } from "../../types/api";
import { patch } from "../../utils/api";

/**
 * Редактирует комментарий к посту
 */
export async function editComment(
	postId: string,
	commentId: string,
	content: string,
): Promise<ApiResponse<Comment>> {
	return patch<Comment>(`/posts/${postId}/comments/${commentId}`, { content });
}

