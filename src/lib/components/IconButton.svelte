<script lang="ts">
	import Icon from './Icon.svelte';
	export let icon: string;
	export let icolor: string = 'white';
	export let color: string = 'var(--primary-clr)';
	export let size = 24;
	export let animate = false;
	export let float = false;
	export let outlined = false;
	export let pure = false;
	export let hover = false;
	export let type: 'button' | 'submit' | 'reset' = 'button';
	let style: string = 'background-color: ' + color;
	if (outlined) {
		style = 'background-color: transparent; border: 2px solid ' + color;
	} else if (pure) {
		style = 'background-color: transparent;';
	}
</script>

<button {type} on:click {style} class:animate class:float class:hover>
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

	button:hover {
		filter: brightness(1.3);
	}

	.float {
		box-shadow: 0 3px 1px -2px rgb(0 0 0 / 20%), 0 2px 2px 0 rgb(0 0 0 / 14%),
			0 1px 5px 0 rgb(0 0 0 / 12%);
	}

	.hover {
		opacity: 0.3;
	}

	.hover:hover {
		opacity: 1;
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
