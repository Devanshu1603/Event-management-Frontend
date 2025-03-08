import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { User, Mail, Phone, MapPin, Camera, Save, Edit2, Calendar, Bell, Star, Trophy } from 'lucide-react';
import './UserProfile.css';
import Footer from '../../components/Footer/Footer';
import EventCard from '../../components/EventCard/EventCard';
import EventDetails from '../../components/CardDetails/EventDetails';

export default function UserProfile() {
  const navigate = useNavigate();
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [userDetails, setUserDetails] = useState(null);
  const [registeredEvents, setRegisteredEvents] = useState([]);  // Store registered events
  const [selectedImage, setSelectedImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);

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

  const handleViewDetails = (eventId) => {
    const event = registeredEvents.find(e => e._id === eventId);
    if (event) setSelectedEvent(event);
  };

  if (!userDetails) {
    return <p>Loading...</p>;
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
              />
            </div>

            <div className="form-group mb-4">
              <label><Mail className="yellow-icon detail-icon" />Email</label>
              <input
                type="email"
                value={userDetails.email}
                className="input-field"
                disabled={!isEditing}
              />
            </div>

            <div className="form-group mb-4">
              <label><Phone className="green-icon detail-icon" />Phone</label>
              <input
                type="tel"
                value={userDetails.phone}
                className="input-field"
                disabled={!isEditing}
              />
            </div>

            <div className="form-group mb-4">
              <label><MapPin className="blue-icon detail-icon" />Address</label>
              <input
                type="text"
                value={userDetails.address}
                className="input-field"
                disabled={!isEditing}
              />
            </div>
            <div className="form-group">
              <label><MapPin className="yellow-icon detail-icon" />Bio</label>
              <input
                type="text"
                value={userDetails.bio}
                className="input-field"
                disabled={!isEditing}
              />
            </div>
          </form>
        </div>

        <div className="welcome-section">
          <div className="welcome-section-part1">
            <div className="welcome-text">
              <h2 className='gradient-text'>Welcome back, {userDetails.name}!</h2>
              <p>Stay updated with the latest tech events and workshops. Your journey in tech starts here!</p>
              <div className="buttons">
                <button className="btn btn-primary">
                  <Calendar className="icon" />
                  My Schedule
                </button>
                <button className="btn secondary">
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
              <ul className="event-list">
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
                    onViewDetails={handleViewDetails}
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

              </ul>
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
