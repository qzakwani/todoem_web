import { authAction, handelUnsuccessfulResponse } from '$lib/actions';
import type { APIResponse } from '$lib/types';
import type { TempSentTaskList } from '$lib/models';

export async function _listTasklists<Type>(data?: Type, attempts = 0): Promise<APIResponse> {
	const res = await authAction('tasklist/list/', 'GET');
	if (res && res.status < 300) {
		return { ok: true, data: await res.json() };
	} else {
		return await handelUnsuccessfulResponse(res, _listTasklists, attempts, data);
	}
}

export async function _listSentTasklists<Type>(data?: Type, attempts = 0): Promise<APIResponse> {
	const res = await authAction('tasklist/list-sent/', 'GET');
	if (res && res.status < 300) {
		return { ok: true, data: await res.json() };
	} else {
		return await handelUnsuccessfulResponse(res, _listTasklists, attempts, data);
	}
}

export async function _sendTasklists<Type>(data?: Type, attempts = 0): Promise<APIResponse> {
	const d = data as TempSentTaskList;
	const res = await authAction('tasklist/send/' + d.receiver.toString() + '/', 'POST');
	if (res && res.status < 300) {
		return { ok: true, data: await res.json() };
	} else {
		return await handelUnsuccessfulResponse(res, _listTasklists, attempts, data);
	}
}
