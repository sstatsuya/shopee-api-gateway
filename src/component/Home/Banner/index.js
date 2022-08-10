import React from "react";
import "./style.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faE,
  faEye,
  faEyeSlash,
  faBell,
  faQuestionCircle,
  faGlobe,
  faShoppingCart,
  faSearch,
} from "@fortawesome/free-solid-svg-icons";
import SliderImg1 from "../../../assets/img/ic_banner1.png";
import SliderImg2 from "../../../assets/img/ic_banner2.png";
import SliderImg3 from "../../../assets/img/ic_banner3.png";
import SliderImg4 from "../../../assets/img/ic_banner4.png";
import SliderImg5 from "../../../assets/img/ic_banner5.png";
import SliderImg6 from "../../../assets/img/ic_banner6.png";
import SliderImg7 from "../../../assets/img/ic_banner7.png";
import HotImg1 from "../../../assets/img/ic_hot1.png";
import HotImg2 from "../../../assets/img/ic_hot2.png";
import HotImg3 from "../../../assets/img/ic_hot3.png";
import HotImg4 from "../../../assets/img/ic_hot4.png";
import HotImg5 from "../../../assets/img/ic_hot5.png";
import HotImg6 from "../../../assets/img/ic_hot6.png";
import HotImg7 from "../../../assets/img/ic_hot7.png";
import HotImg8 from "../../../assets/img/ic_hot8.png";
import NewbieImg from "../../../assets/img/ic_newbie.png";
import { Link } from "react-router-dom";
import ReactOwlCarousel from "react-owl-carousel";

const Banner = () => {
  const banners = [
    {
      id: 1,
      img: SliderImg1,
    },
    {
      id: 2,
      img: SliderImg2,
    },
    {
      id: 3,
      img: SliderImg3,
    },
    {
      id: 4,
      img: SliderImg4,
    },
    {
      id: 5,
      img: SliderImg5,
    },
  ];
  const hotItems = [
    {
      id: 1,
      name: "Khung giờ săn sale",
      img: HotImg1,
    },
    {
      id: 2,
      name: "Gì cũng rẻ - Mua là Freeship",
      img: HotImg2,
    },
    {
      id: 3,
      name: "Miễn phí vận chuyển",
      img: HotImg3,
    },
    {
      id: 4,
      name: "Hoàn xu 6% - Lên đến 200K",
      img: HotImg4,
    },
    {
      id: 5,
      name: "Hàng hiệu giá tốt",
      img: HotImg5,
    },
    {
      id: 6,
      name: "Hàng quốc tế - Deal x9K",
      img: HotImg6,
    },
    {
      id: 7,
      name: "Nạp Thẻ, Hóa Đơn & Phim",
      img: HotImg7,
    },
    {
      id: 8,
      name: "Deal Sốc Từ 1K",
      img: HotImg8,
    },
  ];
  return (
    <div className="banner-wrapper">
      <div className="banner">
        <div className="slider">
          <ReactOwlCarousel
            className="owl-theme padding-bottom-0"
            items={1}
            autoplay
            autoplayTimeout={2000}
            loop
          >
            {banners.map((banner, index) => (
              <div className="banner__item" key={index}>
                <img src={banner.img} key={banner.id} className="slider__img" />
              </div>
            ))}
          </ReactOwlCarousel>
        </div>
        <div className="banner__right">
          <img src={SliderImg6} className="right_img" />
          <img src={SliderImg7} className="right_img" />
        </div>
      </div>

      {/* Under banner */}
      <div className="hot-option">
        {hotItems.map((hotItem, index) => (
          <div className="hot__item" key={hotItem.id}>
            <img src={hotItem.img} className="hot__item-img" />
            <p className="hot__item-txt">{hotItem.name}</p>
          </div>
        ))}
      </div>

      {/* Newbie */}
      <div className="newbie">
        <img src={NewbieImg} className="newbie__img" />
      </div>
    </div>
  );
};

export default Banner;
