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
                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Quis ipsum </p>
                        <div class="hr"></div>
                        <h6>1120 Lorem ipsum dolor sit amet, KC 179050, Chandigarh.</h6>
                        <h6>+01 2345 6789 12<span>|</span>+01 2345 6789 12</h6>
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
        <p>Copyright &copy; 2019 <img src="https://i.ibb.co/QDy827D/ak-logo.png" alt="logo"/> All Rights Reserved.</p>
    </footer>
    </div>
    
  );
}
