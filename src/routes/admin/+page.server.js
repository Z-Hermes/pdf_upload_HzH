// Datenbankverbindung und Blob-Funktionen importieren
import pool from '$lib/server/db.js';
import { del } from '@vercel/blob';
import { fail } from '@sveltejs/kit';
import { BLOB_READ_WRITE_TOKEN } from '$env/static/private';

// Lädt alle PDFs aller User, inkl. Benutzername
export async function load() {
	const [pdfs] = await pool.execute(`
		SELECT pdfs.id, pdfs.original_name, pdfs.stored_name, pdfs.size, pdfs.uploaded_at, users.username
		FROM pdfs
		JOIN users ON pdfs.user_id = users.id
		ORDER BY pdfs.uploaded_at DESC
	`);
	return { pdfs };
}

export const actions = {
	// Löscht ein PDF: Datei aus Vercel Blob + Eintrag aus der DB
	delete: async ({ request }) => {
		const data = await request.formData();
		const id = data.get('id');

		const [rows] = await pool.execute('SELECT * FROM pdfs WHERE id = ?', [id]);
		const pdf = rows[0];

		if (!pdf) {
			return fail(404, { error: 'PDF nicht gefunden' });
		}

		// Datei aus dem Blob-Store löschen
		try {
			await del(pdf.stored_name, { token: BLOB_READ_WRITE_TOKEN });
		} catch (err) {
			console.error('Blob konnte nicht gelöscht werden:', err);
		}

		// Eintrag aus der Datenbank löschen
		await pool.execute('DELETE FROM pdfs WHERE id = ?', [id]);

		return { success: true };
	}
};