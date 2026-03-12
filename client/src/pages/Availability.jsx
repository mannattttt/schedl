import { useState, useEffect } from 'react'
import { getAvailability, saveAvailability } from '../services/api'

const DAYS = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
const TIMEZONES = ['Asia/Kolkata', 'America/New_York', 'America/Los_Angeles', 'Europe/London', 'Asia/Tokyo', 'Australia/Sydney']

export default function Availability() {
  const [schedule, setSchedule] = useState(
    DAYS.map((day, i) => ({
      day_of_week: i,
      label: day,
      enabled: i >= 1 && i <= 5,
      start_time: '09:00',
      end_time: '17:00',
    }))
  )
  const [timezone, setTimezone] = useState('Asia/Kolkata')
  const [saved, setSaved] = useState(false)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    getAvailability().then(res => {
      if (res.data.length > 0) {
        setSchedule(prev => prev.map(day => {
          const found = res.data.find(d => d.day_of_week === day.day_of_week)
          if (found) return {
            ...day,
            enabled: true,
            start_time: found.start_time.slice(0, 5),
            end_time: found.end_time.slice(0, 5),
          }
          return { ...day, enabled: false }
        }))
      }
      setLoading(false)
    })
  }, [])

  const toggleDay = (i) => {
    setSchedule(prev => prev.map((d, idx) => idx === i ? { ...d, enabled: !d.enabled } : d))
  }

  const updateTime = (i, field, value) => {
    setSchedule(prev => prev.map((d, idx) => idx === i ? { ...d, [field]: value } : d))
  }

  const handleSave = async () => {
    const slots = schedule.filter(d => d.enabled).map(d => ({
      day_of_week: d.day_of_week,
      start_time: d.start_time,
      end_time: d.end_time,
    }))
    await saveAvailability(slots)
    setSaved(true)
    setTimeout(() => setSaved(false), 2000)
  }

  if (loading) return <div style={{ padding: 40, color: '#888' }}>Loading...</div>

  return (
    <div style={{ maxWidth: 700, margin: '0 auto', padding: '40px 24px' }}>
      <div style={{ marginBottom: 32 }}>
        <h1 style={{ fontSize: 24, fontWeight: 700, color: '#111', marginBottom: 4 }}>Availability</h1>
        <p style={{ fontSize: 14, color: '#888' }}>Set the times you are available for bookings</p>
      </div>

      {/* Timezone */}
      <div style={{ background: '#fff', border: '1.5px solid #ebebeb', borderRadius: 12, padding: '20px 24px', marginBottom: 16 }}>
        <label style={{ fontSize: 13, fontWeight: 600, color: '#333', display: 'block', marginBottom: 8 }}>Timezone</label>
        <select
          value={timezone}
          onChange={e => setTimezone(e.target.value)}
          style={{ padding: '8px 12px', border: '1.5px solid #e5e5e5', borderRadius: 8, fontSize: 14, fontFamily: 'inherit', outline: 'none', cursor: 'pointer' }}
        >
          {TIMEZONES.map(tz => <option key={tz} value={tz}>{tz}</option>)}
        </select>
      </div>

      {/* Days */}
      <div style={{ background: '#fff', border: '1.5px solid #ebebeb', borderRadius: 12, overflow: 'hidden', marginBottom: 24 }}>
        {schedule.map((day, i) => (
          <div key={day.label} style={{
            display: 'flex', alignItems: 'center', gap: 16,
            padding: '16px 24px',
            borderBottom: i < 6 ? '1px solid #f5f5f5' : 'none',
            opacity: day.enabled ? 1 : 0.5,
          }}>
            {/* Toggle */}
            <div
              onClick={() => toggleDay(i)}
              style={{
                width: 40, height: 22, borderRadius: 11,
                background: day.enabled ? '#111' : '#e5e5e5',
                cursor: 'pointer', position: 'relative', transition: 'background 0.2s', flexShrink: 0
              }}
            >
              <div style={{
                position: 'absolute', top: 3, left: day.enabled ? 21 : 3,
                width: 16, height: 16, borderRadius: '50%', background: '#fff',
                transition: 'left 0.2s', boxShadow: '0 1px 3px rgba(0,0,0,0.2)'
              }} />
            </div>

            <span style={{ width: 100, fontSize: 14, fontWeight: 500, color: '#111' }}>{day.label}</span>

            {day.enabled ? (
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <input
                  type="time"
                  value={day.start_time}
                  onChange={e => updateTime(i, 'start_time', e.target.value)}
                  style={{ padding: '6px 10px', border: '1.5px solid #e5e5e5', borderRadius: 7, fontSize: 13, fontFamily: 'inherit', outline: 'none' }}
                />
                <span style={{ color: '#888', fontSize: 13 }}>—</span>
                <input
                  type="time"
                  value={day.end_time}
                  onChange={e => updateTime(i, 'end_time', e.target.value)}
                  style={{ padding: '6px 10px', border: '1.5px solid #e5e5e5', borderRadius: 7, fontSize: 13, fontFamily: 'inherit', outline: 'none' }}
                />
              </div>
            ) : (
              <span style={{ fontSize: 13, color: '#aaa' }}>Unavailable</span>
            )}
          </div>
        ))}
      </div>

      <button
        onClick={handleSave}
        style={{
          background: saved ? '#22c55e' : '#111', color: '#fff', border: 'none',
          borderRadius: 8, padding: '10px 24px', fontSize: 14, fontWeight: 600,
          cursor: 'pointer', transition: 'background 0.2s'
        }}
      >
        {saved ? '✓ Saved!' : 'Save Availability'}
      </button>
    </div>
  )
}