<script lang="ts">
	import type { ConnectedLister } from '$lib/models';
	import { _getMyListers } from './actions';
	import { myListers } from '$lib/dataStore';
	import ListerCard from './ListerCard.svelte';
	import { IconButton } from '$lib/components';
	import { mdiChevronDown } from '@mdi/js';

	let fetching = false;

	async function getMyListers() {
		fetching = true;
		const res = await _getMyListers($myListers.currentPage + 1);
		if (res.ok) {
			const resp = res.data as { next: boolean; listers: ConnectedLister[] };
			$myListers.currentPage++;
			$myListers.listers = $myListers.listers
				? [...$myListers.listers, ...resp.listers]
				: [...resp.listers];
			$myListers.next = resp.next;
		}
		fetching = false;
	}
</script>

{#if $myListers.listers !== null && $myListers.listers.length !== 0}
	<div class="listers">
		{#each $myListers.listers as connLister}
			<ListerCard {connLister} />
		{/each}
	</div>
{/if}

{#if $myListers.next}
	<IconButton icon={mdiChevronDown} icolor="white" on:click={getMyListers} />
{/if}

<style>
	.listers {
		display: flex;
		flex-direction: column;
		gap: 8px;
	}
</style>
