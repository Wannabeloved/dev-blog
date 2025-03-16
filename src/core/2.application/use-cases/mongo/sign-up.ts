import { ApiResponse, User } from "../../types/api";
import { post } from "../../utils/api";

interface SignUpData {
	email: string;
	password: string;
}

/**
 * Регистрация нового пользователя
 */
export async function signUp(data: SignUpData): Promise<ApiResponse<User>> {
	return post<User>("/auth/sign-up", data);
}

