import { ApiResponse, isErrorResponse } from "../../types/api";

interface Post {
	id: string;
	title: string;
	content: string;
	imageUrl: string;
	comments: {
		id: string;
		content: string;
		author: string;
		publishedAt: string;
	}[];
	publishedAt: string;
}

interface CreatePostData {
	title: string;
	content: string;
	imageUrl: string;
}

export async function createPost(
	postData: CreatePostData,
	token: string,
): Promise<ApiResponse<Post>> {
	try {
		const res = await fetch("http://localhost:5000/api/posts/create", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
				Cookie: `token=${token}`,
			},
			body: JSON.stringify(postData),
			credentials: "include",
		});

		const data = await res.json();

		if (isErrorResponse(data)) throw data;

		return { ok: true, ...data };
	} catch (err) {
		console.error("createPost - error:", err);
		return { ok: false, ...(err as any) };
	}
}

