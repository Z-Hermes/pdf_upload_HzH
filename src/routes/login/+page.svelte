<script>
	// Fehler vom Server-Action entgegennehmen (Svelte 5 Runes-Syntax)
	let { form } = $props();
</script>

<div class="min-h-screen bg-gradient-to-b from-blue-50 to-white flex items-center justify-center px-4">
	<div class="w-full max-w-md">
		<p class="text-center text-blue-600 font-bold tracking-widest text-sm mb-3">
			SICHER · EINFACH · SCHNELL
		</p>

		<h1 class="text-4xl font-bold text-center text-slate-900 mb-2">
			Willkommen zurück.
		</h1>
		<p class="text-center text-slate-500 mb-10">
			Logge dich ein, um auf deine PDFs zuzugreifen.
		</p>

		<form method="POST" class="bg-white rounded-2xl shadow-sm border border-slate-100 p-8 space-y-4">
			<div>
				<label for="username" class="block text-sm font-medium text-slate-700 mb-1">
					Benutzername
				</label>
				<input
					id="username"
					name="username"
					placeholder="dein.username"
					class="w-full border border-slate-200 rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-blue-600"
					required
				/>
			</div>

			<div>
				<label for="password" class="block text-sm font-medium text-slate-700 mb-1">
					Passwort
				</label>
				<input
					id="password"
					name="password"
					type="password"
					placeholder="••••••••"
					class="w-full border border-slate-200 rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-blue-600"
					required
				/>
			</div>

			{#if form?.error}
				<p class="text-red-600 text-sm">{form.error}</p>
			{/if}

			<button
				class="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2.5 rounded-lg transition"
			>
				Jetzt einloggen
			</button>
		</form>

		<p class="text-center text-sm text-slate-400 mt-6">
			<a href="/" class="hover:text-blue-600">← Zurück zur Startseite</a>
		</p>
	</div>
</div>