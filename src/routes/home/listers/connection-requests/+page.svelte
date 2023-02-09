<script lang="ts">
	import { connectionRequests } from '$lib/dataStore';
	import { _getMyConnReqs } from '../actions';
	import { IconButton, Loading } from '$lib/components';
	import type { ConnectionRequest } from '$lib/models';
	import RequestCard from './RequestCard.svelte';

	import { mdiChevronDown } from '@mdi/js';

	let fetching = false;

	async function getRequests() {
		fetching = true;
		const res = await _getMyConnReqs($connectionRequests.currentPage + 1);
		if (res.ok) {
			const resp = res.data as { next: boolean; requests: ConnectionRequest[] };
			$connectionRequests.currentPage++;
			$connectionRequests.connReqs = $connectionRequests.connReqs
				? [...$connectionRequests.connReqs, ...resp.requests]
				: [...resp.requests];
			$connectionRequests.next = resp.next;
		}
		fetching = false;
	}
</script>

{#if $connectionRequests.connReqs !== null && $connectionRequests.connReqs.length !== 0}
	<div class="requests">
		{#each $connectionRequests.connReqs as req, i}
			<RequestCard {req} {i} />
		{/each}
	</div>
{:else}
	<h4 style="color: gray; font-style: italic; text-align:center; width: 100%">
		You don't have any connection requests.
	</h4>
{/if}

<div class="nav-page">
	{#if fetching}
		<Loading />
	{:else if $connectionRequests.next}
		<IconButton icon={mdiChevronDown} on:click />
	{/if}
</div>

<style>
	.requests {
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
