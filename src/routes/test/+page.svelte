<script lang="ts">
	import { Button, Icon, MenuButton, IconButton } from '$lib/components/index';
	import { mdiHome } from '@mdi/js';
</script>

<main>
	<div class="btns">
		<Button>default</Button>
		<Button secondary>secondary</Button>
		<Button float={false} outlined>outlined</Button>
		<Button float={false} secondary outlined>secondary</Button>
		<Button float={false}>flat</Button>
		<Button danger>Danger</Button>
		<Button success>success</Button>
		<Button danger outlined>Danger</Button>
		<Button success outlined>success</Button>
		<br />
		<MenuButton icon={mdiHome}>Home</MenuButton>
		<IconButton
			icon={mdiHome}
			size={50}
			animate
			float
			outlined
			icolor="var(--danger-clr)"
			color="var(--danger-clr)"
		/>
	</div>
</main>

<style>
	.btns {
		padding-top: 3rem;
		display: flex;
		align-items: center;
		justify-content: center;
		flex-direction: column;
		gap: 1rem;
	}
</style>
