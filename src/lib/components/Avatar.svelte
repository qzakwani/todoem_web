<script lang="ts">
	import { user } from '../store';
	let name: string = 'username';
	if ($user) {
		name = $user.name || $user.username;
	}
</script>

<div>
	<p>{name}</p>
</div>

<style>
	div {
		padding: 8px 16px;
	}
</style>
