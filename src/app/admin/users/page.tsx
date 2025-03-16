import { Metadata } from "next";
import UserManagement from "./UserManagement";

export const metadata: Metadata = {
	title: "Управление пользователями | Web Dev Blog",
	description: "Страница администрирования пользователей",
};

export default function AdminUsersPage() {
	return (
		<div className="container mx-auto py-8">
			<h1 className="text-3xl font-bold mb-8">Управление пользователями</h1>
			<UserManagement />
		</div>
	);
}

