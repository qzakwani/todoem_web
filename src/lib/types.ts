import type * as Model from './models';

export interface APIResponse {
	ok: boolean;
	data?: object;
}

export interface LoginResponse {
	refresh: string;
	access: string;
	user: Model.User;
}

export interface RefreshResponse {
	access: string;
	refresh: string;
}
