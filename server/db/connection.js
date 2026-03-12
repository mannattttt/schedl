const { Pool } = require('pg')

const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'cal_clone',
  password: null,
  port: 5432,
})

pool.on('error', (err) => {
  console.error('Unexpected error on idle client', err)
})

pool.query('SELECT NOW()', (err, res) => {
  if (err) {
    console.error('DB Connection failed:', err.message)
  } else {
    console.log('DB Connected successfully at', res.rows[0].now)
  }
})

module.exports = pool