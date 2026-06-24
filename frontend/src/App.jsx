import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import React, { useState } from "react";
import Navbar from "./components/Navbar";
import Dashboard from "./pages/Dashboard";
import Meals from "./pages/Meals";
import TodaysPlan from "./pages/TodaysPlan";
import RecentMeals from "./pages/RecentMeals";
import MostUsedMeals from "./pages/MostUsedMeals";
import "./App.css";

function App() {
  const [isLoginOpen, setIsLoginOpen] = useState(false); // for login modal
  const [modalMode, setModalMode] = useState("login"); // login or signup
  const [confirmPassword, setConfirmPassword] = useState("");
  const [validationError, setValidationError] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleValidation = (e) => {
    e.preventDefault();
    setValidationError("");

    // check email
    if (!email.includes("@") || !email.includes(".")) {
      setValidationError("Please enter a valid email address");
      return;
    }
    // check password length
    if (password.length < 6 || password.length > 25) {
      setValidationError("Password must be between 6 and 25 characters");
      return;
    }
    // check passwords match
    if (modalMode === "signup" && password !== confirmPassword) {
      setValidationError("Passwords do not match");
      return;
    }

    setIsLoginOpen(false);
    setEmail("");
    setPassword("");
    setConfirmPassword("");
  };

  return (
    <Router>
      <div className="wrapper">
        <Navbar setIsLoginOpen={setIsLoginOpen} />

        <main className="main-content container">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/meals" element={<Meals />} />
            <Route path="/todays-plan" element={<TodaysPlan />} />
            <Route path="/recent-meals" element={<RecentMeals />} />
            <Route path="/most-used" element={<MostUsedMeals />} />
          </Routes>
        </main>

        {isLoginOpen && (
          <div className="modal-overlay">
            <div className="width-home">
              <form onSubmit={handleValidation} className="card p-4">
                <h3>{modalMode === "login" ? "Log In" : "Sign Up"}</h3>
                {validationError && (
                  <div className="alert alert-danger p-2 text-center">
                    {validationError}
                  </div>
                )}
                {modalMode === "login" ? (
                  /* --- Login View --- */
                  <>
                    <div className="form-group">
                      <label>Enter email:</label>
                      <input
                        className="input-box"
                        type="text"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                      />
                    </div>
                    <div className="form-group">
                      <label>Enter password:</label>
                      <input
                        className="input-box"
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                      />
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
                      <input
                        className="input-box"
                        type="text"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                      />
                    </div>
                    <div className="form-group">
                      <label>Create password:</label>
                      <input
                        className="input-box"
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                      />
                    </div>
                    <div className="form-group">
                      <label>Confirm password:</label>
                      <input
                        className="input-box"
                        type="password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        required
                      />
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
                <button type="submit" className="btn btn-green mt-3">
                  {modalMode === "login" ? "Sign In" : "Register"}
                </button>
                <button
                  className="btn btn-secondary mt-3"
                  onClick={() => {
                    setIsLoginOpen(false);
                    setValidationError("");
                  }}
                >
                  Close
                </button>
              </form>
            </div>
          </div>
        )}
      </div>
    </Router>
  );
}

export default App;
