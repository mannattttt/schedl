import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useState, useRef, useEffect } from 'react'

export default function Navbar() {
  const location = useLocation()
  const navigate = useNavigate()
  const [dropdownOpen, setDropdownOpen] = useState(false)
  const dropdownRef = useRef(null)

  const links = [
    { path: '/dashboard', label: 'Event Types' },
    { path: '/availability', label: 'Availability' },
    { path: '/bookings', label: 'Bookings' },
  ]

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setDropdownOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

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

      {/* Avatar with dropdown */}
      <div ref={dropdownRef} style={{ position: 'relative' }}>
        <div
          onClick={() => setDropdownOpen(!dropdownOpen)}
          style={{
            width: 36, height: 36, borderRadius: '50%',
            background: 'linear-gradient(135deg, #6366f1, #a855f7)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            color: '#fff', fontWeight: 700, fontSize: 14,
            cursor: 'pointer',
            boxShadow: dropdownOpen ? '0 0 0 3px #e0e7ff' : 'none',
            transition: 'box-shadow 0.2s'
          }}
        >
          J
        </div>

        {dropdownOpen && (
          <div style={{
            position: 'absolute', right: 0, top: 44,
            background: '#fff', border: '1.5px solid #ebebeb',
            borderRadius: 12, padding: '8px',
            width: 220,
            boxShadow: '0 8px 32px rgba(0,0,0,0.1)',
            zIndex: 200,
          }}>
            {/* Profile info */}
            <div style={{ padding: '10px 12px 14px', borderBottom: '1px solid #f5f5f5', marginBottom: 8 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                <div style={{
                  width: 40, height: 40, borderRadius: '50%',
                  background: 'linear-gradient(135deg, #6366f1, #a855f7)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  color: '#fff', fontWeight: 700, fontSize: 15, flexShrink: 0
                }}>J</div>
                <div>
                  <div style={{ fontSize: 14, fontWeight: 600, color: '#111' }}>John Doe</div>
                  <div style={{ fontSize: 12, color: '#888' }}>john@example.com</div>
                </div>
              </div>
            </div>

            {/* Links */}
            {[
              { label: '📅  Event Types', path: '/dashboard' },
              { label: '🕐  Availability', path: '/availability' },
              { label: '📋  Bookings', path: '/bookings' },
            ].map(item => (
              <div
                key={item.path}
                onClick={() => { navigate(item.path); setDropdownOpen(false) }}
                style={{
                  padding: '9px 12px', borderRadius: 8, fontSize: 14,
                  color: '#333', cursor: 'pointer', fontWeight: 500,
                  transition: 'background 0.15s',
                }}
                onMouseEnter={e => e.currentTarget.style.background = '#f5f5f5'}
                onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
              >
                {item.label}
              </div>
            ))}

            <div style={{ borderTop: '1px solid #f5f5f5', marginTop: 8, paddingTop: 8 }}>
              <div
                onClick={() => { navigate('/john/30min'); setDropdownOpen(false) }}
                style={{
                  padding: '9px 12px', borderRadius: 8, fontSize: 14,
                  color: '#333', cursor: 'pointer', fontWeight: 500,
                  transition: 'background 0.15s',
                }}
                onMouseEnter={e => e.currentTarget.style.background = '#f5f5f5'}
                onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
              >
                🔗  My Booking Page
              </div>
              <div
                onClick={() => { navigate('/'); setDropdownOpen(false) }}
                style={{
                  padding: '9px 12px', borderRadius: 8, fontSize: 14,
                  color: '#ef4444', cursor: 'pointer', fontWeight: 500,
                  transition: 'background 0.15s',
                }}
                onMouseEnter={e => e.currentTarget.style.background = '#fef2f2'}
                onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
              >
                ← Log out
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}