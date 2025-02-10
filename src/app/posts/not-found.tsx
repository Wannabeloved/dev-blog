import Link from "next/link";

const NotFound = () => {
	return (
		<div style={{ textAlign: "center", marginTop: "50px" }}>
			<h1>404 - Post Not Found</h1>
			<p>Sorry, the post you are looking for does not exist.</p>
			<Link href="/posts">Go back to Posts</Link>
		</div>
	);
};

export default NotFound;
