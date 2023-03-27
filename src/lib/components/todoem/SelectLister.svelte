<script lang="ts">
	import { myListers } from '$lib/dataStore';
	import type { ConnectedLister } from '$lib/models';
	import { IconButton } from '$lib/components';
	import { mdiAccountArrowRight } from '@mdi/js';

	const l = $myListers.listers as Record<number, ConnectedLister>;

	let result: ConnectedLister[] = [];

	let search = '';
	let select = false;
	let selected = false;

	$: console.log(result);

	async function searchLocal() {
		result = [];
		for (const key in l) {
			if (l[key].lister.name.includes(search) || l[key].lister.username.includes(search)) {
				result = [l[key], ...result];
			}
		}
	}
</script>

{#each result as item, i (i)}
	<p>{item.lister.username}</p>
{/each}

<section>
	{#if select}
		<IconButton
			icon={mdiAccountArrowRight}
			pure
			icolor="var(--primary-clr)"
			size={32}
			on:click={() => {
				select = false;
			}}
		/>
		<div class="select card" class:animate={select}>
			<input type="text" bind:value={search} on:keyup={searchLocal} />
			{#each Object.entries(l) as [k, connLister] (k)}
				<p>{connLister.lister.username}</p>
			{/each}
		</div>
	{:else if selected}
		<p />
	{:else}
		<IconButton
			icon={mdiAccountArrowRight}
			pure
			icolor="var(--primary-clr)"
			size={32}
			on:click={() => {
				select = true;
			}}
		/>
	{/if}
</section>

<style>
	section {
		position: relative;
	}
	.select {
		position: absolute;
		background-color: var(--bg-clr);
		border-radius: 4px;
		padding: 8px;
		overflow: hidden;
	}

	.animate {
		animation: grow 300ms ease-out forwards;
	}

	@keyframes grow {
		from {
			width: 0;
			height: 0;
		}
		to {
			width: 200px;
			height: auto;
			max-height: 70vh;
		}
	}
</style>
