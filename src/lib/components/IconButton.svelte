<script lang="ts">
	import Icon from './Icon.svelte';
	export let icon: string;
	export let icolor: string = 'white';
	export let color: string = 'var(--primary-clr)';
	export let size = 24;
	export let animate = false;
	export let float = false;
	export let outlined = false;
</script>

<button
	on:click
	style="background-color: {outlined ? 'transparent' : color}; border: 2px solid {color}"
	class:animate
	class:float
>
	<Icon path={icon} color={icolor} {size} />
</button>

<style>
	button {
		border-radius: 100%;
		display: flex;
		align-items: center;
		justify-content: center;
		padding: 5px;
	}

	.float {
		box-shadow: 0 3px 1px -2px rgb(0 0 0 / 20%), 0 2px 2px 0 rgb(0 0 0 / 14%),
			0 1px 5px 0 rgb(0 0 0 / 12%);
	}

	.animate:focus {
		animation: button-pop 300ms ease-out;
	}
	@keyframes button-pop {
		0% {
			transform: scale(0.95);
		}
		40% {
			transform: scale(1.02);
		}
		100% {
			transform: scale(1);
		}
	}
</style>
