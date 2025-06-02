// frontend/src/components/AdminView.jsx
import React, { useState, useEffect } from "react";
import axios from "axios";
import "./AdminDashboard.scss";
import api from "/src/functions/api"; // <--- IMPORT YOUR CUSTOM AXIOS INSTANCE
import Hero from "../components/hero/Hero";

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

    const queueNumber = customer.queueNumber;
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
    <div className="sectionLight">
      <div className="sectionContent adminContent">
        <h2>Admin Queue List</h2>
        <hr />
        {queue.length > 0 ? (
          <ul className="queueList">
            {queue.map((customer) => (
              <li key={customer.id}>
                <div className="queueListNumber">
                  Queue No: {customer.queueNumber}
                </div>
                <div className="queueListDetail">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    fill="none"
                    viewBox="0 0 256 256"
                  >
                    <path d="M230.92,212c-15.23-26.33-38.7-45.21-66.09-54.16a72,72,0,1,0-73.66,0C63.78,166.78,40.31,185.66,25.08,212a8,8,0,1,0,13.85,8c18.84-32.56,52.14-52,89.07-52s70.23,19.44,89.07,52a8,8,0,1,0,13.85-8ZM72,96a56,56,0,1,1,56,56A56.06,56.06,0,0,1,72,96Z"></path>
                  </svg>
                  {customer.name}
                </div>
                <div className="queueListDetail">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    fill="none"
                    viewBox="0 0 256 256"
                  >
                    <path d="M244.8,150.4a8,8,0,0,1-11.2-1.6A51.6,51.6,0,0,0,192,128a8,8,0,0,1-7.37-4.89,8,8,0,0,1,0-6.22A8,8,0,0,1,192,112a24,24,0,1,0-23.24-30,8,8,0,1,1-15.5-4A40,40,0,1,1,219,117.51a67.94,67.94,0,0,1,27.43,21.68A8,8,0,0,1,244.8,150.4ZM190.92,212a8,8,0,1,1-13.84,8,57,57,0,0,0-98.16,0,8,8,0,1,1-13.84-8,72.06,72.06,0,0,1,33.74-29.92,48,48,0,1,1,58.36,0A72.06,72.06,0,0,1,190.92,212ZM128,176a32,32,0,1,0-32-32A32,32,0,0,0,128,176ZM72,120a8,8,0,0,0-8-8A24,24,0,1,1,87.24,82a8,8,0,1,0,15.5-4A40,40,0,1,0,37,117.51,67.94,67.94,0,0,0,9.6,139.19a8,8,0,1,0,12.8,9.61A51.6,51.6,0,0,1,64,128,8,8,0,0,0,72,120Z"></path>
                  </svg>
                  {customer.partySize} pax
                </div>
                <div className="queueListDetail">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    fill="none"
                    viewBox="0 0 256 256"
                  >
                    <path d="M128,24A104,104,0,1,0,232,128,104.11,104.11,0,0,0,128,24Zm0,192a88,88,0,1,1,88-88A88.1,88.1,0,0,1,128,216Zm64-88a8,8,0,0,1-8,8H128a8,8,0,0,1-8-8V72a8,8,0,0,1,16,0v48h48A8,8,0,0,1,192,128Z"></path>
                  </svg>
                  {formatTime(customer.joinedAt)}
                </div>
                <button
                  className="serve-now-button"
                  onClick={() => handleServeNow(customer.id)}
                >
                  Serve Now
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    fill="none"
                    viewBox="0 0 256 256"
                  >
                    <path d="M224,71.1a8,8,0,0,1-10.78-3.42,94.13,94.13,0,0,0-33.46-36.91,8,8,0,1,1,8.54-13.54,111.46,111.46,0,0,1,39.12,43.09A8,8,0,0,1,224,71.1ZM35.71,72a8,8,0,0,0,7.1-4.32A94.13,94.13,0,0,1,76.27,30.77a8,8,0,1,0-8.54-13.54A111.46,111.46,0,0,0,28.61,60.32,8,8,0,0,0,35.71,72Zm186.1,103.94A16,16,0,0,1,208,200H167.2a40,40,0,0,1-78.4,0H48a16,16,0,0,1-13.79-24.06C43.22,160.39,48,138.28,48,112a80,80,0,0,1,160,0C208,138.27,212.78,160.38,221.81,175.94ZM150.62,200H105.38a24,24,0,0,0,45.24,0ZM208,184c-10.64-18.27-16-42.49-16-72a64,64,0,0,0-128,0c0,29.52-5.38,53.74-16,72Z"></path>
                  </svg>
                </button>
              </li>
            ))}
          </ul>
        ) : (
          <p>The queue is currently empty.</p>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;
