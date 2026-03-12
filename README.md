# Schedl — Cal.com Clone

A full-stack scheduling and booking web application built as part of the Scaler SDE Intern Fullstack Assignment. The app replicates Cal.com's core functionality and UI design.

## Live Demo
- Frontend: https://schedl.vercel.app/
- Backend: https://schedl-production.up.railway.app

## Github
https://github.com/mannattttt/schedl.git

## Tech Stack

### Frontend
- React.js (Vite)
- React Router DOM — client side routing
- Axios — API calls
- Day.js — date and time formatting

### Backend
- Node.js
- Express.js
- Nodemailer — email notifications

### Database
- PostgreSQL (NeonDB — cloud hosted)

## Features

### Core Features
- **Event Types Management** — create, edit, and delete event types with title, description, duration, and URL slug
- **Availability Settings** — set available days, time ranges, and timezone
- **Public Booking Page** — calendar view, available time slots, booking form, double booking prevention
- **Booking Confirmation Page** — shows full booking details after confirming
- **Bookings Dashboard** — view upcoming and past bookings, cancel a booking

### Bonus Features
- **Email Notifications** — confirmation email sent to booker and host on booking, cancellation email on cancel
- **Buffer Time** — configurable buffer time between meetings per event type
- **Responsive Design** — works on mobile, tablet, and desktop

## Project Structure
```
cal-clone/
├── client/                   # React frontend
│   └── src/
│       ├── pages/
│       │   ├── Home.jsx
│       │   ├── Dashboard.jsx
│       │   ├── Availability.jsx
│       │   ├── Bookings.jsx
│       │   ├── BookingPage.jsx
│       │   └── BookingConfirmation.jsx
│       ├── components/
│       │   └── Navbar.jsx
│       └── services/
│           └── api.js
└── server/                   # Node.js + Express backend
    ├── routes/
    ├── controllers/
    ├── db/
    │   ├── connection.js
    │   ├── schema.sql
    │   └── seed.js
    └── utils/
        └── email.js
```

## Database Schema

- **users** — stores the default admin user
- **event_types** — stores event types with title, slug, duration, buffer time
- **availability** — stores available days and time ranges per user
- **bookings** — stores all bookings with booker details, start/end time, and status

## Setup Instructions

### Prerequisites
- Node.js (v18+)
- PostgreSQL or a NeonDB account

### 1. Clone the repository
```bash
git clone https://github.com/mannattttt/schedl.git
cd cal-clone
```

### 2. Database Setup
- Create a PostgreSQL database or use NeonDB
- Run the schema from `server/db/schema.sql` in your database
- Update the connection string in `server/db/connection.js`

### 3. Backend Setup
```bash
cd server
npm install
node db/seed.js
npm run dev
```
Server runs on `http://localhost:3001`

### 4. Frontend Setup
```bash
cd client
npm install
npm run dev
```
Frontend runs on `http://localhost:5173`

### 5. Email Setup (optional)
Add these to `server/.env`:
```
EMAIL_USER=mannatchaudhary1@gmail.com
EMAIL_PASS=your-gmail-app-password
```

## Assumptions
- A single default user (John Doe) is pre-logged in on the admin side — no authentication is required
- The default username for public booking URLs is `john` (e.g. `/john/30min`)
- Availability is set per day of the week (not per date)
- All times are stored in UTC and displayed in Asia/Kolkata timezone
- Buffer time is added after each meeting slot to prevent back-to-back bookings
- Email notifications require a valid Gmail account with App Password enabled