<script lang="ts">
	import { user } from '../store';
	let name: string = 'username';
	if ($user) {
		name = $user.name || $user.username;
	}
</script>

<button on:click>
	{name}
</button>

<style>
	button {
		padding: 5px 10px;
		cursor: pointer;
		border: 1px solid transparent;
		background-color: transparent;

		color: white;
		font-size: 16px;
		font-weight: 600;
	}

	button:hover {
		background-color: rgba(123, 123, 189, 0.1);
		border-radius: 4px;
		/* border: 1px solid rgba(123, 123, 189, 0.3); */
	}

	button:active {
		animation: animate 300ms ease-out;
	}

	@keyframes animate {
		0% {
			border: 1px solid rgba(123, 123, 189, 0.1);
		}

		50% {
			border: 1px solid rgba(123, 123, 189, 0.5);
		}

		100% {
			border: 1px solid rgba(123, 123, 189, 0.3);
		}
	}
</style>
