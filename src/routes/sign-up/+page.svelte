<script lang="ts">
	import _signUp from './actions';
	let elem: HTMLFormElement;
	async function signUp() {
		const res = await _signUp(elem);
		console.log(res);
	}
</script>

<form
	bind:this={elem}
	on:submit={(e) => {
		e.preventDefault();
		signUp();
	}}
>
	<input type="text" name="username" required />
	<input type="text" name="password" required />
	<button type="submit">Sign Up</button>
</form>
