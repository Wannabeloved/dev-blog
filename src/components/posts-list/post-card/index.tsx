import Image from "next/image";
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "../../shared/vertical-card";
import Link from "next/link";
import { Calendar, MessageCircle } from "lucide-react";

interface Props {
	title: React.ReactNode;
	description?: React.ReactNode;
	imageUrl: string;
	comments?: { id: string }[];
	publishedAt: string;
	id: string | number;
}

const PostCard = ({
	title,
	imageUrl,
	description,
	comments = [],
	publishedAt,
	id,
}: Props) => {
	// Форматирование даты с обработкой ошибок
	let formattedDate = publishedAt;
	try {
		if (publishedAt) {
			formattedDate = new Date(publishedAt).toLocaleDateString("ru-RU", {
				day: "numeric",
				month: "long",
				year: "numeric",
			});
		}
	} catch (error) {
		console.error("Ошибка форматирования даты:", error);
	}

	return (
		<Link href={`/posts/${id}`}>
			<Card className="grid grid-cols-[2fr_1fr] grid-rows-[20px_100px_50px] gap-1.5 p-4">
				<CardHeader className="p-0"></CardHeader>
				<CardContent className="grid grid-rows-[4fr_3fr] p-0">
					<CardTitle className="p-0">{title}</CardTitle>
					<CardDescription className="p-0">{description}</CardDescription>
				</CardContent>
				<div className="flex items-center gap-4 text-muted-foreground text-sm">
					<div className="flex items-center gap-1">
						<Calendar className="h-4 w-4" />
						<span>{formattedDate}</span>
					</div>
					<div className="flex items-center gap-1">
						<MessageCircle className="h-4 w-4" />
						<span>{comments.length}</span>
					</div>
				</div>
				<CardFooter className="row-span-full col-end-3 flex items-center justify-center rounded-2xl p-0">
					<Image
						src={imageUrl}
						alt={typeof title === "string" ? title : "Post image"}
						layout="responsive"
						objectFit="cover"
						className="rounded-xl"
						width={100}
						height={100}
					/>
				</CardFooter>
			</Card>
		</Link>
	);
};
export default PostCard;
