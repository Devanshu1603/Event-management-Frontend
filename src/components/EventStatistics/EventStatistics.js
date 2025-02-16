import React, { useState } from 'react';
import { Bar, Pie } from 'react-chartjs-2';
import 'chart.js/auto';
import './EventStatistics.css';

export default function EventStatistics({ onClose }) {
  // Dummy data for statistics
  const stats = {
    totalRegistrations: 120,
    totalAttendance: 90,
    eventPopularity: {
      "Hackathon 2025": 50,
      "AI ML Workshop": 40,
      "Cyber Security Seminar": 30
    },
    demographics: {
      "Undergraduate": 70,
      "Postgraduate": 30,
      "Others": 20
    }
  };

  return (
    <div className="statistics-overlay">
      <div className="statistics-dashboard">
        <button className="close-btn" onClick={onClose}>✖</button>
        <h3>Event Statistics</h3>

        <div className="stats-cards">
          <div className="stat-card">
            <h5>Total Registrations</h5>
            <p>{stats.totalRegistrations}</p>
          </div>
          <div className="stat-card">
            <h5>Total Attendance</h5>
            <p>{stats.totalAttendance}</p>
          </div>
        </div>

        <div className="charts-container">
          <div className="chart">
            <h4>Event Popularity</h4>
            <Bar 
              data={{
                labels: Object.keys(stats.eventPopularity),
                datasets: [{
                  label: 'Registrations',
                  data: Object.values(stats.eventPopularity),
                  backgroundColor: 'rgba(75, 192, 192, 0.6)'
                }]
              }}
            />
          </div>

          <div id='pie-chart' className="chart">
            <h4>Demographics</h4>
            <Pie 
              data={{
                labels: Object.keys(stats.demographics),
                datasets: [{
                  label: 'Attendees',
                  data: Object.values(stats.demographics),
                  backgroundColor: ['#ff6384', '#36a2eb', '#ffcd56']
                }]
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
