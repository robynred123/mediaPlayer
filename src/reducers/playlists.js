import { 
  CREATE_PLAYLIST_TABLE,
  CREATE_PLAYLIST_TABLE_SUCCESS,
  CREATE_PLAYLIST_TABLE_FAILURE,
  GET_PLAYLISTS,
  GET_PLAYLISTS_SUCCESS,
  GET_PLAYLISTS_FAILURE ,
  ADD_PLAYLIST,
  ADD_PLAYLIST_SUCCESS,
  ADD_PLAYLIST_FAILURE,
  CLEAR_CHANGED,
  DELETE_PLAYLIST,
  DELETE_PLAYLIST_SUCCESS,
  DELETE_PLAYLIST_FAILURE,
  DROP_TABLES_SUCESS,
  CLEAR_ERROR
} from "../util/constants";

export const initialState = {
  playlistTableCreated: false,
  playlists: [],
  playlistsChanged: false,
  error: null,
  loading: false
};

export default function (state = initialState, action) {
  switch (action.type) {
    case CREATE_PLAYLIST_TABLE_SUCCESS:
      return {
        ...state,
        loading: false,
        playlistTableCreated: true
      }
      break;
      case DROP_TABLES_SUCESS: 
      return {
        ...state, 
        loading: false, 
        playlistTableCreated: false,
      }
    break;
    case GET_PLAYLISTS_SUCCESS: 
      return {
        ...state,
        loading: false,
        playlists: action.response
      }
      break;
    case DELETE_PLAYLIST_SUCCESS:
    case ADD_PLAYLIST_SUCCESS:
      return {
        ...state,
        loading: false,
        playlistsChanged: true
      }
      break;
    case CLEAR_CHANGED: 
      return {
        ...state, 
        playlistsChanged: false
      }
      break;
    case CLEAR_ERROR: 
      return {
        ...state,
        error: null
      }
      break;
    //loading states
    case DELETE_PLAYLIST:
    case CREATE_PLAYLIST_TABLE:
    case ADD_PLAYLIST:
    case GET_PLAYLISTS:
      return {
        ...state,
        loading: true
      };
      break;
    //failures
    case DELETE_PLAYLIST_FAILURE:
    case CREATE_PLAYLIST_TABLE_FAILURE:
    case ADD_PLAYLIST_FAILURE:
    case GET_PLAYLISTS_FAILURE: 
      return {
        ...state,
        loading: false,
        error: action.error
      }
      break;
    default:
      return state;
  }
}
