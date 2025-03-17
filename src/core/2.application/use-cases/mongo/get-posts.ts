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

interface PostsResponse {
	posts: Post[];
	lastPage: number;
}

export async function getPosts(page = 1, search = ""): Promise<PostsResponse> {
	try {
		const url = new URL("http://localhost:5000/api/posts");
		url.searchParams.append("page", page.toString());
		if (search?.length > 0) url.searchParams.append("search", search);

		const res = await fetch(url.toString(), {
			method: "GET",
			credentials: "include",
		});

		const data = (await res.json()) as PostsResponse;
		console.log("data: ", data);
		if (isErrorResponse(data)) {
			throw new Error(data.message);
		}

		return data;
	} catch (err) {
		console.error("getPosts - error:", err);
		return { posts: [], lastPage: 1 };
	}
}

