import type { PageLoad } from './$types';
import { myListers, connectionRequests } from '$lib/dataStore';
import { get } from 'svelte/store';
import { _getMyListers, _getMyConnReqs } from './actions';

export const load = (async () => {
	const l = get(myListers)[1];
	if (l) {
		return { listers: l, connReqs: get(connectionRequests)[1]?.length || 0 };
	} else {
		const res = await _getMyListers();
		const resp = await _getMyConnReqs();
		if (res.ok && resp.ok) {
			connectionRequests.set({ 1: resp.data });
			return { listers: res.data, connReqs: resp.data.length };
		} else {
			return { listers: [] };
		}
	}
}) satisfies PageLoad;
