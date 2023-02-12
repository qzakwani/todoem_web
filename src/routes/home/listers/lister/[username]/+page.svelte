<script lang="ts">
	import { currentLister } from '$lib/store';
	import ListerActions from '../../ListerActions.svelte';
</script>

<div class="container">
	<h1>@{$currentLister.lister.username}</h1>
	{#if $currentLister.lister.name}
		<h3>{$currentLister.lister.name}</h3>
	{/if}
	<br />
	<ListerActions lister={$currentLister.lister} status={$currentLister.status} />
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
