// This Express app will make use of 'dotenv' and 'pg' libraries
const express = require('express')
const app = express()
const port = 3001

require('dotenv').config();  // loads environment variables from .env file

const { Pool } = require('pg');

// Create a new pool instance with database connection configuration
const pool = new Pool({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

// Test route
// Navigate to http://localhost:3001 to verify the Express server is running
app.get('/', (req, res) => {
    res.status(200).send('Hello World!');
  })
 
// Test route
// Navigate to http://localhost:3001/test-db in the browser to test connection to the DB
app.get('/test-db', async (req, res) => {
    try {
      const result = await pool.query('SELECT NOW()');
      res.json({ message: "Database connected successfully!", data: result.rows });
    } catch (error) {
      console.error('Database connection error:', error);
      res.status(500).json({ message: 'Database connection failed', error });
    }
  });

  
app.listen(port, () => {
    console.log(`App running on port ${port}.`)
  })

