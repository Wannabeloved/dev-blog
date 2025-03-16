"use client";

import { useEffect, useState } from "react";
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";
import { getUsers } from "@/core/2.application/use-cases/mongo/get-users";
import { getRoles } from "@/core/2.application/use-cases/mongo/get-roles";
import { User, Role } from "@/core/2.application/types/api";
import { toast } from "sonner";
import { useUser } from "@/adapters/store/hooks/useUser";
import { updateUserRoleAction, deleteUserAction } from "./actions";
import { useRouter } from "next/navigation";

const dateFormatter = new Intl.DateTimeFormat("ru-RU", {
	year: "numeric",
	month: "long",
	day: "numeric",
	hour: "2-digit",
	minute: "2-digit",
});

export default function UserManagement() {
	const [users, setUsers] = useState<User[]>([]);
	const [roles, setRoles] = useState<Role[]>([]);
	const [isLoading, setIsLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);
	const [isProcessing, setIsProcessing] = useState<string | null>(null);
	const { user: currentUser } = useUser();
	const router = useRouter();

	const fetchData = async () => {
		try {
			setIsLoading(true);
			const [usersResponse, rolesResponse] = await Promise.all([
				getUsers(),
				getRoles(),
			]);

			if (!usersResponse.ok || usersResponse.status === "error") {
				throw new Error(
					usersResponse.message || "Ошибка при загрузке пользователей",
				);
			}

			if (!rolesResponse.ok || rolesResponse.status === "error") {
				throw new Error(rolesResponse.message || "Ошибка при загрузке ролей");
			}

			setUsers(usersResponse.data);
			setRoles(rolesResponse.data);
		} catch (err) {
			setError(
				err instanceof Error ? err.message : "Ошибка при загрузке данных",
			);
		} finally {
			setIsLoading(false);
		}
	};

	useEffect(() => {
		fetchData();
	}, []);

	const handleRoleChange = async (userId: string, newRoleIdStr: string) => {
		const newRoleId = parseInt(newRoleIdStr, 10);
		const user = users.find((u) => u.id === userId);

		if (!user) return;

		// Проверка на изменение роли между админ/модератор и обычный пользователь
		if (
			(user.roleId <= 1 && newRoleId > 1) ||
			(user.roleId > 1 && newRoleId <= 1)
		) {
			const confirmed = window.confirm(
				`Вы уверены, что хотите ${newRoleId <= 1 ? "повысить" : "понизить"} права пользователя ${user.email}?`,
			);
			if (!confirmed) return;
		}

		try {
			setIsProcessing(userId);
			console.log("Отправка запроса на изменение роли:", userId, newRoleId);
			const response = await updateUserRoleAction(userId, newRoleId);
			console.log("Ответ от сервера:", response);

			if (response.ok && response.status === "success") {
				toast.success("Роль изменена", {
					description: `Роль пользователя ${user.email} успешно изменена`,
				});

				// Обновляем список пользователей
				setUsers((prevUsers) =>
					prevUsers.map((u) =>
						u.id === userId ? { ...u, roleId: newRoleId } : u,
					),
				);

				// Обновляем страницу для получения актуальных данных
				router.refresh();
			} else {
				toast.error("Ошибка", {
					description:
						response.message || "Не удалось изменить роль пользователя",
				});
			}
		} catch (err) {
			console.error("Ошибка при изменении роли:", err);
			toast.error("Ошибка", {
				description:
					err instanceof Error
						? err.message
						: "Не удалось изменить роль пользователя",
			});
		} finally {
			setIsProcessing(null);
		}
	};

	const handleDeleteUser = async (userId: string) => {
		const user = users.find((u) => u.id === userId);
		if (!user) return;

		const confirmed = window.confirm(
			`Вы уверены, что хотите удалить пользователя ${user.email}?`,
		);
		if (!confirmed) return;

		try {
			setIsProcessing(userId);
			console.log("Отправка запроса на удаление пользователя:", userId);
			const response = await deleteUserAction(userId);
			console.log("Ответ от сервера:", response);

			if (response.ok && response.status === "success") {
				toast.success("Пользователь удален", {
					description: `Пользователь ${user.email} успешно удален`,
				});

				// Обновляем список пользователей
				setUsers((prevUsers) => prevUsers.filter((u) => u.id !== userId));

				// Обновляем страницу для получения актуальных данных
				router.refresh();
			} else {
				toast.error("Ошибка", {
					description: response.message || "Не удалось удалить пользователя",
				});
			}
		} catch (err) {
			console.error("Ошибка при удалении пользователя:", err);
			toast.error("Ошибка", {
				description:
					err instanceof Error
						? err.message
						: "Не удалось удалить пользователя",
			});
		} finally {
			setIsProcessing(null);
		}
	};

	if (isLoading) return <div className="text-center">Загрузка...</div>;
	if (error) return <div className="text-center text-red-500">{error}</div>;

	// Проверяем, является ли текущий пользователь админом
	const isAdmin = currentUser?.roleId === 0;

	return (
		<div className="rounded-md border">
			<Table>
				<TableHeader>
					<TableRow>
						<TableHead>Email</TableHead>
						<TableHead>Роль</TableHead>
						<TableHead>Дата регистрации</TableHead>
						{isAdmin && <TableHead className="w-[100px]">Действия</TableHead>}
					</TableRow>
				</TableHeader>
				<TableBody>
					{users.map((user) => (
						<TableRow key={user.id}>
							<TableCell>{user.email}</TableCell>
							<TableCell>
								<Select
									defaultValue={user.roleId.toString()}
									onValueChange={(value: string) =>
										handleRoleChange(user.id, value)
									}
									disabled={
										isProcessing === user.id || user.id === currentUser?.id
									}
								>
									<SelectTrigger className="w-[180px]">
										<SelectValue />
									</SelectTrigger>
									<SelectContent>
										{roles.map((role) => (
											<SelectItem key={role.id} value={role.id.toString()}>
												{role.name}
											</SelectItem>
										))}
									</SelectContent>
								</Select>
							</TableCell>
							<TableCell>
								{dateFormatter.format(new Date(user.createdAt))}
							</TableCell>
							{isAdmin && (
								<TableCell>
									<Button
										variant="ghost"
										size="icon"
										className="text-red-500 hover:text-red-700 hover:bg-red-50"
										onClick={() => handleDeleteUser(user.id)}
										disabled={
											isProcessing === user.id || user.id === currentUser?.id
										}
									>
										<Trash2 className="h-4 w-4" />
									</Button>
								</TableCell>
							)}
						</TableRow>
					))}
				</TableBody>
			</Table>
		</div>
	);
}

