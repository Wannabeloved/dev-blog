"use client";

import { getPost } from "@/core/2.application/use-cases/mongo/get-post";
import type {
	Comment,
	Post,
} from "@/core/2.application/use-cases/mongo/get-post";
import { notFound } from "next/navigation";
import { useEffect, useState, useTransition } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useUser } from "@/adapters/store/hooks/useUser";
import {
	addCommentAction,
	deleteCommentAction,
	deletePostAction,
	editCommentAction,
	updatePostAction,
} from "./actions";
import { useRouter } from "next/navigation";
import { Trash2, Pencil, Save, X } from "lucide-react";
import { Textarea } from "@/components/ui/textarea";

interface PostContentProps {
	postId: string;
}

export default function PostContent({ postId }: PostContentProps) {
	console.log("Client Component - received postId:", postId);
	const [post, setPost] = useState<Post | null>(null);
	const [isLoading, setIsLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);
	const [isPending, startTransition] = useTransition();
	const [editingCommentId, setEditingCommentId] = useState<string | null>(null);
	const [isEditingPost, setIsEditingPost] = useState(false);
	const [editedContent, setEditedContent] = useState("");
	const [editMessage, setEditMessage] = useState<{
		type: "success" | "error";
		text: string;
	} | null>(null);
	const [deleteMessage, setDeleteMessage] = useState<{
		type: "success" | "error";
		text: string;
	} | null>(null);
	const router = useRouter();
	const { user } = useUser();

	const fetchPost = async () => {
		try {
			console.log("Client Component - fetching post...");
			const response = await getPost(postId);
			console.log("Client Component - response:", response);

			if (!response.ok || response.status === "error") {
				throw new Error(response.message || "Ошибка при загрузке поста");
			}

			if (response.data) {
				console.log("Client Component - setting post:", response.data);
				setPost(response.data);
			} else {
				throw new Error("Данные поста не найдены");
			}
		} catch (err) {
			console.error("Client Component - error:", err);
			setError(
				err instanceof Error ? err.message : "Ошибка при загрузке поста",
			);
		} finally {
			setIsLoading(false);
		}
	};

	useEffect(() => {
		if (postId) {
			fetchPost();
		}
	}, [postId]);

	async function handleSubmitComment(formData: FormData) {
		startTransition(async () => {
			try {
				const response = await addCommentAction(postId, formData);
				if (response.status === "success") {
					// Очищаем форму
					const form = document.querySelector("form") as HTMLFormElement;
					form?.reset();
					// Обновляем данные
					router.refresh();
					await fetchPost();
				} else {
					setError(response.message);
				}
			} catch (err) {
				setError(
					err instanceof Error
						? err.message
						: "Ошибка при добавлении комментария",
				);
			}
		});
	}

	async function handleDeleteComment(commentId: string) {
		if (!confirm("Вы уверены, что хотите удалить этот комментарий?")) {
			return;
		}

		startTransition(async () => {
			try {
				const response = await deleteCommentAction(postId, commentId);
				if (response.status === "success") {
					router.refresh();
					await fetchPost();
				} else {
					setError(response.message);
				}
			} catch (err) {
				setError(
					err instanceof Error
						? err.message
						: "Ошибка при удалении комментария",
				);
			}
		});
	}

	async function handleEditComment(formData: FormData) {
		if (!editingCommentId) return;

		startTransition(async () => {
			try {
				const response = await editCommentAction(
					postId,
					editingCommentId,
					formData,
				);
				if (response.status === "success") {
					setEditingCommentId(null);
					router.refresh();
					await fetchPost();
				} else {
					setError(response.message);
				}
			} catch (err) {
				setError(
					err instanceof Error
						? err.message
						: "Ошибка при редактировании комментария",
				);
			}
		});
	}

	// Check if user can edit the post (only administrator with roleId: 0)
	const canEditPost = () => {
		if (!user) return false;

		// Only administrator can edit posts
		return user.roleId === 0;
	};

	const handleStartEditingPost = () => {
		setEditedContent(post?.content || "");
		setIsEditingPost(true);
	};

	const handleCancelEditingPost = () => {
		setIsEditingPost(false);
		setEditedContent("");
		setEditMessage(null);
	};

	const handleSavePost = async () => {
		if (!post) return;

		startTransition(async () => {
			try {
				const response = await updatePostAction(postId, editedContent);

				if (response.status === "success") {
					setPost(response.data);
					setIsEditingPost(false);
					setEditMessage({
						type: "success",
						text: "Статья успешно обновлена",
					});

					// Clear success message after 3 seconds
					setTimeout(() => {
						setEditMessage(null);
					}, 3000);

					router.refresh();
				} else {
					setEditMessage({
						type: "error",
						text: response.message,
					});
				}
			} catch (err) {
				setEditMessage({
					type: "error",
					text:
						err instanceof Error ? err.message : "Ошибка при обновлении статьи",
				});
			}
		});
	};

	const handleDeletePost = async () => {
		if (
			!confirm(
				"Вы уверены, что хотите удалить эту статью? Это действие нельзя отменить.",
			)
		) {
			return;
		}

		startTransition(async () => {
			try {
				const response = await deletePostAction(postId);

				if (response.status === "success") {
					setDeleteMessage({
						type: "success",
						text: "Статья успешно удалена",
					});

					// Redirect to home page after short delay
					setTimeout(() => {
						router.push("/");
					}, 2000);
				} else {
					setDeleteMessage({
						type: "error",
						text: response.message,
					});
				}
			} catch (err) {
				setDeleteMessage({
					type: "error",
					text:
						err instanceof Error ? err.message : "Ошибка при удалении статьи",
				});
			}
		});
	};

	if (isLoading) return <div className="text-center">Загрузка...</div>;
	if (error) return <div className="text-center text-red-500">{error}</div>;
	if (!post) return null;

	return (
		<article className="w-full mx-auto p-4">
			<h1 className="text-3xl font-bold mb-4">{post.title}</h1>
			<img
				src={post.imageUrl}
				alt={post.title}
				className="w-full h-auto rounded-lg mb-6"
			/>

			{editMessage && (
				<div
					className={`p-3 mb-4 rounded ${
						editMessage.type === "success"
							? "bg-green-100 text-green-700"
							: "bg-red-100 text-red-700"
					}`}
				>
					{editMessage.text}
				</div>
			)}

			{deleteMessage && (
				<div
					className={`p-3 mb-4 rounded ${
						deleteMessage.type === "success"
							? "bg-green-100 text-green-700"
							: "bg-red-100 text-red-700"
					}`}
				>
					{deleteMessage.text}
				</div>
			)}

			{canEditPost() && !isEditingPost && (
				<div className="mb-4 flex gap-2">
					<Button
						onClick={handleStartEditingPost}
						variant="outline"
						className="flex items-center gap-2"
					>
						<Pencil size={16} />
						Редактировать статью
					</Button>
					<Button
						onClick={handleDeletePost}
						variant="destructive"
						className="flex items-center gap-2"
						disabled={isPending}
					>
						<Trash2 size={16} />
						{isPending ? "Удаление..." : "Удалить статью"}
					</Button>
				</div>
			)}

			{isEditingPost ? (
				<div className="mb-6">
					<Textarea
						value={editedContent}
						onChange={(e) => setEditedContent(e.target.value)}
						className="min-h-[200px] mb-4"
						placeholder="Содержание статьи..."
						disabled={isPending}
					/>
					<div className="flex gap-2">
						<Button
							onClick={handleSavePost}
							disabled={isPending || !editedContent.trim()}
							className="flex items-center gap-2"
						>
							<Save size={16} />
							{isPending ? "Сохранение..." : "Сохранить изменения"}
						</Button>
						<Button
							onClick={handleCancelEditingPost}
							variant="outline"
							disabled={isPending}
							className="flex items-center gap-2"
						>
							<X size={16} />
							Отменить
						</Button>
					</div>
				</div>
			) : (
				<div className="prose max-w-none">{post.content}</div>
			)}

			<div className="mt-8">
				<h2 className="text-2xl font-semibold mb-4">Комментарии</h2>

				<form action={handleSubmitComment} className="mb-6">
					<div className="flex gap-2">
						<Input
							name="content"
							placeholder="Напишите комментарий..."
							disabled={isPending}
							className="flex-1"
							required
							minLength={1}
						/>
						<Button type="submit" disabled={isPending}>
							{isPending ? "Отправка..." : "Отправить"}
						</Button>
					</div>
				</form>

				{post.comments.length > 0 ? (
					<ul className="space-y-4">
						{post.comments.map((comment: Comment) => (
							<li key={comment.id} className="p-4 bg-gray-50 rounded-lg">
								<div className="flex justify-between items-start">
									<div className="flex-1">
										<h6 className="text-lg font-semibold mb-2">
											Автор: {comment.author}
										</h6>
										{editingCommentId === comment.id ? (
											<form action={handleEditComment} className="flex gap-2">
												<Input
													name="content"
													defaultValue={comment.content}
													disabled={isPending}
													className="flex-1"
													required
													minLength={1}
												/>
												<Button type="submit" disabled={isPending}>
													{isPending ? "Сохранение..." : "Сохранить"}
												</Button>
												<Button
													type="button"
													variant="outline"
													onClick={() => setEditingCommentId(null)}
													disabled={isPending}
												>
													Отмена
												</Button>
											</form>
										) : (
											<p>{comment.content}</p>
										)}
									</div>
									{user?.email === comment.author && (
										<div className="flex gap-2">
											<Button
												variant="ghost"
												size="icon"
												className="text-blue-500 hover:text-blue-700 hover:bg-blue-50"
												onClick={() => setEditingCommentId(comment.id)}
												disabled={isPending || editingCommentId === comment.id}
											>
												<Pencil className="h-4 w-4" />
											</Button>
											<Button
												variant="ghost"
												size="icon"
												className="text-red-500 hover:text-red-700 hover:bg-red-50"
												onClick={() => handleDeleteComment(comment.id)}
												disabled={isPending}
											>
												<Trash2 className="h-4 w-4" />
											</Button>
										</div>
									)}
								</div>
							</li>
						))}
					</ul>
				) : (
					<p className="text-gray-500">Пока нет комментариев</p>
				)}
			</div>
		</article>
	);
}

