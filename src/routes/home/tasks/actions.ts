import type { Task } from '$lib/models';
import { authAction, handelUnsuccessfulResponse } from '$lib/actions';
import { tasks } from '$lib/dataStore';
import { get } from 'svelte/store';
import type { APIResponse } from '$lib/types';
import { ruid } from '$lib/utils';

export async function _getTasks<Type>(data?: Type, attempts = 0): Promise<APIResponse> {
	if (get(tasks) !== null) {
		return { ok: false };
	}
	const res = await authAction('task/list/', 'GET');
	if (res.status < 300) {
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
	// await new Promise((r) => setTimeout(r, 30000));
	const res = await authAction('task/create/', 'POST', _data);
	if (res.status < 300) {
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

// export function lol(form: FormData) {
// 	const data = form.get('task');
// 	console.log(data);
// 	console.log(typeof data);
// }
