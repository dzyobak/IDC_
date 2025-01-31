import React from "react";
import classes from "./FullScreenAlert.module.css";

const FullScreenAlert = ({ message, onClose }) => {
  return (
    <div className={classes.overlay}>
      <div className={classes.alert}>
        <h2>{message}</h2>
        <button onClick={onClose}>Close</button>
      </div>
    </div>
  );
};

export default FullScreenAlert;
