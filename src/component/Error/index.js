import React, { useEffect, useState } from "react";
import ColorCartImg from "../../assets/img/ic_color_cart.gif";
import ErrorImg from "../../assets/img/ic_error.png";
import ErrorBGImg from "../../assets/img/ic_error_bg.png";
import "./style.css";
import { useSelector } from "react-redux";
import { useLocation } from "react-router-dom";

const Error = () => {
  const location = useLocation();
  const message = location.data?.message || "Bạn đã gặp lỗi rồi";
  return (
    <div className="error">
      <div className="error__overlay"/>
      <div className="error__content">
        <div className="error__content-flex-1 row">
          <img src={ErrorImg} className="error__img" alt="error" />
        </div>
        <div className="error__content-info error__content-flex-1 column">
          <p className="error__content-title">Lỗi rồi</p>
          <p className="error__content-text">{message}</p>
          <a href="/home" className="error__content-home-btn">
            Trở về trang chủ
          </a>
        </div>
      </div>
    </div>
  );
};

export default Error;
