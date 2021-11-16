import {
  GET_SONGS,
  GET_SONGS_SUCCESS,
  GET_SONGS_FAILURE,
  CREATE_TABLES,
  CREATE_TABLES_SUCCESS,
  CREATE_TABLES_FAILURE,
  ADD_SONG,
  ADD_SONG_SUCCESS,
  ADD_SONG_FAILURE,
  CLEAR_ADDED
} from "../util/constants";

export const initialState = {
  songList: null,
  loading: false,
  error: null,
  tablesCreated: false,
  songAdded: false
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
        songList: action.response//[{ id: "1", name: "ruby", artist: "Kaiser Chiefs" }] dummy data
      };
    case ADD_SONG_SUCCESS:
      return {
        ...state, 
        songAdded: true
      }
    case CLEAR_ADDED: 
      return {
        ...state, 
        loading: false, 
        songAdded: false
      }
    case CREATE_TABLES:
    case GET_SONGS:
    case ADD_SONG:
      return {
        ...state,
        loading: true,
      };
    case CREATE_TABLES_FAILURE:
    case GET_SONGS_FAILURE:
    case ADD_SONG_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.error,
      };
    default:
      return state;
  }
}
