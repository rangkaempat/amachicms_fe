// frontend/src/components/AdminView.jsx
import React, { useState, useEffect } from "react";
import axios from "axios";
import "./AdminDashboard.scss";
import api from "/src/functions/api"; // <--- IMPORT YOUR CUSTOM AXIOS INSTANCE

const AdminDashboard = ({ refreshTrigger, onServeSuccess }) => {
  useEffect(() => {
    document.title = "Admin | Amachi's Palagaram";
  }, []);

  const [queue, setQueue] = useState([]);

  useEffect(() => {
    const fetchQueue = async () => {
      try {
        const response = await api.get("/queue");
        setQueue(response.data);
      } catch (error) {
        console.error("Error fetching queue for admin:", error);
      }
    };
    fetchQueue();

    // Optional: Poll for updates every few seconds
    const intervalId = setInterval(fetchQueue, 5000); // Poll every 5 seconds
    return () => clearInterval(intervalId); // Cleanup interval on component unmount
  }, [refreshTrigger]); // Refetch when refreshTrigger changes

  const handleServeNow = async (id) => {
    const customer = queue.find((c) => c.id === id);
    if (!customer) return;

    const formatPhoneNumber = (phone) => {
      if (!phone) return "60162694377"; // fallback to default number
      return phone.startsWith("0") ? "6" + phone : phone;
    };

    const name = customer.name;
    const phoneNumber = formatPhoneNumber(customer.phoneNumber);
    const message = `Hey ${name}, your seat is ready for you in the restaurant. Thanks for being patient.`;
    const encodedMessage = encodeURIComponent(message);
    const whatsappURL = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;

    // Open WhatsApp
    window.open(whatsappURL, "_blank");

    // ✅ DELETE from backend queue
    try {
      await api.delete(`/queue/${id}`);
      console.log("Customer removed from queue");

      // Optional: refresh state locally
      setQueue((prevQueue) => prevQueue.filter((c) => c.id !== id));

      // Optional callback
      if (onServeSuccess) {
        onServeSuccess();
      }
    } catch (error) {
      console.error("Failed to remove from queue:", error);
    }
  };

  const formatTime = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: true,
    });
  };

  return (
    <div className="admin-view-container">
      <div className="admin-header">
        <h1>Admin Management</h1>
      </div>
      <h2 className="current-queue-title">Current Queue</h2>
      {queue.length > 0 ? (
        <ul className="admin-queue-list">
          {queue.map((customer) => (
            <li key={customer.id}>
              <div className="customer-info">
                <div className="name">{customer.name}</div>
                <div className="pax">{customer.partySize} pax</div>
                <div className="time">{formatTime(customer.joinedAt)}</div>
              </div>
              <button
                className="serve-now-button"
                onClick={() => handleServeNow(customer.id)}
              >
                Serve Now
              </button>
            </li>
          ))}
        </ul>
      ) : (
        <p>The queue is currently empty.</p>
      )}
    </div>
  );
};

export default AdminDashboard;
