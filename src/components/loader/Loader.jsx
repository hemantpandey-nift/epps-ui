import React from "react";
import "./Loader.css";

const Loader = () => {
  return (
    <div className="loadingContainer">
      <div className="loading">
        <div style={{ "--index": "0" }}></div>
        <div style={{ "--index": "1" }}></div>
        <div style={{ "--index": "2" }}></div>
        <div style={{ "--index": "3" }}></div>
        <div style={{ "--index": "4" }}></div>
        <div style={{ "--index": "5" }}></div>
        <div style={{ "--index": "6" }}></div>
        <div style={{ "--index": "7" }}></div>
        <div style={{ "--index": "8" }}></div>
        <div style={{ "--index": "9" }}></div>
      </div>
      <div className="loadingText">Loading data...</div>
    </div>
  );
};

export default Loader;
