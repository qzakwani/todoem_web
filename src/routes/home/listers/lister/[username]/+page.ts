import type { PageLoad } from './$types';
import { currentLister } from '$lib/store';
import { get } from 'svelte/store';
import { _getConnStatus, _getListerByUsername } from '../../actions';

export const load = (async ({ params }) => {
	const un = params.username;
	const u = get(currentLister);
	if (u && u.lister.username === un) {
		if (u.status !== 'unknown') {
			return;
		} else {
			const res = await _getConnStatus(u.lister.id);
			if (res.ok) {
				currentLister.update((n) => {
					n.status = res.data.status;
					return n;
				});
				return;
			}
		}
	} else {
		const res = await _getListerByUsername(un);
		if (res.ok) {
			const resp = await _getConnStatus(res.data.id);
			if (resp.ok) {
				currentLister.set({ lister: res.data, status: resp.data.status });
				return;
			}
		}
	}
}) satisfies PageLoad;
