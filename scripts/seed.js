// Legt einen Test-User und einen Admin in der Datenbank an (einmalig ausführen)
import bcrypt from 'bcrypt';
import mysql from 'mysql2/promise';
import 'dotenv/config';

console.log('Verbinde mit:', process.env.DB_HOST, process.env.DB_NAME, process.env.DB_PORT);

try {
	const connection = await mysql.createConnection({
		host: process.env.DB_HOST,
		user: process.env.DB_USER,
		password: process.env.DB_PASSWORD,
		database: process.env.DB_NAME,
		port: process.env.DB_PORT
	});

	console.log('Verbindung erfolgreich.');

	const users = [
		{ username: 'admin', password: 'admin123', role: 'admin' },
		{ username: 'max', password: 'test123', role: 'user' }
	];

	for (const user of users) {
		const hash = await bcrypt.hash(user.password, 10);
		await connection.execute(
			'INSERT INTO users (username, password, role) VALUES (?, ?, ?)',
			[user.username, hash, user.role]
		);
		console.log(`Angelegt: ${user.username} (${user.role})`);
	}

	await connection.end();
	console.log('Fertig.');
} catch (err) {
	console.error('FEHLER:', err);
}