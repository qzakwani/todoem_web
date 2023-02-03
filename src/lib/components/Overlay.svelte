<script lang="ts">
	import Button from './Button.svelte';
	import { browser } from '$app/environment';
	export let active = true;
	export let title = '';
	export let prompt = '';
	export let ok = '';
	export let okAction: ((e: MouseEvent) => void) | null = null;
	export let no = '';
	export let noAction: (e: MouseEvent) => void = deactivate;
	function deactivate(e: Event) {
		e.stopPropagation();
		active = false;
	}

	$: if (active && browser) {
		window.addEventListener('click', deactivate);
	} else if (browser) {
		window.removeEventListener('click', deactivate);
	}
</script>

{#if active}
	<div class="overlay">
		<div class="container">
			{#if title}
				<h2>{title}</h2>
			{/if}

			{#if prompt}
				<p>{prompt}</p>
			{/if}
			<div class="actions">
				{#if ok}
					<Button on:click={okAction}>{ok}</Button>
				{/if}
				{#if no}
					<Button on:click={noAction}>{no}</Button>
				{/if}
			</div>
		</div>
	</div>
{/if}

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
	}
</style>
