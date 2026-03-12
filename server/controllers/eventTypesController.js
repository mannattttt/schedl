const pool = require('../db/connection')

const USER_ID = 1 // default logged in user

exports.getAll = async (req, res) => {
  try {
    const result = await pool.query(
      'SELECT * FROM event_types WHERE user_id = $1 ORDER BY created_at DESC',
      [USER_ID]
    )
    res.json(result.rows)
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
}

exports.create = async (req, res) => {
  const { title, slug, description, duration } = req.body
  try {
    const result = await pool.query(
      'INSERT INTO event_types (user_id, title, slug, description, duration) VALUES ($1,$2,$3,$4,$5) RETURNING *',
      [USER_ID, title, slug, description, duration]
    )
    res.status(201).json(result.rows[0])
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
}

exports.update = async (req, res) => {
  const { id } = req.params
  const { title, slug, description, duration } = req.body
  try {
    const result = await pool.query(
      'UPDATE event_types SET title=$1, slug=$2, description=$3, duration=$4 WHERE id=$5 AND user_id=$6 RETURNING *',
      [title, slug, description, duration, id, USER_ID]
    )
    res.json(result.rows[0])
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
}

exports.remove = async (req, res) => {
  const { id } = req.params
  try {
    await pool.query('DELETE FROM event_types WHERE id=$1 AND user_id=$2', [id, USER_ID])
    res.json({ message: 'Deleted' })
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
}
