import type { PageLoad } from './$types';
import { currentLister } from '$lib/store';
import { get } from 'svelte/store';
import { _getConnStatus, _getLister } from '../../actions';

export const load = (async ({ params }) => {
	const id = params.id;
	if (get(currentLister)?.id.toString() === id) {
		const res = await _getConnStatus(id);
		if (res.ok) {
			return {
				lister: get(currentLister),
				connStatus: res.data.status
			};
		}
		return get(currentLister);
	} else {
		const res = await _getLister(id);
		const resp = await _getConnStatus(id);

		if (res.ok && resp.ok) {
			return { lister: res.data, connStatus: resp.data.status };
		} else {
			return { error: res.data };
		}
	}
}) satisfies PageLoad;
