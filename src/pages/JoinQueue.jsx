import React, { useEffect, useState } from "react";
import api from "/src/functions/api"; // <--- IMPORT YOUR CUSTOM AXIOS INSTANCE
import "./JoinQueue.scss";
import { useNavigate } from "react-router-dom";
import formHeaderImage from "/src/assets/appam.png";

const JoinQueue = ({ onJoinSuccess }) => {
  useEffect(() => {
    document.title = "Join Waitlist | Amachi's Palagaram";
  }, []);

  const [name, setName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [partySize, setPartySize] = useState("");
  const [message, setMessage] = useState({ text: "", type: "" });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage({ text: "", type: "" });

    if (!name || !phoneNumber || !partySize) {
      setMessage({ text: "All fields are required.", type: "error" });
      return;
    }
    const phoneRegex = /^01\d{8,9}$/;
    if (!phoneRegex.test(phoneNumber)) {
      setMessage({
        text: "Please enter a valid Malaysian phone number (e.g. 0123456789).",
        type: "error",
      });
      return;
    }
    if (
      isNaN(parseInt(partySize)) ||
      parseInt(partySize) <= 0 ||
      parseInt > 10
    ) {
      setMessage({
        text: "Party size must be a positive number.",
        type: "error",
      });
      return;
    }

    try {
      // Use 'api' instance.
      // Since baseURL in api.js is 'http://localhost:5001/api',
      // the path here should just be '/queue'
      await api.post("/queue", {
        name,
        phoneNumber,
        partySize: parseInt(partySize),
      }); // <--- USE 'api' AND CORRECT PATH
      setMessage({
        text: "Successfully joined the waitlist!",
        type: "success",
      });
      setName("");
      setPhoneNumber("");
      setPartySize("");
      if (onJoinSuccess) onJoinSuccess();
      // ⏳ Navigate after 7 seconds
      setTimeout(() => {
        navigate("/waiting-list");
      }, 7000);
    } catch (error) {
      console.error(
        "Error joining waitlist:",
        error.response?.data?.message || error.message
      );
      setMessage({
        text: error.response?.data?.message || "Failed to join waitlist.",
        type: "error",
      });
    }
  };

  const navigate = useNavigate();

  const handleBackClick = () => {
    navigate("/waiting-list");
  };

  return (
    <div className="join-waitlist-container">
      {/* ... rest of your JSX ... */}
      <div className="form-header-image">
        <img src={formHeaderImage} alt="Family enjoying food" />
      </div>
      <div className="form-content">
        <div className="form-title-bar">
          <button className="back-arrow-button" onClick={handleBackClick}>
            ←
          </button>
          <h2>Join Waitlist</h2>
        </div>
        <form onSubmit={handleSubmit} className="waitlist-form">
          <div className="form-group">
            <input
              type="text"
              placeholder="Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="form-group">
            <input
              type="tel"
              placeholder="Phone Number"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              pattern="01\d{8,9}"
              title="Phone number must start with 01 and contain 10 or 11 digits"
            />
          </div>
          <div className="form-group">
            <input
              type="number"
              placeholder="Party Size"
              value={partySize}
              onChange={(e) => setPartySize(e.target.value)}
              title="No alphabet inputs please, and our range per table is between 1 - 10 people only"
              min="1"
              max="10"
              step="1"
            />
          </div>
          <button type="submit" className="submit-button">
            Submit
          </button>
        </form>
        {message.text && (
          <p className={`message ${message.type}`}>{message.text}</p>
        )}
      </div>
    </div>
  );
};

export default JoinQueue;
