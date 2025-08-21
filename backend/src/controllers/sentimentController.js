import { initDB } from '../db/sqlite.js';
import { getSentimentFromPython } from '../services/pythonService.js';


let db;
(async () => { db = await initDB(); })();


export async function analyzeSentiment(req, res) {
try {
const { text } = req.body;
if (!text) return res.status(400).json({ error: 'Text is required' });


// 1) Call Python service
const sentiment = await getSentimentFromPython(text);


// 2) Store in DB
const result = await db.run(`INSERT INTO sentiments (text, label) VALUES (?, ?)`, [text, sentiment.label]);


// 3) Return result
res.json({ id: result.lastID, text, ...sentiment });
} catch (err) {
console.error(err);
res.status(500).json({ error: 'Server error' });
}
}


export async function getHistory(req, res) {
try {
const rows = await db.all('SELECT * FROM sentiments ORDER BY created_at DESC');
res.json(rows);
} catch (err) {
console.error(err);
res.status(500).json({ error: 'Server error' });
}
}