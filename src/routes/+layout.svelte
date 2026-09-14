<script>
	let { children, data } = $props();

	const user = data?.user;
</script>

<svelte:head> <meta name="viewport" content="width=device-width, initial-scale=1" />
</svelte:head>

<header class="navbar">
	<div class="nav-container">
		<a href="/" class="logo">PDF Upload</a>

```
	<nav>
		<a href="/">Home</a>

		{#if user}
			<a href="/dashboard">Dashboard</a>

			{#if user.role === 'admin'}
				<a href="/admin">Admin</a>
			{/if}

			<a href="/logout" class="logout">Logout</a>
		{:else}
			<a href="/login" class="login">Login</a>
		{/if}
	</nav>
</div>
```

</header>

<main>
	{@render children()}
</main>

<style>
	:global(*) {
		box-sizing: border-box;
	}

	:global(body) {
		margin: 0;
		font-family:
			Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont,
			"Segoe UI", sans-serif;
		color: #0f172a;
		background: #f8fafc;
	}

	.navbar {
		width: 100%;
		background: white;
		border-bottom: 1px solid #e2e8f0;
	}

	.nav-container {
		max-width: 1200px;
		margin: 0 auto;
		padding: 18px 24px;

		display: flex;
		align-items: center;
		justify-content: space-between;
	}

	.logo {
		color: #0f172a;
		text-decoration: none;
		font-size: 1.25rem;
		font-weight: 800;
	}

	nav {
		display: flex;
		align-items: center;
		gap: 22px;
	}

	nav a {
		color: #475569;
		text-decoration: none;
		font-weight: 500;
	}

	nav a:hover {
		color: #2563eb;
	}

	.login {
		padding: 9px 16px;
		border-radius: 8px;
		background: #2563eb;
		color: white;
	}

	.login:hover {
		color: white;
		background: #1d4ed8;
	}

	.logout {
		color: #dc2626;
	}

	main {
		min-height: calc(100vh - 70px);
	}

	@media (max-width: 650px) {
		.nav-container {
			padding: 16px;
		}

		nav {
			gap: 12px;
		}

		nav a {
			font-size: 0.9rem;
		}

		.logo {
			font-size: 1.05rem;
		}
	}
</style>
