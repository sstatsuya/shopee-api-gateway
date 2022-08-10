import React, { useState } from "react";
import "./style.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faE,
  faEye,
  faEyeSlash,
  faBell,
  faQuestionCircle,
  faGlobe,
  faShoppingCart,
  faSearch,
  faReceipt,
} from "@fortawesome/free-solid-svg-icons";
import LogoImg from "../../../assets/img/ic_logo.png";
import QRImg from "../../../assets/img/ic_qr.png";
import FacebookImg from "../../../assets/img/ic_facebook.png";
import GoogleImg from "../../../assets/img/ic_google.png";
import AppleImg from "../../../assets/img/ic_apple.png";
import { Link, useHistory } from "react-router-dom";
import Cart from "../Cart";
import HeaderTop from "./HeaderTop";

const Header = () => {
  const [cartQuantity, setCartQuantity] = useState(0);
  const history = useHistory();
  const goToOrder = () => {
    history.push("/order");
  };

  return (
    <div className="header">
      {/* Top header */}
      <HeaderTop />

      {/* Search header */}
      <div className="header__center">
        <a className="header__logo" href="/home">
          <img src={LogoImg} className="logo-img" />
        </a>
        <div className="header__search">
          <div className="search-bg">
            <input
              type="text"
              className="input"
              placeholder="Tìm kiếm sản phẩm..."
            />
            <div className="search-btn">
              <FontAwesomeIcon icon={faSearch} className="icon-search" />
            </div>
          </div>
          <div className="suggest">
            <p className="suggest__txt">Dép</p>
            <p className="suggest__txt">Váy</p>
            <p className="suggest__txt">Quần, áo</p>
            <p className="suggest__txt">Dép</p>
            <p className="suggest__txt">Váy</p>
            <p className="suggest__txt">Quần, áo</p>
            <p className="suggest__txt">Dép</p>
            <p className="suggest__txt">Váy</p>
            <p className="suggest__txt">Quần, áo</p>
          </div>
        </div>
        <div className="header__cart">
          <FontAwesomeIcon
            icon={faShoppingCart}
            className="header__cart-icon"
          />
          <p className="header__cart-quantity">{cartQuantity}</p>
          <Cart setCartQuantity={setCartQuantity} />
        </div>
        <div
          className="header__order"
          onClick={() => {
            goToOrder();
          }}
        >
          <FontAwesomeIcon icon={faReceipt} className="header__cart-icon" />
          <p className="header__order-txt">Xem các đơn hàng của bạn</p>
        </div>
      </div>
    </div>
  );
};

export default Header;
