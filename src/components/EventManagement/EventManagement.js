import React, {useState} from 'react';
import { Calendar, Users, Settings, BarChart } from 'lucide-react';
import './EventManagement.css';
import UploadEventForm from '../EventAdd/EventAdd';
import EmailTemplete from '../EmailTemplet/EmailTemplet';
import EventStatistics from '../EventStatistics/EventStatistics';
import EventFeedback from '../EventFeedback/EventFeedback';
import ManageRegistrations from '../ManageRegistration/ManageRegistration';

export default function EventManagement() {
  const [showUploadForm, setShowUploadForm] = useState(false);
  const [showEmailTemplates, setShowEmailTemplates] = useState(false);
  const [showStatistics, setShowStatistics] = useState(false);
  const [showFeedback, setShowFeedback] = useState(false);
  const [showRegistration, setShowRegistration] = useState(false);

  return (
    <div className=" event-management-container rounded-lg shadow-md p-6">
      <h2 className="text-2xl font-semibold mb-6 gradient-text">Event Management</h2>
      
      <div className="managment-function-container">
        <div className="managment-function p-4 border rounded-lg">
          <div className="flex items-center space-x-2 mb-4">
            <Calendar className="managment-icon h-6 w-6 text-indigo-600" style={{ color:'#7c4dff'}}/>
            <h4 className="text-lg font-medium gradient-text">Event Configuration</h4>
          </div>
          <div className="function-container space-y-4">
          <button
              className="btn-1 w-full text-left px-4 py-2 bg-gray-50 rounded-md hover:bg-gray-100"
              onClick={() => setShowUploadForm(true)} 
            >
              Post New Events
            </button>
            <button className="btn-2 w-full text-left px-4 py-2 bg-gray-50 rounded-md hover:bg-gray-100">
              Manage Events
            </button>
            <button className="btn-3 w-full text-left px-4 py-2 bg-gray-50 rounded-md hover:bg-gray-100"
            onClick={() => setShowRegistration(true)}
            >
              Manage Registration
            </button>
          </div>
        </div>

        {/* <div className="managment-function p-4 border rounded-lg">
          <div className="flex items-center space-x-2 mb-4">
            <Users className="managment-icon h-6 w-6 text-indigo-600" />
            <h4 className="text-lg font-medium">Manage Attendance</h4>
          </div>
          <div className="function-container space-y-4">
            <button className="btn-2 w-full text-left px-4 py-2 bg-gray-50 rounded-md hover:bg-gray-100">
              Scan QR Codes
            </button>
            <button className="btn-1 w-full text-left px-4 py-2 bg-gray-50 rounded-md hover:bg-gray-100">
              View Attendance
            </button>
            <button className="btn-3 w-full text-left px-4 py-2 bg-gray-50 rounded-md hover:bg-gray-100">
              Export to Excel
            </button>
          </div>
        </div> */}

        <div className="managment-function p-4 border rounded-lg">
          <div className="flex items-center space-x-2 mb-4">
            <Settings className="managment-icon h-6 w-6 text-indigo-600" style={{ color:'#7c4dff'}} />
            <h4 className="text-lg font-medium gradient-text">System Settings</h4>
          </div>
          <div className="function-container space-y-4">
            <button className="btn-2 w-full text-left px-4 py-2 bg-gray-50 rounded-md hover:bg-gray-100"
            onClick={() => setShowEmailTemplates(true)}
            >
              Email Templates
            </button>
            <button className="btn-3 w-full text-left px-4 py-2 bg-gray-50 rounded-md hover:bg-gray-100">
              Notification Settings
            </button>
            <button className="btn-1 w-full text-left px-4 py-2 bg-gray-50 rounded-md hover:bg-gray-100">
              Access Control
            </button>
          </div>
        </div>

        {/* <div className="managment-function p-4 border rounded-lg">
          <div className="flex items-center space-x-2 mb-4">
            <BarChart className="managment-icon h-6 w-6 text-indigo-600" />
            <h4 className="text-lg font-medium">Analytics</h4>
          </div>
          <div className="function-container space-y-4">
            <button className="btn-1 w-full text-left px-4 py-2 bg-gray-50 rounded-md hover:bg-gray-100"
              onClick={() => setShowStatistics(true)}
            >
              Event Statistics
            </button>
            <button className="btn-2 w-full text-left px-4 py-2 bg-gray-50 rounded-md hover:bg-gray-100"
             onClick={() => setShowFeedback(true)}
            >
              Feedback Analysis
            </button>
            <button className="btn-3 w-full text-left px-4 py-2 bg-gray-50 rounded-md hover:bg-gray-100">
              Attendance Reports
            </button>
          </div>
        </div> */}
      </div>
        {/* Render UploadEventForm when 'Upload Event Details' button is clicked */}
        {showUploadForm && <UploadEventForm onClose={() => setShowUploadForm(false)} />}

         {/* Render EmailTemplates when needed */}
      {showEmailTemplates && <EmailTemplete onClose={() => setShowEmailTemplates(false)} />}
      {showStatistics && <EventStatistics onClose={() => setShowStatistics(false)} />}
      {showFeedback && <EventFeedback onClose={() => setShowFeedback(false)} />}
      {showRegistration && <ManageRegistrations onClose={() => setShowRegistration(false)} />}
    </div>
  );
}