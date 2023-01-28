<script lang="ts">
	import Icon from './Icon.svelte';
	export let icon: string;
	export let icolor: string = 'black';
	export let selected = false;
</script>

<button on:click class:selected>
	<Icon path={icon} color={icolor} />
	<p><slot /></p>
</button>

<style>
	button {
		width: 100%;
		display: flex;
		align-items: center;
		gap: 16px;
		padding: 8px 16px;
		background-color: transparent;
		color: var(--txt-clr);
		text-transform: capitalize;
		transition: all 100ms ease-out;
		font-weight: 300;
		border-radius: 3px;
	}

	button:hover {
		background-color: var(--menu-btn-clr-hover);
	}

	.selected {
		background-color: var(--menu-btn-clr-hover);
		color: var(--menu-btn-txt-selected);
		font-weight: 400;
	}
	p {
		font-size: 16px;
	}
</style>
