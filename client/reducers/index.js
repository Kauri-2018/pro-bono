import {combineReducers} from 'redux'

import auth from './auth'
import allMatters from './allmatters'
import matterById from './matterbyid'

const reducers = combineReducers({
  auth,
  allMatters,
  matterById
})

export default reducers
