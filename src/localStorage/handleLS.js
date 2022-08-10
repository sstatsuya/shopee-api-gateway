import { LOCALSTORAGE } from "../common/constant";
import { LS } from "../common/helper";

export const handleLS = {
  setUserToken: (token) => {
    LS.setItem(LOCALSTORAGE.TOKEN, token);
  },
  getUserToken: () => {
    return LS.getItem(LOCALSTORAGE.TOKEN);
  },
  removeAll: () => {
    localStorage.clear()
  },
};
