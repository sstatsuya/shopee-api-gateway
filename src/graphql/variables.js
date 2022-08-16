import { AES_KEY, LOCALSTORAGE } from "../common/constant";
import { encryptAES256, LS } from "../common/helper";

export const VARIABLES = {
  login: (username, password) => ({
    name: "user",
    type: "login",
    variables: {
      username,
      password,
    },
  }),

  getUserInfo: () => ({
    name: "user",
    type: "getUserInfo",
  }),

  getProductList: () => ({
    name: "product",
    type: "products",
  }),

  getProductInfo: (productId) => {
    return {
      name: "product",
      type: "product",
      variables: {
        productId: productId,
      },
    };
  },

  getUserCart: (userId) => ({
    name: "cart",
    type: "userCart",
    variables: {
      userId: userId,
    },
  }),

  addUserCartProduct: (userId, productId) => ({
    name: "cart",
    type: "addUserCartProduct",
    variables: {
      userId: userId,
      productId: productId,
    },
  }),

  deleteUserCartProduct: (deleteUserCartProductId) => ({
    name: "cart",
    type: "deleteUserCartProduct",
    variables: {
      deleteUserCartProductId: deleteUserCartProductId,
    },
  }),

  deleteUserCartProductList: (cartIdList) => ({
    name: "cart",
    type: "deleteUserCartProductList",
    variables: {
      deleteUserCartProductList: cartIdList,
    },
  }),

  addOrder: (userInfo, cartProducts) => {
    let temp = cartProducts.reduce((res, cur) => {
      res.push({
        id: cur.id,
        productId: cur.productId,
        name: cur.name,
        quantity: cur.quantity,
        price: cur.price,
        image: cur.image,
      });
      return res;
    }, []);
    return {
      name: "order",
      type: "addOrder",
      variables: {
        userId: userInfo.id,
        address: userInfo.address,
        phone: userInfo.phone,
        products: temp,
      },
    };
  },

  getUserOrders: (userId) => ({
    name: "order",
    type: "getUserOrders",
    variables: {
      userId: userId,
    },
  }),

  getAllOrders: () => ({
    name: "order",
    type: "getAllOrders",
    variables: {},
  }),

  approveOrder: (id) => ({
    name: "order",
    type: "approveOrder",
    variables: {
      id: id,
    },
  }),

  getUserNotification: (userId) => ({
    name: "notification",
    type: "getUserNotification",
    variables: {
      userId: userId,
    },
  }),

  markRead: (notificationId) => ({
    name: "notification",
    type: "markRead",
    variables: {
      notificationId: notificationId,
    },
  }),

  markReadAll: (userId) => ({
    name: "notification",
    type: "markReadAll",
    variables: {
      userId: userId,
    },
  }),
};
