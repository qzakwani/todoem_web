<script lang="ts">
	import { _acceptConnRequest, _rejectConnRequest } from '../../actions';
	import { Icon, Button } from '$lib/components';
	import { mdiThumbUp, mdiThumbDown } from '@mdi/js';
	import { createEventDispatcher } from 'svelte';

	export let id: number;

	const dispatch = createEventDispatcher();

	function changeStatus(st: string) {
		dispatch('statusChange', { newStatus: st });
	}

	async function acceptReq() {
		const res = await _acceptConnRequest(id.toString());
		if (res.ok) {
			changeStatus('connected');
		}
	}

	async function rejectReq() {
		const res = await _rejectConnRequest(id.toString());
		if (res.ok) {
			changeStatus('disconnected');
		}
	}
</script>

<div class="btns">
	<Button on:click={acceptReq} animate float>
		<div class="btn">
			<Icon path={mdiThumbUp} color="white" />
			<p style="color: white">Accept</p>
		</div>
	</Button>

	<Button on:click={rejectReq} animate danger float>
		<div class="btn">
			<Icon path={mdiThumbDown} color="white" />
			<p style="color: white">Reject</p>
		</div>
	</Button>
</div>

<style>
	.btns {
		display: flex;
		align-items: center;
		gap: 16px;
	}
	.btn {
		display: flex;
		align-items: center;
		gap: 16px;
	}
</style>
