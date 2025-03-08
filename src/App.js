import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import LoginPage from './components/auth/LoginPage';
import SignupPage from './components/auth/SignupPage';
import AdminDashboard from './pages/AdminDashboard/AdminDashboard';
import UserDashboard from './pages/UserDashboard/UserDashboard';
import UserProfile from './pages/UserProfile/UserProfile';
import EventRegistration from './components/EventRegistration/EventRegistration';
import CustomNavbar from './components/Navbar/Navbar';
import Home from './pages/Home/Home';
import './styles/App.css';

function App() {
  return (
    <Router>
      <MainLayout />
    </Router>
  );
}

function MainLayout() {
  const location = useLocation();
  const hideNavbarRoutes = ['/login', '/signup'];

  return (
    <>
      {!hideNavbarRoutes.includes(location.pathname) && <CustomNavbar />}
      <Routes>
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/admin/dashboard" element={<AdminDashboard />} />
        <Route path="/user/dashboard" element={<UserDashboard />} />
        <Route path="/user/profile" element={<UserProfile />} />
        <Route path="/home" element={<Home />} />
      </Routes>
    </>
  );
}

export default App;
