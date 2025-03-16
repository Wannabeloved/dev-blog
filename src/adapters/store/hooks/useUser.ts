import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "./index";
import { setUser, setLoading, setError, clearUser } from "../slices/user.slice";

export const useUser = () => {
	const dispatch = useAppDispatch();
	const { user, isLoading, error } = useAppSelector((state) => state.user);

	useEffect(() => {
		const fetchUser = async () => {
			if (user) return;

			try {
				dispatch(setLoading(true));
				const response = await fetch("http://localhost:5000/api/auth/me", {
					credentials: "include",
				});
				const data = await response.json();

				if (!response.ok) {
					throw new Error(data.message || "Ошибка при загрузке пользователя");
				}

				dispatch(setUser(data.user));
			} catch (err) {
				dispatch(
					setError(err instanceof Error ? err.message : "Неизвестная ошибка"),
				);
			} finally {
				dispatch(setLoading(false));
			}
		};

		fetchUser();
	}, [dispatch]);

	const logout = async () => {
		try {
			await fetch("http://localhost:5000/api/auth/logout", {
				method: "POST",
				credentials: "include",
			});
			dispatch(clearUser());
		} catch (err) {
			console.error("Ошибка при выходе:", err);
		}
	};

	return { user, isLoading, error, logout };
};

