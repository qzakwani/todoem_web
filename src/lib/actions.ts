import { PUBLIC_BASE_URL } from '$env/static/public';
import { isLoggedIn, user, credentials } from './store';
import type { RefreshResponse, AuthAction, APIResponse } from './types';

import { get } from 'svelte/store';

const uid = get(credentials)?.uid as string; //todo add || getUser

export async function _logout(): Promise<boolean> {
	try {
		localStorage.removeItem('access');
		localStorage.removeItem('refresh');
		localStorage.removeItem('user');
		user.set(null);
		isLoggedIn.set(false);
		return true;
	} catch (error) {
		return false;
	}
}

export async function _refresh<Type>(action: AuthAction, data?: Type): Promise<APIResponse> {
	const token = localStorage.getItem('refresh');
	if (!token) {
		await _logout();
		return { ok: false, data: { message: 'logged out!' } };
	}
	const res = await fetch(PUBLIC_BASE_URL + '/account/login/refresh/', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify({ refresh: token })
	});

	if (res.status < 300) {
		const r = (await res.json()) as RefreshResponse;
		localStorage.setItem('access', r.access);
		localStorage.setItem('refresh', r.refresh);
		credentials.set({ access: r.access, refresh: r.refresh, uid: uid });
		return await action(data, 1);
	} else {
		await _logout();
		return { ok: false, data: { message: 'logged out!' } };
	}
}

export async function authAction(
	path: string,
	method: string,
	body?: string | FormData
): Promise<Response | null> {
	try {
		const res = await fetch(PUBLIC_BASE_URL + path, {
			method: method,
			headers: {
				Authorization: 'Bearer ' + get(credentials)?.access
			},
			body: body || null
		});
		return res;
	} catch (error) {
		return null;
	}
}

export async function handelUnsuccessfulResponse<Type>(
	res: Response | null,
	action: AuthAction,
	attempts: number,
	data?: Type
): Promise<APIResponse> {
	if (res && res.status === 401 && attempts === 0) {
		return await _refresh(action, data);
	} else if (res) {
		return { ok: false, data: await res.json() };
	} else {
		return { ok: false, data: 'client' };
	}
}
