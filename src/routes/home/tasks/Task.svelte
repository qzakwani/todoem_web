<script lang="ts">
	import { Checkbox, Loading, IconButton } from '$lib/components';
	import type { Task } from '$lib/models';
	import { localizeDate, isPassed } from '$lib/utils/date_utils';
	import { mdiTrashCanOutline } from '@mdi/js';
	import { _complete, _delete, _uncomplete } from './actions';
	export let task: Task | string | any;
	export let id: string;

	function getRF(f: string) {
		switch (f) {
			case 'D':
				return 'Daily';
			case 'W':
				return 'Weekly';
			case 'M':
				return 'Monthly';
			default:
				return '';
		}
	}

	async function complete(key: string, isComplete: boolean) {
		if (!isComplete) {
			await _complete(key);
		} else {
			await _uncomplete(key);
		}
	}

	async function deleteTask() {
		await _delete(id);
	}
</script>

<section class="card container">
	{#if typeof task === 'string'}
		<div class="content">
			<Loading size={24} />
			<p class="task">{task}</p>
		</div>
		<IconButton hover pure icon={mdiTrashCanOutline} icolor="var(--danger-clr)" />
	{:else}
		<div class="content">
			<span>
				<Checkbox
					id={task.id}
					completed={task.completed}
					on:change={() => complete(id, task.completed)}
				/>
			</span>
			<div class="info">
				<p class={task.completed ? 'task completed' : 'task'}>{task.task}</p>
				<div class="extra">
					{#if task.due}
						<p class:passed={isPassed(task.due)} class="d-r">
							{#if !isPassed(task.due)}
								<span>Due by </span> {localizeDate(task.due)}
							{:else}
								<span>Passed </span> {localizeDate(task.due)}
							{/if}
						</p>
					{/if}
					{#if task.repeat}
						<p class="d-r"><span>Repeat </span> {getRF(task.repeat_frequency)}</p>
					{/if}
				</div>
				{#if task.description}
					<p class="desc">{task.description}</p>
				{/if}
			</div>
		</div>
		<IconButton
			icon={mdiTrashCanOutline}
			animate
			hover
			pure
			icolor="var(--danger-clr)"
			on:click={deleteTask}
		/>
	{/if}
</section>

<style>
	.container {
		display: flex;
		align-items: center;
		gap: 16px;
		padding: 16px;
		justify-content: space-between;
	}

	.content {
		display: flex;
		align-items: center;
		gap: 16px;
	}

	.extra {
		display: flex;
		gap: 16px;
		align-items: center;
	}

	.d-r,
	.desc {
		opacity: 0.6;
		font-size: 12px;
		font-weight: 600;
		display: flex;
		align-items: center;
		gap: 8px;
		margin-top: 8px;
	}

	.d-r span {
		opacity: 1;
		font-weight: 500;
		color: gray;
		font-style: italic;
	}

	.passed span {
		color: var(--danger-clr);
	}

	.completed {
		text-decoration: line-through;
		opacity: 0.4;
	}
</style>
