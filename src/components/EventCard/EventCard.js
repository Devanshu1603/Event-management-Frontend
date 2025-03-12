import React from 'react';
import { Calendar, Clock, MapPin, Users } from 'lucide-react';
import './EventCard.css';

export default function EventCard({ event, onViewDetails, onAttend, userRole }) {
  const statusClass = event.status === 'ongoing'
  ? 'status-ongoing'
  : event.status === 'upcoming'
  ? 'status-upcoming'
  : 'status-completed';
  
  return (
    <div className="event-card">
      {/* Event Image */}
      {event.image && <img src={event.image} alt={event.title} className="event-image" />}

      <div className="event-card-content">
        {/* Event Title and Status */}
        <div className="card-detail flex-between mb-2">
          <h3 className='gradient-text event-title' style={{ fontSize: '1.25rem', fontWeight: '600' }}>{event.title}</h3>
          <span className={`event-status ${statusClass}`}>{event.status}</span>
        </div>

        <div className="mb-3">
          {/* Event Date */}
          <div className="flex mb-2">
            <Calendar className="mr-2 red-icon" size={20} />
            <span>{new Date(event.date).toLocaleDateString()}</span>
          </div>

          {/* Event Time */}
          <div className="flex mb-2">
            <Clock className="mr-2 green-icon" size={20} />
            <span>{event.time}</span>
          </div>

          {/* Event Location */}
          <div className="flex mb-2">
            <MapPin className="mr-2 blue-icon" size={20} />
            <span>{event.location}</span>
          </div>

          {/* Registered Count */}
          <div className="flex">
            <Users className="mr-2 yellow-icon" size={20} />
            <span>{event.registeredCount.length} / {event.capacity} registered</span>
          </div>
        </div>

        {/* Event Description */}
        <p
          className="mb-3 text-gray"
          style={{
            overflow: 'hidden',
            display: '-webkit-box',
            WebkitLineClamp: 2,
            WebkitBoxOrient: 'vertical',
          }}
        >
          {event.description}
        </p>

        {/* Conditional Buttons */}
        <button
          onClick={() =>
            userRole === 'admin' || event.status !== 'ongoing'
              ? onViewDetails(event.id)
              : onAttend(event.id)
          }
          className={`card_btn button d-flex align-items-center justify-content-center`}
          style={{ width: '100%', color:'white' }}
        >
          {userRole === 'admin' || event.status !== 'ongoing' ? 'View Details' : 'Attend'}
        </button>

      </div>
    </div>
  );
}
