<script lang="ts">
	import { _sendConnectionRequest } from '../../actions';
	import { Icon, Button } from '$lib/components';
	import { mdiAccountPlus } from '@mdi/js';
	import { createEventDispatcher } from 'svelte';

	export let id: number;

	const dispatch = createEventDispatcher();

	function changeStatus() {
		dispatch('statusChange');
	}

	async function requestConn() {
		const res = await _sendConnectionRequest(id.toString());
		if (res.ok) {
			changeStatus();
		}
	}
</script>

<Button on:click={requestConn}>
	<div>
		<Icon path={mdiAccountPlus} color="white" />
		<p style="color: white">Connect</p>
	</div>
</Button>

<style>
	div {
		display: flex;
		align-items: center;
		gap: 16px;
	}
</style>
