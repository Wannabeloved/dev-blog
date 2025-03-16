import { auth } from "@/core/interface-adapters/auth/auth";
import PostsList from "@/components/posts-list";
import PostsPagination from "@/components/posts-pagination";
import { Post } from "@/core/2.application/types/api";

const PostsPage: React.FC = async () => {
	const session = await auth();

	// Создаем тестовые данные, соответствующие типу Post
	const testPosts: Post[] = [
		{
			id: "1",
			title: "Title1",
			content: "Content1",
			imageUrl: "/placeholder-image.svg",
			comments: [],
			publishedAt: new Date().toISOString(),
		},
		{
			id: "2",
			title: "Title2",
			content: "Content2",
			imageUrl: "/placeholder-image.svg",
			comments: [],
			publishedAt: new Date().toISOString(),
		},
		{
			id: "3",
			title: "Title3",
			content: "Content3",
			imageUrl: "/placeholder-image.svg",
			comments: [],
			publishedAt: new Date().toISOString(),
		},
	];

	return (
		<div>
			<h1>Posts</h1>
			<pre>{JSON.stringify(session, null, 2)}</pre>
			<PostsList posts={testPosts} />
			<PostsPagination />
		</div>
	);
};

export default PostsPage;

