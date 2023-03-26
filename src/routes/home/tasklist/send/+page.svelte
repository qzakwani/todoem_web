<script lang="ts">
	import { _sendTasklists } from '../actions';
	import type { TempSentTaskList } from '$lib/models';
	import { Button, SelectLister, IconButton } from '$lib/components';
	import { mdiPlus } from '@mdi/js';
	let error = '';

	let temp: TempSentTaskList = {
		name: 'Task List',
		description: '',
		receiver: 0,
		tasks: []
	};

	let task = '';

	function addTask() {
		if (tasksLeft === 0) {
			return;
		}
		temp.tasks = [...temp.tasks, { task }];
		task = '';
	}
	$: tasksLeft = 10 - temp.tasks.length;
	async function send() {
		if (!temp.name) {
			return;
		} else if (temp.tasks.length === 0) {
			return;
		} else {
			const res = _sendTasklists(temp);
		}
	}

	function delTask(i: number) {
		temp.tasks.splice(i, 1);
		temp.tasks = temp.tasks;
	}
</script>

<div class="meta">
	<input type="text" bind:value={temp.name} placeholder="Title" />
	<SelectLister />

	<Button float animate>Send</Button>
</div>

<h3>{tasksLeft}</h3>

{#each temp.tasks as task, i (i)}
	<button class="del-btn" on:click={() => delTask(i)}>&#8722;</button>
	<p>{task.task}</p>
{/each}

<form on:submit|preventDefault={addTask}>
	<input type="text" bind:value={task} disabled={tasksLeft <= 0} required />
	<IconButton type="submit" animate icon={mdiPlus} />
</form>

<style>
	.del-btn {
		background-color: transparent;
		color: crimson;
		font-size: 24px;
		padding: 4px 8px;
		font-weight: 600;
	}
</style>
