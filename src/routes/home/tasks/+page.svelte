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

	let msg: string | undefined = 'fetching...';

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

<div class="tasks">
	{#if $tasks === null}
		<p class="error">{msg}</p>
	{:else if isEmpty($tasks)}
		<div class="layout">
			<h1 class="uncompleted">No tasks</h1>
			<h1 class="completed">No task</h1>
		</div>
	{:else}
		<div class="layout">
			<div class="uncompleted tasks-container">
				{#each Object.entries($tasks) as [key, task] (key)}
					{#if typeof task === 'string' || !task.completed}
						<div in:fly|local={{ duration: 300, y: 500, opacity: 0.5 }} out:send={{ key: key }}>
							<Task {task} id={key} />
						</div>
					{/if}
				{/each}
			</div>

			<div class="completed tasks-container">
				{#each Object.entries($tasks) as [key, task] (key)}
					{#if typeof task !== 'string' && task.completed}
						<div in:receive={{ key: key }} out:send={{ key: key }}>
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
		grid-template-columns: 1fr 1fr;
		grid-template-rows: auto;
		grid-auto-flow: dense;
		gap: 16px;
	}

	/* .uncompleted {
		grid-column: 1/2;
	}

	.completed {
		grid-column: 2/3;
	} */

	.tasks {
		display: flex;
		flex-direction: column;
		gap: 10px;
		min-height: calc(100% - 3rem);
	}

	.tasks-container {
		display: flex;
		flex-direction: column;
		gap: 10px;
		margin-bottom: 220px;
	}
</style>
