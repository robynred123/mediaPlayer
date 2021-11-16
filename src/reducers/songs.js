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
  CLEAR_CHANGED,
  DELETE_SONG_FAILURE,
  DELETE_SONG,
  DELETE_SONG_SUCCESS, 

} from "../util/constants";

export const initialState = {
  songList: null,
  loading: false,
  error: null,
  tablesCreated: false,
  songChanged: false
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
    case DELETE_SONG_SUCCESS:
    case ADD_SONG_SUCCESS:
      return {
        ...state, 
        songChanged: true
      }
    case CLEAR_CHANGED: 
      return {
        ...state, 
        loading: false, 
        songChanged: false
      }
    case CREATE_TABLES:
    case GET_SONGS:
    case ADD_SONG:
    case DELETE_SONG:
      return {
        ...state,
        loading: true,
      };
    case CREATE_TABLES_FAILURE:
    case GET_SONGS_FAILURE:
    case ADD_SONG_FAILURE:
    case DELETE_SONG_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.error,
      };
    default:
      return state;
  }
}
