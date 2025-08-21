import sqlite3 from 'sqlite3';
import { open } from 'sqlite';
import path from 'path';
import { fileURLToPath } from 'url';


const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


export async function openDB() {
return open({
filename: path.join(__dirname, 'sentiments.db'),
driver: sqlite3.Database
});
}


export async function initDB() {
const db = await openDB();
await db.run(`
CREATE TABLE IF NOT EXISTS sentiments (
id INTEGER PRIMARY KEY AUTOINCREMENT,
text TEXT NOT NULL,
label TEXT NOT NULL,
created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);
`);
return db;
}