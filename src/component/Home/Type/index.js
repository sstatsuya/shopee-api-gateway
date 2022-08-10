import React from "react";
import "./style.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleLeft, faAngleRight } from "@fortawesome/free-solid-svg-icons";
import TypeImg1 from "../../../assets/img/ic_type1.png";
import TypeImg2 from "../../../assets/img/ic_type2.png";
import TypeImg3 from "../../../assets/img/ic_type3.png";
import TypeImg4 from "../../../assets/img/ic_type4.png";
import TypeImg5 from "../../../assets/img/ic_type5.png";
import TypeImg6 from "../../../assets/img/ic_type6.png";
import TypeImg7 from "../../../assets/img/ic_type7.png";
import TypeImg8 from "../../../assets/img/ic_type8.png";
import TypeImg9 from "../../../assets/img/ic_type9.png";
import TypeImg10 from "../../../assets/img/ic_type10.png";
import TypeImg11 from "../../../assets/img/ic_type11.png";
import TypeImg12 from "../../../assets/img/ic_type12.png";
import TypeImg13 from "../../../assets/img/ic_type13.png";
import TypeImg14 from "../../../assets/img/ic_type14.png";
import TypeImg15 from "../../../assets/img/ic_type15.png";
import TypeImg16 from "../../../assets/img/ic_type16.png";
import TypeImg17 from "../../../assets/img/ic_type17.png";
import TypeImg18 from "../../../assets/img/ic_type18.png";
import ReactOwlCarousel from "react-owl-carousel";

const Type = () => {
  let types = [
    {
      id: 1,
      name: "Thời trang nam",
      img: TypeImg1,
    },
    {
      id: 2,
      name: "Thời trang nam",
      img: TypeImg2,
    },
    {
      id: 3,
      name: "Thời trang nam",
      img: TypeImg3,
    },
    {
      id: 4,
      name: "Thời trang nam",
      img: TypeImg4,
    },
    {
      id: 5,
      name: "Thời trang nam",
      img: TypeImg5,
    },
    {
      id: 6,
      name: "Thời trang nam",
      img: TypeImg6,
    },
    {
      id: 7,
      name: "Thời trang nam",
      img: TypeImg7,
    },
    {
      id: 8,
      name: "Thời trang nam",
      img: TypeImg8,
    },
    {
      id: 9,
      name: "Thời trang nam",
      img: TypeImg9,
    },
    {
      id: 10,
      name: "Thời trang nam",
      img: TypeImg10,
    },
    {
      id: 11,
      name: "Thời trang nam",
      img: TypeImg11,
    },
    {
      id: 12,
      name: "Thời trang nam",
      img: TypeImg12,
    },
    {
      id: 13,
      name: "Thời trang nam",
      img: TypeImg13,
    },
    {
      id: 14,
      name: "Thời trang nam",
      img: TypeImg14,
    },
    {
      id: 15,
      name: "Thời trang nam",
      img: TypeImg15,
    },
    {
      id: 16,
      name: "Thời trang nam",
      img: TypeImg16,
    },
    {
      id: 17,
      name: "Thời trang nam",
      img: TypeImg17,
    },
    {
      id: 18,
      name: "Thời trang nam",
      img: TypeImg18,
    },
    {
      id: 1,
      name: "Thời trang nam",
      img: TypeImg1,
    },
    {
      id: 2,
      name: "Thời trang nam",
      img: TypeImg2,
    },
    {
      id: 3,
      name: "Thời trang nam",
      img: TypeImg3,
    },
    {
      id: 4,
      name: "Thời trang nam",
      img: TypeImg4,
    },
    {
      id: 5,
      name: "Thời trang nam",
      img: TypeImg5,
    },
    {
      id: 6,
      name: "Thời trang nam",
      img: TypeImg6,
    },
    {
      id: 7,
      name: "Thời trang nam",
      img: TypeImg7,
    },
    {
      id: 8,
      name: "Thời trang nam",
      img: TypeImg8,
    },
    {
      id: 9,
      name: "Thời trang nam",
      img: TypeImg9,
    },
    {
      id: 10,
      name: "Thời trang nam",
      img: TypeImg10,
    },
    {
      id: 11,
      name: "Thời trang nam",
      img: TypeImg11,
    },
    {
      id: 12,
      name: "Thời trang nam",
      img: TypeImg12,
    },
    {
      id: 13,
      name: "Thời trang nam",
      img: TypeImg13,
    },
    {
      id: 14,
      name: "Thời trang nam",
      img: TypeImg14,
    },
    {
      id: 15,
      name: "Thời trang nam",
      img: TypeImg15,
    },
    {
      id: 16,
      name: "Thời trang nam",
      img: TypeImg16,
    },
    {
      id: 17,
      name: "Thời trang nam",
      img: TypeImg17,
    },
    {
      id: 18,
      name: "Thời trang nam",
      img: TypeImg18,
    },
  ];
  let typePageNumber = Math.ceil(types.length / 20);
  return (
    <div className="type">
      <p className="type__title">Danh mục</p>
      <div className="type__list">
        <ReactOwlCarousel
          className="owl-theme"
          items={1}
          nav={false}
          navText={[
            "<div className='type__slide-btn left'><</div>",
            "<div className='type__slide-btn right'>></div>",
          ]}
        >
          {[
            Array.from(Array(typePageNumber).keys()).map((number, index1) => (
              <div className="type__page" key={index1}>
                {types.map((type, index) => {
                  if (index < (number + 1) * 20 && index >= number * 20) {
                    return (
                      <div className="type__item" key={index}>
                        <div className="type__item-bg">
                          <img src={type.img} className="type__item-img" />
                          <p className="type__item-name">{type.name}</p>
                        </div>
                      </div>
                    );
                  }
                })}
              </div>
            )),
          ]}
        </ReactOwlCarousel>
      </div>
    </div>
  );
};

export default Type;
