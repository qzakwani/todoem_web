<script lang="ts">
	import type { Lister } from '$lib/models';
	import { IconButton, Loading } from '$lib/components';
	import { _findListers } from '../actions';
	import SearchCard from './SearchCard.svelte';
	import { mdiMagnify, mdiChevronRight, mdiChevronLeft } from '@mdi/js';
	let form: HTMLFormElement;
	let results: Lister[];
	let fetching = false;
	let next = false;
	let page = 1;
	let numPages = 1;
	let pages: { [index: number]: Lister[] } = {};

	function reset() {
		page = 1;
		pages = {};
	}

	async function getListers(e?: Event) {
		e?.preventDefault();
		fetching = true;
		if (Object.prototype.hasOwnProperty.call(pages, page)) {
			results = pages[page];
			console.log('from cache');
		} else {
			const data = { search: new FormData(form), page };
			const res = await _findListers(data);
			if (res.ok) {
				const resp = res.data as { next: boolean; result: Lister[] };
				results = resp.result;
				pages[page] = results;
				next = resp.next;
				if (next) {
					numPages++;
				}
			}
		}
		fetching = false;
	}

	async function nexPage() {
		page++;
		await getListers();
	}

	async function previousPage() {
		page--;
		await getListers();
	}
</script>

<form
	on:submit={(e) => {
		reset();
		getListers(e);
	}}
	bind:this={form}
>
	<input type="text" name="search" placeholder="search lister" required />
	{#if fetching}
		<div class="loading" style="padding: 5px;">
			<Loading size={30} />
		</div>
	{:else}
		<IconButton type="submit" icon={mdiMagnify} size={30} />
	{/if}
</form>

{#if results}
	<div class="results">
		{#each results as lister}
			<SearchCard {lister} />
		{/each}
	</div>

	<div class="nav-page">
		<IconButton icon={mdiChevronLeft} disabled={page === 1} on:click={previousPage} />
		<IconButton
			icon={mdiChevronRight}
			disabled={!next || (!next && page < numPages)}
			on:click={nexPage}
		/>
	</div>
{/if}

<style>
	form {
		display: flex;
		align-items: center;
		justify-content: center;
		gap: 16px;
		width: 100%;
		margin-bottom: 32px;
	}

	input {
		width: 80%;
		min-width: 160px;
	}

	.loading {
		display: flex;
		justify-content: center;
	}
	.results {
		display: flex;
		flex-direction: column;
		gap: 9px;
	}

	.nav-page {
		margin-top: 16px;
		padding: 16px;
		display: flex;
		align-items: center;
		justify-content: space-between;
	}
</style>
