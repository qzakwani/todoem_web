<script lang="ts">
	import { Checkbox } from '$lib/components';
	import type { Task } from '$lib/models';
	import { localizeDate, isPassed } from '$lib/utils/date_utils';
	export let task: Task;

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
</script>

<section class="card task">
	<span>
		<Checkbox id={task.id} completed={task.completed} />
	</span>
	<div class="info">
		<p>{task.task}</p>
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
</section>

<style>
	.task {
		display: flex;
		align-items: center;
		gap: 16px;
		padding: 16px;
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
</style>
