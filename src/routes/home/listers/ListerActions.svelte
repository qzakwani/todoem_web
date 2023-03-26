<script lang="ts">
	import type { Lister } from '$lib/models';
	import { myListers, connectionRequests } from '$lib/dataStore';
	import {
		_sendConnectionRequest,
		_cancelConnRequest,
		_acceptConnRequest,
		_disconnectLister,
		_rejectConnRequest
	} from './actions';
	import { IconButton, Overlay, Icon, Tooltip, Loading } from '$lib/components';
	import {
		mdiCancel,
		mdiAccountPlus,
		mdiAccountArrowRight,
		mdiShieldLock,
		mdiThumbUp,
		mdiThumbDown,
		mdiCloseBox
	} from '@mdi/js';
	export let size = 24;
	export let lister: Lister;
	export let status:
		| string
		| 'disconnected'
		| 'connected'
		| 'received'
		| 'sent'
		| 'private'
		| 'processing' = 'processing';

	let showDisconnectPrompt = false;

	async function sendReq() {
		status = 'processing';
		const res = await _sendConnectionRequest(lister.id.toString());
		if (res.ok) {
			status = 'sent';
		}
	}

	async function cancelReq() {
		status = 'processing';

		const res = await _cancelConnRequest(lister.id.toString());
		if (res.ok) {
			status = 'disconnected';
		}
	}
	async function acceptReq() {
		status = 'processing';
		const res = await _acceptConnRequest(lister.id.toString());
		if (res.ok) {
			status = 'connected';
			myListers.update((l) => {
				if (l.listers !== null) {
					l.listers[lister.id] = { id: lister.id, lister: lister, date_connected: '' };
				}
				return l;
			});
			connectionRequests.update((c) => {
				if (c.connReqs !== null) {
					delete c.connReqs[lister.id];
				}
				return c;
			});
		}
	}
	async function rejectReq() {
		status = 'processing';
		const res = await _rejectConnRequest(lister.id.toString());
		if (res.ok) {
			status = 'disconnected';
			connectionRequests.update((c) => {
				if (c.connReqs !== null) {
					delete c.connReqs[lister.id];
				}
				return c;
			});
		}
	}
	async function disconnect() {
		status = 'processing';
		const res = await _disconnectLister(lister.id.toString());
		if (res.ok) {
			status = 'disconnected';
			myListers.update((l) => {
				if (l.listers !== null) {
					delete l.listers[lister.id];
				}
				return l;
			});
		}
	}
</script>

<div class="actions">
	{#if status === 'disconnected'}
		<Tooltip tip="Connect">
			<IconButton
				icon={mdiAccountPlus}
				pure
				animate
				icolor="var(--primary-clr)"
				on:click={sendReq}
				{size}
			/>
		</Tooltip>
	{:else if status === 'connected'}
		<Tooltip tip="Disconnect">
			<IconButton
				icon={mdiCancel}
				icolor="var(--danger-clr)"
				pure
				animate
				{size}
				on:click={(e) => {
					e.stopPropagation();
					showDisconnectPrompt = true;
				}}
			/>
		</Tooltip>

		{#if showDisconnectPrompt}
			<Overlay
				title="Disconnect Lister"
				prompt={`Are you sure you want to disconnect < @${lister.username} >`}
				ok="Yes"
				okAction={disconnect}
				no="Cancel"
				noAction={(e) => {
					e.stopPropagation();
					showDisconnectPrompt = false;
				}}
			/>
		{/if}
	{:else if status === 'received'}
		<Tooltip tip="Accept">
			<IconButton
				icon={mdiThumbUp}
				{size}
				pure
				animate
				icolor="var(--success-clr)"
				on:click={acceptReq}
			/>
		</Tooltip>
		<Tooltip tip="Reject">
			<IconButton
				icon={mdiThumbDown}
				{size}
				pure
				animate
				icolor="var(--danger-clr)"
				on:click={rejectReq}
			/>
		</Tooltip>
	{:else if status === 'sent'}
		<div style="padding: 5px;">
			<Tooltip tip="Sent">
				<Icon {size} path={mdiAccountArrowRight} color="var(--success-clr)" />
			</Tooltip>
		</div>
		<Tooltip tip="Cancel">
			<IconButton icon={mdiCloseBox} pure animate icolor="var(--danger-clr)" on:click={cancelReq} />
		</Tooltip>
	{:else if status === 'private'}
		<Tooltip tip="Private">
			<Icon path={mdiShieldLock} {size} />
		</Tooltip>
	{:else if status === 'processing'}
		<Loading />
	{/if}
</div>

<style>
	.actions {
		display: flex;
		align-items: center;
		gap: 16px;
	}
</style>
