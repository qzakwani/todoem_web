import { authAction, handelUnsuccessfulResponse } from '$lib/actions';
import type { APIResponse } from '$lib/types';

export async function _findListers<Type>(data?: Type, attempts = 0): Promise<APIResponse> {
	const d = data as { search: FormData; page: number };
	const res = await authAction('lister/search/?page=' + d.page.toString(), 'POST', d.search);
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

export async function _getConnStatus<Type>(data?: Type, attempts = 0): Promise<APIResponse> {
	const res = await authAction('lister/connection-status/' + data + '/', 'GET');
	if (res && res.status < 300) {
		return { ok: true, data: await res.json() };
	} else {
		return await handelUnsuccessfulResponse(res, _getConnStatus, attempts, data);
	}
}

export async function _getLister<Type>(data?: Type, attempts = 0): Promise<APIResponse> {
	const res = await authAction('lister/' + data + '/', 'GET');
	if (res && res.status < 300) {
		return { ok: true, data: await res.json() };
	} else {
		return await handelUnsuccessfulResponse(res, _getLister, attempts, data);
	}
}

export async function _acceptConnRequest<Type>(data?: Type, attempts = 0): Promise<APIResponse> {
	const res = await authAction('lister/connection-accept/' + data + '/', 'POST');
	if (res && res.status < 300) {
		return { ok: true };
	} else {
		return await handelUnsuccessfulResponse(res, _acceptConnRequest, attempts, data);
	}
}

export async function _rejectConnRequest<Type>(data?: Type, attempts = 0): Promise<APIResponse> {
	const res = await authAction('lister/connection-reject/' + data + '/', 'POST');
	if (res && res.status < 300) {
		return { ok: true };
	} else {
		return await handelUnsuccessfulResponse(res, _rejectConnRequest, attempts, data);
	}
}

export async function _cancelConnRequest<Type>(data?: Type, attempts = 0): Promise<APIResponse> {
	const res = await authAction('lister/connection-cancel/' + data + '/', 'POST');
	if (res && res.status < 300) {
		return { ok: true };
	} else {
		return await handelUnsuccessfulResponse(res, _cancelConnRequest, attempts, data);
	}
}

export async function _getMyListers<Type>(data?: Type, attempts = 0): Promise<APIResponse> {
	const res = await authAction('lister/my-listers/?page=' + (data || '1'), 'GET');
	if (res && res.status < 300) {
		return { ok: true, data: await res.json() };
	} else {
		return await handelUnsuccessfulResponse(res, _getMyListers, attempts);
	}
}

export async function _getMyConnReqs<Type>(data?: Type, attempts = 0): Promise<APIResponse> {
	const res = await authAction('lister/connection-requests/?page=' + (data || '1'), 'GET');
	if (res && res.status < 300) {
		return { ok: true, data: await res.json() };
	} else {
		return await handelUnsuccessfulResponse(res, _getMyConnReqs, attempts);
	}
}

export async function _disconnectLister<Type>(data?: Type, attempts = 0): Promise<APIResponse> {
	const res = await authAction('lister/disconnect/' + data + '/', 'POST');
	if (res && res.status < 300) {
		return { ok: true };
	} else {
		return await handelUnsuccessfulResponse(res, _disconnectLister, attempts, data);
	}
}
