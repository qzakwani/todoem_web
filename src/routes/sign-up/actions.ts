import { PUBLIC_BASE_URL } from '$env/static/public';
import type { APIResponse } from '$lib/types';

export default async function _signUp(form: HTMLFormElement): Promise<APIResponse> {
	const credentials = new FormData(form);

	const res = await fetch(PUBLIC_BASE_URL + 'account/sign-up/', {
		method: 'POST',
		body: credentials
	});

	if (res.status < 300) {
		return { ok: true };
	} else {
		return { ok: false, data: await res.json() };
	}
}
