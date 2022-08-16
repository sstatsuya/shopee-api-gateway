import { AES_KEY, GATEWAY_API, LOCALSTORAGE, PATHNAME, URL } from "./constant";
import { toast } from "react-toastify";
import md5 from "blueimp-md5";
import sha256 from "crypto-js/sha256";
import CryptoJS, { AES } from "crypto-js";
import { queryString } from "../graphql/query";
import { VARIABLES } from "../graphql/variables";
import axios from "axios";
import * as loginActionsCreator from "../component/Login/action";

export const LS = {
  getItem: (key) => JSON.parse(localStorage.getItem(key)),
  setItem: (key, value) => {
    localStorage.setItem(key, value);
  },
};

export const toVND = (price) => {
  let priceStr = price.toString();
  let priceVND = "";
  let dem = 0;
  for (let i = priceStr.length - 1; i >= 0; i--) {
    priceVND = priceStr[i] + priceVND;
    dem += 1;
    if (dem === 3 && i !== 0) {
      dem = 0;
      priceVND = "." + priceVND;
    }
  }
  return priceVND + "₫";
};

export const getMaxIndex = (list, code) => {
  let max = 0;
  for (let i = 0; i < list.length; i++) {
    if (Number(list[i][code]) > max) max = list[i][code];
  }
  return max;
};

export const checkEmail = (text) => {
  const regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/;
  return regex.test(text);
};

export const checkPhone = (text) => {
  const regex = /^0[0-9]{9}$/;
  return regex.test(text);
};

export const hideWarning = () => {
  const backup = console.warn;

  console.warn = function filterWarnings(msg) {
    const supressedWarnings = ["warning text", "other warning text"];

    if (!supressedWarnings.some((entry) => msg.includes(entry))) {
      backup.apply(console, arguments);
    }
  };
};

export const tokenHandle = async (history = () => {}, dispatch = () => {}) => {
  const token = LS.getItem(LOCALSTORAGE.TOKEN) || "";
  if (token) {
    dispatch(loginActionsCreator.setLoading(true));
    const response = await axios.post(
      GATEWAY_API,
      {
        query: queryString,
        variables: VARIABLES.getUserInfo(""),
      },
      {
        headers: {
          "Content-Type": "application/json",
          authorization: encryptAES256(AES_KEY, `${token}`),
        },
      }
    );
    dispatch(loginActionsCreator.setLoading(false));
    const userInfo =
      response.data?.data?.request?.data[VARIABLES.getUserInfo().type];

    if (!userInfo) {
      console.log(JSON.stringify(response.data));
      history.push({
        pathname: PATHNAME.LOGIN,
        needLogin: true,
      });
    }
  } else {
    history.push({
      pathname: PATHNAME.LOGIN,
      needLogin: true,
    });
  }
};

export const clearAllToast = () => {
  toast.dismiss();
};

export const showToast = (message, type, time = 1500) => {
  toast.dismiss();
  if (type === "default")
    toast(message, { position: toast.POSITION.TOP_RIGHT, autoClose: time });
  else {
    toast[type](message, {
      position: toast.POSITION.TOP_RIGHT,
      autoClose: time,
    });
  }
};

export const formatMoney = (
  amount,
  decimalCount = 0,
  decimal = ".",
  thousands = ".",
  currencyStr = "₫"
) => {
  try {
    decimalCount = Math.abs(decimalCount);
    decimalCount = Number.isNaN(decimalCount) ? 2 : decimalCount;

    const negativeSign = amount < 0 ? "-" : "";

    const i = parseInt(
      (amount = Math.abs(Number(amount) || 0).toFixed(decimalCount))
    ).toString();
    const j = i.length > 3 ? i.length % 3 : 0;

    return (
      negativeSign +
      (j ? i.substr(0, j) + thousands : "") +
      i.substr(j).replace(/(\d{3})(?=\d)/g, `$1${thousands}`) +
      (decimalCount
        ? decimal +
          Math.abs(amount - i)
            .toFixed(decimalCount)
            .slice(2)
        : "") +
      currencyStr
    );
  } catch (e) {
    console.log(e);
  }
};

export const afterSale = (originPrice, sale) => {
  return (originPrice * (100 - sale)) / 100;
};

export const reloadPage = (history) => {
  history.push("/temp");
  history.goBack();
};

// Convert timestamp sang datetime
export const timestampToDateTime = (timestamp) => {
  timestamp = timestamp.toString();
  timestamp = timestamp.length < 11 ? timestamp * 1000 : timestamp;
  timestamp = parseInt(timestamp);
  var theDate = new Date(timestamp);
  return (
    theDate.getHours() +
    ":" +
    theDate.getMinutes() +
    " " +
    theDate.getDate() +
    "/" +
    Number(theDate.getMonth() + 1) +
    "/" +
    theDate.getFullYear()
  );
};

//1: asc, !1: desc
export const sortArrByAttr = (arr, attr, mode = 1) => {
  const temp = [...arr];
  temp.sort((a, b) => a[attr] - b[attr]);
  if (mode === 1) {
    return temp;
  }
  return temp.reverse();
};

//Hex to String
export const fromHex = (hex, str) => {
  try {
    str = decodeURIComponent(hex.replace(/(..)/g, "%$1"));
  } catch (e) {
    str = hex;
    console.log("invalid hex input: " + hex);
  }
  return str;
};

//String to Hex
export const toHex = (str, hex) => {
  try {
    hex = unescape(encodeURIComponent(str))
      .split("")
      .map(function (v) {
        return v.charCodeAt(0).toString(16);
      })
      .join("");
  } catch (e) {
    hex = str;
    console.log("invalid text input: " + str);
  }
  return hex;
};

export const hashMD5 = (text) => {
  return md5(text);
};

export const encryptAES256 = (originKey = AES_KEY, plaintext) => {
  let text = CryptoJS.enc.Utf8.parse(plaintext);
  let key = CryptoJS.enc.Utf8.parse(originKey);
  var encrypted = CryptoJS.AES.encrypt(text, key, {
    mode: CryptoJS.mode.ECB,
    padding: CryptoJS.pad.ZeroPadding,
  });
  encrypted = encrypted.ciphertext.toString(CryptoJS.enc.Hex);
  return encrypted;
};

export const decryptAES256 = (originKey = AES_KEY, encrypted) => {
  let key = CryptoJS.enc.Utf8.parse(originKey);
  var decrypted = CryptoJS.AES.decrypt(
    { ciphertext: CryptoJS.enc.Hex.parse(encrypted) },
    key,
    { mode: CryptoJS.mode.ECB, padding: CryptoJS.pad.ZeroPadding }
  );
  return decrypted.toString(CryptoJS.enc.Utf8);
};

export const handleRedirectError = (response, history) => {
  if (response.data?.request?.data?.isError) {
    history.push({
      pathname: PATHNAME.ERROR,
      data: {
        message: response.data?.request?.data?.message,
      },
    });
  }
};
