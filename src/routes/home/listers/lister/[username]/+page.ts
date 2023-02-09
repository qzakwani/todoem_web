import type { PageLoad } from './$types';
import { currentLister } from '$lib/store';
import { get } from 'svelte/store';
import { _getConnStatus, _getLister } from '../../actions';

export const load = (async ({ params }) => {
	const un = params.username;
	const u = get(currentLister);
	if (u.username === un) {
		const res = await _getConnStatus(u.id);
		if (res.ok) {
			return {
				lister: get(currentLister),
				connStatus: res.data.status
			};
		}
		return get(currentLister);
	} else {
		const res = await _getLister(un);
		const resp = await _getConnStatus(un);

		if (res.ok && resp.ok) {
			return { lister: res.data, connStatus: resp.data.status };
		} else {
			return { error: res.data };
		}
	}
}) satisfies PageLoad;
