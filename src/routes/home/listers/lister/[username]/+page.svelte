<script lang="ts">
	import { currentLister } from '$lib/store';
	import DisconnectedActions from './DisconnectedActions.svelte';
	import ReceivedActions from './ReceivedActions.svelte';
	import SentActions from './SentActions.svelte';
	import { Icon, Tooltip } from '$lib/components';
	import { mdiShieldLock } from '@mdi/js';
</script>

<div class="container">
	<h1>@{$currentLister.lister.username}</h1>
	{#if $currentLister.lister.name}
		<h3>{$currentLister.lister.name}</h3>
	{/if}

	{#if $currentLister.status === 'connected'}
		<!--  -->
	{:else if $currentLister.status === 'disconnected'}
		<DisconnectedActions
			id={$currentLister.lister.id}
			on:statusChange={() => {
				$currentLister.status = 'sent';
			}}
		/>
	{:else if $currentLister.status === 'sent'}
		<SentActions
			id={$currentLister.lister.id}
			on:statusChange={() => {
				$currentLister.status = 'disconnected';
			}}
		/>
	{:else if $currentLister.status === 'received'}
		<ReceivedActions
			id={$currentLister.lister.id}
			on:statusChange={(e) => {
				$currentLister.status = e.detail.newStatus;
			}}
		/>
	{:else if $currentLister.status === 'private'}
		<Tooltip tip="Private" bottom>
			<Icon path={mdiShieldLock} size={50} />
		</Tooltip>
	{:else}
		<!-- else content here -->
	{/if}
</div>

<style>
	.container {
		display: flex;
		align-items: center;
		justify-content: center;
		flex-direction: column;
		margin-top: 200px;
		gap: 16px;
	}
</style>
