const pool = require('./connection')

async function seed() {
  // Default user
  await pool.query(`
    INSERT INTO users (name, username, email, timezone)
    VALUES ('John Doe', 'john', 'john@example.com', 'Asia/Kolkata')
    ON CONFLICT (username) DO NOTHING
  `)

  const { rows } = await pool.query(`SELECT id FROM users WHERE username = 'john'`)
  const userId = rows[0].id

  // Event types
  await pool.query(`
    INSERT INTO event_types (user_id, title, slug, description, duration)
    VALUES
      ($1, '30 Minute Meeting', '30min', 'A quick 30-minute call.', 30),
      ($1, '60 Minute Meeting', '60min', 'A deep-dive 1 hour session.', 60),
      ($1, 'Quick Chat', 'quick-chat', 'A 15-minute intro call.', 15)
    ON CONFLICT DO NOTHING
  `, [userId])

  // Availability (Mon-Fri, 9am-5pm)
  for (let day = 1; day <= 5; day++) {
    await pool.query(`
      INSERT INTO availability (user_id, day_of_week, start_time, end_time)
      VALUES ($1, $2, '09:00', '17:00')
      ON CONFLICT DO NOTHING
    `, [userId, day])
  }

  console.log('Seeded!')
  process.exit()
}

seed()