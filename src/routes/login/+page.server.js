// Verbindung zur Datenbank und Auth-Funktionen importieren
import pool from '$lib/server/db.js';
import { verifyPassword, createSession } from '$lib/server/auth.js';
import { fail, redirect } from '@sveltejs/kit';

export const actions = {
	default: async ({ request, cookies }) => {
		// Formulardaten auslesen
		const data = await request.formData();
		const username = data.get('username');
		const password = data.get('password');

		// User in der Datenbank suchen
		const [rows] = await pool.execute('SELECT * FROM users WHERE username = ?', [username]);
		const user = rows[0];

		// Prüfen ob User existiert und Passwort stimmt
		if (!user || !(await verifyPassword(password, user.password))) {
			return fail(400, { error: 'Benutzername oder Passwort falsch' });
		}

		// Session erstellen und als Cookie speichern
		const sessionId = await createSession(user.id);
		cookies.set('session', sessionId, {
			path: '/',
			httpOnly: true,
			maxAge: 60 * 60 * 24 * 7 // 7 Tage
		});

		// Je nach Rolle weiterleiten
		throw redirect(303, user.role === 'admin' ? '/admin' : '/dashboard');
	}
};