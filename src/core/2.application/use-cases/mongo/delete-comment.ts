import { ApiResponse } from "../../types/api";
import { del } from "../../utils/api";

/**
 * Удаляет комментарий к посту
 */
export async function deleteComment(
	postId: string,
	commentId: string,
): Promise<ApiResponse<void>> {
	return del<void>(`/posts/${postId}/comments/${commentId}`);
}

