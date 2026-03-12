const { Pool } = require('pg')

const pool = new Pool({
  connectionString: 'postgresql://neondb_owner:npg_N3sg4YJQdixz@ep-shy-dust-a1dws3rm-pooler.ap-southeast-1.aws.neon.tech/neondb?sslmode=require&channel_binding=require',
  ssl: { rejectUnauthorized: false }
})

pool.query('SELECT NOW()', (err, res) => {
  if (err) {
    console.error('DB Connection failed:', err.message)
  } else {
    console.log('DB Connected successfully at', res.rows[0].now)
  }
})

module.exports = pool