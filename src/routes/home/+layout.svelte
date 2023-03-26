<script lang="ts">
	import { goto } from '$app/navigation';
	import { page } from '$app/stores';
	import { _logout } from '$lib/actions';
	import logo from '$lib/assets/logo.svg';
	import { MenuButton, IconButton, Avatar } from '$lib/components/index';
	import { isLoggedIn, theme } from '$lib/store';
	import {
		mdiHome,
		mdiFormatListBulleted,
		mdiCheckCircleOutline,
		mdiFormatListGroup,
		mdiThemeLightDark,
		mdiAccountGroupOutline
	} from '@mdi/js';

	const Paths = {
		home: '/home',
		tasks: '/home/tasks',
		tasklist: '/home/tasklist',
		taskgroup: '/home/taskgroup',
		account: '/home/account',
		listers: '/home/listers'
	};

	function changeTheme() {
		const _theme = document.documentElement.getAttribute('theme') === 'light' ? 'dark' : 'light';
		document.documentElement.setAttribute('theme', _theme);
		localStorage.setItem('theme', _theme);
		theme.set(_theme);
	}

	$: if (!$isLoggedIn) {
		goto('/login');
	}
	// let container: HTMLElement;
	// onMount(() => {
	// 	container.addEventListener('scroll', () => {
	// 		topDelta.set(container.scrollTop);
	// 	});
	// });
</script>

<main>
	<div class="container">
		<header>
			<div class="logo">
				<img src={logo} alt="logo" width="28" />
				<p id="logo-txt" style="color: white; letter-spacing: 3px;">
					todo<span style="color: var(--secondary-clr);">em</span>
				</p>
			</div>

			<Avatar on:click={() => goto(Paths.account)} />

			<IconButton
				icon={mdiThemeLightDark}
				outlined
				animate
				icolor="white"
				color="white"
				size={20}
				on:click={changeTheme}
			/>
		</header>
		<aside>
			<MenuButton
				icon={mdiHome}
				on:click={() => goto(Paths.home)}
				selected={$page.route.id === Paths.home}>Home</MenuButton
			>
			<MenuButton
				icon={mdiCheckCircleOutline}
				icolor="#3d405b"
				on:click={() => goto(Paths.tasks)}
				selected={$page.route.id?.startsWith(Paths.tasks)}>Tasks</MenuButton
			>
			<MenuButton
				icon={mdiFormatListBulleted}
				icolor="#81b29a"
				on:click={() => goto(Paths.tasklist)}
				selected={$page.route.id?.startsWith(Paths.tasklist)}>Tasklist</MenuButton
			>
			<MenuButton
				icon={mdiFormatListGroup}
				icolor="#e07a5f"
				on:click={() => goto(Paths.taskgroup)}
				selected={$page.route.id?.startsWith(Paths.taskgroup)}>Taskgroup</MenuButton
			>
			<MenuButton
				icon={mdiAccountGroupOutline}
				icolor="#8338ec"
				on:click={() => goto(Paths.listers)}
				selected={$page.route.id?.startsWith(Paths.listers)}>Listers</MenuButton
			>
		</aside>
		<article>
			<slot />
		</article>
	</div>
</main>

<style>
	header {
		padding: 8px 16px;
		background-color: var(--header-clr);
		grid-column: 1/3;
		display: flex;
		align-items: center;
		justify-content: space-between;
	}
	.logo {
		display: inline-flex;
		align-items: center;
		gap: 5px;
	}

	#logo-txt {
		font-size: 24px;
		font-weight: 900;
	}
	.container {
		height: 100%;
		display: grid;
		grid-template-columns: 260px 1fr;
		grid-template-rows: max-content 1fr;
		align-items: stretch;
		overflow: hidden;
		z-index: 1;
	}

	aside {
		padding: 16px;
		display: flex;
		flex-direction: column;
		gap: 5px;
		background-color: var(--bg-clr-sec);
		border-right: 5px solid var(--divider-clr);
	}

	article {
		position: relative;
		padding: 1rem;
		overflow: auto;
	}

	@media only screen and (max-width: 850px) {
		.container {
			grid-template-columns: 1fr;
			grid-template-rows: max-content max-content 1fr;
		}

		aside {
			grid-column: 1/3;
			border-right: none;

			border-bottom: 5px solid var(--divider-clr);
		}

		article {
			grid-column: 1/3;
		}
	}
</style>
