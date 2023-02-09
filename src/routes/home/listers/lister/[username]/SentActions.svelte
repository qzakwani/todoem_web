<script lang="ts">
	import { _cancelConnRequest } from '../../actions';
	import { Icon, Button } from '$lib/components';
	import { mdiCloseCircleOutline, mdiTimerPlusOutline } from '@mdi/js';
	import { createEventDispatcher } from 'svelte';

	export let id: number;

	const dispatch = createEventDispatcher();

	function changeStatus() {
		dispatch('statusChange');
	}

	async function cancelReq() {
		const res = await _cancelConnRequest(id.toString());
		if (res.ok) {
			changeStatus();
		}
	}
</script>

<div class="btns">
	<div class="sent">
		<Icon path={mdiTimerPlusOutline} color="white" />
		<p style="color: white;">SENT</p>
	</div>

	<Button on:click={cancelReq} animate danger float>
		<div class="btn">
			<Icon path={mdiCloseCircleOutline} color="white" />
			<p style="color: white">Cancel</p>
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

	.sent {
		display: flex;
		align-items: center;
		gap: 16px;

		background-color: var(--success-clr);
		padding: 11px 16px;
		font-weight: 600;
		font-style: italic;
		letter-spacing: 2px;
		border-radius: 4px;
	}
</style>
