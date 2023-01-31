<script lang="ts">
	import { _addTask } from './actions';
	import { IconButton, Button } from '$lib/components/index';
	import { mdiPlus, mdiRepeatVariant, mdiMinus } from '@mdi/js';
	import { theme } from '$lib/store';
	import { scale } from 'svelte/transition';
	import { quintOut } from 'svelte/easing';
	import { browser } from '$app/environment';
	let msg: string | undefined;
	let form: HTMLFormElement;
	let active = true;
	let repeat = false;
	let due = false;
	let desc = false;
	async function submit() {
		const data = new FormData(form);
		repeat = due = desc = false;
		const res = await _addTask(data);
	}

	function deactivate(e: Event) {
		e.stopPropagation();
		active = false;
	}
	$: if (active && browser) {
		window.addEventListener('click', deactivate);
	} else if (browser) {
		window.removeEventListener('click', deactivate);
	}
</script>

<section>
	<div class="form">
		{#if active}
			<form
				on:submit={submit}
				transition:scale={{ duration: 500, easing: quintOut }}
				bind:this={form}
				class="card"
				style="color-scheme: {$theme};"
				on:click={(e) => {
					e.stopPropagation();
				}}
				on:keypress
			>
				<!-- svelte-ignore a11y-autofocus -->
				<input type="text" name="task" required placeholder="New Task*" autofocus class="custom" />

				<div class="opts">
					<IconButton
						on:click={() => {
							repeat = !repeat;
						}}
						icon={mdiRepeatVariant}
						pure
						animate
						icolor={repeat ? 'var(--success-clr)' : 'gray'}
					/>
					<Button
						on:click={() => {
							due = !due;
						}}
						text
						animate
						color={due ? 'var(--success-clr)' : 'gray'}>Due</Button
					>
					<Button
						on:click={() => {
							desc = !desc;
						}}
						text
						animate
						color={desc ? 'var(--success-clr)' : 'gray'}>+ description</Button
					>
				</div>

				<input type="checkbox" name="repeat" bind:checked={repeat} hidden />
				{#if repeat}
					<div class="entry">
						<span class="label">Repeat </span>
						<select name="repeat_frequency" value="D">
							<option value="D">Daily</option>
							<option value="W">Weekly</option>
							<option value="M">Monthly</option>
						</select>
					</div>
				{/if}
				{#if due}
					<div class="entry">
						<span class="label">Due </span>
						<input type="datetime-local" name="due" class="custom" />
					</div>
				{/if}
				{#if desc}
					<div class="entry">
						<textarea name="description" placeholder="Description" class="custom" />
					</div>
				{/if}
				<div class="btns">
					<Button small danger animate on:click={deactivate}>cancel</Button>
					<Button small animate type="submit">Add</Button>
				</div>
			</form>
		{/if}
	</div>

	<IconButton
		icon={active ? mdiMinus : mdiPlus}
		animate
		on:click={(e) => {
			e.stopPropagation();
			active = !active;
		}}
		float
		size={36}
	/>
</section>

<style>
	section {
		position: absolute;
		right: 32px;
		bottom: 32px;
		width: calc(100% - 32px);
		text-align: right;
		text-align: -webkit-right;
	}

	.form {
		position: relative;
	}

	form {
		position: absolute;
		right: 46px;
		bottom: 6px;
		width: calc(100% - 122px);
		min-width: 400px;
		padding: 8px;
		border: 2px solid var(--divider-clr);
		display: flex;
		flex-direction: column;
		gap: 8px;
		transform-origin: bottom right;
		z-index: 2;
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

	input[name='due'] {
		width: auto;
		color: gray;
	}

	.opts {
		display: flex;
		align-items: center;
	}

	.btns {
		position: absolute;
		display: flex;
		align-items: center;
		gap: 16px;
		z-index: 5;
		right: 8px;
		bottom: 8px;
	}

	.entry {
		width: calc(100% - 162px);
		display: flex;
		align-items: center;
		gap: 8px;
	}

	.label {
		font-size: 14px;
		font-weight: 300;
	}
</style>
