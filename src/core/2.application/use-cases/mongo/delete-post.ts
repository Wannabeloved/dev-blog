import { ApiResponse } from "../../types/api";
import { del } from "../../utils/api";

/**
 * Удаляет пост
 */
export async function deletePost(postId: string): Promise<ApiResponse<void>> {
	return del<void>(`/posts/${postId}`);
}

