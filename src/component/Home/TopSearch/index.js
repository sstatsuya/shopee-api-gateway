import React from "react";
import "./style.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleLeft, faAngleRight } from "@fortawesome/free-solid-svg-icons";
import ReactOwlCarousel from "react-owl-carousel";
import TopImg1 from "../../../assets/img/ic_top1.png";
import TopImg2 from "../../../assets/img/ic_top2.png";
import TopImg3 from "../../../assets/img/ic_top3.png";
import TopImg4 from "../../../assets/img/ic_top4.png";
import TopImg5 from "../../../assets/img/ic_top5.png";
import TopImg6 from "../../../assets/img/ic_top6.png";
import TopImg7 from "../../../assets/img/ic_top7.png";

const TopSearch = () => {
  const topSearchs = [
    {
      id: 1,
      name: "Quần Tây Nam",
      img: TopImg1,
    },
    {
      id: 2,
      name: "Quần Tây Nam",
      img: TopImg2,
    },
    {
      id: 3,
      name: "Quần Tây Nam",
      img: TopImg3,
    },
    {
      id: 4,
      name: "Quần Tây Nam",
      img: TopImg4,
    },
    {
      id: 5,
      name: "Quần Tây Nam",
      img: TopImg5,
    },
    {
      id: 6,
      name: "Quần Tây Nam",
      img: TopImg6,
    },
    {
      id: 7,
      name: "Quần Tây Nam",
      img: TopImg7,
    },
  ];
  return (
    <div className="top-search">
      <p className="top-search__title">Tìm kiếm hàng đầu</p>
      <div className="top-search__list">
        <ReactOwlCarousel
          className="owl-theme"
          items={5}
          nav={false}
          navText={[
            "<div className='type__slide-btn left'><</div>",
            "<div className='type__slide-btn right'>></div>",
          ]}
        >
          {topSearchs.map((item, index) => (
            <div className="top-search__slide-item" key={index}>
              <div className="top-search__slide-item-img-wrapper">
                <img src={item.img} className="top-search__slide-item-img" />
                <p className="top-search__slide-item-sold">Bán 61k+/tháng</p>
              </div>
              <p className="top-search__slide-item-name">{item.name} </p>
            </div>
          ))}
        </ReactOwlCarousel>
      </div>
    </div>
  );
};

export default TopSearch;
