import { error, redirect } from '@sveltejs/kit';
import { get } from '@vercel/blob';
import pool from '$lib/server/db.js';

export async function GET({ params, locals }) {
	// Nicht eingeloggt
	if (!locals.user) {
		throw redirect(303, '/login');
	}

	const id = Number(params.id);

	if (!Number.isInteger(id)) {
		throw error(400, 'Ungültige PDF-ID.');
	}

	// PDF aus der Datenbank laden
	const [rows] = await pool.execute(
		`SELECT id, user_id, original_name, stored_name
		 FROM pdfs
		 WHERE id = ?`,
		[id]
	);

	const pdf = rows[0];

	if (!pdf) {
		throw error(404, 'PDF nicht gefunden.');
	}

	// Nur Besitzer oder Admin dürfen die Datei herunterladen
	if (pdf.user_id !== locals.user.id && locals.user.role !== 'admin') {
		throw error(403, 'Keine Berechtigung.');
	}

	// Private Blob-Datei abrufen
	const blob = await get(pdf.stored_name, {
		access: 'private'
	});

	if (!blob) {
		throw error(404, 'Datei nicht gefunden.');
	}

	return new Response(blob.stream, {
		headers: {
			'Content-Type': 'application/pdf',
			'Content-Disposition': `attachment; filename="${encodeURIComponent(pdf.original_name)}"`
		}
	});
}