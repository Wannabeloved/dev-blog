/**
 * Базовый интерфейс для всех ответов API
 */
export interface BaseResponse {
	ok: boolean;
}

/**
 * Интерфейс для ответов с ошибкой
 */
export interface ErrorResponse extends BaseResponse {
	status: "error";
	message: string;
}

/**
 * Интерфейс для успешных ответов
 */
export interface SuccessResponse<T = any> extends BaseResponse {
	status: "success";
	message: string;
	data: T;
}

/**
 * Тип для объединения успешного ответа и ответа с ошибкой
 */
export type ApiResponse<T = any> = SuccessResponse<T> | ErrorResponse;

/**
 * Проверяет, является ли ответ ошибкой
 */
export function isErrorResponse(data: any): data is ErrorResponse {
	return data && data.status === "error";
}

/**
 * Проверяет, является ли ответ успешным
 */
export function isSuccessResponse<T>(data: any): data is SuccessResponse<T> {
	return data && data.status === "success";
}

/**
 * Модели данных
 */

export interface User {
	id: string;
	email: string;
	roleId: number;
	createdAt: string;
}

export interface Role {
	id: number;
	name: string;
}

export interface Comment {
	id: string;
	content: string;
	author: string;
	publishedAt: string;
}

export interface Post {
	id: string;
	title: string;
	imageUrl: string;
	content: string;
	comments: Comment[];
	publishedAt: string;
}

