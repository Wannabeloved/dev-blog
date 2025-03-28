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

export async function getPost(id: string): Promise<ApiResponse<Post>> {
	try {
		console.log("Fetching post with id:", id);
		const res = await fetch(`http://localhost:5000/api/posts/${id}`, {
			method: "GET",
			credentials: "include",
		});
		const data = await res.json();
		console.log("data:", data);
		console.log("API response:", data);

		if (isErrorResponse(data)) throw data;

		return { ok: true, ...data };
	} catch (err) {
		console.error("getPost - error:", err);
		return { ok: false, ...(err as any) };
	}
}

