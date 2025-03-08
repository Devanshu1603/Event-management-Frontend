import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './EmailTemplet.css';

export default function EmailTemplete({ onClose }) {
  const [templates, setTemplates] = useState({
    registration: "Dear [User],\nThank you for registering for [Event Name]. We look forward to seeing you on [Date] at [Venue].\n\nBest Regards,\n[Organizer Name]",
    reminder: "Hello [User],\nThis is a reminder for the upcoming event [Event Name] happening on [Date] at [Time] in [Venue].\n\nSee you there!",
    attendance: "Hi [User],\nYour attendance for [Event Name] has been successfully recorded. Thank you for participating!\n\nBest Regards,\n[Organizer Name]"
  });

  // Function to load the initial email template from the database
  useEffect(() => {
    const fetchEmailTemplates = async () => {
      try {
        const response = await axios.get('https://event-management-backend-gamma.vercel.app/api/email-templates');
        setTemplates(response.data); // Set initial templates from the database
      } catch (error) {
        console.error('Error fetching email templates:', error);
      }
    };
    
    fetchEmailTemplates();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTemplates({ ...templates, [name]: value });
    console.log(templates);
  };

  const handleSave = async () => {
    try {
      await axios.put('https://event-management-backend-gamma.vercel.app/api/email-templates', templates); // Save updated templates to the backend
      alert('Email Templates Updated Successfully!');
    } catch (error) {
      console.error('Error saving email templates:', error);
      alert('Failed to update email templates.');
    }
  };

  return (
    <div className="email-templates-overlay">
      <div className="email-templates-form">
        <button className="close-btn" onClick={onClose}>✖</button>
        <h3 className='gradient-text'>Email Templates</h3>

        <div className="template-section">
          <label>Registration Confirmation</label>
          <textarea name="registration" value={templates.registration} onChange={handleChange} rows="4"></textarea>
        </div>

        <div className="template-section">
          <label>Event Reminder</label>
          <textarea name="reminder" value={templates.reminder} onChange={handleChange} rows="4"></textarea>
        </div>

        <div className="template-section">
          <label>Attendance Confirmation</label>
          <textarea name="attendance" value={templates.attendance} onChange={handleChange} rows="4"></textarea>
        </div>

        <button className="save-btn" onClick={handleSave}>Save Templates</button>
      </div>
    </div>
  );
}
