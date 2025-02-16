import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { User, Mail, Phone, MapPin, Camera, Save, Calendar, Star, Bell, Trophy } from 'lucide-react';
import './UserProfile.css';

export default function UserProfile() {
  const navigate = useNavigate();
  const [isEditing, setIsEditing] = useState(false);
  const [userDetails, setUserDetails] = useState({
    name: 'John Doe',
    email: 'john.doe@example.com',
    phone: '+1 234 567 8900',
    address: '123 Tech Street, Silicon Valley, CA',
    bio: 'Tech enthusiast and event organizer with 5+ years of experience in community building.',
    profileImage: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&h=500&q=80'
  });

  const handleSave = (e) => {
    e.preventDefault();
    setIsEditing(false);
  };

  return (
    <div className="profile-container">
      <div className="profile-content">
  {/* part1 */}
        <div className="profile-section">
          <div className="profile-header">
            <div className="profile-image-container">
              <img src={userDetails.profileImage} alt="Profile" className="profile-image" />
              {isEditing && (
                <button className="edit-icon">
                  <Camera />
                </button>
              )}
            </div>
          </div>

          <div className="profile-details">
            {/* <div className="profile-header">
              <button className="btn primary" onClick={() => setIsEditing(!isEditing)}>
                {isEditing ? 'Cancel' : 'Edit Profile'}
              </button>
            </div> */}
             <h5>Contact Details</h5>
            <form onSubmit={handleSave}>
              <div className="form-grid">
                <div className="form-group">
                  <label> Full Name</label>
                  <div className="form-group-details">
                  {isEditing ? <input type="text" value={userDetails.name} onChange={(e) => setUserDetails({ ...userDetails, name: e.target.value })} /> : <p>{userDetails.name}</p>}<User className="icon" />
                  </div>
                  <hr></hr>
                </div>

                <div className="form-group">
                  <label> Email</label>
                  <div className="form-group-details">
                  {isEditing ? <input type="email" value={userDetails.email} onChange={(e) => setUserDetails({ ...userDetails, email: e.target.value })} /> : <p>{userDetails.email}</p>}<Mail className="icon" />
                  </div>
                  <hr></hr>
                </div>

                <div className="form-group">
                  <label> Phone</label>
                  <div className="form-group-details">
                  {isEditing ? <input type="tel" value={userDetails.phone} onChange={(e) => setUserDetails({ ...userDetails, phone: e.target.value })} /> : <p>{userDetails.phone}</p>}<Phone className="icon" />
                  </div>
                  <hr></hr>
                </div>

                <div className="form-group">
                  <label> Address</label>
                  <div className="form-group-details">
                  {isEditing ? <input type="text" value={userDetails.address} onChange={(e) => setUserDetails({ ...userDetails, address: e.target.value })} /> : <p>{userDetails.address}</p>}<MapPin className="icon" /> 
                  </div>
                  <hr></hr>
                </div>
              </div>

              <div className="form-group">
                <label>Bio</label>
                {isEditing ? <textarea value={userDetails.bio} onChange={(e) => setUserDetails({ ...userDetails, bio: e.target.value })} rows="4" /> : <p>{userDetails.bio}</p>}
              </div>

              {isEditing && (
                <div className="save-button">
                  <button type="submit" className="btn primary">
                    <Save className="icon" />
                    Save Changes
                  </button>
                </div>
              )}
            </form>
          </div>
        </div>
        {/* part2 */}
        <div className="welcome-section">
          <div className="welcome-text">
            <h2>Welcome back, User!</h2>
            <p>Stay updated with the latest tech events and workshops. Your journey in tech starts here!</p>
            <div className="buttons">
              <button className="btn primary">
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
              <div className="stat-number">3</div>
              <div className="stat-text">Registered Events</div>
            </div>
            <div className="stat-card green">
              <Trophy className="stat-icon" />
              <div className="stat-number">5</div>
              <div className="stat-text">Completed</div>
            </div>
            <div className="stat-card purple">
              <Star className="stat-icon" />
              <div className="stat-number">4.8</div>
              <div className="stat-text">Rating</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
