<script lang="ts">
	import { Icon } from '$lib/components';
	import { mdiAccountMultipleCheck, mdiAccountMultiplePlus, mdiAccountSearch } from '@mdi/js';
	import { goto } from '$app/navigation';
	import { connectionRequests } from '$lib/dataStore';
	import { page } from '$app/stores';

	$: reqsNoti = $connectionRequests.connReqs ? Object.keys($connectionRequests.connReqs).length : 0;
</script>

<div class="container">
	<div
		class="btn"
		class:selected={$page.route.id === '/home/listers'}
		on:click={() => {
			goto('/home/listers');
		}}
		on:keypress
	>
		<Icon path={mdiAccountMultipleCheck} />
		<p>Listers</p>
	</div>
	<div
		class="btn"
		class:selected={$page.route.id === '/home/listers/connection-requests'}
		on:click={() => {
			goto('/home/listers/connection-requests');
		}}
		on:keypress
	>
		<Icon path={mdiAccountMultiplePlus} />
		<p>Requests</p>
		{#if reqsNoti > 0 && reqsNoti < 10}
			<div class="noti">
				<p>{reqsNoti}</p>
			</div>
		{:else if reqsNoti > 9}
			<div class="noti">
				<p>9+</p>
			</div>
		{/if}
	</div>
	<div
		class="btn"
		class:selected={$page.route.id === '/home/listers/find'}
		on:click={() => {
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
		margin: 58px auto;

		width: 95%;
	}
	.container {
		position: absolute;
		top: 0;
		left: 0;
		right: 0;
		display: flex;
		align-items: center;
		background-color: var(--bg-clr-sec);
		height: fit-content;
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

	.noti {
		background-color: var(--secondary-clr);
		padding: 1px 8px;
		border-radius: 5px;
	}

	.noti > p {
		color: black;
		font-weight: 900;
		font-size: 12px;
	}
</style>
