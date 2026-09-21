import { error, redirect } from '@sveltejs/kit';
import { get } from '@vercel/blob';
import pool from '$lib/server/db.js';
import { BLOB_READ_WRITE_TOKEN } from '$env/static/private';

export async function GET({ params, locals }) {
	if (!locals.user) {
		throw redirect(303, '/login');
	}

	const id = Number(params.id);

	if (!Number.isInteger(id)) {
		throw error(400, 'Ungültige PDF-ID.');
	}

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

	if (pdf.user_id !== locals.user.id && locals.user.role !== 'admin') {
		throw error(403, 'Keine Berechtigung.');
	}

	const result = await get(pdf.stored_name, {
		access: 'public',
		token: BLOB_READ_WRITE_TOKEN
	});

	if (!result) {
		throw error(404, 'Datei nicht gefunden.');
	}

	// Dateiname für den HTTP-Header sicher kodieren (Header erlauben keine Emojis/Sonderzeichen)
	const safeName = encodeURIComponent(pdf.original_name);

	return new Response(result.stream, {
		headers: {
			'Content-Type': 'application/pdf',
			'Content-Disposition': `attachment; filename*=UTF-8''${safeName}`
		}
	});
}
