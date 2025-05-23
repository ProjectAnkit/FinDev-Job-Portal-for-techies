import React, { useState } from "react";
import { BiSearchAlt } from "react-icons/bi";
import { RxCross2 } from "react-icons/rx";
import { useSelector } from "react-redux";
import JobsCard from "./JobsCard";
import { motion } from "framer-motion";
import { FiTwitter } from "react-icons/fi";
import { GrLinkedin } from "react-icons/gr";
import { BsFacebook, BsGithub } from "react-icons/bs";
import styles from "../styles/Homepage.module.css";
import { useRouter } from "next/router";
import Cookies from "js-cookie";
import Image from 'next/image';

export default function Intro() {
  const [search, setSearch] = useState("");
  const jobData = useSelector((state) => state.Job.JobData);
  const [filterJobs, setFilteredJobs] = useState([]);
  const [doneSearch, setDoneSearch] = useState(false);
  const router = useRouter();

  const scrollToResults = () => {
    const resultsSection = document.getElementById("searchResults");
    if (resultsSection) {
      resultsSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();

    // Check if user is authenticated
    const token = Cookies.get("token");
    if (!token) {
      router.push("/auth/login");
      return;
    }

    const filteredJobs = jobData?.filter((job) => {
      let x = job?.title;
      return x?.toUpperCase() === search?.toUpperCase().trim();
    });
    setFilteredJobs(filteredJobs);
    setDoneSearch(true);
    // Scroll to results after search
    setTimeout(scrollToResults, 100);
  };

  const onTagClick = (tag) => {
    // Check if user is authenticated
    const token = Cookies.get("token");
    if (!token) {
      router.push("/auth/login");
      return;
    }

    setSearch(tag);
    const filteredJobs = jobData?.filter((job) => {
      let x = job?.title;
      return x?.toUpperCase() === tag.toUpperCase();
    });
    setFilteredJobs(filteredJobs);
    setDoneSearch(true);
    // Scroll to results after tag click
    setTimeout(scrollToResults, 100);
  };

  const clearSearch = () => {
    setSearch("");
    setFilteredJobs([]);
    setDoneSearch(false);
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSearch(e);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.mainContainer}>
        <div className={styles.leftSection}>
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className={styles.motionDiv}
          >
            <motion.h1
              initial={{ opacity: 0, y: -50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className={styles.title}
            >
              Find Your Perfect Job with{" "}
              <span className={styles.highlight}>FinDeV</span>
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className={styles.description}
            >
              Connecting thousands of job seekers with their dream careers
              daily.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.6 }}
              className={styles.searchContainer}
            >
              <div className={styles.inputContainer}>
                <BiSearchAlt className={styles.searchIcon} />
                <input
                  onChange={(e) => setSearch(e.target.value)}
                  onKeyPress={handleKeyPress}
                  value={search}
                  type="text"
                  placeholder="Search job titles (e.g., Software Engineer)"
                  className={styles.input}
                />
                {search && (
                  <RxCross2
                    onClick={clearSearch}
                    className={styles.clearIcon}
                  />
                )}
              </div>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleSearch}
                className={styles.searchButton}
              >
                Search
              </motion.button>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.8 }}
              className={styles.tagsContainer}
            >
              <span className={styles.tagsTitle}>Popular Tags:</span>
              {["MERN", "DevOps", "Backend", "Frontend"].map((tag) => (
                <motion.span
                  key={tag}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  className={styles.tag}
                  onClick={() => onTagClick(tag)}
                >
                  {tag}
                </motion.span>
              ))}
            </motion.div>
          </motion.div>
        </div>

        <div className={styles.rightSection}>
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <img
              src="/hero-image-2.png"
              alt="Hero Image"
              className={styles.heroImage}
            />
          </motion.div>
        </div>
      </div>

      {doneSearch && (
        <motion.div
          id="searchResults"
          // initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className={styles.resultsContainer}
        >
          <div className={styles.resultsInner}>
            <h2 className={styles.resultsTitle}>Search Results</h2>
            <motion.div
              className={styles.jobsGrid}
              initial="hidden"
              animate="show"
              variants={{
                hidden: { opacity: 0 },
                show: {
                  opacity: 1,
                  transition: {
                    staggerChildren: 0.1,
                  },
                },
              }}
            >
              {Array.isArray(filterJobs) && filterJobs.length > 0 ? (
                filterJobs.map((job, index) => (
                  <motion.div
                    key={job?._id}
                    variants={{
                      hidden: { opacity: 0, y: 20 },
                      show: {
                        opacity: 1,
                        y: 0,
                        transition: {
                          duration: 0.6,
                          ease: [0.4, 0, 0.2, 1],
                        },
                      },
                    }}
                    className={styles.jobCardWrapper}
                    style={{ "--animation-order": index }}
                  >
                    <JobsCard job={job} />
                  </motion.div>
                ))
              ) : (
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.2 }}
                  className={styles.noJobsMessage}
                >
                  Sorry, no jobs found in this category at the moment.
                </motion.p>
              )}
            </motion.div>
          </div>
        </motion.div>
      )}
      <footer className={styles.footer}>
        <div className={styles.footerContainer}>
          <div className={styles.footerSection}>
            <h3>FinDeV</h3>
          </div>

          <div className={styles.footerSection}>
            <h2>Quick Links</h2>
            <ul className={styles.quickLinks}>
              <li>
                <a href="#about">About Us</a>
              </li>
              <li>
                <a href="#services">Services</a>
              </li>
              <li>
                <a href="#contact">Contact</a>
              </li>
              <li>
                <a href="#faq">FAQ</a>
              </li>
            </ul>
          </div>

          <div className={styles.footerSection}>
            <h3>Connect with Us</h3>
            <div className={styles.socialLinks}>
              <a
                href="https://x.com/oxoankit"
                target="_blank"
                className={styles.iconLink}
              >
                <FiTwitter size={22} />
              </a>
              <a
                href="https://www.linkedin.com/in/ankit-thakur-069a92214?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app"
                target="_blank"
                className={styles.iconLink}
              >
                <GrLinkedin size={22} />
              </a>
              <a
                href="https://github.com/ProjectAnkit"
                target="_blank"
                className={styles.iconLink}
              >
                <BsGithub size={22} />
              </a>
            </div>
          </div>
        </div>

        <div className={styles.bottomFooter}>
          <p>&copy; {new Date().getFullYear()} FinDeV. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
