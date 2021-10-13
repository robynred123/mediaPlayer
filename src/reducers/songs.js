import { GET_SONGS, GET_SONGS_SUCCESS, GET_SONGS_FAILURE } from '../util/constants'

export const initialState = {
  songList: [],
  loading: false,
  error: null
};

export default function (state = initialState, action) {
  switch (action.type) {
    case GET_SONGS:
      return {
        ...state,
        loading: true
      };
    case GET_SONGS_SUCCESS: 
      return {
        ...state,
        loading: false,
        songList: [{'id': '1', 'name': 'ruby'}] //update
      }
    case GET_SONGS_FAILURE:
      return {
        ...state,
        loading: false,
        error: 'Failed to Load Songs'
      }
    default: 
      return state;
  }
}
