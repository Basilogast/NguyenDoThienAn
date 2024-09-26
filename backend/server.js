import pkg from 'pg'; // Import the whole 'pg' package as 'pkg'
const { Pool } = pkg; // Destructure 'Pool' from 'pkg'

import express from 'express';
import cors from 'cors';
import multer from 'multer';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';

const app = express();
const port = 5000;

// PostgreSQL client setup
const pool = new Pool({
  user: 'workcardsuser',
  host: 'localhost',
  database: 'workcardsdb',
  password: 'Hung08112003',
  port: 5432,
});

// Get __dirname equivalent in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Create /uploads directory if it doesn't exist
const uploadDirectory = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadDirectory)) {
  fs.mkdirSync(uploadDirectory);
}

// Set up multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDirectory);
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const upload = multer({ storage });

// Serve static files from the uploads directory
app.use('/uploads', express.static(uploadDirectory));

// Other middleware
app.use(express.json()); // For parsing application/json
app.use(cors()); // Enable CORS

// Create table if it doesn't exist
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
    const baseUrl = `${req.protocol}://${req.get('host')}`;
    
    const workcards = result.rows.map(workcard => {
      // Log textPara for debugging
      console.log("textPara from database:", workcard.textpara);

      if (workcard.img) {
        workcard.img = `${baseUrl}${workcard.img}`;
      }
      if (workcard.pdfUrl) {
        workcard.pdfUrl = `${baseUrl}${workcard.pdfUrl}`;
      }
      return workcard;
    });
    
    res.json(workcards);
  } catch (error) {
    console.error(error);
    res.status(500).send('Server Error');
  }
});

// Add a new workcard (with image and PDF uploads)
app.post('/api/workcards', upload.fields([{ name: 'img' }, { name: 'pdfUrl' }]), async (req, res) => {
  const { size, text, textPara, detailsRoute } = req.body;

  // Handle uploaded files and set their URLs
  const img = req.files?.img ? `/uploads/${req.files.img[0].filename}` : null;
  const pdfUrl = req.files?.pdfUrl ? `/uploads/${req.files.pdfUrl[0].filename}` : null;

  try {
    // Split textPara into an array by commas (without stringifying)
    const textParaArray = textPara.split(',').map(item => item.trim());
    // Insert the workcard data into the database
    const result = await pool.query(
      'INSERT INTO workcards (size, img, text, "pdfUrl", "textPara", detailsRoute) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *',
      [size, img, text, pdfUrl, textParaArray, detailsRoute] // Ensure textPara is split into an array
    );
    
    // Return the workcard with absolute URLs
    const baseUrl = `${req.protocol}://${req.get('host')}`;
    const insertedWorkCard = result.rows[0];
    if (insertedWorkCard.img) {
      insertedWorkCard.img = `${baseUrl}${insertedWorkCard.img}`;
    }
    if (insertedWorkCard.pdfUrl) {
      insertedWorkCard.pdfUrl = `${baseUrl}${insertedWorkCard.pdfUrl}`;
    }

    res.status(201).json(insertedWorkCard);
  } catch (error) {
    console.error(error);
    res.status(500).send('Server Error');
  }
});

// Delete a workcard by ID
app.delete('/api/workcards/:id', async (req, res) => {
  const { id } = req.params;
  try {
    // Delete the workcard from the database
    await pool.query('DELETE FROM workcards WHERE id = $1', [id]);
    res.status(200).send('Workcard deleted successfully');
  } catch (error) {
    console.error(error);
    res.status(500).send('Server Error');
  }
});

// Update a workcard by ID (with image and PDF uploads)
app.put('/api/workcards/:id', upload.fields([{ name: 'img' }, { name: 'pdfUrl' }]), async (req, res) => {
  const { id } = req.params;
  const { size, text, textPara, detailsRoute } = req.body;

  // Handle uploaded files and set their URLs
  const img = req.files?.img ? `/uploads/${req.files.img[0].filename}` : null;
  const pdfUrl = req.files?.pdfUrl ? `/uploads/${req.files.pdfUrl[0].filename}` : null;

  try {
    // Split textPara into an array by commas (without stringifying)
    const textParaArray = textPara.split(',').map(item => item.trim());

    // Construct the SQL query dynamically depending on what data is provided
    const updates = [];
    const values = [];
    let query = 'UPDATE workcards SET ';

    if (size) {
      updates.push(`size = $${values.length + 1}`);
      values.push(size);
    }

    if (text) {
      updates.push(`text = $${values.length + 1}`);
      values.push(text);
    }

    if (textParaArray.length > 0) {
      updates.push(`"textPara" = $${values.length + 1}`);
      values.push(textParaArray);
    }

    if (detailsRoute) {
      updates.push(`detailsRoute = $${values.length + 1}`);
      values.push(detailsRoute);
    }

    if (img) {
      updates.push(`img = $${values.length + 1}`);
      values.push(img);
    }

    if (pdfUrl) {
      updates.push(`"pdfUrl" = $${values.length + 1}`);
      values.push(pdfUrl);
    }

    if (updates.length === 0) {
      return res.status(400).send('No updates provided.');
    }

    query += updates.join(', ') + ` WHERE id = $${values.length + 1} RETURNING *`;
    values.push(id);

    // Execute the update query
    const result = await pool.query(query, values);

    // Return the updated workcard
    const baseUrl = `${req.protocol}://${req.get('host')}`;
    const updatedWorkCard = result.rows[0];
    if (updatedWorkCard.img) {
      updatedWorkCard.img = `${baseUrl}${updatedWorkCard.img}`;
    }
    if (updatedWorkCard.pdfUrl) {
      updatedWorkCard.pdfUrl = `${baseUrl}${updatedWorkCard.pdfUrl}`;
    }

    res.status(200).json(updatedWorkCard);
  } catch (error) {
    console.error(error);
    res.status(500).send('Server Error');
  }
});

// Get a specific workcard by ID
app.get('/api/workcards/:id', async (req, res) => {
  const { id } = req.params; // Get the ID from the URL params
  try {
    const result = await pool.query('SELECT * FROM workcards WHERE id = $1', [id]);
    if (result.rows.length === 0) {
      return res.status(404).json({ message: "Workcard not found" });
    }
    res.json(result.rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).send('Server Error');
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
