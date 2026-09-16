<script>
	let { data, form } = $props();

	let selectedFile = null;

	function handleFileChange(event) {
		selectedFile = event.target.files[0];
	}
</script>

<svelte:head><title>Dashboard – PDF Upload</title> <meta
 	name="description"
 	content="Verwalte deine hochgeladenen PDF-Dateien."
 />
</svelte:head>

<div class="dashboard">
	<section class="header">
		<div>
			<p class="eyebrow">DASHBOARD</p>
			<h1>Meine PDFs</h1>
			<p class="subtitle">
				Lade deine PDF-Dateien hoch und verwalte deine Dokumente.
			</p>
		</div>
	</section>

<section class="upload-section">
	<div class="section-title">
		<h2>PDF hochladen</h2>
		<p>Wähle eine PDF-Datei von deinem Computer aus.</p>
	</div>

	<form method="POST" action="?/upload" enctype="multipart/form-data">
		<label class="file-input">
			<span class="file-label">
				{#if selectedFile}
					{selectedFile.name}
				{:else}
					PDF-Datei auswählen
				{/if}
			</span>

			<input
				type="file"
				name="pdf"
				accept="application/pdf"
				onchange={handleFileChange}
			/>
		</label>

		<button type="submit" disabled={!selectedFile}>
			PDF hochladen
		</button>
	</form>

	{#if form?.error}
		<p class="message error">{form.error}</p>
	{/if}

	{#if form?.success}
		<p class="message success">
			Die PDF wurde erfolgreich hochgeladen.
		</p>
	{/if}
</section>

<section class="files-section">
	<div class="section-title">
		<h2>Meine Dateien</h2>
		<p>Hier findest du alle deine hochgeladenen PDFs.</p>
	</div>

	{#if data.pdfs.length === 0}
		<div class="empty-state">
			<div class="empty-icon">📄</div>
			<h3>Noch keine PDFs</h3>
			<p>
				Du hast bisher keine PDF-Dateien hochgeladen.
			</p>
		</div>
	{:else}
		<div class="file-list">
			{#each data.pdfs as pdf (pdf.id)}
				<div class="file-card">
					<div class="file-info">
						<div class="pdf-icon">PDF</div>

						<div>
							<h3>{pdf.original_name}</h3>

							<p>
								{formatFileSize(pdf.size)}
								<span>•</span>
								{formatDate(pdf.uploaded_at)}
							</p>
						</div>
					</div>

					<a
						class="download-button"
						href={`/download/${pdf.id}`}
					>
						Download
					</a>
				</div>
			{/each}
		</div>
	{/if}
</section>

</div>

<script module>
	export function formatFileSize(bytes) {
		if (bytes < 1024) {
			return `${bytes} B`;
		}

		if (bytes < 1024 * 1024) {
			return `${(bytes / 1024).toFixed(1)} KB`;
		}

		return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
	}

	export function formatDate(date) {
		return new Date(date).toLocaleDateString('de-DE', {
			day: '2-digit',
			month: '2-digit',
			year: 'numeric'
		});
	}
</script>

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

	.dashboard {
		max-width: 1100px;
		margin: 0 auto;
		padding: 60px 24px 100px;
	}

	.header {
		margin-bottom: 45px;
	}

	.eyebrow {
		margin: 0 0 10px;
		font-size: 0.8rem;
		font-weight: 800;
		letter-spacing: 0.12em;
		color: #2563eb;
	}

	h1 {
		margin: 0;
		font-size: clamp(2.5rem, 5vw, 4rem);
		letter-spacing: -0.04em;
	}

	.subtitle {
		margin: 15px 0 0;
		color: #64748b;
		font-size: 1.05rem;
	}

	.upload-section,
	.files-section {
		margin-bottom: 45px;
	}

	.section-title {
		margin-bottom: 20px;
	}

	.section-title h2 {
		margin: 0 0 6px;
		font-size: 1.5rem;
	}

	.section-title p {
		margin: 0;
		color: #64748b;
	}

	form {
		display: flex;
		gap: 12px;
		align-items: stretch;
	}

	.file-input {
		position: relative;
		flex: 1;
		cursor: pointer;
	}

	.file-label {
		display: block;
		padding: 13px 16px;
		border: 1px solid #cbd5e1;
		border-radius: 10px;
		background: white;
		color: #475569;
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
	}

	input[type="file"] {
		position: absolute;
		inset: 0;
		width: 100%;
		height: 100%;
		opacity: 0;
		cursor: pointer;
	}

	button,
	.download-button {
		padding: 13px 20px;
		border: none;
		border-radius: 10px;
		background: #2563eb;
		color: white;
		font-size: 0.95rem;
		font-weight: 700;
		text-decoration: none;
		cursor: pointer;
		transition:
			background 0.2s,
			transform 0.2s;
	}

	button:hover:not(:disabled),
	.download-button:hover {
		background: #1d4ed8;
		transform: translateY(-1px);
	}

	button:disabled {
		background: #94a3b8;
		cursor: not-allowed;
	}

	.message {
		margin: 15px 0 0;
		padding: 12px 15px;
		border-radius: 8px;
		font-weight: 500;
	}

	.error {
		background: #fee2e2;
		color: #991b1b;
	}

	.success {
		background: #dcfce7;
		color: #166534;
	}

	.file-list {
		display: flex;
		flex-direction: column;
		gap: 12px;
	}

	.file-card {
		display: flex;
		align-items: center;
		justify-content: space-between;
		gap: 20px;
		padding: 18px 20px;
		background: white;
		border: 1px solid #e2e8f0;
		border-radius: 12px;
	}

	.file-info {
		display: flex;
		align-items: center;
		gap: 15px;
		min-width: 0;
	}

	.pdf-icon {
		display: flex;
		align-items: center;
		justify-content: center;
		flex-shrink: 0;
		width: 45px;
		height: 45px;
		border-radius: 8px;
		background: #fee2e2;
		color: #dc2626;
		font-size: 0.7rem;
		font-weight: 800;
	}

	.file-card h3 {
		margin: 0 0 5px;
		font-size: 1rem;
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
	}

	.file-card p {
		margin: 0;
		color: #64748b;
		font-size: 0.85rem;
	}

	.file-card p span {
		margin: 0 5px;
	}

	.empty-state {
		padding: 60px 20px;
		text-align: center;
		background: white;
		border: 1px dashed #cbd5e1;
		border-radius: 12px;
	}

	.empty-icon {
		font-size: 2.5rem;
		margin-bottom: 15px;
	}

	.empty-state h3 {
		margin: 0 0 8px;
	}

	.empty-state p {
		margin: 0;
		color: #64748b;
	}

	@media (max-width: 650px) {
		.dashboard {
			padding: 40px 18px 70px;
		}

		form {
			flex-direction: column;
		}

		.file-card {
			align-items: flex-start;
			flex-direction: column;
		}

		.download-button {
			width: 100%;
			text-align: center;
		}
	}
</style>
