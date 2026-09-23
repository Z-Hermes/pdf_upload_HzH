// Auth-Funktion importieren
import { invalidateSession } from '$lib/server/auth.js';

// Redirect Funktion von SvelteKit (Weiterleitung nach Logout)
import { redirect } from '@sveltejs/kit';

// load() wird automatisch ausgeführt, sobald die Seite /logout aufgerufen wird
export async function load({ cookies }) {
	// Session-ID aus Cookie holen (aktuell eingeloggter User)
	const sessionId = cookies.get('session');

	// Session aus der Datenbank löschen
	await invalidateSession(sessionId);

	// Cookie im Browser löschen (User wird ausgeloggt)
	cookies.delete('session', { path: '/' });

	// Zur Startseite weiterleiten
	throw redirect(303, '/');
}