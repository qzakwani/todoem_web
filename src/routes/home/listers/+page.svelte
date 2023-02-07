<script lang="ts">
	import type { ConnectedLister } from '$lib/models';
	import { _getMyListers } from './actions';
	import type { PageData } from './$types';
	import { myListers } from '$lib/dataStore';
	import { browser } from '$app/environment';
	export let data: PageData;

	let page = 1;
	let numPages = Object.keys($myListers).length || 1;
	let connListers = data.listers as ConnectedLister[];
	let fetching = false;

	async function getMyListers() {
		fetching = true;
		if (Object.prototype.hasOwnProperty.call($myListers, page)) {
			connListers = $myListers[page];
		} else {
			const res = await _getMyListers(page);
			if (res.ok) {
				const resp = res.data as { next: boolean; listers: ConnectedLister[] };
				connListers = resp.listers;
				$myListers[page] = connListers;
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
</script>

<div class="h" />

<style>
	.h {
		height: 200vh;
	}
</style>
