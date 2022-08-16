import React, { useState } from "react";
import "./style.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleLeft, faAngleRight } from "@fortawesome/free-solid-svg-icons";
import ReactOwlCarousel from "react-owl-carousel";
import Product1Img from "../../../assets/img/ic_product1.png";
import BlinkSaleImg from "../../../assets/img/ic_blink_sale.gif";
import LabelImg from "../../../assets/img/ic_product_label.png";
import { useQuery } from "@apollo/client";
import { query } from "../../../graphql/query";
import * as loginActionsCreator from "../../Login/action";
import { useDispatch, useSelector } from "react-redux";
import { VARIABLES } from "../../../graphql/variables";
import { useHistory } from "react-router-dom";
import { afterSale, formatMoney } from "../../../common/helper";
import LoadingStatic from "../../LoadingStatic";

const Product = () => {
  let products = [];
  const history = useHistory();
  const dispatch = useDispatch();
  const getProductListData = useQuery(query, {
    variables: VARIABLES.getProductList(),
  });
  if (getProductListData.loading) {
    // dispatch(loginActionsCreator.setLoading(true));
  } else {
    // dispatch(loginActionsCreator.setLoading(false));
    if (getProductListData?.data?.request?.data) {
      products =
        getProductListData?.data?.request.data[VARIABLES.getProductList().type];
    }
  }

  const goToProductInfo = (productId) => {
    history.push(`/product/${productId}`);
  };

  return (
    <div className="home__product">
      <p className="home__product__title">Gợi ý hôm nay</p>
      <div className="home__product__list">
        {!getProductListData.data && <LoadingStatic width={120} />}
        {products.map((product, index) => {
          return (
            <div
              className="home__product__item"
              key={index}
              onClick={() => {
                goToProductInfo(product.id);
              }}
            >
              {product.sale > 0 && (
                <img
                  src={BlinkSaleImg}
                  className="home__product__item-sale-icon"
                />
              )}
              <div className="home__product__item-bg">
                <div className="home__product__item-wrapper">
                  <div className="home__product__item-img-wrapper">
                    <img
                      src={product.splash}
                      className="home__product__item-img"
                    />
                    <img
                      src={LabelImg}
                      className="home__product__item-label-img"
                    />
                  </div>
                  <p className="home__product__item-name">{product.name}</p>
                  <p className="home__product__item-final-price">
                    {formatMoney(product.price)}
                  </p>
                  <div className="home__product__item-price-wrapper">
                    {product.sale > 0 && (
                      <p className="home__product__item-price">
                        {formatMoney(afterSale(product.price, product.sale))}
                      </p>
                    )}
                    <p className="home__product__item-sold">
                      Đã bán {product.sold}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Product;
