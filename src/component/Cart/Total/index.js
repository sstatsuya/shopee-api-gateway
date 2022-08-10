import React, { useEffect, useState } from "react";
import "./style.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch, faShippingFast } from "@fortawesome/free-solid-svg-icons";
import { Link, Redirect, useHistory, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useLazyQuery, useQuery } from "@apollo/client";
import { afterSale, formatMoney } from "../../../common/helper";

const Total = ({
  cartProducts,
  isSelectAll,
  handleSetSelectAll,
  setShowDeleteModal,
  handleAddOrder,
}) => {
  const userInfo = useSelector((state) => state.login.userInfo);

  const getSelectedProduct = (arr) => {
    return arr.filter((item) => item.isSelect);
  };

  const handleDeleteSelected = (arr) => {
    setShowDeleteModal();
  };

  const getSelectedProductPrice = (arr) => {
    return arr.reduce((res, cur) => {
      if (cur.isSelect) {
        res += cur.price * cur.quantity;
      }
      return res;
    }, 0);
  };

  const handleBuy = () => {
    handleAddOrder();
  };

  return (
    <div className="total-wrapper">
      <input
        id="total__select-all"
        type={"checkbox"}
        className="total__check"
        checked={isSelectAll}
        onChange={() => {
          handleSetSelectAll();
        }}
      />
      <label htmlFor="total__select-all" className="total__select-all">
        Chọn tất cả {cartProducts.length}
      </label>
      <p
        className="total__remove-all"
        onClick={() => {
          handleDeleteSelected(cartProducts);
        }}
      >
        Xóa
      </p>
      <div className="flex-1" />
      <p className="total__money-title">
        Tổng thanh toán ({getSelectedProduct(cartProducts).length} sản phẩm)
      </p>
      <p className="total__money-number">
        {formatMoney(getSelectedProductPrice(cartProducts))}
      </p>
      <div
        className="total__buy-btn"
        onClick={() => {
          handleBuy();
        }}
      >
        <p>Mua hàng</p>
      </div>
    </div>
  );
};

export default Total;
