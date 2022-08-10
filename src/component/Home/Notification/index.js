import React, { useEffect, useState } from "react";
import "./style.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleLeft, faAngleRight } from "@fortawesome/free-solid-svg-icons";
import ReactOwlCarousel from "react-owl-carousel";
import Product1Img from "../../../assets/img/ic_product1.png";
import LabelImg from "../../../assets/img/ic_product_label.png";
import Hot8Img from "../../../assets/img/ic_hot8.png";
import { useDispatch, useSelector } from "react-redux";
import { query } from "../../../graphql/query";
import { VARIABLES } from "../../../graphql/variables";
import * as loginActionsCreator from "../../Login/action";
import { useLazyQuery, useQuery } from "@apollo/client";
import {
  afterSale,
  formatMoney,
  showToast,
  sortArrByAttr,
  timestampToDateTime,
} from "../../../common/helper";
import { useHistory } from "react-router-dom";

const Notification = (props) => {
  const userId = useSelector((state) => state.login.userInfo.id);
  const dispatch = useDispatch();
  const [notifications, setNotifications] = useState([]);
  const getUserNotificationData = useQuery(query, {
    variables: VARIABLES.getUserNotification(userId),
  });

  const getUnRead = (arr) => {
    return arr.filter((item) => !item.isRead).length;
  };

  useEffect(() => {
    if (getUserNotificationData.loading) {
      dispatch(loginActionsCreator.setLoading(true));
    } else {
      dispatch(loginActionsCreator.setLoading(false));
      if (getUserNotificationData?.data?.request?.data) {
        setNotifications(
          getUserNotificationData.data.request.data[
            VARIABLES.getUserNotification().type
          ]
        );
        props.setNotificationQuantity(
          getUnRead(
            getUserNotificationData.data.request.data[
              VARIABLES.getUserNotification().type
            ]
          )
        );
      }
      if (getUserNotificationData.error) {
        showToast("Đã có lỗi khi load thông báo", "error");
      }
    }
  }, [getUserNotificationData.loading]);

  const [markRead, markReadData] = useLazyQuery(query);
  const [markReadAll, markReadAllData] = useLazyQuery(query);

  // mode = 0 mark one, mode = 1 mark all
  const markReadNotification = (notificationId, mode) => {
    let temp = [...notifications];
    if (mode === 0) {
      for (let i = 0; i < temp.length; i++) {
        if (temp[i].id === notificationId) {
          temp[i].isRead = true;
          break;
        }
      }
    } else {
      for (let i = 0; i < temp.length; i++) {
        if (temp[i].userId === userId) {
          temp[i].isRead = true;
        }
      }
    }

    setNotifications(temp);
  };

  useEffect(() => {
    if (markReadData.loading) {
      dispatch(loginActionsCreator.setLoading(true));
    } else {
      dispatch(loginActionsCreator.setLoading(false));
      if (markReadData?.data?.request?.data) {
        let id = markReadData.data.request.data[VARIABLES.markRead().type].id;
        markReadNotification(id, 0);
      }
      if (markReadData.error) {
        showToast("Đã có lỗi khi mark read", "error");
      }
    }
  }, [markReadData.loading]);

  useEffect(() => {
    if (markReadAllData.loading) {
      dispatch(loginActionsCreator.setLoading(true));
    } else {
      dispatch(loginActionsCreator.setLoading(false));
      if (markReadAllData?.data?.request?.data) {
        markReadNotification("", 1);
      }
      if (markReadAllData.error) {
        showToast("Đã có lỗi khi mark read", "error");
      }
    }
  }, [markReadAllData.loading]);

  // Function
  const handleMarkRead = (notificationId) => {
    markRead({
      variables: VARIABLES.markRead(notificationId),
    });
  };

  const handleMarkReadAll = (userId) => {
    markReadAll({
      variables: VARIABLES.markReadAll(userId),
    });
  };

  return (
    <div className="home__notification">
      <div className="home__notification-item-list">
        {sortArrByAttr(notifications, "date", -1).map((notification, index) => {
          return (
            <div
              className="home__notification-item"
              style={!notification.isRead ? { backgroundColor: "#f7e9df" } : {}}
              key={index}
            >
              <div className="home__notification-item-content">
                <div className="home__notification-item-left">
                  <img src={Hot8Img} className="home__notification-item-img" />
                </div>
                <div className="home__notification-item-right">
                  <p className="home__notification-item-title">
                    {notification.title}
                  </p>
                  <p className="home__notification-item-txt">
                    {notification.content}
                  </p>
                </div>
              </div>
              <div className="home__notification-item-bottom">
                <p className="home__notification-time">
                  {timestampToDateTime(notification.date)}
                </p>
                <p
                  className="home__notification-mark-read"
                  onClick={() => {
                    if (!notification.isRead) {
                      handleMarkRead(notification.id);
                    }
                  }}
                >
                  {" "}
                  Đánh dấu đã đọc
                </p>
              </div>
            </div>
          );
        })}
      </div>

      <div className="home__notification-bottom">
        <div
          className="home__notification-mark-all-read"
          onClick={() => {
            handleMarkReadAll(userId);
          }}
        >
          <p>Đọc tất cả</p>
        </div>
      </div>
    </div>
  );
};

export default Notification;
