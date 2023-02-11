<script lang="ts">
	import type { Lister } from '$lib/models';

	import {
		_sendConnectionRequest,
		_cancelConnRequest,
		_acceptConnRequest,
		_disconnectLister,
		_rejectConnRequest
	} from './actions';
	import { IconButton, Overlay, Icon, Tooltip } from '$lib/components';
	import { mdiSend, mdiCancel, mdiAccountPlus, mdiAccountArrowRight, mdiShieldLock } from '@mdi/js';

	async function sendReq() {
		const res = _sendConnectionRequest();
	}

	async function cancelReq() {
		const res = _cancelConnRequest();
	}
	async function acceptReq() {
		const res = _acceptConnRequest();
	}
	async function rejectReq() {
		const res = _rejectConnRequest();
	}
	async function disconnect() {
		const res = _disconnectLister();
	}

	export let size = 24;
	export let lister: Lister;
	export let status: 'disconnected' | 'connected' | 'received' | 'sent' | 'private';
</script>

{#if status === 'disconnected'}
	<!-- content here -->
{:else if status === 'connected'}
	<!-- else if content here -->
{:else if status === 'received'}
	<!--  -->
{:else if status === 'sent'}
	<div style="padding: 5px;">
		<Icon path={mdiAccountArrowRight} color="var(--success-clr)" />
	</div>
{:else if status === 'private'}
	<Tooltip tip="Private" bottom>
		<Icon path={mdiShieldLock} {size} />
	</Tooltip>
{:else}
	<!-- else content here -->
{/if}
