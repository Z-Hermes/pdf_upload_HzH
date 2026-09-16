# PDF Upload

Eine SvelteKit-Webanwendung zum sicheren Hochladen und Verwalten von PDF-Dateien.

## Funktionen

- Benutzer-Login mit Sessions
- PDF-Dateien hochladen
- Eigene PDFs im Dashboard anzeigen
- PDFs herunterladen
- Admin-Bereich zur Verwaltung aller PDFs
- Rollen: `user` und `admin`
- Speicherung der PDF-Dateien über Vercel Blob
- MySQL-Datenbank für Benutzer, Sessions und PDF-Daten

## Voraussetzungen

- Node.js
- MySQL-Datenbank
- Vercel Blob Storage

## Installation

Repository klonen und Abhängigkeiten installieren:

```sh
npm install