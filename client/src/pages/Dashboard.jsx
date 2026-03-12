import { useState, useEffect } from 'react'
import { getEventTypes, createEventType, updateEventType, deleteEventType } from '../services/api'

export default function Dashboard() {
  const [eventTypes, setEventTypes] = useState([])
  const [showModal, setShowModal] = useState(false)
  const [editing, setEditing] = useState(null)
  const [form, setForm] = useState({ title: '', slug: '', description: '', duration: 30 })
  const [loading, setLoading] = useState(true)

  useEffect(() => { fetchEventTypes() }, [])

  const fetchEventTypes = async () => {
    const res = await getEventTypes()
    setEventTypes(res.data)
    setLoading(false)
  }

  const openCreate = () => {
    setEditing(null)
    setForm({ title: '', slug: '', description: '', duration: 30 })
    setShowModal(true)
  }

  const openEdit = (et) => {
    setEditing(et)
    setForm({ title: et.title, slug: et.slug, description: et.description, duration: et.duration })
    setShowModal(true)
  }

  const handleSubmit = async () => {
    if (editing) {
      await updateEventType(editing.id, form)
    } else {
      await createEventType(form)
    }
    setShowModal(false)
    fetchEventTypes()
  }

  const handleDelete = async (id) => {
    if (confirm('Delete this event type?')) {
      await deleteEventType(id)
      fetchEventTypes()
    }
  }

  const copyLink = (slug) => {
    navigator.clipboard.writeText(`http://localhost:5173/john/${slug}`)
    alert('Link copied!')
  }

  return (
    <div style={{ maxWidth: 900, margin: '0 auto', padding: '40px 24px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 32 }}>
        <div>
          <h1 style={{ fontSize: 24, fontWeight: 700, color: '#111', marginBottom: 4 }}>Event Types</h1>
          <p style={{ fontSize: 14, color: '#888' }}>Create and manage your bookable event types</p>
        </div>
        <button onClick={openCreate} style={{ background: '#111', color: '#fff', border: 'none', borderRadius: 8, padding: '10px 20px', fontSize: 14, fontWeight: 600, cursor: 'pointer' }}>
          + New Event Type
        </button>
      </div>

      {loading ? (
        <p style={{ color: '#888' }}>Loading...</p>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          {eventTypes.map(et => (
            <div key={et.id} style={{ background: '#fff', border: '1.5px solid #ebebeb', borderRadius: 12, padding: '20px 24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
                <div style={{ width: 10, height: 10, borderRadius: '50%', background: '#22c55e' }} />
                <div>
                  <div style={{ fontSize: 15, fontWeight: 600, color: '#111', marginBottom: 2 }}>{et.title}</div>
                  <div style={{ fontSize: 13, color: '#888' }}>{et.duration} min · /john/{et.slug}</div>
                </div>
              </div>
              <div style={{ display: 'flex', gap: 8 }}>
                <button onClick={() => copyLink(et.slug)} style={{ background: '#f5f5f5', border: 'none', borderRadius: 7, padding: '7px 14px', fontSize: 13, cursor: 'pointer', fontWeight: 500 }}>Copy Link</button>
                <button onClick={() => openEdit(et)} style={{ background: '#f5f5f5', border: 'none', borderRadius: 7, padding: '7px 14px', fontSize: 13, cursor: 'pointer', fontWeight: 500 }}>Edit</button>
                <button onClick={() => handleDelete(et.id)} style={{ background: '#fff0f0', border: 'none', borderRadius: 7, padding: '7px 14px', fontSize: 13, cursor: 'pointer', fontWeight: 500, color: '#ef4444' }}>Delete</button>
              </div>
            </div>
          ))}
        </div>
      )}

      {showModal && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.4)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 200 }}>
          <div style={{ background: '#fff', borderRadius: 16, padding: 32, width: 480, boxShadow: '0 20px 60px rgba(0,0,0,0.15)' }}>
            <h2 style={{ fontSize: 18, fontWeight: 700, marginBottom: 24 }}>{editing ? 'Edit Event Type' : 'New Event Type'}</h2>
            {[
              { label: 'Title', key: 'title', type: 'text', placeholder: '30 Minute Meeting' },
              { label: 'URL Slug', key: 'slug', type: 'text', placeholder: '30min' },
              { label: 'Duration (minutes)', key: 'duration', type: 'number', placeholder: '30' },
            ].map(field => (
              <div key={field.key} style={{ marginBottom: 16 }}>
                <label style={{ fontSize: 13, fontWeight: 600, color: '#333', display: 'block', marginBottom: 6 }}>{field.label}</label>
                <input
                  type={field.type}
                  placeholder={field.placeholder}
                  value={form[field.key]}
                  onChange={e => setForm({ ...form, [field.key]: e.target.value })}
                  style={{ width: '100%', padding: '9px 12px', border: '1.5px solid #e5e5e5', borderRadius: 8, fontSize: 14, outline: 'none', fontFamily: 'inherit' }}
                />
              </div>
            ))}
            <div style={{ marginBottom: 24 }}>
              <label style={{ fontSize: 13, fontWeight: 600, color: '#333', display: 'block', marginBottom: 6 }}>Description</label>
              <textarea
                placeholder="A quick meeting to discuss..."
                value={form.description}
                onChange={e => setForm({ ...form, description: e.target.value })}
                rows={3}
                style={{ width: '100%', padding: '9px 12px', border: '1.5px solid #e5e5e5', borderRadius: 8, fontSize: 14, outline: 'none', fontFamily: 'inherit', resize: 'vertical' }}
              />
            </div>
            <div style={{ display: 'flex', gap: 10, justifyContent: 'flex-end' }}>
              <button onClick={() => setShowModal(false)} style={{ background: '#f5f5f5', border: 'none', borderRadius: 8, padding: '9px 18px', fontSize: 14, cursor: 'pointer', fontWeight: 500 }}>Cancel</button>
              <button onClick={handleSubmit} style={{ background: '#111', color: '#fff', border: 'none', borderRadius: 8, padding: '9px 18px', fontSize: 14, cursor: 'pointer', fontWeight: 600 }}>
                {editing ? 'Save Changes' : 'Create'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}