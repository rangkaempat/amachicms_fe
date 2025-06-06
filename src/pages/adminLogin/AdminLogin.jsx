import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import "./AdminLogin.scss";
import Navbar from "../../components/navbar/Navbar";
import Hero from "../../components/hero/Hero";
import { fadeInWithEase, staggerContainer } from "../../functions/motionUtils";
import { loginUser } from "../../api/userAPI";
import { useNavigate } from "react-router-dom";

function AdminLogin() {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState({ text: "", type: "" });
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    document.title = "Admin Login | Amachi's Palagaram";
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage({ text: "", type: "" });

    if (!username || !password) {
      setMessage({ text: "All fields are required.", type: "error" });
      return;
    }

    try {
      const response = await loginUser(username, password); // Calls loginUser API

      if (response && response.user) {
        // ✅ Ensure login was successful
        setMessage({
          text: `Successfully logged in. Redirecting...`,
          type: "success",
        });

        // ✅ Redirect only after confirming user exists
        setTimeout(() => {
          window.location.href = "/admin";
        }, 1000);
      } else {
        throw new Error("Login failed: No user data received.");
      }
    } catch (error) {
      console.error(
        "Error logging in:",
        error.response?.data?.message || error.message
      );
      setMessage({
        text: error.response?.data?.message || "Failed to login.",
        type: "error",
      });
    }
  };

  return (
    <div className="sectionContainer">
      <Hero />

      <div className="sectionLight">
        <div className="sectionContent">
          <motion.p
            initial="hidden"
            animate="visible"
            variants={fadeInWithEase}
          >
            Fill in your details to login
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
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </motion.div>
            <motion.div className="form-group" variants={fadeInWithEase}>
              <div className="formGroupIcon">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 48 48"
                >
                  <g id="Layer_2" data-name="Layer 2">
                    <g id="invisible_box" data-name="invisible box">
                      <rect width="30" height="30" fill="none" />
                    </g>
                    <g id="Layer_7" data-name="Layer 7">
                      <g>
                        <path d="M43,10H5a2.9,2.9,0,0,0-3,3V35a2.9,2.9,0,0,0,3,3H43a2.9,2.9,0,0,0,3-3V13A2.9,2.9,0,0,0,43,10ZM42,34H6V14H42Z" />
                        <circle cx="13" cy="24" r="4" />
                        <circle cx="24" cy="24" r="4" />
                        <circle cx="35" cy="24" r="4" />
                      </g>
                    </g>
                  </g>
                </svg>
              </div>
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <div
                className="toggle-password"
                onClick={() => setShowPassword(!showPassword)}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  fill="#343525"
                  viewBox="0 0 20 20"
                  style={{ cursor: "pointer" }}
                >
                  <path
                    d={
                      showPassword
                        ? "M4 12C4 12 5.6 7 12 7M12 7C18.4 7 20 12 20 12M12 7V4M18 5L16 7.5M6 5L8 7.5M15 13C15 14.6569 13.6569 16 12 16C10.3431 16 9 14.6569 9 13C9 11.3431 10.3431 10 12 10C13.6569 10 15 11.3431 15 13Z"
                        : "M4 10C4 10 5.6 15 12 15M12 15C18.4 15 20 10 20 10M12 15V18M18 17L16 14.5M6 17L8 14.5"
                    }
                    stroke="#464455"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  ></path>
                </svg>
              </div>
            </motion.div>

            <motion.button
              type="submit"
              className="submit-button"
              variants={fadeInWithEase}
            >
              Login
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
}

export default AdminLogin;
