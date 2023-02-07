import type { PageLoad } from './$types';
import { myListers } from '$lib/dataStore';
import { get } from 'svelte/store';
import { _getMyListers } from './actions';

export const load = (async () => {
	const r = get(myListers)[1];
	if (r) {
		return { listers: r };
	} else {
		const res = await _getMyListers();
		if (res.ok) {
			return { listers: res.data };
		} else {
			return { listers: [] };
		}
	}
}) satisfies PageLoad;
