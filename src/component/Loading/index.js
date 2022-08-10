import React from "react";
import LoadingImg from "../../assets/img/ic_loading.gif";
import LoadingTextImg from "../../assets/img/ic_loading_text.gif";
import "./style.css";
import { useSelector } from "react-redux";

const Loading = () => {
  const isLoading = useSelector((state) => state.login.isLoading);
  if (!isLoading) return <></>;
  return (
    <div className="loading__container">
      {/* <img src={LoadingImg} className="loading-img" /> */}
      <img src={LoadingTextImg} className="loading-text-img" />
    </div>
  );
};

export default Loading;
