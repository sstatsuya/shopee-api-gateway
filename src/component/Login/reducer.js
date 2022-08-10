import { handleLS } from "../../localStorage/handleLS";
import { initState } from "./state";

const loginSlice = (state = initState, action) => {
  switch (action.type) {
    case "setLoading":
      return {
        ...state,
        isLoading: action.isLoading,
      };
    case "setUserInfo":
      return {
        ...state,
        userInfo: action.userInfo,
      };
    case "logout":
      handleLS.removeAll();
      return initState;
    default:
      return state;
  }
};

export default loginSlice;
