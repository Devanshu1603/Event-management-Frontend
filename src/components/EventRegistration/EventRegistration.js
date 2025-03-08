import React, { useState } from "react";
import axios from "axios";
import "./EventRegistration.css";

export default function EventRegistration({ eventId }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [showDetails, setShowDetails] = useState(true); // State to manage visibility of details

  const handleRegister = async (e) => {
    e.preventDefault(); // Prevent page refresh on form submit

    try {
      const token = localStorage.getItem("token"); // Get token from localStorage

      // If token is not found, handle this case
      if (!token) {
        alert("You need to be logged in to register.");
        return;
      }

      // Send POST request to register for the event with name and email
      const response = await axios.post(
        `https://event-management-backend-gamma.vercel.app/api/events/register/${eventId}`,
        { name, email },
        {
          headers: {
            Authorization: `Bearer ${token}`, // Send token in Authorization header
          },
        }
      );

      // Handle successful registration
      alert("Registration successful!");

      // Close details after a brief delay (e.g., 2 seconds)
        setShowDetails(false);

    } catch (error) {
      console.error("Error during registration:", error);
      alert("Registration failed. Please try again.");
    }
  };

  return (
    <div className="registration-container">
      {showDetails && (
        <form onSubmit={handleRegister}>
          <div className="row">
            <h4>Register</h4>
            <div className="input-group">
              <input
                type="text"
                placeholder="Full Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>
            <div className="input-group">
              <input
                type="email"
                placeholder="Email Address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
          </div>
          <div id="term-row" className="row">
            <h4>Terms and Conditions</h4>
            <div className="input-group">
              <input id="terms" type="checkbox" />
              <label id="term-text" htmlFor="terms">
                I accept the terms and conditions for signing up to this service,
                and hereby confirm I have read the privacy policy.
              </label>
            </div>
          </div>
          <button type="submit" className="reg-btn btn btn-primary">
            Register
          </button>
        </form>
      )}
    </div>
  );
}
