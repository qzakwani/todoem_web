<script lang="ts">
	import { goto } from '$app/navigation';
	import type { Lister } from '$lib/models';
	import { currentLister } from '$lib/store';
	export let lister: Lister;

	function navigateToLister() {
		$currentLister = lister;
		goto('/home/listers/lister/' + lister.id.toString());
	}
</script>

<div class="lister card" on:click={navigateToLister} on:keypress>
	{#if lister.name}
		<p class="primary">{lister.name}</p>
		<p class="secondary">@{lister.username}</p>
	{:else}
		<p class="primary">@{lister.username}</p>
	{/if}
</div>

<style>
	.lister {
		margin: 0 auto;
		padding: 16px;
		width: 80%;
		min-width: 160px;
		cursor: pointer;
		transition: all 150ms ease-out;
	}

	.lister:hover {
		transform: scaleY(1.01);
		transform: scaleX(1.03);
	}
	.primary {
		font-weight: 600;
	}

	.secondary {
		margin-top: 3px;
		font-weight: 300;
		opacity: 0.7;
		font-size: 14px;
	}
</style>
