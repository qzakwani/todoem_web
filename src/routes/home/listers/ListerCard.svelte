<script lang="ts">
	import type { ConnectedLister } from '$lib/models';
	import { goto } from '$app/navigation';
	import { currentLister } from '$lib/store';
	import ListerActions from './ListerActions.svelte';

	export let connLister: ConnectedLister;
</script>

<div class="card container">
	<div class="info">
		{#if connLister.lister.name}
			<p
				class="primary"
				on:click={() => {
					$currentLister = { lister: connLister.lister, status: 'connected' };
					goto('/home/listers/lister/' + connLister.lister.username);
				}}
				on:keypress
			>
				{connLister.lister.name}
			</p>
			<p class="secondary">@{connLister.lister.username}</p>
		{:else}
			<p
				class="primary"
				on:click={() => {
					$currentLister = { lister: connLister.lister, status: 'connected' };
					goto('/home/listers/lister/' + connLister.lister.username);
				}}
				on:keypress
			>
				@{connLister.lister.username}
			</p>
		{/if}
	</div>
	<ListerActions lister={connLister.lister} status="connected" />
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
</style>
