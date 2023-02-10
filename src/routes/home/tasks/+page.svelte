<script lang="ts">
	import { tasks } from '$lib/dataStore';
	import { fly } from 'svelte/transition';
	import * as actions from './actions';
	import { isEmpty } from '$lib/utils';
	import type { APIError } from '$lib/types';
	import { browser } from '$app/environment';
	import AddTask from './AddTask.svelte';
	import Task from './Task.svelte';
	import { quintOut } from 'svelte/easing';
	import { crossfade } from 'svelte/transition';
	import { Loading } from '$lib/components';
	import Settings from './Settings.svelte';
	let msg: string | undefined | 'fetching' = 'fetching';
	async function setUp() {
		const res = await actions._getTasks();
		if (!res.ok && res.data) {
			let err = res.data as APIError;
			msg = err.message;
		}
	}

	const [send, receive] = crossfade({
		duration: (d) => Math.sqrt(d * 200),

		fallback(node, params) {
			const style = getComputedStyle(node);
			const transform = style.transform === 'none' ? '' : style.transform;

			return {
				duration: 600,
				easing: quintOut,
				css: (t) => `
					transform: ${transform} scale(${t});
					opacity: ${t}
				`
			};
		}
	});

	browser && setUp();
</script>

<Settings />
<div class="tasks">
	{#if $tasks === null}
		{#if msg === 'fetching'}
			<div class="loading">
				<Loading size={80} />
			</div>
		{:else}
			<p class="error">{msg}</p>
		{/if}
	{:else if isEmpty($tasks)}
		<h4 style="color: gray; font-style: italic; text-align:center; width: 90%">
			Add tasks by clicking the add button below.
		</h4>
	{:else}
		<div class="layout">
			<div class="tasks-container uncompleted">
				{#each Object.entries($tasks) as [key, task] (key)}
					{#if typeof task === 'string' || !task.completed}
						<div
							in:fly|local={{ duration: 300, y: 500, opacity: 0.5 }}
							out:send|local={{ key: key }}
						>
							<Task {task} id={key} />
						</div>
					{/if}
				{/each}
			</div>

			<div class="completed tasks-container">
				{#each Object.entries($tasks) as [key, task] (key)}
					{#if typeof task !== 'string' && task.completed}
						<div in:receive|local={{ key: key }} out:send|local={{ key: key }}>
							<Task {task} id={key} />
						</div>
					{/if}
				{/each}
			</div>
		</div>
	{/if}
</div>
<AddTask />

<style>
	.layout {
		display: grid;
		grid-template-columns: 2fr 1fr;
		grid-template-rows: auto;
		grid-auto-flow: dense;
		gap: 16px;
	}

	.completed {
		/* padding: 8px;
		-webkit-box-shadow: inset 10px 10px 10px 1px rgba(0, 0, 0, 0.27);
		box-shadow: inset 10px 10px 10px 1px rgba(0, 0, 0, 0.27);
		height: 100%; */

		border-left: 5px solid var(--divider-clr);
		padding-left: 8px;
	}

	.tasks {
		display: flex;
		flex-direction: column;
		gap: 10px;
		min-height: calc(100% - 112px);
		margin-top: 42px;
	}

	.tasks-container {
		display: flex;
		flex-direction: column;
		gap: 10px;
		margin-bottom: 220px;
	}

	.loading {
		display: flex;
		align-items: center;
		justify-content: center;
	}

	h4 {
		position: absolute;
		left: 16px;
		top: 64px;
	}

	@media only screen and (max-width: 850px) {
		.layout {
			grid-template-columns: 1fr;
		}

		.uncompleted {
			margin-bottom: 32px;
		}

		.completed {
			border-left: none;
			padding-left: 0;
			padding-top: 8px;
			border-top: 5px solid var(--divider-clr);
		}
	}
</style>
