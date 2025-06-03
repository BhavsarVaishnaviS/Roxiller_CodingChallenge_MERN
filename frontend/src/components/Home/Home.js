import React from "react";
import { Link } from "react-router-dom";

function Home() {
let user = null;
try {
  user = JSON.parse(localStorage.getItem("user"));
} catch (error) {
  user = null;
}

  return (
    <div className="home-page">
      {/* Hero Section */}
      <div
        className="hero-section d-flex align-items-center"
        style={{ height: "90vh" }}
      >
        <div className="container">
          <div className="row align-items-center h-100">
            {/* Left side - Text */}
            <div className="col-md-5 text-dark">
              <h1 className="display-4 fw-bold">Discover the Best Stores</h1>
              <p className="lead">Rate and explore trusted stores near you</p>
              <Link to="/stores" className="btn btn-warning btn-lg mt-3">
                View Stores
              </Link>
            </div>

            {/* Right side - Image */}
            <div className="col-md-7">
              <img
                src={`${process.env.PUBLIC_URL}/image/hero-bg.jpg`}
                alt="Hero"
                className="img-fluid rounded shadow"
                style={{
                  maxHeight: "100vh",
                  objectFit: "cover",
                  width: "100%",
                }}
              />
            </div>
          </div>
        </div>
      </div>

      <div className="container my-5">
        <h2 className="text-center mb-4">How It Works</h2>
        <div className="row text-center">
          <div className="col-md-4">
            <img
              src={`${process.env.PUBLIC_URL}/image/search.png`}
              alt="Search"
              className="how-icon mb-1"
              style={{ width: "48px", height: "48px", marginBottom: "10px" }}
            />
            <h5>Find Stores</h5>
            <p>Search stores based on location or category.</p>
          </div>
          <div className="col-md-4">
            <img
              src={`${process.env.PUBLIC_URL}/image/rate.png`}
              alt="Rate"
              className="how-icon mb-1"
              style={{ width: "48px", height: "48px", marginBottom: "10px" }}
            />
            <h5>Rate Them</h5>
            <p>Leave honest feedback and rate your experience.</p>
          </div>
          <div className="col-md-4">
            <img
              src={`${process.env.PUBLIC_URL}/image/recommend.png`}
              alt="Recommend"
              className="how-icon mb-1"
              style={{ width: "48px", height: "48px", marginBottom: "10px" }}
            />
            <h5>Recommend</h5>
            <p>Help others discover great places.</p>
          </div>
        </div>
      </div>

      <div className="cta-section bg-dark text-white py-5 text-center">
        <h3 className="mb-3">Own a Store?</h3>
        <p>Register your store and get rated by real users.</p>
        {!user && (
          <Link to="/role" className="btn btn-outline-light btn-lg">
            Register Now
          </Link>
        )}
      </div>
    </div>
  );
}

export default Home;
