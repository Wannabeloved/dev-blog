import { auth } from "@/core/interface-adapters/auth/auth";
import PostsList from "@/components/posts-list";
import PostsPagination from "@/components/posts-pagination";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { getUserRole, isAdmin } from "@/lib/auth";

const PostsPage: React.FC = async () => {
	// const session = await auth();
	const roleId = await getUserRole();

	// Создаем тестовые данные с правильной структурой
	const mockPosts = [
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
		{
			id: "4",
			title: "Title4",
			content: "Content4",
			imageUrl: "/placeholder-image.svg",
			comments: [],
			publishedAt: new Date().toISOString(),
		},
		{
			id: "5",
			title: "Title5",
			content: "Content5",
			imageUrl: "/placeholder-image.svg",
			comments: [],
			publishedAt: new Date().toISOString(),
		},
	];

	return (
		<div className="container mx-auto py-8">
			<div className="flex justify-between items-center mb-8">
				<h1 className="text-3xl font-bold">Посты</h1>
				{isAdmin(roleId) && (
					<Button asChild>
						<Link href="/posts/new">Создать пост</Link>
					</Button>
				)}
			</div>
			<PostsList posts={mockPosts} />
			<PostsPagination />
		</div>
	);
};

export default PostsPage;

