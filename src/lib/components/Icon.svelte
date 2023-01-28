<script lang="ts">
	export let path: string;
	export let size: number = 24;
	export let color: string = 'var(--primary-clr)';
</script>

<svg
	style="fill: {color};"
	xmlns="http://www.w3.org/2000/svg"
	width="{size}px"
	height="{size}px"
	viewBox="0 0 24 24"
>
	<path d={path} />
</svg>
