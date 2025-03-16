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
	return (
		<div className="grid grid-cols-1 gap-1.5 p-4 max-w-4xl mx-auto">
			{posts && posts.length > 0 ? (
				posts.map((post, index) => (
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
