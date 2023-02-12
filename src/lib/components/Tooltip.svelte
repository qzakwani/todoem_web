<script lang="ts">
	export let top = true;
	export let bottom = false;
	export let left = false;
	export let right = false;
	export let tip: string;
</script>

<div class="tooltip" class:top class:bottom class:left class:right>
	<span class="tip">{tip}</span>
	<slot />
</div>

<style>
	.tooltip {
		position: relative;
	}

	.tooltip::before {
		content: '';
		position: absolute;
		border-width: 5px;
		border-style: solid;
		opacity: 0;
		transition: opacity 300ms ease-out;
		transition-delay: 300ms;
	}

	.tip {
		position: absolute;
		opacity: 0;
		padding: 8px 12px;
		font-size: 12px;
		font-weight: 500;
		border-radius: 4px;
		background-color: var(--bg-clr-sec);
		transform-origin: center;
		min-width: 100px;
		text-align: center;
		transition: opacity 300ms ease-out;
		transition-delay: 300ms;
	}

	.tooltip:hover .tip,
	.tooltip:hover.tooltip::before {
		opacity: 1;
	}

	.top .tip {
		left: 50%;
		transform: translateX(-50%);
		bottom: calc(100% + 10px);
	}

	.top.tooltip::before {
		border-color: var(--bg-clr-sec) transparent transparent transparent;
		left: 50%;
		transform: translateX(-50%);
		bottom: 100%;
	}

	.left .tip {
		top: 50%;
		transform: translateY(-50%);
		right: calc(100% + 10px);
	}

	.left.tooltip::before {
		border-color: transparent transparent transparent var(--bg-clr-sec);
		top: 50%;
		transform: translateY(-50%);
		right: 100%;
	}

	.bottom .tip {
		left: 50%;
		transform: translateX(-50%);
		top: calc(100% + 10px);
	}

	.bottom.tooltip::before {
		border-color: transparent transparent var(--bg-clr-sec) transparent;
		left: 50%;
		transform: translateX(-50%);
		top: 100%;
	}

	.right .tip {
		top: 50%;
		transform: translateY(-50%);
		left: calc(100% + 10px);
	}

	.right.tooltip::before {
		border-color: transparent var(--bg-clr-sec) transparent transparent;
		top: 50%;
		transform: translateY(-50%);
		left: 100%;
	}
</style>
