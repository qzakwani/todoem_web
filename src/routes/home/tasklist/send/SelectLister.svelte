<script lang="ts">
	import { myListers } from '$lib/dataStore';
	import type { ConnectedLister } from '$lib/models';
	import { IconButton } from '$lib/components';
	import { mdiAccountArrowRight, mdiMagnify } from '@mdi/js';

	const l = ($myListers.listers as Record<number, ConnectedLister>) || [];

	let result: ConnectedLister[] = [];

	export let selected: ConnectedLister;

	let search = '';
	let select = false;

	async function searchLocal() {
		result = [];
		for (const key in l) {
			if (l[key].lister.name.includes(search) || l[key].lister.username.includes(search)) {
				result = [l[key], ...result];
			}
		}
	}
</script>

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
			<div class="form">
				<input type="text" bind:value={search} on:keyup={searchLocal} />
				<IconButton icon={mdiMagnify} on:click={() => {}} />
			</div>
			{#each Object.entries(l) as [k, connLister] (k)}
				<p
					on:keyup
					class="choice"
					on:click={() => {
						selected = connLister;
						select = false;
					}}
				>
					{connLister.lister.name ? connLister.lister.name : connLister.lister.username}
				</p>
			{/each}
		</div>
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
			width: 300px;
			height: auto;
			overflow-y: auto;
			max-height: 70vh;
		}
	}

	.choice {
		padding: 8px 12px;
		margin-bottom: 5px;
		background-color: var(--bg-clr-sec);
		cursor: pointer;
	}

	.choice:hover {
		color: white;
		background-color: var(--primary-clr);
	}

	.form {
		display: flex;
		align-items: center;
		gap: 16px;
		margin-bottom: 12px;
	}

	input {
		flex: 1;
	}
</style>
