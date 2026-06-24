import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import React, { useState, useEffect } from "react";
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
  const [usernameInput, setUsernameInput] = useState("");
  const [password, setPassword] = useState("");
  const [currentUser, setCurrentUser] = useState(null);

  const handleValidation = (e) => {
    e.preventDefault();
    setValidationError("");

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

    const endpoint = modalMode === "login" ? "/login" : "/register";

    fetch(`http://localhost:8080/api/auth${endpoint}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username: usernameInput, password: password }),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Invalid username or password");
        }
        return modalMode === "login" ? response.json() : response.text();
      })
      .then((data) => {
        if (modalMode === "login") {
          alert(`Welcome back ${data.username}`);
          setCurrentUser(data);
        } else {
          alert(data);
        }

        setIsLoginOpen(false);
        setUsernameInput("");
        setPassword("");
        setConfirmPassword("");
      })
      .catch((err) => {
        setValidationError(err.message);
      });
  };

  return (
    <Router>
      <div className="wrapper">
        <Navbar
          setIsLoginOpen={setIsLoginOpen}
          currentUser={currentUser}
          setCurrentUser={setCurrentUser}
        />

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
              <form
                onSubmit={handleValidation}
                className="card card-narrow p-4"
              >
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
                      <label>Enter username:</label>
                      <input
                        className="input-box"
                        type="text"
                        value={usernameInput}
                        onChange={(e) => setUsernameInput(e.target.value)}
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
                      <label>Enter username:</label>
                      <input
                        className="input-box"
                        type="text"
                        value={usernameInput}
                        onChange={(e) => setUsernameInput(e.target.value)}
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
