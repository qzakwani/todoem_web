<script lang="ts">
	import type { Lister } from '$lib/models';
	export let lister: Lister;
</script>

<div class="card container">
	<div class="info">
		{#if lister.name}
			<p class="primary">{lister.name}</p>
			<p class="secondary">@{lister.username}</p>
		{:else}
			<p class="primary">@{lister.username}</p>
		{/if}
	</div>
	<div class="actions">
		<button />
	</div>
</div>
