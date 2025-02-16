import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { LogOut, User, Search } from 'lucide-react';
import QrScanner from 'qr-scanner'; // Import QrScanner for decoding images
import EventCard from '../../components/EventCard/EventCard';
import EventDetails from '../../components/CardDetails/EventDetails';
import './UserDashboard.css';
import jsQR from "jsqr";

export default function UserDashboard() {
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [events, setEvents] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [scanning, setScanning] = useState(false);
  const [scannedData, setScannedData] = useState(null);
  const navigate = useNavigate();
  const [qrImage, setQrImage] = useState(null); 


  // Fetch events from the backend
  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await fetch("http://localhost:5555/api/events");
        const data = await response.json();
        setEvents(data);
      } catch (error) {
        console.error("Error fetching events:", error);
      }
    };
    fetchEvents();
  }, []);

  const handleLogout = () => {
    navigate('/login');
  };

  const handleViewDetails = (eventId) => {
    const event = events.find(e => e._id === eventId);
    if (event) setSelectedEvent(event);
  };

  const filteredEvents = Array.isArray(events)
    ? events.filter(event => event.title.toLowerCase().includes(searchTerm.toLowerCase()))
    : [];

  const ongoingEvents = filteredEvents.filter(event => event.status === 'ongoing');
  const upcomingEvents = filteredEvents.filter(event => event.status === 'upcoming');

   // ✅ Open Scanner or File Upload
   const handleAttendEvent = (eventId) => {
    const event = events.find(e => e._id === eventId);
    if (event) {
      setSelectedEvent(event);
      setScanning(true);
    } else {
      alert("Error: Event not found.");
    }
  };

  // ✅ Handle QR Code Scanning from Camera
  const handleScan = async (data) => {
    if (data && selectedEvent) {
      setScannedData(data.text);
      setScanning(false);

      try {
        const response = await fetch("http://localhost:5555/api/events/mark-attendance", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            eventId: selectedEvent._id,
            qrCodeData: data.text,
          }),
        });

        const result = await response.json();
        if (response.ok) {
          alert("Attendance marked successfully! ✅");
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

  // ✅ Handle QR Code Scanning from Uploaded Image
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
        
        if (qrCode) {
          handleScan({ text: qrCode.data });
        } else {
          alert("No QR code found in the image. Try again.");
        }
      };
      img.src = URL.createObjectURL(file);
    }
  };

  // ✅ Handle QR Code Scan Error
  const handleError = (err) => {
    console.error("QR Scan Error:", err);
  };


  return (
    <div className="main-container">
      <div className="bg-indigo-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-4">
              <button
                onClick={() => navigate('/user/profile')}
                className="inline-flex items-center px-4 py-2 border rounded-md shadow-sm text-sm font-medium text-indigo-600 bg-white hover:bg-indigo-50"
              >
                <User className="h-5 w-5 mr-2" />
                Profile
              </button>
              <button
                onClick={handleLogout}
                className="inline-flex items-center px-4 py-2 border rounded-md shadow-sm text-sm font-medium text-indigo-600 bg-white hover:bg-indigo-50"
              >
                <LogOut className="h-5 w-5 mr-2" />
                Logout
              </button>
            </div>
          </div>
        </div>
      </div>

      <main>
        {/* Search Bar */}
        <div className="mb-8">
          <div className="search-bar-container relative flex">
            <div className="search-icon">
              <Search />
            </div>
            <input
              type="text"
              placeholder="Search events..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="search-bar border border-gray-300"
            />
          </div>
        </div>

        {/* Ongoing Events (Show Attend Button) */}
        {ongoingEvents.length > 0 && (
          <div className="mb-8">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Ongoing Events</h2>
            <div className="card-container gap-6">
              {ongoingEvents.map(event => (
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
                  onAttend={handleAttendEvent}
                  userRole="user"
                />
              ))}
            </div>
          </div>
        )}

        {/* Upcoming Events (Show View Details Button) */}
        {upcomingEvents.length > 0 && (
          <div>
            <h2 className="text-xl font-bold text-gray-900 mb-4">Upcoming Events</h2>
            <div className="card-container gap-6">
              {upcomingEvents.map(event => (
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
            </div>
          </div>
        )}

        {/* Event Details Modal */}
        {selectedEvent && (
          <EventDetails
            event={{ ...selectedEvent, image: selectedEvent.posterImg }}
            onClose={() => setSelectedEvent(null)}
          />
        )}

        {/* QR Scanner Modal (Now Includes Upload Feature) */}
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
      </main>
    </div>
  );
}
