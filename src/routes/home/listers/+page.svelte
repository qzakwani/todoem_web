<script lang="ts">
	import type { ConnectedLister } from '$lib/models';
	import { _getMyListers } from './actions';
	import { myListers, myListersSearch } from '$lib/dataStore';
	import ListerCard from './ListerCard.svelte';
	import { IconButton, Loading } from '$lib/components';
	import { mdiChevronDown, mdiMagnify } from '@mdi/js';
	import { isEmpty } from '$lib/utils';

	let fetching = false;

	async function getMyListers() {
		fetching = true;
		const res = await _getMyListers($myListers.currentPage + 1);
		if (res.ok) {
			const resp = res.data as { next: boolean; listers: ConnectedLister[] };
			$myListers.currentPage++;
			const temp: Record<number, ConnectedLister> = {};
			resp.listers.forEach((v) => {
				temp[v.lister.id] = v;
			});
			$myListers.listers = $myListers.listers ? { ...$myListers.listers, ...temp } : temp;
			$myListers.next = resp.next;
		}
		fetching = false;
	}
</script>

<div class="search">
	<div class="flex">
		<input type="text" bind:value={$myListersSearch.search} placeholder="Search My Listers" />
		<IconButton icon={mdiMagnify} animate />
	</div>

	<div class="search-result">
		<h3>Hello</h3>
		<h3>Yo</h3>
	</div>
</div>

{#if $myListers.listers !== null && !isEmpty($myListers.listers)}
	<div class="listers">
		{#each Object.entries($myListers.listers) as [id, connLister] (id)}
			<ListerCard {connLister} />
		{/each}
	</div>
{:else if $myListers.listers && isEmpty($myListers.listers)}
	<h4 style="color: gray; font-style: italic; text-align:center; width: 100%">
		You don't have any listers connected.
	</h4>
{:else}
	<h4 style="color: var(--danger-clr); font-style: italic; text-align:center; width: 100%">
		Something went wrong. Please RELOAD!
	</h4>
{/if}

<div class="nav-page">
	{#if fetching}
		<Loading />
	{:else if $myListers.next}
		<IconButton icon={mdiChevronDown} on:click={getMyListers} />
	{/if}
</div>

<style>
	.listers {
		display: flex;
		flex-direction: column;
		gap: 8px;
	}

	.nav-page {
		margin-top: 16px;
		padding: 16px;
		width: 100%;
		display: flex;
		justify-content: center;
	}

	.search {
		display: flex;
		align-items: center;
		justify-content: flex-end;
		gap: 8px;
		margin-bottom: 16px;
	}

	input {
		opacity: 0.5;
		width: 20%;
		transition: all 300ms ease-out;
	}

	input:focus {
		opacity: 1;
		width: 50%;
	}

	.search-result {
		height: 0;
		transition: all 300ms;
		overflow: hidden;
	}
</style>
