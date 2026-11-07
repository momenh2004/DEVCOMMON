import path from 'node:path';
import { fileURLToPath } from 'node:url';
import express from 'express';
import { pool } from './db.js';

const app = express();
const __dirname = path.dirname(fileURLToPath(import.meta.url));

app.use(express.json());
app.use(express.static(path.join(__dirname, '../../frontend')));

app.get('/api/health', async (req, res) => {
  const [rows] = await pool.query('SELECT 1 AS ok');
  res.json({ db: rows[0].ok === 1 });
});

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`DEVCOMMON sur http://localhost:${port}`));