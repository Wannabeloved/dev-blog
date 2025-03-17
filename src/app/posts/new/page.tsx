import { Metadata } from "next";
import { redirect } from "next/navigation";
import CreatePostForm from "./CreatePostForm";
import { getUserRole, isAdmin } from "@/lib/auth";

export const metadata: Metadata = {
	title: "Создание нового поста | Web Dev Blog",
	description: "Создайте новый пост для блога",
};

export default async function NewPostPage() {
	const roleId = await getUserRole();

	// Если пользователь не админ, перенаправляем на главную
	if (!isAdmin(roleId)) {
		redirect("/");
	}

	return (
		<div className="container mx-auto py-8">
			<h1 className="text-3xl font-bold mb-8 text-center">
				Создание нового поста
			</h1>
			<CreatePostForm />
		</div>
	);
}

