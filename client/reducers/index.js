import {combineReducers} from 'redux'

import auth from './auth'
import allMatters from './allMatters'
import matterById from './matterById'
import errorMessage from './errorMessage'

const reducers = combineReducers({
  auth,
  allMatters,
  matterById,
  errorMessage
})

export default reducers
