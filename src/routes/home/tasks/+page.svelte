<script lang="ts">
	import { tasks, tempTasks } from '$lib/dataStore';
	import * as actions from './actions';
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

{#if $tasks === null}
	<p class="error">{msg}</p>
{:else if $tasks.length === 0}
	<h1>No tasks</h1>
{:else}
	<div class="tasks">
		{#each $tasks as task}
			<Task {task} />
		{/each}
		{#each $tempTasks as tempTask}
			<p>{tempTask}</p>
		{/each}
	</div>
{/if}

<AddTask />

<style>
	.tasks {
		display: flex;
		flex-direction: column;
		gap: 10px;
		margin-bottom: 100px;
	}
</style>
