import React, { useEffect, useRef, useState } from "react";
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
} from "@fortawesome/free-solid-svg-icons";
import GoogleImg from "../../../../assets/img/ic_google.png";
import BellGif from "../../../../assets/img/ic_bell2.gif";
import AppleImg from "../../../../assets/img/ic_apple.png";
import { useDispatch, useSelector } from "react-redux";
import { useLazyQuery } from "@apollo/client";
import { query } from "../../../../graphql/query";
import * as LoginAction from "../../../Login/action";
import { showToast } from "../../../../common/helper";
import { handleLS } from "../../../../localStorage/handleLS";
import { VARIABLES } from "../../../../graphql/variables";
import { useHistory } from "react-router-dom";
import Notification from "../../Notification";

const HeaderTop = () => {
  const notificationRef = useRef();
  const [notificationQuantity, setNotificationQuantity] = useState(0);
  useEffect(() => {
    setTimeout(() => {
      if (notificationRef.current)
        notificationRef.current.classList.toggle("none", false);
    }, 2000);

    setTimeout(() => {
      if (notificationRef.current)
        notificationRef.current.classList.toggle("none", true);
    }, 5000);
  }, []);
  const dispatch = useDispatch();
  const history = useHistory();
  const fullName = useSelector((state) => state.login.userInfo.name);
  useEffect(() => {
    if (!fullName) {
      const currentToken = handleLS.getUserToken();
      if (currentToken) {
        getUserInfo({
          variables: VARIABLES.getUserInfo(currentToken),
        });
      }
    }
  }, []);

  const [getUserInfo, userInfoData] = useLazyQuery(query);
  useEffect(() => {
    if (userInfoData.loading) {
      dispatch(LoginAction.setLoading(true));
    } else {
      dispatch(LoginAction.setLoading(false));
      if (userInfoData?.data?.request?.data?.getUserInfo) {
        dispatch(
          LoginAction.setUserInfo(userInfoData.data.request.data.getUserInfo)
        );
      }
      if (userInfoData.error) {
        showToast("Lỗi: " + userInfoData.error, "error");
      }
    }
  }, [userInfoData.loading]);

  // Function
  const handleLogout = () => {
    // dispatch(LoginAction.logout());
    handleLS.removeAll();
    showToast("Đăng xuất thành công", "success");
    history.push("/login");
  };

  return (
    <div className="header__top">
      <div className="top__left">
        <p className="top__left-btn">Kênh người bán</p>
        <div className="fence" />
        <p className="top__left-btn">Trở thành người bán Shopee</p>
        <div className="fence" />
        <p className="top__left-btn">Tải ứng dụng</p>
        <div className="fence" />
        <p className="top__left-btn">Kết nối</p>
        <img src={AppleImg} className="header__icon ml4" />
        <img src={GoogleImg} className="header__icon ml4" />
      </div>
      <div className="top__right">
        <div className="top__right-btn top__notification-btn">
          <FontAwesomeIcon icon={faBell} className="header__icon" />
          <p className="top__right-btn-txt">Thông báo</p>
          <Notification setNotificationQuantity={setNotificationQuantity} />
          {notificationQuantity > 0 && (
            <div
              className="top__notification-suggest none"
              ref={notificationRef}
            >
              <img src={BellGif} className="bell-gif" />
              <p>Có {notificationQuantity} thông báo mới</p>
            </div>
          )}
        </div>
        <div className="top__right-btn">
          <FontAwesomeIcon icon={faQuestionCircle} className="header__icon" />
          <p className="top__right-btn-txt">Hỗ trợ</p>
        </div>
        <div className="top__right-btn">
          <FontAwesomeIcon icon={faGlobe} className="header__icon" />
          <p className="top__right-btn-txt">Tiếng Việt</p>
        </div>
        {!fullName && (
          <>
            <a className="top__right-btn" href="/login">
              Đăng nhập
            </a>
            <div className="fence nomargin" />
            <p className="top__right-btn">Đăng ký</p>
          </>
        )}
        {fullName && (
          <>
            <p className="top__right-btn-txt" style={{ marginLeft: "24px" }}>
              {"Xin chào " + fullName}
            </p>
            <p
              className="logout_btn"
              onClick={() => {
                handleLogout();
              }}
            >
              Đăng xuất
            </p>
          </>
        )}
      </div>
    </div>
  );
};

export default HeaderTop;
