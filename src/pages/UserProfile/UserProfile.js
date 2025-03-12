import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { User, Mail, Phone, MapPin, Camera, Save, Edit2, Calendar, Bell, Star, Trophy } from 'lucide-react';
import './UserProfile.css';
import Preloader from '../../components/PreLoader/Preloader';
import Footer from '../../components/Footer/Footer';
import EventCard from '../../components/EventCard/EventCard';
import EventDetails from '../../components/CardDetails/EventDetails';
import jsQR from "jsqr";

export default function UserProfile() {
  const navigate = useNavigate();
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [scannedData, setScannedData] = useState(null);
  const [qrImage, setQrImage] = useState(null);
  const [userDetails, setUserDetails] = useState(null);
  const [registeredEvents, setRegisteredEvents] = useState([]);  // Store registered events
  const [selectedImage, setSelectedImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [scanning, setScanning] = useState(false);


  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          navigate('/login');
          return;
        }

        // Fetch User Profile
        const response = await axios.get('https://event-management-backend-gamma.vercel.app/api/user/profile', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setUserDetails(response.data);
        setImagePreview(response.data.profileImage);

        // Fetch Registered Event IDs
        const eventResponse = await axios.get('https://event-management-backend-gamma.vercel.app/api/events/registered-events', {
          headers: { Authorization: `Bearer ${token}` },
        });

        const eventIds = eventResponse.data.registeredEvents; // Extract event IDs
        console.log("event id :- ", eventIds);
        if (eventIds.length === 0) {
          setRegisteredEvents([]); // If no events, set an empty array
          return;
        }

        // Fetch Event Details for Each ID
        const eventDetailsPromises = eventIds.map(eventId =>
          axios.get(`https://event-management-backend-gamma.vercel.app/api/events/${eventId._id}`)
        );

        const eventDetailsResponses = await Promise.all(eventDetailsPromises);
        const eventDetails = eventDetailsResponses.map(res => res.data);
        console.log("eventDetailsResponses :- ", eventDetailsResponses);
        console.log("eventDetails :- ", eventDetails);
        setRegisteredEvents(eventDetails); // Set detailed event data
      } catch (error) {
        console.error('Error fetching user or event data:', error);
      }
    };

    fetchUserData();
  }, [navigate]);

  const handleSave = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        alert("No authentication token found");
        return;
      }

      const formData = new FormData();
      if (userDetails.name) formData.append('name', userDetails.name);
      if (userDetails.email) formData.append('email', userDetails.email);
      if (userDetails.phone) formData.append('phone', userDetails.phone);
      if (userDetails.address) formData.append('address', userDetails.address);
      if (userDetails.bio) formData.append('bio', userDetails.bio);

      if (selectedImage) {
        formData.append('profileImage', selectedImage);
      }

      console.log("Sending form data:", [...formData.entries()]);

      try {
        const response = await fetch("https://event-management-backend-gamma.vercel.app/api/user/profile", {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${token}`, // If you use authentication
          },
          body: formData, // ✅ Sending FormData instead of JSON
        });

        const data = await response.json();
        if (response.ok) {
          alert("Profile updated successfully!");
          setIsEditing(false);
        } else {
          alert("Update failed:", data);
        }
      } catch (error) {
        console.error("Error updating profile:", error);
      }
    } catch (error) {
      console.error('Error updating profile:', error.response ? error.response.data : error.message);
    }
  };


  const handleViewDetails = (eventId) => {
    const event = registeredEvents.find(e => e._id === eventId);
    if (event) setSelectedEvent(event);
  };

  const token = localStorage.getItem('token');
  if (!token) {
    alert("No authentication token found");
    return;
  }

  const handleAttendEvent = (eventId) => {
    const event = registeredEvents.find(e => e._id === eventId);
    if (event) {
      setSelectedEvent(event);
      setScanning(true);
    } else {
      alert("Error: Event not found.");
    }
  };

  const handleScan = async (data) => {
    if (data && selectedEvent && userDetails) {
      setScannedData(data.text);
      console.log("scannned data :-", scannedData);
      setScanning(false);

      try {
        const response = await fetch("https://event-management-backend-gamma.vercel.app/api/events/mark-attendance", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
          },
          body: JSON.stringify({
            eventId: selectedEvent._id,
            email: userDetails.email, // Send user's email instead of qrCodeData
          }),
        });

        const result = await response.json();
        console.log("result :-", result);
        if (response.ok) {
          alert("Attendance marked successfully! ✅");
          navigate('/LandingPage');
        } else {
          alert(result.message || "You haven't registered for this event ❌");
        }
      } catch (error) {
        console.error("Error marking attendance:", error);
        alert("Something went wrong. Please try again.");
      }
    } else {
      alert("No event selected or invalid QR code.");
    }
  };


  const handleFileUpload = async (event) => {
    const file = event.target.files[0];
    if (file) {
      setQrImage(URL.createObjectURL(file));
      const image = await file.arrayBuffer();
      const canvas = document.createElement("canvas");
      const context = canvas.getContext("2d");
      const img = new Image();

      img.onload = () => {
        canvas.width = img.width;
        canvas.height = img.height;
        context.drawImage(img, 0, 0, img.width, img.height);

        const imageData = context.getImageData(0, 0, img.width, img.height);
        const qrCode = jsQR(imageData.data, img.width, img.height);
        console.log("qr data :- ", qrCode);
        if (qrCode) {
          handleScan({ text: qrCode.data });
        } else {
          alert("No QR code found in the image. Try again.");
        }
      };
      img.src = URL.createObjectURL(file);
    }
  };


  if (!userDetails) {
    return (
      <div className="Preloader-container">
       <Preloader />
      </div>
    
    );
  }

  return (
    <>
      <div className="profile-container">
        <div className="profile-content mb-4">
          <div className="profile-section mb-4">
            <div className="edit-button-container">
              <button onClick={() => setIsEditing(!isEditing)} className="edit-icon-btn">
                <Edit2 />
              </button>
            </div>

            <div className="profile-header">
              <div className="profile-image-container">
                <img
                  src={imagePreview || "https://via.placeholder.com/150"}
                  alt="Profile"
                  className="profile-image"
                  style={{ borderRadius: '50%', border: '2px solid #7c4dff' }}
                />
                <input
                  type="file"
                  id="imageUpload"
                  accept="image/*"
                  onChange={(e) => {
                    setSelectedImage(e.target.files[0]);
                    setImagePreview(URL.createObjectURL(e.target.files[0]));
                  }}
                  style={{ display: 'none' }}
                />
              </div>
              {isEditing && (
                <label htmlFor="imageUpload" className="edit-icon">
                  <Camera />
                </label>
              )}
            </div>

            <form className='user-details-row p-3'>
              <div className="form-group mb-4">
                <label><User className='red-icon detail-icon' />Full Name</label>
                <input
                  type="text"
                  value={userDetails.name}
                  className="input-field"
                  disabled={!isEditing}
                  onChange={(e) => setUserDetails({ ...userDetails, name: e.target.value })}
                />
              </div>

              <div className="form-group mb-4">
                <label><Mail className="yellow-icon detail-icon" />Email</label>
                <input
                  type="email"
                  value={userDetails.email}
                  className="input-field"
                  disabled={!isEditing}
                  onChange={(e) => setUserDetails({ ...userDetails, email: e.target.value })}

                />
              </div>

              <div className="form-group mb-4">
                <label><Phone className="green-icon detail-icon" />Phone</label>
                <input
                  type="tel"
                  value={userDetails.phone}
                  className="input-field"
                  disabled={!isEditing}
                  onChange={(e) => setUserDetails({ ...userDetails, phone: e.target.value })}

                />
              </div>

              <div className="form-group mb-4">
                <label><MapPin className="blue-icon detail-icon" />Address</label>
                <input
                  type="text"
                  value={userDetails.address}
                  className="input-field"
                  disabled={!isEditing}
                  onChange={(e) => setUserDetails({ ...userDetails, address: e.target.value })}

                />
              </div>
              <div className="form-group mb-4">
                <label><MapPin className="yellow-icon detail-icon" />Bio</label>
                <input
                  type="text"
                  value={userDetails.bio}
                  className="input-field"
                  disabled={!isEditing}
                  onChange={(e) => setUserDetails({ ...userDetails, bio: e.target.value })}

                />
              </div>
              {/* Save Button */}
              {isEditing && (
                <div className="button-container">
                  <button type="submit" className="btn save-btn" onClick={handleSave}>
                    <Save className="icon" /> Save Changes
                  </button>
                </div>
              )}
            </form>
          </div>

          <div className="welcome-section">
            <div className="welcome-section-part1">
              <div className="welcome-text">
                <h2 className='gradient-text'>Welcome back, {userDetails.name}!</h2>
                <p>Stay updated with the latest tech events and workshops. Your journey in tech starts here!</p>
                <div className="buttons">
                  <button className="btn btn-primary profile-detail-btn">
                    <Calendar className="icon" />
                    My Schedule
                  </button>
                  <button className="btn secondary profile-detail-btn">
                    <Bell className="icon" />
                    Notifications
                  </button>
                </div>
              </div>
              <div className="stats-grid">
                <div className="stat-card blue">
                  <Calendar className="stat-icon" />
                  <div className="stat-number">{registeredEvents.length}</div>
                  <div className="stat-text">Registered Events</div>
                </div>
                <div className="stat-card green">
                  <Trophy className="stat-icon" />
                  <div className="stat-number">0</div>
                  <div className="stat-text">Completed Events</div>
                </div>
                <div className="stat-card purple">
                  <Star className="stat-icon" />
                  <div className="stat-number">4.8</div>
                  <div className="stat-text">Rating</div>
                </div>
              </div>
            </div>

            {/* Registered Events Section */}
            <div className="welcome-section-part2">
              <h3 className='gradient-text'>My Registered Events</h3>
              {registeredEvents.length > 0 ? (
                <div className="card-container gap-6">
                  {registeredEvents.map((event) => (
                    <EventCard
                      key={event._id}
                      event={{
                        id: event._id,
                        title: event.title,
                        image: event.posterImg,
                        status: event.status,
                        date: event.date,
                        time: event.time,
                        location: event.venue,
                        registeredCount: event.registrations,
                        capacity: event.capacity,
                        description: event.description,
                      }}
                      onAttend={event.status === "ongoing" ? handleAttendEvent : undefined}
                      onViewDetails={event.status !== "ongoing" ? handleViewDetails : undefined}
                      userRole="user"
                    />
                  ))}


                  {/* Event Details Modal */}
                  {selectedEvent && (
                    <EventDetails
                      event={{ ...selectedEvent, image: selectedEvent.posterImg }}
                      onClose={() => setSelectedEvent(null)}
                    />
                  )}

                  {scanning && (
                    <div className="attendence-overlay">
                      <div className="attendence-container">
                        <div className="attendence-heading">
                          <h3>Scan or Upload QR Code to Mark Attendance</h3>
                          <button className="attendence-close-btn" onClick={() => setScanning(false)}>✖</button>
                        </div>
                        {/* File Upload Input */}
                        <input
                          type="file"
                          accept="image/*"
                          onChange={handleFileUpload}
                          className="qr-upload-input"
                        />

                        {/* <button onClick={() => setScanning(false)} className="close-btn">Close</button> */}
                      </div>
                    </div>
                  )}

                </div>
              ) : (
                <p>No registered events yet.</p>
              )}


            </div>
          </div>
        </div>
      </div>
      <div className="footer-cont">
        <Footer />
      </div>
    </>
  );
}
