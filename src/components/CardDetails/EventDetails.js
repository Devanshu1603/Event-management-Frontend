import React, { useState } from 'react';
import { Calendar, Clock, MapPin, Users, X } from 'lucide-react';
import './EventDetails.css';
import EventRegistration from '../EventRegistration/EventRegistration';

export default function EventDetails({ event, onClose, onRegister }) {
    const [showRegistration, setShowRegistration] = useState(false);
    const statusClass = event.status === 'ongoing'
  ? 'status-ongoing'
  : event.status === 'upcoming'
  ? 'status-upcoming'
  : 'status-completed';
    // const bkl = event._id;
    // console.log("bkl :- ", bkl);

    return (
        <>
            {/* Backdrop */}
            <div className="backdrop" onClick={onClose}></div>

            {/* Event Details Modal */}
            <div className="event-details-modal">
                {/* Close Button (Always Visible) */}
                <button onClick={onClose} className="close-button">
                    <X className="cross-icon h-6 w-6" />
                </button>

                {/* Show Event Image Only in Event Details (Not in Registration) */}
                {!showRegistration && (
                    <div className="relative">
                        <img
                            src={event.image}
                            alt={event.title}
                            className="w-full h-56 object-cover rounded-t-lg"
                        />
                    </div>
                )}

                {/* Conditional Rendering for Content */}
                <div className="p-6">
                    {showRegistration ? (
                        <>
                            {/* Event Registration Form */}
                            <EventRegistration eventId={event._id} />
                        </>
                    ) : (
                        <>
                            {/* Event Details */}
                            <div className="card-detail-title-container mb-3">
                                <h3 className="card-detail-title gradient-text">{event.title}</h3>
                                <span className={`event-status ${statusClass}`} style={{ height: '30px' }}>
                                    {event.status.charAt(0).toUpperCase() + event.status.slice(1)}
                                </span>
                            </div>

                            <div className="grid grid-cols-2 mb-4">
                                <div className="space-y-6">
                                    <div className="detail-item flex items-center text-gray-600 mb-2">
                                        <Calendar className="detail-icon h-5 w-5 mr-2 red-icon" />
                                        <span>{event.date}</span>
                                    </div>
                                    <div className="detail-item flex items-center text-gray-600 mb-2">
                                        <Clock className="detail-icon h-5 w-5 mr-2 green-icon" />
                                        <span>{event.time}</span>
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <div className="detail-item flex items-center text-gray-600 mb-2">
                                        <MapPin className="detail-icon h-5 w-5 mr-2 blue-icon" />
                                        <span>{event.venue}</span>
                                    </div>
                                    <div className="detail-item flex items-center text-gray-600 mb-2">
                                        <Users className="detail-icon h-5 w-5 mr-2 yellow-icon" />
                                        <span>{event.registeredCount} / {event.capacity} registered</span>
                                    </div>
                                </div>
                            </div>

                            <div className="mb-4">
                                <h4 className="Description-text-lg font-semibold mb-2">Description</h4>
                                <p className="sub-text text-gray-600">{event.description}</p>
                            </div>

                            <div className='grid grid-cols-2'>
                                {event.requirements && (
                                    <div className="mb-4">
                                        <h4 className="Requirement-text-lg font-semibold mb-2">Requirements</h4>
                                        <ul className="sub-text text-gray-600">
                                            {event.requirements.map((req, index) => (
                                                <li key={index}>{req}</li>
                                            ))}
                                        </ul>
                                    </div>
                                )}

                                <div className="mb-4">
                                    <h4 className="Organizer-text-lg font-semibold mb-2">Organizer</h4>
                                    <p className="sub-text text-gray-600">{event.organizer}</p>
                                </div>
                            </div>

                            <button
  onClick={() => setShowRegistration(true)}
  className="btn text-white py-3 px-4 rounded-md register-button d-flex align-items-center justify-content-center"
  disabled={event.status === 'ongoing' || event.status === 'completed'}
>
  Register for Event
</button>

                        </>
                    )}
                </div>
            </div>
        </>
    );
}
