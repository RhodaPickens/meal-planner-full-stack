import React, { useState } from "react";
import { Link } from "react-router-dom";

export default function Navbar({
  setIsLoginOpen,
  currentUser,
  setCurrentUser,
}) {
  const [isNavExpanded, setIsNavExpanded] = useState(false);

  return (
    <nav className="navbar navbar-expand-lg bg-body-tertiary px-4">
      <div className="container-fluid">
        <button
          className="navbar-toggler"
          type="button"
          aria-label="Toggle navigation"
          onClick={() => setIsNavExpanded(!isNavExpanded)}
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div
          className={`collapse navbar-collapse ${isNavExpanded ? "show" : ""}`}
          id="navbarText"
        >
          <img
            className="d-none d-lg-inline-block"
            src="/favicon.png"
            alt="Avocado Logo"
            id="logo-image"
          />
          <ul
            className="navbar-nav me-auto mb-2 mb-lg-0 gap-3 ps-lg-2"
            onClick={() => setIsNavExpanded(false)}
          >
            <li className="nav-item">
              <Link className="nav-link" to="/">
                Dashboard
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/meals">
                Meals
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/todays-plan">
                Today's Plan
              </Link>
            </li>
          </ul>
          <div className="d-flex align-items-center gap-3 pt-2 pt-lg-0pt-2 pt-lg-0">
            {currentUser ? (
              <>
                <span>Hello, {currentUser.username}!</span>
                <button
                  className="btn button-white rounded-pill text-dark"
                  onClick={() => {
                    setCurrentUser(null);
                    setIsNavExpanded(false);
                  }}
                >
                  Sign Out
                </button>
              </>
            ) : (
              <button
                className="btn btn-outline-dark rounded-pill px-3"
                onClick={() => {
                  setIsLoginOpen(true);
                  setIsNavExpanded(false);
                }}
              >
                Log In / Sign Up
              </button>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
