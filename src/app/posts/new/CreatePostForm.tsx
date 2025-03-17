"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
	Card,
	CardContent,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { toast } from "sonner";
import Image from "next/image";
import { createPostAction } from "../actions";

export default function CreatePostForm() {
	const router = useRouter();
	const [title, setTitle] = useState("");
	const [content, setContent] = useState("");
	const [imageUrl, setImageUrl] = useState("");
	const [isSubmitting, setIsSubmitting] = useState(false);
	const [previewImage, setPreviewImage] = useState<string | null>(null);
	const [error, setError] = useState<string | null>(null);

	const handleImageUrlChange = (url: string) => {
		setImageUrl(url);
		if (url) {
			setPreviewImage(url);
		} else {
			setPreviewImage(null);
		}
	};

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		setIsSubmitting(true);
		setError(null);

		try {
			const formData = new FormData();
			formData.append("title", title);
			formData.append("content", content);
			formData.append("imageUrl", imageUrl);

			const response = await createPostAction(formData);

			if (!response.ok) {
				setError(response.message || "Ошибка при создании поста");
				toast.error("Ошибка", {
					description: response.message || "Не удалось создать пост",
				});
			}
		} catch (error) {
			console.error("Ошибка при отправке формы:", error);
			setError(
				error instanceof Error ? error.message : "Ошибка при создании поста",
			);
			toast.error("Ошибка", {
				description: "Не удалось создать пост",
			});
		} finally {
			setIsSubmitting(false);
		}
	};

	return (
		<Card className="w-full max-w-3xl mx-auto">
			<CardHeader>
				<CardTitle>Создание нового поста</CardTitle>
			</CardHeader>
			<CardContent>
				<form onSubmit={handleSubmit} className="space-y-6">
					<div className="space-y-2">
						<Label htmlFor="title">Заголовок</Label>
						<Input
							id="title"
							value={title}
							onChange={(e) => setTitle(e.target.value)}
							placeholder="Введите заголовок поста"
							required
						/>
					</div>

					<div className="space-y-2">
						<Label htmlFor="content">Содержание</Label>
						<Textarea
							id="content"
							value={content}
							onChange={(e) => setContent(e.target.value)}
							placeholder="Введите содержание поста"
							rows={10}
							required
						/>
					</div>

					<div className="space-y-2">
						<Label htmlFor="imageUrl">URL изображения</Label>
						<Input
							id="imageUrl"
							value={imageUrl}
							onChange={(e) => handleImageUrlChange(e.target.value)}
							placeholder="Введите URL изображения"
							required
						/>
					</div>

					{previewImage && (
						<div className="mt-4">
							<Label>Предпросмотр изображения</Label>
							<div className="relative w-full h-64 mt-2 border rounded-md overflow-hidden">
								<Image
									src={previewImage}
									alt="Предпросмотр"
									fill
									style={{ objectFit: "cover" }}
									onError={() => {
										setPreviewImage(null);
										toast.error("Ошибка загрузки изображения", {
											description:
												"Не удалось загрузить изображение по указанному URL",
										});
									}}
								/>
							</div>
						</div>
					)}

					{error && <div className="text-red-500 text-sm">{error}</div>}

					<CardFooter className="flex justify-end gap-2 px-0">
						<Button
							type="button"
							variant="outline"
							onClick={() => router.back()}
							disabled={isSubmitting}
						>
							Отмена
						</Button>
						<Button type="submit" disabled={isSubmitting}>
							{isSubmitting ? "Создание..." : "Создать пост"}
						</Button>
					</CardFooter>
				</form>
			</CardContent>
		</Card>
	);
}

