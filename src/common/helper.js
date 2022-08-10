import { AES_KEY, LOCALSTORAGE, PATHNAME, URL } from "./constant";
import { toast } from "react-toastify";
import md5 from "blueimp-md5";

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

export const tokenHandle = (pathname) => {
  const token = LS.getItem(LOCALSTORAGE.TOKEN);
  if (token) {
  } else {
    if (pathname === PATHNAME.CART || pathname === PATHNAME.ORDER) {
      setTimeout(() => {
        showToast("Dang nhap di");
      }, 3000);
    }
  }
};

export const clearAllToast = () => {
  toast.dismiss();
};

export const showToast = (message, type) => {
  toast.dismiss();
  if (type === "default")
    toast(message, { position: toast.POSITION.TOP_RIGHT, autoClose: 1500 });
  else {
    toast[type](message, {
      position: toast.POSITION.TOP_RIGHT,
      autoClose: 1500,
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

export const sortArrByAttr = (arr, attr, mode = 1) => {
  const temp = [...arr];
  temp.sort((a, b) => a[attr] - b[attr]);
  if (mode === 1) {
    return temp;
  }
  return temp.reverse();
};

export const hashMD5 = (text) => {
  return md5(text);
};

// export const encryptAES256 = (key = AES_KEY, plaintext) => {
//   // var cipher = aes256.createCipher(key);
//   // var encryptedPlainText = cipher.encrypt(plaintext);
//   // return encryptedPlainText;
//   const aes = new aesEncryption();
//   aes.setSecretKey(key);
//   const encrypted = aes.encrypt("some-plain-text");
//   const decrypted = aes.decrypt(encrypted);
// };
