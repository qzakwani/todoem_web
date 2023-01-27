<script lang="ts">
	import { Button } from '$lib/components/general/index';
</script>

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
</div>

<style>
	.btns {
		margin-top: 3rem;
		display: flex;
		align-items: center;
		justify-content: center;
		flex-direction: column;
		gap: 1rem;
	}
</style>
