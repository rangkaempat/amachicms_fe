import React from "react";
import "./Hero.scss";
import homebg from "/src/assets/amachis-palagaram-bg.webp";
import {
  fadeInLeft,
  fadeInWithEase,
  staggerContainer,
} from "../../functions/motionUtils";
import { motion } from "framer-motion";

function Hero() {
  return (
    <>
      <div
        className="sectionBackground heroBackground"
        style={{ backgroundImage: `url(${homebg})` }}
      >
        <motion.div
          className="sectionContent"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={staggerContainer}
        >
          <motion.h1 variants={fadeInWithEase}>
            Amachi's
            <br />
            <span>
              <hr />
              PALAGARAM
              <hr />
            </span>
          </motion.h1>
          <motion.h2 variants={fadeInLeft}>
            Satisfying cravings & fostering relationships through food since the
            1970’s
          </motion.h2>
        </motion.div>
      </div>
    </>
  );
}

export default Hero;
