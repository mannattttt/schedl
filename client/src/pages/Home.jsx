import { useState, useRef, useEffect } from "react";
import { useNavigate } from 'react-router-dom'


const NAV_LINKS = ["Product", "Pricing", "Enterprise", "Blog"];

const FEATURES = [
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>
    ),
    title: "Event Types",
    desc: "Create unlimited event types with custom durations, descriptions, and unique booking links.",
  },
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
    ),
    title: "Availability Settings",
    desc: "Define your working hours, timezone, and block off time you're unavailable with ease.",
  },
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>
    ),
    title: "Public Booking Page",
    desc: "Share your personal link. Guests pick a time that works — no back-and-forth emails.",
  },
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/></svg>
    ),
    title: "Bookings Dashboard",
    desc: "Track upcoming and past meetings. Cancel or reschedule any booking in one click.",
  },
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 0 1-3.46 0"/></svg>
    ),
    title: "Instant Notifications",
    desc: "Automated email confirmations and reminders sent to both you and your guests.",
  },
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><rect x="5" y="2" width="14" height="20" rx="2" ry="2"/><line x1="12" y1="18" x2="12.01" y2="18"/></svg>
    ),
    title: "Mobile Responsive",
    desc: "A seamless experience whether your guest books from phone, tablet, or desktop.",
  },
];

const STEPS = [
  { num: "01", label: "Create an event type", desc: "Set your meeting title, duration, and a unique link." },
  { num: "02", label: "Set your availability", desc: "Choose your working days, hours, and timezone." },
  { num: "03", label: "Share your link", desc: "Send your booking page to anyone — no signup needed." },
  { num: "04", label: "Get booked", desc: "Guests pick a slot. You get a notification. Done." },
];

const TESTIMONIALS = [
  { name: "Priya S.", role: "Product Designer", text: "Cleaner than any tool I've used. My clients love the booking page." },
  { name: "Marcus W.", role: "Freelance Dev", text: "Set it up in 20 minutes. No more scheduling back-and-forth." },
  { name: "Leila A.", role: "Startup Founder", text: "The availability controls are exactly what I needed. Highly recommend." },
];

