import type { Task } from '$lib/models';
import { authAction, handelUnsuccessfulResponse } from '$lib/actions';
import { tasks } from '$lib/dataStore';
import { get } from 'svelte/store';
import type { APIResponse } from '$lib/types';

export async function _getTasks<Type>(data?: Type, attempts = 0): Promise<APIResponse> {
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

export async function _addTask<Type>(data?: Type, attempts = 0): Promise<APIResponse> {
	await new Promise((resolve) => setTimeout(resolve, 5000));
	const res = await authAction('task/create/', 'POST', data as FormData);
	if (res.status < 300) {
		const task = (await res.json()) as Task;
		const _tasks = get(tasks);
		if (_tasks !== null) {
			tasks.set([..._tasks, task]);
		}
		return { ok: true };
	} else {
		return await handelUnsuccessfulResponse(res, _addTask, attempts, data);
	}
}
