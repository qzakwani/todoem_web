<script>
	import { IconButton, Tooltip } from '$lib/components';
	import { mdiSend } from '@mdi/js';
	import { tasklists, sentTasklists } from '$lib/dataStore';
	import { goto } from '$app/navigation';
</script>

{#if $tasklists}
	{#each $tasklists.tasklists as item}
		<p>{item.name}</p>
	{/each}
{/if}
<br />
{#if $sentTasklists}
	{#each $sentTasklists.tasklists as item}
		<p>{item.name}</p>
	{/each}
{/if}

<div class="float-btn">
	<Tooltip tip="Send Tasklist">
		<IconButton
			icon={mdiSend}
			color="#81b29a"
			float
			size={42}
			on:click={() => {
				goto('/home/tasklist/send');
			}}
		/>
	</Tooltip>
</div>

<style>
	.float-btn {
		position: fixed;
		right: 32px;
		bottom: 32px;
		z-index: 1;
	}
</style>
