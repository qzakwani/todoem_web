<script lang="ts">
	import type { ConnectionRequest } from '$lib/models';
	import { Button, Loading } from '$lib/components';
	import { goto } from '$app/navigation';
	import { currentLister } from '$lib/store';
	import { _acceptConnRequest, _rejectConnRequest } from '../actions';
	import { connectionRequests, myListers } from '$lib/dataStore';

	export let req: ConnectionRequest;
	let processing = false;

	async function acceptLister() {
		processing = true;
		const res = await _acceptConnRequest(req.sender.id.toString());
		if (res.ok) {
			connectionRequests.update((n) => {
				if (n.connReqs) {
					delete n.connReqs[req.sender.id];
				}
				return n;
			});
			myListers.update((l) => {
				if (l.listers) {
					l.listers[req.sender.id] = { id: 1, lister: req.sender, date_connected: '' };
					return l;
				} else {
					l.listers = {};
					l.listers[req.sender.id] = { id: 1, lister: req.sender, date_connected: '' };
					return l;
				}
			});
		} else {
			processing = false;
		}
	}

	async function rejectLister() {
		processing = true;
		const res = await _rejectConnRequest(req.sender.id.toString());
		if (res.ok) {
			connectionRequests.update((n) => {
				if (n.connReqs) {
					delete n.connReqs[req.sender.id];
				}
				return n;
			});
		} else {
			processing = false;
		}
	}
</script>

<div class="card container">
	<div class="info">
		{#if req.sender.name}
			<p
				class="primary"
				on:click={() => {
					$currentLister = req.sender;
					goto('/home/listers/lister/' + req.sender.username);
				}}
				on:keypress
			>
				{req.sender.name}
			</p>
			<p class="secondary">@{req.sender.username}</p>
		{:else}
			<p
				class="primary"
				on:click={() => {
					$currentLister = req.sender;
					goto('/home/listers/lister/' + req.sender.username);
				}}
				on:keypress
			>
				@{req.sender.username}
			</p>
		{/if}
	</div>
	<div class="actions">
		{#if !processing}
			<Button outlined success on:click={acceptLister}>Accept</Button>
			<Button outlined danger on:click={rejectLister}>Reject</Button>
		{/if}
	</div>
</div>

<style>
	.container {
		display: flex;
		align-items: center;
		justify-content: space-between;

		gap: 16px;
		padding: 8px;
	}

	.primary {
		font-weight: 600;
		font-size: 16px;
		cursor: pointer;
	}

	.primary:hover {
		text-decoration: underline;
	}

	.secondary {
		font-weight: 400;
		font-size: 14px;
		color: gray;
		margin-top: 4px;
	}

	.actions {
		display: flex;
		align-items: center;
		gap: 16px;
	}
</style>
