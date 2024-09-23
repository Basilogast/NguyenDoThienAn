import pkg from 'pg'; // Import the whole 'pg' package as 'pkg'
const { Pool } = pkg; // Destructure 'Pool' from 'pkg'

import express from 'express';
import cors from 'cors';

const app = express();
const port = 5000;

app.use(express.json()); // For parsing application/json
app.use(cors());

// PostgreSQL client setup
const pool = new Pool({
  user: 'workcardsuser',
  host: 'localhost',
  database: 'workcardsdb',
  password: 'yourpassword',
  port: 5432,
});

// Create table
const createTable = async () => {
  await pool.query(`
    CREATE TABLE IF NOT EXISTS workcards (
      id SERIAL PRIMARY KEY,
      size VARCHAR(50),
      img TEXT,
      text TEXT,
      pdfUrl TEXT,
      textPara TEXT[],
      detailsRoute VARCHAR(255)
    )
  `);
};

createTable();

// Get all workcards
app.get('/api/workcards', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM workcards');
    res.json(result.rows);
  } catch (error) {
    console.error(error);
    res.status(500).send('Server Error');
  }
});

// Add a new workcard
app.post('/api/workcards', async (req, res) => {
  const { size, img, text, pdfUrl, textPara, detailsRoute } = req.body;
  try {
    const result = await pool.query(
      'INSERT INTO workcards (size, img, text, pdfUrl, textPara, detailsRoute) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *',
      [size, img, text, pdfUrl, textPara, detailsRoute]
    );
    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).send('Server Error');
  }
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
