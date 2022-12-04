import React from "react";
import "./style.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleLeft, faAngleRight } from "@fortawesome/free-solid-svg-icons";
import ReactOwlCarousel from "react-owl-carousel";
import Product1Img from "../../../assets/img/ic_product1.png";
import LabelImg from "../../../assets/img/ic_product_label.png";
import { useDispatch, useSelector } from "react-redux";
import { query } from "../../../graphql/query";
import { VARIABLES } from "../../../graphql/variables";
import * as loginActionsCreator from "../../Login/action";
import { useQuery } from "@apollo/client";
import { afterSale, formatMoney } from "../../../common/helper";
import { useHistory } from "react-router-dom";

const Cart = (props) => {
  // Variables
  const userId = useSelector((state) => state.login.userInfo.id);
  const dispatch = useDispatch();
  const history = useHistory();
  let carts = null;

  const getUserCartData = useQuery(query, {
    variables: VARIABLES.getUserCart(userId),
  });

  if (getUserCartData.loading) {
    dispatch(loginActionsCreator.setLoading(true));
  } else {
    dispatch(loginActionsCreator.setLoading(false));

    carts = getUserCartData?.data?.request?.data[VARIABLES.getUserCart().type];
    if (carts) props.setCartQuantity(carts.length);
  }

  // Function
  const goToProductInfo = (productId) => {
    history.push(`/product/${productId}`);
  };

  const goToCart = () => {
    history.push("/cart");
  };
  return (
    <div className="home__cart">
      <p className="home__cart__title">Sản phẩm mới thêm</p>
      <div className="home__cart__list">
        {carts &&
          carts.map((item, index) => (
            <div
              className="home__cart__item"
              key={index}
              onClick={() => {
                goToProductInfo(item.productId);
              }}
            >
              <img src={item.data.splash} className="home__cart__item-img" />
              <p className="home__cart__item-name">{item.data.name}</p>
              {item.data.sale > 0 && (
                <p className="home__cart__item-price home__cart__item-sale">
                  {formatMoney(afterSale(item.data.price, item.data.sale))}
                </p>
              )}
              <p className="home__cart__item-price">
                {formatMoney(item.data.price)}
              </p>
            </div>
          ))}
        {/* {Array.from(Array(15).keys()).map((number, index) => {
          return (
            <div className="home__cart__item" key={index}>
              <img src={carts[0].img} className="home__cart__item-img" />
              <p className="home__cart__item-name">{carts[0].name}</p>
              <p className="home__cart__item-price">đ{carts[0].price}</p>
            </div>
          );
        })} */}
      </div>
      <div
        onClick={() => {
          goToCart();
        }}
        className="home__cart__show-btn"
      >
        Xem giỏ hàng
      </div>
    </div>
  );
};

export default Cart;
