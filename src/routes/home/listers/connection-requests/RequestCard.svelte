<script lang="ts">
	import type { ConnectionRequest } from '$lib/models';
	import { goto } from '$app/navigation';
	import { currentLister } from '$lib/store';
	import ListerActions from '../ListerActions.svelte';

	export let req: ConnectionRequest;
</script>

<div class="card container">
	<div class="info">
		{#if req.sender.name}
			<p
				class="primary"
				on:click={() => {
					$currentLister = { lister: req.sender, status: 'received' };
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
					$currentLister = { lister: req.sender, status: 'received' };
					goto('/home/listers/lister/' + req.sender.username);
				}}
				on:keypress
			>
				@{req.sender.username}
			</p>
		{/if}
	</div>
	<div class="actions">
		<ListerActions lister={req.sender} status="received" />
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
