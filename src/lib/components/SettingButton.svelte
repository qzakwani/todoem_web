<script lang="ts">
	import Icon from './Icon.svelte';
	export let icon: string;
	export let danger = false;
</script>

<button on:click class="animate">
	<Icon path={icon} color={danger ? 'var(--danger-clr)' : 'gray'} />
	<p style={danger ? 'color: var(--danger-clr)' : 'color: gray'}>
		<slot />
	</p>
</button>

<style>
	button {
		display: flex;
		align-items: center;
		justify-content: center;
		background-color: transparent;
		opacity: 0.7;
		font-size: 16px;
	}

	button:hover {
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
