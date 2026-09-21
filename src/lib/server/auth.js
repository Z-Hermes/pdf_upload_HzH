import pool from './db.js';
import bcrypt from 'bcrypt';
import { randomUUID } from 'crypto';

export async function hashPassword(password) {
	return await bcrypt.hash(password, 10);
}

export async function verifyPassword(password, hash) {
	return await bcrypt.compare(password, hash);
}

export async function createSession(userId) {
	const sessionId = randomUUID();
	const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);

	await pool.execute(
		`INSERT INTO sessions (id, user_id, expires_at)
		 VALUES (?, ?, ?)`,
		[sessionId, userId, expiresAt]
	);

	return sessionId;
}

export async function getSession(sessionId) {
	if (!sessionId) {
		return null;
	}

	try {
		const [rows] = await pool.execute(
			`SELECT 
				u.id,
				u.username,
				u.role
			FROM sessions AS s
			INNER JOIN users AS u ON s.user_id = u.id
			WHERE s.id = ?
			AND s.expires_at > NOW()
			LIMIT 1`,
			[sessionId]
		);

		return rows.length > 0 ? rows[0] : null;
	} catch (err) {
		console.error('Session database error:', err);
		return null;
	}
}

export async function invalidateSession(sessionId) {
	if (!sessionId) {
		return;
	}

	await pool.execute(
		'DELETE FROM sessions WHERE id = ?',
		[sessionId]
	);
}