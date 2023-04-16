<script lang="ts">
	import { IconButton, Loading } from '$lib/components';
	import { mdiMagnify, mdiCloseBox, mdiChevronDown } from '@mdi/js';
	import { _searchMyListers } from './actions';
	import ListerCard from './ListerCard.svelte';
	import type { ConnectedLister } from '$lib/models';

	let result: ConnectedLister[] = [];
	let init = false;

	export let search: boolean;

	let lister = '';
	let fetching = false;
	let next = false;
	let currentSearch: { search: FormData; page: number };
	let form: HTMLFormElement;

	async function submitSearch() {
		currentSearch = { search: new FormData(form), page: 1 };
		await searchListers(currentSearch);
		init = true;
	}

	async function searchListers(cs: { search: FormData; page: number }) {
		fetching = true;
		const res = await _searchMyListers(cs);

		if (res.ok) {
			next = res.data.next;
			result = [...result, ...res.data.result];
		}

		fetching = false;
	}

	async function nextPage() {
		currentSearch.page++;
		await searchListers(currentSearch);
	}
</script>

<form on:submit={submitSearch} bind:this={form}>
	<IconButton
		icon={mdiCloseBox}
		pure
		icolor="crimson"
		size={32}
		on:click={() => {
			search = false;
		}}
	/>
	<input type="text" name="search" placeholder="search my lister" required bind:value={lister} />
	{#if fetching}
		<Loading size={30} />
	{:else}
		<IconButton type="submit" icon={mdiMagnify} size={30} disabled={lister === ''} />
	{/if}
</form>

{#if init && result.length > 0}
	<div class="listers">
		{#each result as connLister, i (i)}
			<ListerCard {connLister} />
		{/each}
	</div>
	<div class="nav-page">
		{#if fetching}
			<Loading />
		{:else if next}
			<IconButton icon={mdiChevronDown} on:click={nextPage} />
		{/if}
	</div>
{:else if init && result.length === 0}
	<h4 style="color: gray; font-style: italic; text-align:center; width: 100%">... No Match ...</h4>
{/if}

<style>
	form {
		display: flex;
		align-items: center;
		gap: 16px;
		margin-bottom: 12px;
	}

	form > input {
		flex: 1;
	}

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
</style>
