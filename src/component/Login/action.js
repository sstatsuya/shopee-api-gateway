export const setLoading = (isLoading) => {
  return {
    type: "setLoading",
    isLoading,
  };
};

export const setUserInfo = (userInfo) => {
  return {
    type: "setUserInfo",
    userInfo,
  };
};

export const logout = () =>{
    return {
        type: 'logout'
    }
}