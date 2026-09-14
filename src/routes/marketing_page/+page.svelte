
<script>
	// No JavaScript is required for the basic marketing page.
</script>

[svelte:head](svelte:head) <title>PDF Upload – Secure File Management</title> <meta
 	name="description"
 	content="Upload, manage and securely access your PDF files."
 />
 
</svelte:head>

<div class="page">
	<header class="navbar">
		<div class="logo">PDF Upload</div>

```
	<nav>
		<a href="/">Home</a>
		<a href="/login">Login</a>
	</nav>
</header>

<main>
	<section class="hero">
		<div class="hero-content">
			<p class="eyebrow">SICHER · EINFACH · SCHNELL</p>

			<h1>
				Deine PDFs.
				<br />
				Sicher gespeichert.
			</h1>

			<p class="description">
				Lade deine PDF-Dateien sicher hoch, verwalte sie an einem
				zentralen Ort und greife jederzeit darauf zu.
			</p>

			<div class="actions">
				<a class="button primary" href="/login">Jetzt einloggen</a>
				<a class="button secondary" href="#features">Mehr erfahren</a>
			</div>
		</div>
	</section>

	<section class="features" id="features">
		<div class="section-heading">
			<p class="eyebrow">FUNKTIONEN</p>
			<h2>Alles, was du für deine PDFs brauchst.</h2>
		</div>

		<div class="feature-grid">
			<article class="feature-card">
				<div class="icon">↑</div>
				<h3>PDFs hochladen</h3>
				<p>
					Lade deine PDF-Dateien schnell und unkompliziert in
					deinen persönlichen Bereich hoch.
				</p>
			</article>

			<article class="feature-card">
				<div class="icon">▣</div>
				<h3>Dateien verwalten</h3>
				<p>
					Behalte deine hochgeladenen Dokumente übersichtlich
					an einem Ort.
				</p>
			</article>

			<article class="feature-card">
				<div class="icon">🔒</div>
				<h3>Sicherer Zugriff</h3>
				<p>
					Deine Dateien sind nur für dich beziehungsweise
					berechtigte Administratoren zugänglich.
				</p>
			</article>
		</div>
	</section>

	<section class="cta">
		<h2>Bereit für deine PDFs?</h2>
		<p>Logge dich ein und verwalte deine Dokumente.</p>
		<a class="button primary" href="/login">Zum Login</a>
	</section>
</main>

<footer>
	<p>© 2026 PDF Upload</p>
</footer>
```

</div>

<style>
	:global(*) {
		box-sizing: border-box;
	}

	:global(body) {
		margin: 0;
		font-family:
			Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont,
			"Segoe UI", sans-serif;
		background: #f8fafc;
		color: #0f172a;
	}

	.page {
		min-height: 100vh;
	}

	.navbar {
		width: 100%;
		max-width: 1200px;
		margin: 0 auto;
		padding: 24px;
		display: flex;
		align-items: center;
		justify-content: space-between;
	}

	.logo {
		font-size: 1.25rem;
		font-weight: 800;
	}

	nav {
		display: flex;
		gap: 24px;
	}

	nav a {
		color: #475569;
		text-decoration: none;
		font-weight: 500;
	}

	nav a:hover {
		color: #0f172a;
	}

	.hero {
		padding: 100px 24px 120px;
		text-align: center;
		background: linear-gradient(135deg, #e0f2fe, #f8fafc);
	}

	.hero-content {
		max-width: 800px;
		margin: 0 auto;
	}

	.eyebrow {
		margin-bottom: 16px;
		font-size: 0.8rem;
		font-weight: 800;
		letter-spacing: 0.12em;
		color: #2563eb;
	}

	h1 {
		margin: 0;
		font-size: clamp(3rem, 7vw, 5.5rem);
		line-height: 0.98;
		letter-spacing: -0.05em;
	}

	.description {
		max-width: 620px;
		margin: 28px auto 0;
		font-size: 1.15rem;
		line-height: 1.7;
		color: #475569;
	}

	.actions {
		display: flex;
		justify-content: center;
		gap: 14px;
		margin-top: 36px;
		flex-wrap: wrap;
	}

	.button {
		display: inline-block;
		padding: 13px 22px;
		border-radius: 10px;
		text-decoration: none;
		font-weight: 700;
		transition:
			transform 0.2s,
			box-shadow 0.2s;
	}

	.button:hover {
		transform: translateY(-2px);
	}

	.primary {
		background: #2563eb;
		color: white;
		box-shadow: 0 8px 20px rgba(37, 99, 235, 0.2);
	}

	.secondary {
		background: white;
		color: #0f172a;
		border: 1px solid #cbd5e1;
	}

	.features {
		max-width: 1200px;
		margin: 0 auto;
		padding: 100px 24px;
	}

	.section-heading {
		max-width: 650px;
		margin-bottom: 50px;
	}

	.section-heading h2 {
		margin: 0;
		font-size: clamp(2rem, 4vw, 3rem);
		letter-spacing: -0.03em;
	}

	.feature-grid {
		display: grid;
		grid-template-columns: repeat(3, 1fr);
		gap: 24px;
	}

	.feature-card {
		padding: 30px;
		background: white;
		border: 1px solid #e2e8f0;
		border-radius: 16px;
	}

	.icon {
		margin-bottom: 20px;
		font-size: 2rem;
	}

	.feature-card h3 {
		margin: 0 0 12px;
		font-size: 1.25rem;
	}

	.feature-card p {
		margin: 0;
		line-height: 1.6;
		color: #64748b;
	}

	.cta {
		margin: 0 24px 80px;
		padding: 70px 24px;
		border-radius: 20px;
		text-align: center;
		background: #0f172a;
		color: white;
	}

	.cta h2 {
		margin: 0;
		font-size: clamp(2rem, 4vw, 3rem);
	}

	.cta p {
		margin: 16px 0 28px;
		color: #cbd5e1;
	}

	footer {
		padding: 30px 24px;
		text-align: center;
		color: #64748b;
		border-top: 1px solid #e2e8f0;
	}

	@media (max-width: 700px) {
		.navbar {
			padding: 18px;
		}

		.hero {
			padding: 70px 20px 90px;
		}

		.feature-grid {
			grid-template-columns: 1fr;
		}

		.features {
			padding: 70px 20px;
		}

		.cta {
			margin: 0 20px 50px;
		}
	}
</style>
