import type { PageLoad } from './$types';
import { tasklists, sentTasklists } from '$lib/dataStore';
import { get } from 'svelte/store';
import { _listSentTasklists, _listTasklists } from './actions';

export const load = (async () => {
	const res = await _listTasklists();
	if (res.ok) {
		tasklists.set(res.data);
	}

	if (get(sentTasklists) === null) {
		const res = await _listSentTasklists();
		if (res.ok) {
			sentTasklists.set(res.data);
		}
	}
}) satisfies PageLoad;
