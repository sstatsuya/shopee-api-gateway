import React, { useEffect, useState } from "react";
import LoadingSmoothImg from "../../assets/img/ic_loading_smooth.gif";
import "./style.css";
import { useSelector } from "react-redux";

const LoadingStatic = ({ width }) => {
  let loadingWidth = width + "px" || "120px";
  return (
    <div className="loading-static__container">
      <img
        src={LoadingSmoothImg}
        className="loading-static__img"
        style={{ width: loadingWidth }}
      />
    </div>
  );
};

export default LoadingStatic;
