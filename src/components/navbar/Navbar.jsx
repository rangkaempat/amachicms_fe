import React, { useEffect, useState } from "react";
import "./Navbar.scss";
import { Outlet, Link } from "react-router";
import navLogo from "/src/assets/logo/amachis-palagaram-logo.webp";

import { motion, AnimatePresence } from "framer-motion";
import { popContainer, popItem } from "../../functions/motionUtils";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [showNavbar, setShowNavbar] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  // Navbar Modal Toggle
  const toggleMenu = () => {
    setIsOpen(!isOpen);
    document.body.style.overflow = isOpen ? "auto" : "hidden";
  };

  // Navbar Hide and Scroll
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      if (currentScrollY > lastScrollY && currentScrollY > 100) {
        setShowNavbar(false); // Hide on scroll down
      } else {
        setShowNavbar(true); // Show on scroll up
      }
      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  return (
    <>
      <motion.div
        className="navbarBackground"
        initial={{ y: 0 }}
        animate={{ y: showNavbar ? 0 : "-100%" }}
        transition={{ duration: 0.2, ease: "easeInOut" }}
      >
        <motion.div
          className="navbarContainer"
          variants={popContainer}
          initial="hidden"
          animate="visible"
        >
          {/* Navbar Logo */}
          <motion.div variants={popItem}>
            <Link
              to="/"
              onClick={() => {
                setIsOpen(false);
                document.body.style.overflow = "auto";
              }}
            >
              <img
                className="navbarLogo"
                src={navLogo}
                alt="Amachi's Palagaram Logo"
              />
            </Link>
          </motion.div>

          {/* NAV BUTTONS */}
          <motion.div
            className="navbarButtonContainer"
            variants={popContainer}
            initial="hidden"
            animate="visible"
          >
            {/* MENU BUTTON*/}
            <motion.button
              className="navButtonMenu"
              onClick={toggleMenu}
              variants={popItem}
            >
              <AnimatePresence mode="wait">
                {isOpen ? (
                  <div className="navbarIcon">
                    <motion.svg
                      key="close"
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      fill="#000000"
                      viewBox="0 0 256 256"
                      initial={{ opacity: 0, scale: 0.99 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.99 }}
                      transition={{ duration: 0.4 }}
                    >
                      <path d="M165.66,101.66,139.31,128l26.35,26.34a8,8,0,0,1-11.32,11.32L128,139.31l-26.34,26.35a8,8,0,0,1-11.32-11.32L116.69,128,90.34,101.66a8,8,0,0,1,11.32-11.32L128,116.69l26.34-26.35a8,8,0,0,1,11.32,11.32ZM232,128A104,104,0,1,1,128,24,104.11,104.11,0,0,1,232,128Zm-16,0a88,88,0,1,0-88,88A88.1,88.1,0,0,0,216,128Z"></path>
                    </motion.svg>
                  </div>
                ) : (
                  <div className="navbarIcon">
                    <motion.svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      fill="#000000"
                      viewBox="0 0 256 256"
                      initial={{ opacity: 0, scale: 0.99 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.99 }}
                      transition={{ duration: 0.4 }}
                    >
                      <path d="M224,128a8,8,0,0,1-8,8H40a8,8,0,0,1,0-16H216A8,8,0,0,1,224,128ZM40,72H216a8,8,0,0,0,0-16H40a8,8,0,0,0,0,16ZM216,184H40a8,8,0,0,0,0,16H216a8,8,0,0,0,0-16Z"></path>
                    </motion.svg>
                  </div>
                )}
              </AnimatePresence>
            </motion.button>
          </motion.div>
        </motion.div>
      </motion.div>

      {/* Modal for Nav Links */}
      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              key="nav2links"
              className="sectionLight navModalContainer"
              initial={{ y: "-100vh", opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: "-100vh", opacity: 0 }}
              transition={{ duration: 0.5, ease: "easeInOut" }}
            >
              <div className="navModalWrapper">
                <Link
                  className="navModalLink"
                  to="/admin-login"
                  onClick={toggleMenu}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="40"
                    height="40"
                    fill="none"
                    viewBox="0 0 256 256"
                  >
                    <path d="M208,80H176V56a48,48,0,0,0-96,0V80H48A16,16,0,0,0,32,96V208a16,16,0,0,0,16,16H208a16,16,0,0,0,16-16V96A16,16,0,0,0,208,80ZM96,56a32,32,0,0,1,64,0V80H96ZM208,208H48V96H208V208Zm-68-56a12,12,0,1,1-12-12A12,12,0,0,1,140,152Z"></path>
                  </svg>
                  Admin Login
                </Link>
                <hr />
                <a
                  className="navModalLink"
                  href="https://amachispalagaram.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={toggleMenu}
                >
                  Main Website
                </a>
                <hr />
                <div className="navModalSocialWrapper">
                  <Link
                    to="https://www.facebook.com/profile.php?id=100063510070947#"
                    className="navModalSocialLink"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="40"
                      height="40"
                      fill="none"
                      viewBox="0 0 256 256"
                    >
                      <path d="M128,24A104,104,0,1,0,232,128,104.11,104.11,0,0,0,128,24Zm8,191.63V152h24a8,8,0,0,0,0-16H136V112a16,16,0,0,1,16-16h16a8,8,0,0,0,0-16H152a32,32,0,0,0-32,32v24H96a8,8,0,0,0,0,16h24v63.63a88,88,0,1,1,16,0Z"></path>
                    </svg>
                  </Link>
                  <Link
                    to="https://www.instagram.com/amachis.palagaram/"
                    className="navModalSocialLink"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="40"
                      height="40"
                      fill="none"
                      viewBox="0 0 256 256"
                    >
                      <path d="M128,80a48,48,0,1,0,48,48A48.05,48.05,0,0,0,128,80Zm0,80a32,32,0,1,1,32-32A32,32,0,0,1,128,160ZM176,24H80A56.06,56.06,0,0,0,24,80v96a56.06,56.06,0,0,0,56,56h96a56.06,56.06,0,0,0,56-56V80A56.06,56.06,0,0,0,176,24Zm40,152a40,40,0,0,1-40,40H80a40,40,0,0,1-40-40V80A40,40,0,0,1,80,40h96a40,40,0,0,1,40,40ZM192,76a12,12,0,1,1-12-12A12,12,0,0,1,192,76Z"></path>
                    </svg>
                  </Link>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      <Outlet />
    </>
  );
}
