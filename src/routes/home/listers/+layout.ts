import type { LayoutLoad } from './$types';
import { myListers, connectionRequests } from '$lib/dataStore';
import { get } from 'svelte/store';
import { _getMyListers, _getMyConnReqs } from './actions';
import type { ConnectionRequest, ConnectedLister } from '$lib/models';

export const load = (async () => {
	const l = get(myListers);
	if (l.listers !== null) {
		return;
	} else {
		const res = await _getMyListers();
		const resp = await _getMyConnReqs();
		if (res.ok && resp.ok) {
			const temp: Record<number, ConnectionRequest> = {};
			for (const req of resp.data.requests as ConnectionRequest[]) {
				temp[req.sender.id] = req;
			}
			connectionRequests.set({
				connReqs: temp,
				next: resp.data.next,
				currentPage: 1
			});

			const tempL: Record<number, ConnectedLister> = {};
			for (const l of res.data.listers as ConnectedLister[]) {
				tempL[l.lister.id] = l;
			}
			myListers.set({ listers: tempL, next: res.data.next, currentPage: 1 });
			return;
		} else {
			return;
		}
	}
}) satisfies LayoutLoad;
