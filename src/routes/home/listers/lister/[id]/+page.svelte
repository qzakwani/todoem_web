<script lang="ts">
	import type { PageData } from './$types';
	import DisconnectedActions from './DisconnectedActions.svelte';

	export let data: PageData;

	let status = data.connStatus as string;
</script>

<div class="container">
	<h1>@{data.lister.username}</h1>
	{#if data.lister.name}
		<h3>{data.lister.name}</h3>
	{/if}

	{#if status === 'connected'}
		<!--  -->
	{:else if status === 'disconnected'}
		<DisconnectedActions
			id={data.lister.id}
			on:statusChange={() => {
				status = 'sent';
			}}
		/>
	{:else if status === 'sent'}
		<!--  -->
	{:else if status === 'received'}
		<!--  -->
	{:else if status === 'private'}
		<!--  -->
	{:else}
		<!-- else content here -->
	{/if}
	<p>{status}</p>
</div>

<style>
	.container {
		display: flex;
		align-items: center;
		justify-content: center;
		flex-direction: column;
		height: 100%;
		gap: 16px;
	}
</style>
