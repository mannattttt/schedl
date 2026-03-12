const pool = require('../db/connection')
const USER_ID = 1
const { sendBookingConfirmation, sendCancellationEmail } = require('../utils/emails')

exports.getAll = async (req, res) => {
  try {
    const result = await pool.query(`
      SELECT b.*, e.title, e.duration, e.slug
      FROM bookings b
      JOIN event_types e ON b.event_type_id = e.id
      WHERE e.user_id = $1
      ORDER BY b.start_time DESC
    `, [USER_ID])
    res.json(result.rows)
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
}

exports.getAvailableSlots = async (req, res) => {
  const { event_type_id, date } = req.query
  try {
    const eventResult = await pool.query('SELECT * FROM event_types WHERE id = $1', [event_type_id])
    const event = eventResult.rows[0]

    const dayOfWeek = new Date(date).getDay()
    const availResult = await pool.query(
      'SELECT * FROM availability WHERE user_id = $1 AND day_of_week = $2',
      [USER_ID, dayOfWeek]
    )

    if (availResult.rows.length === 0) return res.json([])

    const { start_time, end_time } = availResult.rows[0]
    const bookingsResult = await pool.query(
      `SELECT * FROM bookings WHERE event_type_id = $1 
       AND DATE(start_time) = $2 AND status = 'confirmed'`,
      [event_type_id, date]
    )

    const totalSlotTime = event.duration + (event.buffer_time || 0)
    const bookedTimes = bookingsResult.rows.map(b => new Date(b.start_time).toISOString())

    const slots = []
    let current = new Date(`${date}T${start_time}`)
    const endLimit = new Date(`${date}T${end_time}`)

    while (current < endLimit) {
      const slotEnd = new Date(current.getTime() + totalSlotTime * 60000)
      if (slotEnd <= endLimit) {
        const isBooked = bookedTimes.includes(current.toISOString())
        if (!isBooked) slots.push(current.toISOString())
      }
      current = new Date(current.getTime() + totalSlotTime * 60000)
    }

    res.json(slots)
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
}

exports.create = async (req, res) => {
  const { event_type_id, booker_name, booker_email, start_time } = req.body
  try {
    const eventResult = await pool.query('SELECT * FROM event_types WHERE id = $1', [event_type_id])
    const event = eventResult.rows[0]
    const end_time = new Date(new Date(start_time).getTime() + event.duration * 60000)

    // Check for double booking
    const conflict = await pool.query(
      `SELECT * FROM bookings WHERE event_type_id = $1 
       AND start_time = $2 AND status = 'confirmed'`,
      [event_type_id, start_time]
    )
    if (conflict.rows.length > 0) return res.status(409).json({ error: 'Slot already booked' })

    const result = await pool.query(
      'INSERT INTO bookings (event_type_id, booker_name, booker_email, start_time, end_time) VALUES ($1,$2,$3,$4,$5) RETURNING *',
      [event_type_id, booker_name, booker_email, start_time, end_time]
    )
    const booking = result.rows[0]

    try {
    await sendBookingConfirmation({
        booker_name,
        booker_email,
        title: event.title,
        start_time,
        duration: event.duration,
        host_email: process.env.EMAIL_USER
    })
} catch (err) {
  console.error("Email failed:", err)
}
    res.status(201).json(result.rows[0])
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
}

exports.cancel = async (req, res) => {
  const { id } = req.params

  try {

    const bookingResult = await pool.query(
      `SELECT b.*, e.title 
       FROM bookings b
       JOIN event_types e ON b.event_type_id = e.id
       WHERE b.id = $1`,
      [id]
    )

    const booking = bookingResult.rows[0]

    const result = await pool.query(
      "UPDATE bookings SET status = 'cancelled' WHERE id = $1 RETURNING *",
      [id]
    )

    await sendCancellationEmail({
      booker_name: booking.booker_name,
      booker_email: booking.booker_email,
      title: booking.title,
      start_time: booking.start_time
    })

    res.json(result.rows[0])

  } catch (err) {
    res.status(500).json({ error: err.message })
  }
}
