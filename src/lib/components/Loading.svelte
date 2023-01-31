<script lang="ts">
	import Icon from './Icon.svelte';
	import { mdiLoading } from '@mdi/js';

	export let color = 'var(--primary-clr)';
	export let size = 30;
</script>

<div class="spinner">
	<Icon path={mdiLoading} {color} {size} />
</div>

<style>
	.spinner {
		animation: spin 800ms ease-in-out infinite reverse;
	}

	@keyframes spin {
		100% {
			transform: rotate(1turn);
		}
	}
</style>
