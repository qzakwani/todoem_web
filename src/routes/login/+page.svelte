<script lang="ts">
	import _login from './actions';
	import { isLoggedIn } from '$lib/store';
	let form: HTMLFormElement;
	async function login(e: Event) {
		e.preventDefault();
		const res = await _login(form);
	}
</script>

<form bind:this={form} on:submit={login}>
	<input type="text" name="username" required />
	<input type="password" name="password" required minlength="6" />
	<button type="submit">Login</button>
</form>
