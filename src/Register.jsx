import React, { useState } from "react";
import "./App.css";
import Weather from "./Weather";
export const Register = (props) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [name, setName] = useState("");
  const [registered, setRegistered] = useState(false);
  const [passwordMatch, setPasswordMatch] = useState(true);
  const [validPassword, setValidPassword] = useState(true);
  const [validName, setValidName] = useState(true);
  const handleSubmit = (e) => {
    e.preventDefault();

    // Check if the password and confirm password match
    if (password !== confirmPassword) {
      setPasswordMatch(false);
      return;
    }

    // Check if the password is at least 6 characters
    if (password.length < 6) {
      setValidPassword(false);
      return;
    }

    // Check if the name is at least 3 characters
    if (name.length < 3) {
      setValidName(false);
      return;
    }
    setRegistered(true);
  };
  return (
    <div className="container">
      {registered ? (
        <div>
          <Weather />
          {/* <h1>Signup Successful, {name}!</h1>
          <p>You are now registered.</p> */}
        </div>
      ) : (
        <div className="auth-form-container">
          <h2>Signup</h2>
          <form className="register-form" onSubmit={handleSubmit}>
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              type="text"
              placeholder="Full Name"
              id="name"
              name="name"
            />
            {!validName && (
              <p className="error-message">
                Name should be at least 3 characters
              </p>
            )}
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              type="email"
              placeholder="Email"
              id="email"
              name="email"
            />
            <input
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              type="password"
              placeholder="Password"
              id="password"
              name="password"
            />
            {!validPassword && (
              <p className="error-message">
                Password should be at least 6 characters
              </p>
            )}
            <input
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              type="password"
              placeholder="Confirm Password"
              id="confirm-password"
              name="confirm-password"
            />
            {!passwordMatch && (
              <p className="error-message">Passwords do not match</p>
            )}
            <br /> {/* Add a line break for spacing */}
            <button
              className="submit-button"
              // style={{ backgroundColor: isMouseOver ? "black" : "white" }}
              // onMouseOver={handleMouseOver}
              // onMouseOut={handleMouseOut}
              type="submit"
            >
              Signup
            </button>
          </form>
          <button
            className="link-btn"
            onClick={() => props.onFormSwitch("login")}
          >
            Already have an account? Login here.
          </button>
        </div>
      )}
    </div>
  );
};
