import React, { useEffect, useState } from "react";
import "./style.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import QRImg from "../../../assets/img/ic_qr.png";

const SideBar = (props) => {
  return (
    <div className="sidebar">
      {props.pages.map((item, index) => (
        <div
          key={index}
          className={
            props.selectedPage === index
              ? "sidebar__btn active"
              : "sidebar__btn"
          }
          onClick={() => {
            props.setSelectedPage(index);
          }}
        >
          {item.icon}
          {item.name}
        </div>
      ))}
    </div>
  );
};

export default SideBar;
