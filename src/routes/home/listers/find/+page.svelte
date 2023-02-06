<script lang="ts">
	import type { Lister } from '$lib/models';
	import { IconButton, Loading } from '$lib/components';
	import { _findListers } from '../actions';
	import SearchCard from './SearchCard.svelte';
	import { searchPages } from '$lib/store';
	import { mdiMagnify, mdiChevronRight, mdiChevronLeft } from '@mdi/js';
	let form: HTMLFormElement;
	let page = 1;
	let results: Lister[] = $searchPages[page] || [];
	let fetching = false;
	let numPages = Object.keys($searchPages).length || 1;

	function reset() {
		page = numPages = 1;
		$searchPages = {};
	}

	async function getListers(e?: Event) {
		e?.preventDefault();
		fetching = true;
		if (Object.prototype.hasOwnProperty.call($searchPages, page)) {
			results = $searchPages[page];
		} else {
			const data = { search: new FormData(form), page };
			const res = await _findListers(data);
			if (res.ok) {
				const resp = res.data as { next: boolean; result: Lister[] };
				results = resp.result;
				$searchPages[page] = results;
				if (resp.next) {
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
		{#if results.length === 0}
			<h4 style="color: gray; font-style: italic; text-align:center; width: 100%">
				No listers found.
			</h4>
		{:else}
			{#each results as lister}
				<SearchCard {lister} />
			{/each}
		{/if}
	</div>

	<div class="nav-page">
		<IconButton icon={mdiChevronLeft} disabled={page <= 1} on:click={previousPage} />
		<IconButton icon={mdiChevronRight} disabled={page >= numPages} on:click={nexPage} />
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
