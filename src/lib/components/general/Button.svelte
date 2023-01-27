<script lang="ts">
	export let type: 'submit' | 'button' | 'reset' = 'submit';
	export let secondary = false;
	export let danger = false;
	export let success = false;
	export let outlined = false;
	export let float = true;
	export let animate = true;
	export let disabled = false;
</script>

<button
	on:click
	class:outlined
	class:float
	class:secondary
	class:animate
	{type}
	class:danger
	class:success
	{disabled}
>
	<slot />
</button>

<style>
	button {
		background-color: var(--btn-bg);
		border: 1px solid var(--btn-bg);
		color: var(--btn-txt-clr);
		font-size: 0.875rem;
		font-weight: 500;
		text-transform: uppercase;
		border-radius: 4px;
		padding: 10px 16px;
		letter-spacing: 1px;
	}

	button:hover {
		filter: brightness(1.3);
	}

	button:disabled {
		background-color: lightgray;
		color: gray;
		border: 1px solid lightgray;
		cursor: default;
	}
	button:disabled:hover {
		filter: none;
	}

	.secondary {
		background-color: var(--btn-bg-sec);
		border: 1px solid var(--btn-bg-sec);
		color: var(--btn-txt-clr-sec);
	}

	.secondary:hover {
		filter: brightness(0.9);
	}

	.danger {
		background-color: var(--btn-bg-danger);
		border: 1px solid var(--btn-bg-danger);
		color: var(--btn-txt-clr-danger);
	}

	.danger:hover {
		filter: brightness(1.2);
	}

	.success {
		background-color: var(--btn-bg-success);
		border: 1px solid var(--btn-bg-success);
		color: var(--btn-txt-clr-success);
	}

	.success:hover {
		filter: brightness(0.9);
	}

	.float {
		box-shadow: 0 3px 1px -2px rgb(0 0 0 / 20%), 0 2px 2px 0 rgb(0 0 0 / 14%),
			0 1px 5px 0 rgb(0 0 0 / 12%);
	}

	.outlined {
		background-color: transparent;
		color: var(--btn-bg);
	}

	.outlined.secondary {
		background-color: transparent;
		color: var(--btn-bg-sec);
	}

	.outlined.danger {
		background-color: transparent;
		color: var(--btn-bg-danger);
	}

	.outlined.success {
		background-color: transparent;
		color: var(--btn-bg-success);
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
