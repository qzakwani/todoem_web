<script lang="ts">
	import { _addTask } from './actions';
	import { IconButton } from '$lib/components/index';
	import { mdiPlus, mdiRepeatVariant } from '@mdi/js';
	import { theme } from '$lib/store';
	let msg: string | undefined;
	let form: HTMLFormElement;
	let active = true;
	let repeat = false;

	async function submit() {
		const res = await _addTask(new FormData(form));
	}
</script>

<section>
	<div class="form">
		{#if active}
			<form bind:this={form} class="card" style="color-scheme: {$theme};">
				<div class="entry">
					<!-- svelte-ignore a11y-autofocus -->
					<input
						type="text"
						name="task"
						required
						placeholder="New Task*"
						autofocus
						class="custom"
					/>
				</div>
				<div class="sub-opts">
					<IconButton
						on:click={() => {
							repeat = !repeat;
						}}
						icon={mdiRepeatVariant}
						pure
						animate
						icolor={repeat ? 'var(--success-clr' : 'gray'}
					/>
				</div>
				<div class="entry">
					<label for="">Repeat</label>
					<input type="checkbox" name="repeat" bind:checked={repeat} />
				</div>
				<!-- <div class="entry">
					<label for="">Due</label>
					<input type="datetime-local" name="due" class="custom" />
				</div>
				<div class="entry">
					<label for="">Repeat</label>
					<input type="checkbox" name="repeat" />
				</div>
				<div class="entry">
					<label for="">Repeat Frequency</label>
					<input type="text" name="repeat_frequency" />
				</div>
				<div class="entry">
					<textarea name="description" placeholder="Description" class="custom" />
				</div> -->
			</form>
		{/if}
	</div>

	<IconButton icon={mdiPlus} animate on:click={() => (active = !active)} float size={32} />
</section>

<style>
	section {
		position: absolute;
		right: 32px;
		bottom: 32px;
	}

	.form {
		position: relative;
	}

	form {
		position: absolute;
		right: 42px;
		bottom: 8px;
		width: 600px;
		padding: 8px;
		border: 2px solid var(--divider-clr);
		display: flex;
		flex-direction: column;
		gap: 8px;
	}

	.custom {
		border: none;
		border-radius: 0;
		border-bottom: 2px solid var(--divider-clr);
		width: 100%;
		overflow-wrap: normal;
	}

	.custom:focus {
		border: none;
		border-bottom: 2px solid var(--primary-clr);
	}

	input[name='task'] {
		font-weight: 600;
	}
</style>
