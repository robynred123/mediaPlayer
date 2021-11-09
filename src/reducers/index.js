import { combineReducers } from 'redux'

import songs from './songs'
import app from './app'

const rootReducer = combineReducers({
  songs,
  app
})

export default rootReducer