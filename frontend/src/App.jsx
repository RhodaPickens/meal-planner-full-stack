import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import React, { useState } from "react";
import Navbar from "./components/Navbar";
import Dashboard from "./pages/Dashboard";
import Meals from "./pages/Meals";
import TodaysPlan from "./pages/TodaysPlan";
import "./App.css";

function App() {
  const [isLoginOpen, setIsLoginOpen] = useState(false); // for login modal
  const [modalMode, setModalMode] = useState("login"); // login or signup

  return (
    <Router>
      <div className="wrapper">
        <Navbar setIsLoginOpen={setIsLoginOpen} />

        <main className="main-content">
          <Routes>
            <Route
              path="/"
              element={
                <div>
                  <Dashboard />
                </div>
              }
            />
            <Route
              path="/meals"
              element={
                <div>
                  <Meals />
                </div>
              }
            />
            <Route
              path="/todays-plan"
              element={
                <div>
                  <TodaysPlan />
                </div>
              }
            />
            <Route
              path="/recent-meals"
              element={
                <div>
                  <TodaysPlan />
                </div>
              }
            />
            <Route
              path="/most-used"
              element={
                <div>
                  <TodaysPlan />
                </div>
              }
            />
          </Routes>
        </main>

        {isLoginOpen && (
          <div className="modal-overlay">
            <div className="width-home">
              <div className="card p-4">
                <h3>{modalMode === "login" ? "Log In" : "Sign Up"}</h3>

                {modalMode === "login" ? (
                  /* --- Login View --- */
                  <>
                    <div className="form-group">
                      <label>Enter email:</label>
                      <input className="input-box" />
                    </div>
                    <div className="form-group">
                      <label>Enter password:</label>
                      <input className="input-box" />
                    </div>

                    <p>
                      Don't have an account?{" "}
                      <button
                        className="btn btn-link btn-login-text"
                        onClick={() => setModalMode("signup")}
                      >
                        Sign Up
                      </button>
                    </p>
                  </>
                ) : (
                  /* --- Sign Up View --- */
                  <>
                    <div className="form-group">
                      <label>Enter email:</label>
                      <input className="input-box" />
                    </div>
                    <div className="form-group">
                      <label>Create password:</label>
                      <input className="input-box" />
                    </div>
                    <div className="form-group">
                      <label>Confirm password:</label>
                      <input className="input-box" />
                    </div>
                    <p>
                      Already have an account?{" "}
                      <button
                        className="btn btn-link btn-login-text"
                        onClick={() => setModalMode("login")}
                      >
                        Log In
                      </button>
                    </p>
                  </>
                )}
                <button
                  className="btn btn-secondary mt-3"
                  onClick={() => setIsLoginOpen(false)}
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </Router>
  );
}

export default App;
