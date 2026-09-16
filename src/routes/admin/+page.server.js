// Datenbankverbindung importieren
import pool from '$lib/server/db.js';
import fs from 'fs/promises';
import { fail } from '@sveltejs/kit';

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
	// Löscht ein PDF: Datei von der Platte + Eintrag aus der DB
	delete: async ({ request }) => {
		const data = await request.formData();
		const id = data.get('id');

		const [rows] = await pool.execute('SELECT * FROM pdfs WHERE id = ?', [id]);
		const pdf = rows[0];

		if (!pdf) {
			return fail(404, { error: 'PDF nicht gefunden' });
		}

		// Datei von der Festplatte löschen
		try {
			await fs.unlink(`uploads/${pdf.stored_name}`);
		} catch (err) {
			console.error('Datei konnte nicht gelöscht werden:', err);
		}

		// Eintrag aus der Datenbank löschen
		await pool.execute('DELETE FROM pdfs WHERE id = ?', [id]);

		return { success: true };
	}
};