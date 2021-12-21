import { combineReducers } from 'redux'

import songs from './songs'
import playlists from './playlists'
import app from './app'

const rootReducer = combineReducers({
  songs,
  playlists,
  app
})

export default rootReducer