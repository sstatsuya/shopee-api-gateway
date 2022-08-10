import React, { useEffect, useRef, useState } from "react";
import "./style.css";
import { useDispatch, useSelector } from "react-redux";
import LoadingBorder1 from "../../assets/img/ic_loading_border2.gif";
import Modal from "../Modal";

const AddOrder = ({
  title = "Xác nhận đặt hàng",
  content = "Nội dung",
  price = 0,
  time = 5,
  onAccept = () => {},
  onCancel = () => {},
  isShowAccept = true,
  isShowCancel = true,
}) => {
  const loginSlice = useSelector((state) => state.login);
  const userId = loginSlice.userInfo.id;
  const address = loginSlice.userInfo.address;
  const phone = loginSlice.userInfo.phone;
  const name = loginSlice.userInfo.name;
  const [isShow, setIsShow] = useState(true);
  const addOrder = useRef();
  const [timer, setTimer] = useState(time);
  useEffect(() => {
    let timerInterval = setInterval(() => {
      if (timer > 0) {
        setTimer(timer - 1);
      } else {
        handleAcc();
      }
    }, 1000);
    return () => {
      clearInterval(timerInterval);
    };
  }, [timer]);

  const closeAddOrder = () => {
    if (addOrder.current) addOrder.current.classList.toggle("rightTo", false);
    if (addOrder.current) addOrder.current.classList.toggle("toLeft");
    setTimeout(() => {
      setIsShow(false);
    }, 500);
  };

  const handleAcc = () => {
    closeAddOrder();
    setTimeout(() => {
      onAccept();
    }, 500);
  };

  const handleCancel = () => {
    closeAddOrder();
    setTimeout(() => {
      onCancel();
    }, 500);
  };

  if (!isShow) return <></>;

  return (
    <div className="overlay">
      <div className="add-order rightTo" ref={addOrder}>
        <p className="add-order__title">{title}</p>
        <p className="add-order__address">
          Đơn hàng của bạn sẽ được giao đến{" "}
          <font color="#ee4d2d">{address}</font>
        </p>
        <p className="add-order__address">
          Người đặt hàng <font color="#ee4d2d">{name}</font>
        </p>
        <p className="add-order__address">
          Số điện thoại <font color="#ee4d2d">{phone}</font>
        </p>

        <div className="add-order__content">
          <img src={LoadingBorder1} className="add-order__loading-border-img" />
          <p className="add-order__timer">{timer}</p>
        </div>
        <div className="add-order__option">
          {isShowAccept && (
            <div
              className="add-order__option-btn add-order__option-accept"
              onClick={() => {
                handleAcc();
              }}
            >
              <p>Đồng ý</p>
            </div>
          )}

          {isShowCancel && (
            <div
              className="add-order__option-btn add-order__option-cancel"
              onClick={() => {
                handleCancel();
              }}
            >
              <p>Hủy</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AddOrder;
