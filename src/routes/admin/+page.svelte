<script>
	let { data } = $props();

	// Dateigröße lesbar formatieren (z. B. 1.2 MB statt 1234567 Bytes)
	function formatSize(bytes) {
		if (bytes < 1024) return `${bytes} B`;
		if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
		return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
	}

	// Datum lesbar formatieren
	function formatDate(dateString) {
		return new Date(dateString).toLocaleDateString('de-AT', {
			day: '2-digit',
			month: '2-digit',
			year: 'numeric'
		});
	}
</script>

<div class="max-w-5xl mx-auto px-6 py-10">
	<h1 class="text-2xl font-semibold text-slate-900 tracking-tight mb-1">Alle PDFs</h1>
	<p class="text-slate-500 text-sm mb-8">
		{data.pdfs.length} Datei{data.pdfs.length === 1 ? '' : 'en'} von allen Usern
	</p>

	{#if data.pdfs.length === 0}
		<p class="text-slate-400 text-sm">Noch keine PDFs hochgeladen.</p>
	{:else}
		<div class="border border-slate-200 rounded-lg overflow-hidden">
			<table class="w-full text-sm">
				<thead class="bg-slate-50 border-b border-slate-200 text-slate-500 text-left">
					<tr>
						<th class="px-4 py-3 font-medium">Dateiname</th>
						<th class="px-4 py-3 font-medium">Hochgeladen von</th>
						<th class="px-4 py-3 font-medium">Größe</th>
						<th class="px-4 py-3 font-medium">Datum</th>
						<th class="px-4 py-3"></th>
					</tr>
				</thead>
				<tbody class="divide-y divide-slate-100">
					{#each data.pdfs as pdf}
						<tr class="hover:bg-slate-50">
							<td class="px-4 py-3 text-slate-900">{pdf.original_name}</td>
							<td class="px-4 py-3 text-slate-600">{pdf.username}</td>
							<td class="px-4 py-3 text-slate-600">{formatSize(pdf.size)}</td>
							<td class="px-4 py-3 text-slate-600">{formatDate(pdf.uploaded_at)}</td>
							<td class="px-4 py-3 text-right space-x-3 whitespace-nowrap">
								<a href="/download/{pdf.id}" class="text-blue-600 hover:underline">Download</a>
								<form method="POST" action="?/delete" class="inline">
									<input type="hidden" name="id" value={pdf.id} />
									<button class="text-red-600 hover:underline">Löschen</button>
								</form>
							</td>
						</tr>
					{/each}
				</tbody>
			</table>
		</div>
	{/if}
</div>