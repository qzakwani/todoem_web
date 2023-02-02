import type { Task } from '$lib/models';
import { authAction, handelUnsuccessfulResponse } from '$lib/actions';
import { tasks } from '$lib/dataStore';
import { get } from 'svelte/store';
import type { APIResponse } from '$lib/types';
import { ruid } from '$lib/utils';
// await new Promise((r) => setTimeout(r, 30000));

export async function _getTasks<Type>(data?: Type, attempts = 0): Promise<APIResponse> {
	if (get(tasks) !== null) {
		return { ok: true };
	}
	const res = await authAction('task/list/', 'GET');
	if (res && res.status < 300) {
		const temp: Record<string, Task> = {};
		for (const task of (await res.json()) as Task[]) {
			temp[task.id.toString()] = task;
		}
		tasks.set(temp);
		return { ok: true };
	} else {
		return await handelUnsuccessfulResponse(res, _getTasks, attempts);
	}
}

export async function _addTask<Type>(data?: Type, attempts = 0): Promise<APIResponse> {
	const tempIndex = ruid();
	const _data = data as FormData;
	tasks.update((n) => {
		if (n !== null) {
			n[tempIndex] = _data.get('task') as string;
		} else {
			n = { tempIndex: _data.get('task') as string };
		}
		return n;
	});
	const res = await authAction('task/create/', 'POST', _data);
	if (res && res.status < 300) {
		const task = (await res.json()) as Task;
		tasks.update((n) => {
			if (n !== null) {
				n[tempIndex] = task;
			} else {
				n = { tempIndex: task };
			}
			return n;
		});

		return { ok: true };
	} else {
		return await handelUnsuccessfulResponse(res, _addTask, attempts, data);
	}
}

export async function _complete<Type>(data?: Type, attempts = 0): Promise<APIResponse> {
	let tid = '-1';
	tasks.update((n) => {
		if (n) {
			const temp = n[data as string] as Task;
			temp.completed = true;
			tid = temp.id.toString();
		}
		return n;
	});

	const res = await authAction('task/complete/' + tid + '/', 'POST');
	if (res && res.status < 300) {
		return { ok: true };
	} else {
		tasks.update((n) => {
			if (n) {
				const temp = n[data as string] as Task;
				temp.completed = false;
			}
			return n;
		});
		return await handelUnsuccessfulResponse(res, _complete, attempts, data);
	}
}

export async function _uncomplete<Type>(data?: Type, attempts = 0): Promise<APIResponse> {
	let tid = '-1';
	tasks.update((n) => {
		if (n) {
			const temp = n[data as string] as Task;
			temp.completed = false;
			tid = temp.id.toString();
		}
		return n;
	});

	const res = await authAction('task/complete/' + tid + '/', 'POST');
	if (res && res.status < 300) {
		return { ok: true };
	} else {
		tasks.update((n) => {
			if (n) {
				const temp = n[data as string] as Task;
				temp.completed = true;
			}
			return n;
		});
		return await handelUnsuccessfulResponse(res, _uncomplete, attempts, data);
	}
}

export async function _delete<Type>(data?: Type, attempts = 0): Promise<APIResponse> {
	let tid = '-1';
	let task: Task;
	tasks.update((n) => {
		if (n) {
			task = n[data as string] as Task;
			tid = task.id.toString();
			delete n[data as string];
		}
		return n;
	});
	const res = await authAction('task/delete/' + tid + '/', 'DELETE');
	if (res && res.status < 300) {
		return { ok: true };
	} else {
		tasks.update((n) => {
			if (n) {
				n[data as string] = task;
			}
			return n;
		});
		return await handelUnsuccessfulResponse(res, _delete, attempts, data);
	}
}

export async function _deleteAll<Type>(data?: Type, attempts = 0): Promise<APIResponse> {
	const ta = get(tasks);
	tasks.set({});
	const res = await authAction('task/delete-all/', 'DELETE');
	if (res && res.status < 300) {
		return { ok: true };
	} else {
		tasks.set(ta);
		return await handelUnsuccessfulResponse(res, _deleteAll, attempts, data);
	}
}
