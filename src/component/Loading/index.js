import React, { useEffect, useState } from "react";
import LoadingImg from "../../assets/img/ic_loading.gif";
import LoadingSmoothImg from "../../assets/img/ic_loading_smooth2.gif";
import LoadingTextImg from "../../assets/img/ic_loading_text.gif";
import "./style.css";
import { useSelector } from "react-redux";

const Loading = () => {
  const [isShow, setIsShow] = useState(false);
  const isLoading = useSelector((state) => state.login.isLoading);
  useEffect(() => {
    if (isLoading) setIsShow(true);
    else {
      setIsShow(isLoading);
    }
  }, [isLoading]);
  if (!isShow) return <></>;
  return (
    <div className="loading__container">
      {/* <img src={LoadingImg} className="loading-img" /> */}
      <img src={LoadingSmoothImg} className="loading-text-img" style={{width: '240px'}} />
    </div>
  );
};

export default Loading;
