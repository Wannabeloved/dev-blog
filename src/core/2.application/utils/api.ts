import { ApiResponse, ErrorResponse, isErrorResponse } from "../types/api";

const API_BASE_URL = "http://localhost:5000/api";

interface FetchOptions extends RequestInit {
	params?: Record<string, string>;
}

/**
 * Базовая функция для выполнения запросов к API
 */
export async function fetchApi<T = any>(
	endpoint: string,
	options: FetchOptions = {},
): Promise<ApiResponse<T>> {
	try {
		const { params, ...fetchOptions } = options;

		// Добавляем параметры запроса, если они есть
		let url = `${API_BASE_URL}${endpoint}`;
		if (params) {
			const searchParams = new URLSearchParams();
			Object.entries(params).forEach(([key, value]) => {
				searchParams.append(key, value);
			});
			url += `?${searchParams.toString()}`;
		}

		// Всегда включаем куки для аутентификации
		const defaultOptions: RequestInit = {
			credentials: "include",
		};

		const response = await fetch(url, { ...defaultOptions, ...fetchOptions });
		const data = await response.json();

		if (!response.ok) {
			return {
				ok: false,
				status: "error",
				message:
					data.message || `Ошибка ${response.status}: ${response.statusText}`,
			};
		}

		return { ok: true, ...data };
	} catch (error) {
		console.error(`API Error (${endpoint}):`, error);
		return {
			ok: false,
			status: "error",
			message:
				error instanceof Error
					? error.message
					: "Неизвестная ошибка при запросе к API",
		};
	}
}

/**
 * Функция для выполнения GET-запросов
 */
export function get<T = any>(
	endpoint: string,
	params?: Record<string, string>,
): Promise<ApiResponse<T>> {
	return fetchApi<T>(endpoint, { method: "GET", params });
}

/**
 * Функция для выполнения POST-запросов
 */
export function post<T = any>(
	endpoint: string,
	data?: any,
): Promise<ApiResponse<T>> {
	return fetchApi<T>(endpoint, {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: data ? JSON.stringify(data) : undefined,
	});
}

/**
 * Функция для выполнения PATCH-запросов
 */
export function patch<T = any>(
	endpoint: string,
	data?: any,
): Promise<ApiResponse<T>> {
	return fetchApi<T>(endpoint, {
		method: "PATCH",
		headers: {
			"Content-Type": "application/json",
		},
		body: data ? JSON.stringify(data) : undefined,
	});
}

/**
 * Функция для выполнения DELETE-запросов
 */
export function del<T = any>(endpoint: string): Promise<ApiResponse<T>> {
	return fetchApi<T>(endpoint, { method: "DELETE" });
}

