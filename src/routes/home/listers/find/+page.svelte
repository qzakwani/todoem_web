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
	let manyPage = false;

	async function getListers(e: Event) {
		fetching = true;
		e.preventDefault();
		const data = new FormData(form);
		const res = await _findListers(data);
		if (res.ok) {
			const resp = res.data as { next: boolean; result: Lister[] };
			fetching = false;
			results = resp.result;
			manyPage = next = resp.next;
		}
	}

	async function changePage() {
		page++;
		console.log(page);
	}
</script>

<form on:submit={getListers} bind:this={form}>
	<input type="text" name="search" placeholder="search lister" required />
	<IconButton type="submit" icon={mdiMagnify} disabled={fetching} size={30} />
</form>

{#if results}
	<div class="results">
		{#each results as lister}
			<SearchCard {lister} />
		{/each}
	</div>
{/if}

{#if fetching}
	<div class="loading">
		<Loading size={100} />
	</div>
{/if}

{#if manyPage}
	<div class="nav-page">
		<IconButton icon={mdiChevronLeft} disabled={page === 1} />
		<IconButton icon={mdiChevronRight} disabled={!next} on:click={changePage} />
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
