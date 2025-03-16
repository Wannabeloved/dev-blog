import PostContent from "./PostContent";

interface PageProps {
	params: Promise<{
		id: string;
	}>;
}

export default async function PostPage({ params }: PageProps) {
	const resolvedParams = await params;
	console.log("Server Component - params:", resolvedParams);
	return <PostContent postId={resolvedParams.id} />;
}

