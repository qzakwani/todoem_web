<script lang="ts">
	import { Button } from '$lib/components/general/index';
	import _signUp from './actions';
	let elem: HTMLFormElement;
	let pass1: string;
	let pass2: string;
	let username: string;
	let valid: HTMLInputElement;
	let pass: HTMLInputElement;
	let matching: HTMLInputElement;

	function checkUsername() {
		valid.style.border =
			username.length >= 3 ? '1px solid var(--success-clr)' : '1px solid var(--danger-clr)';
	}

	function checkPass() {
		pass.style.border =
			pass1.length >= 6 ? '1px solid var(--success-clr)' : '1px solid var(--danger-clr)';
	}
	function checkPassMatch() {
		matching.style.border =
			pass1 === pass2 ? '1px solid var(--success-clr)' : '1px solid var(--danger-clr)';
	}

	async function signUp(e: Event) {
		e.preventDefault();
		const res = await _signUp(elem);
		if (res.ok) {
			console.log('DONE');
		} else {
			console.log(res.data);
		}
	}
</script>

<main>
	<article class="left">
		<p>content</p>
	</article>
	<article class="right">
		<form bind:this={elem} on:submit={signUp} class="card">
			<div class="entry">
				<label for="">Username</label>
				<input
					type="text"
					name="username"
					required
					bind:value={username}
					bind:this={valid}
					on:keyup={checkUsername}
				/>
			</div>
			<div class="entry">
				<label for="">Password</label>
				<input
					type="password"
					name="password"
					required
					minLength="6"
					bind:value={pass1}
					bind:this={pass}
					on:keyup={checkPass}
				/>
			</div>
			<div class="entry">
				<label for="">Confirm Password</label>
				<input
					type="password"
					name="pass2"
					required
					bind:value={pass2}
					bind:this={matching}
					on:keyup={checkPassMatch}
				/>
			</div>

			<div class="btns">
				<Button>Create</Button>
			</div>
		</form>
	</article>
</main>

<style>
	main {
		display: grid;
		grid-template-columns: 1fr 1fr;
	}
	.left {
		background-color: var(--bg-clr-sec);
		border-right: 3px solid var(--divider-clr);
	}

	.right {
		display: flex;
		align-items: center;
		justify-content: center;
	}
	form {
		width: 70%;
		display: flex;
		flex-direction: column;
		gap: 1rem;
		padding: 1rem;
	}

	input {
		width: 100%;
	}

	.btns {
		text-align: right;
	}
</style>
