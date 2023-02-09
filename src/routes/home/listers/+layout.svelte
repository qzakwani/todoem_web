<script lang="ts">
	import type { LayoutData } from './$types';
	import { Icon } from '$lib/components';
	import { mdiAccountMultipleCheck, mdiAccountMultiplePlus, mdiAccountSearch } from '@mdi/js';
	import { goto } from '$app/navigation';

	export let data: LayoutData;

	let reqsNoti = data.connReqs as number;
	let page: 0 | 1 | 2 = 0;
</script>

<div class="container">
	<div
		class="btn"
		class:selected={page === 0}
		on:click={() => {
			page = 0;
			goto('/home/listers');
		}}
		on:keypress
	>
		<Icon path={mdiAccountMultipleCheck} />
		<p>Listers</p>
	</div>
	<div
		class="btn"
		class:selected={page === 1}
		on:click={() => {
			page = 1;
			goto('/home/listers/connection-requests');
		}}
		on:keypress
	>
		<Icon path={mdiAccountMultiplePlus} />
		<p>Requests</p>
		{#if reqsNoti > 0 && reqsNoti < 10}
			<small>{reqsNoti}</small>
		{/if}
	</div>
	<div
		class="btn"
		class:selected={page === 2}
		on:click={() => {
			page = 2;
			goto('/home/listers/find');
		}}
		on:keypress
	>
		<Icon path={mdiAccountSearch} />
		<p>Find</p>
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
		display: flex;
		align-items: center;
		background-color: var(--bg-clr-sec);
		min-height: fit-content;
	}

	.btn {
		cursor: pointer;
		display: flex;
		align-items: center;
		justify-content: center;
		padding: 16px;
		gap: 16px;
		transition: all 300ms ease-out;
		flex: 1;
	}

	p {
		font-weight: 300;
		font-size: 14px;
	}

	.btn:hover {
		flex: 1.1;
	}

	.selected {
		background-color: var(--bg-clr);
		flex: 2;
	}

	.selected:hover {
		flex: 2;
	}

	.selected > p {
		font-weight: 500;
	}
</style>
