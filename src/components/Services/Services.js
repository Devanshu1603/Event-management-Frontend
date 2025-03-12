import React, {useEffect, useState} from 'react';
import './Services.css';
import { Navbar, Nav, Container, Card, Button, Row, Col, Badge } from 'react-bootstrap';
import { BarChart, ClipboardList, CalendarCheck, Lock } from 'lucide-react';
export default function Services() {
   return (
    <Row className="mb-5 services-card-container">
    <Col md={3}>
      <Card className="text-center h-100 p-3 service-card">
        <Card.Body>
          <CalendarCheck size={40} className="mb-3 red-icon" />
          <Card.Title className='mb-3'>Seamless Event Participation</Card.Title>
          <Card.Text className='service-detail-des'>Easily browse, register, and attend events with just a click. Stay updated with event details and never miss an opportunity !</Card.Text>
        </Card.Body>
      </Card>
    </Col>
    <Col md={3}>
      <Card className="text-center h-100 p-3 service-card">
        <Card.Body>
          <ClipboardList size={40} className="mb-3 green-icon" />
          <Card.Title className='mb-3'> Effortless Event Management</Card.Title>
          <Card.Text className='service-detail-des'>Admins can create, edit, and manage events efficiently. Track registrations, update event details, and ensure smooth execution.</Card.Text>
        </Card.Body>
      </Card>
    </Col>
    <Col md={3}>
      <Card className="text-center h-100 p-3 service-card">
        <Card.Body>
          <BarChart size={40} className="mb-3 blue-icon" />
          <Card.Title className='mb-3'>Real-Time Event Tracking</Card.Title>
          <Card.Text className='service-detail-des'>Get real-time insights into event participation. Track attendees, manage schedules, and optimize event experiences effortlessly.</Card.Text>
        </Card.Body>
      </Card>
    </Col>
    <Col md={3}>
      <Card className="text-center h-100 p-3 service-card">
        <Card.Body>
          <Lock size={40} className="mb-3 yellow-icon" />
          <Card.Title className='mb-3'>Data Protection & Smooth Experience</Card.Title>
          <Card.Text className='service-detail-des'>We prioritize security and user experience. Enjoy a reliable platform with secure event management and attendee authentication.</Card.Text>
        </Card.Body>
      </Card>
    </Col>
    </Row>
  );
}


