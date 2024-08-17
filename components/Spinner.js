import React from "react";
import Spinner from "react-bootstrap/Spinner";
// import "bootstrap/dist/css/bootstrap.min.css"; // Ensure Bootstrap CSS is imported

function CircleSpinner() {
  return (
    <div className="spinner-container">
      <Spinner
        animation="border"
        role="status"
        // variant="primary"
        style={{ width: "3rem", height: "3rem" }}
      >
        <span className="visually-hidden">Loading...</span>
      </Spinner>
    </div>
  );
}

export default CircleSpinner;
