<script lang="ts">
	import Icon from './Icon.svelte';
	export let icon: string;
	export let danger = false;
	export let hover = false;
	export let color = 'gray';
</script>

<button on:click class="animate" class:hover>
	<Icon path={icon} color={danger ? 'var(--danger-clr)' : color} />
	<p style={danger ? 'color: var(--danger-clr)' : 'color: ' + color}>
		<slot />
	</p>
</button>

<style>
	button {
		display: flex;
		align-items: center;
		justify-content: center;
		background-color: transparent;
		font-size: 16px;
		gap: 5px;
	}

	.hover {
		opacity: 0.5;
	}

	.hover:hover {
		opacity: 1;
	}

	p {
		font-weight: 500;
		/* margin-left: 5px; */
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
