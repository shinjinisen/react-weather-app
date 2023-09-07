import React from "react";
import "./App.css";

export const Coverpage = (props) => {
  const handleLoginButtonClick = () => {
    props.onFormSwitch("login");
  };

  return (
    <div className="container">
      <h1 className="atmos">
        Atmos
        <p className="forecast">Forecasting your world, one Cloud at a time.</p>
      </h1>
      <br/>
      <br/>
      <button
        className="submit-button"
        // onMouseOver={handleMouseOver}
        // onMouseOut={handleMouseOut}
        // style={{ backgroundColor: isMouseOver ? "black" : "white" }}
        onClick={handleLoginButtonClick} 
      >
        Login
      </button>
    </div>
  );
};

export default Coverpage;
