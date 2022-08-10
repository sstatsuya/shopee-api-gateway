export const VARIABLES = {
  login: (username, password) => ({
    name: "user",
    type: "login",
    variables: {
      username,
      password,
    },
  }),

  getUserInfo: (token) => ({
    token: token,
    name: "user",
    type: "getUserInfo",
  }),

  getProductList: () => ({
    name: "product",
    type: "products",
  }),

  getProductInfo: (productId) => ({
    name: "product",
    type: "product",
    variables: {
      productId: productId,
    },
  }),

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
