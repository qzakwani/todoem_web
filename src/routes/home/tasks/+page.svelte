<script lang="ts">
	import { tasks } from '$lib/dataStore';
	import { fly } from 'svelte/transition';
	import * as actions from './actions';
	import { isEmpty } from '$lib/utils';
	import type { APIError } from '$lib/types';
	import { browser } from '$app/environment';
	import AddTask from './AddTask.svelte';
	import Task from './Task.svelte';
	let msg: string | undefined;

	async function setUp() {
		const res = await actions._getTasks();
		if (!res.ok && res.data) {
			let err = res.data as APIError;
			msg = err.message;
		}
	}

	browser && setUp();
</script>

<div class="tasks">
	{#if $tasks === null}
		<p class="error">{msg}</p>
	{:else if isEmpty($tasks)}
		<h1>No tasks</h1>
	{:else}
		<div class="tasks-container">
			{#each Object.entries($tasks) as [key, task] (key)}
				<div in:fly={{ duration: 300, y: 500, opacity: 0.5 }}>
					<Task {task} id={key} />
				</div>
			{/each}
		</div>
	{/if}
</div>
<AddTask />

<style>
	.tasks {
		display: flex;
		flex-direction: column;
		gap: 10px;
		min-height: calc(100% - 3rem);
	}

	.tasks-container {
		margin-bottom: 220px;
	}
</style>
