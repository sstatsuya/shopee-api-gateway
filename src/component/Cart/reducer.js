import { CHANGE_SELECT_ALL } from "./action";
import { state as initState } from "./state";

const cartSlice = (state = initState, action) => {
  switch (action.type) {
    case CHANGE_SELECT_ALL:
      return {
        ...state,
        isSelectAll: !state.isSelectAll,
      };
    default:
      return state;
  }
};

export default cartSlice;
