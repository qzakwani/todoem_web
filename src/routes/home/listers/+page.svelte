<script lang="ts">
	import type { Lister } from '$lib/models';
	import { _getMyListers } from './actions';
	import type { PageData } from './$types';
	import { myListers } from '$lib/dataStore';
	export let data: PageData;

	let page = 1;
	let numPages = Object.keys($myListers).length || 1;
	let listers = data.listers as Lister[];
	let fetching = false;

	async function getMyListers() {
		fetching = true;
		if (Object.prototype.hasOwnProperty.call($myListers, page)) {
			listers = $myListers[page];
		} else {
			const res = await _getMyListers(page);
			if (res.ok) {
				const resp = res.data as { next: boolean; listers: Lister[] };
				listers = resp.listers;
				$myListers[page] = listers;
				if (resp.next) {
					numPages++;
				}
			}
		}
		fetching = false;
	}

	async function nexPage() {
		page++;
		await getMyListers();
	}

	async function previousPage() {
		page--;
		await getMyListers();
	}
</script>
