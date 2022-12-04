import React, { useEffect, useState } from "react";
import "./style.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDollar } from "@fortawesome/free-solid-svg-icons";
import LogoImg from "../../assets/img/ic_logo.png";
import { useHistory, useLocation } from "react-router-dom";
import { showToast } from "../../common/helper";
import { PATHNAME } from "../../common/constant";

const MySqlProfile = () => {
  const location = useLocation();
  const history = useHistory();
  if (!location.data) {
    history.push({
      pathname: PATHNAME.LOGIN,
      data: {
        isMySql: true,
      },
    });
    showToast("Bạn cần phải đăng nhập trước", "warning");
  }

  const goToLogin = (isMySql) => {
    history.push({
      pathname: "/login",
      data: {
        isMySql: isMySql,
      },
    });
  };
  const profile = location.data;
  return (
    <div className="my-sql-profile">
      <div className="profile__card_wrapper">
        <div className="profile__card__avatar-wrapper">
          <img
            className="profile__card__avatar-img"
            src={
              "https://ps.w.org/user-avatar-reloaded/assets/icon-256x256.png?rev=2540745"
            }
          />
          <p className="profile__card__name">{profile.name}</p>
          <p className="profile__card__username">
            {profile.username}@gmail.com
          </p>
        </div>
        <div className="profile__card__setting-wrapper">
          <p className="profile__card__setting__title">Profile Setting</p>
          <div className="profile__card__input-wrapper half">
            <p className="profile__card__input__label">User Id</p>
            <input
              type="text"
              className="profile__card__input"
              value={profile.id}
            />
          </div>
          <div className="profile__card__input-wrapper half">
            <p className="profile__card__input__label">Username</p>
            <input
              type="text"
              className="profile__card__input"
              value={profile.username}
            />
          </div>
          <div className="profile__card__input-wrapper">
            <p className="profile__card__input__label">Fullname</p>
            <input
              type="text"
              className="profile__card__input"
              value={profile.name}
            />
          </div>
          <div className="profile__card__input-wrapper">
            <p className="profile__card__input__label">Address</p>
            <input
              type="text"
              className="profile__card__input"
              value={profile.address}
            />
          </div>
          <div className="profile__card__input-wrapper">
            <p className="profile__card__input__label">Phone</p>
            <input
              type="text"
              className="profile__card__input"
              value={profile.phone}
            />
          </div>
          <div className="profile__card__input-wrapper">
            <p className="profile__card__input__label">Avatar</p>
            <input
              type="text"
              className="profile__card__input"
              value={profile.avatar}
            />
          </div>
          <div className="profile__card__input-wrapper">
            <p className="profile__card__input__label">Token</p>
            <input
              type="text"
              className="profile__card__input"
              value={profile.token}
            />
          </div>
          <div className="profile__card__input-wrapper">
            <p className="profile__card__input__label">Role</p>
            <input
              type="text"
              className="profile__card__input"
              value={profile.role}
            />
          </div>
        </div>
        <div className="profile__card__something-wrapper">
          <div className="profile__card-wallet">
            <div className="profile__card-wallet__icon-bg">
              <div className="profile__card-wallet__icon-color">
                <p className="profile__card-wallet__icon">$</p>
              </div>
            </div>
            <div className="profile__card-wallet-balance-wrapper">
              <p className="profile__card-wallet-balance-title">Số dư</p>
              <p className="profile__card-wallet-balance-number">
                1.500.000.000đ
              </p>
            </div>
          </div>
          <p className="profile__card__other">Lịch sử mua hàng</p>
          <p className="profile__card__other">Liên kết ngân hàng</p>
          <p className="profile__card__other">Cài đặt</p>
          <FontAwesomeIcon icon="fa-brands fa-square-facebook" />

          <div className="profile__card__social">
            <FontAwesomeIcon icon="fa-brands fa-square-facebook" />
          </div>
          <div className="flex1" />
          <div
            className="profile__card__login-btn"
            onClick={() => {
              goToLogin(true);
            }}
          >
            <p>Trở về</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MySqlProfile;
