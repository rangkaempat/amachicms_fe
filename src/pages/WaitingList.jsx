import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./WaitingList.scss";
import api from "/src/functions/api"; // <--- IMPORT YOUR CUSTOM AXIOS INSTANCE

// Import images
import img1 from "/src/assets/joinlist.png";
import img2 from "/src/assets/restaurant.jpeg";
import img3 from "/src/assets/throwback.png";
import img4 from "/src/assets/backstory.png";

const CustomerView = ({ refreshTrigger }) => {
  useEffect(() => {
    document.title = "Queue List | Amachi's Palagaram";
  }, []);

  const [queue, setQueue] = useState([]);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const navigate = useNavigate();

  const images = [img1, img2, img3, img4];

  const formatWaitTime = (joinedAt) => {
    const joined = new Date(joinedAt);
    const now = new Date();
    const diff = Math.floor((now - joined) / 60000); // in minutes
    return `${diff} min ago`;
  };

  useEffect(() => {
    const fetchQueue = async () => {
      try {
        const response = await api.get("/queue");
        setQueue(response.data);
      } catch (error) {
        console.error("Error fetching queue:", error);
      }
    };

    fetchQueue(); // Initial fetch

    const interval = setInterval(fetchQueue, 10000); // Repeat every 10 seconds

    return () => clearInterval(interval); // Clean up
  }, [refreshTrigger]);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 7000); // 10 seconds

    return () => clearInterval(interval);
  }, [images.length]);

  const handleJoinClick = () => {
    navigate("/");
  };

  return (
    <div className="customer-view-container">
      <div className="restaurant-header slideshow">
        {images.map((src, index) => (
          <img
            key={index}
            src={src}
            alt={`slide-${index}`}
            className={`slide-image ${
              index === currentImageIndex ? "visible" : ""
            }`}
          />
        ))}
      </div>

      <div className="queue-section">
        <div className="queue-title-bar">
          <h3>Welcome to Appachi's Palagaram</h3>
        </div>
        <h3 className="current-queue-title">Current Queue</h3>
        {queue.length > 0 ? (
          <div className="queue-scroll-container">
            {" "}
            {/* ⬅️ New wrapper */}
            <ul className="queue-list">
              {queue.map((customer) => (
                <li key={customer.id}>
                  <div>
                    <strong>Name:</strong> {customer.name}
                  </div>
                  <div>
                    <strong>Party Size:</strong> {customer.partySize} pax
                  </div>
                  <div>
                    <strong>Joined:</strong> {formatWaitTime(customer.joinedAt)}
                  </div>
                </li>
              ))}
            </ul>
          </div>
        ) : (
          <p>The queue is currently empty.</p>
        )}
      </div>
      <button className="join-queue-button" onClick={handleJoinClick}>
        Join Queue
      </button>

      <p className="instagram-follow-text">
        Follow us on Instagram for updates:&nbsp;
        <a
          href="https://www.instagram.com/amachis.palagaram/?hl=en"
          target="_blank"
          rel="noopener noreferrer"
        >
          <strong>@amachis.palagaram</strong>
        </a>
      </p>
    </div>
  );
};

export default CustomerView;
