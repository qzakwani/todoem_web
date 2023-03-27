<script lang="ts">
	import { _sendTasklists } from '../actions';
	import type { TempSentTaskList } from '$lib/models';
	import { Button, SelectLister, IconButton } from '$lib/components';
	import { mdiPlus, mdiCloseBox } from '@mdi/js';
	import { goto } from '$app/navigation';

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
	<h1>New Tasklist</h1>
	<div class="close">
		<IconButton
			icon={mdiCloseBox}
			pure
			icolor="crimson"
			size={32}
			on:click={() => {
				goto('/home/tasklist');
			}}
		/>
	</div>
	<div class="entry">
		<label for="">Name</label>
		<input type="text" bind:value={temp.name} placeholder="Title" />
	</div>
	<div class="entry">
		<label for="">To</label>
		<SelectLister />
	</div>

	<div class="send" style="text-align: right;">
		<Button float animate>Send</Button>
	</div>
</div>

<div class="tasks">
	{#each temp.tasks as task, i (i)}
		<div class="task">
			<p><span class="i">{i + 1}</span> {task.task}</p>
			<button class="del-btn" on:click={() => delTask(i)}>&#8722;</button>
		</div>
	{/each}
</div>

<form on:submit|preventDefault={addTask}>
	<p class="i">{tasksLeft}/100</p>
	<input type="text" bind:value={task} disabled={tasksLeft <= 0} required />
	<IconButton type="submit" animate icon={mdiPlus} />
</form>

<style>
	.meta {
		position: relative;
		padding: 16px;
		background-color: var(--bg-clr-sec);
		display: flex;
		flex-direction: column;
		gap: 12px;
	}

	.meta h1 {
		text-align: center;
		color: gray;
	}

	.close {
		position: absolute;
		right: 8px;
		top: 9px;
	}

	.del-btn {
		background-color: transparent;
		color: crimson;
		font-size: 24px;
		padding: 4px 8px;
		font-weight: 600;
	}

	.del-btn:hover {
		background-color: crimson;
		color: white;
	}

	form {
		display: flex;
		align-items: center;
		gap: 8px;
		margin-top: 16px;
	}
	input {
		flex: 1;
	}

	.tasks > .task {
		margin: 4px 0;
	}

	.task {
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding-left: 8px;
		gap: 8px;

		background-color: var(--bg-clr-sec);
	}

	.i {
		font-size: 12px;
		font-weight: 600;
		color: gray;
		font-style: italic;
		margin-right: 8px;
	}
	.entry {
		display: flex;
		align-items: center;
		gap: 8px;
	}

	.entry > label {
		color: gray;
		font-weight: 600;
	}
</style>
