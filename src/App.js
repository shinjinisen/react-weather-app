import React, { useState } from "react";
import "./App.css";
import { Login } from "./Login";
import { Register } from "./Register";
import Coverpage from "./Coverpage"; 

function App() {
  const [currentForm, setCurrentForm] = useState("cover"); // Start with "cover"

  const toggleForm = (formName) => {
    setCurrentForm(formName);
  };

  return (
    <div className="App">
      {currentForm === "login" ? (
        <Login onFormSwitch={toggleForm} />
      ) : currentForm === "register" ? (
        <Register onFormSwitch={toggleForm} />
      ) : (
        <Coverpage onFormSwitch={toggleForm} /> // Render CoverPage initially
      )}
    </div>
  );
}

export default App;
