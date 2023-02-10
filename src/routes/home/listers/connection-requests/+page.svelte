<script lang="ts">
	import { connectionRequests } from '$lib/dataStore';
	import { _getMyConnReqs } from '../actions';
	import { IconButton, Loading } from '$lib/components';
	import type { ConnectionRequest } from '$lib/models';
	import RequestCard from './RequestCard.svelte';
	import { isEmpty } from '$lib/utils';
	import { mdiChevronDown } from '@mdi/js';
	import { scale } from 'svelte/transition';
	import { quintOut } from 'svelte/easing';

	let fetching = false;

	async function getRequests() {
		fetching = true;
		const res = await _getMyConnReqs($connectionRequests.currentPage + 1);
		if (res.ok) {
			const resp = res.data as { next: boolean; requests: ConnectionRequest[] };
			$connectionRequests.currentPage++;
			const temp: Record<number, ConnectionRequest> = {};
			resp.requests.forEach((v) => {
				temp[v.sender.id] = v;
			});
			$connectionRequests.connReqs = $connectionRequests.connReqs
				? { ...$connectionRequests.connReqs, ...temp }
				: temp;
			$connectionRequests.next = resp.next;
		}
		fetching = false;
	}
</script>

{#if $connectionRequests.connReqs !== null && !isEmpty($connectionRequests.connReqs)}
	<div class="requests">
		{#each Object.entries($connectionRequests.connReqs) as [id, req] (id)}
			<div out:scale|local={{ duration: 500, easing: quintOut }}>
				<RequestCard {req} />
			</div>
		{/each}
	</div>
{:else if $connectionRequests.connReqs && isEmpty($connectionRequests.connReqs)}
	<h4 style="color: gray; font-style: italic; text-align:center; width: 100%">
		You don't have any connection requests.
	</h4>
{:else}
	<h4 style="color: var(--danger-clr); font-style: italic; text-align:center; width: 100%">
		Something went wrong. Please RELOAD!
	</h4>
{/if}

<div class="nav-page">
	{#if fetching}
		<Loading />
	{:else if $connectionRequests.next}
		<IconButton icon={mdiChevronDown} on:click={getRequests} />
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
