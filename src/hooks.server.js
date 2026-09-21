// Auth-Funktion importieren, um die Session anhand des Cookies aufzulösen
import { getSession } from '$lib/server/auth.js';

// handle() läuft bei JEDEM Request, bevor die eigentliche Route verarbeitet wird
export async function handle({ event, resolve }) {
	// Session-Cookie aus dem Request auslesen
	const sessionId = event.cookies.get('session');

	// Eingeloggten User (oder null, falls keine gültige Session) global verfügbar machen
	// -> ab jetzt in jeder +page.server.js über "locals.user" nutzbar
	event.locals.user = await getSession(sessionId);

	const path = event.url.pathname;

	// Dashboard ist nur für eingeloggte User mit Rolle "user" zugänglich
	if (path.startsWith('/dashboard') && event.locals.user?.role !== 'user') {
		return new Response(null, { status: 303, headers: { location: '/login' } });
	}

	// Admin-Bereich ist nur für eingeloggte User mit Rolle "admin" zugänglich
	if (path.startsWith('/admin') && event.locals.user?.role !== 'admin') {
		return new Response(null, { status: 303, headers: { location: '/login' } });
	}

	// Request normal weiterverarbeiten (Route rendern)
	return resolve(event);
}