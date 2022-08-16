import React, { useEffect, useState } from "react";
import "./style.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBell,
  faBitcoinSign,
  faClipboard,
  faSearch,
  faTags,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import HeaderTop from "../Home/Header/HeaderTop";
import SideBar from "./SideBar";
import ManageOrder from "./ManageOrder";
import LogoImg from "../../assets/img/ic_logo.png";
import ManageAccount from "./ManageAccount";
import { useDispatch } from "react-redux";
import * as loginActionsCreator from "../Login/action";
import { useHistory } from "react-router-dom";
import { tokenHandle } from "../../common/helper";

const Manage = () => {
  const [selectedPage, setSelectedPage] = useState(0);
  const [isShow, setIsShow] = useState(false);
  const dispatch = useDispatch();
  const history = useHistory();
  useEffect(() => {
    tokenHandle(history, dispatch);
  }, []);
  const pages = [
    {
      name: "Quản lý tài khoản",
      icon: (
        <FontAwesomeIcon
          icon={faUser}
          className="order__user-option-item-icon"
          style={{ marginRight: "12px", color: "#0346ad" }}
        />
      ),
      component: <ManageOrder />,
    },
    {
      name: "Quản lý đơn hàng",
      icon: (
        <FontAwesomeIcon
          style={{ marginRight: "12px", color: "#105ab6" }}
          icon={faClipboard}
          className="order__user-option-item-icon"
        />
      ),
      component: <ManageAccount />,
    },
    {
      name: "Quản lý sản phẩm",
      icon: (
        <FontAwesomeIcon
          style={{ marginRight: "12px", color: "#f04e2a" }}
          icon={faTags}
          className="order__user-option-item-icon"
        />
      ),
      component: <ManageOrder />,
    },
    {
      name: "Quản lý mã giảm giá",
      icon: (
        <FontAwesomeIcon
          style={{ marginRight: "12px", color: "#f04d29" }}
          icon={faBell}
          className="order__user-option-item-icon"
        />
      ),
      component: <ManageAccount />,
    },
    {
      name: "Quản lý banner",
      icon: (
        <FontAwesomeIcon
          style={{ marginRight: "12px", color: "#eeaa09" }}
          icon={faBitcoinSign}
          className="order__user-option-item-icon"
        />
      ),
      component: <ManageOrder />,
    },
  ];

  const goToHome = () => {
    history.push("/home");
  };

  return (
    <div className="manage">
      <HeaderTop />
      <div className="cart__header">
        <div className="cart__header-content">
          <div className="cart__header-logo-wrapper">
            <p
              className="nav-a"
              onClick={() => {
                goToHome();
              }}
            >
              <img src={LogoImg} className="cart__header-content-img" />
            </p>

            <div className="fence-orange" />
            <p className="cart__header-content-title">Quản lý Shopee</p>
          </div>
          <div className="cart__search">
            <input
              type="text"
              placeholder="Tìm kiếm sản phẩm..."
              className="cart__search-input"
            />
            <div className="cart__search-btn">
              <FontAwesomeIcon
                icon={faSearch}
                className="cart__search-btn-icon"
              />
            </div>
          </div>
        </div>
      </div>
      <div className="manage__body">
        <div className="manage__body-left">
          <SideBar
            pages={pages}
            selectedPage={selectedPage}
            setSelectedPage={setSelectedPage}
          />
        </div>
        <div className="manage__body-right">
          {pages[selectedPage].component}
        </div>
      </div>
    </div>
  );
};

export default Manage;
