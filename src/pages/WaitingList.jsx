import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./WaitingList.scss";
import api from "/src/functions/api"; // <--- IMPORT YOUR CUSTOM AXIOS INSTANCE
import { useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import { fadeInWithEase, staggerContainer } from "../functions/motionUtils";
import Hero from "../components/hero/Hero";

const CustomerView = ({ refreshTrigger }) => {
  const location = useLocation();
  const queueNumber = location.state?.queueNumber;
  const success = location.state?.succes;

  useEffect(() => {
    document.title = "Queue List | Amachi's Palagaram";
  }, []);

  const [queue, setQueue] = useState([]);
  const navigate = useNavigate();

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

  const handleJoinClick = () => {
    navigate("/");
  };

  return (
    <div className="waitingListContainer">
      <Hero />

      <div className="sectionLight">
        <div className="sectionContent">
          <div className="queueSuccessTitle">
            {success ? (
              <>
                <motion.div
                  className="queueSuccessIcon"
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ type: "spring", stiffness: 260, damping: 20 }}
                >
                  <motion.svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="72"
                    height="72"
                    viewBox="0 0 256 256"
                  >
                    <motion.path
                      d="M229.66,77.66l-128,128a8,8,0,0,1-11.32,0l-56-56a8,8,0,0,1,11.32-11.32L96,188.69,218.34,66.34a8,8,0,0,1,11.32,11.32Z"
                      fill="none"
                      stroke="#343525"
                      strokeWidth="16"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      initial={{ pathLength: 0 }}
                      animate={{ pathLength: 1 }}
                      transition={{ duration: 0.8, ease: "easeInOut" }}
                    />
                  </motion.svg>
                </motion.div>
                <p>Queue joined Successfully!</p>
                <h2>{queueNumber && `Your Queue No: ${queueNumber}`}</h2>
                <hr />
              </>
            ) : (
              <h3>Current Queue:</h3>
            )}
          </div>

          {queue.length > 0 ? (
            <motion.ul
              className="queue-list"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
              variants={staggerContainer}
            >
              {queue.map((customer) => (
                <motion.li key={customer.id} variants={fadeInWithEase}>
                  <div
                    className={
                      queueNumber === customer.queueNumber
                        ? "currentQueueListNumber queueListNumber"
                        : "queueListNumber"
                    }
                  >
                    <strong>Queue No: </strong>
                    {customer.queueNumber}
                  </div>
                  <div>
                    <strong>Party Size: </strong>
                    {customer.partySize} pax
                  </div>
                  <div>
                    <strong>Joined: </strong>
                    {formatWaitTime(customer.joinedAt)}
                  </div>
                </motion.li>
              ))}
            </motion.ul>
          ) : (
            <p>The queue is currently empty.</p>
          )}

          <button className="join-queue-button" onClick={handleJoinClick}>
            Join Queue
          </button>
        </div>
      </div>
    </div>
  );
};

export default CustomerView;
