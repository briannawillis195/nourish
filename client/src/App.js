import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Community from './pages/Community'
import FridgeProfile from './pages/FridgeProfile'
import Home from './pages/Home'
import Login from './pages/Login'
import SignUp from './pages/SignUp'
import UserProfile from './pages/UserProfile'

// Routes for pages
export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<Home />} />
        <Route path="/home" element={<Home />} />
        <Route path="/community" element={<Community />} />
        <Route path="/fridgeprofile" element={<FridgeProfile />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/userprofile" element={<UserProfile />} />
      </Routes>
    </BrowserRouter>
  )
}
