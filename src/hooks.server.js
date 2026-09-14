// Funktion importieren, die prüft, ob eine Session gültig ist
import { validateSession } from '$lib/server/auth';


// Diese Funktion wird bei jeder Anfrage ausgeführt
export async function handle({ event, resolve }) {

	// Session-Cookie aus dem Browser lesen
	const sessionId = event.cookies.get('session');

	// Falls eine Session-ID vorhanden ist:
	// Benutzer aus der Datenbank laden
	// Sonst user = null setzen
	event.locals.user = sessionId
		? await validateSession(sessionId) : null;

	return resolve(event);
}