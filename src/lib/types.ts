import type * as Model from './models';

export interface APIResponse {
	ok: boolean;
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	data?: AuthError | APIError | FieldError[] | Record<string, string | number> | any;
}

export interface APIError {
	message: string;
}

export interface FieldError {
	[index: string]: string;
}

export class AuthError {}

export interface LoginResponse {
	refresh: string;
	access: string;
	user: Model.User;
}

export interface RefreshResponse {
	access: string;
	refresh: string;
}

export interface Credentials {
	access: string;
	refresh: string;
	uid: string;
}

export type AuthAction = <Type>(data: Type, attempts: number) => Promise<APIResponse>;
