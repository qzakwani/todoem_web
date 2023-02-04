<script lang="ts">
	import Button from './Button.svelte';
	import Icon from './Icon.svelte';
	import { mdiAlertCircle, mdiCloseCircle, mdiCheckCircle } from '@mdi/js';
	export let active = false;
	export let timeout = 5000;
	export let center = false;
	export let left = false;
	export let right = false;
	export let level: 'success' | 'warning' | 'fail' = 'success';
	let path: string;
	let icolor: string;
	$: switch (level) {
		case 'success':
			path = mdiCheckCircle;
			icolor = 'var(--success-clr)';
			break;
		case 'warning':
			path = mdiAlertCircle;
			icolor = 'var(--warning-clr)';
			break;
		case 'fail':
			path = mdiCloseCircle;
			icolor = 'var(--danger-clr)';

			break;
	}

	$: if (active) {
		setTimeout(() => {
			active = false;
		}, timeout);
	}
</script>

{#if active}
	<div class="snackbar card" class:center class:left class:right>
		<Icon size={36} {path} color={icolor} />
		<p>
			<slot />
		</p>
		<Button
			text
			animate
			color="white"
			on:click={() => {
				active = false;
			}}>Dismiss</Button
		>
	</div>
{/if}

<style>
	.snackbar {
		position: fixed;
		bottom: 16px;
		padding-left: 16px;
		padding-bottom: 16px;
		padding-top: 16px;
		background-color: #616161;
		border-radius: 4px;
		display: flex;
		align-items: center;
	}

	p {
		margin-left: 16px;
		margin-right: 32px;
		color: white;
		font-weight: 300;
	}
	.center {
		left: 50%;
		transform-origin: center;

		animation: scale 500ms ease-out forwards;
	}

	.left {
		animation: lefto 1s ease-out forwards;
	}

	.right {
		animation: righto 1s ease-out forwards;
	}

	@keyframes scale {
		0% {
			opacity: 0;
			transform: translateX(-50%) scale(0);
		}

		100% {
			opacity: 1;
			transform: translateX(-50%) scale(1);
		}
	}

	@keyframes lefto {
		0% {
			opacity: 0.5;
			left: -100%;
		}

		80% {
			opacity: 1;
			left: 24px;
		}

		85% {
			opacity: 1;
			left: 8px;
		}

		90% {
			opacity: 1;
			left: 20px;
		}

		95% {
			opacity: 1;
			left: 12px;
		}
		100% {
			opacity: 1;
			left: 16px;
		}
	}

	@keyframes righto {
		0% {
			opacity: 0.5;
			right: -100%;
		}

		80% {
			opacity: 1;
			right: 24px;
		}

		85% {
			opacity: 1;
			right: 8px;
		}

		90% {
			opacity: 1;
			right: 20px;
		}

		95% {
			opacity: 1;
			right: 12px;
		}
		100% {
			opacity: 1;
			right: 16px;
		}
	}
</style>
