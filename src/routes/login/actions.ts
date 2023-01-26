import { PUBLIC_BASE_URL } from '$env/static/public';
import type { APIResponse, LoginResponse } from '$lib/types';
import { user, isLoggedIn } from '$lib/store';

export default async function _login(form: HTMLFormElement): Promise<APIResponse> {
	const credentials = new FormData(form);

	const res = await fetch(PUBLIC_BASE_URL + 'account/login/', {
		method: 'POST',
		body: credentials
	});

	if (res.status < 300) {
		await handelLogin(res);
		return { ok: true };
	} else {
		return { ok: false, data: await res.json() };
	}
}

async function handelLogin(res: Response): Promise<void> {
	const data = (await res.json()) as LoginResponse;
	localStorage.setItem('access', data.access);
	localStorage.setItem('refresh', data.refresh);
	localStorage.setItem('user', JSON.stringify(data.user));
	user.set(data.user);
	isLoggedIn.set(true);
}
