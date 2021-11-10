import {
  SHOW_MODAL,
  HIDE_MODAL
} from "../util/constants";

export const showModal = () => {
  return dispatch => {
    dispatch({
      type: SHOW_MODAL,
    });
  }
}

export const hideModal = () => {
  return dispatch => {
    dispatch({
      type: HIDE_MODAL
    });
  }
}