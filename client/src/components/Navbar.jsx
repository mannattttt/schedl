import { Link, useLocation } from 'react-router-dom'

export default function Navbar() {
  const location = useLocation()

  const links = [
    { path: '/dashboard', label: 'Event Types' },
    { path: '/availability', label: 'Availability' },
    { path: '/bookings', label: 'Bookings' },
  ]

  return (
    <nav style={{
      borderBottom: '1px solid #ebebeb',
      background: '#fff',
      padding: '0 24px',
      height: 60,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      position: 'sticky',
      top: 0,
      zIndex: 100,
    }}>
      <Link to="/" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: 8 }}>
        <div style={{ width: 28, height: 28, background: '#111', borderRadius: 7, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.5"><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>
        </div>
        <span style={{ fontFamily: 'Georgia, serif', fontSize: 20, color: '#111', fontWeight: 600 }}>schedl</span>
      </Link>

      <div style={{ display: 'flex', gap: 4 }}>
        {links.map(link => (
          <Link key={link.path} to={link.path} style={{
            textDecoration: 'none',
            padding: '6px 14px',
            borderRadius: 8,
            fontSize: 14,
            fontWeight: 500,
            color: location.pathname === link.path ? '#111' : '#666',
            background: location.pathname === link.path ? '#f5f5f5' : 'transparent',
            transition: 'all 0.15s',
          }}>{link.label}</Link>
        ))}
      </div>

      <div style={{ width: 36, height: 36, borderRadius: '50%', background: 'linear-gradient(135deg, #6366f1, #a855f7)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontWeight: 700, fontSize: 14 }}>
        J
      </div>
    </nav>
  )
}