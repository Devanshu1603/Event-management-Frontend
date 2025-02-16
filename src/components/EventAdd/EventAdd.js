import React, { useState } from 'react';
import axios from 'axios';
import './EventAdd.css';

export default function UploadEventForm({ onClose }) {
  const [eventData, setEventData] = useState({
    title: '',
    date: '',
    time: '',
    venue: '',
    posterImg: null, // Updated to match backend field
    description: '',
    capacity: '',
    prerequisites: '',
    organizer: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEventData({ ...eventData, [name]: value });
  };

  const handleFileChange = (e) => {
    setEventData({ ...eventData, posterImg: e.target.files[0] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Prepare form data
      const formData = new FormData();
      formData.append("title", eventData.title);
      formData.append("date", eventData.date);
      formData.append("time", eventData.time);
      formData.append("venue", eventData.venue);
      formData.append("description", eventData.description);
      formData.append("capacity", eventData.capacity);
      formData.append("prerequisites", eventData.prerequisites); // Backend expects array
      formData.append("organizer", eventData.organizer);
      formData.append("posterImg", eventData.posterImg); // Ensure the correct key name

      // Get admin token from local storage
      const token = localStorage.getItem("token");
      console.log(token);

      if (!token) {
        alert("You must be logged in as an admin to upload an event.");
        return;
      }

      // API request to create event
      const response = await axios.post("http://localhost:5555/api/events/create", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      });

      console.log(response);

      if (response.status === 201) {
        alert("Event Uploaded Successfully!");
        onClose(); // Close form after successful submission
      }
    } catch (error) {
      if (error.response) {
        console.error("Error uploading event:", error.response.data); // Logs the response body
        console.error("Status:", error.response.status);  // Logs the status code (401)
        console.error("Headers:", error.response.headers);  // Logs the headers
      } else {
        console.error("Error:", error.message);  // Logs the error message if there's no response
      }
      alert("Failed to upload event. Please try again!");
    }
    
  };

  return (
    <div className="upload-event-overlay">
      <div className="upload-event-form">
        <div className="event-add-title">
          <h5 className="text-primary">Post A New Event!</h5>
          <button className="close-btn" onClick={onClose}>✖</button>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="event-upload-input-group mb-2">
            <label>Event Title</label>
            <input
              type="text"
              name="title"
              value={eventData.title}
              onChange={handleChange}
              placeholder="Enter event title"
              required
            />
          </div>
          <div className="event-upload-input-group mb-2">
            <label>Description</label>
            <textarea
              name="description"
              value={eventData.description}
              onChange={handleChange}
              placeholder="Enter event description"
              rows="3"
              required
            ></textarea>
          </div>
          <div className="date-time">
            <div className="event-upload-input-group mb-2">
              <label>Date</label>
              <input
                className="small-input"
                type="date"
                name="date"
                value={eventData.date}
                onChange={handleChange}
                required
              />
            </div>
            <div className="event-upload-input-group mb-2">
              <label>Time</label>
              <input
                className="small-input"
                type="time"
                name="time"
                value={eventData.time}
                onChange={handleChange}
                required
              />
            </div>
            <div className="event-upload-input-group mb-2">
              <label>Capacity</label>
              <input
                type="number"
                name="capacity"
                value={eventData.capacity}
                onChange={handleChange}
                placeholder="Enter max attendees"
                required
              />
            </div>
          </div>
          <div className="venue-organizer">
            <div className="event-upload-input-group mb-2">
              <label>Venue</label>
              <input
                type="text"
                name="venue"
                value={eventData.venue}
                onChange={handleChange}
                placeholder="Enter venue"
                required
              />
            </div>
            <div className="event-upload-input-group">
              <label>Organizer Name</label>
              <input
                type="text"
                name="organizer"
                value={eventData.organizer}
                onChange={handleChange}
                placeholder="Enter organizer name"
                required
              />
            </div>
          </div>
          <div className="poster-status">
          <div className="event-upload-input-group mb-2">
            <label>Event Poster</label>
            <input
              id="posterImg"
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              required
            />
          </div>
          {/* <div id='status-box' className="event-upload-input-group mb-2">
            <label>Status</label>
            <select
              name="status"
              value={eventData.status}
              onChange={handleChange}
              required
            >
              <option value="Upcoming">Upcoming</option>
              <option value="Ongoing">Ongoing</option>
            </select>
          </div> */}
          </div>
          <div className="event-upload-input-group">
            <label>Pre-requirements (comma-separated)</label>
            <input
              type="text"
              name="prerequisites"
              value={eventData.prerequisites}
              onChange={handleChange}
              placeholder="Enter any requirements"
              required
            />
          </div>
          <div className="btn">
            <button className="btn btn-primary" type="submit">Upload Event</button>
          </div>
        </form>
      </div>
    </div>
  );
}
