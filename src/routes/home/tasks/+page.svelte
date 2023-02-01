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

{#if $tasks === null}
	<p class="error">{msg}</p>
{:else if isEmpty($tasks)}
	<h1>No tasks</h1>
{:else}
	<div class="tasks">
		{#each Object.entries($tasks) as [key, task], i}
			<div in:fly={{ duration: 300, y: 500, opacity: 0.5 }}>
				<Task {task} />
			</div>
		{/each}
	</div>
{/if}
<AddTask />

<style>
	.tasks {
		display: flex;
		flex-direction: column;
		gap: 10px;
		margin-bottom: 220px;
	}
</style>
