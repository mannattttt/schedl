import axios from 'axios'

const api = axios.create({
  baseURL: import.meta.env.PROD 
    ? 'https://schedl-production.up.railway.app/api' 
    : 'http://localhost:3001/api'
})
export const getEventTypes = () => api.get('/event-types')
export const createEventType = (data) => api.post('/event-types', data)
export const updateEventType = (id, data) => api.put(`/event-types/${id}`, data)
export const deleteEventType = (id) => api.delete(`/event-types/${id}`)

export const getAvailability = () => api.get('/availability')
export const saveAvailability = (slots) => api.post('/availability', { slots })

export const getBookings = () => api.get('/bookings')
export const getAvailableSlots = (event_type_id, date) => 
  api.get(`/bookings/slots?event_type_id=${event_type_id}&date=${date}`)
export const createBooking = (data) => api.post('/bookings', data)
export const cancelBooking = (id) => api.patch(`/bookings/${id}/cancel`)