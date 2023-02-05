import { authAction, handelUnsuccessfulResponse } from '$lib/actions';
import type { APIResponse } from '$lib/types';

export async function _findListers<Type>(data?: Type, attempts = 0): Promise<APIResponse> {
	const res = await authAction('lister/search/', 'POST', data as FormData);
	if (res && res.status < 300) {
		return { ok: true, data: await res.json() };
	} else {
		return await handelUnsuccessfulResponse(res, _findListers, attempts, data);
	}
}

export async function _sendConnectionRequest<Type>(
	data?: Type,
	attempts = 0
): Promise<APIResponse> {
	const res = await authAction('lister/connection-request/' + data + '/', 'POST');
	if (res && res.status < 300) {
		return { ok: true };
	} else {
		return await handelUnsuccessfulResponse(res, _sendConnectionRequest, attempts, data);
	}
}
