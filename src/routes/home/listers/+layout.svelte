<script lang="ts">
	import type { LayoutData } from './$types';
	import { Icon } from '$lib/components';
	import { mdiAccountMultipleCheck, mdiAccountMultiplePlus } from '@mdi/js';
	import { goto } from '$app/navigation';

	export let data: LayoutData;

	let reqsNoti = data.connReqs as number;
	let page: 0 | 1 = 0;
	$: switch (page) {
		case 0:
			goto('/home/listers');
			break;
		case 1:
			goto('/home/listers/connection-requests');
			break;
		default:
			break;
	}
</script>

<div class="container">
	<div
		class="btn"
		class:selected={page === 0}
		on:click={() => {
			page = 0;
		}}
		on:keypress
	>
		<Icon path={mdiAccountMultipleCheck} />
		<p>Connected Listers</p>
	</div>
	<div
		class="btn"
		class:selected={page === 1}
		on:click={() => {
			page = 1;
		}}
		on:keypress
	>
		<Icon path={mdiAccountMultiplePlus} />
		<p>Connection Requests</p>
		{#if reqsNoti > 0 && reqsNoti < 10}
			<small>{reqsNoti}</small>
		{/if}
	</div>
</div>
<section>
	<slot />
</section>

<style>
	section {
		margin-top: 58px;
	}
	.container {
		position: absolute;
		top: 0;
		left: 0;
		right: 0;
		background-color: var(--bg-clr-sec);
		display: flex;
		align-items: center;
	}

	.btn {
		cursor: pointer;
		display: flex;
		align-items: center;
		justify-content: center;
		padding: 16px;
		gap: 16px;
		flex: 1;
	}

	.selected {
		background-color: var(--bg-clr);
	}
</style>
