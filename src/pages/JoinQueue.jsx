import React, { useEffect, useState } from "react";
import api from "/src/functions/api"; // <--- IMPORT YOUR CUSTOM AXIOS INSTANCE
import "./JoinQueue.scss";
import { useNavigate } from "react-router-dom";
import Hero from "../components/hero/Hero";
import { motion } from "framer-motion";
import { fadeInWithEase, staggerContainer } from "../functions/motionUtils";
import Navbar from "../components/navbar/Navbar";

const JoinQueue = ({ onJoinSuccess }) => {
  useEffect(() => {
    document.title = "Join Waitlist | Amachi's Palagaram";
  }, []);

  const [name, setName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [partySize, setPartySize] = useState("");
  const [queueNumber, setQueueNumber] = useState("");
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

    // Handle Submit
    try {
      // Use 'api' instance.
      // Since baseURL in api.js is 'http://localhost:5001/api',
      // the path here should just be '/queue'

      // Post new customer to backend
      const response = await api.post("/queue", {
        name,
        phoneNumber,
        partySize: parseInt(partySize),
        queueNumber,
      }); // <--- USE 'api' AND CORRECT PATH

      const newCustomer = response.data;

      const position = newCustomer.queueNumber;

      // Show message
      setMessage({
        text: `Successfully joined the waitlist! Your Queue Number is: ${position}. Please wait to be redirected.`,
        type: "success",
      });

      // Clear form + trigger any callbacks
      setName("");
      setPhoneNumber("");
      setPartySize("");
      setQueueNumber("");
      if (onJoinSuccess) onJoinSuccess();

      // ⏳ Navigate after 1 second
      setTimeout(() => {
        navigate("/waiting-list", {
          state: {
            queueNumber: position,
            succes: true, //Flag for tracking queue submission
          },
        });
      }, 1000);
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

  return (
    <div className="sectionContainer">
      <Navbar />
      <Hero />

      <div className="sectionLight">
        <div className="sectionContent">
          <motion.p
            initial="hidden"
            animate="visible"
            variants={fadeInWithEase}
          >
            Fill in your details to join the queue
          </motion.p>
          <motion.form
            onSubmit={handleSubmit}
            className="waitlist-form"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={staggerContainer}
          >
            <motion.div className="form-group" variants={fadeInWithEase}>
              <div className="formGroupIcon">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  fill="#343525"
                  viewBox="0 0 256 256"
                >
                  <path d="M230.92,212c-15.23-26.33-38.7-45.21-66.09-54.16a72,72,0,1,0-73.66,0C63.78,166.78,40.31,185.66,25.08,212a8,8,0,1,0,13.85,8c18.84-32.56,52.14-52,89.07-52s70.23,19.44,89.07,52a8,8,0,1,0,13.85-8ZM72,96a56,56,0,1,1,56,56A56.06,56.06,0,0,1,72,96Z"></path>
                </svg>
              </div>
              <input
                type="text"
                placeholder="Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </motion.div>
            <motion.div className="form-group" variants={fadeInWithEase}>
              <div className="formGroupIcon">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  fill="#343525"
                  viewBox="0 0 256 256"
                >
                  <path d="M222.37,158.46l-47.11-21.11-.13-.06a16,16,0,0,0-15.17,1.4,8.12,8.12,0,0,0-.75.56L134.87,160c-15.42-7.49-31.34-23.29-38.83-38.51l20.78-24.71c.2-.25.39-.5.57-.77a16,16,0,0,0,1.32-15.06l0-.12L97.54,33.64a16,16,0,0,0-16.62-9.52A56.26,56.26,0,0,0,32,80c0,79.4,64.6,144,144,144a56.26,56.26,0,0,0,55.88-48.92A16,16,0,0,0,222.37,158.46ZM176,208A128.14,128.14,0,0,1,48,80,40.2,40.2,0,0,1,82.87,40a.61.61,0,0,0,0,.12l21,47L83.2,111.86a6.13,6.13,0,0,0-.57.77,16,16,0,0,0-1,15.7c9.06,18.53,27.73,37.06,46.46,46.11a16,16,0,0,0,15.75-1.14,8.44,8.44,0,0,0,.74-.56L168.89,152l47,21.05h0s.08,0,.11,0A40.21,40.21,0,0,1,176,208Z"></path>
                </svg>
              </div>
              <input
                type="tel"
                placeholder="Phone Number"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                pattern="01\d{8,9}"
                title="Phone number must start with 01 and contain 10 or 11 digits"
              />
            </motion.div>
            <motion.div className="form-group" variants={fadeInWithEase}>
              <div className="formGroupIcon">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  fill="#343525"
                  viewBox="0 0 256 256"
                >
                  <path d="M244.8,150.4a8,8,0,0,1-11.2-1.6A51.6,51.6,0,0,0,192,128a8,8,0,0,1-7.37-4.89,8,8,0,0,1,0-6.22A8,8,0,0,1,192,112a24,24,0,1,0-23.24-30,8,8,0,1,1-15.5-4A40,40,0,1,1,219,117.51a67.94,67.94,0,0,1,27.43,21.68A8,8,0,0,1,244.8,150.4ZM190.92,212a8,8,0,1,1-13.84,8,57,57,0,0,0-98.16,0,8,8,0,1,1-13.84-8,72.06,72.06,0,0,1,33.74-29.92,48,48,0,1,1,58.36,0A72.06,72.06,0,0,1,190.92,212ZM128,176a32,32,0,1,0-32-32A32,32,0,0,0,128,176ZM72,120a8,8,0,0,0-8-8A24,24,0,1,1,87.24,82a8,8,0,1,0,15.5-4A40,40,0,1,0,37,117.51,67.94,67.94,0,0,0,9.6,139.19a8,8,0,1,0,12.8,9.61A51.6,51.6,0,0,1,64,128,8,8,0,0,0,72,120Z"></path>
                </svg>
              </div>
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
            </motion.div>
            <motion.button
              type="submit"
              className="submit-button"
              variants={fadeInWithEase}
            >
              Join Queue
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                fill="none"
                viewBox="0 0 256 256"
              >
                <path d="M141.66,133.66l-80,80a8,8,0,0,1-11.32-11.32L124.69,128,50.34,53.66A8,8,0,0,1,61.66,42.34l80,80A8,8,0,0,1,141.66,133.66Zm80-11.32-80-80a8,8,0,0,0-11.32,11.32L204.69,128l-74.35,74.34a8,8,0,0,0,11.32,11.32l80-80A8,8,0,0,0,221.66,122.34Z"></path>
              </svg>
            </motion.button>
            {message.text && (
              <p className={`message ${message.type}`}>{message.text}</p>
            )}
          </motion.form>
        </div>
      </div>
    </div>
  );
};

export default JoinQueue;
