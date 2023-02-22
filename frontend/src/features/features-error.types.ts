export enum ErrorCode {
	UNAUTHORIZED = 401,
	FORBIDDEN = 403,
	NOT_FOUND = 404,
	INTERNAL_SERVER_ERROR = 500
}

export type ResponseData = {
	message?: string;
	error?: string;
}

export type ErrorResponse = {
	data?: ResponseData;
	status?: number;
	statusText?: string;
	headers?: unknown;
	config?: unknown;
	request?: unknown;
}

// typescript interface for axios error
export interface AxiosError {
	config?: unknown;
	code?: string;
	request?: unknown;
	response?: ErrorResponse;
	isAxiosError?: boolean;
	toJSON?: () => object;
	message?: string;
	status?: number;
}
