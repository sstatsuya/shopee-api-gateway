import React, { useEffect, useState } from "react";
import "./style.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import LogoImg from "../../assets/img/ic_logo.png";
import QRImg from "../../assets/img/ic_qr.png";
import FacebookImg from "../../assets/img/ic_facebook.png";
import GoogleImg from "../../assets/img/ic_google.png";
import AppleImg from "../../assets/img/ic_apple.png";
import { Colors } from "../../common/style";
import { useHistory, useLocation } from "react-router-dom";
import {
  clearAllToast,
  encryptAES256,
  hashMD5,
  showToast,
} from "../../common/helper";
import { useLazyQuery, useQuery } from "@apollo/client/react";
import { loginQuery, query } from "../../graphql/query";
import { useDispatch, useSelector } from "react-redux";
import * as Actions from "./action";
import { AES_KEY, PATHNAME } from "../../common/constant";
import { handleLS } from "../../localStorage/handleLS";
import { VARIABLES } from "../../graphql/variables";

const Login = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const history = useHistory();
  const [login, loginData] = useLazyQuery(query);
  const [username, setUsername] = useState("teo");
  const [password, setPassword] = useState("123");

  useEffect(() => {
    if (location.needLogin) {
      showToast("Bạn cần phải đăng nhập trước", "warning");
    }
  }, []);

  const checkQueryResponse = () => {
    if (!loginData.data.request?.data?.login) {
      showToast("Thông tin sai", "error");
    } else {
      clearAllToast();
      handleLS.setUserToken(
        JSON.stringify(
          loginData.data.request.data[VARIABLES.login().type].token
        )
      );
      dispatch(Actions.setUserInfo(loginData.data.request.data.login));
      showToast("Đăng nhập thành công", "success");
      history.push(PATHNAME.HOME);
    }
  };

  useEffect(() => {
    if (loginData.loading) {
      dispatch(Actions.setLoading(true));
    } else {
      dispatch(Actions.setLoading(false));
      if (loginData.data) {
        checkQueryResponse();
      }
      if (loginData.error) {
        alert("Loi roi: " + loginData.error);
      }
    }
  }, [loginData.loading]);

  // Function
  const handleLogin = (e) => {
    login({
      variables: VARIABLES.login(username, hashMD5(password)),
    });
  };
  const goToHome = () => {
    history.push("/")
  }

  return (
    <div className="login">
      <div className="login__header flex-row-center">
        <div className="login__header__center  flex-row-center">
          <div className="login__header-title flex-row-center">
            <img
              src={LogoImg}
              className="login__header-title-img"
              alt="logo"
              onClick={() => {
                goToHome();
              }}
            />
            <p className="login__header-title-text">Đăng nhập</p>
          </div>
          <a
            href="#"
            className="login__header-help"
            style={{ color: Colors.colorOrange }}
          >
            Bạn cần giúp đỡ?
          </a>
        </div>
      </div>
      <div
        className="body flex-row-center"
        style={{ backgroundColor: Colors.colorOrange }}
      >
        <div className="body-center">
          <div className="body__form">
            <div className="form__header">
              <p className="form__header__title">Đăng nhập</p>
              <div className="form__header__box">
                <p className="form__header__box_text">Đăng nhập với mã QR</p>
              </div>
              <img src={QRImg} className="form__header__qr" alt="qr" />
            </div>
            {/* Login Form */}
            <div className="form__login">
              <form
                className="form"
                onSubmit={(e) => {
                  e.preventDefault();
                }}
              >
                <div className="input-wrapper">
                  <input
                    type="text"
                    className="input"
                    placeholder="Email/Số điện thoại/Tên đăng nhập"
                    value={username}
                    onChange={(e) => {
                      setUsername(e.target.value);
                    }}
                  />
                </div>
                <div className="input-wrapper">
                  <input
                    type="password"
                    className="input"
                    placeholder="Mật khẩu"
                    value={password}
                    onChange={(e) => {
                      setPassword(e.target.value);
                    }}
                  />
                  <FontAwesomeIcon icon={faEyeSlash} className="icon-eye" />
                </div>
                <button
                  className="input-submit"
                  onClick={() => {
                    handleLogin();
                  }}
                >
                  Đăng nhập
                </button>
              </form>
            </div>
            {/* Forgot password */}
            <div className="option">
              <p className="option-btn">Quên mật khẩu</p>
              <p className="option-btn">Đăng nhập với SMS</p>
            </div>

            {/* Other login method */}
            <div className="other-method">
              <div className="other-btn">
                <img src={FacebookImg} className="other-icon" />
                <p className="other-txt">Facebook</p>
              </div>
              <div className="other-btn">
                <img src={GoogleImg} className="other-icon" />
                <p className="other-txt">Facebook</p>
              </div>
              <div className="other-btn">
                <img src={AppleImg} className="other-icon" />
                <p className="other-txt">Facebook</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
