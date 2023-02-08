import type { LayoutLoad } from './$types';
import { myListers, connectionRequests } from '$lib/dataStore';
import { get } from 'svelte/store';
import { _getMyListers, _getMyConnReqs } from './actions';

export const load = (async () => {
	const l = get(myListers);
	if (l.listers !== null) {
		return { connReqs: get(connectionRequests).connReqs?.length || 0 };
	} else {
		const res = await _getMyListers();
		const resp = await _getMyConnReqs();
		if (res.ok && resp.ok) {
			connectionRequests.set({ connReqs: resp.data.requests, next: resp.data.next });
			myListers.set({ listers: res.data.listers, next: res.data.next, currentPage: 1 });
			return { connReqs: resp.data.requests.length };
		} else {
			return { connReqs: 0 };
		}
	}
}) satisfies LayoutLoad;
