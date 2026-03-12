import { useState, useEffect } from 'react'
import { getBookings, cancelBooking } from '../services/api'
import dayjs from 'dayjs'

export default function Bookings() {
  const [bookings, setBookings] = useState([])
  const [loading, setLoading] = useState(true)
  const [tab, setTab] = useState('upcoming')

  useEffect(() => { fetchBookings() }, [])

  const fetchBookings = async () => {
    const res = await getBookings()
    setBookings(res.data)
    setLoading(false)
  }

  const handleCancel = async (id) => {
    if (confirm('Cancel this booking?')) {
      await cancelBooking(id)
      fetchBookings()
    }
  }

  const now = dayjs()
  const upcoming = bookings.filter(b => dayjs(b.start_time).isAfter(now) && b.status === 'confirmed')
  const past = bookings.filter(b => dayjs(b.start_time).isBefore(now) || b.status === 'cancelled')
  const displayed = tab === 'upcoming' ? upcoming : past

  return (
    <div style={{ maxWidth: 900, margin: '0 auto', padding: '40px 24px' }}>
      <div style={{ marginBottom: 32 }}>
        <h1 style={{ fontSize: 24, fontWeight: 700, color: '#111', marginBottom: 4 }}>Bookings</h1>
        <p style={{ fontSize: 14, color: '#888' }}>Manage your upcoming and past meetings</p>
      </div>

      {/* Tabs */}
      <div style={{ display: 'flex', gap: 4, marginBottom: 24, background: '#f5f5f5', borderRadius: 10, padding: 4, width: 'fit-content' }}>
        {['upcoming', 'past'].map(t => (
          <button key={t} onClick={() => setTab(t)} style={{
            padding: '7px 20px', borderRadius: 7, border: 'none', cursor: 'pointer',
            fontSize: 14, fontWeight: 500, fontFamily: 'inherit',
            background: tab === t ? '#fff' : 'transparent',
            color: tab === t ? '#111' : '#888',
            boxShadow: tab === t ? '0 1px 4px rgba(0,0,0,0.08)' : 'none',
            transition: 'all 0.15s',
            textTransform: 'capitalize'
          }}>{t}</button>
        ))}
      </div>

      {loading ? (
        <p style={{ color: '#888' }}>Loading...</p>
      ) : displayed.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '60px 0', color: '#aaa' }}>
          <div style={{ fontSize: 40, marginBottom: 12 }}>📅</div>
          <div style={{ fontSize: 15, fontWeight: 500 }}>No {tab} bookings</div>
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          {displayed.map(b => (
            <div key={b.id} style={{
              background: '#fff', border: '1.5px solid #ebebeb', borderRadius: 12,
              padding: '20px 24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center'
            }}>
              <div style={{ display: 'flex', gap: 16, alignItems: 'center' }}>
                {/* Date block */}
                <div style={{
                  width: 52, height: 52, borderRadius: 10, background: '#f5f5f5',
                  display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', flexShrink: 0
                }}>
                  <div style={{ fontSize: 11, fontWeight: 600, color: '#888', textTransform: 'uppercase' }}>
                    {dayjs(b.start_time).format('MMM')}
                  </div>
                  <div style={{ fontSize: 20, fontWeight: 700, color: '#111', lineHeight: 1 }}>
                    {dayjs(b.start_time).format('D')}
                  </div>
                </div>

                <div>
                  <div style={{ fontSize: 15, fontWeight: 600, color: '#111', marginBottom: 3 }}>{b.title}</div>
                  <div style={{ fontSize: 13, color: '#666', marginBottom: 2 }}>
                    {dayjs(b.start_time).format('dddd, MMMM D · h:mm A')} — {dayjs(b.end_time).format('h:mm A')}
                  </div>
                  <div style={{ fontSize: 13, color: '#888' }}>
                    {b.booker_name} · {b.booker_email}
                  </div>
                </div>
              </div>

              <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
                <span style={{
                  padding: '4px 10px', borderRadius: 20, fontSize: 12, fontWeight: 600,
                  background: b.status === 'confirmed' ? '#f0fdf4' : '#fef2f2',
                  color: b.status === 'confirmed' ? '#16a34a' : '#ef4444',
                }}>
                  {b.status}
                </span>
                {b.status === 'confirmed' && dayjs(b.start_time).isAfter(now) && (
                  <button onClick={() => handleCancel(b.id)} style={{
                    background: '#fff0f0', border: 'none', borderRadius: 7,
                    padding: '7px 14px', fontSize: 13, cursor: 'pointer', fontWeight: 500, color: '#ef4444'
                  }}>Cancel</button>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}