import { SHOW_MODAL, HIDE_MODAL } from "../util/constants";

export const initialState = {
  visible: false,
  song: null
};

export default function (state = initialState, action) {
  switch (action.type) {
    case SHOW_MODAL:
      return {
        ...state,
        visible: true,
      };
    case HIDE_MODAL:
      return {
        ...state,
        visible: false,
      };
    default:
      return state;
  }
}
