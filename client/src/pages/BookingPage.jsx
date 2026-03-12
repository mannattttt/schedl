import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { getEventTypes, getAvailableSlots, createBooking } from '../services/api'
import dayjs from 'dayjs'

export default function BookingPage() {
  const { username, slug } = useParams()
  const navigate = useNavigate()

  const [eventType, setEventType] = useState(null)
  const [selectedDate, setSelectedDate] = useState(null)
  const [slots, setSlots] = useState([])
  const [selectedSlot, setSelectedSlot] = useState(null)
  const [form, setForm] = useState({ name: '', email: '' })
  const [currentMonth, setCurrentMonth] = useState(dayjs())
  const [loading, setLoading] = useState(true)
  const [slotsLoading, setSlotsLoading] = useState(false)
  const [step, setStep] = useState('calendar') // calendar, form

  useEffect(() => {
    getEventTypes().then(res => {
      const found = res.data.find(e => e.slug === slug)
      setEventType(found)
      setLoading(false)
    })
  }, [slug])

  useEffect(() => {
    if (selectedDate && eventType) {
      setSlotsLoading(true)
      getAvailableSlots(eventType.id, selectedDate.format('YYYY-MM-DD')).then(res => {
        setSlots(res.data)
        setSlotsLoading(false)
      })
    }
  }, [selectedDate, eventType])

  const handleDateClick = (date) => {
    if (date.isBefore(dayjs(), 'day')) return
    setSelectedDate(date)
    setSelectedSlot(null)
    setStep('calendar')
  }

  const handleSlotClick = (slot) => {
    setSelectedSlot(slot)
    setStep('form')
  }

  const handleBook = async () => {
    if (!form.name || !form.email) return alert('Please fill in all fields')
    await createBooking({
      event_type_id: eventType.id,
      booker_name: form.name,
      booker_email: form.email,
      start_time: selectedSlot,
    })
    navigate('/confirmation', {
      state: {
        name: form.name,
        email: form.email,
        title: eventType.title,
        duration: eventType.duration,
        start_time: selectedSlot,
      }
    })
  }

  // Calendar helpers
  const startOfMonth = currentMonth.startOf('month')
  const daysInMonth = currentMonth.daysInMonth()
  const firstDayOfWeek = startOfMonth.day()
  const calendarDays = []
  for (let i = 0; i < firstDayOfWeek; i++) calendarDays.push(null)
  for (let i = 1; i <= daysInMonth; i++) calendarDays.push(currentMonth.date(i))

  if (loading) return <div style={{ padding: 40, color: '#888' }}>Loading...</div>
  if (!eventType) return <div style={{ padding: 40, color: '#888' }}>Event type not found</div>

  return (
    <div style={{ minHeight: '100vh', background: '#fafafa', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 24 }}>
      <div style={{ background: '#fff', border: '1.5px solid #ebebeb', borderRadius: 16, overflow: 'hidden', boxShadow: '0 8px 40px rgba(0,0,0,0.08)', display: 'flex', maxWidth: 860, width: '100%', minHeight: 500 }}>

        {/* Left Panel */}
        <div style={{ width: 280, borderRight: '1px solid #f0f0f0', padding: '32px 24px', flexShrink: 0 }}>
          <div style={{ width: 44, height: 44, borderRadius: '50%', background: 'linear-gradient(135deg, #6366f1, #a855f7)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontWeight: 700, fontSize: 18, marginBottom: 16 }}>
            J
          </div>
          <div style={{ fontSize: 13, color: '#888', marginBottom: 4 }}>John Doe</div>
          <div style={{ fontSize: 22, fontWeight: 700, color: '#111', marginBottom: 16, letterSpacing: '-0.02em' }}>{eventType.title}</div>

          <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 8 }}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#888" strokeWidth="2"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
            <span style={{ fontSize: 13, color: '#666' }}>{eventType.duration} minutes</span>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 16 }}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#888" strokeWidth="2"><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>
            <span style={{ fontSize: 13, color: '#666' }}>Asia/Kolkata</span>
          </div>

          {eventType.description && (
            <p style={{ fontSize: 13, color: '#888', lineHeight: 1.6, padding: '12px 14px', background: '#f9fafb', borderRadius: 8 }}>
              {eventType.description}
            </p>
          )}

          {selectedDate && selectedSlot && (
            <div style={{ marginTop: 24, padding: '12px 14px', background: '#f0fdf4', borderRadius: 8, border: '1px solid #bbf7d0' }}>
              <div style={{ fontSize: 12, fontWeight: 600, color: '#16a34a', marginBottom: 4 }}>Selected</div>
              <div style={{ fontSize: 13, color: '#111', fontWeight: 500 }}>
                {dayjs(selectedSlot).format('ddd, MMM D')}
              </div>
              <div style={{ fontSize: 13, color: '#444' }}>
                {dayjs(selectedSlot).format('h:mm A')}
              </div>
            </div>
          )}
        </div>

        {/* Right Panel */}
        <div style={{ flex: 1, padding: '32px 28px' }}>
          {step === 'calendar' && (
            <>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
                <span style={{ fontSize: 15, fontWeight: 600, color: '#111' }}>
                  {currentMonth.format('MMMM YYYY')}
                </span>
                <div style={{ display: 'flex', gap: 8 }}>
                  <button onClick={() => setCurrentMonth(m => m.subtract(1, 'month'))}
                    style={{ background: '#f5f5f5', border: 'none', borderRadius: 6, width: 28, height: 28, cursor: 'pointer', fontSize: 14 }}>‹</button>
                  <button onClick={() => setCurrentMonth(m => m.add(1, 'month'))}
                    style={{ background: '#f5f5f5', border: 'none', borderRadius: 6, width: 28, height: 28, cursor: 'pointer', fontSize: 14 }}>›</button>
                </div>
              </div>

              {/* Calendar Grid */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: 4, marginBottom: 24 }}>
                {['Su','Mo','Tu','We','Th','Fr','Sa'].map(d => (
                  <div key={d} style={{ textAlign: 'center', fontSize: 11, fontWeight: 600, color: '#aaa', padding: '4px 0', textTransform: 'uppercase', letterSpacing: '0.05em' }}>{d}</div>
                ))}
                {calendarDays.map((date, i) => {
                  const isPast = date && date.isBefore(dayjs(), 'day')
                  const isSelected = date && selectedDate && date.format('YYYY-MM-DD') === selectedDate.format('YYYY-MM-DD')
                  const isToday = date && date.format('YYYY-MM-DD') === dayjs().format('YYYY-MM-DD')
                  return (
                    <div key={i} onClick={() => date && !isPast && handleDateClick(date)}
                      style={{
                        aspectRatio: '1', display: 'flex', alignItems: 'center', justifyContent: 'center',
                        fontSize: 13, borderRadius: 8, cursor: date && !isPast ? 'pointer' : 'default',
                        background: isSelected ? '#111' : isToday ? '#f5f5f5' : 'transparent',
                        color: isSelected ? '#fff' : isPast ? '#ddd' : !date ? 'transparent' : '#111',
                        fontWeight: isSelected || isToday ? 600 : 400,
                        transition: 'background 0.15s',
                      }}
                    >{date ? date.date() : ''}</div>
                  )
                })}
              </div>

              {/* Time Slots */}
              {selectedDate && (
                <div>
                  <div style={{ fontSize: 13, fontWeight: 600, color: '#333', marginBottom: 12 }}>
                    {selectedDate.format('dddd, MMMM D')}
                  </div>
                  {slotsLoading ? (
                    <p style={{ color: '#888', fontSize: 13 }}>Loading slots...</p>
                  ) : slots.length === 0 ? (
                    <p style={{ color: '#aaa', fontSize: 13 }}>No available slots for this day</p>
                  ) : (
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                      {slots.map(slot => (
                        <button key={slot} onClick={() => handleSlotClick(slot)} style={{
                          padding: '8px 16px', border: '1.5px solid #e5e5e5', borderRadius: 8,
                          background: '#fff', fontSize: 13, fontWeight: 500, cursor: 'pointer',
                          fontFamily: 'inherit', color: '#333', transition: 'all 0.15s',
                        }}
                          onMouseEnter={e => { e.target.style.borderColor = '#111'; e.target.style.background = '#f9f9f9' }}
                          onMouseLeave={e => { e.target.style.borderColor = '#e5e5e5'; e.target.style.background = '#fff' }}
                        >
                          {dayjs(slot).format('h:mm A')}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              )}
            </>
          )}

          {step === 'form' && (
            <div>
              <button onClick={() => setStep('calendar')} style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: 13, color: '#666', marginBottom: 24, display: 'flex', alignItems: 'center', gap: 6, padding: 0 }}>
                ← Back
              </button>
              <h2 style={{ fontSize: 18, fontWeight: 700, color: '#111', marginBottom: 6 }}>Your details</h2>
              <p style={{ fontSize: 13, color: '#888', marginBottom: 24 }}>
                {dayjs(selectedSlot).format('dddd, MMMM D · h:mm A')}
              </p>

              <div style={{ marginBottom: 16 }}>
                <label style={{ fontSize: 13, fontWeight: 600, color: '#333', display: 'block', marginBottom: 6 }}>Your Name</label>
                <input
                  type="text" placeholder="John Smith"
                  value={form.name} onChange={e => setForm({ ...form, name: e.target.value })}
                  style={{ width: '100%', padding: '10px 12px', border: '1.5px solid #e5e5e5', borderRadius: 8, fontSize: 14, outline: 'none', fontFamily: 'inherit' }}
                />
              </div>

              <div style={{ marginBottom: 28 }}>
                <label style={{ fontSize: 13, fontWeight: 600, color: '#333', display: 'block', marginBottom: 6 }}>Email Address</label>
                <input
                  type="email" placeholder="john@example.com"
                  value={form.email} onChange={e => setForm({ ...form, email: e.target.value })}
                  style={{ width: '100%', padding: '10px 12px', border: '1.5px solid #e5e5e5', borderRadius: 8, fontSize: 14, outline: 'none', fontFamily: 'inherit' }}
                />
              </div>

              <button onClick={handleBook} style={{
                width: '100%', background: '#111', color: '#fff', border: 'none',
                borderRadius: 8, padding: '12px', fontSize: 15, fontWeight: 600,
                cursor: 'pointer', fontFamily: 'inherit'
              }}>
                Confirm Booking
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}