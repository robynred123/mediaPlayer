import { GET_SONGS, GET_SONGS_SUCCESS, GET_SONGS_FAILURE } from '../util/constants'

export const getSongs = () => ({type: GET_SONGS})
export const getSongsSuccess = () => ({type: GET_SONGS_SUCCESS})
export const getSongsFailure = () => ({type: GET_SONGS_FAILURE})