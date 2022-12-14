import React, { useEffect, useState } from "react";
import "./style.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faStar,
  faShippingFast,
  faCartPlus,
  faHeart,
} from "@fortawesome/free-solid-svg-icons";
import FacebookImg from "../../assets/img/ic_facebook.png";
import PinterestImg from "../../assets/img/ic_pinterest.png";
import TwitterImg from "../../assets/img/ic_twitter.png";
import MessengerImg from "../../assets/img/ic_messenger.png";
import UserImg from "../../assets/img/ic_empty_user.png";
import Header from "../Home/Header";
import { useHistory } from "react-router-dom";
import { useLazyQuery, useQuery } from "@apollo/client";
import { query } from "../../graphql/query";
import { VARIABLES } from "../../graphql/variables";
import { useDispatch, useSelector } from "react-redux";
import * as loginActionsCreator from "../Login/action";
import {
  afterSale,
  formatMoney,
  reloadPage,
  showToast,
  timestampToDateTime,
} from "../../common/helper";
import LoadingStatic from "../LoadingStatic";

const Product = (props) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const productId = props.match.params.id;
  const userId = useSelector((state) => state.login.userInfo.id);
  let product = null;
  const [selectedImgId, setSelectedImgId] = useState(0);
  const [quantity, setQuantity] = useState(1);

  const getProductInfoData = useQuery(query, {
    variables: VARIABLES.getProductInfo(productId),
  });

  const [addUserProductCart, addUserProductCartData] = useLazyQuery(query);

  if (getProductInfoData.loading) {
  } else {
    if (getProductInfoData?.data?.request?.data)
      product =
        getProductInfoData.data.request.data[VARIABLES.getProductInfo().type];
  }

  useEffect(() => {
    if (addUserProductCartData.loading) {
      dispatch(loginActionsCreator.setLoading(true));
    } else {
      if (addUserProductCartData?.data?.request?.data) {
        dispatch(loginActionsCreator.setLoading(false));
        let isExist =
          addUserProductCartData.data.request.data[
            VARIABLES.addUserCartProduct().type
          ].data.isExist;
        if (isExist) {
          showToast("B???n ???? th??m s???n ph???m n??y v??o gi??? r???i", "info", 1000);
        } else {
          showToast("???? th??m s???n ph???m v??o gi??? h??ng", "success", 1000);
          reloadPage(history);
        }
      }
    }
  }, [addUserProductCartData.loading]);

  // Function
  const selectImg = (index) => {
    setSelectedImgId(index);
  };

  const handleAddToCart = (userId, productId) => {
    addUserProductCart({
      variables: VARIABLES.addUserCartProduct(userId, productId),
    });
  };

  return (
    <div className="product">
      <Header />
      {!product && (
        <div style={{ marginTop: "240px" }}>
          <LoadingStatic />
        </div>
      )}
      {product && (
        <>
          {/* Info */}
          <div className="product__info">
            <div className="product__info-img-wrapper">
              <div className="product__info-img-first">
                <img
                  src={product.images[selectedImgId]}
                  className="product__info-img"
                  alt="img"
                />
              </div>
              <div className="product__info-img-stack">
                {product.images.map((item, index) => (
                  <img
                    src={item}
                    className="product__info-img-stack-item"
                    key={index}
                    alt={item}
                    onMouseEnter={() => {
                      selectImg(index);
                    }}
                  />
                ))}
              </div>
            </div>
            <div className="product__info-wrapper">
              <p className="product__info-name">
                <p className="product__info-name-label">Y??u th??ch</p>
                {product.name}
              </p>
              <div className="product__info-param">
                <div className="product__info-param-section">
                  <p className="product__info-param-number product__info-rate-number">
                    {product.rate.toPrecision(2)}
                  </p>
                  {Array.from(Array(Math.floor(product.rate)).keys()).map(
                    (number, index) => {
                      return (
                        <FontAwesomeIcon
                          icon={faStar}
                          className="product__info-star"
                          key={index}
                        />
                      );
                    }
                  )}
                  {Array.from(Array(5 - Math.floor(product.rate)).keys()).map(
                    (number, index) => {
                      return (
                        <FontAwesomeIcon
                          icon={faStar}
                          className="product__info-star gray"
                          key={index}
                        />
                      );
                    }
                  )}
                </div>
                <div className="product__info-param-section">
                  <p className="product__info-param-number product__info-rating-number">
                    203
                  </p>
                  <p className="product__info-param-txt">????nh gi??</p>
                </div>
                <div className="product__info-param-section">
                  <p className="product__info-param-number product__info-sold-number">
                    {product.sold}
                  </p>
                  <p className="product__info-param-txt">???? b??n</p>
                </div>
              </div>
              <div className="product__info-param product__info-price-wrapper">
                <p className="product__info-origin">
                  {formatMoney(product.price)}
                </p>
                <p className="product__info-price">
                  {formatMoney(afterSale(product.price, product.sale))}
                </p>
                {product.sale > 0 && (
                  <p className="product__info-sale-label">
                    {product.sale}% gi???m
                  </p>
                )}
              </div>
              <div className="product__info-param-second product__info-ship-wrapper">
                <p className="product__info-param-second-title product__info-ship-title">
                  V???n chuy???n
                </p>
                <div className="product__info-param-second-content">
                  <p className="product__info-ship-content-txt">
                    <FontAwesomeIcon
                      icon={faShippingFast}
                      className="product__info-ship-content-icon"
                    />
                    Mi???n ph?? v???n chuy???n
                  </p>
                  <p className="product__info-ship-content-txt">
                    <FontAwesomeIcon
                      icon={faShippingFast}
                      className="product__info-ship-content-icon"
                    />
                    V???n chuy???n t???i
                  </p>
                </div>
              </div>
              <div className="product__info-param-second product__info-ship-wrapper">
                <p className="product__info-param-second-title product__info-ship-title">
                  S??? l?????ng
                </p>
                <div className="product__info-param-second-content product__info-quantity-wrapper">
                  <p
                    className="product__info-param-quantity-btn"
                    onClick={() => {
                      setQuantity(() => {
                        return quantity > 1 ? quantity - 1 : quantity;
                      });
                    }}
                  >
                    -
                  </p>
                  <input
                    type="number"
                    className="product__info-param-quantity-number"
                    value={quantity}
                    onChange={(e) => {
                      setQuantity(e.target.input);
                    }}
                  />
                  <p
                    className="product__info-param-quantity-btn"
                    onClick={() => {
                      setQuantity(quantity + 1);
                    }}
                  >
                    +
                  </p>
                  <p className="product__info-stock-number">
                    1255 s???n ph???m c?? s???n
                  </p>
                </div>
              </div>

              <div className="product__info-param-second">
                <div
                  className="product__info-add-btn"
                  onClick={() => {
                    handleAddToCart(userId, product.id);
                  }}
                >
                  <FontAwesomeIcon
                    icon={faCartPlus}
                    className="product__info-add-icon"
                  />
                  <p className="product__info-add-txt">Th??m v??o gi??? h??ng</p>
                </div>
                <div className="product__info-add-btn product__info-buy-btn">
                  <p className="product__info-buy-txt">Mua ngay</p>
                </div>
              </div>

              <div className="product__info-interaction">
                <div className="product__info-share">
                  <p className="product__info-interaction-txt">Chia s???: </p>
                  <img
                    src={MessengerImg}
                    className="product__info-share-icon"
                    alt="img"
                  />
                  <img
                    src={FacebookImg}
                    className="product__info-share-icon"
                    alt="img"
                  />
                  <img
                    src={PinterestImg}
                    className="product__info-share-icon"
                    alt="img"
                  />
                  <img
                    src={TwitterImg}
                    className="product__info-share-icon"
                    alt="img"
                  />
                </div>
                <div className="product__info-love">
                  <FontAwesomeIcon
                    icon={faHeart}
                    className="product__info-love-icon"
                  />
                  <p className="product__info-interaction-txt">
                    ???? th??ch (167)
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Description */}
          <div className="product__desc">
            <p className="product__desc-title">Chi ti???t s???n ph???m</p>
            <div className="product__desc-section">
              <p className="product__desc-section-title">Danh m???c</p>
              <p className="product__desc-section-content">
                {product.type.join(", ")}
              </p>
            </div>
            <div className="product__desc-section">
              <p className="product__desc-section-title">Xu???t x???</p>
              <p className="product__desc-section-content">Vi???t Nam</p>
            </div>
            <div className="product__desc-section">
              <p className="product__desc-section-title">Chi???u d??i tay ??o</p>
              <p className="product__desc-section-content">D??i 3/4</p>
            </div>
            <p className="product__desc-title">M?? t??? s???n ph???m</p>
            {product.type.map((item, index) => (
              <p className="product__desc-txt" key={index}>
                {item}
              </p>
            ))}
            <p className="product__desc-title">B??nh lu???n</p>
            {product.comments.map((item, index) => (
              <div className="product__desc-comment" key={index}>
                <div className="product__desc-comment-wrapper">
                  <div className="product__desc-comment-avatar-wrapper">
                    <img
                      className="product__desc-comment-avatar"
                      src={UserImg}
                    />
                  </div>
                  <div className="product__desc-comment-content-wrapper">
                    <p>Ng?????i d??ng ???n danh</p>
                    <p>{timestampToDateTime(item.time)}</p>
                    <p>{item.content}</p>
                  </div>
                </div>
                <div className="product__desc-comment-line" />
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default Product;
