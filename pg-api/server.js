// This Express app will make use of 'dotenv' and 'pg' libraries
const express = require('express');
const app = express();
const port = 3001;

const cors = require('cors');

app.use(cors());

require('dotenv').config();  // loads environment variables from .env file

const { Pool } = require('pg');

// DB connection pool
const pool = new Pool({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});
 
let cache = [];  // cache of all the current data
setInterval(fetchData, 5000); // dynamic database calls --day 86400000
fetchData(); // calls this function when the server start

// function to dynamically grab the distinct records from the main_table
async function fetchData(){
  try {
    const result = await pool.query('SELECT DISTINCT * FROM main_table');
    cache = result.rows;
  } catch (error) {
    console.error('Error fetching data from main_table:', error);
    res.status(500).json({ message: 'Error fetching data' });
  }
}

// give the front end the cache when it reqs it
app.get('/api/main_table', (req, res) => {
  res.json(cache);  // Send all rows as JSON response
});

// start the api server
app.listen(port, () => {
    console.log(`App running on port ${port}.`);
});

// test db connection
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

// test api
// Navigate to http://localhost:3001 to verify the Express server is running
app.get('/', (req, res) => {
  res.status(200).send('Hello World!');
});