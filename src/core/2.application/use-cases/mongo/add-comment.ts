import { ApiResponse, isErrorResponse } from "../../types/api";
import { Comment } from "../../types/auth";

export async function addComment(
	postId: string,
	content: string,
): Promise<ApiResponse<Comment>> {
	try {
		const res = await fetch(
			`http://localhost:5000/api/posts/${postId}/comments`,
			{
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({ content }),
				credentials: "include",
			},
		);

		const data = await res.json();

		if (isErrorResponse(data)) throw data;

		return { ok: true, ...data };
	} catch (err) {
		console.error("addComment - error:", err);
		return { ok: false, ...(err as any) };
	}
}

