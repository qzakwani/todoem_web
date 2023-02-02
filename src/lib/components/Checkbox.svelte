<script lang="ts">
	import { scale } from 'svelte/transition';
	import { quintOut } from 'svelte/easing';
	import Icon from './Icon.svelte';
	const path = 'M21,7L9,19L3.5,13.5L4.91,12.09L9,16.17L19.59,5.59L21,7Z';
	export let id: number;

	export let completed: boolean;
</script>

<label for={id.toString()}>
	<div class="box" class:completed>
		{#if completed}
			<div class="check" in:scale={{ duration: 500, easing: quintOut }}>
				<Icon {path} color="white" />
			</div>
		{/if}
	</div>
</label>
<input type="checkbox" id={id.toString()} hidden on:change bind:checked={completed} />

<style>
	.box {
		width: 26px;
		height: 26px;
		border-radius: 4px;
		border: 1px solid gray;
		cursor: pointer;
		position: relative;
		transition: all 200ms linear;
		/* overflow: hidden; */
	}

	.box::before {
		content: '';
		position: absolute;
		left: 50%;
		top: 50%;
		transform: translate(-50%, -50%);
		width: 20px;
		height: 20px;
		border-radius: 100%;
		background-color: transparent;
		transition: all 200ms linear;
	}

	.box:hover.box::before {
		width: 42px;
		height: 42px;
		background-color: var(--menu-btn-clr-hover);
	}

	.box:hover.box {
		border: 1px solid var(--primary-clr);
	}

	.check {
		position: absolute;
		left: 0;
		top: 0;
		width: 100%;
		height: 100%;
		border-radius: 4px;
		background-color: var(--primary-clr);
	}

	.completed {
		border: 1px solid var(--primary-clr);
		background-color: var(--primary-clr);
	}
</style>
