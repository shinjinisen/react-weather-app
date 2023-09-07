import React, { useState } from "react";
import "./App.css";
import Weather from "./Weather";

export const Login = (props) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [loggedIn, setLoggedIn] = useState(false);
  const [validUsername, setValidUsername] = useState(true);
  const [validPassword, setValidPassword] = useState(true);

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validate username and password
    if (username.length >= 3 && password.length >= 6) {
      setLoggedIn(true);
    } else {
      setLoggedIn(false);
    }
  };
  const handleButtonClick = () => {
    // Redirect to the Weather component if logged in
    if (loggedIn) {
      props.onFormSwitch("weather");
    }
  };
  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
    // Validate username as the user types
    if (e.target.value.length >= 3) {
      setValidUsername(true);
    } else {
      setValidUsername(false);
    }
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
    // Validate password as the user types
    if (e.target.value.length >= 6) {
      setValidPassword(true);
    } else {
      setValidPassword(false);
    }
  };

  return (
    <div className="container">
      {loggedIn ? (
        <div>
          <Weather />
          {/* <h1>Welcome, {username}!</h1>
          <p>You are now logged in.</p> */}
        </div>
      ) : (
        <div className="auth-form-container">
          <h2>Login</h2>
          <form className="login-form" onSubmit={handleSubmit}>
            <input
              value={username}
              onChange={handleUsernameChange}
              type="text"
              placeholder="Username"
              id="username"
              name="username"
            />
            {!validUsername && (
              <p className="error-message">
                Username should be at least 3 characters
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
              onChange={handlePasswordChange}
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
            <br /> {/* Add a line break for spacing */}
            <br /> {/* Add another line break for spacing */}
            <button
              on
              Click={handleButtonClick}
              className="submit-button"
              type="submit"
            >
              Log In
            </button>
          </form>
          <button
            className="link-btn"
            onClick={() => props.onFormSwitch("register")}
          >
            Don't have an account? Signup here.
          </button>
        </div>
      )}
    </div>
  );
};
