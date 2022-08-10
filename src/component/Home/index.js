import React from "react";
import "./style.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import LogoImg from "../../assets/img/ic_logo.png";
import QRImg from "../../assets/img/ic_qr.png";
import FacebookImg from "../../assets/img/ic_facebook.png";
import GoogleImg from "../../assets/img/ic_google.png";
import AppleImg from "../../assets/img/ic_apple.png";
import { Colors } from "../../common/style";
import Header from "./Header";
import Banner from "./Banner";
import Type from "./Type";
import TopSearch from "./TopSearch";
import Product from "./Product";
import { useLocation } from "react-router-dom";
import { tokenHandle } from "../../common/helper";

const Home = () => {
  const pathname = useLocation().pathname
  tokenHandle(pathname)

  return <div className="home">
    <Header/>
    <Banner/>
    <Type/>
    {/* <TopSearch/> */}
    <Product/>
  </div>;
};

export default Home;
