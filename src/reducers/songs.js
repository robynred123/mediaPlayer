import {
  GET_SONGS,
  GET_SONGS_SUCCESS,
  GET_SONGS_FAILURE,
  CREATE_TABLES,
  CREATE_TABLES_SUCCESS,
  CREATE_TABLES_FAILURE,
} from "../util/constants";

export const initialState = {
  songList: null,
  loading: false,
  error: null,
  tablesCreated: false,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case CREATE_TABLES_SUCCESS:
      return {
        ...state,
        loading: false,
        tablesCreated: true,
      };
    case GET_SONGS_SUCCESS:
      return {
        ...state,
        loading: false,
        songList: [{ id: "1", name: "ruby", artist: "Kaiser Chiefs" }], //update
      };
    case CREATE_TABLES:
    case GET_SONGS:
      return {
        ...state,
        loading: true,
      };
    case CREATE_TABLES_FAILURE:
    case GET_SONGS_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.error,
      };
    default:
      return state;
  }
}
