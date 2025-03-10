import React, { useEffect, useState } from 'react';
import './Home.css';
import UserDashboard from '../UserDashboard/UserDashboard';
import Footer from '../../components/Footer/Footer';
import AdminDashboard from '../AdminDashboard/AdminDashboard';
import Services from '../../components/Services/Services';
import { Button } from 'react-bootstrap';
import { Calendar, Zap } from 'lucide-react';
import Main_Imag from '../../resources/Images/slider-img.png';
import About_Imag from '../../resources/Images/about-img.png';

export default function Home() {
  const [typedText, setTypedText] = useState('');
  const [isTypingComplete, setIsTypingComplete] = useState(false);
  const [userRole, setUserRole] = useState(null); // State to store user role

  const fullText = "Welcome to Planova , our Event Management Platform.";

  useEffect(() => {
    // Simulate fetching user role (replace this with actual API call or localStorage retrieval)
    const role = localStorage.getItem("role") || "user"; // Default to "user" if not found
    console.log(role);
    setUserRole(role);
  }, []);

  useEffect(() => {
    if (typedText.length < fullText.length) {
      const timeout = setTimeout(() => {
        setTypedText(fullText.slice(0, typedText.length + 1));
      }, 50);
      return () => clearTimeout(timeout);
    } else {
      setIsTypingComplete(true);
    }
  }, [typedText]);

  return (
    <>
      {/* Conditionally render based on user role */}
      {userRole === "admin" ? (
        <>
        <div className="hero-section">
            <div className="py-5 mb-5 hero-description">
              <h1 className="display-5 fw-bold mb-4 gradient-text">
                Unified Event Management for Users & Organizers
              </h1>
              <p className="mb-2 text-white typing-text">
                {typedText}
                {!isTypingComplete && <span className="cursor"></span>}
              </p>
              <p className="home-des mb-4 text-white">
                Whether Attending or Organizing! Your premier partner in crafting exceptional event experiences that leave lasting impressions. Join us today and experience a smarter way to manage and participate in events! 🚀✨
              </p>
              <div className="d-flex mb-5 hero-btns">
                <Button className="d-flex align-items-center started-btn">
                  <Zap size={20} className="me-2" />
                  Get Started
                </Button>
                <Button className="d-flex align-items-center browse-btn">
                  <Calendar size={20} className="me-2" />
                  Browse Events
                </Button>
              </div>
            </div>
            <div className='hero-img'>
              <div className="position-relative">
                <img
                  src={Main_Imag}
                  alt="Event Planning"
                  className="img-fluid rounded-4 hero-image"
                  style={{ height: '500px', width: '600px' }}
                />
              </div>
            </div>
          </div>
          <div className="service-container">
            <Services />
          </div>
          <div className="footer-cont">
            <Footer />
          </div>
        {/* <AdminDashboard /> */}
        </>
      ) : (
        <>
          {/* Hero Section */}
          <div className="hero-section">
            <div className="py-5 mb-5 hero-description">
              <h1 className="display-5 fw-bold mb-4 gradient-text">
                Unified Event Management for Users & Organizers
              </h1>
              <p className="mb-2 text-white typing-text">
                {typedText}
                {!isTypingComplete && <span className="cursor"></span>}
              </p>
              <p className="home-des mb-4 text-white">
                Whether Attending or Organizing! Your premier partner in crafting exceptional event experiences that leave lasting impressions. Join us today and experience a smarter way to manage and participate in events! 🚀✨
              </p>
              <div className="d-flex mb-5 hero-btns">
                <Button className="d-flex align-items-center started-btn">
                  <Zap size={20} className="me-2" />
                  Get Started
                </Button>
                <Button className="d-flex align-items-center browse-btn">
                  <Calendar size={20} className="me-2" />
                  Browse Events
                </Button>
              </div>
            </div>
            <div className='hero-img'>
              <div className="position-relative">
                <img
                  src={Main_Imag}
                  alt="Event Planning"
                  className="img-fluid rounded-4 hero-image"
                  style={{ height: '500px', width: '600px' }}
                />
              </div>
            </div>
          </div>

          {/* Services Section */}
          <div className="service-container">
            <Services />
          </div>

          {/* User Dashboard Section */}
          <div className="userdashboard-container">
            <UserDashboard />
          </div>
          <div className="footer-cont">
            <Footer />
          </div>
        </>
      )}
    </>
  );
}
