import { redirect, fail } from '@sveltejs/kit';
import { put } from '@vercel/blob';
import pool from '$lib/server/db.js';

export async function load({ locals }) {
	if (!locals.user) {
		throw redirect(303, '/login');
	}

	const [pdfs] = await pool.query(
		`SELECT id, original_name, size, uploaded_at
		 FROM pdfs
		 WHERE user_id = ?
		 ORDER BY uploaded_at DESC`,
		[locals.user.id]
	);

	return {
		pdfs
	};
}

export const actions = {
	upload: async ({ request, locals }) => {
		if (!locals.user) {
			throw redirect(303, '/login');
		}

		const formData = await request.formData();
		const file = formData.get('pdf');

		if (!file || file.size === 0) {
			return fail(400, {
				error: 'Bitte wähle eine PDF-Datei aus.'
			});
		}

		if (file.type !== 'application/pdf') {
			return fail(400, {
				error: 'Nur PDF-Dateien sind erlaubt.'
			});
		}

		const fileName = `${crypto.randomUUID()}-${file.name}`;

		const blob = await put(fileName, file, {
			access: 'private'
		});

		await pool.query(
			`INSERT INTO pdfs
			(user_id, original_name, stored_name, size)
			VALUES (?, ?, ?, ?)`,
			[
				locals.user.id,
				file.name,
				blob.pathname,
				file.size
			]
		);

		return {
			success: true
		};
	}
};