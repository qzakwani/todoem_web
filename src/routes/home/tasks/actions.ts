import { Task } from '$lib/models';
import { authAction, handelUnsuccessfulResponse } from '$lib/actions';
import { tasks } from '$lib/dataStore';
import { get } from 'svelte/store';
import type { APIResponse } from '$lib/types';

export async function _getTasks(attempts = 0): Promise<APIResponse> {
	if (get(tasks) !== null) {
		return { ok: false };
	}
	const res = await authAction('task/list/', 'GET');
	if (res.status < 300) {
		tasks.set(((await res.json()) as Task[]) || []);
		return { ok: true };
	} else {
		return await handelUnsuccessfulResponse(res, _getTasks, attempts);
	}
}

// export async function _addTask(attempts=0): Promise<APIResponse>{
//     const task = new Task()
// }
