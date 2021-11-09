import {
  SHOW_MODAL,
  HIDE_MODAL
} from "../util/constants";

export const showModal = (song) => {
  return dispatch => {
    dispatch({
      type: SHOW_MODAL,
      payload: song
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