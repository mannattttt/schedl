const pool = require('../db/connection')

const USER_ID = 1

exports.getAll = async (req, res) => {
  try {
    const result = await pool.query(
      'SELECT * FROM availability WHERE user_id = $1 ORDER BY day_of_week',
      [USER_ID]
    )
    res.json(result.rows)
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
}

exports.save = async (req, res) => {
  const { slots } = req.body // array of { day_of_week, start_time, end_time }
  try {
    await pool.query('DELETE FROM availability WHERE user_id = $1', [USER_ID])
    for (const slot of slots) {
      await pool.query(
        'INSERT INTO availability (user_id, day_of_week, start_time, end_time) VALUES ($1,$2,$3,$4)',
        [USER_ID, slot.day_of_week, slot.start_time, slot.end_time]
      )
    }
    res.json({ message: 'Saved' })
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
}