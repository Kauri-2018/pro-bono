import {combineReducers} from 'redux'

import auth from './auth'
import matterList from './matterList'
import matterById from './matterById'
import errorMessage from './errorHandle'

const reducers = combineReducers({
  auth,
  matterList,
  matterById,
  errorMessage
})

export default reducers
