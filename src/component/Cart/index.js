import React, { useEffect, useState } from "react";
import "./style.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch, faShippingFast } from "@fortawesome/free-solid-svg-icons";
import LogoImg from "../../assets/img/ic_logo.png";
import QRImg from "../../assets/img/ic_qr.png";
import Product1Img from "../../assets/img/ic_product1.png";
import { Colors } from "../../common/style";
import HeaderTop from "../Home/Header/HeaderTop";
import { Link, Redirect, useHistory, useLocation } from "react-router-dom";
import {
  afterSale,
  formatMoney,
  handleRedirectError,
  LS,
  showToast,
  tokenHandle,
} from "../../common/helper";
import { LOCALSTORAGE, PATHNAME } from "../../common/constant";
import { useDispatch, useSelector } from "react-redux";
import { useLazyQuery, useQuery } from "@apollo/client";
import { query } from "../../graphql/query";
import { VARIABLES } from "../../graphql/variables";
import * as loginActionsCreator from "../Login/action";
import * as cartActionsCreator from "./action";
import Total from "./Total";
import Modal from "../Modal";
import AddOrder from "../AddOrder";
import LoadingStatic from "../LoadingStatic";

const Cart = () => {
  const userInfo = useSelector((state) => state.login.userInfo);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showAddOrderModal, setShowAddOrderModal] = useState(false);
  const pathname = useLocation().pathname;
  const dispatch = useDispatch();
  const history = useHistory();
  const userId = useSelector((state) => state.login.userInfo.id);
  let [quantities, setQuantities] = useState([]);
  useEffect(() => {
    tokenHandle(history, dispatch);
  }, []);

  const [carts, setCarts] = useState([]);

  const getUserCartData = useQuery(query, {
    variables: VARIABLES.getUserCart(userId),
  });

  useEffect(() => {
    if (getUserCartData.loading) {
      // dispatch(loginActionsCreator.setLoading(true));
    } else {
      // dispatch(loginActionsCreator.setLoading(false));
      // handleRedirectError(getUserCartData, history);
      if (getUserCartData?.data?.request?.data) {
        setCarts(
          getUserCartData.data.request.data[VARIABLES.getUserCart().type]
        );
        if (getUserCartData.data.request.data[VARIABLES.getUserCart().type]) {
          let temp = [];
          let tempCarts = [
            ...getUserCartData.data.request.data[VARIABLES.getUserCart().type],
          ];
          for (let i = 0; i < tempCarts.length; i++) {
            temp.push({
              id: tempCarts[i].id,
              productId: tempCarts[i].productId,
              name: tempCarts[i].data.name,
              quantity: 1,
              price: afterSale(tempCarts[i].data.price, tempCarts[i].data.sale),
              isSelect: false,
              image: tempCarts[i].data.splash,
            });
          }
          setQuantities(temp);
        }
      }
    }
  }, [getUserCartData.loading]);

  // Xóa một sản phẩm
  const [deleteUserCartProduct, deleteUserCartProductData] =
    useLazyQuery(query);

  useEffect(() => {
    if (deleteUserCartProductData.loading) {
      // dispatch(loginActionsCreator.setLoading(true));
    } else {
      // dispatch(loginActionsCreator.setLoading(false));
      if (deleteUserCartProductData?.data?.request?.data) {
        let isSuccess =
          deleteUserCartProductData.data.request.data[
            VARIABLES.deleteUserCartProduct().type
          ].data.isSuccess;
        if (isSuccess) {
          history.go(0);
        }
      }
    }
  }, [deleteUserCartProductData.loading]);

  // Xóa nhiều sản phẩm
  const [deleteUserCartProductList, deleteUserCartProductListData] =
    useLazyQuery(query);

  useEffect(() => {
    if (deleteUserCartProductListData.loading) {
      // dispatch(loginActionsCreator.setLoading(true));
    } else {
      // dispatch(loginActionsCreator.setLoading(false));
      if (deleteUserCartProductListData?.data?.request?.data) {
        let isSuccess =
          deleteUserCartProductListData.data.request.data[
            VARIABLES.deleteUserCartProductList().type
          ].data.isSuccess;
        if (isSuccess) {
          history.go(0);
        }
      }
    }
  }, [deleteUserCartProductListData.loading]);

  // Tạo đơn đặt hàng mới
  const [addOrder, addOrderData] = useLazyQuery(query);
  useEffect(() => {
    if (addOrderData.loading) {
      // dispatch(loginActionsCreator.setLoading(true));
    } else {
      // dispatch(loginActionsCreator.setLoading(false));
      if (addOrderData.data) {
        history.push("/order");
        showToast("Đặt hàng thành công", "success");
      }
    }
  }, [addOrderData.loading]);

  const isSelectAll = useSelector((state) => state.cart.isSelectAll);

  useEffect(() => {
    let temp = [...quantities];
    if (isSelectAll) {
      for (let i = 0; i < temp.length; i++) temp[i].isSelect = true;
    } else {
      for (let i = 0; i < temp.length; i++) temp[i].isSelect = false;
    }
    setQuantities(temp);
  }, [isSelectAll]);

  // Function
  const handleSetQuantity = (index, mode = 1) => {
    let temp = [...quantities];
    if (mode === 1) {
      temp[index].quantity += 1;
      setQuantities(temp);
    } else {
      if (temp[index].quantity > 1) {
        temp[index].quantity -= 1;
        setQuantities(temp);
      }
    }
  };

  const handleSelectProduct = (index) => {
    let temp = [...quantities];
    temp[index].isSelect = !temp[index].isSelect;
    setQuantities(temp);
  };

  const handleDeleteCartProduct = (itemId) => {
    deleteUserCartProduct({
      variables: VARIABLES.deleteUserCartProduct(itemId),
    });
  };

  const handleAddOrder = () => {
    setShowAddOrderModal(true);
  };

  const handleAcceptAddOrder = () => {
    addOrder({
      variables: VARIABLES.addOrder(userInfo, getSelectedProduct(quantities)),
    });
  };

  const getSelectedProduct = (arr) => {
    return arr.filter((item) => item.isSelect);
  };

  const handleSetSelectAll = () => {
    dispatch(cartActionsCreator.changeSelectAll());
  };

  const handleAcceptDeleteUserCartProductList = () => {
    const temp = quantities.reduce((res, cur) => {
      if (cur.isSelect) {
        res.push(cur.id);
      }
      return res;
    }, []);
    deleteUserCartProductList({
      variables: VARIABLES.deleteUserCartProductList(temp),
    });
  };

  const goToHome = () => {
    history.push("/home");
  };
  // alert(getSelectedProduct(quantities).length + " " + showAddOrderModal);
  return (
    <div className="cart">
      {showAddOrderModal && getSelectedProduct(quantities).length < 1 && (
        <Modal
          title="Thông báo"
          content="Bạn chưa chọn sản phẩm nào"
          isShowCancel={false}
          onAccept={() => {
            setShowAddOrderModal(false);
          }}
        />
      )}
      {showAddOrderModal && getSelectedProduct(quantities).length > 0 && (
        <AddOrder
          title="Thông báo"
          onAccept={() => {
            handleAcceptAddOrder();
            setShowAddOrderModal(false);
          }}
          onCancel={() => {
            setShowAddOrderModal(false);
          }}
        />
      )}
      {showDeleteModal && (
        <Modal
          title="Thông báo"
          content={
            getSelectedProduct(quantities).length > 0
              ? `Bạn có muốn xóa ${
                  getSelectedProduct(quantities).length
                } sản phẩm đã chọn ra khỏi giỏ hàng?`
              : "Chưa có sản phẩm nào được chọn"
          }
          onAccept={
            getSelectedProduct(quantities).length > 0
              ? () => {
                  setShowDeleteModal(false);
                  handleAcceptDeleteUserCartProductList();
                }
              : () => {
                  setShowDeleteModal(false);
                }
          }
          onCancel={() => {
            setShowDeleteModal(false);
          }}
          isShowCancel={
            getSelectedProduct(quantities).length > 0 ? true : false
          }
        />
      )}
      <Total
        cartProducts={quantities}
        isSelectAll={isSelectAll}
        handleSetSelectAll={handleSetSelectAll}
        setShowDeleteModal={() => {
          setShowDeleteModal(true);
        }}
        handleAddOrder={handleAddOrder}
      />
      <HeaderTop />

      {/* Logo in cart */}
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
            <p className="cart__header-content-title">Giỏ hàng</p>
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

      {/* Content cart */}
      <div className="cart__content">
        {/* Suggest */}
        <div className="cart__content-suggest cart__content-section">
          <FontAwesomeIcon
            icon={faShippingFast}
            className="cart__content-suggest-icon"
          />
          <p className="cart__content-suggest-txt">
            Nhấn vào mục Mã giảm giá ở cuối trang để hưởng miễn phí vận chuyển
            bạn nhé!
          </p>
        </div>

        {/* Title */}
        <div className="cart__content-title cart__content-section">
          <div className="cart__content-title-section">
            <input
              type="checkbox"
              className="cart__content-title-left-checkbox"
              checked={isSelectAll}
              onChange={() => {
                handleSetSelectAll();
              }}
            />
            <p className="cart__content-title-text">Sản phẩm</p>
          </div>
          <div className="cart__content-title-section">
            <p className="cart__content-title-text">Đơn giá</p>
            <p className="cart__content-title-text">Số lượng</p>
            <p className="cart__content-title-text">Thành tiền</p>
            <p className="cart__content-title-text">Thao tác</p>
          </div>
        </div>

        {/* Cart Items */}
        {!getUserCartData.data && <LoadingStatic />}
        {carts &&
          carts.map((item, index) => {
            return (
              <div
                className="cart__content-item-wrapper cart__content-section"
                key={index}
              >
                <div className="cart__content-item-section">
                  <input
                    type="checkbox"
                    className="cart__content-title-left-checkbox"
                    checked={quantities[index].isSelect}
                    onChange={() => {
                      handleSelectProduct(index);
                    }}
                  />
                  <img src={item.data.splash} className="cart__item-img" />
                  <p className="cart__item-name">{item.data.name}</p>
                </div>
                <div className="cart__content-item-section">
                  <div className="cart__content-item-section-child">
                    {item.data.sale > 0 && (
                      <p className="cart__item-txt cart__item-origin">
                        {formatMoney(item.data.price)}{" "}
                      </p>
                    )}
                    <p className="cart__item-txt cart__item-price">
                      {formatMoney(afterSale(item.data.price, item.data.sale))}
                    </p>
                  </div>
                  <div className="cart__content-item-section-child">
                    <div className="cart__item-quantity-wrapper">
                      <div
                        className="cart__item-quantity-btn"
                        onClick={() => {
                          handleSetQuantity(index, -1);
                        }}
                      >
                        -
                      </div>
                      <input
                        type="number"
                        className="cart__item-quantity-txt"
                        value={quantities[index].quantity}
                        onChange={() => {}}
                      />
                      <div
                        className="cart__item-quantity-btn"
                        onClick={() => {
                          handleSetQuantity(index, 1);
                        }}
                      >
                        +
                      </div>
                    </div>
                  </div>
                  <div className="cart__content-item-section-child">
                    <p className="cart__item-txt cart__item-final-price">
                      {formatMoney(
                        afterSale(item.data.price, item.data.sale) *
                          quantities[index].quantity
                      )}
                    </p>
                  </div>
                  <div
                    className="cart__content-item-section-child"
                    onClick={() => {
                      handleDeleteCartProduct(item.id);
                    }}
                  >
                    <p className="cart__item-txt cart__item-delete-btn">Xóa</p>
                  </div>
                </div>
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default Cart;
