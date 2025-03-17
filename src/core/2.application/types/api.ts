export interface BaseResponse {
	ok: boolean;
}

export interface ErrorResponse {
	status: "error";
	message: string;
}

export interface SuccessResponse<T = any> {
	status: "success";
	message: string;
	data: T;
}

export type ApiResponse<T = any> = BaseResponse &
	(SuccessResponse<T> | ErrorResponse);

export function isErrorResponse(data: any): data is ErrorResponse {
	return data.status === "error";
}

