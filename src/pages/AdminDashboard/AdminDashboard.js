import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { LogOut } from "lucide-react";
import EventManagement from "../../components/EventManagement/EventManagement";
import axios from "axios";
import EventCard from "../../components/EventCard/EventCard";
import ManageRegistrations from "../../components/ManageRegistration/ManageRegistration";
import EventStatistics from "../../components/EventStatistics/EventStatistics";
import EventFeedback from "../../components/EventFeedback/EventFeedback";
import './AdminDashboard.css';

export default function AdminDashboard() {
  const navigate = useNavigate();
  const [events, setEvents] = useState([]);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [showRegistration, setShowRegistration] = useState(false);
  const [showStatistics, setShowStatistics] = useState(false);
  const [showFeedback, setShowFeedback] = useState(false);

  useEffect(() => {
    const fetchAdminEvents = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get("https://event-management-backend-gamma.vercel.app/api/events/my-events", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setEvents(response.data);
        console.log("admin events",events);
      } catch (error) {
        console.error("Error fetching admin events:", error);
      }
    };
    fetchAdminEvents();
  }, []);

  

  const handleViewDetails = (eventId) => {
    const event = events.find((e) => e._id === eventId);
    if (event) {
      setSelectedEvent(event);
    }
  };

  const handleCloseDetails = () => {
    setSelectedEvent(null);
    setShowRegistration(false);
    setShowStatistics(false);
    setShowFeedback(false);
  };

  const handleLogout = () => {
    navigate("/login");
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="bg-indigo-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div>
            <h1 className="text-center gradient-text">Welcome Back To Admin Dashboard !</h1>
            {/* <button
              onClick={handleLogout}
              className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-indigo-600 bg-white hover:bg-indigo-50"
            >
              <LogOut className="h-5 w-5 mr-2" />
              Logout
            </button> */}
          </div>
        </div>
      </div>
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 gap-8">
          <EventManagement />
        </div>
        <h2 className="admin-event-conatiner-heading text-xl font-semibold mb-4 gradient-text">Your Events</h2>
        {events.length === 0 ? (
          <p>No events posted yet.</p>
        ) : (
          <div className="card-container">
            {events.map((event) => (
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
                userRole="admin"
              />
            ))}
          </div>
        )}

        {selectedEvent && (
          <div className="admin-event-management-overlay">
            <div className="admin-event-management-container">
              <div className="admin-event-management-heading">
                <h3 className="text-xl font-semibold mb-4 gradient-text">Event Configuration</h3>
                <button className="admin-event-management-close-btn" onClick={handleCloseDetails}>✖</button>
              </div>
              <div className="event-configuration-options">
                <button
                  onClick={() => setShowRegistration(true)}
                  className="btn-1 w-full px-4 py-2 mb-2 admin-event-management-btn"
                >
                  Manage Registration
                </button>
                <button
                  onClick={() => setShowStatistics(true)}
                  className="btn-2 w-full px-4 py-2 mb-2 admin-event-management-btn"
                >
                  Event Statistics
                </button>
                <button
                  onClick={() => setShowFeedback(true)}
                  className="btn-3 w-full px-4 py-2 admin-event-management-btn"
                >
                  Feedback Analysis
                </button>
              </div>
            </div>
          </div>
        )}

        {showRegistration && <ManageRegistrations eventId={selectedEvent._id} onClose={() => setShowRegistration(false)} />}
        {showStatistics && <EventStatistics onClose={() => setShowStatistics(false)} />}
        {showFeedback && <EventFeedback onClose={() => setShowFeedback(false)} />}
      </main>
    </div>
  );
}
