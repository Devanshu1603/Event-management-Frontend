import React, { useState, useEffect } from 'react';
import './Footer.css';
import { Link, useNavigate } from "react-router-dom";
import { Home, Vote, LogOut } from 'lucide-react';

export default function Footer() {
  const [userRole, setUserRole] = useState(null);
useEffect(() => {
    // Fetch user role from localStorage (or replace with API call)
    const role = localStorage.getItem("role") || "user"; // Default to "user" if not found
    setUserRole(role);
  }, []);
  
  return (
    <div className="footer-container">
        <section class="contact-area" id="contact">
        <div>
            <div class="ro">
                <div class="col-lg-6 offset-lg-3">
                    <div class="contact-content text-center">
                        <p>🚀 Your Go-To Event Management Platform<br></br>Simplifying event creation, management, and participation for users and organizers. Join us today and experience seamless event management !</p>
                        <div class="hr"></div>
                        <h6>Follow us on social media for updates on upcoming events and new features.</h6>
                        <h6>+92 9798 8308 05<span>|</span>console.uk123@gmail.com</h6>
                        <div class="contact-social">
                            <ul>
                                <li><Link to="/Home"><Home className='yellow-icon'/>Home</Link></li>
                                <li><Link to={userRole === "admin" ? "/admin/dashboard" : "/user/profile"}><Vote className='blue-icon'/>Dashboard</Link></li>
                                <li><Link href=""><LogOut className='green-icon'/>LogOut</Link></li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
    <footer>
        <p>Copyright &copy; 2025  <Vote className="icon-blue me-2" />
                  <span className="fw-bold text-light">PLANOVA</span> All Rights Reserved.</p>
    </footer>
    </div>
    
  );
}
