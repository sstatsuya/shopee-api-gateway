import React, { useEffect, useState } from "react";
import "./style.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCheckCircle,
  faEye,
  faEyeSlash,
  faStopwatch,
  faTimesCircle,
  faWallet,
} from "@fortawesome/free-solid-svg-icons";
import QRImg from "../../../assets/img/ic_qr.png";
import {
  formatMoney,
  handleRedirectError,
  reloadPage,
  showToast,
  sortArrByAttr,
  timestampToDateTime,
  tokenHandle,
} from "../../../common/helper";
import { Collapse } from "react-collapse";
import { useLazyQuery, useQuery } from "@apollo/client";
import { query } from "../../../graphql/query";
import { useDispatch, useSelector } from "react-redux";
import { VARIABLES } from "../../../graphql/variables";
import * as loginActionsCreator from "../../Login/action";
import { useHistory } from "react-router-dom";
import LoadingStatic from "../../LoadingStatic";

const ManageOrder = () => {
  // Variables
  const [isOpened, setIsOpened] = useState(() => {
    let temp = [];
    for (let i = 0; i < 10; i++) {
      temp.push(false);
    }
    return temp;
  });

  const history = useHistory();
  const dispatch = useDispatch();
  const userInfo = useSelector((state) => state.login.userInfo);
  const getAllOrdersData = useQuery(query, {
    variables: VARIABLES.getAllOrders(userInfo.id),
  });
  const [orders, setOrders] = useState([]);
  useEffect(() => {
    if (getAllOrdersData.loading) {
    } else {
      handleRedirectError(getAllOrdersData, history);
      if (getAllOrdersData?.data?.request?.data) {
        setOrders(
          getAllOrdersData.data.request.data[VARIABLES.getAllOrders().type]
        );
      }
      if (getAllOrdersData.error) {
        showToast("Đã có lỗi xảy ra khi lấy danh sách đơn hàng", "error");
      }
    }
  }, [getAllOrdersData]);

  const [approveOrder, approveOrderData] = useLazyQuery(query);
  useEffect(() => {
    if (approveOrderData.loading) {
      dispatch(loginActionsCreator.setLoading(true));
    } else {
      dispatch(loginActionsCreator.setLoading(false));
      if (approveOrderData.data) {
        reloadPage(history);
        showToast("Duyệt đơn hàng thành công", "success");
      }
    }
  }, [approveOrderData.loading]);

  // Function
  const handleApproveOrder = (id) => {
    approveOrder({
      variables: VARIABLES.approveOrder(id),
    });
  };

  return (
    <div className="manage-order">
      <div className="manage-order__table">
        <div className="manage-order__table__header">
          <div className="manage-order__table__header__txt">Mã đơn hàng</div>
          <div className="manage-order__table__header__txt">Mã khách hàng</div>
          <div className="manage-order__table__header__txt">Số điện thoại</div>
          <div className="manage-order__table__header__txt">Địa chỉ</div>
          <div className="manage-order__table__header__txt">Ngày tạo đơn</div>
          <div className="manage-order__table__header__txt">Ngày giao</div>
          <div className="manage-order__table__header__txt">Tình trạng</div>
          <div className="manage-order__table__header__txt">Thao tác</div>
        </div>
        {!getAllOrdersData.data && <LoadingStatic width={100} />}
        {sortArrByAttr(orders, "date", -1).map((item, index) => (
          <div
            className="manage-order__table-item"
            style={index % 2 === 0 ? { backgroundColor: "#f0f0f0" } : {}}
          >
            <div className="manage-order__table-item-info">
              <div className="manage-order__table-item-col">
                <p className="manage-order__table-item__txt">#{item.id}</p>
                <p className="manage-order__table-item__txt-absolute">
                  #{item.id}
                </p>
              </div>
              <div className="manage-order__table-item-col">
                <p className="manage-order__table-item__txt">{item.userId}</p>
                <p className="manage-order__table-item__txt-absolute">
                  {item.userId}
                </p>
              </div>
              <div className="manage-order__table-item-col">
                <p className="manage-order__table-item__txt">{item.phone}</p>
                <p className="manage-order__table-item__txt-absolute">
                  {item.phone}
                </p>
              </div>
              <div className="manage-order__table-item-col">
                <p className="manage-order__table-item__txt">{item.address}</p>
                <p className="manage-order__table-item__txt-absolute">
                  {item.address}
                </p>
              </div>
              <div className="manage-order__table-item-col">
                <p className="manage-order__table-item__txt">
                  {timestampToDateTime(item.date)}
                </p>
                <p className="manage-order__table-item__txt-absolute">
                  {timestampToDateTime(item.date)}
                </p>
              </div>
              <div className="manage-order__table-item-col">
                {item.status > 1 && (
                  <>
                    <p className="manage-order__table-item__txt">
                      {timestampToDateTime(item.shipDate)}
                    </p>
                    <p className="manage-order__table-item__txt-absolute">
                      {timestampToDateTime(item.shipDate)}
                    </p>
                  </>
                )}
                {item.status === 1 && (
                  <p className="manage-order__table-item__txt">Chưa giao</p>
                )}
              </div>
              <div className="manage-order__table-item-col flex-row">
                {item.status === 1 ? (
                  <FontAwesomeIcon
                    icon={faStopwatch}
                    style={{ color: "#ee4d2d" }}
                  />
                ) : (
                  <FontAwesomeIcon
                    icon={faCheckCircle}
                    style={{ color: "#31bf04" }}
                  />
                )}
              </div>
              <div className="manage-order__table-item-col flex-row">
                <div
                  className="manage-order__table-item__show-product-btn"
                  onClick={() => {
                    setIsOpened(() => {
                      let temp = [...isOpened];
                      temp[index] = !temp[index];
                      return temp;
                    });
                  }}
                >
                  Xem
                </div>

                <div
                  className="manage-order__table-item__show-product-btn approve"
                  style={
                    item.status === 2
                      ? { pointerEvents: "none", backgroundColor: "#999" }
                      : {}
                  }
                  onClick={() => {
                    handleApproveOrder(item.id);
                  }}
                >
                  Duyệt
                </div>
              </div>
            </div>
            <div className="manage-order__table-item-info">
              <Collapse isOpened={isOpened[index]}>
                <div className="manage-order__tale-item-collapse">
                  {item.products.map((product, index) => (
                    <div
                      className="manage-order__table-product-item"
                      key={index}
                    >
                      <img
                        className="manage-order__table-product-img"
                        src={product.image}
                        alt="img"
                      />
                      <div className="manage-order__table-product-info">
                        <p className="manage-order__table-product-name">
                          {product.name}
                        </p>
                        <div className="manage-order__table-product-price-wrapper">
                          <p className="manage-order__table-product-quantity">
                            x1
                          </p>
                          <p className="manage-order__table-product-price">
                            {formatMoney(15000000)}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                  <div
                    className="order__order-all-price"
                    style={{ padding: "12px", marginTop: "-16px" }}
                  >
                    <FontAwesomeIcon
                      icon={faWallet}
                      className="order__order-all-price-icon"
                    />
                    <p
                      className="order__order-all-price-title"
                      style={{ fontSize: "13px" }}
                    >
                      Tổng số tiền:{" "}
                    </p>
                    <p
                      className="order__order-all-price-number"
                      style={{ fontSize: "15px" }}
                    >
                      {formatMoney(1500000545)}
                    </p>
                  </div>
                </div>
              </Collapse>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ManageOrder;
