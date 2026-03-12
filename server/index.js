const express = require('express')
const cors = require('cors')
require('dotenv').config()

const eventTypesRouter = require('./routes/eventTypes')
const availabilityRouter = require('./routes/availability')
const bookingsRouter = require('./routes/bookings')

const app = express()

app.use(cors({
  origin: ['http://localhost:5173', 'https://schedl.vercel.app']
}))
app.use(express.json())

app.use('/api/event-types', eventTypesRouter)
app.use('/api/availability', availabilityRouter)
app.use('/api/bookings', bookingsRouter)

const PORT = process.env.PORT || 5000
app.listen(3001, '127.0.0.1', () => {
  console.log('Server running on port 3001')
})