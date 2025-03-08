import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Navbar, Nav, Container } from "react-bootstrap";
import { Vote, UserCog, Home } from "lucide-react";
import "./Navbar.css"; // Import the custom CSS

const CustomNavbar = () => {
  const navigate = useNavigate();
  const [userRole, setUserRole] = useState(null);

  useEffect(() => {
    // Fetch user role from localStorage (or replace with API call)
    const role = localStorage.getItem("role") || "user"; // Default to "user" if not found
    setUserRole(role);
  }, []);

  // Function to handle logout
  const handleLogout = () => {
    localStorage.removeItem("authToken"); // Remove authentication token
    localStorage.removeItem("userRole"); // Remove user role
    navigate("/login", { replace: true }); // Redirect to login page

    // Prevent back navigation after logout
    window.history.pushState(null, null, "/login");
    window.addEventListener("popstate", function () {
      navigate("/login", { replace: true });
    });
  };

  return (
    <Navbar expand="lg" variant="dark" className="shadow-custom">
      <Container>
        {/* Brand Logo */}
        <Navbar.Brand as={Link} to="/home" className="d-flex align-items-center">
          <Vote className="icon-blue me-2" />
          <span className="fw-bold text-light">VoteVerify</span>
        </Navbar.Brand>

        {/* Navbar Toggle for Mobile */}
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          {/* Navigation Links */}
          <Nav className="ms-auto d-flex align-items-center gap-3">
            <Nav.Link as={Link} to="/home" className="d-flex align-items-center">
              <Home className="icon-small me-1" />
              <span>Home</span>
            </Nav.Link>

            {/* Conditionally Render Dashboard Link */}
            <Nav.Link
              as={Link}
              to={userRole === "admin" ? "/admin/dashboard" : "/user/profile"}
              className="d-flex align-items-center"
            >
              <Vote className="icon-small me-1" />
              <span>Dashboard</span>
            </Nav.Link>

            <Nav.Link onClick={handleLogout} className="d-flex align-items-center" style={{ cursor: "pointer" }}>
              <UserCog className="icon-small me-1" />
              <span>Logout</span>
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default CustomNavbar;
