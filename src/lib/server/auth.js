// Verbindung zur Datenbank importieren
import pool from './db.js';
import bcrypt from 'bcrypt';
import { randomUUID } from 'crypto';

// Passwort hashen
export async function hashPassword(password) {
	return bcrypt.hash(password, 10);
}

// Passwort mit gespeichertem Hash vergleichen
export async function verifyPassword(password, hash) {
	return bcrypt.compare(password, hash);
}

// Neue Session erstellen (7 Tage gültig)
export async function createSession(userId) {
	const sessionId = randomUUID();
	const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);
	await pool.execute(
		'INSERT INTO sessions (id, user_id, expires_at) VALUES (?, ?, ?)',
		[sessionId, userId, expiresAt]
	);
	return sessionId;
}

// User anhand der Session-ID laden (inkl. Rolle)
export async function getSession(sessionId) {
	if (!sessionId) return null;
	const [rows] = await pool.execute(
		`SELECT u.id, u.username, u.role FROM sessions s
		 JOIN users u ON s.user_id = u.id
		 WHERE s.id = ? AND s.expires_at > NOW()`,
		[sessionId]
	);
	return rows[0] ?? null;
}

// Session löschen (Logout)
export async function invalidateSession(sessionId) {
	if (!sessionId) return;
	await pool.execute('DELETE FROM sessions WHERE id = ?', [sessionId]);
}