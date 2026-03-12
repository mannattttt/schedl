import { useLocation, useNavigate } from 'react-router-dom'
import dayjs from 'dayjs'

export default function BookingConfirmation() {
  const { state } = useLocation()
  const navigate = useNavigate()

  if (!state) return navigate('/')

  return (
    <div style={{ minHeight: '100vh', background: '#fafafa', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 24 }}>
      <div style={{ background: '#fff', border: '1.5px solid #ebebeb', borderRadius: 16, padding: '48px 40px', maxWidth: 480, width: '100%', textAlign: 'center', boxShadow: '0 8px 40px rgba(0,0,0,0.08)' }}>
        <div style={{ width: 64, height: 64, borderRadius: '50%', background: '#f0fdf4', border: '2px solid #bbf7d0', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 24px', fontSize: 28 }}>
          ✓
        </div>
        <h1 style={{ fontSize: 22, fontWeight: 700, color: '#111', marginBottom: 8 }}>You're booked!</h1>
        <p style={{ fontSize: 14, color: '#888', marginBottom: 32 }}>A confirmation has been sent to {state.email}</p>

        <div style={{ background: '#f9fafb', borderRadius: 12, padding: '20px 24px', textAlign: 'left', marginBottom: 32 }}>
          {[
            { label: 'Event', value: state.title },
            { label: 'Date', value: dayjs(state.start_time).format('dddd, MMMM D, YYYY') },
            { label: 'Time', value: dayjs(state.start_time).format('h:mm A') },
            { label: 'Duration', value: `${state.duration} minutes` },
            { label: 'Name', value: state.name },
            { label: 'Email', value: state.email },
          ].map(item => (
            <div key={item.label} style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 10, fontSize: 13 }}>
              <span style={{ color: '#888', fontWeight: 500 }}>{item.label}</span>
              <span style={{ color: '#111', fontWeight: 600 }}>{item.value}</span>
            </div>
          ))}
        </div>

        <button onClick={() => navigate('/')} style={{
          background: '#111', color: '#fff', border: 'none', borderRadius: 8,
          padding: '10px 24px', fontSize: 14, fontWeight: 600, cursor: 'pointer', fontFamily: 'inherit'
        }}>
          Back to Home
        </button>
      </div>
    </div>
  )
}
