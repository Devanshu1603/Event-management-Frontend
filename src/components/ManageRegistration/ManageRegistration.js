import React, { useEffect, useState } from "react";
import './ManageRegistration.css';
const RegisteredUsers = ({ eventId, onClose}) => {
  const [registrations, setRegistrations] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Fetch registered users when the component mounts
    fetch(`https://event-management-backend-gamma.vercel.app/api/events/registrations/${eventId}`, {
      method: "GET",
      headers: {
        "Authorization": `Bearer ${localStorage.getItem("token")}`, // JWT token
      },
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.registrations) {
          setRegistrations(data.registrations);
        } else {
          setError(data.message || "Failed to fetch registrations");
        }
      })
      .catch((error) => {
        console.error("Error fetching registered users:", error);
        setError("Error fetching registered users");
      });
  }, [eventId]); // Runs when eventId changes


  const updateStatus = (email, newStatus) => {
    fetch(`https://event-management-backend-gamma.vercel.app/api/events/registration/${eventId}/${email}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${localStorage.getItem("token")}`, // JWT token
      },
      body: JSON.stringify({ status: newStatus }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.message === "Registration status updated") {
          // Update the status in the local state (optimistic update)
          setRegistrations((prevRegistrations) =>
            prevRegistrations.map((registration) =>
              registration.email === email
                ? { ...registration, status: newStatus }
                : registration
            )
          );
          alert(`${newStatus} successfully for ${email}`);
        } else {
          alert("Failed to update status");
        }
      })
      .catch((error) => {
        console.error("Error updating status:", error);
        alert("Error updating status");
      });
  };

  return (
    <div className="registration-overlay">
    <div className="manage-registration-container">
    <div className="manage-registration-title">
          <h2 className="mb-2 gradient-text">Registered Users</h2>
          <button className="manageRegistration-close-btn" onClick={onClose}>✖</button>
          </div>
      {error && <p>{error}</p>}
      <table className="registration-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {registrations.length > 0 ? (
            registrations.map((user, index) => (
              <tr key={index}>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td className="status-pending">{user.status || "Pending"}</td>
                <td className="action-buttons">
                {user.status !== "Approved" && user.status !== "Rejected" && (
                    <>
                      <button
                        onClick={() => updateStatus(user.email, "Approved")}
                        className="approve-btn"
                      >
                        Approve
                      </button>
                      <button
                        onClick={() => updateStatus(user.email, "Rejected")}
                        className="reject-btn"
                      >
                        Reject
                      </button>
                    </>
                  )}
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="4" className="text-center border p-2">
                No registrations found
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
    </div>
  );
};


export default RegisteredUsers;
