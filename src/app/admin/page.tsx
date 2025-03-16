import { Metadata } from "next";
import Link from "next/link";
import { Users, Settings } from "lucide-react";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
	title: "Администрирование | Web Dev Blog",
	description: "Панель администрирования блога",
};

export default function AdminPage() {
	return (
		<div className="container mx-auto py-8">
			<h1 className="text-3xl font-bold mb-8">Панель администрирования</h1>

			<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
				<div className="bg-card rounded-lg shadow-md p-6 flex flex-col items-center">
					<div className="bg-primary/10 p-4 rounded-full mb-4">
						<Users className="h-8 w-8 text-primary" />
					</div>
					<h2 className="text-xl font-semibold mb-2">
						Управление пользователями
					</h2>
					<p className="text-muted-foreground text-center mb-4">
						Просмотр, редактирование ролей и удаление пользователей
					</p>
					<Button asChild className="mt-auto">
						<Link href="/admin/users">Перейти</Link>
					</Button>
				</div>

				<div className="bg-card rounded-lg shadow-md p-6 flex flex-col items-center">
					<div className="bg-primary/10 p-4 rounded-full mb-4">
						<Settings className="h-8 w-8 text-primary" />
					</div>
					<h2 className="text-xl font-semibold mb-2">Настройки сайта</h2>
					<p className="text-muted-foreground text-center mb-4">
						Управление настройками и конфигурацией блога
					</p>
					<Button asChild className="mt-auto" disabled>
						<Link href="#">Скоро</Link>
					</Button>
				</div>
			</div>
		</div>
	);
}

