<script lang="ts">
	import type { ConnectedLister } from '$lib/models';
	import { IconButton, Overlay, Icon } from '$lib/components';
	import { mdiSend, mdiCancel, mdiAccountPlus, mdiAccountArrowRight } from '@mdi/js';
	import { goto } from '$app/navigation';
	import { currentLister } from '$lib/store';
	import { _disconnectLister, _sendConnectionRequest } from './actions';
	import { onDestroy } from 'svelte';
	import { myListers } from '$lib/dataStore';

	export let connLister: ConnectedLister;
	export let i: number;

	let showDisconnectPrompt = false;
	let disconnected = false;
	let sent = false;

	async function disconnectLister() {
		const res = await _disconnectLister(connLister.lister.id.toString());
		if (res.ok) {
			disconnected = true;
		}
	}

	async function connectLister() {
		const res = await _sendConnectionRequest(connLister.lister.id.toString());
		if (res.ok) {
			sent = true;
		}
	}

	onDestroy(() => {
		if (disconnected) {
			$myListers.listers?.splice(i, 1);
		}
	});
</script>

{#if showDisconnectPrompt}
	<Overlay
		title="Disconnect Lister"
		prompt={`Are you sure you want to disconnect < @${connLister.lister.username} >`}
		ok="Yes"
		okAction={disconnectLister}
		no="Cancel"
		noAction={(e) => {
			e.stopPropagation();
			showDisconnectPrompt = false;
		}}
	/>
{/if}

<div class="card container">
	<div class="info">
		{#if connLister.lister.name}
			<p
				class="primary"
				on:click={() => {
					$currentLister = connLister.lister;
					goto('/home/listers/lister/' + connLister.lister.username);
				}}
				on:keypress
			>
				{connLister.lister.name}
			</p>
			<p class="secondary">@{connLister.lister.username}</p>
		{:else}
			<p
				class="primary"
				on:click={() => {
					$currentLister = connLister.lister;
					goto('/home/listers/lister/' + connLister.lister.username);
				}}
				on:keypress
			>
				@{connLister.lister.username}
			</p>
		{/if}
	</div>
	<div class="actions">
		{#if disconnected}
			{#if sent}
				<div class="icon">
					<Icon path={mdiAccountArrowRight} color="var(--success-clr)" />
				</div>
			{:else}
				<IconButton
					icon={mdiAccountPlus}
					pure
					animate
					icolor="var(--primary-clr)"
					on:click={connectLister}
				/>
			{/if}
		{:else}
			<IconButton icon={mdiSend} icolor="#81b29a" pure animate />
			<IconButton
				icon={mdiCancel}
				icolor="var(--danger-clr)"
				pure
				animate
				on:click={(e) => {
					e.stopPropagation();
					showDisconnectPrompt = true;
				}}
			/>
		{/if}
	</div>
</div>

<style>
	.container {
		display: flex;
		align-items: center;
		justify-content: space-between;

		gap: 16px;
		padding: 8px;
	}

	.primary {
		font-weight: 600;
		font-size: 16px;
		cursor: pointer;
	}

	.primary:hover {
		text-decoration: underline;
	}

	.secondary {
		font-weight: 400;
		font-size: 14px;
		color: gray;
		margin-top: 4px;
	}

	.actions {
		display: flex;
		align-items: center;
		gap: 16px;
	}

	.icon {
		padding: 5px;
	}
</style>
