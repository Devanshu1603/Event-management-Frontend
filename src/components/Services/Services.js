import React from 'react';
import { Row, Col, Card } from 'react-bootstrap';
import { motion } from 'framer-motion';
import { BarChart, ClipboardList, CalendarCheck, Lock } from 'lucide-react';
import './Services.css';

export default function Services() {
  // Animation Variants
  const cardVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: { delay: i * 0.3, duration: 0.6, ease: "easeOut" }
    })
  };

  const services = [
    {
      icon: <CalendarCheck size={40} className="mb-3 red-icon" />,
      title: "Seamless Event Participation",
      description: "Easily browse, register, and attend events with just a click. Stay updated with the event details and never miss an opportunity!"
    },
    {
      icon: <ClipboardList size={40} className="mb-3 green-icon" />,
      title: "Effortless Event Management",
      description: "Admins can create, edit, and manage events efficiently. Track registrations, update event details, and ensure smooth execution."
    },
    {
      icon: <BarChart size={40} className="mb-3 blue-icon" />,
      title: "Real-Time Event Tracking",
      description: "Get real-time insights into event participation. Track attendees, manage schedules, and optimize event experiences effortlessly."
    },
    {
      icon: <Lock size={40} className="mb-3 yellow-icon" />,
      title: "Data Protection",
      description: "We prioritize security and user experience. Enjoy a reliable platform with secure event management and attendee authentication."
    }
  ];

  return (
    <Row className="mb-5 services-card-container">
      {services.map((service, index) => (
        <Col md={3} key={index}>
          <motion.div
            custom={index}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: false, amount: 0.3 }}
            animate="visible"
            variants={cardVariants}
          >
            <Card className="text-center h-100 p-3 service-card">
              <Card.Body>
                {service.icon}
                <Card.Title className='mb-3'>{service.title}</Card.Title>
                <Card.Text className='service-detail-des'>{service.description}</Card.Text>
              </Card.Body>
            </Card>
          </motion.div>
        </Col>
      ))}
    </Row>
  );
}
