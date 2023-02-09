<script lang="ts">
	import type { ConnectedLister } from '$lib/models';
	import { IconButton } from '$lib/components';
	import { mdiSend, mdiCancel } from '@mdi/js';
	import { goto } from '$app/navigation';
	import { currentLister } from '$lib/store';

	export let connLister: ConnectedLister;
</script>

<div class="card container">
	<div class="info">
		{#if connLister.lister.name}
			<p
				class="primary"
				on:click={() => {
					$currentLister = connLister.lister;
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
					$currentLister = connLister.lister;
					goto('/home/listers/lister/' + connLister.lister.username);
				}}
				on:keypress
			>
				@{connLister.lister.username}
			</p>
		{/if}
	</div>
	<div class="actions">
		<IconButton icon={mdiSend} icolor="#81b29a" pure animate />
		<IconButton icon={mdiCancel} icolor="var(--danger-clr)" pure animate />
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
