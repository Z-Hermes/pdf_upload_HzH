// Legt einen Test-User und einen Admin in der Datenbank an (einmalig ausführen)
import bcrypt from 'bcrypt';
import mysql from 'mysql2/promise';
import 'dotenv/config'; // lädt die .env-Datei, damit process.env.* verfügbar ist

// Zeigt an, mit welcher Datenbank sich das Skript verbindet (zum Debuggen)
console.log('Verbinde mit:', process.env.DB_HOST, process.env.DB_NAME, process.env.DB_PORT);

try {
	// Direkte Einzelverbindung zur Datenbank aufbauen (kein Pool nötig, da Skript nur einmal läuft)
	const connection = await mysql.createConnection({
		host: process.env.DB_HOST,
		user: process.env.DB_USER,
		password: process.env.DB_PASSWORD,
		database: process.env.DB_NAME,
		port: process.env.DB_PORT
	});

	console.log('Verbindung erfolgreich.');

	// Liste der Test-Accounts, die angelegt werden sollen
	const users = [
		{ username: 'admin', password: 'admin123', role: 'admin' },
		{ username: 'max', password: 'test123', role: 'user' }
	];

	// Für jeden User: Passwort hashen und in die Datenbank einfügen
	for (const user of users) {
		// Passwort niemals im Klartext speichern -> mit bcrypt hashen (10 Salt-Rounds)
		const hash = await bcrypt.hash(user.password, 10);

		// User mit gehashtem Passwort in die users-Tabelle einfügen
		await connection.execute(
			'INSERT INTO users (username, password, role) VALUES (?, ?, ?)',
			[user.username, hash, user.role]
		);
		console.log(`Angelegt: ${user.username} (${user.role})`);
	}

	// Verbindung sauber schließen, da wir sie nicht mehr brauchen
	await connection.end();
	console.log('Fertig.');
} catch (err) {
	// Fängt z. B. falsche Zugangsdaten oder Verbindungsprobleme ab
	console.error('FEHLER:', err);
}