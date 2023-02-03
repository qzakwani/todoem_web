<script lang="ts">
	import { _deleteAll, _deleteAllCompleted } from './actions';
	import { SettingButton, Overlay } from '$lib/components';
	import { mdiDeleteEmpty, mdiDeleteRestore } from '@mdi/js';
	let deleteAllOverlay = false;
	let deleteCompletedOverlay = false;

	async function deleteAll() {
		const res = await _deleteAll();
		// console.log(res.data.deleted_tasks);
	}

	async function deleteAllCompleted() {
		const res = await _deleteAllCompleted();
		// console.log(res.data.deleted_tasks);
	}
</script>

{#if deleteAllOverlay}
	<Overlay
		title="Delete All"
		prompt="Are you sure you want to delete all tasks?"
		ok="Confirm"
		no="Cancel"
		okAction={deleteAll}
		noAction={(e) => {
			e.stopPropagation();
			deleteAllOverlay = false;
		}}
	/>
{/if}

{#if deleteCompletedOverlay}
	<Overlay
		title="Delete Completed"
		prompt="Are you sure you want to delete all completed tasks?"
		ok="Confirm"
		no="Cancel"
		okAction={deleteAllCompleted}
		noAction={(e) => {
			e.stopPropagation();
			deleteCompletedOverlay = false;
		}}
	/>
{/if}

<div class="settings">
	<SettingButton
		on:click={(e) => {
			e.stopPropagation();
			deleteCompletedOverlay = true;
		}}
		danger
		icon={mdiDeleteRestore}>Delete Completed</SettingButton
	>
	<SettingButton
		on:click={(e) => {
			e.stopPropagation();
			deleteAllOverlay = true;
		}}
		danger
		icon={mdiDeleteEmpty}>Delete All</SettingButton
	>
</div>

<style>
	.settings {
		position: absolute;
		background-color: var(--bg-clr-sec);
		/* width: calc(100% - 32px); */
		top: 0;
		left: 16px;
		right: 16px;
		border-bottom-left-radius: 32px;
		border-bottom-right-radius: 32px;
		padding: 8px;
		display: flex;
		align-items: center;
		justify-content: space-around;
	}
</style>
