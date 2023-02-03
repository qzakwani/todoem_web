<script lang="ts">
	import Button from './Button.svelte';
	import { onDestroy, onMount } from 'svelte';
	export let title = '';
	export let prompt = '';
	export let ok = '';
	export let okAction: ((e: MouseEvent) => void) | null = null;
	export let no = '';
	export let noAction: (e: MouseEvent) => void;

	onMount(() => {
		window.addEventListener('click', noAction);
	});

	onDestroy(() => {
		window.removeEventListener('click', noAction);
	});
</script>

<div class="overlay">
	<div class="container">
		{#if title}
			<h2>{title}</h2>
		{/if}

		{#if prompt}
			<p>{prompt}</p>
		{/if}
		<div class="actions">
			{#if no}
				<Button danger on:click={noAction}>{no}</Button>
			{/if}
			{#if ok}
				<Button on:click={okAction}>{ok}</Button>
			{/if}
		</div>
	</div>
</div>

<style>
	.overlay {
		z-index: 100;
		position: fixed;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		display: flex;
		align-items: center;
		justify-content: center;
		background-color: rgba(0, 0, 0, 0.6);
	}

	.container {
		padding: 20px;
		background-color: var(--bg-clr-sec);
		border-radius: 16px;
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 16px;
	}

	.actions {
		width: 100%;
		display: flex;
		align-items: center;
		justify-content: space-around;
	}
</style>
