import React, { useEffect, useState } from "react";
import "./style.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSearch,
  faShippingFast,
  faUser,
  faClipboard,
  faBell,
  faTags,
  faBitcoinSign,
  faEdit,
  faWallet,
} from "@fortawesome/free-solid-svg-icons";
import LogoImg from "../../assets/img/ic_logo.png";
import QRImg from "../../assets/img/ic_qr.png";
import Product1Img from "../../assets/img/ic_product1.png";
import { Colors } from "../../common/style";
import HeaderTop from "../Home/Header/HeaderTop";
import { Link, Redirect, useHistory, useLocation } from "react-router-dom";
import {
  afterSale,
  formatMoney,
  LS,
  showToast,
  sortArrByAttr,
  timestampToDateTime,
  tokenHandle,
} from "../../common/helper";
import { LOCALSTORAGE, PATHNAME } from "../../common/constant";
import { useDispatch, useSelector } from "react-redux";
import { useLazyQuery, useQuery } from "@apollo/client";
import { query } from "../../graphql/query";
import { VARIABLES } from "../../graphql/variables";
import "./style.css";
import * as loginActionsCreator from "../Login/action";
import LoadingStatic from "../LoadingStatic";

const Order = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const userInfo = useSelector((state) => state.login.userInfo);
  const { name } = userInfo;
  const userId = userInfo.id;
  const getUserOrdersData = useQuery(query, {
    variables: VARIABLES.getUserOrders(userInfo.id),
  });
  const [orders, setOrders] = useState([]);
  useEffect(() => {
    tokenHandle(history, dispatch);
  }, []);
  useEffect(() => {
    if (getUserOrdersData.loading) {
    } else {
      if (getUserOrdersData?.data?.request?.data) {
        setOrders(
          getUserOrdersData.data.request.data[VARIABLES.getUserOrders().type]
        );
      }
      if (getUserOrdersData.error) {
        showToast("Đã có lỗi xảy ra khi lấy danh sách đơn hàng", "error");
      }
    }
  }, [getUserOrdersData]);

  const getOrderFinalPrice = (order) => {
    let sum = 0;
    for (let i = 0; i < order.products.length; i++) {
      sum += order.products[i].price * order.products[i].quantity;
    }
    return sum;
  };

  const goToHome = () => {
    history.push("/home");
  };

  return (
    <div className="cart">
      <div className="cart__top">
        <HeaderTop />
      </div>

      {/* Logo in cart */}
      <div className="cart__header">
        <div className="cart__header-content">
          <div className="cart__header-logo-wrapper">
            <div
              className="nav-a"
              onClick={() => {
                goToHome();
              }}
            >
              <img src={LogoImg} className="cart__header-content-img" />
            </div>

            <div className="fence-orange" />
            <p className="cart__header-content-title">Đơn hàng của bạn</p>
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

      {/* Content */}
      <div className="order__content">
        {/* Left content */}
        <div className="order__user">
          <div className="order__user-info">
            <div className="order__user-info-avatar">
              <img src={Product1Img} className="order__user-info-avatar-img" />
            </div>
            <div className="order__user-info-name">
              <p className="order__user-info-name-txt">Lương Minh Tiến</p>
              <p className="order__user-info-edit">
                <FontAwesomeIcon
                  icon={faEdit}
                  className="order__user-info-edit-icon"
                />
                Sửa hồ sơ
              </p>
            </div>
          </div>
          <div className="order__user-option">
            <div className="order__user-option-item">
              <FontAwesomeIcon
                icon={faUser}
                className="order__user-option-item-icon"
                style={{ color: "#0346ad" }}
              />
              <p src={Product1Img} className="order__user-option-item-txt">
                Tài khoản của tôi
              </p>
            </div>
            <div className="order__user-option-item">
              <FontAwesomeIcon
                style={{ color: "#105ab6" }}
                icon={faClipboard}
                className="order__user-option-item-icon"
              />
              <p src={Product1Img} className="order__user-option-item-txt">
                Đơn mua
              </p>
            </div>
            <div className="order__user-option-item">
              <FontAwesomeIcon
                style={{ color: "#f04d29" }}
                icon={faBell}
                className="order__user-option-item-icon"
              />
              <p src={Product1Img} className="order__user-option-item-txt">
                Thông báo
              </p>
            </div>
            <div className="order__user-option-item">
              <FontAwesomeIcon
                style={{ color: "#f04e2a" }}
                icon={faTags}
                className="order__user-option-item-icon"
              />
              <p src={Product1Img} className="order__user-option-item-txt">
                Kho voucher
              </p>
            </div>
            <div className="order__user-option-item">
              <FontAwesomeIcon
                style={{ color: "#eeaa09" }}
                icon={faBitcoinSign}
                className="order__user-option-item-icon"
              />
              <p src={Product1Img} className="order__user-option-item-txt">
                Shopee xu
              </p>
            </div>
          </div>
        </div>

        {/* Right content */}
        <div className="order__order-list">
          {!getUserOrdersData.data && <LoadingStatic />}
          {sortArrByAttr(orders, "date", -1).map((order, index) => {
            return (
              <div className="order__order-item" key={index}>
                <div className="order__order-top">
                  <FontAwesomeIcon
                    icon={faShippingFast}
                    className="order__order-truck"
                  />
                  {order.status == 2 && (
                    <p className="order__order-title">Giao thành công</p>
                  )}
                  {order.status == 1 && (
                    <p className="order__order-title">Chờ duyệt</p>
                  )}
                  <div className="order__top-fence" />
                  <p className="order__order-date">
                    {timestampToDateTime(order.date)}
                  </p>
                  <div className="order__top-fence" />
                  {order.status == 2 && (
                    <p className="order__order-status">Đã giao</p>
                  )}
                </div>

                {order.products.map((product, index) => (
                  <div className="order__order-product">
                    <img
                      src={product.image}
                      className="order__order-product-img"
                    />
                    <div className="order__order-product-info">
                      <p className="order__order-product-name">
                        {product.name}
                      </p>
                      <div className="order__order-product-name-price-other">
                        <p className="order__order-product-quantity">x1</p>
                        <div className="order__order-product-name-price-wrapper">
                          {/* <p className="cart__item-txt cart__item-origin">
                            {formatMoney(product.price)}
                          </p> */}
                          <p
                            className="cart__item-txt cart__item-price"
                            style={{ color: "#ee4d2d" }}
                          >
                            {formatMoney(product.price)}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}

                <div className="order__order-all-price">
                  <FontAwesomeIcon
                    icon={faWallet}
                    className="order__order-all-price-icon"
                  />
                  <p className="order__order-all-price-title">Tổng số tiền: </p>
                  <p className="order__order-all-price-number">
                    {formatMoney(getOrderFinalPrice(order))}{" "}
                  </p>
                </div>

                <div className="order__order-rate">
                  <div className="order__order-rate-left">
                    <p className="order__order-rate-date">
                      Đánh giá sản phẩm trước 12/08/2022
                    </p>
                    <p className="order__order-rate-suggest">
                      Đánh giá ngay và nhận 200 Xu
                    </p>
                  </div>
                  <div className="order__order-rate-right">
                    <div className="order__order-rate-btn">
                      <p>Đánh giá</p>
                    </div>
                    <div className="order__order-rate-btn">
                      <p>Liên hệ người bán</p>
                    </div>
                    <div className="order__order-rate-btn">
                      <p>Mua lại</p>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Order;