export default function Home() {
    const navigate = useNavigate()
    const [scrolled, setScrolled] = useState(false);
    const [mobileOpen, setMobileOpen] = useState(false);
    const [dropdownOpen, setDropdownOpen] = useState(false)
    const dropdownRef = useRef(null)

    useEffect(() => {
    const handleClickOutside = (e) => {
        if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setDropdownOpen(false)
        }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
    }, [])

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div style={{ fontFamily: "'DM Sans', 'Segoe UI', sans-serif", background: "#fafafa", color: "#111", minHeight: "100vh" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;0,9..40,600;0,9..40,700;1,9..40,400&family=DM+Serif+Display:ital@0;1&display=swap');

        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

        html { scroll-behavior: smooth; }

        body { font-family: 'DM Sans', sans-serif; }

        a { text-decoration: none; color: inherit; }

        .nav-link {
          font-size: 14px;
          font-weight: 500;
          color: #444;
          transition: color 0.2s;
          cursor: pointer;
        }
        .nav-link:hover { color: #000; }

        .btn-primary {
          background: #111;
          color: #fff;
          border: none;
          border-radius: 8px;
          padding: 10px 20px;
          font-size: 14px;
          font-weight: 600;
          cursor: pointer;
          transition: background 0.2s, transform 0.15s;
          font-family: inherit;
          letter-spacing: -0.01em;
        }
        .btn-primary:hover { background: #222; transform: translateY(-1px); }

        .btn-outline {
          background: transparent;
          color: #111;
          border: 1.5px solid #ddd;
          border-radius: 8px;
          padding: 10px 20px;
          font-size: 14px;
          font-weight: 600;
          cursor: pointer;
          transition: border-color 0.2s, transform 0.15s;
          font-family: inherit;
          letter-spacing: -0.01em;
        }
        .btn-outline:hover { border-color: #aaa; transform: translateY(-1px); }

        .btn-lg {
          padding: 14px 28px;
          font-size: 15px;
          border-radius: 10px;
        }

        .hero-badge {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          background: #fff;
          border: 1.5px solid #e5e5e5;
          border-radius: 100px;
          padding: 6px 14px 6px 8px;
          font-size: 13px;
          font-weight: 500;
          color: #555;
          margin-bottom: 28px;
          box-shadow: 0 1px 4px rgba(0,0,0,0.06);
        }

        .badge-dot {
          width: 8px; height: 8px;
          border-radius: 50%;
          background: #22c55e;
          display: inline-block;
        }

        .hero-title {
          font-family: 'DM Serif Display', serif;
          font-size: clamp(44px, 7vw, 80px);
          line-height: 1.06;
          letter-spacing: -0.03em;
          color: #0a0a0a;
          max-width: 740px;
          margin: 0 auto 24px;
        }

        .hero-title em {
          font-style: italic;
          color: #555;
        }

        .hero-sub {
          font-size: clamp(16px, 2vw, 19px);
          color: #666;
          max-width: 520px;
          margin: 0 auto 40px;
          line-height: 1.6;
          font-weight: 400;
        }

        .hero-ctas {
          display: flex;
          gap: 12px;
          justify-content: center;
          flex-wrap: wrap;
        }

        .hero-preview {
          margin: 72px auto 0;
          max-width: 860px;
          border-radius: 16px;
          border: 1.5px solid #e5e5e5;
          background: #fff;
          box-shadow: 0 8px 48px rgba(0,0,0,0.08), 0 2px 8px rgba(0,0,0,0.04);
          overflow: hidden;
        }

        .preview-bar {
          display: flex;
          align-items: center;
          gap: 6px;
          padding: 14px 18px;
          background: #f5f5f5;
          border-bottom: 1px solid #e5e5e5;
        }

        .preview-dot { width: 10px; height: 10px; border-radius: 50%; }

        .preview-body {
          display: grid;
          grid-template-columns: 260px 1fr;
          min-height: 340px;
        }

        .preview-left {
          border-right: 1px solid #f0f0f0;
          padding: 28px 24px;
        }

        .preview-avatar {
          width: 42px; height: 42px;
          border-radius: 50%;
          background: linear-gradient(135deg, #6366f1, #a855f7);
          margin-bottom: 14px;
          display: flex; align-items: center; justify-content: center;
          color: #fff; font-weight: 700; font-size: 15px;
        }

        .preview-name { font-size: 13px; font-weight: 600; color: #111; margin-bottom: 2px; }
        .preview-event-title { font-size: 20px; font-weight: 700; color: #111; margin-bottom: 8px; letter-spacing: -0.02em; }
        .preview-meta { display: flex; align-items: center; gap: 6px; font-size: 13px; color: #666; margin-bottom: 6px; }

        .preview-right { padding: 24px 28px; }

        .preview-month { font-size: 14px; font-weight: 600; margin-bottom: 16px; color: #111; display: flex; justify-content: space-between; align-items: center; }

        .cal-grid {
          display: grid;
          grid-template-columns: repeat(7, 1fr);
          gap: 4px;
        }

        .cal-day-header { font-size: 11px; color: #aaa; text-align: center; padding: 4px 0; font-weight: 600; text-transform: uppercase; letter-spacing: 0.05em; }

        .cal-day {
          aspect-ratio: 1;
          display: flex; align-items: center; justify-content: center;
          font-size: 13px;
          border-radius: 6px;
          color: #333;
          cursor: pointer;
          transition: background 0.15s;
        }
        .cal-day:hover { background: #f5f5f5; }
        .cal-day.inactive { color: #ddd; cursor: default; }
        .cal-day.active { background: #111; color: #fff; font-weight: 600; }
        .cal-day.available { background: #f0fdf4; color: #16a34a; font-weight: 500; }

        .section-label {
          font-size: 12px;
          font-weight: 600;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          color: #999;
          margin-bottom: 16px;
        }

        .section-title {
          font-family: 'DM Serif Display', serif;
          font-size: clamp(32px, 4.5vw, 52px);
          letter-spacing: -0.03em;
          color: #0a0a0a;
          line-height: 1.1;
          margin-bottom: 16px;
        }

        .section-sub {
          font-size: 17px;
          color: #666;
          line-height: 1.6;
          max-width: 480px;
        }

        .feature-card {
          background: #fff;
          border: 1.5px solid #ebebeb;
          border-radius: 14px;
          padding: 28px 26px;
          transition: box-shadow 0.2s, transform 0.2s;
        }
        .feature-card:hover {
          box-shadow: 0 6px 32px rgba(0,0,0,0.07);
          transform: translateY(-2px);
        }

        .feature-icon {
          width: 44px; height: 44px;
          border-radius: 10px;
          background: #f5f5f5;
          display: flex; align-items: center; justify-content: center;
          margin-bottom: 18px;
          color: #333;
        }

        .feature-title { font-size: 15px; font-weight: 600; color: #111; margin-bottom: 8px; letter-spacing: -0.01em; }
        .feature-desc { font-size: 14px; color: #777; line-height: 1.6; }

        .step-row {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 32px;
          align-items: center;
        }

        .step-item { display: flex; gap: 20px; align-items: flex-start; margin-bottom: 32px; }
        .step-num {
          font-family: 'DM Serif Display', serif;
          font-size: 36px;
          color: #e5e5e5;
          line-height: 1;
          min-width: 50px;
          letter-spacing: -0.03em;
        }
        .step-label { font-size: 15px; font-weight: 600; color: #111; margin-bottom: 4px; }
        .step-desc { font-size: 14px; color: #777; line-height: 1.5; }

        .step-visual {
          background: #fff;
          border: 1.5px solid #ebebeb;
          border-radius: 16px;
          padding: 32px;
          box-shadow: 0 4px 24px rgba(0,0,0,0.05);
        }

        .slot-chip {
          display: inline-flex;
          align-items: center;
          border: 1.5px solid #e5e5e5;
          border-radius: 8px;
          padding: 8px 18px;
          font-size: 13px;
          font-weight: 500;
          color: #333;
          margin: 4px;
          cursor: pointer;
          transition: background 0.15s, border-color 0.15s;
        }
        .slot-chip:hover { background: #f5f5f5; }
        .slot-chip.selected { background: #111; color: #fff; border-color: #111; }

        .testimonial-card {
          background: #fff;
          border: 1.5px solid #ebebeb;
          border-radius: 14px;
          padding: 28px;
        }

        .testimonial-text { font-size: 15px; color: #333; line-height: 1.65; margin-bottom: 20px; font-style: italic; }
        .testimonial-author { font-size: 13px; font-weight: 600; color: #111; }
        .testimonial-role { font-size: 12px; color: #999; margin-top: 2px; }

        .cta-section {
          background: #0a0a0a;
          border-radius: 20px;
          padding: 72px 48px;
          text-align: center;
          color: #fff;
        }

        .cta-title {
          font-family: 'DM Serif Display', serif;
          font-size: clamp(32px, 5vw, 56px);
          letter-spacing: -0.03em;
          margin-bottom: 16px;
          line-height: 1.1;
        }

        .cta-sub { font-size: 17px; color: #aaa; margin-bottom: 36px; }

        .btn-white {
          background: #fff;
          color: #111;
          border: none;
          border-radius: 10px;
          padding: 14px 28px;
          font-size: 15px;
          font-weight: 600;
          cursor: pointer;
          transition: background 0.2s, transform 0.15s;
          font-family: inherit;
          letter-spacing: -0.01em;
        }
        .btn-white:hover { background: #f0f0f0; transform: translateY(-1px); }

        .divider { height: 1px; background: #f0f0f0; border: none; }

        footer a { color: #777; font-size: 13px; transition: color 0.2s; }
        footer a:hover { color: #111; }

        @media (max-width: 768px) {
          .preview-body { grid-template-columns: 1fr; }
          .preview-right { display: none; }
          .step-row { grid-template-columns: 1fr; }
          .step-visual { display: none; }
        }

        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(24px); }
          to { opacity: 1; transform: translateY(0); }
        }

        .fade-up { animation: fadeUp 0.6s ease both; }
        .delay-1 { animation-delay: 0.1s; }
        .delay-2 { animation-delay: 0.2s; }
        .delay-3 { animation-delay: 0.3s; }
        .delay-4 { animation-delay: 0.4s; }
      `}</style>

      {/* NAV */}
      <nav style={{
        position: "fixed", top: 0, left: 0, right: 0, zIndex: 100,
        background: scrolled ? "rgba(250,250,250,0.92)" : "transparent",
        backdropFilter: scrolled ? "blur(12px)" : "none",
        borderBottom: scrolled ? "1px solid #ebebeb" : "1px solid transparent",
        transition: "all 0.3s ease",
      }}>
        <div style={{ maxWidth: 1120, margin: "0 auto", padding: "0 24px", height: 60, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          {/* Logo */}
          <div style={{ display: "flex", alignItems: "center", gap: 8, cursor: "pointer" }}>
            <div style={{ width: 28, height: 28, background: "#111", borderRadius: 7, display: "flex", alignItems: "center", justifyContent: "center" }}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.5"><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>
            </div>
            <span style={{ fontFamily: "'DM Serif Display', serif", fontSize: 20, letterSpacing: "-0.03em", color: "#111" }}>schedl</span>
          </div>

          {/* Links */}
          <div style={{ display: "flex", gap: 32, alignItems: "center" }}>
            {NAV_LINKS.map(l => <span key={l} className="nav-link">{l}</span>)}
          </div>

          {/* Actions */}
          <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
            <button className="btn-outline" onClick={() => navigate('/dashboard')}>Log in</button>
            <button className="btn-primary" onClick={() => navigate('/dashboard')}>Get started</button>
          </div>
        </div>
      </nav>

      {/* HERO */}
      <section style={{ paddingTop: 140, paddingBottom: 100, textAlign: "center", paddingLeft: 24, paddingRight: 24 }}>
        <div className="fade-up">
          <div className="hero-badge">
            <span className="badge-dot" />
            Now open source · Free forever
          </div>
        </div>

        <h1 className="hero-title fade-up delay-1">
          Scheduling that <em>works</em><br />for everyone
        </h1>

        <p className="hero-sub fade-up delay-2">
          Create your event types, set your availability, and share your link. No more email chains.
        </p>

        <div className="hero-ctas fade-up delay-3">
          <button className="btn-primary btn-lg" onClick={() => navigate('/dashboard')}>Start for free →</button>
          <button className="btn-outline btn-lg" onClick={() => navigate('/john/30min')}>View demo</button>
        </div>

        {/* Mock Browser Preview */}
        <div className="hero-preview fade-up delay-4">
          <div className="preview-bar">
            <div className="preview-dot" style={{ background: "#ff5f57" }} />
            <div className="preview-dot" style={{ background: "#ffbd2e" }} />
            <div className="preview-dot" style={{ background: "#28c840" }} />
            <div style={{ flex: 1, marginLeft: 12, background: "#eee", borderRadius: 4, height: 20, display: "flex", alignItems: "center", paddingLeft: 10 }}>
              <span style={{ fontSize: 11, color: "#999" }}>schedl.app/john/30min</span>
            </div>
          </div>
          <div className="preview-body">
            <div className="preview-left">
              <div className="preview-avatar">J</div>
              <div className="preview-name">John Doe</div>
              <div className="preview-event-title">30 Minute Meeting</div>
              <div className="preview-meta">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#888" strokeWidth="2"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
                30 min
              </div>
              <div className="preview-meta">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#888" strokeWidth="2"><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>
                Asia/Kolkata
              </div>
              <div style={{ marginTop: 18, padding: "12px 14px", background: "#f9fafb", borderRadius: 8, fontSize: 12, color: "#666", lineHeight: 1.5 }}>
                A quick 30-minute call to chat about your project or questions.
              </div>
            </div>

            <div className="preview-right">
              <div className="preview-month">
                <span>March 2026</span>
                <div style={{ display: "flex", gap: 8 }}>
                  <span style={{ cursor: "pointer", color: "#888" }}>‹</span>
                  <span style={{ cursor: "pointer", color: "#888" }}>›</span>
                </div>
              </div>
              <div className="cal-grid">
                {["Su","Mo","Tu","We","Th","Fr","Sa"].map(d => (
                  <div key={d} className="cal-day-header">{d}</div>
                ))}
                {[null,null,null,null,null,null,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31].map((d, i) => (
                  <div key={i} className={`cal-day ${!d ? "inactive" : d === 12 ? "active" : [13,17,18,19,24,25,26].includes(d) ? "available" : d < 12 ? "inactive" : ""}`}>
                    {d || ""}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* LOGOS / SOCIAL PROOF */}
      <section style={{ padding: "32px 24px 64px", textAlign: "center" }}>
        <p style={{ fontSize: 13, color: "#aaa", marginBottom: 24, fontWeight: 500, letterSpacing: "0.04em", textTransform: "uppercase" }}>Trusted by teams at</p>
        <div style={{ display: "flex", gap: 40, justifyContent: "center", flexWrap: "wrap", alignItems: "center" }}>
          {["Acme Corp", "Vercel", "Linear", "Notion", "Figma"].map(name => (
            <span key={name} style={{ fontSize: 15, fontWeight: 700, color: "#ccc", letterSpacing: "-0.02em" }}>{name}</span>
          ))}
        </div>
      </section>

      <hr className="divider" />

      {/* FEATURES */}
      <section style={{ padding: "96px 24px", maxWidth: 1120, margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: 64 }}>
          <p className="section-label">Features</p>
          <h2 className="section-title">Everything you need to get booked</h2>
          <p style={{ fontSize: 17, color: "#777", maxWidth: 440, margin: "0 auto", lineHeight: 1.6 }}>
            Built with the same features that make Cal.com loved by thousands of professionals.
          </p>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 20 }}>
          {FEATURES.map(f => (
            <div key={f.title} className="feature-card">
              <div className="feature-icon">{f.icon}</div>
              <div className="feature-title">{f.title}</div>
              <div className="feature-desc">{f.desc}</div>
            </div>
          ))}
        </div>
      </section>

      <hr className="divider" />

      {/* HOW IT WORKS */}
      <section style={{ padding: "96px 24px", maxWidth: 1120, margin: "0 auto" }}>
        <div className="step-row">
          <div>
            <p className="section-label">How it works</p>
            <h2 className="section-title" style={{ marginBottom: 48 }}>Up and running<br />in minutes</h2>
            {STEPS.map(s => (
              <div key={s.num} className="step-item">
                <span className="step-num">{s.num}</span>
                <div>
                  <div className="step-label">{s.label}</div>
                  <div className="step-desc">{s.desc}</div>
                </div>
              </div>
            ))}
          </div>
          <div className="step-visual">
            <div style={{ fontSize: 12, color: "#aaa", marginBottom: 16, fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.08em" }}>Pick a time</div>
            <div style={{ fontSize: 14, fontWeight: 600, color: "#111", marginBottom: 6 }}>Thursday, March 12</div>
            <div style={{ fontSize: 13, color: "#888", marginBottom: 20 }}>Showing slots in Asia/Kolkata</div>
            <div style={{ display: "flex", flexWrap: "wrap" }}>
              {["9:00 AM","9:30 AM","10:00 AM","10:30 AM","11:00 AM","11:30 AM","2:00 PM","2:30 PM","3:00 PM","3:30 PM","4:00 PM"].map((t, i) => (
                <div key={t} className={`slot-chip ${i === 3 ? "selected" : ""}`}>{t}</div>
              ))}
            </div>
            <div style={{ marginTop: 24, padding: "18px 20px", background: "#f9fafb", borderRadius: 10 }}>
              <div style={{ fontSize: 12, color: "#888", marginBottom: 8, fontWeight: 600 }}>Your details</div>
              <div style={{ height: 32, background: "#fff", border: "1.5px solid #e5e5e5", borderRadius: 7, marginBottom: 8 }} />
              <div style={{ height: 32, background: "#fff", border: "1.5px solid #e5e5e5", borderRadius: 7, marginBottom: 14 }} />
              <button className="btn-primary" style={{ width: "100%", textAlign: "center" }}>Confirm booking</button>
            </div>
          </div>
        </div>
      </section>

      <hr className="divider" />

      {/* TESTIMONIALS */}
      <section style={{ padding: "96px 24px", maxWidth: 1120, margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: 56 }}>
          <p className="section-label">Testimonials</p>
          <h2 className="section-title">Loved by makers &amp; teams</h2>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 20 }}>
          {TESTIMONIALS.map(t => (
            <div key={t.name} className="testimonial-card">
              <div style={{ display: "flex", gap: 2, marginBottom: 16 }}>
                {[...Array(5)].map((_, i) => <span key={i} style={{ color: "#f59e0b", fontSize: 14 }}>★</span>)}
              </div>
              <p className="testimonial-text">"{t.text}"</p>
              <div className="testimonial-author">{t.name}</div>
              <div className="testimonial-role">{t.role}</div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA BANNER */}
      <section style={{ padding: "0 24px 96px", maxWidth: 1120, margin: "0 auto" }}>
        <div className="cta-section">
          <h2 className="cta-title">Ready to simplify<br />your scheduling?</h2>
          <p className="cta-sub">Free to use. No credit card required.</p>
          <button className="btn-white">Create your free account →</button>
        </div>
      </section>

      {/* FOOTER */}
      <footer style={{ borderTop: "1px solid #ebebeb", padding: "40px 24px" }}>
        <div style={{ maxWidth: 1120, margin: "0 auto", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 20 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <div style={{ width: 24, height: 24, background: "#111", borderRadius: 6, display: "flex", alignItems: "center", justifyContent: "center" }}>
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.5"><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>
            </div>
            <span style={{ fontFamily: "'DM Serif Display', serif", fontSize: 17, color: "#111" }}>schedl</span>
            <span style={{ fontSize: 13, color: "#bbb", marginLeft: 8 }}>© 2026</span>
          </div>
          <div style={{ display: "flex", gap: 28 }}>
            {["Privacy", "Terms", "GitHub", "Contact"].map(l => (
              <a key={l} href="#">{l}</a>
            ))}
          </div>
        </div>
      </footer>
    </div>
  );
}