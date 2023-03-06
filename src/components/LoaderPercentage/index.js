import React from "react";
import { buildStyles, CircularProgressbar } from "react-circular-progressbar";
import "./style.css";

export const LoaderPercentage = ({ percentage, total, invites }) => {
  return (
    <div className="loader-container common-column">
      <CircularProgressbar
        value={percentage}
        text={`${percentage}%`}
        styles={buildStyles({
          pathTransitionDuration: 0.15
        })}
        className="spinner-percentage"
      />
      <h3 className="mt-[20px] text-white_A700">Take a deep breath while your employees are being fetch from keka.</h3>
      <h3 className="mt-[20px] text-white_A700">{invites} / {total} invited!</h3>
      {/* <div className="spinner"></div> */}
    </div>
  );
};
