<script lang="ts">
	import { tasks } from '$lib/dataStore';
	import * as actions from './actions';
	import type { APIError } from '$lib/types';
	import { browser } from '$app/environment';
	import AddTask from './AddTask.svelte';

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

<AddTask />

{#if $tasks === null}
	<p class="error">{msg}</p>
{:else if $tasks.length === 0}
	<h1>No tasks</h1>
{:else}
	{#each $tasks as task}
		<p>{task.task}</p>
	{/each}
{/if}
