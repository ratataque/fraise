import React from "react";
import "./Footer.css";
import logo from "../../assets/logo.png";
import {
  FaMapMarkerAlt,
  FaPhoneAlt,
  FaFax,
  FaEnvelope,
  FaGlobe,
} from "react-icons/fa";

const Footer = () => {
  return (
    <section id="footer">
      <div className="container footer">
        <div className="footer-box">
          <h4>Useful Links</h4>
          <div className="footer-links">
            <a href="##">&bull; Support</a>
            <a href="##">&bull; About</a>
            <a href="##">&bull; Learn</a>
            <a href="##">&bull; Hosting</a>
            <a href="##">&bull; Messenger</a>
          </div>
        </div>
        <div className="footer-box">
          <h4>Support</h4>
          <div className="footer-links">
            <a href="##">&bull; Support</a>
            <a href="##">&bull; About</a>
            <a href="##">&bull; Learn</a>
            <a href="##">&bull; Hosting</a>
            <a href="##">&bull; Messenger</a>
          </div>
        </div>
        <div className="footer-box">
          <h4>Contact Us</h4>
          <div className="footer-contact u-text-small">
            <p>
              <FaMapMarkerAlt /> &nbsp; Adresse: France
            </p>
            <p>
              <FaPhoneAlt /> &nbsp; Phone: +0600000000
            </p>
            <p>
              <FaFax /> &nbsp; Fix: +3300000000
            </p>
            <p>
              <FaEnvelope /> &nbsp; Email: info@fraise.com
            </p>
            <p>
              <FaGlobe /> &nbsp; Site: www.fraise.com
            </p>
          </div>
        </div>
        <div className="footer-box">
          <img src={logo} alt="logo" />
          <p className="u-text-small">&copy; Copyright 2022. Fraise.com</p>
        </div>
      </div>
    </section>
  );
};

export default Footer;