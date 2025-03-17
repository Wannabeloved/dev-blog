import PostCard from "./post-card";

interface Post {
	id: string | number;
	title: string;
	content: string;
	imageUrl: string;
	comments: { id: string }[];
	publishedAt: string;
}

interface Props {
	posts: Post[];
}

const PostsList = ({ posts }: Props) => {
	// Сортируем посты по дате публикации (самые новые сверху)
	const sortedPosts = [...posts].sort((a, b) => {
		const dateA = new Date(a.publishedAt).getTime();
		const dateB = new Date(b.publishedAt).getTime();
		return dateB - dateA; // Обратный порядок (от новых к старым)
	});

	return (
		<div className="grid grid-cols-1 gap-1.5 p-4 max-w-4xl mx-auto">
			{sortedPosts && sortedPosts.length > 0 ? (
				sortedPosts.map((post, index) => (
					<PostCard
						key={`post-${index}_${post.title}`}
						id={post.id}
						title={post.title}
						imageUrl={post.imageUrl || "/placeholder-image.svg"}
						comments={post.comments}
						publishedAt={post.publishedAt}
						description={post.content}
					/>
				))
			) : (
				<div>Нет постов</div>
			)}
		</div>
	);
};

export default PostsList;
