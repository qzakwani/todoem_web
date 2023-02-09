<script lang="ts">
	import type { Lister } from '$lib/models';
	import { IconButton, Loading } from '$lib/components';
	import { _findListers } from '../actions';
	import SearchCard from './SearchCard.svelte';
	import { searchPages } from '$lib/store';
	import { mdiMagnify, mdiChevronDown } from '@mdi/js';
	let form: HTMLFormElement;
	let fetching = false;

	function reset() {
		$searchPages.results = null;
		$searchPages.next = false;
		$searchPages.currentPage = 1;
	}

	async function getListers(e?: Event) {
		e?.preventDefault();
		fetching = true;
		const data = { search: new FormData(form), page: $searchPages.currentPage };
		const res = await _findListers(data);
		if (res.ok) {
			const resp = res.data as { next: boolean; result: Lister[] };
			$searchPages.currentPage++;
			$searchPages.results = $searchPages.results
				? [...$searchPages.results, ...resp.result]
				: resp.result;
			$searchPages.next = resp.next;
		}

		fetching = false;
	}
</script>

<form
	on:submit={(e) => {
		reset();
		getListers(e);
	}}
	bind:this={form}
>
	<input
		type="text"
		name="search"
		placeholder="search lister"
		required
		bind:value={$searchPages.search}
	/>
	{#if fetching}
		<div class="loading" style="padding: 5px;">
			<Loading size={30} />
		</div>
	{:else}
		<IconButton type="submit" icon={mdiMagnify} size={30} />
	{/if}
</form>

{#if $searchPages.results}
	<div class="results">
		{#if $searchPages.results.length === 0}
			<h4 style="color: gray; font-style: italic; text-align:center; width: 100%">
				No listers found.
			</h4>
		{:else}
			{#each $searchPages.results as lister}
				<SearchCard {lister} />
			{/each}
		{/if}
	</div>

	<div class="nav-page">
		<IconButton icon={mdiChevronDown} disabled={!$searchPages.next} on:click={getListers} />
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
		width: 100%;
		display: flex;
		justify-content: center;
	}
</style>
