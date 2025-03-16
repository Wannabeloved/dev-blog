import { ApiResponse, User } from "../../types/api";
import { post } from "../../utils/api";

interface SignInData {
	email: string;
	password: string;
}

/**
 * Авторизация пользователя
 */
export async function signIn(data: SignInData): Promise<ApiResponse<User>> {
	return post<User>("/auth/sign-in", data);
}

