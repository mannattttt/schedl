import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Dashboard from './pages/Dashboard'
import Availability from './pages/Availability'
import Bookings from './pages/Bookings'
import BookingPage from './pages/BookingPage'
import BookingConfirmation from './pages/BookingConfirmation'
import Navbar from './components/Navbar'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/dashboard" element={<><Navbar /><Dashboard /></>} />
        <Route path="/availability" element={<><Navbar /><Availability /></>} />
        <Route path="/bookings" element={<><Navbar /><Bookings /></>} />
        <Route path="/:username/:slug" element={<BookingPage />} />
        <Route path="/confirmation" element={<BookingConfirmation />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App