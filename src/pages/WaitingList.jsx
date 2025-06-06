import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./WaitingList.scss";
import { fetchQueueUnseated, addToQueue } from "../api/queueAPI";
import { useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import { fadeInWithEase, staggerContainer } from "../functions/motionUtils";
import Hero from "../components/hero/Hero";
import Navbar from "../components/navbar/Navbar";

export default function CustomerView({ refreshTrigger }) {
  const location = useLocation();
  const [queue, setQueue] = useState([]);
  const id = location.state?.id;
  const queueNumber = queue.findIndex((customer) => customer.id === id) + 1;
  const success = location.state?.success;
  console.log(id);

  useEffect(() => {
    document.title = "Queue List | Amachi's Palagaram";
  }, []);

  const navigate = useNavigate();

  const formatWaitTime = (joinedAt) => {
    const joined = new Date(joinedAt);
    const now = new Date();
    const diff = Math.floor((now - joined) / 60000); // in minutes
    return `${diff} min ago`;
  };

  useEffect(() => {
    const fetchData = async () => {
      const data = await fetchQueueUnseated(); // Fetch queue data
      setQueue(data); // Set the queue state
    };

    fetchData(); // Initial fetch
    const interval = setInterval(fetchData, 10000); // Repeat every 10 seconds

    return () => clearInterval(interval); // Clean up
  }, [refreshTrigger]);

  const handleJoinClick = () => {
    navigate("/");
  };

  return (
    <div className="sectionContainer">
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

                <h5>
                  Hang tight — your turn is coming soon.
                  <br />
                  Please keep this page open to stay updated.
                </h5>
                <hr />
              </>
            ) : (
              <>
                <button className="join-queue-button" onClick={handleJoinClick}>
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
                </button>
              </>
            )}
          </div>

          {queue.length > 0 ? (
            <>
              <h3>Current Queue:</h3>
              <motion.ul
                className="queueList"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.2 }}
                variants={staggerContainer}
              >
                {queue.map((customer, index) => (
                  <motion.li key={customer.id} variants={fadeInWithEase}>
                    <div
                      className={
                        id === customer.id
                          ? "currentQueueListNumber queueListNumber"
                          : "queueListNumber"
                      }
                    >
                      <strong>Queue No: </strong>
                      {index + 1}
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
                      {customer.paxSize} pax
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
                      Joined: {formatWaitTime(customer.dateTimeCreated)}
                    </div>
                  </motion.li>
                ))}
              </motion.ul>
            </>
          ) : (
            <p>The queue is currently empty.</p>
          )}
        </div>
      </div>
    </div>
  );
}
